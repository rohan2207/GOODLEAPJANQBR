"use client";

import AgentTeaser from '@/components/AgentTeaser'
import VerticalStages from '@/components/VerticalStages'
import FigureIntegration from '@/components/FigureIntegration'
import AgentSummary from '@/components/AgentSummary'
import FeatureGrid from '@/components/FeatureGrid'
import Finale from '@/components/Finale'
import Preloader, { HeroSection } from '@/components/Preloader'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <main className="flex flex-col min-h-screen bg-black text-white selection:bg-orange-500/30">
      {/* Preloader overlay - fades out when complete */}
      <AnimatePresence mode="wait">
        {showPreloader && (
          <Preloader 
            key="preloader"
            onComplete={() => setShowPreloader(false)} 
          />
        )}
      </AnimatePresence>

      {/* Main content - always rendered but hidden behind preloader initially */}
      <HeroSection />
      <AgentTeaser />
      <VerticalStages />
      <FigureIntegration />
      <AgentSummary />
      <FeatureGrid />
      <Finale />
    </main>
  )
}
