import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  ShieldCheck,
  Award,
  Terminal,
  Flame,
  CheckCircle,
  HelpCircle,
  Mail,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Our Lab & Testing Methodology | FyreLinkz",
  description:
    "Learn about the FyreLinkz testing laboratory, our anonymous retail buying policy, reproducible benchmark protocols, and editorial independence standards.",
  alternates: {
    canonical: "https://fyrelinkz.com/about",
  },
};

export default function AboutPage() {
  const team = [
    {
      name: "Julian Vance",
      role: "Lead Software Architect & Tech Editor",
      bio: "Former distributed systems engineer with 14+ years architecting cloud backends. Leads testing on developer copilots, compilers, and local AI stacks.",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80",
    },
    {
      name: "Marcus Sterling",
      role: "Hardware & Acoustic Benchmark Lead",
      bio: "Specializes in thermal profiling, silicon compile speedruns, and audio frequency response analyses. Has tested over 300 laptops and microphones.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80",
    },
    {
      name: "Elena Rostova",
      role: "Cybersecurity Analyst & Cryptographer",
      bio: "Focuses on network packet inspection, zero-logs VPN audits, Matter/Zigbee local IoT protocols, and consumer cryptographic hardware.",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80",
    },
  ];

  return (
    <div className="pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pt-8 sm:pt-12">
      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-fyre-500/10 border border-fyre-500/30 text-fyre-400 text-xs font-bold uppercase tracking-wider">
          <Flame className="w-4 h-4" />
          <span>The FyreLinkz Standard</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
          Independent Tech Reviews. Zero Corporate Influence.
        </h1>
        <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
          We built FyreLinkz because modern consumer tech journalism is broken. Endless SEO spam, recycled manufacturer press releases, and paid reviews masquerading as journalism. Here is how we do things differently.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-surface-card border border-surface-border space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-fyre-500/10 border border-fyre-500/30 flex items-center justify-center text-fyre-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">1. 100% Anonymous Retail Purchases</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Tech manufacturers routinely screen review units to guarantee higher clock speeds, binned silicon, and perfect panel uniformity. We purchase retail shelf units anonymously using standard consumer accounts. If you can buy it, that is what we test.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-surface-card border border-surface-border space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Terminal className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">2. Open & Reproducible Benchmarks</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Every compile benchmark, packet capture audit, acoustic frequency plot, and thermal log is generated using open-source tools and scripted test suites. We publish our exact methodology so engineers can replicate our results.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-surface-card border border-surface-border space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Award className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">3. Rigorous 10-Point Scoring Scale</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            We grade gear on a brutal 10-point scale: 9.5+ is reserved for generational breakthroughs (Editor&apos;s Choice). 8.0 is a solid recommendation. Below 7.0 means significant flaws or poor price-to-performance ratio.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-surface-card border border-surface-border space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <CheckCircle className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">4. Total Affiliate Disclosure</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            We are funded exclusively by reader affiliate commissions and transparent display sponsorships. If a product is bad, we say it is bad—even if recommending it would pay a massive affiliate fee. Trust is our only currency.
          </p>
        </div>
      </section>

      {/* Lab Methodology Section */}
      <section id="methodology" className="p-8 sm:p-12 rounded-3xl bg-surface-card border border-surface-border space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-fyre-400">
            Standardized Protocol
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            How We Test Hardware & Software
          </h2>
        </div>

        <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
          <p>
            <strong>Developer Hardware:</strong> Every laptop is tested using real compile workloads (Next.js 14 monorepos, Rust crates, Linux kernel builds). We test battery degradation under load, thermal throttling with infrared cameras, and measure acoustic fan noise at 50cm with an SPL meter calibrated to IEC 61672 Class 2.
          </p>
          <p>
            <strong>AI Coding Copilots:</strong> We run standardized 50-task refactoring test suites against real open-source repositories to measure zero-shot TypeScript compile success, multi-file hallucination rates, and privacy leaks.
          </p>
          <p>
            <strong>Cybersecurity & VPNs:</strong> We execute automated multi-threaded iPerf3 throughput tests across 30+ server locations, run automated DNS and WebRTC leak tests, and verify diskless RAM operations.
          </p>
        </div>
      </section>

      {/* Editorial Team */}
      <section id="team" className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Meet the Review Lab Staff
          </h2>
          <p className="text-sm text-gray-400">
            Engineers, cryptographers, and hardware benchmarker veterans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl bg-surface-card border border-surface-border space-y-4 text-center"
            >
              <Image
                src={member.avatar}
                alt={member.name}
                width={84}
                height={84}
                className="rounded-full mx-auto object-cover ring-4 ring-fyre-500/20"
              />
              <div className="space-y-1">
                <h3 className="font-bold text-base text-white">{member.name}</h3>
                <div className="text-xs text-fyre-400 font-medium">{member.role}</div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-surface-card via-surface-card to-fyre-950/40 border border-fyre-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-bold text-white">Have a Product You Want Us to Benchmark?</h3>
          <p className="text-xs text-gray-400">
            Reach out to our lab team or pitch hardware for testing.
          </p>
        </div>
        <Link
          href="/contact"
          className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-fyre-500 to-rose-600 hover:from-fyre-600 hover:to-rose-700 shadow-glow transition-all"
        >
          <span>Contact the Lab</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
