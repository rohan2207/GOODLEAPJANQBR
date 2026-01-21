"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
    TrendingUp, 
    Calculator, 
    BarChart3, 
    FileText, 
    Home, 
    PenTool,
    Zap
} from "lucide-react";

type Integration = {
    name: string;
    category: string;
    description: string;
    icon: React.ReactNode;
    gradient: string;
    status: "live" | "soon";
    isNew?: boolean;
};

const integrations: Integration[] = [
    // Existing Live integrations
    {
        name: "Encompass",
        category: "LOS",
        description: "Seamless bidirectional sync with your existing loan origination system",
        icon: <FileText className="w-5 h-5" />,
        gradient: "from-blue-500 to-blue-600",
        status: "live",
    },
    {
        name: "Salesforce",
        category: "CRM",
        description: "Unified customer data and pipeline management",
        icon: <Zap className="w-5 h-5" />,
        gradient: "from-blue-400 to-cyan-500",
        status: "live",
    },
    {
        name: "First American",
        category: "Title & Data",
        description: "Real-time property data and title services",
        icon: <Home className="w-5 h-5" />,
        gradient: "from-orange-500 to-red-500",
        status: "live",
    },
    {
        name: "Google Maps",
        category: "Location Data",
        description: "Property visualization and neighborhood insights",
        icon: <TrendingUp className="w-5 h-5" />,
        gradient: "from-green-500 to-emerald-600",
        status: "live",
    },
    {
        name: "OpenAI",
        category: "AI Intelligence",
        description: "Smart document processing and intelligent automation",
        icon: <Calculator className="w-5 h-5" />,
        gradient: "from-pink-500 to-purple-500",
        status: "live",
    },
    {
        name: "Pricing Exceptions",
        category: "Pricing Engine",
        description: "Automated exception handling and approval workflows",
        icon: <BarChart3 className="w-5 h-5" />,
        gradient: "from-amber-500 to-orange-500",
        status: "live",
    },
    // New Live integrations
    {
        name: "Optimal Blue",
        category: "Pricing Engine",
        description: "Real-time rate quotes and product eligibility",
        icon: <TrendingUp className="w-5 h-5" />,
        gradient: "from-amber-500 to-yellow-600",
        status: "live",
        isNew: true,
    },
    {
        name: "Credit Bureaus",
        category: "Credit Services",
        description: "Instant credit pulls and monitoring",
        icon: <BarChart3 className="w-5 h-5" />,
        gradient: "from-indigo-500 to-purple-600",
        status: "live",
        isNew: true,
    },
    // In Development
    {
        name: "Fee Management",
        category: "Pricing & Fees",
        description: "Dynamic fee calculations and customizable fee templates",
        icon: <Calculator className="w-5 h-5" />,
        gradient: "from-green-500 to-emerald-600",
        status: "soon",
    },
    {
        name: "Disclosure Systems",
        category: "Compliance",
        description: "Automated disclosure generation and delivery",
        icon: <FileText className="w-5 h-5" />,
        gradient: "from-teal-500 to-cyan-600",
        status: "soon",
    },
    {
        name: "Appraisal Services",
        category: "Property Valuation",
        description: "Integration with appraisal vendors and tracking",
        icon: <Home className="w-5 h-5" />,
        gradient: "from-orange-500 to-red-600",
        status: "soon",
    },
    {
        name: "E-Sign Platforms",
        category: "Document Signing",
        description: "DocuSign, SignNow, and custom e-signature workflows",
        icon: <PenTool className="w-5 h-5" />,
        gradient: "from-pink-500 to-rose-600",
        status: "soon",
    },
];

export default function IntegrationsShowcase() {
    const [activeTab, setActiveTab] = useState<"live" | "soon">("live");

    const liveIntegrations = integrations.filter(i => i.status === "live");
    const soonIntegrations = integrations.filter(i => i.status === "soon");
    const currentIntegrations = activeTab === "live" ? liveIntegrations : soonIntegrations;

    return (
        <section className="relative w-full min-h-screen py-24 overflow-hidden bg-black">
            {/* Background effects */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    className="text-center mb-12 space-y-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="text-purple-500 text-sm font-bold tracking-[0.2em] uppercase">
                        Powerful Integrations
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold leading-[1.1] text-white">
                        Native{" "}
                        <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                            Integrations
                        </span>
                    </h2>
                    <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl mx-auto">
                        We build the integrations we need, when we need them. No more waiting
                        months for Encompass to add a feature or service that our team needs today.
                    </p>
                </motion.div>

                {/* Tab Switcher */}
                <motion.div
                    className="flex justify-center mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <div className="inline-flex bg-zinc-900 rounded-xl p-1.5 border border-white/10">
                        <button
                            onClick={() => setActiveTab("live")}
                            className={`px-8 py-3 rounded-lg font-semibold text-sm transition-all ${
                                activeTab === "live"
                                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                                    : "text-zinc-400 hover:text-white"
                            }`}
                        >
                            Live Integrations ({liveIntegrations.length})
                        </button>
                        <button
                            onClick={() => setActiveTab("soon")}
                            className={`px-8 py-3 rounded-lg font-semibold text-sm transition-all ${
                                activeTab === "soon"
                                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                                    : "text-zinc-400 hover:text-white"
                            }`}
                        >
                            In Development ({soonIntegrations.length})
                        </button>
                    </div>
                </motion.div>

                {/* Integration Cards Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {currentIntegrations.map((integration, idx) => (
                        <motion.div
                            key={integration.name}
                            className="relative group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                        >
                            {/* Glow effect for NEW items */}
                            {integration.isNew && (
                                <div className="absolute -inset-[2px] bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 rounded-2xl opacity-70 blur-sm animate-pulse" />
                            )}
                            <div className={`relative bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-5 h-full transition-all ${
                                integration.isNew 
                                    ? "border-2 border-emerald-500/50 hover:border-emerald-400/70 shadow-lg shadow-emerald-500/20" 
                                    : "border border-white/10 hover:border-white/20"
                            }`}>
                                {/* NEW ribbon banner */}
                                {integration.isNew && (
                                    <div className="absolute -top-3 -right-3 z-10">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-emerald-500 rounded-full blur-md opacity-50" />
                                            <div className="relative bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                                                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                                Q1 2026
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`bg-gradient-to-br ${integration.gradient} p-3 rounded-xl ${integration.isNew ? "ring-2 ring-emerald-500/30" : ""}`}>
                                        <div className="text-white">
                                            {integration.icon}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {integration.isNew && (
                                            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                                NEW
                                            </span>
                                        )}
                                        {integration.status === "soon" && (
                                            <span className="text-xs font-bold px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                                                SOON
                                            </span>
                                        )}
                                        {integration.status === "live" && (
                                            <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                                                LIVE
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h3 className={`text-xl font-bold ${integration.isNew ? "text-white" : "text-white"}`}>{integration.name}</h3>
                                    <div className={`text-sm font-semibold uppercase tracking-wider ${integration.isNew ? "text-emerald-400" : "text-purple-400"}`}>
                                        {integration.category}
                                    </div>
                                    <p className="text-zinc-400 leading-relaxed text-sm">
                                        {integration.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Footer */}
                <motion.div
                    className="mt-12 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="inline-flex items-center gap-2.5 bg-zinc-900/50 backdrop-blur-sm border border-purple-500/20 rounded-full px-6 py-2.5">
                        <Zap className="w-5 h-5 text-purple-400" />
                        <span className="text-zinc-300">Full control over our integration ecosystem</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
