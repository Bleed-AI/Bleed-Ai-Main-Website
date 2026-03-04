"use client";

import Link from 'next/link';
import { ArrowRightIcon } from './Icons';

export interface Package {
  id: string;
  title: string;
  price: string;
  priceSubtext?: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  popular?: boolean;
}

interface PackageCardsProps {
  packages: Package[];
  title?: string;
  subtitle?: string;
}

export default function PackageCards({ packages, title, subtitle }: PackageCardsProps) {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--bg-secondary)]" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#B1130F]/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#B1130F]/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--text-primary)] mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Package Cards */}
        <div className={`grid gap-8 ${
          packages.length === 1 ? 'max-w-lg mx-auto' :
          packages.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' :
          'md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`group relative rounded-2xl border transition-all duration-500 ${
                pkg.popular
                  ? 'bg-[var(--surface-elevated)] border-[#B1130F] shadow-[0_0_30px_rgba(177,19,15,0.15)] hover:shadow-[0_0_40px_rgba(177,19,15,0.25)] hover:border-[#B1130F] mt-6'
                  : 'bg-[var(--surface-elevated)] border-[var(--border-strong)] hover:border-[#B1130F]/50 hover:shadow-[0_0_30px_rgba(177,19,15,0.1)] mt-6'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="px-4 py-1.5 bg-[#B1130F] text-white text-sm font-semibold rounded-full shadow-lg whitespace-nowrap">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Card Header */}
              <div className="p-6 border-b border-[var(--border-color)]">
                <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)] mb-2">
                  {pkg.title}
                </h3>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-display text-4xl md:text-5xl font-bold gradient-text">
                    {pkg.price}
                  </span>
                  {pkg.priceSubtext && (
                    <span className="text-[var(--text-muted)] text-sm">
                      {pkg.priceSubtext}
                    </span>
                  )}
                </div>
                <p className="text-[var(--text-secondary)] text-sm">
                  {pkg.description}
                </p>
              </div>

              {/* Features */}
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-[#22c55e] flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[var(--text-secondary)] text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  href={pkg.ctaLink}
                  className={`group/btn relative inline-flex items-center justify-center gap-2 w-full px-6 py-3 font-semibold rounded-full overflow-hidden transition-all duration-500 ${
                    pkg.popular
                      ? 'bg-[#B1130F] text-white btn-glow'
                      : 'bg-[rgba(177,19,15,0.1)] text-[var(--text-primary)] border border-[rgba(177,19,15,0.2)] hover:bg-[rgba(177,19,15,0.15)]'
                  }`}
                >
                  <span className="relative z-10">{pkg.ctaText}</span>
                  <ArrowRightIcon className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
