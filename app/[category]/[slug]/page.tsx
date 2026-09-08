import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { POSTS } from "@/lib/posts";
import JsonLd from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";
import QuickVerdict from "@/components/QuickVerdict";
import ComparisonTable from "@/components/ComparisonTable";
import AdSlot from "@/components/AdSlot";
import ArticleVisual from "@/components/ArticleVisual";

interface PageProps {
  params: {
    category: string;
    slug: string;
  };
}

export async function generateStaticParams() {
  return POSTS.map((post) => ({
    category: post.category,
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};

  const url = `https://fyrelinkz.com/${post.category}/${post.slug}`;

  return {
    title: `${post.metaTitle} | FyreLinkz`,
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: url,
      siteName: "FyreLinkz",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

export default function ArticlePage({ params }: PageProps) {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const currentUrl = `https://fyrelinkz.com/${post.category}/${post.slug}`;

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <JsonLd post={post} url={currentUrl} />

      {/* Breadcrumb & Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-mono text-slate-400">
        <span className="px-2.5 py-1 rounded bg-orange-500/10 border border-orange-500/20 text-orange-400 font-semibold uppercase">
          {post.badge}
        </span>
        <span className="px-2.5 py-1 rounded bg-slate-900 border border-white/10 text-slate-300">
          CPC Intent: {post.cpcTier}
        </span>
        <span className="text-slate-500">•</span>
        <span>{post.readTime}</span>
      </div>

      <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
        {post.title}
      </h1>
      <p className="text-lg text-slate-300 leading-relaxed mb-8">
        {post.metaDescription}
      </p>

      {/* Dynamic Architecture / Tech Visual Diagram */}
      <ArticleVisual category={post.category} slug={post.slug} />

      {/* AEO Quick Verdict Box */}
      <QuickVerdict score={post.score} verdict={post.verdict} />

      {/* Ad Placement 1 */}
      <AdSlot format="horizontal" minHeight="90px" slotId="in-feed-top" />

      {/* In-Depth Matrix / Comparison Table */}
      {post.tableData && post.tableData.length > 0 && (
        <div className="my-10">
          <ComparisonTable data={post.tableData} />
        </div>
      )}

      {/* Content Sections */}
      <div className="space-y-10 my-10">
        {post.sections.map((section, idx) => (
          <section key={idx} className="space-y-3">
            <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
              {section.heading}
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              {section.content}
            </p>
          </section>
        ))}
      </div>

      {/* Ad Placement 2 */}
      <AdSlot format="horizontal" minHeight="250px" slotId="in-feed-bottom" />

      {/* FAQ Section with AEO schema integration */}
      <FAQSection faqs={post.faqs} />
    </article>
  );
}
