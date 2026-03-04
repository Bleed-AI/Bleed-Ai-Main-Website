"use client";

import { useEffect, useState } from "react";
import { ArrowRightIcon } from "./Icons";
import NeuralNetworkBackground from "@/components/ui/neural-network-background";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <NeuralNetworkBackground />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-8 text-center pt-44 pb-24">
        {/* Main Headline */}
        <h1
          className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1] tracking-tight mb-5 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="block text-[var(--text-primary)]">We Install Revenue Systems</span>
          <span className="block gradient-text mt-2">that Scale B2B Firms in Weeks</span>
        </h1>

        {/* Description */}
        <p
          className={`text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-8 leading-relaxed transition-all duration-700 delay-100 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Not a lead-gen agency, A full-service growth partner with a Cold-to-Sold system that turns strangers into customers.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col items-center justify-center gap-3 mb-10 transition-all duration-700 delay-200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="/book-call/"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#B1130F] text-white font-semibold text-lg rounded-full overflow-hidden transition-all duration-500 btn-glow"
          >
            <span className="relative z-10">Launch my Free Campaign</span>
            <ArrowRightIcon className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(177,19,15,0.1)] border border-[rgba(177,19,15,0.2)]">
              <svg className="w-4 h-4 text-[#22c55e]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-[var(--text-primary)]">Zero Cost</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(177,19,15,0.1)] border border-[rgba(177,19,15,0.2)]">
              <svg className="w-4 h-4 text-[#22c55e]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-[var(--text-primary)]">Launch in 48 Hours</span>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div
          className={`flex flex-wrap items-center justify-center gap-6 md:gap-10 transition-all duration-700 delay-300 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Upwork */}
          <a
            href="https://www.upwork.com/agencies/bleedaisolutions/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:opacity-80 hover:scale-105 transition-all duration-300"
          >
            <img src="/images/upwork-icon.svg" alt="Upwork" className="h-10 w-10" />
            <div className="text-left">
              <div className="text-[var(--text-primary)] font-medium">
                Upwork / 5.0 <span className="text-yellow-500">★</span>
              </div>
              <div className="text-sm text-[var(--text-muted)]">85+ Reviews</div>
            </div>
          </a>

          {/* Clutch */}
          <a
            href="https://clutch.co/profile/bleed-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:opacity-80 hover:scale-105 transition-all duration-300"
          >
            <img src="/images/clutch-icon.svg" alt="Clutch" className="h-10 w-10" />
            <div className="text-left">
              <div className="text-[var(--text-primary)] font-medium">
                Clutch / 5.0 <span className="text-yellow-500">★</span>
              </div>
              <div className="text-sm text-[var(--text-muted)]">3+ Reviews</div>
            </div>
          </a>

          {/* Techreviewer */}
          <a
            href="https://techreviewer.co/companies/bleed-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:opacity-80 hover:scale-105 transition-all duration-300"
          >
            <img src="/images/techr-icon.svg" alt="Techreviewer" className="h-10 w-10" />
            <div className="text-left">
              <div className="text-[var(--text-primary)] font-medium">
                Techreviewer / 5.0 <span className="text-yellow-500">★</span>
              </div>
              <div className="text-sm text-[var(--text-muted)]">7+ Reviews</div>
            </div>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-600 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-5 h-8 rounded-full border-2 border-[var(--border-strong)] flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-[#B1130F] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
