'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Chapter, Facet, DEMO_DATA } from './state'

interface LinkAICanvasProps {
  activeChapter: Chapter
  activeFacet: Facet
}

export default function LinkAICanvas({ activeChapter, activeFacet }: LinkAICanvasProps) {
  // Determine what module to show
  const showHistory = activeFacet === 'history'
  const showAiContext = activeFacet === 'aiContext'
  const showLiabilities = activeFacet === 'liabilities'
  const showProperty = activeFacet === 'property'
  const showMortgage = activeFacet === 'mortgage' || activeChapter === 4

  const stateLabel = activeChapter < 4 ? 'Context' : 'Structure'

  return (
    <motion.div 
      className="fixed top-1/2 right-4 lg:right-12 -translate-y-1/2 z-30 w-72 lg:w-80"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="canvas-shell rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="h-10 flex items-center justify-between px-4 border-b border-white/5 bg-black/20">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <div className="w-2 h-2 rounded-full bg-white/20" />
            </div>
            <span className="text-[10px] text-white/30 ml-2">LinkAI</span>
          </div>
          <motion.span 
            className="text-[9px] text-white/40 uppercase tracking-wider"
            key={stateLabel}
          >
            {stateLabel}
          </motion.span>
        </div>

        {/* Content */}
        <div className="p-4 min-h-[400px]">
          {/* Customer - always visible */}
          <div className="flex items-center gap-3 pb-3 mb-3 border-b border-white/5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400/20 to-blue-400/20 flex items-center justify-center">
              👤
            </div>
            <div>
              <p className="text-sm font-medium text-white/90">{DEMO_DATA.customer.name}</p>
              <p className="text-[10px] text-white/40">{DEMO_DATA.customer.relationship}</p>
            </div>
          </div>

          {/* Dynamic content based on facet */}
          <AnimatePresence mode="wait">
            {/* History Module */}
            {showHistory && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-[9px] text-white/30 uppercase tracking-wider mb-3">GoodLeap History</p>
                <div className="space-y-2">
                  {DEMO_DATA.history.loans.map((loan, i) => (
                    <div key={i} className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm text-white/85">{loan.type}</p>
                          <p className="text-[10px] text-white/40">{loan.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-white/80">{loan.amount}</p>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded ${
                            loan.status === 'Completed' ? 'bg-green-400/10 text-green-400/70' : 'bg-blue-400/10 text-blue-400/70'
                          }`}>
                            {loan.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 p-3 rounded-lg bg-green-400/5 border border-green-400/10">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-white/40">Trust Score</span>
                    <span className="text-sm font-medium text-green-400">{DEMO_DATA.history.trustScore}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* AI Context Module */}
            {showAiContext && (
              <motion.div
                key="aiContext"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-[9px] text-white/30 uppercase tracking-wider mb-3">✨ Conversation Brief</p>
                
                <div className="p-3 rounded-lg bg-orange-400/5 border border-orange-400/10 mb-3">
                  <p className="text-xs text-white/70 leading-relaxed">{DEMO_DATA.aiContext.summary}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
                    <p className="text-[9px] text-white/30">Weather</p>
                    <p className="text-xs text-white/70">{DEMO_DATA.aiContext.weather}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
                    <p className="text-[9px] text-white/30">Location</p>
                    <p className="text-xs text-white/70">{DEMO_DATA.customer.location}</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                  <p className="text-[9px] text-white/30 mb-1">Suggested opener</p>
                  <p className="text-xs text-white/60 italic">"{DEMO_DATA.aiContext.suggestedOpener}"</p>
                </div>
              </motion.div>
            )}

            {/* Liabilities Module */}
            {showLiabilities && (
              <motion.div
                key="liabilities"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-[9px] text-white/30 uppercase tracking-wider mb-3">Liabilities</p>
                <div className="space-y-2">
                  {DEMO_DATA.liabilities.map((item, i) => (
                    <div key={i} className="p-3 rounded-lg bg-white/[0.03] border border-white/5 flex justify-between items-center">
                      <div>
                        <p className="text-sm text-white/85">{item.name}</p>
                        <p className="text-[10px] text-white/40">{item.payment}</p>
                      </div>
                      <div className="text-right flex items-center gap-2">
                        <p className="text-sm text-white/80">{item.balance}</p>
                        {item.verified && (
                          <span className="text-green-400 text-xs">✓</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-white/30 mt-3 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
                  All verified automatically
                </p>
              </motion.div>
            )}

            {/* Property Module */}
            {showProperty && (
              <motion.div
                key="property"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-[9px] text-white/30 uppercase tracking-wider mb-3">Property Confidence</p>
                
                <div className="p-4 rounded-lg bg-white/[0.03] border border-white/5 mb-3">
                  <p className="text-xs text-white/60 mb-3">{DEMO_DATA.property.address}</p>
                  
                  {/* Value range */}
                  <div className="mb-4">
                    <div className="flex justify-between text-[10px] text-white/40 mb-1">
                      <span>{DEMO_DATA.property.valueLow}</span>
                      <span>{DEMO_DATA.property.valueHigh}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-gradient-to-r from-orange-400/60 to-blue-400/60 rounded-full" />
                    </div>
                    <p className="text-center text-lg font-semibold text-white mt-2">{DEMO_DATA.property.valueMid}</p>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-white/5">
                    <div>
                      <p className="text-[10px] text-white/40">Equity</p>
                      <p className="text-base font-medium text-green-400">{DEMO_DATA.property.equity}</p>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-green-400/10 text-green-400/80">
                      {DEMO_DATA.property.confidence} Confidence
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Mortgage Module */}
            {showMortgage && (
              <motion.div
                key="mortgage"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-[9px] text-white/30 uppercase tracking-wider mb-3">Structure → Mortgage</p>
                
                <div className="p-4 rounded-lg bg-gradient-to-br from-orange-400/5 to-blue-400/5 border border-white/10 mb-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-[10px] text-white/40">Amount</p>
                      <p className="text-xl font-semibold text-white">{DEMO_DATA.mortgage.amount}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/40">Rate</p>
                      <p className="text-xl font-semibold text-orange-400">{DEMO_DATA.mortgage.rate}</p>
                    </div>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-white/5">
                    <div>
                      <p className="text-[10px] text-white/40">Term</p>
                      <p className="text-sm text-white/70">{DEMO_DATA.mortgage.term}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-white/40">Payment</p>
                      <p className="text-sm text-white/70">{DEMO_DATA.mortgage.payment}</p>
                    </div>
                  </div>
                </div>

                {/* Integrations */}
                <p className="text-[9px] text-white/30 uppercase tracking-wider mb-2">Connected</p>
                <div className="flex flex-wrap gap-2">
                  {DEMO_DATA.integrations.map((int, i) => (
                    <motion.div
                      key={i}
                      className="px-2 py-1 rounded bg-white/5 text-[10px] text-white/50 flex items-center gap-1"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="w-1 h-1 rounded-full bg-green-400" />
                      {int.name}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Default/Empty state */}
            {activeFacet === 'none' && activeChapter < 4 && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-64 text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-3xl mb-4"
                >
                  ✨
                </motion.div>
                <p className="text-sm text-white/40">Drag the blob to explore</p>
                <p className="text-xs text-white/25 mt-1">Customer context awaits</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

