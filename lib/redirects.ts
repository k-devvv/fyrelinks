/**
 * Outbound link registry served by the /go/<slug> Cloudflare Pages Function.
 *
 * `destination` is the plain, non-commissioned URL. A slug earns only once its
 * `env` variable is set in the Pages project; unset means the plain link is
 * served and earns nothing.
 *
 * Two kinds of programme, so two modes:
 *
 * - "replace" (the default) for programmes that hand you a complete tracking
 *   URL, such as Runpod, Runway and Hailuo. The variable holds that whole URL.
 * - "param" for programmes that work by adding one parameter to any URL on their
 *   own domain, which is how Amazon Associates works. The variable holds just
 *   the value — the tag itself — so one variable covers every link into that
 *   marketplace, including deep links to specific products added later.
 */
type OutboundLink = {
  destination: string;
  env?: string;
  mode?: "replace" | "param";
  /** Query parameter to carry the variable's value. Required by mode "param". */
  param?: string;
};

export const REDIRECT_MAP: Record<string, OutboundLink> = {
  minimax: { destination: "https://hailuoai.video", env: "FYRE_AFF_MINIMAX" },
  kimi: { destination: "https://kimi.moonshot.cn", env: "FYRE_AFF_KIMI" },
  seedance: { destination: "https://fal.ai/models/fal-ai/seedance", env: "FYRE_AFF_SEEDANCE" },
  ideogram: { destination: "https://ideogram.ai", env: "FYRE_AFF_IDEOGRAM" },
  runpod: { destination: "https://www.runpod.io", env: "FYRE_AFF_RUNPOD" },
  "video-higgsfield": { destination: "https://higgsfield.ai/pricing", env: "FYRE_AFF_VIDEO_HIGGSFIELD" },
  "video-runway": { destination: "https://runway.com/pricing", env: "FYRE_AFF_VIDEO_RUNWAY" },
  "video-luma": { destination: "https://lumalabs.ai/pricing", env: "FYRE_AFF_VIDEO_LUMA" },
  "video-pika": { destination: "https://pika.art/pricing?interval=month", env: "FYRE_AFF_VIDEO_PIKA" },
  "amazon-us": { destination: "https://www.amazon.com/s?k=nvidia+rtx+graphics+card", env: "FYRE_AFF_AMAZON_US", mode: "param", param: "tag" },
  "amazon-uk": { destination: "https://www.amazon.co.uk/s?k=nvidia+rtx+graphics+card", env: "FYRE_AFF_AMAZON_UK", mode: "param", param: "tag" },
  "amazon-ca": { destination: "https://www.amazon.ca/s?k=nvidia+rtx+graphics+card", env: "FYRE_AFF_AMAZON_CA", mode: "param", param: "tag" },
  "amazon-de": { destination: "https://www.amazon.de/s?k=nvidia+rtx+grafikkarte", env: "FYRE_AFF_AMAZON_DE", mode: "param", param: "tag" },
};

function lookup(slug: string): OutboundLink | undefined {
  const key = slug.toLowerCase();
  return Object.prototype.hasOwnProperty.call(REDIRECT_MAP, key) ? REDIRECT_MAP[key] : undefined;
}

/**
 * Adds or replaces one query parameter, leaving an existing query string and
 * fragment intact. An unparseable destination is returned untouched rather than
 * producing a broken link.
 */
function withParam(destination: string, param: string, value: string): string {
  try {
    const url = new URL(destination);
    url.searchParams.set(param, value);
    return url.toString();
  } catch {
    return destination;
  }
}

/**
 * Resolves a slug against an explicit environment bag. Workers expose bindings
 * on the request context rather than on `process`, so the caller supplies them.
 */
export function resolveRedirect(
  slug: string,
  env: Record<string, string | undefined> = {}
): string | undefined {
  const link = lookup(slug);
  if (!link) return undefined;

  const raw = link.env ? env[link.env] : undefined;
  const value = typeof raw === "string" ? raw.trim() : "";
  if (!value) return link.destination;

  if (link.mode === "param") {
    // Without a parameter name there is nothing to attach the value to, and
    // treating a bare tag as a URL would send readers somewhere unintended.
    return link.param ? withParam(link.destination, link.param, value) : link.destination;
  }
  return value;
}

/** Node-side convenience used by the content checks. */
export function getRedirectUrl(slug: string): string | undefined {
  const env = typeof process === "undefined" ? {} : process.env;
  return resolveRedirect(slug, env as Record<string, string | undefined>);
}
