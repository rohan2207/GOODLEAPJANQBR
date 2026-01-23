"use client";

import { motion } from "framer-motion";

const MOTION_EASE = [0.16, 1, 0.3, 1];

export default function LaunchAnnouncement() {
    return (
        <section className="relative w-full py-32 md:py-40 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a10] to-black" />

            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-orange-500/10 via-amber-500/8 to-blue-500/10 blur-[120px] rounded-full" />

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '60px 60px'
            }} />

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

                {/* Main Headline */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.7, ease: MOTION_EASE }}
                >
                    <p className="text-lg md:text-xl text-white/50 font-body font-light tracking-wide mb-4">
                        Launching <span className="text-orange-400 font-semibold">Link 2.0</span> to Loan Officers
                    </p>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">
                            February 10
                        </span>
                    </h2>
                </motion.div>

                {/* Animated Divider */}
                <motion.div
                    className="flex justify-center my-10"
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8, ease: MOTION_EASE }}
                >
                    <div className="relative w-64 h-[1px]">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
                        {/* Glowing dot in center */}
                        <motion.div
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-orange-400"
                            animate={{
                                boxShadow: [
                                    '0 0 10px 2px rgba(251, 146, 60, 0.4)',
                                    '0 0 20px 4px rgba(251, 146, 60, 0.6)',
                                    '0 0 10px 2px rgba(251, 146, 60, 0.4)',
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                </motion.div>


            </div>
        </section>
    );
}
