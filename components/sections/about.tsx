"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animation-variants";
import { GlareHover } from "@/components/ui/glare-card";
import Image from "next/image";

const words = "Software Developer with hands-on experience designing and delivering responsive web applications, management systems, and functional admin platforms. Strong expertise in React, Next.js, Node.js, MongoDB and MySQL. Focused on building user-centric interfaces and secure backend architectures.".split(" ");

export function About() {

  return (
    <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
      <div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-8"
        >
          About Me
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-lg md:text-xl text-foreground/70 leading-relaxed space-y-1"
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              variants={staggerItem}
              className="inline-block mr-[0.3em]"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <GlareHover
        className="group aspect-square rounded-2xl bg-gradient-to-br from-[var(--accent-blue)]/20 to-[var(--accent-purple)]/20 backdrop-blur-sm border border-white/10"
        glareColor="#ffffff"
        glareOpacity={0.4}
        glareAngle={-30}
        glareSize={300}
        transitionDuration={800}
        playOnce={false}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full h-full rounded-2xl overflow-hidden"
        >
          <Image
            src="/assets/prami.webp"
            alt="Profile"
            fill
            className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
            priority
          />
        </motion.div>
      </GlareHover>
    </div>
  );
}
