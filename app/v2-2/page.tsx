"use client";

import { ArrowLeft, Printer, Copy, Check, Layout, Sparkles, FileText, Bot, Clock, Lightbulb } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

// Plain text version for email
const emailContentPlain = `Subject: LinkAI V2.2 Release Notes // February 25th, 2026

Effective February 25th, 2026, LinkAI V2.2 is released to production.

What's New:

• Easier Navigation — Find any loan section in one click with the new left menu
• Compare Loan Options — Show customers their savings instantly with side-by-side scenarios
• Quick Application — Submit Short 1003 to Figure in minutes
• AI Sales Tools — Get talking points, objection handlers, and property valuations

Questions? Use the Feedback button in LinkAI.
`;

// Rich HTML version for email
const emailContentHtml = `
<div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
  <p>Effective February 25th, 2026, <strong>LinkAI V2.2</strong> is released to production.</p>
  <h3 style="margin-top: 20px; margin-bottom: 10px;">What's New:</h3>
  <ul style="margin: 16px 0; padding-left: 20px;">
    <li style="margin-bottom: 12px;"><strong>Easier Navigation</strong> — Find any loan section in one click</li>
    <li style="margin-bottom: 12px;"><strong>Compare Loan Options</strong> — Show customers savings instantly</li>
    <li style="margin-bottom: 12px;"><strong>Quick Application</strong> — Submit to Figure in minutes</li>
    <li style="margin-bottom: 12px;"><strong>AI Sales Tools</strong> — Get talking points and objection handlers</li>
  </ul>
  <p style="color: #666; margin-top: 20px;">Questions? Use the Feedback button in LinkAI.</p>
</div>
`;

// Feature data with benefit-focused copy
const features = [
  {
    id: "new-ui",
    icon: Layout,
    title: "Easier Navigation",
    summary: "Find any loan section in one click",
    benefits: [
      "① Left menu — Jump to any section instantly",
      "② Tab options — Switch between views (Liabilities, Details)",
      "③ AI panel — Access sales tools without leaving the page"
    ],
    tip: "Click any item in the left menu to jump directly there",
    screenshotPath: "/Screenshots/new-ui.png",
    color: "cyan"
  },
  {
    id: "scenarios",
    icon: Sparkles,
    title: "Compare Loan Options",
    summary: "Show customers their savings instantly",
    benefits: [
      "① Settings — Set up loan details in seconds",
      "② Comparison — See current vs proposed side-by-side",
      "③ Charts — Visual savings breakdown opens automatically"
    ],
    tip: "Click 'Scenarios' in the left menu → adjust settings → charts appear on the right",
    screenshotPath: "/Screenshots/scenarios.png",
    color: "purple"
  },
  {
    id: "application",
    icon: FileText,
    title: "Quick Application",
    summary: "Submit to Figure in minutes",
    benefits: [
      "① Borrower info — Pre-filled from existing data",
      "② Property details — Auto-populated from records",
      "③ Submit button — Send directly to Figure"
    ],
    tip: "Click 'Application' → review pre-filled info → click 'Continue to Figure'",
    screenshotPath: "/Screenshots/application.png",
    color: "amber"
  },
  {
    id: "ai-assistants",
    icon: Bot,
    title: "AI Sales Tools",
    summary: "Get talking points and objection handlers",
    benefits: [
      "① Call Prep — Briefing before customer calls",
      "② Property AVM — Instant property valuations",
      "③ Sales Coach — Handle objections, explain benefits"
    ],
    tip: "Click any AI tool on the right panel to get instant insights",
    screenshotPath: "/Screenshots/ai-assistants.png",
    color: "emerald"
  }
];

// Light theme color mappings
const colorMap: { [key: string]: { bg: string; border: string; text: string; light: string } } = {
  cyan: { bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-600", light: "bg-cyan-100" },
  purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-600", light: "bg-purple-100" },
  amber: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-600", light: "bg-amber-100" },
  emerald: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-600", light: "bg-emerald-100" },
};

// Feature Section with side-by-side layout
function FeatureSection({ feature, index }: { feature: typeof features[0]; index: number }) {
  const colors = colorMap[feature.color];
  const Icon = feature.icon;
  
  return (
    <motion.section 
      id={feature.id}
      className={`rounded-2xl border-2 ${colors.border} bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow mb-6`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.1 }}
    >
      <div className="flex flex-col lg:flex-row">
        {/* Left: Text Content (25-30%) */}
        <div className={`lg:w-[30%] p-6 ${colors.bg} border-b lg:border-b-0 lg:border-r ${colors.border}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl ${colors.light} flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${colors.text}`} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">{feature.title}</h2>
          </div>
          
          <p className="text-gray-600 mb-4">{feature.summary}</p>
          
          <ul className="space-y-2 mb-4">
            {feature.benefits.map((benefit, idx) => (
              <li key={idx} className="text-sm text-gray-700">
                {benefit}
              </li>
            ))}
          </ul>
          
          {/* How to use tip */}
          <div className={`p-3 rounded-xl ${colors.light} border ${colors.border}`}>
            <div className="flex items-start gap-2">
              <Lightbulb className={`w-4 h-4 ${colors.text} mt-0.5 flex-shrink-0`} />
              <div>
                <p className="text-xs font-semibold text-gray-700 mb-1">How to use:</p>
                <p className="text-xs text-gray-600">{feature.tip}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right: Screenshot (70-75%) */}
        <div className="lg:w-[70%] p-4 bg-white">
          <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-lg">
            <img 
              src={feature.screenshotPath}
              alt={feature.title}
              className="w-full h-auto"
            />
            {/* Numbered callout overlays would go here if we had exact positions */}
          </div>
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
          }
          .no-print { display: none !important; }
          @page { margin: 0.5in; size: letter; }
        }
      `}</style>

      <main className="min-h-screen bg-white text-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-8 print:px-4 print:py-4">
          {/* Navigation */}
          <motion.div 
            className="flex items-center justify-between mb-8 no-print"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link 
              href="/releases" 
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">All Releases</span>
            </Link>
            
            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors text-sm font-medium shadow-sm"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Copied!" : "Copy Email"}</span>
              </button>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors text-sm font-medium shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Print</span>
              </button>
            </div>
          </motion.div>

          {/* Header */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <Image
                src="https://cdn.bfldr.com/Q445447Z/at/n85kkcjq5q8r3n6nf4z5jsw/LinkAI_BG_FullGradonBlk.svg?auto=webp&format=svg"
                alt="LinkAI"
                width={120}
                height={36}
                className="h-8 w-auto"
                unoptimized
              />
              <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                V2.2
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold border border-orange-200">
                <Clock className="w-4 h-4" />
                February 25th, 2026
              </span>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              What's New for You
            </h1>
            <p className="text-gray-600 text-lg">
              Work faster with easier navigation, instant loan comparisons, quick applications, and AI sales tools.
            </p>
          </motion.div>

          {/* Feature Sections */}
          {features.map((feature, idx) => (
            <FeatureSection key={feature.id} feature={feature} index={idx} />
          ))}

          {/* Help Footer */}
          <motion.div 
            className="mt-8 p-5 rounded-2xl bg-white border border-gray-200 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-gray-600">
              <strong className="text-gray-900">Questions?</strong> Use the <span className="font-medium">Feedback</span> button in LinkAI or contact your manager.
            </p>
          </motion.div>
        </div>
      </main>
    </>
  );
}
