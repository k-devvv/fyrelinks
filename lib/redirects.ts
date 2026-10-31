/**
 * Outbound link registry served by the /go/<slug> Cloudflare Pages Function.
 *
 * `destination` is the plain, non-commissioned URL. To turn a slug into an
 * affiliate link, set its `env` variable (in the Pages project settings) to the
 * tracking URL the partner program gave you. Without it the link still works
 * but earns nothing.
 */
type OutboundLink = { destination: string; env?: string };

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
  "amazon-us": { destination: "https://www.amazon.com/s?k=nvidia+rtx+graphics+card", env: "FYRE_AFF_AMAZON_US" },
  "amazon-uk": { destination: "https://www.amazon.co.uk/s?k=nvidia+rtx+graphics+card", env: "FYRE_AFF_AMAZON_UK" },
  "amazon-ca": { destination: "https://www.amazon.ca/s?k=nvidia+rtx+graphics+card", env: "FYRE_AFF_AMAZON_CA" },
  "amazon-de": { destination: "https://www.amazon.de/s?k=nvidia+rtx+grafikkarte", env: "FYRE_AFF_AMAZON_DE" },
};

function lookup(slug: string): OutboundLink | undefined {
  const key = slug.toLowerCase();
  return Object.prototype.hasOwnProperty.call(REDIRECT_MAP, key) ? REDIRECT_MAP[key] : undefined;
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
  const override = link.env ? env[link.env] : undefined;
  return (typeof override === "string" && override.trim()) || link.destination;
}

/** Node-side convenience used by the content checks. */
export function getRedirectUrl(slug: string): string | undefined {
  const env = typeof process === "undefined" ? {} : process.env;
  return resolveRedirect(slug, env as Record<string, string | undefined>);
}
