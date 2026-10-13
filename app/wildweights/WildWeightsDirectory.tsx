"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./wildweights.module.css";
import { wildWeightsFaqs as faqs } from "@/lib/wildweights-content";
import { galleryEntries as entries } from "@/lib/wildweights-gallery";
import WildWeightsExoclickAd from "./WildWeightsExoclickAd";

export default function WildWeightsDirectory() {
  const [ageAccepted, setAgeAccepted] = useState(false);
  const handleAgeAccept = useCallback(() => setAgeAccepted(true), []);
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("All models");
  const [memory, setMemory] = useState("All memory notes");
  const [sort, setSort] = useState("Curated order");
  const [blurred, setBlurred] = useState(true);
  const [saved, setSaved] = useState<string[]>([]);
  const [savedOnly, setSavedOnly] = useState(false);
  const visibleEntries = useMemo(() => {
    const result = entries.filter(entry =>
      (kind === "All models" || entry.kind === kind) &&
      (memory === "All memory notes" || (memory === "Publisher estimate" ? entry.kind === "Quantization" : entry.kind !== "Quantization")) &&
      (!savedOnly || saved.includes(entry.slug)) &&
      (entry.name + " " + entry.kind + " " + entry.summary).toLowerCase().includes(query.trim().toLowerCase()));
    return sort === "Name A–Z" ? [...result].sort((a,b) => a.name.localeCompare(b.name)) : result;
  }, [query, kind, memory, sort, savedOnly, saved]);
  const reset = () => { setQuery(""); setKind("All models"); setMemory("All memory notes"); setSavedOnly(false); };

  return <div className={styles.site}>
    <div className={styles.main}>
      <header className={styles.brandbar}>
        <a href="/wildweights" className={styles.brand}><span aria-hidden="true">W↗</span> WILDWEIGHTS <small>CURATED / 01</small></a>
        <nav aria-label="WildWeights navigation"><a href="#directory">Explore</a><a href="#faq-title">Field guide</a><button type="button" aria-pressed={savedOnly} onClick={() => setSavedOnly(!savedOnly)}>Saved · {saved.length}</button></nav>
      </header>
      <section className={styles.hero} aria-labelledby="wildweights-title">
        <div><p className={styles.kicker}>INDEPENDENT MODELS. YOUR MACHINE.</p>
          <h1 id="wildweights-title">Find your next<br/><em>creative obsession.</em></h1>
          <p className={styles.intro}>Local AI image models, GGUF weights and LoRA adapters. Explore the look. Understand the files. Make it yours.</p>
          <a className={styles.primary} href="#directory">Explore models ↘</a>
        </div>
        <aside className={styles.note}><span className={styles.kicker}>THE SMALL PRINT, UP FRONT</span><strong>Creative freedom.<br/>Clear boundaries.</strong><p>Three sourced entries. Non-explicit editorial previews. No hosted generation or community uploads.</p><small>Source review · 12 October 2026</small></aside>
      </section>
      <section id="directory" className={styles.directory} aria-labelledby="directory-title">
        <div className={styles.sectionHead}><div><p className={styles.kicker}>THE COLLECTION</p><h2 id="directory-title">Explore local models</h2></div>
          <button type="button" className={styles.filter} aria-pressed={!blurred} disabled={!ageAccepted} onClick={() => setBlurred(!blurred)}>{blurred ? "◉ Previews blurred" : "◎ Previews visible"}</button>
        </div>
        <div className={styles.toolbar}>
          <label className={styles.search}><span>Search the collection</span><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search Qwen, GGUF, LoRA…"/></label>
          <label>Memory evidence<select value={memory} onChange={e=>setMemory(e.target.value)}><option>All memory notes</option><option>Publisher estimate</option><option>Not measured</option></select></label>
          <label>Sort by<select value={sort} onChange={e=>setSort(e.target.value)}><option>Curated order</option><option>Name A–Z</option></select></label>
        </div>
        <div className={styles.filterrow}><div className={styles.filters} aria-label="Model type">{["All models","Base model","Quantization","Adapter"].map(filter=><button type="button" key={filter} aria-pressed={kind===filter} className={kind===filter?styles.selected:styles.filter} onClick={()=>setKind(filter)}>{filter}</button>)}</div><span aria-live="polite">{visibleEntries.length} of {entries.length} entries{savedOnly ? " · Saved" : ""}</span></div>
        {visibleEntries.length ? <div className={styles.cards}>{visibleEntries.map(entry=><article className={styles.card} key={entry.slug}>
          <div className={styles.art}>
            <Image className={blurred?styles.blurredImage:styles.artImage} src={entry.image} alt={entry.imageAlt} fill sizes="(max-width: 620px) 100vw, (max-width: 1000px) 50vw, 33vw"/>
            <span className={styles.artLabel}>AI EDITORIAL · NON-EXPLICIT</span>
            <button type="button" className={styles.save} aria-label={(saved.includes(entry.slug)?"Unsave ":"Save ")+entry.name} aria-pressed={saved.includes(entry.slug)} onClick={()=>setSaved(prev=>prev.includes(entry.slug)?prev.filter(id=>id!==entry.slug):[...prev,entry.slug])}>{saved.includes(entry.slug)?"♥":"♡"}</button>
            {blurred && <span className={styles.blurLabel}>PREVIEW HIDDEN<br/><small>Use the preview control to reveal</small></span>}
            <span className={styles.typeBadge}>{entry.kind}</span>
          </div>
          <div className={styles.cardBody}><p className={styles.kicker}>QWEN-IMAGE FAMILY</p><h3><Link href={"/wildweights/"+entry.slug}>{entry.name}</Link></h3><p>{entry.summary}</p><div className={styles.memory}><strong>{entry.kind==="Quantization"?"6–8 GB · publisher estimate":"VRAM · not independently measured"}</strong><span>License: check source and dependencies</span></div><Link href={"/wildweights/"+entry.slug}>View model & setup ↗</Link></div>
        </article>)}</div>:<div className={styles.empty}><h3>No matching models.</h3><p>Try another type or search. Saved models last until this page reloads.</p><button type="button" className={styles.primary} onClick={reset}>Reset filters</button></div>}
        <p className={styles.collectionNote}>Previews are editorial illustrations, not output samples from these models. Saved selections stay in page memory only.</p>
      </section>
      <section className={styles.answer} aria-labelledby="answer-title"><p className={styles.kicker}>START WITH THE WORKFLOW</p><h2 id="answer-title">What is WildWeights?</h2><p>A curated directory for running AI image models locally: Qwen-Image 2.1 in ComfyUI, a GGUF quantization and an anime-consistency LoRA. Check the source, loader and license before downloading.</p><Link href="/workflow/comfyui-beginner-first-workflow-guide">Your first ComfyUI image: setup guide →</Link><p className={styles.answerNote}>Memory figures are publisher estimates unless explicitly independently tested. We do not host weights or provide inference.</p></section>
      {ageAccepted && <WildWeightsExoclickAd/>}
      <section className={styles.faq} aria-labelledby="faq-title"><div><p className={styles.kicker}>BEFORE YOU DOWNLOAD</p><h2 id="faq-title">A little context.<br/>A better first run.</h2></div><div className={styles.faqList}>{faqs.map(item=><article key={item.q} className={styles.faqItem}><h3>{item.q}</h3><p>{item.a}{item.link && <> <a href={item.link} target="_blank" rel="noreferrer">{item.linkLabel}</a>.</>}</p></article>)}</div></section>
      <p className={styles.disclosure}>Independent directory. Adults only; non-explicit content. Review publisher terms. AI-generated editorial previews are not model performance evidence. Age self-declaration does not grant advertising consent.</p>
    </div><AgeGate accepted={ageAccepted} onAccept={handleAgeAccept}/>
  </div>;
}

function AgeGate({ accepted, onAccept }: { accepted: boolean; onAccept: () => void }) {
  useEffect(() => {
    try { if (window.sessionStorage.getItem("wildweights-age") === "adult") onAccept(); } catch { /* Continue without persistence. */ }
  }, [onAccept]);

  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const node = dialog.current;
    if (!accepted && node && !node.open) node.showModal();
    return () => { if (node?.open) node.close(); };
  }, [accepted]);
  if (accepted) return null;
  return (
    <dialog ref={dialog} className={styles.gate} aria-labelledby="age-title" onCancel={(event) => event.preventDefault()}>
      <div className={styles.gateCard}>
        <p className={styles.kicker}>WILDWEIGHTS / ENTRY CHECK</p>
        <div className={styles.ageMark} aria-hidden="true">18<span>+</span></div>
        <h2 id="age-title">Before you enter.</h2>
        <p>
          This directory is for adults aged 18 or older. Explore local AI models
          and non-explicit setup guides.
        </p>
        <button
          type="button"
          className={styles.primary}
          onClick={() => {
            try { window.sessionStorage.setItem("wildweights-age", "adult"); } catch { /* Acceptance still works for this page. */ }
            onAccept();
          }}
        >
          I am 18 or older <span aria-hidden="true">→</span>
        </button>
        <a className={styles.exit} href="/">Under 18 / Leave ↗</a>
        <small>
          Self-declaration only. Does not verify age or grant advertising consent.
          Remembered for this tab session.
        </small>
        <nav aria-label="WildWeights policies">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms of use</a>
        </nav>
      </div>
    </dialog>
  );
}
