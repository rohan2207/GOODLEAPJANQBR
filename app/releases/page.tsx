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

// Color mappings
const colorMap: { [key: string]: { bg: string; border: string; text: string; light: string; badge: string } } = {
  orange: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-600", light: "bg-orange-100", badge: "bg-orange-500" },
  blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-600", light: "bg-blue-100", badge: "bg-blue-500" },
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
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
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
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors group mb-6"
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
          
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Release Notes</h1>
          <p className="text-gray-600 text-lg">
            Complete history of LinkAI product updates and enhancements.
          </p>
        </motion.div>

        {/* Timeline Navigator */}
        <motion.div 
          className="mb-10 p-6 rounded-2xl bg-white border-2 border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Timeline</span>
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
                  <div className={`relative w-5 h-5 rounded-full ${colors.badge} shadow-lg transition-transform group-hover:scale-110`}>
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
              <h2 className="text-xl font-bold text-gray-900 bg-white px-4 py-2 rounded-full border-2 border-gray-200 shadow-sm">
                {monthYear}
              </h2>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Release Cards */}
            <div className="space-y-5">
              {monthReleases.map((release, idx) => {
                const colors = colorMap[release.color];
                return (
                  <motion.div 
                    key={release.version}
                    className={`rounded-2xl border-2 ${colors.border} ${colors.bg} overflow-hidden shadow-sm hover:shadow-md transition-shadow`}
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
                            <h3 className="text-xl font-semibold text-gray-900">{release.title}</h3>
                            {release.status === 'upcoming' && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold border border-orange-200">
                                <Clock className="w-3 h-3" />
                                Coming Soon
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
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
                      <p className="text-gray-700 mb-4">{release.summary}</p>
                      
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {release.bullets.map((bullet, bulletIdx) => (
                          <li 
                            key={bulletIdx} 
                            className={`flex gap-3 p-3 rounded-xl ${colors.light} items-center`}
                          >
                            <bullet.icon className={`w-5 h-5 ${colors.text} flex-shrink-0`} />
                            <span className="text-gray-700 text-sm">{bullet.text}</span>
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
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-white rounded-full border-2 border-gray-200 shadow-sm">
            <Image
              src="https://cdn.bfldr.com/Q445447Z/at/n85kkcjq5q8r3n6nf4z5jsw/LinkAI_BG_FullGradonBlk.svg?auto=webp&format=svg"
              alt="LinkAI"
              width={80}
              height={24}
              className="h-5 w-auto opacity-60"
              unoptimized
            />
            <span className="text-gray-500 text-sm">
              Last updated {releases[0]?.date}
            </span>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
