"use client";

import React, { useState } from "react";
import { Check, X, ExternalLink, Star, Award, Sparkles, Flame } from "lucide-react";
import { ComparisonProduct } from "@/lib/types";

interface ComparisonTableProps {
  title?: string;
  description?: string;
  specKeys: { key: string; label: string }[];
  products: ComparisonProduct[];
}

export default function ComparisonTable({
  title = "Head-to-Head Comparison",
  description = "Side-by-side specifications, benchmark scores, and real-world pricing analyzed by our lab team.",
  specKeys,
  products,
}: ComparisonTableProps) {
  const [highlightWinner, setHighlightWinner] = useState(true);

  const getBadgeIcon = (badge?: string) => {
    switch (badge) {
      case "Editor's Choice":
        return <Award className="w-3.5 h-3.5 text-amber-400" />;
      case "Fastest Pick":
        return <Flame className="w-3.5 h-3.5 text-rose-400" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-fyre-400" />;
    }
  };

  return (
    <section className="my-10 w-full overflow-hidden rounded-3xl bg-surface-card border border-surface-border p-6 md:p-8 shadow-2xl">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-surface-border">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-fyre-400">
            <Award className="w-4 h-4" />
            <span>FyreLinkz Matrix Audit</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">{title}</h3>
          <p className="text-sm text-gray-400 max-w-2xl">{description}</p>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300 select-none">
            <input
              type="checkbox"
              checked={highlightWinner}
              onChange={(e) => setHighlightWinner(e.target.checked)}
              className="rounded border-surface-border bg-surface text-fyre-500 focus:ring-0 w-4 h-4 cursor-pointer"
            />
            <span>Highlight Top Pick</span>
          </label>
        </div>
      </div>

      {/* Desktop / Tablet Responsive Table */}
      <div className="overflow-x-auto pt-6 -mx-6 px-6 md:mx-0 md:px-0">
        <table className="w-full min-w-[640px] text-left border-collapse">
          <thead>
            <tr>
              <th className="p-4 w-1/4 text-xs font-bold text-gray-400 uppercase tracking-wider bg-surface/50 rounded-tl-2xl">
                Product Model
              </th>
              {products.map((product) => {
                const isWinner = product.featured || product.badge === "Editor's Choice";
                return (
                  <th
                    key={product.id}
                    className={`p-4 text-center align-top transition-all ${
                      highlightWinner && isWinner
                        ? "bg-fyre-500/10 border-t-2 border-x-2 border-fyre-500 rounded-t-2xl shadow-glow"
                        : "bg-surface/30"
                    }`}
                  >
                    <div className="space-y-2">
                      {product.badge && (
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-fyre-500/20 text-fyre-400 border border-fyre-500/30">
                          {getBadgeIcon(product.badge)}
                          <span>{product.badge}</span>
                        </div>
                      )}
                      <div className="font-bold text-sm sm:text-base text-white">
                        {product.name}
                      </div>
                      <div className="text-xs text-gray-400">{product.brand}</div>
                      <div className="flex items-center justify-center gap-2 pt-1">
                        <span className="text-lg font-extrabold text-white font-mono">
                          {product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-500 line-through font-mono">
                            {product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-surface-border">
            {/* Overall Score Row */}
            <tr className="bg-surface/20">
              <td className="p-4 text-xs font-semibold text-gray-300">
                FyreLinkz Lab Score
              </td>
              {products.map((product) => {
                const isWinner = product.featured || product.badge === "Editor's Choice";
                return (
                  <td
                    key={`score-${product.id}`}
                    className={`p-4 text-center ${
                      highlightWinner && isWinner
                        ? "bg-fyre-500/10 border-x-2 border-fyre-500"
                        : ""
                    }`}
                  >
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 font-bold text-sm">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{product.score} / 10</span>
                    </div>
                  </td>
                );
              })}
            </tr>

            {/* Dynamic Spec Rows */}
            {specKeys.map((spec) => (
              <tr key={spec.key} className="hover:bg-surface-hover/30 transition-colors">
                <td className="p-4 text-xs font-medium text-gray-400">
                  {spec.label}
                </td>
                {products.map((product) => {
                  const isWinner = product.featured || product.badge === "Editor's Choice";
                  const val = product.specs[spec.key] || "—";
                  return (
                    <td
                      key={`${spec.key}-${product.id}`}
                      className={`p-4 text-center text-xs font-medium text-gray-200 ${
                        highlightWinner && isWinner
                          ? "bg-fyre-500/10 border-x-2 border-fyre-500 font-semibold text-white"
                          : ""
                      }`}
                    >
                      {val}
                    </td>
                  );
                })}
              </tr>
            ))}

            {/* Pros Summary Row */}
            <tr className="bg-surface/20">
              <td className="p-4 text-xs font-semibold text-gray-300 align-top">
                Key Strengths
              </td>
              {products.map((product) => {
                const isWinner = product.featured || product.badge === "Editor's Choice";
                return (
                  <td
                    key={`pros-${product.id}`}
                    className={`p-4 align-top ${
                      highlightWinner && isWinner
                        ? "bg-fyre-500/10 border-x-2 border-fyre-500"
                        : ""
                    }`}
                  >
                    <ul className="space-y-1.5 text-left text-xs text-gray-300">
                      {product.pros.map((pro, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                );
              })}
            </tr>

            {/* Cons Summary Row */}
            <tr>
              <td className="p-4 text-xs font-semibold text-gray-300 align-top">
                Trade-offs
              </td>
              {products.map((product) => {
                const isWinner = product.featured || product.badge === "Editor's Choice";
                return (
                  <td
                    key={`cons-${product.id}`}
                    className={`p-4 align-top ${
                      highlightWinner && isWinner
                        ? "bg-fyre-500/10 border-x-2 border-fyre-500"
                        : ""
                    }`}
                  >
                    <ul className="space-y-1.5 text-left text-xs text-gray-400">
                      {product.cons.map((con, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <X className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                );
              })}
            </tr>

            {/* Action Row */}
            <tr>
              <td className="p-4 text-xs font-medium text-gray-400 bg-surface/50 rounded-bl-2xl">
                Merchant Link
              </td>
              {products.map((product) => {
                const isWinner = product.featured || product.badge === "Editor's Choice";
                return (
                  <td
                    key={`cta-${product.id}`}
                    className={`p-4 text-center ${
                      highlightWinner && isWinner
                        ? "bg-fyre-500/10 border-b-2 border-x-2 border-fyre-500 rounded-b-2xl"
                        : ""
                    }`}
                  >
                    <a
                      href={product.affiliateUrl}
                      target="_blank"
                      rel="nofollow sponsored noopener noreferrer"
                      className={`inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                        isWinner
                          ? "text-white bg-gradient-to-r from-fyre-500 to-rose-600 hover:from-fyre-600 hover:to-rose-700 shadow-glow"
                          : "text-gray-200 bg-surface border border-surface-border hover:border-gray-500 hover:text-white"
                      }`}
                    >
                      <span>{product.ctaText || "Check Price"}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-3 border-t border-surface-border/60 text-[11px] text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>* Prices and availability checked daily from authorized retailers.</span>
        <span>FTC Reader-Supported: Links earn affiliate commissions.</span>
      </div>
    </section>
  );
}
