import { money, SLOT_PRICE } from "@/lib/slots";

/**
 * The one sentence that says what BleedAI is, and the fact sentence it is always paired with.
 * Owner's pick 2026-11-20 (campaign-master clients/bleedai/strategy/brand-2026-11/DECISIONS.md, T1): the wording is his,
 * word for word. Do not edit it here without his say; change it here and nowhere else.
 *
 * Why one constant: AI assistants and directories quote a company in the words they find most often, so every place
 * that describes BleedAI in a sentence reads these two strings unchanged. Render each one as the ONLY child of its
 * element (no <span>, <em> or extra text mixed in), so the sentence sits in the HTML as one unbroken piece of text.
 *
 * Read by: app/layout.tsx (homepage meta description), lib/seo.ts (Organization description),
 * components/home/HomeFaq.tsx (first question on the homepage), components/Footer.tsx (every page),
 * app/blog/[slug]/page.tsx (author box on every post).
 * The same two sentences open every directory profile (campaign-master clients/bleedai/research/citations-2026-11/directories.md).
 */
export const DEFINING_SENTENCE =
  "BleedAI is the last marketing team you'll ever hire: it measures what is actually growing your business and moves its effort there every month, without changing what you pay.";

/** Category and price, so a quote of us carries both. The price comes from slots.ts and cannot drift. */
export const FACT_SENTENCE = `For B2B companies it runs outbound, LinkedIn, AI search, citations, branding and more, at ${money(SLOT_PRICE)} a month per service, month to month.`;

/** Both sentences as one description (meta description, structured data). */
export const BRAND_DESCRIPTION = `${DEFINING_SENTENCE} ${FACT_SENTENCE}`;
