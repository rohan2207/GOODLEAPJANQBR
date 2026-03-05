"use client";

import { ArrowLeft, Printer, Copy, Check, Shield, Users, Building, FileText, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

// Plain text version for email
const emailContentPlain = `Subject: LinkAI V2.3.1 Release Notes — Ownership & Vesting Rights

LinkAI V2.3.1 is now live with Ownership & Vesting Rights information.

What's New:

• Vesting Ownership Rights — See Community Property, Joint Tenancy, Trust, etc.
• Vesting Owner — Know if it's Husband & Wife, Individual, Corporation, etc.
• Property Screen — All ownership info displayed in one place
• Application Tab — Same info available in the property modal

Now you can instantly see if a property is in a trust or how it's vested — no more guessing or searching through documents.

Questions? Use the Feedback button in LinkAI.
`;

// Rich HTML version for email
const emailContentHtml = `
<div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
  <p><strong>LinkAI V2.3.1</strong> is now live with Ownership & Vesting Rights information.</p>
  <h3 style="margin-top: 20px; margin-bottom: 10px;">What's New:</h3>
  <ul style="margin: 16px 0; padding-left: 20px;">
    <li style="margin-bottom: 12px;"><strong>Vesting Ownership Rights</strong> — See Community Property, Joint Tenancy, Trust, etc.</li>
    <li style="margin-bottom: 12px;"><strong>Vesting Owner</strong> — Know if it's Husband & Wife, Individual, Corporation, etc.</li>
    <li style="margin-bottom: 12px;"><strong>Property Screen</strong> — All ownership info displayed in one place</li>
    <li style="margin-bottom: 12px;"><strong>Application Tab</strong> — Same info available in the property modal</li>
  </ul>
  <p style="margin-top: 16px;">Now you can instantly see if a property is in a trust or how it's vested — no more guessing!</p>
  <p style="color: #666; margin-top: 20px;">Questions? Use the Feedback button in LinkAI.</p>
</div>
`;

// Feature data
const features = [
  {
    id: "vesting-rights",
    icon: Shield,
    title: "Vesting Ownership Rights",
    summary: "Know exactly how the property is held",
    description: "The Vesting Ownership Right field shows you exactly how the property is legally held. This is critical for understanding if there are any complications with the title.",
    examples: [
      "Community Property",
      "Community Property with Right of Survivorship",
      "Joint Tenancy",
      "Tenancy in Common",
      "Trust",
      "Corporation",
      "Living Trust"
    ],
    howItHelps: "Know upfront if you're dealing with a trust, joint ownership, or other complex title situations — before you're deep into the application.",
    color: "purple"
  },
  {
    id: "vesting-owner",
    icon: Users,
    title: "Vesting Owner",
    summary: "See the ownership relationship",
    description: "The Vesting Owner field tells you the relationship or type of ownership, helping you understand who actually controls the property.",
    examples: [
      "Husband and Wife",
      "Individual",
      "Unmarried Person",
      "Domestic Partners",
      "Trustees"
    ],
    howItHelps: "Quickly identify if both spouses need to sign, if it's sole ownership, or if trustees are involved.",
    color: "blue"
  },
  {
    id: "property-screen",
    icon: Building,
    title: "Property Screen Location",
    summary: "Find it in the Address & Location section",
    description: "The ownership and vesting information is now displayed directly on the Property screen, under the Address & Location section along with other property details.",
    details: [
      "Street Address, City, State, ZIP",
      "County and APN",
      "Owners (names)",
      "Vesting Owner (relationship)",
      "Vesting Ownership Right (how it's held)"
    ],
    howItHelps: "All the property ownership info you need is in one place — no switching between screens or systems.",
    color: "emerald"
  },
  {
    id: "application-tab",
    icon: FileText,
    title: "Application Tab Access",
    summary: "Also available in the property modal",
    description: "The same vesting information is also accessible through the Application tab when you open the property modal, so you can reference it while working on the loan.",
    details: [
      "Open any loan",
      "Click on the property",
      "Go to Application tab",
      "See Vesting Owner and Vesting Ownership Right"
    ],
    howItHelps: "Access ownership details right where you need them — while filling out the application.",
    color: "amber"
  }
];

// Light theme color mappings
const colorMap: { [key: string]: { bg: string; border: string; text: string; light: string; icon: string } } = {
  purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", light: "bg-purple-100", icon: "bg-purple-500" },
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
        
        {/* Examples or Details List */}
        <div className={`p-4 rounded-xl ${colors.light} mb-4`}>
          <p className="text-sm font-semibold text-gray-700 mb-2">
            {feature.examples ? "Examples:" : "Where to find it:"}
          </p>
          <ul className="space-y-1.5">
            {(feature.examples || feature.details || []).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle className={`w-4 h-4 ${colors.text} mt-0.5 flex-shrink-0`} />
                {item}
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

export default function V231ReleasePage() {
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
      {/* Hide dark overlays + Print Styles */}
      <style jsx global>{`
        .vignette-overlay, .grain-overlay { display: none !important; }
        body { background: white !important; }
        @media print {
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print { display: none !important; }
          @page { margin: 0.5in; size: letter; }
        }
      `}</style>

      <main className="min-h-screen bg-white text-gray-900 relative z-10">
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
              <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-violet-500">
                V2.3.1
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold border border-green-200">
                <CheckCircle className="w-4 h-4" />
                Live Now
              </span>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Ownership & Vesting Rights
            </h1>
            <p className="text-gray-600 text-lg">
              Instantly see if a property is in a trust, how it's vested, and who owns it — right in the Property screen.
            </p>
          </motion.div>

          {/* Quick Summary */}
          <motion.div 
            className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
          >
            <h2 className="text-lg font-bold mb-3">What's New</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>Vesting Ownership Rights</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>Vesting Owner type</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                <span>Property screen display</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                <span>Application tab access</span>
              </div>
            </div>
          </motion.div>

          {/* Why This Matters */}
          <motion.div 
            className="mb-8 p-5 rounded-2xl border-2 border-purple-200 bg-purple-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-bold text-gray-900 mb-2">Why This Matters</h3>
            <p className="text-gray-700">
              Knowing the vesting information upfront helps you identify potential title issues early. 
              If a property is in a <strong>Trust</strong>, you'll need trust documents. 
              If it's <strong>Community Property</strong>, both spouses typically need to sign. 
              Now you see this instantly — no surprises later in the process.
            </p>
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
