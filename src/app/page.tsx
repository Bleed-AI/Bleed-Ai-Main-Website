import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import StatsStrip from "@/components/StatsStrip";
import RepliesMarquee from "@/components/RepliesMarquee";
import ResultsMarquee from "@/components/ResultsMarquee";
import WhoIsThisFor from "@/components/WhoIsThisFor";
import Testimonials from "@/components/Testimonials";
import WhyAI from "@/components/WhyAI";
import TahaLinkedinSnippet from "@/components/TahaLinkedinSnippet";
import Capabilities from "@/components/Capabilities";
import ComparisonBlock from "@/components/ComparisonBlock";
import HowWeWork from "@/components/HowWeWork";
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
      {/* --- sections below are being migrated to the mockup design phase-by-phase --- */}
      <Testimonials />
      <WhyAI />
      <TahaLinkedinSnippet />
      <Capabilities />
      <ComparisonBlock />
      <HowWeWork />
      <FinalCta />
      <Footer />
    </main>
  );
}
