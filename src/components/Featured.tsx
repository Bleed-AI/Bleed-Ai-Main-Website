"use client";

import Image from "next/image";

export default function Featured() {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--bg-secondary)]" />

      {/* Top and Bottom Lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B1130F]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B1130F]/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--text-muted)] mb-6">
          As Featured In
        </p>
        <a
          href="https://usawire.com/cold-to-sold-how-bleed-ai-creates-predictable-b2b-pipeline-in-2025/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] transition-all duration-300 hover:border-[#B1130F]/30 hover:shadow-[0_0_30px_rgba(177,19,15,0.1)] hover:-translate-y-0.5 hover:scale-105"
        >
          <Image
            src="/images/usawire-logo.png"
            alt="USA Wire"
            width={150}
            height={40}
            className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity"
          />
        </a>
      </div>
    </section>
  );
}
