"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

const MARTIJN_PHOTO = "https://groupeffort.nl/wp-content/uploads/2026/01/MartijnSquigle.jpeg";

const videos = [
  {
    videoId: "ze3G9OwQcUg",
    photo: MARTIJN_PHOTO,
    name: "Martijn Versteeg",
    role: "Group Effort",
    quote: "Over 100 opportunities in December alone. The targeting was precise - these were real companies that matched our ICP exactly.",
    metric: "100+ opps · December",
  },
  {
    videoId: "8sIZ_i7SsRk",
    photo: "/alberto-castiel-client.jfif",
    name: "Alberto Castiel",
    role: "Minute Call",
    quote: "The email deliverability setup alone was worth it - we were hitting spam before Bleed AI rebuilt our infrastructure. Night and day difference.",
    metric: "98%+ inbox placement",
  },
  {
    videoId: "zYmFS6kOFsY",
    photo: "/ahmedprofile.jpg",
    name: "Ahmad Jabbir",
    role: "TEDx Speaker & Coach",
    quote: "From a 40% spam rate to near-zero. The technical understanding Taha brings to cold email is genuinely unlike any other agency I've used.",
    metric: "Spam rate → near zero",
  },
];

type Wall = {
  pre: string;
  hl: string;
  post: string;
  name: string;
  co: string;
  av: { type: "logo" | "photo" | "initials" | "none"; val: string };
};

const wall: Wall[] = [
  { pre: "Already seeing ", hl: "great value", post: " so thanks once more. That is fantastic, a great start.", name: "John Mumo", co: "JustGreatLawyers", av: { type: "logo", val: "/images/co-justgreatlawyers.png" } },
  { pre: "Great job, Taha! We can ", hl: "scale easily", post: " with this campaign. You're always great to work with.", name: "Jayanthi Raja", co: "Rebus AI", av: { type: "logo", val: "/images/co-rebusai.png" } },
  { pre: "Great job on the emails boss. I have a ", hl: "letter of intent coming from a big player!", post: "", name: "John Speights", co: "JAMS Media", av: { type: "initials", val: "JS" } },
  { pre: "Love to hear it, thank you again. ", hl: "First leads starting to come in", post: " after the rebuild.", name: "Hunter Owens", co: "Umbrella", av: { type: "photo", val: "/hunter-owens.jpg" } },
  { pre: "Whatever you think is best. ", hl: "I will pay the next invoice", post: " to start on the new campaign.", name: "Jay", co: "More Conversions", av: { type: "logo", val: "/images/co-moreconversions.png" } },
  { pre: "", hl: "1st confirmed ticket sale through you!", post: " The conference sold out, 150 attendees from 10+ countries.", name: "Martijn Versteeg", co: "Group Effort", av: { type: "photo", val: MARTIJN_PHOTO } },
  { pre: "", hl: "I just paid the invoice", post: ", Taha. Excited to get started with you.", name: "Peter", co: "SupporterHub", av: { type: "initials", val: "P" } },
  { pre: "", hl: "WOOT, we just got our first lead!", post: " Sent an immediate follow-up right away.", name: "Kevin Nakao", co: "Capital Live Scan", av: { type: "none", val: "" } },
  { pre: "", hl: "Excited about the stats!", post: " Now it's about converting them to paid users.", name: "Jayanthi Raja", co: "Rebus AI", av: { type: "logo", val: "/images/co-rebusai.png" } },
  { pre: "", hl: "Exciting!", post: " Thank you for the update.", name: "Michael Leum", co: "FindHealthcareUSA", av: { type: "none", val: "" } },
];

function TestiCard({ v, delay }: { v: (typeof videos)[0]; delay: number }) {
  const [playing, setPlaying] = useState(false);
  return (
    <Reveal className="testi-card" delay={delay}>
      <div className="testi-thumb" onClick={() => setPlaying(true)}>
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${v.videoId}?autoplay=1&rel=0`}
            title={`${v.name} testimonial`}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, zIndex: 2 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="testi-photo"
              src={`https://img.youtube.com/vi/${v.videoId}/maxresdefault.jpg`}
              alt={`${v.name} testimonial`}
              loading="lazy"
            />
            <div className="testi-thumb-shade" />
            <div className="testi-play" style={{ position: "absolute" }}>
              <svg width="16" height="16" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </div>
            <div className="testi-thumb-name">{v.name}</div>
          </>
        )}
      </div>
      <div className="testi-body">
        <div className="testi-quote">&ldquo;{v.quote}&rdquo;</div>
        <div className="testi-name">{v.name}</div>
        <div className="testi-role">{v.role}</div>
      </div>
    </Reveal>
  );
}

function Avatar({ av, name }: { av: Wall["av"]; name: string }) {
  if (av.type === "none") return null;
  if (av.type === "initials") return <span className="wall-av-initials">{av.val}</span>;
  const cls = av.type === "photo" ? "wall-av wall-av-photo" : "wall-av";
  const altText = av.type === "photo" ? `${name} photo` : `${name} company logo`;
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={cls} src={av.val} alt={altText} />;
}

export default function Testimonials() {
  return (
    <section id="testimonials">
      <div className="sec">
        <div className="sec-inner">
          <Reveal className="sec-label">What Clients Say</Reveal>
          <Reveal as="h2" className="sec-h2">
            100+ Opportunities in December.
            <br />
            <em>Hear it directly from them.</em>
          </Reveal>
          <Reveal as="p" className="sec-sub" delay={80}>
            Not stock testimonials. Video proof from real clients who let us show the actual campaign data.
          </Reveal>

          <div className="testi-grid">
            {videos.map((v, i) => (
              <TestiCard key={i} v={v} delay={i * 90} />
            ))}
          </div>

          <Reveal className="wall-label">More from clients</Reveal>
          <Reveal className="wall-marquee">
            <div className="wall-track">
              {[...wall, ...wall].map((w, i) => (
                <div className="wall-card" key={i} aria-hidden={i >= wall.length}>
                  <div>
                    <div className="wall-stars">★★★★★</div>
                    <div className="wall-quote">
                      &ldquo;{w.pre}
                      <span className="hl">{w.hl}</span>
                      {w.post}&rdquo;
                    </div>
                  </div>
                  <div className="wall-who">
                    <Avatar av={w.av} name={w.name} />
                    <div>
                      <div className="wall-name">{w.name}</div>
                      <div className="wall-co">{w.co}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
