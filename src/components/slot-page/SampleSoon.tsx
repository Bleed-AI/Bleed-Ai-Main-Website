import type { Slot } from "@/lib/slots";

/**
 * "Sample coming soon" card for slot pages (2026-10-30). Real samples per slot
 * arrive next; until then this shows the shape of the work as a labelled wireframe,
 * so the space reads as planned rather than empty.
 */
export default function SampleSoon({ slot }: { slot: Slot }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-dashed border-[#2a2a3e] bg-[#0b0b14] p-5 sm:p-8">
      <div className="grid items-center gap-8 md:grid-cols-[1fr_1.1fr]">
        <div className="min-w-0">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#2a2a3e] bg-[#141420] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#9099b8]">
            <span className="sp-pulse h-1.5 w-1.5 rounded-full bg-[#ff3d38]" />
            Sample in production
          </div>
          <h2 className="font-display text-2xl font-bold text-white sm:text-[28px]">See the real work here soon</h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-[#9099b8]">
            We are adding a real sample of this slot to the page, so you can judge the quality before you try it. Until then, the free trial shows it on your own business, which beats any sample.
          </p>
        </div>
        <div className="min-w-0" aria-hidden>
          {slot.theme === "linkedin" && <PostWire />}
          {slot.theme === "website" && <PageWire />}
          {slot.theme === "outbound" && <ThreadWire />}
        </div>
      </div>
      <style>{`
        .sp-shim { background: linear-gradient(90deg, #171723 0%, #23233a 50%, #171723 100%); background-size: 200% 100%; animation: sp-shim 2.4s linear infinite; }
        .sp-pulse { animation: sp-pulse 1.8s ease-in-out infinite; }
        @keyframes sp-shim { from { background-position: 100% 0; } to { background-position: -100% 0; } }
        @keyframes sp-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
        @media (prefers-reduced-motion: reduce) { .sp-shim, .sp-pulse { animation: none; } }
      `}</style>
    </div>
  );
}

function Bar({ w, h = 8, className = "" }: { w: string; h?: number; className?: string }) {
  return <div className={`sp-shim rounded-full ${className}`} style={{ width: w, height: h }} />;
}

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="relative rounded-xl border border-[#1f1f30] bg-[#111119] p-4 sm:p-5">
      <span className="absolute -top-2.5 right-4 rounded-full border border-[#2a2a3e] bg-[#0b0b14] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#505570]">
        {label}
      </span>
      {children}
    </div>
  );
}

function PostWire() {
  return (
    <Frame label="Post">
      <div className="mb-4 flex items-center gap-3">
        <div className="sp-shim h-10 w-10 rounded-full" />
        <div className="flex flex-col gap-2">
          <Bar w="120px" />
          <Bar w="80px" h={6} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Bar w="96%" />
        <Bar w="88%" />
        <Bar w="64%" />
      </div>
      <div className="sp-shim mt-4 h-28 w-full rounded-lg" />
      <div className="mt-4 flex gap-3">
        <Bar w="48px" h={6} />
        <Bar w="64px" h={6} />
      </div>
    </Frame>
  );
}

function PageWire() {
  return (
    <Frame label="Page">
      <Bar w="70%" h={12} />
      <div className="mt-2 flex gap-2">
        <Bar w="60px" h={6} />
        <Bar w="90px" h={6} />
      </div>
      <div className="sp-shim mt-4 h-24 w-full rounded-lg" />
      <div className="mt-4 flex flex-col gap-2">
        <Bar w="100%" />
        <Bar w="94%" />
        <Bar w="80%" />
      </div>
      <div className="mt-4 rounded-lg border border-[#1f1f30] p-3">
        <Bar w="40%" h={6} />
        <div className="mt-2 grid grid-cols-3 gap-2">
          <div className="sp-shim h-10 rounded-md" />
          <div className="sp-shim h-10 rounded-md" />
          <div className="sp-shim h-10 rounded-md" />
        </div>
      </div>
    </Frame>
  );
}

function ThreadWire() {
  return (
    <Frame label="Thread">
      <div className="flex flex-col gap-3">
        <div className="max-w-[85%] rounded-xl rounded-tl-sm border border-[#1f1f30] p-3">
          <Bar w="50%" h={6} />
          <div className="mt-2 flex flex-col gap-1.5">
            <Bar w="100%" h={7} />
            <Bar w="90%" h={7} />
            <Bar w="60%" h={7} />
          </div>
        </div>
        <div className="ml-auto max-w-[75%] rounded-xl rounded-tr-sm border border-[#10b981]/30 bg-[#10b981]/[0.05] p-3">
          <Bar w="40%" h={6} />
          <div className="mt-2 flex flex-col gap-1.5">
            <Bar w="100%" h={7} />
            <Bar w="70%" h={7} />
          </div>
        </div>
        <div className="max-w-[80%] rounded-xl rounded-tl-sm border border-[#1f1f30] p-3">
          <div className="flex flex-col gap-1.5">
            <Bar w="100%" h={7} />
            <Bar w="50%" h={7} />
          </div>
        </div>
      </div>
    </Frame>
  );
}
