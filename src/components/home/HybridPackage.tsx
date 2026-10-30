import Reveal from "@/components/Reveal";
import PackageCard from "@/components/slots/PackageCard";
import { FREE_EVERY, HYBRID_PACKAGE, slotById } from "@/lib/slots";

/** The homepage hybrid: get found by the buyers searching, booked with the ones who are not. */
const FOUND = ["linkedin-posts", "articles"];
const BOOKED = ["email-campaign", "post-engagers"];

function Half({ label, line, ids, tone }: { label: string; line: string; ids: string[]; tone: "green" | "red" }) {
  return (
    <div className="rounded-2xl border border-[#1f1f30] bg-[#0d0d16]/80 p-5">
      <div className={`text-[11px] font-bold uppercase tracking-[0.14em] ${tone === "green" ? "text-[#34d399]" : "text-[#ff5a52]"}`}>{label}</div>
      <p className="mt-1.5 text-[14.5px] leading-relaxed text-[#c3c8dc]">{line}</p>
      <ul className="mt-3 flex flex-col gap-2">
        {ids.map((id) => (
          <li key={id} className="flex items-start gap-2 text-[13px] text-[#9099b8]">
            <span className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${tone === "green" ? "bg-[#34d399]" : "bg-[#ff5a52]"}`} />
            <span>
              <span className="font-semibold text-white">{slotById(id).name}:</span> {slotById(id).monthly}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HybridPackage() {
  return (
    <section id="found-and-booked" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <div>
            <Reveal className="sec-label">Not sure where to start?</Reveal>
            <Reveal as="h2" className="font-display mb-4 text-[32px] font-bold leading-[1.08] tracking-tight text-white sm:text-[44px]">
              {HYBRID_PACKAGE.name}: <em className="hd-em">both sides</em> of your pipeline.
            </Reveal>
            <Reveal as="p" className="mb-8 max-w-xl text-[16px] leading-relaxed text-[#9099b8]" delay={60}>
              Content gets you found. Outreach gets you booked. Most agencies sell you one half. These are the services we would pick for most companies on day one, and the {FREE_EVERY}th service is on us.
            </Reveal>
            <Reveal className="grid gap-4 sm:grid-cols-2" delay={100}>
              <Half label="Found" line="Buyers who are already looking find you, on Google, in AI answers and in their feed." ids={FOUND} tone="green" />
              <Half label="Booked" line="Buyers who are not looking yet hear from you first, and anyone who engages gets a follow-up." ids={BOOKED} tone="red" />
            </Reveal>
            <Reveal className="mt-6 flex flex-wrap items-center gap-2" delay={140}>
              <span className="mr-1 text-[13px] text-[#7d84a3]">Want different services?</span>
              <a href="/pricing/#builder" className="text-[13.5px] font-semibold text-white underline decoration-[#B1130F]/70 underline-offset-4 hover:decoration-[#B1130F]">
                Build your own
              </a>
            </Reveal>
          </div>
          <Reveal delay={80} className="lg:sticky lg:top-28">
            <PackageCard id={HYBRID_PACKAGE.id} name={HYBRID_PACKAGE.name} pitch={HYBRID_PACKAGE.pitch} items={HYBRID_PACKAGE.items} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
