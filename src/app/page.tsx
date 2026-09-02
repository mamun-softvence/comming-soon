"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

const services = [
  {
    title: "Full Tech Solutions",
    description: "End-to-end web applications, from initial design to production.",
  },
  {
    title: "Branding Solutions",
    description: "Crafting unique identities that resonate with your audience.",
  },
  {
    title: "3D Visualization",
    description: "Immersive 3D experiences bringing concepts to life.",
  },
  {
    title: "Conceptual Ideation",
    description: "Transforming abstract ideas into actionable strategies.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 50, damping: 20 },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { type: "spring", stiffness: 100, damping: 10 }
  },
};

export default function Home() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#0a0a0a] text-white flex flex-col justify-center items-center px-4 sm:px-8">
      {/* Ambient Animated Background Glows using framer-motion for organic feel */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 30, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-violet-600/20 mix-blend-screen filter blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -30, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-cyan-600/20 mix-blend-screen filter blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 20, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-fuchsia-600/15 mix-blend-screen filter blur-[120px]"
      />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4wNSIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTAgNDBoNDBWMEgwem0wIDBoNDBWMEgwem0wIDBoNDBWMEgwem0wIDBoNDBWMEgweiIvPjwvZz48L3N2Zz4=')] opacity-30 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col h-full justify-center">
        
        <motion.div 
          className="flex flex-col items-center text-center mb-16 sm:mb-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={badgeVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
            <span className="text-xs font-medium uppercase tracking-widest text-gray-300">Coming Soon</span>
          </motion.div>
          
          {/* Hero Title */}
          <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight mb-6 leading-[1.1]">
            Crafting the <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400">
              Future of Digital
            </span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p variants={itemVariants} className="max-w-2xl text-lg sm:text-xl text-gray-400 font-light leading-relaxed">
            From conceptual ideation to production, we transform vision into reality.
          </motion.p>
        </motion.div>

        {/* Services Showcase */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex flex-col p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl transition-colors duration-500 hover:bg-white/[0.05] hover:border-white/10 cursor-default shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <h3 className="text-lg font-semibold text-white mb-2 tracking-wide">{service.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed font-light">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </main>
  );
}
