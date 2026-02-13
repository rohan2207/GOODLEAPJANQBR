"use client";

import { motion } from "framer-motion";
import { Phone, User, MapPin, DollarSign, FileText } from "lucide-react";

export function CallSimulation({ isActive }: { isActive: boolean }) {
    return (
        <div className="relative w-full max-w-lg mx-auto aspect-[9/16] md:aspect-auto md:h-[600px] bg-black rounded-[40px] border-[8px] border-zinc-800 shadow-2xl overflow-hidden">
            {/* Dynamic Island / Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-50"></div>

            {/* Background Blurs */}
            <div className="absolute inset-0 bg-zinc-900">
                <motion.div
                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ rotate: -360, scale: [1, 1.3, 1] }}
                    transition={{ duration: 12, repeat: Infinity }}
                    className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
                />
            </div>

            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10">

                {/* Caller Info */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col items-center mb-12"
                >
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center mb-4 shadow-lg border-4 border-zinc-800">
                        <User className="w-10 h-10 text-zinc-600" />
                    </div>
                    <h3 className="text-3xl font-semibold text-white mb-2">Alex Chen</h3>
                    <p className="text-white/50 text-lg">Incoming Call...</p>
                </motion.div>

                {/* Context Cards (The "Spice") */}
                <div className="w-full space-y-3 mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isActive ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 1.5 }}
                        className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/5"
                    >
                        <div className="p-2 rounded-full bg-blue-500/20 text-blue-400">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-white/40 uppercase tracking-wider">Property</p>
                            <p className="text-sm text-white font-medium">1234 Oak St, Seattle WA</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isActive ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 2.0 }}
                        className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/5"
                    >
                        <div className="p-2 rounded-full bg-green-500/20 text-green-400">
                            <DollarSign className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-white/40 uppercase tracking-wider">Intent</p>
                            <p className="text-sm text-white font-medium">Refinance + Cash Out</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isActive ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 2.5 }}
                        className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/5"
                    >
                        <div className="p-2 rounded-full bg-purple-500/20 text-purple-400">
                            <FileText className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-white/40 uppercase tracking-wider">History</p>
                            <p className="text-sm text-white font-medium">Existing Customer (3 yrs)</p>
                        </div>
                    </motion.div>
                </div>

                {/* Accept Button */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, type: "spring" }}
                    className="mt-auto flex justify-center w-full"
                >
                    <div className="relative group cursor-pointer">
                        <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity animate-pulse" />
                        <div className="relative w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-xl">
                            <Phone className="w-8 h-8 text-white fill-white" />
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
