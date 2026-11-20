"use client";

import { useEffect, useRef } from "react";
import type * as Three from "three";

type Props = { gb: number; gpu: string; biggest: string };

/**
 * Decorative 3D laptop (procedural, no downloaded models). Its screen shows the chosen
 * GPU and VRAM. Lazy-loads Three.js; the SVG fallback stays when WebGL, motion or data saving is off.
 */
export default function LaptopScene({ gb, gpu, biggest }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const paint = useRef<((p: Props) => void) | null>(null);
  const latest = useRef<Props>({ gb, gpu, biggest });
  latest.current = { gb, gpu, biggest };

  useEffect(() => { paint.current?.({ gb, gpu, biggest }); }, [gb, gpu, biggest]);

  useEffect(() => {
    const container = host.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (!container || connection?.saveData || /^(slow-)?2g$/.test(connection?.effectiveType ?? "")) return;
    const still = motion.matches;

    let disposed = false, visible = false, frame = 0, last = 0, born = 0;
    let renderer: Three.WebGLRenderer | undefined;
    let scene: Three.Scene | undefined;
    let camera: Three.PerspectiveCamera | undefined;
    let rig: Three.Group | undefined, lid: Three.Group | undefined;
    let pmrem: Three.PMREMGenerator | undefined;
    let observer: IntersectionObserver | undefined, sizer: ResizeObserver | undefined;
    let tx = 0, ty = 0, px = 0, py = 0;
    const textures: Three.Texture[] = [];

    const stop = () => { if (frame) cancelAnimationFrame(frame); frame = 0; };
    const render = (t: number) => {
      if (disposed || !visible || document.hidden || !renderer || !scene || !camera || !rig || !lid) { frame = 0; return; }
      frame = requestAnimationFrame(render);
      if (t - last < 30) return;
      last = t;
      if (!born) born = t;
      const open = still ? 1 : Math.min(1, (t - born) / 1400);
      const ease = 1 - Math.pow(1 - open, 3);
      lid.rotation.x = -Math.PI / 2 + ease * (Math.PI / 2 + 0.32);
      px += (tx - px) * 0.05; py += (ty - py) * 0.05;
      rig.rotation.y = (still ? 0 : Math.sin(t * 0.00025) * 0.28) - 0.45 + px * 0.25;
      rig.rotation.x = py * 0.08;
      rig.position.y = still ? 0 : Math.sin(t * 0.0011) * 0.04;
      renderer.render(scene, camera);
      if (still && open >= 1) stop();
    };
    const start = () => { if (!frame && visible && !document.hidden && !disposed) frame = requestAnimationFrame(render); };
    const onMove = (e: PointerEvent) => {
      const b = container.getBoundingClientRect();
      tx = ((e.clientX - b.left) / b.width - 0.5) * 2;
      ty = ((e.clientY - b.top) / b.height - 0.5) * 2;
    };
    const onLeave = () => { tx = 0; ty = 0; };
    const onVis = () => (document.hidden ? stop() : start());

    const timer = window.setTimeout(() => {
      Promise.all([import("three"), import("three/examples/jsm/environments/RoomEnvironment.js")]).then(([T, { RoomEnvironment }]) => {
        if (disposed || !host.current) return;
        const w = container.clientWidth || 420, h = container.clientHeight || 300;
        renderer = new T.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.setSize(w, h);
        renderer.toneMapping = T.ACESFilmicToneMapping;
        renderer.outputColorSpace = T.SRGBColorSpace;
        renderer.domElement.className = "laptop-scene-canvas";
        renderer.domElement.setAttribute("aria-hidden", "true");
        container.appendChild(renderer.domElement);
        container.classList.add("is-3d");

        scene = new T.Scene();
        pmrem = new T.PMREMGenerator(renderer);
        scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
        camera = new T.PerspectiveCamera(32, w / h, 0.1, 50);
        camera.position.set(0, 1.55, 5.6);
        camera.lookAt(0, 0.45, 0);

        const key = new T.DirectionalLight(0xffffff, 1.4);
        key.position.set(3, 5, 4);
        scene.add(key, new T.AmbientLight(0xffffff, 0.25));

        const metal = new T.MeshPhysicalMaterial({ color: 0x2b2f36, metalness: 0.85, roughness: 0.32, clearcoat: 0.4, clearcoatRoughness: 0.25 });
        const deck = new T.MeshPhysicalMaterial({ color: 0x1a1d22, metalness: 0.6, roughness: 0.45 });
        const keyMat = new T.MeshStandardMaterial({ color: 0x0c0d10, roughness: 0.7, metalness: 0.1 });
        const glass = new T.MeshPhysicalMaterial({ color: 0x050608, metalness: 0, roughness: 0.05, clearcoat: 1 });

        rig = new T.Group();
        const W = 3.2, D = 2.15;
        const base = new T.Mesh(new T.BoxGeometry(W, 0.11, D), metal);
        base.position.y = 0.055;
        const top = new T.Mesh(new T.BoxGeometry(W - 0.06, 0.005, D - 0.06), deck);
        top.position.y = 0.112;
        rig.add(base, top);

        // Keyboard: instanced keys with a warm backlight.
        const cols = 14, rows = 5, kw = 0.17, gap = 0.028;
        const keys = new T.InstancedMesh(new T.BoxGeometry(kw, 0.025, kw), keyMat, cols * rows);
        const m = new T.Matrix4();
        let i = 0;
        for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
          m.makeTranslation((c - (cols - 1) / 2) * (kw + gap), 0.125, -0.62 + r * (kw + gap));
          keys.setMatrixAt(i++, m);
        }
        const glow = new T.Mesh(new T.PlaneGeometry(cols * (kw + gap), rows * (kw + gap)), new T.MeshBasicMaterial({ color: 0xff7a3d, transparent: true, opacity: 0.22 }));
        glow.rotation.x = -Math.PI / 2;
        glow.position.set(0, 0.114, -0.62 + ((rows - 1) * (kw + gap)) / 2);
        const pad = new T.Mesh(new T.BoxGeometry(1.0, 0.004, 0.58), glass);
        pad.position.set(0, 0.114, 0.62);
        rig.add(glow, keys, pad);

        // Lid hinged at the back edge.
        lid = new T.Group();
        lid.position.set(0, 0.11, -D / 2);
        const shell = new T.Mesh(new T.BoxGeometry(W, D, 0.07), metal);
        shell.position.set(0, D / 2, -0.035);
        const bezel = new T.Mesh(new T.PlaneGeometry(W - 0.06, D - 0.06), glass);
        bezel.position.set(0, D / 2, 0.001);

        const canvas = document.createElement("canvas");
        canvas.width = 1024; canvas.height = 640;
        const screenTex = new T.CanvasTexture(canvas);
        screenTex.colorSpace = T.SRGBColorSpace;
        screenTex.anisotropy = 4;
        textures.push(screenTex);
        const screen = new T.Mesh(new T.PlaneGeometry(W - 0.22, D - 0.26), new T.MeshBasicMaterial({ map: screenTex, toneMapped: false }));
        screen.position.set(0, D / 2 + 0.02, 0.003);
        lid.add(shell, bezel, screen);
        rig.add(lid);

        // Soft contact shadow.
        const sc = document.createElement("canvas");
        sc.width = sc.height = 128;
        const sx = sc.getContext("2d")!;
        const g = sx.createRadialGradient(64, 64, 4, 64, 64, 64);
        g.addColorStop(0, "rgba(0,0,0,.55)"); g.addColorStop(1, "rgba(0,0,0,0)");
        sx.fillStyle = g; sx.fillRect(0, 0, 128, 128);
        const shadowTex = new T.CanvasTexture(sc);
        textures.push(shadowTex);
        const shadow = new T.Mesh(new T.PlaneGeometry(W * 1.5, D * 1.6), new T.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }));
        shadow.rotation.x = -Math.PI / 2;
        shadow.position.y = -0.01;
        rig.add(shadow);
        scene.add(rig);

        const ctx = canvas.getContext("2d")!;
        const draw = ({ gb: g2, gpu: name, biggest: big }: Props) => {
          const bg = ctx.createLinearGradient(0, 0, 1024, 640);
          bg.addColorStop(0, "#14100e"); bg.addColorStop(1, "#2a1309");
          ctx.fillStyle = bg; ctx.fillRect(0, 0, 1024, 640);
          ctx.fillStyle = "#ff7a3d"; ctx.font = "600 34px system-ui, sans-serif";
          ctx.fillText("YOUR AI LAPTOP", 64, 96);
          ctx.fillStyle = "#ffffff"; ctx.font = "700 64px system-ui, sans-serif";
          ctx.fillText(name.replace(/\s*\(.*\)/, ""), 64, 184, 900);
          ctx.fillStyle = "#c9b8ad"; ctx.font = "500 32px system-ui, sans-serif";
          ctx.fillText(`${g2} GB VRAM`, 64, 248);
          for (let k = 0; k < 16; k++) {
            ctx.fillStyle = k < g2 ? "#ff7a3d" : "rgba(255,255,255,.12)";
            ctx.fillRect(64 + k * 56, 300, 44, 90);
          }
          ctx.fillStyle = "#c9b8ad"; ctx.font = "500 28px system-ui, sans-serif";
          ctx.fillText("Biggest AI it runs smoothly", 64, 470);
          ctx.fillStyle = "#ffffff"; ctx.font = "700 44px system-ui, sans-serif";
          ctx.fillText(big, 64, 530, 900);
          screenTex.needsUpdate = true;
          if (still) start();
        };
        paint.current = draw;
        draw(latest.current);

        const resize = () => {
          if (!renderer || !camera) return;
          const cw = container.clientWidth, ch = container.clientHeight;
          if (!cw || !ch) return;
          camera.aspect = cw / ch;
          camera.position.z = cw / ch < 1.1 ? 7.2 : 5.6;
          camera.updateProjectionMatrix();
          renderer.setSize(cw, ch);
        };
        resize();
        container.addEventListener("pointermove", onMove, { passive: true });
        container.addEventListener("pointerleave", onLeave);
        document.addEventListener("visibilitychange", onVis);
        sizer = new ResizeObserver(resize);
        sizer.observe(container);
        observer = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); }, { threshold: 0.05 });
        observer.observe(container);
      }).catch(() => { /* keep SVG fallback */ });
    }, 150);

    return () => {
      disposed = true;
      paint.current = null;
      clearTimeout(timer);
      stop();
      observer?.disconnect();
      sizer?.disconnect();
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      scene?.traverse((o) => {
        const mesh = o as Three.Mesh;
        if (!mesh.isMesh) return;
        mesh.geometry.dispose();
        (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach((x) => x.dispose());
      });
      textures.forEach((t) => t.dispose());
      scene?.environment?.dispose();
      pmrem?.dispose();
      renderer?.dispose();
      renderer?.forceContextLoss();
      renderer?.domElement.remove();
      container.classList.remove("is-3d");
    };
  }, []);

  return (
    <div ref={host} className="laptop-scene" role="img" aria-label={`Illustration of a laptop with ${gpu}, ${gb} GB VRAM`}>
      <svg className="laptop-scene-fallback" viewBox="0 0 420 300" fill="none" aria-hidden="true">
        <rect x="80" y="40" width="260" height="165" rx="10" fill="#2b2f36" />
        <rect x="92" y="52" width="236" height="141" rx="4" fill="#1d120c" />
        {Array.from({ length: 16 }, (_, k) => (
          <rect key={k} x={104 + k * 13.5} y="120" width="10" height="24" fill={k < gb ? "#ff7a3d" : "#ffffff22"} />
        ))}
        <path d="M60 210h300l20 22H40z" fill="#1a1d22" />
      </svg>
    </div>
  );
}
