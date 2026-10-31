// Headline aggregator: title, source, date and a link back to the publisher. No article text is stored or shown.
export interface LiveItem {
  title: string;
  url: string;
  source: string;
  date: string;
}

interface Source {
  name: string;
  feed: string;
  keep?: RegExp;
}

const AI_TOPIC = /\b(ai|a\.i\.|llm|gpu|nvidia|openai|anthropic|claude|gemini|model|diffusion|comfyui|inference|machine learning|neural|chip|rtx)\b/i;

export const LIVE_SOURCES: Source[] = [
  { name: "Hugging Face", feed: "https://huggingface.co/blog/feed.xml" },
  { name: "NVIDIA Developer", feed: "https://developer.nvidia.com/blog/feed" },
  { name: "ComfyUI releases", feed: "https://github.com/comfyanonymous/ComfyUI/releases.atom" },
  { name: "OpenAI", feed: "https://openai.com/news/rss.xml" },
  { name: "Google AI", feed: "https://blog.google/technology/ai/rss/" },
  { name: "The Verge", feed: "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml", keep: AI_TOPIC },
  { name: "TechCrunch", feed: "https://techcrunch.com/category/artificial-intelligence/feed/", keep: AI_TOPIC },
  { name: "MIT Technology Review", feed: "https://www.technologyreview.com/topic/artificial-intelligence/feed" },
  { name: "Ars Technica", feed: "https://arstechnica.com/ai/feed/", keep: AI_TOPIC },
  { name: "Tom's Hardware", feed: "https://www.tomshardware.com/feeds/all", keep: AI_TOPIC }
];

const PER_SOURCE = 8;
const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

function decode(s: string) {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m)
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function tag(block: string, name: string) {
  const m = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, "i"));
  return m ? decode(m[1]) : "";
}

function link(block: string) {
  // Atom entries can carry several links; the article is rel="alternate" or the one without a rel.
  const atom = Array.from(block.matchAll(/<link\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi))
    .find(m => !/\brel=["']/i.test(m[0]) || /\brel=["']alternate["']/i.test(m[0]));
  const href = atom ? decode(atom[1]) : tag(block, "link");
  try {
    const u = new URL(href);
    return u.protocol === "https:" || u.protocol === "http:" ? u.href : "";
  } catch {
    return "";
  }
}

export function parseFeed(xml: string, source: Source): LiveItem[] {
  const blocks = xml.match(/<(item|entry)[\s>][\s\S]*?<\/\1>/gi) ?? [];
  const now = Date.now();
  const items: LiveItem[] = [];
  for (const b of blocks) {
    const title = tag(b, "title");
    const url = link(b);
    const when = Date.parse(tag(b, "pubDate") || tag(b, "published") || tag(b, "updated") || tag(b, "dc:date"));
    if (!title || !url || Number.isNaN(when) || when > now + 86_400_000) continue;
    if (source.keep && !source.keep.test(title)) continue;
    items.push({ title, url, source: source.name, date: new Date(when).toISOString() });
  }
  return items.sort((a, b) => b.date.localeCompare(a.date)).slice(0, PER_SOURCE);
}

async function load(source: Source): Promise<LiveItem[]> {
  try {
    const res = await fetch(source.feed, {
      signal: AbortSignal.timeout(8000),
      headers: { "user-agent": "FyreLinkzBot/1.0 (+https://www.fyrelinkz.com)", accept: "application/rss+xml, application/atom+xml, text/xml" }
    });
    if (!res.ok) return [];
    return parseFeed(await res.text(), source);
  } catch {
    return [];
  }
}

export async function getLiveNews(limit = 60): Promise<LiveItem[]> {
  const all = (await Promise.all(LIVE_SOURCES.map(load))).flat();
  const seen = new Set<string>();
  return all
    .sort((a, b) => b.date.localeCompare(a.date))
    .filter(i => {
      const key = i.url.replace(/[?#].*$/, "").toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, limit);
}
