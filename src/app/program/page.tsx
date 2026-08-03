import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Program from "@/components/Program";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Zirve Programı",
  description:
    "Türkiye Hidrojen Zirvesi 2026 iki günlük programı, keynote konuşmaları, paneller ve teknik oturumlar.",
};

export default function ProgramPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-20">
        <Program standalone />
      </main>
      <Footer />
    </>
  );
}
