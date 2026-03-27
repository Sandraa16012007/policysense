"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileSearch,
  ClipboardList,
  BarChart3,
  BellDot,
  User,
  ChevronDown,
  ChevronRight,
  LogOut,
  Bell,
  Shield,
  Briefcase,
  MapPin,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  TrendingUp,
  Info,
  Clock,
  Bookmark,
  Share2,
  FileText,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  Search,
  MessageSquare,
  ExternalLink,
  History,
  RotateCcw,
  AlertOctagon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";

/* ──────────────────────── TYPES ──────────────────────── */

type Tab = "General" | "Analyse" | "Results" | "Insights" | "Alerts";

/* ──────────────────────── COMPONENTS ──────────────────────── */

function StatusTag({ status }: { status: "Action Required" | "Monitor" | "No Impact" | string }) {
  const styles = {
    "Action Required": "bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]",
    Monitor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20 shadow-[0_0_15px_rgba(250,204,21,0.1)]",
    "No Impact": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]",
  };

  const currentStyle = styles[status as keyof typeof styles] || "bg-slate-500/10 text-slate-400 border-slate-500/20";

  return (
    <span className={cn("inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-widest", currentStyle)}>
      {status}
    </span>
  );
}

function SectionHeading({ title, subtitle, tooltip }: { title: string; subtitle?: string; tooltip?: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 group/title">
        <h3 className="text-xl font-display font-bold text-white tracking-tight">{title}</h3>
        {tooltip && (
          <div className="relative group/tooltip">
            <Info size={14} className="text-slate-600 hover:text-slate-400 cursor-help transition-colors" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#121c35] text-white text-[10px] font-bold rounded-lg border border-white/10 opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
              {tooltip}
            </div>
          </div>
        )}
      </div>
      {subtitle && <p className="text-sm text-slate-500 mt-1 font-medium">{subtitle}</p>}
    </div>
  );
}

function FloatingCard({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={cn("bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[32px] p-8 hover:border-white/20 transition-all group/card shadow-2xl overflow-hidden relative", className)}
    >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        {children}
    </motion.div>
  );
}

/* ──────────────────────── PAGE ──────────────────────── */

export default function ResultsDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [complexity, setComplexity] = useState<"Basic" | "Detailed">("Basic");
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setConfidence(92), 500);
    return () => clearTimeout(timer);
  }, []);

  /* ──────────────────────── NAVBAR ──────────────────────── */

  const Navbar = (
    <header className="fixed top-0 inset-x-0 h-20 bg-background/80 backdrop-blur-xl border-b border-white/10 z-[100] px-6 lg:px-12 flex items-center justify-between shadow-2xl">
      <Link href="/" className="flex items-center gap-3 group">
        <img src="/favicon.ico" alt="Logo" className="w-8 h-8 rounded-lg group-hover:rotate-12 transition-transform" />
        <span className="font-display font-black text-2xl tracking-tighter">
          <span className="text-primary">Policy</span>
          <span className="text-accent">Sense</span>
        </span>
      </Link>

      <div className="hidden lg:flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/10 shadow-inner">
        <Link href="/" className="px-6 py-2 rounded-xl text-sm font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-all">Home</Link>
        <Link href="/dashboard" className="px-6 py-2 rounded-xl text-sm font-bold text-white bg-primary shadow-lg shadow-primary/20">Dashboard</Link>
      </div>

      <div className="flex items-center gap-6">
        <button className="flex items-center justify-center w-12 h-12 rounded-2xl text-slate-400 hover:text-white hover:bg-white/10 transition-all relative group border border-transparent hover:border-white/10">
          <Bell size={22} className="group-hover:rotate-12 transition-transform" />
          <div className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background animate-pulse" />
        </button>

        <div className="h-10 w-px bg-white/10 hidden md:block" />

        <div className="relative">
          <button onClick={() => setProfileMenuOpen(!profileMenuOpen)} className="flex items-center gap-3 pl-2 pr-2 py-1.5 rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 transition-all group">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden border border-primary/20 group-hover:scale-105 transition-transform">
              <User size={20} />
            </div>
            <ChevronDown size={16} className={cn("text-slate-500 transition-transform group-hover:text-slate-300", profileMenuOpen && "rotate-180")} />
          </button>

          <AnimatePresence>
            {profileMenuOpen && (
              <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute top-full right-0 mt-4 w-72 bg-[#0c1222] border border-white/10 rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] p-3 z-[110]">
                <div className="px-5 py-4 border-b border-white/5 mb-2">
                  <p className="text-base font-bold text-white">Felix Miller</p>
                  <p className="text-xs text-slate-500 font-medium tracking-tight mt-0.5">felix@techstack.io</p>
                </div>
                <div className="space-y-1">
                  {[
                    { icon: User, label: "Account & Settings" },
                    { icon: ClipboardList, label: "User Context", sub: "Onboarding data" },
                    { icon: Bell, label: "Notification Preferences" },
                    { icon: Shield, label: "Privacy Controls" },
                  ].map((item, i) => (
                    <button key={i} className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-[14px] font-bold text-slate-400 hover:bg-white/5 hover:text-white transition-all group/item text-left">
                      <item.icon size={18} className="text-slate-500 group-hover/item:text-primary transition-colors" />
                      <div>
                        <div>{item.label}</div>
                        {item.sub && <div className="text-[10px] text-slate-600 font-black uppercase tracking-widest mt-0.5">{item.sub}</div>}
                      </div>
                    </button>
                  ))}
                  <div className="h-px bg-white/5 my-2 mx-5" />
                  <Link href="/" className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-[14px] font-bold text-red-400 hover:bg-red-500/10 transition-all text-left">
                    <LogOut size={18} />Logout
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );

  /* ──────────────────────── SIDEBAR ──────────────────────── */

  const Sidebar = (
    <aside className="fixed left-0 top-20 bottom-0 w-64 lg:w-80 bg-background border-r border-white/10 p-8 hidden md:flex flex-col z-90">
      <nav className="flex-1 space-y-2">
        {[
          { id: "General", icon: LayoutDashboard, href: "/dashboard" },
          { id: "Analyse", icon: FileSearch, href: "/dashboard?tab=Analyse" },
          { id: "Results", icon: ClipboardList, href: "/dashboard?tab=Results" },
          { id: "Insights", icon: BarChart3, href: "/dashboard?tab=Insights" },
          { id: "Alerts", icon: BellDot, href: "/dashboard?tab=Alerts" },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = item.id === "Results";
          return (
            <Link key={item.id} href={item.href} className={cn("w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-base font-bold transition-all group relative overflow-hidden", isActive ? "text-primary bg-primary/10 border border-primary/20 shadow-lg shadow-primary/5" : "text-slate-500 hover:text-slate-200 hover:bg-white/5")}>
              {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-primary rounded-r-full" />}
              <Icon size={22} className={cn("transition-all duration-300", isActive ? "text-primary scale-110" : "text-slate-600 group-hover:text-primary group-hover:translate-x-0.5")} />
              {item.id}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-6">
        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 group cursor-default">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4 group-hover:text-primary transition-colors">Your Insights Profile</p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20"><Briefcase size={14} /></div>
              <span className="text-xs font-bold text-slate-400">Founder / SaaS</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20"><MapPin size={14} /></div>
              <span className="text-xs font-bold text-slate-400">New Delhi, India</span>
            </div>
          </div>
          <button className="w-full mt-6 py-3 rounded-xl border border-white/5 text-[10px] uppercase font-black tracking-widest text-primary hover:bg-primary/10 hover:border-primary/20 transition-all">Update User Context</button>
        </div>
        <div className="px-4 text-center">
          <p className="text-[10px] text-slate-700 font-black uppercase tracking-tighter">&copy; 2026 PolicySense AI.</p>
          <p className="text-[9px] text-slate-800 font-bold mt-1">v1.5.0-STABLE</p>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-background font-sans text-slate-200 selection:bg-primary/30">
      {Navbar}

      <div className="flex pt-20">
        {Sidebar}

        <main className="flex-1 md:ml-64 lg:ml-80 bg-background min-h-[calc(100vh-80px)] overflow-x-hidden">
          <div className="p-8 lg:p-14 lg:pb-32 max-w-[1400px] mx-auto min-h-screen space-y-12">
            
            {/* Header / Breadcrumb */}
            <div className="flex items-center justify-between">
              <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-500 hover:text-white font-bold transition-all group">
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Back to All Results
              </button>
              <div className="flex items-center gap-3 text-slate-500 text-sm font-black uppercase tracking-widest">
                <History size={16} className="text-primary" />
                Analyzed on March 25, 2026
              </div>
            </div>

            {/* ACTION BAR (MOVED FROM STICKY FOOTER) */}
            <div className="bg-white/5 border border-white/10 p-2 md:p-3 rounded-2xl flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 md:gap-3">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95 text-xs">
                  <Bookmark size={16} />
                  Bookmark
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 text-white font-bold hover:bg-white/10 transition-all border border-white/10 active:scale-95 text-xs">
                  <Share2 size={16} />
                  Share
                </button>
              </div>
              <div className="h-6 w-px bg-white/10 hidden md:block" />
              <div className="flex items-center gap-2 md:gap-3">
                <button onClick={() => router.push('/dashboard?tab=Analyse')} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-slate-400 font-bold hover:text-white hover:bg-white/5 transition-all text-xs">
                  <RotateCcw size={16} />
                  Re-run Profile
                </button>
                <div className="h-6 w-px bg-white/10" />
                <button className="p-2 text-slate-500 hover:text-red-400 transition-all border border-transparent hover:bg-red-500/10 rounded-lg">
                  <AlertCircle size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-5xl font-display font-black text-white tracking-tight leading-[1.1]">GST Amendment Update 2026</h1>
              <p className="text-slate-400 text-lg max-w-3xl">Comprehensive analysis on new filing requirements for MSMEs in the IT sector, specifically targeting SaaS platforms operating in Delhi NCR.</p>
            </div>

            {/* 1. APPLICABILITY CARD */}
            <FloatingCard className="border-primary/30 bg-primary/[0.02]">
              <div className="lg:flex items-center justify-between gap-12">
                <div className="space-y-6 flex-1">
                  <SectionHeading 
                    title="Does this apply to you?" 
                    tooltip="Based on your profile and source analysis"
                  />
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <div className="text-6xl font-display font-black text-white tracking-tighter">YES</div>
                      <div className="px-5 py-2 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-black uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(34,197,94,0.15)] animate-pulse">
                        Direct Impact
                      </div>
                    </div>
                    <p className="text-slate-300 text-lg leading-relaxed max-w-xl">
                      This policy impacts <span className="text-white font-bold underline decoration-primary underline-offset-4">GST compliance for digital sellers</span> and platforms with cross-border transactions.
                    </p>
                  </div>
                </div>

                <div className="mt-8 lg:mt-0 flex items-center gap-8 lg:bg-white/[0.03] lg:p-10 lg:rounded-[40px] lg:border lg:border-white/5">
                    <div className="relative w-40 h-40">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-white/5" />
                        <motion.circle 
                          cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeDasharray="283" 
                          initial={{ strokeDashoffset: 283 }} animate={{ strokeDashoffset: 283 - (283 * confidence) / 100 }} transition={{ duration: 1.5, ease: "easeOut" }}
                          className="text-primary" 
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-display font-black text-white">{confidence}%</span>
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest -mt-1">Confidence</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                       <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Last verified</p>
                       <p className="text-lg font-bold text-white">2 days ago</p>
                       <div className="flex items-center gap-2 text-[10px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                          <CheckCircle2 size={12} />
                          Human Certified
                       </div>
                    </div>
                </div>
              </div>
              <div className="mt-10 pt-10 border-t border-white/5 flex flex-wrap gap-4">
                 <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-bold text-slate-400">
                    <Briefcase size={14} className="text-primary" /> Founder
                 </div>
                 <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-bold text-slate-400">
                    <MapPin size={14} className="text-primary" /> Delhi NCR
                 </div>
                 <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-bold text-slate-400">
                    <Sparkles size={14} className="text-primary" /> Fintech
                 </div>
              </div>
            </FloatingCard>

            <div className="grid grid-cols-12 gap-8">
              {/* 2. ACTION GRAPH (8 COLS) */}
              <div className="col-span-12 lg:col-span-8">
                <FloatingCard className="h-full">
                  <SectionHeading 
                    title="What should you do?" 
                    subtitle="Step-by-step execution plan"
                  />
                  <div className="mt-12 relative">
                    {/* The Graph */}
                    <div className="space-y-12">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Step 1 */}
                        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
                          <div className="bg-[#1a2333] border border-white/10 p-6 rounded-2xl hover:border-primary/50 transition-all group/step cursor-pointer shadow-xl relative z-10">
                             <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black mb-4 group-hover/step:scale-110 transition-transform">1</div>
                             <h4 className="text-white font-bold mb-2">Update GST filing details</h4>
                             <p className="text-sm text-slate-400 mb-4">Amend your previous season filings to match the new 2026 schema.</p>
                             <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Deadline: <span className="text-white">Mar 30</span></div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-red-400 flex items-center gap-1"><AlertOctagon size={12}/> Critical</div>
                             </div>
                             <button className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-600 hover:text-white hover:bg-white/10 transition-all">
                                <CheckCircle2 size={16} />
                             </button>
                          </div>
                          {/* Connector to Step 2 */}
                          <div className="hidden md:block absolute top-1/2 left-full w-12 h-px bg-white/10 -z-0">
                             <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} className="w-full h-full bg-primary origin-left" />
                          </div>
                        </motion.div>

                        {/* Step 2 */}
                        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="relative">
                          <div className="bg-[#1a2333] border border-white/10 p-6 rounded-2xl hover:border-primary/50 transition-all group/step cursor-pointer shadow-xl relative z-10">
                             <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black mb-4 group-hover/step:scale-110 transition-transform">2</div>
                             <h4 className="text-white font-bold mb-2">Recalculate Input Credit</h4>
                             <p className="text-sm text-slate-400 mb-4">Validate your vendors&apos; compliance status using the Bulk API tool.</p>
                             <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Deadline: <span className="text-white">Apr 15</span></div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-yellow-400 flex items-center gap-1"><History size={12}/> Ongoing</div>
                             </div>
                          </div>
                          {/* Vertical Connector to Block 3 */}
                          <div className="hidden md:block absolute top-[100%] left-1/2 w-px h-12 bg-white/10 -z-0">
                             <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="w-full h-full bg-primary origin-top" />
                          </div>
                        </motion.div>
                      </div>

                      {/* Branching Row */}
                      <div className="flex items-center justify-center pt-12">
                         <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }} className="max-w-md w-full relative">
                            <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-3xl hover:bg-red-500/20 transition-all group/risk cursor-pointer text-center">
                               <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center text-red-400 mx-auto mb-6 group-hover/risk:scale-110 transition-transform shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                                  <AlertTriangle size={36} />
                               </div>
                               <h4 className="text-xl font-bold text-white mb-2 tracking-tight">Financial Risk Node</h4>
                               <p className="text-sm text-slate-400 leading-relaxed">Failure to complete Step 2 results in immediate ₹18,000 penalty and audit flag.</p>
                               <div className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-red-400 bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20">
                                  Avoid ₹15,000 penalty
                               </div>
                            </div>
                         </motion.div>
                      </div>
                    </div>
                  </div>
                </FloatingCard>
              </div>

              {/* 3. IMPACT PANEL (4 COLS) */}
              <div className="col-span-12 lg:col-span-4">
                <FloatingCard className="h-full flex flex-col">
                  <SectionHeading 
                    title="What&apos;s the impact?" 
                    subtitle="Financial outcome of your decision"
                  />
                  <div className="flex-1 flex flex-col gap-6 mt-8">
                    {/* Act */}
                    <div className="bg-emerald-500/[0.03] border border-emerald-500/10 rounded-2xl p-6 relative group/act transition-all hover:bg-emerald-500/10">
                       <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">If you act</span>
                          <TrendingUp size={20} className="text-emerald-400" />
                       </div>
                       <div className="text-4xl font-display font-black text-white mb-2 leading-none">Save ₹15,000</div>
                       <p className="text-xs text-slate-400 font-medium">Compliance-backed savings & clean audit trail</p>
                       <div className="absolute inset-x-0 bottom-0 h-1 bg-emerald-500/20 rounded-b-2xl overflow-hidden">
                          <motion.div initial={{ x: "-100%" }} whileInView={{ x: 0 }} transition={{ duration: 1 }} className="h-full w-full bg-emerald-500" />
                       </div>
                    </div>

                    {/* Ignore */}
                    <div className="bg-red-500/[0.03] border border-red-500/10 rounded-2xl p-6 relative group/ignore transition-all hover:bg-red-500/10">
                       <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-black text-red-400 uppercase tracking-widest px-3 py-1 rounded bg-red-500/10 border border-red-500/20">If ignored</span>
                          <AlertCircle size={20} className="text-red-400" />
                       </div>
                       <div className="text-4xl font-display font-black text-white mb-2 leading-none">Lose ₹18,000</div>
                       <p className="text-xs text-slate-400 font-medium">Instant penalty + compound late fees</p>
                       <div className="absolute inset-x-0 bottom-0 h-1 bg-red-400/20 rounded-b-2xl overflow-hidden">
                          <motion.div initial={{ x: "-100%" }} whileInView={{ x: "40%" }} transition={{ duration: 1 }} className="h-full w-full bg-red-500" />
                       </div>
                    </div>

                    <div className="mt-auto p-4 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-slate-500 leading-relaxed italic">
                       &quot;Based on MSME tax slot for IT services (under ₹2Cr turnover)&quot;
                    </div>
                  </div>
                </FloatingCard>
              </div>

              {/* 4. MISSED OPPORTUNITIES (6 COLS) */}
              <div className="col-span-12 lg:col-span-6">
                <FloatingCard className="h-full">
                  <SectionHeading 
                    title="Opportunities you might miss" 
                    subtitle="Additional benefits you qualify for"
                  />
                  <div className="grid gap-4 mt-8">
                     {[
                       { title: "GST Input Credit Benefit", desc: "You can claim additional ₹8,000 from unvalidated vendors.", val: "₹8,000" },
                       { title: "Export Rebate (Rule 96A)", desc: "Eligible for Zero-Rated supply benefits on EU services.", val: "₹12,500" },
                     ].map((item, i) => (
                       <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between group/opp hover:bg-white/10 hover:border-accent/40 transition-all hover:shadow-[0_0_20px_rgba(250,204,21,0.05)]">
                          <div className="space-y-1">
                             <h4 className="text-white font-bold">{item.title}</h4>
                             <p className="text-xs text-slate-500">{item.desc}</p>
                          </div>
                          <div className="text-right">
                             <div className="text-xl font-display font-black text-accent">{item.val}</div>
                             <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Potential</div>
                          </div>
                       </div>
                     ))}
                  </div>
                </FloatingCard>
              </div>

              {/* 5. EXPLANATION PANEL (6 COLS) */}
              <div className="col-span-12 lg:col-span-6">
                <FloatingCard className="h-full">
                  <div className="flex items-center justify-between mb-8">
                    <SectionHeading 
                      title="Explain this simply" 
                    />
                    <div className="flex p-1 bg-white/5 rounded-xl border border-white/10">
                       <button onClick={() => setComplexity("Basic")} className={cn("px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all", complexity === "Basic" ? "bg-white/10 text-white shadow-lg" : "text-slate-500 hover:text-slate-300")}>Basic</button>
                       <button onClick={() => setComplexity("Detailed")} className={cn("px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all", complexity === "Detailed" ? "bg-white/10 text-white shadow-lg" : "text-slate-500 hover:text-slate-300")}>Detailed</button>
                    </div>
                  </div>

                  <div className="space-y-6">
                     <div className="flex items-start gap-4 animate-in fade-in slide-in-from-left-2">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0 border border-primary/20 shadow-lg shadow-primary/10">
                           <Sparkles size={20} />
                        </div>
                        <div className="p-5 bg-white/5 border border-white/10 rounded-2xl rounded-tl-none relative group/bubble hover:bg-white/10 transition-colors">
                           <div className="text-sm leading-relaxed text-slate-300">
                              {complexity === "Basic" ? (
                                "This policy requires digital businesses to update their GST filings by the end of March. If you don't, you'll be charged a fine. You also have a chance to save money on tax credits you haven't claimed yet."
                              ) : (
                                "The GST Amendment Order 2026 (Section 14B) mandates all registered MSMEs in IT-enabled services to transition to the Schema V4 filing protocol. Failure to synchronize vendor invoices with the central repository prior to March 31 threshold triggers automatic penalties under the late-filing provision (Rule 42)."
                              )}
                           </div>
                           <div className="mt-4 flex items-center justify-end">
                              <button className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1 hover:underline">
                                 Read Full Clause <ArrowRight size={10} />
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
                </FloatingCard>
              </div>

              {/* 6. CITATIONS PANEL (FULL WIDTH) */}
              <div className="col-span-12">
                <FloatingCard>
                  <SectionHeading 
                    title="Source-backed insights" 
                    subtitle="Every recommendation is linked to source text"
                    tooltip="Linked directly to Official Amendment PDF released by Ministry of Finance"
                  />
                  <div className="mt-8 space-y-6">
                     <div className="p-8 bg-background/50 border border-white/5 rounded-3xl relative overflow-hidden group/doc">
                        <div className="absolute right-0 top-0 p-4 opacity-10 text-white"><FileText size={120} /></div>
                        <div className="relative space-y-6">
                           <p className="text-slate-400 font-mono text-sm leading-relaxed">
                              &quot;...Notwithstanding any prior directives, all digital platforms operating as intermediaries under Section 2(w) of the IT Act must ENSURE that GSTIN-based reporting is completed in real-time. <span className="text-white bg-primary/20 px-2 py-0.5 rounded cursor-help hover:bg-primary/40 transition-colors border-b-2 border-primary">Eligible businesses must update filings before March 30</span> to maintain their Input Tax Credit (ITC) eligibility status...&quot;
                           </p>
                           <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                              <Link href="#" className="flex items-center gap-2 text-primary hover:underline">
                                 <ExternalLink size={12} />
                                 Linked to Step 1
                              </Link>
                              <div className="w-1 h-1 rounded-full bg-slate-700" />
                              Page 14, Para 3
                           </div>
                        </div>
                     </div>
                     <div className="p-8 bg-background/50 border border-white/5 rounded-3xl relative overflow-hidden group/doc">
                        <div className="relative space-y-6">
                           <p className="text-slate-400 font-mono text-sm leading-relaxed">
                              &quot;...Failure to comply results in <span className="text-white bg-red-500/10 px-2 py-0.5 rounded cursor-help hover:bg-red-500/30 transition-colors border-b-2 border-red-500">immediate cessation of export benefits under Rule 96A</span> and a fixed penalty commensurate with monthly turnover...&quot;
                           </p>
                           <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                              <Link href="#" className="flex items-center gap-2 text-red-400 hover:underline">
                                 <ExternalLink size={12} />
                                 Linked to Impact Panel
                              </Link>
                              <div className="w-1 h-1 rounded-full bg-slate-700" />
                              Page 19, Clause 2.1
                           </div>
                        </div>
                     </div>
                  </div>
                </FloatingCard>
              </div>

              {/* 7. TIMELINE / CONTEXT */}
              <div className="col-span-12">
                <FloatingCard>
                   <SectionHeading title="What changed?" subtitle="Evolution of this policy over time" />
                  <div className="mt-12 overflow-x-auto pb-6 -mx-4 px-4 custom-scrollbar">
                     <div className="min-w-[800px] flex items-start gap-0 relative">
                        {/* Timeline Line */}
                        <div className="absolute top-8 inset-x-0 h-px bg-white/10 -z-0" />
                        
                        {[
                          { date: "Oct 2025", title: "Original Rule", desc: "Standard filing cycle for all tech firms." },
                          { date: "Jan 2026", title: "Amendment Draft", desc: "First mention of real-time schema update." },
                          { date: "Mar 2026", title: "Current Policy", desc: "Mandatory enforcement for all MSMEs.", active: true },
                          { date: "June 2026", title: "Compliance Audit", desc: "First wave of automated verification." },
                        ].map((item, i) => (
                          <div key={i} className="flex-1 px-8 relative group/time">
                             <div className={cn("w-4 h-4 rounded-full border-2 border-background absolute top-6 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all", item.active ? "bg-primary scale-150 ring-4 ring-primary/20" : "bg-slate-700 group-hover/time:bg-slate-500")} />
                             <div className="pt-12 text-center space-y-2">
                                <div className={cn("text-[10px] font-black uppercase tracking-widest", item.active ? "text-primary" : "text-slate-600")}>{item.date}</div>
                                <h4 className={cn("text-sm font-bold", item.active ? "text-white" : "text-slate-400")}>{item.title}</h4>
                                <p className="text-[10px] text-slate-500 leading-relaxed font-bold">{item.desc}</p>
                             </div>
                          </div>
                        ))}
                     </div>
                  </div>
                </FloatingCard>
              </div>
            </div>

            {/* Global Footer (Contained within main div) */}
            <div className="mt-20 border-t border-white/5 pt-10 opacity-60">
                <Footer />
            </div>

          </div>
        </main>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(30, 58, 138, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(30, 58, 138, 0.5);
        }
      `}</style>
    </div>
  );
}
