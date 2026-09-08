import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Flame,
  Star,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
  Award,
  ChevronRight,
  TrendingUp,
  Cpu,
  Lock,
  Headphones,
  Laptop,
  CheckCircle,
} from "lucide-react";
import { getAllCategories, getFeaturedPosts, getTrendingPosts, POSTS } from "@/lib/posts";
import AdSlot from "@/components/AdSlot";

export default function HomePage() {
  const categories = getAllCategories();
  const featuredPosts = getFeaturedPosts();
  const trendingPosts = getTrendingPosts();
  const heroPost = featuredPosts[0] || POSTS[0];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. Hero Section */}
      <section className="relative pt-8 sm:pt-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Mission & Headline */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-fyre-500/10 border border-fyre-500/30 text-fyre-400 text-xs font-bold tracking-wide uppercase">
              <Flame className="w-4 h-4 text-fyre-500 animate-pulse" />
              <span>Independent Lab Benchmarks • 2025 Edition</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] font-sans">
              Tech Reviews Cut Through The Noise.{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-fyre-400 via-amber-400 to-rose-500">
                Benchmarks You Can Trust.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
              We purchase retail units, execute reproducible stress-test benchmarks, and publish unvarnished verdicts for developers, privacy purists, and creators. Zero sponsored bias.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href={`/${heroPost.category}/${heroPost.slug}`}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-fyre-500 to-rose-600 hover:from-fyre-600 hover:to-rose-700 shadow-glow hover:shadow-glow-lg transition-all duration-200"
              >
                <span>Read Featured Verdict</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#categories"
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm text-gray-300 bg-surface-card hover:bg-surface-hover border border-surface-border transition-colors"
              >
                <span>Browse Product Categories</span>
              </Link>
            </div>

            {/* Trust Metrics Strip */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-surface-border/80">
              <div>
                <div className="text-2xl font-black text-white font-mono">100%</div>
                <div className="text-xs text-gray-400">Retail Bought Units</div>
              </div>
              <div>
                <div className="text-2xl font-black text-fyre-400 font-mono">200+</div>
                <div className="text-xs text-gray-400">Stress Test Hours</div>
              </div>
              <div>
                <div className="text-2xl font-black text-emerald-400 font-mono">$0</div>
                <div className="text-xs text-gray-400">Paid Review Bribes</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Spotlight Review Card */}
          <div className="lg:col-span-5">
            <div className="relative group rounded-3xl overflow-hidden bg-gradient-to-b from-surface-card to-surface border border-fyre-500/40 p-6 sm:p-8 shadow-2xl shadow-black/80 hover:border-fyre-500/70 transition-all duration-300">
              <div className="absolute top-0 right-0 w-48 h-48 bg-fyre-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 mb-4 border-b border-surface-border">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-fyre-500 text-white">
                    {heroPost.verdict.badge}
                  </span>
                  <span className="text-xs font-semibold text-gray-400">{heroPost.categoryName}</span>
                </div>
                <div className="flex items-center gap-1 text-amber-400 font-bold text-sm font-mono">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{heroPost.verdict.score} / 10</span>
                </div>
              </div>

              <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-5 bg-surface-border/50">
                <Image
                  src={heroPost.heroImage}
                  alt={heroPost.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-xs font-mono font-bold text-white border border-white/10">
                    {heroPost.product.brand} {heroPost.product.model}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/90 text-xs font-mono font-black text-white">
                    {heroPost.product.price}
                  </span>
                </div>
              </div>

              <h2 className="text-xl font-bold text-white group-hover:text-fyre-400 transition-colors leading-snug">
                <Link href={`/${heroPost.category}/${heroPost.slug}`}>{heroPost.title}</Link>
              </h2>

              <p className="text-xs text-gray-300 mt-2 line-clamp-2 leading-relaxed">
                {heroPost.verdict.summary}
              </p>

              <div className="mt-5 pt-4 border-t border-surface-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={heroPost.author.avatar}
                    alt={heroPost.author.name}
                    width={28}
                    height={28}
                    className="rounded-full object-cover"
                  />
                  <span className="text-xs text-gray-400">{heroPost.author.name}</span>
                </div>
                <Link
                  href={`/${heroPost.category}/${heroPost.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-fyre-400 hover:text-fyre-300"
                >
                  <span>Full Benchmark</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Top Sponsored Deal Placement */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot
          format="leaderboard"
          dealTitle="Specialist Cyber Deal: 50% Off ProtonVPN Plus (Swiss Jurisdiction)"
          dealSubtitle="Independent zero-logs audit verified by Securitum. 10 Gbps WireGuard servers with streaming unblocking."
          couponCode="FYRE50"
          affiliateUrl="https://protonvpn.com/?ref=fyrelinkz"
          discountBadge="50% OFF"
          sponsorName="Proton AG"
        />
      </section>

      {/* 3. Category Hub Directory */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-fyre-400">
              <Cpu className="w-4 h-4" />
              <span>Testing Verticals</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Explore Our Testing Laboratories
            </h2>
            <p className="text-sm text-gray-400">
              Specialized benchmarks across consumer tech, developer tooling, and network privacy.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-surface-card border border-surface-border p-5 hover:border-fyre-500/50 hover:bg-surface-hover transition-all duration-200"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-surface border border-surface-border group-hover:bg-fyre-500/10 group-hover:border-fyre-500/30 transition-colors">
                    {cat.id === "ai-tools" && <Sparkles className="w-5 h-5 text-orange-400" />}
                    {cat.id === "developer-hardware" && <Laptop className="w-5 h-5 text-blue-400" />}
                    {cat.id === "smart-home" && <Cpu className="w-5 h-5 text-emerald-400" />}
                    {cat.id === "cybersecurity" && <Lock className="w-5 h-5 text-purple-400" />}
                    {cat.id === "audio-gear" && <Headphones className="w-5 h-5 text-pink-400" />}
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-fyre-400 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white group-hover:text-fyre-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                    {cat.shortDescription}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Trending In-Depth Lab Reviews */}
      <section id="trending" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-fyre-400">
              <TrendingUp className="w-4 h-4" />
              <span>Highest Rated Gear</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Latest Comprehensive Benchmarks
            </h2>
            <p className="text-sm text-gray-400">
              Every score backed by real data, acoustic measurements, and hands-on developer testing.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((post) => (
            <article
              key={post.id}
              className="flex flex-col justify-between rounded-3xl overflow-hidden bg-surface-card border border-surface-border hover:border-surface-active hover:shadow-xl transition-all duration-300 group"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative h-52 w-full overflow-hidden bg-surface">
                  <Image
                    src={post.heroImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-transparent to-transparent opacity-90" />

                  {/* Top tags */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wide bg-black/70 backdrop-blur-md text-white border border-white/10">
                      {post.categoryName}
                    </span>
                  </div>

                  {/* Score badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-card/90 backdrop-blur-md border border-amber-500/30 text-amber-400 text-xs font-bold font-mono">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{post.verdict.score}</span>
                  </div>

                  {/* Price Tag */}
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-1 rounded-lg bg-fyre-500/20 backdrop-blur-md border border-fyre-500/40 text-fyre-400 text-xs font-mono font-bold">
                      {post.product.price}
                    </span>
                  </div>
                </div>

                {/* Article Info */}
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-fyre-400 transition-colors leading-snug line-clamp-2">
                    <Link href={`/${post.category}/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-3 border-t border-surface-border/60 flex items-center justify-between">
                <div className="text-[11px] text-gray-500 font-medium">
                  {post.readTime} • Updated {post.updatedAt}
                </div>
                <Link
                  href={`/${post.category}/${post.slug}`}
                  className="flex items-center gap-1 text-xs font-bold text-fyre-400 group-hover:text-fyre-300"
                >
                  <span>Review & Benchmarks</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. In-Feed Sponsored Card Example */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot
          format="in-feed"
          dealTitle="Supercharge Code Velocity with Cursor AI Pro"
          dealSubtitle="Get 500 fast requests of Claude 3.5 Sonnet & GPT-4o with multi-file Composer and full vector codebase indexing."
          couponCode="FYREPRO"
          affiliateUrl="https://cursor.com/?ref=fyrelinkz"
          discountBadge="14-Day Free Trial"
          sponsorName="Anysphere Inc."
        />
      </section>

      {/* 6. Why FyreLinkz Section (Editorial Independence Promise) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-surface-card border border-surface-border p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Corporate Compromise</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                How FyreLinkz Protects Reader Trust
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Most commercial affiliate sites are automated content mills regurgitating Amazon spec sheets. We do things the hard way.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-surface/50 border border-surface-border">
              <div className="flex items-center gap-2 font-bold text-white text-sm">
                <CheckCircle className="w-4 h-4 text-fyre-500 shrink-0" />
                <span>1. Retail Shelf Purchases</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Manufacturers routinely cherry-pick golden samples for reviewers. We purchase retail shelf units anonymously to ensure identical hardware to what you receive.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-surface/50 border border-surface-border">
              <div className="flex items-center gap-2 font-bold text-white text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>2. Open Benchmark Data</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                We document exact ambient temperatures, commit hashes, compiler flags, and decibel meters so anyone can independently replicate our lab numbers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
