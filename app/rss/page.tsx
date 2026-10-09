import Link from "next/link";
import { POSTS } from "@/lib/posts";
import { SITE_URL, articlePath, formatDate } from "@/lib/editorial";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Follow FyreLinkz with RSS", "Follow FyreLinkz AI news and practical guides in your RSS reader. Get the feed address and browse recent stories without registration.", "/rss");

export default function RSSPage() {
  const recent = [...POSTS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 5);
  return <div className="wrap info-page"><span className="eyebrow">FOLLOW AT YOUR OWN PACE</span><h1>Stories in your reader<span>.</span></h1><p className="intro">RSS brings new FyreLinkz articles to your feed reader. No account or email subscription required here.</p><section><h2>Subscribe in three steps</h2><ol><li>Open your preferred RSS reader.</li><li>Choose its option to add a feed or subscription.</li><li>Paste this address: <code className="rss-address">{SITE_URL}/feed.xml</code></li></ol><p>Your reader checks for new articles. The raw-feed link below shows XML, the format readers use.</p><a href="/feed.xml?format=xml" className="button-dark">View the raw RSS feed ↗</a></section><section><h2>Recent stories</h2><ul>{recent.map(p => <li key={p.slug}><Link href={articlePath(p)}>{p.title}</Link> <small>— {formatDate(p.publishedAt)}</small></li>)}</ul></section></div>;
}
