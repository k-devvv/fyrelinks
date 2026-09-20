# FyreLinkz Implementation Plan

**Goal:** Deliver the approved editorial redesign with sourced content and verifiable SEO improvements.

**Architecture:** Next.js server-rendered pages use typed static content. Small client components handle search and a cost calculator. Local artwork and route metadata are generated at build time.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind, CSS, Node assertions, Playwright.

- [x] Content foundation: add `lib/editorial.ts`, `lib/content/*.json`, source records and computed reading times; rewrite `lib/posts.ts` preserving eleven URLs; add recent news. Verify with `node scripts/verify-content.cjs`.
- [x] Editorial shell: replace `app/layout.tsx`, `app/globals.css`, `components/Navbar.tsx`, `components/Footer.tsx`; use a compact search index and accessible native dialog. Keep generic info pages legible while replacing unsupported About claims.
- [x] Browsing: replace homepage, category and article templates; add `components/StoryCard.tsx`, source section, contents and related stories. Every internal story link uses its real category and slug.
- [x] Original visuals: author vector editorial assets and render PNG versions for article schema/social metadata. Set explicit image dimensions and sizes.
- [x] SEO and useful features: strict route matching, metadata helpers, breadcrumbs, sitemap and RSS; add cost calculator at `/tools/video-cost`; configured-only ad placements.
- [x] Validation: run content assertions, TypeScript and production build, then HTTP and desktop/mobile functional checks. Capture user-facing screenshots and document remaining deployment settings.
- [x] Delivery: generate change manifest and source archive; request narrowly scoped write permission only when the verified changes are ready to apply to `C:/Users/krish/Downloads/fyrelinks`. Recheck originals against baseline hashes before copying changed files.

Acceptance checks: wrong-category article URL must return 404; each live story has HTTPS sources and a real date; each page has one canonical and one H1; article share image exists; RSS parses; empty search and keyboard dismissal work; calculator cannot produce NaN or Infinity; no mobile horizontal page overflow.
