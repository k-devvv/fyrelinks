# Organic search content calendar — 13 Oct 2026

Purpose: earn qualified clicks with useful, source-led answers. Query phrases below are intent hypotheses, not claimed search-volume data. Check Google Search Console after pages are indexed; rewrite titles from query/page impressions and CTR, not guesses.

## What the current evidence says

- WildWeights has three sourced image-model entries: a Qwen-Image 2.1 ComfyUI workflow, one GGUF quantization, and an anime-consistency LoRA. Page now answers what it covers, states the memory caveat, and links to a beginner guide.
- Search Console screenshots supplied by the owner show impressions and average position improving while clicks remain sparse. That means title/snippet fit, query intent, indexing, and page usefulness deserve work; no SEO edit can promise a ranking or click increase.
- Google can rewrite snippets from page text. Keep the opening answer direct, distinctive, and supported; description length is a publishing guardrail, not a guaranteed display length.
- Reddit links below are trend signals from community discussions checked 13 Oct 2026, not keyword-volume evidence. Verify model release status and source before publishing timely claims.

## Prioritized topics

| Priority | Query hypothesis / intent | Proposed H1 | Schema | Click magnet: concrete reader value | Trend signal |
|---|---|---|---|---|---|
| 1 | Qwen-Image 2.1 ComfyUI workflow / setup | Qwen-Image 2.1 in ComfyUI: files, loaders and first run | TechArticle, HowTo, FAQPage only when matching visible FAQs | Downloadable file-and-node checklist; separate required files from optional files; dated source review | [Qwen-Image 2.1 Turbo discussion](https://www.reddit.com/r/comfyui/comments/1x1mdud/qwenimage21turbo_just_officially_published/) |
| 2 | Qwen-Image GGUF 8GB VRAM / troubleshooting | Qwen-Image GGUF on 8GB VRAM: what fits and what may fail | TechArticle, FAQPage | Show publisher estimate beside full-workflow caveat; log model, encoder, VAE, resolution and offload settings; do not label estimate as a benchmark | [GGUF and ComfyUI workflow discussion](https://www.reddit.com/r/comfyui/comments/1x1mdud/qwenimage21turbo_just_officially_published/) |
| 3 | ComfyUI edit only part of image / mask workflow | How to edit one area in ComfyUI: mask, denoise and review | TechArticle, HowTo, FAQPage | A small decision tree for inpaint vs outpaint; explain mask preview and what to compare | [Targeted image-editing question](https://www.reddit.com/r/comfyui/comments/1x1ckhs/whats_the_best_way_to_edit_specific_parts_of_an/) |
| 4 | ComfyUI low VRAM 6GB / LoRA workflow | ComfyUI on 6GB VRAM: test a low-memory LoRA workflow | TechArticle, HowTo, FAQPage | Separate author claims from verified requirements; provide a reproducible log sheet and failure-stage checklist | [6GB workflow discussion](https://www.reddit.com/r/comfyui/comments/1wzy0w2/comfyui_tutorial_character_swap_with_minimax_h3/) |
| 5 | Comfy Agent workflow review / reproducibility | Comfy Agent workflows: inspect inputs, versions and outputs | TechArticle, FAQPage | Reproducibility checklist: graph, model versions, node dependencies, output and access scope | [Comfy Agent launch discussion](https://www.reddit.com/r/comfyui/comments/1wv4x9q/comfy_agent_is_now_live_for_everyone_on_comfy/) |
| 6 | ComfyUI API vs self-hosted / cost and privacy | ComfyUI API vs local hosting: cost, privacy and queue checklist | Article, FAQPage | Fill-in cost worksheet; distinguish hosted processing and data-retention terms from local control | [Comfy API discussion](https://www.reddit.com/r/comfyui/comments/1wubkrc/we_just_launched_comfy_api_deploy_your_comfyui/) |
| 7 | 54GB VRAM cloud cost vs local GPU | 54GB VRAM for $35? Compare cloud rental with a local GPU | Article, FAQPage | Price-comparison worksheet includes billing minimums, storage, egress, idle time and availability; verify the offer before using a price in title | [Community cloud-VRAM discussion](https://www.reddit.com/r/LocalLLaMA/comments/1wz6ist/54gb_vram_for_35/) |
| 8 | EmbeddingGemma local Mac file search / privacy | Run EmbeddingGemma locally on Mac: files, index and privacy checks | TechArticle, HowTo, FAQPage | Local-index setup checklist; explain embeddings vs chat generation and how to test retrieval | [Local Mac file-search app discussion](https://www.reddit.com/r/LocalLLaMA/comments/1x2eeds/opensource_mac_app_that_runs_embeddinggemma_2/) |

## Publishing and measurement rules

1. Publish only after checking primary documentation, current access, license and release artifacts. Add an “as of” date where availability can change.
2. Give each topic its own reader question and original answer. Avoid near-duplicate pages targeting the same phrase.
3. Put a concise answer near the top, then add a table, actual setup steps, limitations, and useful internal links. Keep visible FAQ answers consistent with the page body.
4. Add Article/TechArticle for editorial pages. Add HowTo only when steps are visible and executable. Use SoftwareApplication only for a page about an actual application, with verified properties. Structured data does not guarantee a rich result.
5. Link the three WildWeights entries to distinct, useful setup pages as those pages are authored. Keep the directory as an index; do not inflate it with thin model stubs.
6. Review GSC by query and landing page after enough data accumulates: impressions, clicks, CTR, position, country and device. Rewrite low-CTR snippets only when the query and page promise actually match. Do not use external-link rel values as a ranking trick; link naturally and mark paid links sponsored.

## Sources and guidance

- [Google Search: AI features and your website](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google Search: snippets and meta descriptions](https://developers.google.com/search/docs/appearance/snippet)
- [Google Search: structured data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- Community discussions linked in the trend-signal column; use them to find reader questions, never as primary evidence for model claims.
