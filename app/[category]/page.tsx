import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  ChevronRight,
  Star,
  ArrowRight,
  Flame,
  Award,
  Sparkles,
  Shield,
  HelpCircle,
} from "lucide-react";
import {
  getAllCategoriesWithLegacy,
  getCategoryBySlug,
  getPostsByCategory,
} from "@/lib/posts";
import JsonLd, { generateBreadcrumbSchema } from "@/components/JsonLd";
import AdSlot from "@/components/AdSlot";

interface Props {
  params: { category: string };
}

export async function generateStaticParams() {
  const categories = getAllCategoriesWithLegacy();
  return categories.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategoryBySlug(params.category);
  if (!category) return {};

  return {
    title: `${category.name} Reviews & Lab Benchmarks (2026)`,
    description: category.description,
    alternates: {
      canonical: `https://fyrelinkz.com/${category.slug}`,
    },
    openGraph: {
      title: `${category.name} Reviews & Tested Buyer's Guides`,
      description: category.description,
      url: `https://fyrelinkz.com/${category.slug}`,
      type: "website",
    },
  };
}

export default function CategoryPage({ params }: Props) {
  const category = getCategoryBySlug(params.category);
  if (!category) notFound();

  const posts = getPostsByCategory(category.slug);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://fyrelinkz.com" },
    { name: category.name, url: `https://fyrelinkz.com/${category.slug}` },
  ]);

  return (
    <div className="space-y-12 pb-20">
      <JsonLd data={breadcrumbSchema} />

      {/* Category Hero Banner */}
      <section className="relative pt-8 sm:pt-12 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-surface-border">
        {/* Breadcrumb Trail */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-fyre-400 font-medium">{category.name}</span>
        </nav>

        <div className="space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fyre-500/10 border border-fyre-500/30 text-fyre-400 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5" />
              <span>Curated Testing Vertical</span>
            </div>
            {category.tier && (
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold font-mono">
                {category.tier} Silo {category.cpcRange ? `• CPC ${category.cpcRange}` : ""}
              </span>
            )}
            {category.isNew && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-glow animate-pulse">
                NEW SILO
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
            {category.name}
          </h1>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            {category.description}
          </p>

          <div className="flex items-center gap-6 pt-2 text-xs text-gray-400">
            <span>{posts.length} In-Depth Benchmarked Reviews</span>
            <span>•</span>
            <span>All Units Retail Purchased</span>
            <span>•</span>
            <span>Updated Weekly</span>
          </div>
        </div>
      </section>

      {/* Main Reviews Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Verified Reviews & Lab Scores
          </h2>
          <span className="text-xs text-gray-500">Sorted by Lab Score</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col justify-between rounded-3xl overflow-hidden bg-surface-card border border-surface-border hover:border-surface-active hover:shadow-xl transition-all duration-300 group p-6 space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wide bg-fyre-500/20 text-fyre-400 border border-fyre-500/30">
                    {post.badge}
                  </span>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface/90 border border-amber-500/30 text-amber-400 text-xs font-bold font-mono">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{post.score.toFixed(1)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-fyre-400 transition-colors leading-snug line-clamp-2">
                    <Link href={`/${category.slug}/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                    {post.metaDescription}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 pt-2 border-t border-surface-border/50">
                  <span>CPC Tier</span>
                  <span className="text-amber-400 font-bold">{post.cpcTier}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-surface-border/60 flex items-center justify-between">
                <div className="text-[11px] text-gray-500">
                  {post.readTime}
                </div>
                <Link
                  href={`/${category.slug}/${post.slug}`}
                  className="flex items-center gap-1 text-xs font-bold text-fyre-400 group-hover:text-fyre-300"
                >
                  <span>Full Review</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Category AdSlot Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot
          format="leaderboard"
          dealTitle={`Verified Deal in ${category.name}: Top Rated Hardware & Tooling`}
          dealSubtitle="Take advantage of reader-exclusive coupon codes and verified merchant stock."
          couponCode="FYRECAT"
          affiliateUrl="https://fyrelinkz.com"
          discountBadge="EXCLUSIVE"
          sponsorName="FyreLinkz Network"
        />
      </section>

      {/* Buyer's Guide & FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-surface-card border border-surface-border p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-2 text-fyre-400 font-bold text-xs uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Category Buyer&apos;s Guide</span>
          </div>

          <h2 className="text-2xl font-bold text-white">
            What to Look for When Choosing {category.name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-300 pt-2">
            <div className="space-y-2 p-4 rounded-2xl bg-surface/50 border border-surface-border">
              <h3 className="font-bold text-white text-base">1. Real-World Benchmarks</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Always prioritize reproducible stress tests over manufacturer marketing spec sheets. We test every product under sustained heavy loads.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-surface/50 border border-surface-border">
              <h3 className="font-bold text-white text-base">2. Total Cost of Ownership</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Watch out for surprise recurring cloud subscriptions or costly proprietary adapters. We calculate the 3-year total cost for every reviewed device.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-surface/50 border border-surface-border">
              <h3 className="font-bold text-white text-base">3. Privacy & Data Control</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                We inspect telemetry packets, terms of service, and jurisdiction to ensure your personal or corporate code never leaks without authorization.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
