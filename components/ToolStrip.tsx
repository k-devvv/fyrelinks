import Link from "next/link";
import { ArrowUpRight, Cpu, Calculator, Clapperboard } from "lucide-react";

const TOOLS = [
  { href: "/hardware/ai-workstation-planner", icon: Cpu, name: "AI workstation planner", text: "Enter your workload and budget. Get a VRAM-first parts shortlist for the US, UK, Canada or Germany." },
  { href: "/create/ai-video-generation-matrix-minimax-higgsfield-seedance", icon: Calculator, name: "AI video cost calculator", text: "Turn clip prices into cost per usable minute using your own keep rate." },
  { href: "/ai-video-models", icon: Clapperboard, name: "Video model directory", text: "Pricing, limits and access for the main AI video models in one place." }
];

export default function ToolStrip() {
  return (
    <section className="tool-strip" aria-label="Free tools">
      <div className="section-heading"><div><span className="eyebrow">FREE TOOLS</span><h2>Work it out for your setup.</h2></div></div>
      <div className="tool-grid">
        {TOOLS.map(({ href, icon: Icon, name, text }) => (
          <Link key={href} href={href} className="tool-card">
            <Icon aria-hidden="true" size={26} />
            <strong>{name}</strong>
            <span>{text}</span>
            <em>Open tool <ArrowUpRight size={15} aria-hidden="true" /></em>
          </Link>
        ))}
      </div>
    </section>
  );
}
