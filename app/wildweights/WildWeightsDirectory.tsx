"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import styles from "./wildweights.module.css";
import { wildWeightsFaqs as faqs } from "@/lib/wildweights-content";
import WildWeightsExoclickAd from "./WildWeightsExoclickAd";

const entries = [
  {
    name: "Qwen-Image 2.1 for ComfyUI",
    kind: "Base model",
    summary:
      "A sourced ComfyUI workflow guide covering the diffusion model, text encoder, VAE and first-run checks.",
    memory:
      "No minimum VRAM independently measured. The full pipeline uses more memory than the weight file alone.",
    source: "https://huggingface.co/Comfy-Org/Qwen-Image-2.1",
    sourceLabel: "Comfy-Org model files",
    tone: "orange",
    image: "/art/wildweights/image-workflow.jpg",
    imageAlt: "AI-generated editorial portrait of a fully clothed adult artist viewing an image workflow in a warm studio.",
  },
  {
    name: "Qwen-Image GGUF",
    kind: "Quantization",
    summary:
      "Understand GGUF image checkpoints, compatible ComfyUI loaders and the separate files this workflow needs.",
    memory:
      "Publisher estimates 6–8 GB VRAM for one quantization. Workload and offloading change the result.",
    source: "https://huggingface.co/Abiray/Qwen-Image-2.1-GGUF",
    sourceLabel: "Quantization repository",
    tone: "violet",
    image: "/art/wildweights/quantization-workstation.jpg",
    imageAlt: "AI-generated editorial photo of a fully clothed adult comparing image-model output beside a GPU workstation.",
  },
  {
    name: "Anime consistency LoRA",
    kind: "Adapter",
    summary:
      "A community adapter for fictional character consistency experiments. Compatibility and base-model terms matter.",
    memory:
      "No independent VRAM target. The base model and complete workflow determine memory use.",
    source: "https://huggingface.co/WarmBloodAban/Qwen-Image-2.1-LoRAs",
    sourceLabel: "Adapter card and files",
    tone: "green",
    image: "/art/wildweights/character-consistency.jpg",
    imageAlt: "AI-generated, non-explicit portrait of a clearly adult fictional character with consistent image studies on a monitor.",
  },
];

export default function WildWeightsDirectory() {
  const [ageAccepted, setAgeAccepted] = useState(false);
  const handleAgeAccept = useCallback(() => setAgeAccepted(true), []);
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("All entries");
  const visibleEntries = useMemo(
    () =>
      entries.filter((entry) => {
        const matchesKind = kind === "All entries" || entry.kind === kind;
        const text = `${entry.name} ${entry.kind} ${entry.summary}`.toLowerCase();
        return matchesKind && text.includes(query.toLowerCase().trim());
      }),
    [kind, query],
  );

  return (
    <div className={styles.site}>
      <div className={styles.main}>
        <section className={styles.hero} aria-labelledby="wildweights-title">
          <div>
            <p className={styles.kicker}>WILDWEIGHTS / LOCAL AI DIRECTORY</p>
            <h1 id="wildweights-title">
              Know the weights.
              <br />
              <em>Own the workflow.</em>
            </h1>
            <p className={styles.intro}>
              Find image models, quantizations and adapters you can run locally.
              Check the files, hardware limits and licence before you download.
            </p>
            <a className={styles.primary} href="#directory">
              Explore the directory <span aria-hidden="true">↘</span>
            </a>
          </div>
          <aside className={styles.note}>
            <span className={styles.kicker}>FIELD NOTES / 001</span>
            <strong>Less hype. More runnable.</strong>
            <p>
              Three sourced image entries to start. Text, audio and video
              collections are planned, not published yet.
            </p>
            <small>Source review: 12 October 2026</small>
          </aside>
        </section>

        <section className={styles.answer} aria-labelledby="answer-title">
          <p className={styles.kicker}>QUICK ANSWER / DIRECTORY SCOPE</p>
          <h2 id="answer-title">What is WildWeights?</h2>
          <p>
            WildWeights is a curated directory for people running AI image models
            locally. It currently covers a Qwen-Image 2.1 ComfyUI workflow, a
            Qwen-Image GGUF quantization and an Anime consistency LoRA, with links
            to each source.
          </p>
          <p><a href="/workflow/comfyui-beginner-first-workflow-guide">New to ComfyUI? Read our first-image setup guide →</a></p>
          <p className={styles.answerNote}>
            Check model files, compatible loaders and license terms at the source.
            Memory figures are publisher estimates unless marked as independently tested.
            WildWeights does not host files or claim unmeasured benchmarks.
          </p>
        </section>

        <section id="directory" className={styles.directory} aria-labelledby="directory-title">
          <div className={styles.sectionHead}>
            <div>
              <p className={styles.kicker}>THE DIRECTORY</p>
              <h2 id="directory-title">Find your next local workflow.</h2>
            </div>
            <span>03 reviewed entries / Image</span>
          </div>

          <label className={styles.search}>
            <span>Search models and workflows</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try “GGUF” or “ComfyUI”"
            />
          </label>

          <div className={styles.filters} aria-label="Filter directory entries">
            {["All entries", "Base model", "Quantization", "Adapter"].map((filter) => (
              <button
                key={filter}
                type="button"
                aria-pressed={kind === filter}
                className={kind === filter ? styles.selected : styles.filter}
                onClick={() => setKind(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {visibleEntries.length ? (
            <div className={styles.cards}>
              {visibleEntries.map((entry, index) => (
                <article className={styles.card} key={entry.name}>
                  <div className={`${styles.art} ${styles[entry.tone]}`}>
                    <Image
                      className={styles.artImage}
                      src={entry.image}
                      alt={entry.imageAlt}
                      fill
                      sizes="(max-width: 800px) 100vw, 33vw"
                    />
                    <span>0{index + 1} / AI EDITORIAL</span>
                    <strong>{entry.kind}</strong>
                  </div>
                  <div className={styles.cardBody}>
                    <p className={styles.kicker}>{entry.kind.toUpperCase()}</p>
                    <h3>{entry.name}</h3>
                    <p>{entry.summary}</p>
                    <div className={styles.memory}>
                      <strong>Memory & setup note</strong>
                      <span>{entry.memory}</span>
                    </div>
                    <a href={entry.source} target="_blank" rel="noreferrer">
                      {entry.sourceLabel} <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className={styles.empty}>No matching entries. Try another search or filter.</p>
          )}
        </section>

        {ageAccepted && <WildWeightsExoclickAd />}

        <section className={styles.faq} aria-labelledby="faq-title">
          <p className={styles.kicker}>CLEAR ANSWERS</p>
          <h2 id="faq-title">Before you download.</h2>
          <div className={styles.faqList}>
            {faqs.map((item) => (
              <article key={item.q} className={styles.faqItem}>
                <h3>{item.q}</h3>
                <p>{item.a}{item.link && <> <a href={item.link} target="_blank" rel="noreferrer">{item.linkLabel}</a>.</>}</p>
              </article>
            ))}
          </div>
        </section>

        <p className={styles.disclosure}>
          WildWeights is an independent directory. It does not host models, provide
          inference or verify publisher claims. Review each source and licence before
          use. Adults only; content is non-explicit. Preview thumbnails are AI-generated
          editorial images of adults, not outputs from the listed models.
        </p>
      </div>

      <AgeGate accepted={ageAccepted} onAccept={handleAgeAccept} />
    </div>
  );
}

function AgeGate({ accepted, onAccept }: { accepted: boolean; onAccept: () => void }) {
  useEffect(() => {
    if (window.sessionStorage.getItem("wildweights-age") === "adult") onAccept();
  }, [onAccept]);

  if (accepted) return null;
  return (
    <section className={styles.gate} role="dialog" aria-modal="true" aria-labelledby="age-title">
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
            window.sessionStorage.setItem("wildweights-age", "adult");
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
    </section>
  );
}