"use client";

import { motion } from "framer-motion";

const LOAN_OPTIONS = [
    { 
        type: "30-Year Fixed",
        rate: "6.125%",
        payment: "$2,150/mo",
        highlight: true,
        tag: "Best Rate"
    },
    { 
        type: "15-Year Fixed",
        rate: "5.625%",
        payment: "$2,890/mo",
        highlight: false,
        tag: "Fastest Payoff"
    },
    { 
        type: "ARM 5/1",
        rate: "5.250%",
        payment: "$1,980/mo",
        highlight: false,
        tag: "Lowest Payment"
    },
];

export default function Agent2Stage() {
    return (
        <div className="relative w-full h-full flex items-center justify-center p-8">
            {/* AI analyzing indicator */}
            <motion.div
                className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <motion.div
                    className="w-2 h-2 rounded-full bg-orange-500"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-orange-400 text-sm font-medium">Analyzing loan structures...</span>
            </motion.div>

            {/* Options cards */}
            <div className="flex flex-col md:flex-row gap-4 mt-8">
                {LOAN_OPTIONS.map((option, i) => (
                    <motion.div
                        key={option.type}
                        className={`relative p-5 rounded-xl border backdrop-blur-sm ${
                            option.highlight 
                                ? 'bg-orange-500/10 border-orange-500/40' 
                                : 'bg-white/5 border-white/10'
                        }`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.2, duration: 0.5 }}
                        style={{
                            boxShadow: option.highlight ? '0 0 40px rgba(249,115,22,0.2)' : 'none'
                        }}
                    >
                        {/* Tag */}
                        <span 
                            className={`absolute -top-3 left-4 px-3 py-1 rounded-full text-xs font-medium ${
                                option.highlight 
                                    ? 'bg-orange-500 text-white' 
                                    : 'bg-white/10 text-white/60'
                            }`}
                        >
                            {option.tag}
                        </span>

                        <div className="pt-2">
                            <p className="text-white/50 text-sm mb-1">{option.type}</p>
                            <p className={`text-3xl font-bold mb-2 ${
                                option.highlight ? 'text-orange-400' : 'text-white'
                            }`}>
                                {option.rate}
                            </p>
                            <p className="text-white/40 text-sm">{option.payment}</p>
                        </div>

                        {option.highlight && (
                            <motion.div
                                className="absolute -right-2 -top-2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1.5, type: "spring" }}
                            >
                                <span className="text-white text-sm">✓</span>
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* AI recommendation */}
            <motion.div
                className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-orange-500/5 border border-orange-500/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
            >
                <div className="flex items-start gap-3">
                    <span className="text-xl">💡</span>
                    <div>
                        <p className="text-white/60 text-sm">
                            <span className="text-orange-400 font-medium">Recommendation:</span> 30-Year Fixed offers optimal balance of rate and payment for this borrower&apos;s DTI profile.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
