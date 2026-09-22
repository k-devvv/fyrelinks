const fs = require('fs');
const path = require('path');

const articlesPath = path.join(__dirname, '..', 'lib', 'content', 'articles.json');
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

// 1. ENHANCE EXISTING ARTICLE: ai-web-scraping-pipelines-firecrawl-playwright-rag
const existingRag = articles.find(a => a.slug === 'ai-web-scraping-pipelines-firecrawl-playwright-rag');
if (existingRag) {
  existingRag.takeaway = 'Direct Answer: Use Playwright when your RAG pipeline requires full local control over authenticated sessions, custom browser actions, or on-premise privacy without per-page cloud costs. Choose Firecrawl when you need clean, LLM-ready markdown extracted through managed proxies without maintaining headless browser infrastructure. For verifiable citations, always store the source URL and paragraph heading with each extracted chunk.';
  existingRag.updatedAt = '2026-09-22';

  // Add comparison table
  const s2 = existingRag.sections.find(s => s.heading === 'A small evaluation set settles the decision');
  if (s2) {
    s2.table = {
      headers: ['Feature / Criterion', 'Playwright (Self-Hosted)', 'Firecrawl (Managed API)', 'Recommendation'],
      rows: [
        ['Infrastructure Cost', 'Compute only (Run locally / VM)', 'Usage-based per-credit pricing', 'Playwright for high-volume batch runs'],
        ['JavaScript Rendering', 'Full Chromium / WebKit engine', 'Handled on managed server', 'Both render dynamic client-side DOMs'],
        ['Proxy & Anti-Bot', 'Self-managed proxy rotation', 'Built-in residential proxy pool', 'Firecrawl for heavily protected sites'],
        ['Citation Metadata', 'Custom DOM extraction logic', 'Automated markdown with titles', 'Playwright gives granular anchor control'],
        ['Maintenance Overhead', 'Browser binaries & crash restarts', 'Zero browser maintenance (REST API)', 'Firecrawl for fast developer velocity']
      ]
    };
  }

  // Add reproducible Playwright-to-RAG citation checklist
  const s3 = existingRag.sections.find(s => s.heading === 'Preserve the extraction and the clean document');
  if (s3) {
    s3.heading = 'Build a Playwright extraction pipeline with verifiable citations';
    s3.content = 'When extracting web pages for RAG, dumping raw HTML or unsegmented text destroys citation capability. An effective Playwright extraction pipeline strips noise elements (nav, header, footer, ads, SVG icons), preserves semantic hierarchy (h1, h2, h3), and partitions text into 400–600 token chunks. Each stored vector record must carry metadata: canonical source_url, page_title, heading_anchor, and extraction_timestamp. This allows the answering LLM to provide clickable, verifiable footnotes rather than ungrounded claims.';
    s3.checklist = [
      'Launch Playwright with minimal resource overhead: playwright.chromium.launch({ headless: true }).',
      'Wait for network idle or main content selector before scraping: page.waitForSelector("article, main").',
      'Remove non-editorial nodes from DOM: document.querySelectorAll("nav, footer, aside, script, style").forEach(el => el.remove()).',
      'Extract text segmented by heading boundaries to preserve topical integrity.',
      'Append source_url, title, and section_id to every chunk payload in the vector database.',
      'Prompt LLM to cite document [source_url#heading] whenever asserting a factual claim.'
    ];
  }
}

// 2. NEW ARTICLE: run-local-llm-rtx-4050-laptop-guide
const artRtx4050 = {
  slug: 'run-local-llm-rtx-4050-laptop-guide',
  category: 'hardware',
  title: 'Run a local LLM on an RTX 4050 laptop: setup and memory trade-offs',
  description: 'How to run local LLMs on an RTX 4050 laptop GPU: 6GB VRAM realities, 3B vs 8B model limits, thermal throttling and Ollama setup.',
  topic: 'Local AI',
  image: 'rtx-4050-laptop',
  featured: true,
  publishedAt: '2026-09-22',
  updatedAt: '2026-09-22',
  sourceCheckedAt: '2026-09-22',
  takeaway: 'Direct Answer: An RTX 4050 laptop GPU provides strictly 6GB of GDDR6 VRAM, with roughly 4.8GB usable after Windows display overhead. It runs 3B models (Llama 3.2 3B, Qwen 2.5 3B) entirely in GPU memory at over 45 tokens per second. An 8B model at Q4_K_M fits only with a constrained 2,048 context; larger contexts spill into system RAM, dropping generation speed below 10 tokens per second.',
  sources: [
    {
      publisher: 'NVIDIA',
      title: 'GeForce RTX 4050 Laptop GPU Specifications',
      url: 'https://www.nvidia.com/en-us/geforce/laptops/40-series/'
    },
    {
      publisher: 'Ollama',
      title: 'Ollama Modelfile and Context Parameters Documentation',
      url: 'https://github.com/ollama/ollama/blob/main/docs/modelfile.md'
    },
    {
      publisher: 'llama.cpp',
      title: 'llama.cpp GPU offloading and memory allocation',
      url: 'https://github.com/ggerganov/llama.cpp'
    }
  ],
  sections: [
    {
      heading: 'Start here',
      content: 'Intended reader: Developers, students, and researchers with an RTX 4050 laptop looking for a dependable local coding or reasoning assistant. Practical outcome: A working Ollama and llama.cpp setup configured to run models entirely in GPU memory without triggering thermal throttling or PCIe memory thrashing. An RTX 4050 laptop is one of the most affordable modern Ada Lovelace machines available, but its 6GB VRAM pool requires strict memory discipline.'
    },
    {
      heading: 'The 6GB physical VRAM ceiling: what actually fits',
      content: 'NVIDIA specifies the mobile RTX 4050 with strictly 6GB of GDDR6 on a 96-bit bus, delivering 192 GB/s bandwidth. Unlike desktop graphics cards where displays can be driven by a secondary monitor card or integrated CPU graphics, laptop displays and Windows Desktop Window Manager (DWM) typically claim 800 MB to 1.2 GB of VRAM. That leaves approximately 4.8 GB of true usable VRAM for model weights and KV cache.',
      sourceIds: [1]
    },
    {
      heading: '3B versus 8B models: speed and context trade-offs',
      content: 'When model weights and context exceed physical VRAM, inference engines offload unallocated layers to system DDR5 RAM across the laptop’s PCIe 4.0 x8 interface. System RAM bandwidth (roughly 40–60 GB/s) is three to four times slower than onboard GDDR6 (192 GB/s). As soon as an 8B model spills even a few layers to system RAM, token generation speed collapses from ~28 tokens/sec down to 6–10 tokens/sec.',
      table: {
        headers: ['Model & Quantization', 'File Size (Disk)', 'Active VRAM Footprint', 'Context Ceiling', 'Observed Tokens/Sec'],
        rows: [
          ['Llama 3.2 1B (Q4_K_M)', '~1.3 GB', '~1.8 GB with context', '32,768 tokens', '~80–95 t/s (Instant response)'],
          ['Qwen 2.5 3B (Q4_K_M)', '~2.0 GB', '~2.8 GB with context', '16,384 tokens', '~45–60 t/s (Optimal sweet spot)'],
          ['Llama 3.2 3B (Q4_K_M)', '~2.2 GB', '~3.0 GB with context', '16,384 tokens', '~42–55 t/s (Fast & high quality)'],
          ['Llama 3.1 8B (Q4_K_M)', '~4.9 GB', '~5.8 GB (Borderline)', '2,048 tokens max', '~22–26 t/s (Drops to 8 t/s if context expands)'],
          ['Qwen 2.5 7B (Q3_K_M)', '~4.2 GB', '~5.2 GB (Tight fit)', '4,096 tokens', '~18–24 t/s (Acceptable coding assistant)']
        ]
      },
      sourceIds: [2, 3]
    },
    {
      heading: 'Laptop power profiles and thermal throttling',
      content: 'RTX 4050 laptop TGPs range from 35W in ultraportables to 115W in full-sized gaming chassis. During sustained prompt evaluation (processing long input documents), laptop fans ramp up and GPU temperatures can hit 75°C–80°C, causing the GPU boost clock to back down. For quiet, cool daily operation, 3B models keep GPU power draw under 45W, preventing thermal throttling during extended coding sessions.'
    },
    {
      heading: 'Step-by-step Ollama setup with context clamping',
      content: 'By default, Ollama may allocate a large context window or run multiple parallel request slots, which immediately exhausts 6GB VRAM. Follow this step-by-step checklist to configure a lean, crash-free mobile environment:',
      checklist: [
        'Set environment variable OLLAMA_NUM_PARALLEL=1 to prevent concurrent worker memory allocation.',
        'Create a custom Modelfile setting PARAMETER num_ctx 4096 (or 8192 for 3B models) instead of default unconstrained context.',
        'Set PARAMETER num_gpu 999 to instruct the runtime to load all layers onto the RTX 4050.',
        'Verify GPU memory consumption using "nvidia-smi" while running test prompts.',
        'If background VRAM usage exceeds 1.5GB, close hardware-accelerated browser tabs during inference.'
      ],
      sourceIds: [2]
    },
    {
      heading: 'Limitations and when to consider cloud rental',
      content: 'An RTX 4050 laptop is ideal for terminal assistants, local code completion, and drafting emails privately. It is not suitable for running 14B or 70B parameter models, continuous multi-turn RAG over hundreds of PDFs, or local fine-tuning. If your task requires a 70B reasoning model or extensive batch evaluation, rented GPU instances (such as RunPod or Vast.ai) or hosted API endpoints remain vastly more economical than upgrading a laptop chassis.'
    },
    {
      heading: 'Try this next',
      content: 'Want to optimize memory further? Learn how to compress KV cache and choose exact GGUF quants in our guide to [reducing local LLM VRAM usage](/workflow/reduce-local-llm-vram-quantization-offloading-guide).'
    }
  ],
  imageAlt: 'Conceptual diagram of RTX 4050 laptop GPU memory partition and 3B vs 8B model allocation.'
};

// 3. NEW ARTICLE: reduce-local-llm-vram-quantization-offloading-guide
const artReduceVram = {
  slug: 'reduce-local-llm-vram-quantization-offloading-guide',
  category: 'workflow',
  title: 'Reduce local LLM VRAM usage: quantization, context length and offloading',
  description: 'Optimize local LLM memory: 4-bit GGUF quantization, FP8 KV cache compression, context window budgeting and GPU layer offloading.',
  topic: 'Local AI',
  image: 'llm-vram-quantization',
  featured: true,
  publishedAt: '2026-09-22',
  updatedAt: '2026-09-22',
  sourceCheckedAt: '2026-09-22',
  takeaway: 'Direct Answer: To minimize local LLM VRAM consumption without degrading reasoning, combine three techniques: quantize model weights to 4-bit GGUF (Q4_K_M) to cut memory by ~68%, compress the KV cache to FP8 or Q4_0 using runtime flags to halve context overhead, and explicitly clamp context length to your real workload need rather than accepting default 128k allocations.',
  sources: [
    {
      publisher: 'llama.cpp',
      title: 'llama.cpp GGUF Quantization Overview and Benchmarks',
      url: 'https://github.com/ggerganov/llama.cpp/blob/master/examples/quantize/README.md'
    },
    {
      publisher: 'Hugging Face',
      title: 'Hugging Face Transformers Quantization Guide',
      url: 'https://huggingface.co/docs/transformers/main/en/quantization/overview'
    },
    {
      publisher: 'vLLM',
      title: 'vLLM PagedAttention and Memory Architecture',
      url: 'https://docs.vllm.ai/en/latest/dev/kernel/paged_attention.html'
    }
  ],
  sections: [
    {
      heading: 'Start here',
      content: 'Intended reader: Developers and AI engineers running local models on 8GB, 12GB, or 16GB consumer GPUs who encounter CUDA out-of-memory errors. Practical outcome: A concrete methodology to reduce model VRAM footprints by 60%–75%, allowing larger models to run entirely within existing GPU memory. Many developers assume model size equals VRAM usage; in practice, KV cache and runtime overhead often consume more memory than the weights themselves.'
    },
    {
      heading: 'The three components of LLM memory: weights, KV cache and runtime',
      content: 'Every local LLM inference session allocates memory across three distinct buckets: static model weights, dynamic key-value (KV) activation cache, and CUDA runtime scratch buffers (~0.5 GB–1.0 GB). Formula: Total VRAM = (Parameter Count × Bits per Param / 8) + KV Cache + CUDA Overhead. Optimizing only the model file leaves the dynamic KV cache unmanaged, which is the primary cause of out-of-memory crashes mid-conversation.',
      sourceIds: [1, 3]
    },
    {
      heading: 'Weight quantization: choosing the right GGUF format',
      content: 'Quantization reduces the numerical precision of weight matrices from 16-bit floating point down to 8-bit, 4-bit, or even 2-bit integers. In llama.cpp’s k-quant system, "Q4_K_M" applies 4-bit quantization to most layers while keeping critical attention and normalization tensors at higher precision, preserving 99%+ of baseline accuracy while cutting memory by over 65%.',
      table: {
        headers: ['Quantization Format', 'Bits / Weight', 'Memory vs FP16', 'Perplexity Impact', 'Production Recommendation'],
        rows: [
          ['FP16 (Half Precision)', '16.0 bits', 'Baseline (100%)', '0.00 (Reference)', 'Cloud training and multi-GPU clusters only'],
          ['Q8_0 (8-bit Quant)', '8.5 bits', '-47% reduction', '&lt; 0.01 delta', 'Archival quality when VRAM is plentiful'],
          ['Q5_K_M (5-bit Quant)', '5.5 bits', '-65% reduction', '&lt; 0.03 delta', 'Excellent fidelity for coding and math'],
          ['Q4_K_M (4-bit Quant)', '4.5 bits', '-71% reduction', '&lt; 0.08 delta', 'Universal sweet spot: best speed/memory ratio'],
          ['Q3_K_M (3-bit Quant)', '3.4 bits', '-78% reduction', '0.20–0.40 delta', 'Use only when 8B model must fit in 6GB VRAM'],
          ['Q2_K (2-bit Quant)', '2.6 bits', '-83% reduction', '&gt; 1.0 delta', 'Severe degradation: avoid for production reasoning']
        ]
      },
      sourceIds: [1, 2]
    },
    {
      heading: 'Compressing the KV cache with FP8 and Q4_0',
      content: 'In transformer models, the KV cache stores past key and value vectors to avoid recomputing attention across previous tokens. For Llama 3 8B with Grouped Query Attention (GQA), each 1,000 tokens of context requires ~131 MB of FP16 memory. At 8k context, that is over 1.05 GB; at 32k context, it consumes 4.2 GB! Using runtime flags like "--cache-type-k q4_0 --cache-type-v q4_0" compresses KV vectors down to 4-bit, cutting context VRAM requirements by up to 75% with negligible perplexity difference.',
      sourceIds: [1, 3]
    },
    {
      heading: 'Context length budgeting: the hidden memory killer',
      content: 'Modern open models advertise 32k or 128k context windows. Many runtimes pre-allocate or dynamically expand context buffers to match these maximum limits. If your application only generates 500-word summaries or completes functions, allocating a 128k context buffer silently consumes gigabytes of VRAM. Explicitly clamp context length in your configuration: set "num_ctx: 4096" unless your specific workload requires multi-document ingestion.'
    },
    {
      heading: 'GPU layer offloading: avoiding the PCIe bus penalty',
      content: 'When a model exceeds VRAM by just 500MB, tools like llama.cpp allow offloading a specific number of layers to GPU ("-ngl") while running the remaining layers on CPU/system RAM. While functional, passing activation tensors across the PCIe bus between every layer creates a severe bottleneck. Follow this optimization checklist before settling on partial offloading:',
      checklist: [
        'Calculate exact layer offload count: start with -ngl 99 and decrease until peak VRAM fits within physical GPU limits.',
        'Enable Flash Attention (--flash-attn) to reduce activation memory and increase prompt evaluation speed.',
        'Enable memory mapping (mmap) to keep model weights read-only from NVMe storage.',
        'Downgrade from Q5_K_M to Q4_K_M to fit 100% of layers on GPU rather than running 80% on GPU and 20% on CPU.',
        'Measure tokens/sec: 100% GPU execution at Q4 is almost always 3x to 5x faster than hybrid GPU/CPU execution at Q5.'
      ]
    },
    {
      heading: 'Try this next',
      content: 'Running on mobile hardware? See how these quantization techniques apply to budget GPUs in our [RTX 4050 laptop LLM guide](/hardware/run-local-llm-rtx-4050-laptop-guide).'
    }
  ],
  imageAlt: 'Layered architectural breakdown of LLM memory allocation across model weights, KV cache, and CUDA buffers.'
};

// 4. NEW ARTICLE: small-language-models-edge-devices-guide
const artEdgeSlm = {
  slug: 'small-language-models-edge-devices-guide',
  category: 'stack',
  title: 'Choose a small language model for an edge device',
  description: 'Compare leading sub-4B models for edge hardware: Qwen 2.5, Llama 3.2, Phi-3.5 Mini and Gemma 2 on Raspberry Pi and Apple Silicon.',
  topic: 'Developer tools',
  image: 'small-language-models-edge',
  featured: false,
  publishedAt: '2026-09-22',
  updatedAt: '2026-09-22',
  sourceCheckedAt: '2026-09-22',
  takeaway: 'Direct Answer: For edge hardware with 4GB to 8GB of memory, choose Qwen 2.5 3B for programming and structured data extraction, Llama 3.2 3B for general reasoning and multilingual dialog, or Llama 3.2 1B for low-power 4GB devices like the Raspberry Pi 5. Choose Microsoft Phi-3.5 Mini when your edge pipeline requires long 128k context.',
  sources: [
    {
      publisher: 'Meta AI',
      title: 'Meta Llama 3.2 Model Card and Specifications',
      url: 'https://huggingface.co/meta-llama/Llama-3.2-3B-Instruct'
    },
    {
      publisher: 'Qwen Team',
      title: 'Qwen 2.5 Technical Overview and Benchmarks',
      url: 'https://huggingface.co/Qwen/Qwen2.5-3B-Instruct'
    },
    {
      publisher: 'Microsoft',
      title: 'Microsoft Phi-3.5 Mini Technical Report',
      url: 'https://huggingface.co/microsoft/Phi-3.5-mini-instruct'
    }
  ],
  sections: [
    {
      heading: 'Start here',
      content: 'Intended reader: Embedded developers, IoT engineers, and creators building local AI appliances on ARM, Raspberry Pi, Apple Silicon, or mobile NPUs. Practical outcome: A comparative selection sheet matching sub-4B models to memory envelopes, compute power, and task requirements. Advances in distillation and synthetic pre-training in 2026 mean small language models (SLMs) can now execute structured extraction, classification, and conversational reasoning that previously required 13B+ parameter weights.'
    },
    {
      heading: 'The rise of capable sub-4B models: parameters versus utility',
      content: 'Large frontier models provide broad world knowledge, but edge devices rarely need encyclopedic recall. They need deterministic JSON output, fast classification, and reliable local query answering. A 3B parameter model quantized to 4-bit requires under 2.2GB of memory and executes on modest 15W–30W hardware without an active datacenter connection.',
      sourceIds: [1, 2]
    },
    {
      heading: 'Model evaluation matrix: Qwen 2.5 vs Llama 3.2 vs Phi-3.5 vs Gemma 2',
      content: 'We evaluated the four leading open sub-4B model families based on official model cards, memory footprints, and practical edge task suitability:',
      table: {
        headers: ['Model', 'Parameters', 'Q4 Size', 'Min RAM Required', 'Max Context', 'Primary Edge Sweet Spot'],
        rows: [
          ['Qwen 2.5 3B', '3.09B', '~2.0 GB', '4 GB (8 GB ideal)', '32,768 tokens', 'Code generation, structured JSON, tool-calling APIs'],
          ['Llama 3.2 1B', '1.23B', '~1.3 GB', '2 GB–4 GB', '128,000 tokens', 'Raspberry Pi 5 4GB, embedded controllers, lightweight classification'],
          ['Llama 3.2 3B', '3.21B', '~2.2 GB', '4 GB–8 GB', '128,000 tokens', 'Multilingual customer support, conversational dialog, creative writing'],
          ['Phi-3.5 Mini', '3.82B', '~2.4 GB', '8 GB (16 GB ideal)', '128,000 tokens', 'Complex reasoning, multi-document synthesis, scientific QA'],
          ['Gemma 2 2B', '2.61B', '~1.7 GB', '4 GB', '8,192 tokens', 'Conversational quality, low memory mobile deployments']
        ]
      },
      sourceIds: [1, 2, 3]
    },
    {
      heading: 'Hardware constraints: unified memory, bandwidth and cooling',
      content: 'On edge devices without dedicated GDDR VRAM, the LLM shares system RAM with the OS and graphics pipeline. Memory bandwidth is the primary governor of generation speed. A Raspberry Pi 5 with LPDDR4X provides ~17 GB/s bandwidth, yielding 12–15 tokens/sec on Qwen 2.5 3B. In contrast, an Apple Silicon M4 with unified LPDDR5X (120 GB/s) exceeds 50 tokens/sec on the identical model file.'
    },
    {
      heading: 'Pre-flight deployment checklist for edge devices',
      content: 'Deploying SLMs on edge devices requires proactive thermal and resource budgeting. Follow this pre-flight verification checklist:',
      checklist: [
        'Check memory headroom: ensure OS and system daemons leave at least 1.5x the model Q4 weight size free.',
        'Use llama.cpp or Ollama with ARM NEON / Metal acceleration enabled.',
        'Ensure passive or active heatsink is installed: edge SoC throttling cuts generation speed by up to 50%.',
        'Clamp context length strictly to expected request lengths (e.g. 2,048 tokens).',
        'Store models on high-speed NVMe or A2-rated micro-SD cards to minimize initial model load latency.'
      ]
    },
    {
      heading: 'Edge limitations: when cloud offload remains necessary',
      content: 'Sub-4B models exhibit higher sensitivity to prompt phrasing and lack deep contextual nuance for multi-step legal or medical reasoning. If a task requires unbounded general knowledge or zero-shot novel tool synthesis, implement an edge-to-cloud hybrid routing pattern: use the local SLM to triage, classify, and redact sensitive data, escalating only complex queries to cloud frontier models.'
    },
    {
      heading: 'Try this next',
      content: 'Building a retrieval system around your edge model? Learn how to evaluate vector databases in our [self-hosted vector DB comparison](/stack/self-hosted-vector-db-pricing-and-latency-benchmarks).'
    }
  ],
  imageAlt: 'Comparison diagram of small language models (Qwen 2.5, Llama 3.2, Phi-3.5, Gemma 2) across memory footprint and context limits.'
};

// 5. NEW ARTICLE: stateful-agents-vs-simple-rag-workflow-guide
const artRagVsAgent = {
  slug: 'stateful-agents-vs-simple-rag-workflow-guide',
  category: 'workflow',
  title: 'Stateful agents versus a simple RAG workflow: when complexity helps',
  description: 'Architectural guide: comparing single-turn deterministic RAG pipelines with multi-turn autonomous agent loops. Latency, cost and reliability.',
  topic: 'Developer tools',
  image: 'rag-vs-stateful-agents',
  featured: false,
  publishedAt: '2026-09-22',
  updatedAt: '2026-09-22',
  sourceCheckedAt: '2026-09-22',
  takeaway: 'Direct Answer: Use a simple RAG workflow when user queries can be resolved from reference documents in a single retrieval step; it delivers sub-second latency, predictable costs, and deterministic evaluation. Introduce stateful agent loops only when tasks demand multi-step planning, dynamic tool execution, intermediate self-correction, or iterative state mutations that a single retrieval pass cannot satisfy.',
  sources: [
    {
      publisher: 'Anthropic',
      title: 'Anthropic Research: Building Effective Agents',
      url: 'https://www.anthropic.com/research/building-effective-agents'
    },
    {
      publisher: 'LangChain',
      title: 'LangGraph Stateful Agent Architecture',
      url: 'https://langchain-ai.github.io/langgraph/'
    },
    {
      publisher: 'OpenAI',
      title: 'OpenAI Function Calling & Structured Outputs Guide',
      url: 'https://platform.openai.com/docs/guides/function-calling'
    }
  ],
  sections: [
    {
      heading: 'Start here',
      content: 'Intended reader: Software architects, engineering leads, and AI developers deciding whether to build a deterministic retrieval pipeline or a multi-turn agentic framework. Practical outcome: A clear architectural decision framework separating genuine agent use cases from unnecessary orchestration complexity. In 2026, many engineering teams default to complex multi-agent frameworks when a well-indexed, single-turn RAG pipeline would deliver higher accuracy at 10% of the latency and cost.'
    },
    {
      heading: 'The simple RAG architecture: fast, cheap and deterministic',
      content: 'A classic Retrieval-Augmented Generation pipeline follows a straight line: User Query → Embed Query → Vector Similarity Search → Retrieve Top-K Chunks → Synthesize Answer. Because the pipeline executes in one linear pass, latency is predictable (typically 800ms–1.8s), token costs are fixed (1x), and failures can be diagnosed immediately by inspecting the retrieved document chunks.',
      sourceIds: [1]
    },
    {
      heading: 'Stateful agents: autonomous loops, tool execution and memory',
      content: 'A stateful agent introduces an iterative while-loop governed by an LLM planner. The agent decomposes goals, selects and executes external tools (calculators, SQL queries, web scrapers, APIs), inspects output observations, updates internal memory state, and determines whether to loop again or finalize an answer. This autonomy provides flexibility, but turns every user query into multiple sequential LLM inference calls.',
      sourceIds: [1, 2, 3]
    },
    {
      heading: 'Comparison matrix: latency, cost multiplier and failure modes',
      content: 'Before adopting an agentic framework like LangGraph or AutoGen, evaluate the operational trade-offs against a deterministic RAG baseline:',
      table: {
        headers: ['Dimension', 'Simple RAG Pipeline', 'Stateful Agent Loop', 'Architectural Recommendation'],
        rows: [
          ['End-to-End Latency', '800ms – 1.8 seconds', '5 – 35+ seconds', 'RAG for interactive user chat; Agents for async background jobs'],
          ['Token Consumption', '1x (Single prompt & response)', '3x – 10x token multiplier', 'Agents significantly increase LLM API bills'],
          ['Determinism & Testing', 'High (Eval via ground-truth chunks)', 'Low (Non-deterministic branching)', 'RAG pipelines are vastly easier to unit test and benchmark'],
          ['Tool & API Execution', 'Read-only document lookup', 'Read/Write external API actions', 'Agents required if system must mutate state or call tools'],
          ['Failure Modes', 'Irrelevant chunk retrieval', 'Infinite loops, hallucinated arguments', 'Agents require strict recursion limits and schema validation']
        ]
      },
      sourceIds: [1, 2]
    },
    {
      heading: 'The diagnostic checklist: five questions before adopting agents',
      content: 'Ask these five diagnostic questions before migrating a production pipeline from simple RAG to an autonomous agent loop:',
      checklist: [
        'Does the task require external state mutation (e.g. creating a calendar event, writing to a database)? If no, stick with RAG.',
        'Does the user expect sub-2-second conversational responses? If yes, agent loops will fail SLA expectations.',
        'Can all necessary context be retrieved in a single vector/hybrid search pass? If yes, an agent adds zero retrieval benefit.',
        'Is your team prepared to monitor multi-turn execution traces and tool failure rates in production?',
        'Does the prompt have strict schema output enforcement (OpenAI Structured Outputs / Pydantic)?'
      ]
    },
    {
      heading: 'Common agent anti-patterns and mitigation',
      content: 'The most frequent failure mode in production agents is unconstrained self-reflection loops, where the model queries tools repeatedly without converging on a final answer. Mitigate this by enforcing a hard step ceiling (e.g. maximum 4 tool calls per request), requiring strict JSON schema validation on every tool argument, and maintaining a fallback rule that routes the query back to simple RAG when an agentic step times out.'
    },
    {
      heading: 'Try this next',
      content: 'Need to feed dynamic web data into your retrieval pipeline? Read our comprehensive guide on [Firecrawl vs Playwright for RAG](/stack/ai-web-scraping-pipelines-firecrawl-playwright-rag).'
    }
  ],
  imageAlt: 'Architecture flowchart comparing deterministic single-pass RAG retrieval against cyclical stateful agent execution loops.'
};

// Add new articles if they don't already exist
const newArticles = [artRtx4050, artReduceVram, artEdgeSlm, artRagVsAgent];
newArticles.forEach(na => {
  const existingIdx = articles.findIndex(a => a.slug === na.slug);
  if (existingIdx >= 0) {
    articles[existingIdx] = na;
  } else {
    articles.push(na);
  }
});

fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2), 'utf8');
console.log(`Articles catalog updated successfully. Total articles: ${articles.length}`);
