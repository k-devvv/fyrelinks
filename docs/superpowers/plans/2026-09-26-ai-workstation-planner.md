# AI Workstation Planner Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a useful, accessible, crawlable hardware planner that recommends local-AI systems by country, budget, workload, and upgrade path, with dated sources and no invented performance claims.

**Architecture:** Keep researched hardware data and pure recommendation logic in `lib/hardware-planner/`; render explanation, methodology, and metadata on the server at `/hardware/ai-workstation-planner`; isolate form state in a small client component. Add that route to hardware discovery and sitemap, and emit only consent-gated aggregate analytics fields.

**Tech Stack:** Next.js 15 App Router, React 18, TypeScript, existing CSS variables/design system, Node assert + TypeScript transpilation checks, existing repository content/catalog checks.

---

## File map

- Create `lib/hardware-planner/types.ts` for market, workload, path, candidate, source, and recommendation types.
- Create `lib/hardware-planner/catalog.ts` for a small manually sourced set of candidate parts/build profiles, per-market prices, checked dates, and primary URLs.
- Create `lib/hardware-planner/recommend.ts` for pure validation, fit explanations, budget fit, and deterministic ranking.
- Create `components/HardwarePlanner.tsx` for labeled form controls, inline errors, recommendation cards, disclosures, guide/source links, and safe analytics events.
- Create `app/hardware/ai-workstation-planner/page.tsx` for server-rendered intro, methodology, limitations, FAQ content, canonical metadata, and client component mount.
- Modify `app/sitemap.ts` to list the planner route.
- Modify `app/[category]/page.tsx` to link the tool prominently on the hardware category page only.
- Modify `components/Analytics.tsx` to whitelist new planner event names and fixed safe properties; never transmit budget.
- Modify `lib/measurement.ts` to type the new event names/properties.
- Create `scripts/verify-hardware-planner.cjs` to validate catalogue integrity, sources, dates, coverage, and recommendation edge cases.
- Modify `package.json` `check` script to run the planner verifier.
- Modify `app/globals.css` with responsive planner and result-card styles that use existing design tokens and reduced-motion defaults.

## Task 1: Define types and build verified catalogue

**Files:**
- Create: `lib/hardware-planner/types.ts`
- Create: `lib/hardware-planner/catalog.ts`
- Test: `scripts/verify-hardware-planner.cjs`

- [ ] **Step 1: Define the typed planner contract**

Create unions for `MarketId = "us" | "uk" | "ca" | "de"`, `WorkloadId = "comfyui-image" | "comfyui-video" | "local-llm" | "mixed"`, and `SystemPath = "desktop-build" | "desktop-upgrade" | "laptop"`. Define `SourceRef` as `{ label: string; url: string }`; `MarketPrice` as `{ amount: number | null; currency: "USD" | "GBP" | "CAD" | "EUR"; checkedAt: string | null; source: SourceRef | null }`; `HardwareCandidate` with stable `id`, `name`, path, supported workloads, GPU memory, system RAM, storage, PSU/platform note, required parts, and `prices: Record<MarketId, MarketPrice>`; and `Recommendation` as candidate plus `fit: "strong" | "constrained" | "over-budget"`, reasons, caveats, and numeric estimated total only when complete price data exists.

- [ ] **Step 2: Research a deliberately small candidate catalogue**

Use manufacturer/official documentation for specifications and identifiable retailer listings for local price examples in the four markets. Add 6–10 candidates across desktop-build, desktop-upgrade, and laptop paths, with at least one candidate for each workload where a credible fit can be described. For each non-null market price, record a direct HTTPS source and ISO `YYYY-MM-DD` check date. Unknown/unverified prices must be represented as `amount: null`, `checkedAt: null`, `source: null`; do not convert currencies or estimate unseen prices. Treat Germany only as a EUR reference. Include source URLs for relevant component specs.

- [ ] **Step 3: Add a failing catalogue integrity verifier**

In `scripts/verify-hardware-planner.cjs`, load the TypeScript module using the same `require.extensions['.ts']` transpilation pattern as `scripts/verify-catalog.cjs`. Assert unique candidate IDs; valid market/workload/path unions; finite positive prices or exact null triples; HTTPS URLs; valid check dates; and candidate coverage across every system path and workload. Assert any price older than 30 days is identifiable as stale using `new Date("2026-09-26T00:00:00Z")` as the test clock.

- [ ] **Step 4: Run verifier and ensure it catches invalid data**

Run: `node scripts/verify-hardware-planner.cjs`
Expected: initially fails until catalog exists; after Step 2 it prints `Hardware planner catalog verified: <candidate count> candidates across 4 markets.` Also temporarily set one test fixture price to `NaN` inside the verifier, assert rejection, then remove fixture mutation before commit.

- [ ] **Step 5: Commit catalogue layer**

```bash
git add lib/hardware-planner/types.ts lib/hardware-planner/catalog.ts scripts/verify-hardware-planner.cjs
git commit -m "feat: add sourced hardware planner catalog"
```

## Task 2: Implement pure recommendation and validation rules

**Files:**
- Create: `lib/hardware-planner/recommend.ts`
- Modify: `scripts/verify-hardware-planner.cjs`

- [ ] **Step 1: Specify function inputs and deterministic output**

Implement exported `recommendHardware(input, now = new Date("2026-09-26T00:00:00Z"))`, where input is `{ market: MarketId; budget: number; workload: WorkloadId; path: SystemPath }`. Return `{ error: string | null; recommendations: Recommendation[]; stalePriceCount: number }`. Reject non-finite, non-positive, and over-market-limit budgets with an error; market limits are explicit constants in the function and use that market's currency, never conversion.

- [ ] **Step 2: Test invalid inputs and stale-price handling**

Add assertions for zero, negative, `NaN`, over-limit and valid budgets; ensure an unknown market fails closed. A price is fresh only when its check date is no older than 30 days from injected `now`; stale prices cannot determine affordability or “best value”. Candidates with unknown or stale price remain eligible for fit guidance but receive no price-ranked claim or numeric total.

- [ ] **Step 3: Implement workload/path fit explanations**

Use a documented local rules table: ComfyUI image/video fit considers GPU memory first; local LLM considers GPU memory and system RAM; mixed considers both. Rules may label a candidate strong/constrained using published specifications, but never predict speed or guarantee model compatibility. Laptop/multi-GPU caveats remain explicit. Filter by path and workload, sort priced fresh candidates by fit then total ascending, and place unpriced/stale candidates after currently priced results without assigning fake totals. When budget fits nothing, return conservative candidates with `over-budget` labels and a workload adjustment note.

- [ ] **Step 4: Verify edge cases**

Run: `node scripts/verify-hardware-planner.cjs`
Expected: exit code 0 and output `Hardware planner rules verified: validation, ranking, stale prices, and no-fit cases.`

- [ ] **Step 5: Commit recommendation layer**

```bash
git add lib/hardware-planner/recommend.ts scripts/verify-hardware-planner.cjs
git commit -m "feat: rank hardware by workload and budget"
```

## Task 3: Build accessible client planner and consent-safe events

**Files:**
- Create: `components/HardwarePlanner.tsx`
- Modify: `lib/measurement.ts`
- Modify: `components/Analytics.tsx`
- Test: `scripts/verify-hardware-planner.cjs`

- [ ] **Step 1: Extend the strict analytics event contract**

Add names `planner_start`, `planner_complete`, `planner_market`, `planner_guide_click`, and `planner_source_click` to `MeasurementName` and `allowedEvents`. Add only fixed enum properties `market`, `workload`, `path`, and `placement` to the allowlist in `Analytics.tsx`, validating each against a constant pattern or explicit values. Do not add `budget`, free text, device identifiers, or arbitrary URLs. Analytics stays gated by existing consent and DNT/GPC behavior.

- [ ] **Step 2: Implement semantic form and state flow**

Create a client component with visible `<label>` controls for market, budget/currency, workload, and path; choose defaults only to demonstrate input controls and do not show results before the visitor runs the planner. Use controlled state and call `recommendHardware` on submit. Show inline invalid-budget guidance, announce completion/errors in `role="status"` or `aria-live="polite"`, preserve focus, and never put inputs in URL, local storage, or cookies. Fire `planner_start` on first meaningful interaction and `planner_complete` with market/workload/path only after valid submission. Keep calculation inputs local.

- [ ] **Step 3: Render useful recommendation cards**

For each result show fit label, exact estimate when fresh price data supports it, currency, itemized split, last-checked date, source links, likely constraints, what does not fit, and contextual internal guide links. Show stale/missing price state without numeric totals; clearly say retailer stock, taxes, shipping, and compatibility can change. Include “planning estimate, not benchmark” disclosure. Give outbound source links descriptive accessible names, `target="_blank"`, and `rel="noopener noreferrer"`. Track guide and source clicks with fixed placement and enum fields only.

- [ ] **Step 4: Add testable event privacy assertions**

Extend the Node verifier with assertions that new event names and dimensions are explicitly allowlisted in `components/Analytics.tsx`, and `budget` is absent from the measurement field loop and dispatched planner event properties. Verify `lib/measurement.ts` exports the planner event names.

- [ ] **Step 5: Commit UI and analytics contract**

```bash
git add components/HardwarePlanner.tsx components/Analytics.tsx lib/measurement.ts scripts/verify-hardware-planner.cjs
git commit -m "feat: add accessible hardware planner interface"
```

## Task 4: Publish crawlable server-rendered route and discovery links

**Files:**
- Create: `app/hardware/ai-workstation-planner/page.tsx`
- Modify: `app/sitemap.ts`
- Modify: `app/[category]/page.tsx`

- [ ] **Step 1: Add static route with canonical metadata**

Render a server component at `/hardware/ai-workstation-planner`. Use `pageMetadata("AI Workstation Planner", concise accurate description, "/hardware/ai-workstation-planner")`. Server-render an explanatory heading, intended users, supported markets/workloads/paths, method, data sources, 30-day freshness policy, limits, Germany/EU note, FAQ, and link to related hardware guide before mounting `<HardwarePlanner />`. Add breadcrumb JSON-LD using existing `generateBreadcrumbSchema` and `SITE_URL` conventions. No client-only SEO body text.

- [ ] **Step 2: Add sitemap URL**

Add `"/hardware/ai-workstation-planner"` to the static URL list in `app/sitemap.ts`; preserve all existing entries and last-modified date logic.

- [ ] **Step 3: Link from hardware category**

In `app/[category]/page.tsx`, render a visible internal link to the planner only when `c.slug === "hardware"`, before the story grid. Use plain user-facing text that describes planning by budget and country. Existing categories remain unchanged.

- [ ] **Step 4: Verify route, metadata, and discovery**

Run: `npm run check`
Expected: exit code 0, content/catalog verifier summaries, and TypeScript emits no errors. Inspect generated sitemap from the production server in Task 6.

- [ ] **Step 5: Commit public route**

```bash
git add app/hardware/ai-workstation-planner/page.tsx app/sitemap.ts 'app/[category]/page.tsx'
git commit -m "feat: publish crawlable workstation planner"
```

## Task 5: Style responsive planner and add it to project checks

**Files:**
- Modify: `app/globals.css`
- Modify: `package.json`
- Modify: `scripts/verify-hardware-planner.cjs`

- [ ] **Step 1: Add token-based responsive styles**

Style planner form, result cards, source/date rows, fit labels, and empty/error states with existing `--paper`, `--ink`, `--muted`, `--line`, and `--accent`. At narrow viewport widths use one-column layout, controls at least 44px high, no fixed-width tables, no horizontal page overflow, and visible keyboard focus. Follow existing dark/light theme selectors and `prefers-reduced-motion`; planner itself needs no animation dependency.

- [ ] **Step 2: Integrate the verifier in `npm run check`**

Update the `check` script from `node scripts/verify-content.cjs && node scripts/verify-catalog.cjs && tsc --noEmit` to `node scripts/verify-content.cjs && node scripts/verify-catalog.cjs && node scripts/verify-hardware-planner.cjs && tsc --noEmit`.

- [ ] **Step 3: Run full static checks**

Run: `npm run check`
Expected: existing content and video catalog checks pass, planner verifier prints both catalogue and rules summaries, and `tsc --noEmit` exits 0.

- [ ] **Step 4: Commit styling and project check**

```bash
git add app/globals.css package.json package-lock.json scripts/verify-hardware-planner.cjs
git commit -m "style: finish responsive hardware planner"
```

## Task 6: Production and browser verification

**Files:**
- Test: production build and deployed-route behavior

- [ ] **Step 1: Build production app**

Run: `npm run build`
Expected: build completes, `/hardware/ai-workstation-planner` appears as a statically rendered route, and no TypeScript/build errors appear.

- [ ] **Step 2: Run local HTTP/browser checks**

Run: `npm run start` in one terminal. In another, run `node scripts/check-http.cjs` and `node scripts/check-browser.cjs` following their existing documented arguments. Expected: route returns HTTP 200, page title/canonical are correct, planner controls work, and browser console has no uncaught errors.

- [ ] **Step 3: Validate interactions and privacy in browser**

Use a 390px-wide viewport and desktop. Complete flow with keyboard only; test invalid, no-fit, fresh-price, stale-price, and unknown-price cases; test light and dark mode; verify no horizontal overflow, labels/focus/live announcement, source destinations, and that URL/local storage contain no budget. Verify analytics event payload never contains budget and no events fire without consent. Check reduced-motion behavior.

- [ ] **Step 4: Inspect sitemap and source coverage**

Request `/sitemap.xml`; assert it contains `https://www.fyrelinkz.com/hardware/ai-workstation-planner`. For every displayed exact price/spec, open or validate its recorded source; confirm price check date is at most 30 days old for any price-ranked result.

- [ ] **Step 5: Commit only after verification**

```bash
git status --short
git add app components lib scripts package.json package-lock.json
git commit -m "test: verify hardware planner production flow"
```

## Self-review against approved spec

- Countries/currencies, budget, workloads, desktop-build/upgrade/laptop paths: Tasks 1–3.
- Sourced prices/specs, dates, 30-day staleness, no live price API or fake totals: Tasks 1–2.
- Deterministic fit, unknown/no-fit/stale outcomes and no performance guarantees: Task 2.
- Accessible interactive flow and light/dark/mobile support: Tasks 3 and 5–6.
- Server-rendered SEO copy, canonical, breadcrumb, sitemap, category link: Task 4.
- Consent-safe analytics with no budget or free text: Task 3.
- Sources, methodology, limitations and guides: Tasks 3–4.
- Content checks, typecheck, build, HTTP and browser checks: Tasks 5–6.
- Later ComfyUI troubleshooter, video planner, ads/affiliate system and backend are excluded as independent future releases.

