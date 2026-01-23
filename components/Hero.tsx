"use client";

import { motion } from "framer-motion";
import { MOTION_EASE, fadeInUp } from '@/lib/motion';
import { LinkAILogo } from './Preloader';

export default function Hero() {
    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#08080b]">
            {/* Aurora Background Effects - Orange/Blue Theme */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#f97316]/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#3b82f6]/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />

            {/* Grid overlay for texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 mix-blend-overlay" />

            <div className="z-10 text-center px-4 relative w-full">
                {/* Logo */}
                <motion.div
                    className="flex justify-center mb-8"
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, ease: MOTION_EASE }}
                >
                    <LinkAILogo className="w-[180px] md:w-[240px] h-auto" />
                </motion.div>

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.2, duration: 0.6, ease: MOTION_EASE }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm mx-auto"
                >
                    <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                    <span className="text-xs font-body font-light text-orange-200 tracking-[0.15em] uppercase">Link AI Platform</span>
                </motion.div>

                {/* Headline */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium tracking-[0.1em] uppercase text-white mb-6">
                    <div className="overflow-hidden pb-4">
                        <motion.span
                            initial={{ y: "100%", filter: "blur(6px)" }}
                            animate={{ y: 0, filter: "blur(0px)" }}
                            transition={{ delay: 0.3, duration: 0.8, ease: MOTION_EASE }}
                            className="block"
                        >
                            The Platform
                        </motion.span>
                    </div>
                    <div className="overflow-hidden pb-4">
                        <motion.span
                            initial={{ y: "100%", filter: "blur(6px)" }}
                            animate={{ y: 0, filter: "blur(0px)" }}
                            transition={{ delay: 0.4, duration: 0.8, ease: MOTION_EASE }}
                            className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-blue-500"
                        >
                            That Thinks Ahead.
                        </motion.span>
                    </div>
                </h1>

            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6, ease: MOTION_EASE }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-[0.2em] font-body font-light text-white/30">Scroll to Explore</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-orange-500/0 via-orange-500 to-orange-500/0" />
            </motion.div>
        </section>
    );
}
