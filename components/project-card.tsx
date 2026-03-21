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
      <Card className="group relative w-full h-full overflow-hidden bg-zinc-900/40 backdrop-blur-3xl border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.8)] border flex flex-col md:flex-row">

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
            <span className="text-[15rem] md:text-[25rem] font-bold select-none font-heading leading-none text-white italic">
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
                <div className="inline-flex items-center gap-4 px-4 py-1.5 rounded-full border border-white/5 bg-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)]" />
                  <span className="text-[9px] font-bold tracking-[0.5em] text-white/30 uppercase">Project 0{index + 1}</span>
                </div>
                {status && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-yellow-500/20 bg-yellow-500/10 text-yellow-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                    <span className="text-[9px] font-bold tracking-[0.2em] uppercase">{status}</span>
                  </div>
                )}
              </div>

              <h3 className="text-4xl md:text-7xl font-heading font-black tracking-tighter text-white leading-[0.85] py-2">
                {title.split(' ')[0]} <br />
                <span className="text-white/30">{title.split(' ').slice(1).join(' ')}</span>
              </h3>
            </div>

            <p className="text-lg md:text-2xl text-white/40 leading-relaxed font-light max-w-md">
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4 md:pt-6">
              <Link
                href={`/projects/${slug}`}
                className="group/btn inline-flex relative px-8 py-4 rounded-sm bg-white text-black font-black tracking-tight text-base transition-all duration-300 hover:bg-[var(--accent-blue)] hover:text-white overflow-hidden"
              >
                <span className="relative z-10">Explore Case</span>
                <div className="absolute inset-0 bg-black/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
              </Link>

              {liveUrl && (
                <button
                  onClick={() => window.open(liveUrl, "_blank")}
                  className="group/live inline-flex cursor-pointer items-center gap-2 px-8 py-4 rounded-sm border border-white/10 bg-white/5 text-white font-black tracking-tight text-base transition-all duration-300 hover:bg-white/10 hover:border-white/20"
                >
                  <span>Live Demo</span>
                </button>
              )}
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
        <span className="text-[8px] font-bold tracking-[0.5em] text-white/20 uppercase">In-View</span>
      </motion.div>
    </motion.div>
  );
}
