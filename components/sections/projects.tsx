"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import { useRef } from "react";
import { projects } from "@/lib/projects-data";

export function Projects() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 40,
    stiffness: 80,
    restDelta: 0.001
  });

  // Hoisted from inline JSX to avoid creating new MotionValues every render
  const titleOpacity = useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);
  const titleY = useTransform(smoothProgress, [0, 0.05], [20, 0]);

  // No horizontal x transform needed for 3D stack

  return (
    <section id="projects" ref={container} className="relative h-[1200vh]">
        {/* Layer E: Sticky Title */}
        <div className="absolute top-12 left-6 md:left-12 z-20 pointer-events-none">
            <h2 className="text-2xl md:text-3xl font-heading font-black tracking-tighter text-white/20 uppercase">
              Selected <span className="text-white">Works</span>
            </h2>
        </div>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center" style={{ perspective: "2000px" }}>


        {/* Layer C: Stacked 3D Content */}
        <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              index={index}
              total={projects.length}
              {...project}
              image={project.images[0]}
              status={project.status}
              scrollYProgress={smoothProgress}
            />
          ))}
        </div>
        
      </div>
    </section>
  );
}
