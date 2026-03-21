"use client";

import { motion } from "framer-motion";

interface TypingTextProps {
    text: string;
    className?: string;
    onComplete?: () => void;
}

export function TypingText({ text, className = "", onComplete }: TypingTextProps) {
    const letters = Array.from(text);

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.02 * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            display: "inline-block",
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 200,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            display: "none",
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 200,
            },
        },
    };

    return (
        <motion.div
            className={`overflow-hidden flex ${className}`}
            variants={container}
            initial="hidden"
            animate="visible"
            onAnimationComplete={onComplete}
        >
            {letters.map((letter, index) => (
                <motion.span variants={child} key={index}>
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </motion.div>
    );
}
