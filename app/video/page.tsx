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
  hero: { start: 0, end: 25 },           // 25s - Intro
  context: { start: 25, end: 45 },       // 20s - Industry context
  demo: { start: 45, end: 70 },          // 25s - Demo comparison
  features: { start: 70, end: 130 },     // 60s - Features showcase (increased)
  lastMile: { start: 130, end: 170 },    // 40s - Last Mile differentiator
  beta: { start: 170, end: 195 },        // 25s - Beta announcement
  closing: { start: 195, end: 214 },     // 19s - Roadmap + Close (reduced)
};

export default function VideoPage() {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-start after a brief delay
  useEffect(() => {
    const startDelay = setTimeout(() => {
      setIsPlaying(true);
    }, 1000);
    return () => clearTimeout(startDelay);
  }, []);

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

      {/* Progress bar (can be hidden for recording) */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <motion.div 
          className="h-full bg-gradient-to-r from-orange-500 to-orange-400"
          style={{ width: `${(currentTime / 214) * 100}%` }}
        />
      </div>

      {/* Time display (for reference - can hide for recording) */}
      <div className="absolute bottom-4 right-4 text-white/30 font-mono text-sm">
        {formatTime(currentTime)} / 3:34
      </div>

      {/* Play/Pause control (for testing) */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute bottom-4 left-4 text-white/30 hover:text-white/60 transition-colors text-sm"
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
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
  const features = [
    {
      icon: MessageSquare,
      title: "Real-time AI Analysis",
      description: "Conduct conversations with AI analyzing the borrower's unique needs and circumstances",
      color: "from-blue-500 to-blue-400"
    },
    {
      icon: Calculator,
      title: "Instant Scenario Comparisons",
      description: "Generate debt consolidation, cash-out, rate buydowns, and payment structures instantly",
      color: "from-emerald-500 to-emerald-400"
    },
    {
      icon: Lightbulb,
      title: "Contextual Guidance",
      description: "AI constantly suggests next-best questions and highlights optimal solutions",
      color: "from-amber-500 to-amber-400"
    },
    {
      icon: FileCheck,
      title: "First-Call Conversions",
      description: "Create custom scenarios borrowers can agree to move forward with on that very first call",
      color: "from-purple-500 to-purple-400"
    }
  ];

  // Stagger the features based on progress (60 seconds total)
  const getFeatureVisibility = (index: number) => {
    const featureStart = index * 0.2; // Each feature starts at 0%, 20%, 40%, 60%
    const featureEnd = featureStart + 0.3; // Each visible for 30% of the time
    return progress >= featureStart;
  };

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
        className="text-center mb-16"
      >
        <p className="text-2xl text-orange-400 font-medium mb-4">Today</p>
        <h2 className="text-5xl font-bold text-white">
          A Fully Integrated Workspace
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 gap-8 max-w-5xl">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ 
              opacity: getFeatureVisibility(index) ? 1 : 0,
              y: getFeatureVisibility(index) ? 0 : 30,
              scale: getFeatureVisibility(index) ? 1 : 0.95
            }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-2xl" />
            <div className="relative p-8 border border-white/10 rounded-2xl backdrop-blur-sm">
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-lg text-white/60 leading-relaxed">{feature.description}</p>
            </div>
          </motion.div>
        ))}
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
