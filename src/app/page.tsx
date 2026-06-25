import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import StatsStrip from "@/components/StatsStrip";
import RepliesMarquee from "@/components/RepliesMarquee";
import ResultsMarquee from "@/components/ResultsMarquee";
import Framework from "@/components/Framework";
import Testimonials from "@/components/Testimonials";
import VsTable from "@/components/VsTable";
import InfraBento from "@/components/InfraBento";
import Founder from "@/components/Founder";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import BookWidget from "@/components/BookWidget";
import ExitPopup from "@/components/ExitPopup";
import SidePopup from "@/components/SidePopup";
import CursorGlow from "@/components/CursorGlow";

export default function Home() {
  return (
    <main className="bai relative overflow-x-clip">
      {/* Site-wide fixed glow layer behind all content (mockup's global orbs) */}
      <div className="bai-bg" aria-hidden="true">
        <div className="bai-orb1" />
        <div className="bai-orb2" />
        <div className="bai-orb3" />
      </div>
      <CursorGlow />
      <Ticker />
      <Navigation />
      <Hero />
      <StatsStrip />
      <RepliesMarquee />
      <Testimonials />
      <Framework />
      <ResultsMarquee />
      <VsTable />
      <InfraBento />
      <Founder />
      <Faq />
      <FinalCta />
      <Footer />
      <BookWidget />
      <ExitPopup />
      <SidePopup />
    </main>
  );
}
