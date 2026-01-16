"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Scattered data points for the inner overlay
const SCATTERED_DATA = [
    { icon: "💳", label: "Credit", x: 12, y: 15 },
    { icon: "🏠", label: "Property", x: 75, y: 10 },
    { icon: "💰", label: "Assets", x: 82, y: 55 },
    { icon: "📊", label: "Liabilities", x: 10, y: 60 },
    { icon: "🏦", label: "CF Loans", x: 70, y: 80 },
    { icon: "📍", label: "Local", x: 15, y: 38 },
    { icon: "👤", label: "Borrower", x: 78, y: 32 },
    { icon: "📋", label: "Income", x: 45, y: 12 },
];

export default function BeforeStage() {
    return (
        <div className="relative w-full h-full overflow-hidden">
            {/* LAYER 1: LARGE SCREENSHOT BACKGROUND - visible and prominent */}
            <div className="absolute inset-0">
                <Image
                    src="/assets/before-state.png"
                    alt="Complex data interface showing overwhelming borrower data"
                    fill
                    className="object-cover object-top opacity-60"
                />
                {/* Light vignette */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50" />
            </div>

            {/* LAYER 2: INNER OVERLAY CONTAINER with floating icons */}
            <div className="absolute inset-0 flex items-center justify-center p-6">
                <motion.div 
                    className="relative w-[70%] h-[75%] rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 shadow-2xl overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    {/* Scattered data point icons INSIDE the overlay */}
                    {SCATTERED_DATA.map((data, i) => (
                        <motion.div
                            key={data.label}
                            className="absolute z-10"
                            style={{ left: `${data.x}%`, top: `${data.y}%` }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + i * 0.08, duration: 0.4, type: "spring" }}
                        >
                            <motion.div
                                className="flex flex-col items-center gap-1.5 p-2.5 rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm"
                                animate={{ 
                                    y: [0, -5, 0],
                                }}
                                transition={{ 
                                    duration: 3 + i * 0.2, 
                                    repeat: Infinity,
                                    delay: i * 0.1 
                                }}
                            >
                                <span className="text-xl">{data.icon}</span>
                                <span className="text-white/70 text-[10px] font-medium whitespace-nowrap">{data.label}</span>
                            </motion.div>
                        </motion.div>
                    ))}

                    {/* Central question mark */}
                    <motion.div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, duration: 0.5, type: "spring" }}
                    >
                        <motion.div
                            className="w-20 h-20 rounded-full bg-purple-500/20 border-2 border-purple-500/50 flex items-center justify-center backdrop-blur-sm"
                            animate={{ 
                                boxShadow: [
                                    "0 0 30px rgba(139,92,246,0.3)",
                                    "0 0 50px rgba(139,92,246,0.5)",
                                    "0 0 30px rgba(139,92,246,0.3)"
                                ]
                            }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                        >
                            <span className="text-3xl text-purple-400">?</span>
                        </motion.div>
                    </motion.div>

                    {/* Inner overlay label */}
                    <motion.div
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/30"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.3 }}
                    >
                        <span className="text-red-400 text-sm font-medium">Where do I start?</span>
                    </motion.div>
                </motion.div>
            </div>

            {/* Top-right badge showing the problem */}
            <motion.div
                className="absolute top-4 right-4 z-30 px-4 py-2 rounded-full bg-black/70 border border-white/20 backdrop-blur-sm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
            >
                <span className="text-white/80 text-sm">29+ accounts • 5 data sources</span>
            </motion.div>
        </div>
    );
}
