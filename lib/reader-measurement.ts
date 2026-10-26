export type ReaderLinkContext = 'download' | 'rss' | 'source' | 'related' | 'other';
export function readerLinkEvent(href: string, origin: string, context: ReaderLinkContext) {
  let url: URL;
  try { url = new URL(href, origin); } catch { return null; }
  const sameOrigin = url.origin === origin;
  if (sameOrigin && context === 'download' && /^\/downloads\/[a-z0-9-]+\.(?:json|html|txt|py)$/.test(url.pathname)) return {name:'resource_download', fields:{resource_path:url.pathname}};
  if (sameOrigin && context === 'rss' && ['/rss','/feed.xml'].includes(url.pathname)) return {name:'rss_subscribe', fields:{placement:'site'}};
  if (context === 'source' && url.protocol === 'https:') return {name:'source_visit', fields:{source_domain:url.hostname}};
  if (sameOrigin && context === 'related' && /^\/[a-z]+\/[a-z0-9-]+$/.test(url.pathname)) return {name:'related_read', fields:{article_path:url.pathname}};
  return null;
}
