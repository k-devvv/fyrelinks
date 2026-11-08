import Link from "next/link";
import {ArrowRight, Rss} from "lucide-react";
import {NEWS, POSTS, CATEGORIES} from "@/lib/posts";
import {articlePath, formatDate, type EditorialPost} from "@/lib/editorial";
import StoryCard, {StoryImage} from "@/components/StoryCard";
import ToolStrip from "@/components/ToolStrip";
import AdSlot from "@/components/AdSlot";
import {getLiveNews} from "@/lib/live-news";

// Freshness comes from the scheduled rebuild workflow, not request-time revalidation.

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
const Arrow = () => <ArrowRight size={14} aria-hidden="true"/>;

function SectionHead({id, title, href, label}: {id: string; title: string; href: string; label: string}) {
  return <div className="fx-section-head"><h2 id={id}>{title}</h2><Link href={href} className="fx-more">{label} <Arrow/></Link></div>;
}

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

  return <div className="wrap fx-home">
    <header className="fx-hero-head">
      <h1>AI news, <em>ComfyUI guides</em> &amp; local hardware advice</h1>
      <span className="fx-updated"><span className="fx-dot" aria-hidden="true"/>Updated {formatDate(lead.publishedAt)}</span>
    </header>

    <section className="fx-front" aria-label="Top stories">
      <article className="fx-lead">
        <Link href={articlePath(lead)} className="fx-lead-image" aria-label={lead.title}><StoryImage post={lead} priority /></Link>
        <div className="fx-lead-copy">
          <div className="fx-kicker">{lead.topic}</div>
          <h2><Link href={articlePath(lead)}>{lead.title}</Link></h2>
          <p>{lead.metaDescription}</p>
          <div className="fx-meta"><time dateTime={lead.publishedAt}>{formatDate(lead.publishedAt)}</time><span>{lead.readTime}</span></div>
        </div>
      </article>

      <div className="fx-side">
        {secondary.map(p => <article className="fx-mini" key={p.slug}>
          <div>
            <div className="fx-kicker">{p.topic}</div>
            <h3><Link href={articlePath(p)}>{p.title}</Link></h3>
            <div className="fx-meta"><time dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time><span>{p.readTime}</span></div>
          </div>
          <Link href={articlePath(p)} className="fx-thumb" aria-hidden="true" tabIndex={-1}><StoryImage post={p} /></Link>
        </article>)}
      </div>
    </section>

    <div className="fx-band">
      <section className="fx-panel fx-latest" aria-labelledby="latest-heading">
        <h2 id="latest-heading">Latest</h2>
        <ol>
          {latest.map(p => <li key={p.slug}>
            <time dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time>
            <Link href={articlePath(p)}>{p.title}</Link>
          </li>)}
        </ol>
        <Link href="/news" className="fx-more">All news <Arrow/></Link>
      </section>

      <aside className="fx-rail" aria-label="Original work">
        <section className="fx-panel fx-research" aria-labelledby="original-work-heading">
          <span className="eyebrow">Original measurements</span>
          <h2 id="original-work-heading">Measured on one RTX 4050 laptop</h2>
          <p>One RTX 4050 laptop, a pinned Qwen checkpoint and nine timed trials. Inspect the method, chart and raw results before generalizing.</p>
          <Link href="/hardware/qwen3-06b-rtx4050-context-memory-measured-test" className="fx-research-link">Qwen3 context memory: what changed from 108 to 4,075 input tokens?</Link>
          <Link href="/research" className="fx-more">Methods and resources <Arrow/></Link>
        </section>
        <AdSlot placement="sidebar" />
      </aside>
    </div>

    {web.length > 0 && <section className="fx-section" aria-labelledby="web-heading">
      <SectionHead id="web-heading" title="Around the web" href="/live" label="All live headlines"/>
      <ul className="fx-chips">{web.map(i => <li key={i.url}><a href={i.url} target="_blank" rel="noopener noreferrer">{i.title}</a><span>{i.source}</span></li>)}</ul>
    </section>}

    <ToolStrip />

    {popular.length > 0 && <section className="fx-section" aria-labelledby="popular-heading">
      <SectionHead id="popular-heading" title="Popular guides" href="/workflow" label="All guides"/>
      <ul className="fx-chips">{popular.map(p => <li key={p.slug}><Link href={articlePath(p)}>{p.title}</Link><span>{p.topic}</span></li>)}</ul>
    </section>}

    {sections.map(({category, posts}) => <section className="fx-section" key={category.slug} aria-labelledby={`bs-${category.slug}`}>
      <SectionHead id={`bs-${category.slug}`} title={category.name} href={`/${category.slug}`} label={`More ${category.name.toLowerCase()}`}/>
      <div className="fx-cards">{posts.map(p => <StoryCard key={p.slug} post={p}/>)}</div>
    </section>)}

    <section className="fx-cta">
      <Rss size={30} aria-hidden="true"/>
      <div><span className="eyebrow">KEEP YOUR EDGE</span><h2>New guides, straight to your feed.</h2><p>Follow new news, guides and updates in any RSS reader.</p></div>
      <a href="/rss" className="button-primary">Follow via RSS</a>
    </section>

    <section className="fx-principles" aria-labelledby="how-heading">
      <h2 id="how-heading" className="eyebrow">HOW WE WORK</h2>
      <div><strong>Useful first.</strong><p>Guides start from the problem a reader has, with steps and numbers you can check.</p></div>
      <div><strong>Sources always.</strong><p>Every story links to where the information comes from.</p></div>
      <div><strong>Labeled analysis.</strong><p>Vendor claims and our own analysis are labeled separately.</p><Link href="/about">Read our approach <Arrow/></Link></div>
    </section>
  </div>;
}
