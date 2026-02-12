"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

// Import exact same components from main page
import VerticalStages from '@/components/VerticalStages';
import FigureIntegration from '@/components/FigureIntegration';
import ProductRoadmap from '@/components/ProductRoadmap';
import Finale from '@/components/Finale';
import Image from 'next/image';

// Total duration in seconds (3:34 = 214 seconds)
const DURATION = 214;

export default function VideoPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalHeight, setTotalHeight] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  // Calculate total scrollable height on mount
  useEffect(() => {
    // Wait for content to render
    const timer = setTimeout(() => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setTotalHeight(height);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Timer that drives the scroll
  useEffect(() => {
    if (!isPlaying || totalHeight === 0) return;
    
    const interval = setInterval(() => {
      setCurrentTime(prev => {
        const next = prev + 0.1;
        if (next >= DURATION) {
          setIsPlaying(false);
          return DURATION;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, totalHeight]);

  // Update WINDOW scroll position based on time
  useEffect(() => {
    if (totalHeight === 0) return;
    
    const progress = currentTime / DURATION;
    const targetScroll = progress * totalHeight;
    
    // Scroll the window - this triggers Framer Motion's useScroll hooks
    window.scrollTo({
      top: targetScroll,
      behavior: 'auto' // Use 'auto' for immediate scroll, driven by our timer
    });
  }, [currentTime, totalHeight]);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle restart
  const handleRestart = () => {
    setCurrentTime(0);
    setIsPlaying(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  // Handle play - mark as started
  const handlePlay = () => {
    setHasStarted(true);
    setIsPlaying(true);
  };

  // Handle timeline click
  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    setCurrentTime(percentage * DURATION);
  };

  return (
    <div className="relative bg-black">
      {/* Intro overlay - shows before started */}
      {!hasStarted && (
        <motion.div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative mb-8"
          >
            <div className="absolute inset-0 blur-3xl bg-orange-500/30 scale-150" />
            <Image
              src="https://cdn.bfldr.com/Q445447Z/at/n85kkcjq5q8r3n6nf4z5jsw/LinkAI_BG_FullGradonBlk.svg"
              alt="LinkAI"
              width={350}
              height={105}
              className="relative z-10"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <p className="text-white/60 text-xl mb-8">The Platform That Thinks Ahead</p>
            
            <button
              onClick={handlePlay}
              className="px-12 py-5 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold text-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all flex items-center gap-4 mx-auto"
            >
              <Play className="w-7 h-7" fill="currentColor" />
              Play Video
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-12 text-white/40 text-sm"
          >
            Duration: 3:34
          </motion.p>
        </motion.div>
      )}

      {/* Main content - SCROLLED BY WINDOW */}
      <div>
        {/* Hero/Intro Section */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.15)_0%,transparent_70%)]" />
          
          <motion.div 
            className="text-center z-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative mb-8">
              <motion.div
                className="absolute inset-0 blur-3xl bg-orange-500/40 scale-150"
                animate={{ 
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1.4, 1.6, 1.4]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <Image
                src="https://cdn.bfldr.com/Q445447Z/at/n85kkcjq5q8r3n6nf4z5jsw/LinkAI_BG_FullGradonBlk.svg"
                alt="LinkAI"
                width={450}
                height={135}
                className="relative z-10"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 mb-8"
            >
              <span className="text-orange-400 text-2xl font-light">2.0</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              The Platform<br />
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                That Thinks Ahead
              </span>
            </motion.h1>
          </motion.div>
        </section>

        {/* Main page content - EXACT same components */}
        <VerticalStages />
        
        {/* Additional sections from main page */}
        <FigureIntegration />
        <ProductRoadmap />
        
        {/* Last Mile + Beta Section */}
        <LastMileBetaSection />
        
        {/* Finale */}
        <Finale />
      </div>

      {/* Controls overlay - only show after started */}
      {hasStarted && (
        <motion.div 
          className="absolute bottom-0 left-0 right-0 z-50"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Gradient background */}
          <div className="bg-gradient-to-t from-black via-black/80 to-transparent pt-20 pb-6 px-8">
            {/* Timeline */}
            <div 
              className="relative h-2 bg-white/10 rounded-full cursor-pointer mb-6 group"
              onClick={handleTimelineClick}
            >
              {/* Progress fill */}
              <motion.div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
                style={{ width: `${(currentTime / DURATION) * 100}%` }}
              />
              
              {/* Scrubber handle */}
              <motion.div 
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ left: `${(currentTime / DURATION) * 100}%` }}
              />
            </div>

            {/* Controls row */}
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={handleRestart}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white/70 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold text-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all flex items-center gap-3"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-6 h-6" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-6 h-6" fill="currentColor" />
                    Play
                  </>
                )}
              </button>

              <div className="px-4 py-2 rounded-xl bg-white/10 text-white/60 font-mono text-sm min-w-[100px] text-center">
                {formatTime(currentTime)} / 3:34
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Hide scrollbar CSS */}
      <style jsx global>{`
        body::-webkit-scrollbar {
          display: none;
        }
        body {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

// Last Mile + Beta Section Component
function LastMileBetaSection() {
  return (
    <section className="relative min-h-screen py-24 overflow-hidden bg-black">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Image
            src="https://cdn.bfldr.com/Q445447Z/at/n85kkcjq5q8r3n6nf4z5jsw/LinkAI_BG_FullGradonBlk.svg"
            alt="LinkAI"
            width={150}
            height={45}
          />
          <div className="h-10 w-px bg-white/20" />
          <p className="text-2xl text-white/60 font-light">
            The Platform That <span className="text-orange-400">Thinks Ahead</span>
          </p>
        </motion.div>

        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-xl text-orange-400 font-medium mb-4">What Makes LinkAI Unique</p>
          <h2 className="text-6xl font-bold text-white mb-4">
            The Intelligent{' '}
            <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              Last Mile
            </span>
          </h2>
        </motion.div>

        {/* LLMs + Our Data */}
        <motion.div
          className="flex items-center justify-center gap-12 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {/* LLMs */}
          <div className="flex-1 max-w-md text-center">
            <div className="p-8 border border-white/10 rounded-2xl bg-white/5">
              <p className="text-xl text-white/50 mb-4">Core AI Capabilities</p>
              <div className="flex justify-center gap-4 mb-4">
                <span className="px-4 py-2 rounded-lg bg-white/10 text-white/70">Claude</span>
                <span className="px-4 py-2 rounded-lg bg-white/10 text-white/70">OpenAI</span>
              </div>
              <p className="text-white/40 text-sm">Foundation models</p>
            </div>
          </div>

          <div className="text-5xl text-orange-500 font-light">+</div>

          {/* Our Data */}
          <div className="flex-1 max-w-md">
            <div className="p-8 border border-orange-500/30 rounded-2xl bg-gradient-to-br from-orange-500/10 to-orange-500/5">
              <p className="text-xl text-orange-400 mb-6 text-center">Our Critical Last Mile</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Loan History",
                  "Payment Patterns", 
                  "Credit Profiles",
                  "Past Interactions"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                    <div className="w-2 h-2 rounded-full bg-orange-400" />
                    <span className="text-white/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Version Status */}
        <motion.div
          className="flex items-center justify-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          {/* Q1 General Launch - LIVE */}
          <div className="flex items-center gap-4 px-8 py-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-400 font-semibold text-lg">LIVE</span>
            </div>
            <div className="h-8 w-px bg-emerald-500/30" />
            <div className="text-left">
              <p className="text-white font-bold text-lg">Q1 General Launch</p>
              <p className="text-white/50">All Loan Officers</p>
            </div>
          </div>

          <div className="text-3xl text-white/30">→</div>

          {/* LinkAI 2.0 - BETA */}
          <div className="flex items-center gap-4 px-8 py-5 rounded-2xl bg-orange-500/10 border border-orange-500/30">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-orange-400 font-semibold text-lg">BETA</span>
            </div>
            <div className="h-8 w-px bg-orange-500/30" />
            <div className="text-left">
              <p className="text-white font-bold text-lg">LinkAI 2.0</p>
              <p className="text-white/50">15 Loan Officers</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
