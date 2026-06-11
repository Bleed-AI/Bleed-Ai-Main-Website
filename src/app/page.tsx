import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import CampaignSnapshots from "@/components/CampaignSnapshots";
import WhoIsThisFor from "@/components/WhoIsThisFor";
import Testimonials from "@/components/Testimonials";
import EmailThreads from "@/components/EmailThreads";
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
      {/* --- sections below are being migrated to the mockup design phase-by-phase --- */}
      <CampaignSnapshots />
      <WhoIsThisFor />
      <Testimonials />
      <EmailThreads />
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
