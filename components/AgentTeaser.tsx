"use client";

import { motion } from "framer-motion";
import { Sparkles, Search, Phone, Scale, Home, MessageSquare, FileText, LayoutGrid, Settings } from "lucide-react";

const MOTION_EASE = [0.16, 1, 0.3, 1];

export default function AgentTeaser() {
    return (
        <section className="relative w-full py-20 md:py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#08080b] via-[#0a0a10] to-black" />
            
            {/* Subtle glow behind the mockup */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-orange-500/10 blur-[120px] rounded-full" />

            <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
                
                {/* Badge */}
                <motion.div 
                    className="flex justify-center mb-8"
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.6, ease: MOTION_EASE }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06]">
                        <Sparkles className="w-4 h-4 text-orange-400" />
                        <span className="text-xs text-white/60 font-body font-medium uppercase tracking-[0.15em]">Introducing AI-Powered Assistants</span>
                    </div>
                </motion.div>

                {/* Dashboard Mockup */}
                <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.2, duration: 0.8, ease: MOTION_EASE }}
                    style={{ perspective: "1500px" }}
                >
                    {/* Browser Window */}
                    <div 
                        className="relative rounded-xl overflow-hidden border border-white/10 bg-[#1a1a1f] shadow-2xl"
                        style={{ 
                            transform: "rotateX(2deg)",
                            transformOrigin: "center bottom"
                        }}
                    >
                        {/* Browser Chrome */}
                        <div className="flex items-center gap-3 px-4 py-3 bg-[#2a2a30] border-b border-white/5">
                            {/* Window Controls */}
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                            </div>
                            {/* Address Bar */}
                            <div className="flex-1 flex justify-center">
                                <div className="flex items-center gap-2 px-4 py-1.5 bg-[#1a1a1f] rounded-lg border border-white/5 text-xs text-white/40">
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <span>app.linkai.com/dashboard</span>
                                </div>
                            </div>
                            <div className="w-[68px]" /> {/* Spacer for symmetry */}
                        </div>

                        {/* Dashboard Content */}
                        <div className="flex min-h-[420px] md:min-h-[480px]">
                            
                            {/* Left Nav Sidebar */}
                            <div className="hidden md:flex flex-col items-center py-4 px-3 bg-[#0f0f12] border-r border-white/5 w-16">
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6 text-white font-bold text-sm">
                                    L
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    <NavIcon icon={Home} active />
                                    <NavIcon icon={FileText} />
                                    <NavIcon icon={LayoutGrid} />
                                </div>
                                <div className="mt-auto">
                                    <NavIcon icon={Settings} />
                                </div>
                            </div>

                            {/* Main Content Area */}
                            <div className="flex-1 p-6 md:p-8 flex flex-col justify-center bg-gradient-to-br from-[#0f0f12] to-[#13131a]">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4, duration: 0.6, ease: MOTION_EASE }}
                                >
                                    {/* Dashboard Header */}
                                    <div className="mb-6">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                                            <span className="text-[10px] text-orange-400 font-medium uppercase tracking-wider">AI Agent</span>
                                        </div>
                                        <h2 className="text-xl md:text-2xl lg:text-3xl font-display font-medium text-white/90 mb-3 leading-tight">
                                            AI that helps loan officers{" "}
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-400">
                                                move faster
                                            </span>{" "}
                                            and close better
                                        </h2>
                                        <p className="text-sm md:text-base text-white/40 max-w-md font-body font-light leading-relaxed">
                                            Automates the busywork behind the scenes so your team stays focused on customers
                                        </p>
                                    </div>

                                    {/* Fake dashboard content */}
                                    <div className="space-y-3">
                                        <div className="h-2 w-3/4 bg-white/5 rounded-full" />
                                        <div className="h-2 w-1/2 bg-white/5 rounded-full" />
                                        <div className="h-2 w-2/3 bg-white/5 rounded-full" />
                                    </div>
                                </motion.div>
                            </div>

                            {/* AI Sidebar */}
                            <motion.div 
                                className="w-72 md:w-80 bg-white border-l border-gray-100 flex flex-col"
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.6, ease: MOTION_EASE }}
                            >
                                {/* Header */}
                                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] flex items-center justify-center text-white">
                                            <Sparkles className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-900">AI Assistant</h3>
                                            <div className="flex items-center gap-1">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                <span className="text-[10px] text-gray-500 font-medium">Initial Call</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Search & Tabs */}
                                <div className="bg-white px-4 py-3 border-b border-gray-50 space-y-3">
                                    <div className="relative">
                                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Select a tool to get started..."
                                            className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs text-gray-600 placeholder:text-gray-400 focus:outline-none"
                                            readOnly
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="px-3 py-1 rounded-full bg-purple-50 text-[#8B5CF6] text-[10px] font-semibold">All</span>
                                        <span className="px-3 py-1 rounded-full text-gray-400 text-[10px] font-medium">Conversation</span>
                                        <span className="px-3 py-1 rounded-full text-gray-400 text-[10px] font-medium">Analysis</span>
                                    </div>
                                </div>

                                {/* Agents List */}
                                <div className="bg-white p-2 flex-1">
                                    <AgentItem
                                        icon={Phone}
                                        color="bg-blue-50 text-blue-600"
                                        title="Call Prep"
                                        description="Customer briefing for calls"
                                        delay={0.6}
                                    />
                                    <AgentItem
                                        icon={Scale}
                                        color="bg-purple-50 text-purple-600"
                                        title="Liability AI"
                                        description="Debt consolidation analysis"
                                        delay={0.7}
                                    />
                                    <AgentItem
                                        icon={Home}
                                        color="bg-green-50 text-green-600"
                                        title="Property AVM"
                                        description="Property valuation analysis"
                                        delay={0.8}
                                    />
                                    <AgentItem
                                        icon={MessageSquare}
                                        color="bg-orange-50 text-orange-600"
                                        title="Sales Coach"
                                        description="Objection handling & benefit calc"
                                        delay={0.9}
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Glow effect behind browser */}
                    <div className="absolute -inset-8 bg-gradient-to-r from-purple-500/20 via-blue-500/15 to-orange-500/20 blur-3xl -z-10 rounded-3xl opacity-60" />
                </motion.div>

                {/* Scroll hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 }}
                    className="flex flex-col items-center gap-2 mt-12"
                >
                    <span className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-body">See it in action</span>
                    <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
                </motion.div>

            </div>
        </section>
    );
}

function NavIcon({ icon: Icon, active = false }: { icon: any; active?: boolean }) {
    return (
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
            active 
                ? "bg-white/10 text-white" 
                : "text-white/30 hover:text-white/50 hover:bg-white/5"
        }`}>
            <Icon className="w-5 h-5" />
        </div>
    );
}

function AgentItem({ icon: Icon, color, title, description, delay }: { icon: any; color: string; title: string; description: string; delay: number }) {
    return (
        <motion.div
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.4 }}
        >
            <div className={`w-9 h-9 rounded-lg ${color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                <Icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="text-xs font-semibold text-gray-900">{title}</h4>
                <p className="text-[10px] text-gray-500 truncate">{description}</p>
            </div>
        </motion.div>
    );
}
