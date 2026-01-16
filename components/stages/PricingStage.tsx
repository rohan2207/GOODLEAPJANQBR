"use client";

import { motion } from "framer-motion";

export default function PricingStage() {
    return (
        <div className="relative w-full h-full flex items-center justify-center p-8">
            {/* Coming soon overlay */}
            <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                {/* Lock icon */}
                <motion.div
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border border-yellow-500/30 flex items-center justify-center mb-6"
                    animate={{ 
                        scale: [1, 1.05, 1],
                        boxShadow: [
                            "0 0 30px rgba(251,191,36,0.2)",
                            "0 0 60px rgba(251,191,36,0.4)",
                            "0 0 30px rgba(251,191,36,0.2)"
                        ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    <span className="text-4xl">🔒</span>
                </motion.div>

                <motion.h3
                    className="text-2xl font-bold text-white mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    Pricing Engine
                </motion.h3>
                <motion.p
                    className="text-yellow-400 text-lg mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                >
                    Coming Q2 2026
                </motion.p>
                <motion.p
                    className="text-white/50 text-center max-w-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                >
                    Real-time rate optimization with instant investor matching and margin intelligence.
                </motion.p>
            </motion.div>

            {/* Background preview (blurred) */}
            <div className="absolute inset-0 opacity-20 blur-sm">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-4 p-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div 
                                key={i} 
                                className="w-32 h-20 rounded-lg bg-white/5 border border-white/10"
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Teaser stats */}
            <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
            >
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                    <span className="text-yellow-400 font-bold">50+</span>
                    <span className="text-white/40 text-sm">Investors</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                    <span className="text-yellow-400 font-bold">&lt;2s</span>
                    <span className="text-white/40 text-sm">Price Lock</span>
                </div>
            </motion.div>
        </div>
    );
}
