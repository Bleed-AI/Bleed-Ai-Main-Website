"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { OUTCOMES, TRIAL } from "@/lib/slots";

// Nav (2026-10-30): packages menu, pricing, results, free trial CTA. The ROI calculator lives on /outbound only (Taha).
// The Sprint link is retired; its successor (Outbound Specialist) lives on /outbound.

function trialHrefFor(pathname: string | null): string {
  // Carry the outcome page the visitor came from so /trial can preselect it.
  const hit = OUTCOMES.find((o) => pathname?.startsWith(o.href.replace(/\/$/, "")));
  return hit ? `${TRIAL.href}?outcome=${hit.id}` : TRIAL.href;
}

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const trialHref = trialHrefFor(pathname);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const closeServicesSoon = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 160);
  };

  const linkCls =
    "text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 transition-all duration-500 ${mobileMenuOpen ? "z-[9990]" : "z-50"}`}>
        <div className="border-b border-[var(--border-color)] bg-[#07070d]/90 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="h-14 sm:h-[58px] flex justify-between items-center">
              <a href="/" className="relative group">
                <Image
                  src="/images/bleed-ai-logo.svg"
                  alt="BleedAI"
                  width={160}
                  height={48}
                  className="h-8 sm:h-9 lg:h-11 w-auto transition-transform duration-300 group-hover:scale-105"
                />
              </a>

              {/* Desktop */}
              <div className="hidden lg:flex items-center gap-7">
                <div className="relative" onMouseEnter={openServices} onMouseLeave={closeServicesSoon}>
                  <button
                    type="button"
                    className={`${linkCls} inline-flex items-center gap-1`}
                    aria-expanded={servicesOpen}
                    onClick={() => setServicesOpen((v) => !v)}
                  >
                    Packages
                    <svg className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {servicesOpen && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[440px]">
                      <div className="rounded-2xl border border-[#2a2a3e] bg-[#0d0d16]/95 backdrop-blur-xl p-2 shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
                        {OUTCOMES.map((o) => (
                          <a key={o.id} href={o.href} className="flex flex-col gap-0.5 rounded-xl px-4 py-3 hover:bg-white/[0.04] transition-colors">
                            <span className="text-[14px] font-semibold text-white">{o.title}</span>
                            <span className="text-[12.5px] text-[#9099b8] leading-snug">{o.name}: {o.summary}</span>
                          </a>
                        ))}
                        <a href="/pricing/#builder" className="mt-1 flex items-center justify-between rounded-xl px-4 py-3 border-t border-white/5 hover:bg-white/[0.04]">
                          <span className="text-[13px] font-semibold text-[#ff6b67]">Build your own from services</span>
                          <span className="text-[#ff6b67]">&rarr;</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                <a href="/pricing/" className={linkCls}>Pricing</a>
                <a href="/#results-section" className={linkCls}>Results</a>
                <a
                  href={trialHref}
                  className="group relative px-5 py-2.5 bg-[#B1130F] text-white rounded-full text-sm font-semibold overflow-hidden transition-all duration-300 btn-glow"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span>{TRIAL.label}</span>
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </a>
              </div>

              {/* Mobile */}
              <div className="flex lg:hidden items-center gap-2 sm:gap-3">
                <a
                  href={trialHref}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#B1130F] text-white rounded-full text-xs sm:text-sm font-semibold btn-glow whitespace-nowrap"
                >
                  Free trial
                </a>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-[var(--text-primary)] p-1.5 sm:p-2 -mr-1"
                  aria-label="Toggle menu"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
      <div className="h-14 sm:h-[58px]" aria-hidden="true" />

      {mobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9990] lg:hidden" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed top-0 right-0 bottom-0 w-full sm:w-[400px] bg-[#0d0d16] border-l border-[var(--border-color)] z-[9991] lg:hidden overflow-y-auto shadow-2xl h-screen">
            <div className="p-6 sm:p-8 min-h-full flex flex-col">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-5 right-5 text-[var(--text-secondary)] hover:text-white p-2 rounded-lg"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <nav className="mt-14 flex flex-col gap-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#505570] mb-2">Packages</p>
                {OUTCOMES.map((o) => (
                  <a key={o.id} href={o.href} onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-3 py-3 hover:bg-white/[0.04]">
                    <span className="block text-[16px] font-semibold text-white">{o.title}</span>
                    <span className="block text-[13px] text-[#9099b8]">{o.name}</span>
                  </a>
                ))}
                <div className="my-4 h-px bg-white/5" />
                {[
                  ["/pricing/", "Pricing"],
                  ["/pricing/#builder", "Build your own from services"],
                  ["/#results-section", "Results"],
                ].map(([href, label]) => (
                  <a key={href} href={href} onClick={() => setMobileMenuOpen(false)} className="px-3 py-3 text-[16px] font-semibold text-white hover:text-[#ff6b67]">
                    {label}
                  </a>
                ))}
                <a
                  href={trialHref}
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-6 flex items-center justify-center gap-2 w-full px-6 py-4 bg-[#B1130F] text-white rounded-full font-bold text-base btn-glow"
                >
                  {TRIAL.label} &rarr;
                </a>
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
}
