import type { Metadata } from "next";
import { generateMetadata as buildMeta } from "@/lib/seo";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SlotIndex from "@/components/slot-page/SlotIndex";

export const metadata: Metadata = buildMeta({
  title: "Every slot",
  description: "Every marketing slot BleedAI runs, grouped by LinkedIn, website and AI search, and outbound. Pick your slots. Swap any slot to what's working.",
  path: "/slots",
  noindex: false,
});

export default function SlotsIndexPage() {
  return (
    <main className="bai relative overflow-x-clip">
      <Navigation />
      <SlotIndex />
      <Footer />
    </main>
  );
}
