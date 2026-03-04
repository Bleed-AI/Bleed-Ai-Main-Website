"use client";

import Image from "next/image";

const footerLinks = {
  company: [
    { label: "Results", href: "#testimonials" },
    { label: "How It Works", href: "#process" },
    { label: "Case Studies", href: "#testimonials" },
    { label: "Launch Free Campaign", href: "/book-call/" },
  ],
  platforms: [
    { label: "Upwork", href: "https://www.upwork.com/agencies/bleedaisolutions/" },
    { label: "Clutch", href: "https://clutch.co/profile/bleed-ai" },
    { label: "TechReviewer", href: "https://techreviewer.co/companies/bleed-ai" },
    { label: "LinkedIn", href: "https://pk.linkedin.com/company/bleedai" },
  ],
};

const socialLinks = [
  {
    label: "Upwork",
    href: "https://www.upwork.com/agencies/bleedaisolutions/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://pk.linkedin.com/company/bleedai",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-secondary)] relative overflow-hidden">
      {/* Top Border Accent */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#B1130F]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-6">
              <Image
                src="/images/bleed-ai-logo.svg"
                alt="BleedAI"
                width={140}
                height={40}
                className="h-10 w-auto mb-6"
              />
              <p className="text-[var(--text-secondary)] leading-relaxed max-w-sm mb-8">
                Your full-service growth partner with a proven Cold-to-Sold system that turns strangers into customers. We install revenue systems that scale B2B firms in weeks, not months.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:border-[#B1130F] hover:text-[#B1130F] hover:bg-[#B1130F]/5 transition-all duration-300 hover:scale-105"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-8">
                {/* Company */}
                <div>
                  <h4 className="font-display font-semibold text-[var(--text-primary)] mb-5 text-sm uppercase tracking-wider">
                    Quick Links
                  </h4>
                  <ul className="space-y-3">
                    {footerLinks.company.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-[var(--text-muted)] hover:text-[#B1130F] transition-colors duration-300 text-sm"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Platforms */}
                <div>
                  <h4 className="font-display font-semibold text-[var(--text-primary)] mb-5 text-sm uppercase tracking-wider">
                    Find Us On
                  </h4>
                  <ul className="space-y-3">
                    {footerLinks.platforms.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--text-muted)] hover:text-[#B1130F] transition-colors duration-300 text-sm inline-flex items-center gap-1"
                        >
                          {link.label}
                          <svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-[var(--border-color)]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-[var(--text-muted)]">
              &copy; {new Date().getFullYear()} Bleed AI. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-[var(--text-muted)]">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                Accepting new clients
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
