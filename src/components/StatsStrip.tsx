"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { prefix: "$", value: 796, suffix: "K+", label: "Pipeline Created" },
  { prefix: "", value: 10, suffix: "K+", label: "Qualified Opportunities" },
  { prefix: "", value: 85, suffix: "+", label: "5-Star Reviews" },
  { prefix: "", value: 12, suffix: "+", label: "Industries Served" },
  { prefix: "", value: 48, suffix: "hr", label: "Avg. Launch Time" },
];

function StatItem({
  prefix,
  value,
  suffix,
  label,
  run,
}: {
  prefix: string;
  value: number;
  suffix: string;
  label: string;
  run: boolean;
}) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    let start = 0;
    const ms = 1400;
    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / ms, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, value]);

  return (
    <div className="stat-item">
      <div className="stat-num">
        {prefix}
        {n}
        <em>{suffix}</em>
      </div>
      <div className="stat-lbl">{label}</div>
    </div>
  );
}

export default function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setRun(true)),
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="stats">
      <div className="stats-strip" ref={ref}>
        {stats.map((s, i) => (
          <StatItem key={i} {...s} run={run} />
        ))}
      </div>
    </section>
  );
}
