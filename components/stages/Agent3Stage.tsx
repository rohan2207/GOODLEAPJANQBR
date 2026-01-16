"use client";

import { motion } from "framer-motion";

const COMPARABLES = [
    { address: "123 Oak St", price: "$485,000", sqft: "1,850", distance: "0.3 mi" },
    { address: "456 Maple Ave", price: "$512,000", sqft: "1,920", distance: "0.5 mi" },
    { address: "789 Pine Dr", price: "$498,000", sqft: "1,880", distance: "0.4 mi" },
];

export default function Agent3Stage() {
    return (
        <div className="relative w-full h-full flex items-center justify-center p-8">
            {/* Main valuation card */}
            <div className="flex gap-6 items-start">
                {/* Property value panel */}
                <motion.div
                    className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/30"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ boxShadow: '0 0 60px rgba(245,158,11,0.15)' }}
                >
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl">🏠</span>
                        <span className="text-white/40 text-sm">Subject Property</span>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <p className="text-white/50 text-sm mb-1">Estimated Value</p>
                        <motion.p 
                            className="text-4xl font-bold text-amber-400"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            $502,000
                        </motion.p>
                    </motion.div>

                    <motion.div
                        className="mt-4 pt-4 border-t border-white/10 flex items-center gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-white/50 text-sm">High Confidence</span>
                        </div>
                        <span className="text-green-400 text-sm font-medium">94%</span>
                    </motion.div>
                </motion.div>

                {/* Comparables list */}
                <motion.div
                    className="flex flex-col gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Comparables</p>
                    {COMPARABLES.map((comp, i) => (
                        <motion.div
                            key={comp.address}
                            className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-4"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.2 + i * 0.15 }}
                        >
                            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-sm font-bold">
                                {i + 1}
                            </div>
                            <div className="flex-1">
                                <p className="text-white text-sm">{comp.address}</p>
                                <p className="text-white/40 text-xs">{comp.sqft} sqft • {comp.distance}</p>
                            </div>
                            <p className="text-amber-400 font-semibold">{comp.price}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Map indicator */}
            <motion.div
                className="absolute bottom-6 right-6 flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
            >
                <span className="text-lg">📍</span>
                <span className="text-white/50 text-sm">3 comps within 0.5 mi</span>
            </motion.div>
        </div>
    );
}
