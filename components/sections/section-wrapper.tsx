"use client";

import { ReactNode, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/lib/hooks/use-scroll-animation";
import { fadeInUp } from "@/lib/animation-variants";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function SectionWrapper({ children, className = "", id }: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null!);
  const isVisible = useScrollAnimation(ref);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={isMounted ? "hidden" : false}
      animate={isMounted ? (isVisible ? "visible" : "hidden") : false}
      variants={fadeInUp}
      className={`relative py-20 md:py-32 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">{children}</div>
    </motion.section>
  );
}
