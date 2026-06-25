const segments = [
  {
    name: "Startup",
    note: "Ücretsiz stand başvurusu",
    accent: "text-h2-green",
  },
  {
    name: "KOBİ",
    note: "Ekip tarafından tekliflendirilir",
    accent: "text-h2-cyan",
  },
  {
    name: "Büyük Firma",
    note: "İhtiyaca göre sponsorlukla eşleştirilir",
    accent: "text-h2-blue-bright",
  },
];

export default function Exhibitors() {
  return (
    <section id="exhibitors" className="bg-h2-surface-1 py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div>
            <span className="font-display text-h2-small font-semibold uppercase tracking-[0.22em] text-h2-green">
              Fuar Alanı
            </span>
            <h2 className="mt-3 font-display text-h2-h1 font-bold text-h2-ink-1">
              Katılımcı Firmalar
            </h2>
            <p className="mt-5 max-w-2xl text-h2-body-lg leading-relaxed text-h2-ink-2">
              Hidrojen teknolojileri, ürünleri ve prototipleri için stand
              başvurularını topluyoruz. Startup başvuruları ücretsiz olarak
              değerlendirilir.
            </p>
          </div>

          <div className="rounded-h2-lg border border-h2-green/25 bg-h2-green/8 p-6">
            <p className="text-h2-micro font-semibold uppercase tracking-widest text-h2-green">
              Startup Desteği
            </p>
            <p className="mt-3 text-h2-small leading-relaxed text-h2-ink-2">
              Erken aşama girişimler, hidrojen ekosistemine katkı sunan ürün ve
              prototiplerini ücretsiz stand başvurusu ile sergilemek için
              değerlendirmeye alınır.
            </p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {segments.map((segment) => (
            <div
              key={segment.name}
              className="rounded-h2-lg border border-h2-border bg-h2-surface-2 p-6"
            >
              <p
                className={`font-display text-h2-h3 font-semibold ${segment.accent}`}
              >
                {segment.name}
              </p>
              <p className="mt-3 text-h2-small leading-relaxed text-h2-ink-2">
                {segment.note}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-h2-lg border border-h2-border bg-h2-bg/50 p-7 text-center">
          <h3 className="font-display text-h2-h3 font-semibold text-h2-ink-1">
            Stand başvuruları açıldı
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-h2-small leading-relaxed text-h2-ink-2">
            Başvuru sonrası ekip, firma büyüklüğü ve sergi ihtiyacına göre
            sizinle iletişime geçecektir. Onaylanan firmalar bu bölümde düzenli
            olarak yayımlanacaktır.
          </p>
          <a
            href="/stand-basvurusu"
            className="mt-6 inline-block rounded-h2-md bg-h2-green px-9 py-3.5 font-semibold text-white transition-all hover:bg-h2-green/85 hover:shadow-lg hover:shadow-h2-green/20"
          >
            Stand Başvurusu Yap
          </a>
        </div>
      </div>
    </section>
  );
}
