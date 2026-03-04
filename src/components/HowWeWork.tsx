"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon } from "./Icons";

const partnershipFeatures = [
  {
    title: "One Partner Per Niche",
    description: "We only work with one agency per vertical/geo combo. Your competitors can't access our system.",
  },
  {
    title: "Proof Before Payment",
    description: "We run a free campaign first. You only pay when we've proven we can book meetings for your offer.",
  },
  {
    title: "Performance-Based Pricing",
    description: "No retainers, no monthly fees. You pay per qualified meeting booked — aligned incentives.",
  },
  {
    title: "Full Infrastructure Access",
    description: "Warmed inboxes, domains, automation, and AI personalization — all managed for you.",
  },
];

function FeatureCard({ feature, index }: { feature: typeof partnershipFeatures[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] transition-all duration-500 hover:border-[#B1130F]/50 hover:shadow-[0_0_40px_rgba(177,19,15,0.1)] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start gap-4">
        {/* Checkmark Icon */}
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#B1130F]/20 flex items-center justify-center mt-0.5">
          <svg className="w-4 h-4 text-[#B1130F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Content */}
        <div>
          <h3 className="font-display text-lg font-semibold text-[var(--text-primary)] mb-2">
            {feature.title}
          </h3>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function HowWeWork() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--bg-primary)]" />
      <div className="absolute inset-0 bg-dot-pattern" />

      {/* Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#B1130F]/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#B1130F]/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-sm font-medium text-[var(--text-secondary)]">How We Work</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--text-primary)] mb-4">
            Exclusive <span className="gradient-text">Partnership Model</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            We don&apos;t work with everyone. Here&apos;s how our exclusive partnership works.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {partnershipFeatures.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* Limited Availability Banner */}
        <div
          ref={ref}
          className={`relative rounded-2xl border border-[var(--border-color)] bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)] p-8 text-center overflow-hidden transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          {/* Bottom Glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#B1130F]/20 rounded-full blur-[100px]" />

          <div className="relative z-10">
            {/* Warning Icon & Title */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <svg className="w-5 h-5 text-[#B1130F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="font-display text-lg font-semibold text-[var(--text-primary)]">Limited Availability</span>
            </div>

            {/* Description */}
            <p className="text-[var(--text-secondary)] text-sm mb-6 max-w-lg mx-auto">
              We only partner with <span className="text-[var(--text-primary)] font-semibold">5 new agencies per month</span> to ensure quality and maintain exclusivity. Once your niche is taken, it&apos;s locked.
            </p>

            {/* CTA Button */}
            <a
              href="/book-call/"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#B1130F] text-white font-semibold rounded-full overflow-hidden transition-all duration-500 btn-glow"
            >
              <span className="relative z-10">Check If Your Niche is Available</span>
              <ArrowRightIcon className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
