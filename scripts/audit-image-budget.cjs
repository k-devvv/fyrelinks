// Reports served images above a weight budget, after a build.
//
// It matters because next.config sets images.unoptimized (required by
// output: "export"), so there is no request-time optimizer: whatever is in the
// export is what the device downloads.
//
// In-page images are held to a strict budget because every reader pays for them.
// Share images (OpenGraph/Twitter) are fetched once by a crawler and are
// deliberately PNG or JPEG, since crawler WebP support is less reliable, so they
// get a looser budget. Judging both by one number produced false alarms.
//
// Deliberately not part of `npm run check`: failing there would stop the
// scheduled rebuild from deploying, making stale headlines the price of a heavy
// image. This is a report to act on, not a gate.
const fs = require('node:fs');
const path = require('node:path');

const IN_PAGE_KB = Number(process.env.FYRE_IMAGE_BUDGET_KB || 300);
const SHARE_KB = Number(process.env.FYRE_SHARE_IMAGE_BUDGET_KB || 1024);
const root = path.join(__dirname, '..', 'out');
const IMAGE = /\.(png|jpe?g|gif|webp|avif)$/i;

if (!fs.existsSync(root)) {
  console.error('No out/ directory. Run npm run build first.');
  process.exitCode = 1;
  return;
}

function walk(dir, visit) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, visit);
    else visit(full);
  }
}

// Anything an <img> or srcset actually points at is a cost every reader pays.
const rendered = new Set();
walk(root, file => {
  if (!/\.html?$/i.test(file)) return;
  const html = fs.readFileSync(file, 'utf8');
  for (const match of html.matchAll(/(?:src|srcset)="([^"]+)"/g)) {
    for (const candidate of match[1].split(',')) {
      const url = candidate.trim().split(/\s+/)[0];
      if (url.startsWith('/') && IMAGE.test(url)) rendered.add(decodeURI(url).slice(1));
    }
  }
});

const over = { page: [], share: [] };
walk(root, file => {
  if (!IMAGE.test(file)) return;
  const relative = path.relative(root, file).split(path.sep).join('/');
  const { size } = fs.statSync(file);
  const inPage = rendered.has(relative);
  const budget = (inPage ? IN_PAGE_KB : SHARE_KB) * 1024;
  if (size > budget) over[inPage ? 'page' : 'share'].push({ relative, size });
});

const kb = n => (n / 1024).toFixed(0) + ' KB';
const report = (label, list, budget) => {
  list.sort((a, b) => b.size - a.size);
  if (!list.length) {
    console.log(`${label}: all within ${budget} KB.`);
    return;
  }
  console.log(`${label}: ${list.length} over ${budget} KB, ${kb(list.reduce((s, f) => s + f.size, 0))} total`);
  for (const f of list) console.log(`  ${kb(f.size).padStart(8)}  ${f.relative}`);
};

console.log(`${rendered.size} distinct images referenced by pages.\n`);
report('In-page', over.page, IN_PAGE_KB);
report('Share and unreferenced', over.share, SHARE_KB);
if (over.page.length) console.log('\nIn-page offenders: add a WebP variant and point the card path at it.');
