"use client";

import { useEffect, useRef } from "react";

export default function BackgroundOrbs() {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      if (orb1Ref.current) {
        orb1Ref.current.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
      }
      if (orb2Ref.current) {
        orb2Ref.current.style.transform = `translate(${x * 40}px, ${y * 40}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div
        ref={orb1Ref}
        className="fixed -top-[200px] -left-[100px] w-[600px] h-[600px] rounded-full bg-[#B1130F] blur-[120px] opacity-25 pointer-events-none animate-float transition-transform duration-300"
      />
      <div
        ref={orb2Ref}
        className="fixed top-1/2 -right-[200px] w-[600px] h-[600px] rounded-full bg-[#ff3d38] blur-[120px] opacity-20 pointer-events-none animate-float animation-delay-[-12s] transition-transform duration-300"
        style={{ animationDirection: "reverse" }}
      />
    </>
  );
}
