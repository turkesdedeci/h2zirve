import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stand Başvurusu",
  description:
    "Türkiye Hidrojen Zirvesi 2026 fuar alanında yer almak için stand başvurusu yapın. Startup başvuruları ücretsiz değerlendirilir.",
};

export default function StandBasvurusuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
