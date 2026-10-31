---
title: "How Long Should a Cold Email Be? We Found a Cliff at Microsoft"
excerpt: "We sent six email bodies from 54 to 173 words to a seed panel. Gmail did not care. Outlook went from 90% inbox at 58 words to 0% at 173. Here is the data, the caveats, and how to cut your own email under the line."
metaTitle: "How Long Should a Cold Email Be? Microsoft Spam Data"
metaDescription: "Our placement tests: 58 words landed 89.8% in Microsoft inboxes, 173 words 0%. Check if your list is Microsoft-heavy and cut your email to fit."
keywords:
  - how long should a cold email be
  - cold email length
  - cold email going to spam outlook
  - microsoft spam filter cold email
  - cold email word count
  - inbox placement test
banner: "/images/blog/cold-email-length-microsoft-spam.png"
date: "2026-10-31"
author: "Taha Anwar"
noindex: false
faqs:
  - question: "How long should a cold email be in 2026?"
    answer: "If a real share of your list sits on Microsoft 365, keep every step under about 77 words, counting the greeting and the signature. In our placement tests, 54 and 58 word emails landed 85% to 90% in Microsoft inboxes, 77 words landed 56%, and 84 words landed 9.5%. Gmail showed no relationship to length across the same range, so shorter costs you nothing there."
  - question: "Does email length affect Gmail deliverability?"
    answer: "Not in our tests. Across six bodies from 54 to 173 words, Google seed inboxes landed between 79.6% and 98.5% with no pattern by length. The differences we did see at Google came from wording and formatting. Sending the same body as plain text instead of HTML lifted Google from 92.1% to 98.4%."
  - question: "Why are my cold emails going to spam in Outlook but not Gmail?"
    answer: "Length is the first thing to check. When we split seven of our own tests of the real copy by provider, Google was 98% to 100% inbox on every one and Microsoft was 0% on every one, from the same mailboxes in the same hour. The emails were around 170 words. Cutting the same content to 54 words brought Microsoft back to 85%. Domains, authentication, HTML, our brand name and the call to action were each tested and ruled out."
  - question: "How do I know what share of my list uses Microsoft 365?"
    answer: "Look up the MX record of each domain on your list. If it ends in mail.protection.outlook.com, that company's mail runs on Microsoft. If you send through Instantly, each lead carries an esp_code field that does this for you. Count anything you cannot classify as Microsoft risk, because an unknown that turns out to be Microsoft is a silent loss."
  - question: "Do shorter cold emails get fewer replies?"
    answer: "Not in our data. Across 24 clean same-time A/B tests covering about 37,000 people, the shorter and longer variants replied at 0.62% and 0.66%, which is no real difference. What did change was reply quality: bare 20 to 30 word questions drew mostly no-thanks replies. Keep the line that says what you offer and cut the scaffolding around it."
  - question: "Does the signature count toward the word limit?"
    answer: "Yes. Most sending tools render the signature inside the body, so the filter sees it. Ours is 5 words and it was missing from every count we took before September 2026. Count every follow-up step too. One of our second emails rendered to about 97 words and nobody had checked it."
  - question: "Is the 77 word limit a hard rule for every sender?"
    answer: "No. It is what our seed panel showed for our mailboxes and our copy on one day in September 2026. A different sender ran an email of about 145 words through a real placement test and landed 94.4% at Microsoft. Treat the number as a strong default, then run a placement test on your own email from your own domains before you trust any length."
---

<div class="not-prose my-6 p-5 sm:p-6 rounded-2xl border border-[#B1130F]/30 bg-gradient-to-br from-[rgba(177,19,15,0.10)] via-[rgba(177,19,15,0.04)] to-transparent">
  <div class="text-xs font-semibold tracking-wider uppercase text-[#B1130F] mb-2">TL;DR</div>
  <ul class="space-y-2 text-[var(--text-secondary)] leading-relaxed text-sm sm:text-base">
    <li>• <strong class="text-[var(--text-primary)]">At Microsoft, length decided where our email landed.</strong> 58 words: 89.8% inbox. 77 words: 55.9%. 84 words: 9.5%. 173 words: 0%.</li>
    <li>• <strong class="text-[var(--text-primary)]">At Google, length did nothing.</strong> 79.6% to 98.5% across the whole range, with no pattern.</li>
    <li>• <strong class="text-[var(--text-primary)]">The drop is sudden.</strong> It sits somewhere between 77 and 89 words, so plan against a ceiling and stay well under it.</li>
    <li>• <strong class="text-[var(--text-primary)]">Check your list first.</strong> Our own lists ran 12% to 50% Microsoft. The more Microsoft, the tighter the limit.</li>
    <li>• <strong class="text-[var(--text-primary)]">Shorter did not cost replies</strong> in 24 clean A/B tests, as long as the short version still said what we offer.</li>
  </ul>
</div>

Most advice on cold email length is about persuasion. We had opinions on that too, until September 2026, when we found out a lot of our emails were never seen at all.

Four of our own campaigns were live and the replies were lower than the lists deserved. Eight inbox placement tests had run overnight. Read as a blended number they looked fine, somewhere between 59% and 79% inbox. Split by mailbox provider, every test of the real copy said the same thing: Google 98% to 100% inbox, Microsoft 0%.

So we paused the campaigns and ran a ladder: the same pitch, one change at a time, to find out what Microsoft was reacting to. It turned out to be length. This post is that data, what it does and does not prove, and the steps we now run on every email before it goes out.

## What we tested, and how

An inbox placement test sends your email to a panel of seed mailboxes the testing tool controls, then reports which folder it landed in at each one. We used Instantly's placement testing with a panel of 84 seed inboxes, roughly two thirds Google and one third Microsoft.

The setup for the ladder:

- **42 of our warmed sending mailboxes**, across four domains, all the mature ones we had.
- **The same 84-seed panel** for every body.
- **The same subject line** on every body, so only the body changed.
- **One variable per body.** Plain text versus HTML, brand name removed, bullets turned into prose, one idea instead of three, prospecting jargon stripped, and length.
- Each result is counted in sender-and-seed pairs. A first-round body produced about 700 pairs, 210 to 260 of them at Microsoft. Second-round bodies produced about 190, with 61 to 72 at Microsoft.

The full record lives in our internal campaign notes. Every number below comes from it, from our copy rules file, or from the length gate that now runs in our sending code.

## The results: the same email at six lengths

Here is every body from both rounds, lined up by word count. Word counts include the greeting and the signature, because that is what the filter sees.

| Words | Microsoft inbox | Google inbox | What the body was |
|---:|---:|---:|---|
| 54 | **85.2%** (52 of 61) | 92.6% | Our real pitch, cut down, every piece of jargon kept |
| 58 | **89.8%** (203 of 226) | 88.1% | A short placeholder body, used as a control |
| 77 | **55.9%** (38 of 68) | 98.3% | The placeholder plus a real company name and one specific claim |
| 84 | **9.5%** (24 of 253) | 81.0% | One idea instead of three |
| 153 | **3.1%** (2 of 64) | 98.5% | Three ideas, all prospecting jargon stripped |
| 173 | **0.0%** (0 of 72) | 95.3% | The live campaign email, unchanged |

Three things jump out.

**Microsoft falls off a cliff.** 77 words still landed more than half the time. 84 words landed one time in ten. That is a seven word difference and a 46 point drop. Somewhere between 77 and 89 words, Microsoft stops trusting the email.

**Google does not care.** The Google column wanders between 81% and 98.5% with no link to length. The two lowest Google results came from bodies where we changed the wording and formatting.

**The control repeated.** The 173 word live email scored 0 of 225 at Microsoft in round one and 0 of 72 in round two. That repeat is what lets us put both rounds on one axis.

<div class="not-prose" style="margin:1.5rem 0;padding:0.95rem 1.25rem;border-radius:12px;border-left:3px solid #3b82f6;background:rgba(59,130,246,0.05)">
  <div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#3b82f6;margin-bottom:0.35rem">Read both columns</div>
  <p style="margin:0;color:var(--text-secondary);line-height:1.6;font-size:0.95rem">A blended inbox rate hides this whole finding. Our eight overnight tests read as a 59% to 79% spread and looked like a copy quality problem. Split by provider, Google was carrying every one of them and Microsoft was zero on every test of the real copy. If your placement tool shows one number, find the per-provider view before you change anything.</p>
</div>

## What it was not

The reason we trust the length reading is that the other suspects were tested one at a time and each one failed to move Microsoft.

- **Domains, authentication and warm-up.** The same four domains delivered the 58 word placeholder to Microsoft 90% of the time, from the same mailboxes in the same hour they sent the long email to spam. Infrastructure that bins one body and delivers another is not the problem.
- **HTML.** The identical body sent as plain text scored 1 of 228 at Microsoft. No change there. (It did help at Google, more on that below.)
- **Our brand and the ask.** Removing "Bleed AI" from the sign-off and swapping the call to action scored 0 of 263.
- **Bullets.** The same sentences written as prose scored 0 of 231 at Microsoft and got worse at Google.
- **Spammy vocabulary.** This was the leading suspect, and it was wrong. A 153 word version with every "target", "B2B SaaS" and "hiring on LinkedIn" removed scored 3%. A 54 word version that kept all of those words scored 85%.

One smaller effect did survive. At similar lengths, dense, specific commercial copy did worse than vague copy: 84 words of our real pitch scored 9.5% while 77 words of filler scored 55.9%. The lesson we took: spend the word budget on the idea and cut everything around it.

## How much to trust this

We want to be straight about the limits, because placement data is easy to over-read.

- **It is one ladder, run on one day (2026-09-01),** from our mailboxes, to one seed panel, with one subject line.
- **The second-round samples are small.** 61 to 72 Microsoft pairs per body. The effects are large enough that this does not change the direction (85% against 0% is not noise), but the exact percentages would move on a rerun.
- **A seed panel is not your buyer's mailbox.** Corporate Microsoft tenants run their own rules on top of Microsoft's. Our own operating notes treat a placement test as a smoke test.
- **Other senders can see something different.** A different sender ran a real placement test on an email of about 145 words, from their own domains, for a warm-list campaign, and measured 94.4% at Microsoft and 100% at Google. A length rule is a model fitted to our ladder. A direct measurement of your own email beats it every time.

So treat the numbers as a strong default and a reason to test. In our own sending we hold the line, because the cost of being wrong is a campaign nobody sees.

## Step 1: find out how Microsoft-heavy your list is

The limit only costs you what your list is made of. A list that is 3% Microsoft can carry a long email. A list that is 50% Microsoft cannot. Here is what we measured on our own lists in September 2026:

| List | Leads measured | Microsoft share |
|---|---:|---:|
| Pooled across one 4-arm campaign | 2,348 | 26.4% |
| The most Microsoft-heavy arm of that campaign | (subset) | 50.3% |
| Software marketplace vendors | 2,123 | 31.8% |
| SaaS founders from launch sites | 2,764 | 11.9% |

Three client lists we measured in September and October 2026 ran between 51% and 57% Microsoft. In our data the young software founders were the most Google-heavy list, and the lists of more established businesses were the most Microsoft-heavy. Do not guess yours from that, measure it.

**How to check yours:**

1. **Pull the MX record for each domain.** Any DNS lookup works (`nslookup -type=mx domain.com` on the command line, or a free MX lookup site for spot checks).
2. **Classify it.** If the MX host ends in `mail.protection.outlook.com`, that domain's mail runs on Microsoft 365. If it ends in `google.com` or `googlemail.com`, it is Google Workspace.
3. **Treat security gateways as unknown.** Hosts like `pphosted.com` (Proofpoint) or `mimecast.com` sit in front of the real mailbox, which is very often Microsoft. You cannot see behind them.
4. **Count unknowns as Microsoft.** An unknown that turns out to be Microsoft costs you the whole send. An unknown that turns out to be Google costs you nothing by being short.
5. **If you send through Instantly,** every lead already carries an `esp_code` field (1 is Google, 2 is Microsoft). Export your leads and count.

Then pick your ceiling. This is the rule our sending code enforces before any campaign can be created:

| Microsoft plus unknown share | Hard ceiling, worst case | Why |
|---|---:|---|
| 30% or more | **77 words** | 84 words measured 9.5% at Microsoft |
| 10% to 30% | **89 words** | Real exposure, and the drop sits between 77 and 89 |
| Under 10% | **120 words** | Length is a soft constraint at this mix |

Treat these as ceilings. The only lengths we measured landing well at Microsoft were 54 and 58 words. We aim for about 65.

## Step 2: count words the way the filter does

Most people undercount their emails. We did, for months. Three habits fixed it.

**Count the signature.** Most sequencers render the signature inside the body. Ours ("Taha, Founder @ Bleed AI") is 5 words, and it was missing from every count we took before 2 September 2026.

**Count the worst case.** If you personalise with variables, a single variable can swing a lot. One of our intro lines ranged from 18 to 38 words inside one campaign. If you check the median, the long tail of your list goes to spam. Take the longest value each variable holds on your list. If you use spintax, count the longest option in every group.

**Count every step.** All our attention went to email 1. Email 2 of the same sequence rendered to about 97 words and had never been counted, so two thirds of the sequence was over the line while we fixed the first third.

## Step 3: cut it to fit, with a word budget

The cut is easier if you give every part of the email a budget before you write it. Here is the one we use for a three-idea email:

| Part | Words |
|---|---:|
| Greeting | 2 |
| Call to action | 9 |
| Sign-off | 1 |
| Signature | 5 |
| **Fixed scaffolding total** | **17** |
| Intro line | 12 at most |
| Each idea | 8 to 12 |
| **Whole email** | **about 65** |

We set this budget too loose twice before we measured properly, first at 25 to 35 words per idea, then at 14 to 18. Both produced emails our own ladder puts in the spam folder.

Some cuts that keep coming up:

- **Drop the throat clearing.** "I came across your company and noticed that..." is 8 words of nothing.
- **Say the company name once.**
- **Cut the "because" clause from each idea** unless it is the whole point.
- **Shorten the call to action.** "Want me to send it?" does the job of "Would you be open to me sending over the full write-up I put together?"
- **One proof point is enough.**

What we would not cut: the line that says what you offer. More on why below.

## Before and after: our own email

This is the real email from that campaign, with the prospect's name and company swapped out. It is 173 words with the signature, and it landed **0 of 72** at Microsoft.

<div class="not-prose" style="margin:1.25rem 0;padding:1.1rem 1.25rem;border-radius:12px;border:1px solid rgba(239,68,68,0.3);background:rgba(239,68,68,0.04)">
  <div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#ef4444;margin-bottom:0.5rem">Before: 173 words, 0% Microsoft inbox</div>
  <p style="margin:0 0 0.6rem 0;color:var(--text-secondary);line-height:1.6;font-size:0.92rem">hey Sam,</p>
  <p style="margin:0 0 0.6rem 0;color:var(--text-secondary);line-height:1.6;font-size:0.92rem">Acme helps teams turn customer conversations into usable product and go to market insight, and they already show proof and pricing in the open, so a few buyer angles stand out:</p>
  <ul style="list-style:disc;margin:0 0 0.6rem 1.1rem;padding:0;color:var(--text-secondary);line-height:1.6;font-size:0.92rem">
    <li>Target founders, CEOs, and heads of product at 20 to 200 person B2B SaaS companies who own roadmap decisions and customer research. They feel the pain of scattered feedback, and Acme fits the people closest to product truth.</li>
    <li>Target companies hiring for product operations, customer research, or user insights roles on LinkedIn in the last 60 days. That hire usually means they are formalizing how customer input gets captured, which makes a conversation intelligence layer timely.</li>
    <li>Target customer success leaders at 100 to 500 person SaaS companies with high-touch accounts and recurring renewal risk. They already sit on a lot of customer feedback, and Acme gives them a cleaner way to surface themes without extra manual work.</li>
  </ul>
  <p style="margin:0 0 0.6rem 0;color:var(--text-secondary);line-height:1.6;font-size:0.92rem">Put the whole strategy doc together for Acme already. Want me to send it?</p>
  <p style="margin:0;color:var(--text-secondary);line-height:1.6;font-size:0.92rem">Best regards,<br/>Taha, Founder @ Bleed AI</p>
</div>

And this is the cut. Same offer, same company facts, same jargon, same sign-off. It is 54 words and it landed **52 of 61** at Microsoft (85.2%).

<div class="not-prose" style="margin:1.25rem 0;padding:1.1rem 1.25rem;border-radius:12px;border:1px solid rgba(34,197,94,0.3);background:rgba(34,197,94,0.05)">
  <div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#22c55e;margin-bottom:0.5rem">After: 54 words, 85.2% Microsoft inbox</div>
  <p style="margin:0 0 0.6rem 0;color:var(--text-secondary);line-height:1.6;font-size:0.92rem">hey Sam,</p>
  <p style="margin:0 0 0.6rem 0;color:var(--text-secondary);line-height:1.6;font-size:0.92rem">Acme turns customer conversations into product insight. Target founders and heads of product at 20 to 200 person B2B SaaS companies who own roadmap decisions, because scattered feedback is their daily problem.</p>
  <p style="margin:0 0 0.6rem 0;color:var(--text-secondary);line-height:1.6;font-size:0.92rem">Put the whole strategy doc together for Acme already. Want me to send it?</p>
  <p style="margin:0;color:var(--text-secondary);line-height:1.6;font-size:0.92rem">Best regards,<br/>Taha, Founder @ Bleed AI</p>
</div>

What changed: the long description became one clause, three ideas became one, and the "because" stayed only where it carried the point. Nothing about the vocabulary changed, which is exactly why this pair killed the jargon theory for us.

If you need all three ideas, it can still be done inside the budget. Our rewrite kept three ideas at 8 to 12 words each, and it reads tighter than the original.

## Does cutting cost you replies?

This was the worry we heard most from our own team, so we checked it against every email 1 we have sent across six sending workspaces.

- **24 clean same-time A/B tests** where a shorter and a longer email 1 went out in the same week to an even split: about 37,000 people in total. The shorter variants replied at **0.62%**, the longer at **0.66%**. Statistically no difference (p = 0.63). Shorter won 11, longer won 9, 4 were ties.
- **Very short questions bring the wrong replies.** On one list, a 27 word bare question got 2.5 times the reply rate of the longer email, and zero of its 9 repliers said yes. Most were "we don't use that". The longer email's two good replies were referrals to the right person.
- **A personal detail mattered more than length.** In one same-offer, same-week pair, a short email with a real personal number replied at 0.67% and a short email with nothing personal at 0.23%.

So the rule we work to now: stay under the ceiling, and inside it write 45 to 70 words that name what you do, carry one personal detail and ask one question. Do not cut all the way down to a bare question with no offer in it.

## One more free win: send plain text

The plain text test did nothing at Microsoft, but it was the only change in round one that clearly beat the control at Google: **92.1% to 98.4%**, on the identical body. Turn HTML off in your sequencer for cold steps. It costs nothing and it is one of the few placement changes we have seen that is both real and free.

## The checklist we run on every email

<div class="not-prose" style="margin:1.75rem 0;padding:1.25rem 1.5rem;border-radius:14px;border:1px solid rgba(59,130,246,0.3);background:rgba(59,130,246,0.06)">
  <div style="margin-bottom:0.5rem;font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#3b82f6">Before any email goes out</div>
  <ol style="margin:0.5rem 0 0 1.25rem;padding:0;color:var(--text-secondary);line-height:1.8">
    <li>Measure the list's Microsoft share from MX records. Count unknowns as Microsoft.</li>
    <li>Pick the ceiling: 77 words at 30% or more, 89 at 10% to 30%, 120 under 10%.</li>
    <li>Render every step at its worst case, signature included, longest variable value, longest spintax option.</li>
    <li>Cut to about 65 words. Keep the offer line and one personal detail.</li>
    <li>Plain text on, open tracking off, no links in email 1.</li>
    <li>Run one placement test on the real body from the real mailboxes, and read Google and Microsoft separately.</li>
  </ol>
</div>

We moved the length rule into code after writing it in a doc and watching the next batch come out at 86 to 97 words anyway. If you run your own sending, a spreadsheet column with the worst-case word count of each step does most of the same job.

If you would rather have someone else hold the line on this, it is part of how we run [outbound for clients](/outbound/): the list is checked for Microsoft exposure, every step is gated on worst-case length, and placement is read per provider before anything scales. You can also see it working on your own market first with a [free two week trial](/trial/).
