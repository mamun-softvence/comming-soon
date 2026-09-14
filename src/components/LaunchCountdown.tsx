"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { motion } from "framer-motion";

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const emptySubscribe = () => () => {};

export default function LaunchCountdown() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: "14",
    hours: "08",
    minutes: "42",
    seconds: "19",
  });

  useEffect(() => {
    // Target launch date: 14 days from initial load
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 14);
    targetDate.setHours(targetDate.getHours() + 8);
    targetDate.setMinutes(targetDate.getMinutes() + 42);

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const m = Math.floor((difference / 1000 / 60) % 60);
      const s = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        days: String(d).padStart(2, "0"),
        hours: String(h).padStart(2, "0"),
        minutes: String(m).padStart(2, "0"),
        seconds: String(s).padStart(2, "0"),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isMounted) {
    return (
      <div className="inline-flex items-center gap-4 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl mb-8">
        <span className="font-mono text-xs text-slate-400">SYNCING GENESIS PROTOCOL...</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="group relative inline-flex items-center gap-3 sm:gap-5 px-5 sm:px-6 py-2.5 rounded-full bg-white/[0.03] hover:bg-white/[0.05] border border-white/15 backdrop-blur-xl mb-10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:border-cyan-400/40 transition-all duration-300"
    >
      {/* Status indicator */}
      <div className="flex items-center gap-2.5 pr-2 sm:pr-3 border-r border-white/10">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_#00e5ff]"></span>
        </span>
        <span className="font-mono text-[10px] sm:text-[11px] text-slate-300 font-semibold tracking-widest uppercase">
          T-MINUS
        </span>
      </div>

      {/* Countdown Segments */}
      <div className="flex items-center gap-2 sm:gap-3 font-mono">
        {/* Days */}
        <div className="flex flex-col items-center">
          <span className="text-sm sm:text-base font-bold text-white tracking-wider">
            {timeLeft.days}
          </span>
          <span className="text-[8px] text-cyan-400/80 uppercase tracking-widest">DAYS</span>
        </div>

        <span className="text-slate-500 font-bold text-xs pb-2">:</span>

        {/* Hours */}
        <div className="flex flex-col items-center">
          <span className="text-sm sm:text-base font-bold text-white tracking-wider">
            {timeLeft.hours}
          </span>
          <span className="text-[8px] text-cyan-400/80 uppercase tracking-widest">HRS</span>
        </div>

        <span className="text-slate-500 font-bold text-xs pb-2">:</span>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <span className="text-sm sm:text-base font-bold text-white tracking-wider">
            {timeLeft.minutes}
          </span>
          <span className="text-[8px] text-cyan-400/80 uppercase tracking-widest">MIN</span>
        </div>

        <span className="text-slate-500 font-bold text-xs pb-2">:</span>

        {/* Seconds */}
        <div className="flex flex-col items-center min-w-[20px]">
          <span className="text-sm sm:text-base font-bold text-cyan-300 tracking-wider">
            {timeLeft.seconds}
          </span>
          <span className="text-[8px] text-cyan-400 uppercase tracking-widest">SEC</span>
        </div>
      </div>
    </motion.div>
  );
}

