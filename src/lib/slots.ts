// The slot model: ONE source for prices, slots, outcomes and packages (Taha, 2026-10-30).
// Every page reads this file. Never hardcode a price or a slot count in a component.
// Rulings and reasons: bleedai-campaign-master clients/bleedai/strategy/shortlisted/DECISIONS.md #34 to #44,
// build plan: clients/bleedai/strategy/company-model-2026-10/BUILD-PLAN.md.
//
// NAMING (Taha 2026-10-30, second pass): the code says "slot", the SITE says "service". A visitor never
// reads the word slot. One unit = one service ($495). An outcome page = a PACKAGE (Shortlisted, Outbound...).
// The presets inside a package = PLANS (Starter, Full...). Use unitLabel() for counts in copy.
//
// PUBLIC FILE (it ships to the browser). Disclosure rule (#32): slot names, outcomes, monthly units,
// slot counts, prices and the swap only. Never write a vendor or tool name, our costs, inbox counts,
// pools, playbooks or prompts here. A pass-through cost is described by what it is, never by brand.

export const SLOT_PRICE = 495;
export const MIN_SLOTS = 2;
/** Every 4th slot is free. */
export const FREE_EVERY = 4;
/** Paying outside the card subscription adds this fee. Suggested by Claude, Taha to confirm. */
export const PROCESSING_FEE_PCT = 5;

export const PRICE_LINE = "Founding price, locked while you stay";
export const SWAP_LINE = "Pick your services. Swap any service, any month, to what's working.";

/** Public word for one unit. */
export const UNIT = "service";
export function unitLabel(n: number): string {
  return `${n} ${n === 1 ? "service" : "services"}`;
}

export type ThemeId = "linkedin" | "website" | "outbound";
export type SlotStatus = "live" | "soon";

export interface Theme {
  id: ThemeId;
  name: string;
  blurb: string;
}

export const THEMES: Theme[] = [
  { id: "linkedin", name: "LinkedIn", blurb: "Be the name your buyers already know." },
  { id: "website", name: "Website and AI search", blurb: "Get found on Google and recommended by AI." },
  { id: "outbound", name: "Outbound", blurb: "Start conversations with the buyers you pick." },
];

export interface PassThrough {
  label: string;
  amount: number;
  unit: "month" | "target";
}

export interface Slot {
  id: string;
  theme: ThemeId;
  /** Short catalogue name. */
  name: string;
  /** The result, written as an outcome. */
  title: string;
  /** What arrives every month. */
  monthly: string;
  /** One or two plain sentences for the hover tooltip. */
  tooltip: string;
  /** Slots this costs. */
  weight: number;
  status: SlotStatus;
  /** Hidden in the builder until this parent slot is picked. */
  parent?: string;
  /** Optional Pro version: one extra slot. */
  pro?: string;
  /** Optional "more volume": each extra unit is one more slot. */
  volume?: string;
  passThrough?: PassThrough;
}

export const SLOTS: Slot[] = [
  // LinkedIn
  {
    id: "linkedin-posts",
    theme: "linkedin",
    name: "LinkedIn posts",
    title: "Show up in your buyers' feed every week",
    monthly: "8 high quality LinkedIn posts a month, researched against your competitors, each with an image, carousel or GIF",
    tooltip: "We research what your market and your competitors are saying, then write and design 8 posts in your voice. You approve them before they go out.",
    weight: 1,
    status: "live",
  },
  {
    id: "lead-magnet-posts",
    theme: "linkedin",
    name: "Lead magnet posts",
    title: "Turn your posts into leads",
    monthly: "3 lead magnet posts a month: a useful guide, template or tool your buyers comment to get",
    tooltip: "Each post offers something your buyers actually want. Everyone who asks for it is a warm lead we can follow up.",
    weight: 1,
    status: "live",
    parent: "linkedin-posts",
  },
  {
    id: "post-engagers",
    theme: "linkedin",
    name: "Post engager follow-up",
    title: "Reach everyone who engages with your posts",
    monthly: "The people who like and comment on your posts, followed up on LinkedIn and email every week",
    tooltip: "A like is a raised hand. We find the ones who fit your buyer and start the conversation for you.",
    weight: 1,
    status: "live",
    parent: "linkedin-posts",
  },
  {
    id: "network-growth",
    theme: "linkedin",
    name: "Buyer network growth",
    title: "Grow a network made only of buyers",
    monthly: "Connection requests to 150 to 200 ideal prospects a week, sent from your profile",
    tooltip: "Your posts only work if buyers see them. We grow your network with the exact people you sell to, so every post lands in front of them.",
    weight: 1,
    status: "live",
    passThrough: { label: "LinkedIn automation seat, at cost", amount: 50, unit: "month" },
  },
  {
    id: "competitor-engagers",
    theme: "linkedin",
    name: "Competitor audience",
    title: "Win your competitors' audience",
    monthly: "People engaging with your competitors' posts, reached on LinkedIn and email",
    tooltip: "Anyone commenting on a competitor's post is shopping in your category right now. We reach them before your competitor does.",
    weight: 1,
    status: "live",
    pro: "Pro: more competitors and a bigger weekly volume",
  },
  {
    id: "video",
    theme: "linkedin",
    name: "Video",
    title: "Get a great video without making one",
    monthly: "One 10 to 12 minute video a month: idea, script, editing and screen recording handled. You spend about 10 minutes reading the script.",
    tooltip: "We pick the topic, write the script and do the whole edit. Your part is a short read through and a screen share.",
    weight: 1,
    status: "live",
    volume: "Each extra video is one more service",
  },
  {
    id: "video-repurpose",
    theme: "linkedin",
    name: "Video everywhere",
    title: "Put every video everywhere",
    monthly: "Your video cut for YouTube and other channels, with titles, descriptions and calls to action",
    tooltip: "One recording becomes a YouTube video, short clips and posts, each written for the channel it lives on.",
    weight: 1,
    status: "live",
    parent: "video",
  },
  {
    id: "smart-engagement",
    theme: "linkedin",
    name: "Smart engagement",
    title: "Be seen in your buyers' comments",
    monthly: "Thoughtful comments and likes on posts across your target network",
    tooltip: "Real comments that add something, on the posts your buyers read, so your name keeps coming up.",
    weight: 1,
    status: "soon",
    pro: "Pro: a bigger network and daily coverage",
  },

  // Website and AI search
  {
    id: "articles",
    theme: "website",
    name: "Articles",
    title: "Rank on Google and get quoted by AI",
    monthly: "2 in-depth articles a month on your site, with interactive elements, custom images and GIFs, built on keyword research",
    tooltip: "Articles that answer the exact questions your buyers ask Google, ChatGPT and Claude, with calculators, charts and sources AI likes to quote.",
    weight: 1,
    status: "live",
    volume: "Each 2 more articles is one more service",
  },
  {
    id: "ai-search",
    theme: "website",
    name: "AI search tracking",
    title: "Know when AI recommends you, and fix it when it doesn't",
    monthly: "20 of your buyers' questions run every month across ChatGPT, Claude, Perplexity and Google AI, with a fix list",
    tooltip: "You see who gets named for each question, which pages the AI quoted, your share against competitors and the trend month on month. Then we fix what is missing.",
    weight: 1,
    status: "live",
  },
  {
    id: "citations",
    theme: "website",
    name: "Get cited",
    title: "Get named on the sites AI reads",
    monthly: "Outreach to the lists, roundups and publications AI assistants quote, up to about 40 outlets a month",
    tooltip: "AI recommends the companies other sites mention. We get you onto the pages it reads.",
    weight: 1,
    status: "live",
    pro: "Pro: about 80 outlets a month",
  },
  {
    id: "lead-magnet-app",
    theme: "website",
    name: "Lead magnet app",
    title: "A tool on your site that collects leads",
    monthly: "A custom calculator, report or app built and live on your site",
    tooltip: "Something your buyers use and share, that asks for an email in return. Built, hosted on your site and improved every month.",
    weight: 1,
    status: "live",
    pro: "Pro: a more complex app",
  },
  {
    id: "page-revamp",
    theme: "website",
    name: "Page revamp",
    title: "A homepage that turns visits into calls",
    monthly: "Your homepage or a custom landing page rebuilt, with technical SEO",
    tooltip: "A sharper message, a faster page and the technical fixes Google and AI crawlers need to read you properly.",
    weight: 1,
    status: "live",
    pro: "Pro: several main pages",
  },

  // Outbound
  {
    id: "email-campaign",
    theme: "outbound",
    name: "Email campaign",
    title: "Put your offer in front of a new market",
    monthly: "One targeted campaign: 1,500 emails a month to about 750 buyers you pick, 2 emails each, every reply handled and followed up",
    tooltip: "We pick the buyers, write the emails with you, send them and handle every reply. You get the conversations.",
    weight: 1,
    status: "live",
    volume: "Each 1,500 more emails is one more service",
  },
  {
    id: "buyer-list",
    theme: "outbound",
    name: "Signal list",
    title: "A list built around your best buyers",
    monthly: "Up to 4,000 contacts a month, researched on the signals that fit your buyer",
    tooltip: "Not a bought list. We find the companies showing the signals your best customers showed, and the right people inside them.",
    weight: 1,
    status: "live",
    pro: "Pro: harder to find markets",
  },
  {
    id: "linkedin-outreach",
    theme: "outbound",
    name: "LinkedIn outreach",
    title: "Start conversations on LinkedIn",
    monthly: "Outreach to 500 to 800 target contacts a month from your LinkedIn",
    tooltip: "Connection requests and messages to the buyers you pick, written for each one, with replies handed to you.",
    weight: 1,
    status: "live",
    passThrough: { label: "LinkedIn automation seat, at cost", amount: 50, unit: "month" },
  },
  {
    id: "direct-mail",
    theme: "outbound",
    name: "Direct mail",
    title: "Land on their desk",
    monthly: "A personalised letter or card sent to your top accounts",
    tooltip: "For the accounts that matter most. A real card, written for them, that arrives when the emails do.",
    weight: 1,
    status: "live",
    passThrough: { label: "Printing and postage, at cost", amount: 1, unit: "target" },
  },
  {
    id: "website-visitors",
    theme: "outbound",
    name: "Website visitors",
    title: "Follow up on the companies visiting your site",
    monthly: "Companies visiting your site identified and reached",
    tooltip: "Most visitors leave without a word. We find out which companies they are and start a conversation.",
    weight: 1,
    status: "live",
    passThrough: { label: "Visitor identification software, at cost", amount: 200, unit: "month" },
  },
  {
    id: "job-signals",
    theme: "outbound",
    name: "Job signals",
    title: "Reach companies the week they change",
    monthly: "New hires and job posts that signal a need for what you sell, reached every week",
    tooltip: "A new head of sales or a job post for your exact problem is the best timing you will get. We catch it and reach out that week.",
    weight: 1,
    status: "live",
  },
  {
    id: "reactivation",
    theme: "outbound",
    name: "Lead reactivation",
    title: "Wake up your old leads",
    monthly: "Your past leads and customers cleaned and re-engaged",
    tooltip: "The people who already know you are the cheapest deals you will close. We clean the list and give them a reason to reply.",
    weight: 1,
    status: "live",
  },
];

export interface PackageItem {
  slot: string;
  /** Units of this slot (e.g. 2 x articles = 4 articles a month). Defaults to 1. */
  qty?: number;
}

export interface Package {
  id: string;
  outcome: OutcomeId;
  name: string;
  pitch: string;
  items: PackageItem[];
  featured?: boolean;
}

export type OutcomeId = "shortlisted" | "linkedin-authority" | "outbound" | "inbound-engine";

export interface Outcome {
  id: OutcomeId;
  /** The promise, used as the card title. */
  title: string;
  /** Product name. */
  name: string;
  href: string;
  summary: string;
}

export const OUTCOMES: Outcome[] = [
  {
    id: "shortlisted",
    title: "Get recommended by ChatGPT",
    name: "Shortlisted",
    href: "/shortlisted/",
    summary: "When your buyers ask ChatGPT, Claude or Perplexity who to hire, your name comes up. Articles, citations and LinkedIn, tracked every month.",
  },
  {
    id: "linkedin-authority",
    title: "Become the known name on LinkedIn",
    name: "LinkedIn Authority",
    href: "/linkedin-authority/",
    summary: "Posts your buyers read, a network made of buyers, and every person who engages followed up.",
  },
  {
    id: "outbound",
    title: "Book meetings with your buyers",
    name: "Outbound",
    href: "/outbound/",
    summary: "Targeted email and LinkedIn outreach to the buyers you pick, every reply handled for you.",
  },
  {
    id: "inbound-engine",
    title: "Turn your website into a lead source",
    name: "Inbound Engine",
    href: "/inbound-engine/",
    summary: "A homepage that converts, articles that rank and a tool on your site that collects leads.",
  },
];

export const PACKAGES: Package[] = [
  {
    id: "shortlisted",
    outcome: "shortlisted",
    name: "Shortlisted Full",
    pitch: "The full push to become the name AI recommends in your category.",
    items: [{ slot: "articles", qty: 2 }, { slot: "linkedin-posts" }, { slot: "citations" }, { slot: "ai-search" }],
    featured: true,
  },
  {
    id: "shortlisted-starter",
    outcome: "shortlisted",
    name: "Shortlisted Starter",
    pitch: "Everything Shortlisted does, at half the article volume.",
    items: [{ slot: "articles" }, { slot: "linkedin-posts" }, { slot: "citations" }, { slot: "ai-search" }],
  },
  {
    id: "linkedin-starter",
    outcome: "linkedin-authority",
    name: "LinkedIn Starter",
    pitch: "Great posts, seen by a network that is all buyers.",
    items: [{ slot: "linkedin-posts" }, { slot: "network-growth" }],
  },
  {
    id: "linkedin-authority",
    outcome: "linkedin-authority",
    name: "LinkedIn Full",
    pitch: "Posts and a monthly video your buyers see, and every person who engages followed up.",
    items: [{ slot: "linkedin-posts" }, { slot: "network-growth" }, { slot: "post-engagers" }, { slot: "video" }],
    featured: true,
  },
  {
    id: "outbound-test",
    outcome: "outbound",
    name: "Test a market",
    pitch: "One market, one campaign, a clear read on whether it bites.",
    items: [{ slot: "email-campaign" }, { slot: "buyer-list" }],
  },
  {
    id: "outbound-steady",
    outcome: "outbound",
    name: "Steady pipeline",
    pitch: "Email and LinkedIn working the same buyers, every month.",
    items: [{ slot: "email-campaign", qty: 2 }, { slot: "linkedin-outreach" }, { slot: "job-signals" }],
    featured: true,
  },
  {
    id: "inbound",
    outcome: "inbound-engine",
    name: "Inbound Full",
    pitch: "A site that ranks, converts and collects leads, with posts sending people to it.",
    items: [{ slot: "page-revamp" }, { slot: "articles" }, { slot: "lead-magnet-app" }, { slot: "linkedin-posts" }],
    featured: true,
  },
];

/** The homepage hybrid. Not tied to one outcome. */
export const HYBRID_PACKAGE = {
  id: "found-and-booked",
  name: "Found and Booked",
  pitch: "Get found by the buyers searching, and booked with the ones who are not searching yet.",
  items: [{ slot: "linkedin-posts" }, { slot: "articles" }, { slot: "email-campaign" }, { slot: "post-engagers" }] as PackageItem[],
};

/** Complex or high volume outbound. Priced as one plan, not built from services. Volumes are Claude's call 2026-10-30, Taha to veto. */
export const OUTBOUND_SPECIALIST = {
  id: "outbound-specialist",
  name: "Outbound Specialist",
  pitch: "For outbound that already works and needs more: several markets, constant tests, a list built per account.",
  launch: {
    price: 2500,
    label: "Launch month",
    items: ["Your buyers researched and lists built per account", "Emails written with you, campaigns live", "Tests set up from day one"],
  },
  monthly: [
    {
      id: "focused",
      label: "Focused",
      price: 2000,
      reach: "One market, worked deep",
      items: ["Up to 6,000 emails a month", "One market, lists built on buying signals", "2 new tests every month", "LinkedIn outreach to the same buyers", "Every reply handled, a report every week"],
    },
    {
      id: "scaled",
      label: "Scaled",
      price: 3000,
      reach: "Two to three markets in parallel",
      items: ["Up to 12,000 emails a month", "Two to three markets in parallel", "4 tests running every month", "Email and LinkedIn on every market", "Every reply handled, a report every week"],
    },
    {
      id: "full",
      label: "Full engine",
      price: 5000,
      reach: "High volume across several markets",
      items: ["Up to 25,000 emails a month", "Several markets at once", "A new angle tested every week", "Email, LinkedIn and direct mail to your top accounts", "Every reply handled, a report every week"],
    },
  ],
};

export const TRIAL = {
  href: "/trial/",
  label: "Start a free trial",
  length: "2 weeks",
  slots: "1 to 2 services",
};

// ---------- helpers ----------

export function slotById(id: string): Slot {
  const s = SLOTS.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown slot: ${id}`);
  return s;
}

/** Slots you pay for when you hold n slots (every 4th is free). */
export function paidSlots(n: number): number {
  return n - Math.floor(n / FREE_EVERY);
}

export function freeSlots(n: number): number {
  return Math.floor(n / FREE_EVERY);
}

/** Monthly price for n slots, before pass-through costs. */
export function priceFor(n: number): number {
  return SLOT_PRICE * paidSlots(n);
}

/** How many more slots until the next free one (0 when the last slot added was free). */
export function slotsToNextFree(n: number): number {
  const r = n % FREE_EVERY;
  return r === 0 ? FREE_EVERY : FREE_EVERY - r;
}

/** The monthly line for qty units of a service, written out (no "times 2"). */
export function monthlyFor(id: string, qty = 1): string {
  const s = slotById(id);
  if (qty <= 1) return s.monthly;
  const n = (x: number) => (x * qty).toLocaleString("en-US");
  if (id === "email-campaign") return `${qty} targeted campaigns: ${n(1500)} emails a month to about ${n(750)} buyers you pick, 2 emails each, every reply handled and followed up`;
  if (id === "articles") return `${n(2)} in-depth articles a month on your site, with interactive elements, custom images and GIFs, built on keyword research`;
  if (id === "video") return `${qty} videos a month, 10 to 12 minutes each: idea, script, editing and screen recording handled`;
  return `${s.monthly} (x${qty})`;
}

export function itemsSlotCount(items: PackageItem[]): number {
  return items.reduce((sum, it) => sum + slotById(it.slot).weight * (it.qty ?? 1), 0);
}

/** Monthly pass-through costs that are per month (per-target costs are shown separately). */
export function itemsPassThroughMonthly(items: PackageItem[]): number {
  return items.reduce((sum, it) => {
    const p = slotById(it.slot).passThrough;
    return p && p.unit === "month" ? sum + p.amount : sum;
  }, 0);
}

export function packageById(id: string): Package | undefined {
  const hit = PACKAGES.find((p) => p.id === id);
  if (hit) return hit;
  // The homepage hybrid is not in an outcome grid but must still preload in the builder and /trial.
  if (id === HYBRID_PACKAGE.id) return { ...HYBRID_PACKAGE, outcome: "outbound" } as Package;
  return undefined;
}

export function packagesFor(outcome: OutcomeId): Package[] {
  return PACKAGES.filter((p) => p.outcome === outcome);
}

export function outcomeById(id: OutcomeId): Outcome {
  return OUTCOMES.find((o) => o.id === id)!;
}

/** Deep link into the builder with a package preloaded. */
export function customiseHref(packageId: string): string {
  return `/pricing/?package=${packageId}#builder`;
}

export function slotHref(slotId: string): string {
  return `/services/${slotId}/`;
}

export function money(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}
