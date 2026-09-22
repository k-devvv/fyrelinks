# FyreLinkz: 30-Day Content & Distribution Plan

## Overview & Editorial Philosophy
This 30-day plan outlines realistic, high-intent topic briefs, community contribution playbooks, and measurement frameworks for FyreLinkz. We reject spam link-dropping, synthetic traffic bots, and purchased backlinks. Instead, distribution focuses on answering real questions in technical creative communities with reproducible assets, node graphs, and primary sources.

---

## 1. Topic Briefs for 5 Core Pillars

### Topic 1: ComfyUI FLUX.1 LoRA Stacking & Low-VRAM Optimization
* **Reader Question**: "How do I run FLUX.1 dev with multiple custom LoRAs on a 12GB or 16GB GPU without crashing ComfyUI?"
* **Search Intent**: High-intent troubleshooting (`comfyui flux lora oom fix`, `flux fp8 comfyui low vram`).
* **Original Contribution**: Step-by-step DualCLIPLoader and UNet offload architecture with quantized FP8/GGUF weights.
* **Sources**: Comfy Org official documentation, Black Forest Labs model card.
* **Internal Links**: Link to [ComfyUI Beginner First Workflow](/workflow/comfyui-beginner-first-workflow-guide) and [Local AI Workstation Guide](/hardware/best-local-ai-workstation-build-guide-2026).
* **Visual Requirement**: Node flow diagram showing CLIP-L + T5XXL dual-clip split and LoRA stacker order (`comfyui-flux-lora.svg`).
* **Distribution Channel**: r/ComfyUI, r/StableDiffusion, Comfy Org Discord (`#workflows` channel).
* **Success Metric**: Organic impressions for FLUX ComfyUI queries, average engaged time > 3m 30s, related-guide click-through rate > 12%.

### Topic 2: AI Video Direction Matrix: MiniMax vs Kling vs Higgsfield vs Runway
* **Reader Question**: "Which video model actually produces usable commercial shots, and how many credits does an accepted 5-second take really cost?"
* **Search Intent**: Commercial evaluation (`minimax vs kling video quality`, `runway gen-4 commercial use`).
* **Original Contribution**: A standardized 4-step shot evaluation brief, real-world camera trajectory comparisons, and credit cost mathematics based on accepted footage.
* **Sources**: Runway plugin documentation, Hailuo/MiniMax platform terms, Kling 1.5 specifications.
* **Internal Links**: Link to [AI Video Prompting Guide](/create/ai-video-prompt-guide-examples) and [AI Video Model Directory](/ai-video-models).
* **Visual Requirement**: Trajectory vector overlay comparing prompt-guided camera motion across models (`ai-video-matrix.svg`).
* **Distribution Channel**: r/aivideo, Creative Cow AI Video forum, LinkedIn Technical Video Production groups.
* **Success Metric**: Search CTR > 4.5% on model comparison keywords, directory referral clicks > 15%.

### Topic 3: Local AI Workstation Blueprint: Calculating Real VRAM Thresholds
* **Reader Question**: "Should I buy an RTX 4070 Ti Super (16GB), a used RTX 3090 (24GB), or a 4090 for local diffusion and LLMs in 2026?"
* **Search Intent**: Purchasing decision (`best gpu for comfyui flux 2026`, `dual rtx 3090 vs 4090 local ai`).
* **Original Contribution**: Practical formula for model weight memory + KV cache overhead + system RAM offloading; PCIe bifurcation requirements for dual-GPU rigs.
* **Sources**: NVIDIA GeForce architectural whitepapers, Hugging Face Accelerate documentation.
* **Internal Links**: Link to [ComfyUI FLUX Guide](/create/comfyui-flux-lora-training-and-inference-guide) and [4K Coding Monitor Guide](/hardware/best-4k-144hz-monitors-for-programming).
* **Visual Requirement**: Dual-slot PCIe spacing and memory bandwidth topology diagram (`local-ai-workstation.svg`).
* **Distribution Channel**: r/LocalLLaMA, Level1Techs hardware forum, PCPartPicker build guides.
* **Success Metric**: Bookmarks/saves, return visitors, zero bounce from readers searching VRAM specifications.

### Topic 4: ComfyUI Beginner First Workflow: The 5-Node Foundation
* **Reader Question**: "I just installed ComfyUI and everything is blank/red. How do I generate my first clean image without errors?"
* **Search Intent**: Novice onboarding (`comfyui first workflow tutorial`, `comfyui red node error fix`).
* **Original Contribution**: 5-node core baseline with clear mental model of data flow (Model, Conditioning, Latent, Sampler, VAE Decode).
* **Sources**: ComfyUI official GitHub repository, Comfy Org getting started guide.
* **Internal Links**: Link to [FLUX LoRA Guide](/create/comfyui-flux-lora-training-and-inference-guide) and [SDXL Checkpoint Guide](/create/civitai-sdxl-photorealism-checkpoint-matrix).
* **Visual Requirement**: Clean high-contrast flow diagram isolating each node's inputs and outputs (`comfyui-first-workflow.svg`).
* **Distribution Channel**: Reddit beginner threads, YouTube description reference links, Mastodon `#CreativeAI`.
* **Success Metric**: Organic discovery from beginner search queries, low exit rate on first step.

### Topic 5: AI Video Prompts: The 4-Part Physical Brief
* **Reader Question**: "Why do my AI video prompts turn into morphing hallucinations when the camera moves?"
* **Search Intent**: Prompt engineering (`ai video prompt structure examples`, `runway gen-3 camera prompt words`).
* **Original Contribution**: The 4-part physical brief template: [Subject State] + [Camera Trajectory] + [Physical Action/Light Change] + [Framing/Lens Type], with 6 tested real-world shot examples.
* **Sources**: Runway Gen-4 Prompting Guide, official creator documentation.
* **Internal Links**: Link to [AI Video Generation Matrix](/create/ai-video-generation-matrix-minimax-higgsfield-seedance) and [Runway Timeline News](/news/runway-adobe-premiere-after-effects-plugins).
* **Visual Requirement**: Viewfinder reticle overlay illustrating camera vectors and safe action zones (`ai-video-prompt-shot.svg`).
* **Distribution Channel**: X/Twitter creator threads, Bluesky creative tech feeds, Discord `#prompt-lab`.
* **Success Metric**: Social shares of prompt cards, inbound search clicks for camera prompt phrases.

---

## 2. Community Distribution Playbook (Drafts for Review — No Auto-Publishing)

> [!NOTE]
> All community engagement must follow community guidelines: never post bare links; share complete reproducible instructions directly in the post, citing FyreLinkz only as a canonical source for the full graph or workflow download.

### Reddit r/ComfyUI Community Draft
**Title**: Practical ComfyUI FLUX.1 Dev baseline for 12GB/16GB VRAM (FP8 UNet + DualCLIPLoader without OOM)
**Body**:
> If you're getting CUDA out-of-memory errors trying to run FLUX.1 dev on consumer cards (RTX 3060/4070/4080), here is the minimal 5-node setup that stabilizes VRAM usage:
> 1. Use ComfyUI's native `UNETLoader` instead of the legacy checkpoint loader, pointing to `flux1-dev-fp8.safetensors`.
> 2. Use `DualCLIPLoader` to feed both `clip_l.safetensors` and `t5xxl_fp8_e4m3fn.safetensors` with `clip_type` set to `flux`.
> 3. Clamp KSampler steps to 20 with `euler` sampler and `simple` scheduler at CFG 1.0 (FLUX does not require high CFG).
> 4. Keep latent dimensions strictly at 1024x1024 for baseline testing before scaling up.
> We documented the complete node diagram, memory trade-off matrix, and LoRA pre-flight checklist here for anyone needing the reference: https://www.fyrelinkz.com/create/comfyui-flux-lora-training-and-inference-guide

### X / Twitter Creator Thread Draft
**Post 1/4**:
> Stop writing "8k photorealistic hyperdetailed cinematic" in AI video prompts. Generative video diffusion models understand physical mechanics, not subjective compliments.
> Here is a 4-part shot brief that actually stabilizes motion: 🧵
**Post 2/4**:
> 1. [Subject Starting State]: "A matte ceramic mug centered on a weathered walnut table."
> 2. [Camera Vector]: "Slow mechanical dolly forward at lens height; zero roll or yaw."
> 3. [Physical Action]: "Steam drifts vertically upward from the dark liquid; lighting remains steady from camera left."
> 4. [Framing / Lens]: "50mm medium close-up, shallow depth of field, natural soft ambient daylight."
**Post 3/4**:
> By separating the subject, camera vector, and physical physics, the model doesn't have to guess where movement should originate.
**Post 4/4**:
> Six reproducible shot breakdowns (product turntable, drone reveal, texture shift, character close-up) with prompt templates are documented on FyreLinkz: https://www.fyrelinkz.com/create/ai-video-prompt-guide-examples

---

## 3. 28-Day Review Checklist

### Day 7 Check:
- [ ] Inspect Google Search Console index status for `/create`, `/workflow`, and `/hardware`.
- [ ] Verify zero crawl errors or 404s in production server logs.
- [ ] Verify RSS feed validation at `https://www.fyrelinkz.com/feed.xml`.
- [ ] Confirm AdSlot remains completely suppressed (zero layout shift) in production.

### Day 14 Check:
- [ ] Review initial organic search impressions and queries in Search Console.
- [ ] Identify queries ranking on page 2 (positions 11–20) for targeted snippet optimization.
- [ ] Check internal link flow: verify users are navigating from lead stories to practical guides.
- [ ] Verify average reader engagement time across top 5 priority guides.

### Day 21 Check:
- [ ] Measure social and community referral traffic from educational posts.
- [ ] Inspect mobile performance and Core Web Vitals on real mobile viewports.
- [ ] Update any model pricing or version changes in the AI video models directory.
- [ ] Review incoming reader emails or correction requests via `editorial@fyrelinkz.com`.

### Day 28 Check:
- [ ] Comprehensive review of organic impressions, clicks, and top landing pages.
- [ ] Evaluate readiness for direct publisher sponsorships or ad network application based on real reader traffic baselines.
- [ ] Archive outdated guides or update with subsequent software version numbers.
- [ ] Plan the next 30-day editorial cycle based on actual high-performing topics.
