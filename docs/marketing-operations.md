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

## 4. Google AdSense Onboarding Roadmap

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
- Google requires a Google-certified CMP integrated with the IAB TCF v2.2 when serving ads to users in the European Economic Area (EEA) and the UK.
- For California (CPRA) and other US privacy jurisdictions, appropriate opt-out mechanisms must be handled.
- **Action**: Enable Google Funding Choices / User Messaging Platform (UMP) or integrate a certified partner CMP (such as Cookiebot, Didomi, or Termly) before activating ad units.
- Ad scripts must not execute until consent is confirmed.

### Step 4: Ad Placement & User Experience Policy
- Maintain a high ratio of original editorial content to ad space.
- Keep ad slots clearly separated from article body copy and labeled "ADVERTISEMENT".
- Do not place ads near interactive controls or deceptive click targets.

## 5. Analytics Setup (Optional)

Consent-based Google Analytics 4 is supported via `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- No tracking cookies or events are triggered before explicit user consent.
- DNT (Do Not Track) and GPC (Global Privacy Control) browser headers are respected.
- Event tracking captures `page_view`, `source_visit`, `related_read`, and `rss_subscribe`.

## 6. Distribution & Community Engagement

Share actionable, educational excerpts in communities where original guides provide real utility:
- **ComfyUI Communities**: Share the node troubleshooting checklist and beginner baseline setup.
- **AI Video Creators**: Share prompt structure tips (camera motion verbs, shot briefs, accepted footage ratio math).
- Disclose ownership and link to primary sources. Never use bulk link drops or automated spam.
