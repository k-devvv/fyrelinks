"use client";

import React, { useState } from "react";
import { Mail, Send, CheckCircle2, MessageSquare, Building, ShieldCheck, Sparkles } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("editorial");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pt-8 sm:pt-12">
      {/* Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fyre-500/10 border border-fyre-500/30 text-fyre-400 text-xs font-bold uppercase tracking-wider">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
          Contact the FyreLinkz Lab
        </h1>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
          Whether you have an editorial correction, want to suggest hardware for stress-testing, or have partnership inquiries, our team is here.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Information & Channels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-surface-card border border-surface-border space-y-4">
            <h2 className="text-lg font-bold text-white">Direct Lab Channels</h2>

            <div className="space-y-3 text-xs text-gray-300">
              <div className="p-3 rounded-xl bg-surface border border-surface-border space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-fyre-400" />
                  <span>Editorial & Benchmarks</span>
                </div>
                <div className="text-gray-400 font-mono">editorial@fyrelinkz.com</div>
                <div className="text-[10px] text-gray-500">For corrections, benchmark suggestions & pitches.</div>
              </div>

              <div className="p-3 rounded-xl bg-surface border border-surface-border space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-blue-400" />
                  <span>Partnerships & Affiliates</span>
                </div>
                <div className="text-gray-400 font-mono">partnerships@fyrelinkz.com</div>
                <div className="text-[10px] text-gray-500">For affiliate networks & verified merchants.</div>
              </div>

              <div className="p-3 rounded-xl bg-surface border border-surface-border space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Security Vulnerabilities</span>
                </div>
                <div className="text-gray-400 font-mono">security@fyrelinkz.com</div>
                <div className="text-[10px] text-gray-500">PGP key available upon request.</div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-surface-card border border-surface-border space-y-2 text-xs text-gray-400">
            <div className="font-bold text-white text-sm">Review Unit Policy Note:</div>
            <p className="leading-relaxed">
              We do not accept paid reviews or sponsored product coverage. Any unsolicited evaluation units sent to our laboratory become property of FyreLinkz and will be subjected to the same objective testing as retail-purchased hardware.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-surface-border shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Dispatched</h3>
                <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, {name}. Our editorial and benchmark team will review your message and reply within 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-fyre-400 bg-surface border border-surface-border hover:bg-surface-hover transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-white">Send Us a Message</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="w-full px-4 py-2.5 rounded-xl bg-surface border border-surface-border text-white text-sm placeholder-gray-500 focus:outline-none focus:border-fyre-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300">Your Work Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-surface border border-surface-border text-white text-sm placeholder-gray-500 focus:outline-none focus:border-fyre-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Subject Category</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface border border-surface-border text-white text-sm focus:outline-none focus:border-fyre-500 transition-colors"
                  >
                    <option value="editorial">Editorial Correction or Benchmark Suggestion</option>
                    <option value="pitch">Pitch Product or Software for Lab Testing</option>
                    <option value="partnership">Affiliate & Commercial Partnership</option>
                    <option value="press">Press & Media Inquiries</option>
                    <option value="general">General Question or Feedback</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide detailed information, product links, or benchmark reproduction steps..."
                    className="w-full px-4 py-3 rounded-xl bg-surface border border-surface-border text-white text-sm placeholder-gray-500 focus:outline-none focus:border-fyre-500 transition-colors resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-fyre-500 to-rose-600 hover:from-fyre-600 hover:to-rose-700 shadow-glow transition-all duration-200"
                >
                  <span>Submit Inquiry</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
