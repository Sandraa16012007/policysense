"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileSearch,
  ClipboardList,
  BarChart3,
  Bell,
  LogOut,
  User,
  Settings,
  Shield,
  BellDot,
  Upload,
  Link as LinkIcon,
  Search,
  Filter,
  Bookmark,
  ChevronRight,
  ChevronDown,
  Clock,
  TrendingUp,
  AlertCircle,
  FileText,
  MapPin,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  Info,
  X,
  FileUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";

/* ──────────────────────── TYPES ──────────────────────── */

type Tab = "General" | "Analyse" | "Results" | "Insights" | "Alerts";
type AnalyseType = "text" | "file" | "link";

interface AnalysisItem {
  id: string;
  title: string;
  date: string;
  status: "Action Required" | "Monitor" | "No Impact";
  applicability?: "YES" | "NO" | "PARTIAL";
  description?: string;
}

/* ──────────────────────── DATA ──────────────────────── */

const RECENT_ANALYSES: AnalysisItem[] = [
  {
    id: "1",
    title: "GST Amendment Update 2026",
    date: "2 days ago",
    status: "Action Required",
    applicability: "YES",
    description: "New filing requirements for MSMEs in the IT sector.",
  },
  {
    id: "2",
    title: "Data Privacy Regulation (DPDP) v2",
    date: "5 days ago",
    status: "Monitor",
    applicability: "PARTIAL",
    description: "Updated consent management guidelines for SaaS platforms.",
  },
  {
    id: "3",
    title: "Import Duty Revision - Electronics",
    date: "1 week ago",
    status: "No Impact",
    applicability: "NO",
    description: "Changes to hardware import tariffs (Not applicable to SaaS).",
  },
];

const TRENDING_ALERTS = [
  {
    title: "Startup India Tax Holiday Extension",
    desc: "Application deadline extended to June 2026 for eligible tech startups.",
  },
  {
    title: "RBI Digital Lending Guidelines",
    desc: "Tighter norms for fintech platforms regarding metadata storage.",
  },
];

const DEADLINES = [
  { name: "Annual Compliance Return", date: "April 15, 2026", status: "Action Required" },
  { name: "Quarterly GST Filing", date: "April 20, 2026", status: "Monitor" },
];

const SAVED_ANALYSES = [
  { title: "Labour Law Reforms", desc: "Impact on remote workforce contracts.", status: "Monitor" },
  { title: "ZLD Compliance", desc: "Zero Liquid Discharge norms for manufacturing.", status: "No Impact" },
];

const ALL_ALERTS = [
  {
    icon: BellDot,
    title: "New Compliance Deadline",
    desc: "Submit your annual compliance report by April 15 to avoid penalties.",
    tag: "Deadline",
    color: "red",
  },
  {
    icon: Shield,
    title: "Security Policy Update",
    desc: "New data residency requirements for companies handling EU citizen data.",
    tag: "High Risk",
    color: "red",
  },
  {
    icon: AlertCircle,
    title: "RBI Regulatory Sandbox",
    desc: "Applications open for the next cohort of fintech innovations.",
    tag: "Update",
    color: "blue",
  },
];

/* ──────────────────────── COMPONENTS ──────────────────────── */

function StatusTag({ status }: { status: AnalysisItem["status"] | string }) {
  const styles = {
    "Action Required": "bg-red-500/10 text-red-400 border-red-500/20",
    "High Risk": "bg-red-500/10 text-red-400 border-red-500/20",
    Deadline: "bg-red-500/20 text-red-300 border-red-500/30",
    Monitor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Update: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "No Impact": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };

  const currentStyle =
    styles[status as keyof typeof styles] || "bg-slate-500/10 text-slate-400 border-slate-500/20";

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider",
        currentStyle
      )}
    >
      {status}
    </span>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-display font-bold text-white tracking-tight">{title}</h1>
      {subtitle && <p className="text-slate-400 text-base mt-2 max-w-2xl">{subtitle}</p>}
    </div>
  );
}

function Card({ title, children, className }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all hover:border-white/20",
        className
      )}
    >
      {title && (
        <div className="px-6 py-4 border-b border-white/5">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("General");
  const [analyseType, setAnalyseType] = useState<AnalyseType>("text");
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  // Sync scroll lock or profile menu state
  useEffect(() => {
    if (profileMenuOpen) {
      const handleEscape = (e: KeyboardEvent) => e.key === "Escape" && setProfileMenuOpen(false);
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [profileMenuOpen]);

  /* ──────────────────────── RENDERERS ──────────────────────── */

  const renderGeneral = () => (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative group">
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full -z-10 opacity-50 group-hover:opacity-70 transition-opacity" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl shadow-2xl">
          <div>
            <h1 className="text-4xl font-display font-bold text-white tracking-tight mb-3">Welcome back</h1>
            <p className="text-slate-400 text-lg">Here’s what needs your attention today.</p>
          </div>
          <button
            onClick={() => setActiveTab("Analyse")}
            className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 active:scale-95"
          >
            Analyze a policy
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card title="Recent analyses">
          <div className="divide-y divide-white/5 -mx-6 -mb-6">
            {RECENT_ANALYSES.map((item) => (
              <div
                key={item.id}
                className="px-6 py-5 hover:bg-white/5 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 border border-white/10 group-hover:text-primary group-hover:border-primary/30 transition-all">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-widest">
                      {item.date}
                    </p>
                  </div>
                </div>
                <StatusTag status={item.status} />
              </div>
            ))}
          </div>
        </Card>

        {/* Trending */}
        <Card title="Trending updates">
          <div className="space-y-6">
            {TRENDING_ALERTS.map((alert, i) => (
              <div key={i} className="flex gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex-shrink-0 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-all">
                  <TrendingUp size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white group-hover:text-primary transition-colors tracking-tight">
                    {alert.title}
                  </h4>
                  <p className="text-sm text-slate-400 mt-1 leading-relaxed">{alert.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Deadlines */}
        <Card title="Deadlines approaching">
          <div className="space-y-4">
            {DEADLINES.map((d, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-slate-400 border border-white/10">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{d.name}</h4>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-0.5">
                      {d.date}
                    </p>
                  </div>
                </div>
                <StatusTag status={d.status} />
              </div>
            ))}
          </div>
        </Card>

        {/* Saved */}
        <Card title="Saved analyses">
          <div className="space-y-5">
            {SAVED_ANALYSES.map((item, i) => (
              <div key={i} className="group cursor-pointer p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <Bookmark
                    size={16}
                    className="text-slate-600 group-hover:text-primary group-hover:fill-primary transition-all"
                  />
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderAnalyse = () => (
    <div className="max-w-4xl mx-auto py-4">
      <SectionHeader
        title="Analyze a policy or article"
        subtitle="Paste a link, upload a document, or enter text to get personalized insights."
      />

      <div className="space-y-6">
        <Card>
          <div className="space-y-8">
            {/* Options Tabs */}
            <div className="flex items-center gap-8 border-b border-white/5 -mx-6 px-8 pb-0">
              {[
                { id: "text", label: "Paste Text" },
                { id: "file", label: "Upload File" },
                { id: "link", label: "Paste Link" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setAnalyseType(t.id as AnalyseType)}
                  className={cn(
                    "text-sm font-bold pb-4 transition-all relative",
                    analyseType === t.id
                      ? "text-primary px-2"
                      : "text-slate-500 hover:text-slate-300"
                  )}
                >
                  {t.label}
                  {analyseType === t.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Input Content Area */}
            <div className="min-h-[300px]">
              {analyseType === "text" && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <textarea
                    placeholder="Paste policy text or article here..."
                    className="w-full min-h-[320px] bg-white/5 border border-white/10 rounded-2xl p-8 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all resize-none shadow-inner"
                  />
                </div>
              )}

              {analyseType === "file" && (
                <div className="flex flex-col items-center justify-center min-h-[320px] border-2 border-dashed border-white/10 rounded-3xl bg-white/[0.02] hover:bg-white/[0.04] hover:border-primary/30 transition-all cursor-pointer group animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    <FileUp size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Upload your policy PDF</h3>
                  <p className="text-slate-500 text-sm mb-8">Drag and drop or click to browse files</p>
                  <button className="bg-white/10 text-white px-8 py-3 rounded-xl font-bold hover:bg-white/20 transition-all border border-white/10">
                    Select File
                  </button>
                </div>
              )}

              {analyseType === "link" && (
                <div className="flex flex-col items-center justify-center min-h-[320px] bg-white/[0.02] rounded-3xl border border-white/10 p-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="w-full max-w-lg space-y-6">
                    <div className="text-center space-y-2">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                        <LinkIcon size={32} />
                      </div>
                      <h3 className="text-xl font-bold text-white">Enter Policy Link</h3>
                      <p className="text-slate-500 text-sm">We&apos;ll fetch the content and analyze it for you</p>
                    </div>
                    <div className="relative">
                      <LinkIcon size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        placeholder="https://policy-site.gov/amendment-2026"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-14 py-4 text-white focus:outline-none focus:border-primary/50 transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/5">
              <button className="w-full flex items-center justify-center gap-3 bg-primary text-white py-5 rounded-2xl font-bold shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all hover:scale-[1.01] active:scale-[0.99] text-xl">
                Analyze
                <ChevronRight size={24} />
              </button>
              <p className="text-center text-sm text-slate-500 mt-6 font-medium">
                We’ll break this down into applicability, actions, and impact based on your profile.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="space-y-8">
      <SectionHeader title="All analyses" />

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-5">
        <div className="relative flex-1 group">
          <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-primary" />
          <input
            type="text"
            placeholder="Search analyses..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-14 py-4 text-white focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all"
          />
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-slate-300 hover:bg-white/10 transition-all border border-white/10">
            <Filter size={18} className="text-slate-500" />
            Role
            <ChevronDown size={16} className="text-slate-500" />
          </button>
          <button className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-slate-300 hover:bg-white/10 transition-all border border-white/10">
            Sector
            <ChevronDown size={16} className="text-slate-500" />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="grid gap-5">
        {RECENT_ANALYSES.map((item) => (
          <div
            key={item.id}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-primary/40 hover:bg-white/10 transition-all group flex flex-col lg:flex-row lg:items-center justify-between gap-8"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors tracking-tight">
                  {item.title}
                </h3>
                <div
                  className={cn(
                    "px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                    item.applicability === "YES"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : item.applicability === "PARTIAL"
                      ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                      : "bg-slate-500/10 text-slate-400 border-slate-500/20"
                  )}
                >
                  Applicability: {item.applicability}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-8 text-sm text-slate-400">
                <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-[10px]">
                  <Clock size={16} className="text-primary" />
                  {item.date}
                </div>
                <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-[10px]">
                  <FileText size={16} className="text-primary" />
                  3 Recommended Actions
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6 self-end lg:self-center">
              <StatusTag status={item.status} />
              <div className="h-10 w-px bg-white/5" />
              <button className="p-3 text-slate-500 hover:text-primary transition-colors hover:bg-white/5 rounded-xl">
                <Bookmark size={24} />
              </button>
              <button className="bg-white/5 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary transition-all shadow-xl hover:shadow-primary/20 border border-white/10 hover:border-primary">
                View Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInsights = () => (
    <div className="space-y-10">
      <SectionHeader
        title="Your insights"
        subtitle="A quick overview of your exposure and opportunities."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: AlertTriangle, val: "3", label: "Current Exposure", sub: "Policies currently require attention", color: "red" },
          { icon: BarChart3, val: "₹45,000", label: "Potential Savings", sub: "Estimated savings identified", color: "emerald" },
          { icon: Info, val: "2", label: "Policies Ignored", sub: "Items may have been overlooked", color: "blue" },
        ].map((card, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-[32px] p-10 flex flex-col items-center text-center group hover:bg-white/10 transition-all">
            <div className={cn(
              "w-20 h-20 rounded-3xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110",
              card.color === "red" ? "bg-red-500/10 text-red-400" : card.color === "emerald" ? "bg-emerald-500/10 text-emerald-400" : "bg-blue-500/10 text-blue-400"
            )}>
              <card.icon size={40} />
            </div>
            <h3 className="text-5xl font-display font-black text-white mb-3">{card.val}</h3>
            <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] mb-8">{card.label}</p>
            <div className="w-full pt-8 border-t border-white/5 text-sm font-medium text-slate-500">
              {card.sub}
            </div>
          </div>
        ))}
      </div>

      <Card title="Impact Breakdown">
        <div className="h-80 flex items-center justify-center text-slate-600 font-black uppercase tracking-[0.3em] text-xs italic border-4 border-dashed border-white/5 rounded-3xl bg-white/[0.01]">
          Analytics Engine Loading...
        </div>
      </Card>
    </div>
  );

  const renderAlerts = () => (
    <div className="space-y-8">
      <SectionHeader title="Alerts" subtitle="Important updates that need your attention" />

      <div className="grid gap-6">
        {ALL_ALERTS.map((alert, i) => {
          const Icon = alert.icon;
          return (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row items-start md:items-center gap-8 group hover:bg-white/10 transition-all shadow-2xl"
            >
              <div
                className={cn(
                  "w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform",
                  alert.color === "red" ? "bg-red-500/10 text-red-400" : "bg-blue-500/10 text-blue-400"
                )}
              >
                <Icon size={32} />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-4 mb-3">
                  <h4 className="text-xl font-bold text-white tracking-tight">{alert.title}</h4>
                  <StatusTag status={alert.tag} />
                </div>
                <p className="text-slate-400 text-lg leading-relaxed">{alert.desc}</p>
              </div>
              <button className="w-full md:w-auto px-8 py-3 rounded-xl border border-white/10 font-bold text-sm text-white hover:bg-white/10 transition-all active:scale-95">
                View Task
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case "General":
        return renderGeneral();
      case "Analyse":
        return renderAnalyse();
      case "Results":
        return renderResults();
      case "Insights":
        return renderInsights();
      case "Alerts":
        return renderAlerts();
    }
  };

  /* ──────────────────────── MAIN LAYOUT ──────────────────────── */

  return (
    <div className="min-h-screen bg-background font-sans text-slate-200 selection:bg-primary/30">
      {/* ── TOP NAVBAR (FIXED) ── */}
      <header className="fixed top-0 inset-x-0 h-20 bg-background/80 backdrop-blur-xl border-b border-white/10 z-[100] px-6 lg:px-12 flex items-center justify-between shadow-2xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/favicon.ico"
            alt="Logo"
            className="w-8 h-8 rounded-lg group-hover:rotate-12 transition-transform"
          />
          <span className="font-display font-black text-2xl tracking-tighter">
            <span className="text-primary">Policy</span>
            <span className="text-accent">Sense</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/10 shadow-inner">
          <Link
            href="/"
            className="px-6 py-2 rounded-xl text-sm font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            Home
          </Link>
          <div className="px-6 py-2 rounded-xl text-sm font-bold text-white bg-primary shadow-lg shadow-primary/20">
            Dashboard
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveTab("Alerts")}
            className="flex items-center justify-center w-12 h-12 rounded-2xl text-slate-400 hover:text-white hover:bg-white/10 transition-all relative group border border-transparent hover:border-white/10"
          >
            <Bell size={22} className="group-hover:rotate-12 transition-transform" />
            <div className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background animate-pulse" />
          </button>

          <div className="h-10 w-px bg-white/10 hidden md:block" />

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center gap-3 pl-2 pr-2 py-1.5 rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 transition-all group"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden border border-primary/20 group-hover:scale-105 transition-transform">
                <User size={20} />
              </div>
              <ChevronDown
                size={16}
                className={cn(
                  "text-slate-500 transition-transform group-hover:text-slate-300",
                  profileMenuOpen && "rotate-180"
                )}
              />
            </button>

            {profileMenuOpen && (
              <>
                <div className="absolute top-full right-0 mt-4 w-72 bg-[#121c35] border border-white/10 rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] p-3 z-[110] animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-5 py-4 border-b border-white/5 mb-2">
                    <p className="text-base font-bold text-white">Felix Miller</p>
                    <p className="text-xs text-slate-500 font-medium tracking-tight mt-0.5">
                      felix@techstack.io
                    </p>
                  </div>
                  <div className="space-y-1">
                    {[
                      { icon: User, label: "Account & Settings" },
                      { icon: ClipboardList, label: "User Context", sub: "Onboarding data" },
                      { icon: Bell, label: "Notification Preferences" },
                      { icon: Shield, label: "Privacy Controls" },
                    ].map((item, i) => (
                      <button
                        key={i}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-[14px] font-bold text-slate-400 hover:bg-white/5 hover:text-white transition-all group/item"
                      >
                        <item.icon
                          size={18}
                          className="text-slate-500 group-hover/item:text-primary transition-colors"
                        />
                        <div className="text-left flex-1">
                          <div className="group-hover/item:translate-x-0.5 transition-transform">
                            {item.label}
                          </div>
                          {item.sub && (
                            <div className="text-[10px] text-slate-600 font-black uppercase tracking-widest mt-0.5">
                              {item.sub}
                            </div>
                          )}
                        </div>
                        <ChevronRight
                          size={14}
                          className="text-slate-700 opacity-0 group-hover/item:opacity-100 transition-all"
                        />
                      </button>
                    ))}
                    <div className="h-px bg-white/5 my-2 mx-5" />
                    <Link
                      href="/"
                      className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-[14px] font-bold text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      <LogOut size={18} />
                      Logout
                    </Link>
                  </div>
                </div>
                <div className="fixed inset-0 z-[105]" onClick={() => setProfileMenuOpen(false)} />
              </>
            )}
          </div>
        </div>
      </header>

      {/* ── MAIN TWO-PANEL LAYOUT ── */}
      <div className="flex pt-20">
        {/* ── LEFT SIDEBAR (FIXED) ── */}
        <aside className="fixed left-0 top-20 bottom-0 w-64 lg:w-80 bg-background border-r border-white/10 p-8 hidden md:flex flex-col z-90">
          <nav className="flex-1 space-y-2">
            {[
              { id: "General", icon: LayoutDashboard },
              { id: "Analyse", icon: FileSearch },
              { id: "Results", icon: ClipboardList },
              { id: "Insights", icon: BarChart3 },
              { id: "Alerts", icon: BellDot },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as Tab)}
                  className={cn(
                    "w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-base font-bold transition-all group relative overflow-hidden",
                    isActive
                      ? "text-primary bg-primary/10 border border-primary/20 shadow-lg shadow-primary/5"
                      : "text-slate-500 hover:text-slate-200 hover:bg-white/5"
                  )}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-primary rounded-r-full" />
                  )}
                  <Icon
                    size={22}
                    className={cn(
                      "transition-all duration-300",
                      isActive
                        ? "text-primary scale-110"
                        : "text-slate-600 group-hover:text-primary group-hover:translate-x-0.5"
                    )}
                  />
                  {item.id}
                </button>
              );
            })}
          </nav>

          {/* Bottom Sidebar Info */}
          <div className="mt-auto space-y-6">
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 group cursor-default">
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4 group-hover:text-primary transition-colors">
                Your Insights Profile
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                    <Briefcase size={14} />
                  </div>
                  <span className="text-xs font-bold text-slate-400">Founder / SaaS</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                    <MapPin size={14} />
                  </div>
                  <span className="text-xs font-bold text-slate-400">New Delhi, India</span>
                </div>
              </div>
              <button className="w-full mt-6 py-3 rounded-xl border border-white/5 text-[10px] uppercase font-black tracking-widest text-primary hover:bg-primary/10 hover:border-primary/20 transition-all">
                Update User Context
              </button>
            </div>

            <div className="px-4 text-center">
              <p className="text-[10px] text-slate-700 font-black uppercase tracking-tighter">
                &copy; 2026 PolicySense AI.
              </p>
              <p className="text-[9px] text-slate-800 font-bold mt-1">v1.5.0-STABLE</p>
            </div>
          </div>
        </aside>

        {/* ── MAIN CONTENT AREA ── */}
        <main className="flex-1 md:ml-64 lg:ml-80 bg-background min-h-[calc(100vh-80px)] overflow-x-hidden">
          <div className="p-8 lg:p-14 lg:pb-24 max-w-[1400px] mx-auto min-h-screen">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {renderActiveTab()}
              </motion.div>
            </AnimatePresence>

            {/* Global Footer (Reusable but contained within Main) */}
            <div className="mt-20 border-t border-white/5 pt-10 opacity-60">
                <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
