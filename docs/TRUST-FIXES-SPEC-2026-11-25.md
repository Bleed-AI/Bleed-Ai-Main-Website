# Website trust fixes: spec (draft for Taha's yes)

Written 2026-11-25 by Claude for Sophiya. Status: DRAFT, not approved. No site code was changed.
Source of the problem: Sophiya's own buyer read of bleedai.com ("bored, did not trust it, could not decide what to pick"), in `campaign-master/clients/bleedai/strategy/team-alignment-2026-11/homework/sophiya.md` (section A, problems 1 to 3).

**Goal:** a first-time buyer sees real people and one strong proof in the first screen, reads about a third of today's words, and can tell the four packages apart in 10 seconds.

**Already covered?** The 13 Nov "Home Restructure Preview" (https://claude.ai/artifact/K5USjwdT1jtjEGdNZ3kxRA) is Sophiya's dashboard, not bleedai.com, so it covers nothing here. The 16 Nov "Hero Makeover" (https://claude.ai/artifact/XM5MXYdBPYDZyB977Zgj7k) removes AI tells from the hero only (no faces, no proof) and is a demo; the live hero still has the "01" label and italic headline. Keep its changes, add this spec on top.

## 1. What moves to the top

| Move | Where it is now | Goes to | Source (live) |
| --- | --- | --- | --- |
| **Faces strip**: 3 client faces with one-line quote and play button | `Testimonials.tsx`, section 8 of 12, about 2,000 words down | Directly under the hero, before the stats | Videos exist: youtube.com/watch?v=ze3G9OwQcUg (Martijn Versteeg, Group Effort), 8sIZ_i7SsRk (Alberto Castiel, Minute Call), zYmFS6kOFsY (Ahmad Jabbir); all three return live via YouTube oEmbed |
| **The 1 best proof**: Martijn Versteeg, face + "Over 100 opportunities in December alone" + "1st confirmed ticket sale through you! The conference sold out, 150 attendees from 10+ countries." | Quote in `Testimonials.tsx`; ticket line in the client wall, also low on the page | Big, left of or inside the faces strip | Same video; wall text in `Testimonials.tsx` |
| **Team row**: Taha, Sophiya, Shahwaiz, name + role | `/about/` only (Sophiya and Shahwaiz shown as initials "SI" and "S") | Founder block, and a thin row under the faces strip | https://bleedai.com/about/ |
| **Stats strip** | Already section 2, kept | Stays, but see gaps 2 and 3 first | `StatsStrip.tsx` |

Rule: one proof per screen, never two stacked. Hero opens clean at the top (no half-scrolled mini header) and gets the centred layout Sophiya suggested (heading in the middle, one visual below); a real ChatGPT / LinkedIn / email-reply screenshot replaces the generic cards in the visual.

## 2. What gets cut

Word counts are from the live homepage HTML on 2026-11-25 (https://bleedai.com/), visible text per section. Today 3,348 words. Target about 1,100.

| Section (id) | Now | Target | What happens |
| --- | --- | --- | --- |
| Hero | 369 | 150 | Drop the five-service run-on paragraph. Keep headline, one line, price line, one button |
| Testimonials ("What Clients Say") | 539 | 90 | Becomes the faces strip above; full videos open on click |
| Replies marquee ("Straight from prospects") | 564 | 120 | Show 3 replies, rest scrolls |
| FAQ | 467 | 150 | 5 questions; the rest live on /pricing/ |
| Demos ("What your buyers actually see") | 328 | 150 | One example visible, three behind tabs; one centred line above the images, "Example: Northwind audit", with Northwind highlighted inside the images |
| Found and Booked | 316 | 0 | Off the homepage. It already sits on /pricing/ as "The mix we suggest first" |
| Campaign snapshots (`results-section`) | 216 | 60 | One best tile on the page; the rest on a /results page |
| Outcomes ("Four results") | 152 | 170 | Rebuilt as the package cards in part 3 |
| How it works ("Three steps") | 107 | 40 | Three icons, 6 words each, with people. Less text, more colour |
| Founder | 101 | 100 | Same words, plus the team row |
| Stats / Final CTA | 22 / 67 | 22 / 40 | Trim CTA only |

The old-site look at the bottom of the page (Sophiya's note) is a separate styling fix, listed under "Not in this spec".

## 3. What each package card shows

Same template for all four packages (Shortlisted, LinkedIn Authority, Outbound, Inbound Engine), on the homepage and the "Step 1" block of /pricing/ (638 words today). Whole card clickable, one link inside the card.

1. **Dream outcome**, one line. Already written in `src/lib/slots.ts`: "Get recommended by ChatGPT", "Become the known name on LinkedIn", "Book meetings with your buyers", "Turn your website into a lead source".
2. **Logos in full colour**: Shortlisted = ChatGPT, Perplexity, Claude. LinkedIn Authority = LinkedIn. Outbound = LinkedIn + email. Inbound Engine = a page screenshot.
3. **Inside**: 3 or 4 services, each with its monthly output (copied from the live pricing page, not retyped).
4. **"We did this, here is the result"**: one line of a real result.
5. **A client review, in their own words**, with name, company and face.
6. **Price** pulled at build time from the pricing source, never typed into this spec or hardcoded in a card.
7. A third accent colour (yellow, a light suggestion from Sophiya) used only on the proof elements, so proof is what stands out.

Per-package content that exists today vs gap:

| Package | Result line (4) | Review (5) |
| --- | --- | --- |
| Outbound | Exists: "Over 100 opportunities in December alone" (Group Effort) | Exists: Martijn Versteeg quote above |
| Shortlisted | **GAP**: no client result on the site. Only the AI study, https://bleedai.com/blog/ai-search-citation-study-2026 (160 AI answers), which is research, not a client result | **GAP** |
| LinkedIn Authority | **GAP** | **GAP** |
| Inbound Engine | **GAP** | **GAP** |

Until Founding Five testimonials arrive, gap slots show nothing. No invented quote, no "example" review dressed as real.

## Gaps and things not verified (read before approving)

1. **Testimonials for 3 of 4 packages do not exist yet** (Founding Five, `docs/company-direction.md`). The cards ship with 1 of 4 filled, the rest fill in as they arrive.
2. **Stats disagree on the same page.** The strip says "$796K+ pipeline created", while one campaign tile on the homepage says "529 opportunities, $942K pipeline" (`ResultsMarqueeTest.tsx`). Both cannot be the total. Taha to say which is right before the strip moves up.
3. **Review claims not confirmed.** The hero says "Rated 5.0 on TechReviewer" with five stars, but the live TechReviewer page (https://techreviewer.co/companies/bleed-ai) shows "Not enough reviews yet". Clutch (https://clutch.co/profile/bleed-ai) returned 403 to a script, so unchecked. "85+ 5-star reviews" has no source I could open (Upwork is the likely one). Fix or drop before this goes higher on the page.
4. **Replies marquee provenance** (names like "Marcus Avery", marcus@averylabs.com) is not documented in the repo. The section says "not edited". Taha confirms they are real, or they get a plain label, before we feature more of them.
5. **Pricing:** I did not copy any price. calculator.bleedai.com, as fetched, shows the one-time outbound calculator and "Loading calculator", not the monthly per-service model that /pricing/ shows. Sophiya or Taha confirm the pricing source the cards read from.
6. **Photos:** only Taha has a photo on the site. Sophiya and Shahwaiz need photos (their call), and the three client photos need permission confirmed (Martijn's is hotlinked from groupeffort.nl; copy it to `/public`).
7. **Word-count benchmark vs top sites** (Sophiya's idea) was not done. The 1,100 target is my estimate, not benchmarked.
8. **Hero "opens scrolled"** is from Sophiya's homework; I did not reproduce it in a browser.
9. No buyer test. Cleaner and shorter is not proven to book more calls; judge it by the booked-call rate after the preview.

## Not in this spec (next)

The 20-services menu with a "What brought you here?" first-step form, the build-your-plan page, the bottom-of-page styling and the third accent colour system. Each is a follow-up once Taha says yes here.

## Next steps

1. Taha says yes (Sophiya sends the note). 2. Claude builds a preview from this file, no deploy. 3. Taha approves the preview.
