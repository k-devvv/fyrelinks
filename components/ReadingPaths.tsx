import Link from "next/link";
const paths: Record<string, {href:string;title:string;description:string}[]> = {
  "home": [
    {
      "href": "/news/jev-needle3-small-ai-models-gpu-cost",
      "title": "Needle 3 vs Jev: local tools, API costs and limits",
      "description": "Compare local processing with hosted typed decisions."
    },
    {
      "href": "/stack/ai-web-scraping-pipelines-firecrawl-playwright-rag",
      "title": "Scrapling vs Firecrawl vs Playwright for RAG",
      "description": "Choose extraction, managed capture or browser control."
    },
    {
      "href": "/workflow/cursor-vs-windsurf-vs-copilot-developer-benchmarks",
      "title": "Cursor vs Windsurf vs Copilot: compare one real coding task",
      "description": "Compare completed changes using a blank review log."
    }
  ],
  "news": [
    {
      "href": "/news/jev-needle3-small-ai-models-gpu-cost",
      "title": "Needle 3 vs Jev: local tools, API costs and limits",
      "description": "Compare local processing with hosted typed decisions."
    },
    {
      "href": "/news/reflection-beam-gpu-requirements-open-weights",
      "title": "Reflection Beam GPU memory: 501B total vs 23B active",
      "description": "Separate active parameters from weight-memory requirements."
    },
    {
      "href": "/news/comfy-mcp-local-workflows",
      "title": "Comfy MCP connects agents to local workflows",
      "description": "Start with one small, inspectable agent task."
    }
  ],
  "create": [
    {
      "href": "/workflow/comfyui-beginner-first-workflow-guide",
      "title": "ComfyUI First Image: Official Workflow & Fixes",
      "description": "Make one working baseline before adding nodes."
    },
    {
      "href": "/create/civitai-sdxl-photorealism-checkpoint-matrix",
      "title": "Choosing an SDXL checkpoint: a fair comparison checklist",
      "description": "Record settings and rejected outputs with a blank test sheet."
    },
    {
      "href": "/create/ai-video-generation-matrix-minimax-higgsfield-seedance",
      "title": "MiniMax vs Seedance vs Higgsfield: comparison checklist",
      "description": "Compare model access, controls and accepted takes."
    }
  ],
  "workflow": [
    {
      "href": "/workflow/comfyui-beginner-first-workflow-guide",
      "title": "ComfyUI First Image: Official Workflow & Fixes",
      "description": "Make one working baseline before adding nodes."
    },
    {
      "href": "/workflow/cursor-vs-windsurf-vs-copilot-developer-benchmarks",
      "title": "Cursor vs Windsurf vs Copilot: compare one real coding task",
      "description": "Compare completed changes using a blank review log."
    },
    {
      "href": "/workflow/stateful-agents-vs-simple-rag-workflow-guide",
      "title": "RAG vs stateful agents: latency, cost & failure modes",
      "description": "Choose the simplest architecture that solves the task."
    }
  ],
  "hardware": [
    {
      "href": "/hardware/run-local-llm-rtx-4050-laptop-guide",
      "title": "Run a local LLM on an RTX 4050 laptop: 6GB setup guide",
      "description": "Check local allocation and record a repeatable run."
    },
    {
      "href": "/hardware/best-local-ai-workstation-build-guide-2026",
      "title": "Local AI workstation GPU guide: workload checklist",
      "description": "Start with workload and model-memory requirements."
    },
    {
      "href": "/stack/local-vs-cloud-ai-cost-per-accepted-task",
      "title": "Local vs cloud AI costs: a worksheet for small teams",
      "description": "Count accepted results, retries and operating costs."
    }
  ],
  "stack": [
    {
      "href": "/stack/ai-web-scraping-pipelines-firecrawl-playwright-rag",
      "title": "Scrapling vs Firecrawl vs Playwright for RAG",
      "description": "Choose extraction, managed capture or browser control."
    },
    {
      "href": "/stack/self-hosted-vector-db-pricing-and-latency-benchmarks",
      "title": "Qdrant vs Weaviate vs Milvus vs Pinecone: what to compare",
      "description": "Compare retrieval relevance, filters and recovery work."
    },
    {
      "href": "/workflow/stateful-agents-vs-simple-rag-workflow-guide",
      "title": "RAG vs stateful agents: latency, cost & failure modes",
      "description": "Choose the simplest architecture that solves the task."
    }
  ],
  "finance": [
    {
      "href": "/finance/high-yield-savings-vs-cd-apy-access-penalties",
      "title": "High-yield savings vs CDs: compare APY, access and penalties",
      "description": "Compare yield, access restrictions and penalties."
    },
    {
      "href": "/finance/investment-fees-expense-ratio-cost-example",
      "title": "Investment fees explained: what a 1% charge really costs",
      "description": "See how fees change an illustrative result."
    },
    {
      "href": "/finance/crypto-investment-scams-wallet-recovery-fee-checklist",
      "title": "Crypto scams: guaranteed returns and recovery-fee warnings",
      "description": "Recognize recovery-fee and guaranteed-return warnings."
    }
  ]
};
export default function ReadingPaths({ category }: { category: string }) {
  const items = paths[category];
  if (!items) return null;
  return <section className="reading-paths" aria-labelledby={"reading-paths-" + category}>
    <div className="section-heading"><div><span className="eyebrow">A USEFUL NEXT STEP</span><h2 id={"reading-paths-" + category}>Start with the decision you need to make.</h2></div></div>
    <nav className="reading-paths-grid" aria-label="Recommended starting guides">
      {items.map((item,index)=><Link className="reading-paths-link" href={item.href} key={item.href}>
        <span className="eyebrow">START / {String(index+1).padStart(2,"0")}</span>
        <h3>{item.title}</h3><p>{item.description}</p><span className="reading-paths-action">Read the guide <span aria-hidden="true">↗</span></span>
      </Link>)}
    </nav>
  </section>;
}
