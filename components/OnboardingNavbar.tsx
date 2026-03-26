"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function OnboardingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-white/10 shadow-sm py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
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

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/"
            className="text-sm font-medium text-foreground/80 hover:text-white transition-colors px-4 py-2 rounded-xl border border-white/10 hover:border-white/20"
          >
            Logout
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-foreground/80 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-white/10 md:hidden p-6 flex flex-col gap-6 shadow-xl">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-foreground/80 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-white/10">
            <Link
              href="/"
              className="w-full text-center block text-sm font-medium text-foreground/80 hover:text-white transition-colors px-4 py-3 rounded-xl border border-white/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              Logout
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
