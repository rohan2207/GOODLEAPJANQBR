"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, ArrowUpRight, Zap, CheckCircle2, ExternalLink } from "lucide-react";

// Slide content type
type SlideContent = {
    id: string;
    title: string;
    subtitle: string;
    content: React.ReactNode;
};

// Placeholder slides - will be replaced with actual HTML content
const SLIDES: SlideContent[] = [
    {
        id: "link-ready",
        title: "One Click. All Data Ready.",
        subtitle: "LINK AI prepares everything",
        content: (
            <div className="relative w-full h-full flex items-center justify-center">
                {/* Placeholder for LINK AI screen */}
                <div className="w-[700px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 shadow-2xl">
                    {/* Browser chrome */}
                    <div className="h-10 bg-slate-800/80 border-b border-white/5 flex items-center px-4 gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="px-4 py-1 rounded-md bg-slate-700/50 text-xs text-white/50">
                                link.goodleap.com
                            </div>
                        </div>
                    </div>
                    {/* App content placeholder */}
                    <div className="p-8 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-lg">HELOC Application</h3>
                                <p className="text-white/50 text-sm">John Smith • 2116 Shrewsbury Dr</p>
                            </div>
                        </div>
                        
                        {/* Data ready indicators */}
                        <div className="grid grid-cols-2 gap-3">
                            {["Property Data", "Credit Info", "Income Verified", "Assets Confirmed"].map((item, i) => (
                                <div key={item} className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10">
                                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                                    <span className="text-white/80 text-sm">{item}</span>
                                </div>
                            ))}
                        </div>

                        {/* Send to Figure button */}
                        <motion.button
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-lg flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/25"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span>Send to Figure</span>
                            <ExternalLink className="w-5 h-5" />
                        </motion.button>
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: "prefilling",
        title: "Automatically Prefilled.",
        subtitle: "Zero manual entry required",
        content: (
            <div className="relative w-full h-full flex items-center justify-center">
                {/* Prefill animation state */}
                <div className="w-[700px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 shadow-2xl">
                    {/* Browser chrome */}
                    <div className="h-10 bg-slate-800/80 border-b border-white/5 flex items-center px-4 gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="px-4 py-1 rounded-md bg-slate-700/50 text-xs text-white/50">
                                Transferring to Figure...
                            </div>
                        </div>
                    </div>
                    {/* Transfer animation */}
                    <div className="p-12 flex flex-col items-center justify-center space-y-8">
                        {/* Animated transfer visual */}
                        <div className="relative flex items-center gap-8">
                            <motion.div 
                                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-purple-500/30"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <span className="text-white font-bold text-xl">LINK</span>
                            </motion.div>

                            {/* Data packets flying */}
                            <div className="relative w-32 h-4">
                                {[0, 1, 2].map((i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute top-0 w-4 h-4 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"
                                        initial={{ x: 0, opacity: 0 }}
                                        animate={{ 
                                            x: [0, 128], 
                                            opacity: [0, 1, 1, 0] 
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            delay: i * 0.3,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                ))}
                            </div>

                            <motion.div 
                                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-500/30"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            >
                                <span className="text-white font-bold text-lg">Figure</span>
                            </motion.div>
                        </div>

                        {/* Progress bar */}
                        <div className="w-full max-w-md space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-white/60">Transferring data...</span>
                                <motion.span 
                                    className="text-emerald-400 font-semibold"
                                    key="progress"
                                >
                                    87%
                                </motion.span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <motion.div 
                                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "87%" }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                />
                            </div>
                        </div>

                        {/* Data items being transferred */}
                        <div className="grid grid-cols-2 gap-3 w-full max-w-md">
                            {[
                                { label: "Borrower Info", done: true },
                                { label: "Property Details", done: true },
                                { label: "Income Data", done: true },
                                { label: "Credit Summary", done: false },
                            ].map((item, i) => (
                                <motion.div 
                                    key={item.label}
                                    className="flex items-center gap-2 p-2 rounded-lg bg-white/5"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.2 }}
                                >
                                    {item.done ? (
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    ) : (
                                        <motion.div 
                                            className="w-4 h-4 rounded-full border-2 border-white/30 border-t-emerald-400"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        />
                                    )}
                                    <span className={`text-sm ${item.done ? 'text-white/80' : 'text-white/50'}`}>
                                        {item.label}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: "figure-landing",
        title: "Land on Figure. Start Closing.",
        subtitle: "Everything prefilled, ready to go",
        content: (
            <div className="relative w-full h-full flex items-center justify-center">
                {/* Figure portal landing */}
                <div className="w-[700px] rounded-2xl overflow-hidden bg-white border border-black/10 shadow-2xl">
                    {/* Browser chrome */}
                    <div className="h-10 bg-slate-100 border-b border-black/5 flex items-center px-4 gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="px-4 py-1 rounded-md bg-white border border-black/10 text-xs text-black/50">
                                figure.com/heloc/application
                            </div>
                        </div>
                    </div>
                    {/* Figure portal content */}
                    <div className="p-6 space-y-4 bg-gradient-to-b from-white to-slate-50">
                        {/* Figure header */}
                        <div className="flex items-center justify-between pb-4 border-b border-black/5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">F</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">HELOC Application</h3>
                                    <p className="text-xs text-slate-500">Powered by Figure</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                <span className="text-sm font-medium text-emerald-700">Data Received</span>
                            </div>
                        </div>

                        {/* Prefilled form fields */}
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: "Property Address", value: "2116 Shrewsbury Dr, McKinney TX" },
                                { label: "Estimated Value", value: "$785,000" },
                                { label: "Borrower Name", value: "John Smith" },
                                { label: "Credit Score", value: "608" },
                                { label: "Current Mortgage", value: "$428,000" },
                                { label: "Requested Amount", value: "$150,000" },
                            ].map((field) => (
                                <div key={field.label} className="space-y-1">
                                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                                        {field.label}
                                    </label>
                                    <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-100 text-slate-900 font-medium">
                                        {field.value}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Continue button */}
                        <motion.button
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20"
                            whileHover={{ scale: 1.01 }}
                        >
                            <span>Continue Application</span>
                            <ArrowUpRight className="w-5 h-5" />
                        </motion.button>

                        <p className="text-center text-xs text-slate-400">
                            All fields prefilled from LINK • Ready to proceed
                        </p>
                    </div>
                </div>
            </div>
        ),
    },
];

export default function FigureIntegration() {
    const [activeSlide, setActiveSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);

    const SLIDE_DURATION = 6000; // 6 seconds per slide

    // Auto-advance slides
    useEffect(() => {
        if (!isPlaying) return;

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    setActiveSlide((s) => (s + 1) % SLIDES.length);
                    return 0;
                }
                return prev + (100 / (SLIDE_DURATION / 50));
            });
        }, 50);

        return () => clearInterval(progressInterval);
    }, [isPlaying, activeSlide]);

    const goToSlide = useCallback((index: number) => {
        setActiveSlide(index);
        setProgress(0);
    }, []);

    const togglePlayPause = useCallback(() => {
        setIsPlaying((prev) => !prev);
        if (!isPlaying) setProgress(0);
    }, [isPlaying]);

    return (
        <section className="relative min-h-screen bg-[#0a0a0f] overflow-hidden py-24">
            {/* Background gradient */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-teal-500/5 blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-8">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6"
                    >
                        <span className="text-emerald-400 font-semibold text-sm">FIGURE INTEGRATION</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight"
                    >
                        Direct to Figure.{" "}
                        <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                            Zero Re-entry.
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-white/60 max-w-2xl mx-auto mb-10"
                    >
                        HELOC exploded. We built the bridge.
                    </motion.p>

                    {/* Stats Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="inline-block"
                    >
                        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-xl">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 via-transparent to-teal-500/10" />
                            <div className="relative flex items-center gap-8">
                                <div className="text-left">
                                    <p className="text-white/50 text-sm mb-1">Total Funded Loans • 2025</p>
                                    <p className="text-white text-sm mb-1">Viewing <span className="text-purple-400 font-semibold">HELOC</span></p>
                                </div>
                                <div className="text-right">
                                    <p className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                                        4,184
                                    </p>
                                    <div className="flex items-center justify-end gap-2 mt-1">
                                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-sm font-semibold flex items-center gap-1">
                                            <ArrowUpRight className="w-3 h-3" />
                                            +268.0%
                                        </span>
                                        <span className="text-white/40 text-sm">vs 2024 (1,137)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Apple-Style Carousel */}
                <div className="relative">
                    {/* Navigation Pill */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex justify-center mb-8"
                    >
                        <div className="inline-flex items-center gap-3 p-2 rounded-full bg-white/[0.08] border border-white/10 backdrop-blur-xl">
                            {/* Play/Pause Button */}
                            <button
                                onClick={togglePlayPause}
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                                aria-label={isPlaying ? "Pause" : "Play"}
                            >
                                {isPlaying ? (
                                    <Pause className="w-4 h-4 text-white" />
                                ) : (
                                    <Play className="w-4 h-4 text-white ml-0.5" />
                                )}
                            </button>

                            {/* Dot Navigation */}
                            <div className="flex items-center gap-2 px-2">
                                {SLIDES.map((slide, index) => (
                                    <button
                                        key={slide.id}
                                        onClick={() => goToSlide(index)}
                                        className="relative w-8 h-2 rounded-full overflow-hidden bg-white/20 transition-all"
                                        aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                                        aria-selected={index === activeSlide}
                                    >
                                        {index === activeSlide && (
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: progress / 100 }}
                                                style={{ transformOrigin: "left" }}
                                            />
                                        )}
                                        {index < activeSlide && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Slide Container */}
                    <div className="relative h-[600px] overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSlide}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="absolute inset-0 flex flex-col"
                            >
                                {/* Slide Caption */}
                                <div className="absolute top-8 left-8 z-10">
                                    <p className="text-emerald-400/80 text-sm font-medium mb-2 uppercase tracking-wider">
                                        Step {activeSlide + 1} of {SLIDES.length}
                                    </p>
                                    <h3 className="text-3xl font-bold text-white mb-2">
                                        {SLIDES[activeSlide].title}
                                    </h3>
                                    <p className="text-white/60">
                                        {SLIDES[activeSlide].subtitle}
                                    </p>
                                </div>

                                {/* Slide Content */}
                                <div className="flex-1 flex items-center justify-center pt-24">
                                    {SLIDES[activeSlide].content}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Slide Labels */}
                    <div className="flex justify-center gap-8 mt-8">
                        {SLIDES.map((slide, index) => (
                            <button
                                key={slide.id}
                                onClick={() => goToSlide(index)}
                                className={`text-sm font-medium transition-all ${
                                    index === activeSlide
                                        ? "text-white"
                                        : "text-white/40 hover:text-white/60"
                                }`}
                            >
                                {index + 1}. {slide.title.split(".")[0]}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
