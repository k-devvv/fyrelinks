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

const { VIDEO_PROVIDERS, VIDEO_VARIANTS, variantRate } = require('../lib/video-plans.ts');

assert.equal(VIDEO_PROVIDERS.length, 4, '4 video providers');
assert.ok(VIDEO_VARIANTS.length >= 200, 'Catalog contains model variants');
assert.equal(new Set(VIDEO_VARIANTS.map(v => v.id)).size, VIDEO_VARIANTS.length, 'Unique variant IDs');

for (const v of VIDEO_VARIANTS) {
  const p = VIDEO_PROVIDERS.find(p => p.id === v.provider);
  assert.ok(p, `Provider ${v.provider} exists for variant ${v.id}`);
  assert.ok(p.url.startsWith('https://'), `Provider URL is HTTPS`);
  assert.ok(p.plans.some(pl => pl.tier >= v.minTier), `Plan tier available for variant ${v.id}`);
  assert.equal(v.credits === null, v.seconds === null, `Credits/seconds parity for ${v.id}`);
  if (v.credits !== null) {
    assert.ok(v.credits > 0 && v.seconds > 0, `Positive values for ${v.id}`);
  }
  const rateStr = variantRate(v);
  assert.ok(rateStr.length > 0, `Rate string generated for ${v.id}`);
}

console.log('Model directory catalog verified: ' + VIDEO_VARIANTS.length + ' variants across 4 providers.');
