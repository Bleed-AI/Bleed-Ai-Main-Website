import { OUTCOMES, PACKAGES, SLOTS, packagesFor, type OutcomeId, type PackageItem, type Slot } from "@/lib/slots";

/** The trial runs on 1 to 2 slots (TRIAL.slots in the config). */
export const TRIAL_MAX = 2;

/**
 * Slots offered on the free trial: every live slot except the ones with a
 * per-target physical cost (postage). Soon slots are never offered.
 */
export function trialable(s: Slot): boolean {
  return s.status === "live" && s.passThrough?.unit !== "target";
}

export const TRIAL_SLOTS: Slot[] = SLOTS.filter(trialable);

/**
 * What each slot produces inside the 14 days. Written from each slot's config
 * fields (monthly line and tooltip), scaled to two weeks. Day numbers are
 * illustrative of order, not a promise of the exact date.
 */
export const TRIAL_BEATS: Record<string, [number, string][]> = {
  "linkedin-posts": [
    [3, "What your market and competitors are saying, researched"],
    [5, "First posts written in your voice, sent for your approval"],
    [8, "Approved posts going out, each with an image, carousel or GIF"],
  ],
  "lead-magnet-posts": [
    [4, "The guide, template or tool picked with you"],
    [8, "Lead magnet post live: buyers comment to get it"],
    [11, "Everyone who asked, listed as warm leads"],
  ],
  "post-engagers": [
    [4, "People liking and commenting on your posts, checked against your buyer"],
    [6, "Follow ups start on LinkedIn and email"],
    [11, "Conversations handed to you"],
  ],
  "network-growth": [
    [3, "Your ideal prospects agreed and found"],
    [4, "Connecting with 150 to 200 of them a week from your profile"],
    [10, "A network that is growing with buyers only"],
  ],
  "competitor-engagers": [
    [3, "Competitors picked with you"],
    [5, "People engaging with their posts found and checked"],
    [7, "Reached on LinkedIn and email"],
  ],
  articles: [
    [3, "Keyword research on the questions your buyers ask"],
    [7, "First article drafted, with images, for your review"],
    [11, "Article live on your site"],
  ],
  "ai-search": [
    [3, "20 of your buyers' questions agreed with you"],
    [6, "Run across ChatGPT, Claude, Perplexity and Google AI"],
    [9, "Who gets named, which pages were quoted, your share against competitors"],
    [11, "Your fix list"],
  ],
  "lead-magnet-app": [
    [3, "The calculator, report or app picked with you"],
    [8, "First version built for your review"],
    [12, "Live on your site, asking for an email in return"],
  ],
  "page-revamp": [
    [3, "Your page reviewed: message, speed and technical SEO"],
    [7, "The new page drafted for your review"],
    [12, "Live, with the technical fixes in"],
  ],
  "email-campaign": [
    [3, "The buyers picked with you"],
    [5, "Two emails written with you"],
    [8, "Campaign sending"],
    [10, "Every reply handled, conversations handed to you"],
  ],
  "buyer-list": [
    [3, "The signals your best customers showed, agreed with you"],
    [7, "Companies showing them found, and the right people inside them"],
    [11, "Your researched list delivered"],
  ],
  "linkedin-outreach": [
    [3, "The buyers you want to reach, picked with you"],
    [5, "Connection requests and messages written for each one"],
    [9, "Replies handed to you"],
  ],
};

export const GENERIC_BEATS: [number, string][] = [
  [4, "The work planned with you"],
  [8, "First output for your approval"],
  [12, "Live"],
];

export const SHARED_BEATS: [number, string][] = [
  [1, "You apply. We check the fit the same day"],
  [2, "15 minute call: we agree what each service should do for you"],
  [14, "Readout: what each service produced, and what we would keep"],
];

/** Keep a pick list valid: trialable only, children need their parent, max 2. */
export function cleanPicks(ids: string[]): string[] {
  const out: string[] = [];
  for (const id of ids) {
    const s = TRIAL_SLOTS.find((x) => x.id === id);
    if (!s || out.includes(id)) continue;
    if (s.parent && !out.includes(s.parent) && !ids.includes(s.parent)) {
      if (out.length + 2 <= TRIAL_MAX) out.push(s.parent);
      else continue;
    }
    if (out.length < TRIAL_MAX) out.push(id);
  }
  // a child whose parent did not make the cut goes too
  return out.filter((id) => {
    const p = TRIAL_SLOTS.find((x) => x.id === id)?.parent;
    return !p || out.includes(p);
  });
}

function fromItems(items: PackageItem[]): string[] {
  return cleanPicks(items.map((i) => i.slot));
}

export interface TrialQuery {
  outcome: string;
  pkg: string;
  picks: string[];
  /** What the picks came from, for the "we picked these for you" line. */
  sourceName: string;
}

/** Read ?services= (or the older ?slots=, still sent by the builder), ?package= and ?outcome=, in that order of priority. */
export function readTrialQuery(search: string): TrialQuery {
  const q = new URLSearchParams(search);
  const outcome = q.get("outcome") ?? "";
  const pkg = q.get("package") ?? "";
  const slotsParam = q.get("services") ?? q.get("slots") ?? "";
  let picks: string[] = [];
  let sourceName = "";
  if (slotsParam) {
    picks = cleanPicks(slotsParam.split(",").map((x) => x.split(":")[0].trim()).filter(Boolean));
  }
  if (!picks.length && pkg) {
    const p = PACKAGES.find((x) => x.id === pkg);
    if (p) {
      picks = fromItems(p.items);
      sourceName = p.name;
    }
  }
  if (!picks.length && outcome) {
    const o = OUTCOMES.find((x) => x.id === outcome);
    if (o) {
      const list = packagesFor(o.id as OutcomeId);
      const p = list.find((x) => x.featured) ?? list[0];
      if (p) picks = fromItems(p.items);
      sourceName = o.name;
    }
  }
  return { outcome, pkg, picks, sourceName };
}
