import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import StatsStrip from "@/components/StatsStrip";
import RepliesMarquee from "@/components/RepliesMarquee";
import WhoIsThisFor from "@/components/WhoIsThisFor";
import ResultsMarquee from "@/components/ResultsMarquee";
import Framework from "@/components/Framework";
import Testimonials from "@/components/Testimonials";
import BeforeAfter from "@/components/BeforeAfter";
import VsTable from "@/components/VsTable";
import InfraBento from "@/components/InfraBento";
import Founder from "@/components/Founder";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import BookWidget from "@/components/BookWidget";
import ExitPopup from "@/components/ExitPopup";

export default function Home() {
  return (
    <main className="bai relative overflow-hidden">
      <Navigation />
      <Ticker />
      <Hero />
      <StatsStrip />
      <RepliesMarquee />
      <WhoIsThisFor />
      <ResultsMarquee />
      <Framework />
      <Testimonials />
      <BeforeAfter />
      <VsTable />
      <InfraBento />
      <Founder />
      <Faq />
      <FinalCta />
      <Footer />
      <BookWidget />
      <ExitPopup />
    </main>
  );
}
