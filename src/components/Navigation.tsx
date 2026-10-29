"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const SHORTLISTED_TRIAL_URL = "https://calendly.com/bleedai/shortlisted-start-your-2-week-free-trial";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  // /shortlisted sells a different service: its trial CTA books the Shortlisted call and the Sprint link is hidden.
  const isShortlisted = pathname?.startsWith("/shortlisted") ?? false;
  const trialHref = isShortlisted ? SHORTLISTED_TRIAL_URL : "/trial";
  const trialLabel = isShortlisted ? "Start free trial" : "Free Trial";
  const trialExternal = isShortlisted ? { target: "_blank", rel: "noopener noreferrer" } : {};

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 transition-all duration-500 ${
          mobileMenuOpen ? "z-[9990]" : "z-50"
        }`}
      >
        <div className="border-b border-[var(--border-color)] bg-[#07070d]/90 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="h-14 sm:h-[58px] flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="relative group">
            <Image
              src="/images/bleed-ai-logo.svg"
              alt="BleedAI"
              width={160}
              height={48}
              className="h-8 sm:h-9 lg:h-11 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="/free-tools/cold-email-roi-calculator/"
              className="flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300"
            >
              <span className="text-base leading-none">💸</span>
              <span>ROI Calculator</span>
            </a>

            <a
              href="/#results-section"
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300"
            >
              Results
            </a>

            {!isShortlisted && (
            <a
              href="https://calculator.bleedai.com/sprint"
              target="_blank"
              rel="noopener noreferrer"
              className="sprint-pulse group relative inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-[#B1130F]/55 bg-[#0a0a10] text-sm font-semibold text-[#ffe4e2] hover:bg-[#140a0c]"
            >
              <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Sprint
              <span className="sprint-dot" />
            </a>
            )}

            <a
              href={trialHref}
              {...trialExternal}
              className="group relative px-5 py-2.5 bg-[#B1130F] text-white rounded-full text-sm font-semibold overflow-hidden transition-all duration-300 btn-glow"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>{trialLabel}</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-3">
            <a
              href={trialHref}
              {...trialExternal}
              className="group relative px-3 sm:px-4 py-1.5 sm:py-2 bg-[#B1130F] text-white rounded-full text-xs sm:text-sm font-semibold overflow-hidden transition-all duration-300 btn-glow whitespace-nowrap"
            >
              <span className="relative z-10">{trialLabel}</span>
            </a>

            {/* Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[var(--text-primary)] p-1.5 sm:p-2 -mr-1"
              aria-label="Toggle menu"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
            </div>
          </div>
        </div>
      </nav>
      {/* Spacer: reserve the fixed nav's height so content starts below it (no load-time gap). */}
      <div className="h-14 sm:h-[58px]" aria-hidden="true" />

      {/* Mobile Menu - Outside nav for proper z-index */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9990] lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-in Panel */}
          <div className="fixed top-0 right-0 bottom-0 w-full sm:w-[400px] bg-[var(--surface-elevated)] border-l border-[var(--border-color)] z-[9991] lg:hidden overflow-y-auto shadow-2xl h-screen">
              <div className="p-6 sm:p-8 min-h-full flex flex-col">
                {/* Close Button */}
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="absolute top-6 right-6 text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-2 hover:bg-white/5 rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <nav className="mt-16 space-y-8">
                  {/* ROI Calculator Link */}
                  <div className="border-b border-[var(--border-color)] pb-6">
                    <a
                      href="/free-tools/cold-email-roi-calculator/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 w-full text-left text-lg font-bold text-[var(--text-primary)] hover:text-[#B1130F] transition-colors"
                    >
                      <span className="text-xl leading-none">💸</span>
                      ROI Calculator
                    </a>
                  </div>

                  {/* Results Link */}
                  <a
                    href="/#results-section"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-lg font-bold text-[var(--text-primary)] hover:text-[#B1130F] transition-colors duration-300 py-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Results
                  </a>

                  {/* Sprint Link */}
                  {!isShortlisted && (
                  <a
                    href="https://calculator.bleedai.com/sprint"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-lg font-bold text-[var(--text-primary)] hover:text-[#B1130F] transition-colors duration-300 py-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Sprint
                  </a>
                  )}

                  {/* CTA Button */}
                  <a
                    href={trialHref}
                    {...trialExternal}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-center justify-center gap-2 w-full px-6 py-4 bg-[#B1130F] text-white text-center rounded-full font-bold text-base hover:shadow-lg hover:shadow-[#B1130F]/30 transition-all duration-300 active:scale-[0.98] btn-glow mt-4"
                  >
                    <span>{trialLabel}</span>
                    <svg
                      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </nav>
              </div>
            </div>
          </>
        )}
    </>
  );
}
