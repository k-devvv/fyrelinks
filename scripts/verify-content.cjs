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
const { faqPageSchema, articleCardImagePath, articleShareImagePath, articleImageDimensions, articlePath, sectionId } = require('../lib/editorial.ts');
const localRoutes = new Set(['/', '/about', '/contact', '/privacy', '/terms', '/rss', '/ai-video-models', '/hardware/ai-workstation-planner', ...CATEGORIES.map(c => '/' + c.slug), ...POSTS.map(articlePath)]);
function rasterDimensions(filename) {
  const bytes = fs.readFileSync(filename);
  if (bytes[0] === 0x89 && bytes.toString('ascii', 1, 4) === 'PNG') {
    return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
  }
  assert.equal(bytes.readUInt16BE(0), 0xffd8, `${filename}: expected PNG or JPEG`);
  for (let offset = 2; offset < bytes.length;) {
    assert.equal(bytes[offset], 0xff, `${filename}: JPEG marker`);
    while (bytes[offset] === 0xff) offset++;
    const marker = bytes[offset++];
    const length = bytes.readUInt16BE(offset);
    if ([0xc0, 0xc1, 0xc2].includes(marker)) {
      return { width: bytes.readUInt16BE(offset + 5), height: bytes.readUInt16BE(offset + 3) };
    }
    offset += length;
  }
  throw new Error(`${filename}: JPEG dimensions missing`);
}
assert.equal(new Set(POSTS.map(p => p.slug)).size, POSTS.length, 'Unique slugs');
assert.equal(new Set(POSTS.map(p => p.title.trim().toLowerCase())).size, POSTS.length, 'Unique article titles');
assert.equal(new Set(POSTS.map(p => p.metaDescription.trim().toLowerCase())).size, POSTS.length, 'Unique article descriptions');
for (const p of POSTS) {
  const cardImage = articleCardImagePath(p.image).replace(/^\/art\//, '');
  const socialImage = articleShareImagePath(p.image).replace(/^\/art\//, '');
  const cardPath = path.join(__dirname, '..', 'public', 'art', cardImage);
  const socialPath = path.join(__dirname, '..', 'public', 'art', socialImage);
  assert.ok(fs.existsSync(cardPath), `${p.slug}: card image exists`);
  assert.ok(fs.existsSync(socialPath), `${p.slug}: social image exists`);
  assert.deepEqual(articleImageDimensions(p.image), rasterDimensions(socialPath), `${p.slug}: social and schema dimensions match the asset`);
  if (/\.(png|jpe?g)$/.test(cardPath)) assert.deepEqual(articleImageDimensions(p.image), rasterDimensions(cardPath), `${p.slug}: rendered dimensions match the asset`);
  const sectionIds = p.sections.map(s => sectionId(s.heading));
  assert.ok(sectionIds.every(Boolean), `${p.slug}: nonempty section anchors`);
  assert.equal(new Set(sectionIds).size, sectionIds.length, `${p.slug}: unique section anchors`);
  for (const [, href] of JSON.stringify(p).matchAll(/\]\((\/[^)]+)\)/g)) {
    const target = href.split(/[?#]/)[0];
    if (!target.startsWith('/go/')) assert.ok(localRoutes.has(target), `${p.slug}: local link ${href} exists`);
  }
  if (p.faqs.length) assert.deepEqual(faqPageSchema(p.faqs).mainEntity.map(q => [q.name, q.acceptedAnswer.text]), p.faqs.map(f => [f.question, f.answer]), `${p.slug}: FAQ schema mirrors visible questions and answers`);
  if (p.image === 'reflection-beam-hardware') {
    const png = fs.readFileSync(cardPath);
    assert.equal(png[0], 0x89, `${p.slug}: generated thumbnail has PNG signature`);
    assert.equal(png[1], 0x50, `${p.slug}: generated thumbnail has PNG signature`);
    assert.ok(png.length < 2_500_000, `${p.slug}: generated thumbnail stays optimized`);
    assert.equal(cardImage, socialImage, `${p.slug}: card and social metadata use the same image`);
  }
  if (p.image === 'ai-week-roundup-2026') {
    const jpeg = fs.readFileSync(cardPath);
    assert.equal(jpeg[0], 0xff, `${p.slug}: generated thumbnail has JPEG signature`);
    assert.equal(jpeg[1], 0xd8, `${p.slug}: generated thumbnail has JPEG signature`);
    assert.ok(jpeg.length < 250_000, `${p.slug}: generated thumbnail stays optimized`);
    assert.equal(cardImage, socialImage, `${p.slug}: card and social metadata use the same image`);
  }
  assert.ok(p.sources?.length, `${p.slug}: primary sources required`);
  assert.ok(p.title.trim() && p.metaDescription.trim(), `${p.slug}: title and description required`);
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
