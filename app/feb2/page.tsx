"use client";

import { Home, Lock, RefreshCw, Users, ArrowLeft, Printer, Copy, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// Property data - TEST DATA (not real PII)
const propertyData = {
  lastSale: {
    price: "$385,000",
    recorded: "Mar 15, 2022",
    seller: "SMITH ROBERT J",
    buyer: "JOHNSON MICHAEL A / JOHNSON SARAH L",
    docId: "2022.08472",
  },
  liens: [
    {
      position: 1,
      type: "CONVENTIONAL",
      lender: "FIRST NATIONAL BANK",
      amount: "$308,000",
      term: "30 YRS",
      rate: "3.25%",
      date: "Mar 15, 2022",
    },
    {
      position: 2,
      type: "HELOC",
      lender: "COMMUNITY CREDIT UNION",
      amount: "$50,000",
      term: "10 YRS",
      rate: "5.5%",
      date: "Jun 20, 2024",
    },
  ],
  transfers: {
    type: "Deed Transfer",
    price: "$385,000",
    date: "Mar 15, 2022",
    docId: "2022.08472",
  },
  ownershipHistory: [
    {
      name: "Johnson Michael A / Johnson Sarah L",
      current: true,
      from: "Smith Robert J",
      price: "$385,000",
      date: "Mar 15, 2022",
    },
    {
      name: "Smith Robert J",
      current: false,
      from: "Williams David T",
      price: "$245,000",
      date: "Aug 10, 2015",
    },
  ],
};

const emailContent = `Subject: LinkAI V1.5 Release Notes // February 5th, 2026

Effective February 5th, 2026, LinkAI V1.5 is released to production.

Release Notes:

Enhancement to 'Property' tab in LinkAI — All relevant data from DataTree is now feeding directly into LinkAI with four new expandable sections:

• Last Market Sale — View complete sale history including sale price, recorded date, seller/buyer information, and document ID. No more switching to external systems.

• Open Liens — Instantly see all open liens on the property with lender details, loan amounts, terms, rates, and LTV calculations. Multiple liens are clearly labeled and organized.

• Transfers & Conveyances — Access the current owner's complete transaction history with deed transfer details, sale prices, and arms-length transaction indicators.

• Ownership History — View the complete ownership chain for any property, showing all previous owners, purchase prices, and transaction dates.

How to Access: Navigate to any loan in LinkAI → Click the 'Property' tab → Scroll down to find the new expandable sections.

Questions? Contact the LinkAI Support Team.
`;

export default function Feb2ReleasePage() {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(emailContent);
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

      <main className="min-h-screen bg-gray-100 text-gray-900 print:bg-white">
        <div className="max-w-3xl mx-auto px-4 py-8 print:px-0 print:py-4">
          {/* Navigation - hidden on print */}
          <div className="flex items-center justify-between mb-6 no-print">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Main</span>
            </Link>
            
            <div className="flex gap-2">
              <Link
                href="/releases"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
              >
                All Releases
              </Link>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span className="text-sm font-medium">{copied ? "Copied!" : "Copy Email"}</span>
              </button>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span className="text-sm font-medium">Print</span>
              </button>
            </div>
          </div>

          {/* Email Container */}
          <div className="bg-white rounded-lg print:rounded-none shadow-lg print:shadow-none border border-gray-200 print:border-0 overflow-hidden">
            {/* Email Header */}
            <div className="bg-gray-50 print:bg-white border-b border-gray-200 print:border-gray-300 p-4 print:p-2">
              <div className="flex items-center gap-3 mb-3 print:mb-2">
                <Image
                  src="https://cdn.bfldr.com/Q445447Z/at/n85kkcjq5q8r3n6nf4z5jsw/LinkAI_BG_FullGradonBlk.svg?auto=webp&format=svg"
                  alt="LinkAI"
                  width={100}
                  height={30}
                  className="h-8 print:h-6 w-auto"
                  unoptimized
                />
              </div>
              <div className="text-sm print:text-xs">
                <p className="text-gray-500 print:text-gray-600 mb-1"><span className="font-semibold text-gray-700 print:text-gray-800">Subject:</span> LinkAI V1.5 Release Notes // February 5th, 2026</p>
              </div>
            </div>

            {/* Email Body */}
            <div className="p-6 print:p-4">
              {/* Opening */}
              <p className="text-gray-800 print:text-black mb-6 print:mb-4 print:text-sm">
                Effective February 5th, 2026, <strong>LinkAI V1.5</strong> is released to production.
              </p>

              {/* Release Notes Header */}
              <h2 className="text-lg print:text-base font-bold text-gray-900 print:text-black mb-2 print:mb-1">Release Notes:</h2>
              <p className="text-gray-700 print:text-gray-800 mb-4 print:mb-3 print:text-sm">
                Enhancement to <strong>'Property' tab</strong> in LinkAI — All relevant data from DataTree is now feeding directly into LinkAI with four new expandable sections:
              </p>

              {/* Bullet Points */}
              <ul className="space-y-3 print:space-y-2 mb-6 print:mb-4">
                <li className="flex gap-3 print:gap-2">
                  <span className="flex-shrink-0 w-6 h-6 print:w-5 print:h-5 rounded-full bg-emerald-100 print:bg-emerald-50 flex items-center justify-center">
                    <Home className="w-3.5 h-3.5 print:w-3 print:h-3 text-emerald-600" />
                  </span>
                  <div className="print:text-sm">
                    <strong>Last Market Sale</strong> — View complete sale history including sale price, recorded date, seller/buyer information, and document ID. No more switching to external systems.
                  </div>
                </li>
                <li className="flex gap-3 print:gap-2">
                  <span className="flex-shrink-0 w-6 h-6 print:w-5 print:h-5 rounded-full bg-amber-100 print:bg-amber-50 flex items-center justify-center">
                    <Lock className="w-3.5 h-3.5 print:w-3 print:h-3 text-amber-600" />
                  </span>
                  <div className="print:text-sm">
                    <strong>Open Liens</strong> — Instantly see all open liens on the property with lender details, loan amounts, terms, rates, and LTV calculations. Multiple liens are clearly labeled and organized.
                  </div>
                </li>
                <li className="flex gap-3 print:gap-2">
                  <span className="flex-shrink-0 w-6 h-6 print:w-5 print:h-5 rounded-full bg-blue-100 print:bg-blue-50 flex items-center justify-center">
                    <RefreshCw className="w-3.5 h-3.5 print:w-3 print:h-3 text-blue-600" />
                  </span>
                  <div className="print:text-sm">
                    <strong>Transfers & Conveyances</strong> — Access the current owner's complete transaction history with deed transfer details, sale prices, and arms-length transaction indicators.
                  </div>
                </li>
                <li className="flex gap-3 print:gap-2">
                  <span className="flex-shrink-0 w-6 h-6 print:w-5 print:h-5 rounded-full bg-purple-100 print:bg-purple-50 flex items-center justify-center">
                    <Users className="w-3.5 h-3.5 print:w-3 print:h-3 text-purple-600" />
                  </span>
                  <div className="print:text-sm">
                    <strong>Ownership History</strong> — View the complete ownership chain for any property, showing all previous owners, purchase prices, and transaction dates.
                  </div>
                </li>
              </ul>

              {/* How to Access */}
              <div className="bg-blue-50 print:bg-gray-100 border border-blue-200 print:border-gray-300 rounded-lg print:rounded p-4 print:p-3 mb-6 print:mb-4">
                <p className="text-sm print:text-xs text-gray-700 print:text-gray-800">
                  <strong>How to Access:</strong> Navigate to any loan in LinkAI → Click the 'Property' tab → Scroll down to find the new expandable sections.
                </p>
              </div>

              {/* Screenshots Section */}
              <h3 className="text-base print:text-sm font-bold text-gray-900 print:text-black mb-3 print:mb-2">Screenshots:</h3>
              
              {/* Screenshot Grid - Compact for Print */}
              <div className="grid grid-cols-2 gap-3 print:gap-2 mb-6 print:mb-4">
                {/* Last Market Sale */}
                <div className="bg-white border border-gray-200 rounded-lg print:rounded overflow-hidden">
                  <div className="flex items-center gap-2 p-2 print:p-1.5 border-b border-gray-100 bg-gray-50">
                    <Home className="w-4 h-4 print:w-3 print:h-3 text-emerald-500" />
                    <span className="text-gray-900 font-semibold text-xs print:text-[10px]">Last Market Sale</span>
                  </div>
                  <div className="p-2 print:p-1.5 text-[10px] print:text-[9px] space-y-1">
                    <div className="flex justify-between"><span className="text-gray-400">Price:</span><span className="font-medium">{propertyData.lastSale.price}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Date:</span><span className="font-medium">{propertyData.lastSale.recorded}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Seller:</span><span className="font-medium">{propertyData.lastSale.seller}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Doc ID:</span><span className="font-medium">{propertyData.lastSale.docId}</span></div>
                  </div>
                </div>

                {/* Open Liens */}
                <div className="bg-white border border-gray-200 rounded-lg print:rounded overflow-hidden">
                  <div className="flex items-center gap-2 p-2 print:p-1.5 border-b border-gray-100 bg-gray-50">
                    <Lock className="w-4 h-4 print:w-3 print:h-3 text-amber-500" />
                    <span className="text-gray-900 font-semibold text-xs print:text-[10px]">Open Liens (2)</span>
                  </div>
                  <div className="p-2 print:p-1.5 space-y-1">
                    {propertyData.liens.map((lien, idx) => (
                      <div key={idx} className="bg-gray-50 rounded p-1.5 print:p-1 text-[10px] print:text-[9px]">
                        <div className="flex items-center gap-1 font-medium">
                          <span className="w-3 h-3 print:w-2.5 print:h-2.5 rounded-full bg-amber-500 text-white text-[8px] flex items-center justify-center">{lien.position}</span>
                          {lien.type} — {lien.amount}
                        </div>
                        <div className="text-gray-500 text-[9px] print:text-[8px]">{lien.lender} • {lien.rate}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transfers */}
                <div className="bg-white border border-gray-200 rounded-lg print:rounded overflow-hidden">
                  <div className="flex items-center gap-2 p-2 print:p-1.5 border-b border-gray-100 bg-gray-50">
                    <RefreshCw className="w-4 h-4 print:w-3 print:h-3 text-blue-500" />
                    <span className="text-gray-900 font-semibold text-xs print:text-[10px]">Transfers</span>
                  </div>
                  <div className="p-2 print:p-1.5 text-[10px] print:text-[9px]">
                    <div className="flex justify-between font-medium mb-1">
                      <span>{propertyData.transfers.type}</span>
                      <span>{propertyData.transfers.price}</span>
                    </div>
                    <div className="text-gray-500 text-[9px] print:text-[8px]">{propertyData.transfers.date} • Arms Length</div>
                  </div>
                </div>

                {/* Ownership History */}
                <div className="bg-white border border-gray-200 rounded-lg print:rounded overflow-hidden">
                  <div className="flex items-center gap-2 p-2 print:p-1.5 border-b border-gray-100 bg-gray-50">
                    <Users className="w-4 h-4 print:w-3 print:h-3 text-purple-500" />
                    <span className="text-gray-900 font-semibold text-xs print:text-[10px]">Ownership History</span>
                  </div>
                  <div className="p-2 print:p-1.5 space-y-1">
                    {propertyData.ownershipHistory.map((owner, idx) => (
                      <div key={idx} className="text-[10px] print:text-[9px] flex justify-between">
                        <span className="font-medium">{owner.name.split(' / ')[0]}{owner.current && <span className="ml-1 text-emerald-600 text-[8px]">Current</span>}</span>
                        <span className="text-gray-500">{owner.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Closing */}
              <p className="text-gray-600 print:text-gray-700 text-sm print:text-xs">
                Questions? Contact the LinkAI Support Team.
              </p>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 print:bg-white border-t border-gray-200 print:border-gray-300 px-6 py-3 print:px-4 print:py-2">
              <p className="text-gray-400 print:text-gray-500 text-xs print:text-[10px] text-center">
                LinkAI V1.5 • February 5th, 2026 • Property Intelligence Release
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
