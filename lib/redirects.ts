/**
 * Outbound link registry served by /go/[slug].
 *
 * `destination` is the plain, non-commissioned URL. To turn a slug into an
 * affiliate link, set its `env` variable (in Vercel) to the tracking URL the
 * partner program gave you. Without it the link still works but earns nothing.
 */
type OutboundLink = { destination: string; env?: string };

export const REDIRECT_MAP: Record<string, OutboundLink> = {
  minimax: { destination: "https://hailuoai.video", env: "FYRE_AFF_MINIMAX" },
  kimi: { destination: "https://kimi.moonshot.cn", env: "FYRE_AFF_KIMI" },
  seedance: { destination: "https://fal.ai/models/fal-ai/seedance", env: "FYRE_AFF_SEEDANCE" },
  ideogram: { destination: "https://ideogram.ai", env: "FYRE_AFF_IDEOGRAM" },
  runpod: { destination: "https://www.runpod.io", env: "FYRE_AFF_RUNPOD" },
  "amazon-us": { destination: "https://www.amazon.com/s?k=nvidia+rtx+graphics+card", env: "FYRE_AFF_AMAZON_US" },
  "amazon-uk": { destination: "https://www.amazon.co.uk/s?k=nvidia+rtx+graphics+card", env: "FYRE_AFF_AMAZON_UK" },
  "amazon-ca": { destination: "https://www.amazon.ca/s?k=nvidia+rtx+graphics+card", env: "FYRE_AFF_AMAZON_CA" },
  "amazon-de": { destination: "https://www.amazon.de/s?k=nvidia+rtx+grafikkarte", env: "FYRE_AFF_AMAZON_DE" },
};

function lookup(slug: string): OutboundLink | undefined {
  const key = slug.toLowerCase();
  return Object.prototype.hasOwnProperty.call(REDIRECT_MAP, key) ? REDIRECT_MAP[key] : undefined;
}

export function getRedirectUrl(slug: string): string | undefined {
  const link = lookup(slug);
  if (!link) return undefined;
  return (link.env && process.env[link.env]?.trim()) || link.destination;
}
