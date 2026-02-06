"use client";

import { ArrowLeft, Calendar, ChevronRight, Home, Lock, RefreshCw, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// All release notes stored here - add new releases at the top
const releases = [
  {
    version: "1.5",
    date: "February 5th, 2026",
    slug: "feb2",
    title: "Property Intelligence",
    summary: "Enhancement to 'Property' tab — All relevant data from DataTree now feeds directly into LinkAI",
    bullets: [
      { icon: Home, color: "text-emerald-600", bg: "bg-emerald-100", text: "Last Market Sale — View complete sale history including sale price, recorded date, seller/buyer information, and document ID." },
      { icon: Lock, color: "text-amber-600", bg: "bg-amber-100", text: "Open Liens — Instantly see all open liens with lender details, loan amounts, terms, rates, and LTV calculations." },
      { icon: RefreshCw, color: "text-blue-600", bg: "bg-blue-100", text: "Transfers & Conveyances — Access complete transaction history with deed transfer details and arms-length indicators." },
      { icon: Users, color: "text-purple-600", bg: "bg-purple-100", text: "Ownership History — View the complete ownership chain showing all previous owners and transaction dates." },
    ],
  },
  // Add more releases here as they come...
  // {
  //   version: "1.4",
  //   date: "January 15th, 2026",
  //   slug: "jan15",
  //   title: "Sales Coach AI",
  //   summary: "New AI-powered sales coaching features",
  //   bullets: [...],
  // },
];

export default function ReleasesPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors group mb-6"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Main</span>
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <Image
              src="https://cdn.bfldr.com/Q445447Z/at/n85kkcjq5q8r3n6nf4z5jsw/LinkAI_BG_FullGradonBlk.svg?auto=webp&format=svg"
              alt="LinkAI"
              width={120}
              height={36}
              className="h-10 w-auto"
              unoptimized
            />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Release Notes Archive</h1>
          <p className="text-gray-600">
            Complete history of LinkAI product updates and enhancements.
          </p>
        </div>

        {/* Release List */}
        <div className="space-y-6">
          {releases.map((release) => (
            <div 
              key={release.version}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Release Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-500">
                    V{release.version}
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{release.title}</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {release.date}
                    </div>
                  </div>
                </div>
                <Link
                  href={`/${release.slug}`}
                  className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  View Full Release
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Release Content */}
              <div className="p-5">
                <p className="text-gray-700 mb-4">{release.summary}</p>
                
                <ul className="space-y-2">
                  {release.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex gap-3 text-sm">
                      <span className={`flex-shrink-0 w-5 h-5 rounded-full ${bullet.bg} flex items-center justify-center`}>
                        <bullet.icon className={`w-3 h-3 ${bullet.color}`} />
                      </span>
                      <span className="text-gray-600">{bullet.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">
            LinkAI Release Notes • Updated {releases[0]?.date}
          </p>
        </div>
      </div>
    </main>
  );
}
