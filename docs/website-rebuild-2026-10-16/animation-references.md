# Animation references for the website rebuild

Created: 2026-10-16 · Last updated: 2026-10-16 · Author: Claude (research subagent; each site opened in Chrome on 2026-10-16, section scrolled to and screenshotted a few seconds apart)

12 references from 9 live sites. Where only a still frame was seen, the entry says so. Unify, Common Room, Origami, Artisan and the Clay homepage were left out (nothing explanatory, or the visual never loaded). Award galleries were not reached. Read by: `index.html` in this folder (section "Animations").

Concepts: 1 Pass System, 2 signal to buyer row, 3 AI follow-up, 4 many doors, 5 trial flow.

| # | Site, section | Concept | Mechanic | Build (GSAP/CSS) |
|---|---|---|---|---|
| 1 | attio.com, "Speed to lead, every time." (Convert leads step) | 3, 1 | Pinned section; left step list moves its active marker; right side a workflow graph whose node badges go Running to Triggered to Completed, connectors turn blue, an "If" node splits into Enterprise / SMB | Pinned ScrollTrigger scrub, SVG stroke-dashoffset per connector, badge class swaps. M |
| 2 | attio.com, "Your team, amplified." (Build pipeline step) | 2, 3 | "Companies to work" table with ICP score and a signal column ("Hired a new...", "New VP Sales"); a row is checked and a draft follow-up citing the signal slides in with Send / Discard / Save draft | Staggered row fade, checkbox tick, x slide panel. S/M |
| 3 | 11x.ai, "One shared brain. Across every channel." | 4, 3 | Dark theme, red accent. Channel cards (Voice, Email, Human dialer) with live lines ("Tom A., replied in 4 min"); curved connectors converge on "QUALIFIED" then fan out to booked people; a dashed card reads "Still cold. Nothing was sent." Layout verified, connector timing not | SVG beziers drawn on enter, end cards pop. M |
| 4 | 11x.ai, "Unified customer and market context" | 4 | Source pills (CRM, live web signals, website activity, previous interaction) send lines into a wireframe sphere | three.js; flat SVG hub on mobile. M/L |
| 5 | linear.app, "AI and automations" | 3 | Carousel of agent windows: prompt, "Thinking...", "Worked for 10 sec", result card marked Draft; centre in focus, sides dimmed | GSAP state timeline + typewriter. S/M |
| 6 | stripe.com/connect, "Control how funds flow" | 1 (branches), 5 | Tabs swap a node diagram (Buyer, Platform, Seller) with marching chevron arrows; one path per scenario | CSS keyframes chevron strip, tab cross-fade. S |
| 7 | relevanceai.com, "Drive ROI in just weeks with your first team of agents" | 5, 1 | Three timeline cards (Weeks 1-2, Week 3+, Week 4+); active card widens and shows its visual, others shrink to labels | CSS flex-grow transition, tap on mobile. S |
| 8 | granola.ai hero, "The AI notepad for back-to-back meetings" | 2 | Notes type in character by character under a "Transcribing" pill; markup has an "Enhanced" state (not seen playing) | Typewriter then cross-fade to structured. S |
| 9 | clay.com/waterfall-enrichment, "Why use one contact database when you can use them all?" | 2, 4 | Provider 1/2/3 columns, rows get an X or a value, arrow carries the first hit to a final checked column. Still frame only | Staggered cells, arrow draw, check pop. M |
| 10 | resend.com, "Modular webhooks" | 3, 5 | Vertical live event feed (Delivered, Clicked, Complained) with timestamps; new events push old ones up (two captures differed) | setInterval list shift, GSAP Flip. S |
| 11 | ramp.com, "Cards & Expenses that handle themselves" | 3 | Chat bubbles narrate an automation step by step over a card, then loop with a new transaction | Staggered bubbles, looped data. S |
| 12 | ramp.com, "Procure to pay without chasing approvals" | 2 | Files drop into a zone, a draft invoice form fills its fields one by one | y drop, staggered field fill. S/M |

## Recommended pick per concept

Every spec has a reduced-motion branch: `gsap.matchMedia()` with `(prefers-reduced-motion: reduce)` shows the final state, no pin, no loop; CSS loops sit behind `(prefers-reduced-motion: no-preference)`.

1. **Pass System** = Attio pinned step graph (1) + Stripe branch paths (6). Pinned, scrubbed day 0 to day 30 track with four pass nodes that light their channel icons; left rail tracks the active pass; at Pass 1 a reply chip forks into four branches (yes, yes then quiet, not now, remove me). Mobile: vertical, no pin, tappable branch chips.
2. **Signal to buyer** = Granola typewriter (8) into Clay/Ramp fill (9, 12). Job post types in, the key phrase gets a red highlight sweep, the highlight flies (GSAP Flip) into an empty sheet row, cells fill left to right (Company, Signal, Who signs), check lands last. Max 3 rows, then hold.
3. **AI follow-up** = Linear elapsed-time card (5) + Ramp narration (11), then a Resend feed (10). Inbound reply, "Drafting...", "Answered in 3 min", an "Approved" stamp, then the chase feed for a quiet lead with day labels. Triggered once on enter, no scrub. Placeholder names only.
4. **Many doors** = 11x convergence board (3), flat SVG. Account card centre, five doors around it (Inbox, LinkedIn, Desk, Phone, Website form), beziers drawn in stagger, one door pulses red when it opens and the others dim. Mobile: vertical list with a connector line.
5. **Trial flow** = Relevance AI expanding cards (7). Apply, We build the list, We send, You see replies, Then you decide; scroll or tap widens the active card; the last card stays muted until the replies card has been active.

## Anti-patterns

1. Ambient 3D that carries no information (keep three.js out of explanation sections, never on mobile).
2. Scroll-jacking: pin one section at a time, under about 1.5 viewports, never on touch.
3. Loops faster than reading: any loop holds on its final state, and the message also exists as static text.
