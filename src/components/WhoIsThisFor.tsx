"use client";

export default function WhoIsThisFor() {
  const painPoints = [
    {
      icon: "🔄",
      title: "Relying on Referrals",
      description: "Unpredictable pipeline that dries up randomly",
    },
    {
      icon: "💸",
      title: "Expensive Ads",
      description: "High CAC eating into your margins",
    },
    {
      icon: "👥",
      title: "Underperforming In-house Teams",
      description: "SDRs not hitting their targets",
    },
    {
      icon: "📉",
      title: "Agencies That Don't Deliver",
      description: "Empty promises, zero results",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--bg-primary)]" />

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#B1130F]/5 rounded-full blur-[150px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#B1130F]/5 rounded-full blur-[150px] -translate-y-1/2" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-sm font-medium text-[var(--text-secondary)]">Perfect Fit Check</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--text-primary)] mb-6">
            Who is This <span className="gradient-text">For?</span>
          </h2>

          <p className="text-[var(--text-secondary)] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Bleed AI is for <span className="text-[var(--text-primary)] font-medium">B2B companies</span> that are stuck relying on referrals, expensive ads, underperforming in-house teams, or agencies that don&apos;t move the needle.
          </p>
        </div>

        {/* Pain Points Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-[#B1130F]/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(177,19,15,0.1)]"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-[rgba(177,19,15,0.1)] flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {point.icon}
              </div>

              {/* Content */}
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">{point.title}</h3>
              <p className="text-sm text-[var(--text-muted)]">{point.description}</p>

              {/* Hover Line */}
              <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#B1130F] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
          ))}
        </div>

        {/* Bottom CTA Box */}
        <div className="relative rounded-2xl border border-[var(--border-color)] bg-gradient-to-r from-[var(--bg-secondary)] via-[rgba(177,19,15,0.05)] to-[var(--bg-secondary)] p-8 md:p-10 text-center overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #B1130F 1px, transparent 0)`,
              backgroundSize: '24px 24px'
            }} />
          </div>

          <div className="relative z-10">
            <p className="text-[var(--text-primary)] text-lg md:text-xl font-medium mb-2">
              If this sounds like you...
            </p>
            <p className="text-[var(--text-secondary)] mb-6">
              Let&apos;s build a revenue machine that actually works.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/book-call/"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#B1130F] text-white font-semibold text-lg rounded-full overflow-hidden transition-all duration-500 btn-glow"
              >
                <span className="relative z-10">Launch my Free Campaign</span>
                <svg
                  className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

              <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm">
                <svg className="w-4 h-4 text-[#22c55e]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>No commitment required</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
