import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bireysel Kayıt",
  description:
    "Türkiye Hidrojen Zirvesi 2026 için ücretsiz katılımcı kaydı — 22–23 Ekim 2026, AYBÜ Etlik Kongre Salonu, Ankara.",
};

export default function KayitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
