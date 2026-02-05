"use client";

import { motion } from "framer-motion";
import { Home, Lock, RefreshCw, Users, ArrowLeft, Check, Printer, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const MOTION_EASE = [0.25, 0.46, 0.45, 0.94];

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

export default function Feb2ReleasePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Print Styles - Optimized for 1 page */}
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
            margin: 0.4in;
            size: letter;
          }
        }
      `}</style>

      <main className="min-h-screen bg-white text-gray-900 print:bg-white">
        {/* Background effects - hidden on print */}
        <div className="fixed inset-0 pointer-events-none no-print">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-blue-50" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-8 print:px-0 print:py-2 print:max-w-none">
          {/* Navigation - hidden on print */}
          <div className="flex items-center justify-between mb-8 no-print">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Main</span>
            </Link>
            
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span className="text-sm font-medium">Print / Save PDF</span>
            </button>
          </div>

          {/* Header - Compact for print */}
          <div className="text-center mb-6 print:mb-3">
            <div className="flex flex-col items-center mb-3 print:mb-2">
              <Image
                src="https://cdn.bfldr.com/Q445447Z/at/n85kkcjq5q8r3n6nf4z5jsw/LinkAI_BG_FullGradonBlk.svg?auto=webp&format=svg"
                alt="LinkAI"
                width={160}
                height={48}
                className="h-12 print:h-8 w-auto mb-2 print:mb-1"
                unoptimized
              />
              <div className="flex items-center gap-2">
                <span className="text-2xl print:text-lg font-light tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-500 print:text-gray-800">
                  v1.5
                </span>
                <span className="text-gray-400 print:text-gray-500">•</span>
                <span className="text-gray-500 print:text-gray-600 text-sm print:text-xs">Release Notes • Feb 2</span>
              </div>
            </div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 print:py-0.5 rounded-full bg-emerald-100 print:bg-emerald-50 border border-emerald-200 mb-3 print:mb-2">
              <span className="text-emerald-700 text-sm print:text-xs font-medium">New Feature: Property Intelligence</span>
            </div>
          </div>

          {/* How to Access - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: MOTION_EASE }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 print:from-gray-50 print:to-gray-100 border border-blue-200 print:border-gray-300 rounded-lg print:rounded p-4 print:p-2 mb-4 print:mb-3"
          >
            <p className="text-gray-700 print:text-gray-800 text-sm print:text-xs mb-2 print:mb-1">
              <span className="font-semibold">How to Access:</span> Navigate to Property Details and scroll down to find these expandable sections:
            </p>
            <div className="flex flex-wrap gap-2 print:gap-1">
              {[
                { icon: Home, color: "text-emerald-500", label: "Last Market Sale" },
                { icon: Lock, color: "text-amber-500", label: "Open Liens" },
                { icon: RefreshCw, color: "text-blue-500", label: "Transfers" },
                { icon: Users, color: "text-purple-500", label: "Ownership History" },
              ].map((item) => (
                <span key={item.label} className="inline-flex items-center gap-1 px-2 py-1 print:py-0.5 bg-white print:bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-700">
                  <item.icon className={`w-3 h-3 ${item.color}`} />
                  {item.label}
                  <ChevronDown className="w-2.5 h-2.5 text-gray-400" />
                </span>
              ))}
            </div>
          </motion.div>

          {/* Compact 2x2 Grid for Print */}
          <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-3 print:gap-2">
            {/* Last Market Sale */}
            <div className="bg-white border border-gray-200 rounded-lg print:rounded overflow-hidden">
              <div className="flex items-center gap-2 p-3 print:p-2 border-b border-gray-100 bg-gray-50">
                <Home className="w-4 h-4 print:w-3 print:h-3 text-emerald-500" />
                <h3 className="text-gray-900 font-semibold text-sm print:text-xs">Last Market Sale</h3>
                <span className="text-gray-500 text-xs print:text-[10px] ml-auto">{propertyData.lastSale.price}</span>
              </div>
              <div className="p-3 print:p-2 grid grid-cols-2 gap-2 print:gap-1 text-xs print:text-[10px]">
                <div><span className="text-gray-400">Price:</span> <span className="font-medium">{propertyData.lastSale.price}</span></div>
                <div><span className="text-gray-400">Date:</span> <span className="font-medium">{propertyData.lastSale.recorded}</span></div>
                <div><span className="text-gray-400">Seller:</span> <span className="font-medium">{propertyData.lastSale.seller}</span></div>
                <div><span className="text-gray-400">Doc ID:</span> <span className="font-medium">{propertyData.lastSale.docId}</span></div>
                <div className="col-span-2"><span className="text-gray-400">Buyer:</span> <span className="font-medium">{propertyData.lastSale.buyer}</span></div>
              </div>
            </div>

            {/* Open Liens */}
            <div className="bg-white border border-gray-200 rounded-lg print:rounded overflow-hidden">
              <div className="flex items-center gap-2 p-3 print:p-2 border-b border-gray-100 bg-gray-50">
                <Lock className="w-4 h-4 print:w-3 print:h-3 text-amber-500" />
                <h3 className="text-gray-900 font-semibold text-sm print:text-xs">Open Liens (2)</h3>
                <span className="text-gray-500 text-xs print:text-[10px] ml-auto">$358,000 • 77% LTV</span>
              </div>
              <div className="p-3 print:p-2 space-y-2 print:space-y-1">
                {propertyData.liens.map((lien, idx) => (
                  <div key={idx} className="bg-gray-50 rounded p-2 print:p-1 text-xs print:text-[10px]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-4 h-4 print:w-3 print:h-3 rounded-full bg-amber-500 text-white text-[10px] print:text-[8px] flex items-center justify-center font-bold">{lien.position}</span>
                      <span className="font-medium">{lien.type}</span>
                      <span className="ml-auto font-semibold">{lien.amount}</span>
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-gray-600 print:text-[9px]">
                      <span>{lien.lender}</span>
                      <span>{lien.term} @ {lien.rate}</span>
                      <span>{lien.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transfers & Conveyances */}
            <div className="bg-white border border-gray-200 rounded-lg print:rounded overflow-hidden">
              <div className="flex items-center gap-2 p-3 print:p-2 border-b border-gray-100 bg-gray-50">
                <RefreshCw className="w-4 h-4 print:w-3 print:h-3 text-blue-500" />
                <h3 className="text-gray-900 font-semibold text-sm print:text-xs">Transfers & Conveyances</h3>
              </div>
              <div className="p-3 print:p-2">
                <div className="bg-gray-50 rounded p-2 print:p-1 text-xs print:text-[10px]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">{propertyData.transfers.type}</span>
                    <span className="font-semibold">{propertyData.transfers.price}</span>
                  </div>
                  <div className="flex gap-3 text-gray-600 print:text-[9px]">
                    <span>{propertyData.transfers.date}</span>
                    <span className="flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-500" />
                      Arms Length
                    </span>
                    <span>Doc: {propertyData.transfers.docId}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ownership History */}
            <div className="bg-white border border-gray-200 rounded-lg print:rounded overflow-hidden">
              <div className="flex items-center gap-2 p-3 print:p-2 border-b border-gray-100 bg-gray-50">
                <Users className="w-4 h-4 print:w-3 print:h-3 text-purple-500" />
                <h3 className="text-gray-900 font-semibold text-sm print:text-xs">Ownership History (2)</h3>
              </div>
              <div className="p-3 print:p-2 space-y-2 print:space-y-1">
                {propertyData.ownershipHistory.map((owner, idx) => (
                  <div key={idx} className="bg-gray-50 rounded p-2 print:p-1 text-xs print:text-[10px]">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-medium">{owner.name}</span>
                        {owner.current && (
                          <span className="ml-1 px-1.5 py-0.5 bg-emerald-500 text-white text-[9px] print:text-[8px] rounded-full">Current</span>
                        )}
                        <p className="text-gray-500 print:text-[9px]">From: {owner.from}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{owner.price}</p>
                        <p className="text-gray-500 print:text-[9px]">{owner.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 print:mt-2 text-center">
            <p className="text-gray-400 text-xs print:text-[10px]">
              LinkAI v1.5 • Feb 2 Release • Property Intelligence
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
