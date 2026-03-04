"use client";

import { useState } from "react";
import { ArrowRightIcon } from "./Icons";

export default function RevenueMachine() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]" />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#B1130F]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#B1130F]/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] mb-6">
          <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
          <span className="text-sm font-medium text-[var(--text-secondary)]">Our Proven System</span>
        </div>

        {/* Heading */}
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--text-primary)] mb-4">
          Check our Playbook to get{" "}
          <span className="gradient-text">100+ Opps a Month</span>
        </h2>

        {/* Subheading */}
        <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto mb-10">
          Stop relying upon referrals & expensive Ads to get leads, you need a reliable, predictable & scalable sales system to grow.
        </p>

        {/* Video Container */}
        <div className="relative rounded-2xl overflow-hidden border border-[var(--border-color)] shadow-2xl mb-8 group">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#B1130F]/20 via-transparent to-[#B1130F]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative bg-[var(--bg-secondary)] rounded-2xl overflow-hidden">
            {!isPlaying ? (
              <div className="relative">
                {/* Video Thumbnail */}
                <img
                  src="https://img.youtube.com/vi/S0Oeg0sbB6k/maxresdefault.jpg"
                  alt="Revenue Machine Video"
                  className="w-full aspect-video object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Play Button Overlay */}
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center group/play"
                >
                  <div className="relative">
                    {/* Pulse Ring */}
                    <div className="absolute inset-0 w-24 h-24 rounded-full bg-white/20 animate-ping" />

                    {/* Play Button */}
                    <div className="relative w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-2xl group-hover/play:scale-110 transition-transform duration-300">
                      <svg
                        className="w-10 h-10 text-[#B1130F] ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </button>

                {/* Bottom Text Overlay */}
                <div className="absolute bottom-6 left-6 text-left">
                  <p className="text-white/80 text-sm font-medium mb-1">PIPELINE STUCK?</p>
                  <p className="text-white text-xl font-bold">Watch This Video</p>
                </div>
              </div>
            ) : (
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/S0Oeg0sbB6k?autoplay=1&rel=0"
                  title="Revenue Machine Video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>

        {/* Text Version Link */}
        <a
          href="https://docs.google.com/document/u/4/d/1h_PuevKWA6JWJ1tsGOaIdS1jcaRMBCNLE-XotSEWpMg/edit?tab=t.0"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] text-sm mb-8 transition-colors duration-300 group"
        >
          <span className="underline decoration-[var(--text-muted)]/30 group-hover:decoration-[var(--text-primary)] underline-offset-4">Check out the text version</span>
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>

        {/* CTA Button */}
        <div>
          <a
            href="/book-call/"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#B1130F] text-white font-semibold text-lg rounded-full overflow-hidden transition-all duration-500 btn-glow"
          >
            <span className="relative z-10">Launch my Free Campaign</span>
            <ArrowRightIcon className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
