# FyreLinkz: Marketing Operations and Launch Kit

Prepared for the content-first AI publication. Publication, account configuration and distribution remain explicit launch actions; no traffic or revenue is ever promised or forecast.

## 1. Audience and Value Proposition

- **Primary Audience**: Solo AI video creators, digital artists, editors, and technical practitioners seeking reliable workflows, diffusion mechanics and objective hardware guidance.
- **Secondary Audience**: Developers and engineers evaluating ComfyUI node graphs, local AI compute, coding assistants and data pipelines.
- **Core Value**: Signal before spend. Practical workflows, original explanations, verified primary sources, and clear checklists without hype or invented testing.

## 2. Content Matrix & Reader Paths

| Reader Intent / Starting Topic | Destination URL | Contextual Next Step | Key Value Delivered |
|---|---|---|---|
| AI video prompt engineering | `/create/ai-video-prompt-guide-examples` | Read model generation matrix or browse model directory | 6 original shot briefs; camera movement vocabulary |
| Video model selection & costs | `/create/ai-video-generation-matrix-minimax-higgsfield-seedance` | Read video prompt guide or check model directory | Accepted footage arithmetic; multi-model tradeoffs |
| Video model rates directory | `/ai-video-models` | Filter by platform (Kling, Seedance, Runway, Luma) | Searchable catalog of 200+ settings with official links |
| ComfyUI beginner first setup | `/workflow/comfyui-beginner-first-workflow-guide` | Progress to ComfyUI FLUX guide | Load official template, understand graph nodes, fix errors |
| ComfyUI FLUX & LoRA training | `/create/comfyui-flux-lora-training-and-inference-guide` | Read workstation build guide for VRAM requirements | Memory quantization, LoRA stacking, repeatable steps |
| Local AI PC build & memory | `/hardware/best-local-ai-workstation-build-guide-2026` | Read ComfyUI FLUX guide for workload planning | VRAM sizing (16GB vs 24GB+), bandwidth vs clock speed |
| Coding assistants comparison | `/workflow/cursor-vs-windsurf-vs-copilot-developer-benchmarks` | Read async Notion architecture guide | Context window structure, terminal integration comparison |
| Latest AI announcements | `/news` | Read primary source link & practical takeaway | Curated editorial summaries of vendor releases |

## 3. Reader Journey Implemented

Search / Organic Social → Sourced Editorial Guide → Contextual In-Article Links → Related Reading Grid → RSS Subscription (`/feed.xml`).

- Legacy URL `/tools/video-cost` permanently redirects (HTTP 308) to `/create/ai-video-generation-matrix-minimax-higgsfield-seedance`.
- The site model directory (`/ai-video-models`) provides a clean reference for published rates, linking out directly to official provider documentation.
- All internal article links use fast client-side navigation.

## 4. Monetization Readiness: Current State and Gates

The site currently supports optional sponsor links and consent-based GA4. It does not yet load AdSense or another display-ad network. Keep network ads off until the publisher account is approved, the actual vendor IDs are configured, the appropriate consent flow is live, and the privacy notice names the vendors and data uses. Never use placeholder IDs or test ads in production.

### Audience first

- Treat Search Console's query, page, country, device, CTR and position reports as the source of truth. Save a dated monthly baseline; don't infer demand from impressions alone.
- Prioritize pages already receiving relevant US, UK, Canadian and European impressions. Improve title/snippet fit and the page's unique answer before creating another URL.
- Build topic clusters around AI video workflows, ComfyUI and local hardware. Every new article needs primary sources, a clear reader task, meaningful original analysis and explicit limits. Do not auto-publish daily trend summaries or scaled near-duplicate pages.
- Grow return visits with the existing RSS feed. Add email collection only after choosing and configuring a provider, consent text and unsubscribe flow.

### Ad partner sequence

1. Build engaged, clean traffic and a documented content archive before applying. The Search Console screenshot supplied in September 2026 showed 154 impressions and 2 clicks over its three-month view; that is a discovery baseline, not a scale for display ads.
2. Evaluate one network at a time against audience fit, country mix, performance impact, exclusivity and contract terms. Carbon Ads is a curated, invite-only option aligned with developer audiences, but its publisher FAQ describes exclusivity. Journey by Mediavine currently lists at least 1,000 premium sessions in 30 days plus original content and engagement standards. Recheck current requirements before applying.
3. Compare net revenue per thousand sessions, viewability, fill, country, page speed and engagement against the no-ad baseline. Remove placements that harm reading or performance.
4. Consider a multi-demand ad server/header-bidding setup only after volume and direct-sales needs justify its added complexity. Do not stack unrelated ad scripts or run competing ad managers on every page.

### Consent, policy and implementation gates

- Before Google publisher ads are served to users in the EEA, UK or Switzerland, configure a Google-certified CMP with IAB TCF integration and test reject, accept and change-preference paths. The existing analytics preference is not an advertising CMP.
- Check applicable US state privacy opt-out obligations and ensure Global Privacy Control is handled for applicable signals before ad personalization or sale/share technologies are enabled. Get qualified privacy advice for the publisher's actual jurisdictions and vendors.
- Label ads clearly, keep them separate from navigation and editorial controls, and do not use pop-ups or pop-unders. Set conservative placements and monitor Core Web Vitals.
- Configure `ads.txt` only with the exact authorized seller records supplied by each approved partner. Do not guess publisher IDs or claim inventory you do not control.
- Update the privacy notice and consent inventory with the actual vendors, purposes, retention and controls before the first ad request. Test with browser network logs to verify no ad vendor loads before the required consent.

## 5. Google AdSense Onboarding Roadmap

The publication is engineered for monetization readiness while adhering strictly to Google Publisher Policies:

### Step 1: Account Application & Verification
1. Submit `https://www.fyrelinkz.com` in Google AdSense for site review.
2. Confirm domain ownership via DNS or meta tag if required.

### Step 2: Publisher ID Configuration
1. Once Google approves the account, obtain your publisher ID (`pub-XXXXXXXXXXXXXXXX`).
2. Add the environment variable in Vercel:
   `NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX`
3. Update `public/ads.txt`:
   `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`

### Step 3: Consent Management Platform (CMP) Requirements
- Google requires publishers using its ads products in the EEA, UK and Switzerland to use a Google-certified CMP integrated with IAB TCF for covered consent requirements.
- For US state privacy jurisdictions, implement applicable notice, opt-out and GPC handling based on the actual vendor setup.
- **Action**: Configure the publisher CMP in the selected ad account or a verified certified partner. Confirm certification and current TCF version in Google's current documentation before launch.
- Do not execute ad requests until the CMP has communicated the required consent or permitted non-personalized/limited-ad state.

### Step 4: Ad Placement & User Experience Policy
- Maintain a high ratio of original editorial content to ad space.
- Keep ad slots clearly separated from article body copy and labeled "ADVERTISEMENT".
- Do not place ads near interactive controls or deceptive click targets.

## 6. Analytics Setup (Optional)

Consent-based Google Analytics 4 is supported via `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- No tracking cookies or events are triggered before explicit user consent.
- DNT (Do Not Track) and GPC (Global Privacy Control) browser headers are respected.
- Event tracking captures `page_view`, `source_visit`, `related_read`, and `rss_subscribe`.

## 7. Distribution & Community Engagement

Share actionable, educational excerpts in communities where original guides provide real utility:
- **ComfyUI Communities**: Share the node troubleshooting checklist and beginner baseline setup.
- **AI Video Creators**: Share prompt structure tips (camera motion verbs, shot briefs, accepted footage ratio math).
- Disclose ownership and link to primary sources. Never use bulk link drops or automated spam.
