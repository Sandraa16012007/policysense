"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Settings, FileText, CheckCircle2, ShieldAlert, IndianRupee, Clock, MessageSquare } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] pt-32 pb-20 overflow-hidden flex items-center">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-accent/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <span className="flex h-2 w-2 rounded-full bg-primary" />
            PolicySense AI Engine 2.0
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-6 tracking-tight">
            Turn Policy Chaos <br className="hidden md:block" /> into Clear <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Business Actions</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 mb-8 max-w-xl leading-relaxed">
            Understand what applies to you, what to do next, and what it means for your business — instantly.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 group">
              <Link href="/auth">Get Started</Link>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-medium transition-colors">
              <Play size={18} className="text-accent" />
              Try Demo
            </button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 flex items-center gap-6 text-sm text-foreground/60">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-accent" /> Source-Grounded
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-accent" /> Personalized
            </div>
          </div>
        </motion.div>

        {/* Right: 3D Visualization — Desktop */}
        <div className="relative h-[600px] w-full hidden lg:block perspective-1000">
          <motion.div 
            initial={{ opacity: 0, rotateX: 20, rotateY: -20 }}
            animate={{ opacity: 1, rotateX: 10, rotateY: -15 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 transform-style-3d"
          >
            {/* Phone Base */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute left-0 top-[20%] w-64 h-[440px] bg-background/40 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-4 shadow-2xl flex flex-col"
              style={{ transform: "translateZ(0px)" }}
            >
              <div className="w-full h-full border border-white/10 rounded-[2rem] bg-gradient-to-b from-white/5 to-transparent p-3 flex flex-col relative overflow-hidden">
                {/* Phone notch */}
                <div className="w-1/3 h-1 bg-white/20 rounded-full mx-auto mb-2" />

                {/* News article wireframe */}
                <div className="flex-1 flex flex-col gap-2 overflow-hidden">
                  {/* Top nav bar */}
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded bg-primary/30" />
                      <div className="w-14 h-1.5 bg-white/20 rounded-full" />
                    </div>
                    <div className="flex gap-1.5">
                      <div className="w-4 h-4 rounded bg-white/10" />
                      <div className="w-4 h-4 rounded bg-white/10" />
                    </div>
                  </div>

                  {/* Hero image placeholder */}
                  <div className="w-full h-24 bg-primary/8 rounded-lg border border-primary/15 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-accent/10" />
                    {/* Landscape icon wireframe */}
                    <div className="relative z-10 flex flex-col items-center gap-1 opacity-40">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/50">
                        <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                        <circle cx="8" cy="10" r="2" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M2 16l5-5 3 3 4-4 8 6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    {/* Category badge */}
                    <div className="absolute top-2 left-2 bg-primary/30 text-primary px-2 py-0.5 rounded text-[7px] font-bold tracking-wider uppercase border border-primary/30">Policy</div>
                  </div>

                  {/* Headline */}
                  <div className="flex flex-col gap-1 mt-1">
                    <div className="w-[90%] h-2.5 bg-white/25 rounded-full" />
                    <div className="w-[70%] h-2.5 bg-white/25 rounded-full" />
                  </div>

                  {/* Author & date row */}
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="w-4 h-4 rounded-full bg-accent/25 border border-accent/30" />
                    <div className="w-12 h-1.5 bg-white/15 rounded-full" />
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                    <div className="w-10 h-1.5 bg-white/10 rounded-full" />
                  </div>

                  {/* Body text paragraph 1 */}
                  <div className="flex flex-col gap-[5px] mt-1">
                    <div className="w-full h-[3px] bg-white/10 rounded-full" />
                    <div className="w-full h-[3px] bg-white/10 rounded-full" />
                    <div className="w-[85%] h-[3px] bg-white/10 rounded-full" />
                    <div className="w-full h-[3px] bg-white/10 rounded-full" />
                    <div className="w-[60%] h-[3px] bg-white/10 rounded-full" />
                  </div>

                  {/* Body text paragraph 2 */}
                  <div className="flex flex-col gap-[5px] mt-1">
                    <div className="w-full h-[3px] bg-white/8 rounded-full" />
                    <div className="w-[90%] h-[3px] bg-white/8 rounded-full" />
                    <div className="w-full h-[3px] bg-white/8 rounded-full" />
                    <div className="w-[75%] h-[3px] bg-white/8 rounded-full" />
                  </div>
                </div>
                
                {/* Floating extraction particles from phone */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      x: [0, 100, 200], 
                      y: [0, -50 + i * 20, -100 + i * 40],
                      opacity: [0, 1, 0],
                      scale: [0.5, 1, 0.5]
                    }}
                    transition={{ repeat: Infinity, duration: 3, delay: i * 0.8, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 w-4 h-4 bg-primary/50 shadow-[0_0_15px_rgba(79,141,242,0.8)] rounded-full blur-[2px]"
                  />
                ))}
              </div>
            </motion.div>

            {/* Pipeline Stage 1: Extraction Cards */}
            <motion.div 
              className="absolute left-40 top-[15%] flex flex-col gap-4"
              style={{ transform: "translateZ(40px)" }}
            >
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="w-48 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-3 shadow-lg flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-md"><FileText size={16} className="text-primary" /></div>
                <div className="flex-1"><div className="w-full h-2 bg-white/20 mb-1 rounded" /><div className="w-2/3 h-1.5 bg-white/10 rounded" /></div>
              </motion.div>
              <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 4, delay: 1 }} className="w-48 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-3 shadow-lg flex items-center gap-3">
                <div className="bg-accent/20 p-2 rounded-md"><Clock size={16} className="text-accent" /></div>
                <div className="flex-1"><div className="w-full h-2 bg-white/20 mb-1 rounded" /><div className="w-2/3 h-1.5 bg-white/10 rounded" /></div>
              </motion.div>
            </motion.div>

            {/* Pipeline Stage 2: Decision Core */}
            <motion.div 
              className="absolute left-[45%] top-[30%] w-32 h-32"
              style={{ transform: "translateZ(80px)" }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }} className="absolute inset-0 rounded-full border border-dashed border-primary/50" />
                <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }} className="absolute inset-2 rounded-full border border-accent/40" />
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full shadow-[0_0_30px_rgba(244,181,30,0.5)] flex items-center justify-center">
                  <span className="text-white font-bold text-xs">AI Core</span>
                </div>

                {/* Streams */}
                <motion.div className="absolute right-[-100px] top-4 h-0.5 w-24 bg-gradient-to-r from-accent to-transparent" />
                <motion.div className="absolute right-[-100px] bottom-4 h-0.5 w-24 bg-gradient-to-r from-white/20 to-transparent" />
              </div>
            </motion.div>

            {/* Pipeline Stage 3 & 4: Output Elements */}
            <motion.div 
              className="absolute right-0 top-[10%] flex flex-col gap-6"
              style={{ transform: "translateZ(120px)" }}
            >
              {/* Savings Node */}
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="w-56 bg-background/80 backdrop-blur-xl border border-accent/30 rounded-xl p-4 shadow-[0_10px_30px_rgba(244,181,30,0.1)] relative">
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-accent rounded-full border-4 border-background flex items-center justify-center z-10">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-accent/20 p-1.5 rounded-lg"><IndianRupee size={16} className="text-accent" /></div>
                  <span className="text-sm font-medium text-foreground/80">Est. Impact</span>
                </div>
                <div className="text-2xl font-bold text-white">₹ 1,50,000</div>
                <div className="text-xs text-green-400 mt-1 flex items-center gap-1">+ Savings Opportunity</div>
              </motion.div>

              {/* Action Graph Node */}
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 4.5, delay: 1 }} className="w-56 bg-background/80 backdrop-blur-xl border border-primary/30 rounded-xl p-4 shadow-[0_10px_30px_rgba(79,141,242,0.1)] relative ml-8">
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-primary rounded-full border-4 border-background flex items-center justify-center z-10">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">1</div>
                  <div>
                    <div className="text-sm font-medium text-white">File Annexure B</div>
                    <div className="text-xs text-red-400 flex items-center gap-1 mt-1"><Clock size={12} />Due in 3 days</div>
                  </div>
                </div>
              </motion.div>

              {/* Chat Bubble Node */}
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 5.5, delay: 2 }} className="w-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl rounded-tr-sm p-4 text-sm text-foreground/90 ml-4">
                <div className="flex gap-2">
                  <MessageSquare size={16} className="text-primary mt-0.5 shrink-0" />
                  <p>In simple terms, this new IT policy mandates filling Annexure B to claim your tax rebate of ₹1.5L.</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile: Simplified Hero Visual */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="lg:hidden relative w-full"
        >
          <div className="relative mx-auto w-[260px] h-[420px]">
            {/* Glow behind phone */}
            <div className="absolute -inset-8 bg-primary/15 rounded-full blur-[60px]" />
            
            {/* Phone Frame */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="relative w-full h-full bg-background/60 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-3 shadow-2xl"
            >
              <div className="w-full h-full border border-white/10 rounded-[2rem] bg-gradient-to-b from-white/5 to-transparent p-4 flex flex-col gap-3 relative overflow-hidden">
                {/* Notch */}
                <div className="w-1/3 h-1 bg-white/20 rounded-full mx-auto mb-2" />
                
                {/* Simulated News Article */}
                <div className="w-full h-28 bg-primary/10 rounded-xl border border-primary/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="w-3/4 h-2 bg-white/25 rounded-full mb-1.5" />
                    <div className="w-1/2 h-1.5 bg-white/15 rounded-full" />
                  </div>
                  <Settings className="absolute top-2 right-2 text-primary/40" size={14} />
                </div>
                
                {/* Content Lines */}
                <div className="flex flex-col gap-2 mt-1">
                  <div className="w-3/4 h-2.5 bg-white/20 rounded-full" />
                  <div className="w-full h-2 bg-white/10 rounded-full" />
                  <div className="w-5/6 h-2 bg-white/10 rounded-full" />
                </div>

                {/* Mini Action Card */}
                <div className="mt-auto bg-accent/10 border border-accent/30 rounded-xl p-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <IndianRupee size={14} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">₹ 1,50,000</div>
                    <div className="text-[10px] text-green-400">Savings Found</div>
                  </div>
                </div>

                {/* Mini Chat Bubble */}
                <div className="bg-white/5 border border-white/10 rounded-xl rounded-tr-sm p-2.5 flex gap-2">
                  <MessageSquare size={12} className="text-primary mt-0.5 shrink-0" />
                  <p className="text-[10px] text-foreground/70 leading-relaxed">File Annexure B to claim your tax rebate...</p>
                </div>
              </div>
            </motion.div>

            {/* Floating particles around mobile phone */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  y: [0, -20, 0],
                  x: [0, (i - 1) * 15, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{ repeat: Infinity, duration: 3 + i, delay: i * 0.5, ease: "easeInOut" }}
                className="absolute w-2 h-2 bg-primary/60 rounded-full shadow-[0_0_10px_rgba(79,141,242,0.6)]"
                style={{ 
                  top: `${20 + i * 30}%`, 
                  left: i % 2 === 0 ? '-12px' : 'auto',
                  right: i % 2 !== 0 ? '-12px' : 'auto',
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
