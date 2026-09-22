"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// Module-level guard to prevent duplicate executions across React Strict Mode remounts
let hasSessionRun = false;

export default function BrandIntro() {
  const [active, setActive] = useState(false);
  const [fading, setFading] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDisposedRef = useRef(false);

  const dismiss = useCallback(() => {
    if (isDisposedRef.current) return;
    isDisposedRef.current = true;
    setFading(true);
    setTimeout(() => {
      setActive(false);
    }, 180);
  }, []);

  useEffect(() => {
    // 1. Module-level lock for session / Strict Mode
    if (hasSessionRun) return;

    // 2. Server-side check
    if (typeof window === "undefined") return;

    // 3. User motion preference check
    const motionPref = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPref.matches) return;

    // 4. SessionStorage check (gracefully handles private/blocked storage)
    try {
      const seen = sessionStorage.getItem("fyre_brand_intro_seen");
      if (seen === "1") return;
      sessionStorage.setItem("fyre_brand_intro_seen", "1");
    } catch {
      // In private browsing or restricted environments, memory flag provides session protection
    }
    hasSessionRun = true;

    // 5. Early exit if reader already began interacting (scrolled down)
    if (window.scrollY > 40) return;

    // 6. Network constraint check: skip on data-saver or slow 2G connections
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    if (nav.connection?.saveData || (nav.connection?.effectiveType && /2g/.test(nav.connection.effectiveType))) {
      return;
    }

    // 7. WebGL capability check
    try {
      const testCanvas = document.createElement("canvas");
      const hasWebGL = Boolean(
        testCanvas.getContext("webgl2") || testCanvas.getContext("webgl")
      );
      if (!hasWebGL) return;
    } catch {
      return;
    }

    // Mark as active to render overlay container
    setActive(true);

    let animationFrameId: number | null = null;
    let rendererInstance: any = null;
    let sceneInstance: any = null;
    let cleanupListeners: (() => void) | null = null;

    // Hard safety timeout: overlay is guaranteed to dismiss within 1100ms
    const hardTimeout = setTimeout(() => {
      dismiss();
    }, 1100);

    // Dynamically import Three.js with strict 400ms timeout cutoff
    const threePromise = import("three");
    const timeoutCutoff = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Module load timeout")), 400)
    );

    Promise.race([threePromise, timeoutCutoff])
      .then((THREE) => {
        if (isDisposedRef.current || !containerRef.current) return;

        const container = containerRef.current;
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Setup Three.js WebGL renderer
        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "high-performance"
        });
        rendererInstance = renderer;
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(width, height);
        renderer.domElement.className = "brand-intro-canvas";
        renderer.domElement.setAttribute("aria-hidden", "true");
        container.appendChild(renderer.domElement);

        // Orthographic camera mapping to screen coordinates
        const aspect = width / height;
        const viewSize = 50; // virtual units
        const camera = new THREE.OrthographicCamera(
          (-viewSize * aspect) / 2,
          (viewSize * aspect) / 2,
          viewSize / 2,
          -viewSize / 2,
          0.1,
          1000
        );
        camera.position.z = 100;

        const scene = new THREE.Scene();
        sceneInstance = scene;

        // Brand Logo Container (derived from approved public/brand/symbol.svg)
        // SVG viewBox: 0 0 32 32, center is (16, 16). Scale factor to fit camera:
        const scale = 0.55;
        const logoGroup = new THREE.Group();
        logoGroup.scale.set(scale, scale, scale);
        scene.add(logoGroup);

        const svgToThree = (x: number, y: number): [number, number] => {
          return [x - 16, -(y - 16)];
        };

        // 1. Background squircle card
        const cardShape = new THREE.Shape();
        const cr = 8;
        const cx0 = -16, cy0 = -16, cw = 32, ch = 32;
        cardShape.moveTo(cx0 + cr, cy0);
        cardShape.lineTo(cx0 + cw - cr, cy0);
        cardShape.quadraticCurveTo(cx0 + cw, cy0, cx0 + cw, cy0 + cr);
        cardShape.lineTo(cx0 + cw, cy0 + ch - cr);
        cardShape.quadraticCurveTo(cx0 + cw, cy0 + ch, cx0 + cw - cr, cy0 + ch);
        cardShape.lineTo(cx0 + cr, cy0 + ch);
        cardShape.quadraticCurveTo(cx0, cy0 + ch, cx0, cy0 + ch - cr);
        cardShape.lineTo(cx0, cy0 + cr);
        cardShape.quadraticCurveTo(cx0, cy0, cx0 + cr, cy0);

        const cardGeo = new THREE.ShapeGeometry(cardShape);
        const cardMat = new THREE.MeshBasicMaterial({
          color: 0x0B0E17,
          transparent: true,
          opacity: 0
        });
        const cardMesh = new THREE.Mesh(cardGeo, cardMat);
        cardMesh.position.z = -2;
        logoGroup.add(cardMesh);

        // 2. F Vertical Stem (White)
        const stemWidth = 5.5;
        const stemHeight = 22;
        const [stemX, stemY] = svgToThree(6.5 + stemWidth / 2, 5 + stemHeight / 2);
        const stemGeo = new THREE.PlaneGeometry(stemWidth, stemHeight);
        const stemMat = new THREE.MeshBasicMaterial({
          color: 0xFFFFFF,
          transparent: true,
          opacity: 0
        });
        const stemMesh = new THREE.Mesh(stemGeo, stemMat);
        stemMesh.position.set(stemX, stemY, 0);
        logoGroup.add(stemMesh);

        // 3. F Upper Arm (Connecting to spark terminal)
        const armShape = new THREE.Shape();
        const armPts: [number, number][] = [
          [12, 5.5], [20.5, 5.5], [22.8, 7], [24, 5], [25.2, 7],
          [29, 6.2], [27.5, 9.5], [29.5, 11], [29, 12.8],
          [25.2, 11.5], [24, 13.5], [22.8, 11.5], [20.5, 12.5], [12, 12.5]
        ];
        const [firstX, firstY] = svgToThree(armPts[0][0], armPts[0][1]);
        armShape.moveTo(firstX, firstY);
        for (let i = 1; i < armPts.length; i++) {
          const [px, py] = svgToThree(armPts[i][0], armPts[i][1]);
          armShape.lineTo(px, py);
        }
        armShape.closePath();

        const armGeo = new THREE.ShapeGeometry(armShape);
        const armMat = new THREE.MeshBasicMaterial({
          color: 0xFF5500,
          transparent: true,
          opacity: 0
        });
        const armMesh = new THREE.Mesh(armGeo, armMat);
        logoGroup.add(armMesh);

        // 4. Precision 4-Point Spark Star at Upper Terminal (25, 7.5)
        const starShape = new THREE.Shape();
        const starPts: [number, number][] = [
          [25, 3], [26.2, 6.5], [29.5, 7.5], [26.2, 8.5],
          [25, 12], [23.8, 8.5], [20.5, 7.5], [23.8, 6.5]
        ];
        const [starInitX, starInitY] = svgToThree(starPts[0][0], starPts[0][1]);
        starShape.moveTo(starInitX, starInitY);
        for (let i = 1; i < starPts.length; i++) {
          const [px, py] = svgToThree(starPts[i][0], starPts[i][1]);
          starShape.lineTo(px, py);
        }
        starShape.closePath();

        const starGeo = new THREE.ShapeGeometry(starShape);
        const starMat = new THREE.MeshBasicMaterial({
          color: 0xFFAA00,
          transparent: true,
          opacity: 0
        });
        const starMesh = new THREE.Mesh(starGeo, starMat);
        starMesh.position.z = 0.5;
        logoGroup.add(starMesh);

        // 5. Middle Crossbar
        const barWidth = 7;
        const barHeight = 4.5;
        const [barX, barY] = svgToThree(12 + barWidth / 2, 15.5 + barHeight / 2);
        const barGeo = new THREE.PlaneGeometry(barWidth, barHeight);
        const barMat = new THREE.MeshBasicMaterial({
          color: 0xFF5500,
          transparent: true,
          opacity: 0
        });
        const barMesh = new THREE.Mesh(barGeo, barMat);
        barMesh.position.set(barX, barY, 0);
        logoGroup.add(barMesh);

        // 6. Connected Link Node (Circle & Center Dot at 21.5, 17.75)
        const [nodeX, nodeY] = svgToThree(21.5, 17.75);
        const ringGeo = new THREE.RingGeometry(2.0, 3.25, 24);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0xFF6A00,
          transparent: true,
          opacity: 0,
          side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.position.set(nodeX, nodeY, 0.5);
        logoGroup.add(ringMesh);

        const dotGeo = new THREE.CircleGeometry(1.25, 16);
        const dotMat = new THREE.MeshBasicMaterial({
          color: 0xFFAA00,
          transparent: true,
          opacity: 0
        });
        const dotMesh = new THREE.Mesh(dotGeo, dotMat);
        dotMesh.position.set(nodeX, nodeY, 0.6);
        logoGroup.add(dotMesh);

        // 7. Converging Orange Sparks (28 lightweight particles)
        const sparkCount = 28;
        const sparkPositions = new Float32Array(sparkCount * 3);
        const sparkOrigins = new Float32Array(sparkCount * 3);
        const sparkTargets = new Float32Array(sparkCount * 3);

        const [targetX, targetY] = svgToThree(25, 7.5); // star center

        for (let i = 0; i < sparkCount; i++) {
          // Dispersed radial positions around the star terminal
          const angle = Math.random() * Math.PI * 2;
          const dist = 18 + Math.random() * 26;
          const ox = targetX + Math.cos(angle) * dist;
          const oy = targetY + Math.sin(angle) * dist;
          const oz = (Math.random() - 0.5) * 15;

          sparkOrigins[i * 3] = ox;
          sparkOrigins[i * 3 + 1] = oy;
          sparkOrigins[i * 3 + 2] = oz;

          // Target convergence point with small jitter
          sparkTargets[i * 3] = targetX + (Math.random() - 0.5) * 2;
          sparkTargets[i * 3 + 1] = targetY + (Math.random() - 0.5) * 2;
          sparkTargets[i * 3 + 2] = 0;

          sparkPositions[i * 3] = ox;
          sparkPositions[i * 3 + 1] = oy;
          sparkPositions[i * 3 + 2] = oz;
        }

        const sparksGeo = new THREE.BufferGeometry();
        sparksGeo.setAttribute("position", new THREE.BufferAttribute(sparkPositions, 3));
        const sparksMat = new THREE.PointsMaterial({
          color: 0xFFAA00,
          size: 4,
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending
        });
        const sparksPoints = new THREE.Points(sparksGeo, sparksMat);
        logoGroup.add(sparksPoints);

        // Animation Timeline: 750ms total
        const duration = 750;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
          if (isDisposedRef.current) return;

          const elapsed = currentTime - startTime;
          const progress = Math.min(Math.max(elapsed / duration, 0), 1);

          // Phase 1 (0 to 0.38): Sparks converge inward
          if (progress < 0.38) {
            const t = progress / 0.38;
            // Ease-out cubic
            const ease = 1 - Math.pow(1 - t, 3);
            const posAttr = sparksGeo.attributes.position;
            const arr = posAttr.array as Float32Array;

            for (let i = 0; i < sparkCount; i++) {
              arr[i * 3] = sparkOrigins[i * 3] + (sparkTargets[i * 3] - sparkOrigins[i * 3]) * ease;
              arr[i * 3 + 1] = sparkOrigins[i * 3 + 1] + (sparkTargets[i * 3 + 1] - sparkOrigins[i * 3 + 1]) * ease;
              arr[i * 3 + 2] = sparkOrigins[i * 3 + 2] + (sparkTargets[i * 3 + 2] - sparkOrigins[i * 3 + 2]) * ease;
            }
            posAttr.needsUpdate = true;
            sparksMat.opacity = 0.6 + t * 0.4;

            // Logo starts faint
            cardMat.opacity = t * 0.5;
            stemMat.opacity = t * 0.3;
            armMat.opacity = t * 0.3;
            starMat.opacity = t * 0.5;
            barMat.opacity = t * 0.3;
            ringMat.opacity = t * 0.3;
            dotMat.opacity = t * 0.3;
          }
          // Phase 2 (0.38 to 0.65): Convergence impact & gentle light sweep
          else if (progress < 0.65) {
            const t = (progress - 0.38) / (0.65 - 0.38);
            sparksMat.opacity = Math.max(1 - t * 1.5, 0);

            // Logo reaches full prominence with scale settling (0.95 -> 1.0)
            const s = scale * (0.95 + 0.05 * t);
            logoGroup.scale.set(s, s, s);

            // Light sweep / radiance peak
            cardMat.opacity = 0.95;
            stemMat.opacity = 1.0;
            armMat.opacity = 1.0;
            starMat.opacity = 1.0;
            barMat.opacity = 1.0;
            ringMat.opacity = 1.0;
            dotMat.opacity = 1.0;

            // Subtle color glow highlight during sweep
            if (t < 0.5) {
              starMat.color.setHex(0xFFE082);
            } else {
              starMat.color.setHex(0xFFAA00);
            }
          }
          // Phase 3 (0.65 to 1.0): Gentle fade-out
          else {
            const t = (progress - 0.65) / (1.0 - 0.65);
            const fade = 1 - t;

            cardMat.opacity = 0.95 * fade;
            stemMat.opacity = fade;
            armMat.opacity = fade;
            starMat.opacity = fade;
            barMat.opacity = fade;
            ringMat.opacity = fade;
            dotMat.opacity = fade;
            sparksMat.opacity = 0;
          }

          renderer.render(scene, camera);

          if (progress < 1) {
            animationFrameId = requestAnimationFrame(animate);
          } else {
            dismiss();
          }
        };

        animationFrameId = requestAnimationFrame(animate);

        // Immediate user interaction dismiss listeners
        const onInteraction = () => dismiss();
        const onKeyDown = (e: KeyboardEvent) => {
          if (e.key === "Escape") dismiss();
        };
        const onVisibility = () => {
          if (document.hidden) dismiss();
        };

        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("pointerdown", onInteraction, { passive: true });
        window.addEventListener("wheel", onInteraction, { passive: true });
        window.addEventListener("scroll", onInteraction, { passive: true });
        document.addEventListener("visibilitychange", onVisibility);

        cleanupListeners = () => {
          window.removeEventListener("keydown", onKeyDown);
          window.removeEventListener("pointerdown", onInteraction);
          window.removeEventListener("wheel", onInteraction);
          window.removeEventListener("scroll", onInteraction);
          document.removeEventListener("visibilitychange", onVisibility);
        };
      })
      .catch(() => {
        // Fallback: If Three.js import fails or times out, safely dismiss
        dismiss();
      });

    return () => {
      clearTimeout(hardTimeout);
      if (cleanupListeners) cleanupListeners();
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);

      // Deep disposal of Three.js resources
      if (sceneInstance) {
        sceneInstance.traverse((child: any) => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((m: any) => m.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      }

      if (rendererInstance) {
        try {
          rendererInstance.dispose();
          rendererInstance.forceContextLoss();
          if (rendererInstance.domElement && rendererInstance.domElement.parentNode) {
            rendererInstance.domElement.parentNode.removeChild(rendererInstance.domElement);
          }
        } catch {
          // Ignore context disposal edge cases
        }
      }
    };
  }, [dismiss]);

  if (!active) return null;

  return (
    <aside
      ref={containerRef}
      className={`brand-intro-overlay ${fading ? "fade-out" : ""}`}
      aria-label="FyreLinkz brand introduction"
    >
      <button
        type="button"
        className="brand-intro-skip"
        aria-label="Skip brand introduction"
        onClick={dismiss}
      >
        Skip introduction
      </button>
    </aside>
  );
}
