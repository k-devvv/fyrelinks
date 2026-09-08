"use client";

import React, { useState, useEffect } from "react";
import { ExternalLink, X, ChevronUp, Flame, Star, ShieldCheck } from "lucide-react";
import SmartLink from "@/components/SmartLink";

interface FloatingCardProps {
  productName: string;
  brand: string;
  price: string;
  originalPrice?: string;
  discountPercent?: string;
  rating: number; // e.g. 9.7
  affiliateUrl: string;
  ctaText?: string;
}

export default function FloatingCard({
  productName,
  brand,
  price,
  originalPrice,
  discountPercent,
  rating,
  affiliateUrl,
  ctaText = "Check Live Price",
}: FloatingCardProps) {
  const [visible, setVisible] = useState(false);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show card once scrolled down 450px
      if (window.scrollY > 450) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  if (minimized) {
    return (
      <aside
        aria-label="Product Deal Shortcut"
        className="fixed bottom-5 right-5 z-40 animate-in fade-in slide-in-from-bottom-3 duration-200"
      >
        <button
          onClick={() => setMinimized(false)}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-surface-card border border-fyre-500/50 shadow-glow text-xs font-semibold text-white hover:bg-surface-hover transition-all"
        >
          <Flame className="w-4 h-4 text-fyre-500 animate-pulse" />
          <span>{productName}</span>
          <span className="text-fyre-400 font-mono">{price}</span>
          <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
        </button>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Product Quick Buy and Price Check"
      className="fixed bottom-0 inset-x-0 sm:bottom-6 sm:right-6 sm:left-auto sm:max-w-md z-40 p-3 sm:p-0 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="relative overflow-hidden rounded-2xl bg-surface-card/95 backdrop-blur-xl border border-fyre-500/40 p-4 sm:p-5 shadow-2xl shadow-black/80">
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-fyre-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top bar with close/minimize */}
        <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-surface-border/60">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-fyre-400">
            <Flame className="w-3.5 h-3.5" />
            <span>FyreLinkz Top Pick</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] text-gray-400 uppercase tracking-widest">
              Affiliate Partner
            </span>
            <button
              onClick={() => setMinimized(true)}
              aria-label="Minimize deal card"
              className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-surface-hover transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-[11px] font-medium text-gray-400">{brand}</div>
            <h5 className="text-sm font-bold text-white line-clamp-1">{productName}</h5>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-extrabold text-white font-mono">{price}</span>
              {originalPrice && (
                <span className="text-xs text-gray-500 line-through font-mono">
                  {originalPrice}
                </span>
              )}
              {discountPercent && (
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {discountPercent}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{rating} / 10</span>
            </div>

            <SmartLink
              href={affiliateUrl}
              isAffiliate={true}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-fyre-500 to-rose-600 hover:from-fyre-600 hover:to-rose-700 shadow-glow transition-all"
            >
              <span>{ctaText}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </SmartLink>
          </div>
        </div>

        {/* Security badge footer */}
        <div className="flex items-center justify-between text-[10px] text-gray-400 pt-2.5 mt-2.5 border-t border-surface-border/40">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Verified Merchant Direct Link</span>
          </div>
          <span className="text-gray-400">Stock confirmed today</span>
        </div>
      </div>
    </aside>
  );
}
