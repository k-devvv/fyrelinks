"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Progressive enhancement: content remains visible without JavaScript or motion support. */
export default function ScrollReveal() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !("IntersectionObserver" in window)) return;
    const targets = Array.from(document.querySelectorAll<HTMLElement>(
      ".discovery-grid, .guide-section, .middle-grid, .rss-banner, .editorial-note, .related-section"
    )).filter(element => element.getBoundingClientRect().top > window.innerHeight);
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.remove("reveal-pending");
          observer.unobserve(entry.target);
        }
      }
    }, { rootMargin: "0px 0px 40px 0px", threshold: 0 });
    targets.forEach(element => { element.classList.add("reveal-pending"); observer.observe(element); });
    const revealAll = () => { observer.disconnect(); targets.forEach(element => element.classList.remove("reveal-pending")); };
    preference.addEventListener("change", revealAll);
    return () => { revealAll(); preference.removeEventListener("change", revealAll); };
  }, [pathname]);
  return null;
}
