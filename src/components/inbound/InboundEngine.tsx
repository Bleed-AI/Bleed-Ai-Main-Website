/* eslint-disable react/no-unescaped-entities */
"use client";

// /inbound-engine page body (2026-10-30). Prices, packages and slot copy come from src/lib/slots.ts.
// Every sample uses an invented company and is labelled Example.

import { useState } from "react";
import Reveal from "@/components/Reveal";
import SlotChip from "@/components/slots/SlotChip";
import OutcomePackages from "@/components/slots/OutcomePackages";
import SiteTransform from "./SiteTransform";
import LeadMagnetCalc from "./LeadMagnetCalc";
import EngineFlow from "./EngineFlow";
import { Eyebrow, GhostButton, H2, TrialButton } from "@/components/shortlisted/ui";
import { itemsSlotCount, money, outcomeById, packageById, PRICE_LINE, priceFor, slotById, SWAP_LINE, TRIAL } from "@/lib/slots";

const OUTCOME = "inbound-engine";
const pkg = packageById("inbound")!;
const SLOT_COUNT = itemsSlotCount(pkg.items);
const PRICE = money(priceFor(SLOT_COUNT));
const RELATED = ["ai-search", "citations", "website-visitors"];

const faqs = [
  {
    q: "Do I need a whole new website?",
    a: `No. The ${slotById("page-revamp").name} slot rebuilds your homepage or one landing page and fixes what Google and AI crawlers need. The rest of your site stays as it is. More pages is a Pro option.`,
  },
  {
    q: "What kind of tool would you build?",
    a: "Whatever your buyers would actually use: a calculator, a price estimator, a readiness check, a short report built from their own numbers. We pick it with you on the first call, build it, put it on your site and improve it every month.",
  },
  {
    q: "When do the leads start?",
    a: "The page and the tool go live in the first month, so visitors you already get can start leaving their email straight away. Articles take longer: expect them to show up in Google for specific questions after 2 to 3 months. We won't promise a number of leads, because nobody honest can.",
  },
  {
    q: "Who owns it?",
    a: "You do. The page, the articles, the tool and the posts are yours, and they stay on your site if you leave.",
  },
  {
    q: "What if one part isn't working?",
    a: `${SWAP_LINE} If the articles pull and the posts don't, move that slot to more articles, or to AI search tracking, next month.`,
  },
  {
    q: "How much of my time does it take?",
    a: "A short call to start, then about 10 minutes a week to approve posts and drafts. Nothing goes live without your yes.",
  },
  {
    q: `What happens in the free ${TRIAL.length}?`,
    a: `We pick ${TRIAL.slots} that will show you the most, usually the page revamp or the tool, and deliver real work you can judge. No card needed.`,
  },
  { q: "Can I cancel?", a: "Anytime. It's month to month, and you keep everything we made." },
];

export default function InboundEngine() {
  const outcome = outcomeById(OUTCOME);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [captured, setCaptured] = useState(0);

  return (
    <div className="text-white">
      {/* 1. HERO */}
      <section className="px-4 pb-12 pt-20 sm:px-6 sm:pb-16 sm:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#B1130F]/40 bg-[#B1130F]/10 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff5b56]" />
            <span className="whitespace-nowrap text-[10.5px] font-semibold uppercase tracking-normal text-white/85 sm:text-xs sm:tracking-wide">{outcome.name} · For B2B companies</span>
          </Reveal>
          <Reveal as="h1" className="mb-6 font-display text-[38px] font-bold leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.6rem]" delay={60}>
            Turn your website into <em className="hd-em">a lead source.</em>
          </Reveal>
          <Reveal as="p" className="mx-auto mb-7 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg" delay={120}>
            Most B2B websites are a brochure. People visit, read a little and leave without a word. We rebuild the page that matters, publish articles that get found, put a tool on your site that collects emails, and post on LinkedIn to send buyers to it. Every month.
          </Reveal>
          <Reveal className="mb-8 flex flex-wrap justify-center gap-2" delay={150}>
            {pkg.items.map((it) => (
              <SlotChip key={it.slot} id={it.slot} qty={it.qty} size="sm" />
            ))}
          </Reveal>
          <Reveal className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4" delay={200}>
            <TrialButton outcome={OUTCOME} />
            <GhostButton href="#packages">See the package</GhostButton>
          </Reveal>
          <Reveal className="mt-6 font-mono text-[12.5px] text-white/50" delay={240}>
            {PRICE} a month for {SLOT_COUNT} slots, the 4th is free · Month to month · {TRIAL.length} free to start
          </Reveal>
        </div>
      </section>

      {/* 2. SIGNATURE: THE PAGE */}
      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <Reveal><Eyebrow>The page</Eyebrow></Reveal>
            <Reveal delay={60}>
              <H2>
                Same company. <em className="hd-em">A page that asks for the call.</em>
              </H2>
            </Reveal>
            <Reveal as="p" delay={100} className="mt-4 text-[16px] leading-relaxed text-[#9099b8]">
              Drag across it. {slotById("page-revamp").tooltip}
            </Reveal>
          </div>
          <Reveal>
            <SiteTransform />
          </Reveal>
        </div>
      </section>

      {/* 3. SIGNATURE: THE LEAD MAGNET */}
      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
          <div className="min-w-0">
            <Reveal><Eyebrow>The tool</Eyebrow></Reveal>
            <Reveal delay={60}>
              <H2 className="lg:text-[40px]">
                A tool your buyers use, <em className="hd-em">and leave their email for.</em>
              </H2>
            </Reveal>
            <Reveal as="p" delay={100} className="mt-5 text-[16px] leading-relaxed text-[#9099b8]">
              A contact form asks for something and gives nothing back. A good tool answers a question your buyer is already asking, with their own numbers, then offers the full answer by email. Try this one. It works.
            </Reveal>
            <Reveal delay={140} className="mt-6 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
              <div className="mb-2.5 flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">The slot</span>
                <SlotChip id="lead-magnet-app" size="sm" />
              </div>
              <p className="text-[13.5px] leading-snug text-white/75">{slotById("lead-magnet-app").monthly}. {slotById("lead-magnet-app").tooltip}</p>
            </Reveal>
          </div>
          <Reveal delay={80} className="min-w-0">
            <LeadMagnetCalc onCapture={() => setCaptured((n) => n + 1)} />
          </Reveal>
        </div>
      </section>

      {/* 4. HOW THE SLOTS FEED EACH OTHER */}
      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <Reveal><Eyebrow>The engine</Eyebrow></Reveal>
            <Reveal delay={60}>
              <H2>
                Four slots. <em className="hd-em">Each one feeds the next.</em>
              </H2>
            </Reveal>
            <Reveal as="p" delay={100} className="mt-4 text-[16px] leading-relaxed text-[#9099b8]">
              Any one of these on its own is a nice to have. Together they move a stranger from a LinkedIn feed to your inbox.
            </Reveal>
          </div>
          <Reveal>
            <EngineFlow extraLeads={captured} />
          </Reveal>
        </div>
      </section>

      {/* 5. PACKAGE */}
      <section id="packages" className="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <Reveal><Eyebrow>The package</Eyebrow></Reveal>
            <Reveal delay={60}>
              <H2>
                {SLOT_COUNT} slots. <em className="hd-em">The 4th one is free.</em>
              </H2>
            </Reveal>
            <Reveal as="p" delay={100} className="mt-4 text-[16px] leading-relaxed text-[#9099b8]">
              {SWAP_LINE} Month to month. {PRICE_LINE}.
            </Reveal>
          </div>
          <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <Reveal className="min-w-0">
              <OutcomePackages outcome="inbound-engine" />
            </Reveal>
            <Reveal delay={100} className="min-w-0 rounded-2xl border border-[#1f1f30] bg-[linear-gradient(165deg,#141420,#0b0b14)] p-6 sm:p-7">
              <h3 className="font-display text-xl font-bold text-white">Slots you could swap in</h3>
              <p className="mt-1.5 text-[14px] leading-snug text-[#9099b8]">Add them, or swap one in when it makes more sense for you.</p>
              <ul className="mt-5 space-y-4">
                {RELATED.map((id) => {
                  const s = slotById(id);
                  return (
                    <li key={id} className="border-t border-white/[0.06] pt-4 first:border-t-0 first:pt-0">
                      <SlotChip id={id} size="sm" />
                      <p className="mt-2 text-[13.5px] leading-snug text-white/70">{s.title}.</p>
                    </li>
                  );
                })}
              </ul>
              <a href="/pricing/#builder" className="mt-6 inline-flex text-[13.5px] font-semibold text-white/80 underline underline-offset-4 hover:text-white">
                Build your own board
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <Reveal className="mb-10 text-center">
            <H2>Questions owners ask</H2>
          </Reveal>
          <div className="space-y-3">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={f.q} className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={open}
                  >
                    <span className="text-[14.5px] font-semibold text-white">{f.q}</span>
                    <svg className={`h-5 w-5 shrink-0 text-white/50 transition-transform duration-300 ${open ? "rotate-45" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                  <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <p className="px-5 pb-4 text-[14px] leading-relaxed text-white/65">{f.a}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="px-4 pb-24 pt-10 sm:px-6 sm:pb-28">
        <Reveal className="mx-auto max-w-3xl rounded-3xl border border-[#B1130F]/40 bg-[linear-gradient(160deg,#1a1016,#0b0b12)] p-8 text-center shadow-[0_0_60px_-20px_rgba(177,19,15,0.6)] sm:p-12">
          <H2 className="mb-4">
            Your site already gets visitors. <em className="hd-em">Start keeping them.</em>
          </H2>
          <p className="mx-auto mb-8 max-w-lg text-[15px] leading-relaxed text-white/65">
            Start with {TRIAL.length} free on {TRIAL.slots}. We usually begin with the page or the tool, so you see something real on your own site. No card needed.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <TrialButton outcome={OUTCOME} />
            <GhostButton href="/pricing/">See pricing</GhostButton>
          </div>
          <p className="mt-6 font-mono text-[12px] text-white/45">{PRICE} a month · Month to month · You own everything we make</p>
        </Reveal>
      </section>
    </div>
  );
}
