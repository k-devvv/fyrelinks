"use client";

import React from "react";
import Link from "next/link";
import { Flame, Shield, Award, Terminal, ArrowUpRight, Mail } from "lucide-react";
import { CATEGORIES } from "@/lib/posts";

export default function Footer() {
  return (
    <footer className="w-full bg-surface border-t border-surface-border text-gray-400">
      {/* Editorial Mission & Contact Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-surface-border/60">
        <div className="rounded-2xl bg-surface-card border border-surface-border p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-fyre-500/10 border border-fyre-500/30 text-fyre-400 text-xs font-semibold">
                <Flame className="w-3.5 h-3.5" />
                <span>Editorial Mission</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Independent AI Video & Diffusion Guidance
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
                FyreLinkz provides practical teardowns, workflow blueprints, and compute economics to help creators and builders make confident generative AI decisions without costly false starts.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <a
                href="mailto:editorial@fyrelinkz.com"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-fyre-500 hover:bg-fyre-600 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Contact the Editorial Desk</span>
              </a>
              <span className="text-[11px] text-gray-500 text-center lg:text-left">
                Direct tips & inquiries: editorial@fyrelinkz.com
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-3.5">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-fyre-500/15 border border-fyre-500/30 text-fyre-400">
                <Flame className="w-4 h-4 text-fyre-400" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white font-sans">
                FYRE<span className="text-fyre-500">LINKZ</span>
              </span>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed pr-6">
              An independent technical publication focused on generative AI video, open diffusion architectures, and local workstation compute.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-400 pt-1">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Evidence-First</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Transparent Analysis</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Practical Systems</span>
              </div>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Sections
            </h4>
            <ul className="space-y-2 text-xs">
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

          {/* Col 3: Editorial & Guides */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Editorial
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/create" className="hover:text-white transition-colors">
                  AI Video Reviews
                </Link>
              </li>
              <li>
                <Link href="/stack" className="hover:text-white transition-colors">
                  Cloud vs Local Comparisons
                </Link>
              </li>
              <li>
                <Link href="/hardware" className="hover:text-white transition-colors">
                  Workstation Hardware
                </Link>
              </li>
              <li>
                <Link href="/workflow" className="hover:text-white transition-colors">
                  Implementation Guides
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About & Standards
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Trust & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Editorial Methodology
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="hover:text-white transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* FTC Mandatory Disclaimer Box */}
        <div className="mt-10 p-4 rounded-xl bg-surface-card border border-surface-border text-xs text-gray-400 space-y-1.5">
          <div className="flex items-center gap-2 text-gray-300 font-semibold">
            <Shield className="w-3.5 h-3.5 text-fyre-400" />
            <span>Editorial Transparency & Affiliate Notice</span>
          </div>
          <p className="leading-relaxed text-[11px] text-gray-400">
            FyreLinkz (fyrelinkz.com) is an independent reader-supported publication. When you purchase products or subscribe to services through links on this site, we may earn an affiliate commission at zero additional cost to you. We do not accept paid reviews or sponsored product rankings. All recommendations and evaluations are based on independent technical research and editorial judgment.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-surface-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} FyreLinkz. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-gray-400 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-gray-400 transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-gray-400 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
