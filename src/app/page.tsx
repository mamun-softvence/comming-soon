"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

const services = [
  {
    title: "Branding & Visuals",
    description: "Identity systems, logos, guidelines and visual language that make a brand instantly recognizable.",
  },
  {
    title: "Event Planning",
    description: "End-to-end concept, logistics and on-ground execution for launches, activations and brand events.",
  },
  {
    title: "IMC Planning",
    description: "Integrated marketing communication strategy that aligns every channel around one clear message.",
  },
  {
    title: "Photography",
    description: "Product, lifestyle and campaign photography shot for print, digital and social.",
  },
  {
    title: "Social Media Management",
    description: "Content calendars, community management and platform strategy across all major channels.",
  },
  {
    title: "TVC / OVC / AV",
    description: "Television, online video and audio-visual production from script to final cut.",
  },
  {
    title: "BTL Solution",
    description: "Below-the-line activations — sampling, in-store, roadshows and experiential marketing.",
  },
  {
    title: "Marketing",
    description: "Full-funnel marketing strategy, media planning and performance campaigns.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.8 },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 10, filter: "blur(5px)" },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: { type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.6 }
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden flex flex-col items-center py-20 px-4 sm:px-8">
      {/* Ambient Animated Background Glows using framer-motion for organic feel */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1.1, 1],
            x: [0, 40, -20, 0],
            y: [0, -50, 20, 0],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[5%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-rose-600/20 mix-blend-screen filter blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 0.9, 1],
            x: [0, -40, 30, 0],
            y: [0, 50, -30, 0],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-amber-600/20 mix-blend-screen filter blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1.25, 1],
            x: [0, 20, -40, 0],
            y: [0, 30, -20, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-orange-600/15 mix-blend-screen filter blur-[120px]"
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4wNSIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTAgNDBoNDBWMEgwem0wIDBoNDBWMEgwem0wIDBoNDBWMEgwem0wIDBoNDBWMEgweiIvPjwvZz48L3N2Zz4=')] opacity-30 pointer-events-none z-0" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col h-full mt-10 sm:mt-20">
        
        <motion.div 
          className="flex flex-col items-center text-center mb-20 sm:mb-32"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={badgeVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(251,191,36,0.1)]">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]"></span>
            <span className="text-xs font-medium uppercase tracking-widest text-neutral-300">Coming Soon</span>
          </motion.div>
          
          {/* Hero Title */}
          <motion.h1 variants={itemVariants} className="font-heading text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight mb-6 leading-[1.1]">
            Your Vision, <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-orange-400">
              Amplified.
            </span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p variants={itemVariants} className="max-w-2xl text-lg sm:text-xl text-neutral-400 font-light leading-relaxed">
            A full-funnel creative agency specializing in brand identity, dynamic media production, and on-ground activations.
          </motion.p>
        </motion.div>

        {/* Services Showcase Section */}
        <motion.div 
          className="flex flex-col items-center w-full mb-12 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
           <motion.h2 variants={itemVariants} className="font-heading text-3xl sm:text-4xl font-bold mb-4 tracking-tight">Our Expertise</motion.h2>
           <motion.div variants={itemVariants} className="h-1 w-20 bg-gradient-to-r from-amber-400 to-rose-500 rounded-full mb-12"></motion.div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex flex-col p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white/[0.06] hover:border-white/20 cursor-default shadow-xl hover:shadow-[0_8px_40px_rgba(251,191,36,0.12)] overflow-hidden"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.12] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-rose-500 to-orange-500 rounded-3xl blur opacity-0 group-hover:opacity-15 transition duration-700 group-hover:duration-300"></div>
              
              <div className="relative z-10">
                <h3 className="font-heading text-xl font-bold text-white mb-3 tracking-wide transition-colors duration-500 group-hover:text-amber-100">{service.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed font-light">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </main>
  );
}
