"use client";

import { useEffect, useState, type ReactNode } from "react";

const CALCULATOR = "https://calculator.bleedai.com";
const MARTIJN_PHOTO = "https://groupeffort.nl/wp-content/uploads/2026/01/MartijnSquigle.jpeg";

const ptc: { quote: ReactNode; name: string; role: string; img: string }[] = [
  {
    quote: (
      <>
        &ldquo;We went from <span className="hl">zero outbound to 100+ opportunities</span> in a single month. The targeting was <span className="hl">precise</span> - real companies that matched our ICP.&rdquo;
      </>
    ),
    name: "Martijn Versteeg",
    role: "Group Effort",
    img: MARTIJN_PHOTO,
  },
  {
    quote: (
      <>
        &ldquo;Great guidance on deliverability. We went from hitting spam to <span className="hl">landing in the inbox</span>. Clear, practical, and <span className="hl">genuinely worth it</span>.&rdquo;
      </>
    ),
    name: "Alberto Castiel",
    role: "Minute Call",
    img: "/alberto-castiel-client.jfif",
  },
  {
    quote: (
      <>
        &ldquo;Clear step-by-step help. My <span className="hl">spam rate dropped</span> and I finally <span className="hl">started seeing results</span>.&rdquo;
      </>
    ),
    name: "Ahmad Jabbir",
    role: "TEDx Speaker & Coach",
    img: "/ahmedprofile.jpg",
  },
  {
    quote: (
      <>
        &ldquo;Love to hear it, thank you again. <span className="hl">First leads starting to come in</span> after the rebuild.&rdquo;
      </>
    ),
    name: "Hunter Owens",
    role: "Umbrella",
    img: "/hunter-owens.jpg",
  },
];

export default function ExitPopup() {
  const [open, setOpen] = useState(false);
  const [deal, setDeal] = useState(-1);

  // Exit-intent: fire once per session when the cursor leaves through the top
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem("bai-exit-shown")) return;
    } catch {}
    const onOut = (e: MouseEvent) => {
      if (e.relatedTarget == null && e.clientY <= 0) {
        try {
          sessionStorage.setItem("bai-exit-shown", "1");
        } catch {}
        setOpen(true);
        document.removeEventListener("mouseout", onOut);
      }
    };
    document.addEventListener("mouseout", onOut);
    return () => document.removeEventListener("mouseout", onOut);
  }, []);

  // Escape to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const showRoi = () => {
    window.open(CALCULATOR, "_blank", "noopener");
    setOpen(false);
  };

  return (
    <div
      className={`popup-overlay${open ? " open" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="popup-box">
        <div className="popup-left">
          <div className="popup-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/bleed-ai-logo.svg" alt="Bleed AI" style={{ height: 28, width: "auto", display: "block" }} />
          </div>
          <div className="ptc-wrap">
            <div className="ptc-track">
              {[...ptc, ...ptc].map((t, i) => (
                <div className="ptc-card" key={i} aria-hidden={i >= ptc.length}>
                  <div className="ptc-stars">★★★★★</div>
                  <div className="ptc-quote">{t.quote}</div>
                  <div className="ptc-person">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.img} alt={t.name} loading="lazy" />
                    <div>
                      <div className="ptc-name">{t.name}</div>
                      <div className="ptc-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="popup-right">
          <button className="popup-close" onClick={() => setOpen(false)} aria-label="Close">
            ×
          </button>
          <h3>
            Are you sure you don&apos;t want <em>more qualified meetings?</em>
          </h3>
          <p>
            See exactly how many meetings and how much revenue our system could generate for your business.{" "}
            <strong style={{ color: "var(--text)" }}>Takes 10 seconds.</strong>
          </p>
          <div className="popup-label">Your average deal size</div>
          <div className="popup-dealsize">
            {["$5K – $15K", "$15K – $50K", "$50K – $100K", "$100K+"].map((d, i) => (
              <div
                className={`popup-deal${deal === i ? " sel" : ""}`}
                key={i}
                onClick={() => setDeal(i)}
              >
                {d}
              </div>
            ))}
          </div>
          <div className="popup-label">Work email</div>
          <input type="email" className="popup-email" placeholder="you@company.com" />
          <button className="popup-cta" onClick={showRoi}>
            Show My Potential ROI →
          </button>
          <div className="popup-fineprint">No spam. Just your numbers, instantly.</div>
          <div className="popup-decline" onClick={() => setOpen(false)}>
            No thanks, I&apos;m happy with inconsistent pipeline
          </div>
        </div>
      </div>
    </div>
  );
}
