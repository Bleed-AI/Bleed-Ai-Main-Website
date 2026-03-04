"use client";

import { useEffect } from 'react';
import { ArrowRightIcon } from './Icons';

interface CalendlyEmbedProps {
  url: string;
  title?: string;
  subtitle?: string;
  benefits?: string[];
}

export default function CalendlyEmbed({
  url,
  title = "Schedule Your Call",
  subtitle = "Choose a time that works best for you",
  benefits = []
}: CalendlyEmbedProps) {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section id="book-call" className="relative py-12 md:py-20 lg:py-24 bg-[var(--bg-secondary)] scroll-mt-20">
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B1130F] to-transparent opacity-50" />

      {/* Centered glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#B1130F]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-start">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-3 md:mb-4">
                {title}
              </h2>
              <p className="text-lg md:text-xl text-[var(--text-secondary)]">
                {subtitle}
              </p>
            </div>

            {benefits.length > 0 && (
              <div className="space-y-3 md:space-y-4">
                <h3 className="font-display text-xl md:text-2xl font-semibold text-[var(--text-primary)]">
                  What to Expect:
                </h3>
                <div className="space-y-2.5 md:space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2.5 md:gap-3">
                      <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-[rgba(177,19,15,0.1)] border border-[rgba(177,19,15,0.2)] flex items-center justify-center mt-0.5">
                        <ArrowRightIcon className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#B1130F]" />
                      </div>
                      <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trust Indicators */}
            <div className="pt-4 md:pt-6 border-t border-[var(--border-color)]">
              <div className="flex flex-wrap gap-3 md:gap-4">
                <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-[rgba(177,19,15,0.1)] border border-[rgba(177,19,15,0.2)] rounded-full">
                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#22c55e] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs md:text-sm text-[var(--text-primary)] whitespace-nowrap">30-min call</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-[rgba(177,19,15,0.1)] border border-[rgba(177,19,15,0.2)] rounded-full">
                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#22c55e] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs md:text-sm text-[var(--text-primary)] whitespace-nowrap">No obligation</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-[rgba(177,19,15,0.1)] border border-[rgba(177,19,15,0.2)] rounded-full">
                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#22c55e] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs md:text-sm text-[var(--text-primary)] whitespace-nowrap">Instant booking</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Calendly Embed */}
          <div className="relative">
            <div className="lg:sticky lg:top-24 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl md:rounded-2xl p-2 md:p-4 shadow-lg overflow-hidden">
              <div
                className="calendly-inline-widget w-full"
                data-url={url}
                style={{ minHeight: '600px', height: '600px' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B1130F] to-transparent opacity-50" />
    </section>
  );
}
