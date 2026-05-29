"use client";

import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { projects, Project } from "@/lib/projects-data";
import { ArrowLeft, ArrowUpRight, AlertCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ProjectDetailContentProps {
    project: Project;
}

export function ProjectDetailContent({ project }: ProjectDetailContentProps) {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);
    const [showNotification, setShowNotification] = useState(false);

    const handleImageClick = () => {
        if (project.liveUrl) {
            window.open(project.liveUrl, "_blank");
        } else {
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
        }
    };

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });
    const { scrollYProgress: spotlightProgress } = useScroll({
        target: spotlightRef,
        offset: ["start 0.9", "start 0.2"]
    });

    const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "20%"]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

    const missionOpacity = useTransform(spotlightProgress, [0.2, 0.8], [0, 1]);
    const missionY = useTransform(spotlightProgress, [0.2, 0.8], [50, 0]);
    const metaOpacity = useTransform(spotlightProgress, [0, 0.5], [1, 0]);
    const metaY = useTransform(spotlightProgress, [0, 0.5], [0, -50]);
    const metaFilter = useTransform(spotlightProgress, [0, 0.5], ["blur(0px)", "blur(10px)"]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const projectIndex = projects.findIndex((p) => p.slug === project.slug);

    const imageTitles: Record<string, string[]> = {
        "avita-residency": ["Landing Page", "Admin Panel", "Contact Page", "Landing Page CMS"],
        "bme-bazaar": ["Landing Page", "Admin Panel", "Listings"],
        "success-shipping": ["Landing Page", "Blogs with CMS", "Services Page", "Contact Page"],
        "quantzi-website": ["Landing Page", "Clients Section", "Working Road Map Section"]
    };

    return (
        <main ref={containerRef} className=" text-foreground selection:bg-primary selection:text-primary-foreground overflow-clip">
            {/* Cinematic Hero */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
                    className="relative z-10 w-full max-w-[90rem] px-6 md:px-12 flex flex-col items-center text-center"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-8 flex flex-col items-center gap-4"
                    >
                        <span className="text-[10px] font-black tracking-[0.8em] uppercase text-muted-foreground pb-2">
                            Project No. 0{projectIndex + 1}
                        </span>
                        {project.status && (
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-yellow-500/20 bg-yellow-500/10 text-yellow-500">
                                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                                <span className="text-[9px] font-bold tracking-[0.2em] uppercase">{project.status}</span>
                            </div>
                        )}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[12vw] md:text-[8vw] font-heading font-black tracking-tightest leading-[0.8] uppercase flex flex-col"
                    >
                        <span className="text-foreground">{project.title.split(' ')[0]}</span>
                        <span className="text-transparent outline-text">{project.title.split(' ').slice(1).join(' ')}</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        transition={{ duration: 2, delay: 0.5 }}
                        className="absolute inset-0 -z-10 flex items-center justify-center text-[30vw] font-black pointer-events-none select-none opacity-[0.03] text-foreground italic"
                    >
                        0{projectIndex + 1}
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-12 flex flex-col items-center gap-4 text-foreground/20"
                >
                    <span className="text-[8px] font-bold tracking-[0.4em] uppercase text-muted-foreground">Investigate</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-border to-transparent" />
                </motion.div>

                {/* Floating Back Button */}
                <div className="fixed top-12 left-12 z-50">
                    <button
                        onClick={() => router.back()}
                        className="group flex items-center cursor-pointer gap-4 text-muted-foreground hover:text-foreground transition-colors duration-500"
                    >
                        <div className="relative w-12 h-12 rounded-full border border-border flex items-center justify-center overflow-hidden transition-transform group-hover:scale-110">
                            <ArrowLeft className="w-4 h-4 relative z-10 transition-transform" />
                            <div className="absolute inset-0 bg-secondary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </div>
                        <span className="text-[10px] font-black tracking-[0.2em] uppercase opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                            Return to Works
                        </span>
                    </button>
                </div>
            </section>

            {/* Unified Interaction Container */}
            <section className="relative z-20 px-6 md:px-12 py-24 max-w-[85rem] mx-auto min-h-screen">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">

                    {/* Left: Persistent Sticky Sidebar (Desktop Only) */}
                    <aside className="lg:col-span-4 lg:sticky lg:top-40 space-y-16">
                        <motion.div style={{ opacity: metaOpacity, y: metaY, filter: metaFilter }} className="space-y-12">
                            <MetaGroup label="Deliverable" value={project.year} delay={0} />
                            <MetaGroup label="Role" value={project.role} delay={0.1} />
                            <MetaGroup label="Stack" value={project.technologies} delay={0.2} />
                        </motion.div>

                        {/* Linked Reveal Section: Mission */}
                        <motion.div
                            style={{ opacity: missionOpacity, y: missionY }}
                            className="pt-12 border-t border-border absolute top-0 left-0 w-full"
                        >
                            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-primary mb-6 block">Mission Outcome</span>
                            <p className="text-xl font-light text-muted-foreground leading-relaxed">
                                {project.description}
                            </p>
                        </motion.div>
                    </aside>

                    {/* Right: Sequential Content Flow */}
                    <div className="lg:col-span-8 space-y-48">

                        {/* Narrative Segment */}
                        <div className="space-y-12 md:space-y-20 pb-24 border-b border-border">
                            <div className="text-[10px] font-black tracking-[0.5em] uppercase text-primary mb-8 md:mb-12 flex items-center gap-4">
                                <span>The Story</span>
                                <div className="h-[1px] flex-1 bg-border" />
                            </div>

                            <div className="space-y-12 md:space-y-16">
                                <ul className="space-y-6 md:space-y-8 list-none pl-0">
                                    {project.longDescription.map((item, idx) => (
                                        <li key={idx} className="group relative flex items-start gap-4">
                                            <div className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0 opacity-60" />
                                            <div className="text-xl md:text-3xl font-light leading-[1.4] tracking-tight text-foreground">
                                                <RevealSentence text={item} />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-16">
                            {/* Main Spotlight & Sequential Images */}
                            {project.images.map((img, idx) => (
                                <motion.div
                                    key={idx}
                                    ref={idx === 0 ? spotlightRef : null}
                                    onClick={handleImageClick}
                                    style={{
                                        y: useTransform(scrollYProgress, [0.4, 1], [40, 0]),
                                        cursor: 'pointer'
                                    }}
                                    className="aspect-[16/10] w-full bg-muted border border-border rounded-2xl overflow-hidden group relative"
                                >
                                    <div
                                        className="absolute -inset-10 bg-cover bg-center opacity-10 blur-3xl scale-125 transition-transform duration-700 group-hover:scale-150 pointer-events-none"
                                        style={{ backgroundImage: `url(${img})` }}
                                    />
                                    <div
                                        className="absolute inset-2 md:inset-8 bg-contain bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105 shadow-2xl rounded-lg"
                                        style={{ backgroundImage: `url(${img})` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
                                    <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 bg-gradient-to-t from-background to-transparent flex justify-between items-end">
                                        <div className="space-y-4">
                                            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-muted-foreground">Visual 0{idx + 1}</span>
                                            <h3 className="text-2xl font-light text-foreground">{imageTitles[project.slug]?.[idx] || "Project Detail"}</h3>
                                        </div>
                                        {project.liveUrl && (
                                            <ArrowUpRight className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors duration-500" />
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Notification */}
            <AnimatePresence>
                {showNotification && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-secondary border border-border rounded-full backdrop-blur-md flex items-center gap-3 shadow-2xl"
                    >
                        <AlertCircle className="w-5 h-5 text-yellow-500" />
                        <span className="text-sm font-medium text-secondary-foreground">This project is currently in development</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                .outline-text {
                    -webkit-text-stroke: 1px var(--foreground);
                    opacity: 0.15;
                    text-shadow: none;
                }
                .tracking-tightest {
                    letter-spacing: -0.05em;
                }
            `}</style>
        </main>
    );
}

function MetaGroup({ label, value, delay }: { label: string, value: string | string[], delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay }}
            className="space-y-4"
        >
            <span className="text-[9px] font-black tracking-[0.4em] uppercase text-muted-foreground">{label}</span>
            <div className="text-xl md:text-2xl font-light">
                {Array.isArray(value) ? (
                    <ul className="space-y-2">
                        {value.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-foreground">
                                <span className="w-1 h-1 rounded-full bg-primary opacity-50" />
                                <RevealSentence text={item} opacityRange={[0.4, 1]} offset={["start 0.95", "start 0.7"]} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <RevealSentence text={value} opacityRange={[0.1, 0.8]} offset={["start 0.95", "start 0.7"]} />
                )}
            </div>
        </motion.div>
    );
}

function RevealSentence({ text, opacityRange = [0.1, 0.8], offset = ["start 0.95", "start 0.25"] }: { text: string, opacityRange?: [number, number], offset?: [string, string] }) {
    const element = useRef<HTMLParagraphElement>(null);
    const { scrollYProgress } = useScroll({
        target: element,
        offset: offset as any
    });

    const words = text.split(" ");
    const totalChars = text.replace(/\s/g, "").length;
    let charIndex = 0;

    return (
        <p ref={element} className="flex flex-wrap text-foreground gap-x-[0.28em] gap-y-[0.1em]">
            {words.map((word, wIdx) => {
                return (
                    <span key={wIdx} className="inline-block whitespace-nowrap">
                        {word.split("").map((char, cIdx) => {
                            const start = charIndex / totalChars;
                            const end = (charIndex + 1) / totalChars;
                            charIndex++;
                            return (
                                <Char key={cIdx} range={[start, end]} progress={scrollYProgress} opacityRange={opacityRange}>
                                    {char}
                                </Char>
                            );
                        })}
                    </span>
                );
            })}
        </p>
    );
}

function Char({ children, range, progress, opacityRange }: { children: React.ReactNode, range: [number, number], progress: any, opacityRange: [number, number] }) {
    const opacity = useTransform(progress, range, opacityRange);
    return (
        <motion.span style={{ opacity }} className="inline-block whitespace-pre">
            {children}
        </motion.span>
    );
}
