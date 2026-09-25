"use client";

import { useEffect, useRef } from "react";
import type * as Three from "three";

/** Decorative WebGL, loaded after content. The SVG remains if WebGL is unavailable. */
export default function ComputeVisual() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = host.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (!container || motion.matches || connection?.saveData || /^(slow-)?2g$/.test(connection?.effectiveType ?? "")) return;

    let disposed = false;
    let visible = false;
    let frame = 0;
    let lastFrame = 0;
    let renderer: Three.WebGLRenderer | undefined;
    let camera: Three.PerspectiveCamera | undefined;
    let scene: Three.Scene | undefined;
    let sculpture: Three.Group | undefined;
    let observer: IntersectionObserver | undefined;
    let resizeObserver: ResizeObserver | undefined;
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    let cleanUpRendererEvents = () => {};

    const stop = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const render = (time: number) => {
      if (disposed || !visible || document.hidden || !renderer || !scene || !camera || !sculpture) {
        frame = 0;
        return;
      }
      frame = window.requestAnimationFrame(render);
      if (time - lastFrame < 32) return;
      lastFrame = time;
      pointerX += (targetX - pointerX) * .045;
      pointerY += (targetY - pointerY) * .045;
      sculpture.rotation.y = time * .00012 + pointerX * .12;
      sculpture.rotation.x = pointerY * .1;
      renderer.render(scene, camera);
    };

    const start = () => {
      if (!frame && visible && !document.hidden && !disposed) frame = window.requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = container.getBoundingClientRect();
      targetX = ((event.clientX - bounds.left) / bounds.width - .5) * 2;
      targetY = ((event.clientY - bounds.top) / bounds.height - .5) * 2;
    };
    const onPointerLeave = () => { targetX = 0; targetY = 0; };
    const onVisibilityChange = () => document.hidden ? stop() : start();

    const initTimer = window.setTimeout(() => {
      import("three").then((module) => {
        if (disposed || !host.current) return;
        const width = container.clientWidth || 360;
        const height = container.clientHeight || 260;
        renderer = new module.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.35));
        renderer.setSize(width, height);
        renderer.domElement.className = "compute-visual-canvas";
        renderer.domElement.setAttribute("aria-hidden", "true");
        container.appendChild(renderer.domElement);

        scene = new module.Scene();
        camera = new module.PerspectiveCamera(37, width / height, .1, 50);
        camera.position.set(0, 0, 7.5);
        sculpture = new module.Group();

        const brass = new module.LineBasicMaterial({ color: 0xb77b45, transparent: true, opacity: .76 });
        const ember = new module.LineBasicMaterial({ color: 0xd9502b, transparent: true, opacity: .82 });
        const pearl = new module.MeshBasicMaterial({ color: 0x986438, wireframe: true, transparent: true, opacity: .48 });
        const rings = [
          { radius: 1.45, tube: .013, rotation: [0, 0, 0] },
          { radius: 1.2, tube: .017, rotation: [.83, .2, -.36] },
          { radius: 1.64, tube: .012, rotation: [-.72, .28, .44] }
        ] as const;
        for (const [index, ring] of rings.entries()) {
          const mesh = new module.Mesh(new module.TorusGeometry(ring.radius, ring.tube, 5, 160), index === 1 ? ember : brass);
          mesh.rotation.set(ring.rotation[0], ring.rotation[1], ring.rotation[2]);
          sculpture.add(mesh);
        }
        const core = new module.Mesh(new module.IcosahedronGeometry(.53, 1), pearl);
        sculpture.add(core);

        const seed = new module.SphereGeometry(.052, 10, 8);
        const seedMaterial = new module.MeshBasicMaterial({ color: 0xd9502b });
        for (let i = 0; i < 7; i++) {
          const angle = i / 7 * Math.PI * 2;
          const bead = new module.Mesh(seed, seedMaterial);
          bead.position.set(Math.cos(angle) * 1.82, Math.sin(angle) * .88, Math.sin(angle + 1) * .42);
          sculpture.add(bead);
        }
        scene.add(sculpture);

        const resize = () => {
          if (!renderer || !camera) return;
          const w = container.clientWidth, h = container.clientHeight;
          if (!w || !h) return;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        };
        const contextLost = (event: Event) => { event.preventDefault(); stop(); };
        const contextRestored = () => { resize(); start(); };

        renderer.domElement.addEventListener("webglcontextlost", contextLost);
        renderer.domElement.addEventListener("webglcontextrestored", contextRestored);
        cleanUpRendererEvents = () => {
          renderer?.domElement.removeEventListener("webglcontextlost", contextLost);
          renderer?.domElement.removeEventListener("webglcontextrestored", contextRestored);
        };
        container.addEventListener("pointermove", onPointerMove, { passive: true });
        container.addEventListener("pointerleave", onPointerLeave);
        document.addEventListener("visibilitychange", onVisibilityChange);
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(container);
        observer = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          visible ? start() : stop();
        }, { threshold: .05 });
        observer.observe(container);

      }).catch(() => { /* Keep the visible SVG fallback. */ });
    }, 220);

    return () => {
      disposed = true;
      window.clearTimeout(initTimer);
      stop();
      observer?.disconnect();
      resizeObserver?.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      cleanUpRendererEvents();
      scene?.traverse((object) => {
        if (object.type === "Mesh" || object.type === "Line" || object.type === "Points") {
          const mesh = object as Three.Mesh;
          mesh.geometry.dispose();
          const material = mesh.material;
          if (Array.isArray(material)) material.forEach((item) => item.dispose());
          else material.dispose();
        }
      });
      renderer?.dispose();
      renderer?.forceContextLoss();
      renderer?.domElement.remove();
    };
  }, []);

  return <div ref={host} className="hero-compute-stage" role="img" aria-label="Fine copper rings orbiting a faceted generative model">
    <div className="hero-compute-fallback" aria-hidden="true">
      <svg viewBox="0 0 360 260" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="180" cy="124" r="72" stroke="#b77b45" stroke-opacity=".62" stroke-dasharray="2 7" />
        <ellipse cx="180" cy="124" rx="135" ry="47" transform="rotate(-31 180 124)" stroke="#d9502b" stroke-opacity=".56" />
        <ellipse cx="180" cy="124" rx="113" ry="43" transform="rotate(39 180 124)" stroke="#9f7147" stroke-opacity=".62" />
        <path d="m180 82 36 22 0 41-36 22-36-22v-41l36-22Z" stroke="#8e6744" stroke-opacity=".52" />
        <path d="m180 82 0 85m-36-63 72 41m0-41-72 41" stroke="#8e6744" stroke-opacity=".38" />
        <circle cx="72" cy="81" r="4" fill="#d9502b"/><circle cx="273" cy="175" r="4" fill="#d9502b"/>
        <circle cx="180" cy="45" r="3" fill="#bd8750"/><circle cx="135" cy="203" r="3" fill="#bd8750"/>
      </svg>
      <span className="compute-tag">A LITTLE MORE POSSIBILITY</span>
    </div>
  </div>;
}
