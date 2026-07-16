import type { Metadata } from "next";
import { generateMetadata as buildMeta } from "@/lib/seo";
import NavigationTest from "@/components/NavigationTest";
import HeroTest from "@/components/HeroTest";
import TickerTest from "@/components/TickerTest";
import StatsStrip from "@/components/StatsStrip";
import RepliesMarqueeTest from "@/components/RepliesMarqueeTest";
import ResultsMarquee from "@/components/ResultsMarquee";
import Framework from "@/components/Framework";
import Testimonials from "@/components/Testimonials";
import VsTable from "@/components/VsTable";
import InfraBento from "@/components/InfraBento";
import Founder from "@/components/Founder";
import Faq from "@/components/Faq";
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

export default function HomeTest() {
  return (
    <main className="bai relative overflow-x-clip" style={{ paddingTop: 0 }}>
      {/* .bai-bg + CursorGlow now mounted site-wide in app/layout.tsx */}
      <TickerTest />
      <NavigationTest />
      <HeroTest />
      <StatsStrip />
      <RepliesMarqueeTest />
      <Testimonials />
      <Framework />
      <ResultsMarquee />
      <VsTable />
      <InfraBento />
      <Founder />
      <Faq />
      <FinalCta />
      <Footer />
      <BookWidget />
      <ExitPopup />
      <SidePopup />
    </main>
  );
}
