# Local-AI PC Upgrade Guide Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish one accurate, high-intent local-AI PC upgrade/build decision guide with real licensed photography, visible FAQs, and verified structured metadata.

**Architecture:** Extend the existing typed article JSON pipeline with optional visible FAQs, render them on the static article route, and keep schema output aligned with reader-visible content. Add one original article to the canonical JSON catalog, use the existing planner as its primary tool link, and store properly licensed real photography in the existing image formats.

**Tech Stack:** Next.js 15 App Router, React 18, TypeScript, JSON editorial catalog, Node content checks, existing Next image/art pipeline, native HTML disclosure elements.

---

## Files and responsibilities

- lib/editorial.ts: FAQ source type and mapping from JSON article inputs to editorial posts.
- lib/content/articles.json: first upgrade guide, citations, FAQs, and publication/update/source-check dates.
- app/[category]/[slug]/page.tsx: accessible visible FAQ rendering.
- components/JsonLd.tsx: Article/Breadcrumb data and matching visible FAQ structured data.
- scripts/verify-content.cjs: check FAQ validity and uniqueness alongside existing source, image, and date rules.
- public/art/local-ai-pc-upgrade-photo.jpg and public/art/local-ai-pc-upgrade-photo.webp: real photo used for share and card images.
- docs/editorial-image-credits.md: image source, photographer, license, access date, crop, and credit.

## Task 1: Add FAQ support to the editorial data model

**Files:** lib/editorial.ts, scripts/verify-content.cjs

- [ ] Add FAQ question and answer string type; make the field optional on article input and output.
- [ ] Map input FAQs in articleFromInput rather than hardcoding an empty array.
- [ ] Add optional photo caption, photographer credit, and source URL to ArticleInput and EditorialPost so the page does not mislabel this real photograph as AI-generated.
- [ ] Extend content checks: supplied FAQ questions and answers must be non-empty after trimming; normalized questions must be unique. Keep FAQs optional on existing content.
- [ ] Run node scripts/verify-content.cjs; expect the existing content-check success line.

## Task 2: Render visible FAQs and matching structured data

**Files:** app/[category]/[slug]/page.tsx, components/JsonLd.tsx, app/globals.css, scripts/verify-content.cjs

- [ ] Add the FAQ anchor to the article table of contents only when FAQs exist.
- [ ] Render native details/summary disclosures after article sections and before sources, with visible question and answer text, semantic headings, and keyboard focus styling.
- [ ] Render the supplied real-photo caption and photographer credit as a source link; preserve existing captions for other articles.
- [ ] When FAQs exist, add an FAQPage node to the existing JSON-LD graph using the exact visible questions and answers; emit no FAQ node for articles without FAQs.
- [ ] Ensure no hidden-only FAQ content and no promise of Google FAQ rich-result display.
- [ ] Add a focused validation check that parsed JSON-LD matches supplied visible FAQs.
- [ ] Style separators, spacing, readable answer width, focus, light and dark themes using existing article styles.
- [ ] Run npm run check; expect exit code 0.

## Task 3: Research and write the first original guide

**Files:** lib/content/articles.json

- [ ] Apply the approved reusable prompt in docs/superpowers/specs/2026-09-27-fyrelinkz-editorial-growth-program-design.md.
- [ ] Verify current primary documentation for local-AI runtime support and model-memory constraints, GPU-vendor software compatibility, and the specific workflow documentation being discussed. Use manufacturer/model-owner sources for specs; include regional retail prices only if each price can be verified.
- [ ] Write a useful decision guide for upgrading an existing desktop, building new, buying a laptop, or selecting a workstation. Cover GPU memory/software support, system RAM/storage, CPU/platform, power/cooling/case compatibility, workload fit, costs, and a pre-purchase checklist.
- [ ] Include a direct answer near the top, a concise decision table, and 5–7 FAQs based on actual reader decisions. Explain why parameter count alone cannot establish fit/performance.
- [ ] Attribute vendor claims, distinguish estimates from measured results, and make no claim of FyreLinkz testing. Avoid undated price claims and universal “best GPU” rankings.
- [ ] Include US, UK, Canada, and selected European price examples only with named source, market/currency, checked date, stock, tax and shipping context. Otherwise explain that current prices vary and omit price ranking.
- [ ] Link only to verified relevant FyreLinkz routes, including /hardware/ai-workstation-planner.
- [ ] Set publication, updated, and source-check dates to the actual research/release dates; choose a stable slug and accurate metadata.
- [ ] Run node scripts/verify-content.cjs; expect content and asset validation to pass.

## Task 4: Add real licensed thumbnail and image credit

**Files:** public/art/local-ai-pc-upgrade-photo.jpg, public/art/local-ai-pc-upgrade-photo.webp, docs/editorial-image-credits.md

- [ ] Use Roman Spiridonov’s real close-up processor/motherboard photograph on Unsplash: https://unsplash.com/photos/gray-and-green-computer-processor-FemeYrbdMWE . The Unsplash page reports a Nikon D5000 camera and labels the photo free to use under its license.
- [ ] Recheck license at https://unsplash.com/license and record source page, photographer, license, checked date, and local crop in the credit file.
- [ ] Make a natural 1200x750 crop retaining the real processor/motherboard scene. No generated backdrop, text overlay, fake product marks, or misleading color treatment.
- [ ] Save optimized JPEG for share image and WebP for cards; verify dimensions and decodability using existing tools. Do not add an image dependency unless necessary.
- [ ] Use factual alt text describing only visible items.
- [ ] Run node scripts/verify-content.cjs; expect asset-existence checks to pass.

## Task 5: Verify production behavior

**Files:** no new files unless a verification failure requires a focused fix.

- [ ] Run npm run check and npm run build; both must exit 0 and the article route must be generated.
- [ ] Run the production app locally and verify title/description, image, quick answer, decision table, FAQs, citations, correction link, and planner link.
- [ ] Verify Article/Breadcrumb/FAQ JSON-LD; visible FAQ text must match schema exactly.
- [ ] Check desktop and mobile layouts, dark and light themes, and keyboard operation/focus of disclosures.
- [ ] Confirm the cover is the licensed real photo, not a generated image.
- [ ] Review changed files for unsupported testing claims, stale prices, unverified “best” claims, inaccurate dates/currency, broken citations, or unrelated edits.
- [ ] Commit only the guide, FAQ support, photo, and credit file on feat/editorial-upgrade-guide. Preserve any pre-existing untracked cache directory.

## Release boundary

This plan implements the first guide and required FAQ support only. It does not implement the component builder, chip/price tracker, AI jobs/agents series, pharma/wet-lab series, pointer refinement, ad tags, or automatic content publishing. Each remains a separate release under the approved design.
