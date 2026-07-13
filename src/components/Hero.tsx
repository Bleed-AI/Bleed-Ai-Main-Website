"use client";

import { useState, useEffect } from "react";

const SPRINT_URL = "https://calculator.bleedai.com/sprint";
const VIDEO_ID = "S0Oeg0sbB6k";

export default function Hero() {
  const [playing, setPlaying] = useState(false);
  const [spots, setSpots] = useState(3);

  useEffect(() => {
    const now = new Date();
    const dim = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    setSpots(Math.max(1, Math.ceil(4 * (1 - now.getDate() / dim))));
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#050508] pt-10 sm:pt-12 lg:pt-14 pb-16 sm:pb-20 lg:pb-24">
      {/* Background glow orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-[#B1130F]/15 blur-[160px]" />
        <div className="absolute -bottom-32 -right-32 w-[520px] h-[520px] rounded-full bg-[#B1130F]/10 blur-[180px]" />
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(177,19,15,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(177,19,15,0.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-10 lg:gap-12 xl:gap-14 items-center">
          {/* LEFT: Text column */}
          <div className="text-white">
            {/* Live spots badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#B1130F]/40 bg-[#B1130F]/10 backdrop-blur-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#B1130F] opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B1130F]" />
              </span>
              <span className="text-xs font-semibold tracking-wide text-white/90">
                Only {spots} client {spots === 1 ? "spot" : "spots"} open this month
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-bold tracking-tight text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] leading-[1.12] mb-6">
              <span className="whitespace-nowrap">We Install Cold-to-Sold</span>
              <br />
              <span className="whitespace-nowrap">
                <span className="relative inline-block">
                  <span
                    className="bg-clip-text"
                    style={{
                      fontFamily: "'Instrument Serif', Georgia, serif",
                      fontStyle: "italic",
                      fontWeight: 400,
                      backgroundImage:
                        "linear-gradient(90deg, #ff3d38 0%, #B1130F 25%, #ffd4d1 50%, #B1130F 75%, #ff6b67 100%)",
                      backgroundSize: "200% 100%",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "transparent",
                      animation: "textShine 8s linear infinite",
                    }}
                  >
                    Revenue Systems
                  </span>
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-[#ff3d38] via-[#B1130F] to-[#ff6b67] rounded-full opacity-60" />
                </span>{" "}
                for B2B
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg lg:text-xl text-white/65 leading-relaxed max-w-xl mb-7">
              Not a lead-gen agency. A full-service growth partner that turns
              strangers into customers — <span className="text-white/90 font-medium">live in 48 hours</span>.
            </p>

            {/* Stat triplet */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8 pb-8 border-b border-white/10">
              {[
                { num: "100+", label: "opps in December" },
                { num: "98%+", label: "inbox placement" },
                { num: "1 Week", label: "launch time" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-6">
                  <div>
                    <div className="font-display text-2xl lg:text-3xl font-bold text-white leading-none mb-1">
                      {s.num}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-white/50">
                      {s.label}
                    </div>
                  </div>
                  {i < 2 && <div className="h-10 w-px bg-white/10" />}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-7">
              <a
                href={SPRINT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#B1130F] text-white font-semibold text-base rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(177,19,15,0.5)]"
              >
                <span className="relative z-10">Start Your Sprint</span>
                <svg
                  className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                {/* Shimmer overlay */}
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  }}
                />
              </a>
              <button
                type="button"
                onClick={() => {
                  setPlaying(true);
                  document
                    .getElementById("hero-video")
                    ?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className="inline-flex items-center gap-2 text-white/70 hover:text-white font-medium text-sm transition-colors"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full border border-white/20 group-hover:border-[#B1130F]">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                Watch 2-min playbook
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              {[
                { icon: "/images/upwork-icon.svg", name: "Upwork", href: null },
                { icon: "/images/clutch-icon.svg", name: "Clutch", href: "https://clutch.co/profile/bleed-ai" },
                { icon: "/images/techr-icon.svg", name: "TechReviewer", href: "https://techreviewer.co/companies/bleed-ai" },
              ].map((p) => {
                const inner = (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.icon} alt={`${p.name} logo`} className="w-5 h-5 flex-shrink-0" />
                    <span className="text-xs font-medium text-white/80">
                      {p.name} / <span className="text-white">5.0</span>
                    </span>
                    <span className="text-[#ffb800] text-sm leading-none">★</span>
                  </>
                );
                return p.href ? (
                  <a
                    key={p.name}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-colors"
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={p.name}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]"
                  >
                    {inner}
                  </div>
                );
              })}
            </div>

          </div>

          {/* RIGHT: Video column */}
          <div id="hero-video" className="relative">
            {/* Floating press credit — sits ABOVE the video, right-aligned */}
            <a
              href="https://usawire.com/cold-to-sold-how-bleed-ai-creates-predictable-b2b-pipeline-in-2025/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex absolute bottom-full mb-3 right-4 z-20 items-center gap-3 px-4 py-2.5 rounded-xl border border-white/10 bg-[#0a0a10]/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] animate-[float_6s_ease-in-out_infinite] hover:border-[#B1130F]/50 hover:bg-[#0a0a10] transition-colors group"
            >
              <div className="flex flex-col gap-1.5">
                <div className="text-[9px] font-bold tracking-[0.14em] uppercase text-white/55 leading-none">
                  As Featured In
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/usawire-logo.png"
                  alt="USAWire"
                  className="h-5 w-auto object-contain"
                />
              </div>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="text-white/30 flex-shrink-0 group-hover:text-[#B1130F] group-hover:translate-x-0.5 transition-all"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>

            {/* Floating real stat — sits BELOW the video, left-aligned */}
            <div className="hidden lg:flex absolute top-full mt-3 left-4 z-20 items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-[#B1130F]/30 bg-[#0a0a10]/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] animate-[float_7s_ease-in-out_infinite_-2s]">
              <div className="font-display text-xl font-bold text-[#ff6b67] leading-none">100+</div>
              <div>
                <div className="text-xs font-semibold text-white leading-tight">Opportunities Generated</div>
                <div className="text-[10px] text-white/50">This Month</div>
              </div>
            </div>

            {/* Premium video frame */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a10] shadow-[0_24px_80px_-12px_rgba(0,0,0,0.8)] group">
              {/* Glow ring */}
              <div
                className="absolute -inset-px rounded-2xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, rgba(177,19,15,0.6) 90deg, transparent 180deg, rgba(177,19,15,0.6) 270deg, transparent 360deg)",
                  filter: "blur(8px)",
                  zIndex: -1,
                }}
              />

              {/* Top corner pill */}
              <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/90">
                  ▶ 2-min Playbook
                </span>
              </div>

              {/* Video / thumbnail */}
              <div
                onClick={() => setPlaying(true)}
                className="relative aspect-video cursor-pointer overflow-hidden"
              >
                {playing ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
                    title="Bleed AI playbook video"
                    className="absolute inset-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                      alt="Watch the Bleed AI playbook video"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    {/* Center play */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-[#B1130F] flex items-center justify-center shadow-[0_0_60px_rgba(177,19,15,0.6)] group-hover:scale-110 transition-transform duration-300">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="white" className="ml-1">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Video bottom bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#0a0a10] border-t border-white/10">
                <div className="flex items-center gap-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/taha-anwar.png"
                    alt="Taha Anwar"
                    className="w-8 h-8 rounded-full object-cover border border-white/15"
                  />
                  <div>
                    <div className="text-xs font-semibold text-white leading-tight">Taha Anwar</div>
                    <div className="text-[10px] text-white/50">Founder, BleedAI</div>
                  </div>
                </div>
                <div className="text-[10px] uppercase tracking-wider text-white/40">
                  Full walkthrough
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes for floating + headline shine animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes textShine {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -100% 0;
          }
        }
      `}</style>
    </section>
  );
}
