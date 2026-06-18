"use client";

import {
  ArrowLeft,
  Printer,
  Copy,
  Check,
  Sparkles,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Play,
  CreditCard,
  ClipboardList,
  PanelRight,
  AlertCircle,
  FileText,
  Layout,
  Users,
  Home,
  Briefcase,
  DollarSign,
  LogIn,
  ListChecks,
  Brain,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------------------------------------------
// Email copy content
// ---------------------------------------------------------------------------

const emailContentPlain = `Subject: LinkAI V3.0 Release Notes — Full 1003, Smart Panel & Smart Credit

LinkAI V3.0 is live — our biggest release yet.

What's New:

• Full 1003 Application — A fully digital URLA purpose-built for GoodLeap LOs, living inside LinkAI. No new login, no switching systems. The Loan Bar keeps DTI, LTV, and loan details always in view. Sections prepopulate from Salesforce and Encompass. Employment fields adapt to income type. Liabilities mirrors the credit report with inline payoff and DTI exclusion flags. Co-Borrower Split Screen lets you work both sides simultaneously with a combined income summary at the bottom.

• Smart Panel — A new unified side panel surfaces the most important loan data right where you're working. Property details, credit summary, income snapshot, and key alerts — all without leaving your current screen.

• Smart Credit — The full credit workflow, inside LinkAI. Check what fields are needed before you pull, select borrowers and capture consent in one step, then review scores, tradelines, and verified Work Number income the moment results are back — no PDF, no tab switching, no separate system.

Questions? Use the Feedback button in LinkAI.
`;

const emailContentHtml = `
<div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
  <p><strong>LinkAI V3.0</strong> is live — our biggest release yet.</p>
  <h3 style="margin-top: 20px; margin-bottom: 10px;">What's New:</h3>
  <ul style="margin: 16px 0; padding-left: 20px;">
    <li style="margin-bottom: 16px;">
      <strong>Full 1003 Application</strong> — A fully digital URLA purpose-built for GoodLeap LOs, living inside LinkAI. No new login, no switching systems.
      <ul style="margin: 8px 0 0 0; padding-left: 18px; color: #555;">
        <li style="margin-bottom: 6px;"><strong>Loan Bar</strong> — DTI, LTV, and loan details always in view as you work every section.</li>
        <li style="margin-bottom: 6px;"><strong>Prepopulated</strong> — Pulls data from Salesforce and Encompass so you start with what you already have.</li>
        <li style="margin-bottom: 6px;"><strong>Smart sections</strong> — Address auto-syncs, employment fields adapt to income type, income summary calculates in real time.</li>
        <li style="margin-bottom: 6px;"><strong>Liabilities</strong> — Mirrors the credit report with inline payoff and DTI exclusion flags; open the full credit report without leaving the section.</li>
        <li style="margin-bottom: 6px;"><strong>Co-Borrower Split Screen</strong> — Toggle on and work both borrowers side by side; combined income summary always at the bottom.</li>
      </ul>
    </li>
    <li style="margin-bottom: 14px;">
      <strong>Smart Panel</strong> — A new unified side panel surfaces the most important loan data right where you're working. Property details, credit summary, income snapshot, and key alerts — without leaving your current screen.
    </li>
    <li style="margin-bottom: 14px;">
      <strong>Smart Credit</strong> — The full credit workflow, inside LinkAI. Check what fields are needed before you pull, select borrowers and capture consent in one step, then review scores, tradelines, and verified Work Number income the moment results are back — no PDF, no tab switching, no separate system.
    </li>
  </ul>
  <p style="color: #666; margin-top: 20px;">Questions? Use the Feedback button in LinkAI.</p>
</div>
`;

// ---------------------------------------------------------------------------
// Video Player
// ---------------------------------------------------------------------------

type VideoPlayerProps = {
  src?: string;
  embedUrl?: string;
  poster?: string;
  title: string;
};

function VideoPlayer({ src, embedUrl, poster, title }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setPlaying(true);
    videoRef.current?.play();
  };

  if (embedUrl) {
    return (
      <div className="relative w-full rounded-2xl overflow-hidden border border-gray-200 shadow-lg bg-black aspect-video">
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }

  if (src) {
    return (
      <div className="relative w-full rounded-2xl overflow-hidden border border-gray-200 shadow-lg bg-black aspect-video">
        {!playing && (
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center z-10 group"
            aria-label={`Play ${title}`}
          >
            {poster && (
              <Image src={poster} alt={`${title} thumbnail`} fill className="object-cover opacity-80" />
            )}
            <div className="relative z-10 w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
              <Play className="w-9 h-9 text-orange-500 ml-1" />
            </div>
          </button>
        )}
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          controls={playing}
          className="w-full h-full object-contain"
          onEnded={() => setPlaying(false)}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border-2 border-dashed border-orange-300 bg-orange-50 aspect-video flex flex-col items-center justify-center gap-3">
      <div className="w-16 h-16 rounded-full bg-orange-100 border-2 border-orange-300 flex items-center justify-center">
        <Play className="w-8 h-8 text-orange-400 ml-1" />
      </div>
      <p className="text-orange-600 font-semibold text-sm">Demo video coming soon</p>
      <p className="text-orange-400 text-xs">
        Upload to: <code className="bg-orange-100 px-1 rounded">public/videos/v3-0/smart-credit-demo.mp4</code>
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Screenshot Carousel
// ---------------------------------------------------------------------------

type CarouselShot =
  | { type: "real"; src: string; alt: string; caption: string }
  | { type: "placeholder"; path: string; label: string };

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "80%" : "-80%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? "80%" : "-80%", opacity: 0 }),
};

function ScreenshotCarousel({
  screenshots,
  placeholders,
  accentColor,
}: {
  screenshots: { src: string; alt: string; caption: string }[];
  placeholders: { path: string; label: string }[];
  accentColor: string;
}) {
  const [[current, direction], setPage] = useState([0, 0]);

  const realShots = screenshots.filter((s) => s.src);
  const shots: CarouselShot[] =
    realShots.length > 0
      ? realShots.map((s) => ({ type: "real", ...s }))
      : placeholders.map((p) => ({ type: "placeholder", ...p }));

  if (shots.length === 0) return null;

  const total = shots.length;
  const idx = ((current % total) + total) % total;
  const shot = shots[idx];

  const paginate = (dir: number) => setPage([current + dir, dir]);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-gray-50">
      {/* Slide */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 320, damping: 32, mass: 0.8 }}
            className="absolute inset-0"
          >
            {shot.type === "real" ? (
              <figure className="w-full h-full flex flex-col">
                <div className="flex-1 relative">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 80vw"
                  />
                </div>
                <figcaption className="border-t border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 text-center">
                  {shot.caption}
                </figcaption>
              </figure>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6">
                <AlertCircle className="w-10 h-10 text-gray-300" />
                <p className="text-gray-500 font-semibold text-sm text-center">{shot.label}</p>
                <p className="text-gray-300 text-xs text-center">
                  Upload to:{" "}
                  <code className="bg-white border border-gray-200 px-1.5 py-0.5 rounded text-xs">
                    {shot.path}
                  </code>
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      {total > 1 && (
        <>
          <button
            onClick={() => paginate(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-gray-200 shadow flex items-center justify-center hover:bg-white transition-colors z-10"
          >
            <ChevronLeft className="w-4 h-4 text-gray-700" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-gray-200 shadow flex items-center justify-center hover:bg-white transition-colors z-10"
          >
            <ChevronRight className="w-4 h-4 text-gray-700" />
          </button>
          <div className="absolute bottom-12 inset-x-0 flex justify-center gap-1.5 z-10">
            {shots.map((_, i) => (
              <button
                key={i}
                onClick={() => setPage([i, i > idx ? 1 : -1])}
                className={`rounded-full transition-all ${
                  i === idx
                    ? `w-5 h-2 ${accentColor}`
                    : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// UI Snippet Mockups
// ---------------------------------------------------------------------------

function LoanBarSnippet() {
  return (
    <motion.div
      className="rounded-xl overflow-hidden border border-[#E3E0F0] bg-white shadow-sm"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
    >
      {/* Exact replica of the app header bar */}
      <div className="px-4 py-2.5 flex items-center gap-3 flex-wrap" style={{ backgroundColor: "#472ba4" }}>
        <p className="text-sm font-bold text-white whitespace-nowrap">John Homeowner &amp; Mary Homeowner</p>
        <span className="text-white/40 text-xs">|</span>
        <p className="text-xs text-white/80 whitespace-nowrap">Loan: 6680611</p>
        <span className="text-white/40 text-xs">|</span>
        <p className="text-xs text-white/80 whitespace-nowrap">Austin, TX</p>
        <p className="text-xs text-white/80 whitespace-nowrap ml-auto">DTI: <span className="font-bold text-white">38%</span></p>
        <p className="text-xs text-white/80 whitespace-nowrap">LTV: <span className="font-bold text-white">72%</span></p>
      </div>
      {/* Section tab bar */}
      <div className="flex border-b border-[#E3E0F0] bg-white overflow-x-auto px-2">
        {["Borrower Info", "Employment & Income", "Assets", "Liabilities", "REO/VOM", "Declarations"].map((tab, i) => (
          <button
            key={tab}
            className="px-3 py-2.5 text-xs font-medium border-b-2 whitespace-nowrap flex-shrink-0"
            style={{
              borderBottomColor: i === 0 ? "#472BA4" : "transparent",
              color: i === 0 ? "#200f51" : "#67677B",
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Progress bar */}
      <div className="px-4 py-2.5 flex items-center justify-between" style={{ backgroundColor: "#F5F5F9" }}>
        <div>
          <p className="text-xs font-semibold" style={{ color: "#200f51" }}>Application Progress</p>
          <p className="text-[10px] text-gray-400 mt-0.5">47 of 55 AUS fields completed</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-24 h-1.5 bg-gray-300 rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: "85%", backgroundColor: "#472BA4" }} />
          </div>
          <span className="text-sm font-bold" style={{ color: "#200f51" }}>85%</span>
        </div>
      </div>
    </motion.div>
  );
}

function IncomeTypeSnippet() {
  const [active, setActive] = useState(0);
  const types = ["Employed", "Self Employed", "Retired"];
  return (
    <motion.div
      className="rounded-xl border border-[#E3E0F0] bg-white shadow-sm p-4"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
    >
      <p className="text-xs font-medium mb-2" style={{ color: "#200f51" }}>Income Type</p>
      {/* Exact replica of the app segmented control */}
      <div className="rounded-lg overflow-hidden border border-[#e3e0f0] flex divide-x divide-[#e3e0f0]"
        style={{ boxShadow: "rgba(0,0,0,0.04) 0px 1px 8px" }}>
        {types.map((t, i) => (
          <button
            key={t}
            onClick={() => setActive(i)}
            className="flex-1 h-11 px-3 text-sm font-medium flex items-center justify-center transition-colors"
            style={{
              backgroundColor: active === i ? "#4022BA" : "white",
              color: active === i ? "white" : "#14141A",
            }}
          >
            {t}
          </button>
        ))}
      </div>
      <p className="text-xs mt-2.5 leading-relaxed" style={{ color: "#67677B" }}>
        Fields adapt — only shows what&apos;s relevant for the selected type
      </p>
    </motion.div>
  );
}

function CoBorrowerSnippet() {
  const [on, setOn] = useState(true);
  return (
    <motion.div
      className="rounded-xl border border-[#E3E0F0] bg-white shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
    >
      {/* Co-Borrower toggle header — exact replica from app HTML */}
      <div className="flex items-center justify-between px-4 py-[10px] bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)] rounded-lg">
        <p className="text-h5 leading-6 font-semibold" style={{ color: "#200f51" }}>Co-Borrower</p>
        <button
          type="button"
          role="switch"
          aria-checked={on}
          onClick={() => setOn(!on)}
          className="relative inline-block rounded-full transition-colors duration-200 focus-visible:outline-none w-[83px] h-7"
          style={{ backgroundColor: on ? "#472BA4" : "#e3e0f0" }}
        >
          <span
            className="absolute top-1 h-5 w-12 bg-white rounded-full shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)] transition-transform duration-200 flex items-center justify-center text-sm font-normal select-none"
            style={{
              transform: on ? "translateX(31px)" : "translateX(4px)",
              color: "#200f51",
            }}
          >
            {on ? "ON" : "OFF"}
          </span>
        </button>
      </div>

      {on && (
        <div className="flex gap-6 px-1 pt-2 pb-1">
          {/* Primary Borrower column */}
          <div className="flex flex-1 flex-col">
            <div className="px-3 py-2 rounded-t-[8px]" style={{ backgroundColor: "#200F51" }}>
              <span className="text-sm font-semibold text-white">Primary Borrower</span>
            </div>
            <div className="flex flex-1 flex-col gap-3 px-3 border border-[#E3E0F0] rounded-b-[8px] py-3">
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium" style={{ color: "#200f51" }}>First Name</p>
                <div className="rounded-[8px] overflow-hidden ring-2 ring-[#d9923b] h-9 flex items-center px-3 bg-white text-sm" style={{ color: "#14141A" }}>John</div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium" style={{ color: "#200f51" }}>Last Name</p>
                <div className="rounded-[8px] overflow-hidden ring-2 ring-[#d9923b] h-9 flex items-center px-3 bg-white text-sm" style={{ color: "#14141A" }}>Homeowner</div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium" style={{ color: "#200f51" }}>Marital Status</p>
                <div className="flex gap-1">
                  {["Married", "Unmarried", "Separated"].map((s, i) => (
                    <button key={s} className="flex-1 text-xs font-medium rounded-[8px] border-2 py-2 transition-colors" style={{ backgroundColor: i === 1 ? "#4022BA" : "white", color: i === 1 ? "white" : "#67677b", borderColor: i === 1 ? "#4022BA" : "#e3e3ed" }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Co-Borrower column */}
          <div className="flex flex-1 flex-col">
            <div className="px-3 py-2 rounded-t-[8px]" style={{ backgroundColor: "#472BA4" }}>
              <span className="text-sm font-semibold text-white">Co-Borrower</span>
            </div>
            <div className="flex flex-1 flex-col gap-3 px-3 border border-[#E3E0F0] rounded-b-[8px] py-3">
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium" style={{ color: "#200f51" }}>First Name</p>
                <div className="rounded-[8px] overflow-hidden ring-2 ring-[#d9923b] h-9 flex items-center px-3 bg-white text-sm" style={{ color: "#14141A" }}>Mary</div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium" style={{ color: "#200f51" }}>Last Name</p>
                <div className="rounded-[8px] overflow-hidden ring-2 ring-[#d9923b] h-9 flex items-center px-3 bg-white text-sm" style={{ color: "#14141A" }}>Homeowner</div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium" style={{ color: "#200f51" }}>Marital Status</p>
                <div className="rounded-[8px] overflow-hidden ring-1 ring-[#e3e0f0] h-9 flex items-center px-3 bg-white text-sm" style={{ color: "#14141A", boxShadow: "rgba(0,0,0,0.04) 0px 1px 8px" }}>
                  Unmarried
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <p className="text-xs px-4 py-2.5 leading-relaxed" style={{ color: "#67677B" }}>
        Toggle on to work both borrowers side-by-side — combined income always visible below.
      </p>
    </motion.div>
  );
}

function LiabilitiesRowSnippet() {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      className="rounded-xl border border-[#E3E0F0] bg-white shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
    >
      {/* Table header */}
      <div className="flex items-center bg-white border-b border-[#E3E0F0] px-2 py-1.5" style={{ borderBottom: "1px solid #ada6bf" }}>
        <span className="w-7 flex-shrink-0" />
        <span className="text-xs font-medium w-20 flex-shrink-0 px-1" style={{ color: "#200F51" }}>ECOA</span>
        <span className="flex-1 text-xs font-medium px-1" style={{ color: "#200F51" }}>Account / Creditor</span>
        <span className="text-xs font-medium w-16 px-1" style={{ color: "#200F51" }}>Status</span>
        <span className="text-xs font-medium w-16 px-1" style={{ color: "#200F51" }}>Balance</span>
        <span className="text-xs font-medium w-14 px-1" style={{ color: "#200F51" }}>Util.</span>
        <span className="text-xs font-medium w-14 px-1" style={{ color: "#200F51" }}>Payment</span>
        <span className="text-xs font-medium w-14 text-center" style={{ color: "#200F51" }}>Will Pay</span>
        <span className="text-xs font-medium w-14 text-center" style={{ color: "#200F51" }}>Exclude</span>
      </div>

      {/* Data row */}
      <div>
        <div className="flex items-center px-2 py-1 border-b border-[#E3E0F0]" style={{ minHeight: 34 }}>
          <button onClick={() => setExpanded(!expanded)} className="w-7 flex-shrink-0 flex items-center justify-center" style={{ color: "#200F51" }}>
            <ChevronRight className={`w-4 h-4 transition-transform ${expanded ? "rotate-90" : ""}`} />
          </button>
          <span className="text-xs w-20 flex-shrink-0 px-1" style={{ color: "#200f51" }}>Individual</span>
          <div className="flex-1 px-1">
            <p className="text-xs font-medium" style={{ color: "#14141A" }}>TOYOTA CREDIT</p>
            <p className="text-[10px]" style={{ color: "#67677B" }}>3210989098</p>
          </div>
          <span className="w-16 px-1 flex-shrink-0">
            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium whitespace-nowrap" style={{ borderRadius: 12, border: "1px solid #E3E0F0", background: "white", color: "#200f51" }}>Closed</span>
          </span>
          <span className="text-xs w-16 px-1 flex-shrink-0" style={{ color: "#14141A" }}>$15,838</span>
          <span className="text-xs w-14 px-1 flex-shrink-0" style={{ color: "#14141A" }}>65.0%</span>
          <span className="text-xs w-14 px-1 flex-shrink-0" style={{ color: "#14141A" }}>$482</span>
          <div className="w-14 flex justify-center flex-shrink-0">
            <div className="w-4 h-4 border border-[#d4d0e3] bg-gray-900 rounded-[4px] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
            </div>
          </div>
          <div className="w-14 flex justify-center flex-shrink-0">
            <div className="w-4 h-4 border border-[#d4d0e3] rounded-[4px] bg-white" />
          </div>
        </div>

        {expanded && (
          <div className="px-3 py-2.5 bg-[#F7F6FF] border-b border-[#E3E0F0] text-xs" style={{ color: "#67677B" }}>
            <div className="grid grid-cols-3 gap-2">
              <div><span className="font-semibold" style={{ color: "#200f51" }}>Credit Limit:</span> $24,371</div>
              <div><span className="font-semibold" style={{ color: "#200f51" }}>Utilization:</span> 65.0%</div>
              <div><span className="font-semibold" style={{ color: "#200f51" }}>Type:</span> Auto Loan</div>
            </div>
          </div>
        )}
      </div>

      {/* Second row */}
      <div className="flex items-center px-2 py-1 border-b border-[#E3E0F0]" style={{ minHeight: 34 }}>
        <button className="w-7 flex-shrink-0 flex items-center justify-center" style={{ color: "#200F51" }}>
          <ChevronRight className="w-4 h-4" />
        </button>
        <span className="text-xs w-20 flex-shrink-0 px-1" style={{ color: "#200f51" }}>Individual</span>
        <div className="flex-1 px-1">
          <p className="text-xs font-medium" style={{ color: "#14141A" }}>CHASE</p>
          <p className="text-[10px]" style={{ color: "#67677B" }}>58652333</p>
        </div>
        <span className="w-16 px-1 flex-shrink-0">
          <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium whitespace-nowrap" style={{ borderRadius: 12, border: "1px solid #E3E0F0", background: "white", color: "#200f51" }}>Closed</span>
        </span>
        <span className="text-xs w-16 px-1 flex-shrink-0" style={{ color: "#14141A" }}>$5,000</span>
        <span className="text-xs w-14 px-1 flex-shrink-0" style={{ color: "#14141A" }}>40.0%</span>
        <span className="text-xs w-14 px-1 flex-shrink-0" style={{ color: "#14141A" }}>$257</span>
        <div className="w-14 flex justify-center flex-shrink-0">
          <div className="w-4 h-4 border border-[#d4d0e3] bg-gray-900 rounded-[4px] flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
          </div>
        </div>
        <div className="w-14 flex justify-center flex-shrink-0">
          <div className="w-4 h-4 border border-[#d4d0e3] rounded-[4px] bg-white" />
        </div>
      </div>

      <div className="px-3 py-2 flex items-center justify-between" style={{ backgroundColor: "#F7F6FF" }}>
        <p className="text-xs" style={{ color: "#67677B" }}>Mirrors the credit report — inline Will Pay &amp; Exclude flags update DTI in real time.</p>
        <button className="text-xs font-medium flex items-center gap-1 px-2 py-1 rounded border border-gray-300 hover:bg-gray-50 whitespace-nowrap flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
          View Credit Report
        </button>
      </div>
    </motion.div>
  );
}

function PanelOverviewSnippet() {
  const [collapsed, setCollapsed] = useState(false);
  const [feature, setFeature] = useState("Charts");
  const [chartTab, setChartTab] = useState(0);

  const chartTabs = ["Debt Consolidation", "Payment Savings", "Cash Back", "Accelerated Payoff"];

  const debtRows = [
    { creditor: "TOYOTA CREDIT", type: "Other", payment: "$482", payoff: "$15,838" },
    { creditor: "CHASE", type: "Other", payment: "$257", payoff: "$5,000" },
    { creditor: "SALLIEMAE", type: "Other", payment: "$0", payoff: "$5,000" },
    { creditor: "SALLIEMAE", type: "Other", payment: "$25", payoff: "$1,100" },
  ];

  return (
    <motion.div
      className="flex items-stretch gap-0"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
    >
      {/* Resize grabber — exact replica from app HTML */}
      <div className="relative flex flex-col items-center justify-between py-4 w-8 shrink-0">
        {/* Annotation label */}
        <div className="flex flex-col items-center gap-1">
          <div
            className="text-[9px] font-bold uppercase tracking-widest whitespace-nowrap px-1.5 py-0.5 rounded"
            style={{ color: "#472BA4", backgroundColor: "#ede9fa", writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            drag to resize
          </div>
        </div>

        {/* The actual grabber handle */}
        <div
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize Smart Panel"
          className="group relative z-10 flex w-[8px] shrink-0 cursor-col-resize items-center justify-center self-stretch"
        >
          <div className="absolute left-1/2 top-1/2 h-[96px] w-[24px] -translate-x-1/2 -translate-y-1/2 rounded-[12px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: "rgba(71,43,164,0.08)" }} />
          <div className="w-[4px] rounded-[4px] transition-all duration-200 h-[48px] group-hover:h-[64px]"
            style={{ backgroundColor: "#bcb6ca" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#472BA4")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#bcb6ca")}
          />
        </div>

        <div /> {/* spacer */}
      </div>

      {/* Panel itself */}
      <div className="flex-1 min-w-0 rounded-xl border border-[#E3E0F0] bg-white shadow-sm overflow-hidden">

      {/* Panel header — exact replica */}
      <div className="flex shrink-0 items-center gap-2 pt-[16px] px-[16px] pb-[12px] border-b border-[#E3E0F0]">
        <div className="flex flex-1 min-w-0 items-center gap-[8px] p-[4px] rounded-full" style={{ backgroundColor: "#F7F6FF" }}>
          {/* AI Assistant button */}
          <button
            type="button"
            className="flex flex-1 min-w-0 items-center justify-center gap-1.5 py-[5px] px-3 rounded-full text-[13px] leading-[20px] font-bold border border-[#E3E0F0] bg-transparent"
            style={{ color: "#67677b" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12h18"/><path d="M12 21v-18"/><path d="M7.5 7.5l9 9"/><path d="M7.5 16.5l9 -9"/>
            </svg>
            AI Assistant
          </button>
          {/* Feature dropdown */}
          <div className="relative flex flex-1 min-w-0 items-center justify-center rounded-full bg-white border border-[#E3E0F0] shadow-[0_2px_4px_rgba(0,0,0,0.08)]">
            <select
              value={feature}
              onChange={(e) => setFeature(e.target.value)}
              className="appearance-none bg-transparent w-full min-w-0 px-7 py-[5px] text-center font-bold text-[13px] leading-[20px] cursor-pointer outline-none truncate"
              style={{ color: "#472BA4" }}
            >
              <option value="ApplicationTracker">Application Tracker</option>
              <option value="OrderServices">Order Services</option>
              <option value="Charts">Charts</option>
            </select>
            <ChevronRight className="pointer-events-none absolute right-2 w-4 h-4 rotate-90" style={{ color: "#472BA4" }} />
          </div>
        </div>
        {/* Collapse button */}
        <button
          type="button"
          aria-label={collapsed ? "Expand Smart Panel" : "Collapse Smart Panel"}
          onClick={() => setCollapsed(!collapsed)}
          className="flex shrink-0 items-center justify-center w-9 h-9 rounded-[8px] hover:bg-gray-100 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ color: "#472BA4", transform: collapsed ? "scaleX(-1)" : "none" }}>
            <path d="M14 12l-10 0"/><path d="M14 12l-4 4"/><path d="M14 12l-4 -4"/><path d="M20 4l0 16"/>
          </svg>
        </button>
      </div>

      {/* Header caption */}
      <div className="px-4 py-2 flex items-center gap-2 border-b border-[#E3E0F0]" style={{ backgroundColor: "#F7F6FF" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#472BA4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12h18"/><path d="M12 21v-18"/><path d="M7.5 7.5l9 9"/><path d="M7.5 16.5l9 -9"/>
        </svg>
        <p className="text-[11px] font-medium" style={{ color: "#472BA4" }}>
          Quick-select <strong>AI Assistant</strong> or switch tools from the dropdown — multitask without leaving your screen
        </p>
      </div>

      {/* Panel content */}
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            style={{ overflow: "hidden" }}
          >
            {feature === "Charts" ? (
              <div className="flex flex-col p-4 gap-4">
                {/* Chart tabs */}
                <div role="tablist" className="flex gap-4 border-b border-[#E3E0F0] overflow-x-auto">
                  {chartTabs.map((tab, i) => (
                    <button
                      key={tab}
                      role="tab"
                      aria-selected={chartTab === i}
                      onClick={() => setChartTab(i)}
                      className="px-1 py-3 text-[13px] font-medium leading-[20px] border-b-2 rounded-t-[8px] whitespace-nowrap flex-shrink-0 transition-colors"
                      style={{
                        borderBottomColor: chartTab === i ? "#472BA4" : "transparent",
                        color: chartTab === i ? "#200f51" : "#67677B",
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Debt Consolidation content */}
                {chartTab === 0 && (
                  <div className="flex flex-col gap-0 overflow-hidden rounded-[8px] border border-gray-200">
                    {/* Worksheet header */}
                    <div className="p-3 text-center font-bold text-white text-sm" style={{ backgroundColor: "#200F51" }}>
                      DEBT CONSOLIDATION WORKSHEET
                    </div>
                    {/* Table */}
                    <table className="w-full border-collapse text-xs">
                      <thead>
                        <tr style={{ backgroundColor: "#472BA4" }}>
                          {["Creditor", "Type", "Mthly Pmt", "Payoff Amt", "Paid Off"].map((h) => (
                            <th key={h} className="p-2 font-normal text-white text-left border-b border-[#5a3ab5]">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {debtRows.map((row, i) => (
                          <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#F7F6FF]"}>
                            <td className="p-2 font-bold border border-gray-200" style={{ color: "#14141A" }}>{row.creditor}</td>
                            <td className="p-2 border border-gray-200 text-center" style={{ color: "#67677B" }}>{row.type}</td>
                            <td className="p-2 border border-gray-200 text-center" style={{ color: "#14141A" }}>{row.payment}</td>
                            <td className="p-2 border border-gray-200 text-center" style={{ color: "#14141A" }}>{row.payoff}</td>
                            <td className="p-2 border border-gray-200 text-center">
                              <span className="text-xs font-medium px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "#e8f5e9", color: "#2e7d32" }}>Yes</span>
                            </td>
                          </tr>
                        ))}
                        <tr style={{ backgroundColor: "#e3e0f0" }}>
                          <td className="p-2 text-right font-bold border border-gray-200" colSpan={2} style={{ color: "#200F51" }}>Total</td>
                          <td className="p-2 text-center font-bold border border-gray-200" style={{ color: "#200F51" }}>$764</td>
                          <td className="p-2 text-center font-bold border border-gray-200" style={{ color: "#200F51" }}>$26,938</td>
                          <td className="border border-gray-200" />
                        </tr>
                      </tbody>
                    </table>
                    <p className="p-2 text-[10px]" style={{ color: "#67677B" }}>* Mortgage payoffs are estimated and will change with actual payoff amount from lender(s)</p>

                    {/* Our Promise */}
                    <div className="p-3 text-center font-bold text-white text-sm" style={{ backgroundColor: "#200F51" }}>OUR PROMISE</div>
                    <div className="p-4 flex flex-col gap-3" style={{ backgroundColor: "#F7F6FF" }}>
                      {[
                        { title: "No Lender Fees", desc: "No Lender Fees. Nope, we don't charge them." },
                        { title: "Better Rate Guarantee", desc: "If you find a lower rate, we'll match it or pay you $1,000." },
                        { title: "Lifetime Rewards Guarantee", desc: "Returning customers get exclusive rate discounts and no out-of-pocket on a refinance." },
                      ].map((item) => (
                        <div key={item.title} className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ borderColor: "#472BA4" }}>
                            <CheckCircle className="w-4 h-4" style={{ color: "#472BA4" }} />
                          </div>
                          <div>
                            <p className="text-xs font-bold" style={{ color: "#200F51" }}>{item.title}</p>
                            <p className="text-[11px]" style={{ color: "#67677B" }}>{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {chartTab !== 0 && (
                  <div className="flex items-center justify-center py-10 rounded-lg border border-dashed border-[#E3E0F0]">
                    <p className="text-sm font-medium" style={{ color: "#67677B" }}>{chartTabs[chartTab]} chart</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center py-10 px-4">
                <p className="text-sm font-medium" style={{ color: "#67677B" }}>
                  {feature === "ApplicationTracker" ? "Application Tracker" : "Order Services"} — coming soon
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {collapsed && (
        <div className="px-4 py-2.5">
          <p className="text-xs" style={{ color: "#67677B" }}>Smart Panel collapsed — click the arrow to expand</p>
        </div>
      )}
      </div>{/* end panel inner div */}
    </motion.div>
  );
}

function PanelResizeSnippet() {
  return (
    <motion.div
      className="rounded-xl border border-[#E3E0F0] bg-white shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
    >
      {/* Label */}
      <div className="px-4 py-3 border-b border-[#E3E0F0] flex items-center gap-2">
        <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-black" style={{ backgroundColor: "#472BA4" }}>2</div>
        <p className="text-sm font-bold" style={{ color: "#200F51" }}>Resize to fit your screen</p>
      </div>

      {/* Animation area */}
      <div className="p-4">
        <div className="rounded-lg overflow-hidden border border-[#E3E0F0] flex" style={{ height: 120, backgroundColor: "#F7F6FF" }}>
          {/* Mock main content */}
          <div className="flex-1 flex flex-col gap-2 p-3 min-w-0">
            <div className="h-2 w-3/4 rounded bg-[#E3E0F0]" />
            <div className="h-2 w-1/2 rounded bg-[#E3E0F0]" />
            <div className="h-2 w-2/3 rounded bg-[#E3E0F0]" />
            <div className="h-2 w-1/3 rounded bg-[#E3E0F0]" />
          </div>

          {/* Grabber */}
          <div className="relative flex flex-col items-center justify-center w-[8px] shrink-0 cursor-col-resize bg-transparent">
            <motion.div
              className="w-[4px] rounded-[4px]"
              style={{ backgroundColor: "#472BA4" }}
              animate={{ height: [32, 48, 32] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Animated Smart Panel */}
          <motion.div
            className="shrink-0 border-l border-[#E3E0F0] bg-white flex flex-col overflow-hidden"
            animate={{ width: [120, 220, 120] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
          >
            <div className="px-3 py-2 border-b border-[#E3E0F0] flex items-center justify-between shrink-0">
              <div className="h-2 rounded w-16" style={{ backgroundColor: "#E3E0F0" }} />
              <div className="w-4 h-4 rounded flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#472BA4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 12l-10 0"/><path d="M14 12l-4 4"/><path d="M14 12l-4 -4"/><path d="M20 4l0 16"/>
                </svg>
              </div>
            </div>
            <div className="flex-1 p-3 flex flex-col gap-2">
              <div className="h-1.5 rounded w-full" style={{ backgroundColor: "#E3E0F0" }} />
              <div className="h-1.5 rounded w-4/5" style={{ backgroundColor: "#E3E0F0" }} />
              <div className="h-1.5 rounded w-3/5" style={{ backgroundColor: "#E3E0F0" }} />
            </div>
          </motion.div>
        </div>

        <p className="text-xs mt-3 leading-relaxed" style={{ color: "#67677B" }}>
          Drag the handle to expand or collapse the panel — fits any screen or workflow.
        </p>
      </div>
    </motion.div>
  );
}

function AIQuickActionsSnippet() {
  const [activeFeature, setActiveFeature] = useState("Charts");

  const features = [
    { id: "ApplicationTracker", label: "Application Tracker", live: true },
    { id: "Charts", label: "Charts", live: true },
    { id: "OrderServices", label: "Order Services (Credit)", live: true },
    { id: "Liabilities", label: "Liabilities", live: false },
    { id: "Property", label: "Property", live: false },
  ];

  return (
    <motion.div
      className="rounded-xl border border-[#E3E0F0] bg-white shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15 }}
    >
      {/* Label */}
      <div className="px-4 py-3 border-b border-[#E3E0F0] flex items-center gap-2">
        <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-black" style={{ backgroundColor: "#472BA4" }}>3</div>
        <p className="text-sm font-bold" style={{ color: "#200F51" }}>AI Assistant & Quick Actions</p>
      </div>

      {/* Exact header pill bar from app HTML */}
      <div className="flex items-center gap-2 pt-4 px-4 pb-3">
        <div className="flex flex-1 min-w-0 items-center gap-[8px] p-[4px] rounded-full" style={{ backgroundColor: "#F7F6FF" }}>
          <button
            type="button"
            className="flex flex-1 min-w-0 items-center justify-center gap-1.5 py-[5px] px-3 rounded-full text-[13px] font-bold border border-[#E3E0F0] bg-transparent"
            style={{ color: "#67677b" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12h18"/><path d="M12 21v-18"/><path d="M7.5 7.5l9 9"/><path d="M7.5 16.5l9 -9"/>
            </svg>
            AI Assistant
          </button>
          <div className="relative flex flex-1 min-w-0 items-center justify-center rounded-full bg-white border border-[#E3E0F0] shadow-[0_2px_4px_rgba(0,0,0,0.08)]">
            <select
              value={activeFeature}
              onChange={(e) => setActiveFeature(e.target.value)}
              className="appearance-none bg-transparent w-full px-7 py-[5px] text-center font-bold text-[13px] cursor-pointer outline-none truncate"
              style={{ color: "#472BA4" }}
            >
              {features.filter(f => f.live).map(f => (
                <option key={f.id} value={f.id}>{f.label}</option>
              ))}
            </select>
            <ChevronRight className="pointer-events-none absolute right-2 w-4 h-4 rotate-90" style={{ color: "#472BA4" }} />
          </div>
        </div>
        <button type="button" className="flex shrink-0 items-center justify-center w-9 h-9 rounded-[8px] hover:bg-gray-100 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#472BA4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 12l-10 0"/><path d="M14 12l-4 4"/><path d="M14 12l-4 -4"/><path d="M20 4l0 16"/>
          </svg>
        </button>
      </div>

      {/* Feature grid */}
      <div className="px-4 pb-4">
        <p className="text-[10px] font-bold uppercase tracking-wider mb-2.5" style={{ color: "#67677B" }}>Available Tools</p>
        <div className="grid grid-cols-1 gap-2">
          {features.map((f) => (
            <div
              key={f.id}
              className="flex items-center justify-between px-3 py-2 rounded-lg border"
              style={{
                borderColor: f.live && activeFeature === f.id ? "#472BA4" : "#E3E0F0",
                backgroundColor: f.live && activeFeature === f.id ? "#F7F6FF" : "white",
              }}
            >
              <span className="text-xs font-medium" style={{ color: f.live ? "#200F51" : "#9e9ab0" }}>{f.label}</span>
              {f.live ? (
                <span className="flex items-center gap-1 text-[10px] font-bold" style={{ color: "#2e7d32" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Live
                </span>
              ) : (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#fff8e1", color: "#b45309" }}>
                  Coming Soon
                </span>
              )}
            </div>
          ))}
        </div>
        <p className="text-[11px] mt-3" style={{ color: "#67677B" }}>
          More tools arriving in the coming weeks — Liabilities and Property panels are next.
        </p>
      </div>
    </motion.div>
  );
}

function OrderCreditSnippet() {
  const [jumped, setJumped] = useState<string | null>(null);

  const fields = [
    { id: "borrower-ssn", label: "SSN" },
    { id: "borrower-current-street", label: "Current Street" },
    { id: "borrower-current-city", label: "Current City" },
    { id: "borrower-current-state", label: "Current State" },
    { id: "borrower-current-zip", label: "Current Zip" },
    { id: "borrower-mailing-street", label: "Mailing Street" },
    { id: "borrower-mailing-city", label: "Mailing City" },
    { id: "borrower-mailing-state", label: "Mailing State" },
    { id: "borrower-mailing-zip", label: "Mailing Zip" },
  ];

  const handleJump = (id: string) => {
    setJumped(id);
    setTimeout(() => setJumped(null), 1400);
  };

  return (
    <motion.div
      className="rounded-xl border border-[#E3E0F0] bg-white shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
    >
      {/* Tab bar — exact from HTML */}
      <div role="tablist" className="flex gap-6 border-b border-[#E3E0F0] px-4">
        <button
          role="tab"
          aria-selected
          className="px-1 py-3 text-[14px] font-medium leading-[20px] border-b-2 rounded-t-[8px]"
          style={{ borderBottomColor: "#472BA4", color: "#200f51" }}
        >
          Credit
        </button>
      </div>

      <div className="p-6 flex flex-col gap-[18px]">
        {/* Lock icon + heading */}
        <div className="flex flex-col items-center gap-3 w-full">
          <div className="flex items-center justify-center w-16 h-16 rounded-[16px]" style={{ backgroundColor: "#ede9fa" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ color: "#200F51" }}>
              <path d="M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-10a3 3 0 0 1 -3 -3v-6a3 3 0 0 1 3 -3v-3a5 5 0 0 1 5 -5m0 12a2 2 0 0 0 -1.995 1.85l-.005 .15a2 2 0 1 0 2 -2m0 -10a3 3 0 0 0 -3 3v3h6v-3a3 3 0 0 0 -3 -3" />
            </svg>
          </div>
          <h2 className="text-[18px] font-bold leading-[28px] text-center" style={{ color: "#200F51" }}>
            Finish borrower info to order credit
          </h2>
          <p className="text-[14px] leading-[20px] text-center" style={{ color: "#67677B" }}>
            Credit can be pulled once the required fields are completed.
          </p>
        </div>

        {/* Borrower card — exact from HTML */}
        <div className="flex flex-col gap-1 w-full px-[18px] py-[16px] rounded-[12px]" style={{ backgroundColor: "#fef8f0" }}>
          <p className="text-[16px] font-medium leading-[24px]" style={{ color: "#200F51" }}>Felipe Espino</p>
          <div className="flex gap-1 items-center text-[12px]" style={{ color: "#67677B" }}>
            <span className="font-medium leading-[20px] uppercase">Primary Borrower:</span>
            <span className="leading-[16px]">Remaining fields to pull credit</span>
          </div>
          <div className="h-2" />
          <ul className="flex flex-col gap-[2px] w-full">
            {fields.map((field) => (
              <li key={field.id}>
                <button
                  type="button"
                  onClick={() => handleJump(field.id)}
                  className="flex items-center gap-[13px] px-[8px] py-[4px] rounded-[8px] text-[14px] leading-[20px] w-full text-left transition-all duration-150"
                  style={{
                    color: jumped === field.id ? "#200F51" : "#472BA4",
                    backgroundColor: jumped === field.id ? "rgba(71,43,164,0.1)" : "transparent",
                    outline: jumped === field.id ? "2px solid rgba(71,43,164,0.3)" : "none",
                  }}
                  onMouseEnter={e => { if (jumped !== field.id) e.currentTarget.style.backgroundColor = "rgba(71,43,164,0.05)"; }}
                  onMouseLeave={e => { if (jumped !== field.id) e.currentTarget.style.backgroundColor = "transparent"; }}
                >
                  {/* rounded-arrow-left icon — exact from HTML */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                    <path d="M12 8l-4 4l4 4" /><path d="M16 12h-8" />
                    <path d="M12 3c7.2 0 9 1.8 9 9c0 7.2 -1.8 9 -9 9c-7.2 0 -9 -1.8 -9 -9c0 -7.2 1.8 -9 9 -9" />
                  </svg>
                  <span className="flex-1">{field.label}</span>
                  {jumped === field.id && (
                    <span className="text-[11px] font-semibold" style={{ color: "#472BA4" }}>Navigating…</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

function SelectBorrowersSnippet() {
  const [borrowers, setBorrowers] = useState({ primary: true, co: true });
  const [consents, setConsents] = useState({ primary: true, co: true });
  const [ordered, setOrdered] = useState(false);

  const canOrder = borrowers.primary && consents.primary && (!borrowers.co || consents.co);

  const CheckBox = ({ checked }: { checked: boolean }) => (
    <div
      aria-hidden
      className="size-[24px] shrink-0 rounded-[4px] flex items-center justify-center border-[1.5px] transition-colors"
      style={{ backgroundColor: checked ? "#472BA4" : "white", borderColor: checked ? "#472BA4" : "#d4d0e3" }}
    >
      {checked && (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12l5 5l10 -10" />
        </svg>
      )}
    </div>
  );

  const Avatar = ({ initials }: { initials: string }) => (
    <div className="flex items-center justify-center size-[36px] rounded-full shrink-0 text-[13px] font-bold text-white" style={{ backgroundColor: "#472BA4" }}>
      {initials}
    </div>
  );

  return (
    <motion.div
      className="rounded-xl border border-[#E3E0F0] bg-white shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.12 }}
    >
      {/* Level 2 tab — Credit */}
      <div role="tablist" className="flex gap-6 border-b border-[#E3E0F0] px-4">
        <button role="tab" aria-selected className="px-1 py-3 text-[14px] font-medium leading-[20px] border-b-2 rounded-t-[8px]"
          style={{ borderBottomColor: "#472BA4", color: "#200f51" }}>Credit</button>
      </div>

      {/* Level 3 tabs — View / Order */}
      <div role="tablist" className="flex gap-6 border-b border-[#E3E0F0] px-4">
        <button role="tab" aria-selected={false} className="px-1 py-3 text-[14px] font-medium leading-[20px] border-b-2 border-transparent"
          style={{ color: "#67677B" }}>View</button>
        <button role="tab" aria-selected className="px-1 py-3 text-[14px] font-medium leading-[20px] border-b-2 rounded-t-[8px]"
          style={{ borderBottomColor: "#472BA4", color: "#200f51" }}>Order</button>
      </div>

      <div className="pt-4 flex flex-col gap-[18px] overflow-y-auto px-6 pb-0">
        <p className="text-[14px] leading-[20px]" style={{ color: "#200F51" }}>Pull credit without leaving this application.</p>

        {/* Borrowers */}
        <section className="flex flex-col gap-2 w-full">
          <p className="text-[12px] font-medium uppercase" style={{ color: "#67677B" }}>Borrowers</p>
          <div className="flex flex-col gap-2">
            {[
              { key: "primary" as const, name: "John Homeowner", role: "Primary Borrower", ssn: "***-**-7001", initials: "JH" },
              { key: "co" as const, name: "Mary Homeowner", role: "Co-Borrower", ssn: "***-**-3987", initials: "MH" },
            ].map((b) => (
              <div
                key={b.key}
                role="checkbox"
                aria-checked={borrowers[b.key]}
                tabIndex={0}
                onClick={() => setBorrowers(prev => ({ ...prev, [b.key]: !prev[b.key] }))}
                className="flex rounded-[10px] border bg-white flex-row items-center gap-[10px] cursor-pointer transition-colors px-[14px] py-[12px]"
                style={{ borderColor: borrowers[b.key] ? "#472BA4" : "#E3E0F0", backgroundColor: borrowers[b.key] ? "#f7f6ff" : "white" }}
              >
                <Avatar initials={b.initials} />
                <div className="flex flex-col gap-[2px] flex-1 min-w-0">
                  <p className="text-[14px] font-semibold" style={{ color: "#200F51" }}>{b.name}</p>
                  <p className="text-[11px]" style={{ color: "#67677B" }}>{b.role} · SSN {b.ssn}</p>
                </div>
                <CheckBox checked={borrowers[b.key]} />
              </div>
            ))}
          </div>
        </section>

        {/* Pull Type */}
        <section className="flex flex-col gap-2 w-full">
          <p className="text-[12px] font-medium uppercase" style={{ color: "#67677B" }}>Pull Type</p>
          <div className="flex flex-col rounded-[10px] border bg-white gap-[2px] px-[16px] py-[12px] h-[74px] leading-[20px]"
            style={{ borderColor: "#472BA4" }}>
            <p className="text-[14px] font-medium" style={{ color: "#200F51" }}>Soft Pull</p>
            <p className="text-[12px] font-medium" style={{ color: "#200F51" }}>There is no impact to applicant&apos;s credit score</p>
          </div>
        </section>

        {/* Consents */}
        <section className="flex flex-col gap-2 w-full">
          <p className="text-[12px] font-medium uppercase" style={{ color: "#67677B" }}>Consents</p>
          <div className="flex flex-col rounded-[10px] border border-[#E3E0F0] gap-[10px] p-[12px]">
            <p className="text-[16px] font-medium leading-[24px]" style={{ color: "#200F51" }}>Borrower(s) verbal auth for PreQual credit inquiry</p>
            <p className="text-[12px] leading-[16px]" style={{ color: "#67677B" }}>
              Document PreQual consent for all Borrower(s) to enable the &apos;Order PreQual Inquiry&apos; button.
              NV requires written Borrower Authorization or a Loan Officer signed Loan Application.
            </p>
            {[
              { key: "primary" as const, name: "John Homeowner", role: "Primary Borrower" },
              { key: "co" as const, name: "Mary Homeowner", role: "Co-Borrower" },
            ].map((b) => (
              <div
                key={b.key}
                role="checkbox"
                aria-checked={consents[b.key]}
                tabIndex={0}
                onClick={() => setConsents(prev => ({ ...prev, [b.key]: !prev[b.key] }))}
                className="flex rounded-[10px] border bg-white flex-row items-center gap-[10px] cursor-pointer transition-colors h-[74px] px-[16px] py-[12px]"
                style={{ borderColor: consents[b.key] ? "#472BA4" : "#E3E0F0", backgroundColor: consents[b.key] ? "#f7f6ff" : "white" }}
              >
                <div className="flex flex-1 items-center gap-[24px] min-w-0">
                  <div className="flex items-center justify-center size-[36px] rounded-full shrink-0" style={{ backgroundColor: "#F7F6FF" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#67677B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-[2px] flex-1 min-w-0">
                    <p className="text-[14px] font-bold leading-[20px]" style={{ color: "#200F51" }}>{b.name}</p>
                    <p className="text-[12px] font-medium leading-[20px]" style={{ color: "#200F51" }}>{b.role}</p>
                  </div>
                </div>
                <CheckBox checked={consents[b.key]} />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer — Order Credit button */}
      <footer className="shrink-0 flex items-center justify-center pt-[14px] pb-[16px] px-[22px] border-t mt-4 w-full bg-white" style={{ borderColor: "#eeecf6" }}>
        <button
          type="button"
          onClick={() => { if (canOrder) { setOrdered(true); setTimeout(() => setOrdered(false), 2000); } }}
          className="flex items-center justify-center h-[32px] px-[16px] rounded-[8px] text-[14px] font-medium leading-[24px] transition-colors"
          style={{
            backgroundColor: canOrder ? "#472BA4" : "#67677b",
            color: canOrder ? "white" : "#e2e2e6",
            cursor: canOrder ? "pointer" : "not-allowed",
          }}
        >
          {ordered ? "Credit Ordered!" : "Order Credit"}
        </button>
      </footer>
    </motion.div>
  );
}

function ViewCreditSnippet() {
  const [imported, setImported] = useState<string | null>(null);

  const handleImport = (id: string) => {
    setImported(id);
    setTimeout(() => setImported(null), 1600);
  };

  const StatRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-center justify-between py-[8px] border-b border-[#E3E0F0] last:border-b-0">
      <span className="text-[12px] font-medium leading-[20px]" style={{ color: "#200F51" }}>{label}</span>
      <span className="text-[12px] font-bold leading-[20px]" style={{ color: "#200F51" }}>{value}</span>
    </div>
  );

  const FieldPair = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col gap-[2px]">
      <span className="text-[9px] font-normal leading-none" style={{ color: "#67677B" }}>{label}</span>
      <span className="text-[12px] font-medium leading-[20px]" style={{ color: "#200F51" }}>{value}</span>
    </div>
  );

  const employers = [
    {
      id: "acme",
      borrower: "primary",
      label: "Employer 1",
      employer: "ACME CORPORATION",
      position: "REGIONAL OPERATIONS MANAGER",
      startDate: "2021-06-01",
      endDate: null,
      status: "Active",
      verDate: "2026-04-12",
      income: "$142,500",
      tenure: "4 yr 11 mth",
      incomeYear: "2025",
      effectiveDate: "2026-04-12",
      canImport: true,
    },
    {
      id: "contoso",
      borrower: "primary",
      label: "Employer 2",
      employer: "CONTOSO LLC",
      position: "WAREHOUSE SUPERVISOR",
      startDate: "2017-03-15",
      endDate: "2021-05-28",
      status: "Inactive",
      verDate: "2026-04-12",
      income: null,
      tenure: null,
      incomeYear: null,
      effectiveDate: null,
      canImport: false,
    },
    {
      id: "northstar",
      borrower: "co",
      label: "Employer 1",
      employer: "NORTHSTAR CONSULTING",
      position: "SENIOR ANALYST",
      startDate: "2020-01-15",
      endDate: null,
      status: "Active",
      verDate: "2026-04-12",
      income: "$95,000",
      tenure: "6 yr 2 mth",
      incomeYear: "2025",
      effectiveDate: "2026-04-12",
      canImport: true,
    },
  ];

  const EmployerCard = ({ emp }: { emp: typeof employers[0] }) => (
    <div className="flex flex-col rounded-[10px] border border-[#E3E0F0] bg-white relative overflow-hidden px-[14px] py-[12px]">
      <button
        aria-label={`Import ${emp.employer}`}
        disabled={!emp.canImport}
        onClick={() => emp.canImport && handleImport(emp.id)}
        className="absolute right-0 top-0 flex w-[38px] items-center justify-center p-[10px] rounded-bl transition-colors"
        style={{ backgroundColor: emp.canImport ? (imported === emp.id ? "#2e7d32" : "#472BA4") : "#E3E0F0", cursor: emp.canImport ? "pointer" : "not-allowed" }}
      >
        {imported === emp.id ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5l10 -10"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={emp.canImport ? "white" : "#67677B"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 12H3"/><path d="M16 6H3"/><path d="M16 18H3"/><path d="M18 9v6"/><path d="M21 12h-6"/>
          </svg>
        )}
      </button>
      <div className="flex flex-col gap-[10px]">
        <div className="flex min-w-0 items-center gap-[6px] pr-[44px]">
          <span className="truncate text-[14px] font-medium" style={{ color: "#200F51" }}>{emp.label}</span>
          {imported === emp.id && <span className="text-[10px] font-bold" style={{ color: "#2e7d32" }}>Imported!</span>}
        </div>
        <div className="flex flex-col gap-[12px]">
          <FieldPair label="Employer" value={emp.employer} />
          <FieldPair label="Position" value={emp.position} />
        </div>
        <div className="flex flex-col gap-[12px]">
          <FieldPair label="Start Date" value={emp.startDate} />
          {emp.endDate && <FieldPair label="End Date" value={emp.endDate} />}
        </div>
        <div className="flex flex-col gap-[12px]">
          <FieldPair label="Verification Status" value={emp.status} />
          <FieldPair label="Verification Date" value={emp.verDate} />
        </div>
        {emp.income && (
          <div className="flex flex-col gap-[12px]">
            <FieldPair label="Annual Income" value={emp.income} />
            {emp.tenure && <FieldPair label="Tenure" value={emp.tenure} />}
            {emp.incomeYear && <FieldPair label="Income Year" value={emp.incomeYear} />}
            {emp.effectiveDate && <FieldPair label="Effective Date" value={emp.effectiveDate} />}
          </div>
        )}
      </div>
    </div>
  );

  const BorrowerCol = ({ label, color, workSince, empIds }: { label: string; color: string; workSince: string; empIds: string[] }) => (
    <div className="flex flex-1 flex-col">
      <div className="px-3 py-2 rounded-t-[8px]" style={{ backgroundColor: color }}>
        <span className="text-sm font-semibold text-white">{label}</span>
      </div>
      <div className="flex flex-1 flex-col gap-[16px] pt-0">
        <div className="flex flex-col gap-[8px]">
          <div className="flex flex-col items-start px-[16px] py-[8px]">
            <span className="text-[12px] font-medium" style={{ color: "#200F51" }}>Work Number</span>
            <span className="text-[12px] font-bold" style={{ color: "#200F51" }}>Active · since {workSince}</span>
          </div>
          <div className="flex flex-col gap-[8px]">
            {employers.filter(e => empIds.includes(e.id)).map(emp => (
              <EmployerCard key={emp.id} emp={emp} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      className="rounded-xl border border-[#E3E0F0] bg-white shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.14 }}
    >
      {/* Level 2 tab */}
      <div role="tablist" className="flex gap-6 border-b border-[#E3E0F0] px-4">
        <button role="tab" aria-selected className="px-1 py-3 text-[14px] font-medium leading-[20px] border-b-2 rounded-t-[8px]"
          style={{ borderBottomColor: "#472BA4", color: "#200f51" }}>Credit</button>
      </div>

      {/* Level 3 tabs — View active */}
      <div role="tablist" className="flex gap-6 border-b border-[#E3E0F0] px-4">
        <button role="tab" aria-selected className="px-1 py-3 text-[14px] font-medium leading-[20px] border-b-2 rounded-t-[8px]"
          style={{ borderBottomColor: "#472BA4", color: "#200f51" }}>View</button>
        <button role="tab" aria-selected={false} className="px-1 py-3 text-[14px] font-medium leading-[20px] border-b-2 border-transparent"
          style={{ color: "#67677B" }}>Order</button>
      </div>

      <div className="px-[22px] pb-[18px] pt-[18px] flex flex-col gap-[14px]">
        <p className="text-[20px] font-bold leading-[28px]" style={{ color: "#200F51" }}>Order from 4/15/2026</p>

        {/* Credit scores side by side */}
        <div className="flex gap-[14px]">
          {[
            { label: "Primary Borrower", color: "#200F51", score: 720 },
            { label: "Co-Borrower", color: "#472BA4", score: 680 },
          ].map((b) => (
            <div key={b.label} className="flex flex-1 flex-col">
              <div className="px-3 py-2 rounded-t-[8px]" style={{ backgroundColor: b.color }}>
                <span className="text-sm font-semibold text-white">{b.label}</span>
              </div>
              <div className="pt-4">
                <div className="flex flex-col border border-[#E3E0F0] bg-white rounded-[16px] items-center justify-center gap-[4px] p-[12px]">
                  <p className="text-[9px] font-bold leading-normal uppercase" style={{ color: "#67677B" }}>equifax</p>
                  <p className="text-[24px] font-bold leading-none" style={{ color: "#200f51" }}>{b.score}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <section className="flex flex-col gap-[8px] w-full">
          <p className="text-[12px] font-medium uppercase" style={{ color: "#67677B" }}>Summary</p>
          <div className="flex flex-col rounded-[10px] border border-[#E3E0F0] bg-white px-[16px]">
            <StatRow label="Tradelines" value="3" />
            <StatRow label="Total Balances" value="$337,000" />
            <StatRow label="Monthly Obligations" value="$2,350" />
            <StatRow label="Public Records" value="None" />
          </div>
        </section>

        {/* Key Stats */}
        <section className="flex flex-col gap-[8px] w-full">
          <p className="text-[12px] font-medium uppercase" style={{ color: "#67677B" }}>Key Stats</p>
          <div className="flex flex-col rounded-[10px] border border-[#E3E0F0] bg-white px-[16px]">
            <StatRow label="30-Day Lates" value="1" />
          </div>
        </section>

        {/* Employment */}
        <section className="flex flex-col gap-[8px] w-full">
          <p className="text-[12px] font-medium uppercase" style={{ color: "#67677B" }}>Employment</p>
          <div className="flex gap-[14px]">
            <BorrowerCol label="Primary Borrower" color="#200F51" workSince="2021" empIds={["acme", "contoso"]} />
            <BorrowerCol label="Co-Borrower" color="#472BA4" workSince="2020" empIds={["northstar"]} />
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="shrink-0 flex items-center justify-center pt-[14px] pb-[16px] px-[22px] border-t w-full bg-white" style={{ borderColor: "#eeecf6" }}>
        <button type="button" className="flex items-center justify-center h-[32px] px-[16px] rounded-[8px] text-[14px] font-medium leading-[24px] text-white"
          style={{ backgroundColor: "#472BA4" }}>
          View Full Report
        </button>
      </footer>
    </motion.div>
  );
}

function SmartCreditSnippet() {
  return (
    <motion.div
      className="rounded-xl border border-orange-200 bg-white shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
    >
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2.5 flex items-center justify-between">
        <span className="text-white text-xs font-bold uppercase tracking-wide">AI Analysis</span>
        <Brain className="w-4 h-4 text-white/80" />
      </div>
      <div className="p-3 space-y-2">
        {[
          { color: "bg-red-500", bg: "bg-red-50 border-red-200", text: "text-red-700", label: "2 derogatory marks found" },
          { color: "bg-amber-500", bg: "bg-amber-50 border-amber-200", text: "text-amber-700", label: "3 hard inquiries (90 days)" },
          { color: "bg-green-500", bg: "bg-green-50 border-green-200", text: "text-green-700", label: "742 mid-score · 8yr avg age" },
        ].map((item) => (
          <div key={item.label} className={`flex items-center gap-2 p-2 rounded-lg border ${item.bg}`}>
            <span className={`w-2 h-2 rounded-full ${item.color} flex-shrink-0`} />
            <span className={`text-xs font-medium ${item.text}`}>{item.label}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-orange-100 bg-orange-50 px-3 py-2.5">
        <p className="text-xs text-orange-600 font-medium italic">
          &ldquo;Consider addressing the $1,200 collection before close...&rdquo;
        </p>
      </div>
    </motion.div>
  );
}

function SectionsNavSnippet() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    "Borrower Info",
    "Employment & Income",
    "Assets",
    "Liabilities",
    "REO/VOM",
    "Declarations/HMDA",
  ];

  const tabContent = [
    // Borrower Info
    <div key="bi" className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        {["First Name", "Last Name", "Date of Birth", "SSN"].map((f) => (
          <div key={f} className="flex flex-col gap-1">
            <p className="text-[10px] font-medium" style={{ color: "#200f51" }}>{f}</p>
            <div className="rounded-[8px] ring-2 ring-[#d9923b] h-8 flex items-center px-3 bg-white text-xs" style={{ color: "#14141A" }}>
              {f === "First Name" ? "John" : f === "Last Name" ? "Homeowner" : f === "Date of Birth" ? "01/15/1985" : "•••-••-6789"}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[10px] font-medium" style={{ color: "#200f51" }}>Current Address</p>
        <div className="rounded-[8px] ring-1 ring-[#e3e0f0] h-8 flex items-center px-3 bg-white text-xs" style={{ color: "#14141A" }}>123 Oak Street, Austin, TX 78701</div>
      </div>
      <p className="text-[10px]" style={{ color: "#67677B" }}>Prepopulated from Salesforce — verify and continue.</p>
    </div>,

    // Employment & Income
    <div key="ei" className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <p className="text-[10px] font-medium" style={{ color: "#200f51" }}>Income Type</p>
        <div className="rounded-lg overflow-hidden border border-[#e3e0f0] flex divide-x divide-[#e3e0f0]" style={{ boxShadow: "rgba(0,0,0,0.04) 0px 1px 8px" }}>
          {["Employed", "Self Employed", "Retired"].map((t, i) => (
            <button key={t} className="flex-1 h-9 px-2 text-xs font-medium flex items-center justify-center" style={{ backgroundColor: i === 0 ? "#4022BA" : "white", color: i === 0 ? "white" : "#14141A" }}>{t}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {["Employer Name", "Start Date", "Base Income", "Pay Period"].map((f) => (
          <div key={f} className="flex flex-col gap-1">
            <p className="text-[10px] font-medium" style={{ color: "#200f51" }}>{f}</p>
            <div className="rounded-[8px] ring-1 ring-[#e3e0f0] h-8 flex items-center px-3 bg-white text-xs" style={{ color: "#14141A" }}>
              {f === "Employer Name" ? "GoodLeap LLC" : f === "Start Date" ? "03/2019" : f === "Base Income" ? "$8,200" : "Monthly"}
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-lg px-3 py-2 flex items-center justify-between" style={{ backgroundColor: "#F7F6FF" }}>
        <p className="text-[10px] font-semibold" style={{ color: "#200f51" }}>Total Qualifying Income</p>
        <p className="text-sm font-black" style={{ color: "#200f51" }}>$8,200 / mo</p>
      </div>
    </div>,

    // Assets
    <div key="assets" className="flex flex-col gap-2">
      <div className="rounded-lg overflow-hidden border border-[#E3E0F0]">
        <div className="flex items-center px-3 py-1.5 border-b text-[10px] font-medium" style={{ borderColor: "#ada6bf", color: "#200F51" }}>
          <span className="flex-1">Account</span>
          <span className="w-20">Institution</span>
          <span className="w-20 text-right">Balance</span>
        </div>
        {[
          { type: "Checking", bank: "Chase", bal: "$12,400" },
          { type: "Savings", bank: "Chase", bal: "$38,000" },
          { type: "401(k)", bank: "Fidelity", bal: "$84,500" },
        ].map((row) => (
          <div key={row.type} className="flex items-center px-3 py-2 border-b border-[#E3E0F0] text-xs">
            <span className="flex-1 font-medium" style={{ color: "#14141A" }}>{row.type}</span>
            <span className="w-20" style={{ color: "#67677B" }}>{row.bank}</span>
            <span className="w-20 text-right font-semibold" style={{ color: "#200f51" }}>{row.bal}</span>
          </div>
        ))}
      </div>
      <p className="text-[10px]" style={{ color: "#67677B" }}>Total liquid assets: <strong style={{ color: "#200f51" }}>$50,400</strong></p>
    </div>,

    // Liabilities
    <div key="liab" className="flex flex-col gap-2">
      <div className="rounded-lg overflow-hidden border border-[#E3E0F0]">
        <div className="flex items-center px-2 py-1.5 border-b text-[10px] font-medium" style={{ borderColor: "#ada6bf", color: "#200F51" }}>
          <span className="flex-1">Creditor</span>
          <span className="w-16">Balance</span>
          <span className="w-14">Payment</span>
          <span className="w-12 text-center">Excl.</span>
        </div>
        {[
          { name: "TOYOTA CREDIT", bal: "$15,838", pmt: "$482", excl: false },
          { name: "CHASE VISA", bal: "$5,000", pmt: "$257", excl: false },
          { name: "STUDENT LOAN", bal: "$22,000", pmt: "$310", excl: true },
        ].map((row) => (
          <div key={row.name} className="flex items-center px-2 py-1.5 border-b border-[#E3E0F0] text-xs">
            <span className="flex-1 font-medium" style={{ color: "#14141A" }}>{row.name}</span>
            <span className="w-16" style={{ color: "#14141A" }}>{row.bal}</span>
            <span className="w-14" style={{ color: "#14141A" }}>{row.pmt}</span>
            <div className="w-12 flex justify-center">
              <div className={`w-4 h-4 rounded-[4px] border flex items-center justify-center ${row.excl ? "bg-gray-900 border-gray-900" : "bg-white border-[#d4d0e3]"}`}>
                {row.excl && <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>}
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[10px]" style={{ color: "#67677B" }}>DTI updates in real time as you toggle exclude flags.</p>
    </div>,

    // REO/VOM
    <div key="reo" className="flex flex-col gap-3">
      <div className="rounded-lg border border-[#E3E0F0] overflow-hidden">
        <div className="px-3 py-2 border-b border-[#E3E0F0] flex items-center justify-between" style={{ backgroundColor: "#F7F6FF" }}>
          <p className="text-xs font-semibold" style={{ color: "#200f51" }}>123 Oak Street, Austin TX</p>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: "#e3e0f0", color: "#472BA4" }}>Subject Property</span>
        </div>
        <div className="px-3 py-2 grid grid-cols-2 gap-2">
          {["Mortgage Payment", "Property Tax", "Insurance", "HOA"].map((f) => (
            <div key={f} className="flex flex-col gap-0.5">
              <p className="text-[10px]" style={{ color: "#67677B" }}>{f}</p>
              <p className="text-xs font-semibold" style={{ color: "#14141A" }}>{f === "Mortgage Payment" ? "$2,140" : f === "Property Tax" ? "$412" : f === "Insurance" ? "$98" : "—"}</p>
            </div>
          ))}
        </div>
        <div className="px-3 py-2 border-t border-[#E3E0F0] flex items-center gap-2">
          <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: "#472BA4" }} />
          <p className="text-[10px]" style={{ color: "#67677B" }}>Linked to TOYOTA CREDIT liability — payment autofilled</p>
        </div>
      </div>
    </div>,

    // Declarations/HMDA
    <div key="decl" className="flex flex-col gap-2">
      {[
        { q: "Are you a US citizen or permanent resident?", a: "Yes" },
        { q: "Do you intend to occupy the property as your primary residence?", a: "Yes" },
        { q: "Have you had any bankruptcy in the last 7 years?", a: "No" },
        { q: "Are there any outstanding judgments against you?", a: "No" },
      ].map((item, i) => (
        <div key={i} className="flex items-start gap-3 px-3 py-2 rounded-lg border border-[#E3E0F0] bg-white">
          <p className="flex-1 text-xs leading-relaxed" style={{ color: "#14141A" }}>{item.q}</p>
          <span className="text-xs font-bold flex-shrink-0 px-2 py-0.5 rounded-full" style={{
            backgroundColor: item.a === "Yes" ? "#e8f5e9" : "#fce8e8",
            color: item.a === "Yes" ? "#2e7d32" : "#c62828",
          }}>{item.a}</span>
        </div>
      ))}
      <p className="text-[10px]" style={{ color: "#67677B" }}>Unanswered questions stay at top — answered ones sort to the bottom.</p>
    </div>,
  ];

  return (
    <motion.div
      className="rounded-xl border border-[#E3E0F0] bg-white shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.05 }}
    >
      {/* Exact tab bar from app HTML */}
      <div role="tablist" className="flex border-b border-[#E3E0F0] bg-white overflow-x-auto px-2 gap-1">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === i}
            onClick={() => setActiveTab(i)}
            className="px-[4px] py-[12px] text-[13px] font-medium leading-[20px] border-b-2 rounded-t-[8px] whitespace-nowrap flex-shrink-0 transition-colors"
            style={{
              borderBottomColor: activeTab === i ? "#472BA4" : "transparent",
              color: activeTab === i ? "#200f51" : "#67677B",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="p-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
        >
          {tabContent[activeTab]}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Feature type definitions
// ---------------------------------------------------------------------------

type FeatureScreenshot = { src: string; alt: string; caption: string };

type FeatureSection = {
  title: string;
  bullets: string[];
};

type FeatureStep = {
  title: string;
  description: string;
};

type Feature = {
  id: string;
  icon: typeof ClipboardList;
  title: string;
  tagline: string;
  description: string;
  details?: string[];
  sections?: FeatureSection[];
  steps?: FeatureStep[];
  howItHelps: string;
  color: "orange" | "blue" | "emerald";
  flagship?: boolean;
  screenshots?: FeatureScreenshot[];
  screenshotPlaceholders?: { path: string; label: string }[];
  videoSrc?: string;
  videoEmbedUrl?: string;
  videoPoster?: string;
  videoTitle?: string;
  hasVideo?: boolean;
};

// ---------------------------------------------------------------------------
// Feature data
// ---------------------------------------------------------------------------

const features: Feature[] = [
  {
    id: "full-1003",
    icon: ClipboardList,
    title: "Full 1003 Application",
    tagline: "A fully digital URLA — purpose-built for GoodLeap LOs, inside LinkAI",
    description:
      "The 1003 now lives entirely inside LinkAI. It follows the URLA standard you already know — no new login, no switching systems, no re-entry. Fields prepopulate from Salesforce and Encompass so you start with what you already have. Everything is on one page, and every section saves automatically as you go.",
    sections: [
      {
        title: "The Loan Bar — Always Know Where You Stand",
        bullets: [
          "Customer name, loan amount, and subject property city/state always visible at the top",
          "DTI and LTV remain present as you scroll through every section — no guessing mid-conversation",
        ],
      },
      {
        title: "URLA Sections That Work With You",
        bullets: [
          "Fields prepopulated from Salesforce and Encompass — start with data you already have",
          "Current Address auto-syncs from Subject Property; Mailing Address syncs from Current — one entry, not three",
          "Employment fields are conditional on income type — only shows what's relevant (Employed, Self-Employed, Retired)",
          "Income summary calculates in real time — total qualifying income always visible as you go",
          "Liabilities mirrors the credit report — ECOA, balance, utilization, payment, and rate all in one place",
          "Flag liabilities for payoff or DTI exclusion; edit account types inline without leaving the section",
          "Declarations keep unanswered questions front and center — answered ones sort to the bottom automatically",
          "HMDA script is built in and prominent to keep every file compliant",
        ],
      },
      {
        title: "Co-Borrower Split Screen",
        bullets: [
          "Toggle co-borrower on and the screen splits — borrower on the left, co-borrower on the right",
          "Employment, income history, declarations, and demographics all side by side",
          "\"Same as Borrower\" on the address section — no re-entering the same data twice",
          "Combined income summary always visible at the bottom — one number, both borrowers",
        ],
      },
    ],
    howItHelps:
      "The Full 1003 replaces Encompass for the application conversation. It's faster, it's prepopulated, and it keeps the LO focused on the borrower — not the software.",
    color: "blue",
    screenshots: [],
    screenshotPlaceholders: [
      { path: "public/screenshots/v3-0/full-1003/loan-bar.png", label: "Loan Bar — customer name, loan amount, DTI, LTV always visible" },
      { path: "public/screenshots/v3-0/full-1003/address-sync.png", label: "Address sections — auto-sync from Subject Property" },
      { path: "public/screenshots/v3-0/full-1003/employment.png", label: "Employment — income type dropdown and conditional fields" },
      { path: "public/screenshots/v3-0/full-1003/liabilities.png", label: "Liabilities — payoff/DTI exclusion flags and View Credit Report" },
      { path: "public/screenshots/v3-0/full-1003/co-borrower-split.png", label: "Co-Borrower split screen with combined income summary" },
    ],
  },
  {
    id: "smart-panel",
    icon: PanelRight,
    title: "Smart Panel",
    tagline: "Your most important loan data, always one click away",
    description:
      "LOs constantly lose their place switching between tabs to check a borrower's credit score, income total, or property details. The Smart Panel solves that. It pulls the key facts from the active loan file and surfaces them right alongside whatever screen you're already on — so you never have to leave to look something up.",
    steps: [
      {
        title: "Always-on loan context",
        description:
          "A collapsible side panel that lives alongside any screen in LinkAI. It surfaces property details, credit score summary, income snapshot, and key alerts — pulled from the active loan file. Open it when you need context, collapse it when you don't.",
      },
      {
        title: "Resize to fit your screen",
        description:
          "Drag the handle on the left edge to make the panel as wide or as narrow as you want. Whether you have a single monitor or an ultra-wide setup, the panel fits your workflow — not the other way around.",
      },
      {
        title: "AI Assistant & Quick Actions",
        description:
          "Switch between AI Assistant and built-in tools — Application Tracker, Charts, and Order Services — from a single pill bar at the top. Liabilities and Property panels are coming in the next few weeks.",
      },
    ],
    howItHelps:
      "Stop jumping between tabs to remember a borrower's credit score mid-call. The Smart Panel keeps key facts visible without breaking your flow.",
    color: "emerald",
    screenshots: [],
  },
  {
    id: "smart-credit",
    icon: CreditCard,
    title: "Smart Credit",
    tagline: "Scores, income, and employment — the full credit workflow in one place",
    description:
      "Smart Credit brings the entire credit workflow inside LinkAI. Pull credit the moment you're ready, verify income through Work Number in the same step, and review scores, tradelines, and key stats instantly — no PDF, no switching tabs, no separate system.",
    steps: [
      {
        title: "Know exactly what's needed before you pull",
        description: "LinkAI checks required fields before credit can be pulled and shows you exactly what's missing — SSN, address, and more. Click any item to jump directly to that field in the 1003 and complete it without losing your place.",
      },
      {
        title: "Select borrowers & capture consent",
        description: "Choose which borrowers to include, select Soft Pull to protect their credit score, and confirm verbal PreQual authorization for each borrower — all in a single step before the pull.",
      },
      {
        title: "Credit results & verified income, in one step",
        description: "Credit scores, tradelines, balances, and obligations populate instantly. If Work Number is available, verified employment and income come back in the same pull — ready to import directly into the 1003.",
      },
    ],
    howItHelps:
      "The average LO spends 8–12 minutes on credit and income verification across multiple systems. Smart Credit collapses that into seconds — scores, income, and employment all verified in one place, ready to close.",
    color: "orange",
    flagship: true,
    hasVideo: false,
    screenshots: [],
    screenshotPlaceholders: [
      { path: "public/screenshots/v3-0/smart-credit/overview.png", label: "Smart Credit — AI summary overview" },
      { path: "public/screenshots/v3-0/smart-credit/derogatory-flags.png", label: "Derogatory marks highlighted" },
      { path: "public/screenshots/v3-0/smart-credit/talking-points.png", label: "AI-generated borrower talking points" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Color map
// ---------------------------------------------------------------------------

const colorMap = {
  orange: {
    bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700",
    light: "bg-orange-100", icon: "bg-orange-500", gradient: "from-orange-500 to-amber-500",
    badge: "bg-orange-500", pill: "bg-orange-100 text-orange-700", accent: "bg-orange-500",
    sectionBg: "bg-white",
  },
  blue: {
    bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700",
    light: "bg-blue-100", icon: "bg-blue-500", gradient: "from-blue-500 to-sky-500",
    badge: "bg-blue-500", pill: "bg-blue-100 text-blue-700", accent: "bg-blue-500",
    sectionBg: "bg-white",
  },
  emerald: {
    bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700",
    light: "bg-emerald-100", icon: "bg-emerald-500", gradient: "from-emerald-500 to-teal-500",
    badge: "bg-emerald-500", pill: "bg-emerald-100 text-emerald-700", accent: "bg-emerald-500",
    sectionBg: "bg-gray-50",
  },
};

// ---------------------------------------------------------------------------
// Feature Section (Apple-style full-width)
// ---------------------------------------------------------------------------

const sectionNumbers = ["01", "02", "03"];

function FullFeatureSection({ feature, index }: { feature: Feature; index: number }) {
  const colors = colorMap[feature.color];
  const Icon = feature.icon;

  const snippets = {
    "full-1003": [<LoanBarSnippet key="loan" />, <SectionsNavSnippet key="nav" />, <IncomeTypeSnippet key="income" />, <LiabilitiesRowSnippet key="liab" />, <CoBorrowerSnippet key="co" />],
    "smart-panel": [<PanelOverviewSnippet key="panel-overview" />, <PanelResizeSnippet key="panel-resize" />, <AIQuickActionsSnippet key="panel-ai" />],
    "smart-credit": [<OrderCreditSnippet key="order-credit" />, <SelectBorrowersSnippet key="select-borrowers" />, <ViewCreditSnippet key="view-credit" />],
  };

  const featureSnippets = snippets[feature.id as keyof typeof snippets] ?? [];

  return (
    <section
      id={feature.id}
      className={`${colors.sectionBg} ${feature.flagship ? "" : "border-b border-gray-100"}`}
    >
      {/* Flagship orange band */}
      {feature.flagship && (
        <div className={`bg-gradient-to-r ${colors.gradient} py-3 px-6`}>
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-white font-bold text-sm tracking-wide uppercase">
              Flagship Feature — Smart Credit
            </span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* ① Section header — full width */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xs font-black tracking-widest ${colors.text} uppercase`}>
              {sectionNumbers[index]}
            </span>
            <div className={`h-px flex-1 ${colors.border} border-t`} />
          </div>
          <div className="flex items-start gap-5">
            <div className={`w-14 h-14 rounded-2xl ${colors.icon} flex items-center justify-center shadow-lg flex-shrink-0 mt-1`}>
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h2 className="text-4xl font-black text-gray-900 tracking-tight">{feature.title}</h2>
                {feature.flagship && (
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 ${colors.badge} text-white rounded-full text-xs font-black shadow-sm`}>
                    <Sparkles className="w-3 h-3" />
                    FLAGSHIP
                  </span>
                )}
              </div>
              <p className={`text-lg font-medium ${colors.text}`}>{feature.tagline}</p>
            </div>
          </div>
        </motion.div>

        {/* ② Description — full width prose */}
        <motion.div
          className="mb-10 max-w-3xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
        </motion.div>

        {/* ③ Layout — steps get per-row treatment; sections/details get 40/60 split */}
        {feature.steps ? (
          // Per-step rows: each step's description (left 40%) beside its snippet (right 60%)
          <div className="flex flex-col gap-16 mb-12">
            {feature.steps.map((step, sIdx) => (
              <motion.div
                key={sIdx}
                className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.05 * sIdx }}
              >
                {/* Left — step number + title + description + how it helps (last step) */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0" style={{ backgroundColor: "#472BA4" }}>
                      {sIdx + 1}
                    </div>
                    <p className={`font-bold text-base ${colors.text}`}>{step.title}</p>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                  {sIdx === feature.steps!.length - 1 && (
                    <div className={`rounded-2xl border-2 ${colors.border} ${colors.bg} p-5 mt-2`}>
                      <p className="text-xs font-black text-gray-900 uppercase tracking-wide mb-2">How this helps you</p>
                      <p className="text-gray-700 leading-relaxed text-sm">{feature.howItHelps}</p>
                    </div>
                  )}
                </div>
                {/* Right — corresponding snippet */}
                <div className="lg:col-span-3">
                  {featureSnippets[sIdx] && (
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${colors.text} text-center`}>Live Preview</p>
                      <div style={{ zoom: 0.62, transformOrigin: "top center" }}>
                        {featureSnippets[sIdx]}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          // Standard 40/60 split: bullets left, snippets right
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12 items-center">

            {/* LEFT — feature breakdown + how it helps */}
            <motion.div
              className="lg:col-span-2 flex flex-col gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {feature.sections ? (
                feature.sections.map((section, sIdx) => (
                  <div key={sIdx} className={`rounded-2xl ${colors.light} overflow-hidden`}>
                    <div className={`px-4 py-3 border-b ${colors.border}`}>
                      <p className={`font-bold text-sm ${colors.text}`}>{section.title}</p>
                    </div>
                    <ul className="p-4 flex flex-col gap-2">
                      {section.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle className={`w-4 h-4 ${colors.text} mt-0.5 flex-shrink-0`} />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : feature.details && feature.details.length > 0 ? (
                <div className={`rounded-2xl ${colors.light} p-5`}>
                  <p className="font-bold text-gray-700 mb-3 text-sm">What&apos;s included:</p>
                  <ul className="flex flex-col gap-2.5">
                    {feature.details.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className={`w-4 h-4 ${colors.text} mt-0.5 flex-shrink-0`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* How it helps callout */}
              <div className={`rounded-2xl border-2 ${colors.border} ${colors.bg} p-5`}>
                <p className="text-xs font-black text-gray-900 uppercase tracking-wide mb-2">How this helps you</p>
                <p className="text-gray-700 leading-relaxed text-sm">{feature.howItHelps}</p>
              </div>
            </motion.div>

            {/* RIGHT — live preview snippets */}
            {featureSnippets.length > 0 && (
              <motion.div
                className="lg:col-span-3 flex flex-col gap-3"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <p className={`text-xs font-bold uppercase tracking-wider text-center ${colors.text}`}>Live Preview</p>
                {featureSnippets.map((snippet, i) => (
                  <div key={i}>{snippet}</div>
                ))}
              </motion.div>
            )}
          </div>
        )}

        {/* Video (Smart Credit flagship) */}
        {feature.hasVideo && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Demo Video</p>
            <VideoPlayer
              src={feature.videoSrc}
              embedUrl={feature.videoEmbedUrl}
              poster={feature.videoPoster}
              title={feature.videoTitle ?? feature.title}
            />
          </motion.div>
        )}

        {/* Screenshot carousel — only shown when actual screenshots are uploaded */}
        {(feature.screenshots ?? []).filter(s => s.src).length > 0 && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Screenshots</p>
            <ScreenshotCarousel
              screenshots={feature.screenshots ?? []}
              placeholders={[]}
              accentColor={colors.accent}
            />
          </motion.div>
        )}

      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

const heroLines = [
  "The Full 1003.",
  "Smart Panel.",
  "Smart Credit.",
];

const stats = [
  { icon: LogIn, value: "0", label: "extra logins" },
  { icon: ListChecks, value: "Every", label: "1003 section covered" },
  { icon: Brain, value: "AI-powered", label: "credit reads" },
];

export default function V30ReleasePage() {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => window.print();

  const handleCopy = async () => {
    try {
      const htmlBlob = new Blob([emailContentHtml], { type: "text/html" });
      const textBlob = new Blob([emailContentPlain], { type: "text/plain" });
      await navigator.clipboard.write([
        new ClipboardItem({ "text/html": htmlBlob, "text/plain": textBlob }),
      ]);
    } catch {
      await navigator.clipboard.writeText(emailContentPlain);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navItems = [
    { id: "full-1003", label: "Full 1003", icon: ClipboardList, color: "text-blue-600" },
    { id: "smart-panel", label: "Smart Panel", icon: PanelRight, color: "text-emerald-600" },
    { id: "smart-credit", label: "Smart Credit", icon: CreditCard, color: "text-orange-600" },
  ];

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      <style jsx global>{`
        .vignette-overlay, .grain-overlay { display: none !important; }
        body { background: white !important; }
        @media print {
          body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .no-print { display: none !important; }
          @page { margin: 0.5in; size: letter; }
        }
      `}</style>

      <main className="min-h-screen bg-white text-gray-900 relative z-10">

        {/* ── HERO ── */}
        <section className="relative flex flex-col justify-center bg-white border-b border-gray-100 overflow-hidden">

          {/* Subtle background gradient blob */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-orange-100/60 to-amber-50/40 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-100/40 to-sky-50/30 blur-3xl" />
          </div>

          <div className="relative max-w-5xl mx-auto px-6 pt-10 pb-8 w-full">

            {/* Top bar: back + actions */}
            <div className="flex items-center justify-between mb-16 no-print">
              <Link
                href="/releases"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">All Releases</span>
              </Link>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors text-sm font-semibold shadow-sm"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy Email"}
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-colors text-sm font-semibold shadow-sm"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </button>
              </div>
            </div>

            {/* Logo + version */}
            <motion.div
              className="flex items-center gap-5 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="https://cdn.bfldr.com/Q445447Z/at/n85kkcjq5q8r3n6nf4z5jsw/LinkAI_BG_FullGradonBlk.svg?auto=webp&format=svg"
                alt="LinkAI"
                width={100}
                height={30}
                className="h-7 w-auto"
                unoptimized
              />
              <span className="text-gray-200 text-2xl font-thin">/</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold border border-green-200">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Live Now
              </span>
              <span className="text-sm text-gray-400">June 17th, 2026</span>
            </motion.div>

            {/* V3.0 + feature lines side by side */}
            <div className="flex items-center gap-6 flex-wrap">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-[9rem] sm:text-[12rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600 select-none">
                  V3.0
                </span>
              </motion.div>

              <div className="space-y-1">
                {heroLines.map((line, i) => (
                  <motion.p
                    key={line}
                    className="text-2xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-tight"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ── STICKY JUMP NAV ── */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 no-print">
          <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-2 overflow-x-auto">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-1 whitespace-nowrap">
              Jump to
            </span>
            {navItems.map((item) => {
              const NavIcon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-semibold text-gray-700 group whitespace-nowrap"
                >
                  <NavIcon className={`w-3.5 h-3.5 ${item.color}`} />
                  {item.label}
                  <ChevronRight className="w-3 h-3 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
              );
            })}
          </div>
        </div>

        {/* ── FEATURE SECTIONS ── */}
        {features.map((feature, idx) => (
          <FullFeatureSection key={feature.id} feature={feature} index={idx} />
        ))}

        {/* ── WHAT'S NEXT ── */}
        <motion.section
          className="border-t border-gray-100 bg-gray-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-5xl mx-auto px-6 py-14">
            <div className="flex flex-col md:flex-row md:items-start gap-10">

              {/* What's coming */}
              <div className="flex-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Coming next</p>
                <h3 className="text-xl font-bold text-gray-900 mb-4">More Smart Panel features on the way</h3>
                <ul className="space-y-2">
                  {[
                    { label: "Liabilities Panel", detail: "Review and flag liabilities directly from the panel — no need to open the 1003." },
                    { label: "Property Panel", detail: "Subject property details, AVM, and comp data surfaced alongside any screen." },
                  ].map((item) => (
                    <li key={item.label} className="flex gap-3">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                      <span className="text-sm text-gray-600">
                        <span className="font-semibold text-gray-800">{item.label}</span> — {item.detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="flex-shrink-0 md:w-72 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col gap-4">
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-1">V3.0 is live now</p>
                  <p className="text-sm text-gray-500">Log into LinkAI and open a loan file to see the Full 1003, Smart Panel, and Smart Credit in action.</p>
                </div>
                <a
                  href="https://linkai.goodleap.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition-colors"
                >
                  Open LinkAI
                  <ChevronRight className="w-4 h-4" />
                </a>
                <p className="text-xs text-gray-400">
                  <strong className="text-gray-600">Questions?</strong> Use the Feedback button inside LinkAI or contact your manager.
                </p>
              </div>

            </div>
          </div>
        </motion.section>

      </main>
    </>
  );
}
