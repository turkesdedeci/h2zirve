"use client";

import { useEffect, useRef } from "react";
import CountdownTimer from "@/components/CountdownTimer";
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
          <div className={`${s.moleculeArt} ${field.visual}`} aria-hidden="true">
            <div className={field.stage}>
              <div className={field.aura} />
              <div className={field.coreHalo} />

              <svg className={field.fieldSvg} viewBox="0 0 640 640" fill="none">
                <defs>
                  <linearGradient id="hydrogen-field-gradient" x1="112" y1="126" x2="540" y2="510" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#e6fbff" />
                    <stop offset=".2" stopColor="#79e8ff" />
                    <stop offset=".47" stopColor="#00c8ff" />
                    <stop offset=".76" stopColor="#1478d8" />
                    <stop offset="1" stopColor="#8adfff" />
                  </linearGradient>
                  <radialGradient id="particle-glow">
                    <stop stopColor="#ffffff" />
                    <stop offset=".38" stopColor="#b8f5ff" />
                    <stop offset="1" stopColor="#00c8ff" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <ellipse className={`${field.guide} ${field.guideOne}`} cx="320" cy="320" rx="259" ry="222" />
                <ellipse className={`${field.guide} ${field.guideTwo}`} cx="320" cy="320" rx="230" ry="265" transform="rotate(24 320 320)" />
                <ellipse className={`${field.guide} ${field.guideThree}`} cx="320" cy="320" rx="282" ry="157" transform="rotate(-18 320 320)" />

                <g className={field.arcsOuter}>
                  <path className={`${field.arc} ${field.arcStrong}`} d="M107 246C137 158 226 101 320 101" />
                  <path className={`${field.arc} ${field.arcMid}`} d="M371 106C453 125 516 184 540 258" />
                  <path className={`${field.arc} ${field.arcStrong}`} d="M548 307C553 393 505 471 431 514" />
                  <path className={`${field.arc} ${field.arcMid}`} d="M372 542C283 562 198 526 142 463" />
                  <path className={`${field.arc} ${field.arcStrong}`} d="M111 420C79 351 82 293 107 246" />
                </g>

                <g className={field.arcsInner}>
                  <path className={`${field.arc} ${field.arcSoft}`} d="M177 210C226 151 315 132 385 157" />
                  <path className={`${field.arc} ${field.arcSoft}`} d="M432 187C484 231 505 307 484 370" />
                  <path className={`${field.arc} ${field.arcSoft}`} d="M452 416C398 480 302 497 232 462" />
                  <path className={`${field.arc} ${field.arcSoft}`} d="M187 431C137 384 123 308 150 248" />
                </g>

                <g className={field.flowLines}>
                  <path d="M126 338C174 433 281 480 375 456C444 439 493 395 520 327" />
                  <path d="M116 286C141 183 242 119 344 128C429 135 493 187 520 267" />
                  <path d="M163 419C251 490 394 481 475 386" />
                  <path d="M146 235C214 151 347 120 445 177" />
                  <path d="M203 490C275 526 385 517 452 458" />
                </g>

                <g className={field.ticks}>
                  <path d="M318 71V87" />
                  <path d="M503 151L492 164" />
                  <path d="M566 326H550" />
                  <path d="M493 501L481 489" />
                  <path d="M302 568V552" />
                  <path d="M129 479L141 467" />
                  <path d="M75 303H91" />
                  <path d="M151 129L163 141" />
                </g>

                <g className={field.particles}>
                  <circle cx="124" cy="238" r="13" fill="url(#particle-glow)" opacity=".6" />
                  <circle cx="124" cy="238" r="3.7" className={field.particleBright} />
                  <circle cx="495" cy="186" r="2.7" className={field.particle} />
                  <circle cx="554" cy="321" r="3.4" className={field.particle} />
                  <circle cx="430" cy="503" r="2.4" className={field.particleDim} />
                  <circle cx="185" cy="483" r="3" className={field.particle} />
                  <circle cx="94" cy="382" r="2.2" className={field.particleDim} />
                </g>
              </svg>

              <div className={field.core}>
                <div className={field.coreTexture} />
                <span className={field.symbol}>H<sub>2</sub></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
