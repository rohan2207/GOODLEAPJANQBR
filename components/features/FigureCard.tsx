"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface FigureCardProps {
    progress?: MotionValue<number>;
}

export default function FigureCard({ progress }: FigureCardProps) {
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
            <div className="absolute inset-0 bg-gradient-radial from-violet-950/30 via-transparent to-transparent opacity-60" />

            {/* PHASE 1: PROBLEM */}
            <motion.div 
                className="absolute inset-0 flex items-center justify-center px-8 z-20"
                style={{ opacity: problemOpacity, y: problemY }}
            >
                <div className="text-center max-w-4xl">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                        Data entry is
                        <br />
                        <span className="relative inline-block mt-2">
                            <span className="text-white/20">duplicated work.</span>
                            <motion.span 
                                className="absolute inset-0 text-white overflow-hidden whitespace-nowrap"
                                style={{ width: highlightWidth }}
                            >
                                duplicated work.
                            </motion.span>
                        </span>
                    </h1>
                    <p className="text-white/40 text-base md:text-lg mt-6 max-w-xl mx-auto">
                        Enter once in LinkAI. Enter again in Figure.
                    </p>
                </div>
            </motion.div>

            {/* PHASE 2: SOLUTION */}
            <motion.div 
                className="absolute inset-0 flex flex-col items-center justify-center px-8 z-20"
                style={{ opacity: agentOpacity, y: agentY }}
            >
                <p className="text-violet-400 text-xs md:text-sm font-medium tracking-[0.3em] uppercase mb-4">
                    Integration
                </p>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                    <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-violet-500 bg-clip-text text-transparent">
                        Figure Sync
                    </span>
                </h1>
                <motion.p 
                    className="text-white/50 text-base md:text-xl mt-4 text-center max-w-md"
                    style={{ opacity: taglineOpacity }}
                >
                    Seamless data flow between platforms
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
                                    linkai.goodleap.com/integrations
                                </div>
                            </div>
                        </div>
                        
                        <div className="relative aspect-[16/10] bg-[#111]">
                            
                            {/* STEP 1: Integration Dashboard */}
                            <motion.div className="absolute inset-0" style={{ opacity: step1Opacity }}>
                                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#fefefe] to-[#f8fafc] p-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <div>
                                            <h2 className="text-base font-semibold text-gray-900">Integrations</h2>
                                            <p className="text-gray-500 text-xs">Connect your tools</p>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="col-span-2 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-4 border-2 border-violet-200 relative">
                                            <span className="absolute top-2 right-2 px-2 py-0.5 bg-violet-100 text-violet-600 text-[10px] font-semibold rounded-full">Recommended</span>
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow">
                                                    <span className="text-white font-bold text-xl">F</span>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 text-sm">Figure</h3>
                                                    <p className="text-gray-500 text-xs">HELOC Platform</p>
                                                </div>
                                            </div>
                                            <p className="text-gray-600 text-xs mb-3">
                                                Auto-sync borrower data. Eliminates duplicate entry.
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-2 h-2 rounded-full bg-gray-300" />
                                                    <span className="text-gray-500 text-xs">Not connected</span>
                                                </div>
                                                <button className="px-3 py-1.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg text-xs font-semibold shadow shadow-violet-500/30">
                                                    Connect →
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-3">
                                            <div className="bg-white rounded-lg p-3 border border-gray-200">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded bg-green-100 flex items-center justify-center">
                                                        <span className="text-green-600 font-bold text-xs">E</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900 text-xs">Encompass</p>
                                                        <div className="flex items-center gap-1">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                            <span className="text-green-600 text-[10px]">Connected</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-white rounded-lg p-3 border border-gray-200">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
                                                        <span className="text-blue-600 font-bold text-xs">G</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900 text-xs">Genesys</p>
                                                        <div className="flex items-center gap-1">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                            <span className="text-green-600 text-[10px]">Connected</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {imagesLoaded.step1 && (
                                    <Image src="/features/figure/step-1.png" alt="Integration" fill className="object-cover object-top z-10" />
                                )}
                                <Image 
                                    src="/features/figure/step-1.png" alt="" fill 
                                    className="object-cover object-top z-10 opacity-0"
                                    onLoad={() => setImagesLoaded(prev => ({ ...prev, step1: true }))}
                                    onError={() => {}}
                                />
                            </motion.div>

                            {/* STEP 2: Syncing */}
                            <motion.div className="absolute inset-0" style={{ opacity: step2Opacity }}>
                                <div className="absolute inset-0 z-0 bg-[#0a0a0a] flex items-center justify-center">
                                    <div className="flex items-center gap-12">
                                        <div className="text-center">
                                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-xl shadow-orange-500/30 mb-3">
                                                <span className="text-white font-bold text-2xl">L</span>
                                            </div>
                                            <p className="text-white font-semibold text-sm">LinkAI</p>
                                            <p className="text-white/40 text-xs">Source</p>
                                        </div>
                                        
                                        <div className="relative w-32">
                                            <div className="h-0.5 bg-gradient-to-r from-orange-500 via-violet-500 to-blue-500 rounded-full" />
                                            {[0, 1, 2].map((i) => (
                                                <motion.div
                                                    key={i}
                                                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-violet-500 rounded-full shadow-lg shadow-violet-500/50"
                                                    animate={{ x: [0, 120, 0], opacity: [0, 1, 0] }}
                                                    transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
                                                />
                                            ))}
                                        </div>
                                        
                                        <div className="text-center">
                                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-xl shadow-blue-500/30 mb-3">
                                                <span className="text-white font-bold text-2xl">F</span>
                                            </div>
                                            <p className="text-white font-semibold text-sm">Figure</p>
                                            <p className="text-white/40 text-xs">Destination</p>
                                        </div>
                                    </div>
                                    
                                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                                        <div className="flex items-center gap-2 bg-white/[0.03] rounded-lg px-4 py-2 border border-white/[0.05]">
                                            <div className="w-4 h-4 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
                                            <span className="text-white/60 text-sm">Syncing 42 fields...</span>
                                        </div>
                                    </div>
                                </div>
                                {imagesLoaded.step2 && (
                                    <Image src="/features/figure/step-2.png" alt="Syncing" fill className="object-cover object-top z-10" />
                                )}
                                <Image 
                                    src="/features/figure/step-2.png" alt="" fill 
                                    className="object-cover object-top z-10 opacity-0"
                                    onLoad={() => setImagesLoaded(prev => ({ ...prev, step2: true }))}
                                    onError={() => {}}
                                />
                            </motion.div>

                            {/* STEP 3: Complete */}
                            <motion.div className="absolute inset-0" style={{ opacity: step3Opacity }}>
                                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#fefefe] to-[#f8fafc] p-4">
                                    <div className="grid grid-cols-12 gap-3 h-full">
                                        <div className="col-span-5 space-y-3">
                                            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 text-white shadow-xl shadow-green-500/30">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-bold">Sync Complete</h3>
                                                        <p className="text-green-100 text-xs">All data transferred</p>
                                                    </div>
                                                </div>
                                                
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="bg-white/20 rounded-lg p-2 text-center">
                                                        <p className="text-2xl font-bold">42</p>
                                                        <p className="text-green-100 text-[10px]">Fields Synced</p>
                                                    </div>
                                                    <div className="bg-white/20 rounded-lg p-2 text-center">
                                                        <p className="text-2xl font-bold">0</p>
                                                        <p className="text-green-100 text-[10px]">Errors</p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="bg-white rounded-lg p-3 border border-gray-200 shadow">
                                                <p className="text-gray-500 text-[10px] font-semibold uppercase mb-2">Timeline</p>
                                                <div className="space-y-2">
                                                    {[
                                                        { time: "10:42:01", event: "Sync initiated" },
                                                        { time: "10:42:02", event: "Auth verified" },
                                                        { time: "10:42:04", event: "Complete" },
                                                    ].map((item, i) => (
                                                        <div key={i} className="flex items-center gap-2">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                            <span className="text-gray-400 text-[10px] font-mono">{item.time}</span>
                                                            <span className="text-gray-700 text-xs">{item.event}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="col-span-7 bg-white rounded-xl p-3 border border-gray-200 shadow">
                                            <div className="flex items-center justify-between mb-3">
                                                <p className="text-gray-500 text-[10px] font-semibold uppercase">Synced Fields</p>
                                                <span className="px-2 py-0.5 bg-green-100 text-green-600 text-[10px] font-medium rounded-full">Verified</span>
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-2">
                                                {[
                                                    { cat: "Personal", fields: ["Name", "SSN", "DOB", "Phone"] },
                                                    { cat: "Property", fields: ["Address", "APN", "Value"] },
                                                    { cat: "Financial", fields: ["Income", "Assets", "Debts"] },
                                                    { cat: "Loan", fields: ["Amount", "Rate", "Term"] },
                                                ].map((item, i) => (
                                                    <div key={i} className="bg-gray-50 rounded-lg p-2 border border-gray-100">
                                                        <p className="font-semibold text-gray-900 text-[10px] mb-1">{item.cat}</p>
                                                        <div className="flex flex-wrap gap-1">
                                                            {item.fields.map((f, j) => (
                                                                <span key={j} className="px-1.5 py-0.5 bg-white text-gray-600 text-[9px] rounded border border-gray-200 flex items-center gap-0.5">
                                                                    <svg className="w-2 h-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                    </svg>
                                                                    {f}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            <div className="mt-3 pt-2 border-t border-gray-100 flex justify-end">
                                                <button className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-xs font-semibold shadow shadow-blue-500/30">
                                                    Open in Figure →
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {imagesLoaded.step3 && (
                                    <Image src="/features/figure/step-3.png" alt="Complete" fill className="object-cover object-top z-10" />
                                )}
                                <Image 
                                    src="/features/figure/step-3.png" alt="" fill 
                                    className="object-cover object-top z-10 opacity-0"
                                    onLoad={() => setImagesLoaded(prev => ({ ...prev, step3: true }))}
                                    onError={() => {}}
                                />
                            </motion.div>
                        </div>
                    </div>
                    <div className="absolute -inset-8 bg-gradient-radial from-violet-500/20 via-transparent to-transparent blur-2xl -z-10" />
                </div>

                <div className="h-12 flex items-center justify-center mt-4">
                    <motion.p className="text-white/50 text-xs md:text-sm font-medium absolute" style={{ opacity: caption1Opacity }}>
                        Step 1: Connect to Figure
                    </motion.p>
                    <motion.p className="text-white/50 text-xs md:text-sm font-medium absolute" style={{ opacity: caption2Opacity }}>
                        Step 2: Data syncs automatically
                    </motion.p>
                    <motion.p className="text-white/50 text-xs md:text-sm font-medium absolute" style={{ opacity: caption3Opacity }}>
                        Step 3: Ready for submission
                    </motion.p>
                </div>
            </motion.div>

            {/* PHASE 4: RESULT */}
            <motion.div 
                className="absolute inset-0 flex flex-col items-center justify-center px-8 z-30"
                style={{ opacity: resultOpacity, y: resultY }}
            >
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center tracking-tight">
                    <span className="text-white">One entry,</span>
                    <br />
                    <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-violet-500 bg-clip-text text-transparent">
                        everywhere instantly.
                    </span>
                </h1>
                <div className="flex gap-6 mt-8">
                    {[
                        { value: "42", label: "fields synced" },
                        { value: "0", label: "manual entry" },
                        { value: "100%", label: "accuracy" },
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
