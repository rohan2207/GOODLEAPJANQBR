"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

interface WorkflowSpineProps {
    activeNode: number;
    previousNode: number;
    pricingRevealed: boolean;
    onNodeClick: (index: number) => void;
    nodes: { id: string; name: string }[];
}

export default function WorkflowSpine({
    activeNode,
    previousNode,
    pricingRevealed,
    onNodeClick,
    nodes
}: WorkflowSpineProps) {
    const glowControls = useAnimation();

    // Animate glow travel when activeNode changes
    useEffect(() => {
        const progress = activeNode / 4; // 0 to 1
        glowControls.start({
            strokeDashoffset: 1 - progress,
            transition: { duration: 0.6, ease: "easeInOut" }
        });
    }, [activeNode, glowControls]);

    const nodePositions = [0, 0.25, 0.5, 0.75, 1]; // Evenly spaced

    return (
        <div className="relative w-full px-8">
            <div className="max-w-5xl mx-auto relative">
                {/* SVG Spine */}
                <svg
                    viewBox="0 0 1000 60"
                    className="w-full h-16"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <defs>
                        {/* Background gradient */}
                        <linearGradient id="spine-bg" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                        </linearGradient>

                        {/* Glow gradient */}
                        <linearGradient id="spine-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#f97316" />
                            <stop offset="50%" stopColor="#fb923c" />
                            <stop offset="100%" stopColor="#f97316" />
                        </linearGradient>

                        {/* Glow filter */}
                        <filter id="glow-filter" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        {/* Node glow filter */}
                        <filter id="node-glow" x="-100%" y="-100%" width="300%" height="300%">
                            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Background line */}
                    <line
                        x1="50"
                        y1="30"
                        x2="950"
                        y2="30"
                        stroke="url(#spine-bg)"
                        strokeWidth="4"
                        strokeLinecap="round"
                    />

                    {/* Progress line (animated) */}
                    <motion.line
                        x1="50"
                        y1="30"
                        x2="950"
                        y2="30"
                        stroke="url(#spine-glow)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        filter="url(#glow-filter)"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: (activeNode + 1) / 5 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    />

                    {/* Traveling glow orb */}
                    <motion.circle
                        r="8"
                        fill="#f97316"
                        filter="url(#node-glow)"
                        initial={{ cx: 50 + (previousNode * 225), cy: 30 }}
                        animate={{ cx: 50 + (activeNode * 225), cy: 30 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />

                    {/* Nodes */}
                    {nodes.map((node, i) => {
                        const x = 50 + i * 225;
                        const isActive = i === activeNode;
                        const isLocked = i === 4 && !pricingRevealed;
                        const isPast = i <= activeNode;

                        return (
                            <g key={node.id}>
                                {/* Clickable area */}
                                <circle
                                    cx={x}
                                    cy={30}
                                    r={25}
                                    fill="transparent"
                                    className={isLocked ? "cursor-not-allowed" : "cursor-pointer"}
                                    onClick={() => !isLocked && onNodeClick(i)}
                                />

                                {/* Outer ring (pulse when active) */}
                                {isActive && (
                                    <motion.circle
                                        cx={x}
                                        cy={30}
                                        r={20}
                                        fill="none"
                                        stroke="#f97316"
                                        strokeWidth="2"
                                        initial={{ scale: 1, opacity: 0.5 }}
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                )}

                                {/* Node circle */}
                                <motion.circle
                                    cx={x}
                                    cy={30}
                                    r={isActive ? 14 : 10}
                                    fill={isLocked ? "#1f2937" : isPast ? "#f97316" : "#374151"}
                                    stroke={isLocked ? "#4b5563" : isPast ? "#fb923c" : "#6b7280"}
                                    strokeWidth="3"
                                    filter={isActive ? "url(#node-glow)" : undefined}
                                    animate={{ scale: isActive ? 1.1 : 1 }}
                                    transition={{ duration: 0.3 }}
                                />

                                {/* Lock icon for pricing */}
                                {isLocked && (
                                    <text
                                        x={x}
                                        y={35}
                                        textAnchor="middle"
                                        fontSize="14"
                                        fill="#6b7280"
                                    >
                                        🔒
                                    </text>
                                )}

                                {/* Checkmark for completed nodes */}
                                {isPast && !isActive && i < 4 && (
                                    <text
                                        x={x}
                                        y={35}
                                        textAnchor="middle"
                                        fontSize="12"
                                        fill="white"
                                    >
                                        ✓
                                    </text>
                                )}
                            </g>
                        );
                    })}
                </svg>

                {/* Node Labels */}
                <div className="flex justify-between px-[5%]">
                    {nodes.map((node, i) => {
                        const isActive = i === activeNode;
                        const isLocked = i === 4 && !pricingRevealed;
                        
                        return (
                            <button
                                key={node.id}
                                onClick={() => !isLocked && onNodeClick(i)}
                                disabled={isLocked}
                                className={`text-center transition-all ${
                                    isActive 
                                        ? "text-orange-400 font-semibold scale-110" 
                                        : isLocked 
                                        ? "text-white/30 cursor-not-allowed"
                                        : "text-white/60 hover:text-white/80 cursor-pointer"
                                }`}
                                style={{ width: '18%' }}
                            >
                                <span className="text-sm whitespace-nowrap">
                                    {isLocked ? "🔒 " : ""}{node.name}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
