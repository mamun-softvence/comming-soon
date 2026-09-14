"use client";

import React from "react";
import { motion } from "framer-motion";

interface BorderBeamProps {
  duration?: number;
  size?: number;
  colorFrom?: string;
  colorTo?: string;
  borderWidth?: number;
  className?: string;
}

export default function BorderBeam({
  duration = 12,
  size = 180,
  colorFrom = "#00e5ff",
  colorTo = "#818cf8",
  borderWidth = 1.5,
  className = "",
}: BorderBeamProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden ${className}`}
      style={{
        padding: `${borderWidth}px`,
        WebkitMask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-[-150%] m-auto aspect-square"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, transparent ${360 - size}deg, ${colorFrom} ${360 - size / 2}deg, ${colorTo} 360deg)`,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
