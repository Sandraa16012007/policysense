"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  ArrowRight,
  FileText,
  Shield,
  Sparkles,
  Filter,
  Network,
  TrendingUp,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/3 w-[50rem] h-[50rem] bg-primary/15 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[35rem] h-[35rem] bg-accent/10 rounded-full blur-[120px] -z-10" />

      {/* Top Bar */}
      <div className="w-full px-6 md:px-12 py-6 flex items-center justify-between relative z-10">
        <Link href="/" className="flex items-center gap-2 group">
          <img
            src="/favicon.ico"
            alt="PolicySense Logo"
            className="w-8 h-8 rounded transition-transform group-hover:scale-105"
          />
          <span className="font-display font-bold text-2xl tracking-tight">
            <span className="text-primary">Policy</span>
            <span className="text-accent">Sense</span>
          </span>
        </Link>
        <Link
          href="/"
          className="text-sm text-foreground/60 hover:text-white transition-colors flex items-center gap-1.5"
        >
          <ChevronLeft size={16} />
          Back to Home
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-12 py-8">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* ===== LEFT SIDE: Illustration & Microcopy ===== */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hidden lg:flex flex-col gap-10"
          >
            {/* Headline */}
            <div>
              <h1 className="text-4xl xl:text-5xl font-display font-bold leading-tight tracking-tight mb-4">
                Intelligence that{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  moves you forward
                </span>
              </h1>
              <p className="text-foreground/60 text-lg leading-relaxed max-w-md">
                Join thousands of businesses transforming complex policies into
                clear, confident actions with AI.
              </p>
            </div>

            {/* 3D Illustration Scene */}
            <div className="relative h-[360px] w-full perspective-1000">
              <motion.div
                initial={{ opacity: 0, rotateX: 15, rotateY: -10 }}
                animate={{ opacity: 1, rotateX: 8, rotateY: -8 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                className="absolute inset-0 transform-style-3d"
              >
                {/* Floating document card 1 */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut",
                  }}
                  className="absolute left-0 top-8 w-52 bg-background/60 backdrop-blur-xl border border-white/15 rounded-2xl p-5 shadow-2xl"
                  style={{ transform: "translateZ(0px)" }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                      <FileText size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="w-20 h-2 bg-white/20 rounded-full mb-1.5" />
                      <div className="w-14 h-1.5 bg-white/10 rounded-full" />
                    </div>
                  </div>
                  {/* Wireframe lines */}
                  <div className="flex flex-col gap-2">
                    <div className="w-full h-1.5 bg-white/8 rounded-full" />
                    <div className="w-3/4 h-1.5 bg-white/8 rounded-full" />
                    <div className="w-full h-1.5 bg-white/6 rounded-full" />
                    <div className="w-2/3 h-1.5 bg-white/6 rounded-full" />
                  </div>
                  {/* Status badge */}
                  <div className="mt-4 inline-flex items-center gap-1.5 bg-accent/15 border border-accent/30 text-accent text-[10px] font-bold px-2.5 py-1 rounded-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    Applicable
                  </div>
                </motion.div>

                {/* AI Core Orb */}
                <motion.div
                  className="absolute left-[42%] top-[25%] w-28 h-28"
                  style={{ transform: "translateZ(60px)" }}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 12,
                        ease: "linear",
                      }}
                      className="absolute inset-0 rounded-full border border-dashed border-primary/40"
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 18,
                        ease: "linear",
                      }}
                      className="absolute inset-3 rounded-full border border-accent/30"
                    />
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-full shadow-[0_0_40px_rgba(79,141,242,0.4)] flex items-center justify-center">
                      <Sparkles size={20} className="text-white" />
                    </div>
                  </div>

                  {/* Energy streams */}
                  <motion.div
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -right-16 top-1/3 h-px w-16 bg-gradient-to-r from-accent to-transparent"
                  />
                  <motion.div
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                    className="absolute -left-12 top-1/2 h-px w-12 bg-gradient-to-l from-primary to-transparent"
                  />
                </motion.div>

                {/* Output card */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 4.5,
                    delay: 1,
                    ease: "easeInOut",
                  }}
                  className="absolute right-0 top-4 w-48 bg-background/70 backdrop-blur-xl border border-accent/25 rounded-2xl p-4 shadow-[0_10px_30px_rgba(244,181,30,0.08)]"
                  style={{ transform: "translateZ(100px)" }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-accent/20 p-1.5 rounded-lg">
                      <TrendingUp size={14} className="text-accent" />
                    </div>
                    <span className="text-xs font-semibold text-foreground/70">
                      Potential Savings
                    </span>
                  </div>
                  <div className="text-xl font-bold text-white mb-1">
                    ₹ 1,50,000
                  </div>
                  <div className="text-[10px] text-green-400 flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-green-400" />
                    Opportunity Detected
                  </div>
                </motion.div>

                {/* Floating action step card */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 5.5,
                    delay: 0.5,
                    ease: "easeInOut",
                  }}
                  className="absolute right-8 bottom-8 w-44 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3 shadow-lg"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                      1
                    </div>
                    <div>
                      <div className="text-xs font-medium text-white">
                        File Annexure B
                      </div>
                      <div className="text-[10px] text-red-400 mt-0.5">
                        Due in 3 days
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Small floating icons */}
                {[
                  {
                    Icon: Filter,
                    x: "15%",
                    y: "75%",
                    z: 20,
                    delay: 0,
                    color: "primary",
                  },
                  {
                    Icon: Shield,
                    x: "55%",
                    y: "80%",
                    z: 50,
                    delay: 1,
                    color: "accent",
                  },
                  {
                    Icon: Network,
                    x: "80%",
                    y: "55%",
                    z: 30,
                    delay: 2,
                    color: "primary",
                  },
                ].map(({ Icon, x, y, z, delay, color }, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -8, 0], opacity: [0.4, 0.8, 0.4] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      delay,
                      ease: "easeInOut",
                    }}
                    className={`absolute w-9 h-9 rounded-xl bg-${color}/10 border border-${color}/20 flex items-center justify-center backdrop-blur-sm`}
                    style={{
                      left: x,
                      top: y,
                      transform: `translateZ(${z}px)`,
                    }}
                  >
                    <Icon size={14} className={`text-${color}`} />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Trust bar */}
            <div className="flex items-center gap-8 text-sm text-foreground/50">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-accent" />
                <span>Enterprise-grade security</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-accent" />
                <span>AI-powered insights</span>
              </div>
            </div>
          </motion.div>

          {/* ===== RIGHT SIDE: Auth Card ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="w-full max-w-md mx-auto lg:mx-0"
          >
            <div className="relative bg-background/50 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden">
              {/* Card decorations */}
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-[60px]" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/10 rounded-full blur-[60px]" />

              {/* Toggle */}
              <div className="relative z-10 flex items-center bg-white/5 rounded-2xl p-1 mb-8 border border-white/5">
                {(["login", "signup"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setMode(tab);
                      setShowPassword(false);
                    }}
                    className={cn(
                      "flex-1 relative py-3 text-sm font-semibold rounded-xl transition-colors z-10",
                      mode === tab ? "text-white" : "text-foreground/50 hover:text-foreground/70"
                    )}
                  >
                    {mode === tab && (
                      <motion.div
                        layoutId="auth-tab"
                        className="absolute inset-0 bg-white/10 border border-white/10 rounded-xl shadow-lg"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10">
                      {tab === "login" ? "Login" : "Create Account"}
                    </span>
                  </button>
                ))}
              </div>

              {/* Form */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="relative z-10"
                >
                  <h2 className="text-2xl font-display font-bold mb-2">
                    {mode === "login" ? "Welcome back" : "Get Started"}
                  </h2>
                  <p className="text-sm text-foreground/50 mb-8">
                    {mode === "login"
                      ? "Sign in to access your policy intelligence dashboard."
                      : "Create your account and start making smarter decisions."}
                  </p>

                  <form
                    className="flex flex-col gap-5"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    {/* Full Name — signup only */}
                    {mode === "signup" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-col gap-2"
                      >
                        <label className="text-xs font-semibold text-foreground/60 tracking-wide uppercase">
                          Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
                        />
                      </motion.div>
                    )}

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-foreground/60 tracking-wide uppercase">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="you@company.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
                      />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-foreground/60 tracking-wide uppercase">
                          Password
                        </label>
                        {mode === "login" && (
                          <button
                            type="button"
                            className="text-xs text-primary hover:text-primary/80 transition-colors"
                          >
                            Forgot password?
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all pr-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/70 transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 group mt-2"
                    >
                      {mode === "login" ? "Login" : "Create Account"}
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </form>

                  {/* Divider */}
                  <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-xs text-foreground/30 font-medium">
                      or continue with
                    </span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>

                  {/* Social buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-xl py-3 text-sm font-medium text-foreground/70 hover:bg-white/10 hover:text-white transition-all">
                      <svg width="18" height="18" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Google
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-xl py-3 text-sm font-medium text-foreground/70 hover:bg-white/10 hover:text-white transition-all">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </button>
                  </div>

                  {/* Bottom toggle text */}
                  <p className="text-center text-sm text-foreground/40 mt-8">
                    {mode === "login"
                      ? "Don't have an account? "
                      : "Already have an account? "}
                    <button
                      onClick={() => {
                        setMode(mode === "login" ? "signup" : "login");
                        setShowPassword(false);
                      }}
                      className="text-primary hover:text-primary/80 font-semibold transition-colors"
                    >
                      {mode === "login" ? "Sign up" : "Log in"}
                    </button>
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
