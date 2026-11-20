import Link from "next/link";
import SmartLink from "@/components/SmartLink";
import JsonLd, { generateBreadcrumbSchema } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/editorial";
import BudgetPicker from "@/components/BudgetPicker";
import { INDIA_LAPTOP_TIERS as TIERS, fitsAt, pickerTiers } from "@/lib/india-laptops";

const route = "/hardware/best-laptop-for-ai-india";

export const metadata = pageMetadata(
  "Best laptop for AI and machine learning in India (2026): by ₹ budget",
  "Which laptop should you buy in India for local AI, LLMs and ML coursework? Pick by ₹ budget and GPU VRAM, with the models each tier can run in Ollama and LM Studio.",
  route,
);

export default function BestLaptopIndiaPage() {
  return (
    <div className="wrap planner-page">
      <JsonLd data={generateBreadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Hardware", url: `${SITE_URL}/hardware` },
        { name: "Best laptop for AI in India", url: `${SITE_URL}${route}` },
      ])} />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span>/</span><Link href="/hardware">Hardware</Link><span>/</span>
        <span aria-current="page">Best laptop for AI in India</span>
      </nav>
      <header className="planner-intro">
        <span className="eyebrow">BUYING GUIDE · INDIA</span>
        <h1>Best laptop for AI in India: <span>pick by ₹ budget</span></h1>
        <p>For running AI models on your own laptop, the GPU&apos;s video memory (VRAM) decides what you can run. Brand, screen and design come second. Choose your budget, check the VRAM, then compare current prices on Amazon.in.</p>
      </header>

      <BudgetPicker tiers={pickerTiers()} />

      <section className="planner-methodology" aria-labelledby="laptop-quick-heading">
        <h2 id="laptop-quick-heading">Quick answer</h2>
        <p>For most students, an <strong>RTX 4060 laptop (8 GB VRAM) with 16 GB RAM</strong> is the best value. Go up to <strong>12 GB VRAM</strong> only if you need 12B–14B models. Avoid laptops without an NVIDIA GPU if local AI is your main goal.</p>
      </section>

      <section className="planner-methodology" aria-labelledby="laptop-table-heading">
        <h2 id="laptop-table-heading">Budget table</h2>
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr><th>Budget</th><th>Look for GPU</th><th>RAM</th><th>SSD</th><th>Models that fit on GPU</th><th>Buy</th></tr>
            </thead>
            <tbody>
              {TIERS.map((t) => (
                <tr key={t.gb}>
                  <td>{t.budget}</td><td>{t.gpu}</td><td>{t.ram}</td><td>{t.ssd}</td>
                  <td>{fitsAt(t.gb).length}</td>
                  <td><SmartLink href={`/go/amazon-in-laptop-${t.gb}gb`}>Check price ↗</SmartLink></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>Budgets are rough guides. Prices in India change with sales and new launches, so check the live price before you buy.</p>
      </section>

      <div className="shop-banner">
        <p><strong>Need RAM, an eGPU or more storage?</strong> See every upgrade in one place.</p>
        <Link className="button-primary" href="/hardware/shop">Open the hardware shop</Link>
      </div>

      {TIERS.map((t) => {
        const models = fitsAt(t.gb);
        return (
          <section key={t.gb} className="vram-upgrade" aria-labelledby={`laptop-${t.gb}`}>
            <h2 id={`laptop-${t.gb}`}>{t.budget}: {t.gpu}</h2>
            <div className="spec-chips">
              <span className="chip">{t.gb} GB VRAM</span><span className="chip">{t.ram} RAM</span><span className="chip">{t.ssd} SSD</span>
            </div>
            <p>{t.who}</p>
            <p><strong>Runs fully on the GPU</strong> (Q4_K_M, 8K context): {models.length ? models.map((m) => m.name).join(", ") : "none of the tracked models"}.</p>
            <div className="pros-cons">
              <div className="pros"><h3>Pros</h3><ul>{t.pros.map((p) => <li key={p}>{p}</li>)}</ul></div>
              <div className="cons"><h3>Cons</h3><ul>{t.cons.map((c) => <li key={c}>{c}</li>)}</ul></div>
            </div>
            <p><SmartLink className="button-primary" href={`/go/amazon-in-laptop-${t.gb}gb`}>Check {t.gpu.split(" (")[0]} laptop prices on Amazon.in ↗</SmartLink></p>
          </section>
        );
      })}

      <section className="planner-methodology" aria-labelledby="laptop-tips-heading">
        <h2 id="laptop-tips-heading">How to choose</h2>
        <p><strong>Check the exact VRAM.</strong> Laptop GPUs often have less VRAM than desktop cards with the same name. Look for the number in GB on the spec sheet.</p>
        <p><strong>Check the GPU power (TGP).</strong> The same GPU can be much slower in a thin laptop that runs it at low wattage.</p>
        <p><strong>RAM can be upgraded later.</strong> Many gaming laptops have two RAM slots. 16 GB is enough to start; <SmartLink href="/go/amazon-in-ram-32gb">32 GB DDR5 kits on Amazon.in ↗</SmartLink> help when models spill out of VRAM.</p>
        <p><strong>Models take space.</strong> Each 7B–8B model is around 5 GB on disk. A second <SmartLink href="/go/amazon-in-ssd-1tb">1 TB NVMe SSD ↗</SmartLink> is a cheap upgrade if your laptop has a free slot.</p>
        <p><strong>Thin laptop with Thunderbolt or USB4?</strong> An <SmartLink href="/go/amazon-in-egpu">eGPU enclosure ↗</SmartLink> lets it use a desktop graphics card at home.</p>
        <p><strong>Want more VRAM for less?</strong> A desktop gives far more VRAM per rupee. See the <Link href="/hardware/best-gpu-for-local-ai">best GPU for local AI</Link> guide or check a model in the <Link href="/hardware/vram-calculator">VRAM calculator</Link>.</p>
      </section>

      <section className="planner-faq" aria-labelledby="laptop-faq-heading">
        <h2 id="laptop-faq-heading">Common questions</h2>
        <details><summary>Is an RTX 4050 laptop enough for AI and ML in college?</summary><p>For coursework, Python, and small LLMs, yes. For 7B–8B models with long chats, 8 GB of VRAM is more comfortable.</p></details>
        <details><summary>Should I buy a MacBook for local AI?</summary><p>Apple Silicon Macs share memory between CPU and GPU, so a Mac with lots of memory can run large models. They cost more per GB in India and do not support CUDA, which many ML courses use.</p></details>
        <details><summary>Is 16 GB RAM enough?</summary><p>Yes, to start. Choose a laptop with a free RAM slot or two slots so you can move to 32 GB later.</p></details>
        <details><summary>Can I run ChatGPT-like models offline on a laptop?</summary><p>Yes. Tools like Ollama and LM Studio run open models such as Llama, Qwen and Gemma on your own laptop, with no internet needed after download.</p></details>
        <details><summary>Laptop or desktop for AI?</summary><p>A desktop gives more VRAM for the money and is easier to upgrade. Buy a laptop if you need to carry it to college or work.</p></details>
      </section>

      <p className="affiliate-note">As an Amazon Associate I earn from qualifying purchases. FyreLinkz may earn a commission from links on this page, at no extra cost to you. <Link href="/affiliate-disclosure">Affiliate disclosure</Link>.</p>
    </div>
  );
}
