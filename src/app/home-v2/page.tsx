import type { Metadata } from "next";
import { generateMetadata as buildMeta } from "@/lib/seo";
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

export const metadata: Metadata = buildMeta({
  title: "Home v2 (Internal)",
  description: "Internal staging build of the new BleedAI homepage. Not for public discovery.",
  path: "/home-v2",
  noindex: true,
});

// Staging build of the new homepage rebuild (2026-10 brief).
// Built here first (noindex), then swapped into /.
export default function HomeV2() {
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
