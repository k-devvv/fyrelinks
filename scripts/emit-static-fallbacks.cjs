// Emits static equivalents of the two Cloudflare Pages Functions, so the export
// also works on a host that does not run them.
//
// This exists because main was deployed to Netlify while the Pages Functions
// were the only thing serving /feed.xml and /go/<slug>, and both returned 404 in
// production. Netlify honours _headers and _redirects — they are its own formats
// — but ignores functions/.
//
// /feed.xml is always written. It is a plain static file, so on a host running
// the Function the Function still answers and keeps the Accept negotiation that
// sends browsers to /rss; where it does not run, readers still get valid XML.
//
// /go/<slug> redirects are written ONLY for a Netlify build. On Cloudflare the
// Function resolves each slug against the Pages project's FYRE_AFF_* variables
// at request time; a static redirect baked at build time could shadow it and
// silently drop affiliate tracking, which would look like it was working.
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

require.extensions['.ts'] = (m, f) =>
  m._compile(
    ts.transpileModule(fs.readFileSync(f, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true }
    }).outputText,
    f
  );

const { feedResponse } = require('../lib/feed.ts');
const { REDIRECT_MAP, resolveRedirect } = require('../lib/redirects.ts');
const { SITE_URL } = require('../lib/editorial.ts');

const out = path.join(__dirname, '..', 'out');

(async () => {
  if (!fs.existsSync(out)) {
    console.error('No out/ directory. Run next build first.');
    process.exitCode = 1;
    return;
  }

  // ?format=xml bypasses the Accept negotiation, giving the feed body itself.
  const response = feedResponse(new Request(`${SITE_URL}/feed.xml?format=xml`));
  const xml = await response.text();
  if (!xml.startsWith('<?xml') || !xml.includes('<item>')) {
    console.error('Refusing to write an unexpected feed body.');
    process.exitCode = 1;
    return;
  }
  fs.writeFileSync(path.join(out, 'feed.xml'), xml);
  console.log(`Wrote out/feed.xml (${(xml.length / 1024).toFixed(0)} KB).`);


  // Content-Security-Policy, written here rather than in public/_headers because
  // frame-src depends on the ad frame origin, which is a build-time variable.
  //
  // script-src needs 'unsafe-inline': a static export has no per-request nonce,
  // and Next ships ~34 inline hydration scripts whose hashes change every build.
  // So this does not stop injected inline script. What it does stop is loading
  // script, styles, fonts or frames from origins not listed, which is the
  // supply-chain and injected-third-party class of attack.
  const adOrigin = (() => {
    const raw = process.env.NEXT_PUBLIC_AD_FRAME_ORIGIN || '';
    try { const u = new URL(raw); return u.protocol === 'https:' ? u.origin : null; } catch { return null; }
  })();

  const policy = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://images.unsplash.com https://assets.fyrelinkz.com https://www.googletagmanager.com https://www.google-analytics.com",
    "font-src 'self' data:",
    "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com",
    `frame-src ${adOrigin || "'none'"}`,
    'upgrade-insecure-requests'
  ].join('; ');

  const headersFile = path.join(out, '_headers');
  const headers = fs.readFileSync(headersFile, 'utf8');
  const marker = '  Permissions-Policy: camera=(), microphone=(), geolocation=()';
  if (!headers.includes(marker)) {
    // Failing loudly beats shipping a page with no policy and nobody noticing.
    console.error('Could not find the global header block in out/_headers; CSP not written.');
    process.exitCode = 1;
    return;
  }
  fs.writeFileSync(headersFile, headers.replace(marker, `${marker}
  Content-Security-Policy: ${policy}`));
  console.log(`Wrote CSP (frame-src ${adOrigin || "'none'"}).`);

  const staticGo = process.env.NETLIFY || process.env.FYRE_STATIC_GO_REDIRECTS === '1';
  if (!staticGo) {
    console.log('Skipping static /go/ redirects: the Pages Function resolves them per request.');
    return;
  }

  const file = path.join(out, '_redirects');
  const existing = fs.existsSync(file) ? fs.readFileSync(file, 'utf8').replace(/\s*$/, '\n') : '';
  const lines = Object.keys(REDIRECT_MAP)
    .map(slug => `/go/${slug} ${resolveRedirect(slug, process.env)} 307!`)
    .join('\n');
  fs.writeFileSync(file, `${existing}\n# Static affiliate redirects for a host without Pages Functions.\n${lines}\n`);
  console.log(`Appended ${Object.keys(REDIRECT_MAP).length} static /go/ redirects to out/_redirects.`);
})();
