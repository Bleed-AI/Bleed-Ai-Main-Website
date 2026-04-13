"use client";

import { useState, useEffect } from "react";
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
  {
    initials: "HO",
    name: "Hunter Owens",
    role: "Umbrella Digital",
    quote: "When working with Taha, listen to his guidance. He has a strong understanding of cold email infrastructure, copy rotation, and industry best practices. He provides an excellent service, responds quickly, and stays highly knowledgeable about current trends in the industry.",
    videoId: "",
    hasVideo: false,
    image: "/hunter-owens.jpg",
  },
];

type PopupState = "idle" | "cta" | "testimonial-1" | "testimonial-2" | "testimonial-3" | "testimonial-4" | "done";

export default function PopupNotifications() {
  const [popupState, setPopupState] = useState<PopupState>("idle");
  const [isVisible, setIsVisible] = useState(false);

  // Main popup sequence
  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];

    // Show CTA after 10 seconds
    timeouts.push(
      setTimeout(() => {
        setPopupState("cta");
        setIsVisible(true);
      }, 10000)
    );

    // Auto-close CTA after 15 seconds (25 seconds total: 10s delay + 15s display)
    timeouts.push(
      setTimeout(() => {
        setIsVisible(false);
        // Small delay for exit animation, then move to testimonial 1
        setTimeout(() => {
          setPopupState("testimonial-1");
          setIsVisible(true);
        }, 300);
      }, 25000)
    );

    // Testimonial 1: show for 4 seconds, then transition
    timeouts.push(
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setPopupState("testimonial-2");
          setIsVisible(true);
        }, 300);
      }, 29300) // 25000 + 4300 (4s display + 300ms transition)
    );

    // Testimonial 2: show for 4 seconds, then transition
    timeouts.push(
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setPopupState("testimonial-3");
          setIsVisible(true);
        }, 300);
      }, 33600) // 29300 + 4300
    );

    // Testimonial 3: show for 4 seconds, then transition
    timeouts.push(
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setPopupState("testimonial-4");
          setIsVisible(true);
        }, 300);
      }, 37900) // 33600 + 4300
    );

    // Testimonial 4: show for 4 seconds, then done
    timeouts.push(
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setPopupState("done");
        }, 300);
      }, 42200) // 37900 + 4300
    );

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, []);

  const handleCTAClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setPopupState("testimonial-1");
      setIsVisible(true);
    }, 300);
  };

  const handleTestimonialClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setPopupState("done");
    }, 300);
  };

  const showCTA = popupState === "cta";
  const showTestimonial = ["testimonial-1", "testimonial-2", "testimonial-3", "testimonial-4"].includes(popupState);
  const testimonialIndex = parseInt(popupState.split("-")[1] || "0") - 1;
  const currentTestimonial = testimonials[testimonialIndex] || testimonials[0];

  return (
    <>
      {/* CTA Popup */}
      {showCTA && (
        <div
          className={`fixed left-6 bottom-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] md:left-6 md:right-auto md:bottom-6
                       transition-all duration-700 ease-out transform
                       ${isVisible ? "translate-y-0 opacity-100" : "translate-y-32 opacity-0"}`}
        >
          <div className="bg-[var(--surface-elevated)] border border-[var(--border-color)] rounded-2xl p-6 shadow-[0_0_40px_rgba(177,19,15,0.25)] backdrop-blur-xl overflow-hidden hover:shadow-lg transition-shadow">
            {/* Close Button */}
            <button
              onClick={handleCTAClose}
              type="button"
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors z-10"
              aria-label="Close"
            >
              <svg className="w-5 h-5 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col gap-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] w-fit">
                <span className="w-2 h-2 rounded-full bg-[#ff3d38] animate-pulse" />
                <span className="text-sm font-medium text-[var(--text-secondary)]">Limited Spots Available</span>
              </div>

              {/* Heading */}
              <h3 className="text-xl font-semibold text-[var(--text-primary)] leading-tight">
                Apply For Your No-Cost Pilot Campaign
              </h3>

              {/* Subtext */}
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Free Trial Offer: We'll Launch A No-Obligation 'Pilot Campaign' To Prove Outbound For Your Business Before Moving Forward
              </p>

              {/* CTA Button */}
              <a
                href="/book-call/"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#B1130F] text-white font-semibold text-sm rounded-full overflow-hidden transition-all duration-500 btn-glow"
              >
                <span className="relative z-10">Launch my Free Campaign</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Testimonial Popup */}
      {showTestimonial && (
        <div
          className={`fixed left-6 bottom-6 z-50 w-[320px] max-w-[calc(100vw-3rem)] md:left-6 md:right-auto md:bottom-6
                       transition-all duration-700 ease-out transform
                       ${isVisible ? "translate-y-0 opacity-100" : "translate-y-32 opacity-0"}`}
        >
          <div className="bg-[var(--surface-elevated)] border border-[var(--border-color)] rounded-2xl p-6 shadow-[0_0_30px_rgba(177,19,15,0.2)] backdrop-blur-xl overflow-hidden hover:shadow-lg transition-shadow">
            {/* Close Button */}
            <button
              onClick={handleTestimonialClose}
              type="button"
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors z-10"
              aria-label="Close"
            >
              <svg className="w-5 h-5 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col gap-4">
              {/* Stars */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#ff3d38]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                &ldquo;{currentTestimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-color)]">
                {currentTestimonial.image ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#B1130F]/20 flex-shrink-0">
                    <Image
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B1130F] to-[#ff3d38] flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                    {currentTestimonial.initials}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="font-semibold text-sm text-[var(--text-primary)] truncate">{currentTestimonial.name}</div>
                  <div className="text-xs text-[var(--text-muted)] truncate">{currentTestimonial.role}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
