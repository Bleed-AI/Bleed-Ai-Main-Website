import Navigation from "@/components/Navigation";
import HomeHero from "@/components/home/HomeHero";
import StatsStrip from "@/components/StatsStrip";
import Outcomes from "@/components/home/Outcomes";
import HowItWorks from "@/components/home/HowItWorks";
import Demos from "@/components/home/Demos";
import HybridPackage from "@/components/home/HybridPackage";
import RepliesMarquee from "@/components/RepliesMarquee";
import Testimonials from "@/components/Testimonials";
import ResultsMarqueeTest from "@/components/ResultsMarqueeTest";
import HomeFounder from "@/components/home/HomeFounder";
import HomeFaq from "@/components/home/HomeFaq";
import HomeFinalCta from "@/components/home/HomeFinalCta";
import Footer from "@/components/Footer";

// Homepage, slot model (2026-10-30). Inherits indexed SEO metadata from app/layout.tsx; do not add noindex here.
// The old outbound sections (NotATool, SignalSheet, PassSystem, EveryDoor, InfraLine, AiFollowUp, TrialFlow,
// Pricing, WhoIsThisFor) moved off the homepage; their files are kept for the Outbound page and older routes.
// Proof components (RepliesMarquee, Testimonials, ResultsMarqueeTest with id="results-section") stay unchanged (D12 veto).
// Round 2 (2026-10-30): visitor word is "service" (code keeps "slot"). The strategy-call popups (ExitPopup,
// SidePopup, BookWidget) and the ROI band left the homepage; the ROI calculator lives on /outbound.
// Outcome cards are text only; Demos holds the four realistic examples.
// Previous homepage is archived at /home-v2 (noindex). Revert: branch pre-home-v2-swap-backup.
export default function Home() {
  return (
    <main className="bai relative overflow-x-clip">
      <Navigation />
      <HomeHero />
      <StatsStrip />
      <Outcomes />
      <Demos />
      <HowItWorks />
      <HybridPackage />
      <RepliesMarquee />
      <Testimonials />
      <ResultsMarqueeTest />
      <HomeFounder />
      <HomeFaq />
      <HomeFinalCta />
      <Footer />
    </main>
  );
}
