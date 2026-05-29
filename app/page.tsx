"use client";

import { useState } from "react";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { ScrollProgress } from "@/components/scroll-progress";
import { BeyondTheCode } from "@/components/sections/beyond-code";
import { Marquee } from "@/components/ui/marquee";
import { SplashScreen } from "@/components/ui/splash-screen";
import { LazySection } from "@/components/ui/lazy-section";
import { ThemeToggle } from "@/components/theme-toggle";

// Module-level variable to track splash state across client-side navigations
let hasShownSplash = false;

export default function Home() {
  const [showSplash, setShowSplash] = useState(!hasShownSplash);

  const handleSplashComplete = () => {
    setShowSplash(false);
    hasShownSplash = true;
  };

  const scrollToSection = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Pramila K",
            url: "https://github.com/pramila2412",
            jobTitle: "Software Developer",
            sameAs: [
              "https://github.com/pramila2412"
            ],
          }),
        }}
      />
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      <main className="relative">
        {/* Top Minimal Header (Not Sticky) */}
        <header className="absolute top-0 left-0 w-full z-50 py-10 px-6 md:px-12 pointer-events-none">
          <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
            {/* Logo */}
            <div
              className="text-2xl md:text-3xl font-bold tracking-tighter cursor-pointer group flex items-center gap-2"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center text-white text-xl group-hover:rotate-12 transition-transform duration-500 shadow-lg shadow-pink-500/20">
                P
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60 group-hover:from-[var(--accent-blue)] group-hover:to-[var(--accent-purple)] transition-all duration-300">
                Pramila
              </span>
            </div>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-2 bg-muted/60 dark:bg-muted/30 backdrop-blur-sm p-1 rounded-2xl border border-border/50 dark:border-border/20">
              {["About", "Projects", "Contact"].map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  onClick={(e) => scrollToSection(e, `#${label.toLowerCase()}`)}
                  className="px-6 py-2 rounded-xl text-xs uppercase tracking-[0.15em] font-bold text-foreground/60 dark:text-foreground/50 hover:text-foreground hover:bg-background/80 transition-all duration-300"
                >
                  {label}
                </a>
              ))}
            </nav>
            
            <div className="flex items-center gap-4">
              <ThemeToggle />
            </div>
          </div>
        </header>

        <div className="pt-40">{/* Increased spacer for absolute header */}</div>
        <Hero />

        <div className="py-4 backdrop-blur-lg">
          <Marquee
            items={[
              "React", "Next.js", "Node.js", "Express", "MongoDB",
              "MySQL", "TypeScript", "JavaScript", "Tailwind CSS",
              "Redux", "Git", "REST APIs", "Full Stack", "Web Development"
            ]}
            speed={100}
          />
        </div>

        <SectionWrapper id="about">
          <About />
        </SectionWrapper>
        <LazySection minHeight="300vh">
          <Projects />
        </LazySection>
        <LazySection minHeight="60vh">
          <SectionWrapper id="skills">
            <Skills />
          </SectionWrapper>
        </LazySection>
        <LazySection minHeight="80vh">
          <SectionWrapper id="experience">
            <Experience />
          </SectionWrapper>
        </LazySection>
        <LazySection minHeight="60vh">
          <SectionWrapper id="education">
            <Education />
          </SectionWrapper>
        </LazySection>
        <LazySection minHeight="60vh">
          <SectionWrapper id="beyond-code">
            <BeyondTheCode />
          </SectionWrapper>
        </LazySection>
        <LazySection minHeight="60vh">
          <SectionWrapper id="contact">
            <Contact />
          </SectionWrapper>
        </LazySection>
        <LazySection minHeight="20vh">
          <Footer />
        </LazySection>
      </main>
    </>
  );
}
