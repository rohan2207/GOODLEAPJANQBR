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
  color: string;
  bullets: {
    icon: React.ComponentType<{ className?: string }>;
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
    color: "orange",
    bullets: [
      { icon: Layout, text: "New UI for Link — Completely redesigned interface" },
      { icon: Sparkles, text: "Scenarios Tab — Compare multiple loan scenarios" },
      { icon: FileText, text: "Application (Short 1003) — Streamlined process" },
      { icon: Bot, text: "AI Assistants — Intelligent assistants for sales" },
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
    color: "blue",
    bullets: [
      { icon: Home, text: "Last Market Sale — Complete sale history" },
      { icon: Lock, text: "Open Liens — All liens with details" },
      { icon: RefreshCw, text: "Transfers & Conveyances — Transaction history" },
      { icon: Users, text: "Ownership History — Complete chain" },
    ],
  },
];

// Dark theme color mappings with glows
const colorMap: { [key: string]: { bg: string; border: string; text: string; glow: string; badge: string; light: string } } = {
  orange: { 
    bg: "bg-orange-500/10", 
    border: "border-orange-500/30", 
    text: "text-orange-400", 
    glow: "shadow-orange-500/20",
    badge: "bg-orange-500",
    light: "bg-orange-500/20"
  },
  blue: { 
    bg: "bg-blue-500/10", 
    border: "border-blue-500/30", 
    text: "text-blue-400", 
    glow: "shadow-blue-500/20",
    badge: "bg-blue-500",
    light: "bg-blue-500/20"
  },
};

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
function getTimelineMonths(releases: Release[]): { label: string; hasUpcoming: boolean; color: string }[] {
  const uniqueMonths: { label: string; hasUpcoming: boolean; color: string }[] = [];
  releases.forEach(r => {
    const key = `${r.month} ${r.year}`;
    if (!uniqueMonths.find(m => m.label === key)) {
      const hasUpcoming = releases.some(rel => `${rel.month} ${rel.year}` === key && rel.status === "upcoming");
      uniqueMonths.push({ label: key, hasUpcoming, color: hasUpcoming ? "orange" : "blue" });
    }
  });
  return uniqueMonths;
}

export default function ReleasesPage() {
  const grouped = groupReleasesByMonth(releases);
  const timelineMonths = getTimelineMonths(releases);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Gradient accent at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500" />
      
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
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
              className="h-12 w-auto invert"
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
          className="mb-10 p-6 rounded-2xl bg-slate-900/80 border border-slate-700 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <Calendar className="w-5 h-5 text-slate-400" />
            <span className="text-sm font-semibold text-slate-300 uppercase tracking-wide">Timeline</span>
          </div>
          
          <div className="flex items-center gap-8">
            {timelineMonths.map((month) => {
              const colors = colorMap[month.color];
              return (
                <a
                  key={month.label}
                  href={`#${month.label.replace(' ', '-').toLowerCase()}`}
                  className="group flex flex-col items-center gap-3"
                >
                  <div className={`relative w-5 h-5 rounded-full ${colors.badge} shadow-lg ${colors.glow} transition-transform group-hover:scale-110`}>
                    {month.hasUpcoming && (
                      <span className={`absolute inset-0 rounded-full ${colors.badge} animate-ping opacity-40`} />
                    )}
                  </div>
                  <span className={`text-sm font-semibold ${colors.text} group-hover:underline`}>
                    {month.label}
                  </span>
                </a>
              );
            })}
          </div>
        </motion.div>

        {/* Grouped Releases */}
        {Object.entries(grouped).map(([monthYear, monthReleases], groupIdx) => (
          <motion.section 
            key={monthYear}
            id={monthYear.replace(' ', '-').toLowerCase()}
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 + groupIdx * 0.05 }}
          >
            {/* Month Header */}
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-xl font-bold text-white bg-slate-800 px-4 py-2 rounded-full border border-slate-600">
                {monthYear}
              </h2>
              <div className="h-px flex-1 bg-slate-700" />
            </div>

            {/* Release Cards */}
            <div className="space-y-5">
              {monthReleases.map((release, idx) => {
                const colors = colorMap[release.color];
                return (
                  <motion.div 
                    key={release.version}
                    className={`rounded-2xl border ${colors.border} bg-slate-900/80 overflow-hidden shadow-xl ${colors.glow} hover:shadow-2xl transition-all`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + idx * 0.05 }}
                  >
                    {/* Release Header */}
                    <div className={`flex items-center justify-between p-5 border-b ${colors.border}`}>
                      <div className="flex items-center gap-4">
                        <span className={`text-3xl font-black ${colors.text}`}>
                          V{release.version}
                        </span>
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-xl font-semibold text-white">{release.title}</h3>
                            {release.status === 'upcoming' && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-xs font-semibold border border-orange-500/30">
                                <Clock className="w-3 h-3" />
                                Coming Soon
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
                        className={`inline-flex items-center gap-2 px-5 py-2.5 ${colors.badge} text-white rounded-xl text-sm font-semibold shadow-lg hover:opacity-90 transition-opacity`}
                      >
                        View Details
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>

                    {/* Release Content */}
                    <div className="p-5">
                      <p className="text-slate-300 mb-4">{release.summary}</p>
                      
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {release.bullets.map((bullet, bulletIdx) => (
                          <li 
                            key={bulletIdx} 
                            className={`flex gap-3 p-3 rounded-xl ${colors.light} border ${colors.border} items-center`}
                          >
                            <bullet.icon className={`w-5 h-5 ${colors.text} flex-shrink-0`} />
                            <span className="text-slate-300 text-sm">{bullet.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        ))}

        {/* Footer */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-slate-900 rounded-full border border-slate-700">
            <Image
              src="https://cdn.bfldr.com/Q445447Z/at/n85kkcjq5q8r3n6nf4z5jsw/LinkAI_BG_FullGradonBlk.svg?auto=webp&format=svg"
              alt="LinkAI"
              width={80}
              height={24}
              className="h-5 w-auto invert opacity-60"
              unoptimized
            />
            <span className="text-slate-500 text-sm">
              Last updated {releases[0]?.date}
            </span>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
