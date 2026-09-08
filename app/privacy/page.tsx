import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | FyreLinkz",
  description:
    "Comprehensive Privacy Policy for fyrelinkz.com. Learn how we handle telemetry, cookies, affiliate network tracking tags, and your GDPR/CCPA consumer rights.",
  alternates: {
    canonical: "https://fyrelinkz.com/privacy",
  },
};

export default function PrivacyPage() {
  const lastUpdated = "February 28, 2025";

  return (
    <div className="pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pt-8 sm:pt-12">
      {/* Header */}
      <div className="space-y-3 border-b border-surface-border pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-fyre-400">
          <Shield className="w-4 h-4" />
          <span>Legal Compliance & Data Protection</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
          Privacy Policy
        </h1>
        <p className="text-xs text-gray-400">
          Effective Date: January 1, 2024 • Last Updated: {lastUpdated}
        </p>
      </div>

      {/* Narrative Policy */}
      <div className="space-y-8 text-sm text-gray-300 leading-relaxed font-sans">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">1. Introduction</h2>
          <p>
            Welcome to FyreLinkz (&ldquo;FyreLinkz,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We operate{" "}
            <strong className="text-white">fyrelinkz.com</strong> (the &ldquo;Site&rdquo;). FyreLinkz is committed to protecting your personal privacy. This Privacy Policy explains what information we collect, how we process it, and how your privacy is protected when you browse our tech reviews, benchmarks, and affiliate recommendations.
          </p>
          <p>
            By accessing or using fyrelinkz.com, you consent to the data collection and usage practices described herein.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">2. Information We Collect</h2>
          <p>We collect minimal personal information to provide our services:</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li>
              <strong className="text-white">Voluntarily Provided Information:</strong> When you subscribe to our weekly deals briefing, submit a contact form, or pitch hardware, we collect your name, email address, and message contents.
            </li>
            <li>
              <strong className="text-white">Log & Telemetry Data:</strong> When you access our servers, we automatically record non-identifying technical data including your IP address (anonymized), browser user agent, operating system, referrer URL, and timestamp.
            </li>
            <li>
              <strong className="text-white">Cookies and Web Storage:</strong> We use local storage and cookies to remember user preferences (such as dark mode preferences and search query histories).
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">3. Affiliate Tracking & Third-Party Cookies</h2>
          <p>
            FyreLinkz participates in multiple affiliate marketing networks (including Amazon Associates, Impact, CJ Affiliate, ShareASale, and direct software partnerships). When you click on an external link to purchase a product or service, our site may attach a unique affiliate tracking parameter or redirect through an affiliate network.
          </p>
          <p>
            These third-party merchants may drop a tracking cookie on your browser to credit FyreLinkz with a commission if you make a purchase within a designated attribution window (typically 24 hours to 90 days). These cookies do not contain personally identifiable information such as your name, credit card details, or physical address.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">4. How We Use Your Information</h2>
          <p>We process collected data solely for the following legitimate purposes:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-300">
            <li>To deliver weekly email newsletters and verified discounts (with 1-click unsubscribe).</li>
            <li>To respond to editorial inquiries, test requests, and support messages.</li>
            <li>To monitor site reliability, prevent automated DDOS attacks, and analyze aggregate reader traffic trends.</li>
            <li>To comply with FTC requirements and applicable statutory legal obligations.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">5. GDPR & CCPA Compliance Rights</h2>
          <p>
            Depending on your physical location (such as the European Economic Area, the United Kingdom, or the State of California), you possess statutory rights regarding your personal data:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-surface-card border border-surface-border space-y-1">
              <h3 className="font-bold text-white text-sm">Right to Access & Portability</h3>
              <p className="text-xs text-gray-400">
                You may request a copy of any personal data we store about you in machine-readable format.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-surface-card border border-surface-border space-y-1">
              <h3 className="font-bold text-white text-sm">Right to Erasure (To Be Forgotten)</h3>
              <p className="text-xs text-gray-400">
                You can request immediate deletion of your email address from our subscriber records.
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-400 pt-2">
            We do not sell personal data to data brokers or advertising exchanges under California CCPA definitions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">6. Security & Data Retention</h2>
          <p>
            We implement TLS 1.3 encryption across all connections. Server infrastructure is hosted in SOC 2 Type II compliant facilities. We retain newsletter subscriber emails only until unsubscribed, after which they are permanently purged within 30 days.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">7. Privacy Officer Contact</h2>
          <p>
            If you have questions or wish to exercise your data privacy rights, please contact our Data Protection Officer at:
          </p>
          <div className="p-4 rounded-2xl bg-surface-card border border-surface-border text-xs font-mono text-gray-300">
            FyreLinkz Media Inc.<br />
            Attn: Data Privacy Officer<br />
            Email: privacy@fyrelinkz.com<br />
            Address: 548 Market St, Suite 89201, San Francisco, CA 94104
          </div>
        </section>
      </div>
    </div>
  );
}
