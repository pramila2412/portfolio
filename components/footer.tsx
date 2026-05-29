"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative py-20 border-t border-border/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center gap-10">
        {/* Brand Mark */}
        <div 
          className="flex flex-col items-center gap-4 group cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center text-white text-2xl group-hover:rotate-12 transition-transform duration-500 shadow-xl shadow-pink-500/10">
            P
          </div>
          <span className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
            Pramila
          </span>
        </div>

        {/* copyright and links placeholder */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-foreground/40 text-xs uppercase tracking-[0.2em] font-bold"
          >
            © {new Date().getFullYear()} All rights reserved.
          </motion.p>


        </div>

        {/* Back to Top - subtle */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-[10px] uppercase tracking-[0.4em] font-black text-[var(--accent-blue)] hover:opacity-70 transition-opacity flex items-center gap-2"
          whileHover={{ y: -2 }}
        >
          Back to Top
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
      </div>
    </footer>
  );
}
