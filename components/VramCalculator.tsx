"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SmartLink from "@/components/SmartLink";
import { measure } from "@/lib/measurement";
import { CONTEXTS, GPU_SIZES, QUANTS, VRAM_MODELS, estimateVram } from "@/lib/vram";

const VERDICT = {
  fits: { label: "Fits on your GPU", cls: "planner-fit-strong", text: "The whole model and its context fit in VRAM with headroom. Expect full GPU speed." },
  tight: { label: "Fits, but tight", cls: "planner-fit-constrained", text: "It should load fully, but close other GPU apps or use a shorter context to avoid slowdowns." },
  offload: { label: "Runs with CPU offload", cls: "planner-fit-constrained", text: "Part of the model spills to system RAM. It works in Ollama or LM Studio but runs noticeably slower." },
  "too-big": { label: "Too big for this GPU", cls: "planner-fit-over-budget", text: "Most of the model would sit in system RAM. Pick a smaller model or a lower quantization." },
} as const;

const gb = (n: number) => `${n.toFixed(1)} GB`;
const ctxLabel = (n: number) => (n >= 1024 ? `${n / 1024}K tokens` : `${n} tokens`);

export default function VramCalculator() {
  const [modelId, setModelId] = useState("llama-3.1-8b");
  const [quantId, setQuantId] = useState<string>("q4_k_m");
  const [context, setContext] = useState(8192);
  const [gpuGb, setGpuGb] = useState(8);

  const model = VRAM_MODELS.find((m) => m.id === modelId) ?? VRAM_MODELS[0];
  const quant = QUANTS.find((q) => q.id === quantId) ?? QUANTS[0];
  const ctx = Math.min(context, model.maxContext);
  const est = useMemo(() => estimateVram(model, quant.bits, ctx, gpuGb), [model, quant.bits, ctx, gpuGb]);
  const v = VERDICT[est.verdict];

  const bestQuant = [...QUANTS].reverse().find((q) => {
    const r = estimateVram(model, q.bits, ctx, gpuGb).verdict;
    return r === "fits" || r === "tight";
  });

  // Smallest GPU that runs this setup fully, shown only when the current one can't.
  const needsUpgrade = est.verdict === "offload" || est.verdict === "too-big";
  const fitsOn = (g: number) => ["fits", "tight"].includes(estimateVram(model, quant.bits, ctx, g).verdict);
  const upgradeGb = needsUpgrade ? GPU_SIZES.find((g) => g > gpuGb && fitsOn(g)) : undefined;
  const shopGb = upgradeGb ? [8, 12, 16, 24].find((g) => g >= upgradeGb) : undefined;

  return (
    <section className="hardware-planner vram-calculator" aria-labelledby="vram-calc-heading">
      <div className="hardware-planner-heading">
        <h2 id="vram-calc-heading">Will it fit?</h2>
        <p>Pick a model, quantization, context length and your GPU&apos;s VRAM. The result updates instantly.</p>
      </div>
      <form className="hardware-planner-form" onSubmit={(e) => e.preventDefault()}>
        <label><span>Model</span>
          <select value={modelId} onChange={(e) => setModelId(e.target.value)}>
            {VRAM_MODELS.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
          <small>Total parameters: {model.paramsB}B</small>
        </label>
        <label><span>Quantization</span>
          <select value={quantId} onChange={(e) => setQuantId(e.target.value)}>
            {QUANTS.map((q) => <option key={q.id} value={q.id}>{q.name}</option>)}
          </select>
          <small>About {quant.bits} bits per weight</small>
        </label>
        <label><span>Context length</span>
          <select value={context} onChange={(e) => setContext(Number(e.target.value))}>
            {CONTEXTS.map((c) => <option key={c} value={c} disabled={c > model.maxContext}>{ctxLabel(c)}</option>)}
          </select>
          <small>{context > model.maxContext ? `Capped at this model's ${ctxLabel(model.maxContext)} limit` : "Longer chats and documents need more"}</small>
        </label>
        <label><span>GPU VRAM</span>
          <select value={gpuGb} onChange={(e) => setGpuGb(Number(e.target.value))}>
            {GPU_SIZES.map((g) => <option key={g} value={g}>{g} GB</option>)}
          </select>
          <small>RTX 4050 laptop = 6 GB, RTX 4060 = 8 GB, RTX 3060 = 12 GB</small>
        </label>
      </form>

      <div className="hardware-planner-results" aria-live="polite">
        <div className="hardware-planner-result-summary">
          <span className={`planner-fit ${v.cls}`}>{v.label}</span>
          <p><strong>{gb(est.totalGb)}</strong> needed of about {gb(est.usableGb)} usable. {v.text}</p>
          {est.verdict === "offload" && <p>Roughly {Math.round(est.gpuLayerShare * 100)}% of the model stays on the GPU.</p>}
        </div>
        <table className="vram-breakdown">
          <tbody>
            <tr><th scope="row">Model weights</th><td>{gb(est.weightsGb)}</td></tr>
            <tr><th scope="row">Context (KV cache)</th><td>{gb(est.kvCacheGb)}</td></tr>
            <tr><th scope="row">Runtime overhead</th><td>{gb(est.overheadGb)}</td></tr>
            <tr><th scope="row">Total</th><td><strong>{gb(est.totalGb)}</strong></td></tr>
          </tbody>
        </table>
        <p className="vram-tip">
          {bestQuant
            ? <>Highest quality that fits fully on {gpuGb} GB at this context: <strong>{bestQuant.name}</strong>.</>
            : <>No quantization of {model.name} fits fully on {gpuGb} GB at this context. Try a smaller model or shorter context.</>}
        </p>
        {needsUpgrade && (
          <div className="vram-upgrade">
            {shopGb ? (
              <>
                <p><strong>Want it to run fully?</strong> {model.name} at {quant.name} needs a GPU with <strong>{upgradeGb} GB+</strong> of VRAM at this context.</p>
                <SmartLink href={`/go/amazon-us-gpu-${shopGb}gb`} onClick={() => measure("provider_visit", { provider: `amazon-us-gpu-${shopGb}gb`, placement: "vram-calculator" })}>See {shopGb} GB graphics cards on Amazon ↗</SmartLink>
              </>
            ) : (
              <>
                <p><strong>Want it to run fully?</strong> This setup needs {upgradeGb ? `${upgradeGb} GB` : "more than 48 GB"} of VRAM, beyond most consumer cards. Renting a cloud GPU by the hour is usually cheaper.</p>
                <SmartLink href="/go/runpod" onClick={() => measure("provider_visit", { provider: "runpod", placement: "vram-calculator" })}>Rent a GPU on Runpod ↗</SmartLink>
              </>
            )}
            <p className="planner-disclosure">Commission may apply on these links. <Link href="/affiliate-disclosure">How this works</Link>.</p>
          </div>
        )}
      </div>
    </section>
  );
}
