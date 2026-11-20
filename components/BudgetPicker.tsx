"use client";

import { useEffect, useState } from "react";
import SmartLink from "@/components/SmartLink";
import LaptopScene from "@/components/LaptopScene";

export type PickerTier = { gb: number; budget: string; gpu: string; who: string; models: string[] };

const SHOWN = 4;
const sizeOf = (name: string) => Number(/(\d+(?:\.\d+)?)\s*B\b/i.exec(name)?.[1] ?? 0);
// Log scale from 1B to 70B so small and big models both show on the meter.
const meter = (b: number) => (b <= 0 ? 0 : Math.min(100, Math.max(6, (Math.log(b) / Math.log(70)) * 100)));

// Budget → VRAM tier → models that fit → Amazon.in link. Shows ranges only, never fixed prices.
export default function BudgetPicker({ tiers, defaultGb = 8 }: { tiers: PickerTier[]; defaultGb?: number }) {
  const [gb, setGb] = useState(defaultGb);
  const [share, setShare] = useState("");
  const t = tiers.find((x) => x.gb === gb) ?? tiers[0];
  const biggest = t.models[0] ?? "Small models only";
  const top = t.models.slice(0, SHOWN);
  const more = t.models.length - top.length;
  const size = sizeOf(biggest);

  useEffect(() => {
    const text = `My AI laptop pick for ${t.budget}: ${t.gpu} (${t.gb} GB VRAM) runs ${biggest} locally. Find yours: ${window.location.href.split("#")[0]}`;
    setShare(`https://wa.me/?text=${encodeURIComponent(text)}`);
  }, [t, biggest]);

  return (
    <section className="budget-picker" aria-labelledby="budget-picker-heading">
      <div className="budget-stage">
        <div className="budget-controls">
          <p className="budget-step">Step 1 of 2</p>
          <h2 id="budget-picker-heading">What is your laptop budget?</h2>
          <div className="budget-options" role="radiogroup" aria-label="Laptop budget">
            {tiers.map((x) => (
              <button
                key={x.gb}
                type="button"
                role="radio"
                aria-checked={x.gb === t.gb}
                className={x.gb === t.gb ? "budget-option is-active" : "budget-option"}
                onClick={() => setGb(x.gb)}
              >
                <span>{x.budget}</span>
                <small>{x.gb} GB VRAM</small>
              </button>
            ))}
          </div>
        </div>
        <LaptopScene gb={t.gb} gpu={t.gpu} biggest={biggest} />
      </div>

      <div className="budget-result" aria-live="polite">
        <p className="budget-step">Step 2 of 2 · Your match</p>
        <p className="budget-headline">Get an <strong>{t.gpu}</strong></p>
        <p className="budget-who">{t.who}</p>

        <div className="budget-meter">
          <div className="budget-meter-label">
            <span>Biggest AI it runs fully on the GPU</span>
            <strong>{biggest}</strong>
          </div>
          <div className="budget-meter-track" aria-hidden="true">
            <span style={{ width: `${meter(size)}%` }} />
          </div>
          <div className="budget-meter-scale" aria-hidden="true"><span>1B</span><span>8B</span><span>70B</span></div>
        </div>

        <ul className="budget-chips" aria-label="Models that fit (Q4_K_M, 8K context)">
          {top.map((m) => <li key={m}>{m}</li>)}
          {more > 0 && <li className="budget-chip-more">+{more} smaller</li>}
        </ul>

        <div className="budget-actions">
          <SmartLink className="button-primary budget-buy" href={`/go/amazon-in-laptop-${t.gb}gb`}>
            See {t.gb} GB VRAM laptops on Amazon.in ↗
          </SmartLink>
          {share && (
            <a className="budget-share" href={share} target="_blank" rel="noopener noreferrer">
              Share on WhatsApp
            </a>
          )}
        </div>
      </div>

      <p className="budget-note">
        Between ₹1,20,000 and ₹1,50,000? Many laptops in that range still have 8 GB VRAM, so check the GB on the spec sheet
        before paying more. Prices change with sales; Amazon.in shows the live price.
      </p>
    </section>
  );
}
