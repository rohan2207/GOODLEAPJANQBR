'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import dynamic from 'next/dynamic'
import ProgressSpine from './ProgressSpine'
import Captions from './Captions'
import LinkAICanvas from './LinkAICanvas'
import { Chapter, Facet, CHAPTERS } from './state'

const Scene = dynamic(() => import('./Scene'), { ssr: false })

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeChapter, setActiveChapter] = useState<Chapter>(1)
  const [activeFacet, setActiveFacet] = useState<Facet>('none')
  const [pointerPos, setPointerPos] = useState({ x: 0.5, y: 0.5 })
  const [isDragging, setIsDragging] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Map scroll to chapters
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const chapter = Math.min(4, Math.max(1, Math.ceil(v * 4))) as Chapter
    if (chapter !== activeChapter) {
      setActiveChapter(chapter)
      // Reset facet when changing chapters
      if (chapter === 4) {
        setActiveFacet('mortgage')
      } else {
        setActiveFacet('none')
      }
    }
  })

  // Track pointer
  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    setPointerPos({
      x: e.clientX / window.innerWidth,
      y: 1 - e.clientY / window.innerHeight,
    })
  }, [])

  const handlePointerDown = useCallback(() => {
    setIsDragging(true)
  }, [])

  const handlePointerUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Global pointer up handler
  useEffect(() => {
    const handleUp = () => setIsDragging(false)
    window.addEventListener('pointerup', handleUp)
    return () => window.removeEventListener('pointerup', handleUp)
  }, [])

  const handleFacetChange = useCallback((facet: Facet) => {
    setActiveFacet(facet)
  }, [])

  // Logo visibility
  const showHeroLogo = activeChapter === 1

  return (
    <div 
      ref={containerRef} 
      className="relative bg-[#08080b]"
      style={{ height: '400vh' }}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {/* === PERSISTENT SCENE === */}
      <div className="fixed inset-0 overflow-hidden">
        
        {/* WebGL Blob */}
        <Scene
          activeChapter={activeChapter}
          activeFacet={activeFacet}
          onFacetChange={handleFacetChange}
          pointerPos={pointerPos}
          isDragging={isDragging}
        />

        {/* Vignette */}
        <div className="vignette" />

        {/* Progress spine */}
        <ProgressSpine activeChapter={activeChapter} />

        {/* Captions */}
        <Captions activeChapter={activeChapter} activeFacet={activeFacet} />

        {/* LinkAI Canvas */}
        <LinkAICanvas activeChapter={activeChapter} activeFacet={activeFacet} />

        {/* Hero logo - Chapter 1 only */}
        <motion.div
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none text-center"
          animate={{
            opacity: showHeroLogo ? 1 : 0,
            scale: showHeroLogo ? 1 : 0.9,
            y: showHeroLogo ? 0 : -30,
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-[10px] uppercase tracking-[0.25em] text-orange-400/50 mb-3">
            One GoodLeap Experience
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold">
            <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-blue-500 bg-clip-text text-transparent">
              LinkAI
            </span>
          </h1>
          <p className="text-sm md:text-base text-white/50 mt-4 max-w-md mx-auto">
            Mortgage is the continuation of a relationship<br />we already understand.
          </p>
        </motion.div>

        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-8 py-4">
          <span className="text-sm font-medium text-white/50">LinkAI</span>
          <span className="text-[10px] text-white/30 uppercase tracking-wider">QBR 2026</span>
        </header>

        {/* Scroll hint */}
        <motion.div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 text-center"
          animate={{ opacity: activeChapter === 1 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/30"
          >
            <p className="text-[10px] uppercase tracking-wider mb-1">Scroll to explore</p>
            <span className="text-sm">↓</span>
          </motion.div>
        </motion.div>

        {/* Chapter indicator */}
        <div className="fixed bottom-6 right-6 z-40 text-right">
          <p className="text-[9px] text-white/20 uppercase tracking-wider">
            Chapter {activeChapter} of 4
          </p>
        </div>

        {/* Facet selection buttons (reduced motion fallback) */}
        {(activeChapter === 2 || activeChapter === 3) && (
          <motion.div 
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {CHAPTERS.find(c => c.id === activeChapter)?.facets.map((facet) => (
              <button
                key={facet}
                onClick={() => handleFacetChange(facet)}
                className={`w-16 h-16 rounded-full border transition-all duration-300 text-[10px] uppercase tracking-wider ${
                  activeFacet === facet
                    ? 'border-orange-400/50 bg-orange-400/10 text-orange-400/80'
                    : 'border-white/10 bg-white/5 text-white/30 hover:border-white/20 hover:text-white/50'
                }`}
              >
                {facet === 'history' && '↙ History'}
                {facet === 'aiContext' && '↗ Context'}
                {facet === 'liabilities' && '→ Debts'}
                {facet === 'property' && '↓ Property'}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Grain overlay */}
      <div className="grain" />
    </div>
  )
}
