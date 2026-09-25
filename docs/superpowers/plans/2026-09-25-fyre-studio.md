# Fyre Studio Implementation Plan

> **Goal:** Give FyreLinkz a distinctive and accessible creative technology publication design, then verify and deploy it.
> **Architecture:** Keep existing Next.js routes and article data. Refine shared brand, global visual rules, hero illustration, loading, scroll behavior, search keyboard behavior; then build, browser-check, and deploy.
> **Tech Stack:** Next.js 15, React 18, TypeScript, existing Three.js, CSS.

- [x] Inspect code, route structure, current Git branch, latest release, and baseline build.
- [ ] Replace shared wordmark and favicon with animated, original FyreLinkz FL mark.
- [ ] Rebuild global visual system and page layouts using existing styles and assets.
- [ ] Replace compute particle field with efficient, lazy loaded Three.js sculpture and robust fallback/cleanup.
- [ ] Refine pointer and scroll behavior, loading, and mobile keyboard controls.
- [ ] Run existing content/type checks and production build; browser check primary routes, small screen, navigation, reduced motion, missing WebGL.
- [ ] Publish branch preview; deploy verified version through the configured production host; smoke check live.

Baseline: commit `3a98cdd`; baseline `npm run check` and `npm run build` passed.
