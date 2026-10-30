import type { Metadata } from "next";
import { generateMetadata as buildMeta } from "@/lib/seo";
import Navigation from "@/components/Navigation";
import InboundEngine from "@/components/inbound/InboundEngine";
import Footer from "@/components/Footer";
import { itemsSlotCount, money, packageById, priceFor } from "@/lib/slots";

const pkg = packageById("inbound")!;

export const metadata: Metadata = buildMeta({
  title: "Inbound Engine by BleedAI",
  description: `Turn your website into a lead source: a homepage that converts, articles that rank, a tool on your site that collects leads, and LinkedIn posts sending buyers to it. ${money(
    priceFor(itemsSlotCount(pkg.items))
  )} a month, month to month.`,
  path: "/inbound-engine",
  noindex: false,
});

export default function InboundEnginePage() {
  return (
    <main className="bai relative overflow-x-clip">
      <Navigation />
      <InboundEngine />
      <Footer />
    </main>
  );
}
