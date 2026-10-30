/** Link band to the one-off campaign cost calculator. Styled to sit under RoiBand (home/HomeFinalCta). */
export default function CostCalcBand() {
  return (
    <div className="px-4 pb-10 sm:px-8">
      <a
        href="https://calculator.bleedai.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="group mx-auto flex max-w-[1216px] flex-col items-start gap-4 rounded-2xl border border-[#1f1f30] bg-[linear-gradient(120deg,#141420,#0d0d16_60%,#0d1a14)] p-6 transition-colors hover:border-[#10b981]/50 sm:flex-row sm:items-center sm:justify-between sm:p-7"
      >
        <div className="flex items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#10b981]/40 bg-[#10b981]/10">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 7h16M4 12h10M4 17h7" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </span>
          <div>
            <div className="font-display text-[18px] font-bold text-white">Want one campaign priced?</div>
            <div className="text-[14px] text-[#9099b8]">Not after a monthly plan? Price a single campaign for your market and volume.</div>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 text-[14px] font-semibold text-white">
          Open the campaign cost calculator
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </a>
    </div>
  );
}
