# Slot model site build: the brief every page agent reads

Created: 2026-10-30 · Last updated: 2026-10-30 · Author: Claude for Taha

You are building one part of BleedAI's new website. The company was redesigned on 2026-10-30 from "done-for-you cold email agency" into **the last marketing team you'll ever hire**: every marketing service is a swappable **slot** (LinkedIn, website and AI search, outbound). Clients pick slots, and every month we can swap any slot to whatever is working for them. The swap is the moat: no juggling five agencies, no churn when one channel stalls.

Read before you write anything:
1. `src/lib/slots.ts` in this repo: THE config. Every price, slot, outcome and package comes from it. **Never hardcode a price, a slot count or a slot description in a component.** Import it.
2. `C:\Users\taha0\Claude_Projects\bleedai-campaign-master\clients\bleedai\strategy\company-model-2026-10\BUILD-PLAN.md` (the approved plan) and `...\TAHA-NOTES-2026-10-30.md` (the owner's own words; the voice and intent).
3. `C:\Users\taha0\Claude_Projects\bleedai-campaign-master\clients\bleedai\strategy\shortlisted\DECISIONS.md` rows #21 to #44 (rulings with reasons; #34 to #44 override anything older).
4. The shared primitives in `src/components/slots/`: `SlotChip` (pill + tooltip, links to the slot page), `SlotMeter` (slot boxes, every 4th FREE, price), `PackageCard` (package with trial + Customise buttons), `OutcomePackages` (package grid for one outcome). Use them; extend inside your own files if you need more.
5. Existing design language: `src/app/globals.css` (`.bai` palette: bg #07070d, cards #141420, red #B1130F, green #10b981, text #eaeef8, sub #9099b8; Clash Display / Instrument Sans; Instrument Serif italic + red gradient on `<em>` in headlines via `.hd-em`), `src/components/Reveal.tsx` (scroll fade-up), GSAP + @gsap/react are installed, three/@react-three are installed. Good reference components: `src/components/Shortlisted.tsx` (sample LinkedIn post, sample article, animated chart), `HeroV2.tsx`, `PassSystem.tsx`, `SignalSheet.tsx`, `AiFollowUp.tsx`.

## The quality bar

The owner's words: the 2026-10-29 sketches were not good enough, this must be "much, much better". Every page has at least one **signature interactive or animated piece** that SHOWS the work instead of describing it (an AI answer that types itself and names the client, a post that builds itself, slot boxes swapping, a reply thread arriving, a calculator that computes). Code-drawn visuals (SVG, CSS, GSAP, canvas) are the default: they cost nothing and look premium. Respect `prefers-reduced-motion`. It must look excellent at **375px** and **1440px** with no horizontal scroll. Plain, spoken English: short sentences, no jargon, no hype words ("revolutionary", "unlock", "supercharge", "game-changer", "seamless", "leverage").

## Hard rules (checked by grep before anything ships)

- **Zero em dashes and zero en dashes** anywhere in copy or comments you write. Use commas, periods, parentheses. Ranges are "2 to 3" or "2-3".
- **Disclosure (#32).** Public: slot names, outcomes, monthly units, slot counts, prices, the swap. **Never** write a vendor or tool name (Aimfox, Instantly, Unipile, Thanks.io, Apify, Prospeo, Blitz, MoltSets, TryKit, Clay, n8n, Supabase, OpenAI, Claude Code as our tool), our costs or margins, inbox counts, sending pools, playbooks or prompts. Naming the AI assistants buyers use (ChatGPT, Claude, Perplexity, Google AI) is fine: that is the client's world, not our stack.
- **Price language.** "$495 a slot" with "Founding price, locked while you stay". **No** strikethrough "was" price, **no** end date, **no** seats-left counter, **no** urgency timers, no regulatory talk. Every 4th slot is free (buy 3, the 4th is free; 8 slots = 2 free). Minimum 2 slots. Month to month on a card subscription; other payment methods add a processing fee (the number is `PROCESSING_FEE_PCT`).
- **Public name for the unit is "slots".** The line: "Pick your slots. Swap any slot to what's working." (`SWAP_LINE`).
- **Primary CTA everywhere is the free trial** (`TRIAL` in the config, link `/trial/`, append `?outcome=<id>` and/or `&package=<id>` when on an outcome page). Secondary CTA: see pricing / customise.
- **Proof.** Only claims already on the live site or in `C:\Users\taha0\Claude_Projects\bleedai-campaign-master\clients\bleedai\PROOF-AND-CREDIBILITY.md`, quoted exactly. Never invent a number, a client name, a result or a testimonial. Sample content (a sample post, a sample AI answer) is fine when it is clearly labelled "Example" and uses an invented company that is obviously illustrative.
- **Never claim results for a service we have not delivered.** Shortlisted, LinkedIn Authority and Inbound are new services: sell them on the mechanism, the samples and the monthly report, not on fake results. Outbound has real proof (the snapshots on the proof sheet).
- **Status "soon" slots** show a small "Soon" tag; never promise them as live.
- Static export (`output: "export"` in next.config.ts): no API routes, no server actions, no `headers()`/`cookies()`. Query params are read client-side (`useSearchParams` inside a `<Suspense>` boundary, or `window.location`). Dynamic routes need `generateStaticParams`. Internal links end with a trailing slash.
- Every new page uses `buildMeta` from `@/lib/seo` with `noindex: true` (flipped at go-live) and the layout: `<main className="bai relative overflow-x-clip"><Navigation />...<Footer /></main>`.

## File ownership (parallel agents share ONE working tree)

- Touch **only** the files on your allowlist (given in your task). New components go in `src/components/<your-prefix>/`.
- **Do not edit**: `src/lib/slots.ts`, `src/components/slots/*`, `Navigation.tsx`, `Footer.tsx`, `globals.css`, `tailwind.config.ts`, `package.json`, or any other agent's files. If you need a config change (a slot field, a copy fix in slots.ts), write it in your final report as a request; do not make it. You may add page-scoped CSS in your own component via Tailwind classes or a `<style jsx>` block.
- Do not delete old components (other routes still import them).
- **Never delete anything** (no rm, rmdir, Remove-Item, not even empty or screenshot folders): deletes stop the session on a permission prompt for the owner. Write to a new subfolder instead.
- **Do not install packages. Do not run `next build`, `npm run dev`, or `git commit`/`git push`.** The lead agent does builds and commits.

## Checking your work

- Dev server is already running: `http://localhost:3100`. If a page shows another agent's compile error, wait 15 seconds and retry; if it is your error, fix it.
- Typecheck: `npx tsc --noEmit` from the repo root (errors in other agents' files are not yours; ignore them).
- Screenshots: `node C:/Users/taha0/Claude_Projects/bleedai-campaign-master/work/2026-10-29/shortlisted-page-review/shot.cjs <outDir> http://localhost:3100/<route>/ <tag>` writes `<tag>-375-N.png` and `<tag>-1440-N.png` slices plus the page text. Put them in `C:/Users/taha0/AppData/Local/Temp/claude/C--Users-taha0-Claude-Projects-bleedai-campaign-master/78c36e75-6336-4792-bcda-b0ab6daf7122/scratchpad/shots/<your-tag>/`. **Look at every slice** (Read the PNG), fix what looks wrong, re-shoot. Do at least two full review passes. Check: nothing overflows at 375, nothing clipped, tooltips not off-screen, contrast readable, animations end in a sensible state in a still screenshot.
- Before reporting: grep your files for `[–—]` and for the tool names above; both must be empty.

## Your final report (keep it under 300 words)

Files created or changed · the signature piece and what it shows · decisions you made that the owner might veto (numbered) · any request for a config change · screenshot folder path.
