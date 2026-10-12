# Adsterra banners implementation plan

Approved scope: responsive home banner, 300x250 article banner and 160x600 desktop sidebar. Separate advertising consent; Social Bar deferred.

1. Add lib/advertising.ts with exact public banner keys, width selection and isolated frame HTML.
2. Add client Advertising component: independent persisted opt-in, GPC/DNT denial, shared updates, reversible preferences and fixed dimensions. No request before affirmative choice; use sandboxed frames without same-origin or top-navigation permission.
3. Preserve sponsor path in AdSlot and render network placement when no sponsor exists. Add sidebar slot to article contents; add preferences once in root layout.
4. Style placements in both themes, desktop-only sidebar and mobile width selection. Update privacy notice with vendor, requests, choices and limits. Do not invent ads.txt.
5. Verify content/types, width-selection and source isolation; browser-test decline, acceptance, withdrawal and navigation. Inspect actual creative without clicking ads. Require successful preview and production deployment, then report real rendering status.
