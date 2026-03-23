"use client";

import { ArrowLeft, Printer, Copy, Check, Home, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

const emailContentPlain = `Subject: LinkAI V2.3.2 Release Notes — PACE Lien & Property Status

LinkAI V2.3.2 is now live. The headline addition is PACE Lien on Property Status — plus you still see your other property status chips (Listed for Sale, In HOA, and more) when the data supports them. Liabilities also gets faster access to full account numbers.

What's New:

• PACE Lien (priority) — New badge in Property Status on the Property tab when a PACE lien applies. This is the most important new signal for payoff and disclosures.
• Other Property Status — Continue to see indicators like Listed for Sale, In HOA, and additional status chips alongside PACE when applicable — not every loan shows every badge.
• Account numbers — In Liabilities, hover masked account numbers for the full number and quick copy.

Questions? Use the Feedback button in LinkAI.
`;

const emailContentHtml = `
<div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
  <p><strong>LinkAI V2.3.2</strong> is now live. The headline addition is <strong>PACE Lien</strong> on Property Status — plus you still see your other property status chips (Listed for Sale, In HOA, and more) when the data supports them. Liabilities also gets faster access to full account numbers.</p>
  <h3 style="margin-top: 20px; margin-bottom: 10px;">What's New:</h3>
  <ul style="margin: 16px 0; padding-left: 20px;">
    <li style="margin-bottom: 12px;"><strong>PACE Lien (priority)</strong> — New badge in Property Status on the Property tab when a PACE lien applies. Most important new signal for payoff and disclosures.</li>
    <li style="margin-bottom: 12px;"><strong>Other Property Status</strong> — Listed for Sale, In HOA, and additional chips alongside PACE when applicable; not every loan shows every badge.</li>
    <li style="margin-bottom: 12px;"><strong>Account numbers</strong> — In Liabilities, hover masked numbers for the full account and quick copy.</li>
  </ul>
  <p style="color: #666; margin-top: 20px;">Questions? Use the Feedback button in LinkAI.</p>
</div>
`;

type FeatureScreenshot = {
  src: string;
  alt: string;
  caption: string;
};

const features: Array<{
  id: string;
  icon: typeof Home;
  title: string;
  summary: string;
  description: string;
  examples?: string[];
  details?: string[];
  howItHelps: string;
  color: "blue" | "emerald";
  screenshots?: FeatureScreenshot[];
  wide?: boolean;
}> = [
  {
    id: "pace-lien-property-status",
    icon: Home,
    title: "PACE Lien & Property Status indicators",
    summary: "PACE Lien is the headline addition; other chips show when data supports them",
    description:
      "The Property tab’s Property Status section now surfaces a PACE Lien badge when it applies — the clearest early warning for PACE-related payoff and disclosure work. You’ll also continue to see other status indicators you already rely on — for example Listed for Sale and In HOA — plus additional property status signals when the data supports them. Not every loan displays every badge; you only see what applies to that property.",
    examples: [
      "Property tab → Property Status",
      "PACE Lien (priority) when a PACE lien is present",
      "Other indicators (e.g. Listed for Sale, In HOA) appear alongside when applicable",
    ],
    howItHelps:
      "PACE can change qualification and payoff math — calling it out in Property Status first keeps the file accurate early. The rest of your status chips still tell the full story when the data is there.",
    color: "blue",
    wide: true,
    screenshots: [
      {
        src: "/Screenshots/v2-3-2/property-status-pace-lien-and-hoa.png",
        alt: "Property Status showing PACE Lien and In HOA indicators",
        caption: "PACE Lien (highlight addition) alongside another Property Status indicator — example: In HOA.",
      },
      {
        src: "/Screenshots/v2-3-2/property-status-listed-for-sale-and-hoa.png",
        alt: "Property Status showing Listed for Sale and In HOA",
        caption: "Other combinations you may see include Listed for Sale, In HOA, and more — only when applicable to the loan.",
      },
    ],
  },
  {
    id: "liabilities-account-copy",
    icon: Copy,
    title: "Full account numbers in Liabilities",
    summary: "Hover masked numbers for the full account and one-click copy",
    description:
      "In Liabilities (e.g. Open Accounts), account numbers may display masked for privacy. Hover the masked value to open a tooltip with the full account number and a copy control so you can paste it elsewhere instantly.",
    details: [
      "Go to Liabilities / Open Accounts",
      "Hover the masked account number in the Account column",
      "Read the full number in the tooltip",
      "Use quick copy from the tooltip when you need it",
    ],
    howItHelps:
      "No more asking ops for full numbers or switching tools — copy what you need while you stay in the loan file.",
    color: "emerald",
    screenshots: [
      {
        src: "/Screenshots/v2-3-2/liabilities-account-hover-copy.png",
        alt: "Liabilities Open Accounts table with hover tooltip showing full account number and copy",
        caption: "Hover a masked account number to reveal the full number and quick copy.",
      },
    ],
  },
];

const colorMap: { [key: string]: { bg: string; border: string; text: string; light: string; icon: string } } = {
  blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", light: "bg-blue-100", icon: "bg-blue-500" },
  emerald: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", light: "bg-emerald-100", icon: "bg-emerald-500" },
};

function FeatureCard({ feature, index }: { feature: (typeof features)[0]; index: number }) {
  const colors = colorMap[feature.color];
  const Icon = feature.icon;
  const wide = feature.wide;

  return (
    <motion.section
      id={feature.id}
      className={`rounded-2xl border-2 ${colors.border} bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow ${wide ? "md:col-span-2" : ""}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.1 }}
    >
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

      <div className="p-5">
        <p className="text-gray-700 mb-4">{feature.description}</p>

        {feature.screenshots && feature.screenshots.length > 0 && (
          <div
            className={`mb-4 grid gap-4 ${feature.screenshots.length > 1 ? "sm:grid-cols-2" : "grid-cols-1"}`}
          >
            {feature.screenshots.map((shot) => (
              <figure
                key={shot.src}
                className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-sm"
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={720}
                  height={400}
                  className="h-auto w-full object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <figcaption className="border-t border-gray-200 px-3 py-2 text-sm text-gray-600">{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
        )}

        <div className={`p-4 rounded-xl ${colors.light} mb-4`}>
          <p className="text-sm font-semibold text-gray-700 mb-2">
            {feature.examples ? "What to expect:" : "Where to find it:"}
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

        <div className={`p-4 rounded-xl border-2 ${colors.border} ${colors.bg}`}>
          <p className="text-sm font-semibold text-gray-900 mb-1">How this helps you:</p>
          <p className="text-sm text-gray-700">{feature.howItHelps}</p>
        </div>
      </div>
    </motion.section>
  );
}

export default function V232ReleasePage() {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = async () => {
    try {
      const htmlBlob = new Blob([emailContentHtml], { type: "text/html" });
      const textBlob = new Blob([emailContentPlain], { type: "text/plain" });

      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": htmlBlob,
          "text/plain": textBlob,
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
      <style jsx global>{`
        .vignette-overlay,
        .grain-overlay {
          display: none !important;
        }
        body {
          background: white !important;
        }
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

      <main className="min-h-screen bg-white text-gray-900 relative z-10">
        <div className="max-w-4xl mx-auto px-6 py-8 print:px-4 print:py-4">
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
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors text-sm font-medium shadow-sm"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Copied!" : "Copy Email"}</span>
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors text-sm font-medium shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Print</span>
              </button>
            </div>
          </motion.div>

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
              <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-sky-600">
                V2.3.2
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold border border-green-200">
                <CheckCircle className="w-4 h-4" />
                Live Now
              </span>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">PACE Lien, Property Status & Liabilities</h1>
            <p className="text-gray-600 text-lg">
              <strong className="text-gray-800">PACE Lien</strong> is the headline: it now appears in Property Status when
              it applies. You&apos;ll still see your other property status chips — Listed for Sale, In HOA, and more —
              when the data supports them. Liabilities adds hover-to-reveal full account numbers with quick copy.
            </p>
          </motion.div>

          <motion.div
            className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-blue-500 to-sky-600 text-white shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
          >
            <h2 className="text-lg font-bold mb-3">What&apos;s New</h2>
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <Home className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>PACE Lien (priority)</strong> — New Property Status badge when a PACE lien applies; works
                  alongside your other status indicators.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Home className="w-5 h-5 mt-0.5 flex-shrink-0 opacity-80" />
                <span>
                  <strong>Other Property Status</strong> — Listed for Sale, In HOA, and additional chips only when
                  applicable (not every loan shows every badge).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Copy className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Liabilities</strong> — Hover masked account numbers for the full number and quick copy.
                </span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="mb-8 p-5 rounded-2xl border-2 border-blue-200 bg-blue-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-bold text-gray-900 mb-2">Why this matters</h3>
            <p className="text-gray-700">
              <strong>PACE</strong> is the most important new signal in this release — it can change payoff and disclosure
              work when it&apos;s on the file. The rest of Property Status still rounds out the picture (sale status, HOA,
              etc.) when the data is there. <strong>Full account numbers</strong> in Liabilities save time when you&apos;re
              reconciling credit or talking to a creditor — without leaving the loan.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((feature, idx) => (
              <FeatureCard key={feature.id} feature={feature} index={idx} />
            ))}
          </div>

          <motion.div
            className="mt-8 p-5 rounded-2xl bg-white border border-gray-200 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-gray-600">
              <strong className="text-gray-900">Questions?</strong> Use the <span className="font-medium">Feedback</span>{" "}
              button in LinkAI or contact your manager.
            </p>
          </motion.div>
        </div>
      </main>
    </>
  );
}
