import React from "react";
import { Check, X, ExternalLink, Star, ShieldCheck, Flame, ArrowRight, Zap } from "lucide-react";
import SmartLink from "@/components/SmartLink";

export interface QuickVerdictProps {
  score: number;
  verdict?: string;
  badge?: string;
  summary?: string;
  bottomLine?: string;
  bestFor?: string;
  skipIf?: string;
  pros?: string[];
  cons?: string[];
  productName?: string;
  brand?: string;
  price?: string;
  originalPrice?: string;
  discountPercent?: string;
  affiliateUrl?: string;
  ctaText?: string;
}

export default function QuickVerdict({
  score,
  verdict,
  badge = "Editorial Lab Verdict",
  summary,
  bottomLine,
  bestFor,
  skipIf,
  pros,
  cons,
  productName,
  brand,
  price,
  originalPrice,
  discountPercent,
  affiliateUrl,
  ctaText = "Check Live Price",
}: QuickVerdictProps) {
  const displayText = verdict || summary || "";

  return (
    <section
      aria-label="FyreLinkz Quick Verdict"
      className="my-8 rounded-3xl bg-gradient-to-br from-surface-card via-surface-card to-fyre-950/30 border border-fyre-500/40 p-6 sm:p-8 shadow-2xl shadow-black/50"
    >
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-surface-border/80">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-fyre-500 to-rose-600 shadow-glow text-white shrink-0">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-fyre-400">
                AEO Instant Answer
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-fyre-500/20 text-fyre-400 border border-fyre-500/30">
                {badge}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mt-0.5">
              {brand && productName ? `${brand} ${productName}` : "Benchmark Decision Verdict"}
            </h3>
          </div>
        </div>

        {/* Big Score Gauge */}
        <div className="flex items-center gap-3 self-start sm:self-auto bg-surface/80 border border-surface-border px-4 py-2.5 rounded-2xl">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
              Lab Score
            </span>
            <span className="text-2xl font-black text-white font-mono leading-none">
              {score.toFixed(1)}
              <span className="text-xs text-gray-500 font-normal"> / 10</span>
            </span>
          </div>
          <div className="flex items-center gap-0.5 text-amber-400">
            <Star className="w-5 h-5 fill-amber-400" />
          </div>
        </div>
      </div>

      {/* Summary Narrative */}
      <div className="py-5 space-y-4">
        <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-normal">
          {displayText}
        </p>

        {/* Bottom line callout if present */}
        {bottomLine && (
          <div className="p-4 rounded-2xl bg-surface/60 border border-surface-border/80 flex items-start gap-3">
            <div className="p-1.5 rounded-lg bg-fyre-500/10 text-fyre-400 shrink-0 mt-0.5">
              <Zap className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-fyre-400 uppercase tracking-wide">
                The Bottom Line
              </span>
              <p className="text-sm text-gray-300 leading-relaxed">{bottomLine}</p>
            </div>
          </div>
        )}
      </div>

      {/* Optional Pros & Cons Split Grid */}
      {pros && cons && pros.length > 0 && cons.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 pb-6 border-y border-surface-border/80">
          {/* Pros */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span>What We Loved</span>
            </div>
            <ul className="space-y-2.5">
              {pros.map((pro, index) => (
                <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-rose-500/20 text-rose-400">
                <X className="w-3.5 h-3.5" />
              </div>
              <span>Where It Falls Short</span>
            </div>
            <ul className="space-y-2.5">
              {cons.map((con, index) => (
                <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-400">
                  <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Optional Buy/Skip Decision Matrix */}
      {bestFor && skipIf && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-b border-surface-border/80 text-xs">
          <div className="p-3.5 rounded-xl bg-surface/40 border border-surface-border">
            <div className="font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
              <ArrowRight className="w-3.5 h-3.5" />
              <span>Who Should Buy This</span>
            </div>
            <p className="text-gray-300 leading-relaxed">{bestFor}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-surface/40 border border-surface-border">
            <div className="font-bold text-gray-400 mb-1 flex items-center gap-1.5">
              <X className="w-3.5 h-3.5 text-rose-400" />
              <span>Who Should Skip This</span>
            </div>
            <p className="text-gray-400 leading-relaxed">{skipIf}</p>
          </div>
        </div>
      )}

      {/* Buy Box & Affiliate CTA if affiliateUrl exists */}
      {affiliateUrl && (
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                {price}
              </span>
              {originalPrice && (
                <span className="text-sm text-gray-500 line-through font-mono">
                  {originalPrice}
                </span>
              )}
              {discountPercent && (
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {discountPercent}
                </span>
              )}
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[11px] text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct link to verified authorized merchant</span>
            </div>
          </div>

          <div className="flex flex-col items-stretch sm:items-end gap-1.5 w-full sm:w-auto">
            <SmartLink
              href={affiliateUrl}
              isAffiliate={true}
              className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-fyre-500 to-rose-600 hover:from-fyre-600 hover:to-rose-700 shadow-glow hover:shadow-glow-lg transition-all duration-200"
            >
              <span>{ctaText}</span>
              <ExternalLink className="w-4 h-4" />
            </SmartLink>
            <span className="text-[10px] text-gray-400 text-center sm:text-right">
              FTC Disclosure: We earn a commission if you purchase through this link.
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
