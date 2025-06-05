import './globals.css'
import type { Metadata } from 'next'
import BetaBanner from '@/components/BetaBanner'

export const metadata: Metadata = {
  title: 'Glass Bead Game (SUPER BETA)',
  description: 'A contemplative practice of intellectual improvisation - Currently in experimental beta',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <BetaBanner />
        {children}
      </body>
    </html>
  )
}
