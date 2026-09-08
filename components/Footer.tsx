"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Flame, Send, CheckCircle2, Shield, Award, Terminal, ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/lib/posts";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="w-full bg-surface border-t border-surface-border text-gray-400">
      {/* Newsletter Feature Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-surface-border/60">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-surface-card via-surface-card to-fyre-950/40 border border-surface-border p-8 md:p-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-fyre-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fyre-500/10 border border-fyre-500/30 text-fyre-400 text-xs font-semibold">
                <Flame className="w-3.5 h-3.5" />
                <span>Weekly Fire Deals & Benchmarks</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Never Pay Full Price for Premium Tech
              </h3>
              <p className="text-sm text-gray-300 max-w-xl">
                Join 45,000+ engineers, creators, and sysadmins. We send one weekly briefing with verified coupon codes, firmware updates, and unvarnished lab benchmark results.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-medium">
                    You&apos;re in! We&apos;ve sent the latest verified tech discounts to your inbox.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email..."
                    className="w-full px-4 py-3 text-sm rounded-xl bg-surface border border-surface-border text-white placeholder-gray-500 focus:outline-none focus:border-fyre-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-fyre-500 to-rose-600 hover:from-fyre-600 hover:to-rose-700 shadow-glow transition-all duration-200"
                  >
                    <span>Subscribe</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
              <p className="text-[11px] text-gray-500 mt-2">
                Zero spam. One-click unsubscribe anytime. Read our{" "}
                <Link href="/privacy" className="text-gray-400 hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-fyre-500 to-rose-600 shadow-glow">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                FYRE<span className="text-fyre-500">LINKZ</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed pr-6">
              FyreLinkz is an independent consumer technology testing lab. We purchase our own test units, run reproducible synthetic and real-world stress benchmarks, and publish transparent verdicts for engineers and creators.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-400 pt-2">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>100% Independent</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Lab-Grade Audits</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Tested by Engineers</span>
              </div>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Product Categories
            </h4>
            <ul className="space-y-2 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/${cat.slug}`}
                    className="hover:text-white transition-colors flex items-center justify-between group"
                  >
                    <span>{cat.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-fyre-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Editorial & Testing */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Editorial Lab
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Testing Methodology
                </Link>
              </li>
              <li>
                <Link href="/about#scoring" className="hover:text-white transition-colors">
                  How We Score Products
                </Link>
              </li>
              <li>
                <Link href="/about#team" className="hover:text-white transition-colors">
                  Editorial Team
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Pitch Review Gear
                </Link>
              </li>
              <li>
                <Link href="/contact#press" className="hover:text-white transition-colors">
                  Press & Media Kit
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Disclosures */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Trust & Governance
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy (GDPR/CCPA)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/terms#affiliate-disclosure" className="hover:text-white transition-colors">
                  Affiliate Disclosure (FTC)
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="hover:text-white transition-colors">
                  XML Sitemap
                </Link>
              </li>
              <li>
                <Link href="/robots.txt" className="hover:text-white transition-colors">
                  Robots.txt
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* FTC Mandatory Disclaimer Box */}
        <div className="mt-12 p-4 rounded-2xl bg-surface-card border border-surface-border/80 text-xs text-gray-400 space-y-2">
          <div className="flex items-center gap-2 text-gray-300 font-semibold">
            <Shield className="w-4 h-4 text-fyre-400" />
            <span>FTC Affiliate & Editorial Transparency Notice</span>
          </div>
          <p className="leading-relaxed">
            FyreLinkz (fyrelinkz.com) is reader-supported. When you purchase products through our affiliate links to Amazon, retailer partners, and software providers, we may earn an affiliate commission at zero additional cost to you. We do not accept paid reviews or sponsored product placements. All test ratings, benchmark scores, and verdicts are determined solely by our editorial staff based on standardized testing procedures.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-surface-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} FyreLinkz Media Inc. All rights reserved. Registered trademark.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-gray-400 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-gray-400 transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-gray-400 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
