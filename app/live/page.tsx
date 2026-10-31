import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getLiveNews, LIVE_SOURCES, type LiveItem } from "@/lib/live-news";
import { SITE_URL } from "@/lib/editorial";

// Freshness comes from the scheduled rebuild workflow, not request-time revalidation.

// Headline lists add little on their own, so keep this page out of search results.
export const metadata: Metadata = {
  title: "Live AI headlines from across the web",
  description: "Headlines on AI, ComfyUI and local hardware from leading publishers, updated hourly. Every link goes to the original source.",
  alternates: { canonical: SITE_URL + "/live" },
  robots: { index: false, follow: true }
};

const day = (iso: string) => new Date(iso).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "UTC" });
const clock = (iso: string) => new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "UTC" }) + " UTC";

export default async function LivePage() {
  const items = await getLiveNews(80);
  const groups = items.reduce<Record<string, LiveItem[]>>((acc, i) => {
    (acc[day(i.date)] ??= []).push(i);
    return acc;
  }, {});

  return <div className="wrap live-page">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">Live feed</span></nav>
    <header className="category-header">
      <span className="eyebrow">UPDATED HOURLY</span>
      <h1>Live AI headlines</h1>
      <p>What the main publishers are reporting on AI, ComfyUI and local hardware. Each headline opens the original article on the publisher&rsquo;s own site.</p>
      <small>{items.length} headlines · {LIVE_SOURCES.length} sources</small>
    </header>

    {items.length === 0
      ? <p className="live-empty">Headlines are temporarily unavailable. Please check back soon, or read our <Link href="/news">own news coverage</Link>.</p>
      : <div className="live-layout">
        <div>
          {Object.entries(groups).map(([label, list]) => <section key={label} className="live-day" aria-label={label}>
            <h2>{label}</h2>
            <ul className="live-list">
              {list.map(i => <li key={i.url}>
                <a href={i.url} target="_blank" rel="noopener noreferrer">{i.title}<ArrowUpRight size={14} aria-hidden="true" /></a>
                <span className="live-meta"><b>{i.source}</b><time dateTime={i.date}>{clock(i.date)}</time></span>
              </li>)}
            </ul>
          </section>)}
        </div>
        <aside className="live-sources" aria-label="Sources">
          <h2>Sources</h2>
          <ul>{LIVE_SOURCES.map(s => <li key={s.name}>{s.name}</li>)}</ul>
          <p>We show only headlines, dates and source names, and link to the publisher for the full story. For our own sourced reporting and guides, see <Link href="/news">News</Link>.</p>
        </aside>
      </div>}
  </div>;
}
