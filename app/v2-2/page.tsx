"use client";

import { ArrowLeft, Printer, Copy, Check, Layout, Sparkles, FileText, Bot, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

// Navigation items for the New UI section
const navItems = [
  { icon: "🏠", label: "Dashboard", active: false },
  { icon: "📊", label: "Pricing", active: false },
  { icon: "🔄", label: "Scenarios", active: true, isNew: true },
  { icon: "📝", label: "Application", active: false, isNew: true },
  { icon: "👤", label: "Borrower", active: false },
  { icon: "🏦", label: "Property", active: false },
  { icon: "✨", label: "AI Assistants", active: false, isNew: true },
  { icon: "📋", label: "Documents", active: false },
  { icon: "⚙️", label: "Settings", active: false },
];

// Feature sections for V2.2
const features = [
  {
    id: "new-ui",
    icon: Layout,
    title: "New UI for Link",
    color: "cyan",
    summary: "Redesigned interface with powerful left-hand navigation for streamlined workflow",
    details: [
      "New persistent left sidebar — Quick access to all loan sections",
      "Visual tab organization — Pricing, Scenarios, Application, Borrower, Property, AI, Documents",
      "Active state indicators — Always know where you are",
      "Collapsible navigation — Maximize screen real estate",
    ],
    hasNavMockup: true,
  },
  {
    id: "scenarios",
    icon: Sparkles,
    title: "Scenarios Tab",
    color: "purple",
    summary: "Compare multiple loan scenarios side-by-side",
    details: [
      "Create and compare up to 4 scenarios simultaneously",
      "Real-time rate and payment calculations",
      "Easy scenario duplication and modification",
      "Export comparison reports for clients",
    ],
  },
  {
    id: "application",
    icon: FileText,
    title: "Application (Short 1003)",
    color: "orange",
    summary: "Streamlined application with intelligent form completion",
    details: [
      "Simplified Short 1003 with auto-fill",
      "Smart validation and error prevention",
      "Progress tracking and save/resume",
      "Direct LOS integration",
    ],
  },
  {
    id: "ai-assistants",
    icon: Bot,
    title: "AI Assistants",
    color: "emerald",
    summary: "Intelligent assistants for rapport, coaching, and valuations",
    details: [
      "AI Rapport Builder — Personalized conversation starters",
      "Sales Coach — Objection handling and rate negotiation",
      "Valuation AI — Instant property valuations",
      "Contextual suggestions throughout the process",
    ],
  },
];

// Dark mode color mappings with vibrant accents
const colorMap: { [key: string]: { accent: string; glow: string; text: string; bg: string } } = {
  cyan: { accent: "bg-cyan-400", glow: "shadow-cyan-500/30", text: "text-cyan-400", bg: "bg-cyan-500/10" },
  purple: { accent: "bg-purple-400", glow: "shadow-purple-500/30", text: "text-purple-400", bg: "bg-purple-500/10" },
  orange: { accent: "bg-orange-400", glow: "shadow-orange-500/30", text: "text-orange-400", bg: "bg-orange-500/10" },
  emerald: { accent: "bg-emerald-400", glow: "shadow-emerald-500/30", text: "text-emerald-400", bg: "bg-emerald-500/10" },
};

// Plain text version for email
const emailContentPlain = `Subject: LinkAI V2.2 Release Notes // February 25th, 2026

Effective February 25th, 2026, LinkAI V2.2 is released to production.

Release Notes:

This major platform update includes:

• New UI for Link — Redesigned interface with new left-hand navigation
• Scenarios Tab — Compare multiple loan scenarios side-by-side
• Application (Short 1003) — Streamlined application with intelligent form completion
• AI Assistants — Intelligent assistants for rapport, coaching, and valuations

Questions? Use the Feedback button in LinkAI.
`;

// Rich HTML version for email
const emailContentHtml = `
<div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
  <p>Effective February 25th, 2026, <strong>LinkAI V2.2</strong> is released to production.</p>
  <h3 style="margin-top: 20px; margin-bottom: 10px;">Release Notes:</h3>
  <ul style="margin: 16px 0; padding-left: 20px;">
    <li style="margin-bottom: 12px;"><strong>New UI for Link</strong> — Redesigned interface with new left-hand navigation</li>
    <li style="margin-bottom: 12px;"><strong>Scenarios Tab</strong> — Compare multiple loan scenarios side-by-side</li>
    <li style="margin-bottom: 12px;"><strong>Application (Short 1003)</strong> — Streamlined application with intelligent form completion</li>
    <li style="margin-bottom: 12px;"><strong>AI Assistants</strong> — Intelligent assistants for rapport, coaching, and valuations</li>
  </ul>
  <p style="color: #666; margin-top: 20px;">Questions? Use the Feedback button in LinkAI.</p>
</div>
`;

// Navigation Mockup Component - Dark themed
function NavigationMockup() {
  return (
    <div className="w-full max-w-xs bg-slate-900 rounded-2xl shadow-2xl shadow-cyan-500/20 border border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-teal-600 p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur">
            <span className="text-white text-sm font-bold">L</span>
          </div>
          <span className="text-white font-bold tracking-tight">LinkAI</span>
        </div>
      </div>
      
      {/* Navigation Items */}
      <div className="p-2 space-y-0.5">
        {navItems.map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + idx * 0.04 }}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all ${
              item.active 
                ? 'bg-cyan-500/20 text-cyan-300 font-medium border border-cyan-500/30' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className="text-base">{item.icon}</span>
            <span className="text-sm flex-1">{item.label}</span>
            {item.isNew && (
              <span className="px-1.5 py-0.5 bg-orange-500 text-white text-[9px] font-bold rounded uppercase">
                New
              </span>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Bottom */}
      <div className="border-t border-slate-700 p-3">
        <div className="flex items-center gap-3 px-2 text-slate-500">
          <div className="w-7 h-7 bg-slate-700 rounded-full flex items-center justify-center text-xs">
            👤
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-slate-300">Loan Officer</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const colors = colorMap[feature.color];
  const Icon = feature.icon;
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      className={`rounded-2xl bg-slate-900/80 border border-slate-700 overflow-hidden shadow-xl ${colors.glow} hover:shadow-2xl transition-all duration-300`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.1 }}
    >
      <div className={`flex flex-col lg:flex-row ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
        {/* Text Content */}
        <div className="flex-1 p-8">
          <div className="flex items-center gap-4 mb-5">
            <div className={`w-12 h-12 rounded-xl ${colors.bg} border border-slate-600 flex items-center justify-center`}>
              <Icon className={`w-6 h-6 ${colors.text}`} />
            </div>
            <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
          </div>
          
          <p className="text-slate-300 text-lg mb-6">{feature.summary}</p>
          
          <ul className="space-y-3">
            {feature.details.map((detail, idx) => (
              <li key={idx} className="flex gap-3 items-start">
                <div className={`w-1.5 h-1.5 rounded-full ${colors.accent} mt-2.5 flex-shrink-0`} />
                <span className="text-slate-400">{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Visual Area */}
        <div className="flex-1 p-6 lg:p-8 flex items-center justify-center bg-slate-950/50">
          {feature.hasNavMockup ? (
            <NavigationMockup />
          ) : (
            <div className={`w-full h-56 lg:h-64 rounded-xl ${colors.bg} border border-slate-700 flex items-center justify-center`}>
              <div className="text-center">
                <div className={`w-14 h-14 rounded-xl ${colors.accent} mx-auto mb-4 flex items-center justify-center shadow-lg ${colors.glow}`}>
                  <Icon className="w-7 h-7 text-slate-900" />
                </div>
                <p className={`${colors.text} font-semibold`}>Preview</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function V22ReleasePage() {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = async () => {
    try {
      const htmlBlob = new Blob([emailContentHtml], { type: 'text/html' });
      const textBlob = new Blob([emailContentPlain], { type: 'text/plain' });
      
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': htmlBlob,
          'text/plain': textBlob,
        }),
      ]);
    } catch {
      await navigator.clipboard.writeText(emailContentPlain);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            background: white !important;
          }
          .no-print { display: none !important; }
          @page { margin: 0.5in; size: letter; }
        }
      `}</style>

      <main className="min-h-screen bg-slate-950 text-white">
        {/* Gradient accent at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-orange-500" />
        
        <div className="max-w-6xl mx-auto px-6 py-10 print:px-4 print:py-4">
          {/* Navigation */}
          <motion.div 
            className="flex items-center justify-between mb-12 no-print"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back</span>
            </Link>
            
            <div className="flex gap-3">
              <Link
                href="/releases"
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 hover:text-white transition-colors text-sm font-medium border border-slate-700"
              >
                All Releases
              </Link>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors text-sm font-medium"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm font-medium"
              >
                <Printer className="w-4 h-4" />
                <span>Print</span>
              </button>
            </div>
          </motion.div>

          {/* Header */}
          <motion.div 
            className="mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <div className="mb-8">
              <Image
                src="https://cdn.bfldr.com/Q445447Z/at/n85kkcjq5q8r3n6nf4z5jsw/LinkAI_BG_FullGradonBlk.svg?auto=webp&format=svg"
                alt="LinkAI"
                width={140}
                height={42}
                className="h-12 w-auto invert"
                unoptimized
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-5 mb-6">
              <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                V2.2
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 text-orange-300 rounded-full text-sm font-semibold border border-orange-500/30">
                <Clock className="w-4 h-4" />
                February 25th, 2026
              </span>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-4">
              Major Platform Update
            </h1>
            <p className="text-slate-400 text-xl max-w-2xl">
              Complete UI overhaul with Scenarios Tab, Application (Short 1003), and AI Assistants.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="space-y-6">
            {features.map((feature, idx) => (
              <FeatureCard key={feature.id} feature={feature} index={idx} />
            ))}
          </div>

          {/* Footer */}
          <motion.div 
            className="mt-16 pt-8 border-t border-slate-800 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-slate-500 text-sm">
              Questions? Use the <span className="text-slate-300">Feedback</span> button in LinkAI.
            </p>
          </motion.div>
        </div>
      </main>
    </>
  );
}
