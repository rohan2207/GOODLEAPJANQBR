"use client";

import { useState, useMemo } from "react";
import { ArrowLeft, Calendar, ChevronRight, ChevronDown, Home, Lock, RefreshCw, Users, Sparkles, Layout, FileText, Bot, Clock, Zap, UserPlus, Briefcase, DollarSign, MapPin, Search, X, Shield, Building } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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
    version: "2.3.1",
    date: "March 2026",
    slug: "v2-3-1",
    title: "Ownership & Vesting Rights",
    summary: "Instantly see if a property is in a trust, how it's vested, and who owns it — right in the Property screen",
    status: "released",
    month: "March",
    year: "2026",
    color: "purple",
    bullets: [
      { icon: Shield, text: "Vesting Rights — See Community Property, Joint Tenancy, Trust, etc." },
      { icon: Users, text: "Vesting Owner — Know if it's Husband & Wife, Individual, or other" },
      { icon: Building, text: "Property Screen — All ownership info in one place" },
      { icon: FileText, text: "Application Tab — Same info in the property modal" },
    ],
  },
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
    version: "1.6",
    date: "February 2026",
    slug: "v1-6",
    title: "HELOC Submission Updates",
    summary: "Smoother HELOC submissions with better name options, employment choices, and smart defaults",
    status: "released",
    month: "February",
    year: "2026",
    color: "teal",
    bullets: [
      { icon: UserPlus, text: "Name Updates — Legal name prompt, suffix on first row, Middle Name hidden" },
      { icon: Briefcase, text: "Employment Options — Updated job status list (hover for full labels)" },
      { icon: DollarSign, text: "Simplified Income — Cleaner, streamlined income section" },
      { icon: MapPin, text: "Smart Defaults — Primary residence auto-selected" },
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
  purple: { 
    bg: "bg-purple-50", 
    border: "border-purple-200", 
    text: "text-purple-600", 
    badge: "bg-purple-500",
    light: "bg-purple-100"
  },
  orange: { 
    bg: "bg-orange-50", 
    border: "border-orange-200", 
    text: "text-orange-600", 
    badge: "bg-orange-500",
    light: "bg-orange-100"
  },
  teal: { 
    bg: "bg-teal-50", 
    border: "border-teal-200", 
    text: "text-teal-600", 
    badge: "bg-teal-500",
    light: "bg-teal-100"
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

// Compact Release Card (collapsed view)
function CompactReleaseCard({ release, onExpand }: { release: Release; onExpand: () => void }) {
  const colors = colorMap[release.color];
  
  return (
    <div 
      className={`flex items-center justify-between p-4 rounded-xl border ${colors.border} bg-white hover:shadow-sm transition-shadow cursor-pointer`}
      onClick={onExpand}
    >
      <div className="flex items-center gap-4">
        <span className={`text-xl font-bold ${colors.text}`}>V{release.version}</span>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">{release.title}</span>
            {release.status === 'upcoming' ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs font-semibold">
                <Clock className="w-3 h-3" />
                SOON
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-semibold">
                ✓ LIVE
              </span>
            )}
          </div>
          <span className="text-sm text-gray-500">{release.date}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href={`/${release.slug}`}
          onClick={(e) => e.stopPropagation()}
          className={`px-4 py-2 ${colors.badge} text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity`}
        >
          Details
        </Link>
        <ChevronDown className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
}

// Expanded Release Card
function ExpandedReleaseCard({ release, onCollapse }: { release: Release; onCollapse: () => void }) {
  const colors = colorMap[release.color];
  
  return (
    <motion.div 
      className={`rounded-2xl border-2 ${colors.border} bg-white overflow-hidden shadow-sm`}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
    >
      {/* Release Header */}
      <div 
        className={`flex items-center justify-between p-5 ${colors.bg} border-b ${colors.border} cursor-pointer`}
        onClick={onCollapse}
      >
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
        <div className="flex items-center gap-3">
          <Link
            href={`/${release.slug}`}
            onClick={(e) => e.stopPropagation()}
            className={`inline-flex items-center gap-2 px-5 py-2.5 ${colors.badge} text-white rounded-xl text-sm font-semibold shadow-md hover:opacity-90 transition-opacity`}
          >
            View Details
            <ChevronRight className="w-4 h-4" />
          </Link>
          <ChevronDown className="w-5 h-5 text-gray-500 rotate-180" />
        </div>
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
}

export default function ReleasesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set());
  const [expandedReleases, setExpandedReleases] = useState<Set<string>>(new Set());

  // Filter releases based on search
  const filteredReleases = useMemo(() => {
    if (!searchQuery.trim()) return releases;
    const query = searchQuery.toLowerCase();
    return releases.filter(r => 
      r.title.toLowerCase().includes(query) ||
      r.version.toLowerCase().includes(query) ||
      r.summary.toLowerCase().includes(query) ||
      r.bullets.some(b => b.text.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  const grouped = groupReleasesByMonth(filteredReleases);
  const monthKeys = Object.keys(grouped);

  // Toggle month expansion
  const toggleMonth = (month: string) => {
    const newExpanded = new Set(expandedMonths);
    if (newExpanded.has(month)) {
      newExpanded.delete(month);
    } else {
      newExpanded.add(month);
    }
    setExpandedMonths(newExpanded);
  };

  // Toggle release expansion
  const toggleRelease = (version: string) => {
    const newExpanded = new Set(expandedReleases);
    if (newExpanded.has(version)) {
      newExpanded.delete(version);
    } else {
      newExpanded.add(version);
    }
    setExpandedReleases(newExpanded);
  };

  // Check if searching (expand all when searching)
  const isSearching = searchQuery.trim().length > 0;

  return (
    <>
      {/* Hide dark overlays on this light page */}
      <style jsx global>{`
        .vignette-overlay, .grain-overlay { display: none !important; }
        body { background: white !important; }
      `}</style>
      
      <main className="min-h-screen bg-white text-gray-900 relative z-10">
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Link 
                  href="/" 
                  className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm font-medium hidden sm:inline">Back</span>
                </Link>
                <Image
                  src="https://cdn.bfldr.com/Q445447Z/at/n85kkcjq5q8r3n6nf4z5jsw/LinkAI_BG_FullGradonBlk.svg?auto=webp&format=svg"
                  alt="LinkAI"
                  width={100}
                  height={30}
                  className="h-7 w-auto"
                  unoptimized
                />
                <span className="text-gray-300">|</span>
                <span className="font-semibold text-gray-700">Release Notes</span>
              </div>
              
              {/* Search */}
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search releases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Quick Nav - Month pills */}
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {monthKeys.map((month) => (
                <button
                  key={month}
                  onClick={() => {
                    document.getElementById(month.replace(' ', '-').toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 whitespace-nowrap transition-colors"
                >
                  {month} ({grouped[month].length})
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-8">
          {/* Header */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-2xl font-bold text-gray-900 mb-1">What's New in LinkAI</h1>
            <p className="text-gray-600">
              Updates and improvements to help you close more loans, faster.
            </p>
          </motion.div>

          {/* What's Coming Banner */}
          <motion.div 
            className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-5 h-5" />
                  <span className="font-bold">Coming February 25th — V2.2</span>
                </div>
                <p className="text-white/90 text-sm">
                  Redesigned interface, instant comparisons, AI tools
                </p>
              </div>
              <Link
                href="/v2-2"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-orange-600 rounded-xl text-sm font-semibold hover:bg-orange-50 transition-colors"
              >
                Preview
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Search Results Count */}
          {isSearching && (
            <div className="mb-4 text-sm text-gray-500">
              Found {filteredReleases.length} release{filteredReleases.length !== 1 ? 's' : ''} matching "{searchQuery}"
            </div>
          )}

          {/* No Results */}
          {filteredReleases.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No releases found matching "{searchQuery}"</p>
              <button 
                onClick={() => setSearchQuery("")}
                className="mt-2 text-orange-600 hover:underline"
              >
                Clear search
              </button>
            </div>
          )}

          {/* Grouped Releases - Collapsible by Month */}
          {monthKeys.map((monthYear, groupIdx) => {
            const monthReleases = grouped[monthYear];
            const isMonthExpanded = expandedMonths.has(monthYear) || isSearching;
            
            return (
              <motion.section 
                key={monthYear}
                id={monthYear.replace(' ', '-').toLowerCase()}
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 + groupIdx * 0.05 }}
              >
                {/* Month Header - Clickable */}
                <button
                  onClick={() => toggleMonth(monthYear)}
                  className="w-full flex items-center gap-4 mb-4 group"
                >
                  <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                    <ChevronRight className={`w-4 h-4 text-gray-500 transition-transform ${isMonthExpanded ? 'rotate-90' : ''}`} />
                    <h2 className="text-lg font-bold text-gray-700">
                      {monthYear}
                    </h2>
                    <span className="text-sm text-gray-500 bg-white px-2 py-0.5 rounded-full">
                      {monthReleases.length} release{monthReleases.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="h-px flex-1 bg-gray-200" />
                </button>

                {/* Release Cards */}
                <AnimatePresence>
                  {isMonthExpanded && (
                    <motion.div 
                      className="space-y-3 pl-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {monthReleases.map((release) => {
                        const isExpanded = expandedReleases.has(release.version) || isSearching;
                        return (
                          <div key={release.version}>
                            {isExpanded ? (
                              <ExpandedReleaseCard 
                                release={release} 
                                onCollapse={() => toggleRelease(release.version)} 
                              />
                            ) : (
                              <CompactReleaseCard 
                                release={release} 
                                onExpand={() => toggleRelease(release.version)} 
                              />
                            )}
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.section>
            );
          })}

          {/* Help Footer */}
          <motion.div 
            className="mt-12 p-5 rounded-2xl bg-gray-50 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <p className="text-gray-600 text-sm">
              <strong className="text-gray-900">Questions?</strong> Use the Feedback button in LinkAI or contact your manager.
            </p>
          </motion.div>
        </div>
      </main>
    </>
  );
}
