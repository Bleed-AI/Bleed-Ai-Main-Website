"use client";

import { useState } from "react";
import SlotPicker from "@/components/trial/SlotPicker";
import { TRIAL_MAX } from "@/components/trial/trialData";
import { slotById, TRIAL } from "@/lib/slots";
import { START_API, START_CALENDLY, START_WEBHOOK, type StartMode, type StartSelection } from "./startQuery";

/**
 * The start flow (Taha 2026-10-30). Two doors, both end in a call and both send an email to the
 * visitor and to us:
 *  - "book": the main door. Send us your plan, we review it, short call, launch within 48 hours.
 *  - "trial": for the hesitant. 2 weeks free on 1 or 2 services only, for B2B companies that already sell.
 * Slide 1 collects details, slide 2 is the calendar. Used inside the popup and inline on /trial.
 */

const SELLS_TO = [
  { v: "b2b", l: "Other businesses" },
  { v: "both", l: "Businesses and consumers" },
  { v: "b2c", l: "Consumers only" },
];

type Fields = { name: string; email: string; website: string; note: string; sellsTo: string; hp: string };

export default function StartFlow({
  initialMode,
  selection,
  page = "",
}: {
  initialMode: StartMode;
  selection: StartSelection;
  page?: string;
}) {
  const [mode, setMode] = useState<StartMode>(initialMode);
  const [f, setF] = useState<Fields>({ name: "", email: "", website: "", note: "", sellsTo: "", hp: "" });
  const [picks, setPicks] = useState<string[]>(selection.trialPicks);
  const [step, setStep] = useState<"form" | "calendar">("form");
  const [sending, setSending] = useState(false);
  const [emailFailed, setEmailFailed] = useState(false);

  const trial = mode === "trial";
  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF((p) => ({ ...p, [k]: e.target.value }));
  const ready = f.name.trim() && /\S+@\S+\.\S+/.test(f.email) && f.website.trim() && (!trial || (picks.length > 0 && f.sellsTo));

  const toggle = (id: string) =>
    setPicks((cur) => {
      if (cur.includes(id)) return cur.filter((x) => x !== id && slotById(x).parent !== id);
      const next = [...cur, id];
      return next.length > TRIAL_MAX ? next.slice(next.length - TRIAL_MAX) : next;
    });

  const trialLines = picks.map((id) => ({ name: slotById(id).name, detail: "2 weeks, free" }));
  const lines = trial ? trialLines : selection.lines;
  const label = trial ? `Free trial: ${picks.map((id) => slotById(id).name).join(" and ")}` : selection.label;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready || sending) return;
    setSending(true);
    const sellsTo = SELLS_TO.find((x) => x.v === f.sellsTo)?.l ?? "";
    const body = {
      mode,
      name: f.name.trim(),
      email: f.email.trim(),
      website: f.website.trim(),
      note: f.note.trim(),
      sellsTo,
      selectionLabel: label,
      lines,
      priceLabel: trial ? "" : selection.priceLabel,
      page,
      hp: f.hp,
    };
    // Our CRM + Slack record (existing trial webhook; fields kept, new ones added alongside).
    fetch(START_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...body,
        sells_to: f.sellsTo,
        route: trial ? "trial" : "book",
        source: `bleedai.com${page}`,
        outcome: selection.outcome,
        package: selection.pkg,
        trial_slots: trial ? picks : [],
        slots: trial ? picks.map((id) => `${id}:1`).join(",") : "",
      }),
    }).catch(() => {});
    try {
      const r = await fetch(START_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (!r.ok) setEmailFailed(true);
    } catch {
      setEmailFailed(true);
    }
    setSending(false);
    setStep("calendar");
  };

  if (step === "calendar") {
    const a1 = [label, trial ? "" : selection.priceLabel, f.note.trim()].filter(Boolean).join(". ");
    const src =
      `${START_CALENDLY}?embed_domain=bleedai.com&embed_type=Inline&hide_gdpr_banner=1&primary_color=b1130f` +
      `&name=${encodeURIComponent(f.name.trim())}&email=${encodeURIComponent(f.email.trim())}&a1=${encodeURIComponent(a1)}`;
    return (
      <div>
        <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#34d399]">
          <span className="h-2 w-2 rounded-full bg-[#34d399]" /> Step 2 of 2
        </div>
        <h3 className="mt-2 font-display text-[22px] font-bold leading-tight text-white sm:text-[26px]">
          {trial ? "Now pick a time to start your trial." : "Now pick a time to get started."}
        </h3>
        <p className="mt-2 text-[14px] leading-relaxed text-[#9099b8]">
          {trial
            ? "15 minutes. We check the fit, agree what your trial services should do, and start."
            : "15 minutes. We review your pick before the call, confirm the details with you, and launch within 48 hours."}
          {emailFailed ? "" : ` We sent a copy to ${f.email.trim()}.`}
        </p>
        <div className="mt-4 overflow-hidden rounded-xl bg-white">
          <iframe src={src} title="Pick a time" className="block h-[640px] w-full sm:h-[680px]" loading="lazy" />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#ff6b67]">Step 1 of 2</div>
      <h3 className="mt-2 font-display text-[22px] font-bold leading-tight text-white sm:text-[26px]">
        {trial ? "Start a 2 week free trial" : "Book a call and get started"}
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-[#9099b8]">
        {trial
          ? `The trial runs on 1 or 2 services, not a whole plan, for ${TRIAL.length}. It is for B2B companies that already sell. Pick the one or two you want to see first.`
          : "Send us your pick. We review it before the call, then a short call to confirm, and we launch within 48 hours."}
      </p>

      {!trial && lines.length > 0 && (
        <div className="mt-4 rounded-xl border border-[#1f1f30] bg-[#0d0d16] p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-[13.5px] font-semibold text-white">{selection.label}</span>
            {selection.priceLabel && <span className="text-[12.5px] text-[#9099b8]">{selection.priceLabel}</span>}
          </div>
          <ul className="mt-2.5 flex flex-col gap-1.5">
            {lines.map((l) => (
              <li key={l.name} className="flex gap-2 text-[12.5px] leading-snug text-[#c3c8dc]">
                <span className="text-[#ff3d38]">&#10003;</span>
                <span>
                  <span className="font-semibold text-white">{l.name}</span>
                  {l.detail ? <span className="text-[#9099b8]">: {l.detail}</span> : null}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {!trial && !lines.length && selection.label && (
        <p className="mt-3 text-[13px] text-[#c3c8dc]">
          About: <span className="font-semibold text-white">{selection.label}</span>
        </p>
      )}

      {trial && (
        <div className="mt-4 max-h-[260px] overflow-y-auto rounded-xl border border-[#1f1f30] bg-[#0d0d16] p-3 sm:p-4">
          <SlotPicker picked={picks} onToggle={toggle} />
        </div>
      )}

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Field label="Your name" value={f.name} onChange={set("name")} autoComplete="name" />
        <Field label="Work email" type="email" value={f.email} onChange={set("email")} autoComplete="email" />
        <Field label="Company website" value={f.website} onChange={set("website")} placeholder="yourcompany.com" autoComplete="url" />
        {!trial && <Field label="Anything we should know (optional)" value={f.note} onChange={set("note")} />}
      </div>
      {trial && (
        <div className="mt-4">
          <div className="text-[12.5px] font-semibold text-white/90">Who do you sell to?</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {SELLS_TO.map((o) => (
              <button
                key={o.v}
                type="button"
                onClick={() => setF((p) => ({ ...p, sellsTo: o.v }))}
                aria-pressed={f.sellsTo === o.v}
                className={`rounded-full border px-3.5 py-2 text-[13px] transition-colors ${
                  f.sellsTo === o.v ? "border-[#B1130F] bg-[#B1130F]/15 text-white" : "border-[#2a2a3e] text-[#c3c8dc] hover:border-white/30"
                }`}
              >
                {o.l}
              </button>
            ))}
          </div>
        </div>
      )}
      <input tabIndex={-1} autoComplete="off" value={f.hp} onChange={set("hp")} className="hidden" aria-hidden="true" />

      <button
        type="submit"
        disabled={!ready || sending}
        className={`mt-5 w-full rounded-full px-6 py-3.5 text-[15px] font-semibold text-white transition-all ${
          ready ? "btn-glow bg-[#B1130F]" : "cursor-not-allowed bg-[#B1130F]/40 text-white/70"
        }`}
      >
        {sending ? "Sending..." : trial ? "Start my trial, then pick a time" : "Send my plan, then pick a time"}
      </button>

      <p className="mt-4 text-center text-[13px] text-[#9099b8]">
        {trial ? (
          <>
            Rather skip the trial?{" "}
            <button type="button" onClick={() => setMode("book")} className="font-semibold text-[#ff6b67] underline decoration-[#ff6b67]/40 underline-offset-4">
              Book a call and launch your plan in 48 hours
            </button>
          </>
        ) : (
          <>
            Not ready to commit?{" "}
            <button type="button" onClick={() => setMode("trial")} className="font-semibold text-[#ff6b67] underline decoration-[#ff6b67]/40 underline-offset-4">
              Start a 2 week free trial first
            </button>
          </>
        )}
      </p>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-[12.5px] font-semibold text-white/90">{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="mt-1.5 w-full rounded-lg border border-[#2a2a3e] bg-[#141420] px-3.5 py-2.5 text-[14px] text-white outline-none placeholder:text-[#505570] focus:border-[#B1130F]"
      />
    </label>
  );
}
