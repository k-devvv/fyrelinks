"use client";
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { AD_CONSENT_EVENT, AD_CONSENT_KEY, AD_FRAME_ORIGIN, AD_REGION_ENDPOINT, adFrameUrl, selectAdUnit, type AdPlacement } from '@/lib/advertising';
type Choice = 'yes' | 'no' | null;
const AD_REGION_KEY = 'fyre-ad-region-v1';
function restricted() {
  return navigator.doNotTrack === '1' || (navigator as Navigator & {globalPrivacyControl?: boolean}).globalPrivacyControl === true;
}
// True only once the server confirms this region does not need opt-in; any failure keeps opt-in.
function useRegionDefault() {
  const [defaultOn, setDefaultOn] = useState(false);
  useEffect(() => {
    let active = true;
    let cached: string | null = null;
    try { cached = sessionStorage.getItem(AD_REGION_KEY); } catch {}
    if (cached) { setDefaultOn(cached === 'default-on'); return; }
    fetch(AD_REGION_ENDPOINT, { cache: 'no-store' }).then(r => r.ok ? r.json() : null).then(data => {
      if (typeof data?.consentRequired !== 'boolean') return;
      const on = data.consentRequired === false;
      try { sessionStorage.setItem(AD_REGION_KEY, on ? 'default-on' : 'opt-in'); } catch {}
      if (active) setDefaultOn(on);
    }).catch(() => {});
    return () => { active = false; };
  }, []);
  return defaultOn;
}
function useAdChoice() {
  const [saved, setSaved] = useState<Choice>(null);
  const defaultOn = useRegionDefault();
  useEffect(() => {
    const sync = () => {
      let value: string | null = null;
      try { value = localStorage.getItem(AD_CONSENT_KEY); } catch {}
      setSaved(restricted() ? 'no' : value === 'yes' ? 'yes' : value === 'no' ? 'no' : null);
    };
    sync(); window.addEventListener(AD_CONSENT_EVENT, sync); window.addEventListener('storage', sync);
    return () => { window.removeEventListener(AD_CONSENT_EVENT, sync); window.removeEventListener('storage', sync); };
  }, []);
  const choice: Choice = saved ?? (defaultOn ? 'yes' : null);
  return { choice, saved, defaultOn };
}
export function AdvertisingPreferences() {
  const { choice, saved, defaultOn } = useAdChoice();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const open = () => setShow(true);
    window.addEventListener('fyre-open-ad-preferences', open);
    return () => window.removeEventListener('fyre-open-ad-preferences', open);
  }, []);
  function choose(value: 'yes' | 'no') {
    const next = restricted() ? 'no' : value;
    try { localStorage.setItem(AD_CONSENT_KEY, next); } catch { if (next === 'yes') return; }
    window.dispatchEvent(new Event(AD_CONSENT_EVENT)); setShow(false);
  }
  return <><button className="advertising-settings" onClick={() => setShow(true)} type="button">Ad preferences</button>{show && <section data-nosnippet="" className="advertising-preferences" role="dialog" aria-modal="false" aria-labelledby="advertising-title"><h2 id="advertising-title">Advertising choices</h2><p>Allow Adsterra to load banners. Its servers receive technical information such as your IP address, browser and site referrer and may use identifiers to serve and measure ads. This choice is separate from analytics. <Link href="/privacy">Privacy details</Link></p><p>{restricted() ? 'Your browser privacy signal prevents ad loading.' : saved === null && defaultOn ? 'Advertising is on by default in your region. You can decline it here.' : choice === 'yes' ? 'Advertising is currently allowed. You can withdraw here.' : 'Adsterra is not loaded until you allow advertising.'}</p><div><button type="button" className="button-secondary" onClick={() => choose('no')}>Decline advertising</button><button type="button" className="button-primary" disabled={restricted()} onClick={() => choose('yes')}>Allow advertising</button><button type="button" onClick={() => setShow(false)}>Close</button></div></section>}</>;
}
export default function Advertising({ placement }: { placement: AdPlacement }) {
  const { choice } = useAdChoice();
  const pathname = usePathname();
  const host = useRef<HTMLElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [unfilled, setUnfilled] = useState(false);
  const [width, setWidth] = useState(0);
  const [desktop, setDesktop] = useState(false);
  const [pageOrigin, setPageOrigin] = useState('');
  // Error and 404 screens mark themselves so no ad unit loads beside them.
  const [blocked, setBlocked] = useState(false);
  useEffect(() => { setBlocked(document.querySelector('[data-no-ads]') !== null); }, [pathname]);
  useEffect(() => {
    const node = host.current; if (!node) return;
    const update = () => { setPageOrigin(window.location.origin); setWidth(node.clientWidth); setDesktop(window.matchMedia('(min-width: 1100px)').matches); };
    const observer = new ResizeObserver(update); observer.observe(node); update(); window.addEventListener('resize', update);
    return () => { observer.disconnect(); window.removeEventListener('resize', update); };
  }, [choice]);
  const unit = selectAdUnit(placement, width, desktop);
  const frameUrl = unit ? adFrameUrl(unit.key, pageOrigin) : null;
  useEffect(() => {
    setUnfilled(false);
    const receive = (event: MessageEvent) => {
      if (event.origin === new URL(AD_FRAME_ORIGIN).origin && event.source === frame.current?.contentWindow && event.data?.type === 'fyre-ad-unfilled' && event.data?.key === unit?.key) setUnfilled(true);
    };
    window.addEventListener('message', receive);
    return () => window.removeEventListener('message', receive);
  }, [pathname, unit?.key, choice]);
  if (choice === 'no' || blocked) return null;
  return <section data-nosnippet="" role="complementary" ref={host} className={`network-ad network-ad-${placement}${unfilled ? ' network-ad-unfilled' : ''}${choice !== 'yes' ? ' network-ad-pending' : ''}`} aria-label="Advertisement"><span className="eyebrow">ADVERTISEMENT</span>{unfilled ? <p className="ad-opt-in">No advertisement available.</p> : choice === 'yes' && unit && frameUrl ? <iframe ref={frame} key={`${pathname}-${unit.key}`} title={`Adsterra ${unit.width} by ${unit.height} advertisement`} width={unit.width} height={unit.height} src={frameUrl} sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox" referrerPolicy="strict-origin-when-cross-origin" /> : <div className="ad-opt-in"><p>Optional advertising supports FyreLinkz.</p><button type="button" onClick={() => window.dispatchEvent(new Event('fyre-open-ad-preferences'))}>Ad choices</button></div>}</section>;
}
