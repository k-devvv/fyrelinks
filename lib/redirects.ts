export const REDIRECT_MAP: Record<string, string> = {
  minimax: "https://hailuoai.video",
  kimi: "https://kimi.moonshot.cn",
  seedance: "https://fal.ai/models/fal-ai/seedance",
  ideogram: "https://ideogram.ai",
};

export function getRedirectUrl(slug: string): string | undefined {
  const key = slug.toLowerCase();
  return Object.prototype.hasOwnProperty.call(REDIRECT_MAP, key) ? REDIRECT_MAP[key] : undefined;
}
