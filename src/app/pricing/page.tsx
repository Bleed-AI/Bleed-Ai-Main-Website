import type { Metadata } from "next";
import { generateMetadata as buildMeta } from "@/lib/seo";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PricingStyles from "@/components/pricing/PricingStyles";
import PricingHero from "@/components/pricing/PricingHero";
import OutcomePicker from "@/components/pricing/OutcomePicker";
import SlotBuilder from "@/components/pricing/SlotBuilder";
import PriceTable from "@/components/pricing/PriceTable";
import SmallPrintFaq from "@/components/pricing/SmallPrintFaq";
import { money, SLOT_PRICE } from "@/lib/slots";

export const metadata: Metadata = buildMeta({
  title: "Pricing",
  description: `${money(SLOT_PRICE)} a slot, every 4th slot free. Pick an outcome, start from a ready board or build your own, and swap any slot to what's working. Month to month.`,
  path: "/pricing",
  noindex: false,
});

export default function PricingPage() {
  return (
    <main className="bai relative overflow-x-clip">
      <PricingStyles />
      <Navigation />
      <PricingHero />
      <OutcomePicker />
      <SlotBuilder />
      <PriceTable />
      <SmallPrintFaq />
      <Footer />
    </main>
  );
}
