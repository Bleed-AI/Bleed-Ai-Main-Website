import type { Metadata } from "next";
import { generateMetadata as buildMeta } from "@/lib/seo";
import Navigation from "@/components/Navigation";
import Shortlisted from "@/components/Shortlisted";
import Footer from "@/components/Footer";

export const metadata: Metadata = buildMeta({
  title: "Shortlisted by BleedAI",
  description:
    "Get recommended by ChatGPT, Google's AI and Perplexity, and get in front of the same buyers on LinkedIn. Done for you, from $1,200 a month.",
  path: "/shortlisted",
  // New service page, hidden from search and kept out of the sitemap.
  noindex: true,
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
