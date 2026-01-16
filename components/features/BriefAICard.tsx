"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface BriefAICardProps {
    progress?: MotionValue<number>;
}

export default function BriefAICard({ progress }: BriefAICardProps) {
    const p = progress!;
    
    // Track which images loaded successfully
    const [imagesLoaded, setImagesLoaded] = useState({ step1: false, step2: false, step3: false });

    // ═══════════════════════════════════════════════════════════════════════
    // COMPRESSED PHASES (faster pacing for 250vh)
    // ═══════════════════════════════════════════════════════════════════════
    
    // PHASE 1: Problem (0-15%)
    const problemOpacity = useTransform(p, [0, 0.05, 0.12, 0.18], [0, 1, 1, 0]);
    const problemY = useTransform(p, [0, 0.05], [40, 0]);
    const highlightWidth = useTransform(p, [0.06, 0.11], ["0%", "100%"]);

    // PHASE 2: Agent Intro (15-30%)
    const agentOpacity = useTransform(p, [0.15, 0.20, 0.27, 0.33], [0, 1, 1, 0]);
    const agentY = useTransform(p, [0.15, 0.20], [50, 0]);
    const taglineOpacity = useTransform(p, [0.22, 0.26], [0, 1]);

    // PHASE 3: Screenshots (30-75%)
    const deviceOpacity = useTransform(p, [0.28, 0.35], [0, 1]);
    const deviceY = useTransform(p, [0.28, 0.38], [60, 0]);
    const deviceScale = useTransform(p, [0.28, 0.38], [0.9, 1]);
    
    const step1Opacity = useTransform(p, [0.33, 0.38, 0.45, 0.50], [0, 1, 1, 0]);
    const step2Opacity = useTransform(p, [0.48, 0.53, 0.60, 0.65], [0, 1, 1, 0]);
    const step3Opacity = useTransform(p, [0.63, 0.68, 0.75, 0.80], [0, 1, 1, 0]);
    
    const caption1Opacity = useTransform(p, [0.36, 0.40, 0.45, 0.50], [0, 1, 1, 0]);
    const caption2Opacity = useTransform(p, [0.51, 0.55, 0.60, 0.65], [0, 1, 1, 0]);
    const caption3Opacity = useTransform(p, [0.66, 0.70, 0.75, 0.80], [0, 1, 1, 0]);

    // PHASE 4: Result (75-90%)
    const resultOpacity = useTransform(p, [0.78, 0.83, 0.90, 0.95], [0, 1, 1, 0]);
    const resultY = useTransform(p, [0.78, 0.83], [30, 0]);
    const deviceBlurOut = useTransform(p, [0.78, 0.85], [0, 15]);

    // PHASE 5: Fade out (90-100%)
    const sectionOpacity = useTransform(p, [0.95, 1], [1, 0]);

    return (
        <motion.div 
            className="absolute inset-0 w-full h-full bg-black flex items-center justify-center overflow-hidden"
            style={{ opacity: sectionOpacity }}
        >
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-gradient-radial from-orange-950/30 via-transparent to-transparent opacity-60" />

            {/* ══════════════════════════════════════════════════════════════
                PHASE 1: THE PROBLEM
            ══════════════════════════════════════════════════════════════ */}
            <motion.div 
                className="absolute inset-0 flex items-center justify-center px-8 z-20"
                style={{ opacity: problemOpacity, y: problemY }}
            >
                <div className="text-center max-w-4xl">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                        Loan officers start every call
                        <br />
                        <span className="relative inline-block mt-2">
                            <span className="text-white/20">completely blind.</span>
                            <motion.span 
                                className="absolute inset-0 text-white overflow-hidden whitespace-nowrap"
                                style={{ width: highlightWidth }}
                            >
                                completely blind.
                            </motion.span>
                        </span>
                    </h1>
                    <p className="text-white/40 text-base md:text-lg mt-6 max-w-xl mx-auto">
                        No context. No history. Just awkward silence.
                    </p>
                </div>
            </motion.div>

            {/* ══════════════════════════════════════════════════════════════
                PHASE 2: THE AGENT
            ══════════════════════════════════════════════════════════════ */}
            <motion.div 
                className="absolute inset-0 flex flex-col items-center justify-center px-8 z-20"
                style={{ opacity: agentOpacity, y: agentY }}
            >
                <p className="text-orange-400 text-xs md:text-sm font-medium tracking-[0.3em] uppercase mb-4">
                    Introducing
                </p>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                    <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                        Brief AI
                    </span>
                </h1>
                <motion.p 
                    className="text-white/50 text-base md:text-xl mt-4 text-center max-w-md"
                    style={{ opacity: taglineOpacity }}
                >
                    Pre-call intelligence that knows your borrower
                </motion.p>
            </motion.div>

            {/* ══════════════════════════════════════════════════════════════
                PHASE 3: SCREENSHOTS
            ══════════════════════════════════════════════════════════════ */}
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
                        {/* Browser Bar */}
                        <div className="flex items-center gap-2 px-3 py-2 bg-[#050505] border-b border-white/[0.05]">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                            </div>
                            <div className="flex-1 flex justify-center">
                                <div className="bg-white/[0.06] rounded px-3 py-1 text-white/30 text-xs font-mono">
                                    linkai.goodleap.com/brief
                                </div>
                            </div>
                        </div>
                        
                        {/* Screenshot Container */}
                        <div className="relative aspect-[16/10] bg-[#111]">
                            
                            {/* STEP 1 */}
                            <motion.div className="absolute inset-0" style={{ opacity: step1Opacity }}>
                                {/* Fallback - always visible as base */}
                                <div className="absolute inset-0 z-0 bg-[#f8fafc]">
                                    <div className="absolute left-0 top-0 bottom-0 w-48 bg-[#1e293b] p-3">
                                        <div className="flex items-center gap-2 mb-6">
                                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                                                <span className="text-white font-bold text-xs">L</span>
                                            </div>
                                            <span className="text-white font-semibold text-sm">LinkAI</span>
                                        </div>
                                        <nav className="space-y-1">
                                            {["Dashboard", "Call Queue", "Borrowers"].map((item, i) => (
                                                <div key={i} className={`px-2 py-1.5 rounded text-xs ${i === 1 ? 'bg-white/10 text-white' : 'text-white/50'}`}>
                                                    {item}
                                                </div>
                                            ))}
                                        </nav>
                                    </div>
                                    <div className="ml-48 p-4">
                                        <h2 className="text-base font-semibold text-gray-900 mb-3">Call Queue</h2>
                                        <div className="space-y-2">
                                            {[
                                                { name: "James Rodriguez", time: "9:00 AM", highlight: true },
                                                { name: "Emily Chen", time: "10:30 AM" },
                                            ].map((call, i) => (
                                                <div key={i} className={`p-3 rounded-lg border ${call.highlight ? 'bg-orange-50 border-orange-200' : 'bg-white border-gray-100'}`}>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-xs ${call.highlight ? 'bg-orange-500' : 'bg-gray-300'}`}>
                                                                {call.name.split(' ').map(n => n[0]).join('')}
                                                            </div>
                                                            <div>
                                                                <p className="font-medium text-gray-900 text-sm">{call.name}</p>
                                                                <p className="text-gray-500 text-xs">{call.time}</p>
                                                            </div>
                                                        </div>
                                                        {call.highlight && (
                                                            <button className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded text-xs font-medium shadow-lg shadow-orange-500/30">
                                                                ✨ Prepare Brief
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {/* Image overlay - only shows if loaded */}
                                {imagesLoaded.step1 && (
                                    <Image 
                                        src="/features/brief-ai/step-1.svg"
                                        alt="Dashboard"
                                        fill
                                        className="object-cover object-top z-10"
                                        onLoad={() => setImagesLoaded(prev => ({ ...prev, step1: true }))}
                                    />
                                )}
                                <Image 
                                    src="/features/brief-ai/step-1.svg"
                                    alt=""
                                    fill
                                    className="object-cover object-top z-10 opacity-0"
                                    onLoad={() => setImagesLoaded(prev => ({ ...prev, step1: true }))}
                                    onError={() => {}}
                                />
                            </motion.div>

                            {/* STEP 2 */}
                            <motion.div className="absolute inset-0" style={{ opacity: step2Opacity }}>
                                <div className="absolute inset-0 z-0 bg-[#0a0a0a] flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="relative w-24 h-24 mx-auto mb-6">
                                            <div className="absolute inset-0 rounded-full bg-orange-500/20 animate-pulse" />
                                            <div className="absolute inset-3 rounded-full bg-[#0a0a0a] flex items-center justify-center">
                                                <svg className="w-10 h-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-semibold text-white mb-2">Preparing Brief</h3>
                                        <p className="text-white/40 text-sm mb-6">for James Rodriguez</p>
                                        <div className="space-y-2 text-left max-w-xs mx-auto">
                                            {[
                                                { label: "Pulling credit report", done: true },
                                                { label: "Analyzing property", done: true },
                                                { label: "Generating talk track", active: true },
                                            ].map((step, i) => (
                                                <div key={i} className="flex items-center gap-2">
                                                    {step.done ? (
                                                        <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
                                                            <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </div>
                                                    ) : (
                                                        <div className="w-4 h-4 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
                                                    )}
                                                    <span className={step.done ? 'text-white/50 text-sm' : 'text-orange-400 text-sm'}>{step.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {imagesLoaded.step2 && (
                                    <Image src="/features/brief-ai/step-2.svg" alt="Processing" fill className="object-cover object-top z-10" />
                                )}
                                <Image 
                                    src="/features/brief-ai/step-2.svg" alt="" fill 
                                    className="object-cover object-top z-10 opacity-0"
                                    onLoad={() => setImagesLoaded(prev => ({ ...prev, step2: true }))}
                                    onError={() => {}}
                                />
                            </motion.div>

                            {/* STEP 3 */}
                            <motion.div className="absolute inset-0" style={{ opacity: step3Opacity }}>
                                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#fefefe] to-[#f8fafc] p-4">
                                    <div className="h-full grid grid-cols-12 gap-3">
                                        <div className="col-span-8 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                                                    <span className="text-white text-lg">✨</span>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 text-sm">Call Prep Brief</h3>
                                                    <p className="text-gray-400 text-xs">AI-Generated</p>
                                                </div>
                                            </div>
                                            <div className="bg-orange-50 rounded-lg p-3 mb-3 border border-orange-100">
                                                <p className="text-orange-600 text-xs font-semibold uppercase mb-1">Summary</p>
                                                <p className="text-gray-700 text-xs">Near-prime borrower in McKinney, TX looking to consolidate debt.</p>
                                            </div>
                                            <div className="grid grid-cols-3 gap-2">
                                                {[
                                                    { label: "Property", value: "$785K", bg: "blue" },
                                                    { label: "Liens", value: "$428K", bg: "orange" },
                                                    { label: "Equity", value: "$358K", bg: "green" },
                                                ].map((stat, i) => (
                                                    <div key={i} className={`bg-${stat.bg}-50 rounded-lg p-2 text-center border border-${stat.bg}-100`}>
                                                        <p className="text-gray-900 font-bold text-sm">{stat.value}</p>
                                                        <p className="text-gray-500 text-[10px]">{stat.label}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="col-span-4 space-y-3">
                                            <div className="bg-white rounded-xl shadow-lg p-3 border border-gray-100">
                                                <p className="font-semibold text-gray-900 text-xs mb-2">💬 Talk Track</p>
                                                <p className="text-gray-600 text-[10px] italic">"Thank you for your time today..."</p>
                                            </div>
                                            <div className="bg-white rounded-xl shadow-lg p-3 border border-gray-100">
                                                <p className="font-semibold text-gray-900 text-xs mb-2">📍 Local</p>
                                                <p className="text-gray-600 text-xs">☀️ 72°F • McKinney, TX</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {imagesLoaded.step3 && (
                                    <Image src="/features/brief-ai/step-3.svg" alt="Brief" fill className="object-cover object-top z-10" />
                                )}
                                <Image 
                                    src="/features/brief-ai/step-3.svg" alt="" fill 
                                    className="object-cover object-top z-10 opacity-0"
                                    onLoad={() => setImagesLoaded(prev => ({ ...prev, step3: true }))}
                                    onError={() => {}}
                                />
                            </motion.div>
                        </div>
                    </div>
                    <div className="absolute -inset-8 bg-gradient-radial from-orange-500/20 via-transparent to-transparent blur-2xl -z-10" />
                </div>

                {/* Captions */}
                <div className="h-12 flex items-center justify-center mt-4">
                    <motion.p className="text-white/50 text-xs md:text-sm font-medium absolute" style={{ opacity: caption1Opacity }}>
                        Step 1: Select from call queue
                    </motion.p>
                    <motion.p className="text-white/50 text-xs md:text-sm font-medium absolute" style={{ opacity: caption2Opacity }}>
                        Step 2: AI analyzes data
                    </motion.p>
                    <motion.p className="text-white/50 text-xs md:text-sm font-medium absolute" style={{ opacity: caption3Opacity }}>
                        Step 3: Brief ready in seconds
                    </motion.p>
                </div>
            </motion.div>

            {/* ══════════════════════════════════════════════════════════════
                PHASE 4: THE RESULT
            ══════════════════════════════════════════════════════════════ */}
            <motion.div 
                className="absolute inset-0 flex flex-col items-center justify-center px-8 z-30"
                style={{ opacity: resultOpacity, y: resultY }}
            >
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center tracking-tight">
                    <span className="text-white">The first 5 minutes,</span>
                    <br />
                    <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                        automated.
                    </span>
                </h1>
                <div className="flex gap-6 mt-8">
                    {[
                        { value: "4.2s", label: "generation" },
                        { value: "100%", label: "context" },
                        { value: "0", label: "silences" },
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
