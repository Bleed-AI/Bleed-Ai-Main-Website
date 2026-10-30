import type { ReactNode } from "react";

// A realistic desktop browser window (light chrome, tab, address bar with padlock) used to frame
// the example article and the example calculator app. Shared by /shortlisted and /inbound-engine (2026-10-30).

export const SYS_FONT =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

export default function BrowserFrame({
  url,
  tab,
  favicon = "N",
  faviconColor = "#0f4c81",
  children,
  className = "",
}: {
  url: string;
  tab: string;
  favicon?: string;
  faviconColor?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-black/20 bg-white shadow-[0_40px_90px_-30px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.06)] ${className}`}
      style={{ fontFamily: SYS_FONT }}
    >
      {/* Tab strip */}
      <div className="flex items-end gap-2 bg-[#dfe1e5] px-3 pt-2">
        <div className="flex items-center gap-1.5 pb-2.5 pr-1">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex min-w-0 max-w-[240px] flex-1 items-center gap-2 rounded-t-lg bg-white px-3 py-2">
          <span
            className="flex h-4 w-4 flex-none items-center justify-center rounded-[4px] text-[9px] font-bold text-white"
            style={{ background: faviconColor }}
          >
            {favicon}
          </span>
          <span className="truncate text-[11.5px] text-[#3c4043]">{tab}</span>
          <span className="ml-auto hidden text-[11px] text-[#5f6368] sm:inline">&#x2715;</span>
        </div>
      </div>
      {/* Address bar */}
      <div className="flex items-center gap-2.5 border-b border-[#e3e3e3] bg-white px-3 py-2">
        <span className="hidden gap-3 text-[#5f6368] sm:flex" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} opacity={0.4}>
            <path d="M9 18l6-6-6-6" />
          </svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
            <path d="M20 11a8 8 0 10-2.3 5.7M20 4v7h-7" />
          </svg>
        </span>
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-[#f1f3f4] px-3.5 py-1.5">
          <svg className="flex-none text-[#5f6368]" width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17 9V7a5 5 0 00-10 0v2H5v13h14V9h-2zm-8 0V7a3 3 0 016 0v2H9z" />
          </svg>
          <span className="truncate text-[12px] text-[#202124]">{url}</span>
        </div>
      </div>
      {children}
    </div>
  );
}
