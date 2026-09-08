import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  ShieldCheck,
  Award,
  Terminal,
  Flame,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Laptop,
  Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Our Editorial Standards & Methodology | FyreLinkz",
  description:
    "Learn about FyreLinkz, our evidence-based AI video and diffusion research methodology, failure mode documentation, and editorial independence standards.",
  alternates: {
    canonical: "https://www.fyrelinkz.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 pt-8 sm:pt-12">
      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fyre-500/10 border border-fyre-500/30 text-fyre-400 text-xs font-semibold uppercase tracking-wider">
          <Flame className="w-3.5 h-3.5" />
          <span>The FyreLinkz Standard</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
          Clear, Practical AI Guidance. Zero Vendor Hype.
        </h1>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
          FyreLinkz cuts through marketing claims, synthetic benchmarks, and cherry-picked video demos. We document observable failure modes, breakdown compute trade-offs, and analyze the true cost of creative AI workflows.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-fyre-500/10 border border-fyre-500/30 flex items-center justify-center text-fyre-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h2 className="text-base font-bold text-white">1. Evidence-First Evaluations</h2>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            We evaluate models and hardware against verifiable technical specifications: VRAM memory allocations, precision quantization limits (FP8 vs NF4), and observable motion artifacts.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Terminal className="w-4 h-4" />
          </div>
          <h2 className="text-base font-bold text-white">2. Documented Failure Modes</h2>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            Anyone can show a curated 4-second hero clip. We highlight prompt bleed, anatomical warping during camera turns, and out-of-memory errors so creators know exact limitations.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Award className="w-4 h-4" />
          </div>
          <h2 className="text-base font-bold text-white">3. Usable-Cost Economics</h2>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            Headline API pricing is misleading when half your renders are unusable. We factor in rejection rates, upscaling passes, and local hardware payback periods to evaluate real operating costs.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <CheckCircle className="w-4 h-4" />
          </div>
          <h2 className="text-base font-bold text-white">4. Total Commercial Disclosure</h2>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            We are funded by reader affiliate commissions and transparent display sponsorships. We never accept paid reviews or sponsored product rankings. If a tool fails in production, we state it clearly.
          </p>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="p-6 sm:p-8 rounded-2xl bg-surface-card border border-surface-border space-y-4">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-fyre-400">
            Research Protocol
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            How We Evaluate Tools & Architecture
          </h2>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-gray-300 leading-relaxed">
          <p>
            <strong>Generative Video Models:</strong> We evaluate models across complex anatomical motion, fluid dynamics, lighting transitions, and prompt adherence. We analyze frame stability, camera control, and credit burn rates across cloud endpoints.
          </p>
          <p>
            <strong>Local Diffusion Pipelines:</strong> ComfyUI workflows, Flux LoRAs, and open diffusion architectures are evaluated for VRAM memory budgets, tensor offloading, and step latency on modern consumer GPUs.
          </p>
          <p>
            <strong>Workstation Compute & Hardware:</strong> We evaluate PCIe lane topologies, memory bandwidth (GB/s), and power supply transient requirements to help builders configure balanced local AI workstations.
          </p>
        </div>
      </section>

      {/* Editorial Desks */}
      <section className="space-y-5">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            FyreLinkz Editorial Structure
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Organized across dedicated technical desks to deliver focused, reliable analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-2">
            <div className="p-2 w-fit rounded-lg bg-purple-500/10 text-purple-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-white">Generative Media Desk</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Focuses on generative video models, open-weight diffusion checkpoints, and creative production workflows.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-2">
            <div className="p-2 w-fit rounded-lg bg-blue-500/10 text-blue-400">
              <Laptop className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-white">Workstation Hardware Desk</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Analyzes local GPU compute, VRAM pooling, memory bandwidth bottlenecks, and display ergonomics.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-2">
            <div className="p-2 w-fit rounded-lg bg-emerald-500/10 text-emerald-400">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-white">Systems & Developer Desk</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Covers AI code editors, serverless model inference APIs, and data extraction pipelines for RAG systems.
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <div className="p-6 sm:p-8 rounded-2xl bg-surface-card border border-surface-border flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base sm:text-lg font-bold text-white">Have a Tool or Workflow to Suggest?</h3>
          <p className="text-xs text-gray-400">
            Reach out directly to our editorial desk with feedback, corrections, or suggestions.
          </p>
        </div>
        <Link
          href="/contact"
          className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-fyre-500 hover:bg-fyre-600 transition-colors"
        >
          <span>Contact the Editorial Desk</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
