const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
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
const { faqPageSchema, articleCardImagePath, articleShareImagePath } = require('../lib/editorial.ts');
assert.equal(new Set(POSTS.map(p => p.slug)).size, POSTS.length, 'Unique slugs');
for (const p of POSTS) {
  const cardImage = articleCardImagePath(p.image).replace(/^\/art\//, '');
  const socialImage = articleShareImagePath(p.image).replace(/^\/art\//, '');
  const cardPath = path.join(__dirname, '..', 'public', 'art', cardImage);
  const socialPath = path.join(__dirname, '..', 'public', 'art', socialImage);
  assert.ok(fs.existsSync(cardPath), `${p.slug}: card image exists`);
  assert.ok(fs.existsSync(socialPath), `${p.slug}: social image exists`);
  if (p.image === 'ai-week-roundup-2026') {
    const jpeg = fs.readFileSync(cardPath);
    assert.equal(jpeg[0], 0xff, `${p.slug}: generated thumbnail has JPEG signature`);
    assert.equal(jpeg[1], 0xd8, `${p.slug}: generated thumbnail has JPEG signature`);
    assert.ok(jpeg.length < 250_000, `${p.slug}: generated thumbnail stays optimized`);
    assert.equal(cardImage, socialImage, `${p.slug}: card and social metadata use the same image`);
  }
  assert.ok(p.sources?.length, `${p.slug}: primary sources required`);
  assert.ok(typeof p.imageAlt === "string" && p.imageAlt.trim().length >= 20, `${p.slug}: descriptive image alt text is required`);
  assert.ok(CATEGORIES.some(c => c.slug === p.category));
  assert.ok(p.sources.every(s => s.url.startsWith('https://')));
  assert.ok(p.sourceCheckedAt);
  assert.ok(p.sections.every(s => !s.sourceIds || s.sourceIds.every(i => Number.isInteger(i) && i > 0 && i <= p.sources.length)));
  const faqQuestions = (p.faqs ?? []).map(faq => faq.question.trim().toLocaleLowerCase());
  assert.ok((p.faqs ?? []).every(faq => faq.question.trim() && faq.answer.trim()), `${p.slug}: FAQ questions and answers are required`);
  assert.equal(new Set(faqQuestions).size, faqQuestions.length, `${p.slug}: FAQ questions must be unique`);
  if (p.imageCreditUrl) assert.ok(/^https:\/\//.test(p.imageCreditUrl), `${p.slug}: photo credit must use HTTPS`);
  assert.ok(p.sections.length >= 3, `${p.slug}: useful sections`);
  assert.ok(!p.sections.some(s => /tested real-world shot examples/i.test(s.content)), `${p.slug}: do not claim tests without published evidence`);
  assert.ok(!p.videoComparisons?.length, 'No unverified test clips');
  assert.ok(new Date(p.publishedAt) <= new Date());
  assert.ok(new Date(p.updatedAt) >= new Date(p.publishedAt));
  assert.equal(getPostBySlug('unknown', p.slug), undefined);
  assert.equal(getPostBySlug(p.category, p.slug), p);
}
const upgradeGuide = getPostBySlug('hardware', 'local-ai-pc-upgrade-vs-build-laptop-workstation');
assert.ok(upgradeGuide, 'Local AI upgrade guide route is present');
assert.ok(upgradeGuide.faqs.length >= 5, 'Upgrade guide includes useful reader FAQs');
const faqSchema = faqPageSchema(upgradeGuide.faqs);
assert.equal(faqSchema.mainEntity.length, upgradeGuide.faqs.length, 'FAQ structured data mirrors visible FAQ count');
assert.deepEqual(faqSchema.mainEntity.map(q => [q.name, q.acceptedAnswer.text]), upgradeGuide.faqs.map(f => [f.question, f.answer]), 'FAQ structured data mirrors visible content exactly');
const {getRedirectUrl}=require('../lib/redirects.ts');
for(const slug of ['constructor','__proto__','toString','hasOwnProperty','unknown','']) assert.equal(getRedirectUrl(slug),undefined);
assert.equal(getRedirectUrl('MINIMAX'),'https://hailuoai.video');
console.log(`Content checks passed: ${POSTS.length} sourced articles, strict routes, safe redirects and valid dates.`);
