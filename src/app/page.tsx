import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import StatsStrip from "@/components/StatsStrip";
import RepliesMarquee from "@/components/RepliesMarquee";
import ResultsMarquee from "@/components/ResultsMarquee";
import WhoIsThisFor from "@/components/WhoIsThisFor";
import Framework from "@/components/Framework";
import InfraBento from "@/components/InfraBento";
import Testimonials from "@/components/Testimonials";
import WhyAI from "@/components/WhyAI";
import TahaLinkedinSnippet from "@/components/TahaLinkedinSnippet";
import ComparisonBlock from "@/components/ComparisonBlock";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

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
      {/* --- sections below are being migrated to the mockup design phase-by-phase --- */}
      <Testimonials />
      <WhyAI />
      <ComparisonBlock />
      <InfraBento />
      <TahaLinkedinSnippet />
      <FinalCta />
      <Footer />
    </main>
  );
}
