'use client'

import Link from 'next/link'

interface HeaderProps {
  currentPage?: 'home' | 'guide' | 'practice' | 'examples' | 'play' | 'gallery'
}

export default function Header({ currentPage }: HeaderProps) {
  const navLinks = [
    { href: '/introduction', label: 'INTRO', key: 'introduction' },
    { href: '/guide', label: 'GUIDE', key: 'guide' },
    { href: '/practice', label: 'PRACTICE', key: 'practice' },
    { href: '/examples', label: 'EXAMPLES', key: 'examples' },
    { href: '/play', label: 'PLAY', key: 'play' },
    { href: '/gallery', label: 'GALLERY', key: 'gallery' }
  ]

  const getButtonClass = (linkKey: string) => {
    if (linkKey === currentPage) return 'btn-accent'
    if (linkKey === 'play') return 'btn-primary'
    return 'btn-secondary'
  }

  return (
    <header className="page-header sticky top-0 z-40">
      <div className="container-brutal py-4 md:py-6 flex flex-col md:flex-row gap-4 md:justify-between md:items-center">
        <Link href="/" className="text-xl md:text-2xl font-bold text-black tracking-wide uppercase text-center md:text-left">
          GLASS BEAD GAME
        </Link>
        <div className="flex flex-wrap gap-2 md:gap-4 justify-center md:justify-end">
          {navLinks
            .filter(link => link.key !== currentPage)
            .map(link => (
              <Link 
                key={link.key}
                href={link.href} 
                className={`${getButtonClass(link.key)} text-xs md:text-sm px-3 py-2 md:px-8 md:py-4`}
              >
                {link.label}
              </Link>
            ))
          }
        </div>
      </div>
    </header>
  )
}
