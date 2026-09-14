"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./preview.module.css";

const links = [
  { label: "Zirve", href: "/tasarim-deneme#about" },
  { label: "Konuşmacılar", href: "/tasarim-deneme#speakers" },
  { label: "Program", href: "/tasarim-deneme#program" },
  { label: "Poster", href: "/tasarim-deneme#participate" },
  { label: "Stand Başvurusu", href: "/stand-basvurusu" },
  { label: "Ulaşım", href: "/tasarim-deneme#venue" },
];

export default function PreviewHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <a href="/tasarim-deneme" aria-label="Türkiye Hidrojen Zirvesi ana sayfası">
          <Image src="/logos/turkiye-hidrojen-zirvesi-logo-v4.png" alt="Türkiye Hidrojen Zirvesi 2026" width={145} height={76} className={styles.brand} />
        </a>
        <nav className={styles.desktopNav} aria-label="Ana menü">
          {links.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
        </nav>
        <div className={styles.headerActions}>
          <a className={styles.headerRegister} href="/kayit">Ücretsiz kayıt <span aria-hidden="true">↗</span></a>
          <button className={styles.menuToggle} type="button" aria-expanded={open} aria-controls="preview-menu" onClick={() => setOpen(!open)}>
            {open ? "Kapat" : "Menü"}
          </button>
        </div>
      </div>
      {open && <nav id="preview-menu" className={styles.mobileNav} aria-label="Mobil menü">
        {links.map((link) => <a key={link.label} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
        <a href="/sponsorluk-basvurusu">Sponsorluk</a>
        <a href="/tasarim-deneme#contact" onClick={() => setOpen(false)}>İletişim</a>
      </nav>}
    </header>
  );
}
