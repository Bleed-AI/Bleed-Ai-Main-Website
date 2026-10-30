import type { ReactNode } from "react";
import type { ThemeId } from "@/lib/slots";

/**
 * Realistic "Example" mockups for the service pages and the catalogue (round 2, 2026-10-30).
 * Each service maps to ONE mockup that looks like the real thing a buyer would see: a LinkedIn
 * feed post, a LinkedIn message thread, an AI chat answer, an article or app in a browser,
 * a video player, an inbox with a reply arriving, a researched list, a printed card.
 * Every example uses an invented company (Northwind Freight, a cold chain freight firm) and the
 * reserved ".example" domain. Pure HTML/CSS, one restrained animation each; the resting frame
 * is the finished picture, so reduced motion and still screenshots both look complete.
 */

type Kind =
  | "li-post"
  | "li-magnet"
  | "li-comment"
  | "li-dm"
  | "li-dm-comp"
  | "li-dm-out"
  | "li-network"
  | "ai-chat"
  | "ai-sources"
  | "article"
  | "landing"
  | "app"
  | "video"
  | "video-multi"
  | "inbox"
  | "inbox-reactivate"
  | "sheet-list"
  | "sheet-jobs"
  | "sheet-visitors"
  | "card";

const BY_ID: Record<string, Kind> = {
  "linkedin-posts": "li-post",
  "lead-magnet-posts": "li-magnet",
  "post-engagers": "li-dm",
  "network-growth": "li-network",
  "competitor-engagers": "li-dm-comp",
  video: "video",
  "video-repurpose": "video-multi",
  "smart-engagement": "li-comment",
  articles: "article",
  "ai-search": "ai-chat",
  citations: "ai-sources",
  "lead-magnet-app": "app",
  "page-revamp": "landing",
  "email-campaign": "inbox",
  "buyer-list": "sheet-list",
  "linkedin-outreach": "li-dm-out",
  "direct-mail": "card",
  "website-visitors": "sheet-visitors",
  "job-signals": "sheet-jobs",
  reactivation: "inbox-reactivate",
};

const BY_THEME: Record<ThemeId, Kind> = { linkedin: "li-post", website: "ai-chat", outbound: "inbox" };

const CAPTION: Record<Kind, string> = {
  "li-post": "A carousel post, researched, written and designed for you",
  "li-magnet": "A lead magnet post, with buyers commenting to get it",
  "li-comment": "Your comment, adding something on a buyer's post",
  "li-dm": "A follow up to someone who engaged with your post, and the reply",
  "li-dm-comp": "A message to someone engaging with a competitor, and the reply",
  "li-dm-out": "A message written for one buyer, and the reply",
  "li-network": "Buyers accepting your invitations this week",
  "ai-chat": "A buyer's question, and the AI answer that names you",
  "ai-sources": "The pages the AI quoted, with you named on them",
  article: "An article with a working calculator and a live chart",
  landing: "Your homepage, rebuilt to turn visits into calls",
  app: "A calculator on your site that gives an answer for an email",
  video: "Your monthly video, scripted and edited for you",
  "video-multi": "One video, cut for every channel",
  inbox: "An email sent to a buyer, and the reply arriving",
  "inbox-reactivate": "An old lead, woken up with a reason to reply",
  "sheet-list": "A list built on the signals your best buyers showed",
  "sheet-jobs": "Companies that just hired or posted a job that fits",
  "sheet-visitors": "Companies visiting your site, identified and reached",
  card: "A printed card, written for one account",
};

export function sampleKind(id?: string, theme?: ThemeId): Kind {
  return (id && BY_ID[id]) || (theme ? BY_THEME[theme] : "li-post");
}

export default function ServiceSample({
  id,
  theme,
  caption = true,
  still = false,
  clip,
  className = "",
}: {
  id?: string;
  theme?: ThemeId;
  caption?: boolean;
  /** No animation: the finished frame only (catalogue previews). */
  still?: boolean;
  /** Clip to this height (px) with a soft fade, like a feed preview. */
  clip?: number;
  className?: string;
}) {
  const kind = sampleKind(id, theme);
  return (
    <figure className={`ss relative min-w-0 ${still ? "ss-still" : ""} ${className}`}>
      <div className="relative pt-2.5">
        <span className="absolute left-4 top-0 z-10 rounded-full border border-[#2a2a3e] bg-[#0b0b14] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#ff9d99]">
          Example
        </span>
        {clip ? (
          <div className="ss-clip relative overflow-hidden rounded-xl" style={{ maxHeight: clip }}>
            {render(kind)}
          </div>
        ) : (
          render(kind)
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-[12px] leading-snug text-[#9099b8]">
          {CAPTION[kind]}. Invented company, real format.
        </figcaption>
      )}
      <style>{CSS}</style>
    </figure>
  );
}

function render(k: Kind): ReactNode {
  switch (k) {
    case "li-post":
      return <LiPost />;
    case "li-magnet":
      return <LiMagnet />;
    case "li-comment":
      return <LiComment />;
    case "li-dm":
      return <LiDm opener={OPENERS.engager} />;
    case "li-dm-comp":
      return <LiDm opener={OPENERS.competitor} />;
    case "li-dm-out":
      return <LiDm opener={OPENERS.outreach} />;
    case "li-network":
      return <LiNetwork />;
    case "ai-chat":
      return <AiChat />;
    case "ai-sources":
      return <AiChat sources />;
    case "article":
      return <Article />;
    case "landing":
      return <Landing />;
    case "app":
      return <App />;
    case "video":
      return <Video />;
    case "video-multi":
      return <Video multi />;
    case "inbox":
      return <Inbox />;
    case "inbox-reactivate":
      return <Inbox reactivate />;
    case "sheet-list":
      return <Sheet variant="list" />;
    case "sheet-jobs":
      return <Sheet variant="jobs" />;
    case "sheet-visitors":
      return <Sheet variant="visitors" />;
    case "card":
      return <Card />;
  }
}

/* ---------------- shared bits ---------------- */

const CSS = `
.ss-ui { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
.ss-shadow { box-shadow: 0 1px 0 rgba(255,255,255,0.04) inset, 0 30px 60px -24px rgba(0,0,0,0.7), 0 12px 24px -12px rgba(0,0,0,0.5); }
.ss-in { animation: ss-in 0.7s cubic-bezier(.2,.7,.2,1) both; }
.ss-type span { display: inline-block; width: 6px; height: 6px; margin: 0 1.5px; border-radius: 9999px; background: #8a8f98; animation: ss-dot 1.2s ease-in-out infinite; }
.ss-type span:nth-child(2) { animation-delay: .15s; } .ss-type span:nth-child(3) { animation-delay: .3s; }
.ss-typing { animation: ss-hide 2.4s steps(1) both; }
.ss-bar { transform-origin: bottom; animation: ss-rise 1.6s cubic-bezier(.2,.7,.2,1) both; }
.ss-hl { animation: ss-hl 2.6s ease-out both; }
@keyframes ss-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@keyframes ss-dot { 0%, 80%, 100% { opacity: .3; transform: translateY(0); } 40% { opacity: 1; transform: translateY(-2px); } }
@keyframes ss-hide { 0%, 99% { opacity: 1; } 100% { opacity: 0; height: 0; margin: 0; padding: 0; overflow: hidden; } }
@keyframes ss-rise { from { transform: scaleY(0.1); } to { transform: scaleY(1); } }
@keyframes ss-hl { 0%, 55% { background-color: transparent; } 75%, 100% { background-color: rgba(16,185,129,0.14); } }
.ss-clip { -webkit-mask-image: linear-gradient(180deg, #000 72%, transparent); mask-image: linear-gradient(180deg, #000 72%, transparent); }
.ss-still .ss-in, .ss-still .ss-bar, .ss-still .ss-hl, .ss-still .ss-type span { animation: none !important; }
.ss-still .ss-typing { display: none; }
@media (prefers-reduced-motion: reduce) {
  .ss-in, .ss-bar, .ss-hl, .ss-type span { animation: none !important; }
  .ss-typing { display: none; }
}
`;

function Browser({ url, children, dark = false }: { url: string; children: ReactNode; dark?: boolean }) {
  return (
    <div className={`ss-ui ss-shadow overflow-hidden rounded-xl border ${dark ? "border-[#2a2a3e] bg-[#1e1e24]" : "border-[#d9dce3] bg-white"}`}>
      <div className={`flex items-center gap-2 border-b px-3 py-2 ${dark ? "border-[#2c2c34] bg-[#26262d]" : "border-[#e4e6eb] bg-[#f1f2f5]"}`}>
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className={`ml-1 flex min-w-0 flex-1 items-center gap-1.5 truncate rounded-md px-2.5 py-1 text-[11px] ${dark ? "bg-[#1a1a1f] text-[#a1a1aa]" : "bg-white text-[#5f6368]"}`}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 018 0v4" /></svg>
          <span className="truncate">{url}</span>
        </span>
      </div>
      {children}
    </div>
  );
}

function Avatar({ initials, from, to, size = 40 }: { initials: string; from: string; to: string; size?: number }) {
  return (
    <span
      className="flex flex-shrink-0 items-center justify-center rounded-full font-semibold text-white"
      style={{ width: size, height: size, fontSize: size * 0.36, background: `linear-gradient(135deg, ${from}, ${to})` }}
      aria-hidden
    >
      {initials}
    </span>
  );
}

const DANA = { initials: "DR", from: "#1d4ed8", to: "#0ea5e9" };
const SAM = { initials: "SP", from: "#b45309", to: "#f59e0b" };

function Globe() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" />
    </svg>
  );
}

/* ---------------- LinkedIn ---------------- */

function LiShell({ children }: { children: ReactNode }) {
  return <div className="ss-ui ss-shadow overflow-hidden rounded-xl border border-[#dfdedb] bg-white text-[#191919]">{children}</div>;
}

function LiHeader({ who = "dana", time = "1d" }: { who?: "dana" | "sam"; time?: string }) {
  const p =
    who === "dana"
      ? { a: DANA, name: "Dana Reyes", head: "Founder, Northwind Freight | Cold chain freight for food brands" }
      : { a: SAM, name: "Sam Patel", head: "Head of Operations, Brightline Foods" };
  return (
    <div className="flex items-start gap-2.5 px-4 pt-3.5">
      <Avatar initials={p.a.initials} from={p.a.from} to={p.a.to} size={42} />
      <div className="min-w-0 flex-1 leading-tight">
        <div className="flex items-center gap-1 text-[13.5px] font-semibold">
          {p.name} <span className="text-[12px] font-normal text-[#666]">· 2nd</span>
        </div>
        <div className="truncate text-[11.5px] text-[#666]">{p.head}</div>
        <div className="mt-0.5 flex items-center gap-1 text-[11.5px] text-[#666]">
          {time} · <Globe />
        </div>
      </div>
      <span className="text-[13px] font-semibold text-[#0a66c2]">+ Follow</span>
    </div>
  );
}

function Reactions({ count, comments, reposts }: { count: string; comments: string; reposts: string }) {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 text-[11.5px] text-[#666]">
        <span className="flex items-center gap-1.5">
          <span className="flex">
            <span className="flex h-[17px] w-[17px] items-center justify-center rounded-full border border-white bg-[#378fe9]">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="#fff" aria-hidden><path d="M2 21h4V9H2v12zM22 10a2 2 0 00-2-2h-6.3l1-4.6v-.3c0-.4-.2-.8-.4-1.1L13.2 1 6.6 7.6C6.2 8 6 8.5 6 9v10a2 2 0 002 2h9c.8 0 1.5-.5 1.8-1.2l3-7.1c.1-.2.2-.5.2-.7v-2z" /></svg>
            </span>
            <span className="-ml-1 flex h-[17px] w-[17px] items-center justify-center rounded-full border border-white bg-[#6dae4f]">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="#fff" aria-hidden><path d="M12 2l2.4 6.9H22l-6 4.6 2.3 7.1L12 16l-6.3 4.6L8 13.5 2 8.9h7.6z" /></svg>
            </span>
            <span className="-ml-1 flex h-[17px] w-[17px] items-center justify-center rounded-full border border-white bg-[#df704d]">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="#fff" aria-hidden><path d="M12 21l-1.4-1.3C5.4 15 2 12 2 8.4 2 5.4 4.4 3 7.4 3c1.7 0 3.4.8 4.6 2.1C13.2 3.8 14.9 3 16.6 3 19.6 3 22 5.4 22 8.4c0 3.6-3.4 6.6-8.6 11.3L12 21z" /></svg>
            </span>
          </span>
          {count}
        </span>
        <span>
          {comments} · {reposts}
        </span>
      </div>
      <div className="mx-4 flex justify-between border-t border-[#e8e8e8] py-1.5 text-[12px] font-semibold text-[#5e5e5e]">
        {["Like", "Comment", "Repost", "Send"].map((a) => (
          <span key={a} className="flex items-center gap-1.5 rounded px-1.5 py-1">
            <span className="h-3.5 w-3.5 rounded-sm border-[1.6px] border-[#5e5e5e]" aria-hidden />
            {a}
          </span>
        ))}
      </div>
    </>
  );
}

function LiPost() {
  return (
    <LiShell>
      <LiHeader />
      <p className="px-4 pt-2.5 text-[13px] leading-[1.45]">
        Most food brands overpay on refrigerated freight for one reason: they book every lane the same way.
        <br />
        <br />
        We looked at 400 loads from last quarter. Three habits explained almost all of the extra cost...
        <span className="text-[#666]"> see more</span>
      </p>
      {/* carousel slide */}
      <div className="relative mt-3 aspect-[4/3] w-full overflow-hidden bg-[#0f2a4a]">
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_100%_0%,#1e5fa8_0%,#0f2a4a_55%,#0a1a2e_100%)]" />
        <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9cc7f5]">
            <span>Northwind Freight</span>
            <span className="rounded-full bg-white/15 px-2 py-0.5 text-white">1 / 7</span>
          </div>
          <div>
            <div className="text-[clamp(20px,5.2vw,30px)] font-extrabold leading-[1.08] text-white">
              3 habits that make your cold chain freight <span className="text-[#7dd3fc]">18% more expensive</span>
            </div>
            <div className="mt-3 flex items-end gap-1.5" aria-hidden>
              {[38, 52, 46, 70, 64, 88].map((h, i) => (
                <span key={i} className="ss-bar w-5 rounded-t bg-[#7dd3fc]" style={{ height: h * 0.5, opacity: 0.45 + i * 0.1, animationDelay: `${0.15 * i}s` }} />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between text-[11.5px] text-white/80">
            <span>Swipe for the fixes</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#0f2a4a]">&rarr;</span>
          </div>
        </div>
      </div>
      <Reactions count="Sam Patel and 186 others" comments="42 comments" reposts="9 reposts" />
    </LiShell>
  );
}

function LiMagnet() {
  const comments = [
    { n: "Priya Shah", h: "VP Supply Chain, Harbor Pantry", t: "GUIDE" },
    { n: "Marcus Lee", h: "Logistics Manager, Fresh Fold Co.", t: "Guide please, this is our exact problem in Q4" },
  ];
  return (
    <LiShell>
      <LiHeader time="2d" />
      <p className="px-4 pt-2.5 text-[13px] leading-[1.45]">
        I put our whole freight audit checklist into one PDF. 23 checks, the ones we run before quoting any food brand.
        <br />
        <br />
        Comment <b>GUIDE</b> and I will send it to you.
        <span className="text-[#666]"> ...see more</span>
      </p>
      <div className="mt-3 flex items-center gap-4 bg-[#f3f6f8] px-4 py-4">
        <div className="relative h-[104px] w-[80px] flex-shrink-0 rotate-[-3deg] rounded-md bg-white p-2 shadow-[0_8px_20px_rgba(0,0,0,0.18)]">
          <div className="h-1.5 w-8 rounded bg-[#0a66c2]" />
          <div className="mt-2 text-[8.5px] font-extrabold leading-tight text-[#0f2a4a]">The Cold Chain Freight Audit</div>
          <div className="mt-2 space-y-1">
            {[90, 70, 80, 60].map((w, i) => (
              <div key={i} className="h-[3px] rounded bg-[#d6dbe1]" style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className="absolute bottom-2 left-2 text-[7px] font-semibold text-[#0a66c2]">23 checks</div>
        </div>
        <div className="min-w-0 text-[12px] leading-snug text-[#404040]">
          <div className="text-[13.5px] font-semibold text-[#191919]">Free checklist</div>
          Comment GUIDE below. Every person who asks is a warm lead we follow up.
        </div>
      </div>
      <Reactions count="Priya Shah and 241 others" comments="118 comments" reposts="14 reposts" />
      <div className="space-y-2.5 px-4 pb-4 pt-1">
        {comments.map((c, i) => (
          <div key={c.n} className="ss-in flex gap-2" style={{ animationDelay: `${0.6 + i * 0.7}s` }}>
            <Avatar initials={c.n.split(" ").map((x) => x[0]).join("")} from={i ? "#7c3aed" : "#059669"} to={i ? "#c084fc" : "#34d399"} size={30} />
            <div className="min-w-0 flex-1 rounded-lg bg-[#f2f2f2] px-3 py-2">
              <div className="text-[12px] font-semibold leading-tight">{c.n}</div>
              <div className="truncate text-[10.5px] text-[#666]">{c.h}</div>
              <div className="mt-1 text-[12.5px]">{c.t}</div>
            </div>
          </div>
        ))}
      </div>
    </LiShell>
  );
}

function LiComment() {
  return (
    <LiShell>
      <LiHeader who="sam" time="5h" />
      <p className="px-4 pt-2.5 text-[13px] leading-[1.45]">
        Peak season planning is starting. What is the one thing you wish your freight partner told you before October, not after?
        <span className="text-[#666]"> ...see more</span>
      </p>
      <Reactions count="64 reactions" comments="31 comments" reposts="2 reposts" />
      <div className="px-4 pb-4 pt-1">
        <div className="ss-hl flex gap-2 rounded-lg p-1.5">
          <Avatar initials={DANA.initials} from={DANA.from} to={DANA.to} size={30} />
          <div className="min-w-0 flex-1 rounded-lg bg-[#f2f2f2] px-3 py-2">
            <div className="text-[12px] font-semibold leading-tight">
              Dana Reyes <span className="font-normal text-[#666]">· Founder, Northwind Freight</span>
            </div>
            <div className="mt-1 text-[12.5px] leading-snug">
              Which lanes will tighten first. Ours: reefer capacity out of California goes 3 weeks before anyone posts about it. Book those lanes early and the rest of peak gets much calmer.
            </div>
          </div>
        </div>
        <div className="mt-1 pl-12 text-[11px] font-semibold text-[#666]">Like · Reply · 12 likes</div>
      </div>
    </LiShell>
  );
}

const OPENERS = {
  engager: "Hi Sam, thanks for the comment on the peak season post. You mentioned the Denver DC opening in March. Are you planning the reefer lanes into it yet, or still early?",
  competitor: "Hi Sam, saw your question under the cold chain post last week about Colorado coverage. That is the lane most food brands struggle with. Are you planning it for the Denver DC yet?",
  outreach: "Hi Sam, saw Brightline is opening a Denver DC in March. We run reefer lanes into Colorado every week for food brands your size. Are you planning those lanes yet, or still early?",
};

function LiDm({ opener }: { opener: string }) {
  return (
    <LiShell>
      <div className="flex items-center gap-2.5 border-b border-[#e8e8e8] px-4 py-3">
        <span className="relative">
          <Avatar initials={SAM.initials} from={SAM.from} to={SAM.to} size={36} />
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#057642]" />
        </span>
        <div className="min-w-0 leading-tight">
          <div className="text-[13.5px] font-semibold">Sam Patel</div>
          <div className="truncate text-[11.5px] text-[#666]">Head of Operations, Brightline Foods</div>
        </div>
      </div>
      <div className="space-y-3 px-4 py-4">
        <div className="text-center text-[10.5px] font-semibold uppercase tracking-wide text-[#999]">Tuesday</div>
        <div className="flex gap-2">
          <Avatar initials={DANA.initials} from={DANA.from} to={DANA.to} size={30} />
          <div className="min-w-0">
            <div className="text-[12px] font-semibold">
              Dana Reyes <span className="font-normal text-[#999]">10:14 AM</span>
            </div>
            <p className="mt-0.5 text-[12.5px] leading-snug text-[#333]">
              {opener}
            </p>
          </div>
        </div>
        <div className="ss-typing flex gap-2" style={{ animationDelay: "0.4s" }}>
          <Avatar initials={SAM.initials} from={SAM.from} to={SAM.to} size={30} />
          <span className="ss-type mt-2 rounded-full bg-[#f2f2f2] px-2.5 py-2"><span /><span /><span /></span>
        </div>
        <div className="ss-in flex gap-2" style={{ animationDelay: "2.4s" }}>
          <Avatar initials={SAM.initials} from={SAM.from} to={SAM.to} size={30} />
          <div className="min-w-0">
            <div className="text-[12px] font-semibold">
              Sam Patel <span className="font-normal text-[#999]">11:02 AM</span>
            </div>
            <p className="mt-0.5 text-[12.5px] leading-snug text-[#333]">
              Early, honestly. We have quotes from two carriers and neither covers Colorado well. Worth a quick call next week?
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 border-t border-[#e8e8e8] px-4 py-2.5">
        <span className="flex-1 rounded-md bg-[#f4f2ee] px-3 py-2 text-[12px] text-[#999]">Write a message...</span>
        <span className="rounded-full bg-[#0a66c2] px-3 py-1 text-[12px] font-semibold text-white">Send</span>
      </div>
    </LiShell>
  );
}

function LiNetwork() {
  const rows = [
    { n: "Priya Shah", h: "VP Supply Chain, Harbor Pantry", c: ["#059669", "#34d399"] },
    { n: "Marcus Lee", h: "Logistics Manager, Fresh Fold Co.", c: ["#7c3aed", "#c084fc"] },
    { n: "Elena Ruiz", h: "COO, Green Valley Snacks", c: ["#be123c", "#fb7185"] },
    { n: "Tom Becker", h: "Director of Distribution, Polar Dairy", c: ["#0369a1", "#38bdf8"] },
  ];
  return (
    <LiShell>
      <div className="flex items-center justify-between border-b border-[#e8e8e8] px-4 py-3">
        <div className="text-[14px] font-semibold">My Network</div>
        <span className="rounded-full bg-[#e7f3ff] px-2.5 py-0.5 text-[11.5px] font-semibold text-[#0a66c2]">+164 this week</span>
      </div>
      <div className="px-4 pt-3 text-[11.5px] font-semibold uppercase tracking-wide text-[#666]">Accepted your invitation</div>
      <ul className="divide-y divide-[#eee] px-4 pb-2">
        {rows.map((r, i) => (
          <li key={r.n} className="ss-in flex items-center gap-2.5 py-2.5" style={{ animationDelay: `${0.2 + i * 0.35}s` }}>
            <Avatar initials={r.n.split(" ").map((x) => x[0]).join("")} from={r.c[0]} to={r.c[1]} size={36} />
            <div className="min-w-0 flex-1 leading-tight">
              <div className="text-[13px] font-semibold">{r.n}</div>
              <div className="truncate text-[11.5px] text-[#666]">{r.h}</div>
            </div>
            <span className="flex-shrink-0 rounded-full border border-[#0a66c2] px-3 py-0.5 text-[12px] font-semibold text-[#0a66c2]">Message</span>
          </li>
        ))}
      </ul>
      <div className="border-t border-[#e8e8e8] bg-[#f8fafd] px-4 py-2.5 text-[11.5px] text-[#555]">
        Every one of them fits your buyer: food and beverage, operations and supply chain.
      </div>
    </LiShell>
  );
}

/* ---------------- AI search ---------------- */

function Sparkle() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2zM19 15l.9 2.6 2.6.9-2.6.9L19 22l-.9-2.6-2.6-.9 2.6-.9L19 15z" />
    </svg>
  );
}

function AiChat({ sources = false }: { sources?: boolean }) {
  const list = [
    { n: "Northwind Freight", d: "Specialises in refrigerated freight for food brands. Clients cite on-time delivery and clear lane pricing.", you: true },
    { n: "Harbor Line Logistics", d: "Large national network, strong on dry van, fewer reefer options." },
    { n: "Coastal Carriers", d: "Good West Coast coverage, best for smaller shipments." },
  ];
  const src = [
    { t: "2026 guide to food freight brokers", s: "foodfreight-review.example", you: true },
    { t: "Reefer rates explained", s: "northwind.example", you: true },
    { t: "Best brokers for CPG brands", s: "shipperforum.example", you: false },
  ];
  return (
    <div className="ss-ui ss-shadow overflow-hidden rounded-xl border border-[#2f2f37] bg-[#212126] text-[#ececf1]">
      <div className="flex items-center gap-2 border-b border-[#2f2f37] px-3 py-2">
        <span className="text-[#c9c9d1]"><Sparkle /></span>
        <div className="flex min-w-0 flex-1 gap-1 overflow-hidden text-[11px]">
          {["ChatGPT", "Claude", "Perplexity", "Google AI"].map((a, i) => (
            <span key={a} className={`flex-shrink-0 rounded-full px-2 py-0.5 ${i === 0 ? "bg-[#3a3a44] text-white" : "text-[#8e8ea0]"}`}>
              {a}
            </span>
          ))}
        </div>
      </div>
      <div className="space-y-3 px-4 py-4">
        <div className="ml-auto w-fit max-w-[85%] rounded-2xl bg-[#303037] px-3.5 py-2 text-[13px] leading-snug">
          Who are the best freight brokers for a mid-size food brand shipping refrigerated?
        </div>
        <div className="flex gap-2.5">
          <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-[#3a3a44] text-[#ececf1]"><Sparkle /></span>
          <div className="min-w-0 flex-1 text-[13px] leading-[1.5]">
            <p>For refrigerated food freight at your size, these three come up most:</p>
            <ol className="mt-2 space-y-2">
              {list.map((l, i) => (
                <li key={l.n} className={`ss-in rounded-lg ${l.you ? "border border-[#10b981]/50 bg-[#10b981]/10 px-2.5 py-1.5" : "px-2.5"}`} style={{ animationDelay: `${0.3 + i * 0.45}s` }}>
                  <b>
                    {i + 1}. {l.n}
                  </b>
                  {l.you && <span className="ml-1.5 rounded bg-[#10b981] px-1.5 py-[1px] text-[9.5px] font-bold uppercase tracking-wide text-[#062b1f]">You</span>}
                  <span className="block text-[12px] text-[#b4b4c0]">{l.d}</span>
                </li>
              ))}
            </ol>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {src.map((s, i) => (
                <span
                  key={s.s}
                  className={`ss-in inline-flex max-w-full items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10.5px] ${
                    sources && s.you ? "border-[#10b981]/60 bg-[#10b981]/10 text-[#a7f3d0]" : "border-[#3a3a44] bg-[#2a2a31] text-[#b4b4c0]"
                  }`}
                  style={{ animationDelay: `${1.6 + i * 0.25}s` }}
                >
                  <span className="h-2 w-2 flex-shrink-0 rounded-full bg-[#8e8ea0]" />
                  <span className="truncate">{sources ? s.t : s.s}</span>
                </span>
              ))}
            </div>
            {sources && (
              <p className="mt-2 text-[11px] text-[#a7f3d0]">Two of the three pages it quoted name Northwind. That is the work: get named on the pages AI reads.</p>
            )}
          </div>
        </div>
      </div>
      {!sources && (
        <div className="flex items-center justify-between gap-3 border-t border-[#2f2f37] bg-[#1b1b20] px-4 py-2.5 text-[11.5px]">
          <span className="text-[#b4b4c0]">Named in 14 of your 20 buyer questions</span>
          <span className="flex items-end gap-0.5" aria-hidden>
            {[4, 6, 9, 14].map((v, i) => (
              <span key={i} className="ss-bar w-2 rounded-sm bg-[#10b981]" style={{ height: v + 4, opacity: 0.5 + i * 0.16, animationDelay: `${0.2 * i}s` }} />
            ))}
          </span>
        </div>
      )}
    </div>
  );
}

/* ---------------- website ---------------- */

function Article() {
  const bars = [62, 48, 74, 40, 88];
  return (
    <Browser url="northwind.example/guides/reefer-truckload-cost">
      <div className="px-5 pb-5 pt-4 text-[#1a1a1a] sm:px-6">
        <div className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#1d4ed8]">Guide</div>
        <h4 className="mt-1 text-[clamp(17px,4.4vw,22px)] font-extrabold leading-[1.15]">What does a refrigerated truckload really cost in 2026?</h4>
        <div className="mt-2 flex items-center gap-2 text-[11px] text-[#666]">
          <Avatar initials={DANA.initials} from={DANA.from} to={DANA.to} size={20} />
          Dana Reyes · 9 min read · Updated October 2026
        </div>
        <div className="relative mt-3 h-[92px] overflow-hidden rounded-lg bg-[linear-gradient(180deg,#bfe3ff_0%,#e8f4ff_60%,#d7dde4_60%,#c7ced6_100%)]" aria-hidden>
          <div className="absolute bottom-[26px] left-[12%] h-[40px] w-[46%] rounded-sm bg-white shadow-[0_4px_10px_rgba(0,0,0,0.15)]">
            <div className="absolute left-2 top-2 text-[9px] font-extrabold tracking-wide text-[#1d4ed8]">NORTHWIND</div>
            <div className="absolute bottom-1.5 left-2 h-1 w-10 rounded bg-[#7dd3fc]" />
          </div>
          <div className="absolute bottom-[26px] left-[58%] h-[30px] w-[14%] rounded-sm rounded-tr-lg bg-[#1d4ed8]" />
          {[18, 34, 52, 64].map((l) => (
            <span key={l} className="absolute bottom-[18px] h-[14px] w-[14px] rounded-full border-[3px] border-[#333] bg-[#888]" style={{ left: `${l}%` }} />
          ))}
          <span className="absolute bottom-[8px] left-0 h-[2px] w-full bg-[repeating-linear-gradient(90deg,#fff_0_18px,transparent_18px_34px)]" />
          <span className="absolute right-3 top-2 rounded bg-black/55 px-1.5 py-0.5 text-[9px] font-bold text-white">GIF</span>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-[1.15fr_1fr]">
          <div className="rounded-lg border border-[#dfe3ea] bg-[#f7f9fc] p-3">
            <div className="text-[11px] font-bold text-[#1a1a1a]">Estimate your lane</div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-[10.5px] text-[#555]">
              <label className="block">
                Miles
                <span className="mt-0.5 block rounded border border-[#cfd6e0] bg-white px-2 py-1 text-[12px] font-semibold text-[#111]">640</span>
              </label>
              <label className="block">
                Pallets
                <span className="mt-0.5 block rounded border border-[#cfd6e0] bg-white px-2 py-1 text-[12px] font-semibold text-[#111]">18</span>
              </label>
            </div>
            <div className="mt-2 flex items-baseline justify-between rounded bg-[#1d4ed8] px-2.5 py-1.5 text-white">
              <span className="text-[10.5px]">Estimated cost</span>
              <span className="text-[15px] font-extrabold">$2,310</span>
            </div>
          </div>
          <div className="rounded-lg border border-[#dfe3ea] p-3">
            <div className="text-[11px] font-bold">Cost per mile by month</div>
            <div className="mt-2 flex h-[64px] items-end gap-2" aria-hidden>
              {bars.map((h, i) => (
                <span key={i} className="ss-bar flex-1 rounded-t bg-[#93c5fd]" style={{ height: `${h}%`, background: i === bars.length - 1 ? "#1d4ed8" : undefined, animationDelay: `${0.15 * i}s` }} />
              ))}
            </div>
            <div className="mt-1 flex justify-between text-[9px] text-[#888]">
              <span>Jun</span>
              <span>Oct</span>
            </div>
          </div>
        </div>
      </div>
    </Browser>
  );
}

function Landing() {
  return (
    <Browser url="northwind.example">
      <div className="text-[#0f172a]">
        <div className="flex items-center justify-between border-b border-[#eef0f4] px-4 py-2.5">
          <span className="text-[13px] font-extrabold tracking-tight">
            <span className="text-[#1d4ed8]">N</span>orthwind
          </span>
          <span className="hidden gap-3 text-[11px] text-[#475569] sm:flex">
            <span>Lanes</span>
            <span>Pricing</span>
            <span>Guides</span>
          </span>
          <span className="rounded-full bg-[#1d4ed8] px-3 py-1 text-[11px] font-semibold text-white">Get a quote</span>
        </div>
        <div className="bg-[radial-gradient(100%_100%_at_100%_0%,#dbeafe_0%,#ffffff_60%)] px-5 pb-5 pt-6">
          <div className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#1d4ed8]">Cold chain freight for food brands</div>
          <h4 className="mt-1.5 max-w-[22ch] text-[clamp(20px,5vw,28px)] font-extrabold leading-[1.08]">Refrigerated freight that arrives cold and on time.</h4>
          <p className="mt-2 max-w-[42ch] text-[12.5px] leading-snug text-[#475569]">One partner for every reefer lane in the US. A quote in 2 hours, a named person on every load.</p>
          <div className="mt-3.5 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#1d4ed8] px-4 py-1.5 text-[12px] font-semibold text-white">Get a quote in 2 hours</span>
            <span className="rounded-full border border-[#cbd5e1] px-4 py-1.5 text-[12px] font-semibold text-[#0f172a]">See our lanes</span>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-bold uppercase tracking-wide text-[#94a3b8]">
            <span>Brightline</span>
            <span>Harbor Pantry</span>
            <span>Polar Dairy</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 border-t border-[#eef0f4] bg-[#f8fafc] px-4 py-2.5 text-[11px]">
          <span className="ss-in rounded-full bg-[#dcfce7] px-2.5 py-0.5 font-semibold text-[#166534]" style={{ animationDelay: "0.5s" }}>Page speed 97</span>
          <span className="ss-in rounded-full bg-[#dbeafe] px-2.5 py-0.5 font-semibold text-[#1e40af]" style={{ animationDelay: "0.8s" }}>12 technical SEO fixes</span>
          <span className="ss-in rounded-full bg-[#fef3c7] px-2.5 py-0.5 font-semibold text-[#92400e]" style={{ animationDelay: "1.1s" }}>Readable by AI crawlers</span>
        </div>
      </div>
    </Browser>
  );
}

function App() {
  return (
    <Browser url="northwind.example/freight-check">
      <div className="bg-[#f6f8fb] px-5 py-5 text-[#0f172a]">
        <div className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#1d4ed8]">Free tool</div>
        <h4 className="mt-1 text-[clamp(17px,4.4vw,21px)] font-extrabold leading-tight">Are you overpaying on reefer freight?</h4>
        <div className="mt-3 grid grid-cols-3 gap-2 text-[10.5px] text-[#64748b]">
          {[
            ["Loads a month", "24"],
            ["Avg lane cost", "$2,100"],
            ["Carriers used", "5"],
          ].map(([l, v]) => (
            <label key={l} className="block min-w-0">
              <span className="block truncate">{l}</span>
              <span className="mt-0.5 block rounded-md border border-[#cbd5e1] bg-white px-2 py-1.5 text-[13px] font-semibold text-[#0f172a]">{v}</span>
            </label>
          ))}
        </div>
        <div className="ss-in mt-3 rounded-lg border border-[#bbf7d0] bg-white p-3.5" style={{ animationDelay: "0.5s" }}>
          <div className="text-[11px] text-[#64748b]">You could save about</div>
          <div className="flex items-baseline gap-2">
            <span className="text-[28px] font-extrabold leading-none text-[#15803d]">$6,050</span>
            <span className="text-[12px] text-[#64748b]">a month</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#e2e8f0]">
            <div className="ss-bar h-full w-[29%] rounded-full bg-[#22c55e]" />
          </div>
          <div className="mt-1 text-[10.5px] text-[#64748b]">29% of your current spend, mostly from two lanes</div>
        </div>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <span className="flex-1 rounded-md border border-[#cbd5e1] bg-white px-3 py-2 text-[12px] text-[#94a3b8]">you@company.com</span>
          <span className="rounded-md bg-[#1d4ed8] px-4 py-2 text-center text-[12px] font-semibold text-white">Send me the full report</span>
        </div>
      </div>
    </Browser>
  );
}

/* ---------------- video ---------------- */

function Video({ multi = false }: { multi?: boolean }) {
  return (
    <div className="ss-ui ss-shadow overflow-hidden rounded-xl border border-[#2a2a2e] bg-[#0f0f0f] text-white">
      <div className="relative aspect-video w-full overflow-hidden bg-[radial-gradient(120%_100%_at_0%_0%,#1e3a8a_0%,#0b1220_60%)]">
        <div className="absolute inset-x-0 top-0 max-w-[66%] p-4 sm:p-7">
          <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#93c5fd]">Northwind Freight</div>
          <div className="mt-1 text-[clamp(17px,4.6vw,30px)] font-extrabold leading-[1.05]">How we cut cold chain costs for a snack brand</div>
        </div>
        <div className="absolute bottom-8 right-3 h-[34%] w-[24%] overflow-hidden rounded-md border-2 border-white/80 bg-[linear-gradient(160deg,#334155,#0f172a)]" aria-hidden>
          <div className="absolute bottom-0 left-1/2 h-[60%] w-[60%] -translate-x-1/2 rounded-t-full bg-[#64748b]" />
          <div className="absolute left-1/2 top-[18%] h-[30%] w-[30%] -translate-x-1/2 rounded-full bg-[#94a3b8]" />
        </div>
        <div className="absolute inset-x-0 bottom-0 px-3 pb-2">
          <div className="h-1 w-full rounded-full bg-white/25">
            <div className="ss-bar h-full w-[38%] rounded-full bg-[#ef4444]" />
          </div>
          <div className="mt-1 flex justify-between text-[10px] text-white/80">
            <span className="flex items-center gap-1.5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff" aria-hidden><path d="M8 5v14l11-7z" /></svg>
              4:31 / 11:48
            </span>
            <span>CC · HD</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2.5 px-4 py-3">
        <Avatar initials={DANA.initials} from={DANA.from} to={DANA.to} size={34} />
        <div className="min-w-0 leading-tight">
          <div className="text-[13.5px] font-semibold">How we cut cold chain costs for a snack brand (full breakdown)</div>
          <div className="mt-0.5 text-[11.5px] text-[#aaa]">Northwind Freight · 2.4K views · 3 days ago</div>
        </div>
      </div>
      {multi && (
        <div className="grid grid-cols-3 gap-2 border-t border-[#222] px-4 py-3">
          {[
            ["YouTube", "11:48", "16/9"],
            ["Short", "0:45", "9/12"],
            ["LinkedIn clip", "1:10", "1/1"],
          ].map(([l, d], i) => (
            <div key={l} className="ss-in" style={{ animationDelay: `${0.3 + i * 0.3}s` }}>
              <div className="relative h-[64px] overflow-hidden rounded-md bg-[linear-gradient(160deg,#1e3a8a,#0b1220)]">
                <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1 text-[9px]">{d}</span>
              </div>
              <div className="mt-1 truncate text-[11px] text-[#ccc]">{l}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- outbound ---------------- */

function Inbox({ reactivate = false }: { reactivate?: boolean }) {
  const sent = reactivate
    ? {
        subject: "Still shipping out of Chicago?",
        body: [
          "Hi Sam,",
          "We spoke last spring about your Midwest lanes, and the timing was not right. Since then we added three reefer lanes out of Chicago, including Denver.",
          "If the Denver DC is still on for March, want me to price those lanes?",
        ],
        reply: "Funny timing. Our carrier just pulled out of two of those lanes. Yes please, can you send pricing by Friday?",
        when: "Reply, 3 hours later",
      }
    : {
        subject: "Reefer lanes into Denver",
        body: [
          "Hi Sam,",
          "Saw Brightline is opening a Denver DC in March. Most food brands we work with find the Colorado reefer lanes are the hardest to cover in the first quarter.",
          "Worth a 15 minute look at how we would run them?",
        ],
        reply: "Good timing. We are re-bidding those lanes next month. Can you do Thursday at 2?",
        when: "Reply, 2 hours later",
      };
  return (
    <div className="ss-ui ss-shadow overflow-hidden rounded-xl border border-[#dadce0] bg-white text-[#202124]">
      <div className="flex items-center gap-3 border-b border-[#eceff1] bg-[#f6f8fc] px-4 py-2.5">
        <span className="text-[13px] font-semibold">Inbox</span>
        <span className="flex-1 truncate rounded-full bg-[#e9eef6] px-3 py-1 text-[11.5px] text-[#5f6368]">Search mail</span>
      </div>
      <div className="px-4 pb-4 pt-3">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="text-[15px] font-semibold">{sent.subject}</h4>
          <span className="rounded bg-[#e8eaed] px-1.5 py-[1px] text-[10.5px] text-[#5f6368]">Inbox</span>
        </div>
        <div className="mt-3 flex gap-2.5">
          <Avatar initials={DANA.initials} from={DANA.from} to={DANA.to} size={32} />
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2 text-[12px]">
              <span className="truncate">
                <b>Dana Reyes</b> <span className="text-[#5f6368]">to Sam</span>
              </span>
              <span className="flex-shrink-0 text-[11px] text-[#5f6368]">Tue 9:12 AM</span>
            </div>
            <div className="mt-1.5 space-y-1.5 text-[12.5px] leading-snug text-[#3c4043]">
              {sent.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p>Dana</p>
            </div>
          </div>
        </div>
        <div className="ss-in mt-4 rounded-lg border border-[#c6e7d5] bg-[#f1faf5] p-3" style={{ animationDelay: "1.2s" }}>
          <div className="flex gap-2.5">
            <Avatar initials={SAM.initials} from={SAM.from} to={SAM.to} size={32} />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2 text-[12px]">
                <span className="truncate">
                  <b>Sam Patel</b> <span className="text-[#5f6368]">to Dana</span>
                </span>
                <span className="flex-shrink-0 text-[11px] font-semibold text-[#188038]">{sent.when}</span>
              </div>
              <p className="mt-1.5 text-[12.5px] leading-snug text-[#202124]">{sent.reply}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sheet({ variant }: { variant: "list" | "jobs" | "visitors" }) {
  const cfg = {
    list: {
      tab: "Brightline lookalikes · October",
      cols: ["Company", "Contact", "Signal", "Fit"],
      rows: [
        ["Harbor Pantry", "Priya Shah, VP Supply Chain", "New cold storage site", "A"],
        ["Fresh Fold Co.", "Marcus Lee, Logistics Mgr", "Entered 2 new states", "A"],
        ["Green Valley Snacks", "Elena Ruiz, COO", "Raised Series B", "B"],
        ["Polar Dairy", "Tom Becker, Dir. Distribution", "Reefer RFP posted", "A"],
      ],
    },
    jobs: {
      tab: "Job signals · this week",
      cols: ["Company", "What changed", "When", "Sent"],
      rows: [
        ["Harbor Pantry", "Hired a VP Supply Chain", "6 days ago", "Yes"],
        ["Fresh Fold Co.", "Job post: Logistics Manager", "3 days ago", "Yes"],
        ["Polar Dairy", "Job post: Freight Analyst", "2 days ago", "Yes"],
        ["Green Valley Snacks", "New Head of Operations", "Today", "Next"],
      ],
    },
    visitors: {
      tab: "Site visitors · this week",
      cols: ["Company", "Pages seen", "Visits", "Sent"],
      rows: [
        ["Harbor Pantry", "Pricing, Denver lanes", "4", "Yes"],
        ["Fresh Fold Co.", "Reefer rates guide", "2", "Yes"],
        ["Polar Dairy", "Pricing", "3", "Yes"],
        ["Green Valley Snacks", "Homepage, Lanes", "1", "Next"],
      ],
    },
  }[variant];
  return (
    <Browser url={`sheet.example/${variant === "list" ? "buyer-list" : variant}`}>
      <div className="text-[#202124]">
        <div className="flex items-center gap-2 border-b border-[#e0e0e0] px-3 py-2 text-[12px]">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-[#0f9d58] text-[10px] font-bold text-white">#</span>
          <span className="truncate font-semibold">{cfg.tab}</span>
        </div>
        <div className="overflow-hidden">
          <table className="w-full table-fixed border-collapse text-left text-[11px]">
            <colgroup>
              <col className="w-[25%]" />
              <col className="w-[37%]" />
              <col className="w-[21%]" />
              <col className="w-[17%]" />
            </colgroup>
            <thead>
              <tr className="bg-[#f1f3f4] text-[10.5px] font-semibold text-[#5f6368]">
                {cfg.cols.map((c) => (
                  <th key={c} className="truncate border-b border-r border-[#e0e0e0] px-2 py-1.5 last:border-r-0">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cfg.rows.map((r, i) => (
                <tr key={r[0]} className="ss-in" style={{ animationDelay: `${0.2 + i * 0.3}s` }}>
                  {r.map((c, j) => (
                    <td key={j} className="truncate border-b border-r border-[#eeeeee] px-2 py-2 last:border-r-0">
                      {j === 3 ? (
                        <span className={`rounded px-1 py-[1px] text-[10px] font-bold ${c === "Next" || c === "B" ? "bg-[#fef7e0] text-[#b06000]" : "bg-[#e6f4ea] text-[#137333]"}`}>{c}</span>
                      ) : (
                        <span className={j === 0 ? "font-semibold" : "text-[#3c4043]"}>{c}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-3 py-2 text-[10.5px] text-[#5f6368]">
          {variant === "list" ? "4 of 3,812 rows · every row checked against your best buyers" : "Each one gets a message written for what changed"}
        </div>
      </div>
    </Browser>
  );
}

function Card() {
  return (
    <div className="ss-ui relative overflow-hidden rounded-xl border border-[#2a2a3e] bg-[radial-gradient(120%_100%_at_50%_0%,#2a2620_0%,#15130f_70%)] px-5 py-8 sm:px-8">
      <div className="absolute left-[10%] top-[18%] h-[62%] w-[70%] rotate-[4deg] rounded-md bg-[#e8dcc4] shadow-[0_20px_40px_rgba(0,0,0,0.5)]" aria-hidden>
        <div className="absolute right-3 top-3 h-8 w-7 rounded-sm border-2 border-dashed border-[#b8a888]" />
        <div className="absolute bottom-5 left-6 space-y-1.5">
          <div className="h-1.5 w-24 rounded bg-[#b8a888]" />
          <div className="h-1.5 w-20 rounded bg-[#b8a888]" />
        </div>
      </div>
      <div className="ss-in relative mx-auto max-w-[360px] rotate-[-2deg] rounded-md bg-[#fffdf7] p-5 text-[#2b2b2b] shadow-[0_24px_48px_rgba(0,0,0,0.55)]" style={{ animationDelay: "0.3s" }}>
        <div className="flex items-center justify-between border-b border-[#eee6d6] pb-2">
          <span className="text-[12px] font-extrabold tracking-tight">
            <span className="text-[#1d4ed8]">N</span>orthwind Freight
          </span>
          <span className="text-[10px] text-[#9a8f7a]">Denver, CO</span>
        </div>
        <p className="mt-3 font-serif text-[15px] italic leading-[1.5] text-[#2f3a55]">
          Sam, congratulations on the new Denver DC. I put together a map of the Colorado reefer lanes we run every week, so you have it before you plan Q1. It is on the back.
        </p>
        <p className="mt-2 font-serif text-[15px] italic text-[#2f3a55]">Dana</p>
        <div className="mt-3 rounded bg-[#f4efe3] px-2.5 py-1.5 text-[10.5px] text-[#6b6150]">Lane map on the back · arrives the same week as the emails</div>
      </div>
    </div>
  );
}
