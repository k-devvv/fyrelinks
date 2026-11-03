const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true}}).outputText,filename);
const {POSTS,getPostsByCategory} = require('../lib/catalog.ts');
const {newsPageCount,newsPageItems,newsPagePath,NEWS_PAGE_SIZE} = require('../lib/news-pagination.ts');
const {readingClusters,readingJourney} = require('../lib/reading-clusters.ts');
const {readerLinkEvent,webVitalFields} = require('../lib/reader-measurement.ts');
const news=getPostsByCategory('news');
const collected=Array.from({length:newsPageCount(news.length)},(_,i)=>newsPageItems(news,i+1)).flat();
assert.deepEqual(collected.map(p=>p.slug),news.map(p=>p.slug),'Pagination preserves order and every story exactly once');
assert.equal(newsPagePath(1),'/news');assert.equal(newsPagePath(2),'/news/page/2');
assert.equal(newsPageItems(news,1).length,Math.min(NEWS_PAGE_SIZE,news.length));
assert.equal(newsPageCount(24),1);assert.equal(newsPageCount(25),2);
for(const cluster of readingClusters) for(const slug of cluster.slugs){
  assert.ok(POSTS.some(p=>p.slug===slug),'Curated target exists: '+slug);
  const journey=readingJourney(slug);assert.equal(journey.next.length,2);
  assert.ok(!journey.next.includes(slug));assert.equal(new Set(journey.next).size,2);
}
const origin='https://www.fyrelinkz.com';
assert.deepEqual(readerLinkEvent('/downloads/extraction-check.py?email=private#secret',origin,'download'),{name:'resource_download',fields:{resource_path:'/downloads/extraction-check.py'}});
assert.equal(readerLinkEvent('https://evil.example/downloads/private.json',origin,'download'),null);
assert.equal(readerLinkEvent('/downloads/personal%40mail.json',origin,'download'),null);
assert.deepEqual(readerLinkEvent('https://docs.example/read?token=secret',origin,'source'),{name:'source_visit',fields:{source_domain:'docs.example'}});
assert.equal(readerLinkEvent('javascript:alert(1)',origin,'source'),null);
assert.deepEqual(readerLinkEvent('/workflow/guide?secret=1',origin,'related'),{name:'related_read',fields:{article_path:'/workflow/guide'}});
assert.equal(readerLinkEvent('/contact?email=secret',origin,'other'),null);
assert.deepEqual(readerLinkEvent('mailto:editorial@fyrelinkz.com?subject=Build%20spec%20request',origin,'enquiry','build-spec'),{name:'service_enquiry',fields:{placement:'build-spec'}});
assert.equal(readerLinkEvent('mailto:editorial@fyrelinkz.com',origin,'enquiry','not a placement'),null);
assert.equal(readerLinkEvent('https://example.com/sales',origin,'enquiry','build-spec'),null);
assert.equal(JSON.stringify(readerLinkEvent('mailto:editorial@fyrelinkz.com?subject=x',origin,'enquiry','build-spec')).includes('@'),false,'enquiry event carries no address');
const result=JSON.parse(fs.readFileSync('public/downloads/extraction-check-result.json','utf8').replace(/^\uFEFF/,''));
assert.equal(result.matched_expected,true);assert.equal(result.rows_recovered,2);
console.log(`Search repairs verified: ${news.length} news stories across ${newsPageCount(news.length)} pages; ${readingClusters.reduce((n,c)=>n+c.slugs.length,0)} curated articles; private query fields excluded.`);

assert.deepEqual(webVitalFields({name:'CLS',value:0.1234,rating:'good',id:'private-id',entries:['private DOM']}),{metric_name:'CLS',value:123,metric_rating:'good'});
assert.deepEqual(webVitalFields({name:'LCP',value:2543.2,rating:'needs-improvement',url:'private'}),{metric_name:'LCP',value:2543,metric_rating:'needs-improvement'});
for(const bad of [null,[],{name:'query',value:12,rating:'good'},{name:'LCP',value:Infinity,rating:'good'},{name:'LCP',value:-1,rating:'good'},{name:'LCP',value:10,rating:'private text'}]) assert.deepEqual(webVitalFields(bad),{});
console.log('Web-vitals payloads verified: fixed metric/rating fields, finite numeric values, no IDs or DOM attribution.');

const crypto=require('node:crypto');
const raw=JSON.parse(fs.readFileSync('public/downloads/qwen-memory-result-oct26.json','utf8'));
assert.equal(raw.cases.length,3);assert.equal(raw.cases.reduce((n,c)=>n+c.trials.length,0),9);
assert.equal(crypto.createHash('sha256').update(fs.readFileSync('public/downloads/qwen-memory-check.py')).digest('hex'),raw.script_sha256);
const experiment=POSTS.find(p=>p.slug==='qwen3-06b-rtx4050-context-memory-measured-test');
assert.equal(experiment.evidenceBasis,'Measured experiment');assert.equal(experiment.testedDate,'2026-10-26');
const table=experiment.sections.find(s=>s.table).table;
for(const [i,c] of raw.cases.entries()) {
 assert.equal(Number(table.rows[i][0]),c.actual_input_tokens);
 assert.equal(Number(table.rows[i][2]),Number(c.median_seconds.toFixed(3)));
 assert.equal(Number(table.rows[i][3].replaceAll(',','')),Number(c.median_peak_allocated_mib.toFixed(1)));
 assert.ok(c.trials.every(t=>t.output_tokens===64&&t.seconds>0&&t.peak_allocated_mib>0));
 const times=c.trials.map(t=>t.seconds).sort((a,b)=>a-b);assert.equal(c.median_seconds,times[1]);
}
console.log('Original GPU evidence verified: nine trials, script hash, article table and explicit measured-test label.');
