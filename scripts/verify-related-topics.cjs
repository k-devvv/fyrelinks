const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true }
  }).outputText, filename);
};
const { POSTS, getRelatedPosts } = require('../lib/catalog.ts');
const imageGuides = getRelatedPosts('moss-image-native-layout-json-base-sft', 3);
assert.equal(imageGuides.length, 3);
assert.ok(imageGuides.every(p => p.category !== 'news'));
assert.ok(imageGuides.every(p => /image|flux|sdxl|diffusion|lora/.test(p.slug)));
for (const post of POSTS) {
  const related = getRelatedPosts(post.slug, 3);
  assert.ok(!related.some(p => p.slug === post.slug), post.slug + ': excludes current article');
  assert.equal(new Set(related.map(p => p.slug)).size, related.length);
  const excluded = related.map(p => p.slug);
  assert.ok(getRelatedPosts(post.slug, 3, excluded).every(p => !excluded.includes(p.slug)));
  if (post.category === 'finance') assert.ok(related.every(p => p.category === 'finance'));
}
console.log('Related-topic navigation verified for ' + POSTS.length + ' articles.');
