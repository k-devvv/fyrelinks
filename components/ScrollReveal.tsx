"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Progressive enhancement: content remains fully visible without JavaScript or motion support. */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    // Respect user motion preferences
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !("IntersectionObserver" in window)) return;

    // Selector covering main content blocks, cards, and discovery modules
    const selector = [
      ".discovery-grid > a",
      ".guide-grid > .story-card",
      ".category-grid > .story-card",
      ".middle-grid",
      ".news-row",
      ".field-note",
      ".rss-banner",
      ".editorial-note",
      ".article-next-read",
      ".sources-box",
      ".related-section"
    ].join(", ");

    // Only target elements that start below the initial viewport fold
    const viewportThreshold = window.innerHeight * 0.92;
    const targets = Array.from(document.querySelectorAll<HTMLElement>(selector)).filter(
      element => element.getBoundingClientRect().top > viewportThreshold
    );

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.remove("reveal-pending");
            entry.target.classList.add("reveal-settled");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -20px 0px", threshold: 0.08 }
    );

    // Add staggered delay index for sibling cards
    targets.forEach((element, idx) => {
      element.style.setProperty("--stagger-i", String(idx % 3));
      element.classList.add("reveal-pending");
      observer.observe(element);
    });

    const cleanup = () => {
      observer.disconnect();
      targets.forEach(element => {
        element.classList.remove("reveal-pending");
        element.classList.add("reveal-settled");
      });
    };

    preference.addEventListener("change", cleanup);
    return () => {
      cleanup();
      preference.removeEventListener("change", cleanup);
    };
  }, [pathname]);

  return null;
}
