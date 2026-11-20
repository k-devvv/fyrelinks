"use client";

import { useState } from "react";
import SmartLink from "@/components/SmartLink";

export type PickerTier = { gb: number; budget: string; gpu: string; who: string; models: string[] };

const SHOWN = 4;

// Budget → VRAM tier → models that fit → Amazon.in link. Shows ranges only, never fixed prices.
export default function BudgetPicker({ tiers, defaultGb = 8 }: { tiers: PickerTier[]; defaultGb?: number }) {
  const [gb, setGb] = useState(defaultGb);
  const t = tiers.find((x) => x.gb === gb) ?? tiers[0];
  const top = t.models.slice(0, SHOWN);
  const more = t.models.length - top.length;

  return (
    <section className="budget-picker" aria-labelledby="budget-picker-heading">
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
            {x.budget}
          </button>
        ))}
      </div>

      <div className="budget-result" aria-live="polite">
        <p className="budget-gpu"><strong>Look for:</strong> {t.gpu}</p>
        <p>{t.who}</p>
        <p>
          <strong>Runs fully on the GPU</strong> (Q4_K_M, 8K context):{" "}
          {top.length ? top.join(", ") : "none of the tracked models"}
          {more > 0 ? ` and ${more} smaller model${more > 1 ? "s" : ""}` : ""}.
        </p>
        <p>
          <SmartLink className="button-primary" href={`/go/amazon-in-laptop-${t.gb}gb`}>
            See {t.gb} GB VRAM laptops on Amazon.in ↗
          </SmartLink>
        </p>
      </div>

      <p className="budget-note">
        Between ₹1,20,000 and ₹1,50,000? Many laptops in that range still have 8 GB VRAM, so check the GB on the spec sheet
        before paying more. Prices change with sales; Amazon.in shows the live price.
      </p>
    </section>
  );
}
