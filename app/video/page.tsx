"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import { 
  ArrowRight, 
  Database, 
  TrendingUp, 
  Shield, 
  Users,
  Sparkles,
  Calculator,
  Home,
  MessageSquare,
  CheckCircle2,
  Zap,
  Target,
  BarChart3,
  FileText,
  CreditCard
} from 'lucide-react';

// Import actual feature cards from main page
import BriefAICard from '@/components/features/BriefAICard';
import LiabilityAICard from '@/components/features/LiabilityAICard';
import PropertyCard from '@/components/features/PropertyCard';
import Agent2Stage from '@/components/stages/Agent2Stage';

// Timing configuration (in seconds) - Total: 214s (3:34)
// FOCUS: 4 AI features are the main attraction
const TIMINGS = {
  hero: { start: 0, end: 8 },            // 8s - Quick intro
  context: { start: 8, end: 15 },        // 7s - Brief context (reduced)
  demo: { start: 15, end: 25 },          // 10s - Quick demo (reduced)
  features: { start: 25, end: 165 },     // 140s - Main focus: 4 AI features (~35s each)
  lastMile: { start: 165, end: 185 },    // 20s - Last Mile differentiator
  beta: { start: 185, end: 195 },        // 10s - Beta status (reduced)
  closing: { start: 195, end: 214 },     // 19s - Roadmap + Close
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
    <div className="relative w-screen h-screen bg-[#030308] overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(ellipse at 20% 30%, rgba(249,115,22,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(59,130,246,0.06) 0%, transparent 50%)',
              'radial-gradient(ellipse at 30% 70%, rgba(168,85,247,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(249,115,22,0.06) 0%, transparent 50%)',
              'radial-gradient(ellipse at 20% 30%, rgba(249,115,22,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(59,130,246,0.06) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Dynamic section-based glow */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: section === 'hero' || section === 'closing'
            ? 'radial-gradient(circle at 50% 50%, rgba(249,115,22,0.12) 0%, transparent 60%)'
            : section === 'features'
            ? 'radial-gradient(circle at 60% 50%, rgba(249,115,22,0.1) 0%, transparent 50%)'
            : section === 'lastMile'
            ? 'radial-gradient(circle at 50% 50%, rgba(249,115,22,0.15) 0%, transparent 60%)'
            : 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 60%)'
        }}
        transition={{ duration: 1.5 }}
      />

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

      {/* Controls Panel - highest z-index to stay on top */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent pt-16 pb-6 px-8 z-[100]">
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
          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white/60 rounded-lg transition-colors text-sm z-[100]"
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

// Typewriter Text Component
function TypewriterText({ text, delay = 0, speed = 0.03 }: { text: string; delay?: number; speed?: number }) {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIndex = 0;
    
    const startTyping = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
        timeout = setTimeout(startTyping, speed * 1000);
      }
    };
    
    const delayTimeout = setTimeout(startTyping, delay * 1000);
    
    return () => {
      clearTimeout(timeout);
      clearTimeout(delayTimeout);
    };
  }, [text, delay, speed]);
  
  return (
    <span>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-0.5 h-[1em] bg-current ml-0.5 align-middle"
      />
    </span>
  );
}

// Animated Counter Component
function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = value;
    const incrementTime = (duration * 1000) / end;
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [value, duration]);
  
  return <span>{count}</span>;
}

// ============ SLIDE COMPONENTS ============

function HeroSlide({ progress }: { progress: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 flex flex-col items-center justify-center"
    >
      {/* Converging particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(249,115,22,0.8) 0%, transparent 70%)`,
              left: `${50 + (Math.random() - 0.5) * 80}%`,
              top: `${50 + (Math.random() - 0.5) * 80}%`,
            }}
            initial={{ 
              x: (Math.random() - 0.5) * 500, 
              y: (Math.random() - 0.5) * 500, 
              opacity: 0,
              scale: 0
            }}
            animate={{ 
              x: 0, 
              y: 0, 
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 2,
              delay: i * 0.1,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Logo with dramatic reveal */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0, filter: "blur(20px)" }}
        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        {/* Pulsing glow */}
        <motion.div 
          className="absolute inset-0 blur-3xl bg-orange-500/40 scale-150"
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: [1.4, 1.6, 1.4]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <Image
          src="https://cdn.bfldr.com/Q445447Z/at/n85kkcjq5q8r3n6nf4z5jsw/LinkAI_BG_FullGradonBlk.svg?auto=webp&format=svg"
          alt="LinkAI"
          width={450}
          height={135}
          className="relative z-10"
        />
      </motion.div>

      {/* Version badge with shine effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
        className="mt-10 relative overflow-hidden"
      >
        <span className="relative px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-400/10 border border-orange-500/40 text-orange-400 text-3xl font-light tracking-wider inline-block">
          2.0
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
            animate={{ x: ["-200%", "200%"] }}
            transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatDelay: 3 }}
          />
        </span>
      </motion.div>

      {/* Tagline with typewriter effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-12 text-3xl text-white/70 font-light tracking-wide"
      >
        {progress > 0.2 ? (
          <TypewriterText text="The Platform That Thinks Ahead" delay={0} speed={0.04} />
        ) : (
          <span className="opacity-0">The Platform That Thinks Ahead</span>
        )}
      </motion.div>

      {/* Presenter info with fade up */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ 
          opacity: progress > 0.5 ? 1 : 0, 
          y: progress > 0.5 ? 0 : 30 
        }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-20 text-center"
      >
        <motion.p 
          className="text-xl text-white/90 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: progress > 0.5 ? 1 : 0 }}
          transition={{ delay: 0.2 }}
        >
          Steve Hulme
        </motion.p>
        <motion.p 
          className="text-lg text-white/50 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: progress > 0.6 ? 1 : 0 }}
          transition={{ delay: 0.4 }}
        >
          Operations Executive, Mortgage Tech
        </motion.p>
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
  // 4 AI Assistants, each gets ~35 seconds (25% of 140s)
  // Each feature card needs progress 0-1 to show all phases
  const currentFeature = Math.min(3, Math.floor(progress * 4));
  const featureProgress = (progress * 4) % 1;
  
  // Create motion values for each feature card - these drive the internal animations
  const briefProgress = useMotionValue(0);
  const liabilityProgress = useMotionValue(0);
  const propertyProgress = useMotionValue(0);
  const salesProgress = useMotionValue(0);
  
  // Update the progress values - animate through 0-1 for each card to show all phases
  useEffect(() => {
    // Reset non-active cards
    if (currentFeature !== 0) briefProgress.set(currentFeature > 0 ? 1 : 0);
    if (currentFeature !== 1) liabilityProgress.set(currentFeature > 1 ? 1 : 0);
    if (currentFeature !== 2) propertyProgress.set(currentFeature > 2 ? 1 : 0);
    if (currentFeature !== 3) salesProgress.set(0);
    
    // Animate the active card through its full range (0-1)
    if (currentFeature === 0) {
      briefProgress.set(featureProgress);
    } else if (currentFeature === 1) {
      liabilityProgress.set(featureProgress);
    } else if (currentFeature === 2) {
      propertyProgress.set(featureProgress);
    } else if (currentFeature === 3) {
      salesProgress.set(featureProgress);
    }
  }, [currentFeature, featureProgress, briefProgress, liabilityProgress, propertyProgress, salesProgress]);

  const features = [
    {
      name: "Brief AI",
      subtitle: "Know Your Borrower",
      tagline: "Pre-call intelligence assembled in seconds",
      color: "#f97316",
      icon: Sparkles,
      stats: [
        { label: "Credit", value: "742" },
        { label: "Equity", value: "$127K" },
        { label: "DTI", value: "38%" },
      ]
    },
    {
      name: "Liability AI",
      subtitle: "Optimize DTI",
      tagline: "Instant payoff strategy that saves thousands",
      color: "#3b82f6",
      icon: Calculator,
      stats: [
        { label: "Saved", value: "$4,280" },
        { label: "DTI", value: "-8.2%" },
        { label: "Payoff", value: "18mo" },
      ]
    },
    {
      name: "Property AVM",
      subtitle: "Confident Pricing",
      tagline: "Real-time valuations with confidence scores",
      color: "#f59e0b",
      icon: Home,
      stats: [
        { label: "Value", value: "$785K" },
        { label: "Equity", value: "$358K" },
        { label: "Confidence", value: "94%" },
      ]
    },
    {
      name: "Sales Coach",
      subtitle: "Handle Objections",
      tagline: "Real-time guidance throughout every call",
      color: "#a855f7",
      icon: MessageSquare,
      stats: [
        { label: "Live", value: "Coaching" },
        { label: "Objections", value: "Handled" },
        { label: "Conversions", value: "2x" },
      ]
    }
  ];

  const feature = features[currentFeature];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 overflow-hidden"
    >
      {/* Top Journey Line - Progress through all 4 features */}
      <div className="absolute top-6 left-0 right-0 px-12 z-40">
        <div className="relative flex items-center justify-between max-w-3xl mx-auto">
          {/* Background track */}
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-white/10 -translate-y-1/2" />
          
          {/* Animated progress line */}
          <motion.div 
            className="absolute left-0 top-1/2 h-1 rounded-full -translate-y-1/2"
            style={{ backgroundColor: feature.color }}
            animate={{ 
              width: `${((currentFeature + featureProgress) / 4) * 100}%`,
              boxShadow: `0 0 20px ${feature.color}80`
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Feature nodes */}
          {features.map((f, i) => {
            const isComplete = i < currentFeature;
            const isCurrent = i === currentFeature;
            const Icon = f.icon;
            return (
              <motion.div 
                key={i}
                className="relative z-10 flex flex-col items-center"
                animate={{ scale: isCurrent ? 1.15 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isComplete || isCurrent ? '' : 'bg-black/50'
                  }`}
                  style={{
                    backgroundColor: isComplete || isCurrent ? `${f.color}30` : undefined,
                    border: `2px solid ${isComplete || isCurrent ? f.color : 'rgba(255,255,255,0.2)'}`,
                    backdropFilter: 'blur(10px)'
                  }}
                  animate={{
                    boxShadow: isCurrent ? `0 0 30px ${f.color}60` : 'none'
                  }}
                >
                  {isComplete ? (
                    <CheckCircle2 className="w-4 h-4" style={{ color: f.color }} />
                  ) : (
                    <Icon className="w-4 h-4" style={{ color: isComplete || isCurrent ? f.color : 'rgba(255,255,255,0.4)' }} />
                  )}
                </motion.div>
                <motion.p 
                  className="text-[10px] mt-1.5 font-medium whitespace-nowrap"
                  style={{ color: isComplete || isCurrent ? f.color : 'rgba(255,255,255,0.4)' }}
                >
                  {f.name}
                </motion.p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Full-screen Feature Card - Shows the complete animation sequence */}
      <AnimatePresence mode="wait">
        {currentFeature === 0 && (
          <motion.div 
            key="brief"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <BriefAICard progress={briefProgress} />
          </motion.div>
        )}
        {currentFeature === 1 && (
          <motion.div 
            key="liability"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <LiabilityAICard progress={liabilityProgress} />
          </motion.div>
        )}
        {currentFeature === 2 && (
          <motion.div 
            key="property"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <PropertyCard progress={propertyProgress} />
          </motion.div>
        )}
        {currentFeature === 3 && (
          <motion.div 
            key="sales"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center bg-black"
          >
            {/* Sales Coach needs special treatment - it's a different format */}
            <div className="w-full h-full max-w-5xl mx-auto flex items-center justify-center">
              <Agent2Stage />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-40">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/10">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{ 
                width: i === currentFeature ? '32px' : '8px',
                backgroundColor: i === currentFeature ? f.color : i < currentFeature ? `${f.color}60` : 'rgba(255,255,255,0.2)'
              }}
            />
          ))}
        </div>
      </div>
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
      {/* Header: The Platform That Thinks Ahead */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-12 left-1/2 -translate-x-1/2"
      >
        <div className="flex items-center gap-4">
          <Image
            src="https://cdn.bfldr.com/Q445447Z/at/n85kkcjq5q8r3n6nf4z5jsw/LinkAI_BG_FullGradonBlk.svg?auto=webp&format=svg"
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <p className="text-xl text-orange-400 font-medium mb-4">What Makes LinkAI Unique</p>
        <h2 className="text-5xl font-bold text-white mb-4">
          The Intelligent{' '}
          <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
            Last Mile
          </span>
        </h2>
      </motion.div>

      <div className="flex items-center gap-12 max-w-5xl">
        {/* Left: LLMs */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex-1 text-center"
        >
          <div className="p-6 border border-white/10 rounded-2xl bg-white/5">
            <p className="text-lg text-white/50 mb-4">Core AI Capabilities</p>
            <div className="flex justify-center gap-3 mb-3">
              <span className="px-3 py-1.5 rounded-lg bg-white/10 text-white/70 text-sm">Claude</span>
              <span className="px-3 py-1.5 rounded-lg bg-white/10 text-white/70 text-sm">OpenAI</span>
            </div>
            <p className="text-white/40 text-xs">Foundation models</p>
          </div>
        </motion.div>

        {/* Plus sign */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="text-4xl text-orange-500 font-light"
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
          <div className="p-6 border border-orange-500/30 rounded-2xl bg-gradient-to-br from-orange-500/10 to-orange-500/5">
            <p className="text-lg text-orange-400 mb-4 text-center">Our Critical Last Mile</p>
            <div className="grid grid-cols-2 gap-3">
              {dataPoints.map((point, index) => (
                <motion.div
                  key={point.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: progress > 0.3 + index * 0.1 ? 1 : 0, y: progress > 0.3 + index * 0.1 ? 0 : 10 }}
                  className="flex items-center gap-2 p-2 rounded-lg bg-white/5"
                >
                  <point.icon className="w-4 h-4 text-orange-400" />
                  <span className="text-white/80 text-sm">{point.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom insight */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: progress > 0.5 ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="mt-8 text-lg text-white/50 text-center max-w-3xl"
      >
        LinkAI anticipates needs, surfaces opportunities the loan officer might not consider,
        <br />and personalizes solutions based on what <span className="text-orange-400">only we know</span> about each borrower.
      </motion.p>

      {/* Footer: Version Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: progress > 0.7 ? 1 : 0, y: progress > 0.7 ? 0 : 20 }}
        transition={{ duration: 0.6 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2"
      >
        <div className="flex items-center gap-8">
          {/* Previous Version - Live */}
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-400 text-sm font-medium">LIVE</span>
            </div>
            <div className="h-4 w-px bg-emerald-500/30" />
            <div className="text-left">
              <p className="text-white font-medium">LinkAI 1.0</p>
              <p className="text-white/50 text-xs">Production</p>
            </div>
          </div>

          <ArrowRight className="w-6 h-6 text-white/30" />

          {/* New Version - Beta */}
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-orange-500/10 border border-orange-500/30">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-orange-400 text-sm font-medium">BETA</span>
            </div>
            <div className="h-4 w-px bg-orange-500/30" />
            <div className="text-left">
              <p className="text-white font-medium">LinkAI 2.0</p>
              <p className="text-white/50 text-xs">15 Loan Officers</p>
            </div>
          </div>
        </div>
      </motion.div>
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
    { 
      title: "Expanded Soft Credit", 
      description: "Pre-qualification without hard pulls",
      icon: CreditCard,
      color: "#22c55e"
    },
    { 
      title: "Product Integrations", 
      description: "Figure, Encompass, and more",
      icon: Zap,
      color: "#3b82f6"
    },
    { 
      title: "Complex Loan Rules", 
      description: "Advanced scenario modeling",
      icon: Target,
      color: "#f59e0b"
    },
  ];

  // Phase breakdown:
  // 0-60%: Roadmap showcase
  // 60-100%: Final logo + tagline
  const showFinal = progress > 0.6;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 flex flex-col items-center justify-center px-16"
    >
      <AnimatePresence mode="wait">
        {!showFinal ? (
          // Roadmap Phase - More impactful design
          <motion.div
            key="roadmap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -30 }}
            className="w-full max-w-5xl"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 mb-6">
                <BarChart3 className="w-4 h-4 text-orange-400" />
                <span className="text-orange-400 text-sm font-medium">What's Next</span>
              </div>
              <h2 className="text-5xl font-bold text-white mb-4">
                2026 Roadmap
              </h2>
              <p className="text-xl text-white/50">
                Continued innovation in the intelligent last mile
              </p>
            </motion.div>

            {/* Roadmap Cards with Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <motion.div
                className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2"
                style={{
                  background: 'linear-gradient(to bottom, rgba(249,115,22,0.5), rgba(249,115,22,0.1))'
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1 }}
              />

              <div className="space-y-8">
                {roadmapItems.map((item, index) => {
                  const isLeft = index % 2 === 0;
                  const ItemIcon = item.icon;
                  const itemProgress = Math.min(1, (progress * 3) - index * 0.3);
                  
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                      animate={{ 
                        opacity: itemProgress > 0 ? 1 : 0, 
                        x: itemProgress > 0 ? 0 : (isLeft ? -50 : 50)
                      }}
                      transition={{ delay: index * 0.15, duration: 0.5 }}
                      className={`flex items-center gap-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                    >
                      {/* Card */}
                      <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
                        <motion.div
                          className="inline-block p-6 rounded-2xl border backdrop-blur-sm"
                          style={{
                            backgroundColor: `${item.color}10`,
                            borderColor: `${item.color}30`,
                            boxShadow: `0 0 40px ${item.color}15`
                          }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className={`flex items-center gap-3 mb-2 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center"
                              style={{ backgroundColor: `${item.color}20` }}
                            >
                              <ItemIcon className="w-5 h-5" style={{ color: item.color }} />
                            </div>
                            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                          </div>
                          <p className="text-white/60">{item.description}</p>
                        </motion.div>
                      </div>

                      {/* Timeline dot */}
                      <motion.div
                        className="relative z-10"
                        initial={{ scale: 0 }}
                        animate={{ scale: itemProgress > 0 ? 1 : 0 }}
                        transition={{ delay: index * 0.15 + 0.2 }}
                      >
                        <div
                          className="w-6 h-6 rounded-full border-4 border-black"
                          style={{ backgroundColor: item.color }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: item.color }}
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>

                      {/* Spacer for alignment */}
                      <div className="flex-1" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          // Final Phase - Logo + Closing
          <motion.div
            key="final"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            {/* Glowing logo */}
            <motion.div
              className="relative mb-10"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
            >
              <motion.div
                className="absolute inset-0 blur-3xl bg-orange-500/30 scale-150"
                animate={{ 
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1.4, 1.6, 1.4]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <Image
                src="https://cdn.bfldr.com/Q445447Z/at/n85kkcjq5q8r3n6nf4z5jsw/LinkAI_BG_FullGradonBlk.svg?auto=webp&format=svg"
                alt="LinkAI"
                width={350}
                height={105}
                className="relative z-10"
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl text-white/70 font-light mb-8"
            >
              Leading the industry revolution
            </motion.p>

            {/* Key differentiator */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-400/10 border border-orange-500/30"
            >
              <Sparkles className="w-5 h-5 text-orange-400" />
              <span className="text-xl text-white">
                Through the{' '}
                <span className="text-orange-400 font-semibold">intelligent last mile</span>
              </span>
            </motion.div>

            {/* Thank you */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 text-lg text-white/40"
            >
              Thank you for watching
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
