'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { IGame } from '@/models/Game'
import Header from '@/components/Header'

export default function GalleryPage() {
  const [games, setGames] = useState<IGame[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedGame, setSelectedGame] = useState<IGame | null>(null)

  useEffect(() => {
    fetchGames()
  }, [])

  const fetchGames = async () => {
    try {
      const response = await fetch('/api/games')
      if (response.ok) {
        const data = await response.json()
        setGames(data)
      }
    } catch (error) {
      console.error('Error fetching games:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen">
      <Header currentPage="gallery" />

      <div className="max-w-6xl mx-auto p-8">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-extralight mb-6 text-stone-900">Gallery</h1>
          <p className="text-xl text-stone-600 font-light">
            Explore contemplative trajectories created by fellow practitioners
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="text-black font-bold uppercase">Loading games...</div>
          </div>
        ) : games.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-black mb-8 font-bold uppercase">No games published yet</div>
            <Link href="/play" className="btn-primary">
              Be the first to play
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {games.map((game) => (
              <div 
                key={game._id} 
                className="block p-8 cursor-pointer hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-100"
                onClick={() => setSelectedGame(game)}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-black mb-2 uppercase">
                      {game.title}
                    </h3>
                    <div className="text-black font-medium uppercase text-sm">
                      by {game.pseudonym} • {formatDate(game.createdAt.toString())}
                    </div>
                  </div>
                </div>
                
                <div className="trajectory-display mb-6 max-h-40 overflow-hidden relative">
                  {game.trajectory}
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent"></div>
                </div>
                
                <p className="text-black font-medium leading-normal line-clamp-3">
                  {game.commentary}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Game Detail Modal */}
      {selectedGame && (
        <GameDetailModal 
          game={selectedGame} 
          onClose={() => setSelectedGame(null)} 
        />
      )}
    </div>
  )
}

function GameDetailModal({ 
  game, 
  onClose 
}: { 
  game: IGame
  onClose: () => void 
}) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-8 z-50">
      <div className="block max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-orange-600 text-white p-8 border-b-4 border-black flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold mb-2 uppercase">
              {game.title}
            </h2>
            <div className="text-white font-medium uppercase">
              by {game.pseudonym} • {formatDate(game.createdAt.toString())}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-black text-3xl font-bold"
          >
            ×
          </button>
        </div>
        
        <div className="p-8">
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 uppercase border-b-4 border-black pb-2">TRAJECTORY</h3>
            <div className="trajectory-display">
              {game.trajectory}
            </div>
          </div>

          {game.conceptCommentary && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 uppercase border-b-4 border-black pb-2">CONCEPT COMMENTARY</h3>
              <div className="bg-neutral-200 border-4 border-black p-6 font-mono text-sm whitespace-pre-wrap">
                {game.conceptCommentary}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-2xl font-bold mb-6 uppercase border-b-4 border-black pb-2">FINAL REFLECTION</h3>
            <div className="text-black font-medium leading-normal whitespace-pre-wrap">
              {game.commentary}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
