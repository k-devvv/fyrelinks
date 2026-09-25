"use client";

import { useEffect, useRef } from "react";

/**
 * Accessible pointer accent for devices with fine pointer and hover support.
 * - pointer-events: none (never interferes with clicks, selections, or inputs)
 * - Zero React re-renders on pointer movement (direct DOM transform via RAF lerp)
 * - Completely inactive on touch devices, mobile, or when prefers-reduced-motion is active
 * - Fades out smoothly when pointer leaves the window
 */
export default function PointerAccent() {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Guard against touch / non-fine pointer environments
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!hasFinePointer) return;

    // 2. Guard against prefers-reduced-motion
    const motionPref = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPref.matches) return;

    const orb = orbRef.current;
    if (!orb) return;

    let targetX = -500;
    let targetY = -500;
    let currentX = -500;
    let currentY = -500;
    let isVisible = false;
    let rafId: number | null = null;

    const onPointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        orb.style.opacity = "1";
      }
    };

    const onPointerLeave = () => {
      isVisible = false;
      orb.style.opacity = "0";
    };

    const animate = () => {
      // Lerp easing towards cursor position
      const ease = 0.16;
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      orb.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      rafId = window.requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("mouseleave", onPointerLeave);
    document.addEventListener("pointerleave", onPointerLeave);

    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseleave", onPointerLeave);
      document.removeEventListener("pointerleave", onPointerLeave);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div
      ref={orbRef}
      className="pointer-accent-orb"
      aria-hidden="true"
    />
  );
}
