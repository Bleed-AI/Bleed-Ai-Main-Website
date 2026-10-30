"use client";

import Reveal from "@/components/Reveal";
import { money, OUTBOUND_SPECIALIST, SLOT_PRICE, slotById } from "@/lib/slots";

/**
 * What email outbound actually delivers, line by line (Taha 2026-10-30, round 2).
 * Every number is read out of SLOTS / OUTBOUND_SPECIALIST in src/lib/slots.ts. Never type a number here.
 */

function grab(text: string, re: RegExp, fallback: string) {
  const m = text.match(re);
  return m ? m[1] : fallback;
}

export default function EmailLineItems() {
  const email = slotById("email-campaign");
  const list = slotById("buyer-list");
  const top = OUTBOUND_SPECIALIST.monthly[OUTBOUND_SPECIALIST.monthly.length - 1];

  const emails = grab(email.monthly, /([\d,]+) emails a month/, "");
  const buyers = grab(email.monthly, /about ([\d,]+) buyers/, "");
  const each = grab(email.monthly, /(\d+) emails each/, "");
  const contacts = grab(list.monthly, /Up to ([\d,]+) contacts/, "");
  const topEmails = grab(top.items[0] ?? "", /([\d,]+) emails/, "");

  const items = [
    { big: emails, unit: "emails a month", body: "One targeted campaign, written with you and sent for you." },
    { big: buyers ? `~${buyers}` : "", unit: "buyers you pick", body: "The decision makers at companies that fit, not a bought list." },
    { big: each, unit: "emails each", body: "A short first note and one follow-up. Nobody gets chased." },
    { big: contacts, unit: "contacts on signals", body: `${list.name}: companies showing the signals your best customers showed, and the right people inside them.` },
    { big: "Every", unit: "reply handled", body: "Answered in minutes, in your voice, checked by a person. Interested buyers are booked and handed to you." },
    { big: "Weekly", unit: "report", body: "What went out, who replied, who is interested, and what we test next." },
  ].filter((x) => x.big);

  return (
    <div className="flex h-full flex-col">
      <Reveal className="rounded-2xl border border-[#1f1f30] bg-[linear-gradient(165deg,#141420,#0b0b14)] p-5 sm:p-6">
        <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#ff5a52]">What you get every month</div>
        <p className="mt-1.5 text-[14px] leading-snug text-[#9099b8]">
          One {email.name.toLowerCase()} service and one {list.name.toLowerCase()} service, {money(SLOT_PRICE)} each.
        </p>
        <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-5">
          {items.map((it) => (
            <li key={it.unit} className="min-w-0">
              <div className="font-display text-[26px] font-bold leading-none text-white tabular-nums sm:text-[30px]">{it.big}</div>
              <div className="mt-1 text-[13px] font-semibold text-[#eaeef8]">{it.unit}</div>
              <div className="mt-1 text-[12.5px] leading-snug text-[#9099b8]">{it.body}</div>
            </li>
          ))}
        </ul>
        <div className="mt-5 border-t border-white/5 pt-4 text-[12.5px] leading-relaxed text-[#9099b8]">
          {email.volume}.{topEmails && <> Running outbound at scale? The Outbound Specialist plan goes up to {topEmails} emails a month.</>}
        </div>
      </Reveal>

    </div>
  );
}
