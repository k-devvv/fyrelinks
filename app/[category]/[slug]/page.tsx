import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  ChevronRight,
  Calendar,
  Clock,
  CheckCircle2,
  Share2,
  ExternalLink,
  Shield,
  HelpCircle,
  Award,
  Sparkles,
  Flame,
  ArrowRight,
} from "lucide-react";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import JsonLd, {
  generateProductReviewSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
} from "@/components/JsonLd";
import QuickVerdict from "@/components/QuickVerdict";
import ComparisonTable from "@/components/ComparisonTable";
import FloatingCard from "@/components/FloatingCard";
import AdSlot from "@/components/AdSlot";

interface Props {
  params: {
    category: string;
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({
    category: p.category,
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.category, params.slug);
  if (!post) return {};

  const canonicalUrl = `https://fyrelinkz.com/${post.category}/${post.slug}`;

  return {
    title: `${post.metaTitle} | FyreLinkz`,
    description: post.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: canonicalUrl,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.heroImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.heroImage],
    },
  };
}

export default function ReviewPage({ params }: Props) {
  const post = getPostBySlug(params.category, params.slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post.slug, 3);
  const currentUrl = `https://fyrelinkz.com/${post.category}/${post.slug}`;

  // Structured Data Schemas
  const productReviewSchema = generateProductReviewSchema({
    productName: post.product.name,
    brand: post.product.brand,
    model: post.product.model,
    sku: post.product.sku,
    price: post.product.price,
    currency: post.product.currency,
    rating: post.verdict.score,
    starRating: post.product.starRating,
    reviewCount: post.product.reviewCount,
    inStock: post.product.inStock,
    authorName: post.author.name,
    reviewBody: post.verdict.summary,
    url: currentUrl,
    imageUrl: post.heroImage,
    datePublished: post.publishedAt,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://fyrelinkz.com" },
    { name: post.categoryName, url: `https://fyrelinkz.com/${post.category}` },
    { name: post.product.name, url: currentUrl },
  ]);

  const faqSchema = generateFaqSchema(post.faqs);

  return (
    <div className="pb-24">
      {/* Schema.org Injection */}
      <JsonLd data={[productReviewSchema, breadcrumbSchema, faqSchema]} />

      {/* Floating Conversion Card (Sticky Bottom) */}
      <FloatingCard
        productName={post.product.name}
        brand={post.product.brand}
        price={post.product.price}
        originalPrice={post.product.originalPrice}
        discountPercent={post.product.discountPercent}
        rating={post.verdict.score}
        affiliateUrl={post.product.affiliateUrl}
        ctaText={post.product.ctaText}
      />

      {/* Breadcrumb Trail */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <Link href={`/${post.category}`} className="hover:text-white transition-colors">
            {post.categoryName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-fyre-400 font-medium line-clamp-1">{post.product.name}</span>
        </nav>
      </div>

      {/* Main Review Article Container */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Article Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-fyre-500/20 text-fyre-400 border border-fyre-500/30">
              {post.verdict.badge}
            </span>
            <span className="text-xs text-gray-400 font-medium">• {post.categoryName}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] font-sans">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
            {post.subtitle}
          </p>

          {/* Author & Timestamp Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-surface-border text-xs text-gray-400">
            <div className="flex items-center gap-3">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={40}
                height={40}
                className="rounded-full object-cover ring-2 ring-fyre-500/30"
              />
              <div>
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <span>{post.author.name}</span>
                  {post.author.verifiedReviewer && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </div>
                <div className="text-[11px] text-gray-400">{post.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Updated: {post.updatedAt}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative h-72 sm:h-96 md:h-[420px] w-full rounded-3xl overflow-hidden bg-surface-card border border-surface-border shadow-2xl">
          <Image
            src={post.heroImage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" />
        </div>

        {/* 1. Quick Verdict Box (Hero CTA) */}
        <QuickVerdict
          score={post.verdict.score}
          badge={post.verdict.badge}
          summary={post.verdict.summary}
          bottomLine={post.verdict.bottomLine}
          bestFor={post.verdict.bestFor}
          skipIf={post.verdict.skipIf}
          pros={post.pros}
          cons={post.cons}
          productName={post.product.name}
          brand={post.product.brand}
          price={post.product.price}
          originalPrice={post.product.originalPrice}
          discountPercent={post.product.discountPercent}
          affiliateUrl={post.product.affiliateUrl}
          ctaText={post.product.ctaText}
        />

        {/* 2. Technical Specs Table */}
        <section aria-label="Technical Specifications" className="my-10 space-y-4">
          <div className="flex items-center gap-2 text-fyre-400 font-bold text-xs uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Lab Verified Specifications</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Key Hardware & System Specifications
          </h2>

          <div className="overflow-hidden rounded-2xl bg-surface-card border border-surface-border">
            <dl className="divide-y divide-surface-border">
              {post.specs.map((spec, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-1 sm:grid-cols-3 p-4 text-xs sm:text-sm ${
                    spec.highlight ? "bg-fyre-500/5" : ""
                  }`}
                >
                  <dt className="font-semibold text-gray-400">{spec.label}</dt>
                  <dd className="sm:col-span-2 font-medium text-white mt-1 sm:mt-0 font-mono">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 3. Deep-Dive Review Content Sections */}
        <div className="space-y-10 text-gray-200 leading-relaxed font-sans pt-4">
          {post.sections.map((sec) => (
            <section key={sec.id} id={sec.id} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight border-b border-surface-border pb-3">
                {sec.title}
              </h2>

              <div className="space-y-4 text-base text-gray-300">
                {sec.content.map((paragraph, pIdx) => (
                  <p key={pIdx} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Callout box if exists */}
              {sec.callout && (
                <div className="my-6 p-5 rounded-2xl bg-surface/70 border border-fyre-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-fyre-400">
                    <Flame className="w-4 h-4" />
                    <span>{sec.callout.title}</span>
                  </div>
                  <p className="text-sm text-gray-200 leading-relaxed">
                    {sec.callout.text}
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* 4. In-Feed Affiliate Ad / Deal Slot */}
        <AdSlot
          format="in-feed"
          dealTitle={`Exclusive Deal on ${post.product.brand} ${post.product.name}`}
          dealSubtitle={`Save big with our reader-verified coupon. In stock and shipping now.`}
          couponCode="FYREPRO"
          affiliateUrl={post.product.affiliateUrl}
          discountBadge={post.product.discountPercent || "VERIFIED"}
          sponsorName={`${post.product.brand} Merchant`}
        />

        {/* 5. Head-to-Head Comparison Matrix */}
        <ComparisonTable
          title={post.comparisonTable.title}
          description={post.comparisonTable.description}
          specKeys={post.comparisonTable.specKeys}
          products={post.comparisonTable.products}
        />

        {/* 6. Frequently Asked Questions (Accordion / List) */}
        <section aria-label="Frequently Asked Questions" className="my-12 space-y-6">
          <div className="flex items-center gap-2 text-fyre-400 font-bold text-xs uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Community Questions & Answers</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {post.faqs.map((faq, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-2"
              >
                <h3 className="font-bold text-white text-base">
                  {faq.question}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Author Bio Box */}
        <div className="my-12 p-6 rounded-3xl bg-surface-card border border-surface-border flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <Image
            src={post.author.avatar}
            alt={post.author.name}
            width={72}
            height={72}
            className="rounded-full object-cover ring-4 ring-fyre-500/20 shrink-0"
          />
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="font-bold text-lg text-white">{post.author.name}</span>
              <span className="text-xs text-fyre-400 font-medium">({post.author.role})</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-xl">
              {post.author.bio}
            </p>
            <div className="text-[11px] text-gray-500">
              Tested according to the FyreLinkz Lab Standard • 100% Retail Sourced
            </div>
          </div>
        </div>

        {/* 8. Related Reviews Section */}
        {relatedPosts.length > 0 && (
          <section className="my-16 space-y-6 pt-6 border-t border-surface-border">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Related Benchmarked Reviews
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/${rel.category}/${rel.slug}`}
                  className="p-4 rounded-2xl bg-surface-card border border-surface-border hover:border-fyre-500/50 transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-fyre-400">
                        {rel.categoryName}
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-400">
                        ★ {rel.verdict.score}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white group-hover:text-fyre-400 transition-colors line-clamp-2">
                      {rel.title}
                    </h3>
                  </div>
                  <div className="mt-4 pt-3 border-t border-surface-border/60 flex items-center justify-between text-xs text-gray-400">
                    <span>{rel.product.price}</span>
                    <span className="text-fyre-400 font-bold group-hover:translate-x-1 transition-transform">
                      Read →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
