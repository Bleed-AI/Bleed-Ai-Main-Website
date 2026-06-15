"use client";

import { useEffect, useState, type ReactNode } from "react";

const CALCULATOR = "/free-tools/cold-email-roi-calculator";
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

  // Exit-intent: fire EVERY time the cursor leaves through the top of the viewport
  useEffect(() => {
    const onOut = (e: MouseEvent) => {
      if (e.relatedTarget == null && e.clientY <= 0) setOpen(true);
    };
    document.addEventListener("mouseout", onOut);
    return () => document.removeEventListener("mouseout", onOut);
  }, []);

  // Tab-return: re-show the popup every time they come back to the tab
  useEffect(() => {
    const orig = document.title;
    const onVis = () => {
      if (document.hidden) {
        document.title = "👀 Still thinking it over? - Bleed AI";
      } else {
        document.title = orig;
        setOpen(true);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      document.title = orig;
    };
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
            See exactly what a campaign could return.{" "}
            <strong style={{ color: "var(--text)" }}>Takes 10 seconds.</strong>
          </p>
          <button className="popup-cta" onClick={showRoi}>
            Calculate My ROI →
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
