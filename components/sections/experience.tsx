"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    date: "Jun 2025 - Present",
    title: "Software Developer",
    company: "Quantzi Infotech",
    description: "Developed Quantzi company website using Next.js. Built a PG management admin panel webapp for Avita Residency using React.js. Created a company website with CMS functionality for Success Shipping Services using React.js. Built BME Bazaar, a full-stack marketplace platform for medical equipment using Next.js, Node.js, and MongoDB.",
  },
  {
    date: "Dec 2023 - May 2025",
    title: "Associate Software Developer",
    company: "PLC Technology",
    description: "Developed a web app using React and MySQL for a Kids Play Zone Management System. Built a Restaurant Management System using React, Node.js, and MySQL. Developed a role-based Learning Management Platform with separate access for Admins and Learners using React.js, Node.js, Express.js, and MySQL.",
  }
];

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"]
  });

  // Timeline line height based on scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Hoisted from inline JSX to avoid creating new MotionValues every render
  const headingOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const headingY = useTransform(scrollYProgress, [0, 0.1], [30, 0]);

  return (
    <div ref={containerRef}>
      <motion.h2
        style={{
          opacity: headingOpacity,
          y: headingY
        }}
        className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-16"
      >
        Experience
      </motion.h2>

      <div className="relative">
        {/* Animated Timeline Line */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-0 md:left-1/2 top-0 w-px bg-gradient-to-b from-[var(--accent-blue)] via-[var(--accent-purple)] to-transparent origin-top"
        />

        <div className="space-y-12 md:space-y-20">
          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;
            // Calculate scroll range for each card
            const cardStart = index / experiences.length;
            const cardEnd = (index + 1) / experiences.length;

            return (
              <ExperienceCard
                key={index}
                exp={exp}
                index={index}
                isEven={isEven}
                scrollYProgress={scrollYProgress}
                cardStart={cardStart}
                cardEnd={cardEnd}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface ExperienceCardProps {
  exp: { date: string; title: string; company: string; description: string };
  index: number;
  isEven: boolean;
  scrollYProgress: any;
  cardStart: number;
  cardEnd: number;
}

function ExperienceCard({ exp, index, isEven, scrollYProgress, cardStart, cardEnd }: ExperienceCardProps) {
  // Each card fades in during its portion of the scroll
  const opacity = useTransform(scrollYProgress, [cardStart, cardStart + 0.1, cardEnd - 0.05, cardEnd], [0, 1, 1, 0.3]);
  const x = useTransform(scrollYProgress, [cardStart, cardStart + 0.1], [isEven ? -50 : 50, 0]);
  const scale = useTransform(scrollYProgress, [cardStart, cardStart + 0.1], [0.95, 1]);
  const dotScale = useTransform(scrollYProgress, [cardStart, cardStart + 0.08], [0, 1]);

  return (
    <motion.div
      style={{ opacity, x, scale }}
      className={`relative flex ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8`}
    >
      {/* Timeline Dot */}
      <motion.div
        style={{ scale: dotScale }}
        className="absolute left-0 md:left-1/2 w-4 h-4 -ml-[7px] md:-ml-[7px] rounded-full bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)] shadow-lg shadow-[var(--accent-blue)]/50"
      />

      {/* Content */}
      <div className={`flex-1 ${isEven ? "md:text-right md:pr-12" : "md:pl-12"} pl-8 md:pl-0`}>
        <motion.div
          whileHover={{ scale: 1.02, x: isEven ? -4 : 4 }}
          transition={{ duration: 0.3 }}
          className="p-6 md:p-8 rounded-xl bg-card/30 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
        >
          <p className="text-sm text-[var(--accent-blue)] font-medium mb-2">
            {exp.date}
          </p>
          <h3 className="text-xl md:text-2xl font-heading font-bold mb-1">
            {exp.title}
          </h3>
          <p className="text-base text-foreground/80 font-medium mb-3">
            {exp.company}
          </p>
          <p className="text-foreground/60 leading-relaxed">
            {exp.description}
          </p>
        </motion.div>
      </div>

      {/* Spacer for other side */}
      <div className="hidden md:block flex-1" />
    </motion.div>
  );
}
