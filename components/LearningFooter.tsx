'use client'

import Link from 'next/link'

interface LearningFooterProps {
  currentPage: 'introduction' | 'guide' | 'practice' | 'examples'
}

export default function LearningFooter({ currentPage }: LearningFooterProps) {
  const pages = [
    { key: 'introduction', label: 'INTRODUCTION', number: 1, href: '/introduction' },
    { key: 'guide', label: 'CONSTRUCTION GUIDE', number: 2, href: '/guide' },
    { key: 'practice', label: 'PRACTICE METHODS', number: 3, href: '/practice' },
    { key: 'examples', label: 'EXAMPLE GAMES', number: 4, href: '/examples' }
  ]

  const currentIndex = pages.findIndex(page => page.key === currentPage)
  const nextPage = currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null
  const isLastPage = currentIndex === pages.length - 1

  return (
    <div className="block-accent p-12 text-center">
      <h3 className="text-3xl mb-8 text-white">CONTINUE LEARNING</h3>
      <div className="flex flex-wrap gap-6 justify-center mb-8">
        {pages
          .filter(page => page.key !== currentPage)
          .map(page => {
            const isNext = page.key === nextPage?.key
            const buttonClass = isNext ? 'btn-accent px-8 py-4' : 'btn-secondary px-8 py-4'
            const label = isNext ? `NEXT: ${page.label} (${page.number})` : `${page.label} (${page.number})`
            
            return (
              <Link key={page.key} href={page.href} className={buttonClass}>
                {label}
              </Link>
            )
          })
        }
      </div>
      <div className="mt-8">
        <Link 
          href="/play" 
          className={`px-8 py-4 font-bold uppercase tracking-wider hover:bg-neutral-200 transition-all duration-100 shadow-brutal border-4 border-black ${
            isLastPage 
              ? 'bg-orange-600 text-white hover:bg-orange-700' 
              : 'bg-white text-black'
          }`}
        >
          {isLastPage ? 'NEXT: READY TO PLAY!' : 'READY TO PLAY!'}
        </Link>
      </div>
    </div>
  )
}
