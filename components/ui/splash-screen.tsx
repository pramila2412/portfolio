"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { TypingText } from "./typing-text";

interface SplashScreenProps {
    onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
    const [show, setShow] = useState(true);

    const handleTypingComplete = () => {
        setTimeout(() => {
            setShow(false);
            setTimeout(onComplete, 150);
        }, 100);
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
                >
                    <div className="relative z-10">
                        <TypingText
                            text="Pramila K"
                            className="text-4xl md:text-6xl font-heading font-bold text-foreground tracking-tight"
                            onComplete={handleTypingComplete}
                        />
                        {/* Gradient underline effect */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
                            className="h-1 w-full bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)] mt-2 origin-left"
                        />
                    </div>

                    {/* Background decoration elements */}
                    <motion.div
                        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[100px] opacity-20"
                        style={{
                            background: "radial-gradient(circle, var(--accent-blue) 0%, transparent 70%)",
                        }}
                    />
                    <motion.div
                        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[100px] opacity-20"
                        style={{
                            background: "radial-gradient(circle, var(--accent-purple) 0%, transparent 70%)",
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
