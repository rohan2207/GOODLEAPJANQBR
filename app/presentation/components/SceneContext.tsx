"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Timer, TrendingUp } from "lucide-react";

export default function SceneContext({ isActive }: { isActive: boolean }) {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="grid grid-cols-2 gap-20 w-full max-w-6xl items-center">
                
                {/* Left: Text Context */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isActive ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-purple-400 font-mono text-sm tracking-widest uppercase mb-2 block">Market Context</span>
                        <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                            A Once-in-25-Years <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                                Tech Revolution
                            </span>
                        </h2>
                    </motion.div>

                    <motion.p
                         initial={{ opacity: 0 }}
                         animate={isActive ? { opacity: 1 } : {}}
                         transition={{ delay: 1, duration: 0.8 }}
                        className="text-xl text-white/60 leading-relaxed"
                    >
                        The mortgage industry is shifting from apathy to rapid adoption. 
                        The question isn't <span className="text-white font-semibold italic">if</span> AI will reshape mortgage, 
                        but <span className="text-white font-semibold italic">who will do it best</span>.
                    </motion.p>
                </div>

                {/* Right: Visual Metaphor */}
                <div className="relative">
                     {/* Timeline Bar */}
                     <motion.div 
                        className="absolute left-8 top-0 bottom-0 w-1 bg-white/10 rounded-full"
                        initial={{ height: 0 }}
                        animate={isActive ? { height: '100%' } : {}}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                     />

                     <div className="space-y-12 relative z-10">
                        <TimelineItem 
                            icon={Timer}
                            title="The Past"
                            subtitle="Apathy & Resistance"
                            delay={2}
                            isActive={isActive}
                            color="text-gray-500"
                        />
                         <TimelineItem 
                            icon={TrendingUp}
                            title="The Shift"
                            subtitle="Rapid Embracing of AI"
                            delay={5}
                            isActive={isActive}
                            color="text-blue-400"
                            active
                        />
                         <TimelineItem 
                            icon={BrainCircuit}
                            title="The Future"
                            subtitle="Who Will Lead?"
                            delay={8}
                            isActive={isActive}
                            color="text-purple-400"
                        />
                     </div>
                </div>
            </div>
        </div>
    );
}

function TimelineItem({ icon: Icon, title, subtitle, delay, isActive, color, active = false }: any) {
    return (
        <motion.div 
            className={`flex items-center gap-6 p-6 rounded-xl border transition-colors ${active ? 'bg-white/10 border-white/20' : 'bg-transparent border-transparent'}`}
            initial={{ opacity: 0, x: 20 }}
            animate={isActive ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: delay, duration: 0.6 }}
        >
            <div className={`w-16 h-16 rounded-full bg-black flex items-center justify-center border border-white/10 shadow-xl z-10 relative ${active ? 'scale-110' : ''}`}>
                <Icon className={`w-8 h-8 ${color}`} />
                {active && (
                    <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-blue-400" />
                )}
            </div>
            <div>
                <h3 className={`text-2xl font-bold ${active ? 'text-white' : 'text-white/40'}`}>{title}</h3>
                <p className={`${active ? 'text-white/80' : 'text-white/30'}`}>{subtitle}</p>
            </div>
        </motion.div>
    );
}
