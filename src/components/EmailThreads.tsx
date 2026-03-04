"use client";

import { useState } from "react";

const emailThreads = [
  { id: 2, image: "/images/thread2.png", alt: "News Scrape - Funding Announcement Email" },
  { id: 3, image: "/images/thread3.png", alt: "Data Research - G2 Comparison Email" },
];

export default function EmailThreads() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % emailThreads.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + emailThreads.length) % emailThreads.length);
  };

  const getVisibleThreads = () => {
    const threads = [];
    for (let i = 0; i < 2; i++) {
      const index = (currentIndex + i) % emailThreads.length;
      threads.push(emailThreads[index]);
    }
    return threads;
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--bg-primary)]" />
      <div className="absolute inset-0 bg-dot-pattern" />

      {/* Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#B1130F]/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#B1130F]/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">Real Conversations</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--text-primary)] mb-4">
            Replies That Turn Into <span className="gradient-text">Revenue</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            See real email threads that show how we use signals like intent, behavior, and context to personalize emails in a way that drives real conversations.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Thread Cards - Desktop */}
          <div className="hidden md:grid md:grid-cols-2 gap-6">
            {getVisibleThreads().map((thread, index) => (
              <div
                key={`${thread.id}-${index}`}
                className="group relative rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-hidden transition-all duration-500 hover:border-[#B1130F]/50 hover:shadow-[0_0_40px_rgba(177,19,15,0.15)] cursor-pointer"
                onClick={() => setLightboxImage(thread.image)}
              >
                <div className="p-3">
                  <div className="relative rounded-xl overflow-hidden">
                    <img
                      src={thread.image}
                      alt={thread.alt}
                      className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#B1130F]/0 group-hover:bg-[#B1130F]/10 transition-all duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
                        <svg className="w-6 h-6 text-[#B1130F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Thread Cards - Mobile */}
          <div className="md:hidden">
            <div
              className="group relative rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-hidden cursor-pointer"
              onClick={() => setLightboxImage(emailThreads[currentIndex].image)}
            >
              <div className="p-3">
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={emailThreads[currentIndex].image}
                    alt={emailThreads[currentIndex].alt}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 w-12 h-12 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:text-[#B1130F] hover:border-[#B1130F] transition-all duration-300 z-10"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 w-12 h-12 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:text-[#B1130F] hover:border-[#B1130F] transition-all duration-300 z-10"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {emailThreads.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-[#B1130F] w-8"
                  : "bg-[var(--border-color)] hover:bg-[var(--text-muted)]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/90 backdrop-blur-sm overflow-auto"
          onClick={() => setLightboxImage(null)}
        >
          {/* Close Button */}
          <button
            className="fixed top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300 z-10"
            onClick={() => setLightboxImage(null)}
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image Container */}
          <div
            className="relative my-8 mx-auto px-4 max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage}
              alt="Email Thread"
              className="w-full h-auto bg-white rounded-2xl shadow-2xl"
            />
          </div>

          {/* Scroll hint */}
          <p className="fixed bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            Scroll to view full image • Click outside to close
          </p>
        </div>
      )}
    </section>
  );
}
