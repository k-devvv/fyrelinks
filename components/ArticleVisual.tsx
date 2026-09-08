import React from "react";
import { SiloCategory } from "@/lib/types";

interface ArticleVisualProps {
  category: SiloCategory;
  slug?: string;
}

export default function ArticleVisual({ category, slug }: ArticleVisualProps) {
  // Render tailored visual diagrams per category with rich SVG glassmorphism styling
  return (
    <div className="my-8 w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-7 shadow-2xl backdrop-blur-xl relative">
      {/* Atmospheric radial ambient glow */}
      <div className="absolute top-0 right-1/4 w-80 h-40 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Diagram Header Label */}
      <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-white/10 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="font-semibold tracking-wider uppercase text-slate-200">
            {category === "create" && "Generative Media & Latent Diffusion Architecture"}
            {category === "stack" && "Enterprise AI Infrastructure & Data Pipeline Graph"}
            {category === "workflow" && "Asynchronous Engineering & Cognitive IDE Flow"}
            {category === "hardware" && "Workstation High-Bandwidth Interconnect Topology"}
          </span>
        </div>
        <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-slate-400">
          Interactive System Spec (2026)
        </span>
      </div>

      {/* Responsive SVG Container */}
      <div className="w-full flex items-center justify-center">
        {category === "create" && <DiffusionNodeVisual />}
        {category === "stack" && <PipelineTreeVisual />}
        {category === "workflow" && <WorkflowArchitectureVisual />}
        {category === "hardware" && <HardwareTopologyVisual />}
      </div>
    </div>
  );
}

// 1. Create Silo: Diffusion Latent Nodes & Model Graph
function DiffusionNodeVisual() {
  return (
    <svg
      viewBox="0 0 800 240"
      className="w-full h-auto max-w-3xl"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="purpleGrad" x1="0" y1="0" x2="800" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="50%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
        <linearGradient id="nodeGrad" x1="0" y1="0" x2="160" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E1B4B" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0.9" />
        </linearGradient>
        <filter id="glowPurple" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#A855F7" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Connecting Paths with Data Flow Animation */}
      <path d="M170 80 H230" stroke="#64748B" strokeWidth="2" strokeDasharray="4 4" />
      <path d="M370 80 H430" stroke="#A855F7" strokeWidth="2.5" />
      <path d="M570 80 H630" stroke="#F97316" strokeWidth="2.5" />
      <path d="M170 170 C 210 170, 210 95, 230 95" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M370 170 C 410 170, 410 95, 430 95" stroke="#EC4899" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Node 1: Multimodal Prompt & Conditioning */}
      <g filter="url(#glowPurple)">
        <rect x="20" y="45" width="150" height="70" rx="12" fill="url(#nodeGrad)" stroke="#6366F1" strokeWidth="1.5" />
        <text x="35" y="72" fill="#818CF8" fontSize="10" fontFamily="monospace" fontWeight="bold">INPUT COND</text>
        <text x="35" y="92" fill="#FFFFFF" fontSize="13" fontWeight="bold">CLIP / T5-XXL</text>
        <text x="35" y="105" fill="#94A3B8" fontSize="9">Text & Reference Embeds</text>
      </g>

      {/* Node 1B: Noise Seed */}
      <g>
        <rect x="20" y="140" width="150" height="55" rx="10" fill="#0F172A" stroke="#334155" strokeWidth="1" />
        <text x="35" y="162" fill="#64748B" fontSize="10" fontFamily="monospace">LATENT NOISE</text>
        <text x="35" y="180" fill="#CBD5E1" fontSize="12" fontWeight="600">Rand Normal N(0, I)</text>
      </g>

      {/* Node 2: FLUX / SDXL Latent Transformer */}
      <g filter="url(#glowPurple)">
        <rect x="230" y="45" width="150" height="70" rx="12" fill="url(#nodeGrad)" stroke="#A855F7" strokeWidth="2" />
        <text x="245" y="72" fill="#C084FC" fontSize="10" fontFamily="monospace" fontWeight="bold">SAMPLER ENGINE</text>
        <text x="245" y="92" fill="#FFFFFF" fontSize="13" fontWeight="bold">Denoising DiT</text>
        <text x="245" y="105" fill="#94A3B8" fontSize="9">Euler / DPM++ 28 Steps</text>
      </g>

      {/* Node 2B: LoRA Weights */}
      <g>
        <rect x="230" y="140" width="150" height="55" rx="10" fill="#0F172A" stroke="#4C1D95" strokeWidth="1.2" />
        <text x="245" y="162" fill="#A855F7" fontSize="10" fontFamily="monospace">LORA ADAPTERS</text>
        <text x="245" y="180" fill="#E2E8F0" fontSize="12" fontWeight="600">Rank 16 / Alpha 16</text>
      </g>

      {/* Node 3: VAE Latent Decoder */}
      <g filter="url(#glowPurple)">
        <rect x="430" y="45" width="150" height="70" rx="12" fill="url(#nodeGrad)" stroke="#EC4899" strokeWidth="1.5" />
        <text x="445" y="72" fill="#F472B6" fontSize="10" fontFamily="monospace" fontWeight="bold">DECODING LAYER</text>
        <text x="445" y="92" fill="#FFFFFF" fontSize="13" fontWeight="bold">VAE 16-Channel</text>
        <text x="445" y="105" fill="#94A3B8" fontSize="9">Latent -&gt; RGB Pixel Space</text>
      </g>

      {/* Node 4: High-Res Render Output */}
      <g filter="url(#glowPurple)">
        <rect x="630" y="45" width="150" height="70" rx="12" fill="url(#nodeGrad)" stroke="#F97316" strokeWidth="2" />
        <text x="645" y="72" fill="#FB923C" fontSize="10" fontFamily="monospace" fontWeight="bold">FINAL RENDER</text>
        <text x="645" y="92" fill="#FFFFFF" fontSize="13" fontWeight="bold">1080p / 4K Frame</text>
        <text x="645" y="105" fill="#94A3B8" fontSize="9">Sub-surface Coherence</text>
      </g>
    </svg>
  );
}

// 2. Stack Silo: Pipeline Trees, Vector DBs & Scraping Workflows
function PipelineTreeVisual() {
  return (
    <svg
      viewBox="0 0 800 240"
      className="w-full h-auto max-w-3xl"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="stackNodeGrad" x1="0" y1="0" x2="160" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E293B" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0B0F17" stopOpacity="0.95" />
        </linearGradient>
        <filter id="glowOrange" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#F97316" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Connector lines */}
      <path d="M170 70 H230" stroke="#F97316" strokeWidth="2" />
      <path d="M370 70 H430" stroke="#E2E8F0" strokeWidth="2" />
      <path d="M570 70 H630" stroke="#10B981" strokeWidth="2.5" />
      <path d="M170 160 C 200 160, 200 85, 230 85" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M430 85 C 470 85, 470 160, 500 160" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Stage 1: Ingestion / Scrapers */}
      <g filter="url(#glowOrange)">
        <rect x="20" y="35" width="150" height="70" rx="12" fill="url(#stackNodeGrad)" stroke="#F97316" strokeWidth="1.5" />
        <text x="35" y="60" fill="#FB923C" fontSize="10" fontFamily="monospace" fontWeight="bold">STAGE 01: EXTRACT</text>
        <text x="35" y="80" fill="#FFFFFF" fontSize="13" fontWeight="bold">Firecrawl / Scrapling</text>
        <text x="35" y="93" fill="#94A3B8" fontSize="9">DOM -&gt; Markdown Tables</text>
      </g>

      {/* Stage 1B: Waterfall Enrichment */}
      <g>
        <rect x="20" y="130" width="150" height="55" rx="10" fill="#0B0F17" stroke="#334155" strokeWidth="1" />
        <text x="35" y="152" fill="#64748B" fontSize="10" fontFamily="monospace">DATA WATERFALL</text>
        <text x="35" y="170" fill="#E2E8F0" fontSize="12" fontWeight="600">Clay + Apollo APIs</text>
      </g>

      {/* Stage 2: Embedding Normalization */}
      <g filter="url(#glowOrange)">
        <rect x="230" y="35" width="150" height="70" rx="12" fill="url(#stackNodeGrad)" stroke="#38BDF8" strokeWidth="1.5" />
        <text x="245" y="60" fill="#7DD3FC" fontSize="10" fontFamily="monospace" fontWeight="bold">STAGE 02: EMBED</text>
        <text x="245" y="80" fill="#FFFFFF" fontSize="13" fontWeight="bold">Dense Vectors (1536d)</text>
        <text x="245" y="93" fill="#94A3B8" fontSize="9">Chunk &amp; Token Truncation</text>
      </g>

      {/* Stage 3: Vector DB Indexing */}
      <g filter="url(#glowOrange)">
        <rect x="430" y="35" width="150" height="70" rx="12" fill="url(#stackNodeGrad)" stroke="#A855F7" strokeWidth="2" />
        <text x="445" y="60" fill="#C084FC" fontSize="10" fontFamily="monospace" fontWeight="bold">STAGE 03: INDEX</text>
        <text x="445" y="80" fill="#FFFFFF" fontSize="13" fontWeight="bold">Qdrant HNSW + SQ</text>
        <text x="445" y="93" fill="#94A3B8" fontSize="9">4.2ms p99 / 72% RAM Save</text>
      </g>

      {/* Stage 3B: Hybrid Filter */}
      <g>
        <rect x="430" y="130" width="150" height="55" rx="10" fill="#0B0F17" stroke="#1E293B" strokeWidth="1" />
        <text x="445" y="152" fill="#94A3B8" fontSize="10" fontFamily="monospace">HYBRID ENGINE</text>
        <text x="445" y="170" fill="#38BDF8" fontSize="12" fontWeight="600">BM25 + Dense Re-Rank</text>
      </g>

      {/* Stage 4: High-Yield RAG Output */}
      <g filter="url(#glowOrange)">
        <rect x="630" y="35" width="150" height="70" rx="12" fill="url(#stackNodeGrad)" stroke="#10B981" strokeWidth="2" />
        <text x="645" y="60" fill="#34D399" fontSize="10" fontFamily="monospace" fontWeight="bold">STAGE 04: RETRIEVAL</text>
        <text x="645" y="80" fill="#FFFFFF" fontSize="13" fontWeight="bold">LLM Context Window</text>
        <text x="645" y="93" fill="#94A3B8" fontSize="9">Zero-Hallucination Prompt</text>
      </g>
    </svg>
  );
}

// 3. Workflow Silo: Asynchronous Sprints & IDE Multi-File Agent Flow
function WorkflowArchitectureVisual() {
  return (
    <svg
      viewBox="0 0 800 240"
      className="w-full h-auto max-w-3xl"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="workflowGrad" x1="0" y1="0" x2="160" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#064E3B" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#022C22" stopOpacity="0.9" />
        </linearGradient>
        <filter id="glowGreen" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#10B981" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Flow loops and branching */}
      <path d="M170 70 H230" stroke="#10B981" strokeWidth="2" />
      <path d="M370 70 H430" stroke="#34D399" strokeWidth="2" />
      <path d="M570 70 H630" stroke="#38BDF8" strokeWidth="2" />
      <path d="M705 105 V155 H95 V105" stroke="#047857" strokeWidth="1.5" strokeDasharray="4 4" />

      {/* Step 1: 48-Hour Silent RFC */}
      <g filter="url(#glowGreen)">
        <rect x="20" y="35" width="150" height="70" rx="12" fill="url(#workflowGrad)" stroke="#10B981" strokeWidth="1.5" />
        <text x="35" y="60" fill="#6EE7B7" fontSize="10" fontFamily="monospace" fontWeight="bold">PHASE 01: ARCH</text>
        <text x="35" y="80" fill="#FFFFFF" fontSize="13" fontWeight="bold">48h Silent RFC</text>
        <text x="35" y="93" fill="#A7F3D0" fontSize="9">Zero Synchronous Meetings</text>
      </g>

      {/* Step 2: Codebase Graph Indexing */}
      <g filter="url(#glowGreen)">
        <rect x="230" y="35" width="150" height="70" rx="12" fill="url(#workflowGrad)" stroke="#34D399" strokeWidth="1.5" />
        <text x="245" y="60" fill="#A7F3D0" fontSize="10" fontFamily="monospace" fontWeight="bold">PHASE 02: INDEX</text>
        <text x="245" y="80" fill="#FFFFFF" fontSize="13" fontWeight="bold">Merkle Tree Context</text>
        <text x="245" y="93" fill="#A7F3D0" fontSize="9">145k LOC Workspace Map</text>
      </g>

      {/* Step 3: Agentic Execution */}
      <g filter="url(#glowGreen)">
        <rect x="430" y="35" width="150" height="70" rx="12" fill="url(#workflowGrad)" stroke="#059669" strokeWidth="2" />
        <text x="445" y="60" fill="#6EE7B7" fontSize="10" fontFamily="monospace" fontWeight="bold">PHASE 03: AGENT</text>
        <text x="445" y="80" fill="#FFFFFF" fontSize="13" fontWeight="bold">Composer / Cascade</text>
        <text x="445" y="93" fill="#A7F3D0" fontSize="9">12-File Multi-Refactor</text>
      </g>

      {/* Step 4: Verification & Relational Sync */}
      <g filter="url(#glowGreen)">
        <rect x="630" y="35" width="150" height="70" rx="12" fill="url(#workflowGrad)" stroke="#38BDF8" strokeWidth="2" />
        <text x="645" y="60" fill="#7DD3FC" fontSize="10" fontFamily="monospace" fontWeight="bold">PHASE 04: SHIP</text>
        <text x="645" y="80" fill="#FFFFFF" fontSize="13" fontWeight="bold">CI Test &amp; Notion Sync</text>
        <text x="645" y="93" fill="#A7F3D0" fontSize="9">Continuous Rollup Status</text>
      </g>

      {/* Feedback loop caption */}
      <text x="400" y="175" textAnchor="middle" fill="#6EE7B7" fontSize="10" fontFamily="monospace">
        &lt;--- Relational Async Feedback Loop (Automated GitHub PR Triggers) ---&gt;
      </text>
    </svg>
  );
}

// 4. Hardware Silo: GPU Bus Layouts, PCIe Lanes & Memory Bandwidth
function HardwareTopologyVisual() {
  return (
    <svg
      viewBox="0 0 800 240"
      className="w-full h-auto max-w-3xl"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="hwGrad" x1="0" y1="0" x2="160" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0.9" />
        </linearGradient>
        <filter id="glowBlue" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#3B82F6" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* PCIe Bus Trunk and NVLink Bridge */}
      <path d="M170 70 H230" stroke="#3B82F6" strokeWidth="2.5" />
      <path d="M370 70 H430" stroke="#60A5FA" strokeWidth="2.5" />
      <path d="M570 70 H630" stroke="#38BDF8" strokeWidth="2.5" />
      <path d="M305 105 V140" stroke="#F59E0B" strokeWidth="3" />
      <path d="M505 105 V140" stroke="#F59E0B" strokeWidth="3" />
      <path d="M305 140 H505" stroke="#F59E0B" strokeWidth="3" strokeDasharray="6 3" />

      {/* Host CPU & PCIe Controller */}
      <g filter="url(#glowBlue)">
        <rect x="20" y="35" width="150" height="70" rx="12" fill="url(#hwGrad)" stroke="#3B82F6" strokeWidth="1.5" />
        <text x="35" y="60" fill="#93C5FD" fontSize="10" fontFamily="monospace" fontWeight="bold">HOST ROOT COMPLEX</text>
        <text x="35" y="80" fill="#FFFFFF" fontSize="13" fontWeight="bold">AMD Threadripper</text>
        <text x="35" y="93" fill="#BFDBFE" fontSize="9">64 PCIe 5.0 Dedicated Lanes</text>
      </g>

      {/* Primary GPU 01 */}
      <g filter="url(#glowBlue)">
        <rect x="230" y="35" width="150" height="70" rx="12" fill="url(#hwGrad)" stroke="#60A5FA" strokeWidth="2" />
        <text x="245" y="60" fill="#BFDBFE" fontSize="10" fontFamily="monospace" fontWeight="bold">GPU 01 (PCIe 16x)</text>
        <text x="245" y="80" fill="#FFFFFF" fontSize="13" fontWeight="bold">RTX 3090 / 4090</text>
        <text x="245" y="93" fill="#93C5FD" fontSize="9">24GB GDDR6X @ 1008 GB/s</text>
      </g>

      {/* Secondary GPU 02 */}
      <g filter="url(#glowBlue)">
        <rect x="430" y="35" width="150" height="70" rx="12" fill="url(#hwGrad)" stroke="#60A5FA" strokeWidth="2" />
        <text x="445" y="60" fill="#BFDBFE" fontSize="10" fontFamily="monospace" fontWeight="bold">GPU 02 (PCIe 16x)</text>
        <text x="445" y="80" fill="#FFFFFF" fontSize="13" fontWeight="bold">RTX 3090 (NVLink)</text>
        <text x="445" y="93" fill="#93C5FD" fontSize="9">24GB GDDR6X @ 1008 GB/s</text>
      </g>

      {/* Unified VRAM & Token Output */}
      <g filter="url(#glowBlue)">
        <rect x="630" y="35" width="150" height="70" rx="12" fill="url(#hwGrad)" stroke="#38BDF8" strokeWidth="2" />
        <text x="645" y="60" fill="#7DD3FC" fontSize="10" fontFamily="monospace" fontWeight="bold">COMBINED POOL</text>
        <text x="645" y="80" fill="#FFFFFF" fontSize="13" fontWeight="bold">48GB VRAM Pool</text>
        <text x="645" y="93" fill="#BAE6FD" fontSize="9">DeepSeek-R1 70B @ 4-bit</text>
      </g>

      {/* NVLink Interconnect Label */}
      <text x="405" y="160" textAnchor="middle" fill="#FBBF24" fontSize="10" fontFamily="monospace" fontWeight="bold">
        ◄=== 112 GB/s NVLink Hardware P2P Bridge ===►
      </text>
      <text x="405" y="180" textAnchor="middle" fill="#64748B" fontSize="9">
        1600W ATX 3.0 Titanium PSU • Sub-25ms Autoregressive Token Latency
      </text>
    </svg>
  );
}
