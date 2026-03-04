import Navigation from "@/components/Navigation";
import BackgroundOrbs from "@/components/BackgroundOrbs";
import Hero from "@/components/Hero";
import RevenueMachine from "@/components/RevenueMachine";
import CampaignSnapshots from "@/components/CampaignSnapshots";
import WhoIsThisFor from "@/components/WhoIsThisFor";
import Testimonials from "@/components/Testimonials";
import ValidateCta from "@/components/ValidateCta";
import EmailThreads from "@/components/EmailThreads";
import WhyAI from "@/components/WhyAI";
import TahaLinkedinSnippet from "@/components/TahaLinkedinSnippet";
import Capabilities from "@/components/Capabilities";
import ComparisonBlock from "@/components/ComparisonBlock";
import Featured from "@/components/Featured";
import HowWeWork from "@/components/HowWeWork";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <BackgroundOrbs />
      <Navigation />
      <Hero />
      <RevenueMachine />
      <CampaignSnapshots />
      <WhoIsThisFor />
      <Testimonials />
      <ValidateCta />
      <EmailThreads />
      <WhyAI />
      <TahaLinkedinSnippet />
      <Capabilities />
      <ComparisonBlock />
      <Featured />
      <HowWeWork />
      <FinalCta />
      <Footer />
    </main>
  );
}
