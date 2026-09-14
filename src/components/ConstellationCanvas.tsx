"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  alpha: number;
  color: string;
  pulseSpeed: number;
  pulsePhase: number;
}

export default function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const colors = ["#00e5ff", "#818cf8", "#c084fc", "#38bdf8", "#ffffff"];
    const particleCount = Math.min(Math.floor((width * height) / 14000), 100);
    const maxDistance = 115;
    const mouseRadius = 150;

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
    };

    const particles: Particle[] = [];

    const createParticle = (): Particle => {
      const radius = Math.random() * 1.6 + 0.6;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        baseRadius: radius,
        radius: radius,
        alpha: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulsePhase: Math.random() * Math.PI * 2,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      ctx.clearRect(0, 0, width, height);

      // Draw constellation links
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.22 * Math.min(p1.alpha, p2.alpha);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(165, 243, 252, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // Mouse proximity interaction
        const mdx = p1.x - mouse.x;
        const mdy = p1.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < mouseRadius && mdist > 0) {
          const force = (1 - mdist / mouseRadius) * 1.5;
          p1.x += (mdx / mdist) * force;
          p1.y += (mdy / mdist) * force;

          // Connect particle to mouse with soft ethereal beam
          const mouseAlpha = (1 - mdist / mouseRadius) * 0.35;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0, 229, 255, ${mouseAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        // Particle position update
        p1.x += p1.vx * (dt * 60);
        p1.y += p1.vy * (dt * 60);

        // Screen wrap
        if (p1.x < -10) p1.x = width + 10;
        else if (p1.x > width + 10) p1.x = -10;
        if (p1.y < -10) p1.y = height + 10;
        else if (p1.y > height + 10) p1.y = -10;

        // Particle pulsing
        p1.pulsePhase += p1.pulseSpeed;
        const currentRadius = p1.baseRadius + Math.sin(p1.pulsePhase) * 0.4;
        const currentAlpha = Math.max(0.1, p1.alpha + Math.sin(p1.pulsePhase) * 0.15);

        // Draw particle with subtle glow halo
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, Math.max(0.2, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.globalAlpha = currentAlpha;
        ctx.fill();

        // Extra soft outer halo for brighter stars
        if (p1.baseRadius > 1.2) {
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, currentRadius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = p1.color;
          ctx.globalAlpha = currentAlpha * 0.18;
          ctx.fill();
        }

        ctx.globalAlpha = 1.0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      aria-hidden="true"
    />
  );
}

