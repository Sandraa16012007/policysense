"use client";

import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Ready to transform your <span className="text-primary">decision making?</span>
            </h2>
            <p className="text-foreground/70 text-lg mb-8">
              Get in touch to see how PolicySense can help your business navigate complex policies with ease.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="jane@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                    placeholder="How can we help?"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting || success}
                  className="mt-2 w-full bg-primary hover:bg-primary/90 text-white font-medium py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : success ? (
                    <>Message Sent <CheckCircle2 size={18} /></>
                  ) : (
                    <>Get in Touch <Send size={18} /></>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
