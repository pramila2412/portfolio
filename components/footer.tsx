"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative py-12 border-t border-white/10">
      <div className="max-w-full mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-foreground/60 text-sm"
          >
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </motion.p>
        </div>

        {/* Back to Top */}
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="absolute right-6 md:right-12 bottom-12 p-3 rounded-full cursor-pointer bg-foreground/10 hover:bg-foreground/20 transition-all duration-300 group"
          whileHover={{ y: -4 }}
          aria-label="Back to top"
        >
          <svg
            className="w-5 h-5 text-foreground/60 group-hover:text-foreground transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </motion.button>
      </div>
    </footer>
  );
}
