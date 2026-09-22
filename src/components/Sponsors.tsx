import Image from "next/image";

const sponsorTiers = [
  {
    name: "Platin Sponsor",
    accent: "text-h2-ink-1",
    logos: [
      { name: "Hydrogenix", src: "/logos/hydrogenix.png" },
      { name: "Roketsan", src: "/logos/roketsan.png" },
    ],
  },
  {
    name: "Altın Sponsor",
    accent: "text-h2-amber",
    logos: [{ name: "Lentatek", src: "/logos/lentatek.png" }],
  },
  {
    name: "Gümüş Sponsor",
    accent: "text-h2-cyan",
    logos: [
      { name: "Hidronerji", src: "/logos/hidronerji.png" },
      { name: "KUHyTech", src: "/logos/kuhytech.png" },
      { name: "Debak", src: "/logos/debak.jpg" },
    ],
  },
  {
    name: "Destek Sponsoru",
    accent: "text-h2-ink-3",
    logos: [
      { name: "Hidromek", src: "/logos/hidromek.png" },
      { name: "HORIBA", src: "/logos/horiba.svg" },
      { name: "Baş Yapı", src: "/logos/besyapi.jpg" },
      { name: "Magnum Mühendislik", src: "/logos/magnum.png" },
    ],
  },
];

const benefits = [
  "Logo görünürlüğü",
  "Sahne / salon görünürlüğü",
  "Stant alanı",
  "Konuşmacı öneri hakkı",
  "Gala davet kontenjanı",
  "Sosyal medya görünürlüğü",
  "Basılı materyallerde yer alma",
  "Web sitesinde görünürlük",
];

const special = [
  "Gala Yemeği Sponsoru",
  "Kahve Arası Sponsoru",
  "Yaka Kartı & Lanyard Sponsoru",
  "Kongre Çantası Sponsoru",
  "Canlı Yayın Sponsoru",
  "Bildiri Kitabı Sponsoru",
  "Öğrenci Destek Sponsoru",
  "Teknik Gezi Sponsoru",
];

export default function Sponsors({ compact = false }: { compact?: boolean }) {
  return (
    <section id="sponsors" className="bg-h2-surface-1 py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-14 max-w-2xl">
          <span className="font-display text-h2-small font-semibold uppercase tracking-[0.22em] text-h2-cyan">
            Kurumsal Destek
          </span>
          <h2 className="mt-3 font-display text-h2-h1 font-bold text-h2-ink-1">Sponsorluk</h2>
          <p className="mt-5 text-h2-body-lg leading-relaxed text-h2-ink-2">
            Türkiye Hidrojen Zirvesi 2026, akademi, kamu ve sektörün öncü kurumlarını
            hidrojen ekosisteminin ortak gündeminde buluşturur.
          </p>
        </div>

        <div className="mb-14">
          <div className="mb-4 flex items-center gap-4">
            <span className="whitespace-nowrap font-display text-h2-small font-bold uppercase tracking-[0.18em] text-h2-amber">
              Ana Sponsor
            </span>
            <span className="h-px w-full bg-h2-amber/30" />
          </div>

          <article className="relative isolate overflow-hidden rounded-h2-lg border border-h2-amber/35 bg-[linear-gradient(112deg,rgba(230,163,48,0.14),rgba(10,21,43,0.94)_46%,rgba(18,193,207,0.08))] px-6 py-7 shadow-[0_20px_55px_rgba(0,0,0,0.2)] sm:px-10 sm:py-9">
            <div className="absolute inset-y-0 right-0 -z-10 w-1/2 bg-[radial-gradient(circle_at_70%_45%,rgba(230,163,48,0.18),transparent_58%)]" />
            <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-5 sm:gap-7">
                <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white p-3 shadow-lg sm:h-36 sm:w-36">
                  <Image
                    src="/logos/aybu.png"
                    alt="Ankara Yıldırım Beyazıt Üniversitesi"
                    width={144}
                    height={144}
                    className="h-full w-full object-contain"
                    priority
                  />
                </div>
                <div>
                  <p className="mb-2 font-display text-h2-micro font-bold uppercase tracking-[0.2em] text-h2-amber">
                    Ana Sponsor
                  </p>
                  <h3 className="max-w-2xl font-display text-2xl font-bold leading-tight text-h2-ink-1 sm:text-3xl">
                    Ankara Yıldırım Beyazıt Üniversitesi
                  </h3>
                </div>
              </div>
              <span className="w-fit border-l border-h2-amber/60 pl-4 font-display text-sm font-semibold uppercase tracking-[0.16em] text-h2-ink-2">
                AYBÜ
              </span>
            </div>
          </article>
        </div>

        <div className="grid gap-x-8 gap-y-10 lg:grid-cols-2">
          {sponsorTiers.map((tier) => (
            <div key={tier.name}>
              <div className="mb-4 flex items-center gap-4">
                <span className={`whitespace-nowrap font-display text-h2-small font-bold uppercase tracking-[0.18em] ${tier.accent}`}>
                  {tier.name}
                </span>
                <span className="h-px w-full bg-h2-border" />
              </div>
              <div className={`grid gap-3 sm:gap-4 ${tier.logos.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                {tier.logos.map((logo) => (
                  <div
                    key={logo.name}
                    className="flex h-36 min-w-0 items-center justify-center rounded-h2-md border border-h2-border bg-white p-4 sm:h-44 sm:p-6"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={280}
                      height={128}
                      unoptimized={logo.src.endsWith(".svg")}
                      className="h-full w-full max-w-[280px] object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {!compact && (
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-h2-lg border border-h2-blue/20 bg-gradient-to-br from-h2-blue/10 to-transparent p-7">
            <h3 className="mb-5 font-display text-h2-h3 font-semibold text-h2-ink-1">Neden Sponsor Olmalısınız?</h3>
            <div className="space-y-3">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <span className="font-bold text-h2-cyan">✓</span>
                  <span className="text-h2-small text-h2-ink-2">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-h2-lg border border-h2-border bg-h2-surface-2 p-7">
            <h3 className="mb-5 font-display text-h2-h3 font-semibold text-h2-ink-1">Özel Sponsorluk Fırsatları</h3>
            <div className="space-y-3">
              {special.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-h2-green" />
                  <span className="text-h2-small text-h2-ink-2">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        )}

        <div className="mt-10 text-center">
          <a
            href="/sponsorluk-basvurusu"
            className="inline-block rounded-h2-md bg-h2-blue px-12 py-4 text-base font-semibold text-white transition-all hover:bg-h2-blue-bright hover:shadow-lg hover:shadow-h2-blue/25"
          >
            Sponsorluk Başvurusu Yap
          </a>
          <p className="mx-auto mt-4 max-w-xl text-h2-small leading-relaxed text-h2-ink-3">
            Başvurunuz alındıktan sonra sponsorluk tipi, görünürlük beklentisi ve bütçe aralığına göre ekip sizinle iletişime geçecektir.
          </p>
        </div>
      </div>
    </section>
  );
}
