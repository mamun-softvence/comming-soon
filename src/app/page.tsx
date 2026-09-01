import React from "react";

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

export default function Home() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#0a0a0a] text-white flex flex-col justify-center items-center px-4 sm:px-8">
      {/* Ambient Animated Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-violet-600/30 mix-blend-screen filter blur-[100px] animate-blob" />
      <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-cyan-600/30 mix-blend-screen filter blur-[100px] animate-blob [animation-delay:2s]" />
      <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-fuchsia-600/20 mix-blend-screen filter blur-[120px] animate-blob [animation-delay:4s]" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4wNSIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTAgNDBoNDBWMEgwem0wIDBoNDBWMEgwem0wIDBoNDBWMEgwem0wIDBoNDBWMEgweiIvPjwvZz48L3N2Zz4=')] opacity-30 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col h-full justify-center">

        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-24 opacity-0 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-xs font-medium uppercase tracking-widest text-gray-300">Coming Soon</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight mb-6 leading-[1.1]">
            Crafting the <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400">
              Future of Digital
            </span>
          </h1>

          <p className="max-w-2xl text-lg sm:text-xl text-gray-400 font-light">
            From conceptual ideation to production, we transform vision into reality.
          </p>
        </div>

        {/* Services Showcase */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full opacity-0 animate-fade-up [animation-delay:0.3s]">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative flex flex-col p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 cursor-default"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div> */}

      </div>
    </main>
  );
}
