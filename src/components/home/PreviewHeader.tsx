"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./preview.module.css";

const links = [
  { label: "Hakkında", href: "/#about" },
  { label: "Program", href: "/#program" },
  { label: "Konuşmacılar", href: "/#speakers" },
  { label: "Poster Çağrısı", href: "/poster-cagrisi" },
  { label: "Stand Başvurusu", href: "/stand-basvurusu" },
  { label: "Ulaşım", href: "/#venue" },
];

export default function PreviewHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        {/* Alev işareti + adın sitenin kendi fontuyla dizilmiş hâli. Yazı
            metin olduğu için her ekranda net; büyük harfler doğrudan
            yazıldı, text-transform Türkçe i/İ'de dil ayarına bağlı. */}
        <a href="/" className={styles.brandLink} aria-label="Türkiye Hidrojen Zirvesi 2026 ana sayfası">
          <Image src="/logos/h2-zirvesi-alev.png" alt="" aria-hidden="true" width={125} height={174} priority className={styles.brand} />
          <span className={styles.brandText}>
            <span className={styles.brandTop}>TÜRKİYE HİDROJEN</span>
            <span className={styles.brandBottom}>ZİRVESİ 2026</span>
          </span>
        </a>
        <nav className={styles.desktopNav} aria-label="Ana menü">
          {links.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
        </nav>
        <div className={styles.headerActions}>
          <a className={styles.headerSponsor} href="/sponsorluk-basvurusu">Sponsorluk</a>
          <a className={styles.headerRegister} href="/kayit">Kayıt Ol <span aria-hidden="true">↗</span></a>
          <button className={styles.menuToggle} type="button" aria-expanded={open} aria-controls="preview-menu" onClick={() => setOpen(!open)}>
            {open ? "Kapat" : "Menü"}
          </button>
        </div>
      </div>
      {open && <nav id="preview-menu" className={styles.mobileNav} aria-label="Mobil menü">
        {links.map((link) => <a key={link.label} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
        <a href="/poster-basvurusu" onClick={() => setOpen(false)}>Poster Başvurusu</a>
        <a href="/sponsorluk-basvurusu" onClick={() => setOpen(false)}>Sponsorluk</a>
        <a href="/#contact" onClick={() => setOpen(false)}>İletişim</a>
      </nav>}
    </header>
  );
}
