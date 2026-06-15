"use client";

import Reveal from "@/components/Reveal";

const replies: { name: string; addr: string; body: string; redact?: string[] }[] = [
  { name: "Marcus Avery", addr: "marcus@averylabs.com", body: "Thanks for putting this together! Seriously impressed by the depth of your research and how well you mapped out the tech landscape for Averylabs. Let's stay in touch.", redact: ["Averylabs"] },
  { name: "Mateo Ferraro", addr: "mateo@novapeak.com", body: "This looks interesting, let me connect you with my Head of Growth who is running this internally so he can consider having you guys help us on this." },
  { name: "Julien Mercier", addr: "julien@mercierstudio.com", body: "Impressive report! Sure, send me your Calendly link and I'll book a call. Thank you!" },
  { name: "Mike Sullivan", addr: "mike@sullivangroup.com", body: "Thanks for putting it together, looks like a solid assessment. Booked a call on Thursday 10am ET." },
  { name: "Louis Fontaine", addr: "louis@fontaine.co", body: "That segmented approach sounds really smart, especially given our bandwidth issues. Send over your Calendly link and I'll find a slot next week." },
  { name: "Ryan Caldwell", addr: "ryan@caldwellco.com", body: "I appreciate the effort you put into developing these specific angles. The performance metrics for the creator segment are particularly compelling." },
  { name: "Adam Whitfield", addr: "adam@whitfieldhq.com", body: "Ok I went through the report and your website. Happy to chat over a call. Please send across the Calendly link." },
  { name: "Tom Devlin", addr: "tom@devlinanalytics.com", body: "Hey Taha, please send across the Calendly link. Happy to chat through what you sent.", redact: ["Taha"] },
  { name: "Damien Cole", addr: "damien@coleops.com", body: "Hi Taha, let's discuss this over a call. Send me your Calendly link.", redact: ["Taha"] },
  { name: "Sam Porter", addr: "sam@porterlink.com", body: "Thanks, I'll take a look and please share your Calendly link." },
  { name: "Luc Bertrand", addr: "luc@bertrandstudio.com", body: "Interesting, would you be willing to collaborate on a commission basis? Of course it would be an interesting commission. Let me know.", redact: ["on a commission basis? Of course it would be an interesting commission. Let me know."] },
];

function renderBody(body: string, redact?: string[]) {
  if (!redact || !redact.length) return body;
  const pattern = new RegExp(`(${redact.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  return body.split(pattern).map((part, i) =>
    redact.includes(part) ? (
      <span key={i} className="email-redact">{part}</span>
    ) : (
      part
    )
  );
}

export default function RepliesMarquee() {
  return (
    <section id="replies-section">
      <div className="sec dark">
        <div className="sec-inner">
          <Reveal className="email-label-row">
            <span className="email-live-dot" />
            <span className="sec-label" style={{ margin: 0 }}>Straight from the inbox</span>
          </Reveal>
          <Reveal as="h2" className="sec-h2">
            The kind of replies <em>we get.</em>
          </Reveal>
          <Reveal as="p" className="sec-sub" delay={80}>
            Real responses from real decision-makers - to the exact cold emails our system sends. Not edited, not cherry-picked.
          </Reveal>

          <Reveal className="email-marquee">
            <div className="email-track">
              {[...replies, ...replies].map((r, i) => (
                <div className="email-card" key={i} aria-hidden={i >= replies.length}>
                  <div className="email-hdr">
                    <span className="email-name">{r.name}</span>
                    <span className="email-addr">{r.addr}</span>
                  </div>
                  <div className="email-to">to <span className="email-redact">Taha</span></div>
                  <div className="email-body">{r.body}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
