import catalog from "./content/video-pricing.json";

export interface VideoPlan {
  id: string;
  name: string;
  monthly: number;
  annual: number;
  credits: number;
  tier: number;
}
export interface VideoProvider {
  id: string;
  name: string;
  mark: string;
  url: string;
  note: string;
  plans: VideoPlan[];
}
export interface VideoVariant {
  id: string;
  provider: string;
  model: string;
  setting: string;
  seconds: number | null;
  credits: number | null;
  minTier: number;
  approx: boolean;
}
export const PRICING_CHECKED = catalog.checkedAt;
export const VIDEO_PROVIDERS: VideoProvider[] = catalog.providers;
export const VIDEO_VARIANTS: VideoVariant[] = catalog.variants;
export const DEFAULT_VARIANT = "higgsfield-kling-3-0-720p-5";
export const variantRate = (v: VideoVariant) => v.credits === null ? "Account quote required" : `${v.approx ? "≈ " : ""}${v.credits} credits / ${v.seconds === 1 ? "second" : `${v.seconds}s`}`;
export const money = (value: number) => new Intl.NumberFormat("en-US", {style: "currency", currency: "USD", maximumFractionDigits: 2}).format(value);
