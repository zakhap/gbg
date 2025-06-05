import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Glass Bead Game',
  description: 'A contemplative practice of intellectual improvisation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
