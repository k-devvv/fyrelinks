import React from "react";
import Link from "next/link";
import {
  Flame,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Cpu,
  Laptop,
  CheckCircle,
  Layers,
  Video,
  ShieldCheck,
} from "lucide-react";
import { getAllCategories, getFeaturedPosts, getTrendingPosts, POSTS } from "@/lib/posts";

export default function HomePage() {
  const categories = getAllCategories();
  const featuredPosts = getFeaturedPosts();
  const heroPost = featuredPosts[0] || POSTS[0];
  const curatedPosts = getTrendingPosts();

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. Hero Section - Value-First Editorial Introduction */}
      <section className="relative pt-6 sm:pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Mission & Audience Promise */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fyre-500/10 border border-fyre-500/30 text-fyre-400 text-xs font-semibold tracking-wide">
              <Flame className="w-3.5 h-3.5 text-fyre-400" />
              <span>Independent AI Video & Diffusion Guides</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] font-sans">
              Choose AI video and diffusion tools with fewer expensive mistakes.
            </h1>

            <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
              Independent teardowns, actual render failure logs, and credit cost breakdowns across MiniMax, Seedance, Higgsfield, and local ComfyUI.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href={`/${heroPost.category}/${heroPost.slug}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-fyre-500 hover:bg-fyre-600 transition-colors shadow-sm"
              >
                <span>Read Video Matrix Teardown</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#tracks"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-gray-300 bg-surface-card hover:bg-surface-hover border border-surface-border transition-colors"
              >
                <span>Browse Core Tracks</span>
              </Link>
            </div>

            {/* Editorial Standard Strip */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-surface-border text-xs">
              <div className="p-2.5 rounded-xl bg-surface-card border border-surface-border">
                <div className="font-bold text-white font-mono text-xs sm:text-sm">Failure Logs</div>
                <div className="text-gray-400 text-[11px] mt-0.5">Motion drift & prompt bleed limits</div>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-card border border-surface-border">
                <div className="font-bold text-fyre-400 font-mono text-xs sm:text-sm">Actual Costs</div>
                <div className="text-gray-400 text-[11px] mt-0.5">Effective cost per usable minute</div>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-card border border-surface-border">
                <div className="font-bold text-emerald-400 font-mono text-xs sm:text-sm">Independent</div>
                <div className="text-gray-400 text-[11px] mt-0.5">Zero paid product rankings</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Spotlight Teardown Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-surface-card border border-surface-border p-5 sm:p-6 shadow-xl hover:border-fyre-500/40 transition-colors">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-surface-border">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide bg-fyre-500/20 text-fyre-400 border border-fyre-500/30">
                    {heroPost.badge || "Featured Teardown"}
                  </span>
                  <span className="text-xs text-gray-400">{heroPost.testedDate}</span>
                </div>
                <span className="text-xs font-mono text-gray-400 font-semibold">
                  {heroPost.evidenceBasis || "Research Comparison"}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-surface border border-surface-border mb-3 space-y-1.5">
                <div className="text-[10px] font-bold text-fyre-400 uppercase tracking-wide">Key Telemetry</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                  {heroPost.keySpecs.slice(0, 4).map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-center justify-between p-1.5 rounded-lg bg-surface-card border border-surface-border text-[11px]">
                      <span className="text-gray-400">{spec.label}:</span>
                      <span className="font-mono text-white font-semibold truncate ml-1">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-white hover:text-fyre-400 transition-colors leading-snug">
                <Link href={`/${heroPost.category}/${heroPost.slug}`}>{heroPost.title}</Link>
              </h2>

              <p className="text-xs text-gray-300 mt-2 line-clamp-2 leading-relaxed">
                {heroPost.metaDescription}
              </p>

              <div className="mt-4 pt-3 border-t border-surface-border flex items-center justify-between">
                <span className="text-xs text-gray-400">{heroPost.readTime}</span>
                <Link
                  href={`/${heroPost.category}/${heroPost.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-fyre-400 hover:text-fyre-300"
                >
                  <span>Full Failure Log & Verdict</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Creator Tracks (3 Columns) */}
      <section id="tracks" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-fyre-400">
            <Layers className="w-4 h-4" />
            <span>Core Focus Tracks</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Generative AI & Local Compute Tracks
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Curated coverage tailored for creators, VFX artists, and developers building generative media pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Track 1: AI Video */}
          <div className="rounded-2xl bg-surface-card border border-surface-border p-5 space-y-3 flex flex-col justify-between hover:border-fyre-500/40 transition-colors">
            <div className="space-y-2">
              <div className="p-2 w-fit rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <Video className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-base text-white">AI Video Generation</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Empirical motion physics, prompt bleed analysis, and usable credit economics across MiniMax, Seedance, Kling, and Higgsfield.
              </p>
            </div>
            <Link
              href="/create"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-fyre-400 hover:text-fyre-300 pt-2"
            >
              <span>Explore AI Video Reviews</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Track 2: Open Diffusion */}
          <div className="rounded-2xl bg-surface-card border border-surface-border p-5 space-y-3 flex flex-col justify-between hover:border-fyre-500/40 transition-colors">
            <div className="space-y-2">
              <div className="p-2 w-fit rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-base text-white">Open Diffusion & ComfyUI</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Step-by-step FLUX.1 LoRA fine-tuning, quantization trade-offs (FP8 vs NF4), and node pipeline optimizations for local generation.
              </p>
            </div>
            <Link
              href="/workflow"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-fyre-400 hover:text-fyre-300 pt-2"
            >
              <span>Explore Diffusion Guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Track 3: Workstations & Compute */}
          <div className="rounded-2xl bg-surface-card border border-surface-border p-5 space-y-3 flex flex-col justify-between hover:border-fyre-500/40 transition-colors">
            <div className="space-y-2">
              <div className="p-2 w-fit rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <Laptop className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-base text-white">Workstation Compute & GPUs</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Hardware blueprints: dual RTX 3090 NVLink vs RTX 4090, PCIe lane allocation, memory bandwidth (GB/s), and thermal management.
              </p>
            </div>
            <Link
              href="/hardware"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-fyre-400 hover:text-fyre-300 pt-2"
            >
              <span>Explore Workstation Hardware</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Curated Practical Guides & Comparisons Grid */}
      <section id="guides" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-fyre-400">
              <Cpu className="w-4 h-4" />
              <span>Practical Guides & Teardowns</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Latest Technical Breakdowns
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Evidence-based analyses backed by technical documentation, memory footprints, and practical creator workflows.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {curatedPosts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col justify-between rounded-2xl bg-surface-card border border-surface-border hover:border-surface-active transition-colors p-5 sm:p-6 space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {post.badge && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-fyre-500/15 text-fyre-400 border border-fyre-500/25">
                        {post.badge}
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono text-gray-400 bg-surface border border-surface-border uppercase">
                      {post.category}
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-500 font-mono">
                    {post.evidenceBasis || "Technical Guide"}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-white hover:text-fyre-400 transition-colors leading-snug">
                    <Link href={`/${post.category}/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                    {post.metaDescription}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                  {post.keySpecs.slice(0, 2).map((spec, sIdx) => (
                    <div key={sIdx} className="p-2 rounded-lg bg-surface border border-surface-border text-[11px]">
                      <div className="text-gray-400 text-[10px]">{spec.label}</div>
                      <div className="font-mono text-white font-medium line-clamp-1">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-surface-border flex items-center justify-between text-xs">
                <span className="text-gray-500 font-mono text-[11px]">
                  {post.readTime}
                </span>
                <Link
                  href={`/${post.category}/${post.slug}`}
                  className="flex items-center gap-1 font-bold text-fyre-400 hover:text-fyre-300"
                >
                  <span>Read Breakdown</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Editorial Standards & Reader Protection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-surface-card border border-surface-border p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Editorial Standards</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                How FyreLinkz Protects Reader Trust
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                We replace marketing buzzwords with verifiable specifications, observable failure modes, and clear compute trade-offs.
              </p>
            </div>

            <div className="space-y-1.5 p-4 rounded-xl bg-surface border border-surface-border">
              <div className="flex items-center gap-2 font-bold text-white text-sm">
                <CheckCircle className="w-4 h-4 text-fyre-500 shrink-0" />
                <span>1. Evidence-Based Analysis</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Every comparison evaluates documented parameters, VRAM memory limits, and observable artifacts rather than synthetic vendor claims.
              </p>
            </div>

            <div className="space-y-1.5 p-4 rounded-xl bg-surface border border-surface-border">
              <div className="flex items-center gap-2 font-bold text-white text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>2. Transparent Economics</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                We break down rejection rates and credit burn so creators know the true cost per usable minute before committing to cloud tiers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
