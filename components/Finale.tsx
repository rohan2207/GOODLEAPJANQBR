"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Zap, Clock, CheckCircle2, XCircle, ArrowRight } from "lucide-react";

export default function Finale() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Animation phases
    const splitEnter = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
    const chaosIntensity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
    const newReveal = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
    const comparisonFade = useTransform(scrollYProgress, [0.6, 0.75], [1, 0]);
    const resolutionReveal = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);

    return (
        <section ref={containerRef} className="relative w-full min-h-[300vh]">
            {/* Sticky container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
                
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0f] to-black" />

                {/* SPLIT SCREEN COMPARISON */}
                <motion.div 
                    className="absolute inset-0 flex"
                    style={{ opacity: comparisonFade }}
                >
                    {/* LEFT SIDE: THE OLD WAY (Chaos) */}
                    <motion.div 
                        className="w-1/2 h-full relative overflow-hidden border-r border-white/10"
                        style={{ 
                            opacity: splitEnter,
                            x: useTransform(splitEnter, [0, 1], [-100, 0])
                        }}
                    >
                        {/* Chaos overlay effects */}
                        <motion.div 
                            className="absolute inset-0 z-10"
                            style={{
                                background: useTransform(
                                    chaosIntensity,
                                    [0, 1],
                                    ["rgba(0,0,0,0)", "rgba(239,68,68,0.1)"]
                                )
                            }}
                        />

                        {/* Scan lines effect */}
                        <div 
                            className="absolute inset-0 z-20 pointer-events-none opacity-30"
                            style={{
                                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)"
                            }}
                        />

                        {/* Header */}
                        <div className="absolute top-0 left-0 right-0 z-30 p-8">
                            <motion.div
                                style={{ opacity: chaosIntensity }}
                                className="flex items-center gap-3"
                            >
                                <XCircle className="w-6 h-6 text-red-500" />
                                <div>
                                    <h3 className="text-2xl font-bold text-white/80">The Old Way</h3>
                                    <p className="text-red-400/60 text-sm">Fragmented. Manual. Slow.</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Video placeholder - chaos visualization */}
                        <div className="absolute inset-0 flex items-center justify-center p-12 pt-24">
                            <motion.div 
                                className="w-full h-full rounded-xl overflow-hidden relative bg-[#111] border border-red-500/20"
                                style={{ scale: useTransform(chaosIntensity, [0, 1], [0.9, 1]) }}
                            >
                                {/* If you have a video, uncomment this:
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover opacity-60"
                                    style={{ filter: "saturate(0.5) contrast(1.2)" }}
                                >
                                    <source src="/assets/chaos-video.mp4" type="video/mp4" />
                                </video>
                                */}
                                
                                {/* Chaos collage of old UI screenshots */}
                                <div className="absolute inset-0 overflow-hidden">
                                    {/* Scattered screenshots - chaotic overlapping collage */}
                                    {[
                                        { src: "/Screenshots/Picture1.png-2.png", x: -5, y: 5, rotate: -8, scale: 0.45, z: 1, delay: 0 },
                                        { src: "/Screenshots/Picture1.png-3.png", x: 25, y: -10, rotate: 5, scale: 0.5, z: 2, delay: 0.1 },
                                        { src: "/Screenshots/Picture1.png-4.png", x: 55, y: 8, rotate: -3, scale: 0.4, z: 3, delay: 0.2 },
                                        { src: "/Screenshots/Picture1.png-5.png", x: 10, y: 30, rotate: 7, scale: 0.55, z: 4, delay: 0.15 },
                                        { src: "/Screenshots/Picture1.png-6.png", x: 40, y: 25, rotate: -12, scale: 0.48, z: 5, delay: 0.25 },
                                        { src: "/Screenshots/Picture1.png-7.png", x: 70, y: 20, rotate: 4, scale: 0.42, z: 6, delay: 0.3 },
                                        { src: "/Screenshots/Picture1.png-8.png", x: -8, y: 55, rotate: -6, scale: 0.5, z: 7, delay: 0.2 },
                                        { src: "/Screenshots/Picture1.png-9.png", x: 30, y: 50, rotate: 10, scale: 0.46, z: 8, delay: 0.35 },
                                        { src: "/Screenshots/Picture1.png-10.png", x: 60, y: 45, rotate: -9, scale: 0.52, z: 9, delay: 0.4 },
                                        { src: "/Screenshots/Picture1.png-11.png", x: 15, y: 70, rotate: 3, scale: 0.44, z: 10, delay: 0.3 },
                                        { src: "/Screenshots/Picture1.png-12.png", x: 45, y: 68, rotate: -5, scale: 0.48, z: 11, delay: 0.45 },
                                        { src: "/Screenshots/Picture1.png-13.png", x: 75, y: 60, rotate: 8, scale: 0.4, z: 12, delay: 0.5 },
                                        { src: "/Screenshots/Picture1.png-14.png", x: 5, y: 85, rotate: -4, scale: 0.38, z: 13, delay: 0.4 },
                                        { src: "/Screenshots/Picture1.png-15.png", x: 35, y: 82, rotate: 6, scale: 0.42, z: 14, delay: 0.55 },
                                        { src: "/Screenshots/Picture1.png-16.png", x: 65, y: 78, rotate: -7, scale: 0.45, z: 15, delay: 0.6 },
                                        { src: "/Screenshots/Picture1.png-17.png", x: 50, y: 35, rotate: 2, scale: 0.5, z: 16, delay: 0.35 },
                                    ].map((img, idx) => (
                                        <motion.div
                                            key={idx}
                                            className="absolute rounded-lg overflow-hidden shadow-2xl border border-red-500/20"
                                            style={{
                                                left: `${img.x}%`,
                                                top: `${img.y}%`,
                                                zIndex: img.z,
                                                rotate: img.rotate,
                                                scale: img.scale,
                                                opacity: useTransform(
                                                    chaosIntensity,
                                                    [img.delay, img.delay + 0.3],
                                                    [0, 0.85]
                                                )
                                            }}
                                        >
                                            <img 
                                                src={img.src} 
                                                alt={`Old UI ${idx + 1}`}
                                                className="w-[400px] h-auto object-cover"
                                                style={{ filter: "saturate(0.7) contrast(1.1)" }}
                                            />
                                        </motion.div>
                                    ))}
                                    
                                    {/* Red overlay tint for chaos feel */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-red-950/30 pointer-events-none" />
                                </div>

                                {/* Chaos stats */}
                                <motion.div 
                                    className="absolute bottom-4 left-4 right-4 flex gap-4"
                                    style={{ opacity: chaosIntensity }}
                                >
                                    <div className="flex-1 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                                        <Clock className="w-4 h-4 text-red-400 mb-1" />
                                        <div className="text-lg font-bold text-red-400">45+ min</div>
                                        <div className="text-[10px] text-white/40">Per application</div>
                                    </div>
                                    <div className="flex-1 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                                        <XCircle className="w-4 h-4 text-red-400 mb-1" />
                                        <div className="text-lg font-bold text-red-400">5+ systems</div>
                                        <div className="text-[10px] text-white/40">Manual switching</div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* RIGHT SIDE: THE NEW WAY (LinkAI) */}
                    <motion.div 
                        className="w-1/2 h-full relative overflow-hidden"
                        style={{ 
                            opacity: newReveal,
                            x: useTransform(newReveal, [0, 1], [100, 0])
                        }}
                    >
                        {/* Success overlay */}
                        <motion.div 
                            className="absolute inset-0 z-10"
                            style={{
                                background: useTransform(
                                    newReveal,
                                    [0, 1],
                                    ["rgba(0,0,0,0)", "rgba(34,197,94,0.05)"]
                                )
                            }}
                        />

                        {/* Header */}
                        <div className="absolute top-0 left-0 right-0 z-30 p-8">
                            <motion.div
                                style={{ opacity: newReveal }}
                                className="flex items-center gap-3"
                            >
                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                                <div>
                                    <h3 className="text-2xl font-bold text-white">The LinkAI Way</h3>
                                    <p className="text-green-400/60 text-sm">Unified. Intelligent. Instant.</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Clean UI visualization */}
                        <div className="absolute inset-0 flex items-center justify-center p-12 pt-24">
                            <motion.div 
                                className="w-full h-full rounded-xl overflow-hidden relative bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-green-500/20 shadow-[0_0_60px_-15px_rgba(34,197,94,0.3)]"
                                style={{ scale: useTransform(newReveal, [0, 1], [0.9, 1]) }}
                            >
                                {/* Unified dashboard mockup */}
                                <div className="absolute inset-0 p-6">
                                    {/* Top bar */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-blue-500 flex items-center justify-center">
                                                <Sparkles className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-semibold">LinkAI Platform</h4>
                                                <p className="text-white/40 text-xs">Everything in one view</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-xs text-green-400">AI Active</span>
                                        </div>
                                    </div>

                                    {/* Clean grid */}
                                    <div className="grid grid-cols-3 gap-4 h-[calc(100%-100px)]">
                                        {[
                                            { label: "Brief AI", color: "orange" },
                                            { label: "Liability Analysis", color: "blue" },
                                            { label: "Property Data", color: "purple" },
                                        ].map((item, idx) => (
                                            <motion.div
                                                key={idx}
                                                className="rounded-xl bg-white/5 border border-white/10 p-4 flex flex-col"
                                                initial={{ opacity: 0, y: 20 }}
                                                style={{
                                                    opacity: useTransform(
                                                        newReveal,
                                                        [0.3 + idx * 0.15, 0.5 + idx * 0.15],
                                                        [0, 1]
                                                    )
                                                }}
                                            >
                                                <div className={`w-8 h-8 rounded-lg bg-${item.color}-500/20 flex items-center justify-center mb-3`}>
                                                    <CheckCircle2 className={`w-4 h-4 text-${item.color}-400`} />
                                                </div>
                                                <h5 className="text-white text-sm font-medium mb-1">{item.label}</h5>
                                                <div className="space-y-1.5 flex-1">
                                                    {[88, 75, 92, 80].map((width, i) => (
                                                        <div key={i} className="h-1.5 bg-white/10 rounded" style={{ width: `${width}%` }} />
                                                    ))}
                                                </div>
                                                <div className="flex items-center gap-1 mt-3 text-[10px] text-green-400">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                    Ready
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Success stats */}
                                <motion.div 
                                    className="absolute bottom-4 left-4 right-4 flex gap-4"
                                    style={{ opacity: newReveal }}
                                >
                                    <div className="flex-1 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                                        <Zap className="w-4 h-4 text-green-400 mb-1" />
                                        <div className="text-lg font-bold text-green-400">5 min</div>
                                        <div className="text-[10px] text-white/40">Per application</div>
                                    </div>
                                    <div className="flex-1 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                                        <CheckCircle2 className="w-4 h-4 text-green-400 mb-1" />
                                        <div className="text-lg font-bold text-green-400">1 platform</div>
                                        <div className="text-[10px] text-white/40">Unified experience</div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Center divider with arrow */}
                    <motion.div 
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
                        style={{ opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1]) }}
                    >
                        <div className="w-16 h-16 rounded-full bg-black border-2 border-white/20 flex items-center justify-center">
                            <ArrowRight className="w-6 h-6 text-white" />
                        </div>
                    </motion.div>
                </motion.div>

                {/* RESOLUTION TEXT */}
                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-none"
                    style={{ opacity: resolutionReveal }}
                >
                    <motion.div 
                        className="text-center"
                        style={{ scale: useTransform(resolutionReveal, [0, 1], [0.9, 1]) }}
                    >
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6">
                            <span className="text-white">One Platform.</span>
                            <br />
                            <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-blue-400 bg-clip-text text-transparent">
                                One Experience.
                            </span>
                        </h2>
                        <p className="text-xl md:text-2xl text-white/50 font-light max-w-2xl mx-auto">
                            The mortgage platform that thinks ahead, so loan officers can focus on what matters most—
                            <span className="text-white"> the customer.</span>
                        </p>

                        {/* Final CTA */}
                        <motion.div 
                            className="mt-12 flex items-center justify-center gap-4"
                            style={{ 
                                opacity: useTransform(resolutionReveal, [0.5, 1], [0, 1])
                            }}
                        >
                            <div className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-blue-500 text-white font-medium">
                                LinkAI
                            </div>
                            <span className="text-white/30">•</span>
                            <span className="text-white/50">Q1 2026</span>
                        </motion.div>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}
