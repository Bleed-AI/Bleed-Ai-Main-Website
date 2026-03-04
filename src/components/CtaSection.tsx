"use client";

import { CheckIcon, ArrowRightIcon } from "./Icons";

export default function CtaSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--bg-primary)]" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#B1130F]/5 via-transparent to-[#B1130F]/5" />

      {/* Top and Bottom Lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B1130F]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B1130F]/30 to-transparent" />

      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#B1130F]/10 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-[var(--text-primary)] mb-4">
          Ready to <span className="gradient-text">Scale Your Pipeline?</span>
        </h2>
        <p className="text-[var(--text-secondary)] text-lg mb-8 max-w-xl mx-auto">
          Join B2B companies generating 100+ qualified opportunities every month.
        </p>
        <a
          href="/book-call/"
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#B1130F] text-white font-semibold text-lg rounded-full overflow-hidden transition-all duration-500 btn-glow"
        >
          <span className="relative z-10">Launch my Free Campaign</span>
          <ArrowRightIcon className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
        </a>
        <div className="flex justify-center items-center gap-6 text-sm text-[var(--text-muted)] mt-6">
          <span className="flex items-center gap-2">
            <CheckIcon className="w-4 h-4 text-green-500" />
            Zero Cost to Start
          </span>
          <span className="flex items-center gap-2">
            <CheckIcon className="w-4 h-4 text-green-500" />
            Launch in 48 Hours
          </span>
        </div>
      </div>
    </section>
  );
}
