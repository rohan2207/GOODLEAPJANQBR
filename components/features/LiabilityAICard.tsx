"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface LiabilityAICardProps {
    progress?: MotionValue<number>;
}

export default function LiabilityAICard({ progress }: LiabilityAICardProps) {
    const p = progress!;
    const [imagesLoaded, setImagesLoaded] = useState({ step1: false, step2: false, step3: false });

    // COMPRESSED PHASES (faster pacing for 250vh)
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

    const debts = [
        { name: "Chase Auto Loan", type: "Auto", balance: 18450, rate: 6.9, payment: 425, status: "current" },
        { name: "Amex Platinum", type: "Credit Card", balance: 12800, rate: 24.9, payment: 380, status: "high-interest" },
        { name: "Capital One Venture", type: "Credit Card", balance: 8200, rate: 22.4, payment: 245, status: "high-interest" },
        { name: "SoFi Personal", type: "Personal", balance: 8500, rate: 12.0, payment: 225, status: "medium" },
    ];

    return (
        <motion.div 
            className="absolute inset-0 w-full h-full bg-black flex items-center justify-center overflow-hidden"
            style={{ opacity: sectionOpacity }}
        >
            <div className="absolute inset-0 bg-gradient-radial from-blue-950/30 via-transparent to-transparent opacity-60" />

            {/* PHASE 1: PROBLEM */}
            <motion.div 
                className="absolute inset-0 flex items-center justify-center px-8 z-20"
                style={{ opacity: problemOpacity, y: problemY }}
            >
                <div className="text-center max-w-4xl">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                        Debt analysis takes
                        <br />
                        <span className="relative inline-block mt-2">
                            <span className="text-white/20">hours of manual work.</span>
                            <motion.span 
                                className="absolute inset-0 text-white overflow-hidden whitespace-nowrap"
                                style={{ width: highlightWidth }}
                            >
                                hours of manual work.
                            </motion.span>
                        </span>
                    </h1>
                    <p className="text-white/40 text-base md:text-lg mt-6 max-w-xl mx-auto">
                        Spreadsheets. Calculators. Guesswork.
                    </p>
                </div>
            </motion.div>

            {/* PHASE 2: AGENT */}
            <motion.div 
                className="absolute inset-0 flex flex-col items-center justify-center px-8 z-20"
                style={{ opacity: agentOpacity, y: agentY }}
            >
                <p className="text-blue-400 text-xs md:text-sm font-medium tracking-[0.3em] uppercase mb-4">
                    Introducing
                </p>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                    <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Liability AI
                    </span>
                </h1>
                <motion.p 
                    className="text-white/50 text-base md:text-xl mt-4 text-center max-w-md"
                    style={{ opacity: taglineOpacity }}
                >
                    Instant payoff strategy that optimizes DTI
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
                                    linkai.goodleap.com/liabilities
                                </div>
                            </div>
                        </div>
                        
                        <div className="relative aspect-[16/10] bg-[#111]">
                            
                            {/* STEP 1: Debt Table */}
                            <motion.div className="absolute inset-0" style={{ opacity: step1Opacity }}>
                                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#fefefe] to-[#f8fafc] p-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <div>
                                            <h2 className="text-base font-semibold text-gray-900">Liability Analysis</h2>
                                            <p className="text-gray-500 text-xs">James Rodriguez • 4 accounts</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="text-right">
                                                <p className="text-gray-500 text-[10px]">Total Debt</p>
                                                <p className="text-gray-900 font-bold text-sm">$47,950</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                        <table className="w-full">
                                            <thead className="bg-gray-50">
                                                <tr className="text-left text-[10px] text-gray-500 uppercase">
                                                    <th className="px-3 py-2">Account</th>
                                                    <th className="px-3 py-2 text-right">Balance</th>
                                                    <th className="px-3 py-2 text-right">APR</th>
                                                    <th className="px-3 py-2 text-center">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {debts.map((debt, i) => (
                                                    <tr key={i}>
                                                        <td className="px-3 py-2 font-medium text-gray-900 text-xs">{debt.name}</td>
                                                        <td className="px-3 py-2 text-right font-semibold text-gray-900 text-xs">${debt.balance.toLocaleString()}</td>
                                                        <td className="px-3 py-2 text-right text-xs">
                                                            <span className={debt.rate > 20 ? 'text-red-600 font-semibold' : 'text-gray-600'}>
                                                                {debt.rate}%
                                                            </span>
                                                        </td>
                                                        <td className="px-3 py-2 text-center">
                                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                                                                debt.status === 'high-interest' ? 'bg-red-100 text-red-600' :
                                                                debt.status === 'medium' ? 'bg-orange-100 text-orange-600' :
                                                                'bg-green-100 text-green-600'
                                                            }`}>
                                                                {debt.status === 'high-interest' ? '⚠️ High' : '✓'}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    
                                    <div className="mt-3 flex justify-end">
                                        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-xs font-semibold shadow-lg shadow-blue-500/30">
                                            ✨ Analyze Payoff Strategy
                                        </button>
                                    </div>
                                </div>
                                {imagesLoaded.step1 && (
                                    <Image src="/features/liability-ai/step-1.svg" alt="Debt List" fill className="object-cover object-top z-10" />
                                )}
                                <Image 
                                    src="/features/liability-ai/step-1.svg" alt="" fill 
                                    className="object-cover object-top z-10 opacity-0"
                                    onLoad={() => setImagesLoaded(prev => ({ ...prev, step1: true }))}
                                    onError={() => {}}
                                />
                            </motion.div>

                            {/* STEP 2: AI Calculating */}
                            <motion.div className="absolute inset-0" style={{ opacity: step2Opacity }}>
                                <div className="absolute inset-0 z-0 bg-[#0a0a0a] flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="relative w-20 h-20 mx-auto mb-4">
                                            <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-pulse" />
                                            <div className="absolute inset-3 rounded-full bg-[#0a0a0a] flex items-center justify-center">
                                                <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-semibold text-white mb-2">Calculating Strategy</h3>
                                        <p className="text-white/40 text-sm mb-4">Running payoff simulations</p>
                                        <div className="space-y-2 max-w-xs mx-auto">
                                            {[
                                                { label: "Avalanche Method", done: true },
                                                { label: "DTI Optimization", active: true },
                                            ].map((step, i) => (
                                                <div key={i} className="flex items-center gap-2 text-left">
                                                    {step.done ? (
                                                        <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
                                                            <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </div>
                                                    ) : (
                                                        <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
                                                    )}
                                                    <span className={step.done ? 'text-white/50 text-sm' : 'text-blue-400 text-sm'}>{step.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {imagesLoaded.step2 && (
                                    <Image src="/features/liability-ai/step-2.svg" alt="Processing" fill className="object-cover object-top z-10" />
                                )}
                                <Image 
                                    src="/features/liability-ai/step-2.svg" alt="" fill 
                                    className="object-cover object-top z-10 opacity-0"
                                    onLoad={() => setImagesLoaded(prev => ({ ...prev, step2: true }))}
                                    onError={() => {}}
                                />
                            </motion.div>

                            {/* STEP 3: Recommendation */}
                            <motion.div className="absolute inset-0" style={{ opacity: step3Opacity }}>
                                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#fefefe] to-[#f8fafc] p-4">
                                    <div className="grid grid-cols-12 gap-3 h-full">
                                        <div className="col-span-7 space-y-3">
                                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-xl shadow-blue-500/30">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-lg">✨</span>
                                                    <span className="text-blue-100 text-xs font-medium uppercase">AI Recommendation</span>
                                                </div>
                                                <h3 className="text-lg font-bold mb-2">Modified Avalanche</h3>
                                                <div className="grid grid-cols-3 gap-2">
                                                    <div className="bg-white/20 rounded-lg p-2 text-center">
                                                        <p className="text-xl font-bold">$4,280</p>
                                                        <p className="text-blue-100 text-[10px]">Interest Saved</p>
                                                    </div>
                                                    <div className="bg-white/20 rounded-lg p-2 text-center">
                                                        <p className="text-xl font-bold">-8.2%</p>
                                                        <p className="text-blue-100 text-[10px]">DTI Reduction</p>
                                                    </div>
                                                    <div className="bg-white/20 rounded-lg p-2 text-center">
                                                        <p className="text-xl font-bold">18mo</p>
                                                        <p className="text-blue-100 text-[10px]">Payoff Time</p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="bg-white rounded-lg p-3 border border-gray-200">
                                                    <p className="text-gray-400 text-[10px] font-semibold uppercase mb-2">Before</p>
                                                    <div className="space-y-1 text-xs">
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-500">Monthly</span>
                                                            <span className="text-gray-900 font-semibold">$1,275</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-500">DTI</span>
                                                            <span className="text-red-600 font-semibold">42.3%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                                    <p className="text-green-600 text-[10px] font-semibold uppercase mb-2">After</p>
                                                    <div className="space-y-1 text-xs">
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-500">Monthly</span>
                                                            <span className="text-gray-900 font-semibold">$940</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-500">DTI</span>
                                                            <span className="text-green-600 font-semibold">34.1%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="col-span-5 bg-white rounded-xl p-3 border border-gray-200 shadow">
                                            <p className="text-gray-500 text-[10px] font-semibold uppercase mb-3">Payoff Order</p>
                                            <div className="space-y-2">
                                                {[
                                                    { order: 1, name: "Amex Platinum", apr: "24.9%", color: "red" },
                                                    { order: 2, name: "Capital One", apr: "22.4%", color: "red" },
                                                    { order: 3, name: "SoFi Personal", apr: "12.0%", color: "orange" },
                                                    { order: 4, name: "Chase Auto", apr: "6.9%", color: "gray" },
                                                ].map((item) => (
                                                    <div key={item.order} className="flex items-center gap-2 p-1.5 rounded hover:bg-gray-50">
                                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs ${
                                                            item.color === 'red' ? 'bg-red-500' :
                                                            item.color === 'orange' ? 'bg-orange-500' :
                                                            'bg-gray-400'
                                                        }`}>
                                                            {item.order}
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-gray-900 font-medium text-xs">{item.name}</p>
                                                        </div>
                                                        <span className={`text-xs ${item.color === 'red' ? 'text-red-500' : 'text-gray-400'}`}>{item.apr}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {imagesLoaded.step3 && (
                                    <Image src="/features/liability-ai/step-3.svg" alt="Strategy" fill className="object-cover object-top z-10" />
                                )}
                                <Image 
                                    src="/features/liability-ai/step-3.svg" alt="" fill 
                                    className="object-cover object-top z-10 opacity-0"
                                    onLoad={() => setImagesLoaded(prev => ({ ...prev, step3: true }))}
                                    onError={() => {}}
                                />
                            </motion.div>
                        </div>
                    </div>
                    <div className="absolute -inset-8 bg-gradient-radial from-blue-500/20 via-transparent to-transparent blur-2xl -z-10" />
                </div>

                <div className="h-12 flex items-center justify-center mt-4">
                    <motion.p className="text-white/50 text-xs md:text-sm font-medium absolute" style={{ opacity: caption1Opacity }}>
                        Step 1: Review liabilities
                    </motion.p>
                    <motion.p className="text-white/50 text-xs md:text-sm font-medium absolute" style={{ opacity: caption2Opacity }}>
                        Step 2: AI calculates optimal strategy
                    </motion.p>
                    <motion.p className="text-white/50 text-xs md:text-sm font-medium absolute" style={{ opacity: caption3Opacity }}>
                        Step 3: Actionable recommendation
                    </motion.p>
                </div>
            </motion.div>

            {/* PHASE 4: RESULT */}
            <motion.div 
                className="absolute inset-0 flex flex-col items-center justify-center px-8 z-30"
                style={{ opacity: resultOpacity, y: resultY }}
            >
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center tracking-tight">
                    <span className="text-white">Optimal DTI,</span>
                    <br />
                    <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        in seconds.
                    </span>
                </h1>
                <div className="flex gap-6 mt-8">
                    {[
                        { value: "$4,280", label: "saved" },
                        { value: "-8.2%", label: "DTI" },
                        { value: "1 click", label: "to calculate" },
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
