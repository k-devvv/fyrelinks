"use client";

import { useEffect, useRef } from "react";

/** Fine-pointer flourish. Tracks motion only; never overrides the native cursor. */
export default function PointerAccent() {
  const orb = useRef<HTMLDivElement>(null);
  const trail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches || !orb.current || !trail.current) return;

    const element = orb.current;
    const trailElement = trail.current;
    let frame = 0;
    let targetX = 0, targetY = 0, x = 0, y = 0, trailX = 0, trailY = 0;
    const animate = () => {
      x += (targetX - x) * .24;
      y += (targetY - y) * .24;
      trailX += (targetX - trailX) * .12;
      trailY += (targetY - trailY) * .12;
      element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      trailElement.style.transform = `translate3d(${trailX}px, ${trailY}px, 0)`;
      if (Math.abs(targetX - x) + Math.abs(targetY - y) + Math.abs(targetX - trailX) + Math.abs(targetY - trailY) > .5) frame = requestAnimationFrame(animate);
      else frame = 0;
    };
    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      element.style.opacity = "1";
      trailElement.style.opacity = "1";
      if (!frame) frame = requestAnimationFrame(animate);
    };
    const leave = (event: PointerEvent) => {
      if (event.relatedTarget === null) {
        element.style.opacity = "0";
        trailElement.style.opacity = "0";
      }
    };
    const hover = (event: PointerEvent) => {
      const isInteractive = event.target instanceof Element && !!event.target.closest("a,button,[role='button'],input,textarea,select,label");
      element.classList.toggle("is-over-link", isInteractive);
      trailElement.classList.toggle("is-over-link", isInteractive);
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerout", leave, { passive: true });
    window.addEventListener("pointerover", hover, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerout", leave);
      window.removeEventListener("pointerover", hover);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <><div ref={trail} className="pointer-accent-trail" aria-hidden="true" /><div ref={orb} className="pointer-accent-orb" aria-hidden="true" /></>;
}
