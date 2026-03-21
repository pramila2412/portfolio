"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-white/10"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Logo */}
              <motion.a
                href="#"
                className="text-xl md:text-2xl font-heading font-bold tracking-tight"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Portfolio
              </motion.a>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className="relative text-sm font-medium text-foreground/70 hover:text-foreground transition-colors group"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)] group-hover:w-full transition-all duration-300 ease-[var(--ease-premium)]" />
                  </motion.button>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button className="md:hidden text-foreground">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
