"use client";

import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { measure } from "@/lib/measurement";
import { MARKET_BUDGET_LIMITS, recommendHardware } from "@/lib/hardware-planner/recommend";
import type { MarketId, Recommendation, SystemPath, WorkloadId } from "@/lib/hardware-planner/types";

const MARKETS: { id: MarketId; label: string; currency: string }[] = [
  { id: "us", label: "United States", currency: "USD" },
  { id: "uk", label: "United Kingdom", currency: "GBP" },
  { id: "ca", label: "Canada", currency: "CAD" },
  { id: "de", label: "Germany (EUR reference)", currency: "EUR" },
];

const WORKLOADS: { id: WorkloadId; label: string }[] = [
  { id: "comfyui-image", label: "ComfyUI image generation" },
  { id: "comfyui-video", label: "ComfyUI video generation" },
  { id: "local-llm", label: "Local LLM inference" },
  { id: "mixed", label: "Mixed creative-AI work" },
];

const PATHS: { id: SystemPath; label: string }[] = [
  { id: "desktop-build", label: "Build a desktop" },
  { id: "desktop-upgrade", label: "Upgrade an existing desktop" },
  { id: "laptop", label: "Choose a laptop" },
];

function currency(market: MarketId) {
  return MARKETS.find(item => item.id === market)?.currency ?? "USD";
}

function formatMoney(amount: number, market: MarketId) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: currency(market), maximumFractionDigits: 2 }).format(amount);
}

function labelFor(values: { id: string; label: string }[], id: string) {
  return values.find(item => item.id === id)?.label ?? id;
}

export default function HardwarePlanner() {
  const [market, setMarket] = useState<MarketId>("us");
  const [budget, setBudget] = useState("");
  const [workload, setWorkload] = useState<WorkloadId>("comfyui-image");
  const [path, setPath] = useState<SystemPath>("desktop-build");
  const [result, setResult] = useState<Recommendation[] | null>(null);
  const [error, setError] = useState("");
  const [stalePriceCount, setStalePriceCount] = useState(0);
  const started = useRef(false);

  const start = () => {
    if (started.current) return;
    started.current = true;
    measure("planner_start", { placement: "planner" });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    start();
    const response = recommendHardware({ market, budget: Number(budget), workload, path });
    setError(response.error ?? "");
    setResult(response.error ? null : response.recommendations);
    setStalePriceCount(response.stalePriceCount);
    if (!response.error) measure("planner_complete", { market, workload, path });
  };

  const onMarketChange = (next: MarketId) => {
    start();
    setMarket(next);
    measure("planner_market", { market: next });
    setResult(null);
  };

  const onGuideClick = () => measure("planner_guide_click", { market, workload, path, placement: "result-card" });
  const onSourceClick = () => measure("planner_source_click", { market, workload, path, placement: "result-card" });
  const maxBudget = MARKET_BUDGET_LIMITS[market];

  return (
    <section className="hardware-planner" aria-labelledby="hardware-planner-heading">
      <div className="hardware-planner-heading">
        <span className="eyebrow">FREE DECISION TOOL</span>
        <h2 id="hardware-planner-heading">What should your next AI machine handle?</h2>
        <p>Set your budget and workload. We’ll show suitable profiles and explain where the evidence or pricing is incomplete.</p>
      </div>
      <form className="hardware-planner-form" onSubmit={onSubmit}>
        <label>
          <span>Country / price market</span>
          <select value={market} onChange={event => onMarketChange(event.target.value as MarketId)}>
            {MARKETS.map(item => <option key={item.id} value={item.id}>{item.label} · {item.currency}</option>)}
          </select>
        </label>
        <label>
          <span>Total budget ({currency(market)})</span>
          <input
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "planner-budget-hint planner-error" : "planner-budget-hint"}
            inputMode="decimal"
            min="1"
            max={maxBudget}
            step="1"
            type="number"
            value={budget}
            onInvalid={event => {
              event.preventDefault();
              setError(`Enter a budget from 1 to ${maxBudget.toLocaleString()} ${currency(market)}.`);
              setResult(null);
            }}
            onChange={event => { start(); setBudget(event.target.value); setResult(null); setError(""); }}
            placeholder={`Up to ${maxBudget.toLocaleString()}`}
          />
          <small id="planner-budget-hint">Use local currency. No exchange-rate conversion.</small>
        </label>
        <label>
          <span>Main workload</span>
          <select value={workload} onChange={event => { start(); setWorkload(event.target.value as WorkloadId); setResult(null); }}>
            {WORKLOADS.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
        </label>
        <label>
          <span>System path</span>
          <select value={path} onChange={event => { start(); setPath(event.target.value as SystemPath); setResult(null); }}>
            {PATHS.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
        </label>
        <button className="button-primary hardware-planner-submit" type="submit">Show hardware options <span aria-hidden="true">↗</span></button>
      </form>

      {error && <p className="hardware-planner-error" id="planner-error" role="alert">{error}</p>}

      {result && <div className="hardware-planner-results" aria-live="polite" aria-busy="false">
        <div className="hardware-planner-result-summary" role="status">
          <strong>{result.length ? `${result.length} options for ${labelFor(WORKLOADS, workload)}` : "No matching profile yet"}</strong>
          <span>{MARKETS.find(item => item.id === market)?.label} · Budget {formatMoney(Number(budget), market)} · {labelFor(PATHS, path)}</span>
        </div>
        {stalePriceCount > 0 && <p className="planner-stale-note">{stalePriceCount} price example is older than 30 days. Stale prices are excluded from budget ranking.</p>}
        {result.length > 0 ? <div className={`hardware-planner-results-grid${result.length === 1 ? " is-single" : ""}`}>
          {result.map(candidate => <RecommendationCard key={candidate.id} candidate={candidate} market={market} onGuideClick={onGuideClick} onSourceClick={onSourceClick} />)}
        </div> : <p className="planner-empty">No catalogue profile matches all selected options. Try a different workload or system path.</p>}
        {result.length > 0 && result.every(candidate => candidate.fit === "over-budget") && <p className="planner-empty">The priced option is above your budget. Consider a smaller workflow or review the sourced hardware guide before changing parts.</p>}
        {!result.some(candidate => candidate.estimatedTotal !== null) && result.length > 0 && <p className="planner-empty">No complete current price is verified for these profiles in this market. Use the sourced specifications for fit guidance, then check local retailers before deciding.</p>}
      </div>}
      <p className="hardware-planner-disclosure">Planning estimates, not tested benchmarks or compatibility guarantees. Confirm every part, price, tax, stock, and shipping detail before purchase.</p>
    </section>
  );
}

function RecommendationCard({ candidate, market, onGuideClick, onSourceClick }: {
  candidate: Recommendation;
  market: MarketId;
  onGuideClick: () => void;
  onSourceClick: () => void;
}) {
  const price = candidate.prices[market];
  const spec = candidate.specificationSources[0];
  const fitLabel = candidate.fit === "strong" ? "Good specification fit" : candidate.fit === "constrained" ? "Constrained fit" : "Above budget";
  return <article className="hardware-result-card">
    <header>
      <span className={`planner-fit planner-fit-${candidate.fit}`}>{fitLabel}</span>
      <h3>{candidate.name}</h3>
    </header>
    {candidate.estimatedTotal !== null && price.checkedAt ? <div className="planner-price">
      <strong>{formatMoney(candidate.estimatedTotal, market)}</strong>
      <span>{candidate.priceScope === "graphics-card-only" ? "GPU price example only · excludes rest of PC/upgrade" : "Sourced complete-system example"}</span>
      <small>Checked {price.checkedAt}</small>
    </div> : <div className="planner-price planner-price-unknown">
      <strong>Price not verified</strong>
      <span>{price.checkedAt ? `Last example checked ${price.checkedAt}; now stale.` : "No verified local price example."}</span>
    </div>}
    <dl className="planner-specs">
      <div><dt>GPU memory</dt><dd>{candidate.gpuMemoryGb === null ? "Unknown" : `${candidate.gpuMemoryGb} GB`}</dd></div>
      <div><dt>System memory</dt><dd>{candidate.systemRamGb === null ? "Not specified" : `${candidate.systemRamGb} GB`}</dd></div>
      <div><dt>Storage</dt><dd>{candidate.storageTb === null ? "Not specified" : `${candidate.storageTb} TB`}</dd></div>
    </dl>
    <section><h4>What this means</h4><ul>{candidate.reasons.map(reason => <li key={reason}>{reason}</li>)}</ul></section>
    <section><h4>Check before buying</h4><ul><li>{candidate.platformNote}</li>{candidate.caveats.filter(note => note !== candidate.platformNote).map(note => <li key={note}>{note}</li>)}</ul></section>
    <details className="planner-parts"><summary>Parts or configuration scope</summary><ul>{candidate.requiredParts.map(part => <li key={part}>{part}</li>)}</ul></details>
    <div className="planner-card-links">
      {spec && <a href={spec.url} target="_blank" rel="noopener noreferrer" onClick={onSourceClick}>Check specification source: {spec.label} ↗</a>}
      {price.source && <a href={price.source.url} target="_blank" rel="noopener noreferrer" onClick={onSourceClick}>Check local price listing ↗</a>}
      <Link href="/hardware/best-local-ai-workstation-build-guide-2026" onClick={onGuideClick}>Read the workstation guide ↗</Link>
    </div>
  </article>;
}
