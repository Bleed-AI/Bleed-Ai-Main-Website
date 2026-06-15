"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Navigation() {
  const [freeToolsOpen, setFreeToolsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFreeToolsOpen, setMobileFreeToolsOpen] = useState(false);
  const [freeToolsCloseTimeout, setFreeToolsCloseTimeout] = useState<NodeJS.Timeout | null>(null);

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

  // Handle free tools dropdown
  const handleFreeToolsEnter = () => {
    if (freeToolsCloseTimeout) {
      clearTimeout(freeToolsCloseTimeout);
      setFreeToolsCloseTimeout(null);
    }
    setFreeToolsOpen(true);
  };

  const handleFreeToolsLeave = () => {
    const timeout = setTimeout(() => {
      setFreeToolsOpen(false);
    }, 150);
    setFreeToolsCloseTimeout(timeout);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 transition-all duration-500 translate-y-0 ${
          mobileMenuOpen ? "z-[9990]" : "z-50"
        }`}
      >
        <div className="border-b border-[var(--border-color)] bg-[#07070d]/90 backdrop-blur-xl">
          <div className="px-4 sm:px-6 lg:px-12 h-14 sm:h-[58px] flex justify-between items-center">
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
            {/* Free Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleFreeToolsEnter}
              onMouseLeave={handleFreeToolsLeave}
            >
              <button
                className="flex items-center gap-1 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300"
                aria-expanded={freeToolsOpen}
                aria-haspopup="true"
              >
                Free Tools
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${freeToolsOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {freeToolsOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-72 bg-[var(--surface-elevated)] border border-[var(--border-color)] rounded-xl shadow-xl overflow-hidden z-50"
                  onMouseEnter={handleFreeToolsEnter}
                  onMouseLeave={handleFreeToolsLeave}
                >
                  {[
                    { href: '/free-tools/cold-email-spam-checker', icon: '🛡️', title: 'Spam Checker', desc: '100-point cold email audit' },
                    { href: '/free-tools/b2b-icp-builder', icon: '🎯', title: 'ICP Builder', desc: 'Apollo-ready buyer list criteria' },
                    { href: '/free-tools/cold-email-domain-calculator', icon: '🔧', title: 'Domain Calculator', desc: 'Exact domain & inbox setup plan' },
                    { href: '/free-tools/cold-email-generator', icon: '✉️', title: 'Email Generator', desc: 'Signal-based emails that get replies' },
                    { href: '/free-tools/cold-email-roi-calculator', icon: '💰', title: 'ROI Calculator', desc: 'See what a campaign could return' },
                  ].map((tool) => (
                    <a
                      key={tool.href}
                      href={tool.href}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-[rgba(177,19,15,0.08)] border-b border-[var(--border-color)] last:border-0 transition-colors duration-150"
                    >
                      <span className="text-xl flex-shrink-0 mt-0.5">{tool.icon}</span>
                      <div>
                        <div className="text-sm font-semibold text-[var(--text-primary)]">{tool.title}</div>
                        <div className="text-xs text-[var(--text-secondary)] mt-0.5">{tool.desc}</div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="https://calculator.bleedai.com/packages"
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300"
            >
              Packages
            </a>

            <a
              href="#results-section"
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300"
            >
              Results
            </a>

            <a
              href="https://calculator.bleedai.com/"
              className="flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300"
            >
              <span className="text-base leading-none">🚀</span>
              <span>Cost Calculator</span>
            </a>

            <a
              href="https://calculator.bleedai.com/trials"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-5 py-2.5 bg-[#B1130F] text-white rounded-full text-sm font-semibold overflow-hidden transition-all duration-300 btn-glow"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Start My Trial Campaign</span>
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
              href="https://calculator.bleedai.com/trials"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-3 sm:px-4 py-1.5 sm:py-2 bg-[#B1130F] text-white rounded-full text-xs sm:text-sm font-semibold overflow-hidden transition-all duration-300 btn-glow whitespace-nowrap"
            >
              <span className="relative z-10">Start My Trial Campaign</span>
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
      </nav>

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
                  {/* Free Tools Section */}
                  <div className="border-b border-[var(--border-color)] pb-6">
                    <button
                      onClick={() => setMobileFreeToolsOpen(!mobileFreeToolsOpen)}
                      className="flex items-center justify-between w-full text-left text-lg font-bold text-[var(--text-primary)] mb-4 hover:text-[#B1130F] transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                        Free Tools
                      </span>
                      <svg
                        className={`w-5 h-5 transition-transform duration-300 ${mobileFreeToolsOpen ? 'rotate-180' : ''}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {mobileFreeToolsOpen && (
                      <div className="space-y-2">
                        {[
                          { href: '/free-tools/cold-email-spam-checker', icon: '🛡️', title: 'Spam Checker', desc: '100-point cold email audit' },
                          { href: '/free-tools/b2b-icp-builder', icon: '🎯', title: 'ICP Builder', desc: 'Apollo-ready buyer list criteria' },
                          { href: '/free-tools/cold-email-domain-calculator', icon: '🔧', title: 'Domain Calculator', desc: 'Exact domain & inbox setup plan' },
                          { href: '/free-tools/cold-email-generator', icon: '✉️', title: 'Email Generator', desc: 'Signal-based emails that get replies' },
                          { href: '/free-tools/cold-email-roi-calculator', icon: '💰', title: 'ROI Calculator', desc: 'See what a campaign could return' },
                        ].map((tool) => (
                          <a
                            key={tool.href}
                            href={tool.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-start gap-3 p-4 rounded-xl hover:bg-[rgba(177,19,15,0.1)] border border-transparent hover:border-[#B1130F]/30 transition-all duration-200 active:scale-[0.98]"
                          >
                            <span className="text-2xl flex-shrink-0 mt-0.5">{tool.icon}</span>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-[var(--text-primary)] text-base mb-1">{tool.title}</h4>
                              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{tool.desc}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Packages Section */}
                  <div className="border-b border-[var(--border-color)] pb-6">
                    <a
                      href="https://calculator.bleedai.com/packages"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 w-full text-left text-lg font-bold text-[var(--text-primary)] hover:text-[#B1130F] transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                      Packages
                    </a>
                  </div>

                  {/* Results Link */}
                  <a
                    href="#results-section"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-lg font-bold text-[var(--text-primary)] hover:text-[#B1130F] transition-colors duration-300 py-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Results
                  </a>

                  {/* CTA Button */}
                  <a
                    href="https://calculator.bleedai.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-center justify-center gap-2 w-full px-6 py-4 bg-[#B1130F] text-white text-center rounded-full font-bold text-base hover:shadow-lg hover:shadow-[#B1130F]/30 transition-all duration-300 active:scale-[0.98] btn-glow mt-4"
                  >
                    <span>Cost Calculator</span>
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
