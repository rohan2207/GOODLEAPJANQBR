"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  MessageSquare, 
  Calculator, 
  Lightbulb, 
  FileCheck,
  Database,
  Zap,
  Users,
  TrendingUp,
  Shield,
  Clock,
  ArrowRight
} from 'lucide-react';

// Timing configuration (in seconds) - Total: 214s (3:34)
const TIMINGS = {
  hero: { start: 0, end: 10 },           // 10s - Intro (reduced)
  context: { start: 10, end: 30 },       // 20s - Industry context
  demo: { start: 30, end: 55 },          // 25s - Demo comparison
  features: { start: 55, end: 115 },     // 60s - Features showcase
  lastMile: { start: 115, end: 155 },    // 40s - Last Mile differentiator
  beta: { start: 155, end: 180 },        // 25s - Beta announcement
  closing: { start: 180, end: 214 },     // 34s - Roadmap + Close
};

export default function VideoPage() {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Timer that runs when playing
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= 214) {
          setIsPlaying(false);
          return 214;
        }
        return prev + 0.1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Handle timeline click/drag
  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    setCurrentTime(percentage * 214);
  };

  // Jump to section
  const jumpToSection = (sectionKey: keyof typeof TIMINGS) => {
    setCurrentTime(TIMINGS[sectionKey].start);
    setIsPlaying(false);
  };

  // Determine current section
  const getCurrentSection = () => {
    if (currentTime < TIMINGS.hero.end) return 'hero';
    if (currentTime < TIMINGS.context.end) return 'context';
    if (currentTime < TIMINGS.demo.end) return 'demo';
    if (currentTime < TIMINGS.features.end) return 'features';
    if (currentTime < TIMINGS.lastMile.end) return 'lastMile';
    if (currentTime < TIMINGS.beta.end) return 'beta';
    return 'closing';
  };

  const section = getCurrentSection();

  // Progress within current section (0-1)
  const getSectionProgress = () => {
    const timing = TIMINGS[section as keyof typeof TIMINGS];
    return (currentTime - timing.start) / (timing.end - timing.start);
  };

  const progress = getSectionProgress();

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[150px]" />
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {section === 'hero' && <HeroSlide key="hero" progress={progress} />}
        {section === 'context' && <ContextSlide key="context" progress={progress} />}
        {section === 'demo' && <DemoSlide key="demo" progress={progress} />}
        {section === 'features' && <FeaturesSlide key="features" progress={progress} />}
        {section === 'lastMile' && <LastMileSlide key="lastMile" progress={progress} />}
        {section === 'beta' && <BetaSlide key="beta" progress={progress} />}
        {section === 'closing' && <ClosingSlide key="closing" progress={progress} />}
      </AnimatePresence>

      {/* Controls Panel */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent pt-16 pb-6 px-8">
          {/* Timeline with section markers */}
          <div 
            className="relative h-3 bg-white/10 rounded-full cursor-pointer mb-4 group"
            onClick={handleTimelineClick}
          >
            {/* Section markers */}
            {Object.entries(TIMINGS).map(([key, timing]) => (
              <div
                key={key}
                className="absolute top-0 bottom-0 border-l border-white/30"
                style={{ left: `${(timing.start / 214) * 100}%` }}
              />
            ))}
            
            {/* Progress fill */}
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
              style={{ width: `${(currentTime / 214) * 100}%` }}
            />
            
            {/* Scrubber handle */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg transform -translate-x-1/2 group-hover:scale-110 transition-transform"
              style={{ left: `${(currentTime / 214) * 100}%` }}
            />
          </div>

          {/* Section buttons */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              {Object.entries(TIMINGS).map(([key, timing]) => (
                <button
                  key={key}
                  onClick={() => jumpToSection(key as keyof typeof TIMINGS)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    section === key 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-white/50 font-mono text-sm">
                {formatTime(currentTime)} / 3:34
              </span>
            </div>
          </div>

          {/* Main controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setCurrentTime(0)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white/80 rounded-lg transition-colors text-sm"
            >
              Restart
            </button>
            
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 text-white font-semibold rounded-xl transition-all text-lg shadow-lg shadow-orange-500/30"
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            
            <button
              onClick={() => setShowControls(false)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white/80 rounded-lg transition-colors text-sm"
            >
              Hide Controls
            </button>
          </div>
        </div>
      )}

      {/* Show controls button (when hidden) */}
      {!showControls && (
        <button
          onClick={() => setShowControls(true)}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white/60 rounded-lg transition-colors text-sm"
        >
          Show Controls
        </button>
      )}
    </div>
  );
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ============ SLIDE COMPONENTS ============

function HeroSlide({ progress }: { progress: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 flex flex-col items-center justify-center"
    >
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative"
      >
        <div className="absolute inset-0 blur-3xl bg-orange-500/30 scale-150" />
        <Image
          src="https://cdn.bfldr.com/Q445447Z/at/n85kkcjq5q8r3n6nf4z5jsw/LinkAI_BG_FullGradonBlk.svg?auto=webp&format=svg"
          alt="LinkAI"
          width={400}
          height={120}
          className="relative z-10"
        />
      </motion.div>

      {/* Version badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-8 flex items-center gap-3"
      >
        <span className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-400/20 border border-orange-500/30 text-orange-400 text-2xl font-light tracking-wider">
          2.0
        </span>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-12 text-3xl text-white/60 font-light tracking-wide"
      >
        The Platform That Thinks Ahead
      </motion.p>

      {/* Presenter info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: progress > 0.4 ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="absolute bottom-24 text-center"
      >
        <p className="text-xl text-white/80">Steve Hulme</p>
        <p className="text-lg text-white/50">Operations Executive, Mortgage Tech</p>
      </motion.div>
    </motion.div>
  );
}

function ContextSlide({ progress }: { progress: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 flex flex-col items-center justify-center px-20"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-5xl"
      >
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl text-orange-400 font-medium mb-8"
        >
          Industry Context
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl font-bold text-white leading-tight mb-12"
        >
          A{' '}
          <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
            once-in-25-years
          </span>
          <br />
          technology revolution
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: progress > 0.5 ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl text-white/60 font-light"
        >
          The question isn't <span className="text-white">if</span> AI will reshape mortgage—
          <br />
          it's <span className="text-orange-400 font-medium">who will do it best</span>.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

function DemoSlide({ progress }: { progress: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 flex flex-col items-center justify-center px-20"
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl text-orange-400 font-medium mb-12"
      >
        November 2025 vs Today
      </motion.p>

      <div className="flex items-center gap-20">
        {/* Old Way */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <div className="relative">
            <div className="text-8xl font-bold text-white/30 line-through decoration-red-500/60 decoration-4">
              15+
            </div>
            <p className="text-2xl text-white/40 mt-2">minutes</p>
          </div>
          <p className="text-lg text-white/30 mt-6">Manual process across<br />disparate systems</p>
        </motion.div>

        {/* Arrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <ArrowRight className="w-16 h-16 text-orange-500" />
        </motion.div>

        {/* New Way */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="relative">
            <div className="absolute inset-0 blur-2xl bg-orange-500/30" />
            <div className="relative text-8xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              30
            </div>
            <p className="text-2xl text-orange-400 mt-2">seconds</p>
          </div>
          <p className="text-lg text-white/60 mt-6">AI-powered<br />intelligent workspace</p>
        </motion.div>
      </div>

      {/* Context */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: progress > 0.6 ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="mt-16 text-xl text-white/50 text-center max-w-3xl"
      >
        Loan officer on a first call with a borrower exploring refinance and HELOC options
      </motion.p>
    </motion.div>
  );
}

function FeaturesSlide({ progress }: { progress: number }) {
  // 4 AI Assistants, each gets ~15 seconds (25% of 60s)
  const currentFeature = Math.min(3, Math.floor(progress * 4));

  const features = [
    {
      name: "Rapport Builder",
      tagline: "Know your borrower before the first word",
      color: "orange",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      name: "Liability AI",
      tagline: "Instant payoff strategy that optimizes DTI",
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      name: "Property AVM",
      tagline: "Real-time valuations with confidence scores",
      color: "amber",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      name: "Sales Coach",
      tagline: "Turn objections into opportunities",
      color: "purple",
      gradient: "from-purple-500 to-fuchsia-500",
    }
  ];

  const feature = features[currentFeature];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {/* Dynamic background glow */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: currentFeature === 0 
            ? 'radial-gradient(circle at center, rgba(249,115,22,0.15) 0%, transparent 70%)'
            : currentFeature === 1
            ? 'radial-gradient(circle at center, rgba(59,130,246,0.15) 0%, transparent 70%)'
            : currentFeature === 2
            ? 'radial-gradient(circle at center, rgba(245,158,11,0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(168,85,247,0.15) 0%, transparent 70%)'
        }}
        transition={{ duration: 1 }}
      />

      {/* Main content area */}
      <div className="relative w-full max-w-6xl mx-auto px-16">
        {/* Title - floats above */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFeature}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <motion.p 
              className="text-sm font-medium tracking-[0.3em] uppercase mb-3"
              style={{ color: currentFeature === 0 ? '#f97316' : currentFeature === 1 ? '#3b82f6' : currentFeature === 2 ? '#f59e0b' : '#a855f7' }}
            >
              AI Assistant {currentFeature + 1} of 4
            </motion.p>
            <h1 className={`text-6xl font-bold mb-4 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
              {feature.name}
            </h1>
            <p className="text-xl text-white/50">
              {feature.tagline}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Animated visualization area */}
        <div className="relative h-[450px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {currentFeature === 0 && <RapportBuilderAnimation key="rapport" />}
            {currentFeature === 1 && <LiabilityAIAnimation key="liability" />}
            {currentFeature === 2 && <PropertyAVMAnimation key="property" />}
            {currentFeature === 3 && <SalesCoachAnimation key="sales" />}
          </AnimatePresence>
        </div>
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-3">
        {features.map((f, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === currentFeature 
                ? `w-10 ${i === 0 ? 'bg-orange-500' : i === 1 ? 'bg-blue-500' : i === 2 ? 'bg-amber-500' : 'bg-purple-500'}` 
                : 'w-2 bg-white/20'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ============ ANIMATED VISUALIZATIONS ============

function RapportBuilderAnimation() {
  const INCOMING_DATA = [
    { label: "Credit Bureau", icon: "📊", x: -200, y: -100 },
    { label: "Property Records", icon: "🏠", x: 200, y: -80 },
    { label: "Bank Statements", icon: "🏦", x: -220, y: 30 },
    { label: "Employment", icon: "💼", x: 180, y: 70 },
    { label: "Loan History", icon: "📋", x: -160, y: 120 },
  ];

  const PROFILE_DATA = [
    { label: "Credit", value: "742", color: "#f97316" },
    { label: "Equity", value: "$127K", color: "#3b82f6" },
    { label: "DTI", value: "38%", color: "#22c55e" },
    { label: "Tenure", value: "3yr", color: "#a855f7" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-full flex items-center justify-center"
    >
      {/* Floating data tokens */}
      {INCOMING_DATA.map((data, i) => (
        <motion.div
          key={data.label}
          className="absolute flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
          initial={{ x: data.x * 1.5, y: data.y * 1.5, opacity: 0, scale: 0.8 }}
          animate={{ 
            x: [data.x * 1.5, data.x * 0.3, 0],
            y: [data.y * 1.5, data.y * 0.3, 0],
            opacity: [0, 1, 0],
            scale: [0.8, 1, 0.3]
          }}
          transition={{
            duration: 3,
            delay: i * 0.5,
            repeat: Infinity,
            repeatDelay: 0.5,
            ease: "easeInOut"
          }}
        >
          <span className="text-xl">{data.icon}</span>
          <span className="text-white/70 text-sm whitespace-nowrap">{data.label}</span>
        </motion.div>
      ))}

      {/* AI Processing indicator */}
      <motion.div
        className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-purple-500/30"
        animate={{ 
          boxShadow: [
            "0 0 20px rgba(147,51,234,0.2)",
            "0 0 40px rgba(147,51,234,0.4)",
            "0 0 20px rgba(147,51,234,0.2)"
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div 
          className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Zap className="w-3.5 h-3.5 text-white" />
        </motion.div>
        <span className="text-purple-300 text-sm font-medium">Analyzing data...</span>
      </motion.div>

      {/* Central Profile Card */}
      <motion.div
        className="relative z-10 w-80 rounded-2xl overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{
          background: "linear-gradient(135deg, rgba(249,115,22,0.15), rgba(249,115,22,0.05))",
          border: "1px solid rgba(249,115,22,0.4)",
          boxShadow: "0 0 60px rgba(249,115,22,0.25)"
        }}
      >
        <div className="p-5 flex items-center gap-4 border-b border-orange-500/20">
          <motion.div
            className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg"
            animate={{ 
              boxShadow: [
                "0 0 25px rgba(249,115,22,0.3)",
                "0 0 45px rgba(249,115,22,0.5)",
                "0 0 25px rgba(249,115,22,0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            JD
          </motion.div>
          <div>
            <h3 className="text-white font-semibold text-xl">John Doe</h3>
            <p className="text-white/40 text-sm">Borrower Profile</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 p-4">
          {PROFILE_DATA.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="p-3 rounded-xl"
              style={{ 
                backgroundColor: `${stat.color}15`,
                border: `1px solid ${stat.color}40`
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.15 }}
            >
              <p className="text-white/40 text-xs mb-1">{stat.label}</p>
              <p className="font-bold text-xl" style={{ color: stat.color }}>
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="px-4 pb-4">
          <motion.div 
            className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/25"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <div className="flex items-start gap-2">
              <span className="text-orange-500">✦</span>
              <p className="text-white/70 text-sm leading-relaxed">
                Strong equity position. Good refi candidate. Last contacted 6mo ago about HELOC.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Background glow */}
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-orange-500/15 blur-3xl -z-10"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Timer */}
      <motion.div
        className="absolute bottom-0 flex items-center gap-2 text-white/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <Clock className="w-4 h-4" />
        <span>Assembled in</span>
        <span className="text-orange-400 font-semibold">4.2s</span>
      </motion.div>
    </motion.div>
  );
}

function LiabilityAIAnimation() {
  const debts = [
    { name: "Amex Platinum", balance: "$12,800", rate: "24.9%", priority: 1 },
    { name: "Capital One", balance: "$8,200", rate: "22.4%", priority: 2 },
    { name: "SoFi Personal", balance: "$8,500", rate: "12.0%", priority: 3 },
    { name: "Chase Auto", balance: "$18,450", rate: "6.9%", priority: 4 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-full flex items-center justify-center gap-12"
    >
      {/* Left: Debt cards flying in */}
      <div className="relative w-72">
        {debts.map((debt, i) => (
          <motion.div
            key={debt.name}
            className="absolute w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
            initial={{ x: -200, opacity: 0, rotate: -10 }}
            animate={{ 
              x: 0, 
              y: i * 70, 
              opacity: 1, 
              rotate: 0 
            }}
            transition={{ delay: 0.2 + i * 0.2, type: "spring", stiffness: 100 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium text-sm">{debt.name}</p>
                <p className="text-white/40 text-xs">{debt.balance}</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                debt.priority <= 2 ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-white/50'
              }`}>
                {debt.rate}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Center: Processing indicator */}
      <motion.div
        className="flex flex-col items-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <motion.div
          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg mb-4"
          animate={{ 
            boxShadow: [
              "0 0 30px rgba(59,130,246,0.3)",
              "0 0 60px rgba(59,130,246,0.5)",
              "0 0 30px rgba(59,130,246,0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Calculator className="w-10 h-10 text-white" />
        </motion.div>
        <motion.p
          className="text-blue-400 text-sm font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Optimizing DTI...
        </motion.p>
      </motion.div>

      {/* Right: Result card */}
      <motion.div
        className="w-80 rounded-2xl overflow-hidden"
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 80 }}
        style={{
          background: "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(6,182,212,0.1))",
          border: "1px solid rgba(59,130,246,0.4)",
          boxShadow: "0 0 50px rgba(59,130,246,0.2)"
        }}
      >
        <div className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-400">✦</span>
            <span className="text-blue-300 text-sm font-medium uppercase tracking-wide">AI Recommendation</span>
          </div>
          <h3 className="text-white text-xl font-bold mb-4">Modified Avalanche</h3>
          
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { value: "$4,280", label: "Saved" },
              { value: "-8.2%", label: "DTI" },
              { value: "18mo", label: "Payoff" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center p-2 rounded-lg bg-white/10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + i * 0.1 }}
              >
                <p className="text-white font-bold text-lg">{stat.value}</p>
                <p className="text-white/40 text-xs">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-3">
            <div className="flex-1 p-3 rounded-lg bg-white/5 border border-white/10">
              <p className="text-white/40 text-xs mb-1">Before</p>
              <p className="text-red-400 font-bold">42.3% DTI</p>
            </div>
            <div className="flex-1 p-3 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-green-400 text-xs mb-1">After</p>
              <p className="text-green-400 font-bold">34.1% DTI</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function PropertyAVMAnimation() {
  const SOURCES = [
    { name: "Internal AVM", icon: "🏛️", angle: 0 },
    { name: "Zillow", icon: "🔵", angle: 90 },
    { name: "Redfin", icon: "🔴", angle: 180 },
    { name: "Realtor", icon: "⚪", angle: 270 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-full flex items-center justify-center"
    >
      {/* Orbiting sources */}
      {SOURCES.map((source, i) => {
        const radius = 200;
        const angle = source.angle;
        return (
          <motion.div
            key={source.name}
            className="absolute"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: Math.cos((angle + 45) * Math.PI / 180) * radius,
              y: Math.sin((angle + 45) * Math.PI / 180) * radius,
            }}
            transition={{ delay: 0.3 + i * 0.15 }}
          >
            <motion.div
              className="px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 backdrop-blur-sm"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{source.icon}</span>
                <span className="text-white/70 text-sm font-medium">{source.name}</span>
              </div>
            </motion.div>

            {/* Connecting line */}
            <motion.div
              className="absolute top-1/2 left-1/2 h-px bg-gradient-to-r from-amber-500/40 to-transparent"
              style={{
                width: radius - 80,
                transform: `rotate(${angle + 225}deg)`,
                transformOrigin: '0 0',
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6 + i * 0.15, duration: 0.4 }}
            />
          </motion.div>
        );
      })}

      {/* Center property card */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl bg-amber-500/30 blur-2xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div className="relative p-8 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/40">
          <div className="flex flex-col items-center">
            <motion.div
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-4 shadow-lg"
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </motion.div>
            <p className="text-amber-400 font-bold text-xl mb-1">$785,000</p>
            <p className="text-white/50 text-sm mb-3">2116 Shrewsbury Dr, McKinney TX</p>
            
            <motion.div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <span className="text-green-400 text-sm font-medium">94% Confidence</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom status */}
      <motion.div
        className="absolute bottom-0 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="w-2 h-2 rounded-full bg-amber-500"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <span className="text-amber-400 text-sm">Comparing 4 sources for confidence</span>
      </motion.div>
    </motion.div>
  );
}

function SalesCoachAnimation() {
  const OBJECTIONS = [
    { text: "Your rates are too high", x: -120, y: -80 },
    { text: "Closing costs seem expensive", x: 140, y: -40 },
    { text: "I want to wait for better rates", x: -80, y: 60 },
  ];

  const RESPONSES = [
    { text: "Calculate blended rate", x: 160, y: 20 },
    { text: "Monthly savings breakdown", x: -140, y: 100 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-full flex items-center justify-center"
    >
      {/* Objection bubbles */}
      {OBJECTIONS.map((obj, i) => (
        <motion.div
          key={obj.text}
          className="absolute px-4 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            x: obj.x, 
            y: obj.y 
          }}
          transition={{ delay: 0.2 + i * 0.2, type: "spring", stiffness: 100 }}
          style={{ boxShadow: '0 0 25px rgba(244,63,94,0.15)' }}
        >
          <div className="flex items-center gap-2">
            <span className="text-rose-400">&ldquo;</span>
            <p className="text-white/80 text-sm font-medium whitespace-nowrap">{obj.text}</p>
            <span className="text-rose-400">&rdquo;</span>
          </div>
        </motion.div>
      ))}

      {/* Response bubbles */}
      {RESPONSES.map((res, i) => (
        <motion.div
          key={res.text}
          className="absolute px-4 py-2.5 rounded-xl bg-teal-500/10 border border-teal-500/30 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            x: res.x, 
            y: res.y 
          }}
          transition={{ delay: 1 + i * 0.2, type: "spring", stiffness: 100 }}
          style={{ boxShadow: '0 0 25px rgba(20,184,166,0.15)' }}
        >
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-teal-400" />
            <p className="text-white/80 text-sm font-medium whitespace-nowrap">{res.text}</p>
          </div>
        </motion.div>
      ))}

      {/* Center AI icon */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring" }}
      >
        <motion.div
          className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center shadow-lg"
          animate={{ 
            boxShadow: [
              "0 0 30px rgba(168,85,247,0.3)",
              "0 0 60px rgba(168,85,247,0.5)",
              "0 0 30px rgba(168,85,247,0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <MessageSquare className="w-12 h-12 text-white" />
        </motion.div>
      </motion.div>

      {/* Bottom coaching tip */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 max-w-lg p-4 rounded-xl bg-purple-500/10 border border-purple-500/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
      >
        <div className="flex items-start gap-3">
          <span className="text-purple-400">✦</span>
          <p className="text-white/70 text-sm">
            <span className="text-purple-400 font-medium">AI Coach:</span> "With your credit profile, you'd qualify for 6.75% on a cash-out. That saves $285/mo."
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}


function LastMileSlide({ progress }: { progress: number }) {
  const dataPoints = [
    { icon: Database, label: "Loan History" },
    { icon: TrendingUp, label: "Payment Patterns" },
    { icon: Shield, label: "Credit Profiles" },
    { icon: Users, label: "Past Interactions" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 flex flex-col items-center justify-center px-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <p className="text-2xl text-orange-400 font-medium mb-4">What Makes LinkAI Unique</p>
        <h2 className="text-5xl font-bold text-white mb-6">
          The Intelligent{' '}
          <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
            Last Mile
          </span>
        </h2>
      </motion.div>

      <div className="flex items-center gap-16 max-w-6xl">
        {/* Left: LLMs */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex-1 text-center"
        >
          <div className="p-8 border border-white/10 rounded-2xl bg-white/5">
            <p className="text-xl text-white/50 mb-4">Core AI Capabilities</p>
            <div className="flex justify-center gap-4 mb-4">
              <span className="px-4 py-2 rounded-lg bg-white/10 text-white/70">Claude</span>
              <span className="px-4 py-2 rounded-lg bg-white/10 text-white/70">OpenAI</span>
            </div>
            <p className="text-white/40 text-sm">Foundation models</p>
          </div>
        </motion.div>

        {/* Plus sign */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="text-5xl text-orange-500 font-light"
        >
          +
        </motion.div>

        {/* Right: Our Data */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="flex-1"
        >
          <div className="p-8 border border-orange-500/30 rounded-2xl bg-gradient-to-br from-orange-500/10 to-orange-500/5">
            <p className="text-xl text-orange-400 mb-6 text-center">Our Critical Last Mile</p>
            <div className="grid grid-cols-2 gap-4">
              {dataPoints.map((point, index) => (
                <motion.div
                  key={point.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: progress > 0.3 + index * 0.1 ? 1 : 0, y: progress > 0.3 + index * 0.1 ? 0 : 10 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5"
                >
                  <point.icon className="w-5 h-5 text-orange-400" />
                  <span className="text-white/80">{point.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom insight */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: progress > 0.6 ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="mt-12 text-xl text-white/50 text-center max-w-4xl"
      >
        LinkAI anticipates needs, surfaces opportunities the loan officer might not consider,
        <br />and personalizes solutions based on what <span className="text-orange-400">only we know</span> about each borrower.
      </motion.p>
    </motion.div>
  );
}

function BetaSlide({ progress }: { progress: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block mb-8"
        >
          <span className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500/20 to-emerald-400/20 border border-emerald-500/30 text-emerald-400 text-xl font-medium">
            February 2026 Release
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-6xl font-bold text-white mb-8"
        >
          Live in Beta
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          className="relative inline-block"
        >
          <div className="absolute inset-0 blur-3xl bg-orange-500/40" />
          <div className="relative text-9xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
            15
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 text-3xl text-white/60"
        >
          Loan Officers Using It Daily
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: progress > 0.6 ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          className="mt-8 text-xl text-white/40"
        >
          On live calls with real borrowers
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

function ClosingSlide({ progress }: { progress: number }) {
  const roadmapItems = [
    "Expanded soft credit exploitation",
    "Additional product integrations",
    "Complex loan product rule sets"
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 flex flex-col items-center justify-center"
    >
      {progress < 0.5 ? (
        // Roadmap (first half)
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <p className="text-xl text-orange-400 mb-6">Next on the Roadmap</p>
          <div className="space-y-4">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                className="flex items-center gap-4"
              >
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <span className="text-2xl text-white/80">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        // Final logo (second half)
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative mb-8">
            <div className="absolute inset-0 blur-3xl bg-orange-500/20 scale-150" />
            <Image
              src="https://cdn.bfldr.com/Q445447Z/at/n85kkcjq5q8r3n6nf4z5jsw/LinkAI_BG_FullGradonBlk.svg?auto=webp&format=svg"
              alt="LinkAI"
              width={300}
              height={90}
              className="relative z-10"
            />
          </div>
          <p className="text-2xl text-white/60">
            Leading the industry revolution through the{' '}
            <span className="text-orange-400">intelligent last mile</span>
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
