import type { ReactNode } from "react";
import { BOOK, money, MIN_SLOTS, priceFor, SLOT_PRICE, TRIAL } from "@/lib/slots";

/**
 * "Print proof" building blocks (2026-11-12). In print, bleed is the ink past the trim and crop marks show where the
 * sheet is cut, so the site borrows both: a mono slug line above each hero H1 (with a red rule that bleeds off the
 * left edge of the page), and crop marks around the ONE sheet that matters on a screen. Same system as
 * app.bleedai.com. Styles live in globals.css under "Print proof".
 */

export function SlugLine({ parts, bleed = true, center = false, className = "" }: { parts: string[]; bleed?: boolean; center?: boolean; className?: string }) {
  return (
    <div className={`slug ${bleed ? "slug-bleed" : ""} ${center ? "justify-center" : ""} ${className}`}>
      {parts.map((p, i) => (
        <span key={p} className={i === 0 ? "slug-n" : ""}>
          {p}
        </span>
      ))}
    </div>
  );
}

/** Wraps the one primary sheet on a screen with four crop marks. */
export function CropMarks({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`crop ${className}`}>
      <span aria-hidden="true" className="cm cm-tl" />
      <span aria-hidden="true" className="cm cm-tr" />
      <span aria-hidden="true" className="cm cm-bl" />
      <span aria-hidden="true" className="cm cm-br" />
      {children}
    </div>
  );
}

/** The one primary door on a hero: book a call (opens the start popup). */
export function BookButton({ outcome, label = BOOK.label, className = "" }: { outcome?: string; label?: string; className?: string }) {
  return (
    <a
      href={outcome ? `${BOOK.href}?outcome=${outcome}` : BOOK.href}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-[#B1130F] px-7 py-3.5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#c8170f] ${className}`}
    >
      {label}
      <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>
  );
}

/** The quiet second door under a hero button: 2 free weeks, as a text link, never a button. */
export function FreeWeeksLink({ outcome, lead = "Not ready to commit?", className = "" }: { outcome?: string; lead?: string; className?: string }) {
  return (
    <p className={`text-[13.5px] leading-relaxed text-[#9a9fb8] ${className}`}>
      {lead}{" "}
      <a
        href={outcome ? `${TRIAL.href}?outcome=${outcome}` : TRIAL.href}
        className="font-semibold text-white underline decoration-[#ff5a52]/60 underline-offset-4 hover:decoration-[#ff5a52]"
      >
        {TRIAL.label}
      </a>
      . {TRIAL.sub}
    </p>
  );
}

/** One plain price sentence, built from the config so it never drifts from the pricing page. */
export function priceSentence(): string {
  return `${money(SLOT_PRICE)} a month per service. Every 4th service free. From ${MIN_SLOTS} services (${money(priceFor(MIN_SLOTS))} a month), month to month.`;
}
