"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useState, useEffect } from "react";
import { GrainOverlay } from "@/components/grain-overlay";

export function PageTransition({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div className="relative">
                <GrainOverlay />
                {children}
            </div>
        );
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1]
                }}
            >
                <GrainOverlay />
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
