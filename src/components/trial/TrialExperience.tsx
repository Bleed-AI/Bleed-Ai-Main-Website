"use client";

import { useEffect, useState } from "react";
import TrialApply from "@/components/TrialApply";
import { TRIAL } from "@/lib/slots";
import SlotPicker from "./SlotPicker";
import TrialTimeline from "./TrialTimeline";
import { cleanPicks, readTrialQuery, TRIAL_MAX, TRIAL_SLOTS } from "./trialData";

const DEFAULT_PICKS = ["linkedin-posts", "ai-search"];

/**
 * The interactive half of /trial (2026-10-30): pick 1 to 2 slots (preselected
 * from ?slots=, ?package= or ?outcome=), watch the 14 days play out with those
 * slots, then apply. The picks travel into the application payload.
 */
export default function TrialExperience() {
  const [picked, setPicked] = useState<string[]>(DEFAULT_PICKS);
  const [outcome, setOutcome] = useState("");
  const [pkg, setPkg] = useState("");
  const [source, setSource] = useState("");

  useEffect(() => {
    const q = readTrialQuery(window.location.search);
    setOutcome(q.outcome);
    setPkg(q.pkg);
    setSource(q.sourceName);
    if (q.picks.length) setPicked(q.picks);
  }, []);

  const toggle = (id: string) => {
    setPicked((prev) => {
      if (prev.includes(id)) {
        // removing a parent removes the add ons that need it
        return prev.filter((x) => x !== id && TRIAL_SLOTS.find((s) => s.id === x)?.parent !== id);
      }
      let next = [...prev, id];
      // full: the new pick swaps out the oldest one
      while (next.length > TRIAL_MAX) next = next.slice(1);
      return cleanPicks(next);
    });
  };

  return (
    <section id="pick" className="scroll-mt-24 px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div className="min-w-0">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#B1130F] text-[13px] font-bold text-white">1</span>
            <h2 className="font-display text-2xl font-bold text-white">Pick {TRIAL.slots} to try</h2>
          </div>
          <p className="mb-5 text-[14px] leading-relaxed text-[#9099b8]">
            {source ? (
              <>
                You came from <span className="font-semibold text-white">{source}</span>, so we picked {picked.length === 1 ? "its first slot" : `${picked.length} of its slots`}. Change them if you like.
              </>
            ) : (
              <>Tap to pick. Picking a third swaps out your first pick. Not sure? Leave our suggestion, we will check it with you on the call.</>
            )}
          </p>
          <SlotPicker picked={picked} onToggle={toggle} />
        </div>
        <div className="min-w-0 lg:sticky lg:top-24">
          <TrialTimeline picked={picked} />
        </div>
      </div>

      <div id="apply" className="mx-auto mt-16 max-w-[640px] scroll-mt-24">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#B1130F] text-[13px] font-bold text-white">2</span>
          <h2 className="font-display text-2xl font-bold text-white">Check you qualify</h2>
        </div>
        <TrialApply picked={picked} outcome={outcome} pkg={pkg} />
      </div>
    </section>
  );
}
