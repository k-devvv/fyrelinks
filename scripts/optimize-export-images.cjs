// Re-encodes the exported images in place, after next build.
//
// output: "export" forces images.unoptimized, so whatever sits in public/ is
// what every device downloads: no resizing, no WebP, no optimizer. This step
// recovers most of what Vercel's optimizer used to do, without changing any
// filename, so no markup, article record or verifier has to know about it.
//
// Source artwork in public/ is never touched: only the copies in out/. Format is
// preserved for the same reason. PNG re-encoding uses palette quantization at
// high quality, which is lossy; set FYRE_SKIP_IMAGE_OPTIMIZE=1 to skip entirely.
const fs = require('node:fs');
const path = require('node:path');

if (process.env.FYRE_SKIP_IMAGE_OPTIMIZE === '1') {
  console.log('Image optimization skipped (FYRE_SKIP_IMAGE_OPTIMIZE=1).');
  return;
}

let sharp;
try { sharp = require('sharp'); }
catch {
  // Not a build failure: the export is correct, just heavier than it should be.
  console.warn('sharp unavailable; exported images left unoptimized.');
  return;
}

const root = path.join(__dirname, '..', 'out');
// Below this, re-encoding costs build time for no useful saving.
const FLOOR = 100 * 1024;
const MAX_WIDTH = 1600;

function list(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) list(full, out);
    else if (/\.(png|jpe?g)$/i.test(entry.name) && fs.statSync(full).size > FLOOR) out.push(full);
  }
  return out;
}

(async () => {
  if (!fs.existsSync(root)) {
    console.error('No out/ directory. Run next build first.');
    process.exitCode = 1;
    return;
  }

  let before = 0, after = 0, changed = 0;
  for (const file of list(root)) {
    const source = fs.readFileSync(file);
    const original = source.length;
    before += original;
    try {
      const png = /\.png$/i.test(file);
      // Decode from a Buffer, never the path: these writes overwrite the file
      // being read, and on Windows the second open of a streamed path fails.
      let pipeline = sharp(source).rotate();
      const { width } = await pipeline.metadata();
      if (width && width > MAX_WIDTH) pipeline = pipeline.resize({ width: MAX_WIDTH });
      const buffer = await (png
        ? pipeline.png({ compressionLevel: 9, effort: 10, palette: true, quality: 90 })
        : pipeline.jpeg({ quality: 80, progressive: true, mozjpeg: true })
      ).toBuffer();

      // Keep whichever is smaller, so a well-optimized source is never inflated.
      if (buffer.length < original) {
        fs.writeFileSync(file, buffer);
        after += buffer.length;
        changed++;
      } else {
        after += original;
      }
    } catch (error) {
      after += original;
      console.warn(`Left ${path.relative(root, file)} as-is: ${error.message}`);
    }
  }

  const mb = n => (n / 1048576).toFixed(1) + ' MB';
  console.log(changed
    ? `Optimized ${changed} exported images: ${mb(before)} to ${mb(after)}.`
    : 'No exported image could be made smaller.');
})();
