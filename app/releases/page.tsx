"use client";

import { ArrowLeft, Calendar, ChevronRight, Home, Lock, RefreshCw, Users, Sparkles, Layout, FileText, Bot, Clock, Zap } from "lucide-react";
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

// All release notes - benefit-focused language for loan officers
const releases: Release[] = [
  {
    version: "2.2",
    date: "February 25th, 2026",
    slug: "v2-2",
    title: "Major Platform Update",
    summary: "Work faster with a redesigned interface, instant loan comparisons, quick applications, and AI-powered sales tools",
    status: "upcoming",
    month: "February",
    year: "2026",
    color: "orange",
    bullets: [
      { icon: Layout, text: "Easier Navigation — Find any section in one click" },
      { icon: Sparkles, text: "Compare Loan Options — Show customers savings instantly" },
      { icon: FileText, text: "Quick Application — Submit to Figure in minutes" },
      { icon: Bot, text: "AI Sales Tools — Get talking points and objection handlers" },
    ],
  },
  {
    version: "1.5",
    date: "February 5th, 2026",
    slug: "feb2",
    title: "Property Intelligence",
    summary: "All property data from DataTree now shows automatically — no more switching between systems",
    status: "released",
    month: "February",
    year: "2026",
    color: "blue",
    bullets: [
      { icon: Home, text: "Sale History — See what the property sold for" },
      { icon: Lock, text: "Open Liens — Know all existing liens instantly" },
      { icon: RefreshCw, text: "Transaction History — Full ownership timeline" },
      { icon: Users, text: "Owner Info — Current and past owners" },
    ],
  },
];

// Light theme color mappings
const colorMap: { [key: string]: { bg: string; border: string; text: string; badge: string; light: string } } = {
  orange: { 
    bg: "bg-orange-50", 
    border: "border-orange-200", 
    text: "text-orange-600", 
    badge: "bg-orange-500",
    light: "bg-orange-100"
  },
  blue: { 
    bg: "bg-blue-50", 
    border: "border-blue-200", 
    text: "text-blue-600", 
    badge: "bg-blue-500",
    light: "bg-blue-100"
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

export default function ReleasesPage() {
  const grouped = groupReleasesByMonth(releases);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <motion.div 
          className="mb-8"
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

          <div className="flex items-center gap-4 mb-4">
            <Image
              src="https://cdn.bfldr.com/Q445447Z/at/n85kkcjq5q8r3n6nf4z5jsw/LinkAI_BG_FullGradonBlk.svg?auto=webp&format=svg"
              alt="LinkAI"
              width={140}
              height={42}
              className="h-10 w-auto"
              unoptimized
            />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">What's New in LinkAI</h1>
          <p className="text-gray-600 text-lg">
            Updates and improvements to help you close more loans, faster.
          </p>
        </motion.div>

        {/* What's New Summary Box */}
        <motion.div 
          className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-6 h-6" />
            <span className="text-lg font-bold">Coming February 25th</span>
          </div>
          <p className="text-white/90 text-lg mb-4">
            V2.2 brings a completely redesigned LinkAI with faster navigation, instant loan comparisons, and AI tools to help you sell.
          </p>
          <Link
            href="/v2-2"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-orange-600 rounded-xl text-sm font-semibold hover:bg-orange-50 transition-colors"
          >
            See What's Coming
            <ChevronRight className="w-4 h-4" />
          </Link>
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
              <h2 className="text-lg font-bold text-gray-700 bg-gray-100 px-4 py-2 rounded-full">
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
                    className={`rounded-2xl border-2 ${colors.border} bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + idx * 0.05 }}
                  >
                    {/* Release Header */}
                    <div className={`flex items-center justify-between p-5 ${colors.bg} border-b ${colors.border}`}>
                      <div className="flex items-center gap-4">
                        <span className={`text-3xl font-black ${colors.text}`}>
                          V{release.version}
                        </span>
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-xl font-semibold text-gray-900">{release.title}</h3>
                            {release.status === 'upcoming' ? (
                              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-orange-500 text-white rounded-full text-sm font-bold shadow-sm">
                                <Clock className="w-4 h-4" />
                                COMING SOON
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-green-500 text-white rounded-full text-sm font-bold shadow-sm">
                                ✓ LIVE NOW
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
                        className={`inline-flex items-center gap-2 px-5 py-2.5 ${colors.badge} text-white rounded-xl text-sm font-semibold shadow-md hover:opacity-90 transition-opacity`}
                      >
                        View Details
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>

                    {/* Release Content */}
                    <div className="p-5">
                      <p className="text-gray-700 mb-4 text-lg">{release.summary}</p>
                      
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {release.bullets.map((bullet, bulletIdx) => (
                          <li 
                            key={bulletIdx} 
                            className={`flex gap-3 p-4 rounded-xl ${colors.light} items-center`}
                          >
                            <bullet.icon className={`w-5 h-5 ${colors.text} flex-shrink-0`} />
                            <span className="text-gray-700">{bullet.text}</span>
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

        {/* Help Footer */}
        <motion.div 
          className="mt-12 p-6 rounded-2xl bg-gray-100 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <p className="text-gray-600">
            <strong className="text-gray-900">Questions?</strong> Use the Feedback button in LinkAI or contact your manager.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
