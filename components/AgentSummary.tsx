"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BrainCircuit, Scale, Home, Sparkles, Plus } from "lucide-react";

const MOTION_EASE = [0.16, 1, 0.3, 1];

const AGENTS = [
    {
        name: "Brief AI",
        role: "Call Preparation",
        description: "Context ready before the conversation starts",
        icon: BrainCircuit,
        gradient: "from-orange-500 to-amber-500",
        shadowColor: "shadow-orange-500/20",
    },
    {
        name: "Liability AI",
        role: "Debt Strategy",
        description: "Optimal payoff strategy, instantly calculated",
        icon: Scale,
        gradient: "from-blue-500 to-cyan-500",
        shadowColor: "shadow-blue-500/20",
    },
    {
        name: "Property AI",
        role: "Valuation Confidence",
        description: "Real-time AVM and market data",
        icon: Home,
        gradient: "from-purple-500 to-pink-500",
        shadowColor: "shadow-purple-500/20",
    },
];

export default function AgentSummary() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const gridOpacity = useTransform(scrollYProgress, [0, 0.2, 0.6, 0.8], [0, 1, 1, 0.5]);
    const gridScale = useTransform(scrollYProgress, [0, 0.25], [0.95, 1]);

    return (
        <section 
            ref={containerRef}
            className="relative w-full py-32 overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[#080810] to-black" />
            
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-orange-500/8 via-purple-500/8 to-blue-500/8 blur-[120px] rounded-full" />

            <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
                
                {/* Header */}
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: MOTION_EASE }}
                >
                    {/* Label */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] mb-8">
                        <Sparkles className="w-4 h-4 text-orange-400" />
                        <span className="text-xs text-white/60 font-body font-medium uppercase tracking-[0.15em]">The AI Agents</span>
                    </div>

                    {/* Summary headline - matching logo style */}
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-medium tracking-[0.1em] text-white mb-4 uppercase">
                        That's what you just saw
                    </h2>

                    <p className="text-base md:text-lg text-white/40 max-w-lg mx-auto font-body font-light tracking-wide">
                        AI agents working alongside the loan officer at every step.
                    </p>
                </motion.div>

                {/* Agent Grid */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                    style={{ opacity: gridOpacity, scale: gridScale }}
                >
                    {AGENTS.map((agent, idx) => (
                        <motion.div
                            key={agent.name}
                            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ delay: 0.1 + idx * 0.08, duration: 0.5, ease: MOTION_EASE }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 h-full transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.1]">
                                {/* Hover glow */}
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${agent.gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300`} />
                                
                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center mb-3 shadow-lg ${agent.shadowColor}`}>
                                        <agent.icon className="w-5 h-5 text-white" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-sm font-display font-medium text-white mb-1 uppercase tracking-[0.1em]">{agent.name}</h3>
                                    <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-2 font-body">{agent.role}</p>
                                    <p className="text-sm text-white/50 leading-relaxed font-body font-light">
                                        {agent.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* "More coming" card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ delay: 0.35, duration: 0.5, ease: MOTION_EASE }}
                        viewport={{ once: true }}
                    >
                        <div className="relative rounded-2xl border border-dashed border-white/[0.08] bg-transparent p-5 h-full flex flex-col items-center justify-center text-center">
                            <div className="w-10 h-10 rounded-xl border border-white/[0.08] flex items-center justify-center mb-3">
                                <Plus className="w-5 h-5 text-white/20" />
                            </div>
                            <h3 className="text-sm font-display font-medium text-white/30 uppercase tracking-[0.1em]">More Coming</h3>
                            <p className="text-[10px] text-white/20 mt-1 font-body uppercase tracking-wider">This is just the start</p>
                        </div>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}
