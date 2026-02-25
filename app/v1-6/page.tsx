"use client";

import { ArrowLeft, Printer, Copy, Check, UserPlus, Briefcase, DollarSign, MapPin, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

// Plain text version for email
const emailContentPlain = `Subject: LinkAI V1.6 Release Notes — HELOC Submission Updates

LinkAI V1.6 is now live with improvements to HELOC submissions.

What's New:

• Name & Suffix Updates — Legal name verification prompt added, Middle Name hidden, Suffix moved to first row with blank option
• Employment Options — Updated job status choices that match Figure (shorter labels with hover for full text)
• Simplified Income — Cleaner income section (removed "Other Annual Income")
• Smart Defaults — Primary residence auto-selected for current address

These updates make HELOC submissions smoother and reduce errors.

Questions? Use the Feedback button in LinkAI.
`;

// Rich HTML version for email
const emailContentHtml = `
<div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
  <p><strong>LinkAI V1.6</strong> is now live with improvements to HELOC submissions.</p>
  <h3 style="margin-top: 20px; margin-bottom: 10px;">What's New:</h3>
  <ul style="margin: 16px 0; padding-left: 20px;">
    <li style="margin-bottom: 12px;"><strong>Name & Suffix Updates</strong> — Legal name verification prompt, Middle Name hidden, Suffix on first row with blank option</li>
    <li style="margin-bottom: 12px;"><strong>Employment Options</strong> — Updated job status choices (hover for full labels)</li>
    <li style="margin-bottom: 12px;"><strong>Simplified Income</strong> — Cleaner income section</li>
    <li style="margin-bottom: 12px;"><strong>Smart Defaults</strong> — Primary residence auto-selected</li>
  </ul>
  <p style="color: #666; margin-top: 20px;">Questions? Use the Feedback button in LinkAI.</p>
</div>
`;

// Feature data with benefit-focused copy
const features = [
  {
    id: "suffix",
    icon: UserPlus,
    title: "Name & Suffix Updates",
    summary: "Cleaner name entry with suffix options",
    description: "The borrower info section now shows a verification prompt and streamlined name fields. Suffix has moved to the first row next to the name.",
    details: [
      "New message: \"Please provide the legal name as it appears on government-issued ID\"",
      "Middle Name field is now hidden",
      "Suffix dropdown moved to first row (next to First/Last name)",
      "Options: (blank), I, II, III, IV, V, Jr, Sr",
      "Select blank to clear — no more getting stuck"
    ],
    howItHelps: "Names on loan documents will match IDs exactly, reducing delays from mismatched information.",
    color: "teal"
  },
  {
    id: "employment",
    icon: Briefcase,
    title: "Employment Options",
    summary: "Updated job status choices that match Figure",
    description: "Employment type options now align exactly with Figure's system, eliminating errors from mismatched values.",
    details: [
      "Employed full-time",
      "Employed part-time",
      "Retired",
      "Self-employed",
      "\"Alimony, Child Support, etc.\" (hover for full label)",
      "Unemployed/furloughed"
    ],
    howItHelps: "No more submission errors from employment type mismatches. The shorter label keeps the form clean — hover to see the full description.",
    color: "blue"
  },
  {
    id: "income",
    icon: DollarSign,
    title: "Simplified Income",
    summary: "Cleaner, streamlined income section",
    description: "The income section is now cleaner with unnecessary fields removed. \"Other Annual Income\" has been hidden to reduce confusion.",
    details: [
      "\"Other Annual Income\" field removed from view",
      "Cleaner, less cluttered form",
      "Focus on the income fields that matter"
    ],
    howItHelps: "Less clutter means faster form completion and fewer questions about what to enter.",
    color: "emerald"
  },
  {
    id: "address",
    icon: MapPin,
    title: "Smart Defaults",
    summary: "Primary residence auto-selected for current address",
    description: "Current address now defaults to \"Primary\" occupancy type, saving you a click on most applications.",
    details: [
      "Occupancy Type auto-set to Primary",
      "Can still change if needed",
      "Your selection is saved if you update it"
    ],
    howItHelps: "Most applicants live at their current address as a primary residence. This default saves time on every application.",
    color: "amber"
  }
];

// Light theme color mappings
const colorMap: { [key: string]: { bg: string; border: string; text: string; light: string; icon: string } } = {
  teal: { bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-700", light: "bg-teal-100", icon: "bg-teal-500" },
  blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", light: "bg-blue-100", icon: "bg-blue-500" },
  emerald: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", light: "bg-emerald-100", icon: "bg-emerald-500" },
  amber: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", light: "bg-amber-100", icon: "bg-amber-500" },
};

// Feature Card Component
function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const colors = colorMap[feature.color];
  const Icon = feature.icon;
  
  return (
    <motion.section 
      id={feature.id}
      className={`rounded-2xl border-2 ${colors.border} bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.1 }}
    >
      {/* Header */}
      <div className={`p-5 ${colors.bg} border-b ${colors.border}`}>
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl ${colors.icon} flex items-center justify-center shadow-md`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{feature.title}</h2>
            <p className="text-gray-600">{feature.summary}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-gray-700 mb-4">{feature.description}</p>
        
        {/* Details List */}
        <div className={`p-4 rounded-xl ${colors.light} mb-4`}>
          <p className="text-sm font-semibold text-gray-700 mb-2">What's included:</p>
          <ul className="space-y-1.5">
            {feature.details.map((detail, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle className={`w-4 h-4 ${colors.text} mt-0.5 flex-shrink-0`} />
                {detail}
              </li>
            ))}
          </ul>
        </div>

        {/* How it helps */}
        <div className={`p-4 rounded-xl border-2 ${colors.border} ${colors.bg}`}>
          <p className="text-sm font-semibold text-gray-900 mb-1">💡 How this helps you:</p>
          <p className="text-sm text-gray-700">{feature.howItHelps}</p>
        </div>
      </div>
    </motion.section>
  );
}

export default function V16ReleasePage() {
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
        <div className="max-w-4xl mx-auto px-6 py-8 print:px-4 print:py-4">
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
              <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-500">
                V1.6
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold border border-green-200">
                <CheckCircle className="w-4 h-4" />
                Live Now
              </span>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              HELOC Submission Updates
            </h1>
            <p className="text-gray-600 text-lg">
              Smoother HELOC submissions with better name options, employment choices, and smart defaults.
            </p>
          </motion.div>

          {/* Quick Summary */}
          <motion.div 
            className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
          >
            <h2 className="text-lg font-bold mb-3">What's New for HELOC Submissions</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                <span>Cleaner name fields + suffix</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                <span>Updated employment options</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                <span>Cleaner income section</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>Smart address defaults</span>
              </div>
            </div>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((feature, idx) => (
              <FeatureCard key={feature.id} feature={feature} index={idx} />
            ))}
          </div>

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
