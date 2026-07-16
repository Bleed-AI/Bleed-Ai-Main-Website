import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RoiCalculator from "@/components/RoiCalculator";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata = genMeta({
  title: "Cold Email ROI Calculator | Free Tool",
  description:
    "Project pipeline, revenue, ROI, and cost per meeting from your cold email campaigns. Set your lead volume, deal size, and funnel rates — live results.",
  path: "/free-tools/cold-email-roi-calculator",
  keywords: [
    "cold email ROI calculator",
    "cold email revenue calculator",
    "outbound ROI",
    "pipeline calculator",
    "cost per meeting",
  ],
});

export default function ColdEmailRoiCalculatorPage() {
  return (
    <main className="bai relative overflow-x-clip">
      {/* Site-wide fixed glow layer behind all content (mockup's global orbs) */}
      <div className="bai-bg" aria-hidden="true">
        <div className="bai-orb1" />
        <div className="bai-orb2" />
        <div className="bai-orb3" />
      </div>
      <Navigation />
      <RoiCalculator />
      <Footer />
    </main>
  );
}
