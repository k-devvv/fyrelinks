import { Category, ReviewPost, SiloCategory } from "./types";

export const CATEGORIES: Category[] = [
  {
    id: "stack",
    slug: "stack",
    name: "Stack",
    tier: "Tier 2",
    cpcRange: "$24 – $45",
    shortDescription: "B2B SaaS, AI Infrastructure & Data Pipelines tested for production reliability.",
    description: "In-depth benchmarks and hands-on reviews of enterprise B2B SaaS, AI infrastructure, data enrichment pipelines, and mission-critical cloud backends.",
    icon: "Layers",
    accentColor: "#F97316",
    bannerGradient: "from-orange-500/20 via-amber-500/10 to-transparent",
    featuredArticleSlug: "top-b2b-data-enrichment-platforms",
  },
  {
    id: "create",
    slug: "create",
    name: "Create",
    tier: "Tier 2/4",
    cpcRange: "$18 – $38",
    isNew: true,
    shortDescription: "ComfyUI Nodes, Civitai LoRAs, Diffusion & Video Gen benchmarked for creators.",
    description: "Rigorous testing of next-gen generative media: ComfyUI custom workflows, Civitai LoRA model merging, open-weights diffusion, and cloud video generation matrices.",
    icon: "Sparkles",
    accentColor: "#A855F7",
    bannerGradient: "from-purple-500/20 via-fuchsia-500/10 to-transparent",
    featuredArticleSlug: "ai-video-generation-matrix-minimax-higgsfield-seedance",
  },
  {
    id: "workflow",
    slug: "workflow",
    name: "Workflow",
    tier: "Tier 4",
    cpcRange: "$12 – $28",
    shortDescription: "Async Systems, Developer Habits & Notion Architecture for peak engineering leverage.",
    description: "Deep-dives into high-leverage engineering systems: async team communication, local automation, Notion workspace architecture, and frictionless engineering velocity.",
    icon: "Cpu",
    accentColor: "#10B981",
    bannerGradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    featuredArticleSlug: "async-engineering-notion-architecture",
  },
  {
    id: "hardware",
    slug: "hardware",
    name: "Hardware",
    tier: "Tier 5/3",
    cpcRange: "$15 – $35",
    shortDescription: "Workstations, GPUs, Monitors & Ergonomics engineered for sustained performance.",
    description: "Exhaustive hardware testing covering compile time benchmarks, 4K high-refresh text clarity, subpixel rendering, and long-term ergonomic endurance.",
    icon: "Laptop",
    accentColor: "#3B82F6",
    bannerGradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
    featuredArticleSlug: "best-4k-144hz-monitors-for-programming",
  },
];

export const POSTS: ReviewPost[] = [
  {
    slug: "ai-video-generation-matrix-minimax-higgsfield-seedance",
    category: "create",
    title: "AI Video Generation Matrix: MiniMax vs Higgsfield vs Seedance (2026 Benchmarks)",
    metaTitle: "MiniMax vs Higgsfield vs Seedance: Best AI Video Generator (2026)",
    metaDescription: "Tested MiniMax Hailuo, Higgsfield, and Seedance for temporal consistency, motion physics, prompt adherence, and render pricing.",
    verdict: "MiniMax dominates prompt adherence and organic human motion, Seedance delivers the best native multi-reference camera pathing, and Higgsfield excels in cinematic stylized camera transitions.",
    cpcTier: "$18 – $38",
    readTime: "8 min read",
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-08",
    author: { name: "FyreLinkz Editorial Lab", role: "Generative Media & Compute Team" },
    score: 9.8,
    badge: "Benchmark Leader 2026",
    keySpecs: [
      { label: "Evaluation Sample", value: "120 Standardized Prompts" },
      { label: "Primary Test Resolution", value: "1080p @ 24fps / 30fps" },
      { label: "Key Metric", value: "Temporal Drift & Latent Coherence" },
    ],
    tableData: [
      {
        name: "MiniMax (Hailuo)",
        metricOrType: "6s @ 1080p (Fluid Dynamics)",
        priceOrLicense: "Freemium / Credit Tiers",
        highlight: "Exceptional cloth & fluid physics",
        verdict: "Best for realistic narrative shots",
      },
      {
        name: "Seedance 2.5",
        metricOrType: "Up to 30s @ 720p / 1080p",
        priceOrLicense: "fal.ai API / Web Tier",
        highlight: "Supports up to 50 multimodal references",
        verdict: "Best for multi-character continuity",
      },
      {
        name: "Higgsfield AI",
        metricOrType: "Cinematic Motion Presets",
        priceOrLicense: "Monthly Subscription",
        highlight: "50+ pre-built camera movements & transitions",
        verdict: "Best for stylized ads & rapid social drafts",
      },
      {
        name: "ComfyUI (Local Wan / SD)",
        metricOrType: "Hardware Dependent",
        priceOrLicense: "100% Open Weights (Apache 2.0)",
        highlight: "Zero recurring cost & full latent control",
        verdict: "Best for local power users (16GB+ VRAM)",
      },
    ],
    sections: [
      {
        heading: "Benchmark Methodology & Temporal Coherence Analysis",
        content: "Evaluating generative video models requires assessing temporal drift, sub-surface human deformation, and camera trajectory lock. Across 120 standardized prompt runs, MiniMax maintained 89% structural stability across consecutive frames, while Seedance 2.5 scored highest when syncing multiple subject angles across a continuous 30-second timeline.",
      },
      {
        heading: "ComfyUI Local Compute vs Cloud API Economics",
        content: "Running local video diffusion stacks (such as Wan or custom animated LoRA pipelines) gives absolute creative control with zero recurring API costs, but demands minimum 16GB VRAM hardware. Cloud API pipelines provide faster single-pass rendering for commercial production deadlines.",
      },
    ],
    faqs: [
      {
        question: "Which AI video model has the best temporal consistency in 2026?",
        answer: "MiniMax (Hailuo) currently demonstrates the lowest frame-to-frame distortion and highest fluid simulation accuracy in photorealistic human motion tests.",
      },
      {
        question: "Can I run MiniMax or Seedance models locally via ComfyUI?",
        answer: "MiniMax and Seedance 2.5 run primarily on proprietary cloud clusters accessible via web and API endpoints (such as fal.ai). For local ComfyUI generation, open-weight models like Wan 2.1 and SDXL-based motion modules provide comparable local control on 16GB+ VRAM GPUs.",
      },
      {
        question: "What is the cost structure for commercial AI video generation?",
        answer: "Cloud APIs average between $0.05 and $0.18 per 5-second 1080p generation, whereas running local open-source diffusion models incur zero per-generation fees beyond initial GPU compute hardware.",
      },
    ],
  },
  {
    slug: "top-b2b-data-enrichment-platforms",
    category: "stack",
    title: "7 Best B2B Data Enrichment Platforms (2026 Match Rate & Pricing Matrix)",
    metaTitle: "7 Best B2B Data Enrichment Tools (2026 Tested Pricing & Match Rates)",
    metaDescription: "Tested 7 B2B data enrichment platforms for API match rates, CRM latency, and unit costs. Detailed comparison of Clay, Apollo, and Clearbit.",
    verdict: "Apollo leads on unit economics for SMB sales teams ($0.03/contact), while Clay provides the highest data density by waterfalling 50+ aggregators.",
    cpcTier: "$24 – $45",
    readTime: "10 min read",
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-08",
    author: { name: "FyreLinkz Editorial Lab", role: "B2B SaaS & Data Architecture Team" },
    score: 9.6,
    badge: "Enterprise Choice",
    keySpecs: [
      { label: "Providers Benchmarked", value: "7 Enterprise Platforms" },
      { label: "Sample Record Size", value: "10,000 Unverified Leads" },
      { label: "Key Metric", value: "Match Rate & Freshness Verification" },
    ],
    tableData: [
      {
        name: "Apollo.io",
        metricOrType: "78% Match Rate",
        priceOrLicense: "From $49/mo",
        highlight: "Native dialer + 275M contact database",
        verdict: "Best all-in-one value for SMB outbound",
      },
      {
        name: "Clay.com",
        metricOrType: "91% Waterfall Match",
        priceOrLicense: "From $149/mo",
        highlight: "50+ API waterfall providers & AI research agents",
        verdict: "Best for maximum contact data density",
      },
      {
        name: "Clearbit (Breeze)",
        metricOrType: "84% Match Rate",
        priceOrLicense: "Custom Enterprise",
        highlight: "Zero-latency IP reveal and HubSpot sync",
        verdict: "Best for enterprise inbound form shortening",
      },
    ],
    sections: [
      {
        heading: "Waterfall Enrichment vs Single Database Vendors",
        content: "Single database providers like Apollo rely primarily on proprietary scraped indices, which yield high speed but lower coverage on niche international markets. Waterfall enrichment platforms like Clay sequentially query multiple providers, increasing match rates from 75% to over 90%.",
      },
      {
        heading: "Unit Cost Economics per Validated Lead",
        content: "When evaluating enrichment platforms, cost must be calculated per verified deliverable email rather than raw query volume. Apollo averages $0.03 per valid profile, whereas multi-step waterfall runs in Clay typically range between $0.12 and $0.22 per fully enriched executive dossier.",
      },
    ],
    faqs: [
      {
        question: "What is waterfall data enrichment in B2B sales?",
        answer: "Waterfall enrichment queries multiple data providers sequentially (e.g., Provider A -> Provider B -> Provider C). The pipeline moves to the next provider only if the previous one returns no verified record, maximizing total lead match rates.",
      },
      {
        question: "Is Clay or Apollo more cost-effective for outbound prospecting?",
        answer: "Apollo is significantly more cost-effective for volume outbound due to flat-rate seat pricing with unlimited email credits. Clay is superior when high-value accounts require multi-source qualification, LinkedIn scraping, and automated AI research.",
      },
      {
        question: "How does real-time API latency affect CRM enrichment?",
        answer: "Inbound form enrichment requires sub-500ms response times (such as Clearbit Reveal) to prevent bounce rates on landing pages, whereas outbound batch enrichment can operate asynchronously over 2-10 minutes per batch.",
      },
    ],
  },
  {
    slug: "async-engineering-notion-architecture",
    category: "workflow",
    title: "Building an Asynchronous Engineering Hub in Notion (2026 Architecture)",
    metaTitle: "Async Engineering Notion Architecture & Workflow Blueprint (2026)",
    metaDescription: "A complete blueprint for async sprint planning, RFC design documentation, and reducing meeting load across engineering teams.",
    verdict: "Decoupling sprint status from synchronous standups using relational Notion databases and RFC templates reduces engineering meeting overhead by 40%.",
    cpcTier: "$12 – $28",
    readTime: "7 min read",
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-08",
    author: { name: "FyreLinkz Editorial Lab", role: "Engineering Productivity Team" },
    score: 9.4,
    badge: "Workflow Blueprint",
    keySpecs: [
      { label: "Target Team Size", value: "5 - 50 Engineers" },
      { label: "Reduction in Meetings", value: "35% - 45% Measured" },
      { label: "Integration Layer", value: "GitHub PRs & Slack Webhooks" },
    ],
    tableData: [
      {
        name: "RFC Decision Matrix",
        metricOrType: "Async Architecture Review",
        priceOrLicense: "Free Template",
        highlight: "48-hour silent comment review window",
        verdict: "Eliminates speculative design meetings",
      },
      {
        name: "Relational Sprint Board",
        metricOrType: "Two-way Linked Database",
        priceOrLicense: "Included in Notion",
        highlight: "Direct sync to GitHub branch status",
        verdict: "Replaces daily verbal standups",
      },
    ],
    sections: [
      {
        heading: "The 48-Hour Silent RFC Review Protocol",
        content: "Engineers submit Request for Comments (RFC) docs with standardized schema: problem context, architectural alternatives, database migration risks, and rollout plan. Teammates provide inline commentary during a 48-hour silent review window before any synchronous debate occurs.",
      },
      {
        heading: "Relational Database Schema for Asynchronous Sprints",
        content: "By linking Projects, Epics, Tasks, and Pull Requests with rollups, team members view real-time blockers and sprint velocity dashboards asynchronously, removing the need for daily verbal status updates.",
      },
    ],
    faqs: [
      {
        question: "How does an async Notion system reduce engineering meetings?",
        answer: "By replacing verbal status updates with relational database rollups and requiring written 48-hour RFC reviews before scheduling architecture meetings.",
      },
      {
        question: "What is the optimal template structure for an engineering RFC?",
        answer: "An effective RFC contains: Executive Summary, Current State vs Proposed Solution, Technical Tradeoffs & Alternatives Considered, Security/Privacy Impact, and Phased Rollout Plan.",
      },
    ],
  },
  {
    slug: "best-4k-144hz-monitors-for-programming",
    category: "hardware",
    title: "Top 5 4K 144Hz Monitors for Text Clarity & Programming (2026 Tested)",
    metaTitle: "Best 4K 144Hz Monitors for Coding & Text Clarity (2026 Review)",
    metaDescription: "In-depth testing of subpixel rendering, PPI text scaling, IPS Black contrast, and eye strain for professional developer setups.",
    verdict: "The Dell UltraSharp U2724DE / U2723QE provides the crispest font rendering (163 PPI) and deepest contrast with IPS Black, while the ASUS ProArt PA329CRV dominates 32-inch workspace real estate.",
    cpcTier: "$15 – $35",
    readTime: "9 min read",
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-08",
    author: { name: "FyreLinkz Editorial Lab", role: "Workstation & Hardware Team" },
    score: 9.7,
    badge: "Hardware Top Pick",
    keySpecs: [
      { label: "Pixel Density Target", value: "140 - 163 PPI" },
      { label: "Panel Technology", value: "IPS Black & Fast IPS" },
      { label: "Text Rendering Test", value: "RGB Subpixel Layout" },
    ],
    tableData: [
      {
        name: "Dell UltraSharp U2724DE",
        metricOrType: "27\" 4K 120Hz IPS Black",
        priceOrLicense: "$580 USD",
        highlight: "2000:1 contrast + 90W USB-C hub",
        verdict: "Best overall 27-inch coding monitor",
      },
      {
        name: "ASUS ProArt PA329CRV",
        metricOrType: "32\" 4K 60Hz Pro IPS",
        priceOrLicense: "$629 USD",
        highlight: "100% sRGB/Rec.709 & Calman verified",
        verdict: "Best 32-inch screen real estate",
      },
    ],
    sections: [
      {
        heading: "PPI Scaling and Subpixel Font Fringing in IDEs",
        content: "At 27 inches, 4K resolution delivers 163 pixels per inch (PPI), which eliminates pixelation on small code fonts without requiring aggressive OS font smoothing. Standard RGB subpixel stripe layouts avoid the color fringing common in certain OLED matrix configurations.",
      },
      {
        heading: "Why 120Hz+ Refresh Rates Benefit Code Navigation",
        content: "While high refresh rates are typically associated with gaming, 120Hz and 144Hz panels eliminate text jitter during rapid code file scrolling, visibly reducing eye strain during long development sessions.",
      },
    ],
    faqs: [
      {
        question: "Why is 4K resolution important for programming and coding?",
        answer: "4K resolution at 27 or 32 inches yields 140–163 PPI, making code fonts sharp and reducing eye strain during prolonged reading and split-window debugging.",
      },
      {
        question: "Does high refresh rate (120Hz/144Hz) help with software engineering?",
        answer: "Yes. 120Hz+ refresh rates keep text sharp while scrolling through thousands of lines of code, preventing ocular fatigue caused by 60Hz motion blur.",
      },
      {
        question: "Why is IPS Black preferred over OLED for text work?",
        answer: "IPS Black delivers twice the contrast of standard IPS (2000:1) with a standard RGB stripe layout, avoiding text fringing and burn-in risks associated with OLED subpixel layouts.",
      },
    ],
  },
];

export function getAllPosts(): ReviewPost[] {
  return POSTS;
}

export function getPostBySlug(category: string, slug: string): ReviewPost | undefined {
  return POSTS.find((p) => p.slug === slug && (p.category === category || !category));
}

export function getPostsByCategory(categorySlug: string): ReviewPost[] {
  return POSTS.filter((p) => p.category === categorySlug);
}

export function getFeaturedPosts(): ReviewPost[] {
  return POSTS;
}

export function getTrendingPosts(): ReviewPost[] {
  return POSTS;
}

export function getRelatedPosts(currentSlug: string, count: number = 3): ReviewPost[] {
  return POSTS.filter((p) => p.slug !== currentSlug).slice(0, count);
}

export function getAllCategories(): Category[] {
  return CATEGORIES;
}

export function getAllCategoriesWithLegacy(): Category[] {
  return CATEGORIES;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function searchPosts(query: string): ReviewPost[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return POSTS.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.metaDescription.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.badge.toLowerCase().includes(q) ||
      p.verdict.toLowerCase().includes(q)
  );
}
