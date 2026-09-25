"use client";

import { useEffect, useRef } from "react";

/** Fine-pointer flourish. Tracks motion only; never overrides the native cursor. */
export default function PointerAccent() {
  const orb = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches || !orb.current) return;

    const element = orb.current;
    let frame = 0;
    let targetX = 0, targetY = 0, x = 0, y = 0;
    const animate = () => {
      x += (targetX - x) * .24;
      y += (targetY - y) * .24;
      element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > .5) frame = requestAnimationFrame(animate);
      else frame = 0;
    };
    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      element.style.opacity = "1";
      if (!frame) frame = requestAnimationFrame(animate);
    };
    const leave = (event: PointerEvent) => {
      if (event.relatedTarget === null) element.style.opacity = "0";
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerout", leave, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerout", leave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={orb} className="pointer-accent-orb" aria-hidden="true" />;
}
