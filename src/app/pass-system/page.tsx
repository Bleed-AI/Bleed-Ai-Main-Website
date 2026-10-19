import type { Metadata } from "next";
import { generateMetadata as buildMeta } from "@/lib/seo";
import Navigation from "@/components/Navigation";
import PassSystem from "@/components/PassSystem";
import Footer from "@/components/Footer";

export const metadata: Metadata = buildMeta({
  title: "The Pass System",
  description: "One email is easy to ignore. Four doors in 30 days is not. We work your target accounts in passes, each with a new door and a better reason, so the person who signs actually sees you.",
  path: "/pass-system",
  // noindex during the rebuild review; switched on at go-live.
  noindex: true,
});

const detail = [
  { day: "Day 0", title: "Warm on LinkedIn", goal: "Get on their radar", door: "LinkedIn", send: "A warm connection and a note that fits them", reply: "A connection accept, or any reply", color: "#4f8bff" },
  { day: "Day 3", title: "The give", goal: "Give before we ask", door: "Email", send: "Something genuinely useful, no pitch", reply: "A response, or a click that shows interest", color: "#ff5b56" },
  { day: "Day 12", title: "Inside the team", goal: "Get inside the account", door: "Email + LinkedIn", send: "A second person, a new angle", reply: "A forward, or a yes to talk", color: "#a855f7" },
  { day: "Day 20", title: "Every door", goal: "Use every door we have", door: "Direct mail + warm phone", send: "A physical card, then a warm call", reply: "A meeting booked", color: "#f5a623" },
];

const forks = [
  { label: "Yes", next: "We book the meeting and hand it to you.", color: "#22c98a" },
  { label: "Yes, then quiet", next: "The AI chases politely until they re-engage or clearly pass.", color: "#4f8bff" },
  { label: "Not now", next: "We park them and come back when the timing fits.", color: "#f5a623" },
  { label: "Remove me", next: "We stop at once and suppress them everywhere.", color: "#9099b8" },
];

export default function PassSystemPage() {
  return (
    <main className="bai relative overflow-x-clip">
      <Navigation />

      <PassSystem />

      {/* Each pass in detail */}
      <section className="px-6 lg:px-8 py-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white text-center mb-10">
            Four passes, four reasons to be seen.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {detail.map((d) => (
              <div
                key={d.day}
                className="rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#12121b,#0b0b12)] p-7"
                style={{ borderLeft: `3px solid ${d.color}` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[12px] font-bold" style={{ color: d.color }}>{d.day}</span>
                  <span className="text-white font-semibold text-[17px]">{d.title}</span>
                </div>
                <dl className="flex flex-col gap-2.5 text-[14px]">
                  <div className="flex gap-3"><dt className="w-24 flex-shrink-0 text-white/40">Goal</dt><dd className="text-white/80">{d.goal}</dd></div>
                  <div className="flex gap-3"><dt className="w-24 flex-shrink-0 text-white/40">Door</dt><dd className="text-white/80">{d.door}</dd></div>
                  <div className="flex gap-3"><dt className="w-24 flex-shrink-0 text-white/40">We send</dt><dd className="text-white/80">{d.send}</dd></div>
                  <div className="flex gap-3"><dt className="w-24 flex-shrink-0 text-white/40">Counts as</dt><dd className="text-white/80">{d.reply}</dd></div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The four branches */}
      <section className="px-6 lg:px-8 py-14">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white text-center mb-3">
            A reply can go four ways.
          </h2>
          <p className="text-white/60 text-center text-[15px] mb-10 max-w-xl mx-auto">
            Every response changes the path. Here is what each one means and what happens next.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {forks.map((f) => (
              <div key={f.label} className="rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#12121b,#0b0b12)] p-6">
                <span
                  className="inline-flex px-3 py-1.5 rounded-lg font-mono text-[12.5px] font-bold mb-4"
                  style={{ color: f.color, borderColor: `${f.color}66`, backgroundColor: `${f.color}1a`, border: `1px solid ${f.color}66` }}
                >
                  {f.label}
                </span>
                <p className="text-[14px] leading-relaxed text-white/75">{f.next}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
