"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  type Variants,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import ConstellationCanvas from "@/components/ConstellationCanvas";
import CursorGlow from "@/components/CursorGlow";
import CapabilityCard, { type ServiceItem } from "@/components/CapabilityCard";
import BorderBeam from "@/components/BorderBeam";

const services: ServiceItem[] = [
  {
    id: "01",
    tag: "IDENTITY",
    title: "Branding & Visual Systems",
    description:
      "Precision design systems, architectural brand books, and iconic foundations engineered for instant global recognition.",
    category: "media",
    accentColor: "#00e5ff",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.4)" />
        <path d="M12 3a9 9 0 0 1 9 9" stroke="#00e5ff" strokeWidth="2" />
        <circle cx="12" cy="12" r="3" fill="#00e5ff" />
      </svg>
    ),
  },
  {
    id: "02",
    tag: "MOTION",
    title: "TVC / OVC / Cine Production",
    description:
      "High-definition commercial cinematography, television spots, and digital video production from storyboard to master grade.",
    category: "media",
    accentColor: "#ff5370",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <polygon points="23 7 16 12 23 17 23 7" stroke="#ff5370" strokeWidth="2" fill="rgba(255,83,112,0.15)" />
        <rect x="1" y="5" width="15" height="14" rx="3" stroke="currentColor" />
      </svg>
    ),
  },
  {
    id: "03",
    tag: "MEDIA",
    title: "Commercial Photography",
    description:
      "Precision campaign, editorial, and architectural photography capturing evocative narratives across digital and print mediums.",
    category: "media",
    accentColor: "#38bdf8",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" />
        <circle cx="12" cy="13" r="4" stroke="#38bdf8" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "04",
    tag: "SYSTEMS",
    title: "Digital Architecture & Web",
    description:
      "High-performance bespoke digital platforms, WebGL interactions, and scalable architectures designed to dominate markets.",
    category: "systems",
    accentColor: "#818cf8",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <rect x="2" y="3" width="20" height="14" rx="3" stroke="currentColor" />
        <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" />
        <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" />
        <circle cx="6" cy="7" r="1" fill="#00e5ff" />
        <circle cx="9" cy="7" r="1" fill="#818cf8" />
      </svg>
    ),
  },
  {
    id: "05",
    tag: "GROWTH",
    title: "IMC & Marketing Strategy",
    description:
      "Full-funnel omnichannel strategy synchronizing high-impact messaging, media deployment, and conversion acceleration.",
    category: "growth",
    accentColor: "#c084fc",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" />
        <line x1="12" y1="20" x2="12" y2="4" stroke="#c084fc" strokeWidth="2" />
        <line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" />
        <path d="M4 14l8-8 6 6 4-4" stroke="#00e5ff" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "06",
    tag: "ENGAGE",
    title: "Social Media Systems",
    description:
      "Culture-defining content strategies, active brand community governance, and high-cadence distribution engines across platforms.",
    category: "growth",
    accentColor: "#00e5ff",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <circle cx="18" cy="5" r="3" stroke="currentColor" />
        <circle cx="6" cy="12" r="3" stroke="#00e5ff" strokeWidth="2" fill="rgba(0,229,255,0.15)" />
        <circle cx="18" cy="19" r="3" stroke="currentColor" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="currentColor" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="currentColor" />
      </svg>
    ),
  },
  {
    id: "07",
    tag: "FIELD",
    title: "Experiential Brand Events",
    description:
      "Turnkey spatial conceptualization, logistics, VIP activations, and high-impact physical launches leaving permanent impressions.",
    category: "activation",
    accentColor: "#ff5370",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <polygon
          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
          stroke="#ff5370"
          strokeWidth="1.75"
          fill="rgba(255,83,112,0.1)"
        />
      </svg>
    ),
  },
  {
    id: "08",
    tag: "IMPACT",
    title: "BTL Solutions & Field Ops",
    description:
      "Strategic on-ground consumer activations, retail showcases, immersive sampling, and tactical experiential executions at scale.",
    category: "activation",
    accentColor: "#00e5ff",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <circle cx="12" cy="12" r="10" stroke="currentColor" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" stroke="#00e5ff" strokeWidth="2" fill="rgba(0,229,255,0.15)" />
      </svg>
    ),
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState("");
  const waitlistRef = useRef<HTMLDivElement | null>(null);

  // Magnetic button spring physics
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);
  const smoothBtnX = useSpring(magneticX, { stiffness: 220, damping: 14 });
  const smoothBtnY = useSpring(magneticY, { stiffness: 220, damping: 14 });

  const handleMagneticMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    magneticX.set((e.clientX - centerX) * 0.28);
    magneticY.set((e.clientY - centerY) * 0.28);
  };

  const handleMagneticLeave = () => {
    magneticX.set(0);
    magneticY.set(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedToken = `#ATL-${Math.floor(1000 + Math.random() * 9000)}-X${Math.floor(Math.random() * 9 + 1)}`;
      setToken(generatedToken);
      setIsSubmitting(false);
      setSubmitted(true);
    }, 850);
  };

  // Stardust particle burst generation for celebration
  const burstParticles = Array.from({ length: 14 }).map((_, i) => {
    const angle = (i / 14) * Math.PI * 2;
    const distance = 95 + (i % 3) * 35;
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      scale: 0.6 + (i % 4) * 0.25,
      color: i % 2 === 0 ? "#00e5ff" : "#c084fc",
    };
  });

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-between bg-[#030712] text-slate-100 selection:bg-cyan-500/25 selection:text-white">
      {/* Interactive Ambient Cursor Glow */}
      <CursorGlow />

      {/* Interactive Background Stardust & Constellation Canvas */}
      <ConstellationCanvas />

      {/* Atmospheric Aurora Nebulae (Drifting Ambient Mesh) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Cyan Ambient Glow Orb */}
        <div className="absolute -top-[15%] left-[10%] w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.14)_0%,rgba(0,229,255,0.03)_40%,transparent_70%)] blur-3xl animate-aurora-1" />

        {/* Violet Ambient Glow Orb */}
        <div className="absolute top-[25%] -right-[15%] w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.13)_0%,rgba(99,102,241,0.03)_40%,transparent_70%)] blur-3xl animate-aurora-2" />

        {/* Soft Rose / Indigo Ambient Glow Orb */}
        <div className="absolute bottom-[10%] left-[20%] w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] rounded-full bg-[radial-gradient(circle,rgba(255,83,112,0.08)_0%,rgba(139,92,246,0.02)_45%,transparent_70%)] blur-3xl animate-aurora-3" />

        {/* Subtle Architectural Starlight Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Fine Noise Texture */}
        <div className="absolute inset-0 bg-noise" />
      </div>

      {/* Main Experience Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center flex-grow pt-16 sm:pt-24 pb-20">
        {/* Hero Section */}
        <motion.div
          className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto min-h-[64vh] mb-20 sm:mb-28"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Luminous Status Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/15 backdrop-blur-xl mb-8 shadow-[0_0_20px_rgba(0,229,255,0.1)] hover:border-cyan-400/40 transition-colors cursor-default"
          >
            <div className="relative flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping opacity-75" />
              <span className="absolute w-2 h-2 rounded-full bg-cyan-400" />
            </div>
            <span className="font-mono text-[11px] tracking-[0.25em] text-slate-300 font-semibold uppercase">
              SYS.STATUS // PHASE ONE ACTIVE
            </span>
          </motion.div>

          {/* Hero Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-heading text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-8 leading-[1.08] text-white uppercase"
          >
            Crafting Digital{" "}
            <span className="text-gradient-aurora drop-shadow-[0_0_40px_rgba(0,229,255,0.25)] block sm:inline">
              Excellence.
            </span>
          </motion.h1>

          {/* Editorial Value Proposition */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed mb-12 tracking-wide"
          >
            An exclusive digital atelier designing bespoke brand experiences, high-end visual narratives, and sophisticated digital platforms for the world&apos;s most discerning brands.
          </motion.p>

          {/* Waitlist Invitation Terminal Capsule */}
          <motion.div ref={waitlistRef} variants={itemVariants} className="w-full max-w-xl mt-2 relative">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="waitlist-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  onSubmit={handleSubmit}
                  className="group relative flex flex-col sm:flex-row items-center w-full p-1.5 rounded-2xl sm:rounded-full bg-white/[0.03] border border-white/15 backdrop-blur-2xl transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)] focus-within:border-cyan-400/60 focus-within:shadow-[0_0_40px_rgba(0,229,255,0.3)] focus-within:bg-white/[0.05]"
                >
                  {/* Continuous Orbiting Conic Border Beam */}
                  <BorderBeam
                    colorFrom="#00e5ff"
                    colorTo="#c084fc"
                    duration={10}
                    size={220}
                    borderWidth={1.5}
                    className="opacity-75 group-focus-within:opacity-100 transition-opacity"
                  />

                  <div className="flex items-center w-full pl-5 pr-3 py-2 sm:py-0 relative z-10">
                    <span className="text-slate-400 group-focus-within:text-cyan-400 transition-colors shrink-0">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ENTER WORK EMAIL FOR ACCESS"
                      required
                      className="w-full bg-transparent text-white font-mono text-xs sm:text-sm placeholder-slate-500 tracking-wider outline-none px-3.5 py-2 uppercase"
                    />
                  </div>

                  {/* Magnetic Submit Button */}
                  <motion.button
                    ref={btnRef}
                    style={{ x: smoothBtnX, y: smoothBtnY }}
                    onMouseMove={handleMagneticMove}
                    onMouseLeave={handleMagneticLeave}
                    type="submit"
                    disabled={isSubmitting}
                    className="relative z-10 group/btn w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl sm:rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-mono font-bold text-xs tracking-widest uppercase transition-all duration-300 disabled:opacity-50 cursor-pointer shrink-0 shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_35px_rgba(0,229,255,0.6)] active:scale-95"
                  >
                    {isSubmitting ? (
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>REQUEST ACCESS</span>
                        <span className="text-sm transition-transform group-hover/btn:translate-x-1">
                          ↗
                        </span>
                      </>
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                <div className="relative">
                  {/* Stardust Particle Burst */}
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-20">
                    {burstParticles.map((p, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                        animate={{
                          x: p.x,
                          y: p.y,
                          opacity: [0, 1, 0],
                          scale: [0, p.scale, 0],
                        }}
                        transition={{
                          duration: 1.1,
                          ease: "easeOut",
                          delay: idx * 0.02,
                        }}
                        className="absolute w-2 h-2 rounded-full blur-[0.5px]"
                        style={{
                          backgroundColor: p.color,
                          boxShadow: `0 0 12px ${p.color}`,
                        }}
                      />
                    ))}
                  </div>

                  <motion.div
                    key="waitlist-confirmed"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="relative overflow-hidden flex flex-col items-center justify-center p-6 rounded-2xl sm:rounded-3xl bg-cyan-950/40 border border-cyan-400/40 backdrop-blur-2xl text-center shadow-[0_0_50px_rgba(0,229,255,0.25)]"
                  >
                    <BorderBeam
                      colorFrom="#00e5ff"
                      colorTo="#c084fc"
                      duration={8}
                      size={200}
                      borderWidth={2}
                    />

                    <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs tracking-widest uppercase mb-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      <span className="font-bold">INVITATION RESERVED // {token}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-md font-light">
                      Transmission encrypted. Your priority verification packet has been scheduled for delivery to <span className="text-cyan-300 font-mono font-medium">{email}</span>.
                    </p>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            <p className="mt-5 font-mono text-[11px] text-slate-400 tracking-[0.2em] uppercase">
              [ EXCLUSIVE COHORT ACCESS // LIMITED SLOTS 2026 ]
            </p>
          </motion.div>
        </motion.div>

        {/* Capabilities Section Header */}
        <motion.div
          className="flex flex-col items-start w-full mb-12 text-left max-w-6xl mx-auto border-t border-white/10 pt-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00e5ff]" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-300/90 font-semibold">
              01 // CORE CAPABILITIES INDEX
            </span>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase"
          >
            Engineering What&apos;s Next
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-light"
          >
            Synthesizing high-art cinematic storytelling, architectural brand identity, and next-generation software execution.
          </motion.p>
        </motion.div>

        {/* Capabilities Grid (8 Modules) */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {services.map((service) => (
            <CapabilityCard key={service.id} service={service} variants={itemVariants} />
          ))}
        </motion.div>
      </div>

      {/* System Telemetry Footer */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-400 uppercase tracking-widest">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-slate-300 font-medium">CORE ENGINE: ACTIVE</span>
          </div>
          <span className="text-white/15 hidden sm:inline">|</span>
          <span className="hidden sm:inline text-slate-400">ENCRYPTION: QUANTUM-GRADE</span>
        </div>

        <div className="flex items-center gap-6 text-[11px] text-slate-400">
          <span className="text-cyan-400/80">AUTHENTICATED DIGITAL PRESENCE</span>
          <span className="text-white/15">/</span>
          <span>© 2026 ATELIER LABS</span>
        </div>
      </footer>
    </main>
  );
}
