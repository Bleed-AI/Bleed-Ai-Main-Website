"use client";

import { useState } from "react";

export default function CampaignSnapshots() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const campaigns = [
    {
      title: "Marketing Agency",
      subtitle: "Generated 18 Sales Opportunity in 1 month",
      icon: "📊",
      stats: [
        { value: "1,572", label: "SEQUENCES STARTED" },
        { value: "2.4%", label: "REPLY RATE" },
        { value: "43.2%", label: "POSITIVE REPLY RATE" },
        { value: "16", label: "OPPORTUNITIES" },
      ],
      image: "/images/sixteen-oppurtunity-snapshot.png",
    },
    {
      title: "Coaching Offer",
      subtitle: "100+ Positive Responses in 2 Weeks of December 2025",
      icon: "🎯",
      stats: [
        { value: "17,181", label: "SEQUENCES STARTED" },
        { value: "2%", label: "REPLY RATE" },
        { value: "65.8%", label: "POSITIVE REPLY RATE" },
        { value: "102", label: "OPPORTUNITIES" },
      ],
      image: "/images/onezerotwo-oppurtunity-snaps.png",
    },
    {
      title: "January 2026 Results",
      subtitle: "Combined Client Campaign Performance",
      icon: "🚀",
      stats: [
        { value: "31.1K", label: "TOTAL SENT" },
        { value: "5.38%", label: "REPLY RATE" },
        { value: "279", label: "OPPORTUNITIES" },
        { value: "1:111", label: "LEAD RATIO" },
      ],
      image: "/images/jancampresults.png",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--bg-secondary)]" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#B1130F]/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#B1130F]/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--text-primary)] mb-4">
            Campaign <span className="gradient-text">Snapshots</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            Real campaigns. Real results. Here&apos;s what our system delivers.
          </p>
        </div>

        {/* Campaign Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {campaigns.map((campaign, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-elevated)] overflow-hidden transition-all duration-500 hover:border-[#B1130F]/50 hover:shadow-[0_0_40px_rgba(177,19,15,0.15)]"
            >
              {/* Card Header */}
              <div className="p-6 border-b border-[var(--border-color)]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[rgba(177,19,15,0.1)] flex items-center justify-center text-xl">
                    {campaign.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)]">{campaign.title}</h3>
                    <p className="text-xs text-[var(--text-secondary)]">{campaign.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-px bg-[var(--border-color)]">
                {campaign.stats.map((stat, statIndex) => (
                  <div
                    key={statIndex}
                    className="bg-[var(--bg-primary)] p-4 text-center"
                  >
                    <div className="font-display text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-1">
                      {stat.value}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Screenshot Preview */}
              <div className="p-4 bg-[var(--bg-secondary)]">
                <div
                  className="relative rounded-lg overflow-hidden border border-[var(--border-color)] cursor-pointer group/image"
                  onClick={() => setLightboxImage(campaign.image)}
                >
                  <img
                    src={campaign.image}
                    alt={`${campaign.title} Analytics`}
                    className="w-full transition-all duration-500 group-hover/image:scale-105"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#B1130F]/0 group-hover/image:bg-[#B1130F]/20 transition-all duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-all duration-300 transform scale-50 group-hover/image:scale-100">
                      <svg className="w-6 h-6 text-[#B1130F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#B1130F]/0 via-[#B1130F]/5 to-[#B1130F]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
            <div className="w-3 h-3 rounded-full bg-[#22c55e] animate-pulse" />
            <p className="text-[var(--text-secondary)] text-sm md:text-base">
              We averaged around <span className="text-[var(--text-primary)] font-semibold">1 positive lead per 111 contacts</span> for our clients in Jan 2026, which is <span className="text-[#B1130F] font-semibold">extraordinary</span> for any lead gen agency.
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300"
            onClick={() => setLightboxImage(null)}
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-5xl w-full max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage}
              alt="Campaign Analytics"
              className="w-full h-full object-contain bg-white rounded-2xl"
            />
          </div>

          {/* Click outside hint */}
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            Click anywhere to close
          </p>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}
