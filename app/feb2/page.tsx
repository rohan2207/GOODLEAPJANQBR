"use client";

import { motion } from "framer-motion";
import { Home, Lock, RefreshCw, Users, ArrowLeft, Check, Printer, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const MOTION_EASE = [0.25, 0.46, 0.45, 0.94];

// Property data from the HTML
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
      term: "30 YEARS",
      rate: "3.25%",
      borrower: "JOHNSON MICHAEL A / JOHNSON SARAH L",
      docId: "2022.08473",
      date: "Mar 15, 2022",
    },
    {
      position: 2,
      type: "HELOC",
      lender: "COMMUNITY CREDIT UNION",
      amount: "$50,000",
      term: "10 YEARS",
      rate: "5.5%",
      borrower: "JOHNSON MICHAEL A / JOHNSON SARAH L",
      docId: "2024.12456",
      date: "Jun 20, 2024",
    },
  ],
  transfers: [
    {
      type: "Deed Transfer",
      saleType: "SALE",
      price: "$385,000",
      date: "Mar 15, 2022",
      armsLength: true,
      docId: "2022.08472",
    },
  ],
  ownershipHistory: [
    {
      name: "Johnson Michael A / Johnson Sarah L",
      current: true,
      purchasedFrom: "Smith Robert J",
      price: "$385,000",
      date: "Mar 15, 2022",
      docType: "Deed Transfer",
    },
    {
      name: "Smith Robert J",
      current: false,
      purchasedFrom: "Williams David T",
      price: "$245,000",
      date: "Aug 10, 2015",
      docType: "Deed Transfer",
    },
  ],
};

function SectionCard({ 
  icon: Icon, 
  iconColor, 
  printIconColor,
  title, 
  subtitle, 
  badge,
  children,
}: { 
  icon: React.ElementType; 
  iconColor: string; 
  printIconColor: string;
  title: string; 
  subtitle?: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden print:break-inside-avoid print:shadow-none print:border-gray-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 print:border-gray-300 bg-gray-50 print:bg-gray-100">
        <div className="flex items-center gap-3">
          <Icon className={`w-6 h-6 ${iconColor} print:${printIconColor}`} />
          <div>
            <h3 className="text-gray-900 print:text-black font-semibold">{title}</h3>
            {subtitle && <p className="text-gray-500 print:text-gray-600 text-sm">{subtitle}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2 print:hidden">
          {badge}
        </div>
      </div>
      {/* Content */}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

export default function Feb2ReleasePage() {
  const handlePrint = () => {
    window.print();
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
          .print-break {
            page-break-before: always;
          }
        }
      `}</style>

      <main className="min-h-screen bg-white text-gray-900 print:bg-white">
        {/* Background effects - hidden on print */}
        <div className="fixed inset-0 pointer-events-none no-print">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-blue-50" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-8 print:px-4 print:py-4">
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

          {/* Header */}
          <div className="text-center mb-8 print:mb-6">
            <div className="flex flex-col items-center mb-4">
              <Image
                src="https://cdn.bfldr.com/Q445447Z/at/n85kkcjq5q8r3n6nf4z5jsw/LinkAI_BG_FullGradonBlk.svg?auto=webp&format=svg"
                alt="LinkAI"
                width={160}
                height={48}
                className="h-12 w-auto mb-2"
                unoptimized
              />
              <div className="flex items-center gap-3">
                <span className="text-2xl font-light tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-500 print:text-gray-800">
                  v1.5
                </span>
                <span className="text-gray-400 print:text-gray-500">•</span>
                <span className="text-gray-500 print:text-gray-600 text-sm">Release Notes • Feb 2</span>
              </div>
            </div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 print:bg-emerald-50 border border-emerald-200 mb-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500 no-print" />
              <span className="text-emerald-700 text-sm font-medium">New Feature: Property Intelligence</span>
            </div>
            
            <p className="text-gray-600 print:text-gray-700 text-sm max-w-2xl mx-auto mb-6">
              Expanded property data now available directly within the loan officer workflow.
            </p>
          </div>

          {/* How to Access */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: MOTION_EASE }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 print:from-gray-50 print:to-gray-100 border border-blue-200 print:border-gray-300 rounded-xl p-5 mb-6 print:break-inside-avoid"
          >
            <h3 className="text-base font-semibold text-gray-900 print:text-black mb-2">How to Access</h3>
            <p className="text-gray-600 print:text-gray-700 text-sm mb-3">
              Navigate to the Property Details page and scroll down to find these new expandable sections:
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white print:bg-gray-50 border border-gray-200 print:border-gray-300 rounded-full text-sm text-gray-700 print:text-gray-800">
                <Home className="w-4 h-4 text-emerald-500" />
                Last Market Sale
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white print:bg-gray-50 border border-gray-200 print:border-gray-300 rounded-full text-sm text-gray-700 print:text-gray-800">
                <Lock className="w-4 h-4 text-amber-500" />
                Open Liens
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white print:bg-gray-50 border border-gray-200 print:border-gray-300 rounded-full text-sm text-gray-700 print:text-gray-800">
                <RefreshCw className="w-4 h-4 text-blue-500" />
                Transfers
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white print:bg-gray-50 border border-gray-200 print:border-gray-300 rounded-full text-sm text-gray-700 print:text-gray-800">
                <Users className="w-4 h-4 text-purple-500" />
                Ownership History
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </span>
            </div>
          </motion.div>

          {/* Expandable Sections */}
          <div className="space-y-4">
            {/* Last Market Sale */}
            <SectionCard
              icon={Home}
              iconColor="text-emerald-500"
              printIconColor="text-emerald-600"
              title="Last Market Sale"
              subtitle={propertyData.lastSale.price}
            >
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                <div>
                  <p className="text-gray-400 print:text-gray-500 text-xs mb-1">Sale Price</p>
                  <p className="text-gray-900 print:text-black font-semibold">{propertyData.lastSale.price}</p>
                </div>
                <div>
                  <p className="text-gray-400 print:text-gray-500 text-xs mb-1">Recorded</p>
                  <p className="text-gray-900 print:text-black font-semibold">{propertyData.lastSale.recorded}</p>
                </div>
                <div>
                  <p className="text-gray-400 print:text-gray-500 text-xs mb-1">Seller</p>
                  <p className="text-gray-900 print:text-black font-semibold">{propertyData.lastSale.seller}</p>
                </div>
                <div>
                  <p className="text-gray-400 print:text-gray-500 text-xs mb-1">Buyer</p>
                  <p className="text-gray-900 print:text-black font-semibold text-xs">{propertyData.lastSale.buyer}</p>
                </div>
                <div>
                  <p className="text-gray-400 print:text-gray-500 text-xs mb-1">Doc ID</p>
                  <p className="text-gray-900 print:text-black font-semibold">{propertyData.lastSale.docId}</p>
                </div>
              </div>
            </SectionCard>

            {/* Open Liens */}
            <SectionCard
              icon={Lock}
              iconColor="text-amber-500"
              printIconColor="text-amber-600"
              title="Open Liens (2)"
              subtitle="$358,000 • 77% LTV"
              badge={
                <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-medium rounded-full">
                  Multiple Liens
                </span>
              }
            >
              <div className="space-y-3">
                {propertyData.liens.map((lien, idx) => (
                  <div key={idx} className="bg-gray-50 print:bg-gray-100 border border-gray-200 print:border-gray-300 rounded-lg p-3 print:break-inside-avoid">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-3 text-sm">
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-amber-500 print:bg-amber-600 flex items-center justify-center flex-shrink-0 mt-3">
                          <span className="text-white text-xs font-bold">{lien.position}</span>
                        </div>
                        <div>
                          <p className="text-gray-400 print:text-gray-500 text-xs mb-0.5">Position</p>
                          <p className="text-gray-900 print:text-black font-semibold text-xs">{lien.type}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-400 print:text-gray-500 text-xs mb-0.5">Lender</p>
                        <p className="text-gray-900 print:text-black font-semibold text-xs">{lien.lender}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 print:text-gray-500 text-xs mb-0.5">Loan Amount</p>
                        <p className="text-gray-900 print:text-black font-semibold">{lien.amount}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 print:text-gray-500 text-xs mb-0.5">Type / Term</p>
                        <p className="text-gray-900 print:text-black font-semibold text-xs">{lien.type}</p>
                        <p className="text-gray-500 print:text-gray-600 text-xs">{lien.term}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 print:text-gray-500 text-xs mb-0.5">Rate</p>
                        <p className="text-gray-900 print:text-black font-semibold">{lien.rate}</p>
                        {lien.rate !== "—" && <p className="text-gray-500 print:text-gray-600 text-xs">EST</p>}
                      </div>
                    </div>
                    <div className="border-t border-gray-200 print:border-gray-300 pt-2 flex flex-wrap justify-between items-center gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <span className="text-gray-400 print:text-gray-500">Borrower:</span>
                        <span className="text-gray-700 print:text-gray-800">{lien.borrower}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <span className="text-gray-400 print:text-gray-500">Doc ID:</span>
                          <span className="text-gray-700 print:text-gray-800">{lien.docId}</span>
                        </div>
                        <span className="text-gray-300 print:text-gray-400">|</span>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-400 print:text-gray-500">Date:</span>
                          <span className="text-gray-700 print:text-gray-800">{lien.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Transfers & Conveyances */}
            <SectionCard
              icon={RefreshCw}
              iconColor="text-blue-500"
              printIconColor="text-blue-600"
              title="Transfers & Conveyances"
              subtitle="Current Owner Transaction History"
            >
              {propertyData.transfers.map((transfer, idx) => (
                <div key={idx} className="bg-gray-50 print:bg-gray-100 border border-gray-200 print:border-gray-300 rounded-lg p-3 print:break-inside-avoid">
                  <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                    <div>
                      <p className="text-gray-400 print:text-gray-500 text-xs mb-0.5">Transaction</p>
                      <p className="text-gray-900 print:text-black font-semibold">{transfer.type}</p>
                      <p className="text-gray-500 print:text-gray-600 text-xs">{transfer.saleType}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 print:text-gray-500 text-xs mb-0.5">Sale Price</p>
                      <p className="text-gray-900 print:text-black font-semibold">{transfer.price}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 print:text-gray-500 text-xs mb-0.5">Date</p>
                      <p className="text-gray-900 print:text-black font-semibold">{transfer.date}</p>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 print:border-gray-300 pt-2 flex items-center gap-2 text-xs">
                    {transfer.armsLength && (
                      <span className="px-2 py-0.5 bg-emerald-500 print:bg-emerald-600 text-white text-xs font-medium rounded-full flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Arms Length
                      </span>
                    )}
                    <span className="text-gray-300 print:text-gray-400">|</span>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400 print:text-gray-500">Doc ID:</span>
                      <span className="text-gray-700 print:text-gray-800">{transfer.docId}</span>
                    </div>
                  </div>
                </div>
              ))}
            </SectionCard>

            {/* Ownership History */}
            <SectionCard
              icon={Users}
              iconColor="text-purple-500"
              printIconColor="text-purple-600"
              title="Ownership History (2)"
              subtitle="Complete ownership chain for this property"
            >
              <div className="space-y-3">
                {propertyData.ownershipHistory.map((owner, idx) => (
                  <div key={idx} className="bg-gray-50 print:bg-gray-100 border border-gray-200 print:border-gray-300 rounded-lg p-3 print:break-inside-avoid">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-gray-900 print:text-black font-semibold text-sm">{owner.name}</p>
                          {owner.current && (
                            <span className="px-2 py-0.5 bg-emerald-500 print:bg-emerald-600 text-white text-xs font-medium rounded-full">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-gray-500 print:text-gray-600 text-xs">Purchased from: {owner.purchasedFrom}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-900 print:text-black font-semibold text-sm">{owner.price}</p>
                        <p className="text-gray-500 print:text-gray-600 text-xs">{owner.date}</p>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 print:border-gray-300 pt-2 grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-400 print:text-gray-500 text-xs mb-0.5">Document Type</p>
                        <p className="text-gray-900 print:text-black font-semibold text-sm">{owner.docType}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 print:text-gray-500 text-xs mb-0.5">Title Company</p>
                        <p className="text-gray-900 print:text-black font-semibold text-sm">—</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center print:mt-6">
            <p className="text-gray-400 print:text-gray-500 text-xs">
              LinkAI v1.5 • Feb 2 Release • Property Intelligence
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
