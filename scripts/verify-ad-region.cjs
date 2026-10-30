const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (m, f) => m._compile(ts.transpileModule(fs.readFileSync(f, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, f);
const { adsNeedConsent, countryFromHeaders } = require('../lib/advertising.ts');

for (const code of ['US', 'CA', 'AU', 'NZ', 'IN', 'BR', 'JP', 'us']) assert.equal(adsNeedConsent(code), false, `${code}: ads on by default`);
for (const code of ['DE', 'FR', 'NL', 'IE', 'PL', 'GR', 'NO', 'IS', 'LI', 'GB', 'CH', 'gb']) assert.equal(adsNeedConsent(code), true, `${code}: opt-in required`);
for (const code of [null, undefined, '', ' ', 'XX1', 'USA', '??']) assert.equal(adsNeedConsent(code), true, `${String(code)}: unknown region stays opt-in`);

const netlify = geo => new Headers({ 'x-nf-geo': Buffer.from(JSON.stringify(geo)).toString('base64') });
assert.equal(countryFromHeaders(new Headers({ 'x-vercel-ip-country': 'US' })), 'US');
assert.equal(countryFromHeaders(netlify({ city: 'Austin', country: { code: 'US', name: 'United States' } })), 'US');
assert.equal(countryFromHeaders(netlify({ country: { code: 'DE' } })), 'DE');
assert.equal(countryFromHeaders(netlify({ city: 'Nowhere' })), null);
assert.equal(countryFromHeaders(new Headers({ 'x-nf-geo': 'not-base64-json' })), null);
assert.equal(countryFromHeaders(new Headers()), null);
assert.equal(adsNeedConsent(countryFromHeaders(new Headers())), true, 'missing headers fall back to opt-in');

console.log('Ad region checks passed: default-on outside EEA/UK/CH, opt-in inside, unknown or malformed regions stay opt-in.');
