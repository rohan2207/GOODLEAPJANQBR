'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Chapter, Facet, CHAPTERS, CAPTIONS } from './state'

interface CaptionsProps {
  activeChapter: Chapter
  activeFacet: Facet
}

export default function Captions({ activeChapter, activeFacet }: CaptionsProps) {
  const chapter = CHAPTERS.find(c => c.id === activeChapter)
  const captions = activeFacet !== 'none' && CAPTIONS[activeFacet] ? CAPTIONS[activeFacet] : []

  return (
    <div className="fixed bottom-10 left-6 lg:left-24 z-40 max-w-sm">
      {/* Chapter title */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeChapter}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[10px] uppercase tracking-[0.2em] text-orange-400/60 mb-2">
            Chapter {activeChapter}
          </p>
          <h2 className="text-xl md:text-2xl font-light text-white/90 mb-2">
            {chapter?.title}
          </h2>
          <p className="text-sm text-white/50 mb-4">
            {chapter?.subtitle}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Facet captions */}
      <AnimatePresence mode="wait">
        {captions.length > 0 && (
          <motion.div
            key={activeFacet}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-4 pt-4 border-t border-white/10"
          >
            {captions.map((caption, i) => (
              <motion.p
                key={i}
                className="text-sm text-white/70 mb-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
              >
                {caption}
              </motion.p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interaction hint for chapter 1 */}
      {activeChapter === 1 && (
        <motion.p
          className="text-xs text-white/30 mt-6"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ↔ Drag blob to explore
        </motion.p>
      )}
    </div>
  )
}
