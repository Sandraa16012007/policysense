"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Network, TrendingUp, Sparkles, BookOpenCheck, UserCog, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    id: "applicability",
    title: "Applicability Engine",
    description: "Know instantly if a policy applies to you with confidence-based reasoning and zero noise.",
    icon: Filter,
    accent: "primary",
    visual: () => (
      <div className="w-full h-full flex items-center justify-center relative">
        {/* Decorative rings */}
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute w-48 h-48 border border-primary/15 rounded-full" />
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }} className="absolute w-32 h-32 border border-dashed border-primary/30 rounded-full animate-spin-slow" />
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute w-64 h-64 bg-primary/5 rounded-full blur-xl" />
        
        <div className="z-10 bg-background/90 backdrop-blur-sm border border-white/10 p-6 rounded-2xl shadow-2xl shadow-primary/10 flex flex-col items-center gap-4">
          <div className="text-xs font-semibold text-white/40 tracking-widest uppercase mb-1">Policy Input</div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-14 h-14 bg-gradient-to-br from-primary/30 to-primary/10 rounded-2xl flex items-center justify-center border border-primary/40 shadow-[0_0_20px_rgba(79,141,242,0.3)]"
          >
            <Filter size={22} className="text-primary" />
          </motion.div>
          <div className="flex gap-10 mt-3">
            <div className="flex flex-col items-center">
              <motion.div initial={{ height: 0 }} animate={{ height: 48 }} className="w-0.5 bg-gradient-to-b from-primary/50 to-accent" />
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} className="mt-3 bg-accent/20 text-accent px-4 py-1.5 rounded-lg text-xs font-bold ring-1 ring-accent/50 shadow-[0_0_15px_rgba(244,181,30,0.2)]">YES (94%)</motion.div>
            </div>
            <div className="flex flex-col items-center opacity-40">
              <motion.div initial={{ height: 0 }} animate={{ height: 48 }} className="w-0.5 bg-gradient-to-b from-primary/50 to-white/10" />
              <div className="mt-3 bg-white/5 text-white/50 px-4 py-1.5 rounded-lg text-xs font-bold ring-1 ring-white/10">NO</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "action-graph",
    title: "Action Graph",
    description: "Get a step-by-step execution plan with automatically extracted deadlines and dependencies.",
    icon: Network,
    accent: "primary",
    visual: () => (
      <div className="w-full h-full flex flex-col items-center justify-center relative p-8">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        <div className="flex justify-between w-full mb-10 relative z-10">
          <div className="absolute top-1/2 left-12 right-12 h-px -translate-y-1/2 -z-10">
            <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1 }} className="h-full bg-gradient-to-r from-primary/40 via-primary/60 to-primary/20" />
          </div>
          {[1, 2, 3].map((n, i) => (
            <motion.div 
              key={n} 
              initial={{ scale: 0, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ delay: i * 0.2, type: "spring" }}
              className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center text-lg font-bold transition-all",
                i < 2 
                  ? "bg-primary/15 border border-primary/40 text-primary shadow-[0_0_20px_rgba(79,141,242,0.3)]" 
                  : "bg-white/5 border border-white/10 text-white/30"
              )}
            >
              {n}
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="relative z-10 w-72 bg-background/80 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">2</div>
            <div className="text-sm font-semibold text-white">Submit Form B</div>
          </div>
          <div className="text-xs text-red-400 font-medium bg-red-400/10 px-3 py-1.5 inline-flex items-center rounded-lg gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            Due in 48 hours
          </div>
        </motion.div>
      </div>
    ),
  },
  {
    id: "impact",
    title: "Impact Simulator",
    description: "Estimate financial outcomes and compare the ROI of compliance versus non-compliance.",
    icon: TrendingUp,
    accent: "accent",
    visual: () => (
      <div className="w-full h-full flex items-center justify-center gap-6 p-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/3 to-transparent" />
        
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="relative z-10 flex-1 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-colors">
          <div className="text-xs text-white/40 mb-3 font-semibold tracking-widest uppercase">Ignore Policy</div>
          <div className="text-3xl font-bold text-red-400 mb-1">-₹ 50,000</div>
          <div className="text-xs text-white/40 mt-2">Potential Penalties</div>
          <div className="mt-4 w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div initial={{ width: "0%" }} animate={{ width: "80%" }} transition={{ delay: 0.5, duration: 1 }} className="h-full bg-red-400/40 rounded-full" />
          </div>
        </motion.div>
        
        <div className="text-white/15 font-bold text-lg relative z-10">VS</div>
        
        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="relative z-10 flex-1 bg-gradient-to-br from-accent/15 to-accent/5 border border-accent/30 p-6 rounded-2xl shadow-[0_0_40px_rgba(244,181,30,0.1)] relative overflow-hidden hover:border-accent/50 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-t from-accent/10 to-transparent" />
          <div className="relative z-10">
            <div className="text-xs text-white/60 mb-3 font-semibold tracking-widest uppercase">Adopt Early</div>
            <div className="text-3xl font-bold text-accent mb-1">+₹ 1.25L</div>
            <div className="text-xs text-white/60 mt-2 flex items-center gap-1.5">
              <Sparkles size={12} className="text-accent" /> Value Unlocked
            </div>
            <div className="mt-4 w-full h-1 bg-accent/10 rounded-full overflow-hidden">
              <motion.div initial={{ width: "0%" }} animate={{ width: "95%" }} transition={{ delay: 0.5, duration: 1 }} className="h-full bg-accent/50 rounded-full" />
            </div>
          </div>
        </motion.div>
      </div>
    ),
  },
  {
    id: "opportunity",
    title: "Opportunity Detector",
    description: "Discover hidden benefits and subsidies you automatically qualify for, turning risk into value.",
    icon: Sparkles,
    accent: "accent",
    visual: () => (
      <div className="w-full h-full flex items-center justify-center relative p-8">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
        
        <div className="relative z-10 w-full max-w-sm">
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: i === 2 ? 1 : 0.4 }}
                transition={{ delay: i * 0.15 }}
                className={cn(
                  "p-4 rounded-xl border backdrop-blur-sm flex items-center justify-between transition-all",
                  i === 2 ? "bg-accent/10 border-accent/50 shadow-[0_0_30px_rgba(244,181,30,0.15)]" : "bg-white/5 border-white/10"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn("w-2.5 h-2.5 rounded-full", i === 2 ? "bg-accent animate-pulse shadow-[0_0_8px_rgba(244,181,30,0.6)]" : "bg-white/20")} />
                  <div className="text-sm font-medium">{i === 2 ? "MSME Tech Subsidy" : `Standard Clause ${i}`}</div>
                </div>
                {i === 2 && <span className="text-xs font-bold text-accent bg-accent/20 px-3 py-1 rounded-lg ring-1 ring-accent/30">MATCH</span>}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "grounded-ai",
    title: "Source-Grounded AI",
    description: "Every insight is backed by exact source text citations. Fully transparent reasoning, no hallucinations.",
    icon: BookOpenCheck,
    accent: "primary",
    visual: () => (
      <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative z-10 w-full max-w-md bg-white/5 border border-white/10 p-5 rounded-2xl rounded-bl-sm shadow-lg">
          <p className="text-sm text-foreground/80 leading-relaxed">
            The deadline for compliance is <span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded animate-pulse cursor-pointer border-b border-primary border-dashed">March 31st, 2025</span>. Ensure all annexures are filed to avoid penalties.
          </p>
        </motion.div>
        
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="relative z-10 w-full max-w-md ml-12 bg-primary/10 border border-primary/20 p-4 rounded-2xl text-xs shadow-[0_0_20px_rgba(79,141,242,0.1)]">
          <div className="text-primary font-semibold mb-2 flex items-center gap-2">
            <BookOpenCheck size={14} /> Citation from Official Gazette (Section 4.1.a)
          </div>
          <div className="text-white/60 italic border-l-2 border-primary/50 pl-3">
            &quot;All registered entities must submit necessary compliance documentation, including Annexure B, absolutely no later than the 31st day of March, 2025.&quot;
          </div>
        </motion.div>
      </div>
    ),
  },
  {
    id: "personalization",
    title: "Personalization Engine",
    description: "Receive tailored outputs based on your specific role, industry, and geographic location.",
    icon: UserCog,
    accent: "accent",
    visual: () => (
      <div className="w-full h-full flex items-center justify-center p-8 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-accent/5 via-transparent to-primary/5" />
        
        <div className="relative z-10 w-full max-w-md flex flex-col items-center">
          <div className="w-full h-32 bg-gradient-to-b from-primary/15 to-transparent border border-primary/15 rounded-t-2xl flex items-center justify-center mb-[-2rem] relative z-0">
            <span className="text-sm font-bold text-primary/60 mb-4 tracking-widest uppercase">Master Policy</span>
          </div>
          
          <div className="flex gap-4 w-full justify-center relative z-10">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 0.5 }} className="bg-white/5 border border-white/10 p-4 rounded-xl text-center w-1/3">
              <div className="w-8 h-8 rounded-full bg-white/10 mx-auto mb-2" />
              <div className="text-xs text-white/50">Startup Founder</div>
            </motion.div>
            
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: -10, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-accent/10 border border-accent/40 p-4 rounded-xl text-center w-1/3 shadow-[0_10px_40px_rgba(244,181,30,0.15)]">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-2 ring-2 ring-accent/50 outline outline-4 outline-background">
                <UserCog size={20} className="text-accent" />
              </div>
              <div className="text-sm font-bold text-accent mb-1">CFO / Finance</div>
              <div className="text-[10px] text-white/60">Tax implications highlighted</div>
            </motion.div>
            
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 0.5 }} transition={{ delay: 0.4 }} className="bg-white/5 border border-white/10 p-4 rounded-xl text-center w-1/3">
              <div className="w-8 h-8 rounded-full bg-white/10 mx-auto mb-2" />
              <div className="text-xs text-white/50">Legal Counsel</div>
            </motion.div>
          </div>
        </div>
      </div>
    ),
  },
];

const AUTO_PLAY_DELAY = 2500; // 2.5 seconds

export default function Features() {
  const [activeTab, setActiveTab] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const goTo = useCallback((index: number) => {
    setActiveTab(index);
    // Scroll slider card into view on mobile
    if (sliderRef.current) {
      const cards = sliderRef.current.children;
      if (cards[index]) {
        (cards[index] as HTMLElement).scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, []);

  const goNext = useCallback(() => {
    goTo((activeTab + 1) % features.length);
  }, [activeTab, goTo]);

  const goPrev = useCallback(() => {
    goTo((activeTab - 1 + features.length) % features.length);
  }, [activeTab, goTo]);

  useEffect(() => {
    if (!isHovered) {
      timeoutRef.current = setTimeout(() => {
        goNext();
      }, AUTO_PLAY_DELAY);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [activeTab, isHovered, goNext]);

  const ActiveVisual = features[activeTab].visual;

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight">
            How <span className="text-primary">PolicySense</span> Works
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            A complete intelligence suite designed to bridge the gap between complex information and confident action.
          </p>
        </div>

        <div 
          className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left: Tabs — Desktop vertical list, Mobile horizontal slider */}
          <div className="lg:col-span-5">
            {/* Desktop: Vertical tab list */}
            <div className="hidden lg:flex flex-col gap-2">
              {features.map((feature, index) => {
                const isActive = activeTab === index;
                const Icon = feature.icon;
                
                return (
                  <button
                    key={feature.id}
                    onClick={() => setActiveTab(index)}
                    className={cn(
                      "text-left p-5 rounded-2xl transition-all duration-300 relative overflow-hidden group border",
                      isActive 
                        ? "bg-accent/10 border-accent/30 shadow-lg shadow-accent/5" 
                        : "bg-transparent border-transparent hover:bg-white/5"
                    )}
                  >
                    {/* Progress Indicator */}
                    {isActive && !isHovered && (
                      <motion.div
                        key={`progress-${activeTab}`}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: AUTO_PLAY_DELAY / 1000, ease: "linear" }}
                        className="absolute bottom-0 left-0 h-0.5 bg-accent/40"
                      />
                    )}
                    {isActive && isHovered && (
                      <div className="absolute bottom-0 left-0 h-0.5 w-full bg-accent/40" />
                    )}

                    <div className="relative z-10 flex gap-4">
                      <div className={cn(
                        "mt-1 w-10 h-10 shrink-0 rounded-xl flex items-center justify-center transition-colors",
                        isActive ? "bg-accent/20 text-accent" : "bg-white/5 text-foreground/50 group-hover:bg-white/10 group-hover:text-foreground/80"
                      )}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 className={cn("text-xl font-bold mb-2 transition-colors", isActive ? "text-white" : "text-foreground/70 group-hover:text-white")}>
                          {feature.title}
                        </h3>
                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <p className="text-foreground/80 text-sm leading-relaxed pb-2">
                                {feature.description}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Mobile: Horizontal card slider */}
            <div className="lg:hidden">
              <div 
                ref={sliderRef}
                className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-6 px-6"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {features.map((feature, index) => {
                  const isActive = activeTab === index;
                  const Icon = feature.icon;
                  
                  return (
                    <button
                      key={feature.id}
                      onClick={() => setActiveTab(index)}
                      className={cn(
                        "snap-center shrink-0 w-[200px] text-left p-4 rounded-2xl transition-all duration-300 relative overflow-hidden border",
                        isActive
                          ? "bg-accent/10 border-accent/30 shadow-lg shadow-accent/5"
                          : "bg-white/5 border-white/10"
                      )}
                    >
                      {/* Progress bar for active mobile card */}
                      {isActive && !isHovered && (
                        <motion.div
                          key={`mobile-progress-${activeTab}`}
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: AUTO_PLAY_DELAY / 1000, ease: "linear" }}
                          className="absolute bottom-0 left-0 h-0.5 bg-accent/40"
                        />
                      )}
                      
                      <div className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center mb-3 transition-colors",
                        isActive ? "bg-accent/20 text-accent" : "bg-white/5 text-foreground/50"
                      )}>
                        <Icon size={18} />
                      </div>
                      <h3 className={cn(
                        "text-sm font-bold transition-colors",
                        isActive ? "text-white" : "text-foreground/70"
                      )}>
                        {feature.title}
                      </h3>
                    </button>
                  );
                })}
              </div>
              
              {/* Dots indicator */}
              <div className="flex items-center justify-center gap-1.5 mt-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goTo(index)}
                    className={cn(
                      "rounded-full transition-all duration-300",
                      activeTab === index ? "w-6 h-1.5 bg-accent" : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Dynamic Visual Content */}
          <div className="lg:col-span-7 h-[400px] md:h-[500px] w-full relative perspective-1000">
            <div className="h-full w-full bg-background/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
              {/* Enhanced decorative elements */}
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3 pointer-events-none" />
              
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-white/10 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-white/10 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-white/10 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-white/10 rounded-br-lg" />

              {/* Dot grid pattern */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <ActiveVisual />
                </motion.div>
              </AnimatePresence>

              {/* Navigation arrows */}
              <button 
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors backdrop-blur-sm z-20"
              >
                <ChevronLeft size={16} className="text-white/60" />
              </button>
              <button 
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors backdrop-blur-sm z-20"
              >
                <ChevronRight size={16} className="text-white/60" />
              </button>

              {/* Feature label badge */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-1.5 rounded-full z-20">
                <span className="text-xs font-semibold text-white/50">{features[activeTab].title}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
