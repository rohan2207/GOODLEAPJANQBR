"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

// Data sources floating in from around the profile
const INCOMING_DATA = [
    { label: "Credit Bureau", icon: "📊", x: -140, y: -80 },
    { label: "Property Records", icon: "🏠", x: 140, y: -60 },
    { label: "Bank Statements", icon: "🏦", x: -150, y: 20 },
    { label: "Employment", icon: "💼", x: 130, y: 50 },
    { label: "Loan History", icon: "📋", x: -120, y: 100 },
];

// Stats that appear on the profile
const PROFILE_DATA = [
    { label: "Credit", value: "742", color: "#f97316" },
    { label: "Equity", value: "$127K", color: "#3b82f6" },
    { label: "DTI", value: "38%", color: "#22c55e" },
    { label: "Tenure", value: "3yr", color: "#a855f7" },
];

export default function Agent1Stage() {
    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            
            {/* FLOATING DATA TOKENS - being absorbed by AI */}
            {INCOMING_DATA.map((data, i) => (
                <motion.div
                    key={data.label}
                    className="absolute flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm"
                    initial={{ x: data.x * 1.5, y: data.y * 1.5, opacity: 0, scale: 0.8 }}
                    animate={{ 
                        x: [data.x * 1.5, data.x * 0.3, 0],
                        y: [data.y * 1.5, data.y * 0.3, 0],
                        opacity: [0, 1, 0],
                        scale: [0.8, 1, 0.3]
                    }}
                    transition={{
                        duration: 3,
                        delay: i * 0.6,
                        repeat: Infinity,
                        repeatDelay: 0.5,
                        ease: "easeInOut"
                    }}
                >
                    <span className="text-lg">{data.icon}</span>
                    <span className="text-white/60 text-xs whitespace-nowrap">{data.label}</span>
                </motion.div>
            ))}

            {/* AI PROCESSING INDICATOR - at top */}
            <motion.div
                className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-purple-500/30 backdrop-blur-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ 
                    opacity: 1, 
                    y: 0,
                    boxShadow: [
                        "0 0 15px rgba(147,51,234,0.2)",
                        "0 0 30px rgba(147,51,234,0.4)",
                        "0 0 15px rgba(147,51,234,0.2)"
                    ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <motion.div 
                    className="w-5 h-5 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <Sparkles className="w-3 h-3 text-white" />
                </motion.div>
                <span className="text-purple-300 text-xs font-medium">Analyzing data...</span>
            </motion.div>

            {/* CENTRAL PROFILE CARD - AI output */}
            <motion.div
                className="relative z-10 w-72 rounded-xl overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{
                    background: "linear-gradient(135deg, rgba(249,115,22,0.12), rgba(249,115,22,0.03))",
                    border: "1px solid rgba(249,115,22,0.35)",
                    boxShadow: "0 0 50px rgba(249,115,22,0.2)"
                }}
            >
                {/* Profile Header */}
                <div className="p-4 flex items-center gap-4 border-b border-orange-500/20">
                    <motion.div
                        className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xl font-bold shadow-lg"
                        animate={{ 
                            boxShadow: [
                                "0 0 20px rgba(249,115,22,0.3)",
                                "0 0 35px rgba(249,115,22,0.5)",
                                "0 0 20px rgba(249,115,22,0.3)"
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        JD
                    </motion.div>
                    <div>
                        <h3 className="text-white font-semibold text-lg">John Doe</h3>
                        <p className="text-white/40 text-xs">Borrower Profile</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-2 p-3">
                    {PROFILE_DATA.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            className="p-2.5 rounded-lg"
                            style={{ 
                                backgroundColor: `${stat.color}10`,
                                border: `1px solid ${stat.color}30`
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + i * 0.15 }}
                        >
                            <p className="text-white/40 text-[10px] mb-0.5">{stat.label}</p>
                            <p className="font-bold text-lg" style={{ color: stat.color }}>
                                {stat.value}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* AI Summary */}
                <div className="px-3 pb-3">
                    <motion.div 
                        className="p-2.5 rounded-lg bg-orange-500/10 border border-orange-500/20"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 }}
                    >
                        <div className="flex items-start gap-2">
                            <span className="text-orange-500 text-sm">✨</span>
                            <p className="text-white/60 text-xs leading-relaxed">
                                Strong equity position. Good refi candidate. Last contacted 6mo ago about HELOC.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Subtle background glow */}
            <motion.div
                className="absolute w-72 h-72 rounded-full bg-orange-500/10 blur-3xl -z-10"
                animate={{ 
                    scale: [1, 1.15, 1],
                    opacity: [0.15, 0.3, 0.15]
                }}
                transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Timer at bottom */}
            <motion.div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/40 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
            >
                <span>Assembled in</span>
                <span className="text-orange-400 font-semibold">4.2s</span>
            </motion.div>
        </div>
    );
}
