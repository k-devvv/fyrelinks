# FyreLinkz

A content-first editorial publication for creative AI news, practical workflows, local hardware and model specifications. This revision uses Next.js 15.5.24, preserves all original article URLs, adds comprehensive new guides, and permanently retires the subscription calculator in favor of useful editorial content.

## Run and check

```sh
npm ci
npm run dev
npm run check
npm run build
npm run start
```

Next.js and PostCSS were patched after a dependency audit; the lockfile is updated. `npm run check` validates article sources, check dates, category/slug lookup, model directory catalog integrity and TypeScript. Browser verification is in `scripts/check-browser.cjs`; it uses Playwright and an installed Chromium browser. Optional environment overrides: `FYRE_TEST_URL`, `FYRE_TEST_OUTPUT`, `FYRE_PLAYWRIGHT_PATH`, `FYRE_CHROMIUM_PATH`. Its default artifact directory is `work/verification`.

## Editorial content

The publication includes 16 sourced articles across five categories:
- **News**: Curated reports with linked primary announcements.
- **AI video & images (`/create`)**: Workflow guides, prompt structures, model benchmarks and checkpoint comparisons.
- **Guides (`/workflow`)**: Step-by-step technical guides for ComfyUI baselines, coding assistants and async engineering.
- **Hardware (`/hardware`)**: Workstation build guides and coding display evaluation.
- **Comparisons (`/stack`)**: Direct comparisons for vector databases, scraping pipelines and B2B enrichment.

Each record in `lib/content/articles.json` has a stable slug, category, title, description, topic, image key, takeaway, sections with subpoints, and primary source citations. `sourceIds` on a section refers to the 1-based position in that article's sources array, rendered as visible source citations.

All articles are original writing grounded in official documentation and primary sources. No benchmark is published without documented test parameters, and no rankings or earnings are ever promised.

## Page and metadata structure

- `lib/catalog.ts`: article and category lookups; related reading algorithms.
- `lib/editorial.ts`: typed article records, URLs, dates and reading time calculations.
- `lib/metadata.ts`: shared route metadata, OpenGraph and Twitter cards.
- `components/Navbar.tsx`: client-side search dialog, keyboard shortcuts (`Ctrl+K`) and mobile navigation.
- `app/[category]/[slug]/page.tsx`: source-backed article template with table of contents, visible sources, inline links and related articles.
- `app/ai-video-models/page.tsx`: searchable and filterable directory of 200+ video model options and rates.
- `next.config.js`: permanent 308 redirect from legacy `/tools/video-cost` to `/create/ai-video-generation-matrix-minimax-higgsfield-seedance`.
- `lib/feed.ts` served by `functions/feed.xml.js`: RSS 2.0 feed of every article, with
  `Accept` negotiation that sends browsers to `/rss`.
- `app/sitemap.ts` and `app/robots.ts`: crawlable sitemap (27 URLs) and robot instructions.

Unknown URLs return 404. Structured data adheres to schema.org Article or NewsArticle specifications, including breadcrumbs and publisher identities.

## Artwork

Original illustrations live in `public/art` (SVGs for UI rendering and 1200x750 PNGs for metadata and social previews). All images correspond directly to their subject matter.

## Advertising & Monetization Readiness

No ad-network scripts run on the live site. Monetization readiness is structured as follows:

1. **Direct Sponsorships**: Can be enabled at build time using `FYRE_SPONSOR_TITLE` and `FYRE_HOME_SPONSOR_URL` / `FYRE_ARTICLE_SPONSOR_URL`. Configured sponsorships reserve designated slots and qualify links with `rel="sponsored"`.
2. **Display-ad integration is not yet active**: `public/ads.txt` contains comments only; no seller is declared. `components/AdSlot.tsx` does not load an ad network. Add an approved partner, certified CMP/required regional controls, real seller records, and a consent-aware ad loader before enabling inventory. The existing analytics preference is not ad consent.

See `docs/marketing-operations.md` for audience priorities, network selection gates and launch checks.

## Hosting and deployment

The site builds to a static export in `out/` and is served by Cloudflare Pages on the free
plan.

Hosting history matters for reading older docs: production ran on Vercel until mid-October
2026 (`docs/evidence/owned-pages-http-2026-10-10.json` records `vercelCache` hits), then
moved to Netlify. The move to Cloudflare is driven by Netlify's credit-metered free tier,
which a content site with artwork consumes steadily, and by Cloudflare placing no
non-commercial restriction on free accounts and not metering static bandwidth. Vercel's
Hobby plan does restrict free use to non-commercial personal use, which this site's
affiliate links and display advertising would not fit, so it is not a fallback either.

Build command `npm run build`, output directory `out`. `npm run preview` serves the export
and both Functions locally; `npm run deploy` publishes. Both call `wrangler` through `npx`,
so nothing needs installing.

### Why a scheduled rebuild

`app/page.tsx` and `app/live/page.tsx` previously used `revalidate = 3600` to refresh the
ten RSS sources in `lib/live-news.ts`. A static export has no request-time revalidation, so
`.github/workflows/scheduled-rebuild.yml` rebuilds and redeploys every two hours instead.
Headlines are therefore up to two hours old rather than one. The build runs in GitHub
Actions and deploys by direct upload, so the cadence is bounded by Actions minutes rather
than the 500 Cloudflare Pages builds a month on the free plan.

### Two Pages Functions

Everything else is a static file. Only these invoke a Worker, so the free request quota is
not a practical constraint:

- `functions/go/[slug].js` — outbound affiliate redirects (307, `noindex`, `no-store`),
  resolving slugs from `lib/redirects.ts` against the Pages environment.
- `functions/feed.xml.js` — `/feed.xml` negotiates on the `Accept` header to send browsers
  to `/rss`, which a static file cannot do. The logic lives in `lib/feed.ts` so the feed
  verifier tests the same code that serves it.

### Static fallbacks, so either host works

`scripts/emit-static-fallbacks.cjs` runs after the build and writes static
equivalents of both Functions, because deploying this export to a host that does not run
them returned 404 for `/feed.xml` and every `/go/<slug>` in production.

- `out/feed.xml` is always written. Where the Function runs it still answers and keeps the
  `Accept` negotiation that sends browsers to `/rss`; elsewhere readers get valid XML.
- Static `/go/<slug>` redirects are appended to `out/_redirects` **only** when `NETLIFY` is
  set, or `FYRE_STATIC_GO_REDIRECTS=1`. On Cloudflare the Function resolves each slug
  against the Pages project's `FYRE_AFF_*` variables per request; a redirect baked at build
  time could shadow it and silently drop affiliate tracking while appearing to work.
- `public/_headers` marks `/go/*` `noindex, nofollow` and `no-store` on either host, so a
  static redirect is treated the same as the Function's own response.

A Netlify build needs the `FYRE_AFF_*` values in its own build environment for the static
redirects to carry tracking, since they are baked in rather than read per request.

### Display advertising needs a second project

`adFrameUrl` refuses to load the ad frame from the site's own origin, which is deliberate:
scripts in a same-origin frame would have same-origin access to the page. Deploy `out/` to a
second Cloudflare Pages project and set `NEXT_PUBLIC_AD_FRAME_ORIGIN` to that project's
origin. Left unset, no ad frame loads and no ad request is made.

### Cutover checklist

1. Leave `app/privacy/page.tsx` alone until DNS moves. It currently names Netlify, which is
   correct while Netlify serves the domain. The moment Cloudflare serves it, replace
   "The production website uses Netlify" and the Netlify privacy link with Cloudflare and
   <https://www.cloudflare.com/privacypolicy/>. Deploying to `*.pages.dev` does not require
   the change; moving the domain does.
2. Create the Pages project; set the build command and output directory above, or use the
   workflow and deploy by direct upload.
3. Add repository variables `CLOUDFLARE_PROJECT_NAME` and `NEXT_PUBLIC_AD_FRAME_ORIGIN`, and
   secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
4. Add the `FYRE_AFF_*` variables from `.env.example` to the **Pages project**, not the
   workflow: the `/go/` Function reads them at request time. Unset means a plain link that
   earns nothing.
5. Move the custom domain, then confirm `/go/minimax` returns 307 with `X-Robots-Tag:
   noindex`, `/tools/video-cost` returns 308, and `/feed.xml` still serves XML to a reader
   and redirects a browser to `/rss`.

## Verification

Run `node scripts/check-http.cjs` against a running production preview. See `docs/marketing-operations.md` for editorial operations, measurement details, distribution suggestions and compliance guidelines.
