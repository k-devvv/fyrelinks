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
- `app/feed.xml`: RSS 2.0 feed containing all 16 articles.
- `app/sitemap.ts` and `app/robots.ts`: crawlable sitemap (27 URLs) and robot instructions.

Unknown URLs return 404. Structured data adheres to schema.org Article or NewsArticle specifications, including breadcrumbs and publisher identities.

## Artwork

Original illustrations live in `public/art` (SVGs for UI rendering and 1200x750 PNGs for metadata and social previews). All images correspond directly to their subject matter.

## Advertising & Monetization Readiness

No ad-network scripts run on the live site. Monetization readiness is structured as follows:

1. **Direct Sponsorships**: Can be enabled at build time using `FYRE_SPONSOR_TITLE` and `FYRE_HOME_SPONSOR_URL` / `FYRE_ARTICLE_SPONSOR_URL`. Configured sponsorships reserve designated slots and qualify links with `rel="sponsored"`.
2. **Display-ad integration is not yet active**: `public/ads.txt` contains comments only; no seller is declared. `components/AdSlot.tsx` does not load an ad network. Add an approved partner, certified CMP/required regional controls, real seller records, and a consent-aware ad loader before enabling inventory. The existing analytics preference is not ad consent.

See `docs/marketing-operations.md` for audience priorities, network selection gates and launch checks.

## Verification

Run `node scripts/check-http.cjs` against a running production preview. See `docs/marketing-operations.md` for editorial operations, measurement details, distribution suggestions and compliance guidelines.
