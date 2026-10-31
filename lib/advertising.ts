export type AdPlacement = 'home' | 'article' | 'sidebar';
export const AD_UNITS = {
  rectangle: { key: '3a50733ae47bc10836d72bd1ac296fef', width: 300, height: 250 },
  mobile: { key: '101bd27cf42b02ca573f75194b17ebcf', width: 320, height: 50 },
  medium: { key: '925de3f713e028c901874205d2383097', width: 468, height: 60 },
  wide: { key: 'ce0c16d54dd755736635fc7722328d44', width: 728, height: 90 },
  sidebar: { key: '1f544a01d82de7ed149e8e83c6f330d9', width: 160, height: 600 }
} as const;
export function selectAdUnit(placement: AdPlacement, width: number, desktop: boolean) {
  if (placement === 'sidebar') return desktop && width >= 160 ? AD_UNITS.sidebar : null;
  if (placement === 'article') return width >= 300 ? AD_UNITS.rectangle : null;
  return width >= 728 ? AD_UNITS.wide : width >= 468 ? AD_UNITS.medium : width >= 320 ? AD_UNITS.mobile : null;
}
// A separate origin is required: never combine scripts and same-origin access
// in a frame hosted on the reader's own page origin.
// No default host: with none configured, no frame loads and no ad request is made.
export const AD_FRAME_ORIGIN = process.env.NEXT_PUBLIC_AD_FRAME_ORIGIN || '';
export function adFrameOrigin(): string | null {
  try {
    const url = new URL(AD_FRAME_ORIGIN);
    return url.protocol === 'https:' ? url.origin : null;
  } catch { return null; }
}
export function adFrameUrl(key: string, pageOrigin: string) {
  if (!pageOrigin || !Object.values(AD_UNITS).some(unit => unit.key === key)) return null;
  const origin = adFrameOrigin();
  if (!origin || origin === pageOrigin) return null;
  return origin + '/ads/frame.html?key=' + encodeURIComponent(key);
}
