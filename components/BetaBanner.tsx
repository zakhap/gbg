'use client'

import { useState } from 'react'

export default function BetaBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="beta-banner bg-orange-600 text-white border-b-4 border-black relative overflow-hidden">
      <div className="beta-ticker-content">
        <span className="beta-ticker-text">
          ⚠️ SUPER BETA ⚠️ EXPERIMENTAL BUILD ⚠️ EXPECT BUGS & CHANGES ⚠️ SUPER BETA ⚠️ EXPERIMENTAL BUILD ⚠️ EXPECT BUGS & CHANGES ⚠️ SUPER BETA ⚠️ EXPERIMENTAL BUILD ⚠️ EXPECT BUGS & CHANGES ⚠️ SUPER BETA ⚠️ EXPERIMENTAL BUILD ⚠️ EXPECT BUGS & CHANGES ⚠️
        </span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-black font-bold text-lg px-2 py-1 transition-colors duration-100"
        aria-label="Close beta banner"
      >
        ×
      </button>
    </div>
  )
}
