"use client";

import { motion } from "framer-motion";
import { Search, Phone, Scale, Home, MessageSquare, Sparkles, BrainCircuit } from "lucide-react";

export default function SidebarShowcaseStage() {
    return (
        <div className="w-full h-full flex items-center justify-center p-4">
            {/* Sidebar Container - mimicking the screenshot */}
            <div className="w-full max-w-sm bg-white rounded-xl overflow-hidden shadow-2xl border border-white/10 relative">

                {/* Header */}
                <div className="bg-[#F8F9FE] px-4 py-3 border-b border-gray-100 flex items-center justify-between">
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
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Select a tool to get started..."
                            className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-100"
                            readOnly
                        />
                    </div>
                    {/* Tabs */}
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-purple-50 text-[#8B5CF6] text-[10px] font-semibold">All</span>
                        <span className="px-3 py-1 rounded-full text-gray-400 text-[10px] font-medium hover:bg-gray-50">Conversation</span>
                        <span className="px-3 py-1 rounded-full text-gray-400 text-[10px] font-medium hover:bg-gray-50">Analysis</span>
                    </div>
                </div>

                {/* Agents List */}
                <div className="bg-white p-2 space-y-1">
                    <AgentItem
                        icon={Phone}
                        color="bg-blue-50 text-blue-600"
                        title="Call Prep"
                        description="Customer briefing for calls"
                        delay={0.1}
                    />
                    <AgentItem
                        icon={Scale}
                        color="bg-purple-50 text-purple-600"
                        title="Liability AI"
                        description="Debt consolidation analysis"
                        delay={0.2}
                    />
                    <AgentItem
                        icon={Home}
                        color="bg-green-50 text-green-600"
                        title="Property AVM"
                        description="Property valuation analysis"
                        delay={0.3}
                    />
                    <AgentItem
                        icon={MessageSquare}
                        color="bg-orange-50 text-orange-600"
                        title="Sales Coach"
                        description="Objection handling & benefit calc"
                        delay={0.4}
                    />
                </div>

                {/* Gradient Gloss Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/0 via-white/0 to-white/40 mix-blend-overlay" />
            </div>

            {/* Glow backing */}
            <div className="absolute -inset-4 bg-purple-500/20 blur-3xl -z-10 rounded-full" />
        </div>
    );
}

function AgentItem({ icon: Icon, color, title, description, delay }: { icon: any, color: string, title: string, description: string, delay: number }) {
    return (
        <motion.div
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.4 }}
        >
            <div className={`w-9 h-9 rounded-lg ${color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                <Icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-gray-900">{title}</h4>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-1 h-1 rounded-full bg-gray-300" />
                    </span>
                </div>
                <p className="text-[10px] text-gray-500 truncate">{description}</p>
            </div>
        </motion.div>
    );
}
