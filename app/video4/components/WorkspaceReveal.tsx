"use client";

import { motion } from "framer-motion";
import { Sparkles, BarChart, Users, MessageSquare } from "lucide-react";

export function WorkspaceReveal({ isActive }: { isActive: boolean }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.5
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <div className="w-full max-w-5xl aspect-video bg-[#0f0f12] rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col relative">

            {/* Browser Chrome */}
            <div className="h-10 bg-[#1a1a1f] border-b border-white/5 flex items-center px-4 gap-3 z-20">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
            </div>

            <div className="flex-1 flex relative">
                {/* Sidebar - Slides in */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={isActive ? { x: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    className="w-20 bg-[#13131a] border-r border-white/5 flex flex-col items-center py-6 gap-6 z-10"
                >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 mb-4" />
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-md bg-white/5" />
                    ))}
                </motion.div>

                {/* Main Content Area */}
                <div className="flex-1 p-8 grid grid-cols-3 gap-6 relative">
                    {/* Background Grid - fades in */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isActive ? { opacity: 1 } : {}}
                        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"
                    />

                    {/* Widgets assembling */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isActive ? "visible" : "hidden"}
                        className="col-span-2 space-y-6 z-10"
                    >
                        {/* Header Widget */}
                        <motion.div variants={itemVariants} className="h-32 rounded-2xl bg-[#1a1a1f] border border-white/5 p-6 flex gap-6 items-center">
                            <div className="w-20 h-20 rounded-full bg-white/5" />
                            <div className="space-y-3 flex-1">
                                <div className="h-4 bg-white/10 rounded w-1/3" />
                                <div className="h-3 bg-white/5 rounded w-1/4" />
                            </div>
                        </motion.div>

                        {/* Chart Widget */}
                        <motion.div variants={itemVariants} className="h-64 rounded-2xl bg-[#1a1a1f] border border-white/5 p-6 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex items-end justify-between h-full gap-4 pb-4">
                                {[40, 70, 50, 90, 60, 80].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={isActive ? { height: `${h}%` } : {}}
                                        transition={{ delay: 1 + (i * 0.1), duration: 0.8, type: "spring" }}
                                        className="w-full bg-blue-500/20 rounded-t-sm relative"
                                    >
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-blue-400 group-hover:bg-blue-300 transition-colors" />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* AI Sidebar - The Hero */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={isActive ? { x: 0, opacity: 1 } : {}}
                        transition={{ delay: 1.2, duration: 0.8, type: "spring", stiffness: 90 }}
                        className="col-span-1 h-full rounded-2xl bg-white border border-white/10 overflow-hidden relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white" />

                        {/* AI Header */}
                        <div className="relative p-6 border-b border-indigo-100 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800">LinkAI</h4>
                                <span className="text-xs text-indigo-500 font-medium">Assistant Active</span>
                            </div>
                        </div>

                        {/* Chat / Content */}
                        <div className="p-4 space-y-4">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={isActive ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 2.0 }}
                                className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm border border-slate-100 text-sm text-slate-600"
                            >
                                Analyzing borrower profile... high equity detected.
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={isActive ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 2.5 }}
                                className="bg-indigo-600 p-3 rounded-2xl rounded-tr-sm shadow-sm text-sm text-white"
                            >
                                Recommend Cash-Out Refi option.
                            </motion.div>
                        </div>

                        {/* Glowing "Brain" at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
