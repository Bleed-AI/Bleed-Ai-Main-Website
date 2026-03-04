"use client";

import { WarningIcon, CheckCircleIcon } from "./Icons";

export default function WhyAI() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--bg-primary)]" />
      <div className="absolute inset-0 bg-dot-pattern" />

      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#B1130F]/5 rounded-full blur-[150px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#B1130F]/5 rounded-full blur-[150px] -translate-y-1/2" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-sm font-medium text-[var(--text-secondary)]">The Reality</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--text-primary)] mb-4">
            Why Most Lead-Gen Agencies{" "}
            <span className="gradient-text">Fail</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            Understanding the problem is the first step to finding the right solution.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Problem */}
          <div className="group p-8 rounded-2xl border border-red-500/20 bg-red-500/5 hover:border-red-500/40 transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                <WarningIcon className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="font-display text-xl font-bold text-red-500">The Problem</h3>
            </div>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Most agencies rely on generic templates, spray-and-pray tactics, and outdated methods. They promise the moon but deliver empty pipelines and wasted budgets.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              The result? Months of effort, money spent on leads that never convert, and a sales team frustrated with low-quality prospects that don&apos;t match your ICP.
            </p>
          </div>

          {/* Solution */}
          <div className="group p-8 rounded-2xl border border-green-500/20 bg-green-500/5 hover:border-green-500/40 transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="font-display text-xl font-bold text-green-500">The Bleed AI Way</h3>
            </div>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              We build hyper-personalized outreach systems powered by AI. Every message is crafted for your specific ICP, every campaign is optimized for conversions.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Our Cold-to-Sold system delivers predictable, scalable results. You get qualified opportunities, not just leads — real meetings with decision-makers ready to buy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
