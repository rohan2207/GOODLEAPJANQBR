"use client";

import { motion } from "framer-motion";

const efficiencyData = {
    title: "LO Efficiency → Capacity",
    rows: [
        { label: "Calls/Day", current: "7.7", low: "8.085", high: "8.86" },
        { label: "Units/Month", current: "", low: "+50", high: "+125" },
        { label: "AEBITDA", sublabel: "(per month)", current: "", low: "$125K", high: "$312.5K" },
    ],
};

const conversionData = {
    title: "AI Assistance → Conversion",
    rows: [
        { label: "Lock %", current: "7.81%", low: "8.20%", high: "8.98%" },
        { label: "Units/Month", current: "", low: "+48", high: "+144" },
        { label: "AEBITDA", sublabel: "(per month)", current: "", low: "$120K", high: "$360K" },
    ],
};

export default function BusinessImpact() {
    return (
        <section className="relative w-full min-h-screen py-24 overflow-hidden bg-black">
            {/* Background glow effects */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-full blur-3xl animate-pulse" />
                <div 
                    className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse" 
                    style={{ animationDelay: "1s" }}
                />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="text-green-500 text-sm font-bold tracking-[0.2em] uppercase mb-4">
                        Business Impact
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold leading-[1.1] text-white mb-4">
                        The Big Picture
                    </h2>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        High-level impact of our two key metrics
                    </p>
                </motion.div>

                {/* Strategy Boxes */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 font-bold">
                            1
                        </div>
                        <p className="text-white font-medium">
                            Increase LO Efficiency to increase capacity
                        </p>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 font-bold">
                            2
                        </div>
                        <p className="text-white font-medium">
                            Improve Conversion with native AI assisted Sales Tools
                        </p>
                    </div>
                </motion.div>

                {/* Data Tables */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {/* Efficiency Table */}
                    <div className="rounded-xl overflow-hidden border border-zinc-800">
                        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3">
                            <h3 className="text-white font-semibold">{efficiencyData.title}</h3>
                        </div>
                        <div className="bg-zinc-900/80">
                            {/* Header Row */}
                            <div className="grid grid-cols-4 gap-4 px-6 py-3 border-b border-zinc-800 text-sm">
                                <div className="text-zinc-500"></div>
                                <div className="text-zinc-400 text-center">Current</div>
                                <div className="text-zinc-400 text-center">Low (5%)</div>
                                <div className="text-zinc-400 text-center">High (15%)</div>
                            </div>
                            {/* Data Rows */}
                            {efficiencyData.rows.map((row, idx) => (
                                <div key={idx} className="grid grid-cols-4 gap-4 px-6 py-3 border-b border-zinc-800/50 last:border-0">
                                    <div className="text-zinc-300 text-sm">
                                        {row.label}
                                        {row.sublabel && <span className="block text-zinc-500 text-xs">{row.sublabel}</span>}
                                    </div>
                                    <div className="text-white text-center font-medium">{row.current}</div>
                                    <div className="text-green-400 text-center font-medium">{row.low}</div>
                                    <div className="text-green-400 text-center font-medium">{row.high}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Conversion Table */}
                    <div className="rounded-xl overflow-hidden border border-zinc-800">
                        <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3">
                            <h3 className="text-white font-semibold">{conversionData.title}</h3>
                        </div>
                        <div className="bg-zinc-900/80">
                            {/* Header Row */}
                            <div className="grid grid-cols-4 gap-4 px-6 py-3 border-b border-zinc-800 text-sm">
                                <div className="text-zinc-500"></div>
                                <div className="text-zinc-400 text-center">Current</div>
                                <div className="text-zinc-400 text-center">Low (5%)</div>
                                <div className="text-zinc-400 text-center">High (15%)</div>
                            </div>
                            {/* Data Rows */}
                            {conversionData.rows.map((row, idx) => (
                                <div key={idx} className="grid grid-cols-4 gap-4 px-6 py-3 border-b border-zinc-800/50 last:border-0">
                                    <div className="text-zinc-300 text-sm">
                                        {row.label}
                                        {row.sublabel && <span className="block text-zinc-500 text-xs">{row.sublabel}</span>}
                                    </div>
                                    <div className="text-white text-center font-medium">{row.current}</div>
                                    <div className="text-cyan-400 text-center font-medium">{row.low}</div>
                                    <div className="text-cyan-400 text-center font-medium">{row.high}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Summary Cards */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    {/* AEBITDA Card */}
                    <div className="rounded-2xl p-8 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 border border-green-500/20 text-center">
                        <div className="text-green-400 text-sm font-bold tracking-[0.2em] uppercase mb-2">
                            Estimated Annual AEBITDA
                        </div>
                        <div className="text-4xl md:text-5xl font-bold">
                            <span className="text-green-400">$2.9M</span>
                            <span className="text-zinc-500 mx-2">-</span>
                            <span className="text-emerald-400">$8.1M</span>
                        </div>
                        <div className="text-zinc-500 text-sm mt-2">Total Annual Impact</div>
                    </div>

                    {/* Priceless Card */}
                    <div className="rounded-2xl p-8 bg-gradient-to-br from-zinc-900 via-purple-900/20 to-pink-900/20 border border-purple-500/20 text-center">
                        <div className="text-purple-400 text-sm font-bold tracking-[0.2em] uppercase mb-2">
                            The Real Impact
                        </div>
                        <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                            Priceless
                        </div>
                        <div className="text-zinc-500 text-sm mt-2">Making every LO perform like our top producers.</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
