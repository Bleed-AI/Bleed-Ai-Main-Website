import type { Metadata } from "next";
import { generateMetadata as buildMeta } from "@/lib/seo";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SlotIndex from "@/components/slot-page/SlotIndex";

export const metadata: Metadata = buildMeta({
  title: "Every service",
  description: "Every marketing service BleedAI runs, grouped by LinkedIn, website and AI search, and outbound. Each one is a full service on its own. Pick your services. Swap any service, any month, to what's working.",
  path: "/services",
  noindex: false,
});

export default function ServicesIndexPage() {
  return (
    <main className="bai relative overflow-x-clip">
      <Navigation />
      <SlotIndex />
      <Footer />
    </main>
  );
}
