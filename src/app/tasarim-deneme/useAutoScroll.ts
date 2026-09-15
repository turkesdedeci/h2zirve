"use client";

import { useCallback, useRef, useState, useEffect } from "react";

type Options = {
  /** px/sn. Negatif değer ters yöne akıtır. */
  speed?: number;
  enabled?: boolean;
  hoverSpeed?: number;
  /** Kartlar arası boşluk yedeği; gerçek değer computed style'dan okunur. */
  fallbackGap?: number;
};

/**
 * Native scroll container'ı requestAnimationFrame ile ilerletir.
 *
 * CSS @keyframes marquee bilerek kullanılmadı: globals.css:86-95 içindeki
 * `animation-duration: .01ms !important` kuralı reduced-motion'da animasyonu
 * durdurmuyor, anında bitiriyor ve track yarı kaymış halde donuyor. Ayrıca
 * overflow:hidden + transform'lu bir track içinde odak, container'ı kalıcı
 * kaydırır. Native scroll container'da odak, dokunma, tekerlek ve klavye
 * davranışını tarayıcı doğru yapıyor.
 */
export function useAutoScroll({
  speed = 42,
  enabled = true,
  hoverSpeed = 0,
  fallbackGap = 20,
}: Options = {}) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const firstListRef = useRef<HTMLUListElement | null>(null);

  const [isPaused, setIsPaused] = useState(false);

  const pausedRef = useRef(false);
  const hoverRef = useRef(false);
  const focusRef = useRef(false);
  const pointerRef = useRef(false);
  const reduceRef = useRef(false);
  const halfRef = useRef(0);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const firstList = firstListRef.current;
    if (!viewport || !firstList || !enabled) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceRef.current = mq.matches;

    let position = 0;
    let lastTime = 0;
    let wasBlocked = true;
    let frame = 0;

    // `scrollWidth / 2` YANLIŞ olurdu: iki liste arasındaki boşluğu da içerir,
    // sarma noktası yarım gap kayar ve döngü başına bir kez gözle görülür bir
    // sıçrama olur. İlk listeyi ölçüp bir tam gap ekliyoruz.
    const measure = () => {
      const computed = getComputedStyle(viewport);
      const gap = parseFloat(computed.columnGap || computed.gap || "") || fallbackGap;
      halfRef.current = firstList.offsetWidth + gap;
    };
    measure();

    // Ölçümü ResizeObserver'da önbelleğe almak, rAF callback'ini her karede
    // layout okumaktan (zorunlu reflow) kurtarır.
    const observer = new ResizeObserver(measure);
    observer.observe(firstList);
    observer.observe(viewport);

    const handleMotionChange = () => {
      reduceRef.current = mq.matches;
      if (mq.matches) {
        // Düzen grid'e döner; kalan kaydırma offseti içeriği kırpardı.
        position = 0;
        viewport.scrollLeft = 0;
      } else {
        measure();
        wasBlocked = true;
      }
    };
    mq.addEventListener("change", handleMotionChange);

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);

      const delta = lastTime ? Math.min(now - lastTime, 50) : 0;
      lastTime = now;

      if (
        reduceRef.current ||
        pausedRef.current ||
        (hoverRef.current && hoverSpeed === 0) ||
        focusRef.current ||
        pointerRef.current
      ) {
        wasBlocked = true;
        return;
      }

      // Duraklamadan çıkarken kullanıcının bıraktığı yeri bir kez okuruz.
      if (wasBlocked) {
        position = viewport.scrollLeft;
        wasBlocked = false;
        return;
      }

      const half = halfRef.current;
      if (half <= 0) return;

      position += (speed * (hoverRef.current ? hoverSpeed : 1) * delta) / 1000;
      if (position >= half) position -= half;
      else if (position < 0) position += half;
      viewport.scrollLeft = position;
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      mq.removeEventListener("change", handleMotionChange);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [speed, enabled, fallbackGap, hoverSpeed]);

  const togglePause = useCallback(() => {
    setIsPaused((previous) => {
      pausedRef.current = !previous;
      return !previous;
    });
  }, []);

  const nudge = useCallback((direction: 1 | -1) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const item = viewport.querySelector<HTMLElement>("[data-marquee-item]");
    const step = item ? (item.offsetWidth + 20) * 2 : 420;
    viewport.scrollBy({
      left: direction * step,
      // scroll-behavior: auto !important kuralı JS'ten verilen behavior'ı
      // ezmiyor, bu yüzden reduced-motion'ı burada kendimiz kontrol ediyoruz.
      behavior: reduceRef.current ? "auto" : "smooth",
    });
  }, []);

  /** Bölüm sarmalayıcısına: viewport dışındaki kontrollere odak da duraklatsın. */
  const wrapperHandlers = {
    onMouseEnter: () => {
      hoverRef.current = true;
    },
    onMouseLeave: () => {
      hoverRef.current = false;
    },
    onFocus: () => {
      focusRef.current = true;
    },
    onBlur: () => {
      focusRef.current = false;
    },
  };

  const releasePointer = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    // iOS momentum'u otururken scrollLeft yazmak kullanıcıyla kavga eder.
    resumeTimerRef.current = setTimeout(() => {
      pointerRef.current = false;
    }, 1500);
  };

  const viewportHandlers = {
    onPointerDown: () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      pointerRef.current = true;
    },
    onPointerUp: releasePointer,
    onPointerCancel: releasePointer,
  };

  return {
    viewportRef,
    firstListRef,
    isPaused,
    togglePause,
    nudge,
    wrapperHandlers,
    viewportHandlers,
  };
}
