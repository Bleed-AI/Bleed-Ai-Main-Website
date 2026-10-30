import {
  HYBRID_PACKAGE,
  OUTBOUND_SPECIALIST,
  OUTCOMES,
  itemsSlotCount,
  money,
  monthlyFor,
  packageById,
  packagesFor,
  priceFor,
  slotById,
  SLOTS,
  unitLabel,
  type OutcomeId,
  type PackageItem,
} from "@/lib/slots";
import { cleanPicks } from "@/components/trial/trialData";

/**
 * What the visitor picked, read from a /book-call/ or /trial/ link (Taha 2026-10-30, the start popup).
 * Links carry ?services=id:qty[:pro],... (builder), ?package=<plan id>, ?package=specialist-<level>,
 * or ?outcome=<package id>. Every button keeps working as a plain link if the popup never loads.
 */

export type StartMode = "book" | "trial";

export interface StartLine {
  name: string;
  detail?: string;
}

export interface StartSelection {
  outcome: string;
  pkg: string;
  label: string;
  lines: StartLine[];
  priceLabel: string;
  /** Services that can go into the trial (1 to 2), preselected from the pick. */
  trialPicks: string[];
}

export const START_CALENDLY = "https://calendly.com/bleedai/bleedai-start-your-services-or-a-2-week-free-trial";
export const START_API = "https://calculator.bleedai.com/api/site-start";
export const START_WEBHOOK = "https://bleedai.app.n8n.cloud/webhook/bleedai-trial";

export function modeForPath(pathname: string): StartMode | null {
  if (/^\/trial\/?$/.test(pathname)) return "trial";
  if (/^\/book-call\/?$/.test(pathname)) return "book";
  return null;
}

function fromItems(items: PackageItem[]): StartLine[] {
  return items.map((it) => {
    const s = slotById(it.slot);
    const qty = it.qty ?? 1;
    return { name: `${qty > 1 ? `${qty} x ` : ""}${s.name}`, detail: monthlyFor(s.id, qty) };
  });
}

function planPrice(items: PackageItem[]): string {
  const n = itemsSlotCount(items);
  return `${money(priceFor(n))} a month for ${unitLabel(n)}`;
}

export function readStartSelection(search: string): StartSelection {
  const q = new URLSearchParams(search);
  const outcome = q.get("outcome") ?? "";
  const pkg = q.get("package") ?? "";
  const raw = q.get("services") ?? q.get("slots") ?? "";
  const empty: StartSelection = { outcome, pkg, label: "", lines: [], priceLabel: "", trialPicks: [] };

  if (raw) {
    const items: PackageItem[] = [];
    for (const part of raw.split(",")) {
      const [id, qty] = part.split(":");
      if (!SLOTS.some((s) => s.id === id)) continue;
      items.push({ slot: id, qty: Math.max(1, parseInt(qty || "1", 10) || 1) });
    }
    if (items.length) {
      return {
        ...empty,
        label: items.length === 1 ? slotById(items[0].slot).name : "Your own plan",
        lines: fromItems(items),
        priceLabel: items.length > 1 ? planPrice(items) : "",
        trialPicks: cleanPicks(items.map((i) => i.slot)),
      };
    }
  }

  if (pkg.startsWith("specialist")) {
    const level = OUTBOUND_SPECIALIST.monthly.find((m) => `specialist-${m.id}` === pkg) ?? OUTBOUND_SPECIALIST.monthly[0];
    return {
      ...empty,
      label: `${OUTBOUND_SPECIALIST.name}, ${level.label}`,
      lines: level.items.map((t) => ({ name: t })),
      priceLabel: `${money(level.price)} a month, after a ${money(OUTBOUND_SPECIALIST.launch.price)} launch month`,
      trialPicks: cleanPicks(["email-campaign"]),
    };
  }

  const plan = pkg === HYBRID_PACKAGE.id ? HYBRID_PACKAGE : packageById(pkg);
  if (plan) {
    return {
      ...empty,
      label: `${plan.name} plan`,
      lines: fromItems(plan.items),
      priceLabel: planPrice(plan.items),
      trialPicks: cleanPicks(plan.items.map((i) => i.slot)),
    };
  }

  const o = OUTCOMES.find((x) => x.id === outcome);
  if (o) {
    const list = packagesFor(o.id as OutcomeId);
    const p = list.find((x) => x.featured) ?? list[0];
    return { ...empty, label: `${o.name} package`, trialPicks: p ? cleanPicks(p.items.map((i) => i.slot)) : [] };
  }
  return empty;
}
