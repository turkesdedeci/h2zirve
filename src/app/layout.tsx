import type { Metadata, Viewport } from "next";
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
  "Ankara Yıldırım Beyazıt Üniversitesi (AYBÜ) ev sahipliği ve liderliğinde, H2TEAM koordinasyonunda ve TESPAM iş birliğiyle düzenlenen Türkiye Hidrojen Zirvesi 2026 — 22–23 Ekim 2026, Ankara.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hidrojenzirvesi.com"),
  title: {
    default: "Türkiye Hidrojen Zirvesi 2026 | 22–23 Ekim · Ankara",
    template: "%s | Türkiye Hidrojen Zirvesi 2026",
  },
  description: siteDescription,
  alternates: { canonical: "/" },
  icons: { icon: "/logos/turkiye-hidrojen-zirvesi-logo-v4.png" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Türkiye Hidrojen Zirvesi 2026",
    description: siteDescription,
    type: "website",
    locale: "tr_TR",
    siteName: "Türkiye Hidrojen Zirvesi 2026",
    url: "/",
    images: [
      {
        url: "/hero-visual.png",
        width: 1543,
        height: 842,
        alt: "Türkiye Hidrojen Zirvesi 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Türkiye Hidrojen Zirvesi 2026",
    description: siteDescription,
    images: ["/hero-visual.png"],
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#06091A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-h2-sm bg-h2-cyan px-4 py-2 text-sm font-semibold text-h2-bg transition-transform focus-visible:translate-y-0"
        >
          Ana içeriğe geç
        </a>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
