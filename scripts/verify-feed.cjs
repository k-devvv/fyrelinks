const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (m, f) => m._compile(ts.transpileModule(fs.readFileSync(f, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText, f);
const { POSTS } = require('../lib/posts.ts');
const editorial = require('../lib/editorial.ts');
const { feedResponse } = require('../lib/feed.ts');

(async () => {
  const response = feedResponse(new Request('https://www.fyrelinkz.com/feed.xml?format=xml'));
  const xml = await response.text();
  assert.equal(response.status, 200);
  assert.equal((xml.match(/<item>/g) || []).length, POSTS.length);
  assert.ok(xml.includes('<lastBuildDate>'));
  const newest = [...POSTS].sort((a,b) => b.updatedAt.localeCompare(a.updatedAt))[0];
  assert.ok(xml.includes(`<atom:updated>${newest.updatedAt}T06:30:00Z</atom:updated>`));
  assert.ok(xml.includes(`<pubDate>${new Date(newest.publishedAt + 'T06:30:00Z').toUTCString()}</pubDate>`));
  const html = feedResponse(new Request('https://www.fyrelinkz.com/feed.xml', { headers: { accept: 'text/html' } }));
  assert.equal(html.status, 307);
  assert.equal(html.headers.get('location'), 'https://www.fyrelinkz.com/rss');
  console.log('Feed verified: item count, update date, original publication date and HTML redirect.');
})().catch(error => { console.error(error); process.exitCode = 1; });
