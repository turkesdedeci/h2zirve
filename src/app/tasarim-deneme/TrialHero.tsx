"use client";

import { useEffect, useRef } from "react";
import CountdownTimer from "@/components/CountdownTimer";
import s from "./experience.module.css";
import field from "./heroField.module.css";

export default function TrialHero() {
  const root = useRef<HTMLElement>(null);

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
        node.style.setProperty("--drift", media.matches ? "0px" : `${progress * 42}px`);
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

        <div className={s.moleculeScene}>
          <div className={`${s.moleculeArt} ${field.visual}`} aria-hidden="true">
            <div className={field.stage}>
              <svg className={field.fieldSvg} viewBox="0 0 640 640" fill="none">
                <defs>
                  <linearGradient id="hydrogen-field-gradient" x1="92" y1="125" x2="548" y2="500" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#c8f7ff" />
                    <stop offset=".28" stopColor="#00c8ff" />
                    <stop offset=".68" stopColor="#1476d4" />
                    <stop offset="1" stopColor="#3da9e8" />
                  </linearGradient>
                </defs>

                <circle className={field.guide} cx="320" cy="320" r="254" />
                <circle className={field.guide} cx="320" cy="320" r="185" />

                <g transform="rotate(-14 320 320)">
                  <ellipse className={`${field.orbit} ${field.orbitOne}`} cx="320" cy="320" rx="248" ry="132" pathLength="100" />
                  <circle className={`${field.node} ${field.nodeOne}`} cx="554" cy="274" r="3.6" />
                </g>

                <g transform="rotate(38 320 320)">
                  <ellipse className={`${field.orbit} ${field.orbitTwo}`} cx="320" cy="320" rx="190" ry="236" pathLength="100" />
                  <circle className={`${field.node} ${field.nodeTwo}`} cx="320" cy="84" r="3.1" />
                </g>

                <g transform="rotate(-43 320 320)">
                  <ellipse className={`${field.orbit} ${field.orbitThree}`} cx="320" cy="320" rx="272" ry="82" pathLength="100" />
                  <circle className={`${field.node} ${field.nodeThree}`} cx="72" cy="320" r="2.8" />
                </g>

                <circle className={`${field.node} ${field.nodeDim}`} cx="474" cy="459" r="2.4" />
              </svg>

              <div className={field.core}>
                <span className={field.symbol}>H<sub>2</sub></span>
              </div>

              <span className={`${field.marker} ${field.markerOne}`} />
              <span className={`${field.marker} ${field.markerTwo}`} />
              <span className={`${field.marker} ${field.markerThree}`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
