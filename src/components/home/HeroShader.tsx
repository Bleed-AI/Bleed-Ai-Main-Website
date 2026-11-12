"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/**
 * The ONE shader on the homepage (2026-11-12, print proof direction): a static mesh gradient in ink with blood red
 * and a warm red, speed 0, so it renders once and runs no animation loop. Loaded client-only after the page paints;
 * the CSS .ink-gradient underneath is the fallback (no WebGL, slow device, or before it loads).
 * Library: @paper-design/shaders-react (Apache-2.0), pinned.
 */
const MeshGradient = dynamic(() => import("@paper-design/shaders-react").then((m) => m.MeshGradient), { ssr: false });

function hasWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function HeroShader() {
  const [ok, setOk] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!hasWebGL()) return;
    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    const go = () => setOk(true);
    if (idle) idle(go);
    else setTimeout(go, 300);
  }, []);

  useEffect(() => {
    if (!ok) return;
    const t = setTimeout(() => setShown(true), 120);
    return () => clearTimeout(t);
  }, [ok]);

  if (!ok) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 transition-opacity duration-[1400ms] ease-out" style={{ opacity: shown ? 1 : 0 }}>
      <MeshGradient
        className="h-full w-full"
        style={{ width: "100%", height: "100%" }}
        colors={["#0b0b14", "#0b0b14", "#b1130f", "#0b0b14", "#ff5a3c", "#0b0b14"]}
        distortion={0.85}
        swirl={0.35}
        grainMixer={0.25}
        grainOverlay={0.18}
        speed={0}
        frame={18000}
        scale={1.15}
        offsetX={0.32}
        offsetY={-0.18}
        maxPixelCount={1600 * 900}
      />
    </div>
  );
}
