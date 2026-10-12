const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const Module = require('node:module');
const filename = require('node:path').resolve('lib/advertising.ts');
const m = new Module(filename);
m._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,filename);
const {selectAdUnit,adFrameHtml,AD_UNITS} = m.exports;
for (const [width,key] of [[300,null],[320,'mobile'],[467,'mobile'],[468,'medium'],[727,'medium'],[728,'wide']]) {
  assert.equal(selectAdUnit('home',width,true)?.key ?? null,key ? AD_UNITS[key].key : null);
}
assert.equal(selectAdUnit('sidebar',180,false),null);
assert.equal(selectAdUnit('sidebar',159,true),null);
assert.equal(selectAdUnit('sidebar',160,true),AD_UNITS.sidebar);
assert.equal(selectAdUnit('article',299,true),null);
assert.equal(selectAdUnit('article',300,false),AD_UNITS.rectangle);
for (const unit of Object.values(AD_UNITS)) {
  const html=adFrameHtml(unit);
  assert.ok(html.includes(`https://bauval.org/22/${unit.key}`));
  assert.ok(html.includes(`"width":${unit.width}`));
  assert.equal((html.match(/<script/g)||[]).length,2);
}
const client=fs.readFileSync('components/Advertising.tsx','utf8');
assert.ok(!client.includes('allow-same-origin'));
assert.ok(!client.includes('allow-top-navigation'));
assert.ok(!client.includes('bauval.org/14'));
console.log('Advertising width selection, exact units and isolated-frame checks passed.');
