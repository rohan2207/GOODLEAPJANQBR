"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';
import Image from 'next/image';

// ============================================================================
// TIMING CONFIGURATION (Total: 203 seconds = 3:23)
// ============================================================================
const SECTIONS = [
    { id: 'opening', name: 'Opening', start: 0, end: 20 },
    { id: 'transition1', name: 'Transition', start: 20, end: 40 },
    { id: 'feature1', name: 'Rapport Builder', start: 40, end: 65 },
    { id: 'feature2', name: 'Scenario Engine', start: 65, end: 90 },
    { id: 'feature3', name: 'Contextual Guidance', start: 90, end: 115 },
    { id: 'feature4', name: 'Proposal Creation', start: 115, end: 135 },
    { id: 'lastmile', name: 'Last Mile', start: 135, end: 160 },
    { id: 'montage', name: 'Montage', start: 160, end: 175 },
    { id: 'beta', name: 'Beta', start: 175, end: 190 },
    { id: 'closing', name: 'Closing', start: 190, end: 203 },
];

const TOTAL_DURATION = 203;

// ============================================================================
// INTEGRATION SOURCES
// ============================================================================
const INTEGRATIONS = [
    { name: 'Salesforce', icon: '☁️', color: '#00A1E0' },
    { name: 'Encompass', icon: '🏦', color: '#1E3A5F' },
    { name: 'Credit Bureaus', icon: '📊', color: '#7C3AED' },
    { name: 'Data Warehouse', icon: '🗄️', color: '#F59E0B' },
];

// ============================================================================
// OPENING SLIDE
// ============================================================================
function OpeningSlide({ progress }: { progress: number }) {
    // progress: 0-1 within this section
    const logoPhase = progress < 0.4;
    const panPhase = progress >= 0.4 && progress < 0.7;
    const integrationPhase = progress >= 0.7;

    return (
        <div className="w-screen h-screen flex-shrink-0 relative overflow-hidden bg-black flex items-center justify-center">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0f] to-black" />
            
            {/* Particle field background */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-white/30"
                        style={{
                            left: `${10 + (i * 3) % 80}%`,
                            top: `${10 + (i * 7) % 80}%`,
                        }}
                        animate={{
                            opacity: [0.2, 0.6, 0.2],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.1,
                        }}
                    />
                ))}
            </div>

            {/* Logo Phase - Always render but control visibility */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center z-10"
                animate={{ 
                    opacity: logoPhase ? 1 : 0,
                    scale: logoPhase ? 1 : 1.1,
                }}
                transition={{ duration: 0.5 }}
            >
                <div className="relative">
                    <div className="absolute -inset-20 blur-3xl bg-orange-500/20 rounded-full" />
                    <Image
                        src="https://cdn.bfldr.com/Q445447Z/at/n85kkcjq5q8r3n6nf4z5jsw/LinkAI_BG_FullGradonBlk.svg"
                        alt="LinkAI"
                        width={400}
                        height={120}
                        className="relative z-10"
                        priority
                    />
                    
                    {/* 2.0 Badge */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                        <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30">
                            <span className="text-orange-400 font-semibold text-lg">2.0</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Pan Phase - Workspace Preview */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center z-10"
                animate={{ 
                    opacity: panPhase ? 1 : 0,
                    x: panPhase ? 0 : 100,
                }}
                transition={{ duration: 0.5 }}
            >
                <div className="w-[85vw] h-[65vh] rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 overflow-hidden">
                    {/* Browser chrome */}
                    <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-white/20" />
                            <div className="w-3 h-3 rounded-full bg-white/20" />
                            <div className="w-3 h-3 rounded-full bg-white/20" />
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="px-6 py-1 rounded-lg bg-white/5 border border-white/10">
                                <span className="text-white/40 text-sm">app.linkai.io</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Content placeholder */}
                    <div className="p-8 grid grid-cols-3 gap-6 h-[calc(100%-40px)]">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="rounded-xl bg-white/5 border border-white/10"
                            />
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Integration Phase */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center z-10"
                animate={{ opacity: integrationPhase ? 1 : 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-center">
                    <p className="text-white/60 text-xl mb-12">
                        From fragmented systems to one intelligent workspace
                    </p>
                    
                    <div className="flex items-center justify-center gap-8">
                        {INTEGRATIONS.map((integration, i) => (
                            <motion.div
                                key={integration.name}
                                className="flex flex-col items-center gap-3"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: integrationPhase ? 1 : 0, y: integrationPhase ? 0 : 20 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div
                                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl"
                                    style={{ 
                                        backgroundColor: `${integration.color}20`,
                                        border: `1px solid ${integration.color}40`
                                    }}
                                >
                                    {integration.icon}
                                </div>
                                <span className="text-white/60 text-sm">{integration.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

// ============================================================================
// TRANSITION SLIDE
// ============================================================================
function TransitionSlide({ progress }: { progress: number }) {
    return (
        <div className="w-screen h-screen flex-shrink-0 relative overflow-hidden bg-black flex items-center justify-center">
            <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <motion.h2
                    className="text-5xl font-bold text-white mb-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    AI-Powered Assistants
                </motion.h2>
                <motion.p
                    className="text-xl text-white/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    Built into the loan officer workflow
                </motion.p>
                
                {/* Animated line */}
                <motion.div
                    className="h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent mt-8 mx-auto"
                    initial={{ width: 0 }}
                    animate={{ width: 400 }}
                    transition={{ delay: 0.9, duration: 1.5 }}
                />
            </motion.div>
        </div>
    );
}

// ============================================================================
// FEATURE SLIDE COMPONENT (Three-Column Layout)
// ============================================================================
interface FeatureSlideProps {
    progress: number;
    title: string;
    subtitle: string;
    accentColor: string;
    problem: {
        title: string;
        points: string[];
    };
    backend: {
        title: string;
        items: { label: string; icon: string }[];
    };
    frontend: React.ReactNode;
}

function FeatureSlide({ progress, title, subtitle, accentColor, problem, backend, frontend }: FeatureSlideProps) {
    // Phases: Problem (0-0.33), Backend (0.33-0.66), Frontend (0.66-1)
    const problemActive = progress >= 0 && progress < 0.4;
    const backendActive = progress >= 0.25 && progress < 0.7;
    const frontendActive = progress >= 0.5;

    return (
        <div className="w-screen h-screen flex-shrink-0 relative overflow-hidden bg-black">
            {/* Background glow */}
            <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                    background: `radial-gradient(circle at 50% 50%, ${accentColor}20 0%, transparent 70%)`
                }}
            />

            {/* Header */}
            <motion.div
                className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div 
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-3"
                    style={{ backgroundColor: `${accentColor}20`, border: `1px solid ${accentColor}40` }}
                >
                    <motion.div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: accentColor }}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: accentColor }}>
                        AI Assistant
                    </span>
                </div>
                <h2 className="text-4xl font-bold text-white">{title}</h2>
                <p className="text-white/50 mt-2">{subtitle}</p>
            </motion.div>

            {/* Three-column layout */}
            <div className="absolute inset-0 flex items-center justify-center pt-32 pb-16 px-12">
                <div className="w-full max-w-[1600px] grid grid-cols-3 gap-8 items-center">
                    
                    {/* LEFT: Problem */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ 
                            opacity: problemActive ? 1 : 0.3,
                            x: 0,
                            scale: problemActive ? 1 : 0.95
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="p-8 rounded-2xl bg-rose-500/10 border border-rose-500/30">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-rose-400">Problem</h3>
                            </div>
                            <div className="space-y-4">
                                {problem.points.map((point, i) => (
                                    <motion.div
                                        key={i}
                                        className="flex items-start gap-3"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: problemActive ? 1 : 0.5, x: 0 }}
                                        transition={{ delay: i * 0.15 }}
                                    >
                                        <span className="text-rose-400 mt-1">•</span>
                                        <p className="text-white/70 text-sm leading-relaxed">{point}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* CENTER: Backend Intelligence */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ 
                            opacity: backendActive ? 1 : 0.3,
                            y: 0,
                            scale: backendActive ? 1 : 0.95
                        }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div 
                            className="p-8 rounded-2xl"
                            style={{ 
                                backgroundColor: `${accentColor}10`,
                                border: `1px solid ${accentColor}40`
                            }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div 
                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{ backgroundColor: `${accentColor}30` }}
                                >
                                    <svg className="w-5 h-5" style={{ color: accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold" style={{ color: accentColor }}>Backend Intelligence</h3>
                            </div>
                            <div className="space-y-3">
                                {backend.items.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-white/5"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ 
                                            opacity: backendActive ? 1 : 0.5, 
                                            scale: backendActive ? 1 : 0.95
                                        }}
                                        transition={{ delay: 0.2 + i * 0.1 }}
                                    >
                                        <motion.span 
                                            className="text-xl"
                                            animate={backendActive ? { 
                                                scale: [1, 1.2, 1],
                                                rotate: [0, 5, -5, 0]
                                            } : {}}
                                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                                        >
                                            {item.icon}
                                        </motion.span>
                                        <span className="text-white/80 text-sm">{item.label}</span>
                                        <motion.div
                                            className="ml-auto w-2 h-2 rounded-full"
                                            style={{ backgroundColor: accentColor }}
                                            animate={backendActive ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.3 }}
                                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT: Frontend Experience */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ 
                            opacity: frontendActive ? 1 : 0.2,
                            x: 0,
                            scale: frontendActive ? 1 : 0.9
                        }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="relative">
                            {/* Glow effect */}
                            <motion.div
                                className="absolute -inset-4 rounded-2xl blur-2xl -z-10"
                                style={{ backgroundColor: `${accentColor}30` }}
                                animate={frontendActive ? { opacity: [0.3, 0.5, 0.3] } : { opacity: 0.1 }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            {frontend}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Progress indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
                {['Problem', 'Backend', 'Frontend'].map((phase, i) => {
                    const isActive = (i === 0 && problemActive) || (i === 1 && backendActive) || (i === 2 && frontendActive);
                    return (
                        <div key={phase} className="flex items-center gap-2">
                            <motion.div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: isActive ? accentColor : 'rgba(255,255,255,0.2)' }}
                                animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                                transition={{ duration: 0.5 }}
                            />
                            <span className={`text-xs ${isActive ? 'text-white' : 'text-white/40'}`}>{phase}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ============================================================================
// FRONTEND PANEL COMPONENTS (Replicating main page UI)
// ============================================================================

function RapportBuilderPanel() {
    return (
        <div className="w-[380px] rounded-xl bg-white overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="px-5 py-4 bg-white border-b border-black/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-[#1d1d1f]">Call Prep Brief</h3>
                        <p className="text-xs text-[#86868b]">First 5 minutes ready</p>
                    </div>
                </div>
            </div>
            
            {/* AI Warning */}
            <div className="px-4 py-2 bg-amber-50 border-b border-amber-100">
                <p className="text-xs text-amber-700"><span className="font-semibold">AI-Generated</span> — Verify all facts</p>
            </div>

            {/* Content */}
            <div className="p-4 bg-[#f5f5f7] space-y-3">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                    <p className="text-sm text-[#1d1d1f] leading-relaxed">
                        Near-prime borrower in McKinney, TX. Looking to manage debt and improve finances.
                    </p>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-2">
                    {[
                        { label: 'Property', value: '$785K', color: '#3b82f6' },
                        { label: 'Liens', value: '$428K', color: '#a855f7' },
                        { label: 'Equity', value: '$358K', color: '#22c55e' },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-white rounded-lg p-3 shadow-sm">
                            <p className="text-lg font-bold" style={{ color: stat.color }}>{stat.value}</p>
                            <p className="text-[10px] text-[#86868b]">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Talk Track Preview */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-lg bg-orange-500 flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <span className="text-xs font-semibold text-[#1d1d1f]">Suggested Talk Track</span>
                    </div>
                    <p className="text-xs text-[#86868b] italic">&ldquo;Thank you for taking the time to speak with me about your financial goals...&rdquo;</p>
                </div>
            </div>
        </div>
    );
}

function SalesCoachPanel() {
    return (
        <div className="w-[380px] rounded-xl bg-white overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="px-5 py-4 bg-white border-b border-black/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-[#1d1d1f]">Sales Coach</h3>
                        <p className="text-xs text-[#86868b]">Rate objection response</p>
                    </div>
                </div>
            </div>
            
            {/* Content */}
            <div className="p-4 bg-[#f5f5f7] space-y-3">
                {/* Response Card */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                    <p className="text-sm text-[#1d1d1f] leading-relaxed mb-3">
                        Let&apos;s look at how a blended rate can work in their favor by considering current debts.
                    </p>
                    
                    {/* Debt breakdown */}
                    <div className="p-3 rounded-lg bg-stone-50 space-y-2 text-xs">
                        <div className="flex justify-between">
                            <span className="text-[#86868b]">1st Mortgage</span>
                            <span className="font-semibold text-[#1d1d1f]">$247,500 @ 3.75%</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[#86868b]">Auto Loan</span>
                            <span className="font-semibold text-[#1d1d1f]">$18,000 @ 6.9%</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[#86868b]">Credit Card</span>
                            <span className="font-semibold text-rose-600">$10,200 @ 24.99%</span>
                        </div>
                    </div>
                </div>

                {/* Blended Rate Result */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-emerald-600 font-semibold">Blended Rate</p>
                            <p className="text-2xl font-bold text-emerald-700">5.87%</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-[#86868b]">vs. new mortgage</p>
                            <p className="text-lg font-semibold text-[#1d1d1f]">7.25%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ScenarioPanel() {
    return (
        <div className="w-[380px] rounded-xl bg-white overflow-hidden shadow-2xl">
            <div className="px-5 py-4 bg-white border-b border-black/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-[#1d1d1f]">Scenario Comparison</h3>
                        <p className="text-xs text-[#86868b]">4 options generated</p>
                    </div>
                </div>
            </div>
            
            <div className="p-4 bg-[#f5f5f7] space-y-2">
                {[
                    { name: 'Debt Consolidation', payment: '$2,847', savings: '$412/mo', best: true },
                    { name: 'Cash-Out Refi', payment: '$3,120', savings: '$139/mo' },
                    { name: 'HELOC', payment: '$2,950', savings: '$309/mo' },
                    { name: 'Rate Buydown', payment: '$3,050', savings: '$209/mo' },
                ].map((scenario) => (
                    <motion.div
                        key={scenario.name}
                        className={`p-3 rounded-xl ${scenario.best ? 'bg-purple-50 border-2 border-purple-300' : 'bg-white'}`}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className={`text-sm font-medium ${scenario.best ? 'text-purple-700' : 'text-[#1d1d1f]'}`}>
                                    {scenario.name}
                                    {scenario.best && <span className="ml-2 text-xs bg-purple-200 text-purple-700 px-2 py-0.5 rounded-full">Best</span>}
                                </p>
                                <p className="text-xs text-[#86868b]">{scenario.payment}/mo</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-semibold text-emerald-600">{scenario.savings}</p>
                                <p className="text-[10px] text-[#86868b]">savings</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function ProposalPanel() {
    return (
        <div className="w-[380px] rounded-xl bg-white overflow-hidden shadow-2xl">
            <div className="px-5 py-4 bg-white border-b border-black/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-[#1d1d1f]">Proposal Builder</h3>
                        <p className="text-xs text-[#86868b]">Ready to send</p>
                    </div>
                </div>
            </div>
            
            <div className="p-4 bg-[#f5f5f7] space-y-3">
                {/* Proposal Preview */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-xs text-[#86868b]">Monthly Payment</p>
                            <p className="text-2xl font-bold text-[#1d1d1f]">$2,847</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-[#86868b]">Term</p>
                            <p className="text-lg font-semibold text-[#1d1d1f]">30 years</p>
                        </div>
                    </div>
                    
                    <div className="h-px bg-black/5 my-3" />
                    
                    <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                            <span className="text-[#86868b]">Loan Amount</span>
                            <span className="font-medium text-[#1d1d1f]">$485,000</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[#86868b]">Interest Rate</span>
                            <span className="font-medium text-[#1d1d1f]">7.25%</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[#86868b]">Closing Costs</span>
                            <span className="font-medium text-[#1d1d1f]">$8,450</span>
                        </div>
                    </div>
                </div>

                {/* Send Button */}
                <motion.button
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send Proposal
                </motion.button>
            </div>
        </div>
    );
}

// ============================================================================
// LAST MILE SLIDE
// ============================================================================
function LastMileSlide({ progress }: { progress: number }) {
    const dataStreams = [
        { label: 'Loan History', angle: 0 },
        { label: 'Payment Patterns', angle: 72 },
        { label: 'Credit Evolution', angle: 144 },
        { label: 'Past Interactions', angle: 216 },
        { label: 'Property Data', angle: 288 },
    ];

    return (
        <div className="w-screen h-screen flex-shrink-0 relative overflow-hidden bg-black flex items-center justify-center">
            {/* Radial background */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)'
                    }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
            </div>

            {/* Data streams flowing to center */}
            <div className="relative">
                {dataStreams.map((stream, i) => {
                    const radians = (stream.angle * Math.PI) / 180;
                    const radius = 250;
                    const x = Math.cos(radians) * radius;
                    const y = Math.sin(radians) * radius;
                    
                    return (
                        <motion.div
                            key={stream.label}
                            className="absolute"
                            style={{ left: '50%', top: '50%' }}
                            initial={{ opacity: 0 }}
                            animate={{ 
                                opacity: 1,
                                x: x,
                                y: y,
                            }}
                            transition={{ delay: i * 0.2, duration: 0.5 }}
                        >
                            <motion.div
                                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 whitespace-nowrap"
                                animate={{ 
                                    x: [0, -x * 0.3, 0],
                                    y: [0, -y * 0.3, 0],
                                    opacity: [1, 0.5, 1]
                                }}
                                transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                            >
                                <span className="text-white/60 text-sm">{stream.label}</span>
                            </motion.div>
                            
                            {/* Connection line */}
                            <motion.div
                                className="absolute top-1/2 left-1/2 h-px bg-gradient-to-r from-orange-500/50 to-transparent"
                                style={{
                                    width: radius - 50,
                                    transformOrigin: '0 0',
                                    transform: `rotate(${stream.angle + 180}deg)`,
                                }}
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                            />
                        </motion.div>
                    );
                })}

                {/* Central AI Core */}
                <motion.div
                    className="relative z-10"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                >
                    <motion.div
                        className="w-40 h-40 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center"
                        animate={{ 
                            boxShadow: [
                                '0 0 60px rgba(249,115,22,0.3)',
                                '0 0 100px rgba(249,115,22,0.5)',
                                '0 0 60px rgba(249,115,22,0.3)',
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </motion.div>
                </motion.div>
            </div>

            {/* Text overlay */}
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-center">
                <motion.p
                    className="text-3xl font-light text-white mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: progress > 0.3 ? 1 : 0, y: progress > 0.3 ? 0 : 20 }}
                >
                    LLMs provide intelligence.
                </motion.p>
                <motion.p
                    className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: progress > 0.6 ? 1 : 0, y: progress > 0.6 ? 0 : 20 }}
                >
                    Our data delivers the last mile.
                </motion.p>
            </div>
        </div>
    );
}

// ============================================================================
// MONTAGE SLIDE
// ============================================================================
function MontageSlide({ progress }: { progress: number }) {
    const features = [
        { name: 'HELOC Launch', icon: '🏠', color: '#22c55e' },
        { name: 'Advanced Pricing', icon: '💰', color: '#3b82f6' },
        { name: 'Product Rules', icon: '📋', color: '#a855f7' },
        { name: 'Soft Credit', icon: '📊', color: '#f59e0b' },
        { name: 'Multi-Product', icon: '📦', color: '#ef4444' },
    ];

    const activeIndex = Math.floor(progress * features.length);

    return (
        <div className="w-screen h-screen flex-shrink-0 relative overflow-hidden bg-black flex items-center justify-center">
            <div className="flex gap-8">
                {features.map((feature, i) => (
                    <motion.div
                        key={feature.name}
                        className="w-64 p-8 rounded-2xl text-center"
                        style={{ 
                            backgroundColor: i === activeIndex ? `${feature.color}20` : 'rgba(255,255,255,0.05)',
                            border: `1px solid ${i === activeIndex ? feature.color : 'rgba(255,255,255,0.1)'}`,
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                            opacity: i <= activeIndex ? 1 : 0.3,
                            scale: i === activeIndex ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.span 
                            className="text-5xl block mb-4"
                            animate={i === activeIndex ? { scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 0.5 }}
                        >
                            {feature.icon}
                        </motion.span>
                        <p className="text-white font-semibold">{feature.name}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// ============================================================================
// BETA SLIDE
// ============================================================================
function BetaSlide({ progress }: { progress: number }) {
    const metrics = [
        { label: 'Loan Officers', value: 15, suffix: '' },
        { label: 'Live Calls', value: 127, suffix: '' },
        { label: 'Proposals Sent', value: 43, suffix: '' },
    ];

    return (
        <div className="w-screen h-screen flex-shrink-0 relative overflow-hidden bg-black flex items-center justify-center">
            {/* Background grid */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '50px 50px'
            }} />

            <div className="text-center">
                {/* Badge */}
                <motion.div
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/40 mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <motion.div
                        className="w-3 h-3 rounded-full bg-orange-500"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                    <span className="text-orange-400 font-semibold">February Beta Release</span>
                </motion.div>

                {/* Metrics */}
                <div className="flex items-center justify-center gap-16">
                    {metrics.map((metric, i) => (
                        <motion.div
                            key={metric.label}
                            className="text-center"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                        >
                            <motion.p
                                className="text-7xl font-bold text-white mb-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 + i * 0.2 }}
                            >
                                {Math.round(metric.value * Math.min(progress * 2, 1))}{metric.suffix}
                            </motion.p>
                            <p className="text-white/50 text-lg">{metric.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Upward trend indicator */}
                <motion.div
                    className="mt-12 flex items-center justify-center gap-2 text-emerald-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: progress > 0.5 ? 1 : 0 }}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="font-medium">Active usage growing daily</span>
                </motion.div>
            </div>
        </div>
    );
}

// ============================================================================
// CLOSING SLIDE
// ============================================================================
function ClosingSlide({ progress }: { progress: number }) {
    return (
        <div className="w-screen h-screen flex-shrink-0 relative overflow-hidden bg-black flex items-center justify-center">
            {/* Subtle background */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)'
                    }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
            </div>

            <div className="text-center relative z-10">
                <motion.p
                    className="text-4xl font-light text-white/80 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: progress > 0.2 ? 1 : 0, y: progress > 0.2 ? 0 : 20 }}
                >
                    AI will reshape mortgage.
                </motion.p>
                
                <motion.p
                    className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: progress > 0.5 ? 1 : 0, y: progress > 0.5 ? 0 : 20 }}
                >
                    LinkAI defines how.
                </motion.p>

                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: progress > 0.7 ? 1 : 0, scale: progress > 0.7 ? 1 : 0.8 }}
                    transition={{ duration: 0.5 }}
                >
                    <Image
                        src="https://cdn.bfldr.com/Q445447Z/at/n85kkcjq5q8r3n6nf4z5jsw/LinkAI_BG_FullGradonBlk.svg"
                        alt="LinkAI"
                        width={300}
                        height={90}
                    />
                </motion.div>
            </div>
        </div>
    );
}

// ============================================================================
// MAIN VIDEO PAGE
// ============================================================================
export default function Video4Page() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [showControls, setShowControls] = useState(false);

    // Auto-play timer
    useEffect(() => {
        if (!isPlaying) return;
        
        const interval = setInterval(() => {
            setCurrentTime(prev => {
                if (prev >= TOTAL_DURATION) {
                    setIsPlaying(false);
                    return TOTAL_DURATION;
                }
                return prev + 0.1;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [isPlaying]);

    // Get current section and progress within section
    const getCurrentSection = () => {
        for (let i = 0; i < SECTIONS.length; i++) {
            const section = SECTIONS[i];
            if (currentTime >= section.start && currentTime < section.end) {
                return {
                    ...section,
                    index: i,
                    progress: (currentTime - section.start) / (section.end - section.start)
                };
            }
        }
        // If past all sections, return last one
        const lastSection = SECTIONS[SECTIONS.length - 1];
        return { ...lastSection, index: SECTIONS.length - 1, progress: 1 };
    };

    const currentSection = getCurrentSection();
    const slideIndex = currentSection.index;

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleRestart = () => {
        setCurrentTime(0);
        setIsPlaying(true);
    };

    return (
        <div 
            className="relative w-screen h-screen overflow-hidden bg-black"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            {/* Horizontal slide container */}
            <motion.div
                ref={containerRef}
                className="flex h-full"
                style={{ width: `${SECTIONS.length * 100}vw` }}
                animate={{ x: `-${slideIndex * 100}vw` }}
                transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            >
                {/* Opening */}
                <OpeningSlide progress={currentSection.id === 'opening' ? currentSection.progress : currentSection.id === 'transition1' ? 1 : 0} />
                
                {/* Transition */}
                <TransitionSlide progress={currentSection.id === 'transition1' ? currentSection.progress : 0} />
                
                {/* Feature 1: Rapport Builder */}
                <FeatureSlide
                    progress={currentSection.id === 'feature1' ? currentSection.progress : currentSection.id > 'feature1' ? 1 : 0}
                    title="Rapport Builder"
                    subtitle="Know Your Borrower"
                    accentColor="#D946EF"
                    problem={{
                        title: 'Problem',
                        points: [
                            'Fragmented call notes scattered across systems',
                            'Missed context during borrower conversations',
                            'Uncertainty about borrower history and needs',
                        ]
                    }}
                    backend={{
                        title: 'Backend Intelligence',
                        items: [
                            { icon: '📊', label: 'Sentiment analysis scanning' },
                            { icon: '📋', label: 'Borrower history retrieval' },
                            { icon: '🔄', label: 'Prior loan lookup' },
                            { icon: '📈', label: 'Credit evolution comparison' },
                        ]
                    }}
                    frontend={<RapportBuilderPanel />}
                />

                {/* Feature 2: Scenario Engine */}
                <FeatureSlide
                    progress={currentSection.id === 'feature2' ? currentSection.progress : currentSection.id > 'feature2' ? 1 : 0}
                    title="Scenario Generation"
                    subtitle="Instant Loan Comparisons"
                    accentColor="#8B5CF6"
                    problem={{
                        title: 'Problem',
                        points: [
                            'Manual pricing across multiple systems',
                            'Time-consuming comparison building',
                            'Delayed response to borrower questions',
                        ]
                    }}
                    backend={{
                        title: 'Backend Intelligence',
                        items: [
                            { icon: '⚙️', label: 'Loan rule engine activating' },
                            { icon: '💹', label: 'Pricing matrix calculations' },
                            { icon: '📊', label: 'Amortization engine running' },
                            { icon: '✓', label: 'Eligibility logic validating' },
                        ]
                    }}
                    frontend={<ScenarioPanel />}
                />

                {/* Feature 3: Contextual Guidance */}
                <FeatureSlide
                    progress={currentSection.id === 'feature3' ? currentSection.progress : currentSection.id > 'feature3' ? 1 : 0}
                    title="Sales Coach"
                    subtitle="Turn Objections into Opportunities"
                    accentColor="#F97316"
                    problem={{
                        title: 'Problem',
                        points: [
                            'Unsure which product path is optimal',
                            'Missed cross-sell opportunities',
                            'No data-backed objection responses',
                        ]
                    }}
                    backend={{
                        title: 'Backend Intelligence',
                        items: [
                            { icon: '📜', label: 'Customer loan history expanding' },
                            { icon: '💳', label: 'Payment pattern analysis' },
                            { icon: '📊', label: 'Credit profile modeling' },
                            { icon: '🎯', label: 'Product fit scoring' },
                        ]
                    }}
                    frontend={<SalesCoachPanel />}
                />

                {/* Feature 4: Proposal Creation */}
                <FeatureSlide
                    progress={currentSection.id === 'feature4' ? currentSection.progress : currentSection.id > 'feature4' ? 1 : 0}
                    title="Proposal Builder"
                    subtitle="Close While They're Ready"
                    accentColor="#3B82F6"
                    problem={{
                        title: 'Problem',
                        points: [
                            'Borrowers leave without commitment',
                            'Manual proposal building delays momentum',
                            'Lost opportunities from slow follow-up',
                        ]
                    }}
                    backend={{
                        title: 'Backend Intelligence',
                        items: [
                            { icon: '✓', label: 'Compliance validation' },
                            { icon: '💰', label: 'Pricing API response' },
                            { icon: '📅', label: 'Amortization schedule' },
                            { icon: '📄', label: 'Document rendering' },
                        ]
                    }}
                    frontend={<ProposalPanel />}
                />

                {/* Last Mile */}
                <LastMileSlide progress={currentSection.id === 'lastmile' ? currentSection.progress : 0} />

                {/* Montage */}
                <MontageSlide progress={currentSection.id === 'montage' ? currentSection.progress : 0} />

                {/* Beta */}
                <BetaSlide progress={currentSection.id === 'beta' ? currentSection.progress : 0} />

                {/* Closing */}
                <ClosingSlide progress={currentSection.id === 'closing' ? currentSection.progress : 0} />
            </motion.div>

            {/* Controls overlay */}
            <AnimatePresence>
                {showControls && (
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                        {/* Progress bar */}
                        <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-white/60 text-sm">{formatTime(currentTime)}</span>
                                <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                                        style={{ width: `${(currentTime / TOTAL_DURATION) * 100}%` }}
                                    />
                                </div>
                                <span className="text-white/60 text-sm">{formatTime(TOTAL_DURATION)}</span>
                            </div>
                            
                            {/* Section markers */}
                            <div className="relative h-6">
                                {SECTIONS.map((section) => (
                                    <button
                                        key={section.id}
                                        className="absolute top-0 transform -translate-x-1/2"
                                        style={{ left: `${(section.start / TOTAL_DURATION) * 100}%` }}
                                        onClick={() => setCurrentTime(section.start)}
                                    >
                                        <div className={`w-1.5 h-1.5 rounded-full mb-1 ${currentSection.id === section.id ? 'bg-orange-500' : 'bg-white/30'}`} />
                                        <span className={`text-[10px] whitespace-nowrap ${currentSection.id === section.id ? 'text-white' : 'text-white/40'}`}>
                                            {section.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Control buttons */}
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={handleRestart}
                                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                            >
                                <RotateCcw className="w-5 h-5 text-white" />
                            </button>
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="p-4 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                            >
                                {isPlaying ? (
                                    <Pause className="w-6 h-6 text-white" fill="currentColor" />
                                ) : (
                                    <Play className="w-6 h-6 text-white" fill="currentColor" />
                                )}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Current section indicator (always visible) */}
            <div className="absolute top-6 right-6 text-right">
                <p className="text-white/40 text-sm">{currentSection.name}</p>
                <p className="text-white/60 text-xs">{formatTime(currentTime)} / {formatTime(TOTAL_DURATION)}</p>
            </div>
        </div>
    );
}
