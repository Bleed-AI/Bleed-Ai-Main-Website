"use client";

// Signature piece for /linkedin-authority/ (round 2, 2026-10-30): the real thing, not a diagram.
// Left: a LinkedIn feed post with a designed carousel and its reactions. Right: LinkedIn messaging,
// where a buyer who commented gets a follow-up and replies. Invented people and companies, labelled Example.

import { useEffect, useState } from "react";
import SlotChip from "@/components/slots/SlotChip";
import LinkedInFeedPost, { DocCarousel } from "@/components/shortlisted/LinkedInFeedPost";
import { SYS_FONT } from "@/components/shortlisted/BrowserFrame";
import { ExampleTag } from "@/components/shortlisted/ui";
import { useOnceInView } from "@/components/outbound/useOnceInView";

const LINES = [
  "Month-end close is slow for the same three reasons.",
  "",
  "1. Receipts chased by email",
  "2. Reconciling in spreadsheets",
  "3. One person approving everything",
  "",
  "We fixed all three for a client last quarter. Their close went from two weeks to four days.",
  "",
  "Swipe for the checklist we now give every new client.",
];

const SLIDES = [
  { kicker: "Checklist", title: "3 things slowing your month-end close", body: "And the fix we use for each one.", foot: "Dana Okafor · Ledgerly" },
  { kicker: "Fix 1", big: "01", title: "One inbox for every receipt", body: "Staff forward receipts to one address. Nobody chases anyone by email.", foot: "Dana Okafor · Ledgerly" },
  { kicker: "Fix 2", big: "02", title: "Let the bank feed match first", body: "Spreadsheets only for what the feed could not match.", foot: "Dana Okafor · Ledgerly" },
  { kicker: "Fix 3", big: "03", title: "Approve by amount, not by person", body: "Small spend auto approves. Big spend goes to one owner.", foot: "Dana Okafor · Ledgerly" },
];

type Msg = { me?: boolean; text: string; time: string; file?: string };

const THREAD: Msg[] = [
  {
    me: true,
    time: "10:14 AM",
    text: "Hi Maria, thanks for the comment on the month-end post. You said your team still reconciles in spreadsheets, so here is the full checklist we use with clients.",
    file: "Month-end close checklist.pdf",
  },
  {
    time: "11:02 AM",
    text: "This is great, thank you. We're at about 9 days right now. Would be good to compare notes, are you free next week?",
  },
];

function MessagingWindow() {
  const { ref, seen, reduced } = useOnceInView<HTMLDivElement>(0.35);
  const [step, setStep] = useState(0);

  // 1: our message, 2: typing, 3: her reply.
  useEffect(() => {
    if (!seen) return;
    if (reduced) {
      setStep(3);
      return;
    }
    const t = [setTimeout(() => setStep(1), 500), setTimeout(() => setStep(2), 1700), setTimeout(() => setStep(3), 3300)];
    return () => t.forEach(clearTimeout);
  }, [seen, reduced]);

  return (
    <div
      ref={ref}
      className="flex flex-col overflow-hidden rounded-xl bg-white text-[#191919] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.95),0_0_0_1px_rgba(0,0,0,0.08)]"
      style={{ fontFamily: SYS_FONT }}
    >
      {/* Conversation header */}
      <div className="flex items-center gap-2.5 border-b border-[#e8e8e8] px-4 py-3">
        <span className="relative flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#7c5cbf] text-[13px] font-semibold text-white">
          MR
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#01754f] ring-2 ring-white" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[14px] font-semibold">Maria Ruiz</div>
          <div className="truncate text-[12px] text-[#666]">VP Finance at Brightpath Software</div>
        </div>
        <span className="flex gap-3 text-[#666]" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="5" cy="12" r="1.7" />
            <circle cx="12" cy="12" r="1.7" />
            <circle cx="19" cy="12" r="1.7" />
          </svg>
        </span>
      </div>

      {/* Thread */}
      <div className="flex min-h-[340px] flex-1 flex-col gap-3 px-4 py-4">
        <div className="mx-auto rounded-full bg-[#f3f2ef] px-3 py-1 text-center text-[11.5px] text-[#666]">
          Maria commented on your post: &ldquo;We still reconcile in spreadsheets. Saving this.&rdquo;
        </div>
        <div className="text-center text-[11px] font-semibold uppercase tracking-wide text-[#666]">Today</div>

        {THREAD.map((m, i) => {
          const on = i === 0 ? step >= 1 : step >= 3;
          return (
            <div key={i} className={`flex gap-2.5 transition-all duration-500 ${on ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
              <span
                className="flex h-8 w-8 flex-none items-center justify-center rounded-full text-[11px] font-semibold text-white"
                style={{ background: m.me ? "#0f6b5c" : "#7c5cbf" }}
              >
                {m.me ? "DO" : "MR"}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-1.5 text-[13px]">
                  <span className="font-semibold">{m.me ? "Dana Okafor" : "Maria Ruiz"}</span>
                  <span className="text-[11.5px] text-[#666]">· {m.time}</span>
                </div>
                <p className="mt-0.5 text-[13.5px] leading-[1.45] text-[#191919]">{m.text}</p>
                {m.file && (
                  <div className="mt-2 flex max-w-[280px] items-center gap-2.5 rounded-lg border border-[#e0dfdc] px-3 py-2">
                    <span className="flex h-8 w-7 flex-none items-center justify-center rounded bg-[#cc1016] text-[8.5px] font-bold text-white">PDF</span>
                    <span className="min-w-0">
                      <span className="block truncate text-[12.5px] font-semibold">{m.file}</span>
                      <span className="block text-[11px] text-[#666]">6 pages</span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {step === 2 && (
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#7c5cbf] text-[11px] font-semibold text-white">MR</span>
            <span className="flex gap-1 rounded-full bg-[#f3f2ef] px-3 py-2.5" aria-label="Maria is typing">
              {[0, 1, 2].map((d) => (
                <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#666]" style={{ animationDelay: `${d * 120}ms` }} />
              ))}
            </span>
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="border-t border-[#e8e8e8] px-4 py-3">
        <div className="rounded-lg bg-[#f4f2ee] px-3 py-2.5 text-[13px] text-[#666]">Write a message...</div>
        <div className="mt-2 flex items-center justify-between text-[#666]">
          <span className="flex gap-3" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 15l5-5 4 4 3-3 6 6" />
            </svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path d="M21.4 11l-9 9a5.5 5.5 0 01-7.8-7.8l9-9a3.7 3.7 0 015.2 5.2l-9 9a1.8 1.8 0 01-2.6-2.6l8.3-8.3" />
            </svg>
          </span>
          <span className="rounded-full bg-[#e8e8e8] px-3.5 py-1 text-[12.5px] font-semibold text-[#999]">Send</span>
        </div>
      </div>
    </div>
  );
}

export default function LinkedInShowcase() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-10">
      <div className="flex min-w-0 flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[13px] font-semibold text-white">1. The post, in your voice</span>
          <ExampleTag>Example post</ExampleTag>
        </div>
        <LinkedInFeedPost
          name="Dana Okafor"
          headline="Founder at Ledgerly | Faster month-end close for growing teams"
          initials="DO"
          avatarColor="#0f6b5c"
          lines={LINES}
          visibleLines={5}
          media={<DocCarousel title="3 things slowing your close" slides={SLIDES} accent="#0f6b5c" accent2="#0a3d35" />}
          reactions={148}
          reactLead="Maria Ruiz and"
          comments={37}
          reposts={6}
        />
        <div className="flex flex-wrap items-center gap-2 text-[12.5px] text-white/55">
          <SlotChip id="linkedin-posts" size="sm" />
          <span>8 a month, each with an image, carousel or GIF. Click through the carousel.</span>
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-3 lg:sticky lg:top-24">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[13px] font-semibold text-white">2. A buyer comments, we follow up</span>
          <ExampleTag>Example thread</ExampleTag>
        </div>
        <MessagingWindow />
        <div className="flex flex-wrap items-center gap-2 text-[12.5px] text-white/55">
          <SlotChip id="post-engagers" size="sm" />
          <span>Everyone who engages and fits your buyer gets a note like this, then you take the call.</span>
        </div>
      </div>
    </div>
  );
}
