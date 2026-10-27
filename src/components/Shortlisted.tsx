/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";

const CALENDLY = "https://calendly.com/bleedai/shortlisted-start-your-2-week-free-trial";

function TrialButton({ children = "Start your 2 week free trial", className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <a
      href={CALENDLY}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#B1130F] text-white font-semibold text-[15px] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(177,19,15,0.5)] ${className}`}
    >
      {children}
      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>
  );
}

const plans = [
  {
    name: "Presence",
    price: "$1,200",
    line: "Be findable and recommended",
    includes: [
      "4 articles a month (1 interactive flagship, 3 standard)",
      "8 LinkedIn posts in your voice, with images or carousels",
      "AI search setup and a monthly check across ChatGPT, Claude, Perplexity and Google's AI",
      "A one-page monthly report",
    ],
    featured: false,
  },
  {
    name: "Presence + Reach",
    price: "$2,500",
    line: "Get recommended AND get in front of buyers",
    includes: [
      "Everything in Presence",
      "A LinkedIn connection campaign from your profile to your buyers, every weekday",
      "Mention and list outreach for every article",
      "Review requests to your happy customers",
    ],
    featured: true,
  },
  {
    name: "Full Engine",
    price: "$4,250",
    line: "Recommended, seen, and booked into calls",
    includes: [
      "Everything in Presence + Reach",
      "Our done-for-you outbound: we find your buyers, email them, and handle the replies",
    ],
    featured: false,
  },
];

const loopSteps = [
  { n: "1", title: "Check", body: "We ask ChatGPT, Claude, Perplexity and Google's AI the 20 questions your buyers ask, and record who gets named." },
  { n: "2", title: "Write", body: "Articles and LinkedIn posts that answer those exact questions, in your voice, with real numbers." },
  { n: "3", title: "Get mentioned", body: "We get you onto the lists, comparisons and review sites AI assistants read." },
  { n: "4", title: "Show up", body: "The same buyers see you on LinkedIn that week, from your own profile." },
];

const timeline = [
  { when: "Week 1", what: "Your AI search check, the 20 buyer questions agreed with you, your first posts approved." },
  { when: "Month 1", what: "4 articles and 8 posts live, your site set up so AI assistants can read it, LinkedIn network growing." },
  { when: "Months 2 to 3", what: "First mentions on your narrow, specific questions, other sites starting to list you." },
  { when: "Month 3 and on", what: "The guarantee window closes at 90 days, and the monthly report shows the trend." },
];

const compare = [
  { option: "Content marketing agency", cost: "$5,000 to $15,000 a month", us: false },
  { option: "AI search (GEO) agency retainer", cost: "about $6,850 a month (median)", us: false },
  { option: "LinkedIn ghostwriting agency", cost: "from $2,950 a month, LinkedIn only", us: false },
  { option: "Shortlisted", cost: "from $1,200 a month, all of it", us: true },
];

const faqs = [
  { q: "Will it sound like me?", a: "Yes. We learn your voice from your past posts, emails and a short call, and you approve every post before it goes out." },
  { q: "How much of my time does it take?", a: "About 10 minutes a week to approve posts. One 15 minute call to start." },
  { q: "Is AI writing it?", a: "Our systems do the research and first drafts, and a person edits and checks everything. Nothing goes live without your approval." },
  { q: "Will Google penalise this content?", a: "No. Google ranks helpful content no matter how it was made, and every article answers a real buyer question with real sources." },
  { q: "Do I need to change my website?", a: "No rebuild. We make small fixes so AI assistants can read it, and we publish the articles on it (or we set up a blog if you don't have one)." },
  { q: "Is my LinkedIn account safe?", a: "Yes. We stay well under LinkedIn's limits and ramp up slowly, the same way a careful person would." },
  { q: "I already have an agency.", a: "Keep them if they get you named by ChatGPT. Run our free check first and see." },
  { q: "How is this different from a $99 tracking tool?", a: "A tool tells you that you're missing. We do the work that gets you named." },
  { q: "Can I cancel?", a: "Anytime. It's month to month, and you keep everything we made." },
  { q: "What happens in the free 2 weeks?", a: "Your AI search check, your 20 buyer questions agreed, and your first posts and an article written for you to approve." },
];

export default function Shortlisted() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Load the Calendly inline-embed script once for the final section.
  useEffect(() => {
    const id = "calendly-widget-js";
    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.id = id;
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <div className="text-white">
      {/* 1. HERO */}
      <section className="px-6 pt-20 pb-20 sm:pt-28 sm:pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#B1130F]/40 bg-[#B1130F]/10 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5b56]" />
            <span className="text-xs font-semibold tracking-wide text-white/85 uppercase">For B2B companies that sell on expertise</span>
          </Reveal>
          <Reveal as="h1" className="font-display font-bold text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] tracking-tight mb-6" delay={60}>
            When your buyers ask ChatGPT who to hire,{" "}
            <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: "italic", fontWeight: 400 }} className="text-[#ff8a86]">
              be on the list.
            </span>
          </Reveal>
          <Reveal as="p" className="text-base sm:text-lg text-white/65 leading-relaxed max-w-2xl mx-auto mb-7" delay={120}>
            Shortlisted gets you recommended by ChatGPT, Google's AI and Perplexity, and puts you in front of the same buyers on LinkedIn. Done for you, in your voice, about 10 minutes a week of your time.
          </Reveal>
          <Reveal className="font-mono text-[13px] text-white/55 mb-8" delay={160}>
            From $1,200 a month · Month to month · First 2 weeks free
          </Reveal>
          <Reveal className="flex flex-col sm:flex-row items-center justify-center gap-4" delay={200}>
            <TrialButton />
            <a href="#gap" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              See what ChatGPT says about you ↓
            </a>
          </Reveal>
        </div>
      </section>

      {/* 2. THE GAP */}
      <section id="gap" className="px-6 py-20 sm:py-24 scroll-mt-24">
        <div className="max-w-3xl mx-auto">
          <Reveal as="h2" className="font-display font-bold text-3xl sm:text-4xl text-center leading-tight mb-10">
            Your buyers already asked.{" "}
            <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: "italic", fontWeight: 400 }} className="text-[#ff8a86]">
              Were you in the answer?
            </span>
          </Reveal>

          {/* Mock ChatGPT card */}
          <Reveal className="rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#12121b,#0b0b12)] overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
            <div className="flex items-center gap-2.5 px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              <span className="w-6 h-6 flex items-center justify-center text-white">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                  <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
                </svg>
              </span>
              <span className="text-[13px] font-medium text-white/70">ChatGPT</span>
            </div>
            <div className="p-5 sm:p-7 space-y-5">
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-[#2a2a38] px-4 py-3 text-[14px] text-white/90 leading-relaxed">
                  What are the best accounting firms for construction companies in Texas?
                </div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-[92%] rounded-2xl rounded-bl-sm bg-white/[0.04] border border-white/[0.06] px-4 py-4 text-[14px] text-white/80 leading-relaxed space-y-3">
                  <p>A few firms come up often for construction accounting in Texas:</p>
                  <ul className="space-y-2.5">
                    <li><span className="font-semibold text-white">Northline Advisory</span>, known for construction cash flow and WIP schedules.</li>
                    <li><span className="font-semibold text-white">Brickwell CPA</span>, specialises in contractor tax and job costing.</li>
                    <li><span className="font-semibold text-white">Summit Ledger</span>, popular with Texas GCs for retainage and audits.</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="px-5 sm:px-7 py-4 border-t border-[#B1130F]/20 bg-[#B1130F]/[0.08] flex items-center gap-2.5">
              <svg className="w-4 h-4 text-[#ff5b56] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-[14px] font-semibold text-[#ff9d99]">Your company: not mentioned.</span>
            </div>
          </Reveal>

          {/* Stat tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {[
              { big: "51%", body: "of B2B software buyers now start their research in an AI chatbot more often than Google.", src: "G2, March 2026, 1,076 buyers" },
              { big: "69%", body: "say a chatbot pointed them to a vendor they had not expected.", src: "G2, March 2026" },
              { big: "7% vs 53%", body: "notice a vendor because they know the name, versus one that matches their exact problem.", src: "Semrush, July 2026, 519 buyers" },
            ].map((s, i) => (
              <Reveal key={s.src} delay={i * 80} className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <div className="font-display font-bold text-2xl sm:text-[1.7rem] text-[#ff6b67] mb-2 leading-none">{s.big}</div>
                <p className="text-[13.5px] text-white/70 leading-snug mb-2">{s.body}</p>
                <p className="text-[11px] text-white/35 font-mono">{s.src}</p>
              </Reveal>
            ))}
          </div>

          <Reveal as="p" className="text-center text-[15px] text-white/70 leading-relaxed max-w-2xl mx-auto mt-8">
            You don't need to be famous to be recommended. You need to be described the way your buyers describe their problem, in the places AI reads.
          </Reveal>
        </div>
      </section>

      {/* 3. SHORTLIST LOOP */}
      <section className="px-6 py-20 sm:py-24">
        <div className="max-w-5xl mx-auto">
          <Reveal as="h2" className="font-display font-bold text-3xl sm:text-4xl text-center leading-tight mb-3">
            The Shortlist Loop.
          </Reveal>
          <Reveal as="p" className="text-center text-white/60 text-lg mb-12" delay={60}>
            Every month, four steps.
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {loopSteps.map((s, i) => (
              <Reveal key={s.n} delay={i * 90} className="relative rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#12121b,#0b0b12)] p-6">
                <div className="w-10 h-10 rounded-full bg-[#B1130F] flex items-center justify-center font-bold text-white mb-4 shadow-[0_0_20px_-4px_rgba(177,19,15,0.8)]">{s.n}</div>
                <h3 className="font-semibold text-lg text-white mb-2">{s.title}</h3>
                <p className="text-[13.5px] text-white/60 leading-relaxed">{s.body}</p>
                {i < loopSteps.length - 1 && (
                  <svg className="hidden lg:block absolute top-1/2 -right-3 w-6 h-6 text-white/20 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 6l6 6-6 6" />
                  </svg>
                )}
              </Reveal>
            ))}
          </div>
          <Reveal as="p" className="text-center text-[15px] text-white/70 mt-10" delay={120}>
            Then we check again, and you see the answer change.
          </Reveal>
        </div>
      </section>

      {/* 4. PRICING */}
      <section className="px-6 py-20 sm:py-24">
        <div className="max-w-5xl mx-auto">
          <Reveal as="h2" className="font-display font-bold text-3xl sm:text-4xl text-center leading-tight mb-12">
            What you get each month
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
            {plans.map((p, i) => (
              <Reveal
                key={p.name}
                delay={i * 90}
                className={`relative rounded-2xl p-7 flex flex-col h-full border ${
                  p.featured
                    ? "border-[#ff5b56]/50 bg-[linear-gradient(160deg,#1a1016,#0b0b12)] shadow-[0_0_50px_-16px_rgba(255,61,56,0.5)] lg:-mt-3"
                    : "border-white/10 bg-[linear-gradient(160deg,#12121b,#0b0b12)]"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-[#b1130f] to-[#ff3d38] text-white text-[11px] font-bold font-mono uppercase tracking-wide whitespace-nowrap">
                    Most popular
                  </span>
                )}
                <div className="font-mono text-[12px] font-bold uppercase tracking-wide text-[#ff9d99] mb-3">{p.name}</div>
                <div className="font-display font-extrabold text-3xl text-white mb-1">
                  {p.price}
                  <span className="text-[15px] font-semibold text-white/45">/mo</span>
                </div>
                <p className="text-[14px] text-white/65 mb-6 min-h-[42px]">{p.line}</p>
                <ul className="space-y-3 mb-7 flex-1">
                  {p.includes.map((it) => (
                    <li key={it} className="flex gap-2.5 text-[13.5px] text-white/75 leading-snug">
                      <svg className="w-4 h-4 text-[#3ecf8e] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4.5 4.5L19 7" />
                      </svg>
                      {it}
                    </li>
                  ))}
                </ul>
                <TrialButton className="w-full">Start free trial</TrialButton>
              </Reveal>
            ))}
          </div>
          <Reveal as="p" className="text-center text-[14px] text-white/60 leading-relaxed max-w-2xl mx-auto mt-8">
            Every plan starts with 2 weeks free after a 15 minute call. Swap any item for another of equal size, any month. Cancel anytime.
          </Reveal>
        </div>
      </section>

      {/* 5. REAL SAMPLES */}
      <section className="px-6 py-20 sm:py-24">
        <div className="max-w-5xl mx-auto">
          <Reveal as="h2" className="font-display font-bold text-3xl sm:text-4xl text-center leading-tight mb-12">
            Judge the work yourself.
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
            {/* LinkedIn post */}
            <Reveal className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4f8bff] to-[#a855f7] flex items-center justify-center text-white font-bold text-sm">SM</div>
                  <div>
                    <div className="text-[13px] font-semibold text-white leading-tight">Sarah Malik</div>
                    <div className="text-[11px] text-white/45">Founder at Northline Advisory</div>
                  </div>
                  <svg className="w-5 h-5 ml-auto text-[#0a66c2]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>
                </div>
                <div className="text-[12.5px] text-white/80 leading-relaxed space-y-1.5 mb-3">
                  <p>Last month a contractor told me he was "profitable but broke."</p>
                  <p>His P&amp;L looked great. His bank account did not.</p>
                  <p>The problem was retainage sitting unbilled for 90 days.</p>
                  <p>We rebuilt his cash flow around draw dates, not invoice dates.</p>
                  <p>Six weeks later he stopped using his credit line.</p>
                  <p>Profit on paper means nothing if the cash shows up too late.</p>
                </div>
                {/* simple chart */}
                <div className="rounded-lg border border-white/[0.06] bg-[#0b0b12] p-3 mb-3">
                  <div className="flex items-end gap-1.5 h-20">
                    {[30, 45, 35, 60, 50, 80].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-[#B1130F] to-[#ff6b67]" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                  <div className="text-[10px] text-white/35 font-mono mt-2 text-center">Cash on hand, weeks 1 to 6</div>
                </div>
                <div className="flex items-center gap-4 text-[11px] text-white/45 border-t border-white/[0.06] pt-2.5">
                  <span>👍 184</span>
                  <span>💬 37 comments</span>
                  <span>↻ 12 reposts</span>
                </div>
              </div>
            </Reveal>

            {/* Article preview */}
            <Reveal delay={90} className="rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#12121b,#0b0b12)] p-6 flex flex-col">
              <span className="inline-flex self-start items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#4f8bff]/15 border border-[#4f8bff]/30 text-[11px] font-mono font-semibold text-[#8fb4ff] mb-4">
                Interactive: retainage calculator
              </span>
              <h3 className="font-display font-bold text-xl text-white leading-snug mb-3">How Texas contractors should handle retainage in 2026</h3>
              <p className="text-[13px] text-white/60 leading-relaxed mb-4">
                Retainage can quietly hold 5 to 10 percent of a job hostage for months. Here is how the best contractors schedule it, bill it, and keep it from draining their cash. Includes a calculator you can run on your own numbers.
              </p>
              <div className="mt-auto flex items-center gap-2 text-[11px] text-white/40 font-mono">
                <span>Article</span><span>·</span><span>7 min read</span>
              </div>
            </Reveal>

            {/* Monthly report */}
            <Reveal delay={180} className="rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#12121b,#0b0b12)] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[15px] text-white">AI search check, November</h3>
                <span className="text-[10px] font-mono uppercase tracking-wide text-white/40 border border-white/15 rounded px-2 py-0.5">Example report</span>
              </div>
              <div className="rounded-lg border border-white/[0.06] overflow-hidden text-[11.5px]">
                <div className="grid grid-cols-[1fr_auto_auto_auto] gap-2 px-3 py-2 bg-white/[0.03] font-mono text-[10px] uppercase tracking-wide text-white/40">
                  <span>Question</span><span>GPT</span><span>Claude</span><span>Perp</span>
                </div>
                {[
                  ["Construction CPA Texas", true, true, false],
                  ["WIP schedule help", true, false, true],
                  ["Retainage accounting", true, true, true],
                  ["Contractor job costing", false, true, false],
                  ["Best firm for GCs", false, false, false],
                ].map((r, i) => (
                  <div key={i} className="grid grid-cols-[1fr_auto_auto_auto] gap-2 px-3 py-2 border-t border-white/[0.04] items-center">
                    <span className="text-white/65 truncate">{r[0] as string}</span>
                    {[r[1], r[2], r[3]].map((v, j) => (
                      <span key={j} className={`w-4 text-center font-bold ${v ? "text-[#3ecf8e]" : "text-white/25"}`}>{v ? "✓" : "·"}</span>
                    ))}
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-lg bg-[#3ecf8e]/10 border border-[#3ecf8e]/25 px-3 py-2.5 text-[12.5px] font-semibold text-[#6fe3b0]">
                Named in 7 of 20 questions (up from 2)
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6. TIMELINE */}
      <section className="px-6 py-20 sm:py-24">
        <div className="max-w-3xl mx-auto">
          <Reveal as="h2" className="font-display font-bold text-3xl sm:text-4xl text-center leading-tight mb-12">
            What happens when
          </Reveal>
          <div className="space-y-4">
            {timeline.map((t, i) => (
              <Reveal key={t.when} delay={i * 80} className="flex gap-4 rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#12121b,#0b0b12)] p-5">
                <div className="font-mono text-[12px] font-bold text-[#ff9d99] whitespace-nowrap pt-0.5 w-28 flex-shrink-0">{t.when}</div>
                <p className="text-[14px] text-white/75 leading-relaxed">{t.what}</p>
              </Reveal>
            ))}
          </div>
          <Reveal as="p" className="text-center text-[15px] text-white/70 italic mt-8" style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "19px" }}>
            We won't promise leads in week one. Anyone who does is guessing.
          </Reveal>
        </div>
      </section>

      {/* 7. COST COMPARISON */}
      <section className="px-6 py-20 sm:py-24">
        <div className="max-w-3xl mx-auto">
          <Reveal as="h2" className="font-display font-bold text-3xl sm:text-4xl text-center leading-tight mb-12">
            What it costs compared to the alternatives
          </Reveal>
          <Reveal className="rounded-2xl border border-white/10 overflow-hidden">
            {compare.map((c, i) => (
              <div
                key={c.option}
                className={`grid grid-cols-[1fr_auto] gap-4 px-5 sm:px-6 py-4 items-center ${i > 0 ? "border-t border-white/[0.06]" : ""} ${
                  c.us ? "bg-[#B1130F]/[0.12]" : "bg-white/[0.02]"
                }`}
              >
                <span className={`text-[14px] ${c.us ? "font-bold text-white" : "text-white/75"}`}>{c.option}</span>
                <span className={`text-[14px] text-right ${c.us ? "font-bold text-[#ff9d99]" : "text-white/55"}`}>{c.cost}</span>
              </div>
            ))}
          </Reveal>
          <Reveal as="p" className="text-center text-[14px] text-white/60 leading-relaxed max-w-2xl mx-auto mt-6">
            We use our own in-house systems for the heavy lifting, and a person reviews everything before it goes live. That's why it costs a fraction of a retainer.
          </Reveal>
        </div>
      </section>

      {/* 8. GUARANTEE */}
      <section className="px-6 py-20 sm:py-24">
        <div className="max-w-3xl mx-auto">
          <Reveal className="rounded-3xl border border-[#B1130F]/40 bg-[linear-gradient(160deg,#1a1016,#0b0b12)] p-8 sm:p-12 text-center shadow-[0_0_60px_-20px_rgba(177,19,15,0.6)]">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#B1130F]/15 border border-[#B1130F]/40 mb-6">
              <svg className="w-7 h-7 text-[#ff6b67]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white leading-tight mb-5">
              Named, or we keep working free.
            </h2>
            <p className="text-[15.5px] text-white/75 leading-relaxed max-w-xl mx-auto mb-6">
              On our first call we agree 20 questions your buyers actually ask. If ChatGPT isn't naming you for at least 3 of them within 90 days, we keep working, free, until it does.
            </p>
            <div className="font-mono text-[12.5px] text-white/55">
              2 weeks free to start · Month to month · You own everything we make.
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="px-6 py-20 sm:py-24">
        <div className="max-w-3xl mx-auto">
          <Reveal as="h2" className="font-display font-bold text-3xl sm:text-4xl text-center leading-tight mb-12">
            Questions owners ask
          </Reveal>
          <div className="space-y-3">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={f.q} className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={open}
                  >
                    <span className="text-[14.5px] font-semibold text-white">{f.q}</span>
                    <svg className={`w-5 h-5 flex-shrink-0 text-white/50 transition-transform duration-300 ${open ? "rotate-45" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                  <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <p className="px-5 pb-4 text-[14px] text-white/65 leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="px-6 py-20 sm:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal as="h2" className="font-display font-bold text-3xl sm:text-4xl leading-tight mb-4">
            See what ChatGPT says about you, then decide.
          </Reveal>
          <Reveal as="p" className="text-[15px] text-white/65 leading-relaxed max-w-lg mx-auto mb-8" delay={60}>
            15 minutes. We show you your AI search check, agree your buyer questions, and start your 2 weeks free. No card needed.
          </Reveal>
          <Reveal delay={120}>
            <div
              className="calendly-inline-widget rounded-2xl overflow-hidden border border-white/10 bg-white mx-auto"
              data-url={CALENDLY}
              style={{ minWidth: "280px", height: "680px" }}
            />
            <div className="mt-6">
              <TrialButton>Book your 15 minute call</TrialButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
