import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import {
  ChevronRight,
  ArrowRight,
  Flame,
  HelpCircle,
} from "lucide-react";
import {
  getAllCategoriesWithLegacy,
  getCategoryBySlug,
  getPostsByCategory,
} from "@/lib/posts";
import JsonLd, { generateBreadcrumbSchema } from "@/components/JsonLd";

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
    title: `${category.name} | FyreLinkz`,
    description: category.description,
    alternates: {
      canonical: `https://www.fyrelinkz.com/${category.slug}`,
    },
    openGraph: {
      title: `${category.name} | FyreLinkz`,
      description: category.description,
      url: `https://www.fyrelinkz.com/${category.slug}`,
      type: "website",
    },
  };
}

export default function CategoryPage({ params }: Props) {
  const category = getCategoryBySlug(params.category);
  if (!category) notFound();

  const posts = getPostsByCategory(category.slug);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.fyrelinkz.com" },
    { name: category.name, url: `https://www.fyrelinkz.com/${category.slug}` },
  ]);

  return (
    <div className="space-y-12 pb-20">
      <JsonLd data={breadcrumbSchema} />

      {/* Category Hero Banner */}
      <section className="relative pt-6 sm:pt-8 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-surface-border">
        {/* Breadcrumb Trail */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-fyre-400 font-medium">{category.name}</span>
        </nav>

        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fyre-500/10 border border-fyre-500/30 text-fyre-400 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-fyre-400" />
            <span>Editorial Track</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-sans">
            {category.name}
          </h1>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            {category.description}
          </p>

          <div className="flex items-center gap-3 pt-1 text-xs text-gray-400 font-mono">
            <span>{posts.length} Technical Articles</span>
            <span>•</span>
            <span>Updated September 2026</span>
          </div>
        </div>
      </section>

      {/* Main Reviews Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Curated Guides & Teardowns
          </h2>
          <span className="text-xs text-gray-500 font-mono">{posts.length} Publications</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col justify-between rounded-2xl bg-surface-card border border-surface-border hover:border-surface-active transition-colors p-5 sm:p-6 space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  {post.badge ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-fyre-500/15 text-fyre-400 border border-fyre-500/25">
                      {post.badge}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400 font-mono">{post.testedDate}</span>
                  )}
                  <span className="text-xs font-mono text-gray-400">
                    {post.evidenceBasis || "Technical Guide"}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-white hover:text-fyre-400 transition-colors leading-snug line-clamp-2">
                    <Link href={`/${category.slug}/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                    {post.metaDescription}
                  </p>
                </div>

                <div className="pt-2 border-t border-surface-border/50 text-[11px] text-gray-400 flex items-center justify-between">
                  <span className="text-gray-500">Hardware / API</span>
                  <span className="text-slate-300 font-mono truncate max-w-[170px]">{post.testedHardware}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-surface-border flex items-center justify-between text-xs">
                <span className="text-gray-500 font-mono text-[11px]">{post.readTime}</span>
                <Link
                  href={`/${category.slug}/${post.slug}`}
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

      {/* Buyer's Guide & Evaluation Standards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-surface-card border border-surface-border p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-fyre-400 font-bold text-xs uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Evaluation Framework</span>
          </div>

          <h2 className="text-xl font-bold text-white">
            What to Look for When Choosing {category.name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm text-gray-300 pt-1">
            <div className="space-y-1.5 p-4 rounded-xl bg-surface border border-surface-border">
              <h3 className="font-bold text-white text-sm">1. Documented Parameters</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                We verify underlying transformer models, precision limits (FP8 vs NF4), and real inference speeds instead of accepting vendor marketing claims.
              </p>
            </div>

            <div className="space-y-1.5 p-4 rounded-xl bg-surface border border-surface-border">
              <h3 className="font-bold text-white text-sm">2. Compute Unit Economics</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                We analyze rejected generations, credit burn rates, and cloud subscription scaling so builders calculate realistic operating expenses.
              </p>
            </div>

            <div className="space-y-1.5 p-4 rounded-xl bg-surface border border-surface-border">
              <h3 className="font-bold text-white text-sm">3. Reproducible Workflows</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                We publish exact software dependencies, seed strategies, and node configurations so creators can reproduce results locally.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
