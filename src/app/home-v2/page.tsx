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
  title: "Previous homepage (archived)",
  description: "Archived previous BleedAI homepage. Not for public discovery.",
  path: "/home-v2",
  noindex: true,
});

// Archived previous homepage, kept at /home-v2 (noindex) as a quick reference.
// The live homepage is now app/page.tsx. Full revert: branch pre-home-v2-swap-backup.
export default function HomeV2Archive() {
  return (
    <main className="bai relative overflow-x-clip">
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
