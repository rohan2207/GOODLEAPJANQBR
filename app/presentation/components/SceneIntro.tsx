"use client";

import { motion } from "framer-motion";

export default function SceneIntro({ isActive }: { isActive: boolean }) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center relative z-10 w-full max-w-4xl mx-auto">
             <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isActive ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1 }}
                className="mb-12"
            >
                <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tighter mb-4">
                    LinkAI
                </h1>
                <div className="h-1 w-32 bg-purple-500 mx-auto rounded-full" />
            </motion.div>

            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={isActive ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-3xl md:text-4xl text-white/50 font-light mb-20"
            >
                3 Month Progress Report
            </motion.p>
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isActive ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 2, duration: 0.8 }}
                className="flex items-center gap-6 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm"
            >
                 <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-purple-500/20">
                    SH
                </div>
                <div className="text-left">
                    <p className="text-white font-bold text-2xl">Steve Hulme</p>
                    <p className="text-purple-300 font-medium text-lg">Operations Executive</p>
                    <p className="text-white/40 text-sm uppercase tracking-wider mt-1">Mortgage Tech Org</p>
                </div>
            </motion.div>

            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px] -z-10" />
        </div>
    );
}
