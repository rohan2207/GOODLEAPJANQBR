import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import SmoothScroll from '@/components/SmoothScroll'

// Inter - the brand font for both display and body
const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'LinkAI | The Future of Mortgage',
  description: 'Project LINK AI - QBR Review',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(
        inter.variable, 
        "bg-background font-sans min-h-screen"
      )}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
        {/* Cinematic overlays */}
        <div className="vignette-overlay" aria-hidden="true" />
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  )
}
