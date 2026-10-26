const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
require.extensions['.ts'] = (m, f) => m._compile(ts.transpileModule(fs.readFileSync(f, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText, f);
const { POSTS } = require('../lib/posts.ts');
const editorial = require('../lib/editorial.ts');
const code = ts.transpileModule(fs.readFileSync(path.join(__dirname, '../app/feed.xml/route.ts'), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const exportsObject = {};
vm.runInNewContext(code, { exports: exportsObject, Response, URL, require: name => {
  if (name === '@/lib/posts') return { POSTS };
  if (name === '@/lib/editorial') return editorial;
  throw new Error('Unexpected dependency ' + name);
} });
(async () => {
  const response = exportsObject.GET(new Request('https://www.fyrelinkz.com/feed.xml?format=xml'));
  const xml = await response.text();
  assert.equal(response.status, 200);
  assert.equal((xml.match(/<item>/g) || []).length, POSTS.length);
  assert.ok(xml.includes('<lastBuildDate>'));
  const newest = [...POSTS].sort((a,b) => b.updatedAt.localeCompare(a.updatedAt))[0];
  assert.ok(xml.includes(`<atom:updated>${newest.updatedAt}T06:30:00Z</atom:updated>`));
  assert.ok(xml.includes(`<pubDate>${new Date(newest.publishedAt + 'T06:30:00Z').toUTCString()}</pubDate>`));
  const html = exportsObject.GET(new Request('https://www.fyrelinkz.com/feed.xml', { headers: { accept: 'text/html' } }));
  assert.equal(html.status, 307);
  assert.equal(html.headers.get('location'), 'https://www.fyrelinkz.com/rss');
  console.log('Feed verified: item count, update date, original publication date and HTML redirect.');
})().catch(error => { console.error(error); process.exitCode = 1; });
