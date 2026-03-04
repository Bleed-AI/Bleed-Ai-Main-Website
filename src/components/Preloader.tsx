"use client";

import { useEffect, useState } from 'react';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide preloader after content is loaded
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[var(--bg-primary)] flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#B1130F]/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff3d38]/10 rounded-full blur-[150px] animate-pulse animation-delay-300" />
      </div>

      {/* Circle Loader */}
      <div className="relative z-10">
        <div className="w-16 h-16 border-4 border-[var(--border-color)] border-t-[#B1130F] rounded-full animate-spin" />
      </div>
    </div>
  );
}
