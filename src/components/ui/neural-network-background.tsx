'use client';

import { useRef, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function NeuralNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    let mouseX = 0.5;
    let mouseY = 0.5;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = (e.clientY - rect.top) / rect.height;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      const isDark = resolvedTheme === 'dark';

      // Background
      ctx.fillStyle = isDark ? '#08080c' : '#fafafa';
      ctx.fillRect(0, 0, width, height);

      time += 0.005;

      // Create multiple layered glows for depth
      const centerX = width * (0.5 + (mouseX - 0.5) * 0.1);
      const centerY = height * (0.4 + (mouseY - 0.5) * 0.1);

      // Outer ambient glow
      const breathe = 1 + Math.sin(time * 0.5) * 0.03;
      const outerRadius = Math.max(width, height) * 0.8 * breathe;

      const outerGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, outerRadius
      );

      if (isDark) {
        outerGradient.addColorStop(0, 'rgba(177, 19, 15, 0.12)');
        outerGradient.addColorStop(0.3, 'rgba(177, 19, 15, 0.06)');
        outerGradient.addColorStop(0.6, 'rgba(177, 19, 15, 0.02)');
        outerGradient.addColorStop(1, 'rgba(177, 19, 15, 0)');
      } else {
        outerGradient.addColorStop(0, 'rgba(177, 19, 15, 0.06)');
        outerGradient.addColorStop(0.3, 'rgba(177, 19, 15, 0.03)');
        outerGradient.addColorStop(0.6, 'rgba(177, 19, 15, 0.01)');
        outerGradient.addColorStop(1, 'rgba(177, 19, 15, 0)');
      }

      ctx.fillStyle = outerGradient;
      ctx.fillRect(0, 0, width, height);

      // Inner core glow
      const innerBreathe = 1 + Math.sin(time * 0.8 + 1) * 0.05;
      const innerRadius = Math.max(width, height) * 0.3 * innerBreathe;

      const innerGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, innerRadius
      );

      if (isDark) {
        innerGradient.addColorStop(0, 'rgba(255, 61, 56, 0.15)');
        innerGradient.addColorStop(0.5, 'rgba(177, 19, 15, 0.05)');
        innerGradient.addColorStop(1, 'rgba(177, 19, 15, 0)');
      } else {
        innerGradient.addColorStop(0, 'rgba(255, 61, 56, 0.08)');
        innerGradient.addColorStop(0.5, 'rgba(177, 19, 15, 0.03)');
        innerGradient.addColorStop(1, 'rgba(177, 19, 15, 0)');
      }

      ctx.fillStyle = innerGradient;
      ctx.fillRect(0, 0, width, height);

      // Subtle grid lines
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.015)' : 'rgba(0, 0, 0, 0.02)';
      ctx.lineWidth = 1;

      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [resolvedTheme]);

  if (!mounted) {
    return (
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{ backgroundColor: '#08080c' }}
      />
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full transition-[filter] duration-1000 ease-out ${
          isLoaded ? 'blur-0 opacity-100' : 'blur-xl opacity-0'
        }`}
        style={{ backgroundColor: resolvedTheme === 'dark' ? '#08080c' : '#fafafa' }}
      />
    </div>
  );
}
