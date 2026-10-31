import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "AI workstation build spec",
  "A written build spec for your actual workload and budget: parts, VRAM reasoning, and what to skip. Fixed price, three working days.",
  "/ai-workstation-build-spec"
);

const BRIEF = [
  "The work you actually run, named: ComfyUI image, AI video, local LLM, training, or a mix.",
  "The largest model and resolution or context length you need to reach, if you know it.",
  "Your budget and currency, and whether that covers a whole system or a graphics card only.",
  "Country, so parts and prices are checked where you can buy them.",
  "Anything you already own that should be reused: case, power supply, storage, monitors."
];

export default function BuildSpec() {
  return <div className="wrap info-page">
    <span className="eyebrow">SERVICE · UPDATED 31 OCTOBER 2026</span>
    <h1>AI workstation build spec<span>.</span></h1>
    <p className="intro">You tell me the work you need to run and the budget you have. I send back a written specification for that workload, with the reasoning shown.</p>

    <section>
      <h2>What you get</h2>
      <ul>
        <li>A parts list for your budget and country, with the configuration written out.</li>
        <li>The VRAM reasoning: which models and resolutions the specification is expected to reach, and where it will stop.</li>
        <li>What to skip, which is usually the more valuable half: the components where extra spend buys nothing for your workload.</li>
        <li>Compatibility checks to make before ordering, and the upgrade path if the work grows.</li>
        <li>One round of follow-up questions by email.</li>
      </ul>
    </section>

    <section>
      <h2>Price and turnaround</h2>
      <p><strong>₹6,000</strong> for a single workload, <strong>₹8,000</strong> where several workloads have to share one machine, or where an existing system is being upgraded rather than replaced. Roughly US$70–95 at current rates; billing is in Indian rupees and the converted figure moves with the exchange rate.</p>
      <p>Three working days from the point your brief is complete. Payment after delivery, by bank transfer or UPI.</p>
    </section>

    <section>
      <h2>What this is not</h2>
      <ul>
        <li>Not a purchase service. You buy the parts yourself, from sellers you choose.</li>
        <li>Not assembly, installation or remote support.</li>
        <li>Not a performance guarantee. The specification states what it is expected to reach and why; manufacturers change drivers, prices and stock, and software support moves.</li>
        <li>Not useful if you have not decided what you want to run. Start with the <Link href="/hardware/ai-workstation-planner">workstation planner</Link>, which is free and may answer the question outright.</li>
      </ul>
    </section>

    <section>
      <h2>Independence</h2>
      <p>Some links elsewhere on this site earn a commission, explained in our <Link href="/affiliate-disclosure">affiliate disclosure</Link>. A build spec is not one of them: it names parts because they fit the workload, and no vendor pays for a place in it. If a spec is better served by a used card, by renting an hourly GPU instead of buying, or by keeping the machine you already have, that is what it will say.</p>
    </section>

    <section>
      <h2>How to start</h2>
      <p>Email the brief below. I will reply with a fixed price and the questions I still need answered before starting, or tell you plainly if the planner already covers your case and you do not need this.</p>
      <ol>{BRIEF.map(item => <li key={item}>{item}</li>)}</ol>
      <a className="button-dark" href="mailto:editorial@fyrelinkz.com?subject=Build%20spec%20request">Email editorial@fyrelinkz.com ↗</a>
      <p className="fine-print">Opens your email application. Your message is sent only when you send it there. No payment is taken on this site.</p>
    </section>
  </div>;
}
