import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsorluk Başvurusu",
  description:
    "Türkiye Hidrojen Zirvesi 2026 sponsorluk başvurusu — sponsor tipi, bütçe aralığı ve görünürlük beklentinizi paylaşın.",
};

export default function SponsorlukBasvurusuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
