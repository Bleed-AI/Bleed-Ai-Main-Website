"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon } from "./Icons";

export default function FinalCta() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--bg-secondary)]" />
      <div className="absolute inset-0 bg-grid-pattern" />

      {/* Large Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#B1130F]/10 rounded-full blur-[200px]" />

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-64 h-64">
        <div className="absolute top-8 left-8 w-32 h-[1px] bg-gradient-to-r from-[#B1130F] to-transparent" />
        <div className="absolute top-8 left-8 w-[1px] h-32 bg-gradient-to-b from-[#B1130F] to-transparent" />
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64">
        <div className="absolute bottom-8 right-8 w-32 h-[1px] bg-gradient-to-l from-[#B1130F] to-transparent" />
        <div className="absolute bottom-8 right-8 w-[1px] h-32 bg-gradient-to-t from-[#B1130F] to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
          <span className="text-sm font-medium text-[var(--text-secondary)]">Ready to Scale?</span>
        </div>

        {/* Headline */}
        <h2
          className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[var(--text-primary)] leading-[1.1] mb-6 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Stop Waiting for Leads.
          <br />
          <span className="gradient-text">Start Creating Them.</span>
        </h2>

        {/* Description */}
        <p
          className={`text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Join B2B companies that are generating 100+ qualified opportunities every month with our proven Cold-to-Sold system.
        </p>

        {/* CTA Button */}
        <div
          className={`transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="/book-call/"
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-[#B1130F] text-white font-semibold text-lg rounded-full overflow-hidden transition-all duration-500 btn-glow"
          >
            <span className="relative z-10">Launch my Free Campaign</span>
            <ArrowRightIcon className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Trust Indicators */}
        <div
          className={`flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-[var(--text-muted)] transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Zero Cost to Start</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-[var(--border-color)]" />
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Launch in 48 Hours</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-[var(--border-color)]" />
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>No Commitment</span>
          </div>
        </div>
      </div>
    </section>
  );
}
