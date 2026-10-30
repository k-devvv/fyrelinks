import Link from "next/link";
import {ArrowRight, Rss} from "lucide-react";
import {NEWS, POSTS, CATEGORIES} from "@/lib/posts";
import {articlePath, formatDate, type EditorialPost} from "@/lib/editorial";
import StoryCard, {StoryImage} from "@/components/StoryCard";
import ToolStrip from "@/components/ToolStrip";
import AdSlot from "@/components/AdSlot";
import {getLiveNews} from "@/lib/live-news";

export const revalidate = 3600;

const SECTIONS = ["hardware", "workflow", "create"] as const;
// Guides with the most Google Search impressions (Search Console, Aug–Oct 2026).
const POPULAR = [
  "run-local-llm-rtx-4050-laptop-guide",
  "ai-video-generation-matrix-minimax-higgsfield-seedance",
  "best-local-ai-workstation-build-guide-2026",
  "cursor-vs-windsurf-vs-copilot-developer-benchmarks",
  "ai-web-scraping-pipelines-firecrawl-playwright-rag",
  "jev-needle3-small-ai-models-gpu-cost",
  "moss-image-native-layout-json-base-sft",
  "reflection-beam-gpu-requirements-open-weights",
  "civitai-sdxl-photorealism-checkpoint-matrix"
];
const byUpdated = (a: EditorialPost, b: EditorialPost) => b.updatedAt.localeCompare(a.updatedAt);

export default async function Home() {
  const perSource: Record<string, number> = {};
  const web = (await getLiveNews(80)).filter(i => (perSource[i.source] = (perSource[i.source] ?? 0) + 1) <= 2).slice(0, 9);
  const popular = POPULAR.map(slug => POSTS.find(p => p.slug === slug)).filter((p): p is EditorialPost => Boolean(p));
  const [lead, ...rest] = NEWS;
  const secondary = rest.slice(0, 3);
  const latest = rest.slice(3, 11);
  const sections = SECTIONS.map(slug => ({
    category: CATEGORIES.find(c => c.slug === slug)!,
    posts: POSTS.filter(p => p.category === slug).sort(byUpdated).slice(0, 3)
  }));

  return <div className="wrap home bs-home">
    <h1 className="bs-dateline"><span>AI news, ComfyUI guides &amp; local hardware advice</span><span>Updated {formatDate(lead.publishedAt)}</span></h1>

    <section className="bs-front" aria-label="Top stories">
      <article className="bs-lead">
        <Link href={articlePath(lead)} className="bs-lead-image" aria-label={lead.title}><StoryImage post={lead} priority /></Link>
        <div className="bs-kicker">{lead.topic}</div>
        <h2><Link href={articlePath(lead)}>{lead.title}</Link></h2>
        <p>{lead.metaDescription}</p>
        <div className="bs-meta"><time dateTime={lead.publishedAt}>{formatDate(lead.publishedAt)}</time><span>{lead.readTime}</span></div>
      </article>

      <div className="bs-mid">
        {secondary.map(p => <article className="bs-mid-item" key={p.slug}>
          <div>
            <div className="bs-kicker">{p.topic}</div>
            <h3><Link href={articlePath(p)}>{p.title}</Link></h3>
            <div className="bs-meta"><time dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time><span>{p.readTime}</span></div>
          </div>
          <Link href={articlePath(p)} className="bs-thumb" aria-hidden="true" tabIndex={-1}><StoryImage post={p} /></Link>
        </article>)}
      </div>

      <aside className="bs-rail" aria-label="Latest headlines">
        <h2 className="bs-rail-title">Latest</h2>
        <ol>
          {latest.map(p => <li key={p.slug}>
            <time dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time>
            <Link href={articlePath(p)}>{p.title}</Link>
          </li>)}
        </ol>
        <Link href="/news" className="bs-more">All news <ArrowRight size={14} aria-hidden="true"/></Link>
        <AdSlot placement="sidebar" />
      </aside>
    </section>

    {web.length > 0 && <section className="web-strip" aria-labelledby="web-heading">
      <div className="bs-section-head"><h2 id="web-heading">Around the web</h2><Link href="/live">All live headlines <ArrowRight size={14} aria-hidden="true"/></Link></div>
      <ul className="web-grid">{web.map(i => <li key={i.url}><a href={i.url} target="_blank" rel="noopener noreferrer">{i.title}</a><span>{i.source}</span></li>)}</ul>
    </section>}

    <ToolStrip />

    {popular.length > 0 && <section className="web-strip" aria-labelledby="popular-heading">
      <div className="bs-section-head"><h2 id="popular-heading">Popular guides</h2><Link href="/workflow">All guides <ArrowRight size={14} aria-hidden="true"/></Link></div>
      <ul className="web-grid">{popular.map(p => <li key={p.slug}><Link href={articlePath(p)}>{p.title}</Link><span>{p.topic}</span></li>)}</ul>
    </section>}

    {sections.map(({category, posts}) => <section className="bs-section" key={category.slug} aria-labelledby={`bs-${category.slug}`}>
      <div className="bs-section-head"><h2 id={`bs-${category.slug}`}>{category.name}</h2><Link href={`/${category.slug}`}>More {category.name.toLowerCase()} <ArrowRight size={14} aria-hidden="true"/></Link></div>
      <div className="bs-cards">{posts.map(p => <StoryCard key={p.slug} post={p}/>)}</div>
    </section>)}

    <section className="rss-banner"><Rss size={30}/><div><span className="eyebrow">KEEP YOUR EDGE</span><h2>New guides, straight to your feed.</h2><p>Follow new news, guides and updates in any RSS reader.</p></div><a href="/rss" className="button-secondary">Follow via RSS</a></section>
    <section className="editorial-note"><span className="eyebrow">HOW WE WORK</span><p>Useful first.<br/><strong>Sources always.</strong></p><div>Every story links to where the information comes from. Vendor claims and our own analysis are labeled separately.<Link href="/about">Read our approach <ArrowRight size={16}/></Link></div></section>
  </div>;
}
