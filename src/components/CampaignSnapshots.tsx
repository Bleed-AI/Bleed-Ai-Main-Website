"use client";

import { useState } from "react";

export default function CampaignSnapshots() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const campaigns = [
    {
      title: "Marketing Agency (Active)",
      subtitle: "9 warm opportunities in early ramp — campaign still running",
      icon: "📊",
      stats: [
        { value: "2,156", label: "SEQUENCES STARTED" },
        { value: "1.35%", label: "REPLY RATE" },
        { value: "31.03%", label: "POSITIVE REPLY RATE" },
        { value: "9", label: "OPPORTUNITIES" },
      ],
      image: "https://calculator.bleedai.com/campaign-results/marketing-agency.png",
    },
    {
      title: "Coaching Offer",
      subtitle: "241 opportunities from 14,687 sequences — 32% positive reply rate",
      icon: "🎯",
      stats: [
        { value: "14,687", label: "SEQUENCES STARTED" },
        { value: "5.11%", label: "REPLY RATE" },
        { value: "32.13%", label: "POSITIVE REPLY RATE" },
        { value: "241", label: "OPPORTUNITIES" },
      ],
      image: "https://calculator.bleedai.com/campaign-results/coaching-offer.png",
    },
    {
      title: "Paid Events Tickets Offer",
      subtitle: "102 opportunities at $107K pipeline — 65.8% positive reply rate",
      icon: "🎟️",
      stats: [
        { value: "17,181", label: "SEQUENCES STARTED" },
        { value: "2%", label: "REPLY RATE" },
        { value: "65.8%", label: "POSITIVE REPLY RATE" },
        { value: "102", label: "OPPORTUNITIES" },
      ],
      image: "/images/onezerotwo-oppurtunity-snaps.png",
    },
    {
      title: "SaaS Signup Trial Offer",
      subtitle: "42 opportunities at $42K pipeline — 12% reply rate in 10 days",
      icon: "💻",
      stats: [
        { value: "896", label: "SEQUENCES STARTED" },
        { value: "12.05%", label: "REPLY RATE" },
        { value: "38.89%", label: "POSITIVE REPLY RATE" },
        { value: "42", label: "OPPORTUNITIES" },
      ],
      image: "https://calculator.bleedai.com/campaign-results/saas-signup-trial-offer.png",
    },
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
      title: "Recruitment Industry Offer",
      subtitle: "7 qualified opportunities from 2,525 sequences in 3 months",
      icon: "👥",
      stats: [
        { value: "2,525", label: "SEQUENCES STARTED" },
        { value: "1.43%", label: "REPLY RATE" },
        { value: "19.44%", label: "POSITIVE REPLY RATE" },
        { value: "7", label: "OPPORTUNITIES" },
      ],
      image: "https://calculator.bleedai.com/campaign-results/offer-for-recruitment-industry.png",
    },
    {
      title: "Tech Setup Offer for Startups",
      subtitle: "55% of replies were positive — 5 opportunities from 870 sequences",
      icon: "⚙️",
      stats: [
        { value: "870", label: "SEQUENCES STARTED" },
        { value: "1.03%", label: "REPLY RATE" },
        { value: "55.56%", label: "POSITIVE REPLY RATE" },
        { value: "5", label: "OPPORTUNITIES" },
      ],
      image: "https://calculator.bleedai.com/campaign-results/tech-setup-offer-for-startups.png",
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
