import Link from "next/link";
import SmartLink from "@/components/SmartLink";
import JsonLd, { generateBreadcrumbSchema } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/editorial";
import { VRAM_MODELS, estimateVram } from "@/lib/vram";

const route = "/hardware/best-gpu-for-local-ai";
const Q4_BITS = 4.85; // Q4_K_M, the Ollama default
const CONTEXT = 8192;
const TIERS = [
  { gb: 8, who: "Starter: chat and coding helpers with small models." },
  { gb: 12, who: "Sweet spot: 7B–9B models with room for longer chats." },
  { gb: 16, who: "Step up: 12B–14B models fully on the GPU." },
  { gb: 24, who: "Enthusiast: 27B–32B models at Q4 without offload." },
];

export const metadata = pageMetadata(
  "Best GPU for local AI by VRAM: 8, 12, 16 or 24 GB?",
  "Which graphics card size do you need for Ollama, LM Studio and llama.cpp? See which Llama, Qwen, Gemma and Mistral models fit on 8, 12, 16 and 24 GB of VRAM.",
  route,
);

function fitsAt(gb: number) {
  return VRAM_MODELS.filter((m) => {
    const v = estimateVram(m, Q4_BITS, CONTEXT, gb).verdict;
    return v === "fits" || v === "tight";
  });
}

export default function BestGpuPage() {
  const tooBigFor24 = VRAM_MODELS.filter((m) => !fitsAt(24).includes(m));
  return (
    <div className="wrap planner-page">
      <JsonLd data={generateBreadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Hardware", url: `${SITE_URL}/hardware` },
        { name: "Best GPU for local AI", url: `${SITE_URL}${route}` },
      ])} />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span>/</span><Link href="/hardware">Hardware</Link><span>/</span>
        <span aria-current="page">Best GPU for local AI</span>
      </nav>
      <header className="planner-intro">
        <span className="eyebrow">BUYING GUIDE</span>
        <h1>Best GPU for local AI: <span>pick by VRAM</span></h1>
        <p>For running LLMs at home, video memory (VRAM) matters more than raw speed. Find the smallest card that holds the models you want, then buy the fastest one you can afford at that size.</p>
      </header>

      <section className="planner-methodology" aria-labelledby="gpu-quick-heading">
        <h2 id="gpu-quick-heading">Quick answer</h2>
        <p>Get <strong>12 GB</strong> if you mostly use 7B–9B models, <strong>16 GB</strong> for 12B–14B models, and <strong>24 GB</strong> for 27B–32B models. 70B models need more than one consumer card, so renting a cloud GPU is usually cheaper.</p>
      </section>

      {TIERS.map((t) => {
        const models = fitsAt(t.gb);
        return (
          <section key={t.gb} className="vram-upgrade" aria-labelledby={`tier-${t.gb}`}>
            <h2 id={`tier-${t.gb}`}>{t.gb} GB VRAM</h2>
            <p>{t.who}</p>
            <p><strong>Runs fully on the GPU</strong> (Q4_K_M, 8K context): {models.length ? models.map((m) => m.name).join(", ") : "none of the tracked models"}.</p>
            <p><SmartLink className="button-primary" href={`/go/amazon-in-gpu-${t.gb}gb`}>See {t.gb} GB graphics cards on Amazon.in ↗</SmartLink></p>
          </section>
        );
      })}

      <div className="shop-banner">
        <p><strong>Also need RAM, an eGPU or an SSD?</strong> See every upgrade in one place.</p>
        <Link className="button-primary" href="/hardware/shop">Open the hardware shop</Link>
      </div>

      <section className="vram-upgrade" aria-labelledby="tier-cloud">
        <h2 id="tier-cloud">Bigger than 24 GB: rent instead</h2>
        <p>{tooBigFor24.map((m) => m.name).join(", ")} {tooBigFor24.length === 1 ? "does" : "do"} not fit on a single 24 GB card at Q4_K_M with 8K context. Renting a large cloud GPU by the hour avoids a multi-card build.</p>
        <p><SmartLink href="/go/runpod">Rent a GPU on Runpod ↗</SmartLink></p>
      </section>

      <section className="planner-methodology" aria-labelledby="gpu-tips-heading">
        <h2 id="gpu-tips-heading">How to choose</h2>
        <p><strong>VRAM first.</strong> A model that spills into system RAM runs many times slower. More VRAM beats a faster chip with less memory.</p>
        <p><strong>NVIDIA is the easy path.</strong> Ollama, LM Studio and llama.cpp support CUDA best. AMD and Intel cards work but need more setup.</p>
        <p><strong>Used cards are fine</strong> if the seller lets you test them. Check the exact VRAM size, since some models ship in two memory versions.</p>
        <p>Model lists come from our <Link href="/hardware/vram-calculator">VRAM calculator</Link> estimates. They are planning numbers, not benchmarks.</p>
        <p>Buying a laptop in India? See the <Link href="/hardware/best-laptop-for-ai-india">best laptop for AI by ₹ budget</Link>.</p>
      </section>

      <section className="planner-faq" aria-labelledby="gpu-faq-heading">
        <h2 id="gpu-faq-heading">Common questions</h2>
        <details><summary>Is 8 GB enough for local AI?</summary><p>For 3B–8B models with short chats, yes. Anything larger needs offload and slows down a lot.</p></details>
        <details><summary>Is a laptop GPU OK?</summary><p>Yes, if the VRAM size matches the tier you need. Laptop cards often have less VRAM than desktop cards with the same name.</p></details>
        <details><summary>Can I combine two GPUs?</summary><p>llama.cpp and Ollama can split a model across cards, but it adds cost, power and setup. One bigger card is simpler.</p></details>
      </section>

      <p className="affiliate-note">As an Amazon Associate I earn from qualifying purchases. FyreLinkz may earn a commission from links on this page, at no extra cost to you. <Link href="/affiliate-disclosure">Affiliate disclosure</Link>.</p>
    </div>
  );
}
