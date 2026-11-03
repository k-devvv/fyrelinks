export type ReaderLinkContext = 'download' | 'rss' | 'source' | 'related' | 'enquiry' | 'other';
export function readerLinkEvent(href: string, origin: string, context: ReaderLinkContext, placement = '') {
  let url: URL;
  try { url = new URL(href, origin); } catch { return null; }
  const sameOrigin = url.origin === origin;
  if (sameOrigin && context === 'download' && /^\/downloads\/[a-z0-9-]+\.(?:json|html|txt|py)$/.test(url.pathname)) return {name:'resource_download', fields:{resource_path:url.pathname}};
  if (sameOrigin && context === 'rss' && ['/rss','/feed.xml'].includes(url.pathname)) return {name:'rss_subscribe', fields:{placement:'site'}};
  if (context === 'source' && url.protocol === 'https:') return {name:'source_visit', fields:{source_domain:url.hostname}};
  if (sameOrigin && context === 'related' && /^\/[a-z]+\/[a-z0-9-]+$/.test(url.pathname)) return {name:'related_read', fields:{article_path:url.pathname}};
  // A mailto URL carries the address and a prefilled subject, so nothing from
  // the URL is recorded: only the placement label the markup declares.
  if (context === 'enquiry' && url.protocol === 'mailto:' && /^[a-z][a-z-]{1,38}[a-z]$/.test(placement)) return {name:'service_enquiry', fields:{placement}};
  return null;
}

/** No metric IDs, DOM attribution, URLs or arbitrary text are transmitted. */
export function webVitalFields(properties: unknown): Record<string, string | number> {
  if (!properties || typeof properties !== 'object' || Array.isArray(properties)) return {};
  const p = properties as Record<string, unknown>;
  if (typeof p.name !== 'string' || !['CLS','LCP','INP','FCP','TTFB'].includes(p.name)) return {};
  if (typeof p.value !== 'number' || !Number.isFinite(p.value) || p.value < 0 || p.value > 3_600_000) return {};
  if (typeof p.rating !== 'string' || !['good','needs-improvement','poor'].includes(p.rating)) return {};
  return {metric_name:p.name, value:Math.round(p.name === 'CLS' ? p.value * 1000 : p.value), metric_rating:p.rating};
}
