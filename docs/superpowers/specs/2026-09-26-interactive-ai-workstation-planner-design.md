# FyreLinkz interactive AI workstation planner

## Status

Design approved for specification. Implementation waits for owner review of this document.

## Goal

Give creative-AI readers a useful way to choose local hardware by workload, budget and market. The planner should earn organic discovery by solving a real buying decision, establish trust through visible assumptions and sources, and prepare for clearly disclosed affiliate or sponsorship revenue after partner approval. No traffic or revenue result is guaranteed.

## Competitive findings

- **Artificial Analysis** makes model selection interactive with comparable quality, speed and price charts; its data API has paid commercial plans. FyreLinkz can borrow the decision-first comparison, while using only its own sourced hardware data.
- **Local AI Master** publishes a free toolbox of 16 local-AI calculators. **Local AI Rigs** separates narrow planners and explicitly distinguishes planning estimates from measured benchmarks. FyreLinkz should make a few reliable tools, explain each tool’s limits, and avoid an undifferentiated tool count.
- **ComfyUI.org** organizes hundreds of workflow examples by use case, model, node, VRAM and difficulty. A later FyreLinkz workflow helper can improve this with compatibility and setup checks rather than another unverified gallery.
- **LLMHardware.io** discloses Amazon Associates links and says its hardware recommendations are based on use case, not commission size. This is a relevant potential revenue path for buyer-intent pages.
- **Futurepedia** publicly lists a $497 verified listing and enterprise sponsorship packages. Its actual sales and monthly profit are not public, so this is evidence of a pricing model, not proof of $1,000/month earnings.
- **VidCost** shows source dates and calculation assumptions and says it has no paid rankings or affiliate links. FyreLinkz should match that transparency while adding workload fit and useful hardware choices.

Sources: [Artificial Analysis video comparisons](https://artificialanalysis.ai/video/models) and [data API](https://artificialanalysis.ai/data-api); [Local AI Master tools](https://localaimaster.com/tools); [Local AI Rigs tools](https://localairigs.com/tools); [ComfyUI workflow directory](https://www.comfyui.org/en/workflows); [LLMHardware disclosure](https://llmhardware.io/about); [Futurepedia listing options](https://www.futurepedia.io/submit-tool); [VidCost methodology](https://vidcost.com/guides/method/).

## Product scope — first release

Create a free, crawlable planner at `/hardware/ai-workstation-planner` with a server-rendered explanation and a client-side form/results experience. No sign-in, database, external price API or user-submitted data in v1.

Inputs:

- Market: United States (USD), United Kingdom (GBP), Canada (CAD), or Germany as the EU reference market (EUR).
- Total budget in the selected market’s currency.
- Workload: ComfyUI image generation, ComfyUI video generation, local LLM inference, or mixed creative-AI use.
- System path: desktop build, existing-desktop upgrade, or laptop.

Results:

- A small set of suitable hardware tiers, ordered by fit and budget rather than commission.
- What should fit, likely constraints, and when a tier is a poor match.
- GPU memory, system RAM, storage, power and platform trade-offs relevant to the selected workload.
- A transparent parts/budget split and links to the source behind each important specification or price.
- “Last checked” dates for market price examples; indicate that retailer prices, stock, VAT, shipping and compatibility can change.
- Contextual links to FyreLinkz hardware and workflow guides.

Germany is the first EU reference market, not a promise of uniform prices across EU countries. State that local tax, shipping and stock vary. Never silently convert currencies or imply a live retailer quote.

## Data and decision rules

- Keep recommendations in a small, typed, version-controlled catalogue; keep calculation and UI code separate from the data.
- Source specifications from manufacturers or primary documentation. Source market prices from identifiable retailer listings, with market and check date. Unknown prices stay unknown and do not become zero.
- Let workload requirements and the visitor’s budget determine ranking. An affiliate relationship must not change ranking or labels.
- Separate researched compatibility estimates from measured performance. Do not claim tokens/second, render times, benchmark wins, guaranteed fit, savings, or payback unless the site has reproducible first-party evidence for the exact setup.
- When no option meets budget or requirements, explain the limiting factor and offer a realistic lower-cost workload adjustment or relevant guide. Do not invent a result.
- Make no external price calls in v1. Manually recheck displayed prices at least every 30 days; show exact checked dates. Older prices are visibly stale and cannot drive a “best value” or price-ranked recommendation.

## Monetization and acquisition

1. Publish the tool and supporting, source-backed hardware guides for long-tail queries. Link articles to the planner and the planner to relevant guides.
2. Track page discovery, market, tool completion and outbound retailer clicks with privacy-aware analytics; use Search Console country/page/query data as the organic baseline.
3. Add affiliate links only after publisher approval and only where a useful product link exists. Label commercial links and disclose compensation next to them. Keep editorial criteria and ranking independent.
4. Consider direct sponsorship after a meaningful audience develops; visibly separate sponsor inventory from results and editorial recommendations.
5. Add display advertising only after approval, consent controls for relevant regions and placement testing. Ads must not cover planner controls or imitate recommendations.

Competitor revenue is not a forecast. Public rates or affiliate disclosures establish possible revenue mechanisms, not competitor earnings, conversion volume or FyreLinkz income.

## Later releases

1. **ComfyUI workflow starter/troubleshooter:** select a task, target VRAM and skill level; return a curated workflow with required models/nodes, official sources, setup checklist and known limitations. Prefer compatibility and safety details over an unmoderated upload gallery.
2. **AI video cost planner:** third priority, only after useful price data and input assumptions are clear. Let users control retries/acceptance assumptions; do not publish an invented universal success rate.

These are separate releases, not dependencies of the hardware planner.

## Technical and accessibility requirements

- Use the existing Next.js app and design system. Keep the informational page server-rendered; isolate interactivity to the planner component.
- Use local, typed catalog data. No new backend, account system, paid API or third-party animation dependency.
- Inputs have labels, keyboard support, sensible bounds and readable units. Results announce updates accessibly and remain usable on mobile, with dark/light themes.
- Persist no user inputs in v1. Do not place budgets or workload choices in URLs or analytics events.
- Include references, methodology, limitations and price freshness visibly in the page, not only in metadata.

## Failure handling

- Reject empty, negative, non-finite and out-of-range budgets with inline guidance.
- If the selected market or workload has incomplete catalogue coverage, say so and provide sourced spec tiers without fabricated prices.
- If prices are expired under the project’s freshness policy, mark them stale and suppress price-ranked claims while preserving hardware-fit guidance.
- Unknown GPU, laptop or multi-GPU configurations must not be reported as guaranteed fits; provide a conservative explanation and manual-check sources.

## Success measures

- User can complete a recommendation without login, horizontal scrolling or broken controls.
- Every displayed price/spec has a source and freshness marker; unsupported benchmark/revenue claims are absent.
- Track Search Console impressions/clicks by planner URL and market; on-site completion, guide transitions and eligible outbound clicks; monitor Core Web Vitals and error logs.
- Evaluate usefulness and return usage before adding more tool categories or ad density. No minimum revenue is asserted as a ship criterion.

## Validation

- Unit-check budget bounds, currency/market selection, fit categories, ranking and missing/stale data behavior.
- Run repository content checks, TypeScript and production build.
- Run browser checks for keyboard-only completion, mobile layout, theme modes, no-fit/error states, outbound sources and absence of user-input URL state.
- Verify route metadata, canonical URL, sitemap inclusion and no console/runtime errors.
