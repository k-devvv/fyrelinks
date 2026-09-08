import React from "react";
import { Check, X, ExternalLink, ShieldCheck, Flame, Zap, Target, AlertTriangle, Coins } from "lucide-react";
import SmartLink from "@/components/SmartLink";

export interface QuickVerdictProps {
  score?: number;
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
  whoThisIsFor?: string;
  whereItFails?: string;
  costPerUsableMinute?: string;
}

export default function QuickVerdict({
  score,
  verdict,
  badge = "Editorial Takeaway",
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
  ctaText = "Visit Resource",
  whoThisIsFor,
  whereItFails,
  costPerUsableMinute,
}: QuickVerdictProps) {
  const displayText = verdict || summary || "";
  const targetAudience = whoThisIsFor || bestFor;
  const failurePoints = whereItFails || skipIf;

  return (
    <section
      aria-label="Editorial Quick Verdict"
      className="my-8 rounded-2xl bg-surface-card border border-surface-border p-6 sm:p-7 shadow-lg"
    >
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-fyre-500/15 border border-fyre-500/30 text-fyre-400 shrink-0">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-fyre-400">
                {badge}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
              {brand && productName ? `${brand} ${productName}` : "Executive Takeaway"}
            </h3>
          </div>
        </div>

        {score !== undefined && (
          <div className="flex items-center gap-2 self-start sm:self-auto px-3 py-1.5 rounded-lg bg-surface border border-surface-border text-xs text-gray-300">
            <span className="text-gray-400">Rating:</span>
            <span className="font-bold text-white">{score.toFixed(1)} / 10</span>
          </div>
        )}
      </div>

      {/* Summary Narrative */}
      <div className="py-4 space-y-3">
        <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal">
          {displayText}
        </p>

        {bottomLine && (
          <div className="p-3.5 rounded-xl bg-surface border border-surface-border flex items-start gap-2.5">
            <div className="p-1 rounded-md bg-fyre-500/10 text-fyre-400 shrink-0 mt-0.5">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-fyre-400 uppercase tracking-wide">
                Key Recommendation
              </span>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{bottomLine}</p>
            </div>
          </div>
        )}
      </div>

      {/* Optional Pros & Cons Grid */}
      {pros && cons && pros.length > 0 && cons.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 pb-5 border-y border-surface-border">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <Check className="w-4 h-4" />
              <span>Strengths</span>
            </div>
            <ul className="space-y-2">
              {pros.map((pro, index) => (
                <li key={index} className="flex items-start gap-2 text-xs text-gray-300 leading-relaxed">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-rose-400 font-bold text-xs uppercase tracking-wider">
              <X className="w-4 h-4" />
              <span>Limitations</span>
            </div>
            <ul className="space-y-2">
              {cons.map((con, index) => (
                <li key={index} className="flex items-start gap-2 text-xs text-gray-400 leading-relaxed">
                  <X className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Decision Telemetry Grid */}
      {(targetAudience || failurePoints || costPerUsableMinute) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-4">
          {targetAudience && (
            <div className="p-3.5 rounded-xl bg-surface/60 border border-surface-border flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1.5">
                  <Target className="w-3.5 h-3.5" />
                  <span>Best For</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{targetAudience}</p>
              </div>
            </div>
          )}

          {failurePoints && (
            <div className="p-3.5 rounded-xl bg-surface/60 border border-surface-border flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-rose-400 font-bold text-xs uppercase tracking-wider mb-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Key Limitations</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{failurePoints}</p>
              </div>
            </div>
          )}

          {costPerUsableMinute && (
            <div className="p-3.5 rounded-xl bg-surface/60 border border-surface-border flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-fyre-400 font-bold text-xs uppercase tracking-wider mb-1.5">
                  <Coins className="w-3.5 h-3.5" />
                  <span>Compute Economics</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-mono">{costPerUsableMinute}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Direct Outbound Resource / Affiliate Link (Only when genuine affiliateUrl exists) */}
      {affiliateUrl && affiliateUrl !== "https://fyrelinkz.com" && affiliateUrl !== "https://www.fyrelinkz.com" && (
        <div className="pt-5 mt-4 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="space-y-0.5 text-center sm:text-left">
            {price && (
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-xl font-bold text-white font-mono">{price}</span>
                {originalPrice && (
                  <span className="text-xs text-gray-500 line-through font-mono">{originalPrice}</span>
                )}
                {discountPercent && (
                  <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-500/20 text-emerald-400">
                    {discountPercent}
                  </span>
                )}
              </div>
            )}
            <div className="flex items-center justify-center sm:justify-start gap-1 text-[11px] text-gray-400">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Direct link to verified provider</span>
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-1">
            <SmartLink
              href={affiliateUrl}
              isAffiliate={true}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-fyre-500 hover:bg-fyre-600 transition-colors"
            >
              <span>{ctaText}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </SmartLink>
            <span className="text-[10px] text-gray-500">
              FTC Disclosure: We may earn an affiliate commission at no extra cost to you.
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
