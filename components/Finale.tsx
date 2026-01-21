"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Finale() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1]);

    return (
        <section ref={containerRef} className="relative w-full min-h-[150vh]">
            {/* Sticky container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">
                
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050508] to-black" />
                
                {/* Subtle glow */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange-500/20 via-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
                </div>

                {/* Content */}
                <motion.div 
                    className="relative z-10 text-center px-8 max-w-5xl"
                    style={{ opacity, scale }}
                >
                    {/* Logo */}
                    <motion.div className="mb-8">
                        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-blue-500 flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="text-white font-semibold text-xl">LinkAI</span>
                        </div>
                    </motion.div>

                    {/* Main headline */}
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight">
                        One Platform.
                        <br />
                        <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-blue-400 bg-clip-text text-transparent">
                            Infinite Possibilities.
                        </span>
                    </h2>

                    {/* Tagline */}
                    <p className="text-xl md:text-2xl text-white/50 mb-12 max-w-2xl mx-auto">
                        The mortgage platform that thinks ahead, so loan officers can focus on what matters most—
                        <span className="text-white/80"> closing deals.</span>
                    </p>

                    {/* Q1 2026 badge */}
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/10 to-blue-500/10 border border-white/10">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-white/70 font-medium">Launching Q1 2026</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
