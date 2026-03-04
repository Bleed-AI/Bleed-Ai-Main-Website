"use client";

import { ArrowRightIcon } from "./Icons";

export default function ValidateCta() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--bg-secondary)]" />

      {/* Top and Bottom Lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B1130F]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B1130F]/20 to-transparent" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#B1130F]/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Heading */}
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--text-primary)] mb-8">
          Let&apos;s Validate Your Offer Today
        </h2>

        {/* CTA Button */}
        <a
          href="/book-call/"
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#B1130F] text-white font-semibold text-lg rounded-full overflow-hidden transition-all duration-500 btn-glow mb-6"
        >
          <span className="relative z-10">Launch My Free Campaign</span>
          <ArrowRightIcon className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </a>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center gap-6 text-sm text-[var(--text-muted)]">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Zero Cost
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Launch in 48 Hours
          </span>
        </div>
      </div>
    </section>
  );
}
