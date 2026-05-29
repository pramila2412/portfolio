"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { Card } from "@/components/ui/card";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  slug: string;
  image: string;
  status?: string;
  liveUrl?: string;
  githubUrl?: string;
  index: number;
  scrollYProgress: MotionValue<number>;
  total: number;
}

export function ProjectCard({
  title,
  description,
  slug,
  image,
  status,
  liveUrl,
  githubUrl,
  index,
  scrollYProgress,
  total
}: ProjectCardProps) {
  // Calculate individual step with overlap to prevent "dead zones"
  const step = 1 / total;
  // Overlap by 20% of the step size to ensure visual handoff
  const overlap = step * 0.2;
  const start = Math.max(0, index * step - overlap);
  const end = Math.min(1, (index + 1) * step + overlap);

  const dwellStart = index * step + step * 0.2;
  const dwellEnd = index * step + step * 0.8;
  const range = [start, dwellStart, dwellEnd, end];

  // Sustain focus values (0 rotation, 1 scale) during the dwell phase
  const rotateX = useTransform(scrollYProgress, range, [-45, 0, 0, 45]);
  const scale = useTransform(scrollYProgress, range, [0.85, 1, 1, 0.85]);

  // Specific opacity logic for Card 0 to be visible at the start
  const initialOpacity = index === 0 ? 1 : 0;
  const opacity = useTransform(scrollYProgress, [start, dwellStart, dwellEnd, end], [initialOpacity, 1, 1, 0]);

  // Tighter vertical travel to keep large cards centered
  const y = useTransform(scrollYProgress, range, ["30vh", "0vh", "0vh", "-30vh"]);
  const translateZ = useTransform(scrollYProgress, range, [-150, 0, 0, -150]);

  return (
    <motion.div
      style={{
        rotateX,
        scale,
        opacity,
        y,
        translateZ,
        // Removed transformPerspective as it competes with parent perspective
        transformStyle: "preserve-3d",
        position: "absolute",
        zIndex: total - index,
      }}
      className="relative w-[calc(100vw-32px)] md:w-[calc(100vw-90px)] lg:w-full max-w-7xl min-h-[500px] md:aspect-[21/9] will-change-transform"
    >
      <Card className="group relative w-full h-full overflow-hidden bg-white/70 dark:bg-zinc-900/40 backdrop-blur-3xl border border-black/20 dark:border-white/5 shadow-2xl dark:shadow-[0_50px_100px_rgba(0,0,0,0.8)] flex flex-col md:flex-row">

        {/* Visual Layer - Shorter on mobile */}
        <div className="relative w-full md:w-[60%] lg:w-[65%] h-64 md:h-full overflow-hidden transition-all duration-700 ease-out bg-black/20">
          
          {/* Dynamic Background Blur removes the black gaps */}
          <div
            className="absolute -inset-10 bg-cover bg-center opacity-40 blur-3xl scale-125 pointer-events-none transition-opacity duration-700"
            style={{ backgroundImage: `url(${image})` }}
          />

          {/* Full Image Display - Contained perfectly but larger */}
          <div
            className="absolute inset-0 md:inset-4 lg:inset-8 bg-contain rounded-lg shadow-2xl bg-center bg-no-repeat opacity-100 transition-transform duration-700 hover:scale-105"
            style={{ backgroundImage: `url(${image})` }}
          />

          <div className="absolute inset-0 flex items-center justify-center opacity-10 mix-blend-overlay pointer-events-none">
            <span className="text-[15rem] md:text-[25rem] font-bold select-none font-heading leading-none text-foreground opacity-5 italic">
              0{index + 1}
            </span>
          </div>
          
          <div className="absolute right-0 inset-y-0 w-32 bg-gradient-to-l from-zinc-900/40 to-transparent pointer-events-none" />
        </div>

        {/* Content Layer */}
        <div className="w-full md:w-[40%] lg:w-[35%] p-8 md:p-12 flex flex-col justify-center relative z-10">
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-4 px-4 py-1.5 rounded-full border border-border bg-foreground/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)]" />
                  <span className="text-[9px] font-bold tracking-[0.5em] text-foreground/40 uppercase">Project 0{index + 1}</span>
                </div>
                {status && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-yellow-500/20 bg-yellow-500/10 text-yellow-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                    <span className="text-[9px] font-bold tracking-[0.2em] uppercase">{status}</span>
                  </div>
                )}
              </div>

              <h3 className="text-4xl md:text-7xl font-heading font-black tracking-tighter text-foreground leading-[0.85] py-2">
                {title.split(' ')[0]} <br />
                <span className="text-foreground/30">{title.split(' ').slice(1).join(' ')}</span>
              </h3>
            </div>

            <p className="text-lg md:text-2xl text-foreground/60 leading-relaxed font-light max-w-md">
              {description}
            </p>

            {/* Layer 2: Actions (Bottom left/right) */}
            <div className="absolute inset-x-6 md:inset-x-12 bottom-6 md:bottom-12 flex flex-col md:flex-row justify-between items-start md:items-end z-30 gap-6 md:gap-0 pointer-events-auto">
              {/* Primary Action */}
              <a
                href={`/projects/${slug}`}
                className="group/btn inline-flex relative px-8 py-3 rounded-full bg-foreground text-background font-bold tracking-tight text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg overflow-hidden border border-transparent hover:border-foreground/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore
                  <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              </a>

              {/* Secondary Actions */}
              <div className="flex gap-4">
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/live inline-flex cursor-pointer items-center gap-2 px-6 py-3 rounded-full border border-border/50 bg-background/50 backdrop-blur-md text-foreground font-bold tracking-tight text-sm transition-all duration-300 hover:bg-muted hover:border-border"
                  >
                    <span className="w-2 h-2 rounded-full bg-[var(--accent-blue)] animate-pulse" />
                    Live Demo
                  </a>
                )}
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/git inline-flex cursor-pointer items-center justify-center w-12 h-12 rounded-full border border-border/50 bg-background/50 backdrop-blur-md text-foreground transition-all duration-300 hover:bg-muted hover:border-border hover:rotate-12"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Glass Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent z-20 opacity-30" />
      </Card>

      {/* Grounding Shadow */}
      <div className="absolute inset-x-8 -bottom-12 h-20 bg-black/60 blur-3xl pointer-events-none -z-10 rounded-full scale-x-90" />

      {/* Scroll Dwell Status */}
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [dwellStart - 0.05, dwellStart, dwellEnd, dwellEnd + 0.05], [0, 1, 1, 0]) }}
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        {/* <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" /> */}
        <span className="text-[8px] font-bold tracking-[0.5em] text-foreground/30 uppercase">In-View</span>
      </motion.div>
    </motion.div>
  );
}
