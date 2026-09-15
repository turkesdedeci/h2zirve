"use client";
import { useEffect, useRef } from "react";
import s from "./experience.module.css";
import CountdownTimer from "@/components/CountdownTimer";

// Project a toroidal filament field into a tilted, perspective-lit sculpture.
const filaments = Array.from({ length: 56 }, (_, index) => {
  const theta = index / 56 * Math.PI * 2;
  return Array.from({ length: 81 }, (_, step) => {
    const phi = step / 80 * Math.PI * 2;
    const radius = 165 + 63 * Math.cos(phi);
    const x = radius * Math.cos(theta);
    const y = radius * Math.sin(theta);
    const z = 63 * Math.sin(phi);
    const depth = y * .68 + z * .73;
    const scale = 700 / (700 - depth);
    const px = 300 + (x * .94 - (y * .73 - z * .68) * .34) * scale;
    const py = 300 + (x * .34 + (y * .73 - z * .68) * .94) * scale;
    return `${step === 0 ? "M" : "L"}${px.toFixed(1)},${py.toFixed(1)}`;
  }).join(" ") + "Z";
});

export default function TrialHero() {
  const root = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = scene.current;
    if (!node) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const accelerate = () => { if (!media.matches) node.getAnimations({ subtree: true }).forEach(animation => animation.updatePlaybackRate(3)); };
    const reset = () => {
      node.getAnimations({ subtree: true }).forEach(animation => animation.updatePlaybackRate(1));
      cancelAnimationFrame(frame);
      node.style.setProperty("--turn-x", "0deg");
      node.style.setProperty("--turn-y", "0deg");
    };
    const move = (event: PointerEvent) => {
      if (media.matches || event.pointerType === "touch") return;
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        node.style.setProperty("--turn-x", `${-y * 24}deg`);
        node.style.setProperty("--turn-y", `${x * 32}deg`);
      });
    };
    reset();
    node.addEventListener("pointerenter", accelerate);
    node.addEventListener("pointermove", move, { passive: true });
    node.addEventListener("pointerleave", reset);
    media.addEventListener("change", reset);
    return () => { cancelAnimationFrame(frame); node.removeEventListener("pointerenter", accelerate); node.removeEventListener("pointermove", move); node.removeEventListener("pointerleave", reset); media.removeEventListener("change", reset); };
  }, []);
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
        node.style.setProperty("--drift", media.matches ? "0px" : `${progress * 130}px`);
      });
    };
    const observer = new IntersectionObserver(([entry]) => { node.dataset.visible = String(entry.isIntersecting); });
    observer.observe(node);
    window.addEventListener("scroll", update, { passive: true });
    media.addEventListener("change", update);
    update();
    return () => { observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("scroll", update); media.removeEventListener("change", update); };
  }, []);
  return <section ref={root} id="home" className={s.hero}>
    <div className={s.heroLayout}>
      <div className={s.heroCopy}>
        <p className={s.eventDate}>22–23 Ekim <span>2026 · Ankara</span></p>
        <h1 className={s.title}><span>Türkiye</span><em>Hidrojen</em><span>Zirvesi</span></h1>
        <p className={s.heroSubtitle}>Türkiye’de hidrojen ekosisteminin inşası.<br />Teknoloji, strateji ve uygulama.</p>
        <div className={s.heroActions}><a href="/kayit" className={s.button}>Ücretsiz kayıt ol <span aria-hidden="true">↗</span></a><a href="#program" className={s.explore}>Programı keşfet <span aria-hidden="true">↓</span></a></div>
        <div className={s.countdown}><p>Zirveye kalan</p><CountdownTimer /></div>
      </div>
      <div ref={scene} className={s.moleculeScene}>
        <div className={s.moleculeArt} aria-hidden="true">
          <div className={s.sceneDepth}>
          <div className={s.energyAura} />
          <div className={s.energySculpture}>
            <svg viewBox="0 0 600 600" fill="none">
              <defs><linearGradient id="energy-filament" x1="100" y1="100" x2="480" y2="470" gradientUnits="userSpaceOnUse"><stop stopColor="#e5fbff" /><stop offset=".3" stopColor="#00c8ff" /><stop offset=".65" stopColor="#0066cc" /><stop offset="1" stopColor="#72e4ff" /></linearGradient></defs>
              {filaments.map((path, index) => <path key={index} d={path} stroke="url(#energy-filament)" strokeWidth={index % 4 === 0 ? 1.5 : .7} opacity={index % 4 === 0 ? .95 : .55} />)}
            </svg>
          </div>
          <span className={s.energySymbol}>H<sub>2</sub></span>
          <div className={s.energyTrace} /><div className={s.energyTraceTwo} />
          </div>
        </div>

      </div>
    </div>

  </section>;
}
