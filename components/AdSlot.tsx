"use client";

import React, { useState } from "react";
import { Flame, ExternalLink, Copy, Check, Tag, ShieldCheck } from "lucide-react";
import SmartLink from "@/components/SmartLink";

interface AdSlotProps {
  format?: "leaderboard" | "in-feed" | "sidebar" | "horizontal";
  dealTitle?: string;
  dealSubtitle?: string;
  couponCode?: string;
  affiliateUrl?: string;
  discountBadge?: string;
  sponsorName?: string;
  className?: string;
  minHeight?: string;
  slotId?: string;
}

export default function AdSlot({
  format = "in-feed",
  dealTitle,
  dealSubtitle,
  couponCode,
  affiliateUrl,
  discountBadge = "PARTNER",
  sponsorName,
  className = "",
}: AdSlotProps) {
  const [copied, setCopied] = useState(false);

  // Safety check: Do not render mock ad units, fake promo codes, or empty ad placeholders.
  // Only render if a genuine outbound destination and sponsor title are provided.
  if (!affiliateUrl || affiliateUrl === "https://fyrelinkz.com" || affiliateUrl === "https://www.fyrelinkz.com" || !dealTitle) {
    return null;
  }

  const copyCoupon = () => {
    if (couponCode) {
      navigator.clipboard.writeText(couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (format === "leaderboard") {
    return (
      <aside
        aria-label="Sponsored Partner"
        className={`w-full overflow-hidden rounded-2xl bg-surface-card border border-surface-border p-4 sm:p-5 ${className}`}
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-fyre-400">
            <Flame className="w-3.5 h-3.5" />
            <span>Featured Resource</span>
          </div>
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">
            Sponsored / Affiliate
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-fyre-500/20 text-fyre-400 border border-fyre-500/30">
                {discountBadge}
              </span>
              <h4 className="text-sm sm:text-base font-bold text-white">{dealTitle}</h4>
            </div>
            {dealSubtitle && <p className="text-xs text-gray-300 line-clamp-1">{dealSubtitle}</p>}
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {couponCode && (
              <button
                type="button"
                onClick={copyCoupon}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface border border-surface-border hover:border-fyre-500/50 text-xs text-gray-300 transition-colors"
                title="Click to copy coupon code"
              >
                <Tag className="w-3.5 h-3.5 text-fyre-400" />
                <span className="font-mono font-bold text-white">{couponCode}</span>
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-gray-400" />
                )}
              </button>
            )}

            <SmartLink
              href={affiliateUrl}
              isAffiliate={true}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-fyre-500 hover:bg-fyre-600 transition-colors"
            >
              <span>Visit Partner</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </SmartLink>
          </div>
        </div>
      </aside>
    );
  }

  if (format === "sidebar") {
    return (
      <aside
        aria-label="Sponsored Partner"
        className={`w-full rounded-2xl bg-surface-card border border-surface-border p-5 space-y-4 ${className}`}
      >
        <div className="flex items-center justify-between text-[10px] text-gray-400 uppercase tracking-wider">
          <div className="flex items-center gap-1 text-fyre-400 font-bold">
            <Flame className="w-3.5 h-3.5" />
            <span>Recommended Tool</span>
          </div>
          <span>Sponsored</span>
        </div>

        <div className="space-y-2">
          <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-fyre-500/20 text-fyre-400 border border-fyre-500/30">
            {discountBadge}
          </div>
          <h4 className="text-base font-bold text-white">{dealTitle}</h4>
          {dealSubtitle && <p className="text-xs text-gray-400 leading-relaxed">{dealSubtitle}</p>}
        </div>

        {couponCode && (
          <div className="p-3 rounded-xl bg-surface border border-surface-border flex items-center justify-between">
            <div className="text-[11px] text-gray-400">
              Code: <span className="font-mono font-bold text-white">{couponCode}</span>
            </div>
            <button
              type="button"
              onClick={copyCoupon}
              className="p-1 text-gray-400 hover:text-white transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        )}

        <SmartLink
          href={affiliateUrl}
          isAffiliate={true}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-fyre-500 hover:bg-fyre-600 transition-colors"
        >
          <span>Learn More</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </SmartLink>

        {sponsorName && (
          <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Supported by {sponsorName}</span>
          </div>
        )}
      </aside>
    );
  }

  // format === "in-feed" or "horizontal"
  return (
    <aside
      aria-label="Sponsored In-Feed Link"
      className={`my-8 p-5 sm:p-6 rounded-2xl bg-surface-card border border-surface-border ${className}`}
    >
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-surface-border">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-fyre-500" />
          <span className="text-xs font-bold tracking-wide uppercase text-fyre-400">
            Partner Resource
          </span>
        </div>
        {sponsorName && (
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">
            Sponsored by {sponsorName}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
        <div className="md:col-span-2 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-fyre-500/20 text-fyre-400 border border-fyre-500/30">
              {discountBadge}
            </span>
            <h4 className="text-base sm:text-lg font-bold text-white">{dealTitle}</h4>
          </div>
          {dealSubtitle && <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{dealSubtitle}</p>}
        </div>

        <div className="flex flex-col gap-2 md:items-end">
          {couponCode && (
            <button
              type="button"
              onClick={copyCoupon}
              className="flex items-center justify-center gap-2 w-full md:w-auto px-4 py-2 rounded-xl bg-surface border border-surface-border text-xs text-gray-200"
            >
              <Tag className="w-3.5 h-3.5 text-fyre-400" />
              <span>Use Code: </span>
              <span className="font-mono font-bold text-white">{couponCode}</span>
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-gray-400 ml-1" />
              )}
            </button>
          )}

          <SmartLink
            href={affiliateUrl}
            isAffiliate={true}
            className="flex items-center justify-center gap-2 w-full md:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-fyre-500 hover:bg-fyre-600 transition-colors"
          >
            <span>Visit {sponsorName || "Resource"}</span>
            <ExternalLink className="w-4 h-4" />
          </SmartLink>
        </div>
      </div>
    </aside>
  );
}
