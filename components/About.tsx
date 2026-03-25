"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function About() {
  const points = [
    "What applies to you",
    "What you should do",
    "What it will impact"
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-white/5 border-y border-white/10">
      <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-accent/5 rounded-full blur-[100px] -z-10" />
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            Our Vision
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 leading-tight">
            Clarity in a world of <br /> complex information.
          </h2>
          <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed mb-12">
            PolicySense turns overwhelming policy and business news into{" "}
            <span className="text-white font-medium">clear, personalized decisions</span>.{" "}
            No jargon. No guesswork. Just clarity.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            {points.map((point, index) => (
              <motion.div
                key={point}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-3 text-lg font-medium text-white/90"
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                  <CheckCircle2 size={18} />
                </div>
                {point}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
