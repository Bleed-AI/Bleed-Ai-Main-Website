"use client";

import { CheckIcon } from "./Icons";

const comparisonData = [
  {
    feature: "Approach",
    bleedai: "Hyper-personalized AI-powered outreach",
    other: "Generic templates sent to everyone",
  },
  {
    feature: "Lead Quality",
    bleedai: "Decision-makers matching your ICP",
    other: "Random contacts who never respond",
  },
  {
    feature: "Time to Results",
    bleedai: "Launch in 48 hours, leads in days",
    other: "Weeks of setup, months to see results",
  },
  {
    feature: "Pricing",
    bleedai: "Performance-based, transparent pricing",
    other: "High retainers with no guarantees",
  },
  {
    feature: "Deliverability",
    bleedai: "98%+ inbox placement rate",
    other: "Emails landing in spam",
  },
  {
    feature: "Support",
    bleedai: "Dedicated team optimizing daily",
    other: "Set it and forget it approach",
  },
  {
    feature: "Technology",
    bleedai: "AI-driven personalization at scale",
    other: "Basic mail merge tools",
  },
  {
    feature: "Results",
    bleedai: "100+ opportunities per month",
    other: "A handful of lukewarm leads",
  },
];

export default function ComparisonBlock() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--bg-primary)]" />
      <div className="absolute inset-0 bg-grid-pattern" />

      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#B1130F]/5 rounded-full blur-[150px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#B1130F]/5 rounded-full blur-[150px] -translate-y-1/2" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-sm font-medium text-[var(--text-secondary)]">The Difference</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--text-primary)] mb-4">
            Bleed AI vs. <span className="gradient-text">Other Agencies</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            See why B2B companies choose us over traditional lead-gen agencies.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-3 gap-4 p-6 border-b border-[var(--border-color)]">
            <div className="text-[var(--text-muted)] font-semibold text-sm uppercase tracking-wider">
              Feature
            </div>
            <div className="text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#B1130F] to-[#ff3d38] rounded-full text-sm font-bold text-white">
                Bleed AI
              </span>
            </div>
            <div className="text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-full text-sm font-medium text-[var(--text-muted)]">
                Other Agencies
              </span>
            </div>
          </div>

          {/* Table Rows */}
          {comparisonData.map((row, index) => (
            <div
              key={index}
              className={`grid grid-cols-3 gap-4 p-6 ${
                index !== comparisonData.length - 1 ? "border-b border-[var(--border-color)]" : ""
              } hover:bg-[var(--bg-primary)]/50 transition-colors duration-300`}
            >
              <div className="font-medium text-[var(--text-primary)]">{row.feature}</div>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 text-sm text-green-400">
                  <CheckIcon className="w-4 h-4 flex-shrink-0" />
                  <span>{row.bleedai}</span>
                </div>
              </div>
              <div className="text-center text-sm text-[var(--text-muted)]">
                {row.other}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
