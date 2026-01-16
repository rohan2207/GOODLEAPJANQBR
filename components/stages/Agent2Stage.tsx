"use client";

import { motion } from "framer-motion";

const OBJECTIONS = [
    { text: "Your rates are too high", delay: 0.2, x: -60, y: -40 },
    { text: "Closing costs seem expensive", delay: 0.5, x: 80, y: 20 },
    { text: "I want to wait for better rates", delay: 0.8, x: -40, y: 60 },
    { text: "Why should I refinance now?", delay: 1.1, x: 60, y: -60 },
];

const BENEFITS = [
    { text: "Calculate blended rate", delay: 0.3, x: 100, y: -20 },
    { text: "Monthly cash flow", delay: 0.6, x: -80, y: 40 },
    { text: "Interest savings", delay: 0.9, x: 40, y: 80 },
];

export default function Agent2Stage() {
    return (
        <div className="relative w-full h-full flex items-center justify-center p-8">
            {/* AI analyzing indicator */}
            <motion.div
                className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <motion.div
                    className="w-2 h-2 rounded-full bg-orange-500"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-orange-400 text-sm font-medium">Processing common objections...</span>
            </motion.div>

            {/* Floating Objection Bubbles */}
            <div className="relative w-[400px] h-[300px]">
                {OBJECTIONS.map((objection, i) => (
                    <motion.div
                        key={objection.text}
                        className="absolute left-1/2 top-1/2 px-4 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.5, x: "-50%", y: "-50%" }}
                        animate={{ 
                            opacity: 1, 
                            scale: 1, 
                            x: `calc(-50% + ${objection.x}px)`, 
                            y: `calc(-50% + ${objection.y}px)` 
                        }}
                        transition={{ 
                            delay: objection.delay, 
                            duration: 0.5,
                            type: "spring",
                            stiffness: 100
                        }}
                        style={{
                            boxShadow: '0 0 20px rgba(244,63,94,0.15)'
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-rose-400 text-lg">&ldquo;</span>
                            <p className="text-white/80 text-sm font-medium whitespace-nowrap">{objection.text}</p>
                            <span className="text-rose-400 text-lg">&rdquo;</span>
                        </div>
                    </motion.div>
                ))}

                {/* Benefit bubbles - teal colored */}
                {BENEFITS.map((benefit, i) => (
                    <motion.div
                        key={benefit.text}
                        className="absolute left-1/2 top-1/2 px-4 py-2.5 rounded-xl bg-teal-500/10 border border-teal-500/30 backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.5, x: "-50%", y: "-50%" }}
                        animate={{ 
                            opacity: 1, 
                            scale: 1, 
                            x: `calc(-50% + ${benefit.x}px)`, 
                            y: `calc(-50% + ${benefit.y}px)` 
                        }}
                        transition={{ 
                            delay: benefit.delay + 0.5, 
                            duration: 0.5,
                            type: "spring",
                            stiffness: 100
                        }}
                        style={{
                            boxShadow: '0 0 20px rgba(20,184,166,0.15)'
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <rect width="16" height="20" x="4" y="2" rx="2" />
                                <line x1="8" x2="16" y1="6" y2="6" />
                            </svg>
                            <p className="text-white/80 text-sm font-medium whitespace-nowrap">{benefit.text}</p>
                        </div>
                    </motion.div>
                ))}

                {/* Center icon */}
                <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring" }}
                >
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </motion.div>
            </div>

            {/* Bottom hint */}
            <motion.div
                className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-orange-500/5 border border-orange-500/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
            >
                <div className="flex items-start gap-3">
                    <span className="text-xl">💡</span>
                    <div>
                        <p className="text-white/60 text-sm">
                            <span className="text-orange-400 font-medium">AI Sales Coach:</span> Turn these objections into opportunities with data-backed responses.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
