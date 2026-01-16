"use client";

import { motion } from "framer-motion";

const VALUATION_SOURCES = [
    { name: "Internal AVM", color: "purple", icon: "🏛️" },
    { name: "Zillow", color: "blue", icon: "🔵" },
    { name: "Redfin", color: "red", icon: "🔴" },
    { name: "Realtor", color: "slate", icon: "⚪" },
];

export default function Agent3Stage() {
    return (
        <div className="relative w-full h-full flex items-center justify-center p-8">
            {/* Center property indicator */}
            <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Glowing center */}
                <div className="relative">
                    <motion.div
                        className="absolute inset-0 rounded-2xl bg-amber-500/30 blur-2xl"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="relative p-8 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30">
                        <div className="flex flex-col items-center">
                            <motion.div
                                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-4 shadow-lg"
                                animate={{ rotateY: [0, 360] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            >
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </motion.div>
                            <p className="text-amber-400 font-bold text-lg mb-1">2116 Shrewsbury Dr</p>
                            <p className="text-white/50 text-sm">McKinney, TX</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Orbiting source indicators */}
            {VALUATION_SOURCES.map((source, i) => {
                const angle = (i / VALUATION_SOURCES.length) * 360;
                const radius = 180;
                return (
                    <motion.div
                        key={source.name}
                        className="absolute"
                        style={{
                            left: '50%',
                            top: '50%',
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                            opacity: 1, 
                            scale: 1,
                            x: Math.cos((angle + 45) * Math.PI / 180) * radius - 40,
                            y: Math.sin((angle + 45) * Math.PI / 180) * radius - 20,
                        }}
                        transition={{ delay: 0.5 + i * 0.2, duration: 0.5 }}
                    >
                        <motion.div
                            className={`px-4 py-2 rounded-xl bg-${source.color}-500/20 border border-${source.color}-500/40 backdrop-blur-sm`}
                            animate={{ 
                                y: [0, -8, 0],
                            }}
                            transition={{ 
                                duration: 2 + i * 0.3, 
                                repeat: Infinity,
                                delay: i * 0.2 
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-lg">{source.icon}</span>
                                <span className="text-white/70 text-sm font-medium">{source.name}</span>
                            </div>
                        </motion.div>

                        {/* Connecting line to center */}
                        <motion.div
                            className="absolute top-1/2 left-1/2 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"
                            style={{
                                width: radius - 60,
                                transform: `rotate(${angle + 225}deg)`,
                                transformOrigin: '0 0',
                            }}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.8 + i * 0.2, duration: 0.5 }}
                        />
                    </motion.div>
                );
            })}

            {/* Analyzing text */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <div className="flex items-center gap-2 mb-2">
                    <motion.div
                        className="w-2 h-2 rounded-full bg-amber-500"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                    <span className="text-amber-400 text-sm font-medium">Gathering valuations...</span>
                </div>
                <p className="text-white/40 text-xs">Comparing 4 sources for confidence</p>
            </motion.div>
        </div>
    );
}
