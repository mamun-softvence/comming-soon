"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for fluid, ethereal movement
  const springConfig = { damping: 28, stiffness: 180, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Trailing dot with slightly higher responsiveness
  const dotConfig = { damping: 35, stiffness: 350 };
  const dotX = useSpring(mouseX, dotConfig);
  const dotY = useSpring(mouseY, dotConfig);

  useEffect(() => {
    // Only enable custom cursor aura on devices with fine pointer (mouse/trackpad)
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Ethereal Aurora Light Aura */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-screen"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-[320px] h-[320px] rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.14)_0%,rgba(139,92,246,0.08)_35%,rgba(244,63,94,0.02)_65%,transparent_75%)] blur-md" />
      </motion.div>

      {/* Subtle Precision Core Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.75, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#00e5ff]" />
      </motion.div>
    </>
  );
}

