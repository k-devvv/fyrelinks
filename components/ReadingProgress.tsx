"use client";

import { useEffect, useRef } from "react";

/**
 * Restrained, high-performance reading progress bar.
 * Updates DOM style transform via RAF and passive scroll listener with zero React state re-renders.
 * Respects prefers-reduced-motion.
 */
export default function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      bar.style.display = "none";
      return;
    }

    let rafId: number | null = null;

    const updateProgress = () => {
      const doc = document.documentElement;
      const totalScroll = doc.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) {
        bar.style.transform = "scaleX(0)";
        return;
      }
      const currentScroll = window.scrollY;
      const progress = Math.min(Math.max(currentScroll / totalScroll, 0), 1);
      bar.style.transform = `scaleX(${progress})`;
      rafId = null;
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateProgress);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="reading-progress-bar"
      aria-hidden="true"
    />
  );
}
