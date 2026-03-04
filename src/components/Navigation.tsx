"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import NavigationDropdown from "./NavigationDropdown";
import { services } from "@/data/services";

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(true); // Default to open
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);

  // Check if we're on a services page
  const isServicesPage = pathname?.startsWith('/services');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      setMobileServicesOpen(true); // Always show services when menu opens
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle dropdown open/close with delay
  const handleServicesEnter = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setServicesOpen(true);
  };

  const handleServicesLeave = () => {
    const timeout = setTimeout(() => {
      setServicesOpen(false);
    }, 150); // 150ms delay before closing
    setCloseTimeout(timeout);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeout) {
        clearTimeout(closeTimeout);
      }
    };
  }, [closeTimeout]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 transition-all duration-500 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${mobileMenuOpen ? "z-[9990]" : "z-50"}`}
      >
        <div
          className={`mx-2 sm:mx-4 lg:mx-8 mt-2 sm:mt-4 rounded-xl sm:rounded-2xl border transition-all duration-500 ${
            scrolled
              ? "bg-[var(--surface-elevated)]/90 backdrop-blur-xl border-[var(--border-color)] shadow-lg"
              : "bg-transparent border-transparent"
          }`}
        >
          <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex justify-between items-center">
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
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleServicesEnter}
              onMouseLeave={handleServicesLeave}
            >
              <button
                className={`flex items-center gap-1 text-sm font-medium transition-colors duration-300 ${
                  isServicesPage
                    ? 'text-[#B1130F] font-semibold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                Services
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <NavigationDropdown isOpen={servicesOpen} onEnter={handleServicesEnter} onLeave={handleServicesLeave} currentPath={pathname} />
            </div>

            <a
              href="#testimonials"
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300"
            >
              Results
            </a>

            <a
              href="/book-call/"
              className="group relative px-5 py-2.5 bg-[#B1130F] text-white rounded-full text-sm font-semibold overflow-hidden transition-all duration-300 btn-glow"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Launch My Free Campaign</span>
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
              href="/book-call/"
              className="group relative px-3 sm:px-4 py-1.5 sm:py-2 bg-[#B1130F] text-white rounded-full text-xs sm:text-sm font-semibold overflow-hidden transition-all duration-300 btn-glow whitespace-nowrap"
            >
              <span className="relative z-10">Get Started</span>
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
                  {/* Services Section */}
                  <div className="border-b border-[var(--border-color)] pb-6">
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="flex items-center justify-between w-full text-left text-lg font-bold text-[var(--text-primary)] mb-4 hover:text-[#B1130F] transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        Services
                      </span>
                      <svg
                        className={`w-5 h-5 transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {mobileServicesOpen && (
                      <div className="space-y-2">
                        {services.map((service) => (
                          <Link
                            key={service.id}
                            href={service.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block"
                          >
                            <div className="flex items-start gap-3 p-4 rounded-xl hover:bg-[rgba(177,19,15,0.1)] border border-transparent hover:border-[#B1130F]/30 transition-all duration-200 active:scale-[0.98]">
                              <span className="text-2xl flex-shrink-0 mt-0.5">{service.icon}</span>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-[var(--text-primary)] text-base mb-1">
                                  {service.title}
                                </h4>
                                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                  {service.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Results Link */}
                  <a
                    href="#testimonials"
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
                    href="/book-call/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-center justify-center gap-2 w-full px-6 py-4 bg-[#B1130F] text-white text-center rounded-full font-bold text-base hover:shadow-lg hover:shadow-[#B1130F]/30 transition-all duration-300 active:scale-[0.98] btn-glow mt-4"
                  >
                    <span>Launch My Free Campaign</span>
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
