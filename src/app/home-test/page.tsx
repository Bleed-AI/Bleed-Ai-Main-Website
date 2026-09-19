import type { Metadata } from "next";
import { generateMetadata as buildMeta } from "@/lib/seo";
import Navigation from "@/components/Navigation";
import HeroTest from "@/components/HeroTest";
import ChannelStack from "@/components/ChannelStack";
import ProcessFlow from "@/components/ProcessFlow";
import StatsStrip from "@/components/StatsStrip";
import RepliesMarquee from "@/components/RepliesMarquee";
import ResultsMarqueeTest from "@/components/ResultsMarqueeTest";
import FrameworkTest from "@/components/FrameworkTest";
import Testimonials from "@/components/Testimonials";
import VsTableTest from "@/components/VsTableTest";
import InfraBentoTest from "@/components/InfraBentoTest";
import FounderTest from "@/components/FounderTest";
import FaqTest from "@/components/FaqTest";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import BookWidget from "@/components/BookWidget";
import ExitPopup from "@/components/ExitPopup";
import SidePopup from "@/components/SidePopup";

export const metadata: Metadata = buildMeta({
  title: "Home Test (Internal)",
  description: "Internal testing copy of the BleedAI homepage. Not for public discovery.",
  path: "/home-test",
  noindex: true,
});

// Staging mirror of the live homepage (src/app/page.tsx).
// Keep this in sync with live. To trial a change in isolation, copy the
// specific component into a "-Test" version and swap it in here only.
export default function HomeTest() {
  return (
    <main className="bai relative overflow-x-clip">
      {/* .bai-bg + CursorGlow now mounted site-wide in app/layout.tsx */}
      <Navigation />
      <HeroTest />
      <ChannelStack />
      <ProcessFlow />
      <StatsStrip />
      <RepliesMarquee />
      <Testimonials />
      <FrameworkTest />
      <ResultsMarqueeTest />
      <VsTableTest />
      <InfraBentoTest />
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
