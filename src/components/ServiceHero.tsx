"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from './Icons';
import NeuralNetworkBackground from '@/components/ui/neural-network-background';

export interface ServiceHeroProps {
  badge?: string;
  title: string;
  gradientText?: string;
  subtitle?: string;
  description: string;
  highlights: string[];
  ctaText: string;
  ctaLink: string;
}

export default function ServiceHero({
  badge,
  title,
  gradientText,
  subtitle,
  description,
  highlights,
  ctaText,
  ctaLink
}: ServiceHeroProps) {
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
        {badge && (
          <div
            className={`inline-block mb-6 transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="px-4 py-2 rounded-full text-sm font-medium bg-[rgba(177,19,15,0.1)] border border-[rgba(177,19,15,0.2)] text-[var(--text-primary)]">
              {badge}
            </span>
          </div>
        )}

        {/* Main Headline */}
        <h1
          className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight mb-5 transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="block text-[var(--text-primary)]">{title}</span>
          {gradientText && (
            <span className="block gradient-text mt-2">{gradientText}</span>
          )}
        </h1>

        {subtitle && (
          <p
            className={`text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-6 leading-relaxed transition-all duration-700 delay-100 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {subtitle}
          </p>
        )}

        {/* Description */}
        <p
          className={`text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-8 leading-relaxed transition-all duration-700 delay-100 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {description}
        </p>

        {/* CTA Button and Highlights */}
        <div
          className={`flex flex-col items-center justify-center gap-3 mb-10 transition-all duration-700 delay-200 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Link
            href={ctaLink}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#B1130F] text-white font-semibold text-lg rounded-full overflow-hidden transition-all duration-500 btn-glow"
          >
            <span className="relative z-10">{ctaText}</span>
            <ArrowRightIcon className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          {highlights.length > 0 && (
            <div className="flex items-center gap-4">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(177,19,15,0.1)] border border-[rgba(177,19,15,0.2)]"
                >
                  <svg className="w-4 h-4 text-[#22c55e]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-[var(--text-primary)]">{highlight}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
