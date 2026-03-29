"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signIn, signUp, signInWithGoogle } from "@/lib/authService";
import { createOrUpdateUserDoc } from "@/lib/userService";
import { PublicRoute } from "@/components/AuthGuards";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { user, error: authError } = mode === "login" 
      ? await signIn(email, password)
      : await signUp(email, password);

    if (authError) {
      setError(authError);
      setLoading(false);
    } else if (user) {
      if (mode === "signup") {
        await createOrUpdateUserDoc(user.uid, {
          basic: {
            name: fullName,
            role: "founder", // default, will be changed in onboarding
            experienceLevel: "beginner",
            primaryGoals: [],
          },
          location: { country: "India", state: "" },
          system: { onboardingCompleted: false, createdAt: null, updatedAt: null }
        } as any);
      }
      router.push("/onboarding");
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    const { user, error: authError } = await signInWithGoogle();
    if (authError) {
      setError(authError);
    } else if (user) {
      // Initialize user doc if it doesn't exist
      await createOrUpdateUserDoc(user.uid, {
        basic: {
          name: user.displayName || "",
          role: "founder", 
          experienceLevel: "beginner",
          primaryGoals: [],
        },
        system: { onboardingCompleted: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
      } as any);
      router.push("/onboarding");
    }
  };

  return (
    <PublicRoute>
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
            {/* Illustration Section (Omitted for brevity, but same as original) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="hidden lg:flex flex-col gap-10"
            >
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
              {/* Illustration Scene here - keeping original UI logic */}
              <div className="relative h-[360px] w-full perspective-1000">
                <motion.div
                  initial={{ opacity: 0, rotateX: 15, rotateY: -10 }}
                  animate={{ opacity: 1, rotateX: 8, rotateY: -8 }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                  className="absolute inset-0 transform-style-3d"
                >
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 5,
                      ease: "easeInOut",
                    }}
                    className="absolute left-0 top-8 w-52 bg-background/60 backdrop-blur-xl border border-white/15 rounded-2xl p-5 shadow-2xl"
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
                    <div className="flex flex-col gap-2">
                      <div className="w-full h-1.5 bg-white/8 rounded-full" />
                      <div className="w-3/4 h-1.5 bg-white/8 rounded-full" />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Auth Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="w-full max-w-md mx-auto lg:mx-0"
            >
              <div className="relative bg-background/50 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden">
                {/* Toggle */}
                <div className="relative z-10 flex items-center bg-white/5 rounded-2xl p-1 mb-8 border border-white/5">
                  {(["login", "signup"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setMode(tab);
                        setShowPassword(false);
                        setError(null);
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

                    {error && (
                      <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                        {error}
                      </div>
                    )}

                    <form className="flex flex-col gap-5" onSubmit={handleAuth}>
                      {mode === "signup" && (
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-semibold text-foreground/60 tracking-wide uppercase">
                            Full Name
                          </label>
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
                          />
                        </div>
                      )}

                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold text-foreground/60 tracking-wide uppercase">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@company.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-semibold text-foreground/60 tracking-wide uppercase">
                            Password
                          </label>
                        </div>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all pr-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/70 transition-colors"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 group mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <>
                            {mode === "login" ? "Login" : "Create Account"}
                            <ArrowRight
                              size={18}
                              className="group-hover:translate-x-1 transition-transform"
                            />
                          </>
                        )}
                      </button>
                    </form>

                    <div className="flex items-center gap-4 my-6">
                      <div className="flex-1 h-px bg-white/10" />
                      <span className="text-xs text-foreground/30 font-medium">
                        or continue with
                      </span>
                      <div className="flex-1 h-px bg-white/10" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={handleGoogleSignIn}
                        className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-xl py-3 text-sm font-medium text-foreground/70 hover:bg-white/10 hover:text-white transition-all"
                      >
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
                      <button disabled className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-xl py-3 text-sm font-medium text-foreground/70 opacity-50 cursor-not-allowed">
                        GitHub
                      </button>
                    </div>

                    <p className="text-center text-sm text-foreground/40 mt-8">
                      {mode === "login"
                        ? "Don't have an account? "
                        : "Already have an account? "}
                      <button
                        onClick={() => {
                          setMode(mode === "login" ? "signup" : "login");
                          setShowPassword(false);
                          setError(null);
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
    </PublicRoute>
  );
}
