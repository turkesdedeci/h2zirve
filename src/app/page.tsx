import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Program from "@/components/Program";
import Speakers from "@/components/Speakers";
import CallForPapers from "@/components/CallForPapers";
import Sponsors from "@/components/Sponsors";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Program />
        <Speakers />
        <CallForPapers />
        <Sponsors />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
