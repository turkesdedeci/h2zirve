import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
  display: "swap",
});

const siteDescription =
  "TESPAM tarafından Ankara Yıldırım Beyazıt Üniversitesi ev sahipliğinde düzenlenen Türkiye Hidrojen Zirvesi 2026 — 22–23 Ekim 2026, Ankara.";

export const metadata: Metadata = {
  title: {
    default: "Türkiye Hidrojen Zirvesi 2026 | 22–23 Ekim · Ankara",
    template: "%s | Türkiye Hidrojen Zirvesi 2026",
  },
  description: siteDescription,
  icons: { icon: "/logos/turkiye-hidrojen-zirvesi-logo-v4.png" },
  openGraph: {
    title: "Türkiye Hidrojen Zirvesi 2026",
    description: siteDescription,
    type: "website",
    locale: "tr_TR",
    siteName: "Türkiye Hidrojen Zirvesi 2026",
    images: [{ url: "/logos/turkiye-hidrojen-zirvesi-logo-v4.png" }],
  },
  twitter: {
    card: "summary",
    title: "Türkiye Hidrojen Zirvesi 2026",
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
