"use client";

import { useEffect, useState } from "react";
import StartFlow from "./StartFlow";
import { readStartSelection, type StartSelection } from "./startQuery";

/** The start flow inline on /trial, for visitors who land there from a cold email link (2026-10-30). */
export default function TrialInline() {
  const [sel, setSel] = useState<StartSelection | null>(null);
  useEffect(() => setSel(readStartSelection(window.location.search)), []);
  return (
    <section className="px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[680px] rounded-2xl border border-[#1f1f30] bg-[linear-gradient(165deg,#141420,#0b0b14)] p-5 sm:p-8">
        {sel ? <StartFlow initialMode="trial" selection={sel} page="/trial/" /> : <div className="h-[420px]" />}
      </div>
    </section>
  );
}
