import type { Metadata } from "next";
import { generateMetadata as buildMeta } from "@/lib/seo";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ChannelStack from "@/components/ChannelStack";
import StatsStrip from "@/components/StatsStrip";
import RepliesMarquee from "@/components/RepliesMarquee";
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

// Staging mirror of the live homepage (src/app/page.tsx).
// Keep this in sync with live. To trial a change in isolation, copy the
// specific component into a "-Test" version and swap it in here only.
export default function HomeTest() {
  return (
    <main className="bai relative overflow-x-clip">
      {/* .bai-bg + CursorGlow now mounted site-wide in app/layout.tsx */}
      <Navigation />
      <Hero />
      <ChannelStack />
      <StatsStrip />
      <RepliesMarquee />
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
