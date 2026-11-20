import Link from "next/link";
import SmartLink from "@/components/SmartLink";
import JsonLd, { generateBreadcrumbSchema } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/editorial";
import { VRAM_MODELS, estimateVram } from "@/lib/vram";
import BudgetPicker from "@/components/BudgetPicker";
import { pickerTiers } from "@/lib/india-laptops";

const route = "/hardware/shop";
const Q4_BITS = 4.85; // Q4_K_M, the Ollama default
const CONTEXT = 8192;

type Item = { tag: string; title: string; text: string; slug: string; gb?: number; pick?: boolean };

function fitCount(gb: number) {
  return VRAM_MODELS.filter((m) => {
    const v = estimateVram(m, Q4_BITS, CONTEXT, gb).verdict;
    return v === "fits" || v === "tight";
  }).length;
}

const SECTIONS: { id: string; title: string; intro: string; items: Item[] }[] = [
  {
    id: "gpu",
    title: "Graphics cards by VRAM",
    intro: "For a desktop PC. VRAM decides which models run fully on the GPU.",
    items: [
      { tag: "8 GB VRAM", title: "Starter GPU", text: "Small models and coding helpers with short chats.", slug: "amazon-in-gpu-8gb", gb: 8 },
      { tag: "12 GB VRAM", title: "Sweet spot GPU", text: "7B–9B models with room for longer chats.", slug: "amazon-in-gpu-12gb", gb: 12, pick: true },
      { tag: "16 GB VRAM", title: "Step-up GPU", text: "12B–14B models fully on the GPU.", slug: "amazon-in-gpu-16gb", gb: 16 },
      { tag: "24 GB VRAM", title: "Enthusiast GPU", text: "27B–32B models at Q4 without offload.", slug: "amazon-in-gpu-24gb", gb: 24 },
    ],
  },
  {
    id: "laptop",
    title: "AI laptops by VRAM",
    intro: "Laptop GPUs often have less VRAM than desktop cards with the same name. Check the GB on the spec sheet.",
    items: [
      { tag: "6 GB VRAM", title: "RTX 4050 laptops", text: "Cheapest NVIDIA option. Good for learning and small models.", slug: "amazon-in-laptop-6gb", gb: 6 },
      { tag: "8 GB VRAM", title: "RTX 4060 laptops", text: "Best value for students. Runs 7B–8B models on the GPU.", slug: "amazon-in-laptop-8gb", gb: 8, pick: true },
      { tag: "12 GB VRAM", title: "RTX 5070 Ti laptops", text: "12B–14B models and longer context.", slug: "amazon-in-laptop-12gb", gb: 12 },
      { tag: "16 GB VRAM", title: "RTX 5080 laptops", text: "Most VRAM in a laptop, for long chats.", slug: "amazon-in-laptop-16gb", gb: 16 },
    ],
  },
  {
    id: "ram",
    title: "RAM upgrades",
    intro: "When a model does not fit in VRAM, the rest spills into system RAM. More RAM keeps bigger models usable. Match DDR4 or DDR5 to your machine.",
    items: [
      { tag: "16 GB", title: "Laptop RAM (DDR5)", text: "Fill a free slot to reach 32 GB in total.", slug: "amazon-in-ram-16gb" },
      { tag: "32 GB kit", title: "Laptop RAM (DDR5)", text: "The usual upgrade for local AI on a laptop.", slug: "amazon-in-ram-32gb", pick: true },
      { tag: "64 GB kit", title: "RAM kit (DDR5)", text: "For large models with CPU offload.", slug: "amazon-in-ram-64gb" },
      { tag: "32 GB kit", title: "Desktop RAM (DDR5)", text: "For desktop PCs with DDR5 slots.", slug: "amazon-in-ram-desktop-32gb" },
    ],
  },
  {
    id: "egpu",
    title: "eGPU and storage",
    intro: "An eGPU enclosure adds a desktop graphics card to a laptop through Thunderbolt or USB4. Models take a lot of disk space, so a fast SSD helps too.",
    items: [
      { tag: "eGPU", title: "Thunderbolt eGPU enclosure", text: "For thin laptops with a Thunderbolt or USB4 port. Needs a separate desktop GPU.", slug: "amazon-in-egpu" },
      { tag: "1 TB", title: "NVMe SSD", text: "Room for about a dozen 7B–8B models.", slug: "amazon-in-ssd-1tb", pick: true },
      { tag: "2 TB", title: "NVMe SSD", text: "For large model collections and image models.", slug: "amazon-in-ssd-2tb" },
    ],
  },
];

export const metadata = pageMetadata(
  "Local AI hardware shop India: GPU, laptop, RAM, eGPU and SSD",
  "Shop hardware for running AI models at home in India: graphics cards by VRAM, AI laptops, RAM upgrades, eGPU enclosures and NVMe SSDs on Amazon.in.",
  route,
);

export default function HardwareShopPage() {
  return (
    <div className="wrap planner-page">
      <JsonLd data={generateBreadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Hardware shop", url: `${SITE_URL}${route}` },
      ])} />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span>/</span>
        <span aria-current="page">Hardware shop</span>
      </nav>
      <header className="planner-intro">
        <span className="eyebrow">SHOP · AMAZON.IN</span>
        <h1>Local AI hardware: <span>GPU, RAM, eGPU</span></h1>
        <p>Everything you need to run AI models at home, sorted by what it lets you run. Pick a size, then compare live prices on Amazon.in.</p>
        <nav className="shop-jump" aria-label="Jump to section">
          {SECTIONS.map((s) => <a key={s.id} href={`#${s.id}`}>{s.title}</a>)}
        </nav>
      </header>

      <BudgetPicker tiers={pickerTiers()} />

      {SECTIONS.map((s) => (
        <section key={s.id} id={s.id} className="shop-section" aria-labelledby={`${s.id}-heading`}>
          <h2 id={`${s.id}-heading`}>{s.title}</h2>
          <p className="shop-intro">{s.intro}</p>
          <div className="shop-grid">
            {s.items.map((it) => (
              <article key={it.slug} className={it.pick ? "shop-card is-pick" : "shop-card"}>
                <div className="shop-card-top">
                  <span className="chip">{it.tag}</span>
                  {it.pick && <span className="chip chip-pick">Best value</span>}
                </div>
                <h3>{it.title}</h3>
                <p>{it.text}</p>
                {it.gb !== undefined && <p className="shop-fit"><strong>{fitCount(it.gb)}</strong> tracked models fit on the GPU</p>}
                <SmartLink className="button-primary" href={`/go/${it.slug}`}>See on Amazon.in ↗</SmartLink>
              </article>
            ))}
          </div>
        </section>
      ))}

      <section className="planner-methodology" aria-labelledby="shop-help-heading">
        <h2 id="shop-help-heading">Not sure what to buy?</h2>
        <p>Check a model in the <Link href="/hardware/vram-calculator">VRAM calculator</Link>, read the <Link href="/hardware/best-gpu-for-local-ai">best GPU for local AI</Link> guide, or pick by ₹ budget in the <Link href="/hardware/best-laptop-for-ai-india">best laptop for AI in India</Link> guide.</p>
        <p>Model counts use Q4_K_M with 8K context. They are planning estimates, not benchmarks. Links open Amazon.in search results, so prices and stock are always live.</p>
      </section>

      <p className="affiliate-note">As an Amazon Associate I earn from qualifying purchases. FyreLinkz may earn a commission from links on this page, at no extra cost to you. <Link href="/affiliate-disclosure">Affiliate disclosure</Link>.</p>
    </div>
  );
}
