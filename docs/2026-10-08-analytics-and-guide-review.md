# Analytics verification and search-visible guide improvements

October 8, 2026.

## Analytics evidence

The published GTM-NBVLKZLF container was fetched directly. It contains a Google tag for G-FX5Q71NMSE, triggered at gtm.init, with send_page_view=false, allow_google_signals=false, and allow_ad_personalization_signals=false. Repository Analytics.tsx loads GTM only after consent and emits manual page_view events on pathname changes. No duplicate loader was found by the independent reviewer.

Live Analytics preferences opened and Allow analytics dismissed the banner. This proves the consent control responds, not that GA4 received an event. GA4 property 556030846 appears in the signed-in account picker but its report route repeatedly displays Missing permissions. No collection-success claim is made. Enhanced-measurement history settings, realtime receipt, event filters and actual duplicate counts remain unverified. Zero activity alone does not establish broken collection.

No tag/container/account settings changed. Privacy consent requirements preserved. Testing consent in this browser may create a test visit if collection succeeds; do not interpret it as audience growth.

## Guide changes

- AI video comparison: clearer comparison search intent, worksheet for version/input/delivery/accepted footage/finishing effort, exact handling of zero accepted seconds, three FAQs, direct official provider sources and account/region pre-purchase checks.
- Local AI workstation guide: workload-specific worksheet, four FAQs, explicit distinction between VRAM capacity and speed, multi-GPU software support and offloading limits, country-aware buying considerations.
- Tables integrated into existing relevant sections rather than adding repeated sections. Existing article URLs and publication dates preserved; updated dates reflect material edits. Source-check dates retained rather than claiming a complete re-review of every old claim.
- No fabricated benchmarks, current retailer prices, universal winner or regional availability guarantee.

Sources consulted: Google Analytics pageview measurement documentation; Hugging Face Accelerate Big Model Inference; NVIDIA RTX 4090 specifications; MiniMax and Higgsfield official sites; BytePlus Seedance model documentation.

Live DOM inspection after consent confirms both GTM-NBVLKZLF and its GA4 gtag loader for G-FX5Q71NMSE are present. This confirms loader presence only, not event receipt.

Validation: npm run check and git diff --check passed. Production build generated 48 routes using a temporary separate output directory and single build worker to avoid local Windows mkdir EPERM errors; all temporary config and generated tracked-file changes restored. Independent editorial review found no remaining blockers after unsupported legacy rankings, model-fit guarantees and fixed build baselines were removed.
