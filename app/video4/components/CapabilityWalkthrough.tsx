"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, BarChart, Zap, Sliders, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const CAPABILITIES = [
    {
        id: "analysis",
        icon: MessageSquare,
        color: "bg-purple-500",
        title: "Real-time Analysis",
        subtitle: "Conversational Intelligence",
        visual: (
            <div className="space-y-4 w-full px-8">
                <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0" />
                    <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-sm text-slate-600 text-sm w-3/4">
                        "I'm worried about the monthly payments if we do the cash out."
                    </div>
                </div>
                <div className="flex gap-4 flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex-shrink-0 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-purple-50 p-4 rounded-2xl rounded-tr-sm text-purple-800 text-sm border border-purple-100 w-3/4 shadow-sm">
                        <strong>Objection Detected:</strong> Monthly Payment Sensitivity. <br />
                        Suggest "Interest-Only" option to lower initial payments.
                    </div>
                </div>
            </div>
        )
    },
    {
        id: "comparison",
        icon: BarChart,
        color: "bg-blue-500",
        title: "Instant Comparisons",
        subtitle: "Side-by-Side Scenarios",
        visual: (
            <div className="grid grid-cols-2 gap-4 w-full px-8">
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                    <div className="text-xs text-slate-400 uppercase font-bold mb-2">Current</div>
                    <div className="text-2xl font-bold text-slate-800">$2,450</div>
                    <div className="h-1 bg-slate-200 mt-2 rounded-full w-full" />
                </div>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] px-2 py-1 rounded-bl-lg font-bold">SAVINGS</div>
                    <div className="text-xs text-blue-400 uppercase font-bold mb-2">Use Proceeds</div>
                    <div className="text-2xl font-bold text-blue-600">$1,850</div>
                    <div className="h-1 bg-blue-200 mt-2 rounded-full w-3/4" />
                </div>
                <div className="col-span-2 bg-green-50 border border-green-200 p-3 rounded-lg text-green-700 text-center text-sm font-semibold">
                    Total Monthly Savings: $600/mo
                </div>
            </div>
        )
    },
    {
        id: "guidance",
        icon: Zap,
        color: "bg-orange-500",
        title: "Contextual Guidance",
        subtitle: "Next Best Actions",
        visual: (
            <div className="w-full px-8 space-y-4">
                <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                            <Zap className="w-3 h-3 text-orange-500" />
                        </div>
                        <span className="text-orange-800 font-semibold text-sm">Suggested Action</span>
                    </div>
                    <p className="text-sm text-orange-900/70">
                        Borrower mentioned "retirement planning". <br />
                        <strong>Ask:</strong> "Have you considered a reverse mortgage for long-term cash flow?"
                    </p>
                </div>
                <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 text-xs font-medium hover:bg-slate-50">Dismiss</button>
                    <button className="flex-1 py-2 bg-orange-500 rounded-lg text-white text-xs font-medium shadow-md shadow-orange-500/20 hover:bg-orange-600">Add to Plan</button>
                </div>
            </div>
        )
    },
    {
        id: "custom",
        icon: Sliders,
        color: "bg-emerald-500",
        title: "Custom Scenarios",
        subtitle: "Tailored on the Fly",
        visual: (
            <div className="w-full px-8 space-y-6">
                <div>
                    <div className="flex justify-between text-sm font-medium text-slate-600 mb-2">
                        <span>Cash Out Amount</span>
                        <span>$45,000</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-2/3" />
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-sm font-medium text-slate-600 mb-2">
                        <span>Rate Buy Down</span>
                        <span>0.5 Points</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-400 w-1/4" />
                    </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button className="px-4 py-2 bg-slate-100 rounded-lg text-slate-500 text-xs font-bold">Reset</button>
                    <button className="px-4 py-2 bg-emerald-500 rounded-lg text-white text-xs font-bold shadow-lg shadow-emerald-500/30">Apply Changes</button>
                </div>
            </div>
        )
    }
];

export function CapabilityWalkthrough({ progress }: { progress: number }) {
    // Progress is 0 to 1 over the 30s duration (1:25 - 1:55)
    // We have 4 items, so split into 4 segments

    // Determine active index
    const activeIndex = Math.min(Math.floor(progress * 4), 3);

    return (
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Left: Capability Tiles */}
            <div className="space-y-6">
                {CAPABILITIES.map((cap, index) => {
                    const isCurrent = index === activeIndex;
                    return (
                        <motion.div
                            key={cap.id}
                            animate={{
                                opacity: isCurrent ? 1 : 0.4,
                                scale: isCurrent ? 1.05 : 1,
                                x: isCurrent ? 20 : 0
                            }}
                            className={`p-5 rounded-2xl border transition-all duration-500 ${isCurrent ? 'bg-white/10 border-white/20' : 'bg-transparent border-transparent'}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl ${cap.color} flex items-center justify-center text-white shadow-lg`}>
                                    <cap.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className={`text-lg font-bold ${isCurrent ? 'text-white' : 'text-white/60'}`}>{cap.title}</h3>
                                    <p className="text-sm text-white/40">{cap.subtitle}</p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Right: Dynamic Visual Display */}
            <div className="h-[400px] bg-white rounded-3xl overflow-hidden relative shadow-2xl border-4 border-white/10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.1, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 flex items-center justify-center bg-white"
                    >
                        {/* Header for visual */}
                        <div className="absolute top-0 left-0 right-0 h-16 bg-slate-50 border-b border-slate-100 flex items-center px-6 justify-between">
                            <span className="font-bold text-slate-700">{CAPABILITIES[activeIndex].title}</span>
                            <div className={`w-2 h-2 rounded-full ${CAPABILITIES[activeIndex].color.replace('bg-', 'bg-')} animate-pulse`} />
                        </div>

                        {/* Content */}
                        <div className="w-full pt-16">
                            {CAPABILITIES[activeIndex].visual}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

        </div>
    );
}
