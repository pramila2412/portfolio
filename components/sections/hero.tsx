"use client";

import { motion } from "framer-motion";
import { heroTextLine } from "@/lib/animation-variants";
import { Button } from "@/components/ui/button";
import { ShinyText } from "@/components/ui/shiny-text";

import { Typewriter } from "@/components/ui/typewriter";


export function Hero() {

    const handleDownload = () => {
      const link = document.createElement("a");
      link.href = "/assets/resume.pdf";
      link.download = "Pramila-K-Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">


      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32">
        <div className="space-y-6">

          {/* Consolidated Hero Text for SEO & Performance */}
          <h1 className="font-heading font-bold tracking-tight leading-[1.1]">
            <motion.div
              initial={false}
              animate="visible"
              variants={heroTextLine}
              className="space-y-2"
            >
              {/* Line 1 - The primary LCP element */}
              <motion.div
                custom={0}
                variants={heroTextLine}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
              >
                <span className="text-foreground/80">Hi, I&apos;m </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)]">
                  Pramila K
                </span>
              </motion.div>

              {/* Line 2 */}
              <motion.div
                custom={1}
                variants={heroTextLine}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
              >
                <ShinyText
                  text="a passionate"
                  speed={2}
                  delay={0.1}
                  color="#d1d5db"
                  shineColor="#ffffff"
                  spread={90}
                  direction="left"
                />
              </motion.div>

              {/* Line 3 */}
              <motion.div
                custom={2}
                variants={heroTextLine}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl relative"
              >
                {/* Layout Placeholder to prevent CLS */}
                <span className="invisible opacity-0 select-none pr-2">MERN Stack Developer</span>
                <div className="absolute top-0 left-0">
                  <Typewriter
                    words={["MERN Stack Developer", "Front-End Developer", "Software Developer"]}
                    delay={2000}
                    className="text-foreground"
                    cursorClassName="bg-[var(--accent-blue)]"
                  />
                </div>
              </motion.div>
            </motion.div>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg md:text-xl text-foreground/60 max-w-2xl pt-4"
          >
            Crafting High-Performance, User-Centric Applications
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="pt-8"
          >
            <Button
              size="lg"
              className="relative mr-4 group cursor-pointer overflow-hidden bg-transparent text-white border hover:bg-foreground hover:text-black transition-all duration-300"
              onClick={() => {
                const element = document.querySelector("#projects");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="relative z-10">View Work</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)]"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
         <Button
            size="lg"
            onClick={handleDownload}
            className="relative group cursor-pointer overflow-hidden bg-foreground text-background hover:bg-foreground/90 transition-all duration-300"
            aria-label="Download Resume"
          >
            <span className="relative z-10">Resume</span>

          
          </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-foreground/40"
          >
            <span className="text-xs uppercase tracking-wider">Scroll</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
