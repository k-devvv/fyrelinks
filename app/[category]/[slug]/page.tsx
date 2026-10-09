import Link from "next/link";
import SmartLink from "@/components/SmartLink";
import { notFound } from "next/navigation";
import { POSTS, getPostBySlug, getCategoryBySlug, getRelatedPosts } from "@/lib/posts";
import { SITE_URL, articlePath, articleShareImagePath, articleImageDimensions, sectionId, formatDate } from "@/lib/editorial";
import { pageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import StoryCard, { StoryImage } from "@/components/StoryCard";
import AdSlot from "@/components/AdSlot";
import ReadingProgress from "@/components/ReadingProgress";
import type { Metadata } from "next";

type Props = { params: Promise<{ category: string; slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map(p => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const p = getPostBySlug(category, slug);
  if (!p) return {};
  const m = pageMetadata(p.title, p.metaDescription, articlePath(p), articleShareImagePath(p.image), p.imageAlt);
  return {
    ...m,
    openGraph: {
      ...m.openGraph,
      type: "article",
      images: [{ url: SITE_URL + articleShareImagePath(p.image), alt: p.imageAlt, ...articleImageDimensions(p.image) }],
      publishedTime: p.publishedAt + "T12:00:00+05:30",
      modifiedTime: p.updatedAt + "T12:00:00+05:30",
      authors: [SITE_URL + "/about"]
    }
  };
}

function renderInlineText(text: string) {
  if (!text || !text.includes("[")) return text;
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, idx) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return part;
    const [, label, href] = match;
    if (href.startsWith("/") && !href.startsWith("//")) return <SmartLink key={idx} href={href}>{label}</SmartLink>;
    if (!/^https?:\/\//i.test(href)) return label;
    return <SmartLink key={idx} href={href}>{label} ↗</SmartLink>;
  });
}

export default async function ArticlePage({ params }: Props) {
  const { category: categorySlug, slug } = await params;
  const p = getPostBySlug(categorySlug, slug);
  if (!p) notFound();
  const category = getCategoryBySlug(p.category)!;
  const nextRead = getRelatedPosts(p.slug, 1)[0];
  const bottomRelated = getRelatedPosts(p.slug, 3, nextRead ? [nextRead.slug] : []);

  return (
    <article className="wrap article-page">
      <ReadingProgress />
      <JsonLd post={p} url={SITE_URL + articlePath(p)} />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span>/</span><Link href={"/" + p.category}>{category.name}</Link>
        <span aria-hidden="true">/</span><span aria-current="page">{p.title}</span>
      </nav>
      <header className="article-header">
        <div className="story-meta"><span className="eyebrow topic">{p.topic}</span><span>{p.evidenceBasis} · {p.readTime}</span></div>
        <h1>{p.title}</h1><p className="article-deck">{p.metaDescription}</p>
        <div className="article-byline">
          <span className="author-mark">f<span>✳</span></span>
          <div><Link href="/about">{p.author.name}</Link><p>Published <time dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time>{p.updatedAt !== p.publishedAt && <> · Updated <time dateTime={p.updatedAt}>{formatDate(p.updatedAt)}</time></>}</p></div>
        </div>
        {p.eventDate && <p className="event-date">Announcement date: <time dateTime={p.eventDate}>{formatDate(p.eventDate)}</time> · Reported from the original source</p>}
      </header>
      <figure className="article-figure">
        <StoryImage post={p} priority />
        <figcaption>
          {p.imageCaption ?? (p.image.endsWith("-photo")
            ? "Editorial photograph. Illustrative only; not a product screenshot or test evidence."
            : <>Illustration by FyreLinkz. {p.category === "news" ? "Reporting based on the linked announcement." : "A conceptual illustration, not a benchmark result."}</>)}
          {p.imageCreditName && p.imageCreditUrl && <> Photo: <a href={p.imageCreditUrl} target="_blank" rel="noopener noreferrer">{p.imageCreditName} / Unsplash ↗</a></>}
        </figcaption>
      </figure>
      <div className="article-grid">
        <aside className="article-contents"><div><span className="eyebrow">IN THIS STORY</span>
          <nav aria-label="Table of contents">
            {p.sections.map(s => <a href={"#" + sectionId(s.heading)} key={s.heading}>{s.heading}</a>)}
            {p.faqs.length > 0 && <a href="#faq">Frequently asked questions</a>}
            <a href="#sources">Sources & further reading</a>
          </nav>
          <Link href={"/" + p.category} className="contents-tool">Explore {category.name.toLowerCase()} ↗</Link>
        </div></aside>
        <div className="article-body">
          <div className="takeaway"><span className="eyebrow">QUICK ANSWER</span><p>{p.verdict}</p></div>
          {p.sections.map((s, i) => <section id={sectionId(s.heading)} key={s.heading}>
            <h2>{s.heading}</h2><p>{renderInlineText(s.content)}</p>
            {s.subpoints && <ul>{s.subpoints.map(b => <li key={b}>{renderInlineText(b)}</li>)}</ul>}
            {s.table && <div className="table-wrap"><table className="article-table"><thead><tr>{s.table.headers.map((h, hIdx) => <th key={hIdx}>{h}</th>)}</tr></thead><tbody>{s.table.rows.map((row, rIdx) => <tr key={rIdx}>{row.map((cell, cIdx) => <td key={cIdx}>{renderInlineText(cell)}</td>)}</tr>)}</tbody></table></div>}
            {s.checklist && <div className="article-checklist"><span className="checklist-badge">REPRODUCIBLE CHECKLIST</span><ul>{s.checklist.map(item => <li key={item}><span className="check-box" aria-hidden="true">✓</span><span>{renderInlineText(item)}</span></li>)}</ul></div>}
            {s.sourceIds && <div className="inline-sources">Source: {s.sourceIds.map((id, j) => <span key={id}>{j > 0 && " · "}<a href={p.sources[id - 1].url} rel="noopener noreferrer" target="_blank">{p.sources[id - 1].publisher} [{id}] ↗</a></span>)}</div>}
            {i === 2 && nextRead && <aside className="article-next-read" aria-label="Related reading"><Link href={articlePath(nextRead)}><StoryImage post={nextRead} /><span><small className="eyebrow">READ NEXT</small><strong>{nextRead.title}</strong><span>{nextRead.metaDescription}</span></span></Link></aside>}
            {i === 2 && <AdSlot placement="article" />}
          </section>)}
          {p.faqs.length > 0 && <section className="article-faq" id="faq" aria-labelledby="faq-heading">
            <span className="eyebrow">CLEAR ANSWERS</span><h2 id="faq-heading">Frequently asked questions</h2>
            {p.faqs.map(faq => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
          </section>}
          <section className="sources-box" id="sources"><span className="eyebrow">FOLLOW THE SOURCE</span><h2>Sources & further reading</h2>
            <p>Primary sources checked {formatDate(p.sourceCheckedAt)}. Vendor statements are attributed; editorial advice is our own.</p>
            <ol>{p.sources.map((s, i) => <li key={s.url}><span className="source-number">{i + 1}</span><div><a href={s.url} rel="noopener noreferrer" target="_blank">{s.title} ↗</a><small>{s.publisher}{s.publishedAt && " · " + formatDate(s.publishedAt)}</small></div></li>)}</ol>
          </section>
          <div className="correction-link"><strong>Something changed?</strong><p>Help us keep this useful. <Link href="/contact">Send a correction or a primary source →</Link></p></div>
        </div>
      </div>
      <section className="related-section"><div className="section-heading"><h2>Keep following the thread<span>.</span></h2></div><div className="guide-grid">{bottomRelated.map(r => <StoryCard post={r} key={r.slug} />)}</div></section>
    </article>
  );
}
