import { FREE_EVERY, TRIAL } from "@/lib/slots";

const ROI = "/free-tools/cold-email-roi-calculator/";

/** ROI calculator band: a light link for visitors weighing outbound. */
export function RoiBand() {
  return (
    <section id="roi" className="px-4 py-10 sm:px-8">
      <a
        href={ROI}
        className="group mx-auto flex max-w-[1216px] flex-col items-start gap-4 rounded-2xl border border-[#1f1f30] bg-[linear-gradient(120deg,#141420,#0d0d16_60%,#1a0d10)] p-6 transition-colors hover:border-[#B1130F]/50 sm:flex-row sm:items-center sm:justify-between sm:p-7"
      >
        <div className="flex items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#B1130F]/40 bg-[#B1130F]/10">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff5a52" strokeWidth="2" aria-hidden="true">
              <rect x="5" y="3" width="14" height="18" rx="2" />
              <path d="M8 7h8M8 11h2M12 11h2M16 11h0M8 15h2M12 15h2M8 18h2M12 18h4M16 15v3" strokeLinecap="round" />
            </svg>
          </span>
          <div>
            <div className="font-display text-[18px] font-bold text-white">Weighing up outbound?</div>
            <div className="text-[14px] text-[#9099b8]">See what a campaign could return for your numbers. Takes about 10 seconds.</div>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 text-[14px] font-semibold text-white">
          Open the ROI calculator
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </a>
    </section>
  );
}

/** Final call to action: the free trial. */
export default function HomeFinalCta() {
  return (
    <section id="final-cta">
      <div className="final-cta">
        <div className="sec-label" style={{ textAlign: "center", marginBottom: 10 }}>
          Start small, keep what works
        </div>
        <h2>
          Your last marketing team
          <br />
          <em>starts with a free trial.</em>
        </h2>
        <p>
          {TRIAL.length} on {TRIAL.slots}, made for you to judge. Then pick your plan, keep the services that work and swap the rest.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={TRIAL.href} className="btn-red" style={{ fontSize: 15.5, padding: "15px 32px" }}>
            {TRIAL.label} &rarr;
          </a>
          <a
            href="/pricing/"
            className="inline-flex items-center rounded-lg border border-[#2a2a3e] px-6 py-[13px] text-[14.5px] font-semibold text-white/90 transition-colors hover:border-white/30"
          >
            See pricing
          </a>
        </div>
        <div className="cta-trust">
          <span>Month to month</span>
          <span>Swap any service, any month</span>
          <span>Every {FREE_EVERY}th service free</span>
          <span>5.0★ across 3 platforms</span>
        </div>
      </div>
    </section>
  );
}
