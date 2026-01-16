"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DeviceFrameProps {
    children: ReactNode;
    title?: string;
    className?: string;
    glowColor?: "orange" | "blue" | "purple" | "none";
    progress?: MotionValue<number>;
}

export default function DeviceFrame({
    children,
    title,
    className,
    glowColor = "none",
    progress
}: DeviceFrameProps) {
    // Optional scroll-driven animations
    const scale = progress ? useTransform(progress, [0, 0.5, 1], [0.95, 1, 0.95]) : 1;
    const opacity = progress ? useTransform(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]) : 1;

    const glowStyles = {
        orange: "shadow-[0_0_120px_-30px_rgba(249,115,22,0.5)]",
        blue: "shadow-[0_0_120px_-30px_rgba(59,130,246,0.5)]",
        purple: "shadow-[0_0_120px_-30px_rgba(168,85,247,0.5)]",
        none: ""
    };

    return (
        <motion.div
            style={{ scale, opacity }}
            className={cn(
                "relative rounded-3xl overflow-hidden",
                glowStyles[glowColor],
                className
            )}
        >
            {/* Sleek outer border gradient */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/20 via-white/5 to-transparent p-[1px]">
                <div className="w-full h-full rounded-3xl bg-[#0c0c0c]" />
            </div>
            
            {/* Main content container */}
            <div className="relative bg-[#0c0c0c] rounded-3xl overflow-hidden">
                {/* Subtle top highlight */}
                <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                
                {/* Content area */}
                <div className="relative overflow-hidden">
                    {children}
                </div>
            </div>

            {/* Bottom ambient reflection */}
            <div className="absolute -bottom-8 left-[10%] right-[10%] h-16 bg-white/[0.02] blur-2xl rounded-full" />
        </motion.div>
    );
}
