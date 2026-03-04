"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const testimonials = [
  {
    initials: "MV",
    name: "Martijn Versteeg",
    role: "Group Effort",
    quote: "Bleed AI generated over 100 opportunities in December, even during what's typically a very slow month for cold outreach.",
    videoId: "ze3G9OwQcUg",
    hasVideo: true,
    image: "https://groupeffort.nl/wp-content/uploads/2026/01/MartijnSquigle.jpeg",
  },
  {
    initials: "AC",
    name: "Alberto Castiel",
    role: "Minute Call",
    quote: "Great consultation on cold outreach deliverability. Clear guidance on setting up the right infrastructure and improving email deliverability.",
    videoId: "8sIZ_i7SsRk",
    hasVideo: true,
    image: "/alberto-castiel-client.jfif",
  },
  {
    initials: "AJ",
    name: "Ahmad Jabbir",
    role: "TEDx Speaker",
    quote: "Clear step-by-step guidance, practical tips, and real hands-on help. My spam rate dropped and I finally started seeing results.",
    videoId: "zYmFS6kOFsY",
    hasVideo: true,
    image: "/ahmedprofile.jpg",
  },
];

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group relative transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="h-full p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] hover:border-[#B1130F]/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(177,19,15,0.1)]">
        {/* Video Section */}
        {testimonial.hasVideo && (
          <div className="relative mb-6 rounded-xl overflow-hidden aspect-video bg-[var(--bg-secondary)]">
            {!isPlaying ? (
              <>
                <Image
                  src={`https://img.youtube.com/vi/${testimonial.videoId}/maxresdefault.jpg`}
                  alt={`${testimonial.name} testimonial`}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors"
                >
                  <div className="w-14 h-14 rounded-full bg-[#B1130F] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
              </>
            ) : (
              <iframe
                src={`https://www.youtube.com/embed/${testimonial.videoId}?autoplay=1`}
                title={`${testimonial.name} testimonial`}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        )}

        {/* Stars */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-5 h-5 text-[#ff3d38]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Quote */}
        <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center gap-4 pt-6 border-t border-[var(--border-color)]">
          {testimonial.image ? (
            <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#B1130F]/20">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#B1130F] to-[#ff3d38] flex items-center justify-center text-white font-semibold">
              {testimonial.initials}
            </div>
          )}
          <div>
            <div className="font-semibold text-[var(--text-primary)]">{testimonial.name}</div>
            <div className="text-sm text-[var(--text-muted)]">{testimonial.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--bg-secondary)]" />
      <div className="absolute inset-0 bg-grid-pattern" />

      {/* Glow Orbs */}
      <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-[#B1130F]/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-[#B1130F]/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-sm font-medium text-[var(--text-secondary)]">Client Success Stories</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--text-primary)] mb-4">
            What Our Clients <span className="gradient-text">Say</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our clients have to say about working with us.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
