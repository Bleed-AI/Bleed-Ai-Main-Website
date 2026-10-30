"use client";

import { useEffect, useState } from "react";
import StartFlow from "./StartFlow";
import { modeForPath, readStartSelection, type StartMode, type StartSelection } from "./startQuery";

/**
 * Site-wide start popup (Taha 2026-10-30). Any link to /book-call/ or /trial/ opens this instead of
 * leaving the page, carrying the plan or services from the link. Links stay real links, so a
 * visitor without JavaScript (or a cold email link) still lands on the page itself.
 */
export default function StartModal() {
  const [open, setOpen] = useState<{ mode: StartMode; selection: StartSelection; key: number } | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank") return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      const mode = modeForPath(url.pathname);
      if (!mode) return;
      e.preventDefault();
      setOpen({ mode, selection: readStartSelection(url.search), key: Date.now() });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[10000] flex items-end justify-center bg-black/80 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={open.mode === "trial" ? "Start a free trial" : "Book a call"}
      onClick={() => setOpen(null)}
    >
      <div
        className="relative max-h-[94vh] w-full max-w-[640px] overflow-y-auto rounded-t-2xl border border-[#1f1f30] bg-[linear-gradient(165deg,#141420,#0b0b14)] p-5 shadow-[0_40px_120px_-30px_rgba(177,19,15,0.5)] sm:rounded-2xl sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setOpen(null)}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/80 hover:bg-white/10"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <StartFlow key={open.key} initialMode={open.mode} selection={open.selection} page={window.location.pathname} />
      </div>
    </div>
  );
}
