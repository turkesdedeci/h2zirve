"use client";

import { useEffect, useRef } from "react";
import CountdownTimer from "@/components/CountdownTimer";
import H2Molecule from "@/components/H2Molecule";
import s from "./experience.module.css";
import field from "./heroField.module.css";

export default function TrialHero() {
  const root = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = scene.current;
    if (!node) return;

    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const reset = () => {
      cancelAnimationFrame(frame);
      node.style.setProperty("--field-x", "0deg");
      node.style.setProperty("--field-y", "0deg");
    };

    const move = (event: PointerEvent) => {
      if (media.matches || event.pointerType === "touch") return;
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        node.style.setProperty("--field-x", `${-y * 9}deg`);
        node.style.setProperty("--field-y", `${x * 12}deg`);
      });
    };

    node.addEventListener("pointermove", move, { passive: true });
    node.addEventListener("pointerleave", reset);
    media.addEventListener("change", reset);

    return () => {
      cancelAnimationFrame(frame);
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerleave", reset);
      media.removeEventListener("change", reset);
    };
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
        node.style.setProperty("--drift", media.matches ? "0px" : `${progress * 34}px`);
      });
    };

    const observer = new IntersectionObserver(([entry]) => {
      node.dataset.visible = String(entry.isIntersecting);
    });

    observer.observe(node);
    window.addEventListener("scroll", update, { passive: true });
    media.addEventListener("change", update);
    update();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      media.removeEventListener("change", update);
    };
  }, []);

  return (
    <section ref={root} id="home" className={s.hero}>
      <div className={s.heroLayout}>
        <div className={s.heroCopy}>
          <p className={s.eventDate}>
            22–23 Ekim <span>2026 · Ankara</span>
          </p>
          <h1 className={s.title}>
            <span>Türkiye</span>
            <em>Hidrojen</em>
            <span>Zirvesi</span>
          </h1>
          <p className={s.heroSubtitle}>
            Türkiye’de hidrojen ekosisteminin inşası.<br />
            Teknoloji, strateji ve uygulama.
          </p>
          <div className={s.heroActions}>
            <a href="/kayit" className={s.button}>
              Ücretsiz kayıt ol <span aria-hidden="true">↗</span>
            </a>
            <a href="#program" className={s.explore}>
              Programı keşfet <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className={s.countdown}>
            <p>Zirveye kalan</p>
            <CountdownTimer />
          </div>
        </div>

        <div ref={scene} className={s.moleculeScene}>
          <div className={`${s.moleculeArt} ${field.visual}`}>
            <H2Molecule />
          </div>
        </div>
      </div>
    </section>
  );
}
