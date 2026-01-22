"use client";

import AgentTeaser from '@/components/AgentTeaser'
import VerticalStages from '@/components/VerticalStages'
import FigureIntegration from '@/components/FigureIntegration'
import BeforeAfterShowstopper from '@/components/BeforeAfterShowstopper'
import LaunchAnnouncement from '@/components/LaunchAnnouncement'
import ProductRoadmap from '@/components/ProductRoadmap'
import IntegrationsShowcase from '@/components/IntegrationsShowcase'
import BusinessImpact from '@/components/BusinessImpact'
import Finale from '@/components/Finale'
import Preloader, { HeroSection } from '@/components/Preloader'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

export default function LaptopView() {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <>
      {/* Global styles for 80% scale */}
      <style jsx global>{`
        html {
          font-size: 80%;
        }
        .laptop-scale-container {
          transform: scale(0.8);
          transform-origin: top center;
          width: 125%; /* 100% / 0.8 = 125% to compensate for scale */
          margin-left: -12.5%; /* Center the scaled content */
        }
      `}</style>
      
      <div className="laptop-scale-container">
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
          {/* "One more thing..." showstopper */}
          <BeforeAfterShowstopper 
            oldSrc="https://s70uuy1ofcxlqlip.public.blob.vercel-storage.com/Pricing%20and%20Locking%20Process%20-%20Conforming%20to%20FHA%20%2B%20LA%20Increase%20%2B%20PE%20%281%29.mp4"
            newSrc="https://s70uuy1ofcxlqlip.public.blob.vercel-storage.com/Screen%20Recording%202026-01-22%20at%203.54.32%E2%80%AFPM.mov"
            oldStartMode="half"
            pipDelaySeconds={5}
          />
          {/* Launch announcement */}
          <LaunchAnnouncement />
          {/* Bottom sections: Roadmap, Integrations, Impact */}
          <ProductRoadmap />
          <IntegrationsShowcase />
          <BusinessImpact />
          <Finale />
        </main>
      </div>
    </>
  )
}
