"use client";

import { motion } from "framer-motion";

// The 4 actual AI tools from the platform
const AI_TOOLS = [
    {
        name: "Call Prep",
        description: "Customer briefing for calls",
        color: "blue",
        bgColor: "bg-blue-100",
        textColor: "text-blue-700",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
        ),
    },
    {
        name: "Liability AI",
        description: "Debt consolidation analysis",
        color: "purple",
        bgColor: "bg-purple-100",
        textColor: "text-purple-700",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect width="20" height="14" x="2" y="5" rx="2" strokeWidth={2} />
                <line x1="2" x2="22" y1="10" y2="10" strokeWidth={2} />
            </svg>
        ),
    },
    {
        name: "Property AVM",
        description: "Property valuation analysis",
        color: "green",
        bgColor: "bg-green-100",
        textColor: "text-green-700",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
    },
    {
        name: "Sales Coach",
        description: "Objection handling & benefit calc",
        color: "orange",
        bgColor: "bg-orange-100",
        textColor: "text-orange-700",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
        ),
    },
];

export default function PricingStage() {
    return (
        <div className="relative w-full h-full flex items-center justify-center p-8">
            {/* AI Assistant Panel - the actual UI from LinkAI */}
            <motion.div
                className="relative w-[340px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6 }}
                style={{ boxShadow: '0 25px 80px rgba(139, 92, 246, 0.25)' }}
            >
                {/* Header */}
                <div className="px-5 py-4 border-b border-stone-200 bg-gradient-to-r from-indigo-50 to-purple-50">
                    <div className="flex items-center gap-3">
                        <motion.div 
                            className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"
                            animate={{ 
                                boxShadow: [
                                    '0 0 0 0 rgba(139, 92, 246, 0)',
                                    '0 0 20px 4px rgba(139, 92, 246, 0.3)',
                                    '0 0 0 0 rgba(139, 92, 246, 0)'
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                        </motion.div>
                        <div>
                            <h2 className="font-semibold text-stone-800">AI Assistant</h2>
                            <p className="text-xs text-stone-500">Select a tool to get started</p>
                        </div>
                    </div>
                </div>

                {/* Category tabs */}
                <div className="px-4 py-2.5 border-b border-stone-100 bg-stone-50">
                    <div className="flex gap-1.5">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-700">All</span>
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-white text-stone-400">Conversation</span>
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-white text-stone-400">Analysis</span>
                    </div>
                </div>

                {/* Tools list */}
                <div className="p-4 space-y-2">
                    {AI_TOOLS.map((tool, index) => (
                        <motion.div
                            key={tool.name}
                            className="flex items-center gap-3 p-3 bg-white border border-stone-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            whileHover={{ scale: 1.02, x: 4 }}
                        >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tool.bgColor} ${tool.textColor}`}>
                                {tool.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-stone-800 text-sm">{tool.name}</p>
                                <p className="text-xs text-stone-500 truncate">{tool.description}</p>
                            </div>
                            <svg className="w-4 h-4 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </motion.div>
                    ))}
                </div>

                {/* Footer */}
                <div className="px-4 py-3 border-t border-stone-200 bg-stone-50">
                    <p className="text-[10px] text-stone-400 text-center">AI-generated content. Always verify important details.</p>
                </div>
            </motion.div>

            {/* Floating accent elements */}
            <motion.div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-500/10 blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
                className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-indigo-500/10 blur-3xl"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
            />
        </div>
    );
}
