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
import { useAuth } from "@/context/AuthContext";
import { getAnalysis } from "@/lib/userService";
import { AnalysisResult } from "@/lib/analysisService";
import { Loader2 } from "lucide-react";

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
  const { user, userData } = useAuth();
  
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [complexity, setComplexity] = useState<"Basic" | "Detailed">("Basic");
  const [confidence, setConfidence] = useState(0);
  
  const [loadingResult, setLoadingResult] = useState(true);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (index: number) => {
    setCompletedSteps(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  useEffect(() => {
    async function fetchResult() {
      if (!user?.uid || !id) return;
      
      try {
        const { data, error: fetchError } = await getAnalysis(user.uid, id as string);
        if (fetchError) {
          setError(fetchError);
        } else {
          setAnalysis(data as AnalysisResult);
          // Animate confidence
          const targetConf = Math.round((data as AnalysisResult).relevance.relevance_score * 100);
          setTimeout(() => setConfidence(targetConf), 500);
        }
      } catch (err: any) {
        setError("Failed to load analysis result.");
      } finally {
        setLoadingResult(false);
      }
    }

    fetchResult();
  }, [user, id]);

  const userName = userData?.basic?.name || user?.displayName || user?.email?.split('@')[0] || "User";
  const userEmail = user?.email || "";
  const userRole = userData?.basic?.role || "Member";
  const userLocation = userData?.location?.state 
    ? `${userData.location.city ? userData.location.city + ", " : ""}${userData.location.state}`
    : "Location not set";

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
            
            {loadingResult ? (
              <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
                <Loader2 className="animate-spin text-primary mb-4" size={48} />
                <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Securely retrieving analysis...</p>
              </div>
            ) : error || !analysis ? (
              <div className="bg-red-500/10 border border-red-500/20 p-10 rounded-3xl text-center space-y-4">
                <AlertCircle size={48} className="text-red-400 mx-auto" />
                <h2 className="text-2xl font-bold text-white">Oops! Something went wrong</h2>
                <p className="text-slate-400 max-w-md mx-auto">{error || "The requested analysis could not be found."}</p>
                <button onClick={() => router.push('/dashboard')} className="bg-white/5 text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition-all border border-white/10">
                  Return to Dashboard
                </button>
              </div>
            ) : (
              <>
                {/* Header / Breadcrumb */}
                <div className="flex items-center justify-between">
                  <button onClick={() => router.push('/dashboard?tab=Results')} className="flex items-center gap-2 text-slate-500 hover:text-white font-bold transition-all group">
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to All Results
                  </button>
                  <div className="flex items-center gap-3 text-slate-500 text-sm font-black uppercase tracking-widest">
                    <History size={16} className="text-primary" />
                    Analyzed on {new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>

                {/* ACTION BAR */}
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
                      Re-run Analysis
                    </button>
                    <div className="h-6 w-px bg-white/10" />
                    <button className="p-2 text-slate-500 hover:text-red-400 transition-all border border-transparent hover:bg-red-500/10 rounded-lg">
                      <AlertCircle size={18} />
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <h1 className="text-5xl font-display font-black text-white tracking-tight leading-[1.1]">{analysis.policy.title || "Policy Analysis"}</h1>
                  <p className="text-slate-400 text-lg max-w-3xl">{analysis.policy.summary}</p>
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
                          <div className="text-6xl font-display font-black text-white tracking-tighter">
                            {analysis.relevance.applies ? "YES" : "NO"}
                          </div>
                          <div className={cn(
                            "px-5 py-2 rounded-full border text-xs font-black uppercase tracking-[0.2em] shadow-lg animate-pulse",
                            analysis.relevance.applies 
                              ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" 
                              : "bg-slate-500/20 text-slate-400 border-slate-500/30"
                          )}>
                            {analysis.relevance.applies ? "Direct Impact" : "Low Relevance"}
                          </div>
                        </div>
                        <div className="space-y-2">
                          {analysis.relevance.reason.map((reason, i) => (
                            <div key={i} className="flex items-center gap-2 text-slate-300">
                               <CheckCircle2 size={14} className="text-emerald-400" />
                               <span className="text-sm font-medium">{reason}</span>
                            </div>
                          ))}
                        </div>
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
                           <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Relevance Tier</p>
                           <p className="text-lg font-bold text-white capitalize">{analysis.relevance.priority}</p>
                           <div className="flex items-center gap-2 text-[10px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                              <Sparkles size={12} />
                              AI Computed
                           </div>
                        </div>
                    </div>
                  </div>
                  <div className="mt-10 pt-10 border-t border-white/5 flex flex-wrap gap-4">
                     <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-bold text-slate-400">
                        <Briefcase size={14} className="text-primary" /> {userRole}
                     </div>
                     <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-bold text-slate-400">
                        <MapPin size={14} className="text-primary" /> {userLocation}
                     </div>
                     {analysis.policy.category.map((cat, i) => (
                       <div key={i} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-bold text-slate-400 capitalize">
                          <Shield size={14} className="text-primary" /> {cat}
                       </div>
                     ))}
                  </div>
                </FloatingCard>

                <div className="grid grid-cols-12 gap-8">
                  {/* 2. ACTION GRAPH (8 COLS) */}
                  <div className="col-span-12 lg:col-span-8">
                    <FloatingCard className="h-full">
                      <SectionHeading 
                        title="What should you do?" 
                        subtitle="Personalized action plan"
                      />
                      <div className="mt-12 relative max-w-4xl mx-auto">
                        {/* Flowchart Vertical Spine */}
                        <div className="absolute left-[27px] top-6 bottom-6 w-px bg-gradient-to-b from-primary/50 via-white/10 to-transparent hidden sm:block" />
                        
                        <div className="space-y-8">
                          {analysis.actions.map((action, i) => {
                            const isDone = completedSteps.includes(i);
                            return (
                            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative flex flex-col sm:flex-row items-start sm:gap-8 z-10 w-full">
                              {/* Connector Node */}
                              <div 
                                onClick={() => toggleStep(i)}
                                className={cn(
                                  "w-14 h-14 rounded-full flex-shrink-0 hidden sm:flex items-center justify-center font-black cursor-pointer shadow-xl transition-all border-4 border-background relative group",
                                  isDone 
                                    ? "bg-emerald-500 text-white shadow-emerald-500/20 scale-110" 
                                    : "bg-[#1a2333] border-white/10 text-slate-400 hover:border-primary/50 hover:text-primary"
                                )}
                              >
                                {isDone ? <CheckCircle2 size={24} /> : i + 1}
                                {/* Tooltip */}
                                <div className="absolute top-[-40px] opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none">
                                  {isDone ? "Mark Pending" : "Mark Complete"}
                                </div>
                              </div>

                              {/* Action Card */}
                              <div className={cn(
                                "flex-1 border bg-[#1a2333] p-6 rounded-2xl transition-all shadow-xl relative w-full",
                                isDone ? "border-emerald-500/30 opacity-70 bg-emerald-500/[0.02]" : "border-white/10 hover:border-primary/30"
                              )}>
                                 {/* Connector branch drawn if not mobile */}
                                 <div className={cn("absolute right-full top-7 w-8 h-px hidden sm:block", isDone ? "bg-emerald-500/30" : "bg-white/10")} />
                                 
                                 <div className="flex items-center justify-between mb-2">
                                    <h4 className={cn("font-bold transition-colors pr-4", isDone ? "text-emerald-400 line-through decoration-emerald-500/50" : "text-white")}>{action.title}</h4>
                                    {/* Mobile Checkbox directly inline */}
                                    <button onClick={() => toggleStep(i)} className={cn("sm:hidden w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors border-2", isDone ? "bg-emerald-500 border-emerald-500 text-white" : "border-white/20 text-transparent")}>
                                      <CheckCircle2 size={16} className={cn(isDone ? "block" : "hidden")} />
                                    </button>
                                 </div>
                                 
                                 <p className="text-sm text-slate-400 leading-relaxed">{action.description}</p>
                                 <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Deadline: <span className={cn(isDone ? "text-emerald-500" : "text-white")}>{action.deadline || "Flexible"}</span></div>
                                    {!isDone && <StatusTag status={analysis.relevance.priority === "high" ? "Action Required" : "Monitor"} />}
                                    {isDone && <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full flex items-center"><CheckCircle2 size={12} className="inline mr-1" /> Completed</span>}
                                 </div>
                              </div>
                            </motion.div>
                          )})}
                        </div>
                      </div>
                    </FloatingCard>
                  </div>

                  {/* 3. IMPACT PANEL (4 COLS) */}
                  <div className="col-span-12 lg:col-span-4">
                    <FloatingCard className="h-full flex flex-col">
                      <SectionHeading 
                        title="What's the impact?" 
                        subtitle="Outcome of your actions"
                      />
                      <div className="flex-1 flex flex-col gap-6 mt-8">
                        {/* Act */}
                        <div className="bg-emerald-500/[0.03] border border-emerald-500/10 rounded-2xl p-6 relative group/act transition-all hover:bg-emerald-500/10">
                           <div className="flex items-center justify-between mb-4">
                              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">If you act</span>
                              <TrendingUp size={20} className="text-emerald-400" />
                           </div>
                           <div className="text-xl font-display font-bold text-white mb-2 leading-tight">{analysis.impact.ifAct}</div>
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
                           <div className="text-xl font-display font-bold text-white mb-2 leading-tight">{analysis.impact.ifIgnore}</div>
                           <div className="absolute inset-x-0 bottom-0 h-1 bg-red-400/20 rounded-b-2xl overflow-hidden">
                              <motion.div initial={{ x: "-100%" }} whileInView={{ x: 0 }} transition={{ duration: 1 }} className="h-full w-full bg-red-500" />
                           </div>
                        </div>

                        <div className="mt-auto p-4 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-slate-500 leading-relaxed italic">
                           "Analyzed for: {userRole} in {userLocation}"
                        </div>
                      </div>
                    </FloatingCard>
                  </div>

                  {/* 4. KEY POINTS (6 COLS) */}
                  <div className="col-span-12 lg:col-span-6">
                    <FloatingCard className="h-full">
                      <SectionHeading 
                        title="Key Points to Remember" 
                        subtitle="Derived from policy metadata"
                      />
                      <div className="grid gap-4 mt-8">
                         {analysis.policy.key_points.map((point, i) => (
                           <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-start gap-4 hover:bg-white/10 transition-all">
                              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[10px] font-bold flex-shrink-0">
                                {i + 1}
                              </div>
                              <p className="text-sm text-slate-300 leading-relaxed">{point}</p>
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
                                  {complexity === "Basic" ? analysis.explanation.basic : analysis.explanation.detailed}
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
                        subtitle="Excerpts used for this analysis"
                      />
                      <div className="mt-8 space-y-4">
                         {analysis.policy.source_chunks.map((chunk, i) => (
                           <div key={i} className="p-6 bg-background/50 border border-white/5 rounded-2xl relative overflow-hidden group/doc">
                              <p className="text-slate-400 font-mono text-xs leading-relaxed italic">
                                 "{chunk}"
                              </p>
                              <div className="mt-4 flex items-center gap-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                                 <FileText size={12} className="text-primary" />
                                 Source Quote #{i + 1}
                              </div>
                           </div>
                         ))}
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
              </>
            )}

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
