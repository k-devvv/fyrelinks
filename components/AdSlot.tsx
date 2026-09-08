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
  dealTitle = "Exclusive: Verified Enterprise Deal & Verified Stock",
  dealSubtitle = "High-intent reader supported benchmark tooling. Reader exclusive discount rates verified by FyreLinkz Lab.",
  couponCode = "FYREPRO",
  affiliateUrl = "https://fyrelinkz.com",
  discountBadge = "VERIFIED DEAL",
  sponsorName = "FyreLinkz Network",
  className = "",
  minHeight,
  slotId,
}: AdSlotProps) {
  const [copied, setCopied] = useState(false);

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
        aria-label="Sponsored Affiliate Deal"
        className={`w-full overflow-hidden rounded-2xl bg-gradient-to-r from-fyre-950 via-surface-card to-surface-card border border-fyre-500/30 p-4 sm:p-5 shadow-lg ${className}`}
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-fyre-400">
            <Flame className="w-3.5 h-3.5" />
            <span>Featured Partner Deal</span>
          </div>
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">
            Sponsored / Affiliate
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-fyre-500 text-white">
                {discountBadge}
              </span>
              <h4 className="text-sm sm:text-base font-bold text-white">{dealTitle}</h4>
            </div>
            <p className="text-xs text-gray-300 line-clamp-1">{dealSubtitle}</p>
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
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-fyre-500 to-rose-600 hover:from-fyre-600 hover:to-rose-700 shadow-glow transition-all duration-200"
            >
              <span>Claim Deal</span>
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
        aria-label="Sponsored Affiliate Deal"
        className={`w-full rounded-2xl bg-surface-card border border-surface-border p-5 space-y-4 shadow-xl relative overflow-hidden ${className}`}
      >
        <div className="flex items-center justify-between text-[10px] text-gray-400 uppercase tracking-wider">
          <div className="flex items-center gap-1 text-fyre-400 font-bold">
            <Flame className="w-3.5 h-3.5" />
            <span>Fyre Verified Deal</span>
          </div>
          <span>Sponsored</span>
        </div>

        <div className="space-y-2">
          <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-fyre-500/20 text-fyre-400 border border-fyre-500/30">
            {discountBadge}
          </div>
          <h4 className="text-base font-bold text-white">{dealTitle}</h4>
          <p className="text-xs text-gray-400 leading-relaxed">{dealSubtitle}</p>
        </div>

        {couponCode && (
          <div className="p-3 rounded-xl bg-surface border border-surface-border flex items-center justify-between">
            <div className="text-[11px] text-gray-400">
              Coupon Code: <span className="font-mono font-bold text-white">{couponCode}</span>
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
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-fyre-500 to-rose-600 hover:from-fyre-600 hover:to-rose-700 shadow-glow transition-all"
        >
          <span>Get Verified Deal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </SmartLink>

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>30-Day Money-Back Guarantee by {sponsorName}</span>
        </div>
      </aside>
    );
  }

  // format === "in-feed"
  return (
    <aside
      aria-label="Sponsored In-Feed Deal"
      className={`my-8 p-6 rounded-2xl bg-gradient-to-br from-surface-card via-surface-card to-fyre-950/30 border border-fyre-500/30 shadow-xl ${className}`}
    >
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-surface-border/60">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-fyre-500" />
          <span className="text-xs font-bold tracking-wide uppercase text-fyre-400">
            Editor&apos;s Recommended Deal
          </span>
        </div>
        <span className="text-[10px] text-gray-400 uppercase tracking-wider">
          Sponsored by {sponsorName}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="md:col-span-2 space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-fyre-500 text-white">
              {discountBadge}
            </span>
            <h4 className="text-lg font-bold text-white">{dealTitle}</h4>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">{dealSubtitle}</p>
          <div className="flex items-center gap-3 text-xs text-gray-400 pt-1">
            <span>✓ Verified Working</span>
            <span>✓ 30-Day Refund Window</span>
            <span>✓ Instant Activation</span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 md:items-end">
          {couponCode && (
            <button
              type="button"
              onClick={copyCoupon}
              className="flex items-center justify-center gap-2 w-full md:w-auto px-4 py-2.5 rounded-xl bg-surface border border-surface-border hover:border-fyre-500/50 text-xs font-medium text-gray-200 transition-colors"
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
            className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-fyre-500 to-rose-600 hover:from-fyre-600 hover:to-rose-700 shadow-glow transition-all"
          >
            <span>Activate Discount</span>
            <ExternalLink className="w-4 h-4" />
          </SmartLink>
        </div>
      </div>
    </aside>
  );
}
