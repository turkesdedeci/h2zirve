import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Program from "@/components/Program";
import Speakers from "@/components/Speakers";
import Exhibitors from "@/components/Exhibitors";
import CallForPapers from "@/components/CallForPapers";
import Sponsors from "@/components/Sponsors";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Stats />
        <About />
        <Program preview />
        <Speakers />
        <Exhibitors />
        <CallForPapers compact />
        <Sponsors />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
