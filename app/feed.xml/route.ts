import { POSTS } from "@/lib/posts";
import { SITE_URL, articlePath } from "@/lib/editorial";
export const dynamic = "force-dynamic";
const xml = (s: string) => s.replace(/[<>&"']/g, c => ({
  "<": "&lt;",
  ">": "&gt;",
  "&": "&amp;",
  '"': "&quot;",
  "'": "&apos;"
})[c]!);
export function GET(request: Request) {
  const url = new URL(request.url);
  const accepted = (request.headers.get("accept") ?? "").toLowerCase().split(",").map(entry => {
    const [type, ...parameters] = entry.trim().split(";");
    const value = parameters.find(p => p.trim().startsWith("q="))?.trim().slice(2);
    const q = value === undefined ? 1 : Number(value);
    return { type: type.trim(), q: Number.isFinite(q) && q >= 0 && q <= 1 ? q : 0 };
  });
  const htmlQuality = Math.max(0, ...accepted.filter(a => a.type === "text/html").map(a => a.q));
  const xmlQuality = Math.max(0, ...accepted.filter(a => ["application/rss+xml", "application/xml", "text/xml"].includes(a.type)).map(a => a.q));
  if (url.searchParams.get("format") !== "xml" && htmlQuality > xmlQuality) {
    return new Response(null, { status: 307, headers: { Location: SITE_URL + "/rss", Vary: "Accept", "Cache-Control": "public, max-age=3600" } });
  }
  const posts = [...POSTS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>FyreLinkz</title><link>${SITE_URL}</link><description>AI news, creative tools and practical guides.</description><language>en</language><atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>${posts.map(p => `<item><title>${xml(p.title)}</title><link>${SITE_URL + articlePath(p)}</link><guid isPermaLink="true">${SITE_URL + articlePath(p)}</guid><description>${xml(p.metaDescription)}</description><pubDate>${new Date(p.publishedAt + "T06:30:00Z").toUTCString()}</pubDate><category>${xml(p.topic)}</category></item>`).join("")}</channel></rss>`, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Vary": "Accept",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
