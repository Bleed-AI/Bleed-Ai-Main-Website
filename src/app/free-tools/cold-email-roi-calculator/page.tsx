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
      {/* .bai-bg + CursorGlow now mounted site-wide in app/layout.tsx */}
      <Navigation />
      <RoiCalculator />
      <Footer />
    </main>
  );
}
