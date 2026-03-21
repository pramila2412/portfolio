"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, staggerItem } from "@/lib/animation-variants";

const educationData = [
  {
    degree: "Master's in Computer Science",
    field: "Computer Science",
    institution: "Thiruvalluvar University",
    year: "2013-2015",
    description: "CGPA - 7.74. Comprehensive study in computer science and software development.",
  },
  {
    degree: "Bachelor of Computer Science",
    field: "Computer Science",
    institution: "Thiruvalluvar University",
    year: "2010-2013",
    description: "CGPA - 7.89. Foundation in programming, databases, and core concepts.",
  },
];

export function Education() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2], [60, 0]);

  return (
    <motion.div ref={containerRef} style={{ opacity, y }}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-16"
      >
        Education
      </motion.h2>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-8"
      >
        {educationData.map((edu, index) => (
          <EducationCard key={index} {...edu} index={index} />
        ))}
      </motion.div>
    </motion.div>
  );
}

interface EducationCardProps {
  degree: string;
  field: string;
  institution: string;
  year: string;
  description: string;
  index: number;
}

function EducationCard({ degree, field, institution, year, description, index }: EducationCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.98]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.9]);
  const x = useTransform(
    scrollYProgress,
    [0, 0.3],
    [index % 2 === 0 ? -40 : 40, 0]
  );

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity, x }}
      className="will-animate"
    >
      <motion.div
        whileHover={{ scale: 1.02, x: 6 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="group relative p-6 md:p-8 rounded-2xl bg-card/30 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500"
      >
        {/* Gradient accent line */}
        <div className="absolute left-0 top-6 bottom-6 w-1 rounded-full bg-gradient-to-b from-[var(--accent-blue)] to-[var(--accent-purple)] opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="pl-4 md:pl-6">
          {/* Year badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-[var(--accent-blue)]/20 text-[var(--accent-blue)] border border-[var(--accent-blue)]/30"
          >
            {year}
          </motion.span>

          {/* Degree & Field */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl md:text-3xl font-heading font-bold mb-2 group-hover:translate-x-1 transition-transform duration-300"
          >
            {degree}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-[var(--accent-purple)] font-medium mb-2"
          >
            {field}
          </motion.p>

          {/* Institution */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-foreground/60 mb-4"
          >
            {institution}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-foreground/50 leading-relaxed"
          >
            {description}
          </motion.p>
        </div>

        {/* Hover glow effect */}
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)] rounded-2xl blur-xl -z-10"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.15 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}
