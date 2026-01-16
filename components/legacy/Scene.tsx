'use client'

import { Canvas } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import LivingBlob from './LivingBlob'
import { Chapter, Facet } from './state'

interface SceneProps {
  activeChapter: Chapter
  activeFacet: Facet
  onFacetChange: (facet: Facet) => void
  pointerPos: { x: number; y: number }
  isDragging: boolean
}

export default function Scene({ activeChapter, activeFacet, onFacetChange, pointerPos, isDragging }: SceneProps) {
  const [mounted, setMounted] = useState(false)
  const [dpr, setDpr] = useState<[number, number]>([1, 2])

  useEffect(() => {
    setMounted(true)
    // Cap DPR on mobile
    const isMobile = window.innerWidth < 768
    setDpr(isMobile ? [1, 1] : [1, 2])
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-0" style={{ filter: 'blur(25px)' }}>
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={dpr}
        camera={{ position: [0, 0, 1] }}
      >
        <LivingBlob
          activeChapter={activeChapter}
          activeFacet={activeFacet}
          onFacetChange={onFacetChange}
          pointerPos={pointerPos}
          isDragging={isDragging}
        />
      </Canvas>
    </div>
  )
}

