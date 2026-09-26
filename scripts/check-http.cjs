const assert = require('node:assert/strict');
const fs = require('node:fs');
const data = require('../lib/content/articles.json');
const base = process.env.FYRE_TEST_URL || 'http://127.0.0.1:3092';
const origin = 'https://www.fyrelinkz.com';
const routes = ['/', '/news', '/create', '/workflow', '/hardware', '/hardware/ai-workstation-planner', '/stack', '/about', '/contact', '/privacy', '/terms', '/ai-video-models', ...data.map(p => '/' + p.category + '/' + p.slug)];
(async () => {
  const links = new Set(); let schemas = 0;
  for (const route of routes) {
    const response = await fetch(base + route);
    assert.equal(response.status, 200, route);
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
    const html = await response.text();
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, route + ': H1');
    assert.ok(html.includes('rel="canonical" href="' + origin + (route === '/' ? '' : route) + '"'), route + ': canonical');
    assert.ok(html.includes('property="og:image"'), route + ': social image');
    assert.ok(!html.includes('href="/tools/video-cost'), route + ': no calculator links');
    assert.ok(!html.includes('| FyreLinkz | FyreLinkz'), route + ': title');
    for (const [, raw] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { JSON.parse(raw); schemas++; }
    for (const [, href] of html.matchAll(/href="(\/[^"#]*)(?:#[^"]*)?"/g)) if (!href.startsWith('/_next/') && !href.startsWith('/go/')) links.add(href.replaceAll('&amp;', '&'));
    const story = data.find(p => route === '/' + p.category + '/' + p.slug);
    if (story) for (const source of story.sources) assert.ok(html.includes(source.url.replaceAll('&', '&amp;')), route + ': visible source');
  }
  for (const link of links) assert.equal((await fetch(base + link)).status, 200, link);
  for (const route of ['/unknown', '/news/not-real', '/news/comfyui-flux-lora-training-and-inference-guide', '/go/constructor', '/go/__proto__', '/go/not-real']) {
    assert.equal((await fetch(base + route, {redirect:'manual'})).status, 404, route);
  }
  const retired = await fetch(base + '/tools/video-cost', {redirect:'manual'});
  assert.equal(retired.status,308); assert.ok(retired.headers.get('location').endsWith('/create/ai-video-generation-matrix-minimax-higgsfield-seedance'));
  const redirect = await fetch(base + '/go/minimax', {redirect:'manual'});
  assert.equal(redirect.status, 307); assert.equal(redirect.headers.get('location'), 'https://hailuoai.video/');
  assert.ok(redirect.headers.get('x-robots-tag').includes('noindex'));
  const sitemap = await (await fetch(base + '/sitemap.xml')).text();
  assert.equal((sitemap.match(/<url>/g)||[]).length, routes.length);
  const rss = await (await fetch(base + '/feed.xml')).text();
  assert.equal((rss.match(/<item>/g)||[]).length, data.length);
  const robots = await (await fetch(base + '/robots.txt')).text();
  assert.ok(robots.includes(origin + '/sitemap.xml')); assert.ok(!robots.includes('Disallow: /_next/'));
  const report = {routes:routes.length,internalLinks:links.size,schemas,invalidRoutes:6,redirects:'passed',sitemapUrls:routes.length,rssItems:data.length,metadata:'passed',headers:'passed'};
  if (process.env.FYRE_TEST_REPORT) fs.writeFileSync(process.env.FYRE_TEST_REPORT, JSON.stringify(report,null,2));
  console.log(JSON.stringify(report));
})().catch(error => {console.error(error);process.exit(1);});
