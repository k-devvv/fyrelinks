"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Lightweight, non-blocking Three.js visual representing generative latent space & compute.
 * - Lazy-loaded after critical content paints
 * - Fixed aspect-ratio container (zero CLS)
 * - Attractive SVG/CSS static fallback for no-JS / no-WebGL / reduced-motion
 * - Strict intersection observer: pauses when offscreen or tab is hidden
 * - Disposes all geometries, materials, listeners, and WebGL context on unmount
 * - Subtle pointer tilt/warp interaction without capturing pointer events
 */
export default function ComputeVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // 1. Accessibility: Skip WebGL on prefers-reduced-motion
    const motionPref = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPref.matches) {
      setIsSupported(false);
      return;
    }

    // 2. Hardware / Network constraint: Skip on Save-Data or 2G
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    if (nav.connection?.saveData || (nav.connection?.effectiveType && /2g/.test(nav.connection.effectiveType))) {
      setIsSupported(false);
      return;
    }

    // 3. WebGL capability check
    try {
      const testCanvas = document.createElement("canvas");
      const hasWebGL = Boolean(testCanvas.getContext("webgl2") || testCanvas.getContext("webgl"));
      if (!hasWebGL) {
        setIsSupported(false);
        return;
      }
    } catch {
      setIsSupported(false);
      return;
    }

    let isDisposed = false;
    let animationFrameId: number | null = null;
    let renderer: any = null;
    let scene: any = null;
    let camera: any = null;
    let particles: any = null;
    let isIntersecting = false;
    let observer: IntersectionObserver | null = null;

    // Mouse coordinates normalized (-1 to 1)
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      targetMouseX = (x - 0.5) * 2;
      targetMouseY = (y - 0.5) * 2;
    };

    // Lazy load Three.js after idle / paint
    const initTimer = setTimeout(() => {
      import("three")
        .then((THREE) => {
          if (isDisposed || !containerRef.current) return;

          const container = containerRef.current;
          const width = container.clientWidth || 360;
          const height = container.clientHeight || 200;

          // Renderer with clamped pixel ratio and powerPreference
          renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "low-power"
          });
          renderer.setClearColor(0x000000, 0);
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
          renderer.setSize(width, height);
          renderer.domElement.className = "compute-visual-canvas";
          renderer.domElement.setAttribute("aria-hidden", "true");
          container.appendChild(renderer.domElement);

          // Perspective camera
          camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
          camera.position.set(0, 4.5, 11);
          camera.lookAt(0, 0, 0);

          scene = new THREE.Scene();

          // Generate 32x22 grid of compute lattice points (704 points total)
          const cols = 32;
          const rows = 22;
          const count = cols * rows;
          const positions = new Float32Array(count * 3);
          const originalY = new Float32Array(count);
          const scales = new Float32Array(count);

          const spacingX = 0.42;
          const spacingZ = 0.38;
          const offsetX = ((cols - 1) * spacingX) / 2;
          const offsetZ = ((rows - 1) * spacingZ) / 2;

          let index = 0;
          for (let ix = 0; ix < cols; ix++) {
            for (let iz = 0; iz < rows; iz++) {
              const x = ix * spacingX - offsetX;
              const z = iz * spacingZ - offsetZ;
              const distFromCenter = Math.sqrt(x * x + z * z);
              const y = Math.sin(distFromCenter * 0.8) * 0.4;

              positions[index * 3] = x;
              positions[index * 3 + 1] = y;
              positions[index * 3 + 2] = z;

              originalY[index] = y;
              scales[index] = Math.max(0.5, 1.2 - distFromCenter * 0.15);
              index++;
            }
          }

          const geometry = new THREE.BufferGeometry();
          geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
          geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

          // Soft radiant particle shader/points
          const material = new THREE.PointsMaterial({
            color: 0xff7a45,
            size: 0.16,
            transparent: true,
            opacity: 0.75,
            blending: THREE.AdditiveBlending
          });

          particles = new THREE.Points(geometry, material);
          scene.add(particles);

          setIsLoaded(true);

          // Animation loop
          let clockTime = 0;
          const animate = () => {
            if (isDisposed) return;

            if (isIntersecting && !document.hidden) {
              clockTime += 0.02;

              // Smooth pointer dampening
              currentMouseX += (targetMouseX - currentMouseX) * 0.08;
              currentMouseY += (targetMouseY - currentMouseY) * 0.08;

              // Gently tilt scene based on pointer
              particles.rotation.y = clockTime * 0.08 + currentMouseX * 0.25;
              particles.rotation.x = currentMouseY * 0.15;

              // Undulate positions in a latent wave pattern
              const pos = geometry.attributes.position.array as Float32Array;
              for (let i = 0; i < count; i++) {
                const px = pos[i * 3];
                const pz = pos[i * 3 + 2];
                // Double sinusoidal latent field wave
                pos[i * 3 + 1] =
                  originalY[i] +
                  Math.sin(px * 1.2 + clockTime) * 0.28 +
                  Math.cos(pz * 1.4 + clockTime * 0.8) * 0.24;
              }
              geometry.attributes.position.needsUpdate = true;

              renderer.render(scene, camera);
            }

            animationFrameId = requestAnimationFrame(animate);
          };

          // Handle container resize
          const onResize = () => {
            if (!containerRef.current || !renderer || !camera) return;
            const w = containerRef.current.clientWidth;
            const h = containerRef.current.clientHeight;
            if (w === 0 || h === 0) return;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
          };

          // WebGL Context Loss safety
          const handleContextLost = (e: Event) => {
            e.preventDefault();
            if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
          };
          const handleContextRestored = () => {
            if (renderer && scene && camera) {
              animationFrameId = requestAnimationFrame(animate);
            }
          };

          const domEl = renderer.domElement;
          domEl.addEventListener("webglcontextlost", handleContextLost, false);
          domEl.addEventListener("webglcontextrestored", handleContextRestored, false);
          window.addEventListener("resize", onResize, { passive: true });
          window.addEventListener("pointermove", onPointerMove, { passive: true });

          // Intersection observer: only render when visible in viewport
          observer = new IntersectionObserver(
            ([entry]) => {
              isIntersecting = entry.isIntersecting;
            },
            { threshold: 0.05 }
          );
          observer.observe(container);

          animationFrameId = requestAnimationFrame(animate);
        })
        .catch(() => {
          setIsSupported(false);
        });
    }, 80);

    return () => {
      isDisposed = true;
      clearTimeout(initTimer);
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      if (observer) observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);

      if (scene) {
        scene.traverse((child: any) => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) child.material.forEach((m: any) => m.dispose());
            else child.material.dispose();
          }
        });
      }

      if (renderer) {
        try {
          renderer.dispose();
          renderer.forceContextLoss();
          if (renderer.domElement && renderer.domElement.parentNode) {
            renderer.domElement.parentNode.removeChild(renderer.domElement);
          }
        } catch {}
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`hero-compute-stage ${isLoaded ? "is-active" : ""}`}
      aria-label="Interactive generative latent compute visualization"
    >
      {/* Editorial static fallback (always rendered underneath/before WebGL initializes) */}
      <div className="hero-compute-fallback" aria-hidden="true">
        <svg viewBox="0 0 360 180" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <radialGradient id="computeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff7a45" stopOpacity="0.22" />
              <stop offset="70%" stopColor="#ff7a45" stopOpacity="0.03" />
              <stop offset="100%" stopColor="#ff7a45" stopOpacity="0" />
            </radialGradient>
            <pattern id="computeGrid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255, 128, 86, 0.08)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#computeGlow)" />
          <rect width="100%" height="100%" fill="url(#computeGrid)" />
          <circle cx="180" cy="90" r="48" stroke="rgba(255, 128, 86, 0.25)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="180" cy="90" r="4" fill="#ff7a45" />
          <circle cx="140" cy="80" r="2.5" fill="#ff9d7b" fillOpacity="0.8" />
          <circle cx="220" cy="100" r="2.5" fill="#ff9d7b" fillOpacity="0.8" />
          <circle cx="110" cy="110" r="2" fill="#ff7a45" fillOpacity="0.5" />
          <circle cx="250" cy="70" r="2" fill="#ff7a45" fillOpacity="0.5" />
        </svg>
        <span className="compute-tag">LATENT COMPUTE DYNAMICS</span>
      </div>
    </div>
  );
}
