"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Flame,
  Search,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  Laptop,
  Home,
  Headphones,
  Zap,
  ExternalLink,
} from "lucide-react";
import { CATEGORIES, POSTS } from "@/lib/posts";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Scroll detection for sticky header shadow
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
          p.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "ai-tools":
        return <Sparkles className="w-4 h-4 text-orange-400" />;
      case "developer-hardware":
        return <Laptop className="w-4 h-4 text-blue-400" />;
      case "smart-home":
        return <Home className="w-4 h-4 text-emerald-400" />;
      case "cybersecurity":
        return <ShieldCheck className="w-4 h-4 text-purple-400" />;
      case "audio-gear":
        return <Headphones className="w-4 h-4 text-pink-400" />;
      default:
        return <Zap className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-surface-border shadow-lg shadow-black/40"
            : "bg-background/70 backdrop-blur-sm border-b border-surface-border/50"
        }`}
      >
        {/* Top Mini Banner */}
        <div className="hidden md:flex items-center justify-between px-4 sm:px-6 lg:px-8 py-1.5 bg-gradient-to-r from-fyre-950/60 via-surface to-fyre-950/60 border-b border-surface-border/40 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-fyre-500 animate-pulse" />
            <span className="font-medium text-gray-300">Lab Tested 2025:</span>
            <span>100% Independent Hardware & Software Benchmarks</span>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <Link href="/about" className="hover:text-fyre-400 transition-colors">
              Editorial Policy
            </Link>
            <span>•</span>
            <span className="text-gray-500">FTC Reader Supported Disclosure</span>
          </div>
        </div>

        {/* Main Nav Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-fyre-500 to-rose-600 shadow-glow group-hover:shadow-glow-lg transition-all duration-300">
              <Flame className="w-5 h-5 text-white animate-bounce" style={{ animationDuration: "2.5s" }} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                  FYRE<span className="text-fyre-500">LINKZ</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-wide uppercase bg-fyre-500/10 text-fyre-400 border border-fyre-500/30 rounded-md">
                  PRO
                </span>
              </div>
              <span className="text-[10px] text-gray-400 tracking-wider -mt-1 hidden sm:block">
                VERIFIED TECH REVIEWS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* Categories Dropdown */}
            <div className="relative group">
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-surface-hover transition-colors"
              >
                <span>Categories</span>
                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute left-0 top-full mt-1 w-64 p-2 bg-surface-card border border-surface-border rounded-xl shadow-2xl backdrop-blur-xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-2 py-1 mb-1">
                  Product Verticals
                </div>
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/${cat.slug}`}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-surface-hover transition-colors group/item"
                  >
                    <div className="p-1.5 rounded-md bg-surface-border/50 group-hover/item:bg-surface-border transition-colors">
                      {getCategoryIcon(cat.id)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-xs text-white">{cat.name}</span>
                      <span className="text-[10px] text-gray-400 line-clamp-1">{cat.shortDescription}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Direct Links */}
            {CATEGORIES.slice(0, 3).map((cat) => (
              <Link
                key={cat.id}
                href={`/${cat.slug}`}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  pathname.startsWith(`/${cat.slug}`)
                    ? "text-fyre-400 bg-fyre-500/10 font-semibold"
                    : "text-gray-300 hover:text-white hover:bg-surface-hover"
                }`}
              >
                {cat.name.split("&")[0].trim()}
              </Link>
            ))}

            <Link
              href="/about"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === "/about"
                  ? "text-fyre-400 bg-fyre-500/10 font-semibold"
                  : "text-gray-300 hover:text-white hover:bg-surface-hover"
              }`}
            >
              Methodology
            </Link>

            <Link
              href="/contact"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === "/contact"
                  ? "text-fyre-400 bg-fyre-500/10 font-semibold"
                  : "text-gray-300 hover:text-white hover:bg-surface-hover"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Actions: Search trigger & CTA */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search reviews"
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white bg-surface-card hover:bg-surface-hover border border-surface-border rounded-xl transition-all"
            >
              <Search className="w-4 h-4 text-gray-400" />
              <span className="hidden sm:inline text-xs text-gray-400">Search reviews...</span>
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-gray-400 bg-surface rounded border border-surface-border">
                ⌘K
              </kbd>
            </button>

            <Link
              href="/#trending"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-fyre-500 to-rose-600 hover:from-fyre-600 hover:to-rose-700 rounded-xl shadow-glow transition-all duration-200"
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>Top Verdicts</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-surface-hover"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-surface-border bg-surface-card/95 backdrop-blur-xl px-4 pt-2 pb-6 space-y-4">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 py-1">
                Browse Categories
              </div>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/${cat.slug}`}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-gray-200 hover:text-white hover:bg-surface-hover"
                >
                  <div className="flex items-center gap-2.5">
                    {getCategoryIcon(cat.id)}
                    <span>{cat.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">→</span>
                </Link>
              ))}
            </div>

            <div className="border-t border-surface-border/60 pt-3 space-y-1">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 py-1">
                Information & Lab
              </div>
              <Link
                href="/about"
                className="block px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-surface-hover"
              >
                About & Testing Methodology
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-surface-hover"
              >
                Contact & Pitch Gear
              </Link>
              <Link
                href="/privacy"
                className="block px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-surface-hover"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="block px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-surface-hover"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="w-full max-w-2xl bg-surface-card border border-surface-border rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-surface-border gap-3 bg-surface">
              <Search className="w-5 h-5 text-fyre-400 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, reviews, categories, or benchmarks..."
                className="w-full bg-transparent text-white placeholder-gray-400 text-sm focus:outline-none"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 text-gray-400 hover:text-white rounded-md hover:bg-surface-hover"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Live Results or Suggestions */}
            <div className="max-h-96 overflow-y-auto p-4 space-y-3">
              {searchQuery.trim() === "" ? (
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                    Popular In-Depth Reviews
                  </p>
                  <div className="space-y-2">
                    {POSTS.slice(0, 3).map((post) => (
                      <Link
                        key={post.id}
                        href={`/${post.category}/${post.slug}`}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-surface hover:bg-surface-hover border border-surface-border transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-fyre-500/10 text-fyre-400 font-bold text-xs">
                            {post.verdict.score}
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-white group-hover:text-fyre-400 transition-colors">
                              {post.title}
                            </div>
                            <div className="text-[11px] text-gray-400">
                              {post.categoryName} • {post.product.price}
                            </div>
                          </div>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                    {searchResults.length} Match{searchResults.length > 1 ? "es" : ""} Found
                  </p>
                  {searchResults.map((post) => (
                    <Link
                      key={post.id}
                      href={`/${post.category}/${post.slug}`}
                      className="flex items-center justify-between p-3 rounded-xl bg-surface hover:bg-surface-hover border border-surface-border transition-colors group"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-fyre-500/20 text-fyre-400">
                            ★ {post.verdict.score}
                          </span>
                          <span className="text-xs font-semibold text-white group-hover:text-fyre-400 transition-colors">
                            {post.product.name}
                          </span>
                          <span className="text-xs text-gray-400 font-mono">({post.product.price})</span>
                        </div>
                        <p className="text-xs text-gray-300 line-clamp-1">{post.title}</p>
                      </div>
                      <span className="text-xs text-fyre-400 font-medium">Read Review →</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-gray-400 text-sm">
                  No reviews matched &ldquo;{searchQuery}&rdquo;. Try searching for &ldquo;Cursor&rdquo;, &ldquo;MacBook&rdquo;, or &ldquo;VPN&rdquo;.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
