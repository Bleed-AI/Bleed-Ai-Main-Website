# Round 2: services rename + realistic visuals (Taha's feedback on the live site)

Created: 2026-10-30 · Last updated: 2026-10-30 · Author: Claude for Taha

Read `AGENT-BRIEF.md` in this folder first. Everything there still holds (disclosure, no dashes, proof, static export, never delete anything, no builds or commits, file allowlists, the screenshot loop) EXCEPT the naming rule, which this file replaces. The site is LIVE on bleedai.com; you are improving it on a branch.

## 1. The new words (this overrides "Public name for the unit is slots")

The owner looked at the live site and said visitors cannot tell what a "slot" is or what "swapping slots" means. From now on:

| Thing | Code name (unchanged) | Word a visitor reads |
|---|---|---|
| One $495 unit (LinkedIn posts, Articles, Email campaign...) | slot, `SLOTS`, `slotById` | **service** ("$495 a service", "every 4th service free", "swap any service, any month") |
| An outcome page (Shortlisted, LinkedIn Authority, Outbound, Inbound Engine) | outcome, `OUTCOMES` | **package** ("the Shortlisted package") |
| A preset inside an outcome (Starter, Full, Test a market, Steady pipeline) | package, `PACKAGES` | **plan** ("the Starter plan", "Pick a plan or build your own") |
| The builder | `SlotBuilder` | "Build your own" (from services) |

- A visitor must **never read the word "slot"** anywhere (headings, buttons, tooltips, aria labels, alt text, meta descriptions, the trial form labels). Rename visible copy only. Do NOT rename code identifiers, files, props or config ids; other agents import them.
- Counts in copy: `unitLabel(n)` from `@/lib/slots` gives "1 service" / "4 services". `SWAP_LINE` is now "Pick your services. Swap any service, any month, to what's working."
- The URL for a single service page is now `/services/<id>/` (use `slotHref(id)`; it already returns the new path). The catalogue is `/services/`. `/slots/...` 301s there.
- "Board" was internal slang for a set of slots. Do not use it in copy; say "plan" or "your services".
- The swap is still the big idea. Say it in plain words: "Each service is a full service on its own. If one isn't pulling its weight, swap it for another next month."

## 2. Shared pieces already updated (use them, do not edit them)

- `PackageCard` now renders a PLAN with **line items** ("What you get every month", each service with its monthly line) instead of chips.
- `OutcomePackages` renders the full plan grid for a package: its plans, then for **outbound only** the new `SpecialistPlanCard` (Outbound Specialist as a card with a level dropdown, line items per level, launch month, Book a call; it carries `id="specialist"`), then `BuildYourOwnCard`. Props: `outcome`, `builderHref` (default `/pricing/#builder`), `animate`.
- The pricing page `OutcomePicker` already uses `OutcomePackages`.
- Nav no longer has "ROI Calculator". Footer and nav say services.

## 3. The visual bar (the owner's biggest complaint)

He was put off by the homepage examples: they looked like abstract diagrams, not the real thing. He wants **realistic examples that look like the actual product a buyer would see**, clean and crisp, and FEWER of them ("use a fraction of it"), each one getting the concept across instantly:

- An AI answer should look like a real AI chat window (a ChatGPT style or Claude style answer: the dark or light chat UI, the user's question bubble, the answer with a numbered list that names the client, small source chips). No official logos; a generic sparkle icon and the assistant's name in text is fine.
- A LinkedIn post should look like a real LinkedIn feed post: avatar, name, headline, "1d", the text with "...see more", a real looking image or carousel slide, the reaction row and counts.
- A lead magnet app should look like a real calculator or report app in a browser frame: inputs, a result, a "send me the full report" email field.
- An article should look like a real article page in a browser frame: headline, author line, a hero image, an interactive element (a small calculator, a chart, a comparison table), a GIF style animated element. The owner explicitly wants articles sold as having **interactive elements, custom images and GIFs**.
- Outbound should look like a real inbox: a sent email in a mail client, then the reply thread arriving.
- Build these as high fidelity HTML/CSS/SVG components (browser chrome, real typography, real spacing, subtle shadows), animated with restraint (type-in, a reply arriving), honouring `prefers-reduced-motion`. Label every one "Example" with an obviously invented company (e.g. "Northwind Freight", "Acme Payroll"). Never use a real client's name or content unless it is already on the live site.
- You MAY use real image files that already exist in `public/images/` and the live site's existing screenshots (reply threads, campaign snapshots). You may also screenshot a page of ours you build, and reuse it as an image. Do not download stock photos or images from other sites.
- Quality check: put your screenshot next to a real ChatGPT / LinkedIn / Gmail screen in your head. If it reads as a diagram, it is not done.

## 4. Copy notes from the owner

- "Get recommended by ChatGPT" stays as the Shortlisted promise (it is the catchiest); the supporting line names the others: "ChatGPT, Claude, Perplexity and Google's AI".
- Email outbound must be **properly described** with line items: how many emails, to how many buyers, how many emails each, list built on signals, every reply handled, what the report shows. Use the numbers in `SLOTS` and `OUTBOUND_SPECIALIST` (never invent other numbers).
- The ROI calculator belongs on the **Outbound** page only (it was in the nav). The one-off campaign cost calculator at `https://calculator.bleedai.com/` also belongs there, for people who want a single campaign priced.
- The homepage strategy-call popups (`ExitPopup`, `SidePopup`) go away.

## 5. Report

Same as AGENT-BRIEF (under 300 words), plus: every place you removed the word slot, and a confirmation that `grep -in "slot"` over your rendered page text (the `-text.txt` file from the screenshot script) is empty.
