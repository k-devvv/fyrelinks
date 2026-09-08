"use client";

import React, { useState } from "react";
import { Mail, Send, CheckCircle2, MessageSquare, Building, ShieldCheck } from "lucide-react";

export const dynamic = "force-static";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Editorial Correction or Feedback");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      // Direct mailto dispatch to ensure user message is never lost
      const mailtoUrl = `mailto:editorial@fyrelinkz.com?subject=${encodeURIComponent(
        `[FyreLinkz Contact] ${subject} - from ${name}`
      )}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nCategory: ${subject}\n\nMessage:\n${message}`
      )}`;
      window.location.href = mailtoUrl;
      setSubmitted(true);
    }
  };

  return (
    <div className="pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pt-8 sm:pt-12">
      {/* Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fyre-500/10 border border-fyre-500/30 text-fyre-400 text-xs font-semibold uppercase tracking-wider">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Contact FyreLinkz</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
          Get in Touch with the Editorial Desk
        </h1>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
          Have an editorial correction, workflow question, or partnership inquiry? Reach out directly to our team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Information & Direct Channels */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-4">
            <h2 className="text-base font-bold text-white">Direct Email Desks</h2>

            <div className="space-y-3 text-xs text-gray-300">
              <a
                href="mailto:editorial@fyrelinkz.com"
                className="block p-3.5 rounded-xl bg-surface border border-surface-border hover:border-fyre-500/40 transition-colors space-y-1"
              >
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-fyre-400" />
                  <span>Editorial & Corrections</span>
                </div>
                <div className="text-fyre-400 font-mono">editorial@fyrelinkz.com</div>
                <div className="text-[11px] text-gray-400">For article feedback, corrections, and tool suggestions.</div>
              </a>

              <a
                href="mailto:partnerships@fyrelinkz.com"
                className="block p-3.5 rounded-xl bg-surface border border-surface-border hover:border-fyre-500/40 transition-colors space-y-1"
              >
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-blue-400" />
                  <span>Partnerships & Commercial</span>
                </div>
                <div className="text-blue-400 font-mono">partnerships@fyrelinkz.com</div>
                <div className="text-[11px] text-gray-400">For affiliate relationships and sponsorship inquiries.</div>
              </a>

              <div className="p-3.5 rounded-xl bg-surface border border-surface-border space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Response Time Commitment</span>
                </div>
                <div className="text-[11px] text-gray-400">
                  Our editorial staff reviews and replies to all genuine technical inquiries within 1–2 business days.
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-2 text-xs text-gray-400">
            <div className="font-bold text-white text-xs">Editorial Policy Notice:</div>
            <p className="leading-relaxed text-[11px]">
              We do not accept sponsored reviews or guaranteed placement fees. All products, tools, and platforms are evaluated independently based on technical merit and observable performance.
            </p>
          </div>
        </div>

        {/* Contact Form with mailto client dispatch */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl bg-surface-card border border-surface-border shadow-xl">
            {submitted ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Email Client Dispatched</h3>
                <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                  Your default email application has opened with your message pre-populated. If it did not open automatically, please send your email directly to <strong className="text-white">editorial@fyrelinkz.com</strong>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-fyre-400 bg-surface border border-surface-border hover:bg-surface-hover transition-colors"
                >
                  Compose Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-white">Send a Message to the Desk</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="w-full px-3.5 py-2 rounded-xl bg-surface border border-surface-border text-white text-xs placeholder-gray-500 focus:outline-none focus:border-fyre-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300">Your Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full px-3.5 py-2 rounded-xl bg-surface border border-surface-border text-white text-xs placeholder-gray-500 focus:outline-none focus:border-fyre-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Inquiry Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-surface border border-surface-border text-white text-xs focus:outline-none focus:border-fyre-500 transition-colors"
                  >
                    <option value="Editorial Correction or Feedback">Editorial Correction or Feedback</option>
                    <option value="Tool or Model Suggestion">Suggest an AI Video / Diffusion Tool</option>
                    <option value="Hardware Architecture Question">Hardware / Workstation Question</option>
                    <option value="Partnership Inquiry">Commercial or Affiliate Partnership</option>
                    <option value="General Question">General Question</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Your Message</label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your question, correction, or tool suggestion in detail..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-surface-border text-white text-xs placeholder-gray-500 focus:outline-none focus:border-fyre-500 transition-colors resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs text-white bg-fyre-500 hover:bg-fyre-600 transition-colors"
                >
                  <span>Dispatch Message via Email</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
