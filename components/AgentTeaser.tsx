"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const MOTION_EASE = [0.16, 1, 0.3, 1];

export default function AgentTeaser() {
    return (
        <section className="relative w-full py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#08080b] via-[#0a0a10] to-black" />
            
            {/* Subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-orange-500/5 via-purple-500/5 to-blue-500/5 blur-[100px] rounded-full" />

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                
                {/* Badge */}
                <motion.div 
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] mb-10"
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.6, ease: MOTION_EASE }}
                >
                    <Sparkles className="w-4 h-4 text-orange-400" />
                    <span className="text-xs text-white/60 font-body font-medium uppercase tracking-[0.15em]">Introducing AI-Powered Assistants</span>
                </motion.div>

                {/* Headline */}
                <motion.h2 
                    className="text-2xl md:text-3xl lg:text-4xl font-display font-medium tracking-[0.08em] text-white/90 mb-6"
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6, ease: MOTION_EASE }}
                >
                    AI that helps loan officers{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-400">
                        move faster
                    </span>{" "}
                    and close better
                </motion.h2>

                {/* Subheading */}
                <motion.p 
                    className="text-lg text-white/50 max-w-2xl mx-auto mb-4 font-body font-light tracking-wide"
                    initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6, ease: MOTION_EASE }}
                >
                    Automates the busywork behind the scenes so your team stays focused on customers
                </motion.p>

                {/* Supporting line */}
                <motion.p 
                    className="text-sm text-white/30 max-w-xl mx-auto mb-12 font-body font-light tracking-wide"
                    initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6, ease: MOTION_EASE }}
                >
                    Task-focused AI agents that support loan officers across the deal lifecycle
                </motion.p>

                {/* Scroll hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-body">See it in action</span>
                    <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
                </motion.div>

            </div>
        </section>
    );
}
