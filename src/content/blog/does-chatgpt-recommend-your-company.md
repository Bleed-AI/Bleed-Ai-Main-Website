---
title: "Does ChatGPT Recommend Your Company? How to Check, and How to Fix It"
excerpt: "Your buyers are asking ChatGPT who to hire before they ever talk to sales. Here is how to see what it tells them about you in an afternoon, why some companies get named and others do not, and what changes the answer."
metaTitle: "Does ChatGPT Recommend Your Company? Check and Fix It"
metaDescription: "A practical guide for B2B founders: run the 20 buyer questions check on ChatGPT, Claude, Perplexity and Google's AI, see why you are missing, and fix it."
keywords:
  - does chatgpt recommend my company
  - how to get recommended by chatgpt
  - ai search visibility
  - chatgpt recommendations b2b
  - how to show up in chatgpt answers
  - ai search for b2b companies
banner: "/images/blog/does-chatgpt-recommend-your-company.png"
date: "2026-10-31"
author: "Taha Anwar"
noindex: false
faqs:
  - question: "How do I find out if ChatGPT recommends my company?"
    answer: "Write 15 to 25 questions the way your buyers would ask them, describing their problem and constraints rather than naming you. Run each one in ChatGPT, Claude, Perplexity and Google's AI from a logged-out or clean session. For each answer, note whether you are named, your position, which pages the assistant cited and which competitors it named. That first run is your baseline."
  - question: "Why does ChatGPT recommend my competitors and not me?"
    answer: "ChatGPT search looks things up on the web, reads a handful of pages and sums them up. If the pages it finds for your buyer's question are review sites, marketplace listings and roundup articles that name your competitors and not you, the answer will not name you either. In our own check, the one company that was named first was cited from its marketplace listing, not its blog."
  - question: "Can I pay to be recommended by ChatGPT?"
    answer: "We have not found a way to buy a place inside the answer itself. What you can do is make sure its search can reach your site, publish clear answers to the exact questions buyers ask, and get mentioned on the third-party pages it already cites."
  - question: "How long does it take to get recommended by AI assistants?"
    answer: "Expect no mentions in the first month. In months two and three, articles get indexed and first mentions on narrow, specific questions become possible. By month six you should see a measured trend across your question set. Broad questions like best software for X take longer, and nobody can promise being the recommendation by a set date."
  - question: "Does blocking GPTBot stop ChatGPT from recommending me?"
    answer: "No. GPTBot collects training data. The crawler that decides whether you can appear in ChatGPT search answers is OAI-SearchBot. OpenAI's own documentation says sites opted out of OAI-SearchBot will not be shown in ChatGPT search answers. Check your robots.txt for both."
  - question: "Do llms.txt, schema markup or special formatting get me cited?"
    answer: "We found no good evidence that any of them changes which pages AI assistants cite. FAQ markup is cheap and helps Google, so add it if you like. The things with evidence behind them are being reachable by each assistant's search, answering one specific question clearly with real numbers and sources, and being mentioned on other sites."
  - question: "Is a small company at a disadvantage in AI answers?"
    answer: "Less than you would think. In a Semrush survey of 519 B2B buyers, only 7% said they notice a vendor in an AI answer because they recognise the name, while 53% notice one that closely matches their use case. Being described precisely for the buyer's exact problem matters more than being famous."
---

<div class="not-prose my-6 p-5 sm:p-6 rounded-2xl border border-[#B1130F]/30 bg-gradient-to-br from-[rgba(177,19,15,0.10)] via-[rgba(177,19,15,0.04)] to-transparent">
  <div class="text-xs font-semibold tracking-wider uppercase text-[#B1130F] mb-2">TL;DR</div>
  <ul class="space-y-2 text-[var(--text-secondary)] leading-relaxed text-sm sm:text-base">
    <li>• <strong class="text-[var(--text-primary)]">Buyers are asking.</strong> 51% of B2B software buyers now start research in an AI chatbot more often than Google (G2, 1,076 buyers).</li>
    <li>• <strong class="text-[var(--text-primary)]">You can check it yourself in an afternoon</strong> with 20 questions in your buyers' own words, run across four assistants.</li>
    <li>• <strong class="text-[var(--text-primary)]">The answer comes from the pages the assistant reads.</strong> In our own check, the company named first was cited from its marketplace listing.</li>
    <li>• <strong class="text-[var(--text-primary)]">The fixes with evidence:</strong> be reachable by each assistant's search, answer one buyer question per page with real sources, get named on the lists and review sites AI already cites.</li>
    <li>• <strong class="text-[var(--text-primary)]">It is slow.</strong> Plan on months, and be suspicious of anyone who promises a date.</li>
  </ul>
</div>

Plenty of B2B founders have never checked what ChatGPT says about them. Meanwhile their buyers are asking an assistant who to hire or which tool to buy, and they have no idea whether their name comes up.

The good news is that this is easy to check, and the reasons a company gets named or skipped can be traced. This guide covers both: a do-it-yourself check you can run this week, and what moves the answer once you know where you stand.

## Are your buyers really asking ChatGPT?

For B2B software, the surveys say yes, and in large numbers. Both studies below were run by vendors with a stake in the answer, so read them as a direction.

- **51% of B2B software buyers** now start their research with an AI chatbot more often than with Google, up from 29% a year earlier. **69%** say a chatbot surfaced information that led them to a different vendor than they expected. ([G2, The Answer Economy, March 2026](https://learn.g2.com/g2-2026-ai-search-insight-report), survey of 1,076 buyers.)
- **66%** of AI-using B2B buyers have noticed vendors missing from AI results. After an AI mention, **71%** visit the vendor's site and **63%** Google the company. ([Semrush, How AI tools shape the B2B buying process, 2026-07-08](https://www.semrush.com/blog/how-ai-shapes-b2b-buying/), 519 US B2B professionals.)

That last pair matters. Buyers take the shortlist the AI gives them and go check those names. If you are not on the shortlist, you never get checked.

And for a smaller company there is real hope in the same Semrush survey: only **7%** said they notice a vendor in an AI answer because they recognise the name. **53%** said they notice one that closely matches their use case, and **50%** one with a clear, detailed description. The assistant rewards a precise description of the buyer's problem.

## How AI assistants decide who to name

When a buyer asks a question that needs current information, the assistant searches the web, reads a handful of pages, and writes an answer from them, usually with links to what it read. If the pages it finds mention your competitors and not you, the answer will mention your competitors and not you.

Two details that most people miss:

**Each assistant searches a different index.**

| Assistant | Where it searches |
|---|---|
| ChatGPT search | OpenAI's own crawler, `OAI-SearchBot`, plus third-party search providers. Reporting in 2024 found its results closely tracked Bing. ([OpenAI bots documentation](https://developers.openai.com/api/docs/bots)) |
| Claude | Brave Search ([TechCrunch, 2025-03-21](https://techcrunch.com/2025/03/21/anthropic-appears-to-be-using-brave-to-power-web-searches-for-its-claude-chatbot/)) |
| Perplexity | Its own index and crawlers |
| Gemini and Google AI Overviews | Google's index |

So you need to be findable in Google, in Bing, and by Brave's and Perplexity's crawlers. Being on page one of Google alone does not cover ChatGPT or Claude.

**The pages that get read are often on other sites.** For B2B software questions, a large share of citations go to review sites, marketplaces, forums and roundup articles. One study of 1,739 citations across 128 B2B software queries found ChatGPT cited vendor pages 24% of the time against 12% for Perplexity, which means what wins one engine does not automatically win another. ([Growfusely, 2026-07-28](https://growfusely.com/blog/ai-citation-analysis-b2b-software/).)

## What we saw when we checked three B2B companies

On 26 October 2026 we asked ChatGPT one buyer question for each of three B2B software companies in different markets. We used the OpenAI API with live web search turned on (model gpt-5.4-mini), one run per question, and asked for a top 3 to 5. These were the questions, in the words a buyer would use:

- "What is the best barcode scanning app for Salesforce? We want to scan assets and inventory straight into Salesforce records."
- "What is the best compensation management software for a 300-person tech company that still runs comp cycles in spreadsheets?"
- "What is the best construction accounting and job costing software for a mid-size specialty subcontractor in the US?"

| Company | Named? | What the answer was built from |
|---|---|---|
| A Salesforce barcode app | **Yes, #1**, called "best all-around choice" | Salesforce AppExchange listings, including its own, with its rating |
| A compensation software company | **No** | Gartner reviews, G2 reviews and G2 category pages |
| A construction accounting vendor | **No** | G2 category pages, a G2 roundup article, Software Advice |

One named, two missing. Three questions is a tiny sample and we would not generalise from it. But the pattern in the citations is the useful part. The company named first got there through its marketplace listing. ChatGPT read the AppExchange marketplace, found a strong listing with a high rating, and ranked it first. The two missing companies may well be good products. The review and roundup pages ChatGPT happened to read for those questions simply did not put them in front.

That is the whole game in one table. The assistant repeats what the pages it reads say.

<div class="not-prose" style="margin:1.5rem 0;padding:0.95rem 1.25rem;border-radius:12px;border-left:3px solid #3b82f6;background:rgba(59,130,246,0.05)">
  <div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#3b82f6;margin-bottom:0.35rem">Good to know</div>
  <p style="margin:0;color:var(--text-secondary);line-height:1.6;font-size:0.95rem">The API with web search and the ChatGPT app can give different answers to the same question, and so can two runs a day apart. That is why a one-off check is a starting point. The useful version is the same question set, run the same way, every month.</p>
</div>

## The do-it-yourself check: 20 buyer questions

You can run this yourself in an afternoon. It is the same method behind our own check, minus the automation.

**1. Write 15 to 25 questions in your buyers' words.** Use the questions a buyer asks before they know you exist. The Semrush survey found 61% of buyers describe their specific use case or problem in their prompts, 56% ask for direct comparisons, and 45% add constraints like budget, features or what it has to work with. So write questions like:

- "What's the best [category] for a [size, industry] company that [specific situation]?"
- "[Competitor] vs alternatives for [use case]?"
- "How do I [the problem you solve] without [the thing they hate]?"
- "Which [category] works with [tool they already use]?"

Pull the wording from your sales calls, your support inbox, Google's autocomplete and the Reddit threads where your buyers complain. Avoid questions so broad that every big brand wins them ("best CRM"). Narrow, specific questions are where a smaller company can get named.

**2. Run each one in four assistants.** ChatGPT, Claude, Perplexity, and Google (AI Overviews or Gemini). Use a logged-out window or a fresh account so your own history does not tilt the answer.

**3. Log five things per answer** in a simple sheet:

| Column | What to write |
|---|---|
| Named? | Yes or no |
| Position | 1st, 3rd, "mentioned in passing" |
| Pages cited | The URLs the assistant linked |
| Competitors named | Every company in the answer |
| How you were described | Copy the sentence, if you were named |

**4. Look at the cited pages too.** This is where the fix comes from. If every answer cites the same two roundup articles and one review site, those three pages decide your market's shortlist. Are you on them?

**5. Date it and keep it.** This first run is your baseline. Run the same questions the same way every month, and you will see whether anything you do moves the needle.

Expect the first run to be humbling. In our three-company check above, two of the three were missing.

## How to fix it: what actually has evidence

There is a lot of noise around this topic and plenty of people selling tricks. Here is what we found holds up, in the order we would do it.

### 1. Make sure the assistants can reach you

Open `yourdomain.com/robots.txt` and look for these names:

| Crawler | What it does | Should you allow it? |
|---|---|---|
| `OAI-SearchBot` | Decides whether you can appear in ChatGPT search answers | Yes, always |
| `ChatGPT-User` | Fetches your page when a user asks about it | Yes |
| `GPTBot` | Collects training data only | Your choice; it does not affect search appearance |
| `ClaudeBot`, `PerplexityBot`, `Bingbot`, `Googlebot` | Crawl for their assistants and search | Yes |

OpenAI's documentation is blunt about the first one: sites opted out of `OAI-SearchBot` will not be shown in ChatGPT search answers. Blocking training bots is fine. Blocking search bots hides you.

Some website builders add a "block AI crawlers" switch, so check your settings as well as the file. Then submit your site to both Google Search Console and Bing Webmaster Tools. Bing matters more than most people assume because of how ChatGPT search has been fed.

### 2. Get named on the pages AI already reads

This is the biggest lever, and step 4 of your check tells you exactly where to aim. For B2B, that usually means:

- **Your marketplace listing and its reviews.** If you sell on AppExchange, HubSpot, Shopify or a similar marketplace, that listing is likely one of the most-read pages about you. Keep it complete and ask happy customers for reviews. Our barcode example above is the proof of how much weight it carries.
- **Review sites** like G2, Capterra and Gartner Peer Insights, for the categories your buyers search.
- **Roundups and comparison articles.** If the same "best X for Y" article keeps getting cited, contact the author with a reason your product belongs on it.
- **Community answers.** Genuine answers in the forums and subreddits your buyers use, written for the thread, under your own name. Never mass-posted.

An analyst summary of a University of Toronto paper points the same way: whether a page ranks in the assistant's own search explained most of the difference in citation, while common on-page tweaks showed no reliable benefit. ([Eric Seufert, 2026-10-17](https://www.linkedin.com/posts/ericseufert_how-can-a-company-get-its-website-linked-activity-7517235041278816256-dnPg), a secondhand summary; we have not read the paper itself.)

### 3. Publish one clear answer per buyer question

Your own articles still count, especially for narrow questions where nobody else has written a good answer. The best measured guidance comes from the GEO paper (Aggarwal and others, accepted to KDD 2024, tested on 10,000 queries): adding **statistics, quotations and cited sources** to a page lifted its visibility in AI answers, with the best methods improving on the baseline by up to 41% on their main measure. **Keyword stuffing made pages worse than doing nothing.** ([arXiv 2311.09735](https://arxiv.org/abs/2311.09735).)

In practice:

- **One article answers one buyer question**, and answers it in the first few lines.
- **Real numbers with their source.** Your own data is the best kind, because nobody else has it.
- **Describe your fit precisely.** Who it is for, what it works with, what it does not do. That matches the 53% of buyers who notice a vendor because it fits their use case.
- **Link your marketplace listing and review pages** from every article.

### 4. Skip the tricks

We looked for evidence that llms.txt files, schema markup or special formatting change what AI assistants cite, and found none. FAQ markup is cheap and helps Google, so there is no harm in it. Just do not pay anyone for it as an AI visibility service.

## What to expect, month by month

This is the timeline we hold ourselves to, and the one you should hold anyone you hire to:

| When | Realistic | Do not expect |
|---|---|---|
| Month 1 | Baseline recorded, site crawlable and submitted, first articles live | Any AI mention |
| Months 2 to 3 | Articles indexed and showing up in Google for long, specific questions; first mentions on narrow questions become possible | Mentions on broad "best X" questions |
| Month 6 | A measured trend across your question set, more mentions on third-party pages | Being "the" recommendation by a set date |

Nobody controls what an assistant says. Anyone who guarantees you will be the number one answer by a date is guessing.

## Want us to run the check for you?

If you would rather not spend the afternoon, we will do it. We run your buyer questions across ChatGPT, Claude, Perplexity and Google's AI, and show you who gets named, which pages the answers were built from, and where you are missing. It is the same check that sits at the start of [Shortlisted](/shortlisted/), our done-for-you service for getting B2B companies named in AI answers.

[Ask us for your free AI visibility check](/shortlisted/). If you want to see the full service working before you pay for anything, it also comes with a [free two week trial](/trial/).
