"use client";

import { ReactNode, useRef, useState, useEffect } from "react";

interface LazySectionProps {
    children: ReactNode;
    /** Minimum height for the placeholder to prevent layout jumps */
    minHeight?: string;
    /** IntersectionObserver rootMargin — how far before the viewport to start loading */
    rootMargin?: string;
}

/**
 * Defers mounting of children until the section is near the viewport.
 * This prevents heavy components (MagicBento, framer-motion animations, gsap)
 * from initializing during page load, reducing Total Blocking Time (TBT).
 */
export function LazySection({
    children,
    minHeight = "50vh",
    rootMargin = "300px",
}: LazySectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldRender(true);
                    observer.disconnect();
                }
            },
            { rootMargin }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [rootMargin]);

    if (shouldRender) {
        return <>{children}</>;
    }

    return <div ref={ref} style={{ minHeight }} />;
}
