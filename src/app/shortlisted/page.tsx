import type { Metadata } from "next";
import { generateMetadata as buildMeta } from "@/lib/seo";
import Navigation from "@/components/Navigation";
import Shortlisted from "@/components/Shortlisted";
import Footer from "@/components/Footer";
import { itemsSlotCount, money, packageById, priceFor } from "@/lib/slots";

const starter = packageById("shortlisted-starter")!;

export const metadata: Metadata = buildMeta({
  title: "Shortlisted by BleedAI",
  description: `Get recommended by ChatGPT, Claude, Perplexity and Google's AI, and get in front of the same buyers on LinkedIn. Done for you, from ${money(
    priceFor(itemsSlotCount(starter.items))
  )} a month, month to month.`,
  path: "/shortlisted",
  noindex: false,
});

export default function ShortlistedPage() {
  return (
    <main className="bai relative overflow-x-clip">
      <Navigation />
      <Shortlisted />
      <Footer />
    </main>
  );
}
