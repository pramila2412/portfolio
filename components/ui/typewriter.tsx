"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

export interface TypewriterProps {
    words: string[];
    delay?: number;
    className?: string;
    cursorClassName?: string;
}

export function Typewriter({
    words,
    delay = 3000,
    className,
    cursorClassName = "bg-primary"
}: TypewriterProps) {
    const [index, setIndex] = useState(0);
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const [displayText, setDisplayText] = useState("");

    const safeIndex = index % words.length;
    const baseText = words[safeIndex] || "";

    useEffect(() => {
        // Defer start to save TBT during hydration
        const startTimeout = setTimeout(() => {
            const controls = animate(count, baseText.length, {
                type: "tween",
                duration: baseText.length * 0.1,
                ease: "linear",
                onUpdate: (latest) => {
                    setDisplayText(baseText.slice(0, Math.round(latest)));
                },
                onComplete: () => {
                    setTimeout(() => {
                        animate(count, 0, {
                            type: "tween",
                            duration: baseText.length * 0.05,
                            ease: "linear",
                            onUpdate: (latest) => {
                                setDisplayText(baseText.slice(0, Math.round(latest)));
                            },
                            onComplete: () => {
                                setIndex((prev) => (prev + 1) % words.length);
                            },
                        });
                    }, delay);
                },
            });

            return () => controls.stop();
        }, 1000); // 1s deferral

        return () => clearTimeout(startTimeout);
    }, [index, baseText, delay, count, words.length]);

    return (
        <span className={className}>
            {displayText}
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                className={`inline-block h-[1em] w-[2px] ml-1 align-middle ${cursorClassName}`}
            />
        </span>
    );
}
