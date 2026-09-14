import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ana Sayfa Tasarım Denemesi",
  robots: { index: false, follow: false },
};

export default function TrialLayout({ children }: { children: React.ReactNode }) {
  return children;
}
