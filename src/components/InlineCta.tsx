export default function InlineCta() {
  return (
    <div className="my-12 not-prose">
      <div className="relative overflow-hidden rounded-2xl border border-[#B1130F]/30 bg-gradient-to-br from-[rgba(177,19,15,0.12)] via-[rgba(177,19,15,0.06)] to-transparent p-6 sm:p-8">
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#B1130F]/20 blur-3xl pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
          <div className="flex-1">
            <div className="text-xs font-semibold tracking-wider uppercase text-[#B1130F] mb-2">
              Want this for your business?
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-[var(--text-primary)] leading-snug">
              We run The Outbound Sprint: up to 8 cold email experiments in 6 weeks, one fixed price.
            </h3>
          </div>
          <a
            href="https://calculator.bleedai.com/sprint"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#B1130F] text-white font-semibold text-sm rounded-full overflow-hidden transition-all duration-300 btn-glow whitespace-nowrap"
          >
            <span className="relative z-10">Start Your Sprint</span>
            <svg
              className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
