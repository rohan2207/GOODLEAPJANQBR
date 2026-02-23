"use client";

import { ArrowLeft, Printer, Copy, Check, Layout, Sparkles, FileText, Bot, Clock, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Feature sections for V2.2
const features = [
  {
    id: "new-ui",
    icon: Layout,
    title: "New UI for Link",
    color: "cyan",
    summary: "Completely redesigned interface for improved workflow and productivity",
    details: [
      "Modernized visual design with improved navigation",
      "Streamlined dashboard for faster access to key features",
      "Enhanced responsive layout for all screen sizes",
      "Improved accessibility and keyboard navigation",
    ],
    status: "In Development",
  },
  {
    id: "scenarios",
    icon: Sparkles,
    title: "Scenarios Tab",
    color: "purple",
    summary: "Compare multiple loan scenarios side-by-side to find the best option",
    details: [
      "Create and compare up to 4 loan scenarios simultaneously",
      "Real-time rate and payment calculations",
      "Easy scenario duplication and modification",
      "Export comparison reports for client presentations",
    ],
    status: "In Development",
  },
  {
    id: "application",
    icon: FileText,
    title: "Application (Short 1003)",
    color: "amber",
    summary: "Streamlined application process with intelligent form completion",
    details: [
      "Simplified Short 1003 form with auto-fill capabilities",
      "Smart validation and error prevention",
      "Progress tracking and save/resume functionality",
      "Direct integration with loan origination systems",
    ],
    status: "In Development",
  },
  {
    id: "ai-assistants",
    icon: Bot,
    title: "AI Assistants",
    color: "emerald",
    summary: "Intelligent assistants for rapport building, sales coaching, and property valuations",
    details: [
      "AI Rapport Builder — Personalized conversation starters based on borrower data",
      "Sales Coach — Real-time objection handling and rate negotiation guidance",
      "Valuation AI — Instant property valuations from multiple data sources",
      "Contextual suggestions throughout the loan process",
    ],
    status: "In Development",
  },
];

// Color mappings
const colorMap: { [key: string]: { bg: string; text: string; border: string; ring: string } } = {
  cyan: { bg: "bg-cyan-500/20", text: "text-cyan-400", border: "border-cyan-500/30", ring: "ring-cyan-500/30" },
  purple: { bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/30", ring: "ring-purple-500/30" },
  amber: { bg: "bg-amber-500/20", text: "text-amber-400", border: "border-amber-500/30", ring: "ring-amber-500/30" },
  emerald: { bg: "bg-emerald-500/20", text: "text-emerald-400", border: "border-emerald-500/30", ring: "ring-emerald-500/30" },
};

// Plain text version for email
const emailContentPlain = `Subject: LinkAI V2.2 Release Notes // February 25th, 2026

Effective February 25th, 2026, LinkAI V2.2 is released to production.

Release Notes:

This major platform update includes:

• New UI for Link — Completely redesigned interface for improved workflow and productivity

• Scenarios Tab — Compare multiple loan scenarios side-by-side to find the best option for your borrowers

• Application (Short 1003) — Streamlined application process with intelligent form completion

• AI Assistants — Intelligent assistants for rapport building, sales coaching, and property valuations

Questions? Use the Feedback button in LinkAI.
`;

// Rich HTML version for email
const emailContentHtml = `
<div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
  <p>Effective February 25th, 2026, <strong>LinkAI V2.2</strong> is released to production.</p>
  
  <h3 style="margin-top: 20px; margin-bottom: 10px;">Release Notes:</h3>
  
  <p>This major platform update includes:</p>
  
  <ul style="margin: 16px 0; padding-left: 20px;">
    <li style="margin-bottom: 12px;"><strong>New UI for Link</strong> — Completely redesigned interface for improved workflow and productivity</li>
    <li style="margin-bottom: 12px;"><strong>Scenarios Tab</strong> — Compare multiple loan scenarios side-by-side to find the best option</li>
    <li style="margin-bottom: 12px;"><strong>Application (Short 1003)</strong> — Streamlined application process with intelligent form completion</li>
    <li style="margin-bottom: 12px;"><strong>AI Assistants</strong> — Intelligent assistants for rapport building, sales coaching, and property valuations</li>
  </ul>
  
  <p style="color: #666; margin-top: 20px;">Questions? Use the Feedback button in LinkAI.</p>
</div>
`;

function FeatureSection({ feature, isExpanded, onToggle }: { 
  feature: typeof features[0]; 
  isExpanded: boolean; 
  onToggle: () => void;
}) {
  const colors = colorMap[feature.color];
  const Icon = feature.icon;

  return (
    <motion.div 
      className={`rounded-2xl border ${colors.border} bg-slate-900/50 overflow-hidden transition-all hover:bg-slate-900/80`}
      layout
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${colors.text}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
            <p className="text-slate-400 text-sm mt-0.5">{feature.summary}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text} border ${colors.border}`}>
            {feature.status}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className={`px-5 pb-5 border-t ${colors.border}`}>
              <ul className="mt-4 space-y-3">
                {feature.details.map((detail, idx) => (
                  <motion.li 
                    key={idx}
                    className="flex gap-3 items-start"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${colors.text.replace('text-', 'bg-')} mt-2 flex-shrink-0`} />
                    <span className="text-slate-300">{detail}</span>
                  </motion.li>
                ))}
              </ul>
              
              {/* Placeholder for screenshots/demos */}
              <div className={`mt-5 p-6 rounded-xl border-2 border-dashed ${colors.border} flex items-center justify-center`}>
                <p className="text-slate-500 text-sm">Screenshots and demos coming soon</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function V22ReleasePage() {
  const [copied, setCopied] = useState(false);
  const [expandedFeatures, setExpandedFeatures] = useState<string[]>([]);

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

  const toggleFeature = (id: string) => {
    setExpandedFeatures(prev => 
      prev.includes(id) 
        ? prev.filter(f => f !== id)
        : [...prev, id]
    );
  };

  const expandAll = () => {
    if (expandedFeatures.length === features.length) {
      setExpandedFeatures([]);
    } else {
      setExpandedFeatures(features.map(f => f.id));
    }
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
          .no-print {
            display: none !important;
          }
          @page {
            margin: 0.5in;
            size: letter;
          }
        }
      `}</style>

      <main className="min-h-screen bg-slate-950 text-white print:bg-white print:text-gray-900">
        {/* Background gradient */}
        <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pointer-events-none print:hidden" />
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,146,60,0.1),transparent_50%)] pointer-events-none print:hidden" />

        <div className="relative max-w-4xl mx-auto px-4 py-8 print:px-0 print:py-4">
          {/* Navigation */}
          <motion.div 
            className="flex items-center justify-between mb-8 no-print"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Main</span>
            </Link>
            
            <div className="flex gap-2">
              <Link
                href="/releases"
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors text-sm font-medium border border-slate-700"
              >
                All Releases
              </Link>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span className="text-sm font-medium">{copied ? "Copied!" : "Copy Email"}</span>
              </button>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span className="text-sm font-medium">Print</span>
              </button>
            </div>
          </motion.div>

          {/* Release Container */}
          <motion.div 
            className="bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden print:bg-white print:border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {/* Header */}
            <div className="relative p-8 border-b border-slate-800 print:border-gray-200 overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent print:hidden" />
              
              <div className="relative flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Image
                      src="https://cdn.bfldr.com/Q445447Z/at/n85kkcjq5q8r3n6nf4z5jsw/LinkAI_BG_FullGradonBlk.svg?auto=webp&format=svg"
                      alt="LinkAI"
                      width={100}
                      height={30}
                      className="h-8 w-auto print:invert"
                      unoptimized
                    />
                  </div>
                  
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 print:text-orange-600">
                      V2.2
                    </span>
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/20 text-orange-400 rounded-full text-sm font-semibold border border-orange-500/30 print:bg-orange-100 print:text-orange-700 print:border-orange-200">
                      <Clock className="w-4 h-4" />
                      Coming February 25th
                    </span>
                  </div>
                  
                  <h1 className="text-2xl font-bold text-white mb-2 print:text-gray-900">
                    Major Platform Update
                  </h1>
                  <p className="text-slate-400 print:text-gray-600">
                    Complete UI overhaul with Scenarios Tab, Application (Short 1003), and AI Assistants integration
                  </p>
                </div>
              </div>
            </div>

            {/* Release Content */}
            <div className="p-8">
              {/* Summary */}
              <div className="mb-8">
                <p className="text-slate-300 text-lg print:text-gray-700">
                  Effective February 25th, 2026, <strong className="text-white print:text-gray-900">LinkAI V2.2</strong> will be released to production. This is our biggest update yet, bringing a completely redesigned interface and powerful new features.
                </p>
              </div>

              {/* Features Header */}
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-white print:text-gray-900">What's New</h2>
                <button
                  onClick={expandAll}
                  className="text-sm text-slate-400 hover:text-white transition-colors no-print"
                >
                  {expandedFeatures.length === features.length ? 'Collapse All' : 'Expand All'}
                </button>
              </div>

              {/* Feature Sections */}
              <div className="space-y-4">
                {features.map((feature, idx) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                  >
                    <FeatureSection
                      feature={feature}
                      isExpanded={expandedFeatures.includes(feature.id)}
                      onToggle={() => toggleFeature(feature.id)}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Feedback CTA */}
              <div className="mt-8 p-5 rounded-xl bg-slate-800/50 border border-slate-700 print:bg-gray-100 print:border-gray-200">
                <p className="text-slate-300 text-sm print:text-gray-700">
                  <strong className="text-white print:text-gray-900">Questions or feedback?</strong> Use the Feedback button in LinkAI or reach out to your account manager.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-800/30 border-t border-slate-800 px-8 py-4 print:bg-gray-50 print:border-gray-200">
              <p className="text-slate-500 text-sm text-center print:text-gray-500">
                LinkAI V2.2 • February 25th, 2026 • Major Platform Update
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
