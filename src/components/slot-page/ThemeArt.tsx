"use client";

import type { ThemeId } from "@/lib/slots";

/**
 * One code-drawn animated illustration per theme (2026-10-30).
 * Pure SVG + CSS keyframes so it stays light across 20 slot pages.
 * The base (non-animated) styles are the finished picture, so reduced motion
 * and still screenshots both show a complete scene.
 */
export default function ThemeArt({ theme, className = "" }: { theme: ThemeId; className?: string }) {
  return (
    <div className={`sp-art relative w-full overflow-hidden rounded-2xl border border-[#1f1f30] bg-[radial-gradient(120%_90%_at_50%_0%,#1a0f14_0%,#0b0b14_60%)] ${className}`}>
      {theme === "linkedin" && <LinkedInArt />}
      {theme === "website" && <WebsiteArt />}
      {theme === "outbound" && <OutboundArt />}
      <style jsx global>{`
        .sp-art svg { display: block; width: 100%; height: auto; }
        .sp-art text { font-family: "Instrument Sans", system-ui, sans-serif; }

        /* LinkedIn: the network grows, the post collects reactions */
        .sp-li-link { stroke-dasharray: 120; stroke-dashoffset: 0; animation: sp-draw 3s ease-in-out 1 both; }
        .sp-li-node { transform-box: fill-box; transform-origin: center; animation: sp-pop 3s ease-in-out 1 both; }
        .sp-li-react { transform-box: fill-box; transform-origin: center; animation: sp-float 3.5s ease-out 1 both; }
        .sp-li-ring { transform-box: fill-box; transform-origin: center; animation: sp-ring 3s ease-out infinite; }

        /* Website: the AI answer types itself and names you */
        .sp-web-line { transform-box: fill-box; transform-origin: left center; animation: sp-grow 3s ease-out 1 both; }
        .sp-web-you { animation: sp-glow 3.5s ease-in-out 1 both; }
        .sp-web-bar { transform-box: fill-box; transform-origin: bottom center; animation: sp-rise 3.5s ease-out 1 both; }
        .sp-web-caret { animation: sp-blink 1s steps(1) infinite; }

        /* Outbound: emails leave, a reply comes back */
        .sp-ob-mail { animation: sp-fly 5s ease-in-out infinite; }
        .sp-ob-reply { transform-box: fill-box; transform-origin: right center; animation: sp-reply 3s ease-out 1 both; }

        @keyframes sp-draw { 0% { stroke-dashoffset: 120; } 35%, 100% { stroke-dashoffset: 0; } }
        @keyframes sp-pop { 0%, 10% { transform: scale(0); opacity: 0; } 30%, 100% { transform: scale(1); opacity: 1; } }
        @keyframes sp-float { 0%, 40% { transform: translateY(8px); opacity: 0; } 55%, 100% { transform: translateY(0); opacity: 1; } }
        @keyframes sp-ring { 0% { transform: scale(0.6); opacity: 0.7; } 100% { transform: scale(1.6); opacity: 0; } }
        @keyframes sp-grow { 0%, 6% { transform: scaleX(0); } 30%, 100% { transform: scaleX(1); } }
        @keyframes sp-glow { 0%, 38% { opacity: 0.25; } 48%, 100% { opacity: 1; } }
        @keyframes sp-rise { 0%, 45% { transform: scaleY(0.15); } 70%, 100% { transform: scaleY(1); } }
        @keyframes sp-blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
        @keyframes sp-fly {
          0% { transform: translate(0, 0) scale(0.6); opacity: 0; }
          10% { opacity: 1; }
          45% { transform: translate(var(--dx), var(--dy)) scale(1); opacity: 1; }
          55%, 100% { transform: translate(var(--dx), var(--dy)) scale(1); opacity: 0; }
        }
        @keyframes sp-reply { 0%, 55% { transform: scale(0.4); opacity: 0; } 68%, 100% { transform: scale(1); opacity: 1; } }

        @media (prefers-reduced-motion: reduce) {
          .sp-art * { animation: none !important; }
          .sp-ob-mail { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

const RED = "#ff3d38";
const GREEN = "#10b981";

function LinkedInArt() {
  const nodes = [
    { x: 70, y: 70 }, { x: 64, y: 190 }, { x: 140, y: 236 }, { x: 330, y: 230 },
    { x: 400, y: 160 }, { x: 392, y: 54 }, { x: 128, y: 28 }, { x: 340, y: 18 },
  ];
  const cx = 230;
  const cy = 132;
  return (
    <svg viewBox="0 0 460 260" role="img" aria-label="A LinkedIn post at the centre of a growing network of buyers">
      {nodes.map((n, i) => (
        <line key={`l${i}`} className="sp-li-link" x1={cx} y1={cy} x2={n.x} y2={n.y} stroke="#B1130F" strokeOpacity="0.45" strokeWidth="1.2" style={{ animationDelay: `${i * 0.18}s` }} />
      ))}
      {nodes.map((n, i) => (
        <g key={`n${i}`} className="sp-li-node" style={{ animationDelay: `${0.3 + i * 0.18}s` }}>
          <circle cx={n.x} cy={n.y} r="13" fill="#141420" stroke="#2a2a3e" />
          <circle cx={n.x} cy={n.y - 3} r="4" fill="#9099b8" />
          <path d={`M${n.x - 7} ${n.y + 8} q7 -9 14 0`} fill="#9099b8" />
        </g>
      ))}
      {/* the post card */}
      <g>
        <rect x="150" y="70" width="160" height="128" rx="12" fill="#141420" stroke="#2a2a3e" />
        <circle className="sp-li-ring" cx="170" cy="90" r="10" fill="none" stroke={RED} strokeOpacity="0.6" />
        <circle cx="170" cy="90" r="9" fill="#B1130F" />
        <rect x="186" y="84" width="58" height="5" rx="2.5" fill="#eaeef8" fillOpacity="0.85" />
        <rect x="186" y="93" width="38" height="4" rx="2" fill="#9099b8" fillOpacity="0.6" />
        <rect x="162" y="108" width="136" height="4" rx="2" fill="#9099b8" fillOpacity="0.55" />
        <rect x="162" y="117" width="120" height="4" rx="2" fill="#9099b8" fillOpacity="0.55" />
        <rect x="162" y="130" width="136" height="44" rx="6" fill="url(#sp-li-img)" />
        <polyline points="170,166 192,152 210,160 232,142 256,150 288,138" fill="none" stroke="#eaeef8" strokeOpacity="0.8" strokeWidth="1.6" />
        <g className="sp-li-react" style={{ animationDelay: "0.2s" }}>
          <circle cx="170" cy="186" r="5" fill={RED} />
          <circle cx="179" cy="186" r="5" fill="#f5b544" />
          <rect x="190" y="183" width="30" height="5" rx="2.5" fill="#eaeef8" fillOpacity="0.7" />
        </g>
        <g className="sp-li-react" style={{ animationDelay: "0.6s" }}>
          <rect x="246" y="183" width="52" height="5" rx="2.5" fill="#9099b8" fillOpacity="0.6" />
        </g>
      </g>
      {/* reactions floating off the post */}
      <g className="sp-li-react" style={{ animationDelay: "1s" }}>
        <rect x="300" y="96" width="84" height="22" rx="11" fill="#10241d" stroke={GREEN} strokeOpacity="0.5" />
        <circle cx="313" cy="107" r="4" fill={GREEN} />
        <text x="322" y="111" fontSize="10" fill="#34d399">Buyer liked</text>
      </g>
      <g className="sp-li-react" style={{ animationDelay: "1.5s" }}>
        <rect x="84" y="120" width="86" height="22" rx="11" fill="#1d1012" stroke={RED} strokeOpacity="0.5" />
        <circle cx="97" cy="131" r="4" fill={RED} />
        <text x="106" y="135" fontSize="10" fill="#ff9d99">New comment</text>
      </g>
      <defs>
        <linearGradient id="sp-li-img" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a0d0c" />
          <stop offset="1" stopColor="#1a1a2a" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function WebsiteArt() {
  const answers = [
    { w: 150, you: false },
    { w: 188, you: true },
    { w: 126, you: false },
  ];
  const bars = [26, 38, 52, 70];
  return (
    <svg viewBox="0 0 460 260" role="img" aria-label="An AI answer naming your company, with a rising visibility chart">
      {/* window */}
      <rect x="22" y="22" width="300" height="216" rx="12" fill="#141420" stroke="#2a2a3e" />
      <circle cx="38" cy="38" r="3.5" fill="#B1130F" />
      <circle cx="50" cy="38" r="3.5" fill="#2a2a3e" />
      <circle cx="62" cy="38" r="3.5" fill="#2a2a3e" />
      {/* question */}
      <rect x="38" y="56" width="268" height="30" rx="15" fill="#0b0b14" stroke="#2a2a3e" />
      <text x="52" y="75" fontSize="11" fill="#c3c8dc">Who is the best partner for this?</text>
      <rect className="sp-web-caret" x="236" y="65" width="1.6" height="13" fill={RED} />
      {/* answer lines */}
      {answers.map((a, i) => {
        const y = 106 + i * 40;
        return (
          <g key={i}>
            <text x="40" y={y + 12} fontSize="11" fill="#505570">{i + 1}.</text>
            {a.you ? (
              <g className="sp-web-you">
                <rect x="54" y={y - 4} width="248" height="26" rx="8" fill="#1d1012" stroke={RED} strokeOpacity="0.7" />
                <rect className="sp-web-line" x="64" y={y + 4} width="70" height="9" rx="4" fill="#eaeef8" style={{ animationDelay: `${i * 0.5}s` }} />
                <rect x="232" y={y + 2} width="60" height="14" rx="7" fill="#B1130F" />
                <text x="246" y={y + 12.5} fontSize="9" fontWeight="700" fill="#fff">YOU</text>
                <rect className="sp-web-line" x="140" y={y + 6} width="80" height="5" rx="2.5" fill="#9099b8" fillOpacity="0.6" style={{ animationDelay: `${i * 0.5 + 0.2}s` }} />
              </g>
            ) : (
              <g>
                <rect className="sp-web-line" x="64" y={y + 4} width={a.w * 0.45} height="9" rx="4" fill="#9099b8" fillOpacity="0.7" style={{ animationDelay: `${i * 0.5}s` }} />
                <rect className="sp-web-line" x={70 + a.w * 0.45} y={y + 6} width={a.w * 0.6} height="5" rx="2.5" fill="#9099b8" fillOpacity="0.35" style={{ animationDelay: `${i * 0.5 + 0.2}s` }} />
              </g>
            )}
          </g>
        );
      })}
      <text x="40" y="226" fontSize="9" fill="#505570">Sources quoted: 3 articles, 2 roundups</text>
      {/* trend card */}
      <rect x="334" y="62" width="106" height="150" rx="12" fill="#141420" stroke="#2a2a3e" />
      <text x="346" y="84" fontSize="9.5" fill="#9099b8">Times named</text>
      {bars.map((h, i) => (
        <rect key={i} className="sp-web-bar" x={348 + i * 22} y={196 - h} width="14" height={h} rx="3" fill={i === bars.length - 1 ? RED : "#B1130F"} fillOpacity={0.45 + i * 0.18} style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
      <line x1="344" y1="197" x2="430" y2="197" stroke="#2a2a3e" />
    </svg>
  );
}

function OutboundArt() {
  const rows = [0, 1, 2, 3];
  const targets = [
    { x: 380, y: 54 },
    { x: 400, y: 112 },
    { x: 372, y: 170 },
  ];
  return (
    <svg viewBox="0 0 460 260" role="img" aria-label="A researched buyer list, emails going out, and a reply coming back">
      {/* list */}
      <rect x="22" y="30" width="170" height="200" rx="12" fill="#141420" stroke="#2a2a3e" />
      <text x="38" y="54" fontSize="10" fill="#9099b8">Buyers you picked</text>
      {rows.map((r) => {
        const y = 70 + r * 38;
        return (
          <g key={r}>
            <rect x="34" y={y} width="146" height="28" rx="7" fill="#0b0b14" stroke="#1f1f30" />
            <circle cx="48" cy={y + 14} r="7" fill="#2a2a3e" />
            <rect x="62" y={y + 8} width={56 + (r % 2) * 18} height="5" rx="2.5" fill="#eaeef8" fillOpacity="0.75" />
            <rect x="62" y={y + 17} width="44" height="4" rx="2" fill="#9099b8" fillOpacity="0.5" />
            <circle cx="166" cy={y + 14} r="6" fill={GREEN} fillOpacity="0.2" stroke={GREEN} strokeOpacity="0.7" />
            <path d={`M163 ${y + 14} l2 2 l4 -4`} stroke="#34d399" strokeWidth="1.5" fill="none" />
          </g>
        );
      })}
      {/* path guides */}
      {targets.map((t, i) => (
        <path key={`p${i}`} d={`M196 ${100 + i * 30} C 270 ${100 + i * 30}, 300 ${t.y}, ${t.x - 18} ${t.y}`} stroke="#2a2a3e" strokeDasharray="3 5" fill="none" />
      ))}
      {/* targets */}
      {targets.map((t, i) => (
        <g key={`t${i}`}>
          <circle cx={t.x} cy={t.y} r="16" fill="#141420" stroke="#2a2a3e" />
          <circle cx={t.x} cy={t.y - 4} r="5" fill="#9099b8" />
          <path d={`M${t.x - 8} ${t.y + 10} q8 -10 16 0`} fill="#9099b8" />
        </g>
      ))}
      {/* envelopes in flight */}
      {targets.map((t, i) => (
        <g
          key={`m${i}`}
          className="sp-ob-mail"
          style={{ ["--dx" as string]: `${t.x - 214}px`, ["--dy" as string]: `${t.y - (100 + i * 30)}px`, animationDelay: `${i * 0.5}s` } as React.CSSProperties}
        >
          <rect x="196" y={92 + i * 30} width="22" height="16" rx="3" fill="#B1130F" />
          <path d={`M196 ${93 + i * 30} l11 8 l11 -8`} stroke="#fff" strokeOpacity="0.85" strokeWidth="1.3" fill="none" />
        </g>
      ))}
      {/* reply */}
      <g className="sp-ob-reply">
        <rect x="232" y="196" width="190" height="40" rx="12" fill="#10241d" stroke={GREEN} strokeOpacity="0.6" />
        <circle cx="250" cy="216" r="7" fill={GREEN} />
        <path d="M246.5 216 l2.5 2.5 l4.5 -5" stroke="#07070d" strokeWidth="1.8" fill="none" />
        <text x="264" y="213" fontSize="10.5" fontWeight="600" fill="#eaeef8">Reply: "Sounds good,</text>
        <text x="264" y="227" fontSize="10.5" fontWeight="600" fill="#eaeef8">send a time for Tuesday"</text>
      </g>
    </svg>
  );
}
