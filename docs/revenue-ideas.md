# FyreLinkz revenue ideas

Prepared 31 October 2026. Nothing here is a forecast. Search Console recorded 468
impressions and 3 clicks for 7 September to 6 October 2026, at average position 11.9, and
GA4 for 11 September to 8 October showed five active users across two engaged sessions.
Every idea below is gated on traffic that does not exist yet. Figures quoted from outside
sources are self-reported unless marked otherwise.

## Current state of monetization

| Stream | Status | Blocker |
|---|---|---|
| Affiliate links | Plumbing live (`/go/<slug>`, `FYRE_AFF_*`) | No approved programs yet |
| Planner retailer links | Live on non-laptop result cards | Amazon Associates approval |
| Sponsor slots | Build-time env vars, unused | No sponsor |
| Display ads | AdSense ownership verified 2026-10-25; `ads.txt` declares the publisher ID. Adsterra integration built (`components/Advertising.tsx`) | Adsterra approval and India payment onboarding unverified; a separate frame origin must be configured |
| Email list | Not built | Provider and consent copy undecided |
| Digital products | Not built | — |

Affiliate disclosure page and footer link shipped 31 October 2026.

---

## Idea 1: Curated model catalog that hands off to Hugging Face

The highest-value idea on the list because it reuses the hardware planner, which is the
only thing on the site no competitor has.

**Shape.** A browsable catalog of diffusion and video models — checkpoints, LoRAs,
ControlNets — filterable by type, base model, license, VRAM need and last update. Every
model page carries a "fits your GPU" badge driven by `lib/hardware-planner`, an editorial
"why use this", and a download button that links to the model's Hugging Face **repo page**
(never a direct file, so gated access and license acceptance still work).

**Why not clone Civitai.** Civitai hosts weights and carries the moderation, copyright,
likeness and payment-processor problems that come with user uploads. FyreLinkz hosts
nothing: it curates, annotates for hardware fit, and sends the reader to Hugging Face.
That keeps storage and bandwidth at zero and keeps the legal surface small.

**Data pipeline.** A script pulls the public Hugging Face Hub API (downloads, likes, tags,
license, gated flag, last modified) into JSON under `lib/content/`, committed to the repo
and refreshed by a scheduled GitHub Action. Pages render statically on Vercel. No
database and no per-request cost. Verify Hugging Face's current API terms and
rate limits before the first sync.

**Editorial layer is the product.** Hugging Face already lists the files; the value added
here is the VRAM note, the best-for tag, the ComfyUI workflow that actually runs it, and
the honest statement of what the model is bad at.

**Revenue.** Cloud GPU affiliates (the reader who cannot run a 24 GB model locally is the
one who rents), hardware affiliates through the planner, paid workflow bundles, and later
sponsored placement — clearly labelled, never mixed into rankings.

**Scope discipline for v1.** Roughly 30 hand-picked models, 5 workflows, no user uploads,
no NSFW, no real-person likeness models, license shown on every page, weights never
rehosted. Submissions later via a reviewed form.

**Search intent it serves.** "<model> download", "<model> VRAM requirements",
"<model> vs <model>", "best LoRA for <base model> on 16 GB".

**Honest risk.** Both Civitai and Hugging Face already list these models. The only way
this wins is curation plus hardware fit. If the editorial layer is thin it is a worse
Hugging Face search.

---

## Idea 2: Local vs cloud break-even calculator

"Buy a 5090, rent on RunPod, or pay per clip on Kling?" Reader enters clips or images per
month and the tool returns cost per month for each route plus break-even in months.
Smallest build on this list, the most shareable, and it sits directly between a hardware
affiliate and a cloud affiliate. Feeds on `lib/content/video-pricing.json`, which already
exists.

## Idea 3: Model comparison pages

Programmatic pages from the 226-variant directory: "Kling vs Seedance for product shots",
filtered by price, clip length and style. One page per real query. Only publish a
comparison where there is sourced pricing or a test actually run — scaled near-duplicate
pages are a Google policy risk and the existing `npm run check` sourcing discipline
should extend to them.

## Idea 4: ComfyUI workflow library

Free workflows for traffic and email capture, paid bundles as the product. Each workflow
ships with its required-model list (linking into Idea 1), install steps, and the hardware
it was run on. Sold through Gumroad or LemonSqueezy — no payment code on the site, no PCI
surface. This is the first idea on the list that can earn without large traffic, because
a small engaged list converts.

## Idea 5: Email list

A weekly note on what changed in AI video, ComfyUI and local hardware. The one audience
the site owns, and the precondition for Idea 4 earning anything. Needs a provider,
consent copy and an unsubscribe flow before launch; the existing analytics preference is
not consent for email.

## Idea 6: Price and release tracker

A page showing model price changes and new releases, with RSS and email alerts. Good for
repeat visits and genuinely useful. Highest ongoing maintenance cost on this list —
do not start it until the catalog sync from Idea 1 is already running, since it is the
same pipeline.

## Idea 7: Direct sponsorship

Newsletter and model-directory placements sold directly, labelled, `rel="sponsored"`,
never affecting rankings. Realistic only at a few thousand engaged monthly readers.
Carbon Ads is the closest network alternative but its publisher FAQ describes exclusivity.

## Idea 8: Services funded by the site

The site as portfolio rather than as the product: build the same catalog, planner or
scraper for someone else. The web research done 31 October 2026 found services to be the
only route with revenue that does not depend on large traffic, with self-reported solo
consulting ranges of roughly $2K–$10K/month. Fixed-price or retainer pricing beats
hourly, because AI-assisted work compresses billable hours.

## Deliberately not doing

- **Expanding display ads now.** Consumer-tech RPM is $0.50-5, so at current sessions the
  existing AdSense and Adsterra work is already at the limit of what ads can return.
  Adding placements will not change the order of magnitude.
- **User-uploaded models.** Moderation, copyright and likeness exposure.
- **Rehosting weights.** Bandwidth cost and licence risk for no gain.
- **Scaled auto-generated pages.** Policy risk, and it contradicts the sourcing standard
  the site is built on.

## Suggested order

1. Break-even calculator (Idea 2) — smallest build, immediate affiliate surface.
2. Model catalog v1 (Idea 1) — 30 models, 5 workflows, HF handoff.
3. Email capture (Idea 5) on both.
4. Paid workflow bundles (Idea 4).
5. Comparison pages (Idea 3) once the catalog data is live.
6. Sponsorship and tracker (Ideas 6, 7) only after repeat-visitor numbers support them.

Every step above needs distribution work that no code change substitutes for.
