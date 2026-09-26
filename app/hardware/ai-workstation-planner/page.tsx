import Link from "next/link";
import HardwarePlanner from "@/components/HardwarePlanner";
import JsonLd, { generateBreadcrumbSchema } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/editorial";

const route = "/hardware/ai-workstation-planner";

export const metadata = pageMetadata(
  "AI workstation planner by budget and country",
  "Plan a local AI desktop build, upgrade, or laptop by budget, country, and workload. Compare sourced hardware estimates and limitations.",
  route,
);

export default function AiWorkstationPlannerPage() {
  return (
    <main className="wrap planner-page">
      <JsonLd data={generateBreadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Hardware", url: `${SITE_URL}/hardware` },
        { name: "AI workstation planner", url: `${SITE_URL}${route}` },
      ])} />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span>/</span><Link href="/hardware">Hardware</Link><span>/</span>
        <span aria-current="page">Workstation planner</span>
      </nav>
      <header className="planner-intro">
        <span className="eyebrow">LOCAL AI HARDWARE</span>
        <h1>Plan a machine for <span>your workload.</span></h1>
        <p>Choose a country, budget, and the work you want to do. Get practical hardware tiers, visible trade-offs, and sources you can check before buying.</p>
        <p className="planner-markets">United States · United Kingdom · Canada · Germany (EUR reference)</p>
      </header>

      <HardwarePlanner />

      <section className="planner-methodology" aria-labelledby="planner-method-heading">
        <h2 id="planner-method-heading">How these estimates work</h2>
        <p>Recommendations use published hardware specifications and dated market price examples. Workload fit is a planning guide based on memory and system requirements; it is not a benchmark, a compatibility guarantee, or a promise of generation speed.</p>
        <p>We do not convert between currencies. Germany is an EUR reference market, not a claim that prices match across the European Union. Retail prices, availability, taxes, shipping, and component compatibility can change. Each price example shows its source and check date; examples older than 30 days cannot drive price-based ranking.</p>
        <p>Commercial relationships do not determine fit or ranking. Any future paid link will be labeled beside the recommendation. See our <Link href="/about#funding">funding policy</Link> and <Link href="/privacy">privacy notice</Link>.</p>
      </section>

      <section className="planner-faq" aria-labelledby="planner-faq-heading">
        <h2 id="planner-faq-heading">Questions before choosing parts</h2>
        <details><summary>Does this guarantee a model will run?</summary><p>No. Memory and compatibility vary by model, quantization, resolution, workflow, and software version. Check the linked model and component documentation before purchase.</p></details>
        <details><summary>Are listed prices live quotes?</summary><p>No. They are dated examples from named sources. Confirm current price, stock, tax, shipping, and return terms with the retailer.</p></details>
        <details><summary>Why is Germany the EU market?</summary><p>It provides one EUR reference point for this first release. It does not represent every EU country’s taxes, stock, or shipping costs.</p></details>
        <details><summary>What if my budget is too low?</summary><p>The planner explains the constraint and points to lower-cost workload adjustments or relevant guides instead of claiming a full fit.</p></details>
      </section>
      <p className="planner-related"><Link href="/hardware/best-local-ai-workstation-build-guide-2026">Read the local AI workstation build guide ↗</Link></p>
    </main>
  );
}
