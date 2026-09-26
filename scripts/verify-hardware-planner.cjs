const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');

require.extensions['.ts'] = (module, filename) => {
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      esModuleInterop: true,
    },
  }).outputText;
  module._compile(code, filename);
};

const { HARDWARE_CANDIDATES } = require('../lib/hardware-planner/catalog.ts');

const CLOCK = new Date('2026-09-26T00:00:00Z');
const MARKET_CURRENCIES = { us: 'USD', uk: 'GBP', ca: 'CAD', de: 'EUR' };
const MARKETS = Object.keys(MARKET_CURRENCIES);
const WORKLOADS = ['comfyui-image', 'comfyui-video', 'local-llm', 'mixed'];
const PATHS = ['desktop-build', 'desktop-upgrade', 'laptop'];
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const PRICE_SOURCE_RULES = {
  us: { host: 'www.newegg.com', productPath: /\/p\/N82E\d+$/ },
  uk: { host: 'www.scan.co.uk', productPath: /\/products\/.+/ },
  ca: null,
  de: { host: 'www.mindfactory.de', productPath: /\/product_info\.php\/.+\.html$/ },
};

function assertPrice(price, market) {
  assert.ok(price && typeof price === 'object', `Price object exists for ${market}`);
  assert.equal(price.currency, MARKET_CURRENCIES[market], `Correct currency for ${market}`);

  if (price.amount === null) {
    assert.equal(price.checkedAt, null, `Unknown ${market} price has no check date`);
    assert.equal(price.source, null, `Unknown ${market} price has no source`);
    return;
  }

  assert.ok(Number.isFinite(price.amount) && price.amount > 0, `Positive finite ${market} price`);
  assert.ok(ISO_DATE.test(price.checkedAt), `ISO check date for ${market} price`);
  assert.equal(new Date(`${price.checkedAt}T00:00:00Z`).toISOString().slice(0, 10), price.checkedAt,
    `Real calendar date for ${market} price`);
  assert.ok(new Date(`${price.checkedAt}T00:00:00Z`) <= CLOCK, `No future ${market} price date`);
  assert.ok(price.source && typeof price.source.label === 'string' && price.source.label.length > 5,
    `Identifiable ${market} source label`);
  assert.ok(/^https:\/\//.test(price.source.url), `HTTPS ${market} price source`);
  const url = new URL(price.source.url);
  const sourceRule = PRICE_SOURCE_RULES[market];
  assert.ok(sourceRule, `A verified direct-retailer source rule exists for ${market}`);
  assert.equal(url.hostname, sourceRule.host, `Approved retailer host for ${market} price`);
  assert.match(url.pathname, sourceRule.productPath, `${market} source is a direct product URL`);
}

function isStale(checkedAt, now = CLOCK) {
  return now.getTime() - new Date(`${checkedAt}T00:00:00Z`).getTime() > 30 * 24 * 60 * 60 * 1000;
}

assert.ok(HARDWARE_CANDIDATES.length >= 6 && HARDWARE_CANDIDATES.length <= 10,
  'Starter catalogue contains 6–10 candidates');
assert.equal(new Set(HARDWARE_CANDIDATES.map(candidate => candidate.id)).size,
  HARDWARE_CANDIDATES.length, 'Candidate IDs are unique');

const coveredWorkloads = new Set();
const coveredPaths = new Set();
for (const candidate of HARDWARE_CANDIDATES) {
  assert.ok(candidate.id && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(candidate.id), `Stable ID: ${candidate.id}`);
  assert.ok(candidate.name.trim().length > 0, `Name exists: ${candidate.id}`);
  assert.ok(PATHS.includes(candidate.path), `Valid path: ${candidate.id}`);
  assert.ok(['full-system', 'graphics-card-only'].includes(candidate.priceScope),
    `Valid price scope: ${candidate.id}`);
  coveredPaths.add(candidate.path);
  assert.ok(Array.isArray(candidate.supportedWorkloads) && candidate.supportedWorkloads.length > 0,
    `Workload coverage exists: ${candidate.id}`);
  for (const workload of candidate.supportedWorkloads) {
    assert.ok(WORKLOADS.includes(workload), `Valid workload ${workload}: ${candidate.id}`);
    coveredWorkloads.add(workload);
  }
  for (const [field, value] of Object.entries({
    gpuMemoryGb: candidate.gpuMemoryGb,
    systemRamGb: candidate.systemRamGb,
    storageTb: candidate.storageTb,
  })) {
    assert.ok(value === null || (Number.isFinite(value) && value >= 0),
      `${field} is unknown or finite and non-negative: ${candidate.id}`);
  }
  assert.ok(candidate.platformNote.trim().length > 20, `Caveat exists: ${candidate.id}`);
  assert.ok(Array.isArray(candidate.requiredParts) && candidate.requiredParts.length > 0,
    `Required parts exist: ${candidate.id}`);
  assert.ok(Array.isArray(candidate.specificationSources) && candidate.specificationSources.length > 0,
    `Specification sources exist: ${candidate.id}`);
  for (const source of candidate.specificationSources) {
    assert.ok(source.label.trim().length > 5, `Identifiable specification source: ${candidate.id}`);
    assert.ok(/^https:\/\//.test(source.url), `HTTPS specification source: ${candidate.id}`);
    assert.ok(/\./.test(new URL(source.url).hostname), `Valid specification source host: ${candidate.id}`);
  }
  assert.deepEqual(Object.keys(candidate.prices).sort(), [...MARKETS].sort(),
    `All four market prices exist: ${candidate.id}`);
  for (const market of MARKETS) assertPrice(candidate.prices[market], market);
}

for (const path of PATHS) assert.ok(coveredPaths.has(path), `Catalogue covers ${path}`);
for (const workload of WORKLOADS) assert.ok(coveredWorkloads.has(workload), `Catalogue covers ${workload}`);

assert.equal(isStale('2026-08-27'), false, 'Exactly 30 days old is not stale');
assert.equal(isStale('2026-08-26'), true, 'Older than 30 days is stale');
assert.ok(isStale('2026-08-27', new Date('2026-10-01T00:00:00Z')),
  'Injected clock identifies stale data');

assert.throws(() => assertPrice({
  amount: Number.NaN,
  currency: 'USD',
  checkedAt: '2026-09-26',
  source: { label: 'invalid fixture', url: 'https://example.com' },
}, 'us'), /Positive finite/, 'Verifier rejects NaN price fixture');

const priceCount = HARDWARE_CANDIDATES.reduce((count, candidate) => count + MARKETS.filter(
  market => candidate.prices[market].amount !== null,
).length, 0);
assert.ok(priceCount > 0, 'Starter catalogue has at least one verified market price example');

console.log(`Hardware planner catalog verified: ${HARDWARE_CANDIDATES.length} candidates across 4 markets.`);
