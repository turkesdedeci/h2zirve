import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Poster Özeti Başvurusu",
  description:
    "Türkiye Hidrojen Zirvesi 2026 poster çağrısı — genişletilmiş özetinizi 15 Eylül 2026 tarihine kadar yükleyin.",
};

export default function PosterBasvurusuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
