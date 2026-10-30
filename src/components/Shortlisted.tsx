/* eslint-disable react/no-unescaped-entities */
"use client";

// /shortlisted page body, rebuilt on the slot model 2026-10-30.
// Prices, packages and slot copy come from src/lib/slots.ts. Sample content uses invented companies, labelled Example.

import { useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import SlotChip from "@/components/slots/SlotChip";
import OutcomePackages from "@/components/slots/OutcomePackages";
import AiAnswerDemo from "@/components/shortlisted/AiAnswerDemo";
import ReportDemo from "@/components/shortlisted/ReportDemo";
import { ExampleTag, Eyebrow, GhostButton, H2, TrialButton, useInView, useReducedMotion } from "@/components/shortlisted/ui";
import { itemsSlotCount, money, packageById, PRICE_LINE, priceFor, slotById, SWAP_LINE, TRIAL } from "@/lib/slots";

const OUTCOME = "shortlisted";

const starter = packageById("shortlisted-starter")!;
const FROM_PRICE = money(priceFor(itemsSlotCount(starter.items)));

const reasons = [
  {
    n: "1",
    title: "It repeats what it reads",
    body: "An assistant searches the web for the question, reads a handful of pages and sums them up. If those pages don't mention you, the answer won't either.",
    slot: "ai-search",
    does: "We run your 20 buyer questions every month and see exactly which pages it read.",
  },
  {
    n: "2",
    title: "It quotes pages with numbers and sources",
    body: "Research on AI answers found pages with statistics, quotes and named sources get used more, and stuffing keywords makes it worse.",
    slot: "articles",
    does: "Every article answers one buyer question, with real numbers and where they came from.",
  },
  {
    n: "3",
    title: "It trusts what other sites say about you",
    body: "Lists, roundups, comparisons and review pages carry a lot of weight. Being named on them is how you go from missing to on the shortlist.",
    slot: "citations",
    does: "We get you onto the lists and roundups AI already quotes for your questions.",
  },
  {
    n: "4",
    title: "Buyers check the name it gives them",
    body: "When a buyer sees your name in an answer, they look you up. What they find decides whether they call.",
    slot: "linkedin-posts",
    does: "They find you posting something useful every week, and the same buyers keep seeing you.",
  },
];

const timeline = [
  {
    when: "Month 1",
    get: ["Your 20 buyer questions agreed with you, and a baseline report before anything goes live", "Your first articles and 8 LinkedIn posts live", "Your site checked so Google, Bing and AI crawlers can read it"],
    not: "Any AI mention yet. It is too early, and anyone who promises one is guessing.",
  },
  {
    when: "Months 2 to 3",
    get: ["Articles indexed and showing up in Google for long, specific questions", "First mentions on your narrow questions become possible", "Outreach to the lists and roundups AI reads"],
    not: "Being named for broad \"best X\" questions. Those take longer.",
  },
  {
    when: "Month 6",
    get: ["A measured trend across all 20 questions and 4 assistants", "More sites mentioning you", "A clear read on which slots earn their place, so you can swap the rest"],
    not: "Being \"the\" recommendation by a set date. Nobody controls that.",
  },
];

const compare = [
  { option: "Content marketing agency", cost: "$5,000 to $15,000 a month", us: false },
  { option: "AI search (GEO) agency retainer", cost: "about $6,850 a month (median)", us: false },
  { option: "LinkedIn ghostwriting agency", cost: "from $2,950 a month, LinkedIn only", us: false },
  { option: "Shortlisted", cost: `from ${FROM_PRICE} a month, all of it`, us: true },
];

const faqs = [
  { q: "Will it sound like me?", a: "Yes. We learn your voice from your past posts, emails and a short call, and you approve every post before it goes out." },
  { q: "How much of my time does it take?", a: "About 10 minutes a week to approve posts. One short call to start." },
  { q: "Is AI writing it?", a: "Our systems do the research and first drafts, and a person edits and checks everything. Nothing goes live without your approval." },
  { q: "Will Google penalise this content?", a: "No. Google ranks helpful content no matter how it was made, and every article answers a real buyer question with real sources." },
  { q: "Do I need a new website?", a: "No. We publish the articles on your site (or set up a blog if you don't have one) and make small fixes so AI crawlers can read it. If you want the homepage rebuilt too, that is a slot you can add." },
  { q: "How is this different from a $99 tracking tool?", a: "A tool tells you that you're missing. We do the work that gets you named, and the tracking is one slot of five." },
  { q: "What is a slot, and can I change mine?", a: `Each slot is one piece of work that arrives every month. ${SWAP_LINE} If articles are working and posts are not, move that slot to more articles next month.` },
  { q: "I already have an agency.", a: "Keep them if they get you named by ChatGPT. Start the free trial and compare." },
  { q: `What happens in the free ${TRIAL.length}?`, a: `We run your AI search check, agree your 20 buyer questions, and deliver ${TRIAL.slots} of real work for you to judge. No card needed.` },
  { q: "Can I cancel?", a: "Anytime. It's month to month, and you keep everything we made." },
];

function ArrowDown() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-6-6m6 6l6-6" />
    </svg>
  );
}

function Explainer({ state }: { state: "before" | "after" }) {
  return (
    <div className="relative">
      <div className={`transition-all duration-500 ${state === "before" ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0"}`} aria-hidden={state !== "before"}>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#B1130F]/40 bg-[#B1130F]/10 px-3 py-1 text-[12px] font-semibold text-[#ff9d99]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff5b56]" /> Not named
        </div>
        <h3 className="mb-3 font-display text-2xl font-bold leading-snug text-white">The assistant read three pages. None of them mentioned Northline.</h3>
        <p className="text-[15px] leading-relaxed text-[#9099b8]">
          So Northline doesn't exist in this answer, even though they are good at exactly this. The buyer calls one of the three names and never hears of them.
        </p>
      </div>
      <div className={`transition-all duration-500 ${state === "after" ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0"}`} aria-hidden={state !== "after"}>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#10b981]/40 bg-[#10b981]/10 px-3 py-1 text-[12px] font-semibold text-[#7af0bf]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#34d399]" /> Named
        </div>
        <h3 className="mb-3 font-display text-2xl font-bold leading-snug text-white">Two pages changed, so the answer changed.</h3>
        <p className="mb-5 text-[15px] leading-relaxed text-[#9099b8]">
          Northline published an article that answers this exact question with real numbers and sources. And a roundup the assistant already trusts now lists them. Same question, new answer.
        </p>
        <div className="flex flex-wrap gap-2">
          <SlotChip id="articles" />
          <SlotChip id="citations" />
        </div>
      </div>
    </div>
  );
}

function Samples() {
  const ref = useRef<HTMLDivElement | null>(null);
  const seen = useInView(ref, 0.2);
  const reduce = useReducedMotion();
  const on = seen || reduce;
  return (
    <div ref={ref} className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
      {/* LinkedIn post */}
      <Reveal className="flex min-w-0 flex-col gap-3">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
          <div className="p-4 sm:p-5">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#4f8bff] to-[#a855f7] text-sm font-bold text-white">SB</div>
              <div className="min-w-0">
                <div className="text-[13px] font-semibold leading-tight text-white">Sarah Bennett</div>
                <div className="truncate text-[11px] text-white/45">Founder at Northline Advisory</div>
              </div>
              <ExampleTag className="ml-auto">Example post</ExampleTag>
              <svg className="h-5 w-5 shrink-0 text-[#0a66c2]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>
            </div>
            <div className="mb-3 space-y-1.5 text-[13px] leading-relaxed text-white/80">
              <p>Last month a contractor told me he was "profitable but broke."</p>
              <p>His P&amp;L looked great. His bank account did not.</p>
              <p>The problem was retainage sitting unbilled for 90 days.</p>
              <p>We rebuilt his cash flow around draw dates, not invoice dates.</p>
              <p>Six weeks later he stopped using his credit line.</p>
              <p>Profit on paper means nothing if the cash shows up too late.</p>
            </div>
            <div className="mb-3 rounded-lg border border-white/[0.06] bg-[#0b0b12] p-3">
              <div className="flex h-24 items-end gap-1.5">
                {[30, 45, 35, 60, 50, 80].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 origin-bottom rounded-t bg-gradient-to-t from-[#B1130F] to-[#ff6b67]"
                    style={{
                      height: `${h}%`,
                      transform: on ? "scaleY(1)" : "scaleY(0)",
                      transition: reduce ? "none" : "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
                      transitionDelay: reduce ? "0ms" : `${300 + i * 90}ms`,
                    }}
                  />
                ))}
              </div>
              <div className="mt-2 text-center font-mono text-[10px] text-white/35">Cash on hand, weeks 1 to 6</div>
            </div>
            <div className="flex items-center gap-4 border-t border-white/[0.06] pt-2.5 text-[11px] text-white/45">
              <span>Like</span>
              <span>Comment</span>
              <span>Repost</span>
              <span className="ml-auto hidden sm:inline">First comment: link to the article</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[12.5px] text-white/50">
          <span>Made by your</span> <SlotChip id="linkedin-posts" size="sm" /> <span>slot, 8 a month</span>
        </div>
      </Reveal>

      {/* Article */}
      <Reveal delay={90} className="flex min-w-0 flex-col gap-3">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#12121b,#0b0b12)]">
          <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="ml-3 truncate rounded-md bg-white/[0.05] px-3 py-1 font-mono text-[10.5px] text-white/40">northlineadvisory / insights / texas-retainage-2026</span>
          </div>
          <div className="p-5 sm:p-6">
            <div className="mb-4 flex items-start justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-[#4f8bff]/30 bg-[#4f8bff]/15 px-2.5 py-1 font-mono text-[11px] font-semibold text-[#8fb4ff]">
                Interactive: retainage calculator
              </span>
              <ExampleTag>Example article</ExampleTag>
            </div>
            <h3 className="mb-3 font-display text-xl font-bold leading-snug text-white">How Texas contractors should handle retainage in 2026</h3>
            <p className="mb-4 text-[13.5px] leading-relaxed text-white/60">
              Short answer first: retainage can hold 5 to 10 percent of a job for months. Here is how the best contractors schedule it, bill it, and keep it from draining their cash, with a calculator you can run on your own numbers.
            </p>
            <div className="mb-4 space-y-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Built the way AI likes to quote</div>
              {["Answers one buyer question in the first lines", "Real numbers, each with its source", "Quotes the primary rule word for word", "Links to your other articles and to the calculator"].map((t) => (
                <div key={t} className="flex gap-2 text-[12.5px] text-white/70">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#3ecf8e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.6} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12.5l4.5 4.5L19 7" />
                  </svg>
                  {t}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-white/40">
              <span>Article</span><span>·</span><span>7 min read</span><span>·</span><span>4 sources</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[12.5px] text-white/50">
          <span>Made by your</span> <SlotChip id="articles" size="sm" /> <span>slot</span>
        </div>
      </Reveal>
    </div>
  );
}

export default function Shortlisted() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [demoState, setDemoState] = useState<"before" | "after">("before");
  const tracking = slotById("ai-search");

  return (
    <div className="text-white">
      {/* 1. HERO */}
      <section className="px-4 pb-14 pt-20 sm:px-6 sm:pb-20 sm:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#B1130F]/40 bg-[#B1130F]/10 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff5b56]" />
            <span className="whitespace-nowrap text-[10.5px] font-semibold uppercase tracking-normal text-white/85 sm:text-xs sm:tracking-wide">Shortlisted · Get recommended by ChatGPT</span>
          </Reveal>
          <Reveal as="h1" className="mb-6 font-display text-[38px] font-bold leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.6rem]" delay={60}>
            When your buyers ask ChatGPT who to hire, <em className="hd-em">be on the list.</em>
          </Reveal>
          <Reveal as="p" className="mx-auto mb-7 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg" delay={120}>
            Shortlisted gets you recommended by ChatGPT, Claude, Perplexity and Google's AI, and puts you in front of the same buyers on LinkedIn. Done for you, in your voice, about 10 minutes a week of your time.
          </Reveal>
          <Reveal className="mb-8 flex flex-wrap justify-center gap-2" delay={150}>
            {packageById("shortlisted")!.items.map((it) => (
              <SlotChip key={it.slot} id={it.slot} qty={it.qty} size="sm" />
            ))}
          </Reveal>
          <Reveal className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4" delay={200}>
            <TrialButton outcome={OUTCOME} />
            <GhostButton href="#answer">
              See it change an answer <ArrowDown />
            </GhostButton>
          </Reveal>
          <Reveal className="mt-6 font-mono text-[12.5px] text-white/50" delay={240}>
            From {FROM_PRICE} a month · Month to month · {TRIAL.length} free to start
          </Reveal>
        </div>
      </section>

      {/* 2. SIGNATURE: THE ANSWER */}
      <section id="answer" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
            <Reveal><Eyebrow>The answer your buyer gets</Eyebrow></Reveal>
            <Reveal delay={60}>
              <H2>
                Your buyers already asked. <em className="hd-em">Were you in the answer?</em>
              </H2>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-14">
            <Reveal className="min-w-0">
              <AiAnswerDemo onStateChange={setDemoState} />
            </Reveal>
            <Reveal delay={120} className="min-w-0">
              <Explainer state={demoState} />
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { big: "51%", body: "of B2B software buyers now start their research in an AI chatbot more often than Google.", src: "G2, March 2026, 1,076 buyers" },
              { big: "69%", body: "say a chatbot pointed them to a vendor they had not expected.", src: "G2, March 2026" },
              { big: "7% vs 53%", body: "notice a vendor because they know the name, versus one that matches their exact problem.", src: "Semrush, July 2026, 519 buyers" },
            ].map((s, i) => (
              <Reveal key={s.src} delay={i * 80} className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <div className="mb-2 font-display text-2xl font-bold leading-none text-[#ff6b67] sm:text-[1.7rem]">{s.big}</div>
                <p className="mb-2 text-[13.5px] leading-snug text-white/70">{s.body}</p>
                <p className="font-mono text-[11px] text-white/35">{s.src}</p>
              </Reveal>
            ))}
          </div>
          <Reveal as="p" className="mx-auto mt-8 max-w-2xl text-center text-[15px] leading-relaxed text-white/70">
            You don't need to be famous to be recommended. You need to be described the way your buyers describe their problem, in the places AI reads.
          </Reveal>
        </div>
      </section>

      {/* 3. HOW AI PICKS */}
      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Reveal><Eyebrow>How it works</Eyebrow></Reveal>
            <Reveal delay={60}>
              <H2>
                How AI decides <em className="hd-em">who to recommend.</em>
              </H2>
            </Reveal>
            <Reveal as="p" delay={100} className="mt-4 text-[16px] leading-relaxed text-[#9099b8]">
              There is no secret switch. It searches, reads a handful of pages and repeats what they say. So we work on the pages it reads, one slot for each reason.
            </Reveal>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
            {reasons.map((r, i) => (
              <Reveal
                key={r.n}
                delay={i * 80}
                className="group relative flex flex-col rounded-2xl border border-[#1f1f30] bg-[linear-gradient(165deg,#141420,#0b0b14)] p-6 transition-colors hover:border-[#B1130F]/40 sm:p-7"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#B1130F] font-bold text-white shadow-[0_0_20px_-4px_rgba(177,19,15,0.8)]">{r.n}</span>
                  <h3 className="font-display text-[19px] font-bold leading-snug text-white">{r.title}</h3>
                </div>
                <p className="mb-5 text-[14.5px] leading-relaxed text-[#9099b8]">{r.body}</p>
                <div className="mt-auto rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="mb-2.5 flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">The slot</span>
                    <SlotChip id={r.slot} size="sm" />
                  </div>
                  <p className="text-[13.5px] leading-snug text-white/75">{r.does}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE MONTHLY REPORT */}
      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
            <Reveal><Eyebrow>The monthly report</Eyebrow></Reveal>
            <Reveal delay={60}>
              <H2>
                Every month, you see <em className="hd-em">who gets named.</em>
              </H2>
            </Reveal>
            <Reveal as="p" delay={100} className="mt-4 text-[16px] leading-relaxed text-[#9099b8]">
              {tracking.monthly}. {tracking.tooltip}
            </Reveal>
          </div>
          <Reveal>
            <ReportDemo />
          </Reveal>
        </div>
      </section>

      {/* 5. SAMPLES */}
      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
            <Reveal><Eyebrow>The work</Eyebrow></Reveal>
            <Reveal delay={60}>
              <H2>
                Judge the work <em className="hd-em">yourself.</em>
              </H2>
            </Reveal>
            <Reveal as="p" delay={100} className="mt-4 text-[16px] leading-relaxed text-[#9099b8]">
              The post and the article behind the answer above. Written in your voice, approved by you before anything goes live.
            </Reveal>
          </div>
          <Samples />
        </div>
      </section>

      {/* 6. PACKAGES */}
      <section id="packages" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
            <Reveal><Eyebrow>Packages</Eyebrow></Reveal>
            <Reveal delay={60}>
              <H2>
                Pick your slots. <em className="hd-em">Swap any of them later.</em>
              </H2>
            </Reveal>
            <Reveal as="p" delay={100} className="mt-4 text-[16px] leading-relaxed text-[#9099b8]">
              {SWAP_LINE} Every 4th slot is free. Month to month. {PRICE_LINE}.
            </Reveal>
          </div>
          <Reveal>
            <OutcomePackages outcome="shortlisted" />
          </Reveal>
          <Reveal as="p" className="mx-auto mt-6 max-w-2xl text-center text-[13.5px] leading-relaxed text-white/55">
            Swap any slot month to month. More articles, more citation outreach or a LinkedIn slot can come in whenever the report says it will help.
          </Reveal>

          {/* Cost comparison */}
          <Reveal className="mx-auto mt-14 max-w-3xl">
            <h3 className="mb-5 text-center font-display text-xl font-bold text-white sm:text-2xl">What the same work costs elsewhere</h3>
            <div className="overflow-hidden rounded-2xl border border-white/10">
              {compare.map((c, i) => (
                <div
                  key={c.option}
                  className={`grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-4 sm:px-6 ${i > 0 ? "border-t border-white/[0.06]" : ""} ${
                    c.us ? "bg-[#B1130F]/[0.12]" : "bg-white/[0.02]"
                  }`}
                >
                  <span className={`text-[14px] ${c.us ? "font-bold text-white" : "text-white/75"}`}>{c.option}</span>
                  <span className={`text-[14px] sm:text-right ${c.us ? "font-bold text-[#ff9d99]" : "text-white/55"}`}>{c.cost}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-[13.5px] leading-relaxed text-white/55">
              Our own systems do the heavy lifting and a person reviews everything before it goes live. That is why it costs a fraction of a retainer.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 7. HONEST TIMELINE */}
      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
            <Reveal><Eyebrow>What changes when</Eyebrow></Reveal>
            <Reveal delay={60}>
              <H2>
                An honest timeline. <em className="hd-em">No made up dates.</em>
              </H2>
            </Reveal>
            <Reveal as="p" delay={100} className="mt-4 text-[16px] leading-relaxed text-[#9099b8]">
              Getting named by AI is slow, steady work. Here is what you can expect, and what we will not promise.
            </Reveal>
          </div>
          <div className="relative grid gap-4 lg:grid-cols-3 lg:gap-5">
            {timeline.map((t, i) => (
              <Reveal key={t.when} delay={i * 90} className="flex flex-col rounded-2xl border border-[#1f1f30] bg-[linear-gradient(165deg,#141420,#0b0b14)] p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-[#ff5b56] shadow-[0_0_12px_#ff3d38]" />
                  <span className="font-mono text-[13px] font-bold uppercase tracking-wide text-[#ff9d99]">{t.when}</span>
                </div>
                <ul className="mb-5 space-y-2.5">
                  {t.get.map((g) => (
                    <li key={g} className="flex gap-2.5 text-[14px] leading-snug text-white/80">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#3ecf8e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.6} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12.5l4.5 4.5L19 7" />
                      </svg>
                      {g}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
                  <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">We won't promise</div>
                  <p className="text-[13px] leading-snug text-white/60">{t.not}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="px-4 py-16 sm:px-6 sm:py-24">
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

      {/* 9. FINAL CTA */}
      <section className="px-4 pb-24 pt-10 sm:px-6 sm:pb-28">
        <Reveal className="mx-auto max-w-3xl rounded-3xl border border-[#B1130F]/40 bg-[linear-gradient(160deg,#1a1016,#0b0b12)] p-8 text-center shadow-[0_0_60px_-20px_rgba(177,19,15,0.6)] sm:p-12">
          <H2 className="mb-4">
            See what ChatGPT says about you, <em className="hd-em">then decide.</em>
          </H2>
          <p className="mx-auto mb-8 max-w-lg text-[15px] leading-relaxed text-white/65">
            Start with {TRIAL.length} free. We run your AI search check, agree your buyer questions and deliver {TRIAL.slots} of real work. No card needed.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <TrialButton outcome={OUTCOME} />
            <GhostButton href="/pricing/">See pricing</GhostButton>
          </div>
          <p className="mt-6 font-mono text-[12px] text-white/45">From {FROM_PRICE} a month · Month to month · You own everything we make</p>
        </Reveal>
      </section>
    </div>
  );
}
