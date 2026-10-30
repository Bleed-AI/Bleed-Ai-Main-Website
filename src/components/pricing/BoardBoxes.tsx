"use client";

import { FREE_EVERY, unitLabel } from "@/lib/slots";

const SPARKS = [
  [-22, -18],
  [22, -20],
  [-26, 8],
  [26, 6],
  [-8, 24],
  [10, -28],
];

/**
 * A plan's services as boxes, in groups of 4. Every 4th box is FREE.
 * Filled boxes pop in; a free box flips from red to green with a ring and sparks.
 * Empty boxes up to the next group of 4 show as ghosts, so the free one to aim for is always visible.
 */
export default function BoardBoxes({
  count,
  size = "md",
  minCells = FREE_EVERY,
  maxCells,
}: {
  count: number;
  size?: "xs" | "sm" | "md" | "lg";
  minCells?: number;
  maxCells?: number;
}) {
  let cells = Math.max(minCells, Math.ceil(count / FREE_EVERY) * FREE_EVERY);
  if (maxCells) cells = Math.min(cells, Math.max(maxCells, 0));
  const overflow = maxCells && count > cells ? count - cells : 0;
  const dims =
    size === "xs" ? "h-2.5 w-4 text-[0px] !rounded-[3px]" : size === "sm" ? "h-6 w-7 text-[7.5px]" : size === "lg" ? "h-11 w-[52px] text-[10px]" : "h-8 w-[34px] text-[8px]";

  const groups: number[][] = [];
  for (let i = 0; i < cells; i++) {
    const g = Math.floor(i / FREE_EVERY);
    (groups[g] ||= []).push(i);
  }

  return (
    <div className={`flex flex-wrap items-center ${size === "xs" ? "gap-x-1.5 gap-y-1" : "gap-x-2.5 gap-y-1.5"}`} aria-label={unitLabel(count)}>
      {groups.map((g, gi) => (
        <div key={gi} className={`flex ${size === "xs" ? "gap-0.5" : "gap-1"}`}>
          {g.map((i) => {
            const filled = i < count;
            const isFree = (i + 1) % FREE_EVERY === 0;
            if (!filled) {
              return (
                <span
                  key={`${i}-g`}
                  className={`flex ${dims} items-center justify-center rounded-md border border-dashed font-bold uppercase tracking-wide ${
                    isFree ? "border-[#10b981]/45 text-[#10b981]/55" : "border-[#2a2a3e] text-transparent"
                  }`}
                >
                  {isFree ? "Free" : ""}
                </span>
              );
            }
            if (isFree) {
              return (
                <span
                  key={`${i}-f`}
                  className={`pr-flip relative flex ${dims} items-center justify-center rounded-md border border-[#10b981]/70 bg-[#10b981]/20 font-bold uppercase tracking-wide text-[#6ee7b7] shadow-[0_0_18px_rgba(16,185,129,0.35)]`}
                >
                  Free
                  <span className="pr-ring" />
                  {SPARKS.map(([dx, dy], si) => (
                    <span
                      key={si}
                      className="pr-spark"
                      style={{ ["--dx" as string]: `${dx}px`, ["--dy" as string]: `${dy}px`, animationDelay: `${120 + si * 25}ms` }}
                    />
                  ))}
                </span>
              );
            }
            return (
              <span
                key={`${i}-p`}
                className={`pr-pop flex ${dims} items-center justify-center rounded-md border border-[#B1130F]/70 bg-[linear-gradient(160deg,rgba(212,26,22,0.45),rgba(177,19,15,0.2))] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]`}
              />
            );
          })}
        </div>
      ))}
      {overflow > 0 && <span className="text-[11px] font-semibold text-[#9099b8]">+{overflow}</span>}
    </div>
  );
}
