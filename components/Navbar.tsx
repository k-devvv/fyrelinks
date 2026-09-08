"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Flame,
  Search,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { POSTS } from "@/lib/posts";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Scroll detection for header border
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const searchResults = searchQuery.trim()
    ? POSTS.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.metaDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.badge?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
      ).slice(0, 5)
    : [];

  const navLinks = [
    { label: "Reviews", href: "/create", description: "AI Video & Diffusion Models" },
    { label: "Comparisons", href: "/stack", description: "Cloud APIs vs Local Compute" },
    { label: "Hardware", href: "/hardware", description: "Workstations & GPUs" },
    { label: "Guides", href: "/workflow", description: "ComfyUI & Systems Workflows" },
    { label: "About", href: "/about", description: "Editorial Standards & Methodology" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-surface-border shadow-md"
            : "bg-background/80 backdrop-blur-sm border-b border-surface-border/60"
        }`}
      >
        {/* Top Mini Announcement / Transparency Strip */}
        <div className="hidden md:flex items-center justify-between px-4 sm:px-6 lg:px-8 py-1.5 bg-surface/50 border-b border-surface-border/40 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span className="flex h-1.5 w-1.5 rounded-full bg-fyre-500" />
            <span className="font-medium text-gray-300">FyreLinkz:</span>
            <span>Practical guides, model comparisons & compute economics for AI creators</span>
          </div>
          <div className="flex items-center gap-4 text-gray-400 text-[11px]">
            <Link href="/about" className="hover:text-fyre-400 transition-colors">
              Editorial Standards
            </Link>
            <span>•</span>
            <span className="text-gray-500">Reader-Supported Publication</span>
          </div>
        </div>

        {/* Main Nav Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-fyre-500/15 border border-fyre-500/30 text-fyre-400 group-hover:bg-fyre-500/25 transition-colors">
              <Flame className="w-4 h-4 text-fyre-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tight text-white font-sans leading-none">
                FYRE<span className="text-fyre-500">LINKZ</span>
              </span>
              <span className="text-[9px] text-gray-400 tracking-wider font-mono mt-0.5 hidden sm:block">
                AI CREATOR & COMPUTE GUIDES
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/about"
                  ? pathname === "/about"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    isActive
                      ? "text-fyre-400 bg-fyre-500/10"
                      : "text-gray-300 hover:text-white hover:bg-surface-hover"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Search trigger & Mobile Menu Button */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search reviews and guides"
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-400 hover:text-white bg-surface-card hover:bg-surface-hover border border-surface-border rounded-xl transition-all"
            >
              <Search className="w-3.5 h-3.5 text-gray-400" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-gray-400 bg-surface rounded border border-surface-border">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-surface-hover"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-surface-border bg-surface-card px-4 pt-2 pb-5 space-y-3">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-200 hover:text-white hover:bg-surface-hover"
                >
                  <div>
                    <span className="font-semibold text-white block">{link.label}</span>
                    <span className="text-xs text-gray-400">{link.description}</span>
                  </div>
                  <span className="text-xs text-gray-500">→</span>
                </Link>
              ))}
            </div>

            <div className="border-t border-surface-border pt-3 flex flex-wrap gap-4 text-xs text-gray-400 px-3">
              <Link href="/about" className="hover:text-white">About & Methodology</Link>
              <Link href="/contact" className="hover:text-white">Contact</Link>
              <Link href="/privacy" className="hover:text-white">Privacy</Link>
              <Link href="/terms" className="hover:text-white">Terms</Link>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal Overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-surface-card border border-surface-border rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3 border-b border-surface-border gap-3 bg-surface">
              <Search className="w-4 h-4 text-fyre-400 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search models, guides, ComfyUI, hardware..."
                className="w-full bg-transparent text-white placeholder-gray-400 text-sm focus:outline-none"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 text-gray-400 hover:text-white rounded-md hover:bg-surface-hover"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto p-4 space-y-2">
              {searchQuery.trim() === "" ? (
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                    Featured Guides & Teardowns
                  </p>
                  <div className="space-y-1.5">
                    {POSTS.slice(0, 4).map((post) => (
                      <Link
                        key={post.slug}
                        href={`/${post.category}/${post.slug}`}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-surface hover:bg-surface-hover border border-surface-border transition-colors group"
                      >
                        <div className="space-y-0.5">
                          <div className="text-xs font-semibold text-white group-hover:text-fyre-400 transition-colors">
                            {post.title}
                          </div>
                          <div className="text-[11px] text-gray-400">
                            {post.evidenceBasis || "Guide"} • {post.category.toUpperCase()}
                          </div>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                    {searchResults.length} Match{searchResults.length > 1 ? "es" : ""} Found
                  </p>
                  {searchResults.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/${post.category}/${post.slug}`}
                      className="flex items-center justify-between p-3 rounded-xl bg-surface hover:bg-surface-hover border border-surface-border transition-colors group"
                    >
                      <div className="space-y-1">
                        <span className="text-xs font-semibold text-white group-hover:text-fyre-400 transition-colors">
                          {post.title}
                        </span>
                        <p className="text-xs text-gray-400 line-clamp-1">{post.metaDescription}</p>
                      </div>
                      <span className="text-xs text-fyre-400 font-medium shrink-0 ml-2">Read →</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-gray-400 text-sm">
                  No guides matched &ldquo;{searchQuery}&rdquo;. Try searching for &ldquo;MiniMax&rdquo;, &ldquo;FLUX&rdquo;, or &ldquo;ComfyUI&rdquo;.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
