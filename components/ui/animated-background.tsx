"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

export function AnimatedBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Optimized: Render base layer immediately (SSR), only defer random orbs (Client)
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
            {/* Deep Space Base - Always visible to prevent flash */}
            <div className="absolute inset-0 bg-[#030014]" />

            {/* MOBILE BACKGROUND: Simple static orbs for LCP performance (SSR safe) */}
            <div className="md:hidden">
                <div
                    className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[80px] opacity-30"
                    style={{
                        background: "radial-gradient(circle, var(--accent-blue) 0%, transparent 70%)",
                    }}
                />
                <div
                    className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[80px] opacity-30"
                    style={{
                        background: "radial-gradient(circle, var(--accent-purple) 0%, transparent 70%)",
                    }}
                />
            </div>

            {/* DESKTOP BACKGROUND: Animated complex random orbs (Client Only) */}
            {mounted && (
                <div className="hidden md:block">
                    <RandomOrb
                        baseColor="var(--accent-blue)"
                        initialPosition={{ top: "-10%", left: "-10%" }}
                        size="50vw"
                    />
                    <RandomOrb
                        baseColor="var(--accent-purple)"
                        initialPosition={{ bottom: "-10%", right: "-10%" }}
                        size="50vw"
                        delay={2}
                    />
                    <RandomOrb
                        baseColor="rgba(34, 211, 238, 0.4)"
                        initialPosition={{ top: "30%", left: "20%" }}
                        size="40vw"
                        delay={4}
                    />
                    <RandomOrb
                        baseColor="rgba(168, 85, 247, 0.4)"
                        initialPosition={{ bottom: "20%", right: "30%" }}
                        size="45vw"
                        delay={6}
                    />

                    {/* Grid Overlay */}
                    <div
                        className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"
                    />
                </div>
            )}
        </div>
    );
}

function RandomOrb({ baseColor, initialPosition, size, delay = 0 }: { baseColor: string, initialPosition: any, size: string, delay?: number }) {
    const animationValues = useMemo(() => ({
        x: [0, Math.random() * 400 - 200, Math.random() * 400 - 200, 0],
        y: [0, Math.random() * 400 - 200, Math.random() * 400 - 200, 0],
        duration: 15 + Math.random() * 10
    }), []);

    return (
        <motion.div
            className="absolute rounded-full blur-[100px] opacity-30"
            style={{
                ...initialPosition,
                width: size,
                height: size,
                background: `radial-gradient(circle, ${baseColor} 0%, transparent 70%)`,
            }}
            animate={{
                x: animationValues.x,
                y: animationValues.y,
                scale: [1, 1.2, 0.8, 1],
                rotate: [0, 180, 360],
            }}
            transition={{
                duration: animationValues.duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: delay,
            }}
        />
    );
}
