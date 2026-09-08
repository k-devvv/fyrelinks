import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { FileText, ShieldAlert, Scale, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service & Affiliate Disclosure | FyreLinkz",
  description:
    "Terms of Service, acceptable use guidelines, and FTC affiliate disclosures governing the use of fyrelinkz.com.",
  alternates: {
    canonical: "https://www.fyrelinkz.com/terms",
  },
};

export default function TermsPage() {
  const lastUpdated = "February 28, 2025";

  return (
    <div className="pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pt-8 sm:pt-12">
      {/* Header */}
      <div className="space-y-3 border-b border-surface-border pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-fyre-400">
          <Scale className="w-4 h-4" />
          <span>Terms of Use & Legal Agreements</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
          Terms of Service
        </h1>
        <p className="text-xs text-gray-400">
          Effective Date: January 1, 2024 • Last Updated: {lastUpdated}
        </p>
      </div>

      {/* Narrative Terms */}
      <div className="space-y-8 text-sm text-gray-300 leading-relaxed font-sans">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">1. Agreement to Terms</h2>
          <p>
            By accessing or browsing <strong className="text-white">fyrelinkz.com</strong> (the &ldquo;Site&rdquo;), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any portion of these terms, you must discontinue use of this website immediately.
          </p>
        </section>

        {/* FTC Affiliate Disclosure Section */}
        <section id="affiliate-disclosure" className="p-6 rounded-3xl bg-surface-card border border-fyre-500/40 space-y-3">
          <div className="flex items-center gap-2 text-fyre-400 font-bold text-xs uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>Mandatory FTC Disclosure</span>
          </div>
          <h2 className="text-xl font-bold text-white">
            2. Affiliate Compensation & Commercial Relationships
          </h2>
          <p>
            In compliance with the United States Federal Trade Commission (FTC) Guides Concerning the Use of Endorsements and Testimonials in Advertising (16 CFR Part 255), please be advised:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li>
              FyreLinkz is an independent reader-supported publication. Certain outbound links to merchant platforms (such as Amazon, software vendors, and retail stores) are affiliate links.
            </li>
            <li>
              When you click on these links and complete a purchase or subscription, FyreLinkz may receive an affiliate referral fee or commission.
            </li>
            <li>
              This commission comes at <strong className="text-white">zero additional cost to you</strong>. In many cases, we negotiate exclusive reader discounts or coupon codes that provide lower prices than standard retail.
            </li>
            <li>
              <strong className="text-white">Editorial Independence Guarantee:</strong> Our benchmark scores, product awards, &ldquo;Editor&apos;s Choice&rdquo; selections, and reviews are generated solely by our editorial staff through objective laboratory testing. We never accept payment to write positive reviews or suppress negative findings.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">3. Intellectual Property Rights</h2>
          <p>
            All original text, technical benchmarks, photographs, graphics, trademarks, logos, audio analyses, and code on fyrelinkz.com are the proprietary intellectual property of FyreLinkz Media Inc. or our content licensors.
          </p>
          <p>
            You may not scrape, republish, redistribute, or commercially exploit our proprietary benchmark data or written reviews without explicit prior written authorization. Fair use quoting with prominent attribution and direct hyperlink to fyrelinkz.com is permitted.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">4. Pricing & Merchant Accuracy Disclaimer</h2>
          <p>
            While our editorial and automated indexing systems verify retail prices, discounts, and inventory status daily, merchant prices fluctuate continuously. FyreLinkz cannot guarantee that a listed price, discount code, or stock availability will be honored by third-party retailers at the moment of your visit. Always verify the final checkout price on the merchant&apos;s official checkout page before completing a purchase.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">5. Disclaimer of Warranties</h2>
          <p>
            The content, benchmarks, and guides on fyrelinkz.com are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, whether express or implied. FyreLinkz makes no warranty that our test results will guarantee identical real-world battery life, compile speeds, or performance in your specific computing environment.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">6. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, FyreLinkz Media Inc., its editors, founders, contractors, and affiliates shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use this website, purchased hardware, or recommended software.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">7. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law principles.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">8. Inquiries & Legal Notices</h2>
          <p>
            For legal notices or questions regarding these Terms of Service, please contact:
          </p>
          <div className="p-4 rounded-2xl bg-surface-card border border-surface-border text-xs font-mono text-gray-300">
            FyreLinkz Media Inc.<br />
            Attn: Legal Department<br />
            Email: legal@fyrelinkz.com<br />
            Address: 548 Market St, Suite 89201, San Francisco, CA 94104
          </div>
        </section>
      </div>
    </div>
  );
}
