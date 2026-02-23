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

// Feature Section Component with Screenshot
function FeatureSection({ 
  id,
  icon: Icon, 
  title, 
  summary, 
  details,
  screenshotPath,
  accentColor
}: {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  summary: string;
  details: string[];
  screenshotPath: string;
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
      
      {/* Screenshot */}
      <div className="p-6">
        <div className="rounded-xl overflow-hidden border border-slate-600 shadow-2xl">
          <img 
            src={screenshotPath}
            alt={title}
            className="w-full h-auto"
          />
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
              "L1 Left Navigation",
              "L2 Sub-tabs (Liabilities, Details)",
              "AI Assistant Panel"
            ]}
            screenshotPath="/Screenshots/new-ui.png"
            accentColor={{ text: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30", glow: "shadow-cyan-500/10" }}
          />

          {/* Feature 2: Scenarios */}
          <FeatureSection
            id="scenarios"
            icon={Sparkles}
            title="Scenarios Tab"
            summary="Compare multiple loan scenarios side-by-side and instantly generate benefit charts"
            details={[
              "Configuration Panel",
              "Value Propositions",
              "Payment Savings Comparison"
            ]}
            screenshotPath="/Screenshots/scenarios.png"
            accentColor={{ text: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30", glow: "shadow-purple-500/10" }}
          />

          {/* Feature 3: Application */}
          <FeatureSection
            id="application"
            icon={FileText}
            title="Application (Short 1003)"
            summary="Streamlined application process — Take Short 1003 and submit directly to Figure"
            details={[
              "Borrower Information",
              "Subject Property",
              "Continue to Figure"
            ]}
            screenshotPath="/Screenshots/application.png"
            accentColor={{ text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", glow: "shadow-amber-500/10" }}
          />

          {/* Feature 4: AI Assistants */}
          <FeatureSection
            id="ai-assistants"
            icon={Bot}
            title="AI Assistants"
            summary="Intelligent assistants panel for rapport building, sales coaching, and property valuations"
            details={[
              "Call Prep",
              "Property AVM",
              "Sales Coach"
            ]}
            screenshotPath="/Screenshots/ai-assistants.png"
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
