"use client";

import { useEffect, useRef } from "react";

/** Editorial pointer accent: native cursor remains visible; motion is decorative only. */
export default function PointerAccent() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const element = ring.current;
    if (!finePointer.matches || reducedMotion.matches || !element) return;

    let frame = 0;
    let visible = false;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let previousX = 0;
    let previousY = 0;
    let angle = 0;
    let stretch = 0;

    const animate = () => {
      const dx = targetX - x;
      const dy = targetY - y;
      x += dx * 0.32;
      y += dy * 0.32;

      const stepX = targetX - previousX;
      const stepY = targetY - previousY;
      const speed = Math.min(Math.hypot(stepX, stepY) / 70, 0.16);
      if (Math.hypot(stepX, stepY) > 0.1) angle = Math.atan2(stepY, stepX);
      stretch += (speed - stretch) * 0.2;
      previousX = targetX;
      previousY = targetY;

      element.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${angle}rad) scaleX(${1 + stretch})`;
      if (Math.abs(dx) + Math.abs(dy) > 0.25 || stretch > 0.003) {
        frame = requestAnimationFrame(animate);
      } else {
        frame = 0;
      }
    };

    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!visible) {
        visible = true;
        x = targetX;
        y = targetY;
        previousX = targetX;
        previousY = targetY;
        element.style.opacity = "1";
      }
      if (!frame) frame = requestAnimationFrame(animate);
    };

    const hide = () => {
      visible = false;
      element.style.opacity = "0";
      element.classList.remove("is-over-control");
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const leave = (event: PointerEvent) => {
      if (event.relatedTarget === null) hide();
    };

    const hover = (event: PointerEvent) => {
      const target = event.target;
      const isControl = target instanceof Element && !!target.closest(
        "a,button,[role='button'],input,textarea,select,label",
      );
      element.classList.toggle("is-over-control", isControl);
    };

    const onVisibilityChange = () => {
      if (document.hidden) hide();
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerout", leave, { passive: true });
    window.addEventListener("pointerover", hover, { passive: true });
    window.addEventListener("blur", hide);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerout", leave);
      window.removeEventListener("pointerover", hover);
      window.removeEventListener("blur", hide);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ring} className="pointer-accent-ring" aria-hidden="true" />;
}

