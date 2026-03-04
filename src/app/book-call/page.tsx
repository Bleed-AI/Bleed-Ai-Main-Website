import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: "Book a Free Strategy Call | Launch Your Outbound Campaign",
  description: "Free strategy session for your outbound goals. Get expert analysis, ICP recommendations, and a clear roadmap to 100+ qualified opportunities.",
  path: "/book-call",
  keywords: [
    "book call",
    "free strategy call",
    "outbound consultation",
    "campaign strategy",
    "schedule meeting",
    "free consultation"
  ],
});

import Image from "next/image";
import Navigation from "@/components/Navigation";
import BackgroundOrbs from "@/components/BackgroundOrbs";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import Featured from "@/components/Featured";

const benefits = [
  {
    text: "B2B companies looking to scale their pipeline predictably",
    icon: <RocketIcon />,
  },
  {
    text: "Founders tired of inconsistent lead flow and unpredictable revenue",
    icon: <ChartIcon />,
  },
  {
    text: "Sales teams ready to book more qualified meetings every month",
    icon: <CalendarIcon />,
  },
  {
    text: "Businesses wanting a proven Cold-to-Sold system, not generic tactics",
    icon: <TargetIcon />,
  },
  {
    text: "Companies serious about turning cold outreach into closed deals",
    icon: <EmailIcon />,
  },
  {
    text: "Leaders who want results-driven growth without the guesswork",
    icon: <TrendingIcon />,
  },
];

function RocketIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12h.01" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function TrendingIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-[#22c55e]" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

export default function BookCall() {
  return (
    <main className="relative overflow-hidden">
      <BackgroundOrbs />
      <Navigation />

      {/* Hero Section with Calendly */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[var(--bg-primary)]" />
        <div className="absolute inset-0 bg-grid-pattern" />

        {/* Glow Orbs */}
        <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-[#B1130F]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-[#B1130F]/5 rounded-full blur-[150px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="text-sm font-medium text-[var(--text-secondary)]">Free Strategy Session</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-[var(--text-primary)] leading-[1.1] mb-5">
              Book Your{" "}
              <span className="gradient-text">Free Strategy Call</span>
            </h1>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
              Let&apos;s discuss your growth challenges and explore how our Cold-to-Sold system can transform your pipeline
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left Side - Who This Is For */}
            <div className="order-2 lg:order-1">
              <div className="p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] hover:border-[#B1130F]/30 transition-all duration-500">
                <h2 className="font-display text-2xl font-semibold text-[var(--text-primary)] mb-6">
                  This Call Is{" "}
                  <span className="gradient-text">For You If</span>
                </h2>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] transition-all duration-300 hover:border-[var(--border-strong)] hover:bg-[var(--bg-card-hover)]"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg flex items-center justify-center text-[var(--text-secondary)]">
                        {benefit.icon}
                      </div>
                      <p className="text-[var(--text-secondary)] text-[15px] leading-relaxed">
                        {benefit.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* What You'll Get */}
                <div className="mt-8 pt-8 border-t border-[var(--border-color)]">
                  <h3 className="font-semibold text-lg mb-4 text-[var(--text-primary)]">What You&apos;ll Get on This Call:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <CheckIcon />
                      <span className="text-[var(--text-secondary)]">Assessment of your pipeline opportunities</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckIcon />
                      <span className="text-[var(--text-secondary)]">Analysis of your ideal customer profile</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckIcon />
                      <span className="text-[var(--text-secondary)]">Outreach strategy tailored to your business</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckIcon />
                      <span className="text-[var(--text-secondary)]">Clear roadmap to your first 100+ opportunities</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Side - Calendly */}
            <div className="order-1 lg:order-2 relative z-10">
              <div className="p-1 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)]">
                <div className="bg-white rounded-xl overflow-hidden">
                  <iframe
                    src="https://calendly.com/bleedai/vip-invite-only?embed_domain=bleedai.com&embed_type=Inline&text_color=000000&primary_color=b1130f&hide_gdpr_banner=1"
                    width="100%"
                    height="700"
                    frameBorder="0"
                    title="Schedule a call"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-16 pt-12 border-t border-[var(--border-color)]">
            <div className="flex justify-center items-center gap-10 flex-wrap">
              <a href="https://www.upwork.com/agencies/bleedaisolutions/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-all duration-300 hover:opacity-80 hover:scale-105">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/upwork-icon.svg" alt="Upwork" className="w-10 h-10 object-contain" />
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    <span className="text-[var(--text-primary)] font-medium">Upwork</span>
                    <span className="text-[var(--text-muted)]">/</span>
                    <span className="text-[var(--text-primary)] font-medium">5.0</span>
                    <span className="text-yellow-500">★</span>
                  </div>
                  <div className="text-sm text-[var(--text-muted)]">85+ Reviews</div>
                </div>
              </a>

              <a href="https://clutch.co/profile/bleed-ai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-all duration-300 hover:opacity-80 hover:scale-105">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/clutch-icon.svg" alt="Clutch" className="w-10 h-10 object-contain" />
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    <span className="text-[var(--text-primary)] font-medium">Clutch</span>
                    <span className="text-[var(--text-muted)]">/</span>
                    <span className="text-[var(--text-primary)] font-medium">5.0</span>
                    <span className="text-yellow-500">★</span>
                  </div>
                  <div className="text-sm text-[var(--text-muted)]">3+ Reviews</div>
                </div>
              </a>

              <a href="https://techreviewer.co/companies/bleed-ai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-all duration-300 hover:opacity-80 hover:scale-105">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/techr-icon.svg" alt="Techreviewer" className="w-10 h-10 object-contain" />
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    <span className="text-[var(--text-primary)] font-medium">Techreviewer</span>
                    <span className="text-[var(--text-muted)]">/</span>
                    <span className="text-[var(--text-primary)] font-medium">5.0</span>
                    <span className="text-yellow-500">★</span>
                  </div>
                  <div className="text-sm text-[var(--text-muted)]">7+ Reviews</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Use the same Testimonials component as main page */}
      <Testimonials />

      {/* Use the same Featured component as main page */}
      <Featured />

      <Footer />
    </main>
  );
}
