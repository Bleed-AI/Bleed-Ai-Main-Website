import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { generateMetadata as buildMeta } from "@/lib/seo";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

type Segment = {
  name: string;
  signal: string;
  who_signs: string;
  doors: string[];
  sample_rows: { company: string; signal: string; who: string }[];
};
type Industry = { title: string; buyers: string; segments: Segment[] };

const DIR = path.join(process.cwd(), "src/content/industries");
const SEG_COLORS = ["#22c98a", "#4f8bff", "#a855f7", "#f5a623", "#ff5b56"];

function getIndustry(slug: string): Industry | null {
  const file = path.join(DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8")) as Industry;
}

export function generateStaticParams() {
  const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.endsWith(".json")) : [];
  return files.map((f) => ({ slug: f.replace(/\.json$/, "") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = getIndustry(slug);
  return buildMeta({
    title: data?.title ?? "Industries",
    description: data ? `${data.title}. ${data.buyers}` : "Outbound built for your industry.",
    path: `/industries/${slug}`,
    // noindex during the rebuild review; switched on at go-live.
    noindex: true,
  });
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getIndustry(slug);
  if (!data) notFound();

  return (
    <main className="bai relative overflow-x-clip">
      <Navigation />

      <section className="px-6 lg:px-8 pt-32 pb-12 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="sec-label">Industry</div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mt-2 mb-5 leading-tight">
            {data.title}
          </h1>
          <p className="text-white/65 text-lg leading-relaxed max-w-2xl mx-auto">{data.buyers}</p>
          <a href="/trial" className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 rounded-full bg-[#B1130F] text-white font-semibold text-[15px] hover:scale-105 transition-transform">
            Apply for a trial
          </a>
        </div>
      </section>

      <section className="px-6 lg:px-8 pb-24">
        <div className="max-w-5xl mx-auto flex flex-col gap-5">
          {data.segments.map((seg, idx) => {
            const c = SEG_COLORS[idx % SEG_COLORS.length];
            return (
              <div
                key={seg.name}
                className="rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#12121b,#0b0b12)] p-7"
                style={{ borderLeft: `3px solid ${c}` }}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[13px] text-white flex-shrink-0"
                      style={{ background: c }}
                    >
                      {idx + 1}
                    </span>
                    <h2 className="text-white font-semibold text-xl">{seg.name}</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {seg.doors.map((d) => (
                      <span
                        key={d}
                        className="font-mono text-[11px] px-2.5 py-1 rounded-md border text-white/85"
                        style={{ borderColor: `${c}55`, backgroundColor: `${c}14` }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                  <div className="rounded-xl p-4 border" style={{ borderColor: `${c}40`, backgroundColor: `${c}0f` }}>
                    <div className="font-mono text-[10.5px] uppercase tracking-wide mb-1.5" style={{ color: c }}>
                      We reach them when
                    </div>
                    <div className="text-white text-[15px] font-medium leading-snug">{seg.signal}</div>
                  </div>
                  <div className="rounded-xl p-4 border border-white/10 bg-white/[0.02]">
                    <div className="font-mono text-[10.5px] uppercase tracking-wide text-white/40 mb-1.5">Who signs</div>
                    <div className="text-white text-[15px] font-medium leading-snug">{seg.who_signs}</div>
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.06] overflow-hidden">
                  <div className="grid grid-cols-[1.3fr_1.3fr_1fr] gap-2 px-4 py-2 bg-white/[0.02] font-mono text-[10px] uppercase tracking-wide text-white/35">
                    <span>Company</span>
                    <span>Signal</span>
                    <span>Who signs</span>
                  </div>
                  {seg.sample_rows.map((r, i) => (
                    <div key={i} className="grid grid-cols-[1.3fr_1.3fr_1fr] gap-2 px-4 py-2 border-t border-white/[0.04] font-mono text-[11.5px] items-center">
                      <span className="text-white/60 blur-[3.5px] select-none">{r.company}</span>
                      <span className="text-white/70">{r.signal}</span>
                      <span className="text-white/45">{r.who}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How we work (shared) */}
      <section className="px-6 lg:px-8 pb-12">
        <div className="max-w-5xl mx-auto rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#12121b,#0b0b12)] p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div>
            <h3 className="text-white font-semibold text-lg mb-1.5">How we work these accounts</h3>
            <p className="text-white/60 text-[14px] leading-relaxed max-w-xl">
              We run each account in passes across email, LinkedIn and direct mail over about 30 days,
              and an AI agent answers every reply. Follow-up is our job, not yours.
            </p>
          </div>
          <a
            href="/pass-system"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-white font-semibold text-[14px] hover:border-[#ff6b67] hover:text-[#ff6b67] transition-colors"
          >
            See the Pass System
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        </div>
      </section>

      {/* Bottom CTA (shared) */}
      <section className="px-6 lg:px-8 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            Ready to reach your buyers?
          </h2>
          <p className="text-white/60 text-[15px] leading-relaxed mb-8 max-w-lg mx-auto">
            See the replies before you pay us. Apply for a trial, or book a call to talk it through.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/trial" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#B1130F] text-white font-semibold text-[15px] hover:scale-105 transition-transform">
              Apply for a trial
            </a>
            <a href="/book-call" className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-white/15 text-white font-semibold text-[15px] hover:border-white/40 transition-colors">
              Book a call
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
