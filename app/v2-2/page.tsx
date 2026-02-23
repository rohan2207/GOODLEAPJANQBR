"use client";

import { ArrowLeft, Printer, Copy, Check, Layout, Sparkles, FileText, Bot, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

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

// Arrow SVG component
function Arrow({ direction, color }: { direction: 'left' | 'right' | 'up' | 'down'; color: string }) {
  const rotations = { left: 180, right: 0, up: -90, down: 90 };
  return (
    <svg 
      width="40" 
      height="24" 
      viewBox="0 0 40 24" 
      fill="none" 
      className={`${color}`}
      style={{ transform: `rotate(${rotations[direction]}deg)` }}
    >
      <path 
        d="M0 12H36M36 12L24 2M36 12L24 22" 
        stroke="currentColor" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Feature Section Component with Screenshot
function FeatureSection({ 
  id,
  icon: Icon, 
  title, 
  summary, 
  details,
  screenshotPath,
  annotations,
  accentColor
}: {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  summary: string;
  details: string[];
  screenshotPath: string;
  annotations: { label: string; position: string; color: string; direction: 'left' | 'right' | 'up' | 'down' }[];
  accentColor: { text: string; bg: string; border: string; glow: string };
}) {
  return (
    <motion.section 
      id={id}
      className={`rounded-2xl bg-slate-900/80 border border-slate-700 overflow-hidden shadow-xl ${accentColor.glow} mb-8`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl ${accentColor.bg} border ${accentColor.border} flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${accentColor.text}`} />
          </div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>
        
        <p className="text-slate-300 text-lg mb-4">{summary}</p>
        
        <ul className="flex flex-wrap gap-4">
          {details.map((detail, idx) => (
            <li key={idx} className="flex gap-2 items-center">
              <div className={`w-1.5 h-1.5 rounded-full ${accentColor.text.replace('text-', 'bg-')}`} />
              <span className="text-slate-400 text-sm">{detail}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Screenshot with Annotations */}
      <div className="p-6">
        <div className="relative">
          {/* Screenshot */}
          <div className="rounded-xl overflow-hidden border border-slate-600 shadow-2xl">
            <img 
              src={screenshotPath}
              alt={title}
              className="w-full h-auto"
            />
          </div>
          
          {/* Annotation Arrows */}
          {annotations.map((annotation, idx) => (
            <motion.div
              key={idx}
              className={`absolute ${annotation.position} flex items-center gap-2`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
            >
              <div className={`px-3 py-1.5 rounded-lg text-sm font-bold text-white shadow-lg ${annotation.color}`}>
                {annotation.label}
              </div>
              <Arrow direction={annotation.direction} color={annotation.color.replace('bg-', 'text-')} />
            </motion.div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-6">
          {annotations.map((annotation, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${annotation.color}`} />
              <span className="text-slate-400 text-sm">{annotation.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
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

          {/* Feature 1: New UI */}
          <FeatureSection
            id="new-ui"
            icon={Layout}
            title="New UI for Link"
            summary="Completely redesigned interface with powerful left-hand navigation for streamlined workflow"
            details={[
              "L1 Left Navigation — Primary section access",
              "L2 Sub-tabs — Liabilities, Details views",
              "AI Assistant Panel — Always accessible"
            ]}
            screenshotPath="/screenshots/new-ui.png"
            annotations={[
              { label: "L1 Navigation", position: "top-[20%] left-[-10px]", color: "bg-cyan-500", direction: "right" },
              { label: "L2 Sub-tabs", position: "top-[8%] left-[15%]", color: "bg-purple-500", direction: "down" },
              { label: "AI Assistants", position: "top-[20%] right-[-10px]", color: "bg-emerald-500", direction: "left" },
            ]}
            accentColor={{ text: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30", glow: "shadow-cyan-500/10" }}
          />

          {/* Feature 2: Scenarios */}
          <FeatureSection
            id="scenarios"
            icon={Sparkles}
            title="Scenarios Tab"
            summary="Compare multiple loan scenarios side-by-side and instantly generate benefit charts"
            details={[
              "Configuration Panel — Set loan parameters",
              "Value Propositions — Current vs Proposed",
              "Charts Panel — Visual comparisons on selection"
            ]}
            screenshotPath="/screenshots/scenarios.png"
            annotations={[
              { label: "Configuration", position: "top-[30%] left-[-10px]", color: "bg-purple-500", direction: "right" },
              { label: "Value Props", position: "top-[10%] left-[45%]", color: "bg-orange-500", direction: "down" },
              { label: "Charts Panel", position: "top-[20%] right-[-10px]", color: "bg-amber-500", direction: "left" },
            ]}
            accentColor={{ text: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30", glow: "shadow-purple-500/10" }}
          />

          {/* Feature 3: Application */}
          <FeatureSection
            id="application"
            icon={FileText}
            title="Application (Short 1003)"
            summary="Streamlined application process — Take Short 1003 and submit directly to Figure"
            details={[
              "Simplified Form — Auto-fill capabilities",
              "Smart Validation — Error prevention",
              "Direct Submission — Submit to Figure"
            ]}
            screenshotPath="/screenshots/application.png"
            annotations={[
              { label: "Short 1003 Form", position: "top-[20%] left-[20%]", color: "bg-amber-500", direction: "down" },
              { label: "Submit to Figure", position: "bottom-[20%] right-[20%]", color: "bg-orange-500", direction: "up" },
            ]}
            accentColor={{ text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", glow: "shadow-amber-500/10" }}
          />

          {/* Feature 4: AI Assistants */}
          <FeatureSection
            id="ai-assistants"
            icon={Bot}
            title="AI Assistants"
            summary="Intelligent assistants panel for rapport building, sales coaching, and property valuations"
            details={[
              "Call Prep — Customer briefing for calls",
              "Property AVM — Valuation analysis",
              "Sales Coach — Objection handling"
            ]}
            screenshotPath="/screenshots/ai-assistants.png"
            annotations={[
              { label: "Call Prep", position: "top-[25%] left-[-10px]", color: "bg-blue-500", direction: "right" },
              { label: "Property AVM", position: "top-[45%] left-[-10px]", color: "bg-teal-500", direction: "right" },
              { label: "Sales Coach", position: "top-[65%] left-[-10px]", color: "bg-indigo-500", direction: "right" },
            ]}
            accentColor={{ text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", glow: "shadow-emerald-500/10" }}
          />

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
