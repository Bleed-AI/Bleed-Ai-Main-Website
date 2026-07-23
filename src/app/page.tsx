import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
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

export default function Home() {
  return (
    <main className="bai relative overflow-x-clip">
      {/* .bai-bg + CursorGlow now mounted site-wide in app/layout.tsx */}
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
