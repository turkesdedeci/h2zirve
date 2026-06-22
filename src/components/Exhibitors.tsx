export default function Exhibitors() {
  return (
    <section id="exhibitors" className="bg-h2-surface-1 py-16 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="font-display text-h2-small font-semibold uppercase tracking-[0.22em] text-h2-green">
            Fuar Alanı
          </span>
          <h2 className="font-display text-h2-h1 font-bold text-h2-ink-1 mt-3">
            Katılımcı Firmalar
          </h2>
          <p className="text-h2-ink-2 mt-5 max-w-2xl mx-auto text-h2-body-lg leading-relaxed">
            Zirve boyunca teknoloji, hizmet ve projelerini fuar alanında
            sergileyecek sektör temsilcileriyle tanışın.
          </p>
        </div>

        <div className="mx-auto max-w-xl">
          <div className="flex min-h-[240px] flex-col items-center justify-center rounded-h2-lg border border-dashed border-h2-border bg-h2-surface-2/30 p-8 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-h2-cyan/20 bg-h2-cyan/5 text-2xl text-h2-cyan">
              +
            </div>
            <p className="font-semibold text-h2-ink-2">Katılımcı firmalar yakında</p>
            <p className="mt-2 max-w-xs text-h2-micro leading-relaxed text-h2-ink-3">
              Stand katılımı onaylanan firmalar bu bölümde düzenli olarak
              yayımlanacaktır.
            </p>
            <a
              href="#contact"
              className="mt-6 text-h2-small font-semibold text-h2-cyan transition-colors hover:text-h2-ink-1"
            >
              Fuar alanı için iletişime geçin →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
