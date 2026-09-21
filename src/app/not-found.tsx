import type { Metadata } from "next";
import Link from "next/link";
import { Manrope } from "next/font/google";
import PreviewHeader from "@/components/home/PreviewHeader";
import TrialFooter from "@/components/home/TrialFooter";
import styles from "@/components/home/preview.module.css";

const display = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sayfa Bulunamadı",
  robots: { index: false, follow: false },
};

const links = [
  { href: "/", label: "Anasayfa" },
  { href: "/program", label: "Program" },
  { href: "/konusmacilar", label: "Konuşmacılar" },
  { href: "/poster-cagrisi", label: "Poster Çağrısı" },
  { href: "/sponsorluk-basvurusu", label: "Sponsorluk Başvurusu" },
  { href: "/stand-basvurusu", label: "Stant Başvurusu" },
];

export default function NotFound() {
  return (
    <div className={`${styles.page} ${display.variable}`}>
      <PreviewHeader />
      <main id="main-content">
        <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
          <span className="font-display text-h2-small font-semibold uppercase tracking-[0.22em] text-h2-cyan">
            404
          </span>
          <h1 className="mt-4 font-display text-h2-h1 font-bold text-h2-ink-1">
            Bu sayfa bulunamadı
          </h1>
          <p className="mt-5 max-w-xl text-h2-body-lg leading-relaxed text-h2-ink-2">
            Aradığınız sayfa taşınmış, kaldırılmış ya da hiç var olmamış olabilir.
            Aşağıdaki bağlantılardan aradığınıza ulaşabilirsiniz.
          </p>

          <Link
            href="/"
            className="mt-10 inline-block rounded-h2-md bg-h2-blue px-10 py-4 text-base font-semibold text-white transition-all hover:bg-h2-blue-bright hover:shadow-lg hover:shadow-h2-blue/25"
          >
            Anasayfaya Dön
          </Link>

          <nav aria-label="Öne çıkan sayfalar" className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {links.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-h2-small font-semibold text-h2-ink-2 underline decoration-h2-border underline-offset-4 transition-colors hover:text-h2-cyan"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </section>
      </main>
      <TrialFooter />
    </div>
  );
}
