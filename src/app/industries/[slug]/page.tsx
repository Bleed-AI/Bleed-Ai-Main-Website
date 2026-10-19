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
          {data.segments.map((seg) => (
            <div key={seg.name} className="rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#12121b,#0b0b12)] p-7">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <h2 className="text-white font-semibold text-xl">{seg.name}</h2>
                <div className="flex flex-wrap gap-2">
                  {seg.doors.map((d) => (
                    <span key={d} className="font-mono text-[11px] px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.03] text-white/70">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mb-5 text-[14px]">
                <div className="flex gap-3"><span className="w-20 flex-shrink-0 text-white/40">Signal</span><span className="text-white/80">{seg.signal}</span></div>
                <div className="flex gap-3"><span className="w-20 flex-shrink-0 text-white/40">Who signs</span><span className="text-white/80">{seg.who_signs}</span></div>
              </div>

              <div className="rounded-xl border border-white/[0.07] overflow-hidden">
                <div className="grid grid-cols-[1.3fr_1.3fr_1fr] gap-2 px-4 py-2.5 bg-white/[0.03] font-mono text-[10.5px] uppercase tracking-wide text-white/40">
                  <span>Company</span><span>Signal</span><span>Who signs</span>
                </div>
                {seg.sample_rows.map((r, i) => (
                  <div key={i} className="grid grid-cols-[1.3fr_1.3fr_1fr] gap-2 px-4 py-2.5 border-t border-white/[0.05] font-mono text-[12px] items-center">
                    <span className="text-white/80 blur-[3.5px] select-none">{r.company}</span>
                    <span className="text-white/80">{r.signal}</span>
                    <span className="text-white/60">{r.who}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
