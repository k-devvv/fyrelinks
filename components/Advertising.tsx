"use client";
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { AD_CONSENT_EVENT, AD_CONSENT_KEY, adFrameHtml, selectAdUnit, type AdPlacement } from '@/lib/advertising';
type Choice = 'yes' | 'no' | null;
function restricted() {
  return navigator.doNotTrack === '1' || (navigator as Navigator & {globalPrivacyControl?: boolean}).globalPrivacyControl === true;
}
function useAdChoice() {
  const [choice, setChoice] = useState<Choice>(null);
  useEffect(() => {
    const sync = () => {
      let value: string | null = null;
      try { value = localStorage.getItem(AD_CONSENT_KEY); } catch {}
      setChoice(restricted() ? 'no' : value === 'yes' ? 'yes' : value === 'no' ? 'no' : null);
    };
    sync(); window.addEventListener(AD_CONSENT_EVENT, sync); window.addEventListener('storage', sync);
    return () => { window.removeEventListener(AD_CONSENT_EVENT, sync); window.removeEventListener('storage', sync); };
  }, []);
  return choice;
}
export function AdvertisingPreferences() {
  const choice = useAdChoice();
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
  return <><button className="advertising-settings" onClick={() => setShow(true)} type="button">Ad preferences</button>{show && <section className="advertising-preferences" role="dialog" aria-modal="false" aria-labelledby="advertising-title"><h2 id="advertising-title">Advertising choices</h2><p>Allow Adsterra to load banners. Its servers receive technical information such as your IP address, browser and site referrer and may use identifiers to serve and measure ads. This choice is separate from analytics. <Link href="/privacy">Privacy details</Link></p><p>{restricted() ? 'Your browser privacy signal prevents ad loading.' : choice === 'yes' ? 'Advertising is currently allowed. You can withdraw here.' : 'Adsterra is not loaded until you allow advertising.'}</p><div><button type="button" className="button-secondary" onClick={() => choose('no')}>Decline advertising</button><button type="button" className="button-primary" disabled={restricted()} onClick={() => choose('yes')}>Allow advertising</button><button type="button" onClick={() => setShow(false)}>Close</button></div></section>}</>;
}
export default function Advertising({ placement }: { placement: AdPlacement }) {
  const choice = useAdChoice();
  const pathname = usePathname();
  const host = useRef<HTMLElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [unfilled, setUnfilled] = useState(false);
  const [width, setWidth] = useState(0);
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const node = host.current; if (!node) return;
    const update = () => { setWidth(node.clientWidth); setDesktop(window.matchMedia('(min-width: 1100px)').matches); };
    const observer = new ResizeObserver(update); observer.observe(node); update(); window.addEventListener('resize', update);
    return () => { observer.disconnect(); window.removeEventListener('resize', update); };
  }, [choice]);
  const unit = selectAdUnit(placement, width, desktop);
  useEffect(() => {
    setUnfilled(false);
    const receive = (event: MessageEvent) => {
      if (event.source === frame.current?.contentWindow && event.data?.type === 'fyre-ad-unfilled' && event.data?.key === unit?.key) setUnfilled(true);
    };
    window.addEventListener('message', receive);
    return () => window.removeEventListener('message', receive);
  }, [pathname, unit?.key, choice]);
  if (choice === 'no') return null;
  return <aside ref={host} className={`network-ad network-ad-${placement}${unfilled ? ' network-ad-unfilled' : ''}${choice !== 'yes' ? ' network-ad-pending' : ''}`} aria-label="Advertisement"><span className="eyebrow">ADVERTISEMENT</span>{unfilled ? <p className="ad-opt-in">No advertisement available.</p> : choice === 'yes' && unit ? <iframe ref={frame} key={`${pathname}-${unit.key}`} title={`Adsterra ${unit.width} by ${unit.height} advertisement`} width={unit.width} height={unit.height} srcDoc={adFrameHtml(unit)} sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox" referrerPolicy="strict-origin-when-cross-origin" /> : <div className="ad-opt-in"><p>Optional advertising supports FyreLinkz.</p><button type="button" onClick={() => window.dispatchEvent(new Event('fyre-open-ad-preferences'))}>Ad choices</button></div>}</aside>;
}
