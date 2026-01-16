"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WorkflowSpine from "./WorkflowSpine";
import BeforeStage from "./stages/BeforeStage";
import Agent1Stage from "./stages/Agent1Stage";
import Agent2Stage from "./stages/Agent2Stage";
import Agent3Stage from "./stages/Agent3Stage";
import PricingStage from "./stages/PricingStage";

const NODES = [
    {
        id: "before",
        name: "Before",
        headline: "Fragmented Workflow",
        bullets: [
            "Manual context gathering across multiple tools",
            "No unified borrower view",
            "Time lost switching between systems",
            "Inconsistent data and duplicated effort"
        ]
    },
    {
        id: "agent1",
        name: "Brief AI",
        headline: "Instant Context Assembly",
        bullets: [
            "Borrower history assembled in seconds",
            "Local context (weather, news) integrated",
            "Relationship signals surfaced automatically",
            "Pre-call intelligence ready"
        ]
    },
    {
        id: "agent2",
        name: "Liability AI",
        headline: "Intelligent Structuring",
        bullets: [
            "Debt analysis runs automatically",
            "Multiple payoff scenarios generated",
            "Optimal DTI paths identified",
            "Recommendations ranked by impact"
        ]
    },
    {
        id: "agent3",
        name: "Property AI",
        headline: "Confidence in Every Valuation",
        bullets: [
            "Property data verified instantly",
            "Sales comparables mapped",
            "Confidence scores calculated",
            "Market context provided"
        ]
    },
    {
        id: "pricing",
        name: "Pricing",
        headline: "The Complete Picture",
        bullets: [
            "All context flows into pricing",
            "Intelligent rate optimization",
            "Borrower benefits calculated",
            "One-click loan structuring"
        ]
    }
];

export default function WorkflowPresentation() {
    const [activeNode, setActiveNode] = useState(0);
    const [previousNode, setPreviousNode] = useState(0);
    const [pricingRevealed, setPricingRevealed] = useState(false);
    const [presentationMode, setPresentationMode] = useState(false);

    const goToNode = useCallback((index: number) => {
        if (index < 0 || index > 4) return;
        if (index === 4 && !pricingRevealed) return; // Can't go to pricing if locked
        setPreviousNode(activeNode);
        setActiveNode(index);
    }, [activeNode, pricingRevealed]);

    const goNext = useCallback(() => {
        const nextIndex = activeNode + 1;
        if (nextIndex === 4 && !pricingRevealed) return;
        if (nextIndex <= 4) goToNode(nextIndex);
    }, [activeNode, pricingRevealed, goToNode]);

    const goPrev = useCallback(() => {
        if (activeNode > 0) goToNode(activeNode - 1);
    }, [activeNode, goToNode]);

    const revealPricing = useCallback(() => {
        setPricingRevealed(true);
        setTimeout(() => {
            setPreviousNode(activeNode);
            setActiveNode(4);
        }, 300);
    }, [activeNode]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") goNext();
            if (e.key === "ArrowLeft") goPrev();
            if (e.key === "r" || e.key === "R") {
                if (!pricingRevealed) revealPricing();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [goNext, goPrev, pricingRevealed, revealPricing]);

    const currentNode = NODES[activeNode];

    return (
        <div className={`relative w-full h-screen bg-black overflow-hidden flex flex-col ${presentationMode ? 'text-lg' : ''}`}>
            {/* Presentation Mode Toggle */}
            <button
                onClick={() => setPresentationMode(!presentationMode)}
                className="absolute top-4 right-4 z-50 px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white border border-white/20 rounded-full transition-colors"
            >
                {presentationMode ? "Exit Presentation" : "Presentation Mode"}
            </button>

            {/* Stage Area - 50% height */}
            <div className={`flex-1 flex items-center justify-center px-8 ${presentationMode ? 'scale-110' : ''}`} style={{ minHeight: '50vh' }}>
                <div className="w-full max-w-5xl h-full flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeNode}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="w-full h-full flex items-center justify-center"
                        >
                            {activeNode === 0 && <BeforeStage />}
                            {activeNode === 1 && <Agent1Stage />}
                            {activeNode === 2 && <Agent2Stage />}
                            {activeNode === 3 && <Agent3Stage />}
                            {activeNode === 4 && <PricingStage />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Workflow Spine */}
            <div className="py-6">
                <WorkflowSpine
                    activeNode={activeNode}
                    previousNode={previousNode}
                    pricingRevealed={pricingRevealed}
                    onNodeClick={goToNode}
                    nodes={NODES}
                />
            </div>

            {/* Explain Area */}
            <div className={`px-8 pb-6 ${presentationMode ? 'pb-10' : ''}`}>
                <div className="max-w-3xl mx-auto text-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeNode}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            <h2 className={`font-bold text-white mb-4 ${presentationMode ? 'text-4xl' : 'text-2xl md:text-3xl'}`}>
                                {currentNode.headline}
                            </h2>
                            <div className={`flex flex-wrap justify-center gap-x-6 gap-y-2 text-white/60 ${presentationMode ? 'text-lg' : 'text-sm'}`}>
                                {currentNode.bullets.map((bullet, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center gap-2"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                        {bullet}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-6">
                <button
                    onClick={goPrev}
                    disabled={activeNode === 0}
                    className="px-4 py-2 text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                    <span>←</span> Prev
                </button>

                {/* Step Indicator */}
                <div className="flex items-center gap-2">
                    {NODES.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goToNode(i)}
                            disabled={i === 4 && !pricingRevealed}
                            className={`w-2 h-2 rounded-full transition-all ${
                                i === activeNode 
                                    ? 'bg-orange-500 scale-125' 
                                    : i === 4 && !pricingRevealed
                                    ? 'bg-white/20'
                                    : 'bg-white/40 hover:bg-white/60'
                            }`}
                        />
                    ))}
                </div>

                <button
                    onClick={goNext}
                    disabled={activeNode === 4 || (activeNode === 3 && !pricingRevealed)}
                    className="px-4 py-2 text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                    Next <span>→</span>
                </button>
            </div>

            {/* Reveal Pricing Button */}
            {!pricingRevealed && activeNode >= 3 && (
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={revealPricing}
                    className="absolute bottom-20 left-1/2 -translate-x-1/2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-shadow"
                >
                    🔓 Reveal Pricing
                </motion.button>
            )}
        </div>
    );
}
