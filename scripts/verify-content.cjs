const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => {
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      esModuleInterop: true
    }
  }).outputText;
  module._compile(code, filename);
};
const {
  POSTS,
  CATEGORIES,
  getPostBySlug
} = require('../lib/posts.ts');
assert.equal(new Set(POSTS.map(p => p.slug)).size, POSTS.length, 'Unique slugs');
for (const p of POSTS) {
  assert.ok(p.sources?.length, `${p.slug}: primary sources required`);
  assert.ok(CATEGORIES.some(c => c.slug === p.category));
  assert.ok(p.sources.every(s => s.url.startsWith('https://')));
  assert.ok(p.sourceCheckedAt);
  assert.ok(p.sections.every(s => !s.sourceIds || s.sourceIds.every(i => Number.isInteger(i) && i > 0 && i <= p.sources.length)));
  assert.ok(p.sections.length >= 3, `${p.slug}: useful sections`);
  assert.ok(!p.videoComparisons?.length, 'No unverified test clips');
  assert.ok(new Date(p.publishedAt) <= new Date());
  assert.ok(new Date(p.updatedAt) >= new Date(p.publishedAt));
  assert.equal(getPostBySlug('unknown', p.slug), undefined);
  assert.equal(getPostBySlug(p.category, p.slug), p);
}
const {getRedirectUrl}=require('../lib/redirects.ts');
for(const slug of ['constructor','__proto__','toString','hasOwnProperty','unknown','']) assert.equal(getRedirectUrl(slug),undefined);
assert.equal(getRedirectUrl('MINIMAX'),'https://hailuoai.video');
console.log(`Content checks passed: ${POSTS.length} sourced articles, strict routes, safe redirects and valid dates.`);
