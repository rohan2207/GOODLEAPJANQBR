"use client";

import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

const quarters = [
    { id: "pre", label: "Pre", current: false },
    { id: "q3-25", label: "Q3'25", current: false },
    { id: "q4-25", label: "Q4'25", current: true },
    { id: "q1-26", label: "Q1'26", current: false },
    { id: "q2-26", label: "Q2'26", current: false },
];

const features = [
    // Pre
    { quarter: "pre", name: "Foundation", checked: true },
    { quarter: "pre", name: "Core Platform", checked: true },
    // Q3'25
    { quarter: "q3-25", name: "Pre-Credit", checked: true },
    { quarter: "q3-25", name: "Property Data", checked: true },
    { quarter: "q3-25", name: "AI Insights", checked: true, hasLaunchBadge: true },
    // Q4'25
    { quarter: "q4-25", name: "Quick App", checked: true },
    { quarter: "q4-25", name: "Customer Context", checked: true },
    // Q1'26
    { quarter: "q1-26", name: "Pricing Engine", checked: true },
    { quarter: "q1-26", name: "AI LO Coach", checked: true },
    { quarter: "q1-26", name: "Deal Structuring", checked: true },
    // Q2'26
    { quarter: "q2-26", name: "AI Scenarios", checked: true },
    { quarter: "q2-26", name: "Full Pricing Suite", checked: true },
];

export default function ProductRoadmap() {
    return (
        <section className="relative w-full min-h-screen py-24 overflow-hidden bg-black">
            {/* Background glow effects */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-orange-500/30 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="text-orange-500 text-sm font-bold tracking-[0.2em] uppercase mb-4">
                        Product Roadmap
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold leading-[1.1] text-white mb-4">
                        Complete Deal Structuring
                        <br />
                        <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                            & Pricing
                        </span>
                    </h2>
                    <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
                        We have a full roadmap to empower loan officers to complete the entire deal structuring
                        and pricing process in LinkAI—with a clear path forward.
                    </p>
                </motion.div>

                {/* Timeline Header */}
                <motion.div
                    className="flex justify-center mb-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="flex items-end gap-0 w-full max-w-4xl">
                        {quarters.map((q, idx) => (
                            <div key={q.id} className="flex-1 text-center relative">
                                {q.current && (
                                    <Star className="w-4 h-4 text-orange-500 fill-orange-500 absolute -top-6 left-1/2 -translate-x-1/2" />
                                )}
                                <div className={`text-lg font-semibold mb-2 ${q.current ? "text-white" : "text-zinc-500"}`}>
                                    {q.label}
                                </div>
                                <div className={`h-1 ${q.current ? "bg-gradient-to-r from-orange-500 to-amber-500" : "bg-zinc-800"}`} />
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Feature Cards Grid */}
                <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div className="grid grid-cols-5 gap-4 w-full max-w-4xl">
                        {quarters.map((q) => {
                            const quarterFeatures = features.filter(f => f.quarter === q.id);
                            return (
                                <div key={q.id} className="flex flex-col gap-2">
                                    {quarterFeatures.map((feature, idx) => (
                                        <div
                                            key={feature.name}
                                            className="relative"
                                        >
                                            <div className={`
                                                flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium
                                                ${feature.checked 
                                                    ? "bg-zinc-800/80 border border-zinc-700 text-white" 
                                                    : "bg-zinc-900/50 border border-zinc-800 text-zinc-500"
                                                }
                                            `}>
                                                {feature.checked && (
                                                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                )}
                                                <span className="truncate">{feature.name}</span>
                                            </div>
                                            {feature.hasLaunchBadge && (
                                                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 translate-y-full z-10">
                                                    <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg transform rotate-[-3deg]">
                                                        General<br />Launch
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Footer note */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <div className="flex items-center justify-center gap-2 text-zinc-500 text-sm">
                        <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                        <span>Indicates current quarter</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
