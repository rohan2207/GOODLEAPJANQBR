"use client";

import { motion } from "framer-motion";
import { Bell, Search, Lock, ArrowRightLeft, Users, CheckCircle, Map, Rocket, GitBranch, ToggleRight, FileText, Moon, Smartphone, Zap, Shield } from "lucide-react";
import Image from "next/image";

// ============================================================================
// FEATURE ICON CARD - Small reusable card for bottom row
// ============================================================================
function FeatureIconCard({ icon, title, subtitle, color }: { 
    icon: React.ReactNode; 
    title: string; 
    subtitle: string; 
    color: 'rose' | 'violet' | 'sky' | 'amber' | 'emerald';
}) {
    const colorClasses = {
        rose: 'bg-rose-500/10 text-rose-400 hover:border-rose-500/30',
        violet: 'bg-violet-500/10 text-violet-400 hover:border-violet-500/30',
        sky: 'bg-sky-500/10 text-sky-400 hover:border-sky-500/30',
        amber: 'bg-amber-500/10 text-amber-400 hover:border-amber-500/30',
        emerald: 'bg-emerald-500/10 text-emerald-400 hover:border-emerald-500/30',
    };
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`relative rounded-2xl bg-[#0a0a0a] border border-white/10 ${colorClasses[color].split(' ').pop()} transition-colors p-4 flex flex-col items-center justify-center text-center`}
        >
            <div className={`${colorClasses[color].split(' ').slice(0, 2).join(' ')} p-3 rounded-xl mb-2`}>
                {icon}
            </div>
            <p className="text-white font-semibold text-sm">{title}</p>
            <p className="text-white/40 text-[10px]">{subtitle}</p>
        </motion.div>
    );
}

// ============================================================================
// HERO CARD - LinkAI Logo with Radial Glow (Square Format)
// ============================================================================
function HeroCard() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden bg-black border border-white/10 h-full min-h-[200px]"
        >
            {/* Animated Radial Glow */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-radial from-orange-500/30 via-orange-500/5 to-transparent animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute inset-0 bg-gradient-radial from-blue-500/20 via-blue-500/5 to-transparent animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
            </div>
            
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full py-8 px-6">
                <Image
                    src="https://cdn.bfldr.com/Q445447Z/at/mm8twcwjs4fj6ctvgnz7tbb/Logo_LinkAI.png?auto=webp&format=png"
                    alt="LinkAI"
                    width={180}
                    height={60}
                    className="mb-3"
                    style={{ objectFit: "contain" }}
                />
                {/* GoodLeap branding */}
                <div className="flex flex-col items-center gap-1 mt-1">
                    <Image
                        src="https://cdn.bfldr.com/Q445447Z/at/r8mz3sj9btg5khst4twv5q8/goodleap-gradient-cR.svg?auto=webp&format=png"
                        alt="GoodLeap"
                        width={70}
                        height={18}
                        className="opacity-50"
                        style={{ objectFit: "contain" }}
                    />
                </div>
                <p className="text-white/40 text-xs font-light tracking-[0.15em] uppercase text-center mt-4">
                    The Platform That Thinks Ahead
                </p>
            </div>
        </motion.div>
    );
}

// ============================================================================
// SALES COMPARABLES - Large Visual Card
// ============================================================================
function SalesComparablesCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="relative rounded-3xl bg-[#0a0a0a] border border-orange-500/20 overflow-hidden h-full"
        >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-orange-500/20 p-2 rounded-xl">
                        <Map className="w-4 h-4 text-orange-400" />
                    </div>
                    <span className="text-white font-semibold">Sales Comparables</span>
                </div>
                <span className="text-[10px] text-white/30 uppercase tracking-wider">Google Maps + DataTree</span>
            </div>

            {/* Map */}
            <div className="relative h-[200px] bg-[#e5e3df] overflow-hidden">
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #e8e6e2 0%, #d4d2ce 100%)' }}>
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
                        <path d="M0 100 L400 100" stroke="#fef3c7" strokeWidth="5" fill="none"/>
                        <path d="M200 0 L200 200" stroke="#fef3c7" strokeWidth="5" fill="none"/>
                        <path d="M0 50 L400 70" stroke="#fff" strokeWidth="3" fill="none" opacity="0.5"/>
                        <path d="M100 0 L150 200" stroke="#fff" strokeWidth="3" fill="none" opacity="0.5"/>
                        <path d="M300 0 L280 200" stroke="#fff" strokeWidth="3" fill="none" opacity="0.5"/>
                    </svg>
                </div>
                
                {/* Customer Marker */}
                <motion.div 
                    className="absolute z-20"
                    style={{ left: '50%', top: '45%', transform: 'translate(-50%, -50%)' }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                >
                    <div className="w-10 h-10 rounded-full bg-blue-500 border-4 border-white shadow-lg flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-white" />
                    </div>
                    <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-gray-700 text-[10px] font-medium px-2 py-1 rounded shadow">
                        Customer's property
                    </div>
                </motion.div>

                {/* Comparable Markers */}
                {[
                    { x: "30%", y: "25%", n: 1 },
                    { x: "70%", y: "55%", n: 2 },
                    { x: "25%", y: "70%", n: 3 },
                    { x: "65%", y: "25%", n: 4 },
                    { x: "80%", y: "75%", n: 5 },
                ].map((m, i) => (
                    <motion.div
                        key={m.n}
                        className="absolute z-10"
                        style={{ left: m.x, top: m.y }}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.4 + i * 0.08 }}
                    >
                        <div className="w-7 h-7 rounded-full bg-red-500 border-2 border-white shadow-md flex items-center justify-center">
                            <span className="text-white text-[10px] font-bold">{m.n}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Property Card */}
            <div className="p-4">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-[10px] uppercase tracking-wider text-blue-400 mb-1">Subject Property</p>
                            <p className="text-white font-bold text-lg">14 JACOB ST</p>
                            <p className="text-white/50 text-sm">OLD BRIDGE, NJ</p>
                        </div>
                        <div className="text-right">
                            <p className="text-white font-bold text-2xl">$587,000</p>
                            <p className="text-[11px] text-white/40">AVM Value</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ============================================================================
// LAUNCHDARKLY CARD - Feature Flags with Logo
// ============================================================================
function LaunchDarklyCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="relative rounded-3xl bg-[#0a0a0a] border border-white/10 hover:border-[#405BFF]/40 transition-colors overflow-hidden p-5 h-full"
        >
            {/* LaunchDarkly Logo */}
            <div className="flex items-center gap-3 mb-4">
                <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                    <rect width="32" height="32" rx="6" fill="#191919"/>
                    <path d="M8 16L14 10V22L8 16Z" fill="#405BFF"/>
                    <path d="M14 10L24 16L14 22V10Z" fill="#3DD6F5"/>
                </svg>
                <div>
                    <p className="text-white font-semibold text-sm">LaunchDarkly</p>
                    <p className="text-white/40 text-[10px]">Feature Flags</p>
                </div>
            </div>

            {/* Toggle Visualization */}
            <div className="space-y-2">
                {[
                    { name: "Brief AI", enabled: true },
                    { name: "New Dashboard", enabled: true },
                    { name: "Beta Features", enabled: false },
                ].map((flag, i) => (
                    <motion.div 
                        key={flag.name}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2"
                    >
                        <span className="text-white/70 text-xs">{flag.name}</span>
                        <div className={`w-8 h-4 rounded-full relative ${flag.enabled ? 'bg-green-500' : 'bg-white/20'}`}>
                            <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${flag.enabled ? 'left-4' : 'left-0.5'}`} />
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

// ============================================================================
// STATS CARDS - Bold Typography (Property Value)
// ============================================================================
function StatsCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05, duration: 0.5 }}
            className="relative rounded-3xl overflow-hidden h-full"
        >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/30 via-amber-600/20 to-yellow-500/20" />
            <div className="absolute inset-0 bg-black/60" />
            
            <div className="relative z-10 p-5 h-full flex flex-col justify-center">
                <p className="text-[10px] uppercase tracking-wider text-white/40 mb-1">Property Value</p>
                <p className="text-5xl md:text-6xl font-bold text-white tracking-tight">$587K</p>
                <p className="text-white/50 text-sm mt-2">AVM Estimate</p>
            </div>
        </motion.div>
    );
}

// ============================================================================
// OPEN LIENS CARD
// ============================================================================
function OpenLiensCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="relative rounded-3xl bg-[#0a0a0a] border border-yellow-500/20 overflow-hidden p-4 h-full"
        >
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="bg-yellow-500/20 p-1.5 rounded-lg">
                        <Lock className="w-3.5 h-3.5 text-yellow-400" />
                    </div>
                    <span className="text-white font-semibold text-sm">Open Liens</span>
                </div>
                <span className="bg-yellow-500/20 text-yellow-400 text-[9px] px-2 py-0.5 rounded-full font-medium">2 Active</span>
            </div>

            <div className="space-y-2">
                <div className="bg-white/5 rounded-lg p-2.5 flex justify-between items-center">
                    <div>
                        <p className="text-white text-xs font-medium">PURCHASE</p>
                        <p className="text-white/40 text-[10px]">QUICKEN LOANS</p>
                    </div>
                    <div className="text-right">
                        <p className="text-white font-bold">$420K</p>
                        <p className="text-white/40 text-[9px]">3.25%</p>
                    </div>
                </div>
                <div className="bg-white/5 rounded-lg p-2.5 flex justify-between items-center">
                    <div>
                        <p className="text-white text-xs font-medium">HELOC</p>
                        <p className="text-white/40 text-[10px]">CHASE BANK</p>
                    </div>
                    <div className="text-right">
                        <p className="text-white font-bold">$77.5K</p>
                        <p className="text-white/40 text-[9px]">6.5%</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ============================================================================
// CI/CD CARD - Small Icon
// ============================================================================
function CICDCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative rounded-3xl bg-[#0a0a0a] border border-white/10 hover:border-emerald-500/30 transition-colors overflow-hidden p-4 flex flex-col items-center justify-center text-center h-full"
        >
            <div className="bg-emerald-500/10 p-3 rounded-2xl mb-3">
                <div className="relative">
                    <GitBranch className="w-5 h-5 text-emerald-400" />
                    <Rocket className="w-3 h-3 text-emerald-300 absolute -right-1 -top-1" />
                </div>
            </div>
            <p className="text-white font-semibold text-sm">CI/CD</p>
            <p className="text-white/40 text-[10px]">Automated Deploys</p>
        </motion.div>
    );
}

// ============================================================================
// OWNERSHIP HISTORY CARD
// ============================================================================
function OwnershipCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="relative rounded-3xl bg-[#0a0a0a] border border-cyan-500/20 overflow-hidden p-4 h-full"
        >
            <div className="flex items-center gap-2 mb-3">
                <div className="bg-cyan-500/20 p-1.5 rounded-lg">
                    <Users className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <span className="text-white font-semibold text-sm">Ownership</span>
            </div>

            <div className="space-y-2">
                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-2.5">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <span className="text-white text-xs font-medium">Garcia James M</span>
                            <span className="bg-cyan-500 text-white text-[8px] px-1.5 py-0.5 rounded">Current</span>
                        </div>
                        <span className="text-white font-bold text-sm">$125K</span>
                    </div>
                </div>
                <div className="bg-white/5 rounded-lg p-2.5">
                    <div className="flex justify-between items-center">
                        <span className="text-white/70 text-xs">Smith John A</span>
                        <span className="text-white/70 text-sm">$85K</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ============================================================================
// TRANSFERS CARD
// ============================================================================
function TransfersCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative rounded-3xl bg-[#0a0a0a] border border-purple-500/20 overflow-hidden p-4 h-full"
        >
            <div className="flex items-center gap-2 mb-3">
                <div className="bg-purple-500/20 p-1.5 rounded-lg">
                    <ArrowRightLeft className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <span className="text-white font-semibold text-sm">Transfers</span>
            </div>

            <div className="bg-white/5 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <p className="text-white text-xs font-medium">Warranty Deed</p>
                        <p className="text-white/40 text-[10px]">Sep 14, 2017</p>
                    </div>
                    <p className="text-white font-bold text-lg">$523K</p>
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span className="text-green-400 text-[10px]">Arms Length</span>
                </div>
            </div>
        </motion.div>
    );
}

// ============================================================================
// SMALL ICON CARDS
// ============================================================================
function AlertCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="relative rounded-3xl bg-[#0a0a0a] border border-white/10 hover:border-orange-500/30 transition-colors p-4 flex flex-col items-center justify-center text-center h-full"
        >
            <div className="bg-orange-500/10 p-3 rounded-2xl mb-2">
                <Bell className="w-5 h-5 text-orange-400" />
            </div>
            <p className="text-white font-semibold text-sm">Alerts</p>
            <p className="text-white/40 text-[10px]">Real-time</p>
        </motion.div>
    );
}

function SearchCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="relative rounded-3xl bg-[#0a0a0a] border border-white/10 hover:border-blue-500/30 transition-colors p-4 flex flex-col items-center justify-center text-center h-full"
        >
            <div className="bg-blue-500/10 p-3 rounded-2xl mb-2">
                <Search className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-white font-semibold text-sm">Search</p>
            <p className="text-white/40 text-[10px]">⌘K</p>
        </motion.div>
    );
}

// ============================================================================
// MAIN FEATURE GRID COMPONENT
// ============================================================================
export default function FeatureGrid() {
    return (
        <section className="w-full max-w-6xl mx-auto py-24 px-4 md:px-0 bg-background">
            {/* Header */}
            <div className="text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] mb-6"
                >
                    <ToggleRight className="w-4 h-4 text-orange-400" />
                    <span className="text-sm font-body font-light text-white/60 tracking-[0.15em] uppercase">Shipping Fast</span>
                </motion.div>
                <h2 className="text-3xl md:text-5xl font-display font-medium tracking-[0.1em] uppercase text-white mb-6">
                    Velocity of Shipping
                </h2>
                <p className="text-white/40 max-w-2xl mx-auto text-lg font-body font-light">
                    Beyond the major AI agents, we've shipped dozens of quality-of-life improvements.
                </p>
            </div>

            {/* Apple-Style Bento Grid - Desktop */}
            <div 
                className="hidden md:grid gap-4"
                style={{
                    gridTemplateAreas: `
                        "stats   sales   sales   launch"
                        "liens   sales   sales   cicd"
                        "ownership hero   hero   transfers"
                        "alert   hero   hero   search"
                    `,
                    gridTemplateColumns: "1fr 1.5fr 1.5fr 1fr",
                    gridTemplateRows: "auto auto auto auto",
                }}
            >
                <div style={{ gridArea: "stats" }}><StatsCard /></div>
                <div style={{ gridArea: "sales" }}><SalesComparablesCard /></div>
                <div style={{ gridArea: "launch" }}><LaunchDarklyCard /></div>
                <div style={{ gridArea: "liens" }}><OpenLiensCard /></div>
                <div style={{ gridArea: "cicd" }}><CICDCard /></div>
                <div style={{ gridArea: "hero" }}><HeroCard /></div>
                <div style={{ gridArea: "ownership" }}><OwnershipCard /></div>
                <div style={{ gridArea: "transfers" }}><TransfersCard /></div>
                <div style={{ gridArea: "alert" }}><AlertCard /></div>
                <div style={{ gridArea: "search" }}><SearchCard /></div>
                            </div>

            {/* Mobile Grid - Stacked */}
            <div className="md:hidden flex flex-col gap-4">
                <HeroCard />
                <SalesComparablesCard />
                <StatsCard />
                <LaunchDarklyCard />
                <OpenLiensCard />
                <div className="grid grid-cols-2 gap-4">
                    <CICDCard />
                    <AlertCard />
                            </div>
                <OwnershipCard />
                <TransfersCard />
                <SearchCard />
                        </div>

            {/* Additional Features Row */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                <FeatureIconCard 
                    icon={<FileText className="w-5 h-5" />}
                    title="Auto-Docs"
                    subtitle="PDF Generation"
                    color="rose"
                />
                <FeatureIconCard 
                    icon={<Moon className="w-5 h-5" />}
                    title="Dark Mode"
                    subtitle="Eye comfort"
                    color="violet"
                />
                <FeatureIconCard 
                    icon={<Smartphone className="w-5 h-5" />}
                    title="Mobile First"
                    subtitle="Responsive"
                    color="sky"
                />
                <FeatureIconCard 
                    icon={<Zap className="w-5 h-5" />}
                    title="Fast Sync"
                    subtitle="Real-time"
                    color="amber"
                />
                <FeatureIconCard 
                    icon={<Shield className="w-5 h-5" />}
                    title="Secure"
                    subtitle="SOC 2"
                    color="emerald"
                />
            </div>
        </section>
    );
}
