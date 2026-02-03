"use client";

import { motion } from "framer-motion";
import { Home, Lock, RefreshCw, Users, ChevronDown, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const MOTION_EASE = [0.25, 0.46, 0.45, 0.94];

const features = [
  {
    icon: Home,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    title: "Last Market Sale",
    description: "Property sale history with market data",
    preview: "$390,000 • May 3, 2023",
  },
  {
    icon: Lock,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
    title: "Open Liens",
    description: "Current liens with LTV calculation",
    preview: "$312,000 • 77% LTV",
  },
  {
    icon: RefreshCw,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10",
    title: "Transfers & Conveyances",
    description: "Current owner transaction history",
    preview: "Complete transaction records",
  },
  {
    icon: Users,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-500/10",
    title: "Ownership History",
    description: "Complete ownership chain for the property",
    preview: "5 previous owners tracked",
  },
];

export default function Feb2ReleasePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/20 via-black to-blue-950/20" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: MOTION_EASE }}
        >
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Main</span>
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: MOTION_EASE }}
        >
          {/* Logo */}
          <motion.div
            className="flex flex-col items-center mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: MOTION_EASE }}
          >
            <Image
              src="https://cdn.bfldr.com/Q445447Z/at/n85kkcjq5q8r3n6nf4z5jsw/LinkAI_BG_FullGradonBlk.svg?auto=webp&format=svg"
              alt="LinkAI"
              width={200}
              height={60}
              className="h-16 w-auto mb-4"
              unoptimized
            />
            
            {/* Version Badge with Glow */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5, ease: MOTION_EASE }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 -inset-x-4 rounded-full blur-xl"
                style={{ background: "linear-gradient(90deg, rgba(249,115,22,0.4), rgba(59,130,246,0.4))" }}
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="relative text-3xl font-light tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-blue-400">
                v1.5
              </span>
            </motion.div>
          </motion.div>

          {/* Release Notes Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: MOTION_EASE }}
          >
            <p className="text-white/40 text-sm font-medium uppercase tracking-widest mb-3">
              Release Notes
            </p>
            <p className="text-white/60 text-lg">
              Feb 2
            </p>
          </motion.div>
        </motion.div>

        {/* Feature Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: MOTION_EASE }}
        >
          {/* Section Header */}
          <div className="mb-10">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-400 text-sm font-medium uppercase tracking-wider">New Feature</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-semibold mb-4 tracking-tight">
              Property Intelligence
            </h2>
            <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
              Instant access to comprehensive property data directly within the loan officer workflow. 
              No more switching between systems or manual lookups.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="space-y-4">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + idx * 0.1, duration: 0.5, ease: MOTION_EASE }}
              >
                <div className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/[0.06] hover:border-white/15 transition-all duration-300">
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div className={`p-3 rounded-xl ${feature.iconBg}`}>
                        <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                      </div>
                      
                      {/* Content */}
                      <div>
                        <h3 className="text-white font-semibold text-lg mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-white/50 text-sm">
                          {feature.preview}
                        </p>
                      </div>
                    </div>
                    
                    {/* Chevron */}
                    <ChevronDown className="w-5 h-5 text-white/30 group-hover:text-white/50 transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7, ease: MOTION_EASE }}
        >
          <div className="bg-gradient-to-br from-white/[0.04] to-white/[0.02] border border-white/10 rounded-2xl p-10">
            <h3 className="text-2xl font-semibold mb-4">
              What This Means for Loan Officers
            </h3>
            <p className="text-white/60 max-w-2xl mx-auto leading-relaxed mb-8">
              Property intelligence is automatically surfaced during the loan process, 
              helping LOs have more informed conversations with borrowers and identify 
              opportunities faster than ever before.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
              <div>
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                  4
                </p>
                <p className="text-white/40 text-sm mt-1">Data Sources</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-blue-400">
                  0
                </p>
                <p className="text-white/40 text-sm mt-1">Manual Lookups</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  1
                </p>
                <p className="text-white/40 text-sm mt-1">Unified View</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <p className="text-white/30 text-sm">
            LinkAI v1.5 • Feb 2 Release
          </p>
        </motion.div>
      </div>
    </main>
  );
}
