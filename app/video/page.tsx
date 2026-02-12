"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Play, Pause, RotateCcw, Sparkles, ArrowRight, Check, Star, Database, TrendingUp, Shield, Users } from 'lucide-react';

// Import stage components from main page
import BeforeStage from '@/components/stages/BeforeStage';
import Agent1Stage from '@/components/stages/Agent1Stage';
import Agent2Stage from '@/components/stages/Agent2Stage';
import Agent3Stage from '@/components/stages/Agent3Stage';

// Import feature cards
import BriefAICard from '@/components/features/BriefAICard';
import LiabilityAICard from '@/components/features/LiabilityAICard';
import PropertyCard from '@/components/features/PropertyCard';

// Total duration in seconds (3:34 = 214 seconds)
const DURATION = 214;

// Section timing (as percentages of total)
const SECTIONS = {
  intro: { start: 0, end: 0.05 },           // 0-5% (~11s)
  problem: { start: 0.05, end: 0.13 },      // 5-13% (~17s)
  rapport: { start: 0.13, end: 0.30 },      // 13-30% (~36s)
  salesCoach: { start: 0.30, end: 0.47 },   // 30-47% (~36s)
  valuation: { start: 0.47, end: 0.64 },    // 47-64% (~36s)
  figure: { start: 0.64, end: 0.76 },       // 64-76% (~26s)
  roadmap: { start: 0.76, end: 0.86 },      // 76-86% (~21s)
  lastMile: { start: 0.86, end: 0.96 },     // 86-96% (~21s)
  close: { start: 0.96, end: 1.0 },         // 96-100% (~9s)
};

// Helper to get section progress (0-1) based on global progress
function getSectionProgress(globalProgress: number, sectionStart: number, sectionEnd: number): number {
  if (globalProgress < sectionStart) return 0;
  if (globalProgress > sectionEnd) return 1;
  return (globalProgress - sectionStart) / (sectionEnd - sectionStart);
}

// Format time as MM:SS
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function VideoPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Time-based progress update
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + (0.1 / DURATION);
        if (next >= 1) {
          setIsPlaying(false);
          return 1;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Calculate horizontal scroll position
  // Total width is approximately 900vw (9 sections)
  const translateX = progress * -800; // vw units

  // Motion values for feature cards
  const briefProgress = useMotionValue(0);
  const liabilityProgress = useMotionValue(0);
  const propertyProgress = useMotionValue(0);

  // Update motion values based on progress
  useEffect(() => {
    const rapportProg = getSectionProgress(progress, SECTIONS.rapport.start, SECTIONS.rapport.end);
    const salesProg = getSectionProgress(progress, SECTIONS.salesCoach.start, SECTIONS.salesCoach.end);
    const valuationProg = getSectionProgress(progress, SECTIONS.valuation.start, SECTIONS.valuation.end);
    
    briefProgress.set(rapportProg);
    liabilityProgress.set(salesProg);
    propertyProgress.set(valuationProg);
  }, [progress, briefProgress, liabilityProgress, propertyProgress]);

  return (
    <div className="relative w-screen h-screen bg-[#030308] overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.08)_0%,transparent_70%)]" />
      </div>

      {/* Horizontal scrolling container */}
      <motion.div
        ref={containerRef}
        className="flex h-full"
        style={{ 
          width: '900vw',
          x: `${translateX}vw`,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.1 }}
      >
        {/* === SECTION 1: INTRO === */}
        <IntroSection progress={getSectionProgress(progress, SECTIONS.intro.start, SECTIONS.intro.end)} />

        {/* === SECTION 2: THE PROBLEM === */}
        <ProblemSection progress={getSectionProgress(progress, SECTIONS.problem.start, SECTIONS.problem.end)} />

        {/* === SECTION 3: RAPPORT BUILDER === */}
        <RapportSection 
          progress={getSectionProgress(progress, SECTIONS.rapport.start, SECTIONS.rapport.end)} 
          cardProgress={briefProgress}
        />

        {/* === SECTION 4: SALES COACH === */}
        <SalesCoachSection 
          progress={getSectionProgress(progress, SECTIONS.salesCoach.start, SECTIONS.salesCoach.end)}
          cardProgress={liabilityProgress}
        />

        {/* === SECTION 5: VALUATION AI === */}
        <ValuationSection 
          progress={getSectionProgress(progress, SECTIONS.valuation.start, SECTIONS.valuation.end)}
          cardProgress={propertyProgress}
        />

        {/* === SECTION 6: FIGURE/HELOC === */}
        <FigureSection progress={getSectionProgress(progress, SECTIONS.figure.start, SECTIONS.figure.end)} />

        {/* === SECTION 7: ROADMAP === */}
        <RoadmapSection progress={getSectionProgress(progress, SECTIONS.roadmap.start, SECTIONS.roadmap.end)} />

        {/* === SECTION 8: LAST MILE + BETA === */}
        <LastMileSection progress={getSectionProgress(progress, SECTIONS.lastMile.start, SECTIONS.lastMile.end)} />

        {/* === SECTION 9: CLOSE === */}
        <CloseSection progress={getSectionProgress(progress, SECTIONS.close.start, SECTIONS.close.end)} />
      </motion.div>

      {/* Horizontal Journey Line */}
      <div className="fixed top-1/2 left-0 right-0 h-px pointer-events-none z-10">
        <motion.div 
          className="h-full bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"
          style={{ 
            width: '200%',
            x: `${-progress * 100}%`
          }}
        />
      </div>

      {/* Controls */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
        <button
          onClick={() => { setProgress(0); setIsPlaying(false); }}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white/70 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold text-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all flex items-center gap-3"
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        <div className="px-4 py-2 rounded-xl bg-white/10 text-white/60 font-mono text-sm">
          {formatTime(progress * DURATION)} / 3:34
        </div>
      </div>

      {/* Progress bar */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-white/10 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-orange-500 to-orange-400"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}

// === INTRO SECTION ===
function IntroSection({ progress }: { progress: number }) {
  return (
    <section className="w-[100vw] h-full flex-shrink-0 flex items-center justify-center relative">
      <motion.div 
        className="text-center"
        style={{ opacity: progress < 0.8 ? 1 : 1 - (progress - 0.8) * 5 }}
      >
        {/* Glowing logo */}
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 blur-3xl bg-orange-500/30 scale-150" />
          <Image
            src="https://cdn.bfldr.com/Q445447Z/at/n85kkcjq5q8r3n6nf4z5jsw/LinkAI_BG_FullGradonBlk.svg"
            alt="LinkAI"
            width={400}
            height={120}
            className="relative z-10"
          />
        </motion.div>

        {/* Version badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: progress > 0.2 ? 1 : 0, y: progress > 0.2 ? 0 : 20 }}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 mb-8"
        >
          <span className="text-orange-400 text-2xl font-light">2.0</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: progress > 0.4 ? 1 : 0 }}
          className="text-2xl text-white/60 font-light"
        >
          The Platform That Thinks Ahead
        </motion.p>
      </motion.div>
    </section>
  );
}

// === PROBLEM SECTION ===
function ProblemSection({ progress }: { progress: number }) {
  return (
    <section className="w-[100vw] h-full flex-shrink-0 flex items-center relative">
      <div className="w-full max-w-7xl mx-auto px-16 flex items-center gap-16">
        {/* Left: Text */}
        <motion.div 
          className="flex-1"
          style={{ 
            opacity: progress > 0.1 ? 1 : progress * 10,
            x: progress > 0.1 ? 0 : 50 - progress * 500
          }}
        >
          <div className="text-purple-400 text-sm font-medium tracking-[0.2em] uppercase mb-4">
            THE PROBLEM
          </div>
          <h2 className="text-5xl font-bold text-white mb-4">
            Starting with the Borrower
          </h2>
          <p className="text-2xl text-white/50 mb-6">
            Where Context Should Begin
          </p>
          <p className="text-lg text-white/40 max-w-lg">
            Credit history, liabilities, assets, past loans, property info—all scattered. 
            Loan officers build rapport while flying blind.
          </p>
        </motion.div>

        {/* Right: Stage visualization */}
        <motion.div 
          className="flex-1 h-[500px] relative"
          style={{ opacity: progress > 0.3 ? 1 : 0 }}
        >
          <BeforeStage />
        </motion.div>
      </div>
    </section>
  );
}

// === RAPPORT BUILDER SECTION ===
function RapportSection({ progress, cardProgress }: { progress: number; cardProgress: any }) {
  const showCard = progress > 0.3;
  
  return (
    <section className="w-[100vw] h-full flex-shrink-0 flex items-center relative">
      <div className="w-full max-w-7xl mx-auto px-16 flex items-center gap-16">
        {/* Left: Text */}
        <motion.div 
          className="w-[35%]"
          style={{ 
            opacity: progress > 0.1 ? (showCard ? 0.7 : 1) : progress * 10,
            scale: showCard ? 0.85 : 1,
            x: showCard ? -100 : 0
          }}
        >
          <div className="text-fuchsia-400 text-sm font-medium tracking-[0.2em] uppercase mb-4">
            AI AGENT
          </div>
          <h2 className="text-5xl font-bold text-white mb-4">
            Rapport Builder
          </h2>
          <p className="text-2xl text-fuchsia-400/80 mb-6">
            Know Your Borrower
          </p>
          <p className="text-lg text-white/40 max-w-lg">
            Credit, property, assets, liabilities—assembled in seconds. 
            Walk into every call prepared.
          </p>
        </motion.div>

        {/* Right: Feature Card or Stage */}
        <motion.div 
          className="flex-1 h-[600px] relative"
          style={{ opacity: progress > 0.2 ? 1 : 0 }}
        >
          {!showCard ? (
            <Agent1Stage />
          ) : (
            <BriefAICard progress={cardProgress} />
          )}
        </motion.div>
      </div>
    </section>
  );
}

// === SALES COACH SECTION ===
function SalesCoachSection({ progress, cardProgress }: { progress: number; cardProgress: any }) {
  const showCard = progress > 0.3;
  
  return (
    <section className="w-[100vw] h-full flex-shrink-0 flex items-center relative">
      <div className="w-full max-w-7xl mx-auto px-16 flex items-center gap-16">
        {/* Left: Text */}
        <motion.div 
          className="w-[35%]"
          style={{ 
            opacity: progress > 0.1 ? (showCard ? 0.7 : 1) : progress * 10,
            scale: showCard ? 0.85 : 1,
            x: showCard ? -100 : 0
          }}
        >
          <div className="text-orange-400 text-sm font-medium tracking-[0.2em] uppercase mb-4">
            AI AGENT
          </div>
          <h2 className="text-5xl font-bold text-white mb-4">
            Sales Coach
          </h2>
          <p className="text-2xl text-orange-400/80 mb-6">
            Turn Objections into Opportunities
          </p>
          <p className="text-lg text-white/40 max-w-lg">
            Real-time guidance to handle objections and calculate benefits—
            personalized to each borrower's data.
          </p>
        </motion.div>

        {/* Right: Feature Card or Stage */}
        <motion.div 
          className="flex-1 h-[600px] relative"
          style={{ opacity: progress > 0.2 ? 1 : 0 }}
        >
          {!showCard ? (
            <Agent2Stage />
          ) : (
            <LiabilityAICard progress={cardProgress} />
          )}
        </motion.div>
      </div>
    </section>
  );
}

// === VALUATION SECTION ===
function ValuationSection({ progress, cardProgress }: { progress: number; cardProgress: any }) {
  const showCard = progress > 0.3;
  
  return (
    <section className="w-[100vw] h-full flex-shrink-0 flex items-center relative">
      <div className="w-full max-w-7xl mx-auto px-16 flex items-center gap-16">
        {/* Left: Text */}
        <motion.div 
          className="w-[35%]"
          style={{ 
            opacity: progress > 0.1 ? (showCard ? 0.7 : 1) : progress * 10,
            scale: showCard ? 0.85 : 1,
            x: showCard ? -100 : 0
          }}
        >
          <div className="text-amber-400 text-sm font-medium tracking-[0.2em] uppercase mb-4">
            AI AGENT
          </div>
          <h2 className="text-5xl font-bold text-white mb-4">
            Valuation AI
          </h2>
          <p className="text-2xl text-amber-400/80 mb-6">
            Confident Pricing
          </p>
          <p className="text-lg text-white/40 max-w-lg">
            Real-time property valuation and market comparables 
            for confident recommendations.
          </p>
        </motion.div>

        {/* Right: Feature Card or Stage */}
        <motion.div 
          className="flex-1 h-[600px] relative"
          style={{ opacity: progress > 0.2 ? 1 : 0 }}
        >
          {!showCard ? (
            <Agent3Stage />
          ) : (
            <PropertyCard progress={cardProgress} />
          )}
        </motion.div>
      </div>
    </section>
  );
}

// === FIGURE/HELOC SECTION ===
function FigureSection({ progress }: { progress: number }) {
  const steps = [
    { title: "One Click", subtitle: "All Data Ready", description: "Complete loan application prefilled in LINK" },
    { title: "Automatically Prefilled", subtitle: "Zero Manual Entry", description: "Transferring to Figure..." },
    { title: "Land on Figure", subtitle: "Start Closing", description: "Application submitted, ready to process" },
  ];
  
  const activeStep = Math.min(2, Math.floor(progress * 3));

  return (
    <section className="w-[100vw] h-full flex-shrink-0 flex items-center justify-center relative">
      <div className="text-center max-w-5xl mx-auto px-16">
        {/* Header */}
        <motion.div style={{ opacity: progress > 0.1 ? 1 : progress * 10 }}>
          <div className="text-blue-400 text-sm font-medium tracking-[0.2em] uppercase mb-4">
            FIGURE INTEGRATION
          </div>
          <h2 className="text-5xl font-bold text-white mb-4">
            Direct to FIGURE (HELOC).{' '}
            <span className="text-blue-400">Zero Re-entry.</span>
          </h2>
          <p className="text-xl text-white/50 mb-12">
            HELOC exploded. We built the bridge.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="flex items-center justify-center gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              className={`flex-1 p-6 rounded-2xl border transition-all ${
                i <= activeStep 
                  ? 'bg-blue-500/10 border-blue-500/30' 
                  : 'bg-white/5 border-white/10'
              }`}
              style={{ opacity: progress > 0.2 + i * 0.2 ? 1 : 0 }}
            >
              <div className={`text-4xl font-bold mb-2 ${i <= activeStep ? 'text-blue-400' : 'text-white/30'}`}>
                {i + 1}
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">{step.title}</h3>
              <p className={`text-sm ${i <= activeStep ? 'text-blue-400/80' : 'text-white/40'}`}>
                {step.subtitle}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// === ROADMAP SECTION ===
function RoadmapSection({ progress }: { progress: number }) {
  const quarters = [
    { id: "pre", label: "Pre", current: false },
    { id: "q3-25", label: "Q3'25", current: false },
    { id: "q4-25", label: "Q4'25", current: false },
    { id: "q1-26", label: "Q1'26", current: true },
    { id: "q2-26", label: "Q2'26", current: false },
  ];

  const features = [
    { quarter: "pre", name: "Foundation", checked: true },
    { quarter: "pre", name: "Core Platform", checked: true },
    { quarter: "q3-25", name: "Pre-Credit", checked: true },
    { quarter: "q3-25", name: "Property Data", checked: true },
    { quarter: "q3-25", name: "AI Insights", checked: true },
    { quarter: "q4-25", name: "Quick App", checked: true },
    { quarter: "q4-25", name: "Customer Context", checked: true },
    { quarter: "q1-26", name: "Pricing Engine", checked: true },
    { quarter: "q1-26", name: "AI LO Coach", checked: true },
    { quarter: "q1-26", name: "Deal Structuring", checked: true },
    { quarter: "q2-26", name: "AI Scenarios", checked: false },
    { quarter: "q2-26", name: "Full Pricing Suite", checked: false },
  ];

  return (
    <section className="w-[100vw] h-full flex-shrink-0 flex items-center justify-center relative">
      <div className="max-w-5xl mx-auto px-16">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          style={{ opacity: progress > 0.1 ? 1 : progress * 10 }}
        >
          <div className="text-orange-500 text-sm font-bold tracking-[0.2em] uppercase mb-4">
            Product Roadmap
          </div>
          <h2 className="text-5xl font-bold text-white mb-2">
            Complete Deal Structuring
          </h2>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
            & Pricing
          </h2>
        </motion.div>

        {/* Timeline */}
        <motion.div 
          className="mb-8"
          style={{ opacity: progress > 0.3 ? 1 : 0 }}
        >
          <div className="flex items-end w-full">
            {quarters.map((q) => (
              <div key={q.id} className="flex-1 text-center relative">
                {q.current && (
                  <Star className="w-4 h-4 text-orange-500 fill-orange-500 absolute -top-6 left-1/2 -translate-x-1/2" />
                )}
                <div className={`text-lg font-semibold mb-2 ${q.current ? "text-white" : "text-zinc-500"}`}>
                  {q.label}
                </div>
                <div className={`h-1 ${q.current ? "bg-gradient-to-r from-orange-500 to-amber-500" : "bg-zinc-800"}`} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Feature Grid */}
        <motion.div 
          className="grid grid-cols-5 gap-3"
          style={{ opacity: progress > 0.5 ? 1 : 0 }}
        >
          {quarters.map((q) => (
            <div key={q.id} className="space-y-2">
              {features.filter(f => f.quarter === q.id).map((feature) => (
                <div
                  key={feature.name}
                  className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${
                    feature.checked 
                      ? 'bg-zinc-800 text-white' 
                      : 'bg-zinc-900 text-zinc-500 border border-zinc-800'
                  }`}
                >
                  {feature.checked ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-zinc-600" />
                  )}
                  <span className="truncate">{feature.name}</span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// === LAST MILE + BETA SECTION ===
function LastMileSection({ progress }: { progress: number }) {
  const dataPoints = [
    { icon: Database, label: "Loan History" },
    { icon: TrendingUp, label: "Payment Patterns" },
    { icon: Shield, label: "Credit Profiles" },
    { icon: Users, label: "Past Interactions" },
  ];

  return (
    <section className="w-[100vw] h-full flex-shrink-0 flex flex-col items-center justify-center relative px-16">
      {/* Header */}
      <motion.div
        className="absolute top-12 left-1/2 -translate-x-1/2"
        style={{ opacity: progress > 0.1 ? 1 : progress * 10 }}
      >
        <div className="flex items-center gap-4">
          <Image
            src="https://cdn.bfldr.com/Q445447Z/at/n85kkcjq5q8r3n6nf4z5jsw/LinkAI_BG_FullGradonBlk.svg"
            alt="LinkAI"
            width={120}
            height={36}
          />
          <div className="h-8 w-px bg-white/20" />
          <p className="text-xl text-white/60 font-light">
            The Platform That <span className="text-orange-400">Thinks Ahead</span>
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="text-center mb-10"
        style={{ opacity: progress > 0.2 ? 1 : 0 }}
      >
        <p className="text-xl text-orange-400 font-medium mb-4">What Makes LinkAI Unique</p>
        <h2 className="text-5xl font-bold text-white mb-4">
          The Intelligent{' '}
          <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
            Last Mile
          </span>
        </h2>
      </motion.div>

      {/* LLMs + Our Data */}
      <motion.div 
        className="flex items-center gap-12 max-w-5xl mb-12"
        style={{ opacity: progress > 0.3 ? 1 : 0 }}
      >
        {/* LLMs */}
        <div className="flex-1 text-center">
          <div className="p-6 border border-white/10 rounded-2xl bg-white/5">
            <p className="text-lg text-white/50 mb-4">Core AI Capabilities</p>
            <div className="flex justify-center gap-3 mb-3">
              <span className="px-3 py-1.5 rounded-lg bg-white/10 text-white/70 text-sm">Claude</span>
              <span className="px-3 py-1.5 rounded-lg bg-white/10 text-white/70 text-sm">OpenAI</span>
            </div>
            <p className="text-white/40 text-xs">Foundation models</p>
          </div>
        </div>

        <div className="text-4xl text-orange-500 font-light">+</div>

        {/* Our Data */}
        <div className="flex-1">
          <div className="p-6 border border-orange-500/30 rounded-2xl bg-gradient-to-br from-orange-500/10 to-orange-500/5">
            <p className="text-lg text-orange-400 mb-4 text-center">Our Critical Last Mile</p>
            <div className="grid grid-cols-2 gap-3">
              {dataPoints.map((point, index) => (
                <motion.div
                  key={point.label}
                  className="flex items-center gap-2 p-2 rounded-lg bg-white/5"
                  style={{ opacity: progress > 0.4 + index * 0.1 ? 1 : 0 }}
                >
                  <point.icon className="w-4 h-4 text-orange-400" />
                  <span className="text-white/80 text-sm">{point.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Version Status Footer */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2"
        style={{ opacity: progress > 0.6 ? 1 : 0 }}
      >
        <div className="flex items-center gap-8">
          {/* Q1 General Launch - LIVE */}
          <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-400 font-medium">LIVE</span>
            </div>
            <div className="h-6 w-px bg-emerald-500/30" />
            <div className="text-left">
              <p className="text-white font-semibold">Q1 General Launch</p>
              <p className="text-white/50 text-sm">All Loan Officers</p>
            </div>
          </div>

          <ArrowRight className="w-6 h-6 text-white/30" />

          {/* LinkAI 2.0 - BETA */}
          <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-orange-500/10 border border-orange-500/30">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-orange-400 font-medium">BETA</span>
            </div>
            <div className="h-6 w-px bg-orange-500/30" />
            <div className="text-left">
              <p className="text-white font-semibold">LinkAI 2.0</p>
              <p className="text-white/50 text-sm">15 Loan Officers</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// === CLOSE SECTION ===
function CloseSection({ progress }: { progress: number }) {
  return (
    <section className="w-[100vw] h-full flex-shrink-0 flex items-center justify-center relative">
      <motion.div 
        className="text-center"
        style={{ opacity: progress > 0.2 ? 1 : 0 }}
      >
        {/* Glowing logo */}
        <motion.div className="relative mb-8">
          <motion.div
            className="absolute inset-0 blur-3xl bg-orange-500/40 scale-150"
            animate={{ 
              opacity: [0.3, 0.6, 0.3],
              scale: [1.4, 1.6, 1.4]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <Image
            src="https://cdn.bfldr.com/Q445447Z/at/n85kkcjq5q8r3n6nf4z5jsw/LinkAI_BG_FullGradonBlk.svg"
            alt="LinkAI"
            width={350}
            height={105}
            className="relative z-10"
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: progress > 0.5 ? 1 : 0 }}
          className="text-3xl text-white/70 font-light mb-8"
        >
          One Platform. Infinite Possibilities.
        </motion.p>

        {/* Key differentiator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: progress > 0.7 ? 1 : 0 }}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-400/10 border border-orange-500/30"
        >
          <Sparkles className="w-5 h-5 text-orange-400" />
          <span className="text-xl text-white">
            Through the{' '}
            <span className="text-orange-400 font-semibold">intelligent last mile</span>
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
