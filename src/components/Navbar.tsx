"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navSections = [
  {
    label: "Zirve",
    links: [
      { label: "Hakkında", hash: "#about" },
      { label: "Program", href: "/program" },
      { label: "Konuşmacılar", hash: "#speakers" },
      { label: "Poster Çağrısı", href: "/poster-cagrisi" },
      { label: "Firmalar", hash: "#exhibitors" },
      { label: "İletişim", hash: "#contact" },
    ],
  },
];

const desktopLinks = [
  { label: "Hakkında", hash: "#about" },
  { label: "Program", href: "/program" },
  { label: "Konuşmacılar", hash: "#speakers" },
  { label: "Poster Çağrısı", href: "/poster-cagrisi" },
  { label: "Stand Başvurusu", href: "/stand-basvurusu" },
];

const institutionalLinks = [
  { label: "Stand Başvurusu", href: "/stand-basvurusu" },
  { label: "Sponsorluk", href: "/sponsorluk-basvurusu" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const isHome = pathname === "/";
  const solidNav = scrolled || !isHome;
  const sectionHref = (hash: string) => (isHome ? hash : `/${hash}`);
  const navHref = (item: { href?: string; hash?: string }) =>
    item.href ?? sectionHref(item.hash ?? "#home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!menuOpen) return;

    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        return;
      }
      if (e.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        "a, button"
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
          solidNav
            ? "bg-h2-bg/95 backdrop-blur-md shadow-lg shadow-black/30 border-b border-h2-border"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href={isHome ? "#home" : "/"} className="flex items-center" aria-label="Ana sayfa">
            <Image
              src="/logos/turkiye-hidrojen-zirvesi-logo-v4.png"
              alt="Türkiye Hidrojen Zirvesi 2026"
              width={126}
              height={66}
              className="h-14 w-auto object-contain"
              priority
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-5 lg:flex" aria-label="Ana menü">
            {desktopLinks.map((item) => (
              <a
                key={item.label}
                href={navHref(item)}
                className="relative text-sm font-medium text-h2-ink-2 transition-colors hover:text-h2-ink-1 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-h2-cyan after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/sponsorluk-basvurusu"
              className="rounded-h2-md border border-h2-border px-4 py-2 text-sm font-semibold text-h2-ink-1 transition-[border-color,background-color] hover:border-h2-cyan/45 hover:bg-h2-cyan/8"
            >
              Sponsorluk
            </a>
            <a
              href="/kayit"
              className="rounded-h2-md bg-h2-blue px-4 py-2 text-sm font-semibold text-white transition-[background-color,box-shadow] hover:bg-h2-blue/85 hover:shadow-md hover:shadow-h2-blue/25"
            >
              Kayıt Ol
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            ref={triggerRef}
            className="flex flex-col justify-center gap-1.5 p-2 text-white lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Menüyü aç"
            aria-expanded={menuOpen}
            aria-controls="mobile-site-menu"
          >
            <span className="block h-0.5 w-6 bg-white" />
            <span className="block h-0.5 w-6 bg-white" />
            <span className="block h-0.5 w-6 bg-white" />
          </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        id="mobile-site-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menüsü"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`fixed inset-0 z-[60] overflow-y-auto overscroll-contain bg-h2-bg transition-opacity duration-200 lg:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`flex min-h-full flex-col px-6 pb-10 pt-6 transition-transform duration-200 ${
            menuOpen ? "translate-y-0" : "-translate-y-2"
          }`}
        >
          <div className="flex items-center justify-between">
            <Image
              src="/logos/turkiye-hidrojen-zirvesi-logo-v4.png"
              alt="Türkiye Hidrojen Zirvesi 2026"
              width={116}
              height={61}
              className="h-12 w-auto object-contain"
            />
            <button
              onClick={closeMenu}
              aria-label="Menüyü kapat"
              className="flex h-11 w-11 items-center justify-center rounded-h2-md text-white"
            >
              <svg
                className="h-6 w-6"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mt-12 flex flex-1 flex-col justify-center gap-2">
            {navSections.map((group, groupIndex) => (
              <div key={group.label}>
                <p className="mb-1 mt-4 text-h2-micro font-semibold uppercase tracking-[0.18em] text-h2-ink-3">
                  {group.label}
                </p>
                {group.links.map((item, itemIndex) => (
                  <a
                    key={item.label}
                    ref={groupIndex === 0 && itemIndex === 0 ? firstLinkRef : undefined}
                    href={navHref(item)}
                    onClick={closeMenu}
                    className="group flex items-baseline gap-4 border-b border-h2-border-soft py-3 font-display text-h2-h3 font-semibold text-h2-ink-1 transition-colors hover:text-h2-cyan"
                  >
                    <span className="font-sans text-h2-small font-medium text-h2-ink-3">
                      {String(groupIndex + 1)}.{String(itemIndex + 1)}
                    </span>
                    {item.label}
                  </a>
                ))}
              </div>
            ))}
          </div>

          <div className="grid gap-3">
            <a
              href="/kayit"
              onClick={closeMenu}
              className="block rounded-h2-md bg-h2-blue px-4 py-3.5 text-center font-semibold text-white"
            >
              Ücretsiz Kayıt Ol
            </a>
            <div className="grid grid-cols-2 gap-3">
              {institutionalLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="block rounded-h2-md border border-h2-border px-3 py-3 text-center text-h2-small font-semibold text-h2-ink-2"
              >
                {item.label}
              </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
