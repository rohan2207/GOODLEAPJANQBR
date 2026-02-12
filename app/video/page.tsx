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
  const featureProgress = (progress * 4) % 1;

  const features = [
    {
      name: "Brief AI",
      tagline: "Pre-call intelligence that knows your borrower",
      color: "orange",
      gradient: "from-orange-500 to-orange-600",
      stats: [
        { value: "4.2s", label: "generation" },
        { value: "100%", label: "context" },
      ]
    },
    {
      name: "Liability AI",
      tagline: "Instant payoff strategy that optimizes DTI",
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
      stats: [
        { value: "$4,280", label: "saved" },
        { value: "-8.2%", label: "DTI" },
      ]
    },
    {
      name: "Property AVM",
      tagline: "Real-time valuations with confidence scores",
      color: "emerald",
      gradient: "from-emerald-500 to-emerald-600",
      stats: [
        { value: "$785K", label: "value" },
        { value: "94%", label: "confidence" },
      ]
    },
    {
      name: "Sales Coach",
      tagline: "Real-time guidance throughout every call",
      color: "purple",
      gradient: "from-purple-500 to-purple-600",
      stats: [
        { value: "Live", label: "suggestions" },
        { value: "2x", label: "conversions" },
      ]
    }
  ];

  const feature = features[currentFeature];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 flex items-center justify-center px-16"
    >
      {/* Background glow based on current feature */}
      <div className={`absolute inset-0 bg-gradient-radial from-${feature.color}-500/20 via-transparent to-transparent opacity-60 transition-all duration-1000`} />

      <div className="flex items-center gap-16 max-w-7xl w-full">
        {/* Left: Feature Info */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFeature}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5 }}
            >
              <p className={`text-${feature.color}-400 text-sm font-medium tracking-[0.3em] uppercase mb-4`}>
                AI Assistant {currentFeature + 1} of 4
              </p>
              <h1 className={`text-6xl font-bold mb-4 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                {feature.name}
              </h1>
              <p className="text-2xl text-white/60 mb-8 max-w-lg">
                {feature.tagline}
              </p>
              
              <div className="flex gap-8">
                {feature.stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="text-center"
                  >
                    <p className="text-4xl font-bold text-white">{stat.value}</p>
                    <p className="text-white/40 text-sm mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: UI Screenshot */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFeature}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Browser chrome */}
              <div className="bg-[#0a0a0a] rounded-xl border border-white/[0.08] overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 px-3 py-2 bg-[#050505] border-b border-white/[0.05]">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="bg-white/[0.06] rounded px-3 py-1 text-white/30 text-xs font-mono">
                      linkai.goodleap.com
                    </div>
                  </div>
                </div>

                {/* Screenshot content */}
                <div className="aspect-[16/10] bg-gradient-to-br from-[#fefefe] to-[#f8fafc] p-4">
                  {currentFeature === 0 && <BriefAIScreenshot />}
                  {currentFeature === 1 && <LiabilityAIScreenshot />}
                  {currentFeature === 2 && <PropertyAVMScreenshot />}
                  {currentFeature === 3 && <SalesCoachScreenshot />}
                </div>
              </div>

              {/* Glow effect */}
              <div className={`absolute -inset-8 bg-gradient-radial from-${feature.color}-500/30 via-transparent to-transparent blur-2xl -z-10`} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-3">
        {features.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentFeature ? 'bg-white w-8' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

// Screenshot Components for each AI Assistant

function BriefAIScreenshot() {
  return (
    <div className="h-full grid grid-cols-12 gap-3">
      <div className="col-span-8 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
            <span className="text-white text-lg">✦</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">Call Prep Brief</h3>
            <p className="text-gray-400 text-xs">AI-Generated</p>
          </div>
        </div>
        <div className="bg-orange-50 rounded-lg p-3 mb-3 border border-orange-100">
          <p className="text-orange-600 text-xs font-semibold uppercase mb-1">Summary</p>
          <p className="text-gray-700 text-xs">Near-prime borrower in McKinney, TX looking to consolidate debt. Strong equity position with $358K available.</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Property", value: "$785K", color: "blue" },
            { label: "Liens", value: "$428K", color: "orange" },
            { label: "Equity", value: "$358K", color: "green" },
          ].map((stat) => (
            <div key={stat.label} className={`bg-${stat.color}-50 rounded-lg p-2 text-center border border-${stat.color}-100`}>
              <p className="text-gray-900 font-bold text-sm">{stat.value}</p>
              <p className="text-gray-500 text-[10px]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-4 space-y-3">
        <div className="bg-white rounded-xl shadow-lg p-3 border border-gray-100">
          <p className="font-semibold text-gray-900 text-xs mb-2">Talk Track</p>
          <p className="text-gray-600 text-[10px] italic leading-relaxed">"Thank you for your time today, I see you have significant equity we can leverage..."</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-3 border border-gray-100">
          <p className="font-semibold text-gray-900 text-xs mb-2">Local Context</p>
          <p className="text-gray-600 text-xs">72°F Sunny • McKinney, TX</p>
          <p className="text-gray-400 text-[10px] mt-1">Cowboys game this weekend</p>
        </div>
      </div>
    </div>
  );
}

function LiabilityAIScreenshot() {
  const debts = [
    { name: "Amex Platinum", balance: 12800, rate: 24.9, status: "high" },
    { name: "Capital One Venture", balance: 8200, rate: 22.4, status: "high" },
    { name: "SoFi Personal", balance: 8500, rate: 12.0, status: "medium" },
    { name: "Chase Auto Loan", balance: 18450, rate: 6.9, status: "good" },
  ];

  return (
    <div className="h-full grid grid-cols-12 gap-3">
      <div className="col-span-7 space-y-3">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">✦</span>
            <span className="text-blue-100 text-xs font-medium uppercase">AI Recommendation</span>
          </div>
          <h3 className="text-lg font-bold mb-2">Modified Avalanche Strategy</h3>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white/20 rounded-lg p-2 text-center">
              <p className="text-xl font-bold">$4,280</p>
              <p className="text-blue-100 text-[10px]">Interest Saved</p>
            </div>
            <div className="bg-white/20 rounded-lg p-2 text-center">
              <p className="text-xl font-bold">-8.2%</p>
              <p className="text-blue-100 text-[10px]">DTI Reduction</p>
            </div>
            <div className="bg-white/20 rounded-lg p-2 text-center">
              <p className="text-xl font-bold">18mo</p>
              <p className="text-blue-100 text-[10px]">Payoff Time</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <p className="text-gray-400 text-[10px] font-semibold uppercase mb-1">Before</p>
            <p className="text-gray-900 font-bold text-lg">$1,275/mo</p>
            <p className="text-red-500 text-xs">42.3% DTI</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
            <p className="text-green-600 text-[10px] font-semibold uppercase mb-1">After</p>
            <p className="text-gray-900 font-bold text-lg">$940/mo</p>
            <p className="text-green-600 text-xs">34.1% DTI</p>
          </div>
        </div>
      </div>
      <div className="col-span-5 bg-white rounded-xl p-3 border border-gray-200 shadow">
        <p className="text-gray-500 text-[10px] font-semibold uppercase mb-2">Payoff Order</p>
        <div className="space-y-2">
          {debts.map((debt, i) => (
            <div key={debt.name} className="flex items-center gap-2 p-1.5 rounded bg-gray-50">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white font-bold text-[10px] ${
                debt.status === 'high' ? 'bg-red-500' : debt.status === 'medium' ? 'bg-orange-500' : 'bg-gray-400'
              }`}>
                {i + 1}
              </div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium text-[10px]">{debt.name}</p>
              </div>
              <span className={`text-[10px] ${debt.status === 'high' ? 'text-red-500' : 'text-gray-400'}`}>{debt.rate}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PropertyAVMScreenshot() {
  return (
    <div className="h-full grid grid-cols-12 gap-3">
      <div className="col-span-7 space-y-3">
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-gray-500 text-xs">Estimated Value</p>
              <p className="text-3xl font-bold text-gray-900">$785,000</p>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                <span>94%</span>
                <span className="text-green-500">confidence</span>
              </div>
            </div>
          </div>
          <div className="h-24 bg-gradient-to-r from-emerald-100 to-emerald-50 rounded-lg flex items-end p-2">
            {[65, 72, 68, 75, 82, 78, 85, 88, 85, 90, 94].map((h, i) => (
              <div key={i} className="flex-1 mx-0.5">
                <div 
                  className="bg-emerald-500 rounded-t"
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-[10px] mt-2 text-center">12-month value trend</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <p className="text-gray-500 text-[10px]">Available Equity</p>
            <p className="text-emerald-600 font-bold text-lg">$358,000</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <p className="text-gray-500 text-[10px]">Current LTV</p>
            <p className="text-gray-900 font-bold text-lg">54.5%</p>
          </div>
        </div>
      </div>
      <div className="col-span-5 bg-white rounded-xl p-3 border border-gray-200 shadow">
        <p className="text-gray-500 text-[10px] font-semibold uppercase mb-2">Why This Value?</p>
        <div className="space-y-2">
          {[
            { icon: "🏠", label: "Recent Sales Support", detail: "3 comps within 0.5mi" },
            { icon: "📈", label: "Market Trending Up", detail: "+4.2% YoY" },
            { icon: "✨", label: "Property Features", detail: "Pool, updated kitchen" },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-2 p-2 rounded bg-gray-50">
              <span className="text-sm">{item.icon}</span>
              <div>
                <p className="text-gray-900 font-medium text-xs">{item.label}</p>
                <p className="text-gray-500 text-[10px]">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SalesCoachScreenshot() {
  return (
    <div className="h-full flex gap-3">
      {/* Main call interface */}
      <div className="flex-1 bg-[#1a1a2e] rounded-xl p-4 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-semibold">JR</span>
            </div>
            <div>
              <p className="font-semibold text-sm">James Rodriguez</p>
              <p className="text-white/50 text-xs">Call in progress • 4:32</p>
            </div>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Live
          </div>
        </div>
        
        {/* Transcript */}
        <div className="space-y-2 mb-4">
          <div className="flex gap-2">
            <span className="text-purple-400 text-xs font-medium">You:</span>
            <p className="text-white/70 text-xs">"Based on your equity, we have several options..."</p>
          </div>
          <div className="flex gap-2">
            <span className="text-blue-400 text-xs font-medium">James:</span>
            <p className="text-white/70 text-xs">"What about the interest rate on a cash-out?"</p>
          </div>
        </div>
      </div>
      
      {/* AI Coach sidebar */}
      <div className="w-64 space-y-3">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-3 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <span>✦</span>
            <span className="text-purple-100 text-xs font-medium">AI Coach</span>
          </div>
          <p className="text-sm font-medium mb-2">Suggested Response</p>
          <p className="text-purple-100 text-xs leading-relaxed">"Great question! With your credit profile, you'd qualify for 6.75% on a cash-out. That's $285/mo for $50K."</p>
        </div>
        
        <div className="bg-white rounded-xl p-3 border border-gray-200">
          <p className="text-gray-500 text-[10px] font-semibold uppercase mb-2">Opportunity Detected</p>
          <div className="flex items-center gap-2 p-2 rounded bg-amber-50 border border-amber-200">
            <span className="text-amber-500">💡</span>
            <div>
              <p className="text-gray-900 font-medium text-xs">Debt Consolidation</p>
              <p className="text-gray-500 text-[10px]">Save $335/mo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
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
