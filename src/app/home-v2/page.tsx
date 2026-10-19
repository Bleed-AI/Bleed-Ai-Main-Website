import type { Metadata } from "next";
import { generateMetadata as buildMeta } from "@/lib/seo";
import Navigation from "@/components/Navigation";
import HeroV2 from "@/components/HeroV2";
import NotATool from "@/components/NotATool";
import PassSystem from "@/components/PassSystem";
import ChannelStack from "@/components/ChannelStack";
import StatsStrip from "@/components/StatsStrip";
import RepliesMarquee from "@/components/RepliesMarquee";
import ResultsMarqueeTest from "@/components/ResultsMarqueeTest";
import Testimonials from "@/components/Testimonials";
import FounderTest from "@/components/FounderTest";
import FaqTest from "@/components/FaqTest";
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
// Built here first (noindex), then swapped into /. Sections get replaced
// step by step; for now the hero is new and the rest mirror live.
export default function HomeV2() {
  return (
    <main className="bai relative overflow-x-clip">
      <Navigation />
      <HeroV2 />
      <StatsStrip />
      <NotATool />
      <PassSystem />
      <ChannelStack />
      <RepliesMarquee />
      <Testimonials />
      <ResultsMarqueeTest />
      <FounderTest />
      <FaqTest />
      <FinalCta />
      <Footer />
      <BookWidget />
      <ExitPopup />
      <SidePopup />
    </main>
  );
}
