"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Music, Book, Gamepad2, ChefHat } from "lucide-react";

const interests = [
    {
        icon: Music,
        title: "Music",
        description: "Regularly explore different genres and artists; enjoy immersive audio experiences and discovering new tracks.",
    },
    {
        icon: Gamepad2,
        title: "Gaming",
        description: "Play story-driven and competitive games; interested in game mechanics, design, and interactive experiences.",
    },
    {
        icon: ChefHat,
        title: "Cooking",
        description: "Enjoy experimenting with new recipes and preparing different cuisines as a creative and relaxing activity.",
    },
    {
        icon: Book,
        title: "Reading",
        description: "Constant learner. Deep diving into sci-fi, philosophy, and tech history. Enjoying books on AI, psychology, and self-improvement.",
    },
];

export function BeyondTheCode() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    // Hoisted from inline JSX to avoid creating new MotionValues every render
    const bgDecoY = useTransform(scrollYProgress, [0, 1], [-100, 100]);

    return (
        <section ref={containerRef} className="py-32 relative overflow-hidden">
            {/* Background decoration */}
            <motion.div
                style={{ y: bgDecoY }}
                className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--accent-blue)]/5 rounded-full blur-[100px] pointer-events-none"
            />

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-16 md:mb-24 text-center md:text-left"
                >
                    <span className="text-sm font-bold trackingwidest uppercase text-[var(--accent-blue)] mb-4 block">Personal</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
                        Beyond the Code
                    </h2>
                    <div className="h-1 w-20 bg-[var(--accent-blue)] rounded-full mx-auto md:mx-0" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {interests.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-[var(--accent-blue)]/50 transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-blue)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
                                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-[var(--accent-blue)] group-hover:text-black transition-colors duration-500">
                                    <item.icon className="w-6 h-6" />
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--accent-blue)] transition-colors duration-300">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-white/60 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
