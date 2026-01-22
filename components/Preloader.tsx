"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

// Shared motion curve
export const MOTION_EASE = [0.16, 1, 0.3, 1] as const;

// ============================================
// HURRICANE PARTICLE
// ============================================
function HurricaneParticle({ index, total, active }: { index: number; total: number; active: boolean }) {
    const angle = (index / total) * 360 + Math.random() * 30;
    const delay = Math.random() * 0.2;
    const distance = 200 + Math.random() * 150;
    const size = 3 + Math.random() * 6;
    const duration = 0.6 + Math.random() * 0.3;

    const radians = (angle * Math.PI) / 180;
    const spiralRotation = 180 + Math.random() * 360;

    const finalX = Math.cos(radians) * distance;
    const finalY = Math.sin(radians) * distance;

    const midAngle = radians + (Math.PI / 4);
    const midDistance = distance * 0.5;
    const midX = Math.cos(midAngle) * midDistance;
    const midY = Math.sin(midAngle) * midDistance;

    const colors = ["#f97316", "#3b82f6", "#f59e0b", "#60a5fa", "#ffffff"];
    const color = colors[index % colors.length];

    return (
        <motion.div
            className="absolute rounded-full"
            style={{ width: size, height: size, backgroundColor: color, boxShadow: `0 0 ${size * 2}px ${color}` }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0, rotate: 0 }}
            animate={active ? {
                x: [0, midX, finalX],
                y: [0, midY, finalY],
                opacity: [0, 1, 1, 0],
                scale: [0, 1.5, 1, 0],
                rotate: [0, spiralRotation / 2, spiralRotation],
            } : {}}
            transition={{ duration, delay, ease: "easeOut", times: [0, 0.3, 0.7, 1] }}
        />
    );
}

// ============================================
// SPARKLE
// ============================================
function Sparkle({ index, active }: { index: number; active: boolean }) {
    const x = (Math.random() - 0.5) * 500;
    const y = (Math.random() - 0.5) * 300;
    const delay = 0.5 + Math.random() * 2;
    const size = 2 + Math.random() * 4;

    return (
        <motion.div
            className="absolute"
            style={{ width: size, height: size, left: "50%", top: "50%", x, y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={active ? { opacity: [0, 1, 0], scale: [0, 1.5, 0] } : {}}
            transition={{ duration: 0.6, delay, repeat: 2, repeatDelay: 0.3 }}
        >
            <svg width={size * 3} height={size * 3} viewBox="0 0 24 24" fill="white">
                <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
            </svg>
        </motion.div>
    );
}

// ============================================
// OLD LINKAI LOGO - White text version (for start screen)
// ============================================
function OldLinkAILogo({ className }: { className?: string }) {
    return (
        <div className={`text-6xl md:text-8xl font-display font-medium tracking-[0.15em] uppercase text-white/40 ${className}`}>
            LinkAI
        </div>
    );
}

// ============================================
// NEW LINKAI LOGO - Colorful version (revealed after animation)
// ============================================
import Image from "next/image";

export function LinkAILogo({ className }: { className?: string }) {
    return (
        <Image
            src="https://cdn.bfldr.com/Q445447Z/at/mm8twcwjs4fj6ctvgnz7tbb/Logo_LinkAI.png?auto=webp&format=png"
            alt="LinkAI"
            width={400}
            height={100}
            className={className}
            style={{ objectFit: "contain" }}
            priority
        />
    );
}

// ============================================
// START BUTTON COMPONENT - Uses OLD logo
// ============================================
function StartButton({ onClick }: { onClick: () => void }) {
    return (
        <motion.div
            className="flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: MOTION_EASE }}
        >
            {/* OLD white logo - keeps the new colorful one as a surprise */}
            <OldLinkAILogo className="opacity-50" />

            <motion.button
                onClick={onClick}
                className="group relative px-12 py-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-display font-semibold text-lg tracking-wide overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: MOTION_EASE }}
            >
                {/* Shimmer effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear", repeatDelay: 1 }}
                />

                <span className="relative z-10 flex items-center gap-3">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                    Start Experience
                </span>
            </motion.button>

            <motion.p
                className="text-white/30 text-sm font-body tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
            >
                Click to begin the LinkAI journey
            </motion.p>
        </motion.div>
    );
}

// ============================================
// HERO SECTION (Final state after preloader)
// ============================================
export function HeroSection() {
    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#08080b]">
            {/* Grain overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Aurora backgrounds */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#f97316]/15 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#3b82f6]/15 rounded-full blur-[120px]" />

            {/* Logo + GoodLeap at top - matches preloader final state */}
            <div className="absolute top-[6%] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                <LinkAILogo className="w-[154px] md:w-[209px]" />

                {/* Version 2.0 - matches preloader */}
                <div className="relative mt-2">
                    <div 
                        className="absolute inset-0 -inset-x-2 rounded-full blur-lg opacity-50"
                        style={{ background: "linear-gradient(90deg, rgba(249,115,22,0.4), rgba(59,130,246,0.4))" }}
                    />
                    <span className="relative text-lg md:text-xl font-display font-light tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-blue-400">
                        2.0
                    </span>
                </div>

                {/* GoodLeap branding - Updated to match Preloader's "Prominent" look (approx 200px * 0.55 scale = 110px) */}
                <div className="mt-3 flex flex-col items-center gap-[7px]">
                    <span className="text-[6.5px] uppercase tracking-[0.4em] text-white/50 font-display font-medium">
                        by
                    </span>
                    <Image
                        src="https://cdn.bfldr.com/Q445447Z/at/r8mz3sj9btg5khst4twv5q8/goodleap-gradient-cR.svg?auto=webp&format=png"
                        alt="GoodLeap"
                        width={110}
                        height={28}
                        className="opacity-100"
                        style={{ objectFit: "contain" }}
                    />
                    <span className="text-[9px] text-white/50 font-body font-light tracking-wide mt-0.5">
                        One Platform. One Experience.
                    </span>
                </div>
            </div>

            {/* Headlines - static, no animations since preloader handled entrance */}
            <div className="z-10 text-center px-4 w-full">
                <h1 className="mb-8">
                    <div className="pb-3">
                        <span className="block text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-[0.15em] text-white uppercase">
                            The Platform
                        </span>
                    </div>
                    <div className="pb-2">
                        <span className="block text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-blue-500 uppercase">
                            That Thinks Ahead
                        </span>
                    </div>
                </h1>

                <p className="max-w-lg mx-auto text-white/40 text-base md:text-lg font-body font-light tracking-wide leading-relaxed">
                    Experience the future of mortgage. Where AI agents anticipate needs before you even ask.
                </p>

                {/* Scroll Indicator */}
                <div className="mt-16 flex flex-col items-center gap-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-body font-light text-white/30">Scroll to Explore</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-orange-500/0 via-orange-500 to-orange-500/0" />
                </div>
            </div>
        </section>
    );
}

// ============================================
// MAIN PRELOADER COMPONENT
// ============================================
interface PreloaderProps {
    onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
    const [started, setStarted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState<"idle" | "loading" | "hurricane" | "bridge" | "celebration" | "moveUp" | "showHeadline" | "complete">("idle");

    const hurricaneParticles = useMemo(() => Array.from({ length: 40 }, (_, i) => i), []);
    const sparkles = useMemo(() => Array.from({ length: 15 }, (_, i) => i), []);

    // Start the experience
    const handleStart = () => {
        setStarted(true);
        setPhase("loading");
    };

    // Loading progress - 1.8s
    useEffect(() => {
        if (phase !== "loading") return;

        const duration = 1800;
        const interval = 20;
        const steps = duration / interval;
        const increment = 100 / steps;

        const timer = setInterval(() => {
            setProgress((prev) => {
                const next = prev + increment;
                if (next >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return next;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [phase]);

    // Phase transitions
    useEffect(() => {
        if (progress >= 100 && phase === "loading") {
            const t = setTimeout(() => setPhase("hurricane"), 200);
            return () => clearTimeout(t);
        }
    }, [progress, phase]);

    useEffect(() => {
        if (phase === "hurricane") {
            const t = setTimeout(() => setPhase("bridge"), 800);
            return () => clearTimeout(t);
        }
    }, [phase]);

    useEffect(() => {
        if (phase === "bridge") {
            const t = setTimeout(() => setPhase("celebration"), 300);
            return () => clearTimeout(t);
        }
    }, [phase]);

    useEffect(() => {
        if (phase === "celebration") {
            const t = setTimeout(() => setPhase("moveUp"), 1500);
            return () => clearTimeout(t);
        }
    }, [phase]);

    useEffect(() => {
        if (phase === "moveUp") {
            const t = setTimeout(() => setPhase("showHeadline"), 800);
            return () => clearTimeout(t);
        }
    }, [phase]);

    useEffect(() => {
        if (phase === "showHeadline") {
            const t = setTimeout(() => setPhase("complete"), 3500); // Extended by 2 seconds
            return () => clearTimeout(t);
        }
    }, [phase]);

    useEffect(() => {
        if (phase === "complete") {
            onComplete();
        }
    }, [phase, onComplete]);

    const isHurricaneActive = phase === "hurricane";
    const isCelebrationActive = phase === "celebration";
    const isLogoMovedUp = phase === "moveUp" || phase === "showHeadline" || phase === "complete";
    const showHeadline = phase === "showHeadline" || phase === "complete";
    const isComplete = phase === "complete";

    // When complete, fade out the preloader overlay
    if (isComplete) {
        return null;
    }

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#08080b]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: MOTION_EASE }}
        >
            {/* Grain overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Aurora backgrounds */}
            <motion.div
                className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#f97316]/15 rounded-full blur-[120px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: isLogoMovedUp ? 1 : 0 }}
                transition={{ duration: 1 }}
            />
            <motion.div
                className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#3b82f6]/15 rounded-full blur-[120px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: isLogoMovedUp ? 1 : 0 }}
                transition={{ duration: 1, delay: 0.2 }}
            />

            {/* Celebration background glow */}
            <motion.div
                className="absolute w-[800px] h-[800px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(59,130,246,0.1) 40%, transparent 70%)",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: isCelebrationActive ? 2 : phase === "bridge" ? 0.5 : 0,
                    opacity: isCelebrationActive ? 1 : phase === "bridge" ? 0.5 : 0,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            />

            {/* START BUTTON */}
            <AnimatePresence>
                {phase === "idle" && (
                    <motion.div
                        key="start-screen"
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.4 } }}
                    >
                        <StartButton onClick={handleStart} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* HURRICANE PARTICLES */}
            {(phase === "hurricane" || phase === "bridge") && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {hurricaneParticles.map((i) => (
                        <HurricaneParticle key={i} index={i} total={hurricaneParticles.length} active={isHurricaneActive} />
                    ))}
                </div>
            )}

            {/* SPARKLES */}
            {isCelebrationActive && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {sparkles.map((i) => (
                        <Sparkle key={i} index={i} active={isCelebrationActive} />
                    ))}
                </div>
            )}

            {/* OLD LOGO - HURRICANE EXIT */}
            <AnimatePresence mode="wait">
                {(phase === "loading" || phase === "hurricane") && (
                    <motion.div
                        key="old-logo"
                        className="relative z-10"
                        initial={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
                        animate={phase === "hurricane" ? {
                            opacity: [1, 1, 0],
                            scale: [1, 1.1, 1.3],
                            rotate: [0, -3, 8],
                            filter: ["blur(0px)", "blur(2px)", "blur(20px)"],
                        } : {}}
                        transition={{ duration: 0.8, ease: "easeIn", times: [0, 0.4, 1] }}
                    >
                        {/* Reduced tracking to make the "bar" shorter */}
                        <div className="relative text-6xl md:text-8xl font-display font-medium tracking-tight uppercase">
                            <span className="text-white/10">LinkAI</span>
                            <motion.div
                        className="absolute inset-0 overflow-hidden text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-blue-500"
                        style={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }}
                    >
                        LinkAI
                            </motion.div>
                    </div>
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: phase === "loading" ? 0.5 : 0, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5, ease: MOTION_EASE }}
                            className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.5em] text-white/30 whitespace-nowrap font-body"
                        >
                            Loading
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* NEW LOGO - Appears centered, then moves UP */}
            <AnimatePresence>
                {(phase === "celebration" || phase === "moveUp" || phase === "showHeadline") && (
                    <motion.div
                        key="new-logo"
                        className="absolute z-20 flex flex-col items-center w-full origin-top"
                        initial={{ opacity: 0, scale: 0.95, top: "50%", y: "-50%", filter: "blur(10px)" }}
                        animate={{
                            opacity: 1,
                            scale: isLogoMovedUp ? 0.55 : 1,
                            top: isLogoMovedUp ? "8%" : "50%",
                            y: isLogoMovedUp ? "0%" : "-50%",
                            filter: "blur(0px)",
                        }}
                        transition={{
                            duration: 0.8,
                            ease: MOTION_EASE,
                        }}
                    >
                        <LinkAILogo className="w-[280px] md:w-[380px]" />

                        {/* Version 2.0 - Glowing reveal */}
                        <motion.div
                            className="relative mt-4"
                            initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            transition={{ delay: 0.8, duration: 0.6, ease: MOTION_EASE }}
                        >
                            {/* Glow behind */}
                            <motion.div
                                className="absolute inset-0 -inset-x-4 rounded-full blur-xl"
                                style={{ background: "linear-gradient(90deg, rgba(249,115,22,0.4), rgba(59,130,246,0.4))" }}
                                animate={{
                                    opacity: [0.4, 0.7, 0.4],
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <span className="relative text-3xl md:text-4xl font-display font-light tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-blue-400">
                                2.0
                            </span>
                        </motion.div>

                        {/* GoodLeap branding - Bigger and more prominent */}
                        <motion.div
                            className="mt-6 flex flex-col items-center gap-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{
                                opacity: 1,
                                y: 0
                            }}
                            transition={{ delay: 0.5, duration: 0.6, ease: MOTION_EASE }}
                        >
                            <span className="text-xs uppercase tracking-[0.4em] text-white/50 font-display font-medium">
                                by
                            </span>
                            <Image
                                src="https://cdn.bfldr.com/Q445447Z/at/r8mz3sj9btg5khst4twv5q8/goodleap-gradient-cR.svg?auto=webp&format=png"
                                alt="GoodLeap"
                                width={200}
                                height={50}
                                className="opacity-100"
                                style={{ objectFit: "contain" }}
                            />
                            <span className="text-base text-white/50 font-body font-light tracking-wide mt-1">
                                One Platform. One Experience.
                            </span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* HEADLINE - Comes down from above */}
            <AnimatePresence>
                {showHeadline && (
                <motion.div
                        className="absolute z-10 text-center px-4 w-full"
                        style={{ top: "50%", transform: "translateY(-50%)" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="mb-8">
                            <div className="overflow-hidden pb-3">
                                <motion.span
                                    initial={{ y: "-120%", filter: "blur(10px)" }}
                                    animate={{ y: 0, filter: "blur(0px)" }}
                                    transition={{ delay: 0.1, duration: 0.8, ease: MOTION_EASE }}
                                    className="block text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-[0.15em] text-white uppercase"
                                >
                                    The Platform
                                </motion.span>
                            </div>
                            <div className="overflow-hidden pb-2">
                                <motion.span
                                    initial={{ y: "-120%", filter: "blur(10px)" }}
                                    animate={{ y: 0, filter: "blur(0px)" }}
                                    transition={{ delay: 0.25, duration: 0.8, ease: MOTION_EASE }}
                                    className="block text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-blue-500 uppercase"
                                >
                                    That Thinks Ahead
                                </motion.span>
                            </div>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ delay: 0.5, duration: 0.7, ease: MOTION_EASE }}
                            className="max-w-lg mx-auto text-white/40 text-base md:text-lg font-body font-light tracking-wide leading-relaxed"
                        >
                            Experience the future of mortgage. Where AI agents anticipate needs before you even ask.
                        </motion.p>

                        {/* Scroll Indicator */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.6, ease: MOTION_EASE }}
                            className="mt-16 flex flex-col items-center gap-2"
                        >
                            <span className="text-[10px] uppercase tracking-[0.2em] font-body font-light text-white/30">Scroll to Explore</span>
                            <div className="w-[1px] h-12 bg-gradient-to-b from-orange-500/0 via-orange-500 to-orange-500/0" />
                        </motion.div>
                </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
