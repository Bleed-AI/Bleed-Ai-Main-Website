"use client";

import { useEffect, useRef, useState } from "react";

const TRIAL_URL = "https://calculator.bleedai.com/trials";
const MARTIJN_PHOTO = "https://groupeffort.nl/wp-content/uploads/2026/01/MartijnSquigle.jpeg";

const testimonials = [
  { quote: "Over 100 opportunities in December. The targeting was precise - real companies that matched our ICP.", img: MARTIJN_PHOTO, name: "Martijn Versteeg", role: "Group Effort" },
  { quote: "Great guidance on deliverability and infrastructure. We went from hitting spam to landing in the inbox.", img: "/alberto-castiel-client.jfif", name: "Alberto Castiel", role: "Minute Call" },
  { quote: "Clear step-by-step help. My spam rate dropped and I finally started seeing results.", img: "/ahmedprofile.jpg", name: "Ahmad Jabbir", role: "TEDx Speaker & Coach" },
  { quote: "Love to hear it, thank you again. First leads starting to come in after the rebuild.", img: "/hunter-owens.jpg", name: "Hunter Owens", role: "Umbrella" },
];

export default function SidePopup() {
  const [shown, setShown] = useState(false);
  const [closed, setClosed] = useState(false);
  const [current, setCurrent] = useState(0); // 0 = trial slide; 1..n = testimonial n
  const tptr = useRef(1);

  // Close + remember for the session (stays closed once dismissed, even across reloads)
  const close = () => {
    setClosed(true);
    try { sessionStorage.setItem("lpClosed", "1"); } catch {}
  };

  // Show after a delay, unless already dismissed this session
  useEffect(() => {
    let dismissed = false;
    try { dismissed = !!sessionStorage.getItem("lpClosed"); } catch {}
    if (dismissed) { setClosed(true); return; }
    const t = setTimeout(() => setShown(true), 4500);
    return () => clearTimeout(t);
  }, []);

  // Rotate: trial -> testimonial -> trial -> next testimonial ...
  useEffect(() => {
    if (!shown || closed) return;
    const id = setInterval(() => {
      setCurrent((c) => {
        if (c === 0) {
          const n = tptr.current;
          tptr.current = tptr.current + 1 > testimonials.length ? 1 : tptr.current + 1;
          return n;
        }
        return 0;
      });
    }, 6000);
    return () => clearInterval(id);
  }, [shown, closed]);

  return (
    <div className={`left-pop${shown && !closed ? " show" : ""}`}>
      <button className="left-pop-close" onClick={close} aria-label="Close">
        ×
      </button>

      <div className={`left-slide${current === 0 ? " active" : ""}`}>
        <div className="lp-badge">
          <span className="dot" /> Limited Spots Available
        </div>
        <div className="lp-title">Apply for your Trial Pilot Campaign</div>
        <div className="lp-desc">
          We&apos;ll launch a low-cost pilot campaign to prove outbound for your business - before you commit to anything bigger.
        </div>
        <a href={TRIAL_URL} target="_blank" rel="noopener noreferrer" className="lp-cta" onClick={close}>
          Start My Trial Campaign →
        </a>
      </div>

      {testimonials.map((t, i) => (
        <div className={`left-slide${current === i + 1 ? " active" : ""}`} key={i}>
          <div className="lp-stars">★★★★★</div>
          <div className="lp-quote">&ldquo;{t.quote}&rdquo;</div>
          <div className="lp-person">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={t.img} alt={t.name} loading="lazy" />
            <div>
              <div className="lp-person-name">{t.name}</div>
              <div className="lp-person-role">{t.role}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
