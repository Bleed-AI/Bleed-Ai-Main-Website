"use client";

export default function TahaLinkedinSnippet() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--bg-secondary)]" />
      <div className="absolute inset-0 bg-grid-pattern" />

      {/* Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#B1130F]/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#B1130F]/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-sm font-medium text-[var(--text-secondary)]">Meet The Founder</span>
          </div>
        </div>

        {/* Founder Card */}
        <a
          href="https://www.linkedin.com/in/taha-bleedai"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-8 md:p-10 hover:border-[#B1130F]/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(177,19,15,0.1)]"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
            {/* Left Side - Avatar & Name */}
            <div className="flex flex-col items-center flex-shrink-0">
              {/* Avatar with red ring */}
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#B1130F] to-[#ff3d38] p-1">
                <div className="w-full h-full rounded-full overflow-hidden bg-[var(--bg-secondary)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/taha-anwar.jfif"
                    alt="Taha Anwar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Name with LinkedIn */}
              <div className="flex items-center gap-2 mt-4">
                <h3 className="font-bold text-lg text-[var(--text-primary)]">Taha Anwar</h3>
                <span className="text-[#0a66c2]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Right Side - Bio */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                Taha is the founder of Bleed AI, specializing in B2B lead generation and sales automation. With a background in AI engineering and a passion for helping businesses scale, he leads a team that has generated thousands of qualified opportunities for clients across industries.
              </p>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
