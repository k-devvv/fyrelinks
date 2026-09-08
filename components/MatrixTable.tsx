"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Zap,
  ExternalLink,
  Shield,
  Layers,
  Cpu,
  CheckCircle2,
  SlidersHorizontal,
  Flame,
  ArrowUpRight,
  Info,
} from "lucide-react";
import { MatrixTableRow } from "@/lib/types";

interface MatrixTableProps {
  tableData: MatrixTableRow[];
  title?: string;
  subtitle?: string;
}

export default function MatrixTable({
  tableData,
  title = "AI Video Generation Performance Matrix (2026)",
  subtitle = "Direct head-to-head empirical testing across temporal consistency, camera motion, frame fluidity, and render economics.",
}: MatrixTableProps) {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "cloud" | "local">("all");
  const [highlightedRow, setHighlightedRow] = useState<string | null>(null);

  const filteredData = tableData.filter((item) => {
    if (selectedFilter === "cloud") return !item.name.toLowerCase().includes("local");
    if (selectedFilter === "local") return item.name.toLowerCase().includes("local");
    return true;
  });

  return (
    <section aria-label="AI Video Generation Matrix" className="my-10 space-y-6">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fyre-500/10 border border-fyre-500/30 text-fyre-400 text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-fyre-500 animate-pulse" />
            <span>Empirical Benchmark Matrix</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-surface-card border border-surface-border rounded-xl shrink-0 self-start md:self-auto">
          <button
            onClick={() => setSelectedFilter("all")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedFilter === "all"
                ? "bg-fyre-500 text-white shadow-glow"
                : "text-gray-400 hover:text-white"
            }`}
          >
            All Models ({tableData.length})
          </button>
          <button
            onClick={() => setSelectedFilter("cloud")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedFilter === "cloud"
                ? "bg-fyre-500 text-white shadow-glow"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Cloud Rigs
          </button>
          <button
            onClick={() => setSelectedFilter("local")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedFilter === "local"
                ? "bg-fyre-500 text-white shadow-glow"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Local Compute
          </button>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-hidden rounded-3xl bg-surface-card border border-surface-border shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-surface-border bg-surface text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-4 px-6">Model & Architecture</th>
                <th className="py-4 px-5">Metric / Resolution Profile</th>
                <th className="py-4 px-5">Pricing & Licensing</th>
                <th className="py-4 px-5">Temporal & Motion Highlight</th>
                <th className="py-4 px-6">Lab Verdict & Best Use Case</th>
                <th className="py-4 px-4 text-right">Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border/60 text-xs">
              {filteredData.map((row, idx) => {
                const isHovered = highlightedRow === row.name;
                const isLocal = row.name.toLowerCase().includes("local");

                return (
                  <tr
                    key={idx}
                    onMouseEnter={() => setHighlightedRow(row.name)}
                    onMouseLeave={() => setHighlightedRow(null)}
                    className={`transition-colors duration-150 ${
                      isHovered
                        ? "bg-surface-hover/80"
                        : idx % 2 === 0
                        ? "bg-surface-card"
                        : "bg-surface/40"
                    }`}
                  >
                    {/* Model Name */}
                    <td className="py-5 px-6 align-top">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm text-white font-sans">
                            {row.name}
                          </span>
                          {row.score && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              ★ {row.score}
                            </span>
                          )}
                        </div>
                        {row.badge && (
                          <div className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-fyre-500/15 text-fyre-400 border border-fyre-500/25">
                            {row.badge}
                          </div>
                        )}
                        <div className="text-[10px] text-gray-500 flex items-center gap-1">
                          {isLocal ? (
                            <>
                              <Cpu className="w-3 h-3 text-cyan-400" />
                              <span className="text-cyan-400 font-mono">Open-Weights</span>
                            </>
                          ) : (
                            <>
                              <Zap className="w-3 h-3 text-amber-400" />
                              <span className="text-amber-400 font-mono">Managed API / Web</span>
                            </>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Metric / Type */}
                    <td className="py-5 px-5 align-top font-mono text-gray-200">
                      <div className="p-2 rounded-xl bg-surface/80 border border-surface-border/80">
                        <span className="font-semibold text-white">{row.metricOrType}</span>
                      </div>
                    </td>

                    {/* Price / License */}
                    <td className="py-5 px-5 align-top">
                      <div className="space-y-1">
                        <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          {row.priceOrLicense}
                        </span>
                      </div>
                    </td>

                    {/* Highlight */}
                    <td className="py-5 px-5 align-top">
                      <div className="flex items-start gap-2 text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-fyre-400 shrink-0 mt-0.5" />
                        <span className="font-medium leading-relaxed">{row.highlight}</span>
                      </div>
                    </td>

                    {/* Verdict */}
                    <td className="py-5 px-6 align-top">
                      <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
                        {row.verdict}
                      </p>
                    </td>

                    {/* Action */}
                    <td className="py-5 px-4 align-top text-right">
                      {row.affiliateUrl ? (
                        <a
                          href={row.affiliateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-fyre-500 hover:bg-fyre-600 transition-colors shadow-glow"
                        >
                          <span>Deploy</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="text-xs text-gray-500">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden space-y-4">
        {filteredData.map((row, idx) => {
          const isLocal = row.name.toLowerCase().includes("local");

          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-4 shadow-lg"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-surface-border">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-base text-white">{row.name}</h3>
                    {row.score && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        ★ {row.score}
                      </span>
                    )}
                  </div>
                  {row.badge && (
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-fyre-500/15 text-fyre-400 border border-fyre-500/25">
                      {row.badge}
                    </span>
                  )}
                </div>

                <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shrink-0">
                  {row.priceOrLicense}
                </span>
              </div>

              {/* Specs & Highlights */}
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-surface border border-surface-border space-y-1">
                  <div className="text-[10px] uppercase font-bold text-gray-400">Resolution & Metric</div>
                  <div className="font-mono text-white">{row.metricOrType}</div>
                </div>

                <div className="p-3 rounded-xl bg-surface/50 border border-surface-border/80 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-fyre-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-fyre-400" />
                    <span>Key Motion Physics Advantage</span>
                  </div>
                  <div className="text-gray-200">{row.highlight}</div>
                </div>

                <div className="pt-2">
                  <div className="text-[10px] uppercase font-bold text-gray-400 mb-1">Editorial Verdict</div>
                  <p className="text-xs text-gray-300 leading-relaxed">{row.verdict}</p>
                </div>
              </div>

              {/* Action Button */}
              {row.affiliateUrl && (
                <div className="pt-2">
                  <a
                    href={row.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-fyre-500 to-rose-600 hover:from-fyre-600 shadow-glow"
                  >
                    <span>Deploy {row.name}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Lab Methodology Footnote */}
      <div className="flex items-center gap-2 p-3.5 rounded-xl bg-surface/60 border border-surface-border text-xs text-gray-400">
        <Info className="w-4 h-4 text-fyre-400 shrink-0" />
        <span>
          <strong className="text-gray-200">Lab Note:</strong> All models benchmarked on standardized 120-prompt test suite across 4 domains (complex human anatomy, cloth physics, fluid dynamics, camera pan/tilt lock).
        </span>
      </div>
    </section>
  );
}
