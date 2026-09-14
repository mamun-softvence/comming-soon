"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  type Variants,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import BorderBeam from "./BorderBeam";

export interface ServiceItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  category: "media" | "systems" | "growth" | "activation";
  icon: React.ReactNode;
  accentColor: string;
}

interface CapabilityCardProps {
  service: ServiceItem;
  variants?: Variants;
}

export default function CapabilityCard({ service, variants }: CapabilityCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Normalized motion values for 3D tilt (-0.5 to 0.5)
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  // Elastic spring physics with inertial bounce
  const springConfig = { stiffness: 300, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(normY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(normX, [-0.5, 0.5], [-12, 12]), springConfig);
  const scale = useSpring(isHovered ? 1.02 : 1, { stiffness: 350, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    setMousePos({ x: relX, y: relY });
    normX.set(relX / rect.width - 0.5);
    normY.set(relY / rect.height - 0.5);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    normX.set(0);
    normY.set(0);
  };

  return (
    <div style={{ perspective: 1100 }}>
      <motion.div
        ref={cardRef}
        variants={variants}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white/[0.025] hover:bg-white/[0.045] border border-white/10 backdrop-blur-xl transition-colors duration-300 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
      >
        {/* Continuous Orbiting Conic Border Beam */}
        <BorderBeam
          colorFrom={service.accentColor}
          colorTo="#ffffff"
          duration={14}
          size={140}
          borderWidth={1.5}
          className="opacity-40 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Specular Surface Glint tracking cursor angle */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.08), transparent 70%)`,
          }}
          aria-hidden="true"
        />

        {/* Luminous Inner Glow on Hover */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.35 : 0,
            boxShadow: `inset 0 0 35px ${service.accentColor}30`,
          }}
          aria-hidden="true"
        />

        {/* Card Header: Icon, Tag & Index */}
        <div className="relative z-10 flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            {/* Luminous Icon Frame */}
            <div
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/[0.04] border border-white/15 text-white transition-all duration-300 group-hover:scale-110"
              style={{
                boxShadow: `0 0 25px ${service.accentColor}35`,
              }}
            >
              {service.icon}
            </div>

            <span className="font-mono text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/10 text-slate-300 font-semibold group-hover:text-white group-hover:border-white/20 transition-all">
              {service.tag}
            </span>
          </div>

          <span className="font-mono text-xs font-semibold tracking-widest text-slate-500 group-hover:text-cyan-300 transition-colors duration-200">
            {"// " + service.id}
          </span>
        </div>

        {/* Card Body */}
        <div className="relative z-10 mb-8 flex-grow">
          <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-2.5 tracking-tight group-hover:text-cyan-200 transition-colors duration-200">
            {service.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
            {service.description}
          </p>
        </div>

        {/* Card Footer Micro Telemetry */}
        <div className="relative z-10 pt-4 border-t border-white/[0.08] flex items-center justify-between font-mono text-[10px] font-medium tracking-widest text-slate-400 group-hover:text-slate-300 transition-colors">
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor]"
              style={{ backgroundColor: service.accentColor, color: service.accentColor }}
            />
            <span>DEPLOYED</span>
          </div>
          <span className="opacity-60 group-hover:opacity-100 group-hover:text-cyan-300 transition-all duration-200 flex items-center gap-1">
            SPECIFIED <span className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
          </span>
        </div>
      </motion.div>
    </div>
  );
}
