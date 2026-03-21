// "use client";

// import { useRef } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import { MapPin } from "lucide-react";

// export function Location() {
//     const containerRef = useRef<HTMLDivElement>(null);
//     const { scrollYProgress } = useScroll({
//         target: containerRef,
//         offset: ["start end", "end start"],
//     });

//     const mapScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
//     const mapOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

//     return (
//         <section ref={containerRef} className="py-24 relative overflow-hidden border-y border-white/5">
//             <div className="absolute inset-0 bg-[#0a0a0a]" />

//             {/* Background Grid - simulating a map grid */}
//             <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

//             <motion.div
//                 style={{ scale: mapScale, opacity: mapOpacity }}
//                 className="container px-4 md:px-6 mx-auto relative z-10 flex flex-col items-center justify-center min-h-[400px]"
//             >
//                 <div className="text-center space-y-4 mb-12">
//                     <span className="text-sm font-bold tracking-widest uppercase text-[var(--accent-blue)]">Base of Operations</span>
//                     <h2 className="text-4xl md:text-5xl font-heading font-bold">
//                         San Francisco, CA
//                     </h2>
//                     <p className="text-white/60 max-w-md mx-auto">
//                         Available for remote work worldwide.
//                         Preferring PST/EST time zones.
//                     </p>
//                 </div>

//                 {/* Abstract Map Visualization */}
//                 <div className="relative w-full max-w-3xl aspect-[2/1] bg-white/5 rounded-3xl border border-white/10 overflow-hidden group">

//                     {/* Simulated Map Background */}
//                     <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center grayscale contrast-125 hover:scale-105 transition-transform duration-[2s]" />

//                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

//                     {/* Location Pin */}
//                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//                         <div className="relative">
//                             <div className="absolute -inset-4 bg-[var(--accent-blue)]/30 rounded-full animate-ping" />
//                             <div className="absolute -inset-8 bg-[var(--accent-blue)]/10 rounded-full animate-pulse delay-75" />
//                             <div className="relative z-10 bg-[var(--accent-blue)] text-black p-3 rounded-full shadow-[0_0_20px_rgba(var(--accent-blue-rgb),0.5)]">
//                                 <MapPin className="w-6 h-6" />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Floating UI Elements */}
//                     <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur-md border border-white/10 rounded-lg px-4 py-2 text-xs font-mono text-white/70">
//                         LAT: 37.7749° N <br />
//                         LNG: 122.4194° W
//                     </div>

//                     <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-md border border-white/10 rounded-lg px-4 py-2 flex items-center gap-2">
//                         <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
//                         <span className="text-xs font-bold uppercase tracking-wider text-white/80">Online</span>
//                     </div>
//                 </div>
//             </motion.div>
//         </section>
//     );
// }
