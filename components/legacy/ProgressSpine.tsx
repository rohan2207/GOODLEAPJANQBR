'use client'

import { motion } from 'framer-motion'
import { Chapter, CHAPTERS } from './state'

interface ProgressSpineProps {
  activeChapter: Chapter
}

export default function ProgressSpine({ activeChapter }: ProgressSpineProps) {
  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-4">
      {CHAPTERS.map((chapter) => (
        <div key={chapter.id} className="relative flex items-center">
          <motion.div
            className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
              activeChapter === chapter.id
                ? 'bg-orange-400 scale-125 shadow-[0_0_12px_rgba(251,146,60,0.6)]'
                : activeChapter > chapter.id
                ? 'bg-white/40'
                : 'bg-white/15'
            }`}
          />
          
          {/* Chapter label on hover/active */}
          <motion.span
            className="absolute left-6 whitespace-nowrap text-[10px] uppercase tracking-wider pointer-events-none"
            animate={{
              opacity: activeChapter === chapter.id ? 1 : 0,
              x: activeChapter === chapter.id ? 0 : -5,
            }}
            transition={{ duration: 0.3 }}
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            {chapter.id}. {chapter.title}
          </motion.span>
        </div>
      ))}
      
      {/* Connecting line */}
      <div className="absolute left-[5px] top-0 bottom-0 w-px bg-white/10 -z-10" />
    </div>
  )
}
