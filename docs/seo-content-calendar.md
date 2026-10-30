# FyreLinkz: High-Intent SEO Content Calendar (Tier 1 AI Developers)

Engineered for Tier 1 developers (US, UK, CA, EU) across r/ComfyUI and r/LocalLLaMA. Focuses on high-intent troubleshooting, hardware sizing, and developer workflows with a target SERP CTR exceeding 10%.

---

## 1. Editorial Strategy & SERP CTR Architecture

Every topic is selected based on active technical pain points, commercial intent, and zero-click immunity (providing exact parameters, downloadable JSON graphs, or reproducible benchmarks that an LLM summary cannot fully satisfy).

### High-CTR Formula:
`[Primary Target Keyword] + [Specific Technical Benefit] + [Bracketed Utility Hook]`
- Utility Hooks: `[Workflow JSON]`, `[VRAM Benchmarks]`, `[Fix Guide]`, `[Specs Sheet]`, `[CLI Script]`, `[Decision Tree]`
- Freshness Anchor: `(2026)` for time-sensitive hardware and model comparisons.

---

## 2. Tier 1 High-Intent Content Calendar

| Target Search Query | Search Intent | Proposed H1 Title (Target >10% CTR) | Recommended Schema Type | Unique "Click Magnet" Asset |
|---|---|---|---|---|
| `comfyui cuda sysmem fallback policy fix` | Troubleshooting | Fix ComfyUI 10x Slowdown: CUDA Sysmem Fallback [Fix Guide] | `TechArticle`, `HowTo`, `FAQPage` | One-click Windows PowerShell registry & driver fix script |
| `run 70b model single 24gb gpu rtx 4090` | Implementation | How to Run 70B LLMs on a Single 24GB GPU [EXL2 vs GGUF] | `TechArticle`, `FAQPage` | VRAM allocation calculator sheet (weights vs KV cache vs context) |
| `flux fp8 vs gguf vs nf4 comfyui quality` | Comparison | FLUX.1 FP8 vs GGUF vs NF4: Quality & VRAM [Comparison] | `TechArticle`, `FAQPage` | Interactive slider comparison & 50-step benchmark matrix |
| `rtx 4070 ti super vs rtx 3090 local ai` | Hardware Comparison | RTX 4070 Ti Super vs RTX 3090: Local AI [Buyer Guide] | `TechArticle`, `FAQPage` | Cost-per-GB VRAM & tokens/sec benchmark chart across 8B/70B |
| `comfyui out of vram prompt change fix` | Troubleshooting | ComfyUI Out of VRAM on Prompt Change [Triage Guide] | `HowTo`, `FAQPage` | Pre-configured memory-flush node graph (`clean_vram.json`) |
| `llm kv cache vram calculation 32k 128k` | Implementation | LLM KV Cache VRAM Calculator: 8K to 128K [Specs Sheet] | `TechArticle`, `SoftwareApplication` | Copy-paste Python memory budget script (`calc_kv_vram.py`) |
| `cursor vs windsurf local llm ollama setup` | Tool Implementation | Cursor vs Windsurf with Local Ollama [Setup Guide] | `TechArticle`, `HowTo` | Configuration JSON snippet for custom local OpenAI-compatible endpoints |
| `comfyui red node missing custom nodes fix` | Troubleshooting | Fix Missing Red Nodes in ComfyUI [Step-by-Step Guide] | `HowTo`, `FAQPage` | Automated custom node dependency recovery script |
| `deepseek coder local vllm production setup` | Implementation | Serve DeepSeek Coder with vLLM & PagedAttention [Docker] | `TechArticle`, `HowTo` | Production `docker-compose.yml` with continuous batching flags |
| `best dual gpu setup local ai motherboard pcie` | Hardware Architecture | Dual GPU PCIe Lane Splitting for Local AI [Motherboard Matrix] | `TechArticle`, `FAQPage` | Verified motherboard list supporting dual x8/x8 bifurcation |

---

## 3. Pillar-to-Cluster Internal Linking Blueprint

```
[Hub 1: Hardware & Workstations]
├── /hardware/best-local-ai-workstation-build-guide-2026 (Pillar)
├── /hardware/ai-workstation-planner (Interactive Tool)
├── [New] RTX 4070 Ti Super vs RTX 3090 for Local AI
└── [New] Dual GPU PCIe Lane Splitting Guide

[Hub 2: ComfyUI Workflows]
├── /workflow/comfyui-beginner-first-workflow-guide (Pillar)
├── /create/comfyui-flux-lora-training-and-inference-guide (Flagship)
├── [New] Fix ComfyUI CUDA Sysmem Fallback Slowdown
└── [New] FLUX.1 FP8 vs GGUF vs NF4 Benchmark Matrix

[Hub 3: Local LLMs & Inference Engineering]
├── /workflow/reduce-local-llm-vram-quantization-offloading-guide (Pillar)
├── /hardware/run-local-llm-rtx-4050-laptop-guide (Pillar)
├── [New] Run 70B LLMs on a Single 24GB GPU
└── [New] LLM KV Cache VRAM Calculation Guide (8k to 128k)
```

---

## 4. Execution Roadmap for Next Release Cycle

1. **Week 1**: Publish *Fix ComfyUI 10x Slowdown (CUDA Sysmem Fallback)*. Target high-volume pain point from recent ComfyUI 0.3+ updates.
2. **Week 2**: Launch *Run 70B LLMs on Single 24GB GPU (RTX 4090/3090)*. Target high-CPM hardware purchasers evaluating GPU upgrades.
3. **Week 3**: Publish *FLUX.1 FP8 vs GGUF vs NF4 Benchmark Matrix*. Embed downloadable test images and node JSONs.
4. **Week 4**: Publish *RTX 4070 Ti Super vs RTX 3090 Local AI Comparison*. Route high-intent purchase traffic into the Workstation Planner.
