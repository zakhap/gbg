'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { IGame } from '@/models/Game'

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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold text-gray-800">
            Glass Bead Game
          </Link>
          <div className="flex gap-4">
            <Link 
              href="/play"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Play Game
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Gallery</h1>
          <p className="text-gray-600">
            Explore contemplative trajectories created by fellow practitioners
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-gray-500">Loading games...</div>
          </div>
        ) : games.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">No games published yet</div>
            <Link 
              href="/play"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Be the first to play
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {games.map((game) => (
              <div 
                key={game._id} 
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedGame(game)}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">
                        {game.title}
                      </h3>
                      <div className="text-sm text-gray-500">
                        by {game.pseudonym} • {formatDate(game.createdAt.toString())}
                      </div>
                    </div>
                  </div>
                  
                  <div className="trajectory-display bg-gray-50 p-4 rounded-md mb-4 max-h-32 overflow-hidden">
                    {game.trajectory}
                  </div>
                  
                  <p className="text-gray-600 line-clamp-3">
                    {game.commentary}
                  </p>
                </div>
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {game.title}
              </h2>
              <div className="text-gray-500">
                by {game.pseudonym} • {formatDate(game.createdAt.toString())}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Trajectory</h3>
            <div className="trajectory-display bg-gray-50 p-6 rounded-lg border">
              {game.trajectory}
            </div>
          </div>

          {game.conceptCommentary && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Concept Commentary</h3>
              <div className="prose max-w-none text-gray-700 whitespace-pre-wrap text-sm bg-blue-50 p-4 rounded-lg">
                {game.conceptCommentary}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold mb-4">Final Reflection</h3>
            <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
              {game.commentary}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
