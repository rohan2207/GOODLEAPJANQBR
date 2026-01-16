"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export interface CarouselStep {
    id: string;
    title: string;
    description: string;
    image?: string;
    component?: React.ReactNode;
}

interface FeatureCarouselProps {
    steps: CarouselStep[];
    progress?: MotionValue<number>;
    accentColor?: string;
}

export default function FeatureCarousel({ steps, progress, accentColor = "#f97316" }: FeatureCarouselProps) {
    const [activeStep, setActiveStep] = useState(0);

    // Calculate active step based on scroll progress
    const scrollBasedStep = progress 
        ? useTransform(progress, [0, 1], [0, steps.length - 1])
        : null;

    // Get current step index (scroll-driven or click-driven)
    const currentStepIndex = scrollBasedStep 
        ? Math.round(scrollBasedStep.get()) 
        : activeStep;

    return (
        <div className="w-full h-full flex flex-col">
            {/* Phone Frame Container */}
            <div className="flex-1 flex items-center justify-center p-4 md:p-8">
                <div className="relative w-full max-w-[320px] mx-auto">
                    {/* Phone Frame */}
                    <div className="relative bg-[#1a1a1a] rounded-[3rem] p-3 shadow-2xl border border-white/10">
                        {/* Phone Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-20" />
                        
                        {/* Screen */}
                        <div className="relative bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19]">
                            {/* Status Bar */}
                            <div className="absolute top-0 left-0 right-0 h-12 bg-white z-10 flex items-center justify-between px-8 pt-2">
                                <span className="text-xs font-medium text-black">9:41</span>
                                <div className="flex items-center gap-1">
                                    <div className="w-4 h-2 border border-black rounded-sm">
                                        <div className="w-3/4 h-full bg-black rounded-sm" />
                                    </div>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="absolute inset-0 pt-12">
                                {steps.map((step, idx) => (
                                    <motion.div
                                        key={step.id}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ 
                                            opacity: idx === currentStepIndex ? 1 : 0,
                                            x: idx === currentStepIndex ? 0 : idx < currentStepIndex ? -50 : 50
                                        }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className="absolute inset-0 pt-2"
                                    >
                                        {step.image ? (
                                            <Image
                                                src={step.image}
                                                alt={step.title}
                                                fill
                                                className="object-cover object-top"
                                            />
                                        ) : step.component ? (
                                            <div className="w-full h-full">
                                                {step.component}
                                            </div>
                                        ) : (
                                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                                <span className="text-gray-400 text-sm">Step {idx + 1}</span>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Home Indicator */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
                    </div>

                    {/* Glow Effect */}
                    <div 
                        className="absolute -inset-4 rounded-[4rem] opacity-30 blur-2xl -z-10"
                        style={{ background: `radial-gradient(circle, ${accentColor}40 0%, transparent 70%)` }}
                    />
                </div>
            </div>

            {/* Step Info & Navigation */}
            <div className="px-6 pb-6">
                {/* Current Step Info */}
                <div className="text-center mb-4">
                    <motion.h4 
                        key={currentStepIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-white font-semibold text-lg mb-1"
                    >
                        {steps[currentStepIndex]?.title}
                    </motion.h4>
                    <motion.p 
                        key={`desc-${currentStepIndex}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white/50 text-sm"
                    >
                        {steps[currentStepIndex]?.description}
                    </motion.p>
                </div>

                {/* Step Indicators */}
                <div className="flex items-center justify-center gap-2">
                    {steps.map((step, idx) => (
                        <button
                            key={step.id}
                            onClick={() => setActiveStep(idx)}
                            className="relative p-1 group"
                        >
                            <div 
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    idx === currentStepIndex 
                                        ? 'w-8' 
                                        : 'bg-white/20 group-hover:bg-white/40'
                                }`}
                                style={{ 
                                    backgroundColor: idx === currentStepIndex ? accentColor : undefined 
                                }}
                            />
                            {idx === currentStepIndex && (
                                <motion.div
                                    layoutId="step-indicator"
                                    className="absolute inset-0 rounded-full"
                                    style={{ backgroundColor: accentColor }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Step Numbers */}
                <div className="flex items-center justify-center gap-1 mt-3">
                    <span className="text-white/40 text-xs">
                        Step {currentStepIndex + 1} of {steps.length}
                    </span>
                </div>
            </div>
        </div>
    );
}
