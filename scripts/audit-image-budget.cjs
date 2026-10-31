// Reports served images above a weight budget. Not part of `npm run check`,
// because failing the build would stop the scheduled rebuild deploying; this is
// a report to act on, not a gate.
//
// It matters because next.config sets images.unoptimized (required by
// output: "export"), so every image is served at full size to every device with
// no WebP conversion. Vercel's optimizer used to hide this.
const fs = require('node:fs');
const path = require('node:path');

const BUDGET = Number(process.env.FYRE_IMAGE_BUDGET_KB || 300) * 1024;
const root = path.join(__dirname, '..', 'out');
if (!fs.existsSync(root)) {
  console.error('No out/ directory. Run npm run build first.');
  process.exitCode = 1;
  return;
}

const found = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) { walk(full); continue; }
    if (!/\.(png|jpe?g|gif|webp|avif)$/i.test(entry.name)) continue;
    const { size } = fs.statSync(full);
    if (size > BUDGET) found.push({ file: path.relative(root, full), size });
  }
})(root);

found.sort((a, b) => b.size - a.size);
const total = found.reduce((sum, f) => sum + f.size, 0);
const kb = n => (n / 1024).toFixed(0) + ' KB';

for (const f of found) console.log(`${kb(f.size).padStart(8)}  ${f.file}`);
console.log(found.length
  ? `\n${found.length} images over ${kb(BUDGET)}, ${kb(total)} total. Convert to WebP or resize in scripts/generate-art.cjs.`
  : `All served images within ${kb(BUDGET)}.`);
