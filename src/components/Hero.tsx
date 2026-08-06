import Image from "next/image";
import CountdownTimer from "./CountdownTimer";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[760px] items-center overflow-hidden bg-h2-bg pt-28 pb-16 sm:pt-36 sm:pb-20"
    >
      <Image
        src="/hero-visual.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[68%_center] sm:object-center"
        priority
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(6,9,26,0.97)_0%,rgba(6,9,26,0.88)_36%,rgba(6,9,26,0.42)_66%,rgba(6,9,26,0.18)_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-h2-bg/40 via-transparent to-h2-bg/90"
        aria-hidden="true"
      />

      {/* Faint structural grid — the page's one quiet visual signature, not a glow effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(var(--color-h2-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-h2-border)_1px,transparent_1px)] [background-size:64px_64px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Left: event identity */}
          <div className="min-w-0">
            <p className="font-display text-h2-small font-semibold uppercase tracking-[0.25em] text-h2-cyan">
              22–23 Ekim 2026 · Ankara, Türkiye
            </p>

            <h1 className="mt-5 max-w-[12ch] text-pretty font-display text-h2-display font-semibold leading-[1.05] text-h2-ink-1 sm:max-w-none">
              <span className="block">Türkiye Hidrojen</span>
              <span className="block text-h2-blue-bright">Zirvesi 2026</span>
            </h1>

            <p className="mt-4 text-h2-small font-bold uppercase tracking-[0.2em] text-h2-green">
              TESPAM-H2-2026
            </p>

            <p className="mt-6 max-w-xl text-h2-body-lg leading-relaxed text-h2-ink-2">
              Türkiye&apos;de Hidrojen Ekosisteminin İnşası:{" "}
              <span className="text-h2-ink-1">Teknoloji, Strateji ve Uygulama</span>
            </p>

            {/* Countdown — quiet, supporting detail, not the focal point */}
            <div className="mt-8 flex flex-wrap items-baseline gap-3">
              <span className="text-h2-micro font-semibold uppercase tracking-widest text-h2-ink-3">
                Kongreye kalan süre
              </span>
              <CountdownTimer />
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/kayit"
                className="rounded-h2-md bg-h2-blue px-8 py-3.5 text-center text-base font-semibold text-white transition-[background-color,box-shadow,transform] hover:-translate-y-0.5 hover:bg-h2-blue-bright hover:shadow-md hover:shadow-h2-blue/25"
              >
                Ücretsiz Kayıt Ol
              </a>
              <a
                href="/poster-basvurusu"
                className="rounded-h2-md border border-white/20 px-8 py-3.5 text-center text-base font-semibold text-h2-ink-1 transition-[border-color,color,transform] hover:-translate-y-0.5 hover:border-h2-cyan/50 hover:text-white"
              >
                Poster Başvurusu
              </a>
            </div>

            {/* Organizer / host credibility strip */}
            <div className="mt-14 flex flex-wrap items-center gap-6 border-t border-h2-border-soft pt-7">
              <span className="text-h2-micro font-semibold uppercase tracking-widest text-h2-ink-3">
                Düzenleyen
              </span>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <Image
                    src="/logos/tespam.png"
                    alt="TESPAM"
                    width={52}
                    height={52}
                    className="object-contain opacity-85"
                  />
                  <span className="text-h2-small font-semibold text-h2-ink-2">
                    TESPAM
                  </span>
                </div>
                <span className="h-8 w-px bg-h2-border" aria-hidden="true" />
                <div className="flex items-center gap-3">
                  <Image
                    src="/logos/aybu.png"
                    alt="Ankara Yıldırım Beyazıt Üniversitesi"
                    width={44}
                    height={44}
                    className="object-contain opacity-70"
                  />
                  <span className="text-h2-small font-semibold text-h2-ink-2">
                    AYBÜ
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
