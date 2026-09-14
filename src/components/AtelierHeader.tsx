"use client";

import React from "react";
import { motion } from "framer-motion";

interface AtelierHeaderProps {
  onWaitlistClick?: () => void;
}

export default function AtelierHeader({ onWaitlistClick }: AtelierHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-30 w-full max-w-6xl mx-auto pt-6 px-4 sm:px-6"
    >
      <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        {/* Brandmark / Atelier Monogram */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/10 border border-cyan-400/30">
            <span className="absolute w-2 h-2 rounded-full bg-cyan-400 animate-ping opacity-60" />
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#00e5ff]" />
          </div>

          <div className="flex flex-col">
            <span className="font-heading tracking-[0.25em] text-sm font-bold text-white uppercase">
              Atelier
            </span>
            <span className="font-mono text-[9px] text-cyan-300/80 tracking-[0.2em] uppercase">
              CREATIVE LABS
            </span>
          </div>
        </div>

        {/* Live Studio Telemetry Center */}
        <div className="hidden md:flex items-center gap-6 font-mono text-[11px] text-slate-400 tracking-wider">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300 font-medium">SYS.ONLINE // 2026</span>
          </div>

          <span className="text-white/15">|</span>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">NODES:</span>
            <span className="text-cyan-400 font-semibold">12 GLOBAL</span>
          </div>

          <span className="text-white/15">|</span>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">LATENCY:</span>
            <span className="text-purple-300 font-semibold">12MS</span>
          </div>
        </div>

        {/* Right CTA / Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={onWaitlistClick}
            type="button"
            className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold tracking-wider text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 hover:border-cyan-400/50 hover:text-white transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(0,229,255,0.05)] hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]"
          >
            <span>REQUEST ACCESS</span>
            <span className="text-cyan-400 text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}

