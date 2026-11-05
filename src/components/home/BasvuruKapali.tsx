import Link from "next/link";
import PreviewHeader from "@/components/home/PreviewHeader";
import TrialFooter from "@/components/home/TrialFooter";
import styles from "@/components/home/preview.module.css";

/** Zirve sonrası form sayfalarının yerine gösterilir; eski mail bağlantıları 404 vermesin diye. */
export default function BasvuruKapali({ title }: { title: string }) {
  return (
    <div className={styles.page}>
      <PreviewHeader />
      <main id="main-content">
        <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
          <span className="font-display text-h2-small font-semibold uppercase tracking-[0.22em] text-h2-cyan">
            22–23 Ekim 2026
          </span>
          <h1 className="mt-4 font-display text-h2-h1 font-bold text-h2-ink-1">{title}</h1>
          <p className="mt-5 max-w-xl text-h2-body-lg leading-relaxed text-h2-ink-2">
            Türkiye Hidrojen Zirvesi 2026, 22–23 Ekim 2026 tarihlerinde Ankara’da
            gerçekleştirildi. Sorularınız için{" "}
            <a className="text-h2-cyan underline underline-offset-4" href="mailto:h2zirvesi@tespam.org">
              h2zirvesi@tespam.org
            </a>{" "}
            adresine yazabilirsiniz.
          </p>
          <Link
            href="/"
            className="mt-10 inline-block rounded-h2-md bg-h2-blue px-10 py-4 text-base font-semibold text-white transition-all hover:bg-h2-blue-bright hover:shadow-lg hover:shadow-h2-blue/25"
          >
            Anasayfaya Dön
          </Link>
        </section>
      </main>
      <TrialFooter />
    </div>
  );
}
