# Website rebuild handoff for Shahwaiz

Created: 2026-10-16 · Last updated: 2026-10-16 · Author: Claude for Taha

This file is the working brief for a Claude Code session. Open a session in `Bleed-Ai-Main-Website`, paste this file (or point the session at it) and run it. The visual version, with the five live animation prototypes and the page mockups, is `index.html` in this same folder: open it in a browser. It is also published at https://claude.ai/artifact/3bqpkNn6m6SWW4ES2U6SRA (Taha shares that link). Where this file and `index.html` disagree, this file wins.

## Context

**What changes and why.** bleedai.com still sells a cold email agency ("We Install Cold-to-Sold"). The business has moved: we now sell to B2B products that already sell, and the front door is a qualified trial where they see replies before they pay. The method is the Pass System: each target account is worked over about 30 days across email, LinkedIn, direct mail and warm phone, and a reply changes the path. AI answers every reply in minutes and chases anyone who says yes and goes quiet.

**The one sentence.** "We run the outbound experiments your team does not have the hands for, across email, LinkedIn, mail and phone, and you see the replies before you pay."

**Hero copy (final unless Taha changes it).**
- Label above: "For proven B2B products"
- Headline: "You've automated the obvious. We run the outbound experiments your team doesn't have the hands for."
- Sub line: "Give us the goal and a budget. We find the buyers who need you right now, reach them on email, LinkedIn and mail, and you see the replies before you pay us."
- Buttons: "Apply for a trial" (main), "See how it works"
- Small print: "We run a few trials a month, for products that already sell. · 85+ client campaigns · 5.0 on Upwork, Clutch and TechReviewer"

**Codebases.**
- `Bleed-Ai-Main-Website` (bleedai.com): Next.js, GSAP + @gsap/react (ScrollTrigger installed), three.js/r3f, Tailwind. Last commit 2026-09-23 (your multichannel redesign). Homepage composition is `src/app/page.tsx`.
- `Outbound_Cost_Calculator` (calculator.bleedai.com): the calculator, `/sprint`, `/packages`, `/trials`. Sends its form emails through Resend (`src/app/api/send-inquiry`, `send-order`).
- infra.bleedai.com: a separate Next.js app, phase 2 only.

**Taha's rulings (2026-10-16, these are final for this build).**
1. The trial goes on the site as an application ("Apply for a trial"), never as a "Free" plan card. The word "free" is not a plan name and not in the navigation.
2. A trial that passes goes straight to Growth or Scale monthly.
3. **Sprint price is $2,950** (back from $3,350), and the Sprint is a headline offer, not a footnote.
4. Pricing has four ways in: the trial (qualified, no price shown), the Sprint $2,950 one-time, Growth $3,350/month, Scale $5,300/month. Plus the calculator for one campaign under $1K. Performance deals (pay per meeting, success fee, revenue share) are mentioned with **no prices**, "priced on a call".
5. **Ship order.** Every new page goes live when it is done. The homepage is built on a test route first (`/home-v2`, noindex, the same way `/home-test` worked in September), then swapped into `/`. The site goes live publicly BEFORE Taha's review; he makes his final calls on the live site afterwards.
6. **Keep the current hero layout** (`HeroTest.tsx`, video on the right). It works. New words, plus one polished animation in it.
7. **Animation bar.** Polished and out of the box, something a visitor has not seen on ten other SaaS sites. People can tell an AI made site from stock motion, so no generic fade up on every block. Do not make the build complex. If time is short, do A (Pass System), B (buyer row) and E (trial) properly and keep C and D simple. The prototypes in `index.html` fix the STORY each animation tells, never the look.
8. **Industry pages, not one page per market pair.** We launch pairs too often for a page each.
9. **SEO exception.** "Cold email agency", "outbound agency", "lead gen", "B2B outbound" stay out of the pitch (hero, navigation, homepage headings, /pricing, /trial). They are allowed in the blog, meta descriptions, FAQ answers and pages written for search. Keep the blog and free tools for their rankings.
10. **Founder video:** keep the current one. Taha records a new one the week of 2026-10-26.
11. **Infrastructure (infra.bleedai.com) is phase 2,** after the main rebuild.

**Never in the pitch.** The four phrases above (pitch pages only). "We Install Cold-to-Sold". Email volume as the reason to pick a plan. "Your team follows up by call and SMS" (follow-up is our job). Prices for performance deals. "Free" as a plan name. **Em dashes and en dashes, anywhere on either site, ever.**

**Proof.** Every number, quote and client name on the site must appear on `bleedai-campaign-master/clients/bleedai/PROOF-AND-CREDIBILITY.md`. Safe today: 85+ client campaigns; 529 opportunities and $942K pipeline from one campaign; the named testimonials on that sheet. Nothing invented. One results card ("First trial result") is built but hidden until we have one.

## What to do

### Homepage (`/home-v2`, then swap into `/`)

New order, using the real files in `src/components`:

| # | Section | File | Action |
|---|---|---|---|
| 1 | Hero | `HeroTest.tsx` | Keep layout. New copy above. Add one signature animation (idea: a buyer row typing itself in under the headline). |
| 2 | Proof strip | `StatsStrip.tsx` | Keep. Render the real numbers server side so they show without JavaScript, animate from there. |
| 3 | What a tool will not do | `NotATool.tsx` (new) | Heading "You already have the tools. You don't have the hands." Six short cards: Buyers found by signal · Ten angles on one list · Four doors, one account · Every reply answered in minutes · Deliverability we measure ourselves · It runs before you pay |
| 4 | Buyer sheet | `SignalSheet.tsx` (new) | Animation B. Heading "We find your buyers before you reply." Use a blurred real sheet; Claude supplies the rows. |
| 5 | The Pass System | `PassSystem.tsx` (new) | Animation A. Replaces `ProcessFlow` and `FrameworkTest`. Heading "One email is easy to ignore. Four doors in 30 days is not." Sub: "We work your target accounts in passes. Each pass uses a new door and a better reason, so the person who signs actually sees you." |
| 6 | Every door | `ChannelStack.tsx` | Extend with animation D, or just add the three new cards to the existing stack. Heading "We run the doors. You take the meetings." Doors: Email · LinkedIn · Direct mail · Phone (warm only) · Website forms · CRM that stays yours. Rewrite the CRM card: follow-up is ours, not the client's. |
| 7 | AI follow-up | `AiFollowUp.tsx` (new) | Animation C. Heading "No warm reply goes cold." Sub: "An AI agent answers every reply in minutes, in your voice, and chases every yes that goes quiet. A person approves what it sends until you trust it." |
| 8 | Trial | `TrialFlow.tsx` (new) | Animation E. Heading "See the replies before you pay us." Sub: "If your product already sells, we build a list of about 1,500 of your buyers, write the campaign with you, send it, and hand you every reply. Then you decide." Links /trial. |
| 9 | Replies, testimonials, results | `RepliesMarquee`, `Testimonials`, `ResultsMarqueeTest` | Keep. Add the hidden "First trial result" card. Replace placeholder names in the replies marquee. |
| 10 | Who this is for | `WhoIsThisFor.tsx` | Great fit: paying customers you can name · a sales conversation before the deal · thousands of possible buyers · a small sales team that already believes in outbound. Not yet: pre-revenue · self-serve tools at a few dollars a seat · you want ads or SEO · you sell outbound or lead generation yourself. |
| 11 | How we work with you | `PricingTeaser.tsx` (new) | Three lines linking /pricing. |
| 12 | Founder, FAQ, final CTA | `FounderTest`, `FaqTest`, `FinalCta` | Old video stays. FAQ questions: What is a pass? · Which channels do you run? · Who qualifies for a trial? · What happens after the trial? · How does pricing work? · Whose domains and data are they, and what do I keep? · How fast do we start? ("build starts in 48 hours, first sends in about 2 weeks once inboxes are warm") |
| cut | Agency table, infra bento | `VsTableTest`, `InfraBentoTest` | Cut the table (comparing ourselves to an agency keeps us in that category). Shrink infrastructure to one proof line. |

Navigation: How it works (/pass-system) · Pricing · Industries (dropdown) · Book a call · button "Apply for a trial".

### Animations

Specs, prototypes and references are in `index.html` section 6 and `animation-references.md`. Short version:
- **A Pass System.** Day 0 to day 30 line; four passes light up with their channels (Day 0 warm on LinkedIn, Day 3 the give, Day 12 inside the team, Day 20 every door); at pass 1 a reply forks into four branches: Yes · Yes, then quiet · Not now · Remove me. Pinned and scrubbed on desktop only.
- **B Buyer row.** A job post types in, the key phrase highlights, flies into a sheet row, cells fill (Company, Signal, Who signs), a check lands. Three rows max, then hold.
- **C AI follow-up.** Reply bubble, "Drafting..." with a timer, answer, "Approved by a person", then a quiet lead chased on LinkedIn, email, phone, mail, each touch bringing something new.
- **D Every door.** One account in the middle, doors around it, one door opens and the rest dim.
- **E Trial.** Apply, We build the list, You approve the copy, You see every reply, You decide. Active step widens.

Rules for all: pin at most one section, never on touch screens, under 1.5 screen heights. Every loop holds on its finished state, and the same message exists as plain text. `prefers-reduced-motion` shows the finished state (`gsap.matchMedia()`). No three.js in explanation sections.

### New pages (each goes live when done)

- **`/trial`.** Heading "See the replies before you pay us." Animation E. What you get (about 1,500 buyers, two emails, every reply, a readout). What we need from you (a 15 minute copy call, someone to take positive replies). Who it is for. Then the form:
  - `customers`: How many customers pay you today, and do they keep paying? (None yet · A few, mostly one-off · 3+ paying, coming back or on contract)
  - `acv`: What is a typical customer worth to you in a year? (Under $5K · $5K to $20K · $20K+)
  - `budget`: Once outbound works, what could you put into it each month? (Under $1K · $1K to $3K · $3K+)
  - contact: `website`, `email`

  Routing (put the thresholds in ONE config object so Taha can change them):
  - 3+ repeat customers AND $5K+ AND budget $3K+ → "Looks like a fit" and the Calendly embed.
  - Some customers and budget $1K+, but not all of the above → "We only run a few trials a month and keep them for products with repeat customers. Here is how to start now." Sprint card first ($2,950, link calculator.bleedai.com/sprint), calculator card second ("Launch a single campaign for under $1K").
  - No customers yet, or budget under $1K → same sentence, calculator card first, Sprint second.

  Not strict on purpose (Taha): the form catches unproven products and tiny budgets and sends them somewhere useful; it never turns people away empty handed. Every submit, whatever the route, posts to an n8n webhook on our instance (the `Automations-Builder-n8n` project holds the key) that writes a lead row and posts to Slack. Reusing the calculator's Resend pattern, or qualifying inside Calendly, is fine if quicker, as long as the routing above happens.
- **`/pricing`, "How we work with you".** Headline "Start with a trial. Stay because it works." Sub "No lock-in, and you keep the domains, the lists and every thread." Four cards: Trial (if you qualify, apply) · Sprint $2,950 once (six weeks, your market mapped and tested across several campaigns on email and LinkedIn, success bar written before we send) · Growth $3,350/month (the Pass System on email and LinkedIn, the inside pass, AI follow-up, new segments every month, CRM and Slack support) · Scale $5,300/month (everything in Growth plus every door: direct mail to top accounts with 150 cards a month included, warm phone follow-up, the website form door, the most strategy time). Then "Smaller budget? Launch a single campaign for under $1K on the calculator." Then the performance partnership paragraph with no numbers (copy in `index.html` section 7). Buttons: Apply for a trial · Start a Sprint · Book a call.
- **`/pass-system`.** Animation A full size; each pass in detail (goal, door, what we send, what counts as a reply); the four branches and what happens next; Taha's video on the method. Claude adds a real 30-day timeline later.
- **`/industries/[slug]`.** One template, data from `src/content/industries/{slug}.json`. Five pages: `healthcare` (pairs: healthcare, dental front office, medtech regulatory), `construction` (precon), `logistics` (freight desk), `compliance` (CMMC, food safety), `ai-and-software` (AI implementation). File shape: `title`, `buyers`, `segments[]` with `signal`, `who_signs`, `sample_rows` (blurred), `doors`. Build the template with the healthcare file first; Claude writes the real JSON files. A new pair becomes a segment in an existing file. Slugs never change once live (the reply agent links them). No prices.

### Retire and fix

- 301 `/services/pilot-campaign`, `/services/evergreen-campaign`, `/services/infrastructure-setup` to `/pricing`; `/services/consultation` to `/book-call`. Remove from nav and sitemap.
- Delete `/home-test` and the unused `*Test` duplicates once the new homepage is swapped in.
- Strip every em dash and en dash from site copy (both sites).
- Blog: keep it and its keywords. In "Best Cold Email Agencies 2026" fix only the $0 Free Pilot offer. Also clean: mismatched campaign figures, five different launch speed claims, the "3 spots open" badge, the calculator header linking home. The full crawl is section 7 of https://claude.ai/artifact/6kTFZUqRXKMHf5YM6XhNBo (local: `bleedai-campaign-master/clients/bleedai/strategy/website-positioning-2026-10-08/live-site-inventory-2026-10-08.md`).

### Calculator (`Outbound_Cost_Calculator`)

- **Sprint back to $2,950.** `src/components/SprintView.tsx` has `PRICES = { high: 3350, low: 2950 }` and defaults to `high`. Make $2,950 the default. Growth stays $3,350 in `src/lib/pricing.config.ts`; do NOT change `growthMin`, because `/sprint` reads Growth from there. The Sprint page currently says the Sprint costs the same as one month of Growth (commit `c0e282c`); that is no longer true, so remove that line.
- Update the Sprint price in the calculator's own pricing docs (`docs/pricing-system-reference.md`, `docs/pricing-learnings.md`, add a 2026-10-16 entry: "Taha: Sprint back to $2,950, a headline offer next to the trial"), because `/create-proposal` reads them.
- `/packages` 301 to `bleedai.com/pricing`.
- `/sprint`: drop "cold email" from the title and copy.
- `/trials` ("Trial Campaigns", paid parallel experiments) will be confused with the trial on bleedai.com. Rename or retire it; ask Taha if unsure.

### Phase 2 (after the main rebuild, same task or a new one)

infra.bleedai.com still says the client's team does call and SMS follow-up, and its mailbox specs differ from the calculator. Update it to how we work now, then decide with Taha whether it becomes a page on bleedai.com or stays separate.

### Build order

1. Retire the four /services pages with 301s; delete /home-test. (Live straight away)
2. Strip dashes; stats strip renders without JavaScript. (Live straight away)
3. On `/home-v2`: hero copy, buttons, hero animation, navigation.
4. PassSystem (A) replacing ProcessFlow and FrameworkTest.
5. NotATool, SignalSheet (B), AiFollowUp (C), ChannelStack (D); cut VsTable, shrink InfraBento.
6. TrialFlow (E); `/trial` with the form, routing and webhook. (Page live when done)
7. WhoIsThisFor, PricingTeaser, FAQ; swap `/home-v2` into `/`.
8. `/pricing`; calculator `/packages` 301, `/sprint` at $2,950, `/trials` renamed or retired.
9. `/pass-system`, then the `/industries/[slug]` template with healthcare first.
10. Blog and site cleanup above.
11. Phase 2: infra.bleedai.com.

## Done when

- `/` is the new homepage, live, and `/home-v2` is gone.
- Zero em or en dashes on either site (grep the build output).
- None of the four banned phrases on the pitch routes (hero, nav, homepage headings, /pricing, /trial). The blog is exempt.
- Every number and quote is on the proof sheet. Claude checks the copy before launch if asked.
- Each animation's reduced-motion version shows the finished state; no pinning on touch; no horizontal scroll at 375px.
- Old service URLs return 301. /pricing, /trial, /pass-system and /industries/healthcare are in the sitemap.
- The trial form posts, lands in Slack, and shows the right next step for all three routes (test each once).
- The Sprint reads $2,950 on bleedai.com and on the calculator; Growth still reads $3,350.
- You tell Taha it is live, so his review task (2026-10-30) can start.

## Already decided, do not reopen

- Hero layout stays; only words and one animation change.
- No "Free" plan card; no performance prices; no paid ads or content shown as channels we run.
- Scale includes 150 direct mail cards a month, at cost above that.
- One page per industry, never one per market pair.
- The launch does not wait for Taha's new video.

## Claude does these, not you

Industry JSON files for every live pair, the /pass-system timeline from a real pair readout, the proof check of the final copy, the reply agent update to link `/industries/{slug}` and `/trial`, and the first trial result card once Countfire reads out. Ask Taha to start a session for them when the templates exist.
