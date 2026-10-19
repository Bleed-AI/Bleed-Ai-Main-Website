import type { Metadata } from "next";
import { generateMetadata as buildMeta } from "@/lib/seo";
import Navigation from "@/components/Navigation";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export const metadata: Metadata = buildMeta({
  title: "Pricing",
  description: "How we work with you: a qualified trial, a one-time Sprint, and monthly plans. No lock-in, and you keep the domains, lists and every thread.",
  path: "/pricing",
  // noindex during the rebuild review; switched on at go-live.
  noindex: true,
});

export default function PricingPage() {
  return (
    <main className="bai relative overflow-x-clip">
      <Navigation />
      <Pricing />
      <Footer />
    </main>
  );
}
