"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Play, Pause, RotateCcw, Home, MessageSquare, TrendingUp, Users, CheckCircle, Zap, Sparkles, Search, Phone, Scale, FileText, LayoutGrid, Settings } from 'lucide-react';
import BeforeStage from '@/components/stages/BeforeStage';
import Image from 'next/image';
import { CallSimulation } from './components/CallSimulation';
import { WorkspaceReveal } from './components/WorkspaceReveal';
import { CapabilityWalkthrough } from './components/CapabilityWalkthrough';

// ============================================================================
// TIMING CONFIGURATION (Total: 215 seconds = 3:35)
// Updated to match final voiceover script
// ============================================================================
const TOTAL_DURATION = 215;

// Section timing (in seconds) - matches voiceover script
const SECTIONS = {
    // SETUP (0:00 - 0:20)
    steveIntro: { start: 0, end: 10 },          // Steve Hulme Intro
    industryRevolution: { start: 10, end: 20 }, // Industry Revolution

    // PROBLEM (0:20 - 0:35)
    firstCallProblem: { start: 20, end: 35 },   // First Call Problem

    // SOLUTION (0:35 - 0:55)
    aiAssistants: { start: 35, end: 55 },       // AI Assistants in LinkAI

    // FEATURES (0:55 - 2:18) = 83 seconds (lastMile time redistributed)
    // Each feature has 3 phases: Backend → Panel → App Context
    rapport: { start: 55, end: 83 },            // Rapport Builder (28s)
    valuation: { start: 83, end: 111 },         // Valuation AI (28s)
    salesCoach: { start: 111, end: 138 },       // Sales Coach (27s)

    // JOURNEY & ROADMAP (2:18 - 3:05)
    betaJourney: { start: 138, end: 170 },      // Beta Journey (Nov to Feb)
    roadmap: { start: 170, end: 185 },          // Roadmap Preview

    // CLOSE (3:05 - 3:35)
    industryLeadership: { start: 185, end: 198 }, // Industry Leadership
    executiveClose: { start: 198, end: 215 },   // Executive Close + Handoff
};

// Feature configurations matching main page style
const FEATURES = [
    {
        id: 'rapport',
        label: 'AI AGENT',
        title: 'Rapport Builder',
        subtitle: 'Know Your Borrower',
        description: 'Credit, property, assets, liabilities—assembled in seconds. Walk into every call prepared.',
        accentColor: '#D946EF',
    },
    {
        id: 'salesCoach',
        label: 'AI AGENT',
        title: 'Sales Coach',
        subtitle: 'Turn Objections into Opportunities',
        description: 'Real-time guidance to handle objections and calculate benefits—personalized to each borrower\'s data.',
        accentColor: '#F97316',
    },
    {
        id: 'valuation',
        label: 'AI AGENT',
        title: 'Valuation AI',
        subtitle: 'Confident Pricing',
        description: 'Real-time property valuation and market comparables for confident recommendations.',
        accentColor: '#F59E0B',
    },
];

// Scattered data for the "Problem" visualization
const SCATTERED_DATA = [
    { icon: '💳', label: 'Credit', x: 15, y: 18 },
    { icon: '🏠', label: 'Property', x: 72, y: 12 },
    { icon: '💰', label: 'Assets', x: 80, y: 52 },
    { icon: '📊', label: 'Liabilities', x: 12, y: 58 },
    { icon: '🏦', label: 'CF Loans', x: 68, y: 78 },
    { icon: '📍', label: 'Local', x: 18, y: 38 },
    { icon: '👤', label: 'Borrower', x: 76, y: 32 },
    { icon: '📋', label: 'Income', x: 45, y: 14 },
];

// Profile data for the output visualization
const PROFILE_DATA = [
    { label: 'Credit', value: '742', color: '#f97316' },
    { label: 'Equity', value: '$127K', color: '#3b82f6' },
    { label: 'DTI', value: '38%', color: '#22c55e' },
    { label: 'Tenure', value: '3yr', color: '#a855f7' },
];

// Data for Agent1Stage (Rapport Builder)
const INCOMING_DATA = [
    { label: "Credit Bureau", icon: "📊", x: -140, y: -80 },
    { label: "Property Records", icon: "🏠", x: 140, y: -60 },
    { label: "Bank Statements", icon: "🏦", x: -150, y: 20 },
    { label: "Employment", icon: "💼", x: 130, y: 50 },
    { label: "Loan History", icon: "📋", x: -120, y: 100 },
];

// Objections/Benefits for Agent2Stage (Sales Coach)
const OBJECTIONS = [
    { text: "Your rates are too high", delay: 0.2, x: -60, y: -40 },
    { text: "Closing costs seem expensive", delay: 0.5, x: 80, y: 20 },
    { text: "I want to wait for better rates", delay: 0.8, x: -40, y: 60 },
    { text: "Why should I refinance now?", delay: 1.1, x: 60, y: -60 },
];

const BENEFITS = [
    { text: "Calculate blended rate", delay: 0.3, x: 100, y: -20 },
    { text: "Monthly cash flow", delay: 0.6, x: -80, y: 40 },
    { text: "Interest savings", delay: 0.9, x: 40, y: 80 },
];

// Valuation sources for Agent3Stage
const VALUATION_SOURCES = [
    { name: "Internal AVM", color: "purple", icon: "🏛️" },
    { name: "Zillow", color: "blue", icon: "🔵" },
    { name: "Redfin", color: "red", icon: "🔴" },
    { name: "Realtor", color: "slate", icon: "⚪" },
];

// ============================================================================
// BACKEND STAGE COMPONENTS (Phase 1 of 3-phase animation)
// ============================================================================

// Agent1 Stage - Rapport Builder Backend Animation
function Agent1StageBackend() {
    return (
        <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
            {/* Floating data tokens */}
            {INCOMING_DATA.map((data, i) => (
                <motion.div
                    key={data.label}
                    className="absolute flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm"
                    initial={{ x: data.x * 1.5, y: data.y * 1.5, opacity: 0, scale: 0.8 }}
                    animate={{ 
                        x: [data.x * 1.5, data.x * 0.3, 0],
                        y: [data.y * 1.5, data.y * 0.3, 0],
                        opacity: [0, 1, 0],
                        scale: [0.8, 1, 0.3]
                    }}
                    transition={{
                        duration: 3,
                        delay: i * 0.6,
                        repeat: Infinity,
                        repeatDelay: 0.5,
                        ease: "easeInOut"
                    }}
                >
                    <span className="text-lg">{data.icon}</span>
                    <span className="text-white/60 text-xs whitespace-nowrap">{data.label}</span>
                </motion.div>
            ))}

            {/* AI Processing Indicator */}
            <motion.div
                className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-purple-500/30 backdrop-blur-sm"
                animate={{ 
                    boxShadow: [
                        "0 0 15px rgba(147,51,234,0.2)",
                        "0 0 30px rgba(147,51,234,0.4)",
                        "0 0 15px rgba(147,51,234,0.2)"
                    ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <motion.div 
                    className="w-5 h-5 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <Sparkles className="w-3 h-3 text-white" />
                </motion.div>
                <span className="text-purple-300 text-xs font-medium">Analyzing data...</span>
            </motion.div>

            {/* Central Profile Card */}
            <motion.div
                className="relative z-10 w-72 rounded-xl overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{
                    background: "linear-gradient(135deg, rgba(249,115,22,0.12), rgba(249,115,22,0.03))",
                    border: "1px solid rgba(249,115,22,0.35)",
                    boxShadow: "0 0 50px rgba(249,115,22,0.2)"
                }}
            >
                <div className="p-4 flex items-center gap-4 border-b border-orange-500/20">
                    <motion.div
                        className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xl font-bold shadow-lg"
                        animate={{ 
                            boxShadow: [
                                "0 0 20px rgba(249,115,22,0.3)",
                                "0 0 35px rgba(249,115,22,0.5)",
                                "0 0 20px rgba(249,115,22,0.3)"
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        JD
                    </motion.div>
                    <div>
                        <h3 className="text-white font-semibold text-lg">John Doe</h3>
                        <p className="text-white/40 text-xs">Borrower Profile</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2 p-3">
                    {PROFILE_DATA.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            className="p-2.5 rounded-lg"
                            style={{ backgroundColor: `${stat.color}10`, border: `1px solid ${stat.color}30` }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + i * 0.15 }}
                        >
                            <p className="text-white/40 text-[10px] mb-0.5">{stat.label}</p>
                            <p className="font-bold text-lg" style={{ color: stat.color }}>{stat.value}</p>
                        </motion.div>
                    ))}
                </div>
                <div className="px-3 pb-3">
                    <motion.div 
                        className="p-2.5 rounded-lg bg-orange-500/10 border border-orange-500/20"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 }}
                    >
                        <div className="flex items-start gap-2">
                            <span className="text-orange-500 text-sm">✨</span>
                            <p className="text-white/60 text-xs leading-relaxed">
                                Strong equity position. Good refi candidate. Last contacted 6mo ago about HELOC.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Background glow */}
            <motion.div
                className="absolute w-72 h-72 rounded-full bg-orange-500/10 blur-3xl -z-10"
                animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Timer */}
            <motion.div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/40 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
            >
                <span>Assembled in</span>
                <span className="text-orange-400 font-semibold">4.2s</span>
            </motion.div>
        </div>
    );
}

// Agent2 Stage - Sales Coach Backend Animation
function Agent2StageBackend() {
    return (
        <div className="relative w-full h-[500px] flex items-center justify-center p-8">
            {/* AI analyzing indicator */}
            <motion.div
                className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <motion.div
                    className="w-2 h-2 rounded-full bg-orange-500"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-orange-400 text-sm font-medium">Processing common objections...</span>
            </motion.div>

            {/* Floating Objection Bubbles */}
            <div className="relative w-[400px] h-[300px]">
                {OBJECTIONS.map((objection) => (
                    <motion.div
                        key={objection.text}
                        className="absolute left-1/2 top-1/2 px-4 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.5, x: "-50%", y: "-50%" }}
                        animate={{ 
                            opacity: 1, scale: 1, 
                            x: `calc(-50% + ${objection.x}px)`, 
                            y: `calc(-50% + ${objection.y}px)` 
                        }}
                        transition={{ delay: objection.delay, duration: 0.5, type: "spring", stiffness: 100 }}
                        style={{ boxShadow: '0 0 20px rgba(244,63,94,0.15)' }}
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-rose-400 text-lg">&ldquo;</span>
                            <p className="text-white/80 text-sm font-medium whitespace-nowrap">{objection.text}</p>
                            <span className="text-rose-400 text-lg">&rdquo;</span>
                        </div>
                    </motion.div>
                ))}

                {/* Benefit bubbles */}
                {BENEFITS.map((benefit) => (
                    <motion.div
                        key={benefit.text}
                        className="absolute left-1/2 top-1/2 px-4 py-2.5 rounded-xl bg-teal-500/10 border border-teal-500/30 backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.5, x: "-50%", y: "-50%" }}
                        animate={{ 
                            opacity: 1, scale: 1, 
                            x: `calc(-50% + ${benefit.x}px)`, 
                            y: `calc(-50% + ${benefit.y}px)` 
                        }}
                        transition={{ delay: benefit.delay + 0.5, duration: 0.5, type: "spring", stiffness: 100 }}
                        style={{ boxShadow: '0 0 20px rgba(20,184,166,0.15)' }}
                    >
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-teal-400" />
                            <p className="text-white/80 text-sm font-medium whitespace-nowrap">{benefit.text}</p>
                        </div>
                    </motion.div>
                ))}

                {/* Center icon */}
                <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring" }}
                >
                    <MessageSquare className="w-8 h-8 text-white" />
                </motion.div>
            </div>

            {/* Bottom hint */}
            <motion.div
                className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-orange-500/5 border border-orange-500/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
            >
                <p className="text-white/60 text-sm text-center">
                    <span className="text-orange-400 font-medium">AI Sales Coach:</span> Turn objections into opportunities with data-backed responses.
                </p>
            </motion.div>
        </div>
    );
}

// Agent3 Stage - Valuation AI Backend Animation
function Agent3StageBackend() {
    return (
        <div className="relative w-full h-[500px] flex items-center justify-center p-8">
            {/* Center property indicator */}
            <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="relative">
                    <motion.div
                        className="absolute inset-0 rounded-2xl bg-amber-500/30 blur-2xl"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="relative p-8 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30">
                        <div className="flex flex-col items-center">
                            <motion.div
                                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-4 shadow-lg"
                                animate={{ rotateY: [0, 360] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            >
                                <Home className="w-10 h-10 text-white" />
                            </motion.div>
                            <p className="text-amber-400 font-bold text-lg mb-1">2116 Shrewsbury Dr</p>
                            <p className="text-white/50 text-sm">McKinney, TX</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Orbiting source indicators */}
            {VALUATION_SOURCES.map((source, i) => {
                const angle = (i / VALUATION_SOURCES.length) * 360;
                const radius = 180;
                return (
                    <motion.div
                        key={source.name}
                        className="absolute"
                        style={{ left: '50%', top: '50%' }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                            opacity: 1, scale: 1,
                            x: Math.cos((angle + 45) * Math.PI / 180) * radius - 40,
                            y: Math.sin((angle + 45) * Math.PI / 180) * radius - 20,
                        }}
                        transition={{ delay: 0.5 + i * 0.2, duration: 0.5 }}
                    >
                        <motion.div
                            className="px-4 py-2 rounded-xl bg-white/5 border border-white/20 backdrop-blur-sm"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-lg">{source.icon}</span>
                                <span className="text-white/70 text-sm font-medium">{source.name}</span>
                            </div>
                        </motion.div>
                    </motion.div>
                );
            })}

            {/* Analyzing text */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <div className="flex items-center gap-2 mb-2">
                    <motion.div
                        className="w-2 h-2 rounded-full bg-amber-500"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                    <span className="text-amber-400 text-sm font-medium">Gathering valuations...</span>
                </div>
                <p className="text-white/40 text-xs">Comparing 4 sources for confidence</p>
            </motion.div>
        </div>
    );
}

// ============================================================================
// BROWSER MOCKUP - Full App Context (Phase 3 of 3-phase animation)
// Matches the main page's LinkAIAppContext exactly
// ============================================================================
function LinkAIAppContext({ stageId }: { stageId: string }) {
    return (
        <div className="relative w-full max-w-[1380px] mx-auto">
            {/* Browser-like viewport */}
            <div
                className="rounded-xl overflow-hidden shadow-2xl border border-white/10"
                style={{ boxShadow: '0 0 80px rgba(139,92,246,0.15), 0 40px 60px rgba(0,0,0,0.5)' }}
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

                {/* App content - Dashboard with panel */}
                <div className="flex bg-[#f5f5f7] h-[650px]">
                    {/* Sidebar */}
                    <div className="w-16 bg-[#1a1a2e] flex flex-col items-center py-4 gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">L</span>
                        </div>
                        <div className="flex-1 flex flex-col gap-2 mt-2">
                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                <Home className="w-4 h-4 text-white/40" />
                            </div>
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                <FileText className="w-4 h-4 text-purple-400" />
                            </div>
                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                <LayoutGrid className="w-4 h-4 text-white/40" />
                            </div>
                        </div>
                        <motion.div
                            className="w-10 h-10 rounded-lg bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center"
                            animate={{ boxShadow: ['0 0 0 0 rgba(217,70,239,0)', '0 0 20px 4px rgba(217,70,239,0.4)', '0 0 0 0 rgba(217,70,239,0)'] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Sparkles className="w-5 h-5 text-white" />
                        </motion.div>
                    </div>

                    {/* Main dashboard area */}
                    <div className="flex-1 p-4 overflow-hidden">
                        {/* Header bar */}
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-[#1d1d1f]">Merged Credit Report - All Bureaus</span>
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
                                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center">
                                            <Home className="w-5 h-5 text-white" />
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
                                            <div className="text-center p-2 rounded-lg bg-purple-50"><p className="text-[9px] text-purple-700 font-semibold">Internal</p><p className="text-sm font-bold text-purple-700">$785K</p></div>
                                            <div className="text-center p-2 rounded-lg bg-blue-50"><p className="text-[9px] text-blue-700 font-semibold">Zillow</p><p className="text-sm font-bold text-blue-700">$769K</p></div>
                                            <div className="text-center p-2 rounded-lg bg-red-50"><p className="text-[9px] text-red-700 font-semibold">Redfin</p><p className="text-sm font-bold text-red-700">$801K</p></div>
                                            <div className="text-center p-2 rounded-lg bg-slate-50"><p className="text-[9px] text-slate-700 font-semibold">Realtor</p><p className="text-sm font-bold text-slate-700">$777K</p></div>
                                        </div>
                                    </div>
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
                                            <Phone className="w-5 h-5 text-white" />
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
                                <div className="flex-1 p-3 bg-[#f5f5f7] space-y-2 overflow-y-auto text-[10px]">
                                    {/* Opening Line */}
                                    <div className="p-2 bg-amber-50 rounded-lg border border-amber-200">
                                        <p className="text-[9px] text-amber-700 font-semibold mb-1">Opening Line</p>
                                        <p className="text-[9px] text-amber-800">&ldquo;Thank you for taking the time to speak with me today about your financial goals.&rdquo;</p>
                                    </div>
                                    {/* Discovery Questions */}
                                    <div className="p-2 bg-white rounded-lg border border-black/5">
                                        <p className="text-[9px] text-[#86868b] font-semibold mb-1">Discovery Questions</p>
                                        <p className="text-[9px] text-[#1d1d1f]">• What are your primary financial goals?</p>
                                        <p className="text-[9px] text-[#1d1d1f]">• How do you feel about current payments?</p>
                                    </div>
                                    {/* What We See */}
                                    <div className="p-2 bg-white rounded-lg border border-black/5">
                                        <p className="text-[9px] text-fuchsia-600 font-semibold mb-1">What We See</p>
                                        <div className="space-y-0.5">
                                            <p className="text-[9px] text-[#1d1d1f]">1. equity assessment</p>
                                            <p className="text-[9px] text-[#1d1d1f]">2. debt assessment</p>
                                            <p className="text-[9px] text-[#1d1d1f]">3. credit flags</p>
                                            <p className="text-[9px] text-[#1d1d1f]">4. complexity note</p>
                                        </div>
                                    </div>
                                    {/* Local Context */}
                                    <div className="p-2 bg-white rounded-lg border border-black/5">
                                        <p className="text-[9px] text-fuchsia-600 font-semibold mb-1">Local Context</p>
                                        <p className="text-[9px] text-[#1d1d1f]">54°F Cloudy in McKinney, TX</p>
                                    </div>
                                    {/* Stats row */}
                                    <div className="grid grid-cols-2 gap-1.5">
                                        <div className="p-2 bg-white rounded-lg border border-black/5 text-center">
                                            <p className="text-[9px] text-[#86868b]">Property</p>
                                            <p className="text-sm font-bold text-[#1d1d1f]">$785K</p>
                                        </div>
                                        <div className="p-2 bg-white rounded-lg border border-black/5 text-center">
                                            <p className="text-[9px] text-[#86868b]">Equity</p>
                                            <p className="text-sm font-bold text-green-600">$358K</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Sales Coach Header (default) */}
                                <div className="px-4 py-3 bg-white border-b border-black/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                                            <MessageSquare className="w-5 h-5 text-white" />
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
                                                <MessageSquare className="w-2.5 h-2.5 text-rose-600" />
                                            </div>
                                            <h3 className="text-[10px] font-semibold text-[#1d1d1f]">Handle Objections</h3>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="p-2 bg-white rounded-lg border border-black/5 text-[9px] text-[#1d1d1f]">Rate too high</div>
                                            <div className="p-2 bg-white rounded-lg border border-black/5 text-[9px] text-[#1d1d1f]">Closing costs</div>
                                            <div className="p-2 bg-white rounded-lg border border-black/5 text-[9px] text-[#1d1d1f]">Want to wait</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <div className="w-4 h-4 rounded bg-teal-100 flex items-center justify-center">
                                                <Zap className="w-2.5 h-2.5 text-teal-600" />
                                            </div>
                                            <h3 className="text-[10px] font-semibold text-[#1d1d1f]">Calculate Benefits</h3>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="p-2 bg-white rounded-lg border border-black/5 text-[9px] text-[#1d1d1f]">Blended rate</div>
                                            <div className="p-2 bg-white rounded-lg border border-black/5 text-[9px] text-[#1d1d1f]">Monthly savings</div>
                                        </div>
                                    </div>
                                    {/* Blended Rate Result */}
                                    <div className="p-3 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200">
                                        <p className="text-[10px] font-bold text-orange-700 mb-1">Blended Rate</p>
                                        <p className="text-2xl font-bold text-orange-600">13.2%</p>
                                        <p className="text-[9px] text-emerald-600 mt-1">→ Consolidate at 7.25% to save $30K+/yr</p>
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

// ============================================================================
// HELPER: Format time as MM:SS
// ============================================================================
function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ============================================================================
// STATIC CONTENT COMPONENTS (No scroll-based transforms)
// ============================================================================

// Steve Intro Content
function SteveIntroContent() {
    return (
        <div className="relative z-10 text-center max-w-3xl px-8">
            {/* Logo with glow */}
            <motion.div
                className="mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <motion.div
                    animate={{
                        boxShadow: [
                            '0 0 60px rgba(249,115,22,0.3)',
                            '0 0 100px rgba(249,115,22,0.5)',
                            '0 0 60px rgba(249,115,22,0.3)',
                        ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="inline-block rounded-2xl p-2"
                >
                    <Image
                        src="https://cdn.bfldr.com/Q445447Z/at/k3spc358jhjrwwn9p2w6k2s/LinkAI_BG_FullGradonWht.png?auto=webp&format=png"
                        alt="LinkAI"
                        width={280}
                        height={120}
                        className="mx-auto"
                        priority
                    />
                </motion.div>
            </motion.div>

            {/* V1 Launch badge */}
            <motion.div
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-emerald-400 font-semibold text-lg">V1 Launched to All Loan Officers</span>
            </motion.div>

            {/* Presenter */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 pt-8 border-t border-white/10"
            >
                <p className="text-white/40 text-sm tracking-widest uppercase mb-2">Presented by</p>
                <p className="text-2xl text-white font-semibold">Steve Hulme</p>
                <p className="text-white/50">VP Product, GoodLeap</p>
            </motion.div>
        </div>
    );
}

// Industry Revolution Content
function IndustryRevolutionContent() {
    return (
        <div className="relative z-10 text-center max-w-5xl px-8">
            {/* Animated background */}
            <div className="absolute inset-0 -z-10">
                <motion.div
                    className="absolute w-[600px] h-[600px] rounded-full blur-[120px] bg-purple-500/20"
                    style={{ left: '50%', top: '40%', transform: 'translate(-50%, -50%)' }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
            </div>

            {/* Badge */}
            <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/15 border border-purple-500/30 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <motion.div
                    className="w-2 h-2 rounded-full bg-purple-500"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-purple-400 text-sm font-medium tracking-wider uppercase">
                    Industry Transformation
                </span>
            </motion.div>

            {/* Main headline */}
            <motion.h2
                className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                AI is Reshaping
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                    The Mortgage Industry
                </span>
            </motion.h2>

            {/* Subtext */}
            <motion.p
                className="text-xl lg:text-2xl text-white/60 max-w-3xl mx-auto mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                The question isn&apos;t whether to adopt AI—it&apos;s how fast you can move.
                <br />
                <span className="text-white/80">LinkAI puts you ahead of the curve.</span>
            </motion.p>

            {/* Competitive positioning */}
            <motion.div
                className="flex items-center justify-center gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <div className="flex items-center gap-2 text-white/40">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <span>Others: Still Planning</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-semibold">GoodLeap: Already Live</span>
                </div>
            </motion.div>
        </div>
    );
}

// First Call Problem Content
function FirstCallProblemContent({ progress }: { progress: number }) {
    return (
        <div className="w-full max-w-[1800px] mx-auto px-8 lg:px-16 relative z-10">
            {/* Background glow */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div
                    className="absolute w-[900px] h-[900px] rounded-full blur-[180px] opacity-50"
                    style={{
                        backgroundColor: '#8B5CF6',
                        left: '40%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left: Enhanced BeforeStage visualization */}
                <motion.div 
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/40"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Background screenshot */}
                    <div className="absolute inset-0">
                        <Image
                            src="/assets/before-state.png"
                            alt="Complex data interface"
                            fill
                            className="object-cover object-top opacity-50"
                        />
                        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />
                    </div>

                    {/* Floating data icons */}
                    {SCATTERED_DATA.map((data, i) => (
                        <motion.div
                            key={data.label}
                            className="absolute z-10"
                            style={{ left: `${data.x}%`, top: `${data.y}%` }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ 
                                opacity: 1, 
                                scale: 1,
                                y: [0, -15, 0, 10, 0],
                                x: [0, 8, -8, 5, 0],
                            }}
                            transition={{ 
                                opacity: { delay: 0.3 + i * 0.1, duration: 0.4 },
                                scale: { delay: 0.3 + i * 0.1, duration: 0.4, type: "spring" },
                                y: { duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut" },
                                x: { duration: 5 + i * 0.2, repeat: Infinity, ease: "easeInOut" },
                            }}
                        >
                            <motion.div
                                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md"
                                animate={{ 
                                    boxShadow: [
                                        '0 0 15px rgba(139,92,246,0.2)',
                                        '0 0 30px rgba(139,92,246,0.4)',
                                        '0 0 15px rgba(139,92,246,0.2)',
                                    ]
                                }}
                                transition={{ duration: 2 + i * 0.2, repeat: Infinity }}
                            >
                                <span className="text-2xl">{data.icon}</span>
                                <span className="text-white/70 text-xs font-medium whitespace-nowrap">{data.label}</span>
                            </motion.div>
                        </motion.div>
                    ))}

                    {/* CENTER: Question mark */}
                    <motion.div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
                    >
                        <motion.div
                            className="w-32 h-32 rounded-full bg-red-500/20 border-4 border-red-500/60 flex items-center justify-center backdrop-blur-md"
                            animate={{ 
                                scale: [1, 1.1, 1],
                                boxShadow: [
                                    "0 0 40px rgba(239,68,68,0.3)",
                                    "0 0 80px rgba(239,68,68,0.6)",
                                    "0 0 40px rgba(239,68,68,0.3)"
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <span className="text-5xl text-red-400 font-bold">?</span>
                        </motion.div>
                    </motion.div>

                    {/* "Where do I start?" text */}
                    <motion.div
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 px-8 py-4 rounded-full bg-red-500/20 border-2 border-red-500/40"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ 
                            opacity: 1, 
                            y: 0,
                            boxShadow: [
                                "0 0 20px rgba(239,68,68,0.3)",
                                "0 0 40px rgba(239,68,68,0.5)",
                                "0 0 20px rgba(239,68,68,0.3)"
                            ]
                        }}
                        transition={{ 
                            opacity: { delay: 1.2 },
                            y: { delay: 1.2 },
                            boxShadow: { duration: 2, repeat: Infinity }
                        }}
                    >
                        <span className="text-red-400 text-2xl font-bold">Where do I start?</span>
                    </motion.div>
                </motion.div>

                {/* Right: Text Content */}
                <motion.div 
                    className="space-y-6"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-500/15 border border-purple-500/30">
                        <motion.div
                            className="w-2.5 h-2.5 rounded-full bg-purple-500"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span className="text-base font-medium tracking-[0.15em] uppercase text-purple-400">
                            THE FIRST CALL
                        </span>
                    </div>

                    <h2 className="font-bold text-white text-5xl lg:text-6xl leading-tight">
                        Refinance + HELOC Exploration
                    </h2>

                    <p className="font-medium text-3xl lg:text-4xl text-purple-400">
                        Starting with the Borrower
                    </p>

                    <p className="text-white/60 leading-relaxed text-xl lg:text-2xl max-w-xl">
                        A loan officer picks up the phone. The borrower wants options—but credit history, liabilities, assets, past loans, and property info are all scattered.
                    </p>

                    <motion.p 
                        className="text-white text-2xl lg:text-3xl font-semibold"
                        animate={{ 
                            color: ['rgba(255,255,255,0.9)', 'rgba(249,115,22,1)', 'rgba(255,255,255,0.9)']
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        How fast can you deliver?
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
}

// AI Assistants Content (Browser mockup)
function AIAssistantsContent() {
    return (
        <div className="w-full max-w-[1600px] mx-auto px-4 relative z-10">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[800px] bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-orange-500/10 blur-[180px] rounded-full -z-10" />

            {/* Badge */}
            <motion.div 
                className="flex justify-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08]">
                    <Sparkles className="w-5 h-5 text-orange-400" />
                    <span className="text-sm text-white/60 font-medium uppercase tracking-[0.15em]">Introducing AI-Powered Assistants</span>
                </div>
            </motion.div>

            {/* Browser Mockup */}
            <motion.div 
                className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#1a1a1f] shadow-2xl mx-auto"
                style={{ maxWidth: "1400px" }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                {/* Browser Chrome */}
                <div className="flex items-center gap-4 px-5 py-4 bg-[#2a2a30] border-b border-white/5">
                    <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f57]" />
                        <div className="w-3.5 h-3.5 rounded-full bg-[#febc2e]" />
                        <div className="w-3.5 h-3.5 rounded-full bg-[#28c840]" />
                    </div>
                    <div className="flex-1 flex justify-center">
                        <div className="flex items-center gap-2 px-5 py-2 bg-[#1a1a1f] rounded-lg border border-white/5 text-sm text-white/40">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <span>app.linkai.com/dashboard</span>
                        </div>
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="flex min-h-[520px]">
                    {/* Left Nav */}
                    <div className="hidden md:flex flex-col items-center py-5 px-4 bg-[#0f0f12] border-r border-white/5 w-20">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-8 text-white font-bold text-base">L</div>
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/10 text-white"><Home className="w-5 h-5" /></div>
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white/30"><FileText className="w-5 h-5" /></div>
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white/30"><LayoutGrid className="w-5 h-5" /></div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 p-8 flex flex-col justify-center bg-gradient-to-br from-[#0f0f12] to-[#13131a]">
                        <div className="mb-8">
                            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
                                <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
                                <span className="text-sm text-orange-400 font-medium uppercase tracking-wider">AI Agent</span>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-white/90 mb-4 leading-tight">
                                AI that helps loan officers{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-400">move faster</span>{" "}
                                and close better
                            </h2>
                            <p className="text-xl text-white/60 max-w-2xl leading-relaxed">
                                Automates the busywork behind the scenes so your team stays focused on customers
                            </p>
                        </div>
                    </div>

                    {/* AI Sidebar */}
                    <div className="w-80 bg-white border-l border-gray-100 flex flex-col">
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-5 py-4 border-b border-gray-100 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] flex items-center justify-center text-white">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-gray-900">AI Assistant</h3>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <span className="text-xs text-gray-500 font-medium">Initial Call</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-3 flex-1 space-y-2">
                            {[
                                { icon: Phone, color: "bg-blue-50 text-blue-600", title: "Call Prep", desc: "Customer briefing" },
                                { icon: Scale, color: "bg-purple-50 text-purple-600", title: "Liability AI", desc: "Debt analysis" },
                                { icon: Home, color: "bg-green-50 text-green-600", title: "Property AVM", desc: "Valuation analysis" },
                                { icon: MessageSquare, color: "bg-orange-50 text-orange-600", title: "Sales Coach", desc: "Objection handling" },
                            ].map((item) => (
                                <div key={item.title} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50">
                                    <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center`}>
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-900">{item.title}</h4>
                                        <p className="text-xs text-gray-500">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

// Feature Content (Generic for all features)
// 3-Phase Feature Content with progress-driven animation
function FeatureContent({ feature, progress }: { feature: typeof FEATURES[0]; progress: number }) {
    // Phase 1: Backend Animation (0-0.35)
    const backendOpacity = progress < 0.30 ? 1 : Math.max(0, 1 - (progress - 0.30) / 0.10);
    const backendScale = progress < 0.30 ? 1 : Math.max(0.8, 1 - (progress - 0.30) * 0.2);
    
    // Phase 2: AI Panel (0.25-0.70)
    const panelOpacity = progress > 0.25 && progress < 0.75 
        ? (progress < 0.35 ? (progress - 0.25) / 0.10 : 1) 
        : (progress >= 0.75 ? Math.max(0, 1 - (progress - 0.75) / 0.10) : 0);
    const panelScale = panelOpacity > 0 ? 0.95 + panelOpacity * 0.05 : 0.95;
    
    // Phase 3: App Context (0.65-1.0)
    const contextOpacity = progress > 0.65 ? Math.min(1, (progress - 0.65) / 0.10) : 0;
    const contextScale = contextOpacity > 0 ? 0.95 + contextOpacity * 0.05 : 0.95;

    // Get backend stage component
    const BackendStage = feature.id === 'rapport' ? Agent1StageBackend 
        : feature.id === 'salesCoach' ? Agent2StageBackend 
        : Agent3StageBackend;

    // Get AI panel component
    const AIPanel = feature.id === 'rapport' ? RapportBuilderPanel 
        : feature.id === 'salesCoach' ? SalesCoachPanel 
        : ValuationPanel;

    // Text floats left and shrinks in Phase 3
    const textScale = progress > 0.65 ? Math.max(0.5, 1 - (progress - 0.65) * 1.4) : 1;
    const textX = progress > 0.65 ? Math.min(0, -(progress - 0.65) * 800) : 0;
    const textOpacity = progress > 0.85 ? Math.max(0, 1 - (progress - 0.85) / 0.1) : 1;

    return (
        <div className="w-full h-full relative">
            {/* Background Glow */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <motion.div
                    className="absolute w-[800px] h-[800px] rounded-full blur-[150px]"
                    style={{ 
                        backgroundColor: feature.accentColor, 
                        left: '30%', 
                        top: '50%', 
                        transform: 'translate(-50%, -50%)',
                        opacity: 0.15 + progress * 0.1
                    }}
                />
            </div>

            {/* Phase indicator */}
            <div className="absolute top-4 right-4 flex gap-2 z-50">
                {[1, 2, 3].map((phase) => (
                    <div 
                        key={phase}
                        className="w-2 h-2 rounded-full transition-all duration-300"
                        style={{
                            backgroundColor: (phase === 1 && progress < 0.35) || (phase === 2 && progress >= 0.30 && progress < 0.70) || (phase === 3 && progress >= 0.65)
                                ? feature.accentColor
                                : 'rgba(255,255,255,0.2)'
                        }}
                    />
                ))}
            </div>

            {/* Phase 1 & 2: Side-by-side layout */}
            {contextOpacity < 0.9 && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full max-w-[1600px] mx-auto px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Text */}
                        <motion.div
                            className="space-y-5"
                            style={{ 
                                opacity: textOpacity, 
                                transform: `translateX(${textX}px) scale(${textScale})`,
                                transformOrigin: 'left center'
                            }}
                        >
                            <div
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                                style={{ backgroundColor: `${feature.accentColor}15`, border: `1px solid ${feature.accentColor}30` }}
                            >
                                <motion.div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: feature.accentColor }}
                                    animate={{ scale: [1, 1.3, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                                <span className="text-sm font-medium tracking-[0.15em] uppercase" style={{ color: feature.accentColor }}>
                                    {feature.label}
                                </span>
                            </div>

                            <h2 className="font-bold text-white text-4xl lg:text-5xl">{feature.title}</h2>
                            <p className="font-medium text-2xl lg:text-3xl" style={{ color: feature.accentColor }}>{feature.subtitle}</p>
                            <p className="text-white/60 leading-relaxed text-lg lg:text-xl max-w-xl">{feature.description}</p>
                            
                            {/* Call-to-action button */}
                            <div className="pt-4">
                                <div 
                                    className="inline-flex items-center gap-3 px-5 py-3 bg-white rounded-xl shadow-lg"
                                    style={{ borderColor: feature.accentColor, borderWidth: 2 }}
                                >
                                    <div 
                                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                                        style={{ backgroundColor: `${feature.accentColor}20`, color: feature.accentColor }}
                                    >
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-stone-800">{feature.title}</p>
                                        <p className="text-sm text-stone-500">{feature.subtitle}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right: Backend or Panel */}
                        <div className="relative">
                            {/* Phase 1: Backend Animation */}
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                style={{ 
                                    opacity: backendOpacity, 
                                    transform: `scale(${backendScale})`,
                                    pointerEvents: backendOpacity > 0.5 ? 'auto' : 'none'
                                }}
                            >
                                <BackendStage />
                            </motion.div>

                            {/* Phase 2: AI Panel */}
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                style={{ 
                                    opacity: panelOpacity, 
                                    transform: `scale(${panelScale})`,
                                    pointerEvents: panelOpacity > 0.5 ? 'auto' : 'none'
                                }}
                            >
                                <motion.div
                                    className="absolute -inset-6 rounded-3xl blur-2xl -z-10"
                                    style={{ backgroundColor: `${feature.accentColor}25`, opacity: panelOpacity * 0.6 }}
                                />
                                <AIPanel />
                            </motion.div>
                        </div>
                    </div>
                </div>
            )}

            {/* Phase 3: Full App Context */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{ 
                    opacity: contextOpacity, 
                    transform: `scale(${contextScale})`,
                    pointerEvents: contextOpacity > 0.5 ? 'auto' : 'none'
                }}
            >
                <LinkAIAppContext stageId={feature.id} />
            </motion.div>
        </div>
    );
}

// Beta Journey Content
function BetaJourneyContent({ progress }: { progress: number }) {
    const milestones = [
        { date: 'NOV 2024', title: 'V1 Launch', description: 'Launched to all loan officers', color: '#8B5CF6', badge: 'V1' },
        { date: 'FEB 2025', title: 'Beta Live', description: '15 Loan Officers on real customer calls with 2 AI assistants', color: '#10B981', badge: 'BETA' },
        { date: 'NEXT', title: 'Expanded Rollout', description: 'Reimagined pricing experience and HELOC integration', color: '#3B82F6', badge: 'SOON' },
    ];

    return (
        <div className="w-full max-w-[1400px] mx-auto px-8 lg:px-16 relative z-10">
            {/* Background */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute w-[800px] h-[800px] rounded-full blur-[180px] bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-emerald-500/20"
                    style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
            </div>

            {/* Header */}
            <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/30 mb-6">
                    <motion.div
                        className="w-2 h-2 rounded-full bg-emerald-500"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-sm text-emerald-400 font-medium uppercase tracking-wider">Beta Journey</span>
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                    From V1 Launch to{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400">
                        Real Customer Calls
                    </span>
                </h2>
                <p className="text-xl text-white/60">Rapid iteration from November to February</p>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 rounded-full -translate-y-1/2" />
                <motion.div
                    className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 rounded-full -translate-y-1/2"
                    initial={{ width: '0%' }}
                    animate={{ width: `${Math.min(100, progress * 150)}%` }}
                />

                <div className="relative flex justify-between items-center">
                    {milestones.map((milestone, i) => (
                        <motion.div
                            key={milestone.date}
                            className="flex flex-col items-center text-center"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.15 }}
                        >
                            <motion.div
                                className="w-16 h-16 rounded-full flex items-center justify-center border-4 mb-4"
                                style={{ borderColor: milestone.color, backgroundColor: `${milestone.color}20` }}
                                animate={{ 
                                    boxShadow: [
                                        `0 0 20px ${milestone.color}30`,
                                        `0 0 40px ${milestone.color}50`,
                                        `0 0 20px ${milestone.color}30`,
                                    ]
                                }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                            >
                                <span className="text-white font-bold text-sm">{milestone.badge}</span>
                            </motion.div>
                            <span className="text-white/40 text-sm font-medium mb-2">{milestone.date}</span>
                            <h3 className="text-white font-semibold text-lg mb-1">{milestone.title}</h3>
                            <p className="text-white/50 text-sm max-w-[200px]">{milestone.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <motion.div
                className="mt-16 flex justify-center gap-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <div className="text-center">
                    <p className="text-4xl font-bold text-emerald-400">15</p>
                    <p className="text-white/50 text-sm">Loan Officers Live</p>
                </div>
                <div className="text-center">
                    <p className="text-4xl font-bold text-blue-400">Real</p>
                    <p className="text-white/50 text-sm">Customer Calls</p>
                </div>
                <div className="text-center">
                    <p className="text-4xl font-bold text-purple-400">3</p>
                    <p className="text-white/50 text-sm">AI Assistants</p>
                </div>
            </motion.div>
        </div>
    );
}

// Roadmap Content
function RoadmapContent() {
    const quarters = [
        { id: 'q4-24', label: 'Q4\'24', items: ['Deal Structuring', 'Pricing V1'], status: 'completed' },
        { id: 'q1-25', label: 'Q1\'25', items: ['AI Rapport Builder', 'Sales Coach', 'Valuation AI', 'Beta Launch', 'Reimagined Pricing'], status: 'current', highlight: true },
        { id: 'q2-25', label: 'Q2\'25', items: ['Soft Credit Expansion', 'Full Pricing'], status: 'upcoming' },
    ];

    return (
        <div className="w-full max-w-[1600px] mx-auto px-8 lg:px-12 relative z-10">
            {/* Background */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute w-[900px] h-[600px] rounded-full blur-[150px] bg-gradient-to-r from-amber-500/15 to-orange-500/15"
                    style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
            </div>

            {/* Header */}
            <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/15 border border-amber-500/30 mb-6">
                    <motion.div
                        className="w-2 h-2 rounded-full bg-amber-500"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-sm text-amber-400 font-medium uppercase tracking-wider">Roadmap Preview</span>
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                    Complete Deal Structuring &{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Pricing</span>
                </h2>
            </motion.div>

            {/* Timeline */}
            <div className="flex justify-between items-start gap-4">
                {quarters.map((quarter, i) => (
                    <motion.div
                        key={quarter.id}
                        className={`flex-1 p-4 rounded-xl border ${
                            quarter.highlight 
                                ? 'bg-amber-500/10 border-amber-500/40' 
                                : quarter.status === 'completed' 
                                    ? 'bg-emerald-500/5 border-emerald-500/20'
                                    : 'bg-white/5 border-white/10'
                        }`}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.1 }}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className={`text-sm font-bold ${
                                quarter.highlight ? 'text-amber-400' : 
                                quarter.status === 'completed' ? 'text-emerald-400' : 'text-white/40'
                            }`}>
                                {quarter.label}
                            </span>
                            {quarter.status === 'completed' && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                            {quarter.highlight && (
                                <motion.div
                                    className="w-2 h-2 rounded-full bg-amber-500"
                                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                            )}
                        </div>
                        <div className="space-y-2">
                            {quarter.items.map((item) => (
                                <div
                                    key={item}
                                    className={`text-sm ${
                                        quarter.highlight ? 'text-white font-medium' : 
                                        quarter.status === 'completed' ? 'text-white/70' : 'text-white/40'
                                    }`}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Coming next */}
            <motion.div
                className="mt-10 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
            >
                <p className="text-white/40 text-sm uppercase tracking-wider mb-3">Coming Next</p>
                <div className="flex justify-center gap-6 flex-wrap">
                    {['Soft Credit Expansion', 'Product Integrations', 'Complex Rule Sets'].map((item, i) => (
                        <motion.span
                            key={item}
                            className="px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.9 + i * 0.1 }}
                        >
                            {item}
                        </motion.span>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

// Industry Leadership Content
function IndustryLeadershipContent() {
    return (
        <div className="text-center max-w-5xl px-8 relative z-10">
            {/* Background glow */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute w-[1000px] h-[1000px] rounded-full blur-[200px] bg-gradient-to-r from-orange-500/25 via-amber-500/25 to-yellow-500/25"
                    style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
            </div>

            {/* Badge */}
            <motion.div
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Zap className="w-5 h-5 text-orange-400" />
                <span className="text-base text-orange-400 font-semibold uppercase tracking-wider">Industry Leadership</span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
                className="text-5xl lg:text-7xl font-bold leading-tight mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <span className="text-white">Defining AI Differentiation</span>
                <br />
                <motion.span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400"
                    animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                    style={{ backgroundSize: '200% 200%' }}
                    transition={{ duration: 5, repeat: Infinity }}
                >
                    Through the Last Mile
                </motion.span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
                className="text-xl lg:text-2xl text-white/60 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                LLMs provide the intelligence. Our proprietary data—loan history, payment patterns, 
                credit profiles—delivers{' '}
                <span className="text-white font-semibold">the last mile that closes deals</span>.
            </motion.p>

            {/* Decorative elements */}
            <motion.div
                className="mt-12 flex justify-center gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                {['Loan History', 'Payment Patterns', 'Credit Profiles', 'Personalization'].map((item, i) => (
                    <motion.div
                        key={item}
                        className="flex items-center gap-2"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    >
                        <div className="w-2 h-2 rounded-full bg-orange-500" />
                        <span className="text-white/70 text-sm font-medium">{item}</span>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

// Executive Close Content
function ExecutiveCloseContent() {
    return (
        <div className="text-center max-w-4xl px-8 relative z-10">
            {/* Background */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute w-[600px] h-[600px] rounded-full blur-[150px] bg-orange-500/10"
                    style={{ left: '50%', top: '40%', transform: 'translate(-50%, -50%)' }} />
            </div>

            {/* Logo */}
            <motion.div
                className="mb-10"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <Image
                    src="https://cdn.bfldr.com/Q445447Z/at/k3spc358jhjrwwn9p2w6k2s/LinkAI_BG_FullGradonWht.png?auto=webp&format=png"
                    alt="LinkAI"
                    width={200}
                    height={80}
                    className="mx-auto"
                />
            </motion.div>

            {/* Close message */}
            <motion.div
                className="space-y-6 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <h2 className="text-3xl lg:text-4xl font-bold text-white">
                    Continued Progress Reports
                </h2>
                
                <div className="flex flex-col items-center gap-4">
                    <p className="text-xl text-white/60">Next up:</p>
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-blue-500/10 border border-blue-500/30">
                        <Sparkles className="w-5 h-5 text-blue-400" />
                        <span className="text-blue-400 font-semibold">Underwriting AI Tooling Introduction</span>
                    </div>
                </div>
            </motion.div>

            {/* Handoff */}
            <motion.div
                className="pt-8 border-t border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <p className="text-white/40 text-sm tracking-widest uppercase mb-3">Transitioning to</p>
                <p className="text-2xl text-white font-semibold">Ronni Anchondo</p>
            </motion.div>

            {/* Thank you */}
            <motion.p
                className="mt-10 text-white/30 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
            >
                Thank you
            </motion.p>
        </div>
    );
}

// ============================================================================
// JOURNEY LINE COMPONENT - Fixed at top
// ============================================================================
function JourneyLine({ activeFeatureIndex, progress }: { activeFeatureIndex: number; progress: number }) {
    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                {FEATURES.map((feature, i) => (
                    <div key={feature.id} className="flex items-center">
                        <div className="flex items-center gap-2">
                            <motion.div
                                className="w-3 h-3 rounded-full"
                                style={{
                                    backgroundColor: i <= activeFeatureIndex ? feature.accentColor : 'rgba(255,255,255,0.2)',
                                }}
                                animate={i === activeFeatureIndex ? {
                                    scale: [1, 1.3, 1],
                                    boxShadow: [
                                        `0 0 10px ${feature.accentColor}50`,
                                        `0 0 20px ${feature.accentColor}80`,
                                        `0 0 10px ${feature.accentColor}50`,
                                    ]
                                } : {}}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <span
                                className="text-sm font-medium"
                                style={{
                                    color: i === activeFeatureIndex ? feature.accentColor : i < activeFeatureIndex ? feature.accentColor : 'rgba(255,255,255,0.4)'
                                }}
                            >
                                {feature.title}
                            </span>
                            {i < activeFeatureIndex && (
                                <CheckCircle className="w-4 h-4" style={{ color: feature.accentColor }} />
                            )}
                        </div>
                        {i < FEATURES.length - 1 && (
                            <div className="w-8 h-0.5 mx-3 rounded-full overflow-hidden bg-white/10">
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{
                                        backgroundColor: i < activeFeatureIndex ? FEATURES[i + 1].accentColor : feature.accentColor,
                                        width: i < activeFeatureIndex ? '100%' : i === activeFeatureIndex ? `${progress * 100}%` : '0%'
                                    }}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

// ============================================================================
// STEVE INTRO SECTION (0:00 - 0:10) - Logo + Presenter
// ============================================================================
function SteveIntroSection({ scrollYProgress }: { scrollYProgress: any }) {
    // Content visible 0-0.85, then quick 1s fade out at the end
    const opacity = useTransform(scrollYProgress, [0, 0.80, 0.90, 1.0], [1, 1, 0.5, 0]);
    const x = useTransform(scrollYProgress, [0.85, 1.0], [0, -50]);
    const blur = useTransform(scrollYProgress, [0.85, 1.0], [0, 8]);
    const filterBlur = useTransform(blur, v => `blur(${v}px)`);

    return (
        <div className="h-screen relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />

            {/* Subtle animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute w-[600px] h-[600px] rounded-full blur-[120px] bg-orange-500/10"
                    style={{ left: '60%', top: '30%' }}
                    animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
            </div>

            <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{ 
                    opacity, 
                    x,
                    filter: filterBlur
                }}
            >
                <div className="text-center max-w-4xl px-8">
                    {/* LinkAI Logo */}
                    <motion.div
                        className="mb-8"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            animate={{
                                boxShadow: [
                                    '0 0 60px rgba(249,115,22,0.3)',
                                    '0 0 100px rgba(249,115,22,0.5)',
                                    '0 0 60px rgba(249,115,22,0.3)',
                                ]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="inline-block rounded-2xl p-2"
                        >
                            <Image
                                src="https://cdn.bfldr.com/Q445447Z/at/k3spc358jhjrwwn9p2w6k2s/LinkAI_BG_FullGradonWht.png?auto=webp&format=png"
                                alt="LinkAI"
                                width={280}
                                height={120}
                                className="mx-auto"
                                priority
                            />
                        </motion.div>
                    </motion.div>

                    {/* V1 Launch badge */}
                    <motion.div
                        className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-emerald-400 font-semibold text-lg">V1 Launched to All Loan Officers</span>
                    </motion.div>

                    {/* Presenter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 pt-8 border-t border-white/10"
                    >
                        <p className="text-white/40 text-sm tracking-widest uppercase mb-2">Presented by</p>
                        <p className="text-2xl text-white font-semibold">Steve Hulme</p>
                        <p className="text-white/50">VP Product, GoodLeap</p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

// ============================================================================
// INDUSTRY REVOLUTION SECTION (0:10 - 0:20)
// ============================================================================
function IndustryRevolutionSection({ scrollYProgress }: { scrollYProgress: any }) {
    // Quick fade in at start, visible most of the time, quick fade out at end
    const opacity = useTransform(scrollYProgress, [0, 0.08, 0.85, 0.95], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.08, 0.85, 0.95], [1.05, 1, 1, 0.95]);
    const blur = useTransform(scrollYProgress, [0.85, 0.95], [0, 8]);
    const filterBlur = useTransform(blur, v => `blur(${v}px)`);

    return (
        <div className="h-screen relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />

            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute w-[600px] h-[600px] rounded-full blur-[120px] bg-purple-500/15"
                    style={{ left: '50%', top: '40%', transform: 'translate(-50%, -50%)' }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
            </div>

            <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{ 
                    opacity, 
                    scale,
                    filter: filterBlur
                }}
            >
                <div className="text-center max-w-5xl px-8">
                    {/* Badge */}
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/15 border border-purple-500/30 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <motion.div
                            className="w-2 h-2 rounded-full bg-purple-500"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span className="text-purple-400 text-sm font-medium tracking-wider uppercase">
                            Industry Transformation
                        </span>
                    </motion.div>

                    {/* Main headline */}
                    <motion.h2
                        className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        AI is Reshaping
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                            The Mortgage Industry
                        </span>
                    </motion.h2>

                    {/* Subtext */}
                    <motion.p
                        className="text-xl lg:text-2xl text-white/60 max-w-3xl mx-auto mb-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        The question isn&apos;t whether to adopt AI—it&apos;s how fast you can move.
                        <br />
                        <span className="text-white/80">LinkAI puts you ahead of the curve.</span>
                    </motion.p>

                    {/* Competitive positioning */}
                    <motion.div
                        className="flex items-center justify-center gap-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="flex items-center gap-2 text-white/40">
                            <div className="w-2 h-2 rounded-full bg-red-500/50" />
                            <span>Others: Still Planning</span>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-400">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="font-semibold">GoodLeap: Already Live</span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

// ============================================================================
// FIRST CALL PROBLEM SECTION (0:20 - 0:35) - Enhanced animations
// ============================================================================
function FirstCallProblemSection({ scrollYProgress }: { scrollYProgress: any }) {
    // Quick fade in, visible most of time, split reveal out at end
    const opacity = useTransform(scrollYProgress, [0, 0.08, 0.85, 0.95], [0, 1, 1, 0]);
    const leftX = useTransform(scrollYProgress, [0.85, 1.0], [0, -80]);
    const rightX = useTransform(scrollYProgress, [0.85, 1.0], [0, 80]);
    const blur = useTransform(scrollYProgress, [0.85, 1.0], [0, 6]);
    const filterBlur = useTransform(blur, v => `blur(${v}px)`);
    const bgOpacity = useTransform(scrollYProgress, [0, 0.08, 0.85, 0.95], [0, 0.5, 0.5, 0]);

    return (
        <div className="h-screen flex items-center overflow-hidden relative">
            {/* Background glow */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ opacity: bgOpacity }}
            >
                <div
                    className="absolute w-[900px] h-[900px] rounded-full blur-[180px]"
                    style={{
                        backgroundColor: '#8B5CF6',
                        opacity: 0.2,
                        left: '40%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            </motion.div>

            <div className="w-full max-w-[1800px] mx-auto px-8 lg:px-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Enhanced BeforeStage with more animation */}
                    <motion.div 
                        className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/40"
                        style={{ 
                            opacity, 
                            x: leftX,
                            filter: filterBlur
                        }}
                    >
                        {/* Background screenshot */}
                        <div className="absolute inset-0">
                            <Image
                                src="/assets/before-state.png"
                                alt="Complex data interface"
                                fill
                                className="object-cover object-top opacity-50"
                            />
                            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />
                        </div>

                        {/* Enhanced floating data icons with MORE movement */}
                        {SCATTERED_DATA.map((data, i) => (
                            <motion.div
                                key={data.label}
                                className="absolute z-10"
                                style={{ left: `${data.x}%`, top: `${data.y}%` }}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ 
                                    opacity: 1, 
                                    scale: 1,
                                    y: [0, -15, 0, 10, 0],
                                    x: [0, 8, -8, 5, 0],
                                }}
                                transition={{ 
                                    opacity: { delay: 0.3 + i * 0.1, duration: 0.4 },
                                    scale: { delay: 0.3 + i * 0.1, duration: 0.4, type: "spring" },
                                    y: { duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut" },
                                    x: { duration: 5 + i * 0.2, repeat: Infinity, ease: "easeInOut" },
                                }}
                            >
                                <motion.div
                                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md"
                                    animate={{ 
                                        boxShadow: [
                                            '0 0 15px rgba(139,92,246,0.2)',
                                            '0 0 30px rgba(139,92,246,0.4)',
                                            '0 0 15px rgba(139,92,246,0.2)',
                                        ]
                                    }}
                                    transition={{ duration: 2 + i * 0.2, repeat: Infinity }}
                                >
                                    <span className="text-2xl">{data.icon}</span>
                                    <span className="text-white/70 text-xs font-medium whitespace-nowrap">{data.label}</span>
                                </motion.div>
                            </motion.div>
                        ))}

                        {/* CENTER: "Where do I start?" - 2X BIGGER with red pulse */}
                        <motion.div
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
                        >
                            <motion.div
                                className="w-32 h-32 rounded-full bg-red-500/20 border-3 border-red-500/60 flex items-center justify-center backdrop-blur-md"
                                animate={{ 
                                    scale: [1, 1.1, 1],
                                    boxShadow: [
                                        "0 0 40px rgba(239,68,68,0.3)",
                                        "0 0 80px rgba(239,68,68,0.6)",
                                        "0 0 40px rgba(239,68,68,0.3)"
                                    ]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <span className="text-5xl text-red-400 font-bold">?</span>
                            </motion.div>
                        </motion.div>

                        {/* "Where do I start?" text - 2X BIGGER */}
                        <motion.div
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 px-8 py-4 rounded-full bg-red-500/20 border-2 border-red-500/40"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ 
                                opacity: 1, 
                                y: 0,
                                boxShadow: [
                                    "0 0 20px rgba(239,68,68,0.3)",
                                    "0 0 40px rgba(239,68,68,0.5)",
                                    "0 0 20px rgba(239,68,68,0.3)"
                                ]
                            }}
                            transition={{ 
                                opacity: { delay: 1.2 },
                                y: { delay: 1.2 },
                                boxShadow: { duration: 2, repeat: Infinity }
                            }}
                        >
                            <span className="text-red-400 text-2xl font-bold">Where do I start?</span>
                        </motion.div>

                        {/* Data sources badge */}
                        <motion.div
                            className="absolute top-4 right-4 z-30 px-4 py-2 rounded-full bg-black/70 border border-white/20 backdrop-blur-sm"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <span className="text-white/80 text-sm">29+ accounts - 5 data sources</span>
                        </motion.div>
                    </motion.div>

                    {/* Right: Text Content */}
                    <motion.div 
                        className="space-y-6"
                        style={{ 
                            opacity, 
                            x: rightX,
                            filter: filterBlur
                        }}
                    >
                        {/* Label Badge */}
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-500/15 border border-purple-500/30">
                            <motion.div
                                className="w-2.5 h-2.5 rounded-full bg-purple-500"
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <span className="text-base font-medium tracking-[0.15em] uppercase text-purple-400">
                                THE FIRST CALL
                            </span>
                        </div>

                        <h2 className="font-bold text-white text-5xl lg:text-6xl leading-tight">
                            Refinance + HELOC Exploration
                        </h2>

                        <p className="font-medium text-3xl lg:text-4xl text-purple-400">
                            Starting with the Borrower
                        </p>

                        <p className="text-white/60 leading-relaxed text-xl lg:text-2xl max-w-xl">
                            A loan officer picks up the phone. The borrower wants options—but credit history, liabilities, assets, past loans, and property info are all scattered.
                        </p>

                        <motion.p 
                            className="text-white text-2xl lg:text-3xl font-semibold"
                            animate={{ 
                                color: ['rgba(255,255,255,0.9)', 'rgba(249,115,22,1)', 'rgba(255,255,255,0.9)']
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            How fast can you deliver?
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// AI ASSISTANTS SECTION (0:35 - 0:55) - Scale up entrance, zoom morph exit
// ============================================================================
function AIAssistantsSection({ scrollYProgress }: { scrollYProgress: any }) {
    // Quick scale up entrance, visible most of time, zoom morph out
    const opacity = useTransform(scrollYProgress, [0, 0.08, 0.85, 0.95], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.08, 0.85, 0.95], [0.92, 1, 1, 1.08]);
    const blur = useTransform(scrollYProgress, [0, 0.05, 0.88, 0.95], [6, 0, 0, 8]);
    const filterBlur = useTransform(blur, v => `blur(${v}px)`);

    return (
        <div className="h-screen flex items-center overflow-hidden relative">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[800px] bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-orange-500/10 blur-[180px] rounded-full" />

            <motion.div
                className="w-full max-w-[1600px] mx-auto px-4 relative z-10"
                style={{ opacity, scale, filter: filterBlur }}
            >
                {/* Badge */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08]">
                        <Sparkles className="w-5 h-5 text-orange-400" />
                        <span className="text-sm text-white/60 font-medium uppercase tracking-[0.15em]">Introducing AI-Powered Assistants</span>
                    </div>
                </div>

                {/* Full AgentTeaser Browser Mockup - centered */}
                <div 
                    className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#1a1a1f] shadow-2xl mx-auto"
                    style={{ 
                        transform: "rotateX(2deg)",
                        transformOrigin: "center bottom",
                        maxWidth: "1400px"
                    }}
                >
                    {/* Browser Chrome */}
                    <div className="flex items-center gap-4 px-5 py-4 bg-[#2a2a30] border-b border-white/5">
                        <div className="flex items-center gap-2">
                            <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f57]" />
                            <div className="w-3.5 h-3.5 rounded-full bg-[#febc2e]" />
                            <div className="w-3.5 h-3.5 rounded-full bg-[#28c840]" />
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="flex items-center gap-2 px-5 py-2 bg-[#1a1a1f] rounded-lg border border-white/5 text-sm text-white/40">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <span>app.linkai.com/dashboard</span>
                            </div>
                        </div>
                        <div className="w-16" />
                    </div>

                    {/* Dashboard Content */}
                    <div className="flex min-h-[520px]">
                        {/* Left Nav Sidebar */}
                        <div className="hidden md:flex flex-col items-center py-5 px-4 bg-[#0f0f12] border-r border-white/5 w-20">
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-8 text-white font-bold text-base">
                                L
                            </div>
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/10 text-white">
                                    <Home className="w-5 h-5" />
                                </div>
                                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white/30">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white/30">
                                    <LayoutGrid className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="mt-auto">
                                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white/30">
                                    <Settings className="w-5 h-5" />
                                </div>
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="flex-1 p-8 flex flex-col justify-center bg-gradient-to-br from-[#0f0f12] to-[#13131a]">
                            <div className="mb-8">
                                <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
                                    <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
                                    <span className="text-sm text-orange-400 font-medium uppercase tracking-wider">AI Agent</span>
                                </div>
                                <h2 className="text-4xl lg:text-5xl font-bold text-white/90 mb-4 leading-tight">
                                    AI that helps loan officers{" "}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-400">
                                        move faster
                                    </span>{" "}
                                    and close better
                                </h2>
                                <p className="text-xl text-white/60 max-w-2xl leading-relaxed">
                                    Automates the busywork behind the scenes so your team stays focused on customers
                                </p>
                            </div>

                            {/* Fake dashboard lines */}
                            <div className="space-y-4">
                                <div className="h-2.5 w-3/4 bg-white/5 rounded-full" />
                                <div className="h-2.5 w-1/2 bg-white/5 rounded-full" />
                                <div className="h-2.5 w-2/3 bg-white/5 rounded-full" />
                            </div>
                        </div>

                        {/* AI Sidebar */}
                        <div className="w-80 bg-white border-l border-gray-100 flex flex-col">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-5 py-4 border-b border-gray-100 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] flex items-center justify-center text-white">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold text-gray-900">AI Assistant</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                        <span className="text-xs text-gray-500 font-medium">Initial Call</span>
                                    </div>
                                </div>
                            </div>

                            {/* Search & Tabs */}
                            <div className="bg-white px-5 py-4 border-b border-gray-50 space-y-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <div className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-400">
                                        Select a tool to get started...
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-4 py-1.5 rounded-full bg-purple-50 text-[#8B5CF6] text-xs font-semibold">All</span>
                                    <span className="px-4 py-1.5 rounded-full text-gray-400 text-xs font-medium">Conversation</span>
                                    <span className="px-4 py-1.5 rounded-full text-gray-400 text-xs font-medium">Analysis</span>
                                </div>
                            </div>

                            {/* Agents List */}
                            <div className="bg-white p-3 flex-1 space-y-1">
                                <UseCaseAgentItem icon={Phone} color="bg-blue-50 text-blue-600" title="Call Prep" description="Customer briefing for calls" />
                                <UseCaseAgentItem icon={Scale} color="bg-purple-50 text-purple-600" title="Liability AI" description="Debt consolidation analysis" />
                                <UseCaseAgentItem icon={Home} color="bg-green-50 text-green-600" title="Property AVM" description="Property valuation analysis" />
                                <UseCaseAgentItem icon={MessageSquare} color="bg-orange-50 text-orange-600" title="Sales Coach" description="Objection handling & benefit calc" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Glow behind browser */}
                <div className="absolute -inset-8 bg-gradient-to-r from-purple-500/15 via-blue-500/10 to-orange-500/15 blur-3xl -z-10 rounded-3xl opacity-50" />

                {/* Scroll hint */}
                <div className="flex flex-col items-center gap-2 mt-10">
                    <span className="text-xs text-white/20 uppercase tracking-[0.3em]">See it in action</span>
                    <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
                </div>
            </motion.div>
        </div>
    );
}


// Helper for UseCaseSection
function UseCaseAgentItem({ icon: Icon, color, title, description }: { icon: any; color: string; title: string; description: string }) {
    return (
        <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
            <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
                <p className="text-xs text-gray-500 truncate">{description}</p>
            </div>
        </div>
    );
}

// ============================================================================
// COMPARISON SECTION (0:50 - 1:05) - 15 min vs seconds
// ============================================================================
function ComparisonSection({ scrollYProgress }: { scrollYProgress: any }) {
    // Cross-fade: fade out VERY EARLY before any visual scroll
    const opacity = useTransform(scrollYProgress, [0, 0.08, 0.85, 0.95], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.08, 0.85, 0.95], [1.03, 1, 1, 0.97]);
    const blur = useTransform(scrollYProgress, [0, 0.05, 0.88, 0.95], [5, 0, 0, 6]);
    const filterBlur = useTransform(blur, v => `blur(${v}px)`);

    // Timer animation
    const oldTimeProgress = useTransform(scrollYProgress, [0.2, 0.7], [0, 1]);
    const newTimeProgress = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

    return (
        <div className="h-screen flex items-center overflow-hidden relative">
            {/* Background */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ opacity: useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [0, 0.6, 0.6, 0]) }}
            >
                <div className="absolute w-[600px] h-[600px] rounded-full blur-[150px] bg-red-500/10" style={{ left: '20%', top: '40%' }} />
                <div className="absolute w-[600px] h-[600px] rounded-full blur-[150px] bg-emerald-500/10" style={{ right: '20%', top: '40%' }} />
            </motion.div>

            <motion.div
                className="w-full max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10"
                style={{ opacity, scale, filter: filterBlur }}
            >
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                        November Baseline
                    </h2>
                    <p className="text-xl text-white/60">Before LinkAI vs. After</p>
                </div>

                {/* Split comparison */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Old Way */}
                    <motion.div
                        className="relative p-8 rounded-2xl bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20"
                        style={{ opacity: useTransform(scrollYProgress, [0.1, 0.2], [0, 1]) }}
                    >
                        <div className="absolute -top-4 left-8 px-4 py-1.5 rounded-full bg-red-500/20 border border-red-500/30">
                            <span className="text-red-400 text-sm font-semibold">THE OLD WAY</span>
                        </div>

                        <div className="mt-6 space-y-4">
                            {[
                                { icon: '🔍', label: 'Search credit reports', time: '3 min' },
                                { icon: '📋', label: 'Pull property data', time: '4 min' },
                                { icon: '💰', label: 'Calculate scenarios', time: '5 min' },
                                { icon: '📝', label: 'Prepare talking points', time: '3 min' },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + i * 0.1 }}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{item.icon}</span>
                                        <span className="text-white/80">{item.label}</span>
                                    </div>
                                    <span className="text-red-400 font-mono">{item.time}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Total timer */}
                        <motion.div
                            className="mt-8 text-center"
                            style={{ scale: useTransform(oldTimeProgress, [0, 1], [0.9, 1]) }}
                        >
                            <p className="text-red-400/60 text-sm mb-2">Total Time</p>
                            <motion.p className="text-6xl font-bold text-red-400">
                                15+ min
                            </motion.p>
                        </motion.div>
                    </motion.div>

                    {/* New Way */}
                    <motion.div
                        className="relative p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20"
                        style={{
                            opacity: useTransform(scrollYProgress, [0.15, 0.25], [0, 1]),
                            scale: useTransform(newTimeProgress, [0, 1], [0.95, 1])
                        }}
                    >
                        <div className="absolute -top-4 left-8 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                            <span className="text-emerald-400 text-sm font-semibold">WITH LINKAI</span>
                        </div>

                        <div className="mt-6 flex flex-col items-center justify-center h-full min-h-[280px]">
                            {/* AI Processing Animation */}
                            <motion.div
                                className="relative w-32 h-32 mb-8"
                                animate={{
                                    rotate: [0, 360],
                                }}
                                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                            >
                                <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-500/30" />
                                <motion.div
                                    className="absolute inset-2 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center"
                                    animate={{
                                        boxShadow: [
                                            '0 0 30px rgba(16,185,129,0.3)',
                                            '0 0 60px rgba(16,185,129,0.5)',
                                            '0 0 30px rgba(16,185,129,0.3)',
                                        ]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <Zap className="w-12 h-12 text-white" />
                                </motion.div>
                            </motion.div>

                            <p className="text-emerald-400/60 text-sm mb-2">Total Time</p>
                            <motion.p
                                className="text-7xl font-bold text-emerald-400"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                Seconds
                            </motion.p>
                            <p className="text-white/40 text-sm mt-4">All data. All scenarios. Instantly.</p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

// ============================================================================
// WORKSPACE SECTION (1:05 - 1:25) - Uses animated WorkspaceReveal
// ============================================================================
function WorkspaceSection({ scrollYProgress }: { scrollYProgress: any }) {
    // Cross-fade: fade out VERY EARLY before any visual scroll
    const opacity = useTransform(scrollYProgress, [0, 0.08, 0.85, 0.95], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.08, 0.85, 0.95], [1.03, 1, 1, 0.97]);
    const blur = useTransform(scrollYProgress, [0, 0.05, 0.88, 0.95], [5, 0, 0, 6]);
    const filterBlur = useTransform(blur, v => `blur(${v}px)`);

    return (
        <div className="h-screen flex items-center overflow-hidden relative">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[800px] bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-orange-500/10 blur-[180px] rounded-full" />

            <motion.div
                className="w-full max-w-[1600px] mx-auto px-4 relative z-10"
                style={{ opacity, scale, filter: filterBlur }}
            >
                {/* Badge */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08]">
                        <Sparkles className="w-5 h-5 text-orange-400" />
                        <span className="text-sm text-white/60 font-medium uppercase tracking-[0.15em]">Introducing AI-Powered Assistants</span>
                    </div>
                </div>

                <div className="text-center mb-12">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white/90 mb-4 leading-tight">
                        AI that helps loan officers <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-400">
                            move faster
                        </span>{" "}
                        and close better
                    </h2>
                </div>

                {/* Animated Workspace Reveal */}
                <div className="flex justify-center">
                    <WorkspaceReveal isActive={true} />
                </div>
            </motion.div>
        </div>
    );
}

function WorkspaceAgentItem({ icon: Icon, color, title, description }: { icon: any; color: string; title: string; description: string }) {
    return (
        <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
            <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
                <p className="text-xs text-gray-500 truncate">{description}</p>
            </div>
        </div>
    );
}

// ============================================================================
// CAPABILITIES SECTION (1:25 - 1:55) - 4 capabilities walkthrough
// ============================================================================
function CapabilitiesSection({ scrollYProgress }: { scrollYProgress: any }) {
    // Cross-fade: fade out VERY EARLY before any visual scroll
    const opacity = useTransform(scrollYProgress, [0, 0.08, 0.85, 0.95], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.08, 0.85, 0.95], [0.97, 1, 1, 0.97]);
    const blur = useTransform(scrollYProgress, [0, 0.05, 0.88, 0.95], [6, 0, 0, 6]);
    const filterBlur = useTransform(blur, v => `blur(${v}px)`);

    // Map scroll progress to walkthrough progress (0 to 1)
    // We want the walkthrough to happen while the user is scrolling through the middle section
    const walkthroughProgress = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);

    // Convert to state for the component since it expects a number, not a MotionValue
    // However, for smooth animation, it's better if the component handled MotionValue. 
    // But since CapabilityWalkthrough expects number for index calculation, we can use a hook to get latest value or just pass the motion value key points.
    // Actually, CapabilityWalkthrough takes `progress: number`. 
    // To make it reactive to scroll, we need to pass the raw number or use a MotionValue in the component.
    // Let's modify CapabilityWalkthrough to be driven by a MotionValue or update it here.
    // For now, let's use a specialized wrapper or just pass the motion value and have the component use `useTransform`.
    // But since I can't change CapabilityWalkthrough's interface easily without another tool call, 
    // I will use a simple state bridge or just duplicate the logic if needed.
    // For now, let's use a specialized wrapper or just duplicate the logic if needed.
    // WAIT: CapabilityWalkthrough is a client component. I can pass a MotionValue <--- No, it defined `progress: number`.

    // Let's change CapabilityWalkthrough to accept MotionValue or just force re-render.
    // Actually, passing `progress` as a number to a component from a parent that uses `useTransform` requires `useMotionValueEvent` or similar.

    const [progress, setProgress] = useState(0);

    useMotionValueEvent(walkthroughProgress, "change", (latest: number) => {
        setProgress(latest);
    });

    return (
        <div className="h-screen flex items-center overflow-hidden relative">
            <motion.div
                className="w-full max-w-[1400px] mx-auto px-8 lg:px-16 relative z-10"
                style={{ opacity, scale, filter: filterBlur }}
            >
                <div className="text-center mb-12">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                        Four AI Capabilities
                    </h2>
                    <p className="text-xl text-white/60">Working together in every call</p>
                </div>

                <div className="flex justify-center">
                    <CapabilityWalkthrough progress={progress} />
                </div>
            </motion.div>
        </div>
    );
}

// ============================================================================
// BETA JOURNEY SECTION (2:18 - 2:50) - Nov to Feb evolution timeline
// ============================================================================
function BetaJourneySection({ scrollYProgress }: { scrollYProgress: any }) {
    const opacity = useTransform(scrollYProgress, [0, 0.08, 0.85, 0.95], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.08, 0.85, 0.95], [1.03, 1, 1, 0.97]);
    const blur = useTransform(scrollYProgress, [0, 0.05, 0.88, 0.95], [5, 0, 0, 6]);
    const filterBlur = useTransform(blur, v => `blur(${v}px)`);
    const bgOpacity = useTransform(scrollYProgress, [0, 0.08, 0.85, 0.95], [0, 0.5, 0.5, 0]);
    
    // Timeline progress
    const timelineProgress = useTransform(scrollYProgress, [0.44, 0.56], [0, 1]);

    const milestones = [
        { 
            date: 'NOV 2024', 
            title: 'V1 Launch', 
            description: 'Launched to all loan officers',
            color: '#8B5CF6',
            badge: 'V1'
        },
        { 
            date: 'FEB 2025', 
            title: 'Beta Live', 
            description: '15 Loan Officers on real customer calls with 2 AI assistants',
            color: '#10B981',
            badge: 'BETA'
        },
        { 
            date: 'NEXT', 
            title: 'Expanded Rollout', 
            description: 'Reimagined pricing experience and HELOC integration',
            color: '#3B82F6',
            badge: 'SOON'
        },
    ];

    return (
        <div className="h-screen flex items-center overflow-hidden relative">
            {/* Background */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ opacity: useTransform(scrollYProgress, [0.38, 0.44, 0.56, 0.62], [0, 0.5, 0.5, 0]) }}
            >
                <div className="absolute w-[800px] h-[800px] rounded-full blur-[180px] bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-emerald-500/20"
                    style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
            </motion.div>

            <motion.div
                className="w-full max-w-[1400px] mx-auto px-8 lg:px-16 relative z-10"
                style={{ opacity, scale, filter: filterBlur }}
            >
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/30 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <motion.div
                            className="w-2 h-2 rounded-full bg-emerald-500"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span className="text-sm text-emerald-400 font-medium uppercase tracking-wider">Beta Journey</span>
                    </motion.div>
                    
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                    From V1 Launch to{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400">
                        Real Customer Calls
                    </span>
                </h2>
                <p className="text-xl text-white/60 max-w-2xl mx-auto">
                    Rapid iteration from November to February
                </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 rounded-full -translate-y-1/2" />
                    <motion.div
                        className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 rounded-full -translate-y-1/2"
                        style={{ width: useTransform(timelineProgress, [0, 1], ['0%', '100%']) }}
                    />

                    {/* Milestones */}
                    <div className="relative flex justify-between items-center">
                        {milestones.map((milestone, i) => (
                            <motion.div
                                key={milestone.date}
                                className="flex flex-col items-center text-center"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.15 }}
                            >
                                {/* Milestone dot */}
                                <motion.div
                                    className="w-16 h-16 rounded-full flex items-center justify-center border-4 mb-4"
                                    style={{ 
                                        borderColor: milestone.color,
                                        backgroundColor: `${milestone.color}20`
                                    }}
                                    animate={{ 
                                        boxShadow: [
                                            `0 0 20px ${milestone.color}30`,
                                            `0 0 40px ${milestone.color}50`,
                                            `0 0 20px ${milestone.color}30`,
                                        ]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                                >
                                    <span className="text-white font-bold text-sm">{milestone.badge}</span>
                                </motion.div>

                                {/* Date */}
                                <span className="text-white/40 text-sm font-medium mb-2">{milestone.date}</span>
                                
                                {/* Title */}
                                <h3 className="text-white font-semibold text-lg mb-1">{milestone.title}</h3>
                                
                                {/* Description */}
                                <p className="text-white/50 text-sm max-w-[200px]">{milestone.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Stats at bottom */}
                <motion.div
                    className="mt-16 flex justify-center gap-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="text-center">
                        <p className="text-4xl font-bold text-emerald-400">15</p>
                        <p className="text-white/50 text-sm">Loan Officers Live</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl font-bold text-blue-400">Real</p>
                        <p className="text-white/50 text-sm">Customer Calls</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl font-bold text-purple-400">3</p>
                        <p className="text-white/50 text-sm">AI Assistants</p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

// ============================================================================
// ROADMAP SECTION (2:50 - 3:05) - Animated roadmap timeline
// ============================================================================
function RoadmapSection({ scrollYProgress }: { scrollYProgress: any }) {
    const opacity = useTransform(scrollYProgress, [0, 0.08, 0.85, 0.95], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.08, 0.85, 0.95], [1.03, 1, 1, 0.97]);
    const blur = useTransform(scrollYProgress, [0, 0.05, 0.88, 0.95], [5, 0, 0, 6]);
    const filterBlur = useTransform(blur, v => `blur(${v}px)`);
    const bgOpacity = useTransform(scrollYProgress, [0, 0.08, 0.85, 0.95], [0, 0.4, 0.4, 0]);
    
    const quarters = [
        { 
            id: 'pre', 
            label: 'PRE', 
            items: ['Research & Planning', 'Architecture Design'],
            status: 'completed'
        },
        { 
            id: 'q3', 
            label: 'Q3\'25', 
            items: ['Rapport Builder', 'Sales Coach'],
            status: 'completed'
        },
        { 
            id: 'q4', 
            label: 'Q4\'25', 
            items: ['Valuation AI', 'Beta Launch'],
            status: 'completed'
        },
        { 
            id: 'q1', 
            label: 'Q1\'26', 
            items: ['Soft Credit Expansion', 'Product Integrations'],
            status: 'current',
            highlight: true
        },
        { 
            id: 'q2', 
            label: 'Q2\'26', 
            items: ['Complex Rule Sets', 'Advanced Analytics'],
            status: 'upcoming'
        },
    ];

    return (
        <div className="h-screen flex items-center overflow-hidden relative">
            {/* Background */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ opacity: useTransform(scrollYProgress, [0.38, 0.44, 0.56, 0.62], [0, 0.4, 0.4, 0]) }}
            >
                <div className="absolute w-[900px] h-[600px] rounded-full blur-[150px] bg-gradient-to-r from-amber-500/15 to-orange-500/15"
                    style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
            </motion.div>

            <motion.div
                className="w-full max-w-[1600px] mx-auto px-8 lg:px-12 relative z-10"
                style={{ opacity, scale, filter: filterBlur }}
            >
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/15 border border-amber-500/30 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <motion.div
                            className="w-2 h-2 rounded-full bg-amber-500"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span className="text-sm text-amber-400 font-medium uppercase tracking-wider">Roadmap Preview</span>
                    </motion.div>
                    
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                        Complete Deal Structuring &{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                            Pricing
                        </span>
                    </h2>
                </div>

                {/* Timeline */}
                <div className="relative overflow-hidden">
                    {/* Timeline track */}
                    <div className="flex justify-between items-start gap-4">
                        {quarters.map((quarter, i) => (
                            <motion.div
                                key={quarter.id}
                                className={`flex-1 p-4 rounded-xl border ${
                                    quarter.highlight 
                                        ? 'bg-amber-500/10 border-amber-500/40' 
                                        : quarter.status === 'completed' 
                                            ? 'bg-emerald-500/5 border-emerald-500/20'
                                            : 'bg-white/5 border-white/10'
                                }`}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + i * 0.1 }}
                            >
                                {/* Quarter label */}
                                <div className="flex items-center justify-between mb-3">
                                    <span className={`text-sm font-bold ${
                                        quarter.highlight ? 'text-amber-400' : 
                                        quarter.status === 'completed' ? 'text-emerald-400' : 'text-white/40'
                                    }`}>
                                        {quarter.label}
                                    </span>
                                    {quarter.status === 'completed' && (
                                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                                    )}
                                    {quarter.highlight && (
                                        <motion.div
                                            className="w-2 h-2 rounded-full bg-amber-500"
                                            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        />
                                    )}
                                </div>

                                {/* Items */}
                                <div className="space-y-2">
                                    {quarter.items.map((item, j) => (
                                        <motion.div
                                            key={item}
                                            className={`text-sm ${
                                                quarter.highlight ? 'text-white font-medium' : 
                                                quarter.status === 'completed' ? 'text-white/70' : 'text-white/40'
                                            }`}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.3 + i * 0.1 + j * 0.05 }}
                                        >
                                            {item}
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Coming next */}
                <motion.div
                    className="mt-10 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <p className="text-white/40 text-sm uppercase tracking-wider mb-3">Coming Next</p>
                    <div className="flex justify-center gap-6 flex-wrap">
                        {['Soft Credit Expansion', 'Product Integrations', 'Complex Rule Sets'].map((item, i) => (
                            <motion.span
                                key={item}
                                className="px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.9 + i * 0.1 }}
                            >
                                {item}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

// ============================================================================
// INDUSTRY LEADERSHIP SECTION (3:05 - 3:18)
// ============================================================================
function IndustryLeadershipSection({ scrollYProgress }: { scrollYProgress: any }) {
    const opacity = useTransform(scrollYProgress, [0, 0.08, 0.85, 0.95], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.08, 0.85, 0.95], [0.95, 1, 1, 1.05]);
    const blur = useTransform(scrollYProgress, [0, 0.05, 0.88, 0.95], [6, 0, 0, 8]);
    const filterBlur = useTransform(blur, v => `blur(${v}px)`);
    const bgOpacity = useTransform(scrollYProgress, [0, 0.08, 0.85, 0.95], [0, 0.6, 0.6, 0]);

    return (
        <div className="h-screen flex items-center justify-center overflow-hidden relative">
            {/* Background glow */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ opacity: bgOpacity }}
            >
                <div className="absolute w-[1000px] h-[1000px] rounded-full blur-[200px] bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-yellow-500/20"
                    style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
            </motion.div>

            <motion.div
                className="text-center max-w-5xl px-8 relative z-10"
                style={{ opacity, scale, filter: filterBlur }}
            >
                {/* Badge */}
                <motion.div
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Zap className="w-5 h-5 text-orange-400" />
                    <span className="text-base text-orange-400 font-semibold uppercase tracking-wider">Industry Leadership</span>
                </motion.div>

                {/* Main headline with gradient animation */}
                <motion.h1
                    className="text-5xl lg:text-7xl font-bold leading-tight mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <span className="text-white">Defining AI Differentiation</span>
                    <br />
                    <motion.span
                        className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400"
                        animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }}
                        style={{ backgroundSize: '200% 200%' }}
                        transition={{ duration: 5, repeat: Infinity }}
                    >
                        Through the Last Mile
                    </motion.span>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    className="text-xl lg:text-2xl text-white/60 max-w-3xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    LLMs provide the intelligence. Our proprietary data—loan history, payment patterns, 
                    credit profiles—delivers{' '}
                    <span className="text-white font-semibold">the last mile that closes deals</span>.
                </motion.p>

                {/* Decorative elements */}
                <motion.div
                    className="mt-12 flex justify-center gap-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    {['Loan History', 'Payment Patterns', 'Credit Profiles', 'Personalization'].map((item, i) => (
                        <motion.div
                            key={item}
                            className="flex items-center gap-2"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        >
                            <div className="w-2 h-2 rounded-full bg-orange-500" />
                            <span className="text-white/70 text-sm font-medium">{item}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
}

// ============================================================================
// EXECUTIVE CLOSE SECTION (3:18 - 3:35) - Handoff to Ronni
// ============================================================================
function ExecutiveCloseSection({ scrollYProgress }: { scrollYProgress: any }) {
    const opacity = useTransform(scrollYProgress, [0, 0.08, 0.90, 1.0], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.08, 0.90, 1.0], [1.02, 1, 1, 0.98]);
    const blur = useTransform(scrollYProgress, [0, 0.05, 0.92, 1.0], [4, 0, 0, 5]);
    const filterBlur = useTransform(blur, v => `blur(${v}px)`);
    const bgOpacity = useTransform(scrollYProgress, [0, 0.08, 0.90, 1.0], [0, 0.3, 0.3, 0]);

    return (
        <div className="h-screen flex items-center justify-center overflow-hidden relative">
            {/* Background - elegant fade */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ opacity: bgOpacity }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
                <div className="absolute w-[600px] h-[600px] rounded-full blur-[150px] bg-orange-500/10"
                    style={{ left: '50%', top: '40%', transform: 'translate(-50%, -50%)' }} />
            </motion.div>

            <motion.div
                className="text-center max-w-4xl px-8 relative z-10"
                style={{ opacity, scale, filter: filterBlur }}
            >
                {/* Logo */}
                <motion.div
                    className="mb-10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <Image
                        src="https://cdn.bfldr.com/Q445447Z/at/k3spc358jhjrwwn9p2w6k2s/LinkAI_BG_FullGradonWht.png?auto=webp&format=png"
                        alt="LinkAI"
                        width={200}
                        height={80}
                        className="mx-auto"
                    />
                </motion.div>

                {/* Close message */}
                <motion.div
                    className="space-y-6 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2 className="text-3xl lg:text-4xl font-bold text-white">
                        Continued Progress Reports
                    </h2>
                    
                    <div className="flex flex-col items-center gap-4">
                        <p className="text-xl text-white/60">Next up:</p>
                        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-blue-500/10 border border-blue-500/30">
                            <Sparkles className="w-5 h-5 text-blue-400" />
                            <span className="text-blue-400 font-semibold">Underwriting AI Tooling Introduction</span>
                        </div>
                    </div>
                </motion.div>

                {/* Handoff */}
                <motion.div
                    className="pt-8 border-t border-white/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <p className="text-white/40 text-sm tracking-widest uppercase mb-3">Transitioning to</p>
                    <p className="text-2xl text-white font-semibold">Ronni Anchondo</p>
                </motion.div>

                {/* Thank you */}
                <motion.p
                    className="mt-10 text-white/30 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                >
                    Thank you
                </motion.p>
            </motion.div>
        </div>
    );
}

// ============================================================================
// FEATURE SECTION - Clean 2-column layout with journey animation
// ============================================================================
function FeatureSection({
    feature,
    panel,
    scrollYProgress
}: {
    feature: typeof FEATURES[0];
    panel: React.ReactNode;
    scrollYProgress: any;
}) {
    // Quick fade in, visible most of time, quick fade out
    const textOpacity = useTransform(scrollYProgress, [0, 0.08, 0.85, 0.95], [0, 1, 1, 0]);
    const textScale = useTransform(scrollYProgress, [0, 0.08, 0.85, 0.95], [1.03, 1, 1, 0.97]);
    const textBlur = useTransform(scrollYProgress, [0, 0.05, 0.88, 0.95], [4, 0, 0, 6]);
    const textFilterBlur = useTransform(textBlur, v => `blur(${v}px)`);

    // Panel - same timing
    const panelOpacity = useTransform(scrollYProgress, [0.02, 0.10, 0.85, 0.95], [0, 1, 1, 0]);
    const panelScale = useTransform(scrollYProgress, [0.02, 0.10, 0.85, 0.95], [1.03, 1, 1, 0.97]);
    const panelBlur = useTransform(scrollYProgress, [0.02, 0.08, 0.88, 0.95], [5, 0, 0, 6]);
    const panelFilterBlur = useTransform(panelBlur, v => `blur(${v}px)`);

    // Background glow
    const glowOpacity = useTransform(scrollYProgress, [0.35, 0.42, 0.58, 0.62], [0, 0.5, 0.5, 0]);

    // Journey line animation - data flowing from left to right
    const lineProgress = useTransform(scrollYProgress, [0.40, 0.55], [0, 1]);
    const dataFlowX = useTransform(scrollYProgress, [0.38, 0.48], [-50, 0]);

    return (
        <div className="relative min-h-[120vh]">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                {/* Background Glow */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ opacity: glowOpacity }}
                >
                    <div
                        className="absolute w-[800px] h-[800px] rounded-full blur-[150px]"
                        style={{
                            backgroundColor: feature.accentColor,
                            opacity: 0.15,
                            left: '30%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                </motion.div>

                {/* Content Container */}
                <div className="w-full max-w-[1800px] mx-auto px-8 lg:px-16 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-center">

                        {/* Left: Text Content */}
                        <motion.div
                            className="space-y-5"
                            style={{
                                opacity: textOpacity,
                                scale: textScale,
                                filter: textFilterBlur
                            }}
                        >
                            {/* Label Badge */}
                            <div
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                                style={{
                                    backgroundColor: `${feature.accentColor}15`,
                                    border: `1px solid ${feature.accentColor}30`
                                }}
                            >
                                <motion.div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: feature.accentColor }}
                                    animate={{ scale: [1, 1.3, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                                <span
                                    className="text-sm font-medium tracking-[0.15em] uppercase"
                                    style={{ color: feature.accentColor }}
                                >
                                    {feature.label}
                                </span>
                            </div>

                            {/* Title */}
                            <h2 className="font-bold text-white text-5xl lg:text-6xl">
                                {feature.title}
                            </h2>

                            {/* Subtitle */}
                            <p
                                className="font-medium text-3xl lg:text-4xl"
                                style={{ color: feature.accentColor }}
                            >
                                {feature.subtitle}
                            </p>

                            {/* Description */}
                            <p className="text-white/60 leading-relaxed text-xl lg:text-2xl max-w-xl">
                                {feature.description}
                            </p>
                        </motion.div>

                        {/* Center: Animated Journey Line */}
                        <motion.div
                            className="hidden lg:flex flex-col items-center gap-4 px-8"
                            style={{ opacity: textOpacity }}
                        >
                            {/* Data flow animation */}
                            <motion.div
                                className="w-32 h-1 rounded-full overflow-hidden"
                                style={{ backgroundColor: `${feature.accentColor}20` }}
                            >
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{
                                        backgroundColor: feature.accentColor,
                                        width: useTransform(lineProgress, v => `${v * 100}%`)
                                    }}
                                />
                            </motion.div>

                            {/* Animated dots flowing */}
                            <div className="relative h-40 flex items-center">
                                <svg width="120" height="160" className="overflow-visible">
                                    {/* Curved path */}
                                    <motion.path
                                        d="M 10 0 Q 60 40, 60 80 Q 60 120, 110 160"
                                        fill="none"
                                        stroke={feature.accentColor}
                                        strokeWidth="2"
                                        strokeDasharray="6 4"
                                        style={{
                                            pathLength: lineProgress,
                                            opacity: 0.5
                                        }}
                                    />
                                    {/* Animated dot traveling along path */}
                                    <motion.circle
                                        r="6"
                                        fill={feature.accentColor}
                                        style={{
                                            cx: useTransform(lineProgress, [0, 0.5, 1], [10, 60, 110]),
                                            cy: useTransform(lineProgress, [0, 0.5, 1], [0, 80, 160]),
                                            filter: `drop-shadow(0 0 8px ${feature.accentColor})`
                                        }}
                                    />
                                </svg>
                            </div>

                            <motion.div
                                className="w-32 h-1 rounded-full overflow-hidden"
                                style={{ backgroundColor: `${feature.accentColor}20` }}
                            >
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{
                                        backgroundColor: feature.accentColor,
                                        width: useTransform(lineProgress, v => `${v * 100}%`)
                                    }}
                                />
                            </motion.div>
                        </motion.div>

                        {/* Right: Panel */}
                        <motion.div
                            className="relative"
                            style={{
                                opacity: panelOpacity,
                                scale: panelScale,
                                filter: panelFilterBlur
                            }}
                        >
                            {/* Glow behind panel */}
                            <motion.div
                                className="absolute -inset-6 rounded-3xl blur-2xl -z-10"
                                style={{ backgroundColor: `${feature.accentColor}25` }}
                                animate={{
                                    opacity: [0.4, 0.6, 0.4]
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                            {panel}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// LAST MILE / CLOSING SECTION
// ============================================================================
function ClosingSection({ scrollYProgress }: { scrollYProgress: any }) {
    // Cross-fade in and hold (no exit since this is the last section)
    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 1]);
    const scale = useTransform(scrollYProgress, [0, 0.1], [1.03, 1]);
    const blur = useTransform(scrollYProgress, [0, 0.08], [6, 0]);
    const filterBlur = useTransform(blur, v => `blur(${v}px)`);

    return (
        <motion.div
            className="h-screen flex items-center justify-center"
            style={{ opacity, scale, filter: filterBlur }}
        >
            <div className="text-center max-w-3xl mx-auto px-8">
                <motion.div
                    className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center"
                    animate={{
                        boxShadow: [
                            '0 0 40px rgba(249,115,22,0.4)',
                            '0 0 80px rgba(249,115,22,0.6)',
                            '0 0 40px rgba(249,115,22,0.4)',
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <Zap className="w-10 h-10 text-white" />
                </motion.div>

                <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
                    The Platform That Thinks Ahead
                </h2>

                <p className="text-white/60 text-xl lg:text-2xl mb-12">
                    AI assistants built into the loan officer workflow
                </p>

                {/* Status indicators */}
                <div className="flex items-center justify-center gap-8">
                    <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                        <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-emerald-400 font-medium">LinkAI 1.0 - LIVE</span>
                    </div>
                    <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-orange-500/10 border border-orange-500/30">
                        <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-orange-400 font-medium">LinkAI 2.0 - BETA (15 LOs)</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ============================================================================
// PANEL COMPONENTS - Full AI Panels from Main Page
// ============================================================================

// Full Rapport Builder Panel (Call Prep Brief) - Phase 2
function RapportBuilderPanel() {
    const accentColor = '#D946EF';
    return (
        <div className="relative w-[600px]">
            {/* Outer glow */}
            <motion.div
                className="absolute -inset-4 rounded-2xl blur-2xl -z-10"
                style={{ backgroundColor: `${accentColor}25` }}
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Panel container */}
            <div
                className="rounded-xl bg-white flex flex-col max-h-[75vh] overflow-hidden"
                style={{ boxShadow: `0 0 60px ${accentColor}20, 0 25px 50px rgba(0,0,0,0.4)` }}
            >
                {/* Header */}
                <div className="px-5 py-4 bg-white border-b border-black/5 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                <Phone className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-[#1d1d1f] tracking-tight">Call Prep Brief</h1>
                                <p className="text-xs text-[#86868b]">Everything you need for the first 5 minutes</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Warning Banner */}
                <div className="px-4 py-2 bg-amber-50 border-b border-amber-100 flex-shrink-0">
                    <p className="text-xs text-amber-700"><span className="font-semibold">AI-Generated</span> — Verify all facts</p>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-5 bg-[#f5f5f7]">
                    <div className="space-y-3">
                        {/* Summary Card */}
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <p className="text-sm font-medium text-[#1d1d1f] leading-relaxed">
                                The customer is a near-prime borrower in McKinney, TX, looking for options to manage their debt and improve their financial situation.
                            </p>
                        </div>

                        {/* Financial Stats Row 1 */}
                        <div className="grid grid-cols-3 gap-2">
                            <div className="bg-white rounded-xl p-3 shadow-sm">
                                <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center mb-2">
                                    <Home className="w-3.5 h-3.5 text-white" />
                                </div>
                                <p className="text-xl font-bold text-[#1d1d1f]">$785K</p>
                                <p className="text-[10px] text-[#86868b]">Property Value</p>
                            </div>
                            <div className="bg-white rounded-xl p-3 shadow-sm">
                                <div className="w-7 h-7 rounded-lg bg-purple-500 flex items-center justify-center mb-2">
                                    <FileText className="w-3.5 h-3.5 text-white" />
                                </div>
                                <p className="text-xl font-bold text-[#1d1d1f]">$428K</p>
                                <p className="text-[10px] text-[#86868b]">Total Liens</p>
                            </div>
                            <div className="bg-green-50 rounded-xl p-3 shadow-sm border border-green-100">
                                <div className="w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center mb-2">
                                    <TrendingUp className="w-3.5 h-3.5 text-white" />
                                </div>
                                <p className="text-xl font-bold text-green-600">$358K</p>
                                <p className="text-[10px] text-green-700">Equity</p>
                            </div>
                        </div>

                        {/* Financial Stats Row 2 */}
                        <div className="grid grid-cols-3 gap-2">
                            <div className="bg-white rounded-xl p-3 shadow-sm">
                                <p className="text-lg font-bold text-[#1d1d1f]">$56K</p>
                                <p className="text-[10px] text-[#86868b]">Other Debt</p>
                            </div>
                            <div className="bg-white rounded-xl p-3 shadow-sm">
                                <p className="text-lg font-bold text-[#1d1d1f]">$1,196</p>
                                <p className="text-[10px] text-[#86868b]">Monthly</p>
                            </div>
                            <div className="bg-white rounded-xl p-3 shadow-sm">
                                <p className="text-lg font-bold text-[#1d1d1f]">608 / 650</p>
                                <p className="text-[10px] text-[#86868b]">Credit</p>
                            </div>
                        </div>

                        {/* How We Can Help */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                            <div className="p-4 bg-purple-50/50">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-6 h-6 rounded-lg bg-purple-500 flex items-center justify-center">
                                        <Zap className="w-3 h-3 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-sm text-[#1d1d1f]">How We Can Help</h3>
                                </div>
                                <div className="space-y-2">
                                    {["Explore debt consolidation options", "Potential for rate and term refinance", "Discuss credit improvement strategies"].map((item, i) => (
                                        <div key={i} className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                            <p className="text-xs text-[#1d1d1f]">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Suggested Talk Track */}
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-6 h-6 rounded-lg bg-orange-500 flex items-center justify-center">
                                    <MessageSquare className="w-3 h-3 text-white" />
                                </div>
                                <h3 className="font-semibold text-sm text-[#1d1d1f]">Suggested Talk Track</h3>
                            </div>
                            <div className="space-y-2">
                                <div className="p-3 rounded-lg bg-orange-50 border border-orange-100">
                                    <p className="text-[10px] font-semibold text-orange-600 mb-1">Opening Line</p>
                                    <p className="text-xs text-[#1d1d1f] italic">&quot;Thank you for taking the time to speak with me today about your financial goals.&quot;</p>
                                </div>
                                <div className="p-3 rounded-lg bg-green-50 border border-green-100">
                                    <p className="text-[10px] font-semibold text-green-600 mb-1">Value Statement</p>
                                    <p className="text-xs text-[#1d1d1f] italic">&quot;We can look into options that may simplify your payments and potentially lower your interest rates.&quot;</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Full Sales Coach Presentation Panel (from main page)
function SalesCoachPanel() {
    const accentColor = '#F97316';
    return (
        <div className="relative w-[600px]">
            {/* Outer glow */}
            <motion.div
                className="absolute -inset-4 rounded-2xl blur-2xl -z-10"
                style={{ backgroundColor: `${accentColor}25` }}
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Panel container */}
            <div
                className="rounded-xl bg-white flex flex-col max-h-[75vh] overflow-hidden"
                style={{ boxShadow: `0 0 60px ${accentColor}20, 0 25px 50px rgba(0,0,0,0.4)` }}
            >
                {/* Header */}
                <div className="px-5 py-4 bg-white border-b border-black/5 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                                <MessageSquare className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-[#1d1d1f] tracking-tight">Sales Coach</h1>
                                <p className="text-xs text-[#86868b]">Rate too high objection</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Warning Banner */}
                <div className="px-4 py-2 bg-amber-50 border-b border-amber-100 flex-shrink-0">
                    <p className="text-xs text-amber-700"><span className="font-semibold">AI Sales Coach</span> - Uses your loan scenario data for personalized guidance</p>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-5 bg-[#f5f5f7]">
                    <div className="space-y-3">
                        {/* AI Avatar */}
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg">
                                <Zap className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-[#1d1d1f]">AI Sales Coach</p>
                                <p className="text-xs text-[#86868b]">Rate too high objection</p>
                            </div>
                        </div>

                        {/* Response Card */}
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <div className="space-y-3">
                                <p className="text-sm text-[#1d1d1f] leading-relaxed">
                                    I understand your client&apos;s concern about the mortgage rate. Let&apos;s look at how a blended rate can actually work in their favor.
                                </p>

                                {/* Current Mortgages */}
                                <div className="bg-stone-50 rounded-lg p-3 space-y-1.5">
                                    <p className="text-xs text-[#1d1d1f] font-semibold flex items-center gap-2">
                                        <span className="w-4 h-4 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-[10px] font-bold">1</span>
                                        Current Mortgages:
                                    </p>
                                    <p className="text-xs text-[#1d1d1f] ml-6">1st Mortgage: <span className="font-semibold text-emerald-600 bg-emerald-50 px-1 rounded">$247,500</span> at <span className="font-semibold text-blue-600 bg-blue-50 px-1 rounded">3.75%</span></p>
                                    <p className="text-xs text-[#1d1d1f] ml-6">2nd Mortgage/HELOC: <span className="font-semibold text-emerald-600 bg-emerald-50 px-1 rounded">$180,000</span> at <span className="font-semibold text-blue-600 bg-blue-50 px-1 rounded">4.25%</span></p>
                                </div>

                                {/* Selected Debts */}
                                <div className="bg-stone-50 rounded-lg p-3 space-y-1.5">
                                    <p className="text-xs text-[#1d1d1f] font-semibold flex items-center gap-2">
                                        <span className="w-4 h-4 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-[10px] font-bold">2</span>
                                        Selected Debts for Payoff:
                                    </p>
                                    <p className="text-xs text-[#1d1d1f] ml-6">CHASE AUTO: <span className="font-semibold text-emerald-600 bg-emerald-50 px-1 rounded">$18,000</span> at <span className="font-semibold text-blue-600 bg-blue-50 px-1 rounded">6.9%</span></p>
                                    <p className="text-xs text-[#1d1d1f] ml-6">WFBNA CARD: <span className="font-semibold text-emerald-600 bg-emerald-50 px-1 rounded">$10,200</span> at <span className="font-semibold text-rose-600 bg-rose-50 px-1 rounded">24.99%</span></p>
                                    <p className="text-xs text-[#1d1d1f] ml-6">AMERICAN EXPRESS: <span className="font-semibold text-emerald-600 bg-emerald-50 px-1 rounded">$2,500</span> at <span className="font-semibold text-rose-600 bg-rose-50 px-1 rounded">19.99%</span></p>
                                </div>

                                {/* Debt Summary */}
                                <div className="bg-stone-50 rounded-lg p-3 space-y-1">
                                    <p className="text-xs text-[#1d1d1f] font-semibold">Debt Summary:</p>
                                    <p className="text-xs text-[#1d1d1f]">Total Debt to Pay Off: <span className="font-semibold text-emerald-600">$55,814</span></p>
                                    <p className="text-xs text-[#1d1d1f]">Monthly Payments Eliminated: <span className="font-semibold text-emerald-600">$1,196</span></p>
                                </div>

                                {/* Blended Rate - THE MIC DROP */}
                                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-4 border border-orange-200">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-5 h-5 rounded bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                                            <Zap className="w-3 h-3 text-white" />
                                        </div>
                                        <h4 className="font-semibold text-xs text-orange-800">Blended Rate Calculation:</h4>
                                    </div>
                                    <div className="space-y-1.5">
                                        <p className="text-xs text-[#1d1d1f]">Total Debt (incl. mortgages): <span className="font-semibold text-emerald-600">$483,314</span></p>
                                        <p className="text-xs text-[#1d1d1f]">Current Weighted Interest: <span className="font-semibold text-rose-600">$64,973/year</span></p>
                                        <div className="pt-2 border-t border-orange-200 mt-2">
                                            <p className="text-base font-bold text-orange-700">
                                                Current Blended Rate = <span className="text-xl text-rose-600 bg-rose-50 px-2 py-0.5 rounded-lg shadow-sm">13.2%</span>
                                            </p>
                                            <p className="text-xs text-emerald-600 mt-1.5">
                                                → Consolidate at <span className="font-bold">7.25%</span> to save <span className="font-bold">$30,000+/year</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Conclusion */}
                                <p className="text-xs text-[#1d1d1f] leading-relaxed bg-green-50 p-3 rounded-lg border border-green-100">
                                    While the mortgage rate may seem high, consolidating high-interest debt could <span className="font-semibold text-green-700">lower their overall financial burden</span>, leading to savings in monthly payments and interest costs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Full Valuation AI Presentation Panel
function ValuationPanel() {
    const accentColor = '#F59E0B';
    
    const valuationSources = [
        { name: 'Internal AVM', value: '$785,000', confidence: '94%', color: '#8B5CF6' },
        { name: 'Zillow', value: '$769,000', confidence: '87%', color: '#3B82F6' },
        { name: 'Redfin', value: '$801,000', confidence: '89%', color: '#EF4444' },
        { name: 'Realtor', value: '$777,000', confidence: '85%', color: '#64748B' },
    ];
    
    const comparables = [
        { address: '2104 Shrewsbury Dr', price: '$782,000', sqft: '2,380', beds: 4, sold: '12 days ago' },
        { address: '2210 Lakewood Ct', price: '$795,000', sqft: '2,510', beds: 4, sold: '23 days ago' },
        { address: '1908 Highland Ave', price: '$768,000', sqft: '2,320', beds: 4, sold: '31 days ago' },
    ];
    
    return (
        <div className="relative w-[600px]">
            {/* Outer glow */}
            <motion.div
                className="absolute -inset-4 rounded-2xl blur-2xl -z-10"
                style={{ backgroundColor: `${accentColor}25` }}
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Panel container */}
            <div
                className="rounded-xl bg-white flex flex-col max-h-[75vh] overflow-hidden"
                style={{ boxShadow: `0 0 60px ${accentColor}20, 0 25px 50px rgba(0,0,0,0.4)` }}
            >
                {/* Header */}
                <div className="px-5 py-4 bg-white border-b border-black/5 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center">
                                <Home className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-[#1d1d1f] tracking-tight">Property Valuation AI</h1>
                                <p className="text-xs text-[#86868b]">2116 Shrewsbury Dr, McKinney TX</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Badge */}
                <div className="px-4 py-2 bg-amber-50 border-b border-amber-100 flex-shrink-0">
                    <p className="text-xs text-amber-700"><span className="font-semibold">AI Valuation</span> - Multi-source analysis with confidence scoring</p>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-5 bg-[#f5f5f7]">
                    <div className="space-y-3">
                        {/* AI Estimated Value - Hero */}
                        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                            <p className="text-xs text-[#86868b] mb-1">AI Estimated Value</p>
                            <motion.p 
                                className="text-4xl font-bold text-amber-600"
                                animate={{ scale: [1, 1.02, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                $785,000
                            </motion.p>
                            <div className="flex items-center justify-center gap-4 mt-2">
                                <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded">+4.2% YoY</span>
                                <span className="text-xs text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded">94% Confidence</span>
                            </div>
                        </div>

                        {/* Valuation Sources Grid */}
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <h4 className="font-semibold text-sm text-[#1d1d1f] mb-3 flex items-center gap-2">
                                <Zap className="w-4 h-4 text-amber-500" />
                                Multi-Source Analysis
                            </h4>
                            <div className="grid grid-cols-2 gap-2">
                                {valuationSources.map((source) => (
                                    <div key={source.name} className="p-2.5 rounded-lg bg-stone-50 border border-stone-100">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: source.color }} />
                                            <span className="text-xs text-[#86868b]">{source.name}</span>
                                        </div>
                                        <p className="text-sm font-bold text-[#1d1d1f]">{source.value}</p>
                                        <p className="text-xs text-emerald-600">{source.confidence} confident</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Property Details */}
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <h4 className="font-semibold text-sm text-[#1d1d1f] mb-2">Property Details</h4>
                            <div className="grid grid-cols-4 gap-2 text-center">
                                <div className="p-2 bg-amber-50 rounded-lg">
                                    <p className="text-lg font-bold text-amber-700">4</p>
                                    <p className="text-xs text-[#86868b]">Beds</p>
                                </div>
                                <div className="p-2 bg-amber-50 rounded-lg">
                                    <p className="text-lg font-bold text-amber-700">3</p>
                                    <p className="text-xs text-[#86868b]">Baths</p>
                                </div>
                                <div className="p-2 bg-amber-50 rounded-lg">
                                    <p className="text-lg font-bold text-amber-700">2,450</p>
                                    <p className="text-xs text-[#86868b]">Sq Ft</p>
                                </div>
                                <div className="p-2 bg-amber-50 rounded-lg">
                                    <p className="text-lg font-bold text-amber-700">2021</p>
                                    <p className="text-xs text-[#86868b]">Renovated</p>
                                </div>
                            </div>
                        </div>

                        {/* Comparable Sales */}
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <h4 className="font-semibold text-sm text-[#1d1d1f] mb-2 flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                Recent Comparable Sales
                            </h4>
                            <div className="space-y-2">
                                {comparables.map((comp) => (
                                    <div key={comp.address} className="flex items-center justify-between p-2 rounded-lg bg-stone-50">
                                        <div>
                                            <p className="text-xs font-medium text-[#1d1d1f]">{comp.address}</p>
                                            <p className="text-xs text-[#86868b]">{comp.beds}bd • {comp.sqft} sqft • {comp.sold}</p>
                                        </div>
                                        <p className="text-sm font-bold text-emerald-600">{comp.price}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Equity Summary */}
                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-emerald-600 font-medium">Available Equity</p>
                                    <p className="text-2xl font-bold text-emerald-700">$358,000</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-[#86868b]">Current Liens</p>
                                    <p className="text-lg font-semibold text-[#1d1d1f]">$427,000</p>
                                </div>
                            </div>
                            <p className="text-xs text-emerald-600 mt-2 pt-2 border-t border-emerald-200">
                                → Client has strong equity position for HELOC or cash-out refinance
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// CINEMATIC SECTION WRAPPER - Handles transitions based on time
// ============================================================================
function CinematicSection({ 
    children, 
    sectionKey,
    currentTime,
    startTime,
    endTime,
    transitionIn,
    transitionOut,
    transitionDuration = 1
}: { 
    children: React.ReactNode;
    sectionKey: string;
    currentTime: number;
    startTime: number;
    endTime: number;
    transitionIn: 'fade' | 'scale' | 'wipe-right' | 'wipe-left' | 'split' | 'zoom' | 'slide-left' | 'slide-right' | 'slide-up';
    transitionOut: 'fade' | 'scale' | 'wipe-right' | 'wipe-left' | 'dissolve' | 'zoom-through' | 'crossfade';
    transitionDuration?: number;
}) {
    const duration = endTime - startTime;
    const transInEnd = startTime + transitionDuration;
    const transOutStart = endTime - transitionDuration;
    
    // Calculate progress within this section (0 = entering, 0.5 = middle, 1 = exiting)
    const isActive = currentTime >= startTime - transitionDuration && currentTime <= endTime + transitionDuration;
    const isVisible = currentTime >= startTime - transitionDuration && currentTime <= endTime;
    
    // Normalized progress for transitions
    const enterProgress = Math.min(1, Math.max(0, (currentTime - startTime) / transitionDuration));
    const exitProgress = Math.min(1, Math.max(0, (currentTime - transOutStart) / transitionDuration));
    const inSection = currentTime >= transInEnd && currentTime <= transOutStart;
    
    // Calculate styles based on transition type
    const getTransitionStyles = () => {
        let opacity = 0;
        let scale = 1;
        let x = 0;
        let y = 0;
        let clipPath = 'inset(0 0 0 0)';
        let filter = 'blur(0px)';
        
        if (!isActive) return { opacity: 0, scale: 1, x: 0, y: 0, clipPath: 'inset(0 0 0 0)', filter: 'blur(0px)' };
        
        // ENTERING
        if (currentTime < transInEnd) {
            const p = enterProgress;
            switch (transitionIn) {
                case 'fade':
                    opacity = p;
                    break;
                case 'scale':
                    opacity = p;
                    scale = 0.85 + (0.15 * p);
                    filter = `blur(${(1 - p) * 8}px)`;
                    break;
                case 'wipe-right':
                    opacity = 1;
                    clipPath = `inset(0 ${100 - (p * 100)}% 0 0)`;
                    break;
                case 'wipe-left':
                    opacity = 1;
                    clipPath = `inset(0 0 0 ${100 - (p * 100)}%)`;
                    break;
                case 'split':
                    opacity = 1;
                    clipPath = `inset(0 ${50 - (p * 50)}% 0 ${50 - (p * 50)}%)`;
                    break;
                case 'zoom':
                    opacity = p;
                    scale = 0.5 + (0.5 * p);
                    filter = `blur(${(1 - p) * 10}px)`;
                    break;
                case 'slide-left':
                    opacity = p;
                    x = (1 - p) * 100;
                    break;
                case 'slide-right':
                    opacity = p;
                    x = (1 - p) * -100;
                    break;
                case 'slide-up':
                    opacity = p;
                    y = (1 - p) * 50;
                    break;
            }
        }
        // MIDDLE (fully visible)
        else if (inSection) {
            opacity = 1;
            scale = 1;
            x = 0;
            y = 0;
            clipPath = 'inset(0 0 0 0)';
            filter = 'blur(0px)';
        }
        // EXITING
        else if (currentTime > transOutStart) {
            const p = exitProgress;
            switch (transitionOut) {
                case 'fade':
                case 'crossfade':
                    opacity = 1 - p;
                    break;
                case 'scale':
                    opacity = 1 - p;
                    scale = 1 - (0.15 * p);
                    break;
                case 'wipe-right':
                    opacity = 1;
                    clipPath = `inset(0 0 0 ${p * 100}%)`;
                    break;
                case 'wipe-left':
                    opacity = 1;
                    clipPath = `inset(0 ${p * 100}% 0 0)`;
                    break;
                case 'dissolve':
                    opacity = 1 - p;
                    filter = `blur(${p * 12}px)`;
                    break;
                case 'zoom-through':
                    opacity = 1 - p;
                    scale = 1 + (0.3 * p);
                    filter = `blur(${p * 8}px)`;
                    break;
            }
        }
        
        return { opacity, scale, x, y, clipPath, filter };
    };
    
    const styles = getTransitionStyles();
    
    if (!isVisible && currentTime > endTime) return null;
    
    return (
        <motion.div
            key={sectionKey}
            className="absolute inset-0"
            style={{
                opacity: styles.opacity,
                scale: styles.scale,
                x: styles.x,
                y: styles.y,
                clipPath: styles.clipPath,
                filter: styles.filter,
                zIndex: isActive ? 10 : 1,
                pointerEvents: isActive ? 'auto' : 'none',
            }}
            transition={{ duration: 0.05 }}
        >
            {children}
        </motion.div>
    );
}

// ============================================================================
// MAIN VIDEO PAGE COMPONENT - Cinematic Transitions
// ============================================================================
export default function Video4Page() {
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const animationRef = useRef<number | undefined>(undefined);
    const lastTimeRef = useRef<number>(0);

    // Determine active feature for journey line (only during feature sections)
    const getActiveFeatureIndex = useCallback(() => {
        if (currentTime < SECTIONS.rapport.start) return -1;
        if (currentTime < SECTIONS.valuation.start) return 0;
        if (currentTime < SECTIONS.salesCoach.start) return 1;
        if (currentTime < SECTIONS.betaJourney.start) return 2;
        return 2;
    }, [currentTime]);

    // Get progress within current feature
    const getFeatureProgress = useCallback(() => {
        const index = getActiveFeatureIndex();
        if (index === -1) return 0;

        const feature = FEATURES[index];
        const section = SECTIONS[feature.id as keyof typeof SECTIONS];
        if (!section) return 0;

        return Math.min(1, Math.max(0, (currentTime - section.start) / (section.end - section.start)));
    }, [currentTime, getActiveFeatureIndex]);

    // Playback animation
    useEffect(() => {
        if (isPlaying) {
            lastTimeRef.current = performance.now();

            const animate = (now: number) => {
                const delta = (now - lastTimeRef.current) / 1000;
                lastTimeRef.current = now;

                setCurrentTime(prev => {
                    const next = prev + delta;
                    if (next >= TOTAL_DURATION) {
                        setIsPlaying(false);
                        return TOTAL_DURATION;
                    }
                    return next;
                });

                animationRef.current = requestAnimationFrame(animate);
            };

            animationRef.current = requestAnimationFrame(animate);
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isPlaying]);

    // Handle scrubber click
    const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        setCurrentTime(percent * TOTAL_DURATION);
    };

    const handleRestart = () => {
        setCurrentTime(0);
        setIsPlaying(false);
    };

    const activeFeatureIndex = getActiveFeatureIndex();
    const featureProgress = getFeatureProgress();

    // Create progress values for sections that need them (for internal animations)
    const getSectionProgress = (start: number, end: number) => {
        if (currentTime < start) return 0;
        if (currentTime > end) return 1;
        return (currentTime - start) / (end - start);
    };

    return (
        <div className="relative w-screen h-screen bg-black overflow-hidden">
            {/* Journey Line - Fixed at top */}
            {activeFeatureIndex >= 0 && (
                <JourneyLine
                    activeFeatureIndex={activeFeatureIndex}
                    progress={featureProgress}
                />
            )}

            {/* Stacked Sections Container - No Scrolling */}
            <div className="relative w-full h-full">
                
                {/* Steve Hulme Intro (0:00 - 0:10) */}
                {/* Transition: Fade in from black -> Wipe right out */}
                <CinematicSection
                    sectionKey="steve-intro"
                    currentTime={currentTime}
                    startTime={SECTIONS.steveIntro.start}
                    endTime={SECTIONS.steveIntro.end}
                    transitionIn="fade"
                    transitionOut="wipe-right"
                >
                    <StaticSection>
                        <SteveIntroContent />
                    </StaticSection>
                </CinematicSection>

                {/* Industry Revolution (0:10 - 0:20) */}
                {/* Transition: Scale up from center -> Dissolve with blur */}
                <CinematicSection
                    sectionKey="industry"
                    currentTime={currentTime}
                    startTime={SECTIONS.industryRevolution.start}
                    endTime={SECTIONS.industryRevolution.end}
                    transitionIn="scale"
                    transitionOut="dissolve"
                >
                    <StaticSection>
                        <IndustryRevolutionContent />
                    </StaticSection>
                </CinematicSection>

                {/* First Call Problem (0:20 - 0:35) */}
                {/* Transition: Split reveal from center -> Cross-fade */}
                <CinematicSection
                    sectionKey="problem"
                    currentTime={currentTime}
                    startTime={SECTIONS.firstCallProblem.start}
                    endTime={SECTIONS.firstCallProblem.end}
                    transitionIn="split"
                    transitionOut="crossfade"
                    transitionDuration={1.2}
                >
                    <StaticSection>
                        <FirstCallProblemContent progress={getSectionProgress(SECTIONS.firstCallProblem.start, SECTIONS.firstCallProblem.end)} />
                    </StaticSection>
                </CinematicSection>

                {/* AI Assistants (0:35 - 0:55) */}
                {/* Transition: Zoom in from small -> Zoom through into browser */}
                <CinematicSection
                    sectionKey="ai-assistants"
                    currentTime={currentTime}
                    startTime={SECTIONS.aiAssistants.start}
                    endTime={SECTIONS.aiAssistants.end}
                    transitionIn="zoom"
                    transitionOut="zoom-through"
                    transitionDuration={1}
                >
                    <StaticSection>
                        <AIAssistantsContent />
                    </StaticSection>
                </CinematicSection>

                {/* Rapport Builder (0:55 - 1:23) - 3-Phase Animation */}
                {/* Phase 1: Backend (0-35%), Phase 2: Panel (30-70%), Phase 3: App Context (65-100%) */}
                <CinematicSection
                    sectionKey="rapport"
                    currentTime={currentTime}
                    startTime={SECTIONS.rapport.start}
                    endTime={SECTIONS.rapport.end}
                    transitionIn="slide-left"
                    transitionOut="crossfade"
                >
                    <StaticSection>
                        <FeatureContent feature={FEATURES[0]} progress={getSectionProgress(SECTIONS.rapport.start, SECTIONS.rapport.end)} />
                    </StaticSection>
                </CinematicSection>

                {/* Valuation AI (1:23 - 1:51) - 3-Phase Animation */}
                {/* Phase 1: Backend (0-35%), Phase 2: Panel (30-70%), Phase 3: App Context (65-100%) */}
                <CinematicSection
                    sectionKey="valuation"
                    currentTime={currentTime}
                    startTime={SECTIONS.valuation.start}
                    endTime={SECTIONS.valuation.end}
                    transitionIn="fade"
                    transitionOut="crossfade"
                >
                    <StaticSection>
                        <FeatureContent feature={FEATURES[2]} progress={getSectionProgress(SECTIONS.valuation.start, SECTIONS.valuation.end)} />
                    </StaticSection>
                </CinematicSection>

                {/* Sales Coach (1:51 - 2:18) - 3-Phase Animation */}
                {/* Phase 1: Backend (0-35%), Phase 2: Panel (30-70%), Phase 3: App Context (65-100%) */}
                <CinematicSection
                    sectionKey="salescoach"
                    currentTime={currentTime}
                    startTime={SECTIONS.salesCoach.start}
                    endTime={SECTIONS.salesCoach.end}
                    transitionIn="slide-right"
                    transitionOut="crossfade"
                >
                    <StaticSection>
                        <FeatureContent feature={FEATURES[1]} progress={getSectionProgress(SECTIONS.salesCoach.start, SECTIONS.salesCoach.end)} />
                    </StaticSection>
                </CinematicSection>

                {/* Beta Journey (2:18 - 2:50) */}
                {/* Transition: Wipe left -> Fade */}
                <CinematicSection
                    sectionKey="beta"
                    currentTime={currentTime}
                    startTime={SECTIONS.betaJourney.start}
                    endTime={SECTIONS.betaJourney.end}
                    transitionIn="wipe-left"
                    transitionOut="fade"
                    transitionDuration={1.2}
                >
                    <StaticSection>
                        <BetaJourneyContent progress={getSectionProgress(SECTIONS.betaJourney.start, SECTIONS.betaJourney.end)} />
                    </StaticSection>
                </CinematicSection>

                {/* Roadmap (2:50 - 3:05) */}
                {/* Transition: Slide up -> Cross-fade */}
                <CinematicSection
                    sectionKey="roadmap"
                    currentTime={currentTime}
                    startTime={SECTIONS.roadmap.start}
                    endTime={SECTIONS.roadmap.end}
                    transitionIn="slide-up"
                    transitionOut="crossfade"
                >
                    <StaticSection>
                        <RoadmapContent />
                    </StaticSection>
                </CinematicSection>

                {/* Industry Leadership (3:05 - 3:18) */}
                {/* Transition: Bold scale from center -> Fade to black */}
                <CinematicSection
                    sectionKey="leadership"
                    currentTime={currentTime}
                    startTime={SECTIONS.industryLeadership.start}
                    endTime={SECTIONS.industryLeadership.end}
                    transitionIn="scale"
                    transitionOut="fade"
                >
                    <StaticSection>
                        <IndustryLeadershipContent />
                    </StaticSection>
                </CinematicSection>

                {/* Executive Close (3:18 - 3:35) */}
                {/* Transition: Fade from black -> Hold */}
                <CinematicSection
                    sectionKey="close"
                    currentTime={currentTime}
                    startTime={SECTIONS.executiveClose.start}
                    endTime={SECTIONS.executiveClose.end}
                    transitionIn="fade"
                    transitionOut="fade"
                    transitionDuration={1.5}
                >
                    <StaticSection>
                        <ExecutiveCloseContent />
                    </StaticSection>
                </CinematicSection>
            </div>

            {/* Controls - Fixed at bottom */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent z-50">
                {/* Scrubber */}
                <div className="mb-4">
                    <div className="flex items-center gap-4 mb-2">
                        <span className="text-white font-mono text-sm w-12">{formatTime(currentTime)}</span>

                        <div
                            className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden cursor-pointer relative group"
                            onClick={handleScrubberClick}
                        >
                            <motion.div
                                className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                                style={{ width: `${(currentTime / TOTAL_DURATION) * 100}%` }}
                            />
                            <div
                                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ left: `${(currentTime / TOTAL_DURATION) * 100}%` }}
                            />
                        </div>

                        <span className="text-white/60 font-mono text-sm w-12">{formatTime(TOTAL_DURATION)}</span>
                    </div>
                </div>

                {/* Control buttons */}
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={handleRestart}
                        className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        title="Restart"
                    >
                        <RotateCcw className="w-5 h-5 text-white" />
                    </button>
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 transition-colors shadow-lg shadow-orange-500/30"
                    >
                        {isPlaying ? (
                            <Pause className="w-6 h-6 text-white" fill="currentColor" />
                        ) : (
                            <Play className="w-6 h-6 text-white" fill="currentColor" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// STATIC SECTION WRAPPER - Just centers content
// ============================================================================
function StaticSection({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen w-full flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
            {children}
        </div>
    );
}
