"use client";

import { ArrowLeft, Calendar, ChevronRight, Home, Lock, RefreshCw, Users, Sparkles, Layout, FileText, Bot, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// Release type definition
type Release = {
  version: string;
  date: string;
  slug: string;
  title: string;
  summary: string;
  status: "released" | "upcoming";
  month: string;
  year: string;
  bullets: {
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bg: string;
    text: string;
  }[];
};

// All release notes stored here - add new releases at the top
const releases: Release[] = [
  {
    version: "2.2",
    date: "February 25th, 2026",
    slug: "v2-2",
    title: "Major Platform Update",
    summary: "Complete UI overhaul with Scenarios Tab, Application (Short 1003), and AI Assistants integration",
    status: "upcoming",
    month: "February",
    year: "2026",
    bullets: [
      { icon: Layout, color: "text-cyan-400", bg: "bg-cyan-500/20", text: "New UI for Link — Completely redesigned interface for improved workflow" },
      { icon: Sparkles, color: "text-purple-400", bg: "bg-purple-500/20", text: "Scenarios Tab — Compare multiple loan scenarios side-by-side" },
      { icon: FileText, color: "text-amber-400", bg: "bg-amber-500/20", text: "Application (Short 1003) — Streamlined application process" },
      { icon: Bot, color: "text-emerald-400", bg: "bg-emerald-500/20", text: "AI Assistants — Intelligent assistants for rapport building, sales coaching, and valuations" },
    ],
  },
  {
    version: "1.5",
    date: "February 5th, 2026",
    slug: "feb2",
    title: "Property Intelligence",
    summary: "Enhancement to 'Property' tab — All relevant data from DataTree now feeds directly into LinkAI",
    status: "released",
    month: "February",
    year: "2026",
    bullets: [
      { icon: Home, color: "text-emerald-400", bg: "bg-emerald-500/20", text: "Last Market Sale — View complete sale history including sale price, recorded date, seller/buyer information, and document ID." },
      { icon: Lock, color: "text-amber-400", bg: "bg-amber-500/20", text: "Open Liens — Instantly see all open liens with lender details, loan amounts, terms, rates, and LTV calculations." },
      { icon: RefreshCw, color: "text-blue-400", bg: "bg-blue-500/20", text: "Transfers & Conveyances — Access complete transaction history with deed transfer details and arms-length indicators." },
      { icon: Users, color: "text-purple-400", bg: "bg-purple-500/20", text: "Ownership History — View the complete ownership chain showing all previous owners and transaction dates." },
    ],
  },
];

// Group releases by month/year
function groupReleasesByMonth(releases: Release[]): { [key: string]: Release[] } {
  return releases.reduce((acc, release) => {
    const key = `${release.month} ${release.year}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(release);
    return acc;
  }, {} as { [key: string]: Release[] });
}

// Get unique months for timeline
function getTimelineMonths(releases: Release[]): { label: string; hasUpcoming: boolean }[] {
  const months = new Map<string, boolean>();
  releases.forEach(r => {
    const key = `${r.month} ${r.year}`;
    const hasUpcoming = months.get(key) || r.status === "upcoming";
    months.set(key, hasUpcoming);
  });
  // Return unique months in order (most recent first)
  const uniqueMonths: { label: string; hasUpcoming: boolean }[] = [];
  releases.forEach(r => {
    const key = `${r.month} ${r.year}`;
    if (!uniqueMonths.find(m => m.label === key)) {
      uniqueMonths.push({ label: key, hasUpcoming: r.status === "upcoming" });
    }
  });
  return uniqueMonths;
}

export default function ReleasesPage() {
  const grouped = groupReleasesByMonth(releases);
  const timelineMonths = getTimelineMonths(releases);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none" />
      
      <div className="relative max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group mb-6"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Main</span>
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <Image
              src="https://cdn.bfldr.com/Q445447Z/at/n85kkcjq5q8r3n6nf4z5jsw/LinkAI_BG_FullGradonBlk.svg?auto=webp&format=svg"
              alt="LinkAI"
              width={140}
              height={42}
              className="h-12 w-auto"
              unoptimized
            />
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-3">Release Notes</h1>
          <p className="text-slate-400 text-lg">
            Complete history of LinkAI product updates and enhancements.
          </p>
        </motion.div>

        {/* Timeline Navigator */}
        <motion.div 
          className="mb-12 p-6 rounded-2xl bg-slate-900/50 border border-slate-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-slate-300">Timeline</span>
          </div>
          
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            {timelineMonths.map((month, idx) => (
              <a
                key={month.label}
                href={`#${month.label.replace(' ', '-').toLowerCase()}`}
                className="flex-shrink-0 group"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={`relative w-4 h-4 rounded-full transition-all ${
                    month.hasUpcoming 
                      ? 'bg-orange-500 ring-4 ring-orange-500/30' 
                      : 'bg-blue-500 group-hover:bg-blue-400'
                  }`}>
                    {month.hasUpcoming && (
                      <span className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-50" />
                    )}
                  </div>
                  <span className={`text-sm font-medium transition-colors ${
                    month.hasUpcoming 
                      ? 'text-orange-400' 
                      : 'text-slate-400 group-hover:text-white'
                  }`}>
                    {month.label}
                  </span>
                </div>
                {idx < timelineMonths.length - 1 && (
                  <div className="hidden" /> 
                )}
              </a>
            ))}
            
            {/* Timeline line connecting dots */}
            <div className="absolute left-0 right-0 h-px bg-slate-700 -z-10" style={{ top: '50%' }} />
          </div>
        </motion.div>

        {/* Grouped Releases */}
        {Object.entries(grouped).map(([monthYear, monthReleases], groupIdx) => (
          <motion.section 
            key={monthYear}
            id={monthYear.replace(' ', '-').toLowerCase()}
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + groupIdx * 0.1 }}
          >
            {/* Month Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
              <h2 className="text-xl font-bold text-white px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700">
                {monthYear}
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
            </div>

            {/* Release Cards */}
            <div className="space-y-6">
              {monthReleases.map((release, idx) => (
                <motion.div 
                  key={release.version}
                  className={`rounded-2xl border overflow-hidden transition-all hover:border-slate-600 ${
                    release.status === 'upcoming' 
                      ? 'bg-gradient-to-br from-orange-950/30 via-slate-900 to-slate-900 border-orange-500/30' 
                      : 'bg-slate-900/80 border-slate-800'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                >
                  {/* Release Header */}
                  <div className={`flex items-center justify-between p-6 border-b ${
                    release.status === 'upcoming' ? 'border-orange-500/20' : 'border-slate-800'
                  }`}>
                    <div className="flex items-center gap-4">
                      <span className={`text-3xl font-black tracking-tight ${
                        release.status === 'upcoming'
                          ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400'
                          : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400'
                      }`}>
                        V{release.version}
                      </span>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-semibold text-white">{release.title}</h3>
                          {release.status === 'upcoming' && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-xs font-semibold border border-orange-500/30">
                              <Clock className="w-3 h-3" />
                              Coming {release.date.split(',')[0]}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-400 mt-1">
                          <Calendar className="w-4 h-4" />
                          {release.date}
                        </div>
                      </div>
                    </div>
                    <Link
                      href={`/${release.slug}`}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        release.status === 'upcoming'
                          ? 'bg-orange-500 text-white hover:bg-orange-400 shadow-lg shadow-orange-500/25'
                          : 'bg-blue-500 text-white hover:bg-blue-400 shadow-lg shadow-blue-500/25'
                      }`}
                    >
                      {release.status === 'upcoming' ? 'Preview' : 'View Details'}
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Release Content */}
                  <div className="p-6">
                    <p className="text-slate-300 mb-5 text-lg">{release.summary}</p>
                    
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {release.bullets.map((bullet, bulletIdx) => (
                        <li 
                          key={bulletIdx} 
                          className={`flex gap-3 p-3 rounded-xl transition-colors ${
                            release.status === 'upcoming' 
                              ? 'bg-slate-800/50 hover:bg-slate-800' 
                              : 'bg-slate-800/30 hover:bg-slate-800/50'
                          }`}
                        >
                          <span className={`flex-shrink-0 w-8 h-8 rounded-lg ${bullet.bg} flex items-center justify-center`}>
                            <bullet.icon className={`w-4 h-4 ${bullet.color}`} />
                          </span>
                          <span className="text-slate-300 text-sm leading-relaxed">{bullet.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}

        {/* Footer */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-900/50 rounded-full border border-slate-800">
            <Image
              src="https://cdn.bfldr.com/Q445447Z/at/n85kkcjq5q8r3n6nf4z5jsw/LinkAI_BG_FullGradonBlk.svg?auto=webp&format=svg"
              alt="LinkAI"
              width={80}
              height={24}
              className="h-6 w-auto opacity-60"
              unoptimized
            />
            <span className="text-slate-500 text-sm">
              Release Notes • Last updated {releases[0]?.date}
            </span>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
