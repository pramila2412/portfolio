"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface MarqueeProps {
    items: string[];
    direction?: "left" | "right";
    speed?: number;
    className?: string;
}

export function Marquee({
    items,
    direction = "left",
    speed = 20,
    className = ""
}: MarqueeProps) {
    const repeatedItems = useMemo(() => [...items, ...items, ...items, ...items], [items]);

    return (
        <div className={`flex overflow-hidden bg-transparent whitespace-nowrap ${className}`}>
            <motion.div
                key={speed}
                className="flex gap-8 items-center"
                animate={{
                    x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
                }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: speed,
                }}
            >
                {repeatedItems.map((item, index) => (
                    <span key={index} className="text-4xl md:text-6xl bg-transparent font-bold uppercase tracking-tighter opacity-70">
                        {item}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}
