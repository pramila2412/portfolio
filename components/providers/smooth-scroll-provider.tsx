"use client";

import { ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Detect if mobile device - skip Lenis for better performance
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    // Skip Lenis on mobile for better performance
    if (isMobile) {
      return;
    }

    // Initialize Lenis only on desktop
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      lerp: 0.1,
    });

    lenisRef.current = lenis;

    // Add Lenis class to HTML
    document.documentElement.classList.add("lenis");

    // Update ScrollTrigger on Lenis scroll
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // RAF loop for smooth scroll
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.documentElement.classList.remove("lenis");
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Consolidatd update on route change to prevent height ghosting & reduce TBT
  useEffect(() => {
    if (!lenisRef.current) return;

    // A single, slightly delayed refresh is usually enough once the new page layout settles
    const timer = setTimeout(() => {
      lenisRef.current?.resize();
      ScrollTrigger.refresh();
      window.dispatchEvent(new Event('resize'));
    }, 400);

    return () => clearTimeout(timer);
  }, [pathname]);

  return <>{children}</>;
}
