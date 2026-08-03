import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import CallForPapers from "@/components/CallForPapers";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Poster Çağrısı",
  description:
    "Türkiye Hidrojen Zirvesi 2026 poster çağrısı; kapsam, önemli tarihler, ödüller, yayın imkânı ve başvuru bilgileri.",
};

export default function PosterCagrisiPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-20">
        <CallForPapers standalone />
      </main>
      <Footer />
    </>
  );
}
