"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, ArrowUpRight } from "lucide-react";
import Brand from "./Brand";
export interface SearchRecord {
  title: string;
  href: string;
  topic: string;
  description: string;
}
const links = [["News", "/news"], ["AI video & images", "/create"], ["Guides", "/workflow"], ["Hardware", "/hardware"], ["Model directory", "/ai-video-models"]];
export default function Navbar({
  records
}: {
  records: SearchRecord[];
}) {
  const path = usePathname();
  const [mobile, setMobile] = useState(false);
  const [query, setQuery] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const close = () => {
    dialog.current?.close();
    trigger.current?.focus();
  };
  const open = () => {
    setQuery("");
    dialog.current?.showModal();
    input.current?.focus();
  };
  useEffect(() => {
    setMobile(false);
    dialog.current?.close();
  }, [path]);
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape" && dialog.current?.open) {
        e.preventDefault();
        dialog.current.close();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (dialog.current?.open) dialog.current.close();else {
          setQuery("");
          dialog.current?.showModal();
        }
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);
  const q = query.trim().toLowerCase();
  const results = (q ? records.filter(r => (r.title + " " + r.topic + " " + r.description).toLowerCase().includes(q)) : records.slice(0, 5)).slice(0, 8);
  return <header className="site-header"><div className="utility wrap"><span>INDEPENDENT SIGNAL FOR THE AI GENERATION</span><div><Link href="/about">Our approach</Link><a href="/feed.xml">RSS ↗</a></div></div><div className="masthead wrap"><Brand /><p className="masthead-note">Less noise.<br /><strong>More making.</strong></p><div className="header-actions"><button ref={trigger} onClick={open} className="search-button" aria-label="Search FyreLinkz"><Search size={18} /><span>Search</span><kbd>Ctrl K</kbd></button><button className="mobile-toggle" aria-label={mobile ? "Close menu" : "Open menu"} aria-expanded={mobile} aria-controls="main-navigation" onClick={() => setMobile(!mobile)}>{mobile ? <X /> : <Menu />}</button></div></div><div className="nav-border"><nav id="main-navigation" aria-label="Main navigation" className={`main-nav wrap ${mobile ? "is-open" : ""}`}>{links.map(([label, href]) => <Link key={href} href={href} aria-current={path.startsWith(href) ? "page" : undefined}>{label}</Link>)}<Link href="/create" className="nav-tool">Start reading <ArrowUpRight size={15} /></Link></nav></div>
 <dialog ref={dialog} className="search-dialog" aria-labelledby="search-title" onClick={e => {
      if (e.target === e.currentTarget) close();
    }} onClose={() => trigger.current?.focus()}><div className="search-dialog-top"><h2 id="search-title">Find your next move.</h2><button onClick={close} aria-label="Close search"><X /></button></div><label className="search-input"><Search size={20} /><input ref={input} autoFocus type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Try ComfyUI, video or GPUs..." aria-label="Search articles" /></label><p className="eyebrow search-count" role="status">{q ? `${results.length} results` : "A FEW GOOD PLACES TO START"}</p><div className="search-results">{results.map(r => <Link key={r.href} href={r.href} onClick={close}><span className="eyebrow">{r.topic}</span><strong>{r.title}</strong><ArrowUpRight size={20} /></Link>)}{!results.length && <p className="empty-search">No matching stories. Try “video”, “ComfyUI” or “hardware”.</p>}</div><div className="search-hint">Esc to close · Tab to move between results</div></dialog></header>;
}
