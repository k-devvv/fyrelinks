import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, getCategoryBySlug, getPostsByCategory } from "@/lib/posts";
import StoryCard from "@/components/StoryCard";
import JsonLd, { generateBreadcrumbSchema } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/editorial";
import { pageMetadata } from "@/lib/metadata";
export const dynamicParams = false;
export function generateStaticParams() {
  return CATEGORIES.map(c => ({
    category: c.slug
  }));
}
export async function generateMetadata({
  params
}: {
  params: Promise<{
    category: string;
  }>;
}) {
  const c = getCategoryBySlug((await params).category);
  if (!c) return {};
  return pageMetadata(c.name, c.description, "/" + c.slug);
}
export default async function CategoryPage({
  params
}: {
  params: Promise<{
    category: string;
  }>;
}) {
  const c = getCategoryBySlug((await params).category);
  if (!c) notFound();
  const posts = getPostsByCategory(c.slug);
  return <div className="wrap category-page"><JsonLd data={generateBreadcrumbSchema([{
      name: "Home",
      url: SITE_URL
    }, {
      name: c.name,
      url: SITE_URL + "/" + c.slug
    }])} /><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">{c.name}</span></nav><header className="category-header"><span className="eyebrow">THE FYRELINKZ FIELD GUIDE</span><h1>{c.name}<span>.</span></h1><p>{c.description}</p><small>{posts.length} {posts.length === 1 ? "story" : "stories"} · Sources included</small></header>{c.slug === "hardware" && <section className="hardware-planner-promo"><div><span className="eyebrow">FREE PLANNING TOOL</span><h2>Choose a local AI machine by budget and country.</h2><p>Compare desktop builds, upgrades, and laptops for your workload.</p></div><Link className="button-primary" href="/hardware/ai-workstation-planner">Open the workstation planner ↗</Link></section>}<div className="category-grid">{posts.map((p, i) => <StoryCard key={p.slug} post={p} priority={i === 0} />)}</div></div>;
}
