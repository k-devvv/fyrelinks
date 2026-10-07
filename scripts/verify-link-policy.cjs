const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const output = ts.transpileModule(fs.readFileSync('lib/link-policy.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS }
}).outputText;
const moduleShim = { exports: {} };
new Function('exports', 'module', output)(moduleShim.exports, moduleShim);
const { linkPolicy } = moduleShim.exports;
assert.equal(linkPolicy('/news').internal, true);
assert.equal(linkPolicy('#sources').rel, undefined);
assert.equal(linkPolicy('https://www.fyrelinkz.com/news').internal, true);
assert.equal(linkPolicy('https://fyrelinkz.com.evil.example/').internal, false);
assert.equal(linkPolicy('https://example.com/?site=fyrelinkz.com').internal, false);
assert.equal(linkPolicy('//example.com/').internal, false);
assert.equal(linkPolicy('https://example.com/').rel, 'noopener noreferrer');
for (const href of ['/go/minimax', 'https://www.fyrelinkz.com/go/minimax']) {
  const result = linkPolicy(href, false, 'ugc', '_self');
  assert.equal(result.internal, false);
  assert.ok(result.rel.includes('sponsored'));
  assert.ok(result.rel.includes('nofollow'));
  assert.ok(result.rel.includes('ugc'));
}
assert.ok(linkPolicy('https://example.com', true, 'noopener').rel.includes('sponsored'));
assert.equal(linkPolicy('/news', false, 'dofollow').rel, undefined);
console.log('Link policy checks passed: internal, external, lookalike, paid, rel merging.');
