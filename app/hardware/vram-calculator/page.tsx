import Link from "next/link";
import VramCalculator from "@/components/VramCalculator";
import JsonLd, { generateBreadcrumbSchema } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/editorial";

const route = "/hardware/vram-calculator";

export const metadata = pageMetadata(
  "LLM VRAM calculator: will this model fit my GPU?",
  "Check if Llama, Qwen, Gemma or Mistral fits your GPU. Pick a model, quantization and context length to estimate VRAM for Ollama and llama.cpp.",
  route,
);

export default function VramCalculatorPage() {
  return (
    <div className="wrap planner-page">
      <JsonLd data={generateBreadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Hardware", url: `${SITE_URL}/hardware` },
        { name: "VRAM calculator", url: `${SITE_URL}${route}` },
      ])} />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span>/</span><Link href="/hardware">Hardware</Link><span>/</span>
        <span aria-current="page">VRAM calculator</span>
      </nav>
      <header className="planner-intro">
        <span className="eyebrow">LOCAL AI TOOL</span>
        <h1>Will this model <span>fit my GPU?</span></h1>
        <p>Estimate how much VRAM a local LLM needs in Ollama, LM Studio or llama.cpp, and whether it runs fully on your graphics card.</p>
      </header>

      <VramCalculator />

      <section className="planner-methodology" aria-labelledby="vram-method-heading">
        <h2 id="vram-method-heading">How the estimate works</h2>
        <p><strong>Weights</strong> = parameters × bits per weight ÷ 8. Bits per weight are averages for common GGUF quantizations used by Ollama and llama.cpp.</p>
        <p><strong>Context (KV cache)</strong> = 2 × layers × KV heads × head size × context length × 2 bytes. Layer and head counts come from each model&apos;s published configuration. Longer chats and documents grow this number.</p>
        <p>We add about 0.6 GB for the CUDA runtime and compute buffers, and reserve 0.4 GB for your display and other apps. Real usage varies by software version, driver and settings, so treat this as a planning estimate, not a guarantee.</p>
      </section>

      <section className="planner-faq" aria-labelledby="vram-faq-heading">
        <h2 id="vram-faq-heading">Common questions</h2>
        <details><summary>What can I run on 6 GB of VRAM?</summary><p>3B–4B models run comfortably, and 7B–8B models at Q4_K_M fit with a short context. Larger models need CPU offload and run slower.</p></details>
        <details><summary>What can I run on 8 GB?</summary><p>7B–9B models at Q4 or Q5 with a moderate context. 12B–14B models usually need offload.</p></details>
        <details><summary>What happens if a model doesn&apos;t fit?</summary><p>Ollama and LM Studio move some layers to system RAM. The model still works, but tokens per second drop sharply as more of it leaves the GPU.</p></details>
        <details><summary>Which quantization should I pick?</summary><p>Q4_K_M is the usual sweet spot. Q5 and Q6 are slightly better quality if you have room; FP16 is rarely worth it on consumer GPUs.</p></details>
      </section>
      <p className="planner-related"><Link href="/hardware/best-gpu-for-local-ai">Which GPU should I buy? See the VRAM buying guide ↗</Link> · <Link href="/hardware/ai-workstation-planner">AI workstation planner ↗</Link></p>
    </div>
  );
}
