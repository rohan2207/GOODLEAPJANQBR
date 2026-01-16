"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import FeatureNode from "./FeatureNode";
import { BrainCircuit, Scale, Home, Link2 } from "lucide-react";
import BriefAICard from "./features/BriefAICard";
import LiabilityAICard from "./features/LiabilityAICard";
import PropertyCard from "./features/PropertyCard";
import FigureCard from "./features/FigureCard";
import Spotlight from "./Spotlight";

// The main journey path - more centered and flowing
const JOURNEY_PATH = "M 200 0 C 200 150 100 200 100 350 C 100 500 300 500 300 650 C 300 800 100 800 100 950 C 100 1100 200 1150 200 1200";

// Stop positions along the journey
const STOP_POSITIONS = [
    { y: 350, x: 100, label: "Brief AI", color: "#f97316" },
    { y: 650, x: 300, label: "Liability AI", color: "#3b82f6" },
    { y: 950, x: 100, label: "Property AI", color: "#f59e0b" },
    { y: 1200, x: 200, label: "Figure", color: "#a855f7" },
];

export default function FeatureRoad() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    // Transform scroll progress to glow color (orange -> blue -> purple)
    const glowColor = useTransform(
        scrollYProgress,
        [0, 0.33, 0.66, 1],
        ["#f97316", "#3b82f6", "#f59e0b", "#a855f7"]
    );

    const features = [
        {
            title: "Brief AI",
            description: "Pre-call intelligence that knows your borrower.",
            icon: BrainCircuit,
            component: BriefAICard,
        },
        {
            title: "Liability AI",
            description: "Instant payoff strategy that optimizes DTI.",
            icon: Scale,
            component: LiabilityAICard,
        },
        {
            title: "Property AI",
            description: "Confidence in every valuation.",
            icon: Home,
            component: PropertyCard,
        },
        {
            title: "Figure Sync",
            description: "Seamless data flow between platforms.",
            icon: Link2,
            component: FigureCard,
            isIntegration: true,
        },
    ];

    return (
        <div ref={containerRef} className="relative w-full max-w-7xl mx-auto px-4 md:px-8 overflow-hidden">
            {/* Spotlight follows cursor */}
            <div className="absolute inset-0 pointer-events-none z-[1]">
                <Spotlight />
            </div>

            {/* The Journey Path (SVG) - More Prominent */}
            <div className="absolute inset-0 z-0 pointer-events-none w-full h-full">
                <svg
                    className="w-full h-full"
                    viewBox="0 0 400 1200"
                    preserveAspectRatio="none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        {/* Journey gradient - orange to purple */}
                        <linearGradient id="road-gradient" x1="200" y1="0" x2="200" y2="1200" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#f97316" stopOpacity="0.2" />
                            <stop offset="10%" stopColor="#f97316" stopOpacity="1" />
                            <stop offset="33%" stopColor="#3b82f6" stopOpacity="1" />
                            <stop offset="66%" stopColor="#f59e0b" stopOpacity="1" />
                            <stop offset="90%" stopColor="#a855f7" stopOpacity="1" />
                            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
                        </linearGradient>

                        {/* Strong glow filter for the path */}
                        <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
                            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        {/* Intense glow for the traveling orb */}
                        <filter id="orb-glow" x="-200%" y="-200%" width="500%" height="500%">
                            <feGaussianBlur stdDeviation="15" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        {/* Stop glow */}
                        <filter id="stop-glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Background dashed path - VERY VISIBLE */}
                    <path
                        d={JOURNEY_PATH}
                        stroke="rgba(255,255,255,0.25)"
                        strokeWidth="6"
                        strokeDasharray="12 8"
                        fill="none"
                    />

                    {/* Outer glow path - wide and soft */}
                    <motion.path
                        d={JOURNEY_PATH}
                        stroke="url(#road-gradient)"
                        strokeWidth="24"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.15"
                        initial={{ pathLength: 0 }}
                        style={{ pathLength: scrollYProgress }}
                    />

                    {/* Middle glow path */}
                    <motion.path
                        d={JOURNEY_PATH}
                        stroke="url(#road-gradient)"
                        strokeWidth="12"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.4"
                        filter="url(#glow)"
                        initial={{ pathLength: 0 }}
                        style={{ pathLength: scrollYProgress }}
                    />

                    {/* Main animated progress path - BRIGHT */}
                    <motion.path
                        d={JOURNEY_PATH}
                        stroke="url(#road-gradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        filter="url(#glow)"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        style={{ pathLength: scrollYProgress }}
                    />

                    {/* Subtle alternate/branching paths */}
                    <g opacity="0.2">
                        <path d="M 200 50 Q 50 150 100 350" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5 7" fill="none" />
                        <path d="M 100 350 C 200 450 350 550 300 650" stroke="#f97316" strokeWidth="2" strokeDasharray="5 7" fill="none" />
                        <path d="M 300 650 C 150 750 50 850 100 950" stroke="#a855f7" strokeWidth="2" strokeDasharray="5 7" fill="none" />
                        <path d="M 100 950 Q 250 1050 200 1200" stroke="#22d3ee" strokeWidth="2" strokeDasharray="5 7" fill="none" />
                    </g>

                    {/* STOP POINT INDICATORS - Large and visible */}
                    {STOP_POSITIONS.map((stop, idx) => (
                        <g key={idx}>
                            {/* Outer pulse ring */}
                            <circle
                                cx={stop.x}
                                cy={stop.y}
                                r="28"
                                fill="none"
                                stroke={stop.color}
                                strokeWidth="1"
                                opacity="0.3"
                            >
                                <animate 
                                    attributeName="r" 
                                    values="20;30;20" 
                                    dur="3s" 
                                    repeatCount="indefinite"
                                    begin={`${idx * 0.5}s`}
                                />
                                <animate 
                                    attributeName="opacity" 
                                    values="0.5;0.1;0.5" 
                                    dur="3s" 
                                    repeatCount="indefinite"
                                    begin={`${idx * 0.5}s`}
                                />
                            </circle>
                            
                            {/* Glow ring */}
                            <circle
                                cx={stop.x}
                                cy={stop.y}
                                r="16"
                                fill="none"
                                stroke={stop.color}
                                strokeWidth="2"
                                opacity="0.6"
                                filter="url(#stop-glow)"
                            />
                            
                            {/* Main dot */}
                            <circle
                                cx={stop.x}
                                cy={stop.y}
                                r="8"
                                fill={stop.color}
                                opacity="1"
                                filter="url(#stop-glow)"
                            />
                            
                            {/* Inner bright dot */}
                            <circle
                                cx={stop.x}
                                cy={stop.y}
                                r="3"
                                fill="white"
                                opacity="0.8"
                            />
                            
                            {/* Number label */}
                            <text
                                x={stop.x + (stop.x < 200 ? -35 : 35)}
                                y={stop.y + 5}
                                fill={stop.color}
                                fontSize="14"
                                fontWeight="bold"
                                opacity="0.7"
                                textAnchor={stop.x < 200 ? "end" : "start"}
                            >
                                {String(idx + 1).padStart(2, '0')}
                            </text>
                        </g>
                    ))}

                    {/* TRAVELING GLOW ORB - Main progress indicator */}
                    <motion.circle
                        r="12"
                        filter="url(#orb-glow)"
                        style={{ fill: glowColor }}
                    >
                        <animateMotion
                            dur="1s"
                            repeatCount="1"
                            fill="freeze"
                            path={JOURNEY_PATH}
                            keyPoints="0;1"
                            keyTimes="0;1"
                            calcMode="linear"
                        >
                            <mpath href="#journeyPathRef" />
                        </animateMotion>
                    </motion.circle>

                    {/* Hidden path reference for animateMotion */}
                    <path id="journeyPathRef" d={JOURNEY_PATH} fill="none" stroke="none" />

                    {/* Ambient particles along the path */}
                    <g filter="url(#glow)">
                        <circle r="3" fill="#f97316" opacity="0.8">
                            <animateMotion dur="6s" repeatCount="indefinite" path="M 200 100 Q 100 200 100 350" />
                            <animate attributeName="opacity" values="0;0.8;0" dur="6s" repeatCount="indefinite" />
                        </circle>
                        <circle r="3" fill="#3b82f6" opacity="0.8">
                            <animateMotion dur="8s" repeatCount="indefinite" path="M 100 350 C 200 450 300 550 300 650" />
                            <animate attributeName="opacity" values="0;0.8;0" dur="8s" repeatCount="indefinite" />
                        </circle>
                        <circle r="3" fill="#f59e0b" opacity="0.8">
                            <animateMotion dur="7s" repeatCount="indefinite" path="M 300 650 C 200 750 100 850 100 950" />
                            <animate attributeName="opacity" values="0;0.8;0" dur="7s" repeatCount="indefinite" />
                        </circle>
                        <circle r="3" fill="#a855f7" opacity="0.8">
                            <animateMotion dur="5s" repeatCount="indefinite" path="M 100 950 Q 150 1050 200 1200" />
                            <animate attributeName="opacity" values="0;0.8;0" dur="5s" repeatCount="indefinite" />
                        </circle>
                    </g>
                </svg>
            </div>

            {/* Feature stops along the journey */}
            <div className="relative z-10 flex flex-col">
                {features.map((feature, idx) => {
                    const FeatureComponent = feature.component;
                    const isRight = idx % 2 === 0;
                    
                    return (
                        <FeatureNode
                            key={idx}
                            index={idx}
                            title={feature.title}
                            description={feature.description}
                            icon={feature.icon}
                            textAlign={isRight ? "right" : "left"}
                            isCinematic={true}
                        >
                            <FeatureComponent />
                        </FeatureNode>
                    );
                })}
            </div>
        </div>
    );
}
