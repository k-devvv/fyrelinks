const fs = require('node:fs');
const path = require('node:path');
const { performance } = require('node:perf_hooks');
const articles = require('../lib/content/articles.json');

// Fixed owned origin; never follow an off-site redirect or execute page scripts.
const origin = 'https://www.fyrelinkz.com';
const pages = articles.filter(article => article.category !== 'news').slice(0, 10);
const timeoutMs = 20_000;
const repeats = 3;
const median = values => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];

(async () => {
  if (pages.length !== 10) throw new Error('Exactly ten owned articles are required.');
  const startedAt = new Date().toISOString();
  const rows = [];
  for (const article of pages) {
    const url = `${origin}/${article.category}/${article.slug}`;
    const runs = [];
    for (let repeat = 1; repeat <= repeats; repeat++) {
      const start = performance.now();
      try {
        const response = await fetch(url, {
          redirect: 'manual',
          signal: AbortSignal.timeout(timeoutMs),
          headers: { 'cache-control': 'no-cache', accept: 'text/html' },
        });
        const html = await response.text();
        const checks = {
          http200: response.status === 200,
          titlePresent: /<title>[^<]+<\/title>/.test(html),
          canonicalMatches: html.includes(`rel="canonical" href="${url}"`),
          singleH1: (html.match(/<h1(?:\s|>)/g) || []).length === 1,
          sourceLinksPresent: article.sources.every(source => html.includes(source.url.replaceAll('&', '&amp;'))),
        };
        runs.push({ repeat, status: response.status,
          elapsedMs: Math.round((performance.now() - start) * 10) / 10,
          decodedHtmlBytes: Buffer.byteLength(html, 'utf8'),
          vercelCache: response.headers.get('x-vercel-cache'), checks,
          accepted: Object.values(checks).every(Boolean) });
      } catch (error) {
        runs.push({ repeat, status: null,
          elapsedMs: Math.round((performance.now() - start) * 10) / 10,
          error: error.name, accepted: false });
      }
    }
    const times = runs.map(run => run.elapsedMs);
    rows.push({ url, title: article.title, runs, accepted: runs.filter(run => run.accepted).length,
      medianMs: median(times), minMs: Math.min(...times), maxMs: Math.max(...times) });
  }
  const report = { kind: 'owned-page-http-check', startedAt, finishedAt: new Date().toISOString(),
    runtime: { node: process.version, platform: process.platform, architecture: process.arch },
    methodology: { selection: 'First ten non-news articles in the versioned articles.json catalog',
      origin, concurrency: 1, repeats, timeoutMs,
      requestCacheControl: 'no-cache',
      cacheLimit: 'Request header does not guarantee an uncached CDN or origin response. Cache header is recorded when exposed.',
      elapsedDefinition: 'Fetch start through complete decoded HTML body; includes connection and network effects.',
      acceptance: ['HTTP 200', 'nonempty title', 'expected canonical', 'one H1', 'all catalog source URLs present in HTML'],
      limits: 'Not a browser rendering, visual quality, extraction-tool comparison, retrieval accuracy, origin-only latency, Core Web Vitals or GPU inference benchmark. HTML checks do not establish content accuracy.' },
    summary: { pages: rows.length, requests: rows.length * repeats,
      accepted: rows.reduce((total, row) => total + row.accepted, 0) }, rows };
  const output = path.join(__dirname, '..', 'docs', 'evidence', `owned-pages-http-${startedAt.slice(0, 10)}.json`);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({ ...report.summary, evidenceFile: path.relative(path.join(__dirname, '..'), output) }));
  if (report.summary.accepted !== report.summary.requests) process.exitCode = 1;
})().catch(error => { console.error(error.message); process.exitCode = 1; });
