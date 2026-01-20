"use client";

import AgentTeaser from '@/components/AgentTeaser'
import VerticalStages from '@/components/VerticalStages'
import FigureIntegration from '@/components/FigureIntegration'
import BeforeAfterShowstopper from '@/components/BeforeAfterShowstopper'
import AgentSummary from '@/components/AgentSummary'
import FeatureGrid from '@/components/FeatureGrid'
import ProductRoadmap from '@/components/ProductRoadmap'
import IntegrationsShowcase from '@/components/IntegrationsShowcase'
import BusinessImpact from '@/components/BusinessImpact'
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
      {/* <AgentSummary /> Removed to consolidate with VerticalStages finale */}
      <FeatureGrid />
      {/* "One more thing..." showstopper - comes after the bento feature grid */}
      <BeforeAfterShowstopper 
        oldSrc="https://s70uuy1ofcxlqlip.public.blob.vercel-storage.com/Pricing%20and%20Locking%20Process%20-%20Conforming%20to%20FHA%20%2B%20LA%20Increase%20%2B%20PE%20%281%29.mp4"
        newSrc="https://s70uuy1ofcxlqlip.public.blob.vercel-storage.com/Link.mov"
        oldStartMode="half"
        pipDelaySeconds={5}
      />
      {/* Bottom sections: Roadmap, Integrations, Impact */}
      <ProductRoadmap />
      <IntegrationsShowcase />
      <BusinessImpact />
      <Finale />
    </main>
  )
}
