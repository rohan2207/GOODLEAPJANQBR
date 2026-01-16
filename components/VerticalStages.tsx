"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Phone, ChevronRight } from "lucide-react";
import BeforeStage from './stages/BeforeStage';
import Agent1Stage from './stages/Agent1Stage';
import Agent2Stage from './stages/Agent2Stage';
import Agent3Stage from './stages/Agent3Stage';
import PricingStage from './stages/PricingStage';

// Stage configuration type
type StageConfig = {
    id: string;
    number: string;
    label: string;
    title: string;
    subtitle: string;
    description: string;
    component: React.ComponentType<any>;
    accentColor: string;
    glowColor: string; // Color that matches the journey line at this section
    hasInterface: boolean;
    buttonLabel?: string | null;
    buttonSubtext?: string;
    interfacePlaceholder?: string | null;
};


const STAGES = [
    {
        id: "before",
        number: "01",
        label: "THE PROBLEM",
        title: "Starting with the Borrower",
        subtitle: "Where Context Should Begin",
        description: "Credit history, liabilities, assets, past loans, property info—all scattered. Loan officers build rapport while flying blind.",
        component: BeforeStage,
        accentColor: "#8B5CF6",
        glowColor: "#8B5CF6", // Purple - matches journey line
        hasInterface: false,
        buttonLabel: null,
    },
    {
        id: "rapport",
        number: "02",
        label: "AI AGENT",
        title: "Rapport Builder",
        subtitle: "Know Your Borrower",
        description: "Credit, property, assets, liabilities—assembled in seconds. Walk into every call prepared.",
        component: Agent1Stage,
        accentColor: "#D946EF",
        glowColor: "#D946EF", // Fuchsia - matches journey line
        hasInterface: true,
        interfacePlaceholder: "/assets/brief-ai/dashboard-base.png",
        buttonLabel: "Rapport Builder",
        buttonSubtext: "Build customer context",
    },
    {
        id: "sales-coach",
        number: "03",
        label: "AI AGENT",
        title: "Sales Coach",
        subtitle: "Turn Objections into Opportunities",
        description: "Real-time guidance to handle objections and calculate benefits—personalized to each borrower's data.",
        component: Agent2Stage,
        accentColor: "#F97316",
        glowColor: "#D946EF", // Fuchsia - matches journey line at this position
        hasInterface: true,
        interfacePlaceholder: null,
        buttonLabel: "Sales Coach",
        buttonSubtext: "Objection handling & benefit calc",
    },
    {
        id: "valuation",
        number: "04",
        label: "AI AGENT",
        title: "Valuation AI",
        subtitle: "Confident Pricing",
        description: "Real-time property valuation and market comparables for confident recommendations.",
        component: Agent3Stage,
        accentColor: "#F59E0B",
        glowColor: "#F97316", // Orange - matches journey line
        hasInterface: true,
        interfacePlaceholder: null,
    },
    {
        id: "agents-teaser",
        number: "05",
        label: "ALL IN ONE",
        title: "Specialized Agents",
        subtitle: "At Your Fingertips",
        description: "Every tool you need, one click away. AI assistance built into your workflow.",
        component: PricingStage, // Will show AIAgentsTeaser
        accentColor: "#8B5CF6",
        glowColor: "#8B5CF6", // Purple - matches journey line end
        hasInterface: false,
    },
];

// Individual Stage Component with its own scroll tracking
function StageSection({ 
    stage, 
    index 
}: { 
    stage: StageConfig; 
    index: number;
}) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // ===== FOR STAGES WITHOUT INTERFACE (normal flow) =====
    // Phase 1: Text intro
    const textOpacity = useTransform(
        scrollYProgress, 
        stage.hasInterface 
            ? [0, 0.08, 0.90, 0.97] // STAYS VISIBLE longer - floats to corner
            : [0, 0.12, 0.8, 0.9],
        [0, 1, 1, 0]
    );
    const textY = useTransform(scrollYProgress, [0, 0.1], [50, 0]);
    
    // For interface stages: text floats down and MORE left, shrinks - adjusted for longer panel scroll
    const textFloatX = useTransform(
        scrollYProgress, 
        stage.id === "sales-coach"
            ? [0.15, 0.25, 0.30, 0.88] // Sales Coach: Move left EARLIER when menu appears, hold longer
            : stage.id === "valuation"
                ? [0.15, 0.30, 0.78, 0.88] // Valuation: Move left as cards converge
                : [0.18, 0.32, 0.78, 0.88],
        stage.id === "sales-coach"
            ? [0, -420, -520, -720] // Sales Coach: Move MORE left (increased spacing)
            : stage.id === "valuation"
                ? [0, -350, -350, -680] // Valuation: Similar movement
                : [0, -320, -320, -700] // Rapport: Move MORE left (increased spacing)
    );
    const textFloatY = useTransform(scrollYProgress, [0.18, 0.32], [0, 150]); // Move down
    const textFloatScale = useTransform(
        scrollYProgress, 
        stage.id === "sales-coach"
            ? [0.15, 0.25, 0.30, 0.88] // Sales Coach: Shrink EARLIER, hold longer
            : stage.id === "valuation"
                ? [0.15, 0.30, 0.78, 0.88] // Valuation: Shrink as cards converge
                : [0.18, 0.32, 0.78, 0.88],
        stage.id === "sales-coach"
            ? [1, 0.55, 0.5, 0.4] // Sales Coach: Shrink more
            : stage.id === "valuation"
                ? [1, 0.6, 0.55, 0.42] // Valuation: Similar shrink
                : [1, 0.6, 0.6, 0.45]
    );

    // Phase 2: Visualization - fades out as panel comes in
    const vizOpacity = useTransform(
        scrollYProgress, 
        stage.id === "sales-coach"
            ? [0.06, 0.10, 0.12, 0.18] // Sales Coach: Fade out VERY early before objection bubble
            : stage.id === "valuation"
                ? [0.06, 0.10, 0.12, 0.18] // Valuation: Fade out early before source cards
                : stage.hasInterface 
                    ? [0.06, 0.12, 0.22, 0.30] // Fade out before panel
                    : [0.08, 0.15, 0.7, 0.85], 
        [0, 1, 1, 0]
    );
    const vizScale = useTransform(scrollYProgress, [0.06, 0.15, 0.22, 0.28], [0.9, 1, 1, 0.95]);
    const vizY = useTransform(scrollYProgress, [0.06, 0.15], [30, 0]);

    // ===== VALUATION AI SPECIFIC TRANSFORMS =====
    // Phase 1: Source cards converge (0.15 - 0.40)
    const sourceCardsOpacity = useTransform(scrollYProgress, [0.15, 0.20, 0.38, 0.45], [0, 1, 1, 0]);
    const convergenceProgress = useTransform(scrollYProgress, [0.15, 0.40], [0, 1]);
    
    // Phase 2: Valuation panel appears (0.40 - 0.78)
    const valuationPanelOpacity = useTransform(scrollYProgress, [0.40, 0.48, 0.90, 0.97], [0, 1, 1, 0]);
    const valuationPanelScale = useTransform(scrollYProgress, [0.40, 0.48, 0.78, 0.88], [0.85, 1, 1, 0.58]);
    const valuationPanelX = useTransform(scrollYProgress, [0.48, 0.78, 0.88], [60, 60, 420]);
    const valuationPanelBlur = useTransform(scrollYProgress, [0.40, 0.48], [10, 0]);
    const valuationPanelBlurFilter = useTransform(valuationPanelBlur, (v) => `blur(${v}px)`);

    // ===== FOR STAGES WITH INTERFACE (3-phase transition) =====
    // For Rapport Builder: Panel appears at 0.25
    const focusedPanelOpacity = useTransform(
        scrollYProgress, 
        stage.id === "sales-coach" 
            ? [0.50, 0.58, 0.88, 0.95]  // Sales Coach: Later start, ends sooner to avoid white space
            : [0.25, 0.32, 0.90, 0.97], // Rapport Builder: Hold longer too
        [0, 1, 1, 0]
    );
    
    // Panel morphs: starts centered/large, stays longer, then shrinks and moves right
    const panelScale = useTransform(
        scrollYProgress, 
        stage.id === "sales-coach"
            ? [0.50, 0.58, 0.78, 0.88]  // Sales Coach: Later start
            : [0.25, 0.32, 0.78, 0.88], // Rapport Builder: Hold longer too
        [0.85, 1, 1, 0.58]
    );
    const panelX = useTransform(scrollYProgress, [0.52, 0.78, 0.88], [60, 60, 420]); // Adjusted to sync with viewport
    const panelY = useTransform(scrollYProgress, [0.78, 0.88], [0, 15]); // Slight down LATER
    
    // Panel content scrolls LONGER as user scrolls page - reveals all content
    const panelContentScroll = useTransform(
        scrollYProgress, 
        stage.id === "sales-coach"
            ? [0.58, 0.78]  // Sales Coach: Shorter scroll range to avoid white space
            : [0.32, 0.78], // Rapport Builder: Scroll longer
        [0, -800] // Reduced scroll amount
    );
    
    const focusedPanelBlur = useTransform(scrollYProgress, [0.25, 0.32], [10, 0]);
    const focusedPanelBlurFilter = useTransform(focusedPanelBlur, (v) => `blur(${v}px)`);

    // Phase 3: App Context fades in LATER (quarter page more scroll)
    const viewportContextOpacity = useTransform(scrollYProgress, [0.78, 0.88, 0.93, 0.98], [0, 1, 1, 0]);
    const viewportContextScale = useTransform(scrollYProgress, [0.78, 0.88], [0.95, 1]);
    const viewportBlur = useTransform(scrollYProgress, [0.78, 0.86], [8, 0]);
    const viewportBlurFilter = useTransform(viewportBlur, (v) => `blur(${v}px)`);
    const viewportX = useTransform(scrollYProgress, [0.78, 0.88], [60, 150]); // Synced with panel positioning

    // ===== SALES COACH SPECIFIC TRANSFORMS =====
    // Phase 1: Objection bubbles appear (0.12 - 0.32) - dramatic "dread moment" - EXTENDED
    const objectionOpacity = useTransform(scrollYProgress, [0.12, 0.16, 0.28, 0.35], [0, 1, 1, 0]);
    const objectionScale = useTransform(scrollYProgress, [0.12, 0.16, 0.28, 0.35], [0.8, 1, 1, 0.9]);
    const objectionRotateY = useTransform(scrollYProgress, [0.28, 0.36], [0, 90]);
    const objectionX = useTransform(scrollYProgress, [0.12, 0.22], [50, 200]); // Move MORE right
    
    // Phase 2: Menu panel flips in (0.30 - 0.55) - Stays until response panel appears
    const menuPanelOpacity = useTransform(scrollYProgress, [0.30, 0.35, 0.50, 0.58], [0, 1, 1, 0]);
    const menuPanelRotateY = useTransform(scrollYProgress, [0.30, 0.38], [-90, 0]);
    const menuPanelRotateYOut = useTransform(scrollYProgress, [0.50, 0.58], [0, 90]);
    const menuPanelX = useTransform(scrollYProgress, [0.30, 0.38], [0, 150]); // Move menu right
    
    // Phase 3: Response panel flips in (0.50+) - matches focusedPanelOpacity timing
    const salesCoachPanelRotateY = useTransform(scrollYProgress, [0.50, 0.58], [-90, 0]);

    const StageComponent = stage.component;
    const isAlternate = index % 2 === 1;

    return (
        <div 
            ref={sectionRef}
            className={`relative ${stage.hasInterface ? 'min-h-[700vh]' : 'min-h-[120vh]'}`}
        >
            {/* Sticky container for the stage content */}
            <div className="sticky top-0 min-h-screen flex items-center py-16 overflow-hidden">
                
                {/* ===== FLOWING BACKGROUND GLOW (matches line color) ===== */}
                <motion.div 
                    className="absolute inset-0 pointer-events-none"
                    style={{ opacity: useTransform(scrollYProgress, [0.05, 0.15, 0.85, 0.95], [0, 0.7, 0.7, 0]) }}
                >
                    {/* Main glow - matches journey line color */}
                    <motion.div
                        className="absolute w-[900px] h-[900px] rounded-full blur-[180px]"
                        style={{
                            backgroundColor: stage.glowColor,
                            opacity: 0.12,
                            left: '50%',
                            top: '50%',
                            x: useTransform(scrollYProgress, [0, 0.5, 1], ['-60%', '-50%', '-40%']),
                            y: '-50%',
                            scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 1]),
                        }}
                    />
                    {/* Secondary glow */}
                    <motion.div
                        className="absolute w-[600px] h-[600px] rounded-full blur-[120px]"
                        style={{
                            backgroundColor: stage.glowColor,
                            opacity: 0.08,
                            right: '5%',
                            top: '20%',
                        }}
                    />
                </motion.div>

                <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    
                    {/* PHASE 1 & 2: Text + Visualization - CENTERED layout that floats */}
                    <motion.div
                        className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                            isAlternate ? '' : 'lg:[direction:rtl] lg:*:[direction:ltr]'
                        }`}
                        style={{ 
                            opacity: textOpacity, 
                            y: textY,
                            // For interface stages: float down and left, shrink
                            x: stage.hasInterface ? textFloatX : 0,
                            scale: stage.hasInterface ? textFloatScale : 1,
                        }}
                    >
                        {/* Text Content - floats down for interface stages */}
                        <motion.div 
                            className={`space-y-6 ${
                                (stage.id === "rapport" || stage.id === "sales-coach") ? "-ml-4" : ""
                            }`}
                            style={{ y: stage.hasInterface ? textFloatY : 0 }}
                        >
                            <div className="flex items-center gap-3">
                                <span 
                                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold"
                                    style={{ 
                                        backgroundColor: `${stage.accentColor}20`,
                                        color: stage.accentColor,
                                        border: `1px solid ${stage.accentColor}40`
                                    }}
                                >
                                    {stage.number}
                                </span>
                                <span className="text-xs tracking-[0.2em] text-white/40 uppercase">
                                    {stage.label}
                                </span>
                            </div>

                            <h3 className={`font-bold text-white ${
                                (stage.id === "rapport" || stage.id === "sales-coach") 
                                    ? "text-6xl md:text-7xl lg:text-8xl" 
                                    : "text-4xl md:text-5xl lg:text-6xl"
                            }`}>
                                {stage.title}
                            </h3>
                            <p 
                                className={`font-medium ${
                                    (stage.id === "rapport" || stage.id === "sales-coach")
                                        ? "text-3xl md:text-4xl"
                                        : "text-xl md:text-2xl"
                                }`}
                                style={{ color: stage.accentColor }}
                            >
                                {stage.subtitle}
                            </p>
                            <p className={`text-white/50 leading-relaxed ${
                                (stage.id === "rapport" || stage.id === "sales-coach")
                                    ? "text-2xl max-w-2xl"
                                    : "text-lg max-w-lg"
                            }`}>
                                {stage.description}
                            </p>

                            {/* Button - shown for stages with buttonLabel */}
                            {stage.buttonLabel && (
                                <motion.div 
                                    className="relative pt-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    {/* Glow behind button */}
                                    <motion.div 
                                        className="absolute inset-0 rounded-xl blur-xl"
                                        style={{ backgroundColor: stage.accentColor }}
                                        animate={{ 
                                            opacity: [0.2, 0.4, 0.2],
                                            scale: [1, 1.05, 1]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                    
                                    {/* Button */}
                                    <div 
                                        className="relative flex items-center gap-4 p-5 bg-white border-2 rounded-2xl shadow-2xl max-w-[380px]"
                                        style={{ borderColor: stage.accentColor }}
                                    >
                                        <div 
                                            className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{ backgroundColor: `${stage.accentColor}20`, color: stage.accentColor }}
                                        >
                                            <Phone className="w-7 h-7" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-lg text-stone-800">{stage.buttonLabel}</p>
                                            <p className="text-base text-stone-500">{stage.buttonSubtext}</p>
                                        </div>
                                        <ChevronRight className="w-6 h-6 text-stone-400" />
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>

                        {/* PHASE 2: AI Visualization - fades out for interface stages */}
                        <motion.div
                            className={`relative z-10 ${
                                (stage.id === "rapport" || stage.id === "sales-coach") ? "-ml-8" : ""
                            }`}
                            style={{ 
                                opacity: vizOpacity, 
                                scale: vizScale,
                                y: vizY
                            }}
                        >
                            <div 
                                className={`relative rounded-2xl overflow-hidden ${
                                    (stage.id === "rapport" || stage.id === "sales-coach") 
                                        ? "aspect-[4/3] scale-110" 
                                        : "aspect-[4/3]"
                                }`}
                                style={{
                                    background: `linear-gradient(135deg, ${stage.accentColor}10, ${stage.accentColor}02)`,
                                    border: `1px solid ${stage.accentColor}25`,
                                    boxShadow: `0 0 100px ${stage.accentColor}15, inset 0 0 80px ${stage.accentColor}05`
                                }}
                            >
                                {/* Grid pattern */}
                                <div 
                                    className="absolute inset-0 opacity-[0.04]"
                                    style={{
                                        backgroundImage: `linear-gradient(${stage.accentColor} 1px, transparent 1px), linear-gradient(90deg, ${stage.accentColor} 1px, transparent 1px)`,
                                        backgroundSize: '32px 32px'
                                    }}
                                />
                                
                                {/* Stage visualization */}
                                <div className="relative w-full h-full">
                                    <StageComponent progress={0} />
                                </div>

                                {/* Label */}
                                <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
                                    <span className="text-white/50 text-xs font-medium">How it works</span>
                                </div>

                                {/* Corner glow */}
                                <div 
                                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl"
                                    style={{ backgroundColor: `${stage.accentColor}20` }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* PHASE 2B & 3: Panel floats in, then morphs into place on viewport */}
                    {stage.hasInterface && stage.id === "rapport" && (
                        <>
                            {/* App Context - fades in around the panel */}
                            <motion.div 
                                className="absolute inset-0 flex items-center justify-center"
                                style={{ 
                                    opacity: viewportContextOpacity,
                                    scale: viewportContextScale,
                                    filter: viewportBlurFilter,
                                    x: viewportX
                                }}
                            >
                                <LinkAIAppContext accentColor={stage.accentColor} stageId={stage.id} />
                            </motion.div>

                            {/* Floating Panel - morphs from center to right position */}
                            <motion.div 
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                style={{ 
                                    opacity: focusedPanelOpacity,
                                    filter: focusedPanelBlurFilter
                                }}
                            >
                                {/* The Panel itself - floats and morphs into position */}
                                <motion.div 
                                    className="relative"
                                    style={{ 
                                        scale: panelScale,
                                        x: panelX,
                                        y: panelY,
                                    }}
                                >
                                    <RapportBuilderPresentation accentColor={stage.accentColor} contentScrollY={panelContentScroll} />
                                </motion.div>
                            </motion.div>
                        </>
                    )}
                    
                    {/* SALES COACH: Objection → Menu → Response → Viewport */}
                    {stage.hasInterface && stage.id === "sales-coach" && (
                        <>
                            {/* Phase 1: Objection Bubble - appears first */}
                            <motion.div 
                                className="absolute inset-0 flex items-center justify-center"
                                style={{ 
                                    opacity: objectionOpacity,
                                    perspective: 1000,
                                    x: objectionX,
                                }}
                            >
                                <motion.div
                                    style={{
                                        scale: objectionScale,
                                        rotateY: objectionRotateY,
                                        transformStyle: "preserve-3d",
                                    }}
                                >
                                    <ObjectionBubble accentColor={stage.accentColor} />
                                </motion.div>
                            </motion.div>

                            {/* Phase 2: Sales Coach Menu - shows options */}
                            <motion.div 
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                style={{ 
                                    opacity: menuPanelOpacity,
                                    perspective: 1000,
                                    x: menuPanelX,
                                }}
                            >
                                <motion.div
                                    style={{
                                        rotateY: menuPanelRotateY,
                                        transformStyle: "preserve-3d",
                                    }}
                                >
                                    <SalesCoachMenuPanel accentColor={stage.accentColor} />
                                </motion.div>
                            </motion.div>

                            {/* Phase 3: Sales Coach Response Panel - flips in with answer */}
                            <motion.div 
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                style={{ 
                                    opacity: focusedPanelOpacity,
                                    filter: focusedPanelBlurFilter,
                                    perspective: 1000,
                                }}
                            >
                                <motion.div 
                                    className="relative"
                                    style={{ 
                                        scale: panelScale,
                                        x: panelX,
                                        y: panelY,
                                        rotateY: salesCoachPanelRotateY,
                                        transformStyle: "preserve-3d",
                                    }}
                                >
                                    <SalesCoachPresentation accentColor={stage.accentColor} contentScrollY={panelContentScroll} />
                                </motion.div>
                            </motion.div>

                            {/* Phase 4: App Context - fades in around the panel */}
                            <motion.div 
                                className="absolute inset-0 flex items-center justify-center"
                                style={{ 
                                    opacity: viewportContextOpacity,
                                    scale: viewportContextScale,
                                    filter: viewportBlurFilter,
                                    x: viewportX
                                }}
                            >
                                <LinkAIAppContext accentColor={stage.accentColor} stageId={stage.id} />
                            </motion.div>
                        </>
                    )}

                    {/* VALUATION AI: Source Cards Converge → Panel → Viewport */}
                    {stage.hasInterface && stage.id === "valuation" && (
                        <>
                            {/* Phase 1: Source Cards - converge from corners */}
                            <motion.div 
                                className="absolute inset-0 flex items-center justify-center"
                                style={{ 
                                    opacity: sourceCardsOpacity,
                                    x: 80, // Offset to match other panels
                                }}
                            >
                                <ValuationSourceCards 
                                    accentColor={stage.accentColor} 
                                    convergenceProgress={convergenceProgress}
                                />
                            </motion.div>

                            {/* Phase 2: Valuation Panel - appears after cards converge */}
                            <motion.div 
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                style={{ 
                                    opacity: valuationPanelOpacity,
                                    filter: valuationPanelBlurFilter,
                                }}
                            >
                                <motion.div 
                                    className="relative"
                                    style={{ 
                                        scale: valuationPanelScale,
                                        x: valuationPanelX,
                                        y: panelY,
                                    }}
                                >
                                    <ValuationAIPresentation accentColor={stage.accentColor} contentScrollY={panelContentScroll} />
                                </motion.div>
                            </motion.div>

                            {/* Phase 3: App Context - fades in around the panel */}
                            <motion.div 
                                className="absolute inset-0 flex items-center justify-center"
                                style={{ 
                                    opacity: viewportContextOpacity,
                                    scale: viewportContextScale,
                                    filter: viewportBlurFilter,
                                    x: viewportX
                                }}
                            >
                                <LinkAIAppContext accentColor={stage.accentColor} stageId={stage.id} />
                            </motion.div>
                        </>
                    )}

                    {/* For other interface stages (not rapport, not sales-coach, not valuation) */}
                    {stage.hasInterface && stage.id !== "rapport" && stage.id !== "sales-coach" && stage.id !== "valuation" && (
                        <motion.div 
                            className="absolute inset-0 flex items-center justify-center px-8 md:px-16"
                            style={{ 
                                opacity: focusedPanelOpacity,
                                filter: focusedPanelBlurFilter
                            }}
                        >
                            <DefaultInterfaceReveal stage={stage} />
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Default Interface reveal component for non-Rapport stages
function DefaultInterfaceReveal({ stage }: { stage: StageConfig }) {
    return (
        <div className="px-6 md:px-12">
            <div className="max-w-[1380px] mx-auto">
                {/* Device frame */}
                <div 
                    className="relative rounded-2xl overflow-hidden"
                    style={{
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
                        border: `1px solid ${stage.accentColor}30`,
                        boxShadow: `0 0 120px ${stage.accentColor}20, 0 30px 60px rgba(0,0,0,0.6)`
                    }}
                >
                    {/* Browser chrome */}
                    <div className="flex items-center gap-3 px-5 py-4 bg-white/5 border-b border-white/10">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-white/20" />
                            <div className="w-3 h-3 rounded-full bg-white/20" />
                            <div className="w-3 h-3 rounded-full bg-white/20" />
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="px-6 py-1.5 rounded-lg bg-white/5 border border-white/10">
                                <span className="text-white/40 text-sm">app.linkai.io</span>
                            </div>
                        </div>
                        <div className="w-20" /> {/* Spacer for symmetry */}
                    </div>

                    {/* Screenshot area */}
                    <div className="relative aspect-[16/10] bg-gradient-to-br from-black/80 to-black/60">
                        {stage.interfacePlaceholder ? (
                            <Image
                                src={stage.interfacePlaceholder}
                                alt={`${stage.title} Interface`}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <div 
                                    className="w-24 h-24 rounded-2xl flex items-center justify-center mb-6"
                                    style={{ 
                                        backgroundColor: `${stage.accentColor}10`,
                                        border: `2px dashed ${stage.accentColor}30`
                                    }}
                                >
                                    <span className="text-4xl">📸</span>
                                </div>
                                <p className="text-white/40 text-lg font-medium mb-2">Interface Preview</p>
                                <p className="text-white/25 text-sm">Screenshot will be added here</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Floating glow behind */}
                <div 
                    className="absolute -inset-8 -z-10 rounded-3xl blur-3xl"
                    style={{ backgroundColor: `${stage.accentColor}15` }}
                />
            </div>
        </div>
    );
}

// LinkAI App Viewport - Shows the dashboard with panel overlaid
// App context WITHOUT the panel - for the floating puzzle piece effect
function LinkAIAppContext({ accentColor, stageId }: { accentColor: string; stageId?: string }) {
    return (
        <div className="relative w-full max-w-[1380px] mx-auto">
            {/* Browser-like viewport */}
            <div 
                className="rounded-xl overflow-hidden shadow-2xl border border-white/10"
                style={{ boxShadow: `0 0 80px ${accentColor}15, 0 40px 60px rgba(0,0,0,0.5)` }}
            >
                {/* Browser chrome */}
                <div className="bg-[#1a1a1a] px-4 py-2.5 flex items-center gap-3 border-b border-white/5">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                    </div>
                    <div className="flex-1 bg-[#2a2a2a] rounded-md px-4 py-1.5 text-xs text-white/50 flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        app.linkai.com/dashboard
                    </div>
                </div>

                {/* App content - Dashboard with EMPTY space for panel */}
                <div className="flex bg-[#f5f5f7] h-[650px]">
                    {/* Sidebar */}
                    <div className="w-16 bg-[#1a1a2e] flex flex-col items-center py-4 gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">L</span>
                        </div>
                        <div className="flex-1 flex flex-col gap-2 mt-2">
                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </div>
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                        {/* AI Assistant indicator - glowing */}
                        <motion.div 
                            className="w-10 h-10 rounded-lg bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center"
                            animate={{ 
                                boxShadow: [
                                    '0 0 0 0 rgba(217, 70, 239, 0)',
                                    '0 0 20px 4px rgba(217, 70, 239, 0.4)',
                                    '0 0 0 0 rgba(217, 70, 239, 0)'
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </motion.div>
                    </div>

                    {/* Main dashboard area */}
                    <div className="flex-1 p-4 overflow-hidden">
                        {/* Header bar */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-[#1d1d1f]">Merged Credit Report - All Bureaus</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-[#86868b] bg-white px-3 py-1 rounded-lg">Equifax 655</span>
                                <span className="text-xs text-[#86868b] bg-white px-3 py-1 rounded-lg">Experian 645</span>
                                <span className="text-xs text-[#86868b] bg-white px-3 py-1 rounded-lg">Transunion 655</span>
                            </div>
                        </div>

                        {/* Credit utilization bar */}
                        <div className="bg-white rounded-xl p-4 mb-3 shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-medium text-[#1d1d1f]">Overall Revolving Credit Utilization</span>
                                <span className="text-xs text-[#86868b]">5 accounts</span>
                            </div>
                            <div className="flex items-center gap-6 text-xs">
                                <div><span className="text-[#86868b]">Limit</span> <span className="font-semibold text-[#1d1d1f]">$31,500</span></div>
                                <div><span className="text-[#86868b]">Balance</span> <span className="font-semibold text-red-500">$13,950</span></div>
                                <div><span className="text-[#86868b]">Available</span> <span className="font-semibold text-green-500">$17,550</span></div>
                                <div><span className="text-[#86868b]">Utilization</span> <span className="font-semibold text-orange-500">44.3%</span></div>
                            </div>
                            <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-orange-400" style={{ width: '44.3%' }}></div>
                            </div>
                        </div>

                        {/* GoodLeap Loan */}
                        <div className="bg-blue-50 rounded-xl p-3 mb-3 border border-blue-100">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-4 h-4 rounded bg-blue-500 flex items-center justify-center">
                                    <span className="text-white text-[8px] font-bold">GL</span>
                                </div>
                                <span className="text-xs font-medium text-blue-700">Current GoodLeap Loan</span>
                            </div>
                            <div className="flex gap-6 text-xs">
                                <div><span className="text-blue-600/60">Account</span> <span className="font-mono text-blue-800">CF-1234567</span></div>
                                <div><span className="text-blue-600/60">Balance</span> <span className="font-semibold text-blue-800">$42,000.00</span></div>
                                <div><span className="text-blue-600/60">Rate</span> <span className="text-blue-800">6.750%</span></div>
                            </div>
                        </div>

                        {/* Accounts table */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="px-4 py-2 border-b border-black/5 flex items-center justify-between">
                                <span className="text-xs font-medium text-[#1d1d1f]">Open Accounts</span>
                                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">9 Accounts</span>
                            </div>
                            <div className="text-[10px]">
                                <div className="grid grid-cols-7 gap-2 px-4 py-2 border-b border-black/5 text-[#86868b] font-medium">
                                    <span>ECOA</span><span>Account</span><span>Creditor</span><span>Type</span><span>Balance</span><span>Payment</span><span>Rate</span>
                                </div>
                                {[
                                    ['Borrower', '401...', 'REGIONS', 'Mortgage', '$247,500', '$1,710', '3.75%'],
                                    ['Borrower', '517...', 'PENFED', 'Mortgage', '$180,000', '$1,250', '4.25%'],
                                    ['Borrower', 'AU...', 'CHASE', 'Installment', '$18,000', '$450', '6.9%'],
                                    ['Borrower', 'L2...', '5/3 DIVI', 'Installment', '$12,645', '$121', '5.5%'],
                                    ['Co-Borr', '517...', 'WFBNA', 'Installment', '$11,219', '$446', '7.2%'],
                                ].map((row, i) => (
                                    <div key={i} className="grid grid-cols-7 gap-2 px-4 py-1.5 border-b border-black/5 items-center">
                                        <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-[9px] font-medium w-fit">{row[0]}</span>
                                        <span className="text-[#1d1d1f]">{row[1]}</span>
                                        <span className="text-[#1d1d1f] truncate">{row[2]}</span>
                                        <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[9px] w-fit">{row[3]}</span>
                                        <span className="font-medium text-[#1d1d1f]">{row[4]}</span>
                                        <span className="text-[#1d1d1f]">{row[5]}</span>
                                        <span className="text-[#1d1d1f]">{row[6]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right panel - changes based on stageId */}
                    <div className="w-[320px] bg-white border-l border-black/5 flex flex-col overflow-hidden">
                        {stageId === "valuation" ? (
                            <>
                                {/* Valuation AI Header */}
                                <div className="px-4 py-3 bg-white border-b border-black/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h1 className="text-sm font-bold text-[#1d1d1f]">Property AVM</h1>
                                            <p className="text-[10px] text-[#86868b]">Working Value for AUS</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-3 py-1.5 bg-amber-50 border-b border-amber-100">
                                    <p className="text-[10px] text-amber-700"><span className="font-semibold">AI-Generated</span> - Verify with appraisal</p>
                                </div>
                                <div className="flex-1 p-3 bg-[#f5f5f7] space-y-3 overflow-auto">
                                    {/* AUS Recommended */}
                                    <div className="p-3 bg-white rounded-xl border-2 border-green-500">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-bold text-green-700 uppercase">AUS Recommended</span>
                                            <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">High</span>
                                        </div>
                                        <p className="text-2xl font-bold text-[#1d1d1f]">$785,000</p>
                                        <p className="text-[9px] text-green-600 mt-1">✓ Selected for AUS</p>
                                    </div>
                                    {/* Source Comparison */}
                                    <div className="p-3 bg-white rounded-xl border border-black/5">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-bold text-[#1d1d1f] uppercase">Source Comparison</span>
                                            <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">4%</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="text-center p-2 rounded-lg bg-purple-50">
                                                <p className="text-[9px] text-purple-700 font-semibold">Internal</p>
                                                <p className="text-sm font-bold text-purple-700">$785K</p>
                                            </div>
                                            <div className="text-center p-2 rounded-lg bg-blue-50">
                                                <p className="text-[9px] text-blue-700 font-semibold">Zillow</p>
                                                <p className="text-sm font-bold text-blue-700">$769K</p>
                                            </div>
                                            <div className="text-center p-2 rounded-lg bg-red-50">
                                                <p className="text-[9px] text-red-700 font-semibold">Redfin</p>
                                                <p className="text-sm font-bold text-red-700">$801K</p>
                                            </div>
                                            <div className="text-center p-2 rounded-lg bg-slate-50">
                                                <p className="text-[9px] text-slate-700 font-semibold">Realtor</p>
                                                <p className="text-sm font-bold text-slate-700">$777K</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Underwriting Ready */}
                                    <div className="p-2.5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                                        <p className="text-[10px] text-green-700 font-medium mb-1">✓ Underwriting Ready</p>
                                        <p className="text-[9px] text-green-600/80">Low variance, multiple sources confirmed.</p>
                                    </div>
                                </div>
                            </>
                        ) : stageId === "rapport" ? (
                            <>
                                {/* Rapport Builder Header */}
                                <div className="px-4 py-3 bg-white border-b border-black/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h1 className="text-sm font-bold text-[#1d1d1f]">Call Prep Brief</h1>
                                            <p className="text-[10px] text-[#86868b]">Everything for the first 5 min</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-3 py-1.5 bg-fuchsia-50 border-b border-fuchsia-100">
                                    <p className="text-[10px] text-fuchsia-700"><span className="font-semibold">AI-Assembled</span> - Verify all info</p>
                                </div>
                                <div className="flex-1 p-3 bg-[#f5f5f7] space-y-2 overflow-auto">
                                    <div className="p-2.5 bg-white rounded-lg border border-black/5">
                                        <p className="text-[9px] text-[#86868b] uppercase font-semibold mb-1">Property</p>
                                        <p className="text-sm font-bold text-[#1d1d1f]">$785K</p>
                                        <p className="text-[10px] text-[#86868b]">2116 Shrewsbury Dr</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="p-2.5 bg-white rounded-lg border border-black/5">
                                            <p className="text-[9px] text-[#86868b] uppercase font-semibold">Total Liens</p>
                                            <p className="text-sm font-bold text-[#1d1d1f]">$428K</p>
                                        </div>
                                        <div className="p-2.5 bg-white rounded-lg border border-black/5">
                                            <p className="text-[9px] text-[#86868b] uppercase font-semibold">Equity</p>
                                            <p className="text-sm font-bold text-green-600">$358K</p>
                                        </div>
                                    </div>
                                    <div className="p-2.5 bg-gradient-to-br from-fuchsia-50 to-purple-50 rounded-lg border border-fuchsia-200">
                                        <p className="text-[10px] text-fuchsia-700 font-medium mb-1">🎯 Talk Track Ready</p>
                                        <p className="text-[9px] text-fuchsia-600/80">Personalized context for John Doe.</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Sales Coach Header (default) */}
                                <div className="px-4 py-3 bg-white border-b border-black/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h1 className="text-sm font-bold text-[#1d1d1f]">Sales Coach</h1>
                                            <p className="text-[10px] text-[#86868b]">Objection Handling & Benefit Calc</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-3 py-1.5 bg-amber-50 border-b border-amber-100">
                                    <p className="text-[10px] text-amber-700"><span className="font-semibold">AI Sales Coach</span> - Personalized guidance</p>
                                </div>
                                <div className="flex-1 p-3 bg-[#f5f5f7] space-y-3 overflow-auto">
                                    <div>
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <div className="w-4 h-4 rounded bg-rose-100 flex items-center justify-center">
                                                <svg className="w-2.5 h-2.5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <path d="M12 17h.01" />
                                                </svg>
                                            </div>
                                            <h3 className="text-[10px] font-semibold text-[#1d1d1f]">Handle Objections</h3>
                                        </div>
                                        <div className="grid grid-cols-2 gap-1.5">
                                            <div className="p-2 bg-white rounded-lg border border-black/5">
                                                <p className="text-[10px] font-medium text-[#1d1d1f]">What do you see?</p>
                                            </div>
                                            <motion.div 
                                                className="p-2 bg-rose-50 rounded-lg border border-rose-300"
                                                animate={{ boxShadow: ['0 0 0 0 rgba(244,63,94,0)', '0 0 8px 2px rgba(244,63,94,0.3)', '0 0 0 0 rgba(244,63,94,0)'] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                <p className="text-[10px] font-medium text-rose-700">Rate too high</p>
                                            </motion.div>
                                            <div className="p-2 bg-white rounded-lg border border-black/5">
                                                <p className="text-[10px] font-medium text-[#1d1d1f]">Closing costs</p>
                                            </div>
                                            <div className="p-2 bg-white rounded-lg border border-black/5">
                                                <p className="text-[10px] font-medium text-[#1d1d1f]">Wants to wait</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <div className="w-4 h-4 rounded bg-teal-100 flex items-center justify-center">
                                                <svg className="w-2.5 h-2.5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <rect width="16" height="20" x="4" y="2" rx="2" />
                                                    <line x1="8" x2="16" y1="6" y2="6" />
                                                </svg>
                                            </div>
                                            <h3 className="text-[10px] font-semibold text-[#1d1d1f]">Calculate Benefits</h3>
                                        </div>
                                        <div className="grid grid-cols-2 gap-1.5">
                                            <div className="p-2 bg-white rounded-lg border border-black/5">
                                                <p className="text-[10px] font-medium text-[#1d1d1f]">Blended rate</p>
                                            </div>
                                            <div className="p-2 bg-white rounded-lg border border-black/5">
                                                <p className="text-[10px] font-medium text-[#1d1d1f]">Cash flow</p>
                                            </div>
                                            <div className="p-2 bg-white rounded-lg border border-black/5">
                                                <p className="text-[10px] font-medium text-[#1d1d1f]">Credit impact</p>
                                            </div>
                                            <div className="p-2 bg-white rounded-lg border border-black/5">
                                                <p className="text-[10px] font-medium text-[#1d1d1f]">Interest savings</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-2.5 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg border border-orange-200">
                                        <p className="text-[10px] text-orange-700 font-medium mb-1">💡 Answer similar questions</p>
                                        <p className="text-[9px] text-orange-600/80">Overcome objections with data-backed responses.</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function LinkAIAppViewport({ accentColor }: { accentColor: string }) {
    return (
        <div className="relative">
            {/* Browser-like viewport */}
            <div 
                className="rounded-xl overflow-hidden shadow-2xl border border-white/10"
                style={{ boxShadow: `0 0 80px ${accentColor}15, 0 40px 60px rgba(0,0,0,0.5)` }}
            >
                {/* Browser chrome */}
                <div className="bg-[#1a1a1a] px-4 py-2.5 flex items-center gap-3 border-b border-white/5">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                    </div>
                    <div className="flex-1 bg-[#2a2a2a] rounded-md px-4 py-1.5 text-xs text-white/50 flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        app.linkai.com/dashboard
                    </div>
                </div>

                {/* App content - Dashboard with Panel */}
                <div className="flex bg-[#f5f5f7] h-[650px]">
                    {/* Sidebar */}
                    <div className="w-16 bg-[#1a1a2e] flex flex-col items-center py-4 gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">L</span>
                        </div>
                        <div className="flex-1 flex flex-col gap-2 mt-2">
                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </div>
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                        {/* AI Assistant indicator - glowing */}
                        <motion.div 
                            className="w-10 h-10 rounded-lg bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center"
                            animate={{ 
                                boxShadow: [
                                    '0 0 0 0 rgba(217, 70, 239, 0)',
                                    '0 0 20px 4px rgba(217, 70, 239, 0.4)',
                                    '0 0 0 0 rgba(217, 70, 239, 0)'
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </motion.div>
                    </div>

                    {/* Main dashboard area */}
                    <div className="flex-1 p-4 overflow-hidden">
                        {/* Header bar */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-[#1d1d1f]">Merged Credit Report - All Bureaus</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-[#86868b] bg-white px-3 py-1 rounded-lg">Equifax 655</span>
                                <span className="text-xs text-[#86868b] bg-white px-3 py-1 rounded-lg">Experian 645</span>
                                <span className="text-xs text-[#86868b] bg-white px-3 py-1 rounded-lg">Transunion 655</span>
                            </div>
                        </div>

                        {/* Credit utilization bar */}
                        <div className="bg-white rounded-xl p-4 mb-3 shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-medium text-[#1d1d1f]">Overall Revolving Credit Utilization</span>
                                <span className="text-xs text-[#86868b]">5 accounts</span>
                            </div>
                            <div className="flex items-center gap-6 text-xs">
                                <div><span className="text-[#86868b]">Limit</span> <span className="font-semibold text-[#1d1d1f]">$31,500</span></div>
                                <div><span className="text-[#86868b]">Balance</span> <span className="font-semibold text-red-500">$13,950</span></div>
                                <div><span className="text-[#86868b]">Available</span> <span className="font-semibold text-green-500">$17,550</span></div>
                                <div><span className="text-[#86868b]">Utilization</span> <span className="font-semibold text-orange-500">44.3%</span></div>
                            </div>
                            <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-orange-400" style={{ width: '44.3%' }}></div>
                            </div>
                        </div>

                        {/* GoodLeap Loan */}
                        <div className="bg-blue-50 rounded-xl p-3 mb-3 border border-blue-100">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-4 h-4 rounded bg-blue-500 flex items-center justify-center">
                                    <span className="text-white text-[8px] font-bold">GL</span>
                                </div>
                                <span className="text-xs font-medium text-blue-700">Current GoodLeap Loan</span>
                            </div>
                            <div className="flex gap-6 text-xs">
                                <div><span className="text-blue-600/60">Account</span> <span className="font-mono text-blue-800">CF-1234567</span></div>
                                <div><span className="text-blue-600/60">Balance</span> <span className="font-semibold text-blue-800">$42,000.00</span></div>
                                <div><span className="text-blue-600/60">Rate</span> <span className="text-blue-800">6.750%</span></div>
                            </div>
                        </div>

                        {/* Accounts table */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="px-4 py-2 border-b border-black/5 flex items-center justify-between">
                                <span className="text-xs font-medium text-[#1d1d1f]">Open Accounts</span>
                                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">9 Accounts</span>
                            </div>
                            <div className="text-[10px]">
                                <div className="grid grid-cols-7 gap-2 px-4 py-2 border-b border-black/5 text-[#86868b] font-medium">
                                    <span>ECOA</span><span>Account</span><span>Creditor</span><span>Type</span><span>Balance</span><span>Payment</span><span>Rate</span>
                                </div>
                                {[
                                    ['Borrower', '401...', 'REGIONS', 'Mortgage', '$247,500', '$1,710', '3.75%'],
                                    ['Borrower', '517...', 'PENFED', 'Mortgage', '$180,000', '$1,250', '4.25%'],
                                    ['Borrower', 'AU...', 'CHASE', 'Installment', '$18,000', '$450', '6.9%'],
                                    ['Borrower', 'L2...', '5/3 DIVI', 'Installment', '$12,645', '$121', '5.5%'],
                                    ['Co-Borr', '517...', 'WFBNA', 'Installment', '$11,219', '$446', '7.2%'],
                                ].map((row, i) => (
                                    <div key={i} className="grid grid-cols-7 gap-2 px-4 py-1.5 border-b border-black/5 items-center">
                                        <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-[9px] font-medium w-fit">{row[0]}</span>
                                        <span className="text-[#1d1d1f]">{row[1]}</span>
                                        <span className="text-[#1d1d1f] truncate">{row[2]}</span>
                                        <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[9px] w-fit">{row[3]}</span>
                                        <span className="font-medium text-[#1d1d1f]">{row[4]}</span>
                                        <span className="text-[#1d1d1f]">{row[5]}</span>
                                        <span className="text-[#1d1d1f]">{row[6]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* AI Panel - Slide out from right */}
                    <motion.div 
                        className="w-[300px] bg-white border-l border-black/5 flex flex-col shadow-[-20px_0_40px_-10px_rgba(0,0,0,0.15)]"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        {/* Panel Header */}
                        <div className="px-4 py-3 border-b border-black/5 flex items-center justify-between flex-shrink-0">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                    <Phone className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-[#1d1d1f]">Call Prep Brief</h3>
                                    <p className="text-[10px] text-[#86868b]">Everything for the first 5 mins</p>
                                </div>
                            </div>
                            <button className="p-1.5 hover:bg-black/5 rounded-lg">
                                <svg className="w-4 h-4 text-[#86868b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* AI Warning */}
                        <div className="px-3 py-1.5 bg-amber-50 border-b border-amber-100 flex-shrink-0">
                            <p className="text-[10px] text-amber-700"><span className="font-semibold">AI-Generated</span> — Verify facts</p>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-3 space-y-3">
                            {/* Summary */}
                            <div className="p-3 bg-slate-50 rounded-lg">
                                <p className="text-xs text-[#1d1d1f] leading-relaxed">Near-prime borrower in McKinney, TX seeking debt consolidation options.</p>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-2">
                                <div className="p-2 bg-blue-50 rounded-lg text-center">
                                    <p className="text-sm font-bold text-blue-600">$785K</p>
                                    <p className="text-[9px] text-blue-600/70">Property</p>
                                </div>
                                <div className="p-2 bg-purple-50 rounded-lg text-center">
                                    <p className="text-sm font-bold text-purple-600">$428K</p>
                                    <p className="text-[9px] text-purple-600/70">Liens</p>
                                </div>
                                <div className="p-2 bg-green-50 rounded-lg text-center">
                                    <p className="text-sm font-bold text-green-600">$358K</p>
                                    <p className="text-[9px] text-green-600/70">Equity</p>
                                </div>
                            </div>

                            {/* More stats */}
                            <div className="grid grid-cols-3 gap-2">
                                <div className="p-2 bg-orange-50 rounded-lg text-center">
                                    <p className="text-sm font-bold text-orange-600">$56K</p>
                                    <p className="text-[9px] text-orange-600/70">Other Debt</p>
                                </div>
                                <div className="p-2 bg-red-50 rounded-lg text-center">
                                    <p className="text-sm font-bold text-red-600">$1,196</p>
                                    <p className="text-[9px] text-red-600/70">Monthly</p>
                                </div>
                                <div className="p-2 bg-slate-100 rounded-lg text-center">
                                    <p className="text-sm font-bold text-slate-700">608</p>
                                    <p className="text-[9px] text-slate-500">Credit</p>
                                </div>
                            </div>

                            {/* How We Can Help */}
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <svg className="w-3 h-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    <span className="text-xs font-semibold text-purple-700">How We Can Help</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] text-purple-700 flex items-center gap-1">
                                        <span className="text-purple-400">✓</span> Debt consolidation options
                                    </p>
                                    <p className="text-[10px] text-purple-700 flex items-center gap-1">
                                        <span className="text-purple-400">✓</span> Rate & term refinance
                                    </p>
                                    <p className="text-[10px] text-purple-700 flex items-center gap-1">
                                        <span className="text-purple-400">✓</span> Credit improvement
                                    </p>
                                </div>
                            </div>

                            {/* What We See */}
                            <div className="p-3 bg-amber-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <svg className="w-3 h-3 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                    <span className="text-xs font-semibold text-amber-700">What We See</span>
                                    <span className="text-[8px] bg-amber-200 text-amber-700 px-1.5 py-0.5 rounded-full">Credit Report</span>
                                </div>
                                <div className="space-y-1 text-[10px] text-amber-700">
                                    <p>① Equity assessment</p>
                                    <p>② Debt assessment</p>
                                    <p>③ Credit flags</p>
                                    <p>④ Complexity note</p>
                                </div>
                            </div>

                            {/* Local Context */}
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="text-xs font-semibold text-blue-700">Local Context</span>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-blue-700">
                                    <span>☁️ 54°F McKinney, TX</span>
                                    <span>•</span>
                                    <span className="text-green-600">↗ +5.5% YoY</span>
                                </div>
                            </div>

                            {/* Confirm on Call */}
                            <div className="p-3 bg-cyan-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <svg className="w-3 h-3 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-xs font-semibold text-cyan-700">Confirm on Call</span>
                                </div>
                                <div className="space-y-1 text-[10px] text-cyan-700">
                                    <p>• Employment status</p>
                                    <p>• Monthly income</p>
                                    <p>• Upcoming expenses</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

// Premium Rapport Builder Presentation - Full Panel with all sections
function RapportBuilderPresentation({ accentColor, contentScrollY }: { accentColor: string; contentScrollY?: any }) {
    return (
        <div className="relative w-[700px]">
            {/* Outer glow */}
            <motion.div 
                className="absolute -inset-4 rounded-2xl blur-2xl -z-10"
                style={{ backgroundColor: `${accentColor}25` }}
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Panel container - clips content properly */}
            <div 
                className="rounded-xl bg-white flex flex-col h-[85vh] max-h-[880px] overflow-hidden"
                style={{ boxShadow: `0 0 60px ${accentColor}20, 0 25px 50px rgba(0,0,0,0.4)` }}
            >
                {/* Header */}
                <div className="px-6 py-5 bg-white border-b border-black/5 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                <Phone className="w-[22px] h-[22px] text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-[#1d1d1f] tracking-tight">Call Prep Brief</h1>
                                <p className="text-sm text-[#86868b]">Everything you need for the first 5 minutes</p>
                            </div>
                        </div>
                        <button className="p-2 rounded-lg border border-black/10 hover:bg-black/5">
                            <svg className="w-4 h-4 text-[#86868b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* AI Warning Banner */}
                <div className="px-4 py-2 bg-amber-50 border-b border-amber-100 flex-shrink-0">
                    <p className="text-xs text-amber-700"><span className="font-semibold">AI-Generated</span> — Verify all facts</p>
                </div>

                {/* Scrollable Content - auto-scrolls as page scrolls */}
                <div className="flex-1 overflow-hidden">
                    <motion.div 
                        className="p-6 bg-[#f5f5f7]"
                        style={{ y: contentScrollY || 0 }}
                    >
                    <div className="space-y-4 max-w-2xl mx-auto">
                        {/* Summary Card with copy */}
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <div className="flex items-start justify-between gap-4">
                                <p className="text-lg font-medium text-[#1d1d1f] leading-relaxed">
                                    The customer is a near-prime borrower in McKinney, TX, looking for options to manage their debt and improve their financial situation.
                                </p>
                                <button className="p-2 rounded-lg hover:bg-black/5 flex-shrink-0">
                                    <svg className="w-[18px] h-[18px] text-[#86868b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" strokeWidth={2}></rect>
                                        <path strokeWidth={2} d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                                    </svg>
                                </button>
                            </div>
                            <p className="text-xs text-[#86868b] mt-3">Press <kbd className="px-1.5 py-0.5 bg-black/5 rounded text-[10px] font-mono">C</kbd> to copy</p>
                        </div>

                        {/* Financial Stats Row 1 */}
                        <div className="grid grid-cols-3 gap-3">
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                                <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center mb-3">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                </div>
                                <p className="text-2xl font-bold text-[#1d1d1f]">$785K</p>
                                <p className="text-xs text-[#86868b] mt-1">Property Value</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                                <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center mb-3">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <p className="text-2xl font-bold text-[#1d1d1f]">$428K</p>
                                <p className="text-xs text-[#86868b] mt-1">Total Liens</p>
                            </div>
                            <div className="bg-green-50 rounded-xl p-4 shadow-sm border border-green-100">
                                <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center mb-3">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                                <p className="text-2xl font-bold text-green-600">$358K</p>
                                <p className="text-xs text-green-700 mt-1">Equity</p>
                            </div>
                        </div>

                        {/* Financial Stats Row 2 */}
                        <div className="grid grid-cols-3 gap-3">
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                                <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center mb-3">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <rect width="20" height="14" x="2" y="5" rx="2" strokeWidth={2}></rect>
                                        <line x1="2" x2="22" y1="10" y2="10" strokeWidth={2}></line>
                                    </svg>
                                </div>
                                <p className="text-2xl font-bold text-[#1d1d1f]">$56K</p>
                                <p className="text-xs text-[#86868b] mt-1">Other Debt</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                                <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center mb-3">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <line x1="12" x2="12" y1="2" y2="22" strokeWidth={2}></line>
                                        <path strokeWidth={2} d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                    </svg>
                                </div>
                                <p className="text-2xl font-bold text-[#1d1d1f]">$1,196</p>
                                <p className="text-xs text-[#86868b] mt-1">Monthly</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center mb-3">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <p className="text-2xl font-bold text-[#1d1d1f]">608 / 650</p>
                                <p className="text-xs text-[#86868b] mt-1">Credit</p>
                            </div>
                        </div>

                        {/* How We Can Help */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                            <div className="p-5 bg-purple-50/50">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-semibold text-[#1d1d1f]">How We Can Help</h3>
                                </div>
                                <div className="space-y-3">
                                    {["explore debt consolidation options", "potential for rate and term refinance", "discuss credit improvement strategies"].map((item, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <svg className="w-[18px] h-[18px] text-purple-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="text-sm text-[#1d1d1f]">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="p-4 border-t border-black/5">
                                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-lg text-sm font-medium">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" strokeWidth={2}></circle>
                                        <circle cx="12" cy="12" r="6" strokeWidth={2}></circle>
                                        <circle cx="12" cy="12" r="2" strokeWidth={2}></circle>
                                    </svg>
                                    View Recommended Payoff Plan
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Suggested Talk Track */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                            <div className="p-5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-semibold text-[#1d1d1f]">Suggested Talk Track</h3>
                                </div>
                                <svg className="w-5 h-5 text-[#86868b] rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                            <div className="px-5 pb-5 space-y-3">
                                <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
                                    <p className="text-xs font-semibold text-orange-600 mb-2">Opening Line</p>
                                    <p className="text-sm text-[#1d1d1f] italic">&quot;Thank you for taking the time to speak with me today about your financial goals.&quot;</p>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                    <p className="text-xs font-semibold text-slate-600 mb-2">Discovery Questions</p>
                                    <div className="space-y-2">
                                        <p className="text-sm text-[#1d1d1f]">• &quot;What are your primary financial goals at this time?&quot;</p>
                                        <p className="text-sm text-[#1d1d1f]">• &quot;How do you feel about your current monthly payments and debts?&quot;</p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-green-50 border border-green-100">
                                    <p className="text-xs font-semibold text-green-600 mb-2">Value Statement</p>
                                    <p className="text-sm text-[#1d1d1f] italic">&quot;We can look into options that may simplify your payments and potentially lower your interest rates.&quot;</p>
                                </div>
                                <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                                    <p className="text-xs font-semibold text-blue-600 mb-2">Close for Next Step</p>
                                    <p className="text-sm text-[#1d1d1f] italic">&quot;Shall we schedule a follow-up to dive deeper into your options?&quot;</p>
                                </div>
                            </div>
                        </div>

                        {/* What We See */}
                        <div className="bg-white rounded-xl p-5 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-[#1d1d1f]">What We See</h3>
                                <span className="text-[10px] px-2 py-0.5 bg-gray-100 rounded-full text-gray-500">Credit Report</span>
                            </div>
                            <div className="space-y-2">
                                {["equity assessment", "debt assessment", "credit flags", "complexity note"].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                                        <p className="text-sm text-[#1d1d1f]">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Local Context */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                            <div className="p-5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-semibold text-[#1d1d1f]">Local Context</h3>
                                    <span className="text-[10px] px-2 py-0.5 bg-gray-100 rounded-full text-gray-500">Conversation Only</span>
                                </div>
                                <svg className="w-5 h-5 text-[#86868b] rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                            <div className="px-5 pb-5 space-y-4">
                                {/* Weather */}
                                <div className="p-4 rounded-xl bg-blue-50/70">
                                    <div className="flex items-center gap-3 mb-3">
                                        <svg className="w-7 h-7 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                        </svg>
                                        <div>
                                            <p className="text-lg font-semibold text-[#1d1d1f]">54°F</p>
                                            <p className="text-sm text-[#86868b]">Cloudy in McKinney, TX</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {[{d:"Thu",t:"56°",icon:"cloud"},{d:"Fri",t:"60°",icon:"sun"},{d:"Sat",t:"57°",icon:"sun"},{d:"Sun",t:"60°",icon:"cloud"},{d:"Mon",t:"55°",icon:"sun"}].map((day, i) => (
                                            <div key={i} className="flex-1 text-center p-2 rounded-lg bg-white/60">
                                                <p className="text-[10px] text-[#86868b]">{day.d}</p>
                                                {day.icon === "sun" ? (
                                                    <svg className="w-4 h-4 mx-auto text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <circle cx="12" cy="12" r="5" strokeWidth={2}></circle>
                                                        <path strokeWidth={2} d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
                                                    </svg>
                                                ) : (
                                                    <svg className="w-4 h-4 mx-auto text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                                    </svg>
                                                )}
                                                <p className="text-xs font-semibold text-[#1d1d1f]">{day.t}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Sports */}
                                <div>
                                    <p className="text-xs text-[#86868b] mb-2 flex items-center gap-2">
                                        <svg className="w-3 h-3 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                        </svg>
                                        Local Sports
                                    </p>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                                            <span className="text-[10px] px-2 py-0.5 bg-orange-100 text-orange-600 rounded font-medium">Cowboys</span>
                                            <p className="text-sm text-[#1d1d1f] flex-1">Follow the Cowboys this season</p>
                                            <span className="text-xs text-[#86868b]">Live</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                                            <span className="text-[10px] px-2 py-0.5 bg-orange-100 text-orange-600 rounded font-medium">Mavericks</span>
                                            <p className="text-sm text-[#1d1d1f] flex-1">Follow the Mavericks this season</p>
                                            <span className="text-xs text-[#86868b]">Live</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Market */}
                                <div className="p-4 rounded-xl bg-green-50/70">
                                    <p className="text-xs text-green-600 mb-2 flex items-center gap-2">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                        Local Market
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-[#1d1d1f]">Median: $540,104</span>
                                        <span className="text-[10px] px-2 py-0.5 bg-green-200 text-green-700 rounded-full font-medium">+5.5% YoY</span>
                                    </div>
                                    <p className="text-xs text-[#86868b] mt-1">Seller&apos;s Market • 42 avg days</p>
                                </div>
                            </div>
                        </div>

                        {/* Confirm on Call */}
                        <div className="bg-white rounded-xl p-5 shadow-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-[#1d1d1f]">Confirm on Call</h3>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-[#86868b]">• Current employment status</p>
                                <p className="text-sm text-[#86868b]">• Monthly income</p>
                                <p className="text-sm text-[#86868b]">• Any upcoming large expenses or financial changes</p>
                            </div>
                        </div>

                        {/* Footer note */}
                        <p className="text-xs text-[#86868b] text-center py-2">
                            Some interest rates estimated based on debt type. Property values from internal AVM.
                        </p>
                    </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

// SalesCoachMenuPanel - shows the options menu (Handle Objections + Calculate Benefits)
function SalesCoachMenuPanel({ accentColor }: { accentColor: string }) {
    return (
        <div className="relative w-[570px]">
            {/* Outer glow */}
            <motion.div 
                className="absolute -inset-4 rounded-2xl blur-2xl -z-10"
                style={{ backgroundColor: `${accentColor}20` }}
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Panel */}
            <div 
                className="rounded-xl bg-white overflow-hidden"
                style={{ boxShadow: `0 0 60px ${accentColor}15, 0 25px 50px rgba(0,0,0,0.3)` }}
            >
                {/* Header */}
                <div className="px-5 py-4 bg-white border-b border-black/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-[#1d1d1f]">Sales Coach</h1>
                            <p className="text-xs text-[#86868b]">Objection Handling & Benefit Calculation</p>
                        </div>
                    </div>
                </div>

                {/* AI Banner */}
                <div className="px-4 py-2 bg-amber-50 border-b border-amber-100">
                    <p className="text-xs text-amber-700"><span className="font-semibold">AI Sales Coach</span> - Uses your loan scenario data</p>
                </div>

                {/* Content */}
                <div className="p-5 bg-[#f5f5f7] space-y-4">
                    {/* Center icon */}
                    <div className="text-center py-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mx-auto mb-3">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                        </div>
                        <h2 className="text-base font-semibold text-[#1d1d1f]">How can I help you today?</h2>
                        <p className="text-xs text-[#86868b] mt-1">Select a topic for AI-powered guidance</p>
                    </div>

                    {/* Handle Objections */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-5 h-5 rounded-md bg-rose-100 flex items-center justify-center">
                                <svg className="w-3 h-3 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                    <path d="M12 17h.01" />
                                </svg>
                            </div>
                            <h3 className="text-xs font-semibold text-[#1d1d1f]">Handle Objections</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="p-2.5 bg-white rounded-lg border border-black/5 hover:border-rose-200 transition-colors">
                                <p className="text-xs font-medium text-[#1d1d1f]">What do you see?</p>
                            </div>
                            <div className="p-2.5 bg-white rounded-lg border border-rose-300 bg-rose-50/50">
                                <p className="text-xs font-medium text-rose-700">Rate too high objection</p>
                            </div>
                            <div className="p-2.5 bg-white rounded-lg border border-black/5">
                                <p className="text-xs font-medium text-[#1d1d1f]">Closing costs concern</p>
                            </div>
                            <div className="p-2.5 bg-white rounded-lg border border-black/5">
                                <p className="text-xs font-medium text-[#1d1d1f]">Wants to wait</p>
                            </div>
                        </div>
                    </div>

                    {/* Calculate Benefits */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-5 h-5 rounded-md bg-teal-100 flex items-center justify-center">
                                <svg className="w-3 h-3 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <rect width="16" height="20" x="4" y="2" rx="2" />
                                    <line x1="8" x2="16" y1="6" y2="6" />
                                </svg>
                            </div>
                            <h3 className="text-xs font-semibold text-[#1d1d1f]">Calculate Benefits</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="p-2.5 bg-white rounded-lg border border-black/5">
                                <p className="text-xs font-medium text-[#1d1d1f]">Calculate blended rate</p>
                            </div>
                            <div className="p-2.5 bg-white rounded-lg border border-black/5">
                                <p className="text-xs font-medium text-[#1d1d1f]">Monthly cash flow</p>
                            </div>
                            <div className="p-2.5 bg-white rounded-lg border border-black/5">
                                <p className="text-xs font-medium text-[#1d1d1f]">Credit score impact</p>
                            </div>
                            <div className="p-2.5 bg-white rounded-lg border border-black/5">
                                <p className="text-xs font-medium text-[#1d1d1f]">Interest savings</p>
                            </div>
                        </div>
                    </div>

                    {/* Loaded Scenario */}
                    <div className="p-3 bg-white rounded-lg border border-black/5">
                        <div className="flex items-center gap-2 mb-1">
                            <svg className="w-3 h-3 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            <p className="text-[10px] font-semibold text-[#86868b] uppercase">Loaded Scenario</p>
                        </div>
                        <p className="text-xs text-[#1d1d1f]">7 debts selected for payoff <span className="text-amber-600 font-medium">($1,196/mo)</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ObjectionBubble component - shows the borrower's objection as a speech bubble
function ObjectionBubble({ accentColor }: { accentColor: string }) {
    return (
        <div className="relative w-[675px] h-[470px]">
            {/* Background anxiety glow */}
            <motion.div 
                className="absolute inset-0 rounded-3xl blur-3xl -z-10 bg-gradient-to-br from-rose-500/20 to-red-500/20"
                animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Secondary objection - top left */}
            <motion.div 
                className="absolute -top-2 -left-8 px-4 py-2 bg-white/90 rounded-xl shadow-lg border border-rose-100"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
            >
                <p className="text-sm text-rose-600 font-medium">&ldquo;Why is this so expensive?&rdquo;</p>
            </motion.div>

            {/* Secondary objection - top right */}
            <motion.div 
                className="absolute top-8 -right-4 px-4 py-2 bg-white/90 rounded-xl shadow-lg border border-amber-100"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
            >
                <p className="text-sm text-amber-600 font-medium">&ldquo;I want to wait...&rdquo;</p>
            </motion.div>

            {/* Secondary objection - bottom left */}
            <motion.div 
                className="absolute bottom-16 -left-12 px-4 py-2 bg-white/90 rounded-xl shadow-lg border border-orange-100"
                initial={{ opacity: 0, y: -20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.4 }}
            >
                <p className="text-sm text-orange-600 font-medium">&ldquo;Closing costs seem high&rdquo;</p>
            </motion.div>

            {/* MAIN objection bubble - center */}
            <motion.div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5, type: "spring" }}
            >
                <div 
                    className="relative bg-white rounded-2xl p-6 shadow-2xl"
                    style={{ boxShadow: `0 0 60px rgba(244,63,94,0.2), 0 25px 50px rgba(0,0,0,0.25)` }}
                >
                    {/* Quote icon */}
                    <motion.div 
                        className="absolute -top-4 -left-4 w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center shadow-lg"
                        animate={{ rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                        </svg>
                    </motion.div>
                    
                    {/* The main objection text */}
                    <p className="text-xl font-bold text-[#1d1d1f] leading-relaxed mb-4">
                        &ldquo;Your rates are too high&rdquo;
                    </p>
                    
                    {/* Borrower indicator */}
                    <div className="flex items-center gap-3 pt-3 border-t border-black/5">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-[#1d1d1f]">Borrower Objection</p>
                            <p className="text-xs text-rose-500 font-medium">The moment every LO dreads...</p>
                        </div>
                    </div>
                    
                    {/* Speech bubble tail */}
                    <div className="absolute -bottom-3 left-10 w-6 h-6 bg-white transform rotate-45" style={{ boxShadow: '4px 4px 8px rgba(0,0,0,0.1)' }} />
                </div>
            </motion.div>

            {/* Stress indicator */}
            <motion.div 
                className="absolute bottom-2 right-0 flex items-center gap-2 px-3 py-1.5 bg-rose-100 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
            >
                <motion.span 
                    className="text-lg"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                >
                    😰
                </motion.span>
                <span className="text-xs font-medium text-rose-600">What do you say?</span>
            </motion.div>
        </div>
    );
}

// SalesCoachPresentation component - the AI response panel
function SalesCoachPresentation({ accentColor, contentScrollY }: { accentColor: string; contentScrollY?: any }) {
    return (
        <div className="relative w-[700px]">
            {/* Outer glow */}
            <motion.div 
                className="absolute -inset-4 rounded-2xl blur-2xl -z-10"
                style={{ backgroundColor: `${accentColor}25` }}
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Panel container */}
            <div 
                className="rounded-xl bg-white flex flex-col h-[85vh] max-h-[880px] overflow-hidden"
                style={{ boxShadow: `0 0 60px ${accentColor}20, 0 25px 50px rgba(0,0,0,0.4)` }}
            >
                {/* Header */}
                <div className="px-6 py-5 bg-white border-b border-black/5 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-[#1d1d1f] tracking-tight">Sales Coach</h1>
                                <p className="text-sm text-[#86868b]">Rate too high objection</p>
                            </div>
                        </div>
                        <button className="p-2 rounded-lg hover:bg-black/5 transition-colors">
                            <svg className="w-5 h-5 text-[#86868b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* AI Warning Banner */}
                <div className="px-4 py-2 bg-amber-50 border-b border-amber-100 flex-shrink-0">
                    <p className="text-xs text-amber-700"><span className="font-semibold">AI Sales Coach</span> - Uses your loan scenario data for personalized guidance</p>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-hidden">
                    <motion.div 
                        className="p-6 bg-[#f5f5f7]"
                        style={{ y: contentScrollY || 0 }}
                    >
                        <div className="space-y-4">
                            {/* AI Avatar */}
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold text-[#1d1d1f]">AI Sales Coach</p>
                                    <p className="text-xs text-[#86868b]">Rate too high objection</p>
                                </div>
                            </div>

                            {/* Response Card */}
                            <div className="bg-white rounded-xl p-5 shadow-sm">
                                <div className="space-y-4">
                                    <p className="text-sm text-[#1d1d1f] leading-relaxed">
                                        I understand your client&apos;s concern about the mortgage rate. Let&apos;s look at how a blended rate can actually work in their favor by considering their current debts.
                                    </p>

                                    {/* Current Mortgages */}
                                    <div className="bg-stone-50 rounded-xl p-4 space-y-2">
                                        <div className="flex gap-3">
                                            <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium bg-orange-100 text-orange-600">1</span>
                                            <p className="text-sm text-[#1d1d1f] font-semibold">Current Mortgages:</p>
                                        </div>
                                        <div className="flex gap-3 ml-1">
                                            <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium bg-stone-200 text-stone-500">•</span>
                                            <p className="text-sm text-[#1d1d1f]">1st Mortgage: <span className="font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">$247,500</span> at <span className="font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">3.75%</span></p>
                                        </div>
                                        <div className="flex gap-3 ml-1">
                                            <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium bg-stone-200 text-stone-500">•</span>
                                            <p className="text-sm text-[#1d1d1f]">2nd Mortgage/HELOC: <span className="font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">$180,000</span> at <span className="font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">4.25%</span></p>
                                        </div>
                                    </div>

                                    {/* Selected Debts */}
                                    <div className="bg-stone-50 rounded-xl p-4 space-y-2">
                                        <div className="flex gap-3">
                                            <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium bg-orange-100 text-orange-600">2</span>
                                            <p className="text-sm text-[#1d1d1f] font-semibold">Selected Debts for Payoff:</p>
                                        </div>
                                        <div className="flex gap-3 ml-1">
                                            <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium bg-stone-200 text-stone-500">•</span>
                                            <p className="text-sm text-[#1d1d1f]">CHASE AUTO: <span className="font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">$18,000</span> at <span className="font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">6.9%</span></p>
                                        </div>
                                        <div className="flex gap-3 ml-1">
                                            <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium bg-stone-200 text-stone-500">•</span>
                                            <p className="text-sm text-[#1d1d1f]">5/3 DIVIDEND: <span className="font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">$12,645</span> at <span className="font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">5.5%</span></p>
                                        </div>
                                        <div className="flex gap-3 ml-1">
                                            <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium bg-stone-200 text-stone-500">•</span>
                                            <p className="text-sm text-[#1d1d1f]">WFBNA AUTO: <span className="font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">$11,219</span> at <span className="font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">7.2%</span></p>
                                        </div>
                                        <div className="flex gap-3 ml-1">
                                            <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium bg-stone-200 text-stone-500">•</span>
                                            <p className="text-sm text-[#1d1d1f]">WFBNA CARD: <span className="font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">$10,200</span> at <span className="font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">24.99%</span></p>
                                        </div>
                                        <div className="flex gap-3 ml-1">
                                            <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium bg-stone-200 text-stone-500">•</span>
                                            <p className="text-sm text-[#1d1d1f]">AMERICAN EXPRESS: <span className="font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">$2,500</span> at <span className="font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">19.99%</span></p>
                                        </div>
                                        <div className="flex gap-3 ml-1">
                                            <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium bg-stone-200 text-stone-500">•</span>
                                            <p className="text-sm text-[#1d1d1f]">CITI BANK: <span className="font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">$750</span> at <span className="font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">22.99%</span></p>
                                        </div>
                                    </div>

                                    {/* Debt Summary */}
                                    <div className="flex items-center gap-2 pt-1">
                                        <div className="w-5 h-5 rounded bg-stone-100 flex items-center justify-center text-stone-500">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                            </svg>
                                        </div>
                                        <h4 className="font-medium text-sm text-[#1d1d1f]">Current Debt Summary:</h4>
                                    </div>
                                    <div className="bg-stone-50 rounded-xl p-4 space-y-2">
                                        <div className="flex gap-3">
                                            <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium bg-stone-200 text-stone-500">•</span>
                                            <p className="text-sm text-[#1d1d1f]">Total Debt to Pay Off: <span className="font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">$55,814</span></p>
                                        </div>
                                        <div className="flex gap-3">
                                            <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium bg-stone-200 text-stone-500">•</span>
                                            <p className="text-sm text-[#1d1d1f]">Monthly Payments Eliminated: <span className="font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">$1,196</span></p>
                                        </div>
                                    </div>

                                    {/* Blended Rate - THE MIC DROP */}
                                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5 border border-orange-200">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-6 h-6 rounded bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <h4 className="font-semibold text-sm text-orange-800">Blended Rate Calculation:</h4>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-sm text-[#1d1d1f]">Total Debt (including mortgages): <span className="font-semibold text-emerald-600">$483,314</span></p>
                                            <p className="text-sm text-[#1d1d1f]">Current Weighted Interest: <span className="font-semibold text-rose-600">$64,973/year</span></p>
                                            <div className="pt-2 border-t border-orange-200 mt-3">
                                                <p className="text-lg font-bold text-orange-700">
                                                    Current Blended Rate = <span className="text-2xl text-rose-600 bg-rose-50 px-3 py-1 rounded-lg shadow-sm">13.45%</span>
                                                </p>
                                                <p className="text-sm text-emerald-600 mt-2">
                                                    → Consolidate at <span className="font-bold">7.25%</span> to save <span className="font-bold">$30,000+/year</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Conclusion */}
                                    <div className="flex items-center gap-2 pt-1">
                                        <div className="w-5 h-5 rounded bg-green-100 flex items-center justify-center text-green-600">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                            </svg>
                                        </div>
                                        <h4 className="font-medium text-sm text-[#1d1d1f]">Conclusion:</h4>
                                    </div>
                                    <p className="text-sm text-[#1d1d1f] leading-relaxed bg-green-50 p-4 rounded-xl border border-green-100">
                                        While the mortgage rate may seem high, consolidating high-interest debt could <span className="font-semibold text-green-700">lower their overall financial burden</span>, leading to savings in monthly payments and interest costs. Would your client be open to exploring this option further?
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2 pt-2">
                                        <button className="flex-1 py-3 bg-stone-100 text-stone-700 rounded-xl text-sm font-medium hover:bg-stone-200 transition-colors flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                            Try Another Topic
                                        </button>
                                        <button className="px-5 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl text-sm font-medium flex items-center gap-2 shadow-md">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                                                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                                            </svg>
                                            Copy
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

// ValuationSourceCards - 4 cards that converge from corners
function ValuationSourceCards({ accentColor, convergenceProgress }: { accentColor: string; convergenceProgress: any }) {
    const sources = [
        { name: "Internal", value: "$785K", color: "purple", bgColor: "bg-purple-50", borderColor: "border-purple-200", textColor: "text-purple-700", position: "top-left" },
        { name: "Zillow", value: "$769K", color: "blue", bgColor: "bg-blue-50", borderColor: "border-blue-200", textColor: "text-blue-700", position: "top-right" },
        { name: "Redfin", value: "$801K", color: "red", bgColor: "bg-red-50", borderColor: "border-red-200", textColor: "text-red-700", position: "bottom-left" },
        { name: "Realtor", value: "$777K", color: "slate", bgColor: "bg-slate-50", borderColor: "border-slate-200", textColor: "text-slate-700", position: "bottom-right" },
    ];

    // Transform convergence progress to individual card positions
    const card0X = useTransform(convergenceProgress, [0, 0.5, 1], [-180, -60, 0]);
    const card0Y = useTransform(convergenceProgress, [0, 0.5, 1], [-120, -40, 0]);
    const card1X = useTransform(convergenceProgress, [0, 0.5, 1], [180, 60, 0]);
    const card1Y = useTransform(convergenceProgress, [0, 0.5, 1], [-120, -40, 0]);
    const card2X = useTransform(convergenceProgress, [0, 0.5, 1], [-180, -60, 0]);
    const card2Y = useTransform(convergenceProgress, [0, 0.5, 1], [120, 40, 0]);
    const card3X = useTransform(convergenceProgress, [0, 0.5, 1], [180, 60, 0]);
    const card3Y = useTransform(convergenceProgress, [0, 0.5, 1], [120, 40, 0]);
    
    const cardTransforms = [
        { x: card0X, y: card0Y },
        { x: card1X, y: card1Y },
        { x: card2X, y: card2Y },
        { x: card3X, y: card3Y },
    ];

    const centerScale = useTransform(convergenceProgress, [0.7, 1], [0, 1]);
    const cardsOpacity = useTransform(convergenceProgress, [0.8, 1], [1, 0]);

    return (
        <div className="relative w-[700px] h-[500px]">
            {/* Background glow */}
            <motion.div 
                className="absolute inset-0 rounded-3xl blur-3xl -z-10"
                style={{ 
                    backgroundColor: `${accentColor}20`,
                    scale: useTransform(convergenceProgress, [0, 1], [1.2, 0.8])
                }}
            />
            
            {/* Floating source cards */}
            <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: cardsOpacity }}
            >
                <div className="relative w-full h-full">
                    {sources.map((source, index) => (
                        <motion.div
                            key={source.name}
                            className={`absolute ${source.bgColor} ${source.borderColor} border-2 rounded-2xl p-6 shadow-xl backdrop-blur-sm`}
                            style={{
                                x: cardTransforms[index].x,
                                y: cardTransforms[index].y,
                                left: '50%',
                                top: '50%',
                                marginLeft: index % 2 === 0 ? '-200px' : '40px',
                                marginTop: index < 2 ? '-140px' : '40px',
                            }}
                        >
                            <div className="text-center">
                                <div className={`w-12 h-12 rounded-xl ${source.bgColor} border ${source.borderColor} flex items-center justify-center mx-auto mb-3`}>
                                    <svg className={`w-6 h-6 ${source.textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                </div>
                                <p className={`text-xs font-bold uppercase tracking-wide ${source.textColor} mb-1`}>{source.name}</p>
                                <p className={`text-2xl font-bold ${source.textColor}`}>{source.value}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Center convergence indicator */}
            <motion.div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ scale: centerScale, opacity: centerScale }}
            >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-2xl">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                </div>
            </motion.div>

            {/* Analyzing text */}
            <motion.div 
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
                style={{ opacity: useTransform(convergenceProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]) }}
            >
                <p className="text-lg font-semibold text-white/80">Comparing valuations...</p>
                <p className="text-sm text-white/50 mt-1">Finding the best recommendation</p>
            </motion.div>
        </div>
    );
}

// ValuationAIPresentation - Full property valuation panel
function ValuationAIPresentation({ accentColor, contentScrollY }: { accentColor: string; contentScrollY?: any }) {
    return (
        <div className="relative w-[700px]">
            {/* Outer glow */}
            <motion.div 
                className="absolute -inset-4 rounded-2xl blur-2xl -z-10"
                style={{ backgroundColor: `${accentColor}25` }}
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Panel container */}
            <div 
                className="rounded-xl bg-white flex flex-col h-[85vh] max-h-[880px] overflow-hidden"
                style={{ boxShadow: `0 0 60px ${accentColor}20, 0 25px 50px rgba(0,0,0,0.4)` }}
            >
                {/* Header */}
                <div className="px-6 py-5 bg-white border-b border-black/5 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-[#1d1d1f] tracking-tight">Working Value for AUS</h1>
                                <p className="text-sm text-[#86868b]">Property Valuation Analysis</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 rounded-lg hover:bg-black/5 transition-colors border border-stone-200">
                                <svg className="w-4 h-4 text-[#86868b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </button>
                            <button className="p-2 rounded-lg hover:bg-black/5 transition-colors border border-stone-200">
                                <svg className="w-4 h-4 text-[#86868b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* AI Warning Banner */}
                <div className="px-4 py-2 bg-amber-50 border-b border-amber-100 flex-shrink-0">
                    <p className="text-xs text-amber-700"><span className="font-semibold">AI-Generated</span> — Verify with appraisal</p>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-hidden bg-[#f5f5f7]">
                    <motion.div 
                        className="p-6"
                        style={{ y: contentScrollY || 0 }}
                    >
                        <div className="space-y-4 max-w-2xl mx-auto">
                            {/* Property Address Card */}
                            <div className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm">
                                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-base font-semibold text-[#1d1d1f] truncate">2116 Shrewsbury Dr</p>
                                    <p className="text-sm text-[#86868b]">McKinney, TX • 5bd 4.5ba • 3,850 sqft</p>
                                </div>
                            </div>

                            {/* AUS Recommended Card */}
                            <div className="bg-white rounded-xl overflow-hidden shadow-sm ring-2 ring-green-500">
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                                <path d="M7 11V7a5 5 0 0110 0v4" />
                                            </svg>
                                            <span className="text-xs font-bold text-green-700 uppercase tracking-wide">AUS Recommended</span>
                                        </div>
                                        <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">High</span>
                                    </div>
                                    <p className="text-5xl font-bold text-[#1d1d1f] mb-4">$785,000</p>
                                    <div className="flex items-center gap-2 p-3 rounded-xl bg-green-50 border border-green-100 mb-4">
                                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm text-green-700">Supported by multiple sources with low variance</span>
                                    </div>
                                    <p className="text-sm text-[#86868b]">The internal AVM value is supported by a low variance and high confidence level.</p>
                                    <div className="mt-4 pt-4 border-t border-black/5 text-center">
                                        <span className="text-sm text-green-600 font-semibold">✓ Currently selected for AUS</span>
                                    </div>
                                </div>
                            </div>

                            {/* Alternative Options */}
                            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                                <div className="p-4 border-b border-black/5">
                                    <span className="text-xs font-bold text-[#1d1d1f] uppercase tracking-wide">Alternative Options</span>
                                </div>
                                <div className="divide-y divide-black/5">
                                    <div className="p-4 flex items-center justify-between hover:bg-black/[0.02] transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-5 h-5 rounded-full border-2 border-black/20" />
                                            <div>
                                                <p className="text-sm font-semibold text-[#1d1d1f]">Safest for underwriting</p>
                                                <p className="text-xs text-[#86868b]">Lowest defensible value across all sources</p>
                                            </div>
                                        </div>
                                        <span className="text-lg font-bold text-[#1d1d1f]">$769K</span>
                                    </div>
                                    <div className="p-4 flex items-center justify-between hover:bg-black/[0.02] transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-5 h-5 rounded-full border-2 border-black/20" />
                                            <div>
                                                <p className="text-sm font-semibold text-[#1d1d1f]">Balanced estimate</p>
                                                <p className="text-xs text-[#86868b]">Median of all available sources</p>
                                            </div>
                                        </div>
                                        <span className="text-lg font-bold text-[#1d1d1f]">$785K</span>
                                    </div>
                                    <div className="p-4 flex items-center justify-between hover:bg-black/[0.02] transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-5 h-5 rounded-full border-2 border-black/20" />
                                            <div className="flex items-center gap-2">
                                                <div>
                                                    <p className="text-sm font-semibold text-[#1d1d1f]">Best case (not recommended)</p>
                                                    <p className="text-xs text-[#86868b]">Upper bound - may increase appraisal risk</p>
                                                </div>
                                                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <span className="text-lg font-bold text-[#1d1d1f]">$801K</span>
                                    </div>
                                </div>
                            </div>

                            {/* Source Comparison */}
                            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                                <div className="p-4 border-b border-black/5 flex items-center justify-between">
                                    <span className="text-xs font-bold text-[#1d1d1f] uppercase tracking-wide">Source Comparison</span>
                                    <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">4% variance</span>
                                </div>
                                <div className="p-5">
                                    <div className="grid grid-cols-4 gap-3 mb-4">
                                        <div className="text-center p-3 rounded-xl bg-purple-50 border border-purple-100">
                                            <p className="text-[10px] text-purple-700 font-semibold uppercase">Internal</p>
                                            <p className="text-base font-bold text-purple-700 mt-1">$785K</p>
                                        </div>
                                        <div className="text-center p-3 rounded-xl bg-blue-50 border border-blue-100">
                                            <p className="text-[10px] text-blue-700 font-semibold uppercase">Zillow</p>
                                            <p className="text-base font-bold text-blue-700 mt-1">$769K</p>
                                        </div>
                                        <div className="text-center p-3 rounded-xl bg-red-50 border border-red-100">
                                            <p className="text-[10px] text-red-700 font-semibold uppercase">Redfin</p>
                                            <p className="text-base font-bold text-red-700 mt-1">$801K</p>
                                        </div>
                                        <div className="text-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                                            <p className="text-[10px] text-slate-700 font-semibold uppercase">Realtor</p>
                                            <p className="text-base font-bold text-slate-700 mt-1">$777K</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: '80%' }} />
                                        </div>
                                        <p className="text-xs text-[#86868b] text-center">Values within 5% variance are typically considered stable across AVMs</p>
                                    </div>
                                </div>
                            </div>

                            {/* Why This Value */}
                            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                                <div className="p-4 flex items-center justify-between hover:bg-black/[0.02] transition-colors cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm font-semibold text-[#1d1d1f]">Why This Value?</span>
                                    </div>
                                    <svg className="w-5 h-5 text-[#86868b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Underwriting Readiness */}
                            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                                <div className="p-4 border-b border-black/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <span className="text-xs font-bold text-[#1d1d1f] uppercase tracking-wide">Underwriting Readiness</span>
                                    </div>
                                    <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Yes</span>
                                </div>
                                <div className="p-4 space-y-1">
                                    <div className="flex items-center justify-between py-2 border-b border-black/5">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-sm text-[#1d1d1f]">Multiple sources present</span>
                                        </div>
                                        <span className="text-sm font-semibold text-green-600">Yes</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-black/5">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-sm text-[#1d1d1f]">Variance within tolerance</span>
                                        </div>
                                        <span className="text-sm font-semibold text-green-600">4%</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-sm text-[#1d1d1f]">Internal model alignment</span>
                                        </div>
                                        <span className="text-sm font-semibold text-green-600">Yes</span>
                                    </div>
                                </div>
                            </div>

                            {/* Disclaimer */}
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                <p className="text-xs text-[#86868b]">AVMs are estimates; final value determined by appraisal or underwriting. Selected value prioritizes stability and defensibility.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default function VerticalStages() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Glow color for the journey path
    const glowColor = useTransform(
        scrollYProgress,
        [0, 0.25, 0.5, 0.75, 1],
        ["#8B5CF6", "#D946EF", "#F97316", "#F59E0B", "#FBBF24"]
    );

    return (
        <section ref={containerRef} className="relative w-full">
            {/* Section Header */}
            <div className="relative z-10 text-center py-32 px-4">
                <motion.p 
                    className="text-sm tracking-[0.3em] text-purple-400 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    THE JOURNEY
                </motion.p>
                <motion.h2 
                    className="text-4xl md:text-6xl font-bold text-white mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    From Zero to Understanding
                </motion.h2>
                <motion.p 
                    className="text-white/50 text-lg max-w-xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    See how AI transforms the first 5 minutes with every borrower
                </motion.p>
            </div>

            {/* Journey Path SVG */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                <svg
                    className="absolute left-0 top-0 w-full h-full"
                    viewBox="0 0 400 4000"
                    preserveAspectRatio="xMidYMin slice"
                    fill="none"
                >
                    <defs>
                        <linearGradient id="journey-grad" x1="200" y1="0" x2="200" y2="4000" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
                            <stop offset="20%" stopColor="#8B5CF6" stopOpacity="1" />
                            <stop offset="40%" stopColor="#D946EF" stopOpacity="1" />
                            <stop offset="60%" stopColor="#F97316" stopOpacity="1" />
                            <stop offset="80%" stopColor="#F59E0B" stopOpacity="1" />
                            <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.2" />
                        </linearGradient>

                        <filter id="path-glow" x="-100%" y="-100%" width="300%" height="300%">
                            <feGaussianBlur stdDeviation="6" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        <filter id="orb-glow" x="-200%" y="-200%" width="500%" height="500%">
                            <feGaussianBlur stdDeviation="10" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Main curved path */}
                    <path
                        id="mainPath"
                        d="M 200 0 
                           C 200 300 50 400 50 700
                           C 50 1000 350 1100 350 1400
                           C 350 1700 50 1800 50 2100
                           C 50 2400 350 2500 350 2800
                           C 350 3100 200 3200 200 3500
                           C 200 3700 200 3900 200 4000"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="2"
                        strokeDasharray="6 10"
                        fill="none"
                    />

                    {/* Alternate wandering paths - organic feel */}
                    <g opacity="0.35">
                        {/* Path that wanders left then crosses */}
                        <path d="M 280 100 C 320 400 80 600 60 900 C 40 1200 180 1500 220 1800" stroke="#A78BFA" strokeWidth="1.5" strokeDasharray="4 8" fill="none" />
                        
                        {/* Path that starts right, drifts */}
                        <path d="M 100 500 C 140 800 340 1100 320 1500 C 300 1900 120 2200 150 2600" stroke="#F9A8D4" strokeWidth="1.5" strokeDasharray="3 7" fill="none" />
                        
                        {/* Shorter accent path */}
                        <path d="M 320 2000 C 280 2300 100 2500 80 2900 C 60 3200 180 3400 200 3600" stroke="#FDBA74" strokeWidth="1.5" strokeDasharray="5 10" fill="none" />
                    </g>

                    {/* Animated progress path */}
                    <motion.path
                        d="M 200 0 
                           C 200 300 50 400 50 700
                           C 50 1000 350 1100 350 1400
                           C 350 1700 50 1800 50 2100
                           C 50 2400 350 2500 350 2800
                           C 350 3100 200 3200 200 3500
                           C 200 3700 200 3900 200 4000"
                        stroke="url(#journey-grad)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        filter="url(#path-glow)"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        style={{ pathLength: scrollYProgress }}
                    />

                    {/* Traveling orb */}
                    <motion.circle
                        r="8"
                        filter="url(#orb-glow)"
                        style={{ fill: glowColor }}
                    >
                        <animateMotion
                            dur="1s"
                            repeatCount="1"
                            fill="freeze"
                            keyPoints="0;1"
                            keyTimes="0;1"
                            calcMode="linear"
                        >
                            <mpath href="#mainPath" />
                        </animateMotion>
                    </motion.circle>

                    {/* Ambient particles */}
                    <g filter="url(#path-glow)" opacity="0.5">
                        {["#8B5CF6", "#D946EF", "#F97316", "#F59E0B", "#FBBF24"].map((color, i) => (
                            <circle key={i} r="2.5" fill={color}>
                                <animateMotion 
                                    dur={`${18 + i * 2}s`} 
                                    repeatCount="indefinite" 
                                    path="M 200 0 C 200 300 50 400 50 700 C 50 1000 350 1100 350 1400 C 350 1700 50 1800 50 2100 C 50 2400 350 2500 350 2800 C 350 3100 200 3200 200 3500" 
                                    begin={`${i * 3}s`}
                                />
                                <animate attributeName="opacity" values="0;0.8;0" dur={`${18 + i * 2}s`} repeatCount="indefinite" begin={`${i * 3}s`} />
                            </circle>
                        ))}
                    </g>
                </svg>
            </div>

            {/* Stages */}
            <div className="relative z-10">
                {STAGES.map((stage, index) => (
                    <StageSection 
                        key={stage.id} 
                        stage={stage} 
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
}
