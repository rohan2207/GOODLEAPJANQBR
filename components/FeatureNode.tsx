"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FeatureNodeProps {
    title: string;
    description: string;
    icon: LucideIcon;
    index: number;
    textAlign?: "left" | "right";
    isCinematic?: boolean;
    children?: React.ReactNode;
}

export default function FeatureNode({ title, description, icon: Icon, index, textAlign, isCinematic, children }: FeatureNodeProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Standard animations for non-cinematic nodes
    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [0.9, 1, 1, 0.9]);
    const y = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [60, 0, 0, -60]);

    // Cinematic sections need 250vh for compressed storytelling
    const containerHeight = isCinematic ? "h-[250vh]" : "min-h-screen";

    // Determine Text Position for non-cinematic
    const isTextRight = textAlign ? textAlign === "right" : index % 2 !== 0;

    // CINEMATIC MODE: Full viewport, no grid constraints
    if (isCinematic) {
        return (
            <div ref={ref} className={cn("relative w-full overflow-x-hidden", containerHeight)}>
                {/* Sticky full-screen container - use 100vw with overflow hidden to prevent horizontal scroll */}
                <div className="sticky top-0 h-screen w-full max-w-[100vw] overflow-hidden bg-black">
                    {/* Pass scroll progress to children - they handle ALL layout */}
                    {React.isValidElement(children)
                        ? React.cloneElement(children as React.ReactElement<any>, { progress: scrollYProgress })
                        : children
                    }
                </div>
            </div>
        );
    }

    // STANDARD MODE: Grid layout with text + media columns
    return (
        <div ref={ref} className={cn("relative w-full", containerHeight)}>
            <div className={cn(
                "w-full flex items-center px-4 md:px-12 min-h-screen py-24",
                isTextRight ? "justify-end" : "justify-start"
            )}>
                <motion.div
                    style={{ opacity, scale, y }}
                    className="w-full relative z-10 group"
                >
                    <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-center w-full">

                        {/* Text Column */}
                        <div className={cn(
                            "md:col-span-3 flex flex-col justify-center relative z-20 pointer-events-none",
                            isTextRight ? "md:order-2 md:text-right items-end" : "md:order-1 items-start"
                        )}>
                            <motion.div
                                initial={{ x: isTextRight ? 50 : -50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                                className={cn("flex items-center gap-4 mb-8", isTextRight && "flex-row-reverse")}
                            >
                                <div className="w-16 h-16 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-500 shadow-2xl backdrop-blur-sm">
                                    <Icon size={32} />
                                </div>
                                <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight text-balance">{title}</h3>
                            </motion.div>
                            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed text-balance">
                                {description}
                            </p>
                        </div>

                        {/* Media Column */}
                        <div className={cn("md:col-span-9 perspective-1000", isTextRight ? "md:order-1" : "md:order-2")}>
                            <motion.div className="w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl relative bg-white/5 border border-white/10 hover:shadow-orange-500/20 transition-all duration-700">
                                {children}
                                {!children && (
                                    <div className="absolute inset-0 flex items-center justify-center text-white/20 text-sm uppercase tracking-widest font-mono">
                                        Feature Visual Area
                                    </div>
                                )}
                            </motion.div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </div>
    );
}
