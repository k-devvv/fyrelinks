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
const { recommendHardware, MARKET_BUDGET_LIMITS } = require('../lib/hardware-planner/recommend.ts');

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

const invalid = recommendHardware({ market: 'us', budget: 0, workload: 'comfyui-image', path: 'desktop-upgrade' }, CLOCK);
assert.match(invalid.error, /greater than zero/);
assert.equal(invalid.recommendations.length, 0);
for (const budget of [-1, Number.NaN, Number.POSITIVE_INFINITY, MARKET_BUDGET_LIMITS.us + 1]) {
  assert.ok(recommendHardware({ market: 'us', budget, workload: 'local-llm', path: 'laptop' }, CLOCK).error,
    `Reject invalid or out-of-range budget ${budget}`);
}
assert.ok(recommendHardware({ market: 'unknown', budget: 1000, workload: 'local-llm', path: 'laptop' }, CLOCK).error,
  'Reject unsupported market');

const priced = recommendHardware({ market: 'us', budget: 900, workload: 'comfyui-image', path: 'desktop-upgrade' }, CLOCK);
assert.equal(priced.error, null);
assert.equal(priced.recommendations.length, 1);
assert.equal(priced.recommendations[0].estimatedTotal, 799.99, 'Keep the sourced GPU-only example amount');
assert.equal(priced.recommendations[0].fit, 'strong', '16 GB GPU meets image planning heuristic');
assert.ok(priced.recommendations[0].caveats.some(text => /graphics card only/i.test(text)),
  'Disclose existing-PC fit and excluded upgrade costs');

const overBudget = recommendHardware({ market: 'us', budget: 500, workload: 'comfyui-image', path: 'desktop-upgrade' }, CLOCK);
assert.equal(overBudget.recommendations[0].fit, 'over-budget');
assert.equal(overBudget.recommendations[0].estimatedTotal, 799.99);

const unpriced = recommendHardware({ market: 'uk', budget: 1500, workload: 'comfyui-image', path: 'desktop-build' }, CLOCK);
assert.ok(unpriced.recommendations.length > 0);
assert.ok(unpriced.recommendations.every(candidate => candidate.estimatedTotal === null),
  'Unknown build prices never become zero or fake totals');
assert.ok(unpriced.recommendations.every(candidate => candidate.caveats.some(text => /No verified current price/i.test(text))));

const stale = recommendHardware({ market: 'us', budget: 2000, workload: 'comfyui-image', path: 'desktop-upgrade' }, new Date('2026-11-01T00:00:00Z'));
assert.equal(stale.stalePriceCount, 1, 'Actual catalog price becomes stale under injected clock');
assert.equal(stale.recommendations[0].estimatedTotal, null, 'Stale price excluded from budget ranking');
assert.ok(stale.recommendations[0].caveats.some(text => /older than 30 days/i.test(text)));
const staleGermany = recommendHardware({ market: 'de', budget: 2000, workload: 'comfyui-image', path: 'desktop-upgrade' }, new Date('2026-11-01T00:00:00Z'));
assert.equal(staleGermany.stalePriceCount, 1, 'Germany retailer price is stale under injected clock');
assert.equal(staleGermany.recommendations[0].estimatedTotal, null, 'Stale Germany price cannot drive affordability');

const analyticsSource = fs.readFileSync(require.resolve('../components/Analytics.tsx'), 'utf8');
const measurementSource = fs.readFileSync(require.resolve('../lib/measurement.ts'), 'utf8');
const plannerUiSource = fs.readFileSync(require.resolve('../components/HardwarePlanner.tsx'), 'utf8');
for (const eventName of ['planner_start', 'planner_complete', 'planner_market', 'planner_guide_click', 'planner_source_click']) {
  assert.ok(analyticsSource.includes(`"${eventName}"`), `Analytics event ${eventName} is allowlisted`);
  assert.ok(measurementSource.includes(`"${eventName}"`), `Measurement type includes ${eventName}`);
}
assert.match(analyticsSource, /plannerEvent\?\["market","workload","path","placement"\]/,
  'Planner analytics forwards only fixed categorical dimensions');
assert.match(analyticsSource, /market:new Set\(\["us","uk","ca","de"\]\)/,
  'Planner markets are enum validated');
assert.doesNotMatch(plannerUiSource, /measure\("planner_(?:start|complete|market|guide_click|source_click)"\s*,\s*\{[^}]*budget/s,
  'Planner event payloads never include budget');

console.log(`Hardware planner catalog verified: ${HARDWARE_CANDIDATES.length} candidates across 4 markets.`);
console.log('Hardware planner rules verified: validation, ranking, stale prices, and no-fit cases.');
console.log('Hardware planner analytics verified: consent-safe allowlist excludes budget and free text.');
