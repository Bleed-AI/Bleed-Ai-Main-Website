import type { Metadata } from "next";
import { generateMetadata as buildMeta } from "@/lib/seo";
import Navigation from "@/components/Navigation";
import TrialFlow from "@/components/TrialFlow";
import TrialApply from "@/components/TrialApply";
import Footer from "@/components/Footer";

export const metadata: Metadata = buildMeta({
  title: "Apply for a trial",
  description: "See the replies before you pay us. If your product already sells, we build a list of about 1,500 of your buyers, write the campaign with you, send it, and hand you every reply.",
  path: "/trial",
  // noindex during the rebuild review; switched on at go-live.
  noindex: true,
});

const whatYouGet = [
  "About 1,500 of your real buyers",
  "Two emails, every reply handed to you",
  "A clear readout at the end",
];
const whatWeNeed = [
  "A 15 minute copy call with you",
  "Someone to take the positive replies",
  "Honest access to your product and results",
];
const whoFor = [
  "Products that already sell",
  "Repeat or contract customers",
  "A market of thousands of buyers",
];

function Col({ title, items, tone }: { title: string; items: string[]; tone: "good" | "muted" }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#12121b,#0b0b12)] p-7">
      <h3 className="font-semibold text-[15px] text-white mb-4">{title}</h3>
      <ul className="flex flex-col gap-3">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-3 text-[14px] leading-snug text-white/75">
            <span className={`mt-[7px] h-[7px] w-[7px] flex-shrink-0 rounded-full ${tone === "good" ? "bg-[#3ecf8e] shadow-[0_0_8px_#3ecf8e]" : "bg-[#4a4f68]"}`} />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TrialPage() {
  return (
    <main className="bai relative overflow-x-clip">
      <Navigation />

      {/* Hero + form first */}
      <section id="apply" className="px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <div className="sec-label">The trial</div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4 leading-tight">
            See the replies before you pay us.
          </h1>
          <p className="text-white/60 text-[15px] leading-relaxed max-w-xl mx-auto">
            If your product already sells, we build the list, write the campaign with you, send it,
            and hand you every reply. Three questions to see if you qualify.
          </p>
        </div>
        <TrialApply />
      </section>

      {/* What you get / need / who it is for */}
      <section className="px-6 lg:px-8 pb-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          <Col title="What you get" items={whatYouGet} tone="good" />
          <Col title="What we need from you" items={whatWeNeed} tone="muted" />
          <Col title="Who it is for" items={whoFor} tone="good" />
        </div>
      </section>

      {/* How the trial runs */}
      <TrialFlow />

      <Footer />
    </main>
  );
}
