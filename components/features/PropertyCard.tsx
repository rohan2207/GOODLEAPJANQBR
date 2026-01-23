"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface PropertyCardProps {
    progress?: MotionValue<number>;
}

export default function PropertyCard({ progress }: PropertyCardProps) {
    const p = progress!;
    const [imagesLoaded, setImagesLoaded] = useState({ step1: false, step2: false, step3: false });

    // COMPRESSED PHASES
    const problemOpacity = useTransform(p, [0, 0.05, 0.12, 0.18], [0, 1, 1, 0]);
    const problemY = useTransform(p, [0, 0.05], [40, 0]);
    const highlightWidth = useTransform(p, [0.06, 0.11], ["0%", "100%"]);

    const agentOpacity = useTransform(p, [0.15, 0.20, 0.27, 0.33], [0, 1, 1, 0]);
    const agentY = useTransform(p, [0.15, 0.20], [50, 0]);
    const taglineOpacity = useTransform(p, [0.22, 0.26], [0, 1]);

    const deviceOpacity = useTransform(p, [0.28, 0.35], [0, 1]);
    const deviceY = useTransform(p, [0.28, 0.38], [60, 0]);
    const deviceScale = useTransform(p, [0.28, 0.38], [0.9, 1]);
    
    const step1Opacity = useTransform(p, [0.33, 0.38, 0.45, 0.50], [0, 1, 1, 0]);
    const step2Opacity = useTransform(p, [0.48, 0.53, 0.60, 0.65], [0, 1, 1, 0]);
    const step3Opacity = useTransform(p, [0.63, 0.68, 0.75, 0.80], [0, 1, 1, 0]);
    
    const caption1Opacity = useTransform(p, [0.36, 0.40, 0.45, 0.50], [0, 1, 1, 0]);
    const caption2Opacity = useTransform(p, [0.51, 0.55, 0.60, 0.65], [0, 1, 1, 0]);
    const caption3Opacity = useTransform(p, [0.66, 0.70, 0.75, 0.80], [0, 1, 1, 0]);

    const resultOpacity = useTransform(p, [0.78, 0.83, 0.90, 0.95], [0, 1, 1, 0]);
    const resultY = useTransform(p, [0.78, 0.83], [30, 0]);
    const deviceBlurOut = useTransform(p, [0.78, 0.85], [0, 15]);
    const sectionOpacity = useTransform(p, [0.95, 1], [1, 0]);

    return (
        <motion.div 
            className="absolute inset-0 w-full h-full bg-black flex items-center justify-center overflow-hidden"
            style={{ opacity: sectionOpacity }}
        >
            <div className="absolute inset-0 bg-gradient-radial from-amber-950/30 via-transparent to-transparent opacity-60" />

            {/* PHASE 1: PROBLEM */}
            <motion.div 
                className="absolute inset-0 flex items-center justify-center px-8 z-20"
                style={{ opacity: problemOpacity, y: problemY }}
            >
                <div className="text-center max-w-4xl">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                        Property values are
                        <br />
                        <span className="relative inline-block mt-2">
                            <span className="text-white/20">uncertain estimates.</span>
                            <motion.span 
                                className="absolute inset-0 text-white overflow-hidden whitespace-nowrap"
                                style={{ width: highlightWidth }}
                            >
                                uncertain estimates.
                            </motion.span>
                        </span>
                    </h1>
                    <p className="text-white/40 text-base md:text-lg mt-6 max-w-xl mx-auto">
                        Zillow says one thing. The appraisal says another.
                    </p>
                </div>
            </motion.div>

            {/* PHASE 2: AGENT */}
            <motion.div 
                className="absolute inset-0 flex flex-col items-center justify-center px-8 z-20"
                style={{ opacity: agentOpacity, y: agentY }}
            >
                <p className="text-amber-400 text-xs md:text-sm font-medium tracking-[0.3em] uppercase mb-4">
                    Introducing
                </p>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                    <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                        Property AI
                    </span>
                </h1>
                <motion.p 
                    className="text-white/50 text-base md:text-xl mt-4 text-center max-w-md"
                    style={{ opacity: taglineOpacity }}
                >
                    Confidence in every valuation
                </motion.p>
            </motion.div>

            {/* PHASE 3: SCREENSHOTS */}
            <motion.div 
                className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-12 z-10"
                style={{ 
                    opacity: deviceOpacity,
                    y: deviceY,
                    scale: deviceScale,
                    filter: useTransform(deviceBlurOut, v => `blur(${v}px)`)
                }}
            >
                <div className="relative w-full max-w-4xl">
                    <div className="bg-[#0a0a0a] rounded-xl border border-white/[0.08] overflow-hidden shadow-2xl">
                        <div className="flex items-center gap-2 px-3 py-2 bg-[#050505] border-b border-white/[0.05]">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                            </div>
                            <div className="flex-1 flex justify-center">
                                <div className="bg-white/[0.06] rounded px-3 py-1 text-white/30 text-xs font-mono">
                                    linkai.goodleap.com/property
                                </div>
                            </div>
                        </div>
                        
                        <div className="relative aspect-[16/10] bg-[#111]">
                            
                            {/* STEP 1: Property Search */}
                            <motion.div className="absolute inset-0" style={{ opacity: step1Opacity }}>
                                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] flex items-center justify-center">
                                    <div className="text-center max-w-md w-full px-6">
                                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
                                            <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-semibold text-white mb-4">Property Valuation</h3>
                                        
                                        <div className="relative mb-3">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            </div>
                                            <input 
                                                type="text" 
                                                className="w-full bg-white/[0.05] border border-white/[0.08] rounded-lg py-3 pl-10 pr-3 text-white text-sm placeholder:text-white/30 outline-none"
                                                readOnly
                                                value="1423 Oak Valley Dr, McKinney TX"
                                            />
                                        </div>
                                        
                                        <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg py-2.5 text-sm font-semibold shadow-lg shadow-amber-500/30">
                                            Get Instant Valuation
                                        </button>
                                    </div>
                                </div>
                                {imagesLoaded.step1 && (
                                    <Image src="/features/property-ai/step-1.svg" alt="Search" fill className="object-cover object-top z-10" />
                                )}
                                <Image 
                                    src="/features/property-ai/step-1.svg" alt="" fill 
                                    className="object-cover object-top z-10 opacity-0"
                                    onLoad={() => setImagesLoaded(prev => ({ ...prev, step1: true }))}
                                    onError={() => {}}
                                />
                            </motion.div>

                            {/* STEP 2: Analyzing */}
                            <motion.div className="absolute inset-0" style={{ opacity: step2Opacity }}>
                                <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
                                    <div className="absolute inset-0 opacity-30">
                                        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                            <defs>
                                                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" opacity="0.1"/>
                                                </pattern>
                                            </defs>
                                            <rect width="100%" height="100%" fill="url(#grid)" />
                                        </svg>
                                    </div>
                                    
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="relative w-32 h-32 mx-auto mb-4">
                                                <div className="absolute inset-0 rounded-full border border-amber-500/20" />
                                                <div className="absolute inset-4 rounded-full border border-amber-500/15" />
                                                <div className="absolute inset-8 rounded-full border border-amber-500/10" />
                                                <div className="absolute inset-0 rounded-full overflow-hidden">
                                                    <div 
                                                        className="absolute inset-0 bg-gradient-conic from-amber-500/40 via-transparent to-transparent animate-spin"
                                                        style={{ animationDuration: '3s' }}
                                                    />
                                                </div>
                                                {[{ top: '25%', left: '60%' }, { top: '60%', left: '30%' }, { top: '45%', left: '70%' }].map((pos, i) => (
                                                    <div 
                                                        key={i}
                                                        className="absolute w-2.5 h-2.5 bg-amber-500 rounded-full shadow-lg shadow-amber-500/50 animate-pulse"
                                                        style={{ top: pos.top, left: pos.left, animationDelay: `${i * 0.2}s` }}
                                                    />
                                                ))}
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-amber-500 rounded-full shadow-lg shadow-amber-500/50" />
                                            </div>
                                            
                                            <h3 className="text-lg font-semibold text-white mb-2">Scanning Area</h3>
                                            <p className="text-white/40 text-sm">Finding comparable sales</p>
                                        </div>
                                    </div>
                                </div>
                                {imagesLoaded.step2 && (
                                    <Image src="/features/property-ai/step-2.svg" alt="Scanning" fill className="object-cover object-top z-10" />
                                )}
                                <Image 
                                    src="/features/property-ai/step-2.svg" alt="" fill 
                                    className="object-cover object-top z-10 opacity-0"
                                    onLoad={() => setImagesLoaded(prev => ({ ...prev, step2: true }))}
                                    onError={() => {}}
                                />
                            </motion.div>

                            {/* STEP 3: Valuation Result */}
                            <motion.div className="absolute inset-0" style={{ opacity: step3Opacity }}>
                                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#fefefe] to-[#f8fafc] p-4">
                                    <div className="grid grid-cols-12 gap-3 h-full">
                                        <div className="col-span-7 space-y-3">
                                            <div className="bg-white rounded-xl p-3 shadow border border-gray-100">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-14 h-14 rounded-lg bg-amber-100 flex items-center justify-center">
                                                        <span className="text-2xl">🏠</span>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 text-sm">1423 Oak Valley Dr</h3>
                                                        <p className="text-gray-500 text-xs">McKinney, TX 75070</p>
                                                        <p className="text-gray-400 text-[10px]">4 bed • 3 bath • 2,850 sqft</p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl p-4 text-white shadow-xl shadow-amber-500/30">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div>
                                                        <p className="text-amber-100 text-[10px] font-medium uppercase">AI Valuation</p>
                                                        <p className="text-3xl font-bold">$785,000</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="flex items-center gap-1.5 justify-end">
                                                            <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                                                            <span className="text-white font-semibold text-sm">92%</span>
                                                        </div>
                                                        <p className="text-amber-100 text-[10px]">Confidence</p>
                                                    </div>
                                                </div>
                                                
                                                <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                                                    <div className="h-full w-[92%] bg-gradient-to-r from-green-400 to-emerald-400 rounded-full" />
                                                </div>
                                                
                                                <div className="grid grid-cols-3 gap-2 mt-3">
                                                    <div className="text-center">
                                                        <p className="text-amber-100 text-[10px]">Low</p>
                                                        <p className="font-semibold text-sm">$745K</p>
                                                    </div>
                                                    <div className="text-center border-x border-white/20">
                                                        <p className="text-amber-100 text-[10px]">Estimate</p>
                                                        <p className="font-bold">$785K</p>
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-amber-100 text-[10px]">High</p>
                                                        <p className="font-semibold text-sm">$820K</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="col-span-5 bg-white rounded-xl p-3 border border-gray-200 shadow">
                                            <p className="text-gray-500 text-[10px] font-semibold uppercase mb-2">Why This Value?</p>
                                            <div className="space-y-2">
                                                <div className="p-2 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                                                    <div className="flex items-start gap-2">
                                                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900 text-xs">Recent Sales Support</p>
                                                            <p className="text-gray-500 text-[10px]">3 similar homes sold within 0.5mi in last 90 days at $275/sqft avg</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                                                    <div className="flex items-start gap-2">
                                                        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900 text-xs">Market Trending Up</p>
                                                            <p className="text-gray-500 text-[10px]">McKinney prices +4.2% YoY, above DFW metro average</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="p-2 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
                                                    <div className="flex items-start gap-2">
                                                        <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900 text-xs">Property Features</p>
                                                            <p className="text-gray-500 text-[10px]">Updated kitchen (+$15K), corner lot (+$8K) vs comps</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {imagesLoaded.step3 && (
                                    <Image src="/features/property-ai/step-3.svg" alt="Valuation" fill className="object-cover object-top z-10" />
                                )}
                                <Image 
                                    src="/features/property-ai/step-3.svg" alt="" fill 
                                    className="object-cover object-top z-10 opacity-0"
                                    onLoad={() => setImagesLoaded(prev => ({ ...prev, step3: true }))}
                                    onError={() => {}}
                                />
                            </motion.div>
                        </div>
                    </div>
                    <div className="absolute -inset-8 bg-gradient-radial from-amber-500/20 via-transparent to-transparent blur-2xl -z-10" />
                </div>

                <div className="h-12 flex items-center justify-center mt-4">
                    <motion.p className="text-white/50 text-xs md:text-sm font-medium absolute" style={{ opacity: caption1Opacity }}>
                        Step 1: Enter any address
                    </motion.p>
                    <motion.p className="text-white/50 text-xs md:text-sm font-medium absolute" style={{ opacity: caption2Opacity }}>
                        Step 2: AI scans comparable sales
                    </motion.p>
                    <motion.p className="text-white/50 text-xs md:text-sm font-medium absolute" style={{ opacity: caption3Opacity }}>
                        Step 3: Instant AVM with confidence
                    </motion.p>
                </div>
            </motion.div>

            {/* PHASE 4: RESULT */}
            <motion.div 
                className="absolute inset-0 flex flex-col items-center justify-center px-8 z-30"
                style={{ opacity: resultOpacity, y: resultY }}
            >
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center tracking-tight">
                    <span className="text-white">Market confidence,</span>
                    <br />
                    <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                        instantly verified.
                    </span>
                </h1>
                <div className="flex gap-6 mt-8">
                    {[
                        { value: "92%", label: "confidence" },
                        { value: "3", label: "verified comps" },
                        { value: "<5s", label: "to calculate" },
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                            <p className="text-white/40 text-xs mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}
