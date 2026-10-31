"use client";
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { adFrameOrigin, adFrameUrl, selectAdUnit, type AdPlacement } from '@/lib/advertising';
// Ads load for every visitor; only a browser Do Not Track or Global Privacy Control signal turns them off.
function restricted() {
  return navigator.doNotTrack === '1' || (navigator as Navigator & {globalPrivacyControl?: boolean}).globalPrivacyControl === true;
}
export default function Advertising({ placement }: { placement: AdPlacement }) {
  const pathname = usePathname();
  const host = useRef<HTMLElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [unfilled, setUnfilled] = useState(false);
  const [width, setWidth] = useState(0);
  const [desktop, setDesktop] = useState(false);
  const [pageOrigin, setPageOrigin] = useState('');
  // Error and 404 screens mark themselves so no ad unit loads beside them.
  const [blocked, setBlocked] = useState(false);
  useEffect(() => { setAllowed(!restricted()); }, []);
  useEffect(() => { setBlocked(document.querySelector('[data-no-ads]') !== null); }, [pathname]);
  useEffect(() => {
    const node = host.current; if (!node) return;
    const update = () => { setPageOrigin(window.location.origin); setWidth(node.clientWidth); setDesktop(window.matchMedia('(min-width: 1100px)').matches); };
    const observer = new ResizeObserver(update); observer.observe(node); update(); window.addEventListener('resize', update);
    return () => { observer.disconnect(); window.removeEventListener('resize', update); };
  }, [allowed]);
  const unit = selectAdUnit(placement, width, desktop);
  const frameUrl = unit ? adFrameUrl(unit.key, pageOrigin) : null;
  useEffect(() => {
    setUnfilled(false);
    const receive = (event: MessageEvent) => {
      if (event.origin === adFrameOrigin() && event.source === frame.current?.contentWindow && event.data?.type === 'fyre-ad-unfilled' && event.data?.key === unit?.key) setUnfilled(true);
    };
    window.addEventListener('message', receive);
    return () => window.removeEventListener('message', receive);
  }, [pathname, unit?.key]);
  // Unfilled or no-fit slots collapse instead of showing an empty box.
  if (allowed === false || blocked || unfilled) return null;
  return <section data-nosnippet="" role="complementary" ref={host} className={`network-ad network-ad-${placement}${allowed && unit && frameUrl ? '' : ' network-ad-pending'}`} aria-label="Advertisement">{allowed && unit && frameUrl && <><span className="eyebrow">ADVERTISEMENT</span><iframe ref={frame} key={`${pathname}-${unit.key}`} title={`Adsterra ${unit.width} by ${unit.height} advertisement`} width={unit.width} height={unit.height} src={frameUrl} sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox" referrerPolicy="strict-origin-when-cross-origin" /></>}</section>;
}
