"use client";

import { ArrowLeft, Printer, Copy, Check, Layout, Sparkles, FileText, Bot, Clock, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    summary: "Completely redesigned interface with a powerful new left-hand navigation system for streamlined workflow",
    details: [
      "New persistent left sidebar — Quick access to all loan sections without leaving your current view",
      "Visual tab organization — Pricing, Scenarios, Application, Borrower, Property, AI, and Documents tabs",
      "Active state indicators — Always know exactly where you are in the application",
      "New Scenarios and Application tabs — Easy access to our newest features",
      "Collapsible navigation — Maximize screen real estate when needed",
    ],
    imagePlaceholder: "UI Preview",
    hasNavMockup: true,
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
    imagePlaceholder: "Scenarios Preview",
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
    imagePlaceholder: "Application Preview",
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
    imagePlaceholder: "AI Assistants Preview",
  },
];

// Color mappings - lighter, more vibrant
const colorMap: { [key: string]: { bg: string; text: string; border: string; accent: string; light: string } } = {
  cyan: { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-200", accent: "bg-cyan-500", light: "bg-cyan-100" },
  purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200", accent: "bg-purple-500", light: "bg-purple-100" },
  amber: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200", accent: "bg-amber-500", light: "bg-amber-100" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", accent: "bg-emerald-500", light: "bg-emerald-100" },
};

// Plain text version for email
const emailContentPlain = `Subject: LinkAI V2.2 Release Notes // February 25th, 2026

Effective February 25th, 2026, LinkAI V2.2 is released to production.

Release Notes:

This major platform update includes:

• New UI for Link — Completely redesigned interface with new left-hand navigation
  - Persistent left sidebar for quick access to all loan sections
  - Visual tab organization: Pricing, Scenarios, Application, Borrower, Property, AI, and Documents
  - Collapsible navigation to maximize screen real estate

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
    <li style="margin-bottom: 12px;">
      <strong>New UI for Link</strong> — Completely redesigned interface with new left-hand navigation
      <ul style="margin-top: 8px; padding-left: 16px; color: #555;">
        <li>Persistent left sidebar for quick access to all loan sections</li>
        <li>Visual tab organization: Pricing, Scenarios, Application, Borrower, Property, AI, and Documents</li>
        <li>Collapsible navigation to maximize screen real estate</li>
      </ul>
    </li>
    <li style="margin-bottom: 12px;"><strong>Scenarios Tab</strong> — Compare multiple loan scenarios side-by-side to find the best option</li>
    <li style="margin-bottom: 12px;"><strong>Application (Short 1003)</strong> — Streamlined application process with intelligent form completion</li>
    <li style="margin-bottom: 12px;"><strong>AI Assistants</strong> — Intelligent assistants for rapport building, sales coaching, and property valuations</li>
  </ul>
  
  <p style="color: #666; margin-top: 20px;">Questions? Use the Feedback button in LinkAI.</p>
</div>
`;

// Navigation Mockup Component
function NavigationMockup() {
  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#00838f] to-[#006064] p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">L</span>
          </div>
          <span className="text-white font-semibold">LinkAI</span>
        </div>
      </div>
      
      {/* Navigation Items */}
      <div className="p-3 space-y-1">
        {navItems.map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + idx * 0.05 }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
              item.active 
                ? 'bg-[#e6f2f4] text-[#00838f] font-medium shadow-sm' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm flex-1">{item.label}</span>
            {item.isNew && (
              <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-[10px] font-bold rounded-full">
                NEW
              </span>
            )}
            {item.active && (
              <div className="w-1.5 h-1.5 rounded-full bg-[#00838f]" />
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Bottom User Section */}
      <div className="border-t border-gray-100 p-3 mt-2">
        <div className="flex items-center gap-3 px-3 py-2 text-gray-500">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm">
            👤
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-gray-700">Loan Officer</p>
            <p className="text-[10px] text-gray-400">View Profile</p>
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
      className={`rounded-3xl border-2 ${colors.border} ${colors.bg} overflow-hidden shadow-lg hover:shadow-xl transition-shadow`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.1 }}
    >
      <div className={`flex flex-col lg:flex-row ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
        {/* Text Content - Left (or right on alternating) */}
        <div className="flex-1 p-8">
          <div className="flex items-center gap-4 mb-5">
            <div className={`w-14 h-14 rounded-2xl ${colors.light} flex items-center justify-center shadow-sm`}>
              <Icon className={`w-7 h-7 ${colors.text}`} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
            </div>
          </div>
          
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">{feature.summary}</p>
          
          <ul className="space-y-3">
            {feature.details.map((detail, idx) => (
              <li key={idx} className="flex gap-3 items-start">
                <div className={`w-2 h-2 rounded-full ${colors.accent} mt-2.5 flex-shrink-0`} />
                <span className="text-gray-700 leading-relaxed">{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Image/Mockup Area - Right (or left on alternating) */}
        <div className="flex-1 p-6 lg:p-8 flex items-center justify-center">
          {feature.hasNavMockup ? (
            <NavigationMockup />
          ) : (
            <div className={`w-full h-64 lg:h-80 rounded-2xl ${colors.light} border-2 border-dashed ${colors.border} flex items-center justify-center`}>
              <div className="text-center">
                <div className={`w-16 h-16 rounded-2xl ${colors.accent} mx-auto mb-4 flex items-center justify-center shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <p className={`${colors.text} font-medium`}>{feature.imagePlaceholder}</p>
                <p className="text-gray-400 text-sm mt-1">Coming soon</p>
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

      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
        <div className="max-w-6xl mx-auto px-6 py-10 print:px-4 print:py-4">
          {/* Navigation */}
          <motion.div 
            className="flex items-center justify-between mb-10 no-print"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Main</span>
            </Link>
            
            <div className="flex gap-3">
              <Link
                href="/releases"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-gray-700 rounded-xl hover:bg-gray-100 transition-colors text-sm font-medium border border-gray-200 shadow-sm"
              >
                All Releases
              </Link>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors shadow-sm"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span className="text-sm font-medium">{copied ? "Copied!" : "Copy Email"}</span>
              </button>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span className="text-sm font-medium">Print</span>
              </button>
            </div>
          </motion.div>

          {/* Header */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <Image
                src="https://cdn.bfldr.com/Q445447Z/at/n85kkcjq5q8r3n6nf4z5jsw/LinkAI_BG_FullGradonBlk.svg?auto=webp&format=svg"
                alt="LinkAI"
                width={120}
                height={36}
                className="h-10 w-auto"
                unoptimized
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                V2.2
              </span>
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold border border-orange-200">
                <Clock className="w-4 h-4" />
                February 25th, 2026
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Major Platform Update
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl">
              Complete UI overhaul with Scenarios Tab, Application (Short 1003), and AI Assistants integration. This is our biggest update yet.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="space-y-8">
            {features.map((feature, idx) => (
              <FeatureCard key={feature.id} feature={feature} index={idx} />
            ))}
          </div>

          {/* Footer CTA */}
          <motion.div 
            className="mt-12 p-6 rounded-2xl bg-gray-100 border border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-gray-600 text-center">
              <strong className="text-gray-900">Questions or feedback?</strong> Use the Feedback button in LinkAI or reach out to your account manager.
            </p>
          </motion.div>

          {/* Footer */}
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-gray-400 text-sm">
              LinkAI V2.2 • February 25th, 2026 • Major Platform Update
            </p>
          </motion.div>
        </div>
      </main>
    </>
  );
}
