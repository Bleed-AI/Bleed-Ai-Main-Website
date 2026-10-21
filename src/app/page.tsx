import Navigation from "@/components/Navigation";
import HeroV2 from "@/components/HeroV2";
import NotATool from "@/components/NotATool";
import SignalSheet from "@/components/SignalSheet";
import PassSystem from "@/components/PassSystem";
import EveryDoor from "@/components/EveryDoor";
import InfraLine from "@/components/InfraLine";
import AiFollowUp from "@/components/AiFollowUp";
import TrialFlow from "@/components/TrialFlow";
import StatsStrip from "@/components/StatsStrip";
import RepliesMarquee from "@/components/RepliesMarquee";
import ResultsMarqueeTest from "@/components/ResultsMarqueeTest";
import Testimonials from "@/components/Testimonials";
import WhoIsThisFor from "@/components/WhoIsThisFor";
import PricingTeaser from "@/components/PricingTeaser";
import FounderTest from "@/components/FounderTest";
import FaqV2 from "@/components/FaqV2";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import BookWidget from "@/components/BookWidget";
import ExitPopup from "@/components/ExitPopup";
import SidePopup from "@/components/SidePopup";

// New homepage (2026-10 rebuild). Inherits indexed SEO metadata from app/layout.tsx.
// Previous homepage is archived at /home-v2 (noindex). Revert: branch pre-home-v2-swap-backup.
export default function Home() {
  return (
    <main className="bai relative overflow-x-clip">
      <Navigation />
      <HeroV2 />
      <StatsStrip />
      <NotATool />
      <SignalSheet />
      <PassSystem />
      <EveryDoor />
      <InfraLine />
      <AiFollowUp />
      <TrialFlow />
      <RepliesMarquee />
      <Testimonials />
      <ResultsMarqueeTest />
      <WhoIsThisFor />
      <PricingTeaser />
      <FounderTest />
      <FaqV2 />
      <FinalCta />
      <Footer />
      <BookWidget />
      <ExitPopup />
      <SidePopup />
    </main>
  );
}
