import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { Calendar, Cpu, FlaskConical, Clock, ChevronRight, ArrowRight, ShieldCheck } from "lucide-react";
import { POSTS, getRelatedPosts } from "@/lib/posts";
import JsonLd from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";
import QuickVerdict from "@/components/QuickVerdict";
import ComparisonTable from "@/components/ComparisonTable";
import ArticleVisual from "@/components/ArticleVisual";
import VideoComparison from "@/components/VideoComparison";

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

  const url = `https://www.fyrelinkz.com/${post.category}/${post.slug}`;

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

  const currentUrl = `https://www.fyrelinkz.com/${post.category}/${post.slug}`;
  const relatedPosts = getRelatedPosts(post.slug, 2);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      <JsonLd post={post} url={currentUrl} />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
        <Link href={`/${post.category}`} className="hover:text-white capitalize transition-colors">
          {post.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
        <span className="text-gray-300 truncate max-w-xs">{post.title}</span>
      </nav>

      {/* Editorial Evidence & Methodology Metadata Badges */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-300">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-card border border-surface-border text-gray-300 font-mono">
            <FlaskConical className="w-3.5 h-3.5 text-fyre-400" />
            <span>{post.evidenceBasis || "Technical Guide"}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-card border border-surface-border text-gray-300 font-mono">
            <Cpu className="w-3.5 h-3.5 text-fyre-400" />
            <span className="truncate max-w-[200px]">{post.testedHardware}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-card border border-surface-border text-gray-300 font-mono">
            <Calendar className="w-3.5 h-3.5 text-fyre-400" />
            <span>{post.testedDate}</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-gray-400 font-mono">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readTime}</span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
          {post.metaDescription}
        </p>

        {/* Byline & Author Desk */}
        <div className="flex items-center gap-3 pt-2 border-t border-surface-border text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-semibold text-gray-200">{post.author.name}</span>
            <span>•</span>
            <span className="text-gray-400">{post.author.role}</span>
          </div>
        </div>
      </header>

      {/* Dynamic Architecture / Tech Visual Diagram */}
      <ArticleVisual category={post.category} slug={post.slug} />

      {/* Evidence-First Quick Verdict Box */}
      <QuickVerdict
        score={post.score}
        verdict={post.verdict}
        badge={post.postType === "guide" ? "Guide Overview" : "Executive Takeaway"}
        whoThisIsFor={post.whoThisIsFor}
        whereItFails={post.whereItFails}
        costPerUsableMinute={post.costPerUsableMinute}
      />

      {/* In-Depth Matrix / Comparison Table */}
      {post.tableData && post.tableData.length > 0 && (
        <div className="my-8">
          <ComparisonTable data={post.tableData} />
        </div>
      )}

      {/* Interactive Side-by-Side Video Motion Comparison & Evidence Teardown */}
      {post.videoComparisons && post.videoComparisons.length > 0 && (
        <div className="space-y-6 my-10">
          <div className="border-t border-surface-border pt-6">
            <div className="flex items-center gap-2 text-xs font-mono text-fyre-400 mb-1.5 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-fyre-500 animate-pulse" />
              <span>Motion Lab Evidence Teardown</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Synchronized Video & Motion Benchmark Teardown
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Synchronized 1080p motion stress-tests evaluated on physics consistency, temporal drift, and credit burn efficiency.
            </p>
          </div>

          <div className="space-y-8">
            {post.videoComparisons.map((comp, idx) => (
              <VideoComparison
                key={idx}
                title={comp.title}
                promptDescription={comp.promptDescription}
                clipA={comp.clipA}
                clipB={comp.clipB}
              />
            ))}
          </div>
        </div>
      )}

      {/* Main Content Sections */}
      <div className="space-y-8 my-8 text-gray-200">
        {post.sections.map((section, idx) => (
          <section key={idx} className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {section.heading}
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {section.content}
            </p>
          </section>
        ))}
      </div>

      {/* Scope & Methodology Disclosure */}
      <div className="p-4 rounded-xl bg-surface-card border border-surface-border text-xs text-gray-400 space-y-1.5">
        <div className="flex items-center gap-2 font-semibold text-gray-300">
          <ShieldCheck className="w-4 h-4 text-fyre-400" />
          <span>Research Methodology & Scope</span>
        </div>
        <p className="leading-relaxed">
          {post.testingScope}. FyreLinkz evaluations are conducted independently without vendor pre-approval or sponsored placement.
        </p>
      </div>

      {/* FAQ Section with clean semantic markup */}
      <FAQSection faqs={post.faqs} />

      {/* Related Reading & Comparisons */}
      {relatedPosts.length > 0 && (
        <section className="pt-8 border-t border-surface-border space-y-4">
          <h3 className="text-lg font-bold text-white tracking-tight">
            Related Teardowns & Architecture Guides
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/${related.category}/${related.slug}`}
                className="p-4 rounded-xl bg-surface-card border border-surface-border hover:border-fyre-500/40 transition-colors group space-y-2"
              >
                <div className="flex items-center justify-between text-[11px] text-gray-400">
                  <span className="font-mono uppercase">{related.category}</span>
                  <span>{related.readTime}</span>
                </div>
                <h4 className="font-bold text-sm text-white group-hover:text-fyre-400 transition-colors line-clamp-2">
                  {related.title}
                </h4>
                <div className="flex items-center gap-1 text-xs text-fyre-400 pt-1">
                  <span>Read Breakdown</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
