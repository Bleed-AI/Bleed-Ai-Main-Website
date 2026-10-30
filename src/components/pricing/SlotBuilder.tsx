"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  FREE_EVERY,
  freeSlots,
  HYBRID_PACKAGE,
  MIN_SLOTS,
  money,
  packageById,
  paidSlots,
  PRICE_LINE,
  priceFor,
  SLOT_PRICE,
  slotById,
  slotHref,
  SLOTS,
  slotsToNextFree,
  THEMES,
  TRIAL,
  type PackageItem,
  type Slot,
  type ThemeId,
} from "@/lib/slots";
import BoardBoxes from "./BoardBoxes";
import { useCountUp } from "./useCountUp";

/** Most units of a volume slot one board can hold. */
const MAX_VOLUME = 4;

type Pick = { qty: number; pro: boolean };
type Board = Record<string, Pick>;
type Flash = { key: number; kind: "free" | "up" | "same" | "down"; text: string } | null;

const ORDINAL = ["", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th"];

function slotCost(s: Slot, p: Pick): number {
  return s.weight * p.qty + (p.pro ? 1 : 0);
}

function boardCount(b: Board): number {
  return Object.entries(b).reduce((sum, [id, p]) => sum + slotCost(slotById(id), p), 0);
}

function fromItems(items: PackageItem[]): Board {
  const b: Board = {};
  for (const it of items) {
    if (!SLOTS.some((s) => s.id === it.slot)) continue;
    b[it.slot] = { qty: it.qty ?? 1, pro: false };
  }
  return b;
}

/** Parse "id:qty[:pro],..." (the format the builder writes to the trial link). */
function parseSlotsParam(v: string): Board {
  const b: Board = {};
  for (const part of v.split(",")) {
    const [id, q, pro] = part.split(":");
    const s = SLOTS.find((x) => x.id === id);
    if (!s) continue;
    const qty = Math.max(1, Math.min(s.volume ? MAX_VOLUME : 1, parseInt(q || "1", 10) || 1));
    b[id] = { qty, pro: !!s.pro && pro === "pro" };
  }
  for (const id of Object.keys(b)) {
    const p = slotById(id).parent;
    if (p && !b[p]) delete b[id];
  }
  return b;
}

function encodeBoard(b: Board): string {
  return Object.entries(b)
    .map(([id, p]) => `${id}:${p.qty}${p.pro ? ":pro" : ""}`)
    .join(",");
}

function loadPackage(id: string): PackageItem[] | null {
  if (id === HYBRID_PACKAGE.id) return HYBRID_PACKAGE.items;
  return packageById(id)?.items ?? null;
}

function nudge(n: number): { text: string; tone: "warn" | "green" | "plain" } {
  if (n === 0) return { text: `Pick at least ${MIN_SLOTS} slots to start.`, tone: "plain" };
  if (n < MIN_SLOTS) return { text: `Minimum is ${MIN_SLOTS} slots. Add ${MIN_SLOTS - n} more.`, tone: "warn" };
  const r = n % FREE_EVERY;
  if (r === 0) return { text: `Your ${ORDINAL[n] ?? `${n}th`} slot is free.`, tone: "green" };
  const left = slotsToNextFree(n);
  if (left === 1) return { text: "Add 1 more slot and it's free.", tone: "green" };
  return { text: `${left} more slots until your next free one.`, tone: "plain" };
}

/* ---------------- slot row ---------------- */

function SlotRow({
  s,
  pick,
  child = false,
  infoOpen,
  onInfo,
  onAdd,
  onDec,
  onPro,
}: {
  s: Slot;
  pick?: Pick;
  child?: boolean;
  infoOpen: boolean;
  onInfo: () => void;
  onAdd: () => void;
  onDec: () => void;
  onPro: () => void;
}) {
  const on = !!pick;
  const qty = pick?.qty ?? 0;
  const max = s.volume ? MAX_VOLUME : 1;
  const cost = pick ? slotCost(s, pick) : s.weight;
  return (
    <div
      className={`relative rounded-xl border transition-all duration-300 ${child ? "pr-child-in" : ""} ${
        on
          ? "border-[#B1130F]/55 bg-[linear-gradient(120deg,rgba(177,19,15,0.12),rgba(20,20,32,0.9)_55%)] shadow-[0_10px_30px_-18px_rgba(177,19,15,0.7)]"
          : "border-[#1f1f30] bg-[#141420]/70 hover:border-[#2a2a3e]"
      }`}
    >
      <div className="flex items-start gap-3 p-3.5 sm:gap-4 sm:p-4">
        <span
          className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full transition-all duration-300 ${
            on ? "bg-[#ff3d38] shadow-[0_0_10px_#ff3d38]" : "bg-[#2a2a3e]"
          }`}
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-display text-[15.5px] font-semibold text-white">{s.name}</span>
            {s.status === "soon" && (
              <span className="rounded-full bg-[#f59e0b]/15 px-1.5 py-[1px] text-[9.5px] font-bold uppercase tracking-wide text-[#f5b544]">Soon</span>
            )}
            <button
              type="button"
              onClick={onInfo}
              aria-expanded={infoOpen}
              aria-label={`More about ${s.name}`}
              className={`flex h-[18px] w-[18px] items-center justify-center rounded-full border text-[10px] font-bold transition-colors ${
                infoOpen ? "border-[#ff6b67] text-[#ff6b67]" : "border-[#2a2a3e] text-[#9099b8] hover:border-[#9099b8]"
              }`}
            >
              i
            </button>
          </div>
          <div className="mt-0.5 text-[12.5px] font-medium text-[#ff8a86]">{s.title}</div>
          <p className="mt-1 text-[12.5px] leading-snug text-[#9099b8]">{s.monthly}</p>
          {s.passThrough && (
            <p className="mt-1 text-[11.5px] text-[#505570]">
              + {s.passThrough.label}: {money(s.passThrough.amount)} {s.passThrough.unit === "month" ? "a month" : "per target"}
            </p>
          )}
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          {on ? (
            <div className="flex items-center rounded-full border border-[#2a2a3e] bg-[#0b0b14]">
              <button
                type="button"
                onClick={onDec}
                aria-label={`Remove one ${s.name}`}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[16px] text-white/80 hover:bg-white/5"
              >
                &minus;
              </button>
              <span key={qty} className="pr-bump w-5 text-center text-[13.5px] font-bold text-white">
                {qty}
              </span>
              <button
                type="button"
                onClick={onAdd}
                disabled={qty >= max}
                aria-label={`Add one more ${s.name}`}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[16px] text-white/80 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-25"
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onAdd}
              className="flex h-8 items-center gap-1 rounded-full bg-white/[0.06] px-3.5 text-[13px] font-semibold text-white ring-1 ring-[#2a2a3e] transition-all hover:bg-[#B1130F] hover:ring-[#B1130F] active:scale-95"
            >
              <span className="text-[15px] leading-none">+</span> Add
            </button>
          )}
          <span className={`text-[11px] ${on ? "font-semibold text-white/80" : "text-[#505570]"}`}>
            {cost} slot{cost > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {on && (s.pro || s.volume) && (
        <div className="pr-child-in flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/5 px-3.5 py-2.5 sm:px-4 sm:pl-[42px]">
          {s.pro && (
            <button type="button" onClick={onPro} role="switch" aria-checked={!!pick?.pro} className="flex items-center gap-2 text-left">
              <span className={`relative h-[18px] w-8 shrink-0 rounded-full transition-colors ${pick?.pro ? "bg-[#B1130F]" : "bg-[#2a2a3e]"}`}>
                <span
                  className={`absolute top-[2px] h-[14px] w-[14px] rounded-full bg-white transition-all duration-200 ${
                    pick?.pro ? "left-[16px]" : "left-[2px]"
                  }`}
                />
              </span>
              <span className="text-[12px] leading-snug text-[#c3c8dc]">
                {s.pro} <span className="text-[#505570]">(+1 slot)</span>
              </span>
            </button>
          )}
          {s.volume && <span className="text-[12px] text-[#9099b8]">{s.volume}. Use + for more.</span>}
        </div>
      )}

      {infoOpen && (
        <div className="pr-child-in border-t border-white/5 px-3.5 pb-3.5 pt-3 text-[12.5px] leading-relaxed text-[#c3c8dc] sm:px-4 sm:pl-[42px]">
          {s.tooltip}{" "}
          <a href={slotHref(s.id)} className="whitespace-nowrap font-semibold text-[#ff6b67] hover:text-white">
            See this slot &rarr;
          </a>
        </div>
      )}
    </div>
  );
}

/* ---------------- summary ---------------- */

function Summary({
  board,
  count,
  flash,
  onRemove,
  onClear,
  trialHref,
  callHref,
}: {
  board: Board;
  count: number;
  flash: Flash;
  onRemove: (id: string) => void;
  onClear: () => void;
  trialHref: string;
  callHref: string;
}) {
  const price = useCountUp(priceFor(count));
  const free = freeSlots(count);
  const ids = Object.keys(board);
  const passMonthly = ids.reduce((sum, id) => {
    const p = slotById(id).passThrough;
    return p && p.unit === "month" ? sum + p.amount : sum;
  }, 0);
  const perTarget = ids.map((id) => slotById(id).passThrough).filter((p) => p && p.unit === "target");
  const soon = ids.map(slotById).filter((s) => s.status === "soon");
  const n = nudge(count);
  const valid = count >= MIN_SLOTS;

  return (
    <div className="rounded-2xl border border-[#2a2a3e] bg-[linear-gradient(170deg,#161622,#0b0b14)] p-5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] sm:p-6">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#505570]">Your board</span>
        {ids.length > 0 && (
          <button type="button" onClick={onClear} className="text-[12px] text-[#9099b8] underline-offset-2 hover:text-white hover:underline">
            Start over
          </button>
        )}
      </div>

      <div className="mt-4 min-h-[36px]">
        <BoardBoxes count={count} />
      </div>

      <div className="relative mt-5">
        <div className="flex items-baseline gap-2">
          <span key={free} className={`font-display text-[44px] font-bold leading-none text-white ${free ? "pr-glow" : ""}`}>
            {money(price)}
          </span>
          <span className="text-[14px] text-[#9099b8]">a month</span>
        </div>
        <div className="mt-2 h-6">
        {flash && (
          <span
            key={flash.key}
            className={`pr-flash inline-block rounded-full px-2.5 py-1 text-[11.5px] font-bold ${
              flash.kind === "free" || flash.kind === "same"
                ? "bg-[#10b981]/15 text-[#34d399]"
                : flash.kind === "up"
                  ? "bg-white/10 text-white"
                  : "bg-white/5 text-[#9099b8]"
            }`}
          >
            {flash.text}
          </span>
        )}
        </div>
        <p className="mt-1 text-[12.5px] text-[#9099b8]">
          {count} slot{count === 1 ? "" : "s"} at {money(SLOT_PRICE)}
          {free > 0 ? `, ${free} free, you pay for ${paidSlots(count)}` : ""}
        </p>
        {passMonthly > 0 && (
          <p className="mt-1 text-[12.5px] text-[#c3c8dc]">
            + {money(passMonthly)} a month in software, at cost
          </p>
        )}
        {perTarget.length > 0 && (
          <p className="mt-1 text-[12.5px] text-[#c3c8dc]">+ printing and postage at cost, about {money(perTarget[0]!.amount)} a card</p>
        )}
        <p className="mt-1 text-[11.5px] text-[#505570]">{PRICE_LINE}. Month to month.</p>
      </div>

      <div
        className={`mt-4 rounded-lg px-3 py-2 text-[13px] font-medium ${
          n.tone === "green"
            ? "bg-[#10b981]/10 text-[#34d399]"
            : n.tone === "warn"
              ? "bg-[#f59e0b]/10 text-[#f5b544]"
              : "bg-white/[0.04] text-[#9099b8]"
        }`}
      >
        {n.text}
      </div>

      {ids.length > 0 && (
        <ul className="mt-4 max-h-[240px] space-y-1.5 overflow-y-auto pr-1">
          {ids.map((id) => {
            const s = slotById(id);
            const p = board[id];
            const c = slotCost(s, p);
            return (
              <li key={id} className="pr-child-in flex items-center gap-2 text-[13px]">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff3d38]" />
                <span className="min-w-0 flex-1 truncate text-white/90">
                  {p.qty > 1 ? `${p.qty} x ` : ""}
                  {s.name}
                  {p.pro ? " Pro" : ""}
                </span>
                <span className="text-[11.5px] text-[#505570]">
                  {c} slot{c > 1 ? "s" : ""}
                </span>
                <button
                  type="button"
                  onClick={() => onRemove(id)}
                  aria-label={`Remove ${s.name}`}
                  className="flex h-6 w-6 items-center justify-center rounded-full text-[#505570] hover:bg-white/5 hover:text-white"
                >
                  &times;
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {soon.length > 0 && (
        <p className="mt-3 text-[11.5px] leading-snug text-[#f5b544]/90">
          Soon: {soon.map((s) => s.name).join(", ")}. These start when they launch; we agree the start date with you.
        </p>
      )}

      <div className="mt-5 flex flex-col gap-2">
        <a
          href={trialHref}
          aria-disabled={!valid}
          className={`rounded-full px-5 py-3.5 text-center text-[14.5px] font-semibold text-white transition-all ${
            valid ? "btn-glow bg-[#B1130F]" : "bg-[#B1130F]/40 text-white/70"
          }`}
        >
          {TRIAL.label}
        </a>
        <a
          href={callHref}
          className="rounded-full border border-[#2a2a3e] px-5 py-3 text-center text-[14px] font-semibold text-white/90 transition-colors hover:border-white/30"
        >
          Book a call about this board
        </a>
        <p className="mt-1 text-center text-[11.5px] text-[#505570]">
          Trial: {TRIAL.length} on {TRIAL.slots}, for qualified companies.
        </p>
      </div>
    </div>
  );
}

/* ---------------- builder ---------------- */

export default function SlotBuilder() {
  const [board, setBoard] = useState<Board>({});
  const [tab, setTab] = useState<ThemeId>(THEMES[0].id);
  const [info, setInfo] = useState<string | null>(null);
  const [flash, setFlash] = useState<Flash>(null);
  const [loadedName, setLoadedName] = useState<string | null>(null);
  const [barOn, setBarOn] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const summaryRef = useRef<HTMLDivElement | null>(null);
  const prevCount = useRef(0);
  const flashKey = useRef(0);
  const silent = useRef(true);

  const count = useMemo(() => boardCount(board), [board]);

  // Price feedback on every change: the free slot moment, and "same price" when a free slot goes.
  useEffect(() => {
    const prev = prevCount.current;
    prevCount.current = count;
    if (silent.current) {
      silent.current = false;
      return;
    }
    if (prev === count) return;
    const diff = priceFor(count) - priceFor(prev);
    flashKey.current += 1;
    const key = flashKey.current;
    if (count > prev) {
      setFlash(diff === 0 ? { key, kind: "free", text: `Slot ${count} is free` } : { key, kind: "up", text: `+${money(diff)}` });
    } else {
      setFlash(diff === 0 ? { key, kind: "same", text: "Same price, that was your free slot" } : { key, kind: "down", text: `-${money(-diff)}` });
    }
  }, [count]);

  const applyItems = useCallback((items: PackageItem[], name: string | null) => {
    const b = fromItems(items);
    if (boardCount(b) !== prevCount.current) silent.current = true;
    setBoard(b);
    setLoadedName(name);
    const first = items[0] && SLOTS.find((s) => s.id === items[0].slot);
    if (first) setTab(first.theme);
  }, []);

  // Deep links: ?package=<id> or ?slots=id:qty,... preload the board.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const pkg = q.get("package");
    const slots = q.get("slots");
    let loaded = false;
    if (pkg) {
      const items = loadPackage(pkg);
      if (items) {
        const name = pkg === HYBRID_PACKAGE.id ? HYBRID_PACKAGE.name : packageById(pkg)?.name ?? null;
        applyItems(items, name);
        loaded = true;
      }
    } else if (slots) {
      const b = parseSlotsParam(slots);
      if (boardCount(b) !== prevCount.current) silent.current = true;
      setBoard(b);
      const first = Object.keys(b)[0];
      if (first) setTab(slotById(first).theme);
      loaded = Object.keys(b).length > 0;
    }
    if (loaded && window.location.hash === "#builder") {
      window.setTimeout(() => sectionRef.current?.scrollIntoView({ block: "start" }), 150);
    }
  }, [applyItems]);

  // "Customise" links on this page load the board in place instead of reloading the page.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("/pricing/?package=")) return;
      const url = new URL(href, window.location.origin);
      const id = url.searchParams.get("package");
      const items = id ? loadPackage(id) : null;
      if (!id || !items) return;
      e.preventDefault();
      const name = id === HYBRID_PACKAGE.id ? HYBRID_PACKAGE.name : packageById(id)?.name ?? null;
      applyItems(items, name);
      const cur = new URL(window.location.href);
      cur.searchParams.set("package", id);
      window.history.replaceState(null, "", cur.pathname + cur.search + "#builder");
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [applyItems]);

  // Mobile sticky bar: on while the slot list is on screen and the full summary is not.
  useEffect(() => {
    const sec = sectionRef.current;
    const sum = summaryRef.current;
    if (!sec || !sum) return;
    let secIn = false;
    let sumIn = false;
    const update = () => setBarOn(secIn && !sumIn);
    const o1 = new IntersectionObserver(([e]) => {
      secIn = e.isIntersecting;
      update();
    });
    const o2 = new IntersectionObserver(
      ([e]) => {
        sumIn = e.isIntersecting;
        update();
      },
      { rootMargin: "0px 0px -80px 0px" }
    );
    o1.observe(sec);
    o2.observe(sum);
    return () => {
      o1.disconnect();
      o2.disconnect();
    };
  }, []);

  const touch = () => setLoadedName(null);

  const add = (id: string) => {
    const s = slotById(id);
    setBoard((b) => {
      if (s.parent && !b[s.parent]) return b;
      const cur = b[id];
      const max = s.volume ? MAX_VOLUME : 1;
      if (cur && cur.qty >= max) return b;
      return { ...b, [id]: { qty: (cur?.qty ?? 0) + 1, pro: cur?.pro ?? false } };
    });
    touch();
  };

  const remove = (id: string) => {
    setBoard((b) => {
      const next = { ...b };
      delete next[id];
      for (const s of SLOTS) if (s.parent === id) delete next[s.id];
      return next;
    });
    touch();
  };

  const dec = (id: string) => {
    const cur = board[id];
    if (!cur) return;
    if (cur.qty <= 1) return remove(id);
    setBoard((b) => ({ ...b, [id]: { ...b[id], qty: b[id].qty - 1 } }));
    touch();
  };

  const togglePro = (id: string) => {
    setBoard((b) => (b[id] ? { ...b, [id]: { ...b[id], pro: !b[id].pro } } : b));
    touch();
  };

  const clear = () => {
    setBoard({});
    setLoadedName(null);
  };

  const enc = encodeBoard(board);
  const trialHref = enc ? `${TRIAL.href}?slots=${enc}` : TRIAL.href;
  const callHref = enc ? `/book-call/?slots=${enc}` : "/book-call/";

  const theme = THEMES.find((t) => t.id === tab)!;
  const tops = SLOTS.filter((s) => s.theme === tab && !s.parent);
  const themeCount = (t: ThemeId) =>
    Object.entries(board).reduce((sum, [id, p]) => (slotById(id).theme === t ? sum + slotCost(slotById(id), p) : sum), 0);

  const price = useCountUp(priceFor(count));
  const n = nudge(count);

  const rowProps = (s: Slot) => ({
    s,
    pick: board[s.id],
    infoOpen: info === s.id,
    onInfo: () => setInfo((v) => (v === s.id ? null : s.id)),
    onAdd: () => add(s.id),
    onDec: () => dec(s.id),
    onPro: () => togglePro(s.id),
  });

  return (
    <section id="builder" ref={sectionRef} className="sec scroll-mt-20 !overflow-visible !pb-28 lg:!pb-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(177,19,15,0.6),transparent)]" />
      <div className="sec-inner">
        <div className="sec-label">Build your own</div>
        <h2 className="sec-h2">
          Pick your slots. <em>Watch the 4th go free.</em>
        </h2>
        <p className="sec-sub !mb-8">
          Every slot is {money(SLOT_PRICE)} a month. Some slots open more options once you pick them. You can swap any slot next month.
        </p>

        {loadedName && (
          <div className="pr-rise mb-5 inline-flex items-center gap-2 rounded-full border border-[#10b981]/40 bg-[#10b981]/10 px-3.5 py-1.5 text-[12.5px] text-[#34d399]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#34d399]" />
            Loaded the {loadedName} board. Change anything you like.
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          <div className="min-w-0">
            <div role="tablist" aria-label="Slot themes" className="grid grid-cols-3 gap-1.5 rounded-2xl border border-[#1f1f30] bg-[#0b0b14] p-1.5">
              {THEMES.map((t) => {
                const on = t.id === tab;
                const c = themeCount(t.id);
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => {
                      setTab(t.id);
                      setInfo(null);
                    }}
                    className={`relative flex min-h-[48px] items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-center text-[12.5px] font-semibold leading-tight transition-all sm:text-[14px] ${
                      on ? "bg-[#1a1a28] text-white shadow-[inset_0_0_0_1px_#2a2a3e]" : "text-[#9099b8] hover:text-white"
                    }`}
                  >
                    <span>{t.name}</span>
                    {c > 0 && (
                      <span key={c} className="pr-pop flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#B1130F] px-1 text-[10px] font-bold text-white">
                        {c}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-[13.5px] text-[#9099b8]">{theme.blurb}</p>

            <div key={tab} className="pr-rise mt-4 space-y-2.5">
              {tops.map((s) => {
                const kids = SLOTS.filter((k) => k.parent === s.id);
                const open = !!board[s.id];
                return (
                  <div key={s.id}>
                    <SlotRow {...rowProps(s)} />
                    {kids.length > 0 && !open && (
                      <p className="ml-9 mt-1.5 text-[11.5px] text-[#505570]">
                        Add {s.name} to open {kids.length === 1 ? "1 more option" : `${kids.length} more options`}.
                      </p>
                    )}
                    {kids.length > 0 && open && (
                      <div className="relative ml-4 mt-2.5 space-y-2.5 border-l border-dashed border-[#B1130F]/40 pl-3 sm:ml-6 sm:pl-4">
                        {kids.map((k, i) => (
                          <div key={k.id} className="relative" style={{ animationDelay: `${i * 70}ms` }}>
                            <span className="absolute -left-3 top-6 h-px w-3 bg-[#B1130F]/40 sm:-left-4 sm:w-4" />
                            <SlotRow {...rowProps(k)} child />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div ref={summaryRef} className="lg:sticky lg:top-24">
            <Summary board={board} count={count} flash={flash} onRemove={remove} onClear={clear} trialHref={trialHref} callHref={callHref} />
          </div>
        </div>
      </div>

      {/* Mobile sticky bar */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-[#2a2a3e] bg-[#0b0b14]/95 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-transform duration-300 lg:hidden ${
          barOn ? "translate-y-0" : "translate-y-full"
        }`}
        aria-hidden={!barOn}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => summaryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="min-w-0 flex-1 text-left"
          >
            <div className="mb-1">
              <BoardBoxes count={count} size="xs" maxCells={16} />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span key={freeSlots(count)} className={`font-display text-[22px] font-bold text-white ${freeSlots(count) ? "pr-glow" : ""}`}>
                {money(price)}
              </span>
              <span className="text-[12px] text-[#9099b8]">/mo</span>
              <span className="ml-1 text-[12px] text-[#505570]">
                {count} slot{count === 1 ? "" : "s"}
                {freeSlots(count) ? `, ${freeSlots(count)} free` : ""}
              </span>
            </div>
            <div
              className={`truncate text-[11.5px] font-medium ${
                n.tone === "green" ? "text-[#34d399]" : n.tone === "warn" ? "text-[#f5b544]" : "text-[#9099b8]"
              }`}
            >
              {n.text}
            </div>
          </button>
          <a href={trialHref} tabIndex={barOn ? 0 : -1} className="shrink-0 rounded-full bg-[#B1130F] px-4 py-2.5 text-[13px] font-semibold text-white">
            Free trial
          </a>
        </div>
      </div>
    </section>
  );
}
