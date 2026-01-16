"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Play, Pause, RotateCcw, ArrowUpRight, Zap, CheckCircle2, ExternalLink, Home, LayoutDashboard, GitBranch, Settings, FolderOpen, Plus, HelpCircle, User, LogOut, ChevronDown, ChevronUp } from "lucide-react";

// Slide content type
type SlideContent = {
    id: string;
    title: string;
    subtitle: string;
    content: React.ReactNode;
};

// LINK Loan Application Form - Slide 1
function LinkLoanApplicationForm() {
    return (
        <div className="w-[850px] h-[520px] rounded-2xl overflow-hidden bg-white shadow-2xl border border-black/10">
            {/* Browser chrome */}
            <div className="h-9 bg-slate-100 border-b border-black/5 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 flex justify-center">
                    <div className="px-3 py-0.5 rounded bg-white border border-black/10 text-[10px] text-black/50">
                        link.goodleap.com
                    </div>
                </div>
            </div>
            
            {/* Sticky Header */}
            <div className="bg-white border-b border-neutral-200 px-4 py-2.5 shadow-sm">
                <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold text-slate-900">Loan Application</h2>
                    <div className="flex items-center gap-2">
                        <div className="flex gap-0.5 bg-white rounded p-0.5 border border-neutral-200">
                            <button className="py-1 px-3 text-xs font-medium rounded text-slate-500 bg-white border-none">Refinance</button>
                            <button className="py-1 px-3 text-xs font-medium rounded text-white bg-blue-600 border-none">HELOC</button>
                        </div>
                        <button className="py-1.5 px-4 text-xs font-medium rounded text-white bg-blue-600 flex items-center gap-1.5">
                            Submit to Figure
                            <ExternalLink className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Form Content - Scrollable */}
            <div className="h-[calc(100%-85px)] overflow-y-auto bg-slate-50 p-3 space-y-3">
                {/* Borrower Information */}
                <div className="p-4 border border-neutral-200 rounded-lg bg-white">
                    <div className="mb-3">
                        <h3 className="text-sm font-semibold text-slate-900">Borrower Information</h3>
                        <p className="text-[10px] text-slate-500">Primary borrower details and contact information</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-3">
                        <div>
                            <label className="text-[10px] font-medium text-slate-600 block mb-1">First Name<span className="text-red-500">*</span></label>
                            <input className="w-full h-8 px-2 text-xs border border-neutral-200 rounded bg-white" value="Ken" readOnly />
                        </div>
                        <div>
                            <label className="text-[10px] font-medium text-slate-600 block mb-1">Middle Name</label>
                            <input className="w-full h-8 px-2 text-xs border border-neutral-200 rounded bg-white text-slate-400" placeholder="Optional" readOnly />
                        </div>
                        <div>
                            <label className="text-[10px] font-medium text-slate-600 block mb-1">Last Name<span className="text-red-500">*</span></label>
                            <input className="w-full h-8 px-2 text-xs border border-neutral-200 rounded bg-white" value="Customer" readOnly />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <label className="text-[10px] font-medium text-slate-600 block mb-1">Date of Birth<span className="text-red-500">*</span></label>
                            <input className="w-full h-8 px-2 text-xs border border-neutral-200 rounded bg-white" value="01/01/1980" readOnly />
                        </div>
                        <div>
                            <label className="text-[10px] font-medium text-slate-600 block mb-1">SSN</label>
                            <input className="w-full h-8 px-2 text-xs border border-neutral-200 rounded bg-white" value="•••-••-7000" readOnly />
                        </div>
                        <div>
                            <label className="text-[10px] font-medium text-slate-600 block mb-1">Home Phone</label>
                            <input className="w-full h-8 px-2 text-xs border border-neutral-200 rounded bg-white" value="555-555-5555" readOnly />
                        </div>
                    </div>
                </div>

                {/* Loan Details */}
                <div className="p-4 border border-neutral-200 rounded-lg bg-white">
                    <div className="mb-3">
                        <h3 className="text-sm font-semibold text-slate-900">Loan Details</h3>
                        <p className="text-[10px] text-slate-500">Loan purpose and amount information</p>
                    </div>
                    <div className="w-1/2">
                        <label className="text-[10px] font-medium text-slate-600 block mb-1">Loan Amount Requested<span className="text-red-500">*</span></label>
                        <input className="w-full h-8 px-2 text-xs border border-neutral-200 rounded bg-white font-semibold" value="$222,001" readOnly />
                    </div>
                </div>

                {/* Subject Property */}
                <div className="p-4 border border-neutral-200 rounded-lg bg-white">
                    <div className="mb-3">
                        <h3 className="text-sm font-semibold text-slate-900">Subject Property</h3>
                        <p className="text-[10px] text-slate-500">Property address and details</p>
                    </div>
                    <div className="mb-3">
                        <label className="text-[10px] font-medium text-slate-600 block mb-1">Street Address<span className="text-red-500">*</span></label>
                        <input className="w-full h-8 px-2 text-xs border border-neutral-200 rounded bg-white" value="2933 AVON RD" readOnly />
                    </div>
                    <div className="grid grid-cols-4 gap-3 mb-3">
                        <div>
                            <label className="text-[10px] font-medium text-slate-600 block mb-1">City<span className="text-red-500">*</span></label>
                            <input className="w-full h-8 px-2 text-xs border border-neutral-200 rounded bg-white" value="ROCKLIN" readOnly />
                        </div>
                        <div>
                            <label className="text-[10px] font-medium text-slate-600 block mb-1">State<span className="text-red-500">*</span></label>
                            <input className="w-full h-8 px-2 text-xs border border-neutral-200 rounded bg-white" value="CA" readOnly />
                        </div>
                        <div>
                            <label className="text-[10px] font-medium text-slate-600 block mb-1">Zip<span className="text-red-500">*</span></label>
                            <input className="w-full h-8 px-2 text-xs border border-neutral-200 rounded bg-white" value="95765" readOnly />
                        </div>
                        <div>
                            <label className="text-[10px] font-medium text-slate-600 block mb-1">Property Value (AVM)</label>
                            <input className="w-full h-8 px-2 text-xs border border-neutral-200 rounded bg-white font-semibold text-green-600" value="$840,000" readOnly />
                        </div>
                    </div>
                    <div>
                        <label className="text-[10px] font-medium text-slate-600 block mb-1">Occupancy<span className="text-red-500">*</span></label>
                        <div className="flex gap-2">
                            <button className="py-1.5 px-3 text-[10px] font-medium rounded border bg-blue-600 text-white border-blue-600">Primary</button>
                            <button className="py-1.5 px-3 text-[10px] font-medium rounded border bg-white text-slate-600 border-neutral-200">Secondary</button>
                            <button className="py-1.5 px-3 text-[10px] font-medium rounded border bg-white text-slate-600 border-neutral-200">Investment</button>
                        </div>
                    </div>
                </div>

                {/* Employment & Income */}
                <div className="p-4 border border-neutral-200 rounded-lg bg-white">
                    <div className="mb-3">
                        <h3 className="text-sm font-semibold text-slate-900">Employment &amp; Income</h3>
                        <p className="text-[10px] text-slate-500">Current employment and income details</p>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                        <div>
                            <label className="text-[10px] font-medium text-slate-600 block mb-1">Employer</label>
                            <input className="w-full h-8 px-2 text-xs border border-neutral-200 rounded bg-white" value="TESTCO" readOnly />
                        </div>
                        <div>
                            <label className="text-[10px] font-medium text-slate-600 block mb-1">Job Title</label>
                            <input className="w-full h-8 px-2 text-xs border border-neutral-200 rounded bg-white" value="QA Engineer" readOnly />
                        </div>
                        <div>
                            <label className="text-[10px] font-medium text-slate-600 block mb-1">Years</label>
                            <input className="w-full h-8 px-2 text-xs border border-neutral-200 rounded bg-white" value="10" readOnly />
                        </div>
                        <div>
                            <label className="text-[10px] font-medium text-slate-600 block mb-1">Annual Income<span className="text-red-500">*</span></label>
                            <input className="w-full h-8 px-2 text-xs border border-neutral-200 rounded bg-white font-semibold" value="$180,000" readOnly />
                        </div>
                    </div>
                </div>

                {/* Existing Liens */}
                <div className="p-4 border border-neutral-200 rounded-lg bg-white">
                    <div className="mb-3">
                        <h3 className="text-sm font-semibold text-slate-900">Existing Liens</h3>
                        <p className="text-[10px] text-slate-500">Information about existing liens on the property</p>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                        <div>
                            <label className="text-[10px] font-medium text-slate-600 block mb-1">Lender Name</label>
                            <input className="w-full h-8 px-2 text-[9px] border border-neutral-200 rounded bg-white" value="AMERICAN PACIFIC MORTGAGE" readOnly />
                        </div>
                        <div>
                            <label className="text-[10px] font-medium text-slate-600 block mb-1">Origination Date<span className="text-red-500">*</span></label>
                            <input className="w-full h-8 px-2 text-xs border border-neutral-200 rounded bg-white" value="02/08/2021" readOnly />
                        </div>
                        <div>
                            <label className="text-[10px] font-medium text-slate-600 block mb-1">Original Balance<span className="text-red-500">*</span></label>
                            <input className="w-full h-8 px-2 text-xs border border-neutral-200 rounded bg-white" value="$165,000" readOnly />
                        </div>
                        <div>
                            <label className="text-[10px] font-medium text-slate-600 block mb-1">Current Balance</label>
                            <input className="w-full h-8 px-2 text-xs border border-neutral-200 rounded bg-white text-slate-400" placeholder="$0.00" readOnly />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Slides configuration
const SLIDES: SlideContent[] = [
    {
        id: "link-ready",
        title: "One Click. All Data Ready.",
        subtitle: "Complete loan application prefilled in LINK",
        content: (
            <div className="relative w-full h-full flex items-center justify-center">
                <LinkLoanApplicationForm />
            </div>
        ),
    },
    {
        id: "prefilling",
        title: "Automatically Prefilled.",
        subtitle: "Zero manual entry required",
        content: (
            <div className="relative w-full h-full flex items-center justify-center">
                {/* Prefill animation state */}
                <div className="w-[700px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 shadow-2xl">
                    {/* Browser chrome */}
                    <div className="h-10 bg-slate-800/80 border-b border-white/5 flex items-center px-4 gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="px-4 py-1 rounded-md bg-slate-700/50 text-xs text-white/50">
                                Transferring to Figure...
                            </div>
                        </div>
                    </div>
                    {/* Transfer animation */}
                    <div className="p-12 flex flex-col items-center justify-center space-y-8">
                        {/* Animated transfer visual */}
                        <div className="relative flex items-center gap-8">
                            <motion.div 
                                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-purple-500/30"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <span className="text-white font-bold text-xl">LINK</span>
                            </motion.div>

                            {/* Data packets flying */}
                            <div className="relative w-32 h-4">
                                {[0, 1, 2].map((i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute top-0 w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400"
                                        initial={{ x: 0, opacity: 0 }}
                                        animate={{ 
                                            x: [0, 128], 
                                            opacity: [0, 1, 1, 0] 
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            delay: i * 0.3,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                ))}
                            </div>

                            <motion.div 
                                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg shadow-rose-500/30"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            >
                                <span className="text-white font-bold text-lg">Figure</span>
                            </motion.div>
                        </div>

                        {/* Progress bar */}
                        <div className="w-full max-w-md space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-white/60">Transferring data...</span>
                                <motion.span 
                                    className="text-blue-400 font-semibold"
                                    key="progress"
                                >
                                    87%
                                </motion.span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <motion.div 
                                    className="h-full bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "87%" }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                />
                            </div>
                        </div>

                        {/* Data items being transferred */}
                        <div className="grid grid-cols-2 gap-3 w-full max-w-md">
                            {[
                                { label: "Borrower Info", done: true },
                                { label: "Property Details", done: true },
                                { label: "Income Data", done: true },
                                { label: "Credit Summary", done: false },
                            ].map((item, i) => (
                                <motion.div 
                                    key={item.label}
                                    className="flex items-center gap-2 p-2 rounded-lg bg-white/5"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.2 }}
                                >
                                    {item.done ? (
                                        <CheckCircle2 className="w-4 h-4 text-blue-400" />
                                    ) : (
                                        <motion.div 
                                            className="w-4 h-4 rounded-full border-2 border-white/30 border-t-blue-400"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        />
                                    )}
                                    <span className={`text-sm ${item.done ? 'text-white/80' : 'text-white/50'}`}>
                                        {item.label}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: "figure-landing",
        title: "Land on Figure. Start Closing.",
        subtitle: "Application submitted, ready to process",
        content: (
            <div className="relative w-full h-full flex items-center justify-center">
                <FigureLeadPortal />
            </div>
        ),
    },
];

// Figure Lead Portal - Slide 3
function FigureLeadPortal() {
    return (
        <div className="w-[950px] h-[520px] rounded-2xl overflow-hidden bg-white shadow-2xl border border-black/10 flex">
            {/* Left Sidebar */}
            <div className="w-48 bg-white border-r border-neutral-200 flex flex-col">
                {/* Logo */}
                <div className="p-3 border-b border-neutral-100">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900">Lead Portal</span>
                        <span className="w-5 h-5 rounded bg-rose-500 flex items-center justify-center">
                            <span className="text-white text-[8px] font-bold">F</span>
                        </span>
                    </div>
                    <p className="text-[9px] text-slate-400">Powered by Figure (Test)</p>
                </div>
                
                {/* Nav Items */}
                <div className="flex-1 py-2">
                    <div className="px-3 py-1.5 text-xs text-slate-500 flex items-center gap-2 hover:bg-slate-50 cursor-pointer">
                        <ChevronDown className="w-3 h-3" /> GoodLeap
                    </div>
                    <div className="px-3 py-1.5 text-xs text-slate-700 flex items-center gap-2 bg-slate-100">
                        <LayoutDashboard className="w-3 h-3" /> Dashboard
                    </div>
                    <div className="px-3 py-1.5 text-xs text-slate-500 flex items-center gap-2 hover:bg-slate-50 cursor-pointer">
                        <GitBranch className="w-3 h-3" /> Pipeline
                    </div>
                    <div className="px-3 py-1.5 text-xs text-slate-500 flex items-center gap-2 hover:bg-slate-50 cursor-pointer">
                        <Settings className="w-3 h-3" /> Admin Tools
                    </div>
                    <div className="px-3 py-1.5 text-xs text-slate-500 flex items-center gap-2 hover:bg-slate-50 cursor-pointer">
                        <FolderOpen className="w-3 h-3" /> Resource Center
                    </div>
                </div>

                {/* Bottom actions */}
                <div className="border-t border-neutral-100 p-2 space-y-1">
                    <button className="w-full py-1.5 px-3 text-[10px] font-medium rounded bg-slate-900 text-white flex items-center gap-1.5">
                        <Plus className="w-3 h-3" /> Create New
                    </button>
                    <div className="px-2 py-1 text-[10px] text-slate-500 flex items-center gap-2">
                        <HelpCircle className="w-3 h-3" /> Help & Support
                    </div>
                    <div className="px-2 py-1 text-[10px] text-slate-500 flex items-center gap-2">
                        <User className="w-3 h-3" /> Rohan Shetty
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-slate-50 overflow-y-auto">
                {/* Overview Section */}
                <div className="m-3 bg-white rounded-lg border border-neutral-200">
                    <div className="px-4 py-2 border-b border-neutral-100 flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-900">Overview</span>
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="p-4 grid grid-cols-4 gap-x-6 gap-y-2 text-[10px]">
                        <div className="flex justify-between"><span className="text-slate-500">Property value (AVM)</span><span className="font-medium">$615,000.00</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Rate Type</span><span className="font-medium">Fixed</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Rate</span><span className="font-medium">7.000%</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Prime Rate</span><span className="font-medium">6.750%</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Term</span><span className="font-medium">30 Years</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Loan Amount</span><span className="font-medium">$164,423.79</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Draw Amount</span><span className="font-medium">$156,609.00</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">FICO</span><span className="font-medium">780</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">O-fee</span><span className="font-medium">4.99%</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Monthly Payment</span><span className="font-medium">$1,093.91</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">DTI</span><span className="font-medium">49.67%</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Post Loan CLTV</span><span className="font-medium">26.74%</span></div>
                    </div>
                </div>

                {/* Collapsible sections */}
                <div className="mx-3 mb-2 bg-white rounded-lg border border-neutral-200 px-4 py-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900">Property Liens</span>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                </div>
                <div className="mx-3 mb-2 bg-white rounded-lg border border-neutral-200 px-4 py-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900">Property Information</span>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                </div>

                {/* Initial Offers */}
                <div className="mx-3 mb-3 bg-white rounded-lg border border-neutral-200">
                    <div className="px-4 py-2 border-b border-neutral-100 flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-900">Initial Offers</span>
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="p-3">
                        <table className="w-full text-[9px]">
                            <thead>
                                <tr className="border-b border-neutral-100">
                                    <th className="text-left py-1 text-slate-500 font-medium">Term & Rate Type</th>
                                    <th className="text-center py-1 text-slate-500 font-medium">1.99%</th>
                                    <th className="text-center py-1 text-slate-500 font-medium">3.99%</th>
                                    <th className="text-center py-1 text-slate-500 font-medium">4.99%</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-neutral-50">
                                    <td className="py-2 font-medium text-slate-700">10 Year Fixed</td>
                                    <td className="py-2 text-center text-slate-600">
                                        <div>Min: $40,796.00</div>
                                        <div>Max: $91,450.96</div>
                                        <div className="text-slate-400">Rate: 8.25%</div>
                                    </td>
                                    <td className="py-2 text-center text-slate-400">-</td>
                                    <td className="py-2 text-center text-slate-400">-</td>
                                </tr>
                                <tr>
                                    <td className="py-2 font-medium text-slate-700">10 Year Fixed</td>
                                    <td className="py-2 text-center text-slate-400">-</td>
                                    <td className="py-2 text-center text-slate-600">
                                        <div>Min: $41,596.00</div>
                                        <div>Max: $95,753.12</div>
                                        <div className="text-slate-400">Rate: 7.20%</div>
                                    </td>
                                    <td className="py-2 text-center text-slate-400">-</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-56 bg-white border-l border-neutral-200 overflow-y-auto">
                {/* Application Progress */}
                <div className="p-3 border-b border-neutral-100">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-slate-900">Application Progress</span>
                        <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">0%</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center">
                            <span className="text-white text-[8px] font-bold">1</span>
                        </div>
                        <span className="text-[10px] text-slate-700">Inquiry Submitted</span>
                    </div>
                </div>

                {/* Borrower Information */}
                <div className="p-3 border-b border-neutral-100">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-slate-900">Borrower Information</span>
                        <ChevronUp className="w-3 h-3 text-slate-400" />
                    </div>
                    <div className="space-y-1.5 text-[9px]">
                        <div><span className="text-slate-400">Name</span><p className="font-medium text-slate-700">Test Tester</p></div>
                        <div><span className="text-slate-400">Primary Address</span><p className="font-medium text-slate-700">2113 Sterling Dr, Rocklin, CA 95765</p></div>
                        <div><span className="text-slate-400">Email</span><p className="font-medium text-slate-700">hannahlmalone94@gmail.com</p></div>
                        <div className="flex gap-4">
                            <div><span className="text-slate-400">Phone</span><p className="font-medium text-slate-700">(916) 504-4513</p></div>
                            <div><span className="text-slate-400">DOB</span><p className="font-medium text-slate-700">04/25/1994</p></div>
                        </div>
                        <div className="flex gap-4">
                            <div><span className="text-slate-400">Application ID</span><p className="font-medium text-slate-700">1-26015-070</p></div>
                            <div><span className="text-slate-400">Created</span><p className="font-medium text-slate-700">01/15/2026</p></div>
                        </div>
                    </div>
                </div>

                {/* Loan Officer */}
                <div className="p-3 border-b border-neutral-100">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-slate-900">Loan Officer</span>
                        <ChevronUp className="w-3 h-3 text-slate-400" />
                    </div>
                    <div className="space-y-1 text-[9px]">
                        <p className="font-medium text-slate-700">Hannah Malone</p>
                        <p className="text-slate-500">hmalone@goodleap.com</p>
                        <div className="flex gap-4">
                            <div><span className="text-slate-400">NMLS#</span><p className="font-medium text-slate-700">30336</p></div>
                            <div><span className="text-slate-400">Created</span><p className="font-medium text-slate-700">12/30/2025</p></div>
                        </div>
                    </div>
                </div>

                {/* Notes */}
                <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-slate-900">Notes</span>
                        <ChevronUp className="w-3 h-3 text-slate-400" />
                    </div>
                    <p className="text-[9px] text-slate-400 italic">There are no notes for this application yet.</p>
                </div>
            </div>
        </div>
    );
}

export default function FigureIntegration() {
    const [activeSlide, setActiveSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false); // Start paused
    const [progress, setProgress] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { amount: 0.4 }); // 40% visible to trigger

    const SLIDE_DURATION = 6000; // 6 seconds per slide

    // Start playing only when section comes into view
    useEffect(() => {
        if (isInView && !hasStarted) {
            setIsPlaying(true);
            setHasStarted(true);
        }
    }, [isInView, hasStarted]);

    // Auto-advance slides
    useEffect(() => {
        if (!isPlaying) return;

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    setActiveSlide((s) => (s + 1) % SLIDES.length);
                    return 0;
                }
                return prev + (100 / (SLIDE_DURATION / 50));
            });
        }, 50);

        return () => clearInterval(progressInterval);
    }, [isPlaying, activeSlide]);

    const goToSlide = useCallback((index: number) => {
        setActiveSlide(index);
        setProgress(0);
    }, []);

    const togglePlayPause = useCallback(() => {
        setIsPlaying((prev) => !prev);
        if (!isPlaying) setProgress(0);
    }, [isPlaying]);

    return (
        <section ref={sectionRef} className="relative min-h-screen bg-[#0a0a0f] overflow-hidden py-24">
            {/* Background gradient */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-8">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
                    >
                        <span className="text-blue-400 font-semibold text-sm">FIGURE INTEGRATION</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight"
                    >
                        Direct to Figure.{" "}
                        <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                            Zero Re-entry.
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-white/60 max-w-2xl mx-auto mb-10"
                    >
                        HELOC exploded. We built the bridge.
                    </motion.p>

                    {/* Stats Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="inline-block"
                    >
                        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-xl">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />
                            <div className="relative flex items-center gap-8">
                                <div className="text-left">
                                    <p className="text-white/50 text-sm mb-1">Total Funded Loans • 2025</p>
                                    <p className="text-white text-sm mb-1">Viewing <span className="text-purple-400 font-semibold">HELOC</span></p>
                                </div>
                                <div className="text-right">
                                    <p className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                                        4,184
                                    </p>
                                    <div className="flex items-center justify-end gap-2 mt-1">
                                        <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-400 text-sm font-semibold flex items-center gap-1">
                                            <ArrowUpRight className="w-3 h-3" />
                                            +268.0%
                                        </span>
                                        <span className="text-white/40 text-sm">vs 2024 (1,137)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Apple-Style Carousel */}
                <div className="relative">
                    {/* Navigation Pill */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex justify-center mb-8"
                    >
                        <div className="inline-flex items-center gap-3 p-2 rounded-full bg-white/[0.08] border border-white/10 backdrop-blur-xl">
                            {/* Play/Pause Button */}
                            <button
                                onClick={togglePlayPause}
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                                aria-label={isPlaying ? "Pause" : "Play"}
                            >
                                {isPlaying ? (
                                    <Pause className="w-4 h-4 text-white" />
                                ) : (
                                    <Play className="w-4 h-4 text-white ml-0.5" />
                                )}
                            </button>

                            {/* Dot Navigation */}
                            <div className="flex items-center gap-2 px-2">
                                {SLIDES.map((slide, index) => (
                                    <button
                                        key={slide.id}
                                        onClick={() => goToSlide(index)}
                                        className="relative w-8 h-2 rounded-full overflow-hidden bg-white/20 transition-all"
                                        aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                                        aria-selected={index === activeSlide}
                                    >
                                        {index === activeSlide && (
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: progress / 100 }}
                                                style={{ transformOrigin: "left" }}
                                            />
                                        )}
                                        {index < activeSlide && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Slide Container */}
                    <div className="relative h-[600px] overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSlide}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="absolute inset-0 flex flex-col"
                            >
                                {/* Slide Caption */}
                                <div className="absolute top-8 left-8 z-10">
                                    <p className="text-blue-400/80 text-sm font-medium mb-2 uppercase tracking-wider">
                                        Step {activeSlide + 1} of {SLIDES.length}
                                    </p>
                                    <h3 className="text-3xl font-bold text-white mb-2">
                                        {SLIDES[activeSlide].title}
                                    </h3>
                                    <p className="text-white/60">
                                        {SLIDES[activeSlide].subtitle}
                                    </p>
                                </div>

                                {/* Slide Content */}
                                <div className="flex-1 flex items-center justify-center pt-24">
                                    {SLIDES[activeSlide].content}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Slide Labels */}
                    <div className="flex justify-center gap-8 mt-8">
                        {SLIDES.map((slide, index) => (
                            <button
                                key={slide.id}
                                onClick={() => goToSlide(index)}
                                className={`text-sm font-medium transition-all ${
                                    index === activeSlide
                                        ? "text-white"
                                        : "text-white/40 hover:text-white/60"
                                }`}
                            >
                                {index + 1}. {slide.title.split(".")[0]}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
