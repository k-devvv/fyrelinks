export type AdPlacement = 'home' | 'article' | 'sidebar';
export const AD_CONSENT_KEY = 'fyre-advertising-consent-v1';
export const AD_CONSENT_EVENT = 'fyre-advertising-choice';
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
export function adFrameHtml(unit: typeof AD_UNITS[keyof typeof AD_UNITS]) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="referrer" content="strict-origin-when-cross-origin"><style>html,body{margin:0;padding:0;width:${unit.width}px;height:${unit.height}px;overflow:hidden}</style></head><body><script>window.atOptions=${JSON.stringify({key:unit.key,format:'iframe',height:unit.height,width:unit.width,params:{}})};<\/script><script src="https://bauval.org/22/${unit.key}"><\/script></body></html>`;
}
