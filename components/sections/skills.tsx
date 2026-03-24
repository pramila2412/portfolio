"use client";

import { motion } from "framer-motion";
import { scaleIn } from "@/lib/animation-variants";
import React, { useRef } from "react";
import { GlobalSpotlight, ParticleCard } from "../MagicBento";

const skills = [
  "React.js",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "Express.js",
  "MongoDB",
  "MySQL",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Redux Toolkit",
  "Git",
];

export function Skills() {
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-16"
      >
        Skills & Technologies
      </motion.h2>

      {/* Global Spotlight for mouse tracking */}
      <GlobalSpotlight gridRef={gridRef} />

      {/* Grid Container */}
      <div
        ref={gridRef}
        className="bento-section grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
      >
        <style>
          {`
          .bento-section {
            --glow-x: 50%;
            --glow-y: 50%;
            --glow-intensity: 0;
            --glow-radius: 330px;
            --glow-color: 34, 211, 238;
          }
           .card--border-glow::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 2px;
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                rgba(var(--glow-color), calc(var(--glow-intensity) * 0.8)) 0%,
                rgba(var(--glow-color), calc(var(--glow-intensity) * 0.4)) 30%,
                transparent 60%);
            border-radius: inherit;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: exclude;
            pointer-events: none;
            opacity: 1;
            transition: opacity 0.3s ease;
            z-index: 1;
          }
        `}
        </style>

        {skills.map((skill, index) => (
          <ParticleCard
            key={skill}
            className="card card--border-glow relative p-6 md:p-8 rounded-xl bg-white/5 border border-white/5 overflow-hidden group flex items-center justify-center min-h-[120px]"
            particleCount={8}
            glowColor="34, 211, 238"
            enableTilt
            enableMagnetism
            style={{
              // @ts-ignore
              "--glow-intensity": 0
            }}
          >
            <p className="font-medium text-foreground/80 group-hover:text-foreground transition-colors relative z-10 text-center">
              {skill}
            </p>
          </ParticleCard>
        ))}
      </div>
    </div>
  );
}
