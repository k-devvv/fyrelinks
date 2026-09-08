"use client";

import React, { useState } from "react";
import { Check, X, ExternalLink, Star, Award, Sparkles, Flame, CheckCircle2, ArrowUpRight } from "lucide-react";
import { MatrixTableRow } from "@/lib/types";
import SmartLink from "@/components/SmartLink";

export interface ComparisonTableProps {
  data?: MatrixTableRow[];
  title?: string;
  description?: string;
}

export default function ComparisonTable({
  data,
  title = "Head-to-Head Performance Matrix",
  description = "Side-by-side technical specifications, pricing tiers, and empirical lab verdicts.",
}: ComparisonTableProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  if (!data || data.length === 0) return null;

  const hasAction = data.some((r) => r.redirectUrl || r.affiliateUrl);

  return (
    <section aria-label="Technical Comparison Table" className="my-10 w-full overflow-hidden rounded-3xl bg-surface-card border border-surface-border p-6 md:p-8 shadow-2xl">
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
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto pt-4 -mx-6 px-6 md:mx-0 md:px-0">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-surface-border bg-surface text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <th className="py-4 px-5">Model / Platform</th>
              <th className="py-4 px-5">Metric / Spec Profile</th>
              <th className="py-4 px-5">Pricing / License</th>
              <th className="py-4 px-5">Key Advantage</th>
              <th className="py-4 px-5">Editorial Lab Verdict</th>
              {hasAction && <th className="py-4 px-5 text-right">Action</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border/60 text-xs">
            {data.map((row, idx) => (
              <tr
                key={idx}
                className={`transition-colors duration-150 hover:bg-surface-hover/70 ${
                  idx % 2 === 0 ? "bg-surface-card" : "bg-surface/30"
                }`}
              >
                {/* Name */}
                <td className="py-4 px-5 align-top">
                  <div className="font-bold text-white text-sm font-sans">{row.name}</div>
                  {row.badge && (
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-fyre-500/15 text-fyre-400 border border-fyre-500/25">
                      {row.badge}
                    </span>
                  )}
                </td>

                {/* Metric/Type */}
                <td className="py-4 px-5 align-top font-mono text-gray-200">
                  <div className="p-2 rounded-lg bg-surface border border-surface-border/80">
                    {row.metricOrType}
                  </div>
                </td>

                {/* Price/License */}
                <td className="py-4 px-5 align-top">
                  <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    {row.priceOrLicense}
                  </span>
                </td>

                {/* Highlight */}
                <td className="py-4 px-5 align-top text-gray-200">
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-fyre-400 shrink-0 mt-0.5" />
                    <span>{row.highlight}</span>
                  </div>
                </td>

                {/* Verdict */}
                <td className="py-4 px-5 align-top text-gray-300 leading-relaxed max-w-xs">
                  {row.verdict}
                </td>

                {/* Optional Action Button */}
                {hasAction && (
                  <td className="py-4 px-5 align-top text-right">
                    {row.redirectUrl || row.affiliateUrl ? (
                      <SmartLink
                        href={row.redirectUrl || row.affiliateUrl || "#"}
                        isAffiliate={true}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-fyre-500 hover:bg-fyre-600 transition-colors shadow-glow"
                      >
                        <span>Explore</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </SmartLink>
                    ) : (
                      <span className="text-xs text-gray-500">—</span>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
