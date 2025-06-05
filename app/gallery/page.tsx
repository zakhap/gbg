'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { IGame } from '@/models/Game'
import Header from '@/components/Header'
import SimpleTrajectoryDisplay from '@/components/SimpleTrajectoryDisplay'

interface PaginationData {
  currentPage: number
  totalPages: number
  totalCount: number
  limit: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

interface GamesResponse {
  games: IGame[]
  pagination: PaginationData
}

export default function GalleryPage() {
  const [gamesData, setGamesData] = useState<GamesResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedGame, setSelectedGame] = useState<IGame | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const fetchGames = useCallback(async (page: number = 1, search: string = '') => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20'
      })
      
      if (search.trim()) {
        params.append('search', search.trim())
      }
      
      const response = await fetch(`/api/games?${params}`)
      if (response.ok) {
        const data: GamesResponse = await response.json()
        setGamesData(data)
        setCurrentPage(page)
      }
    } catch (error) {
      console.error('Error fetching games:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchGames(1, searchQuery)
  }, [fetchGames, searchQuery])

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }, [])

  const handlePageChange = useCallback((page: number) => {
    fetchGames(page, searchQuery)
  }, [fetchGames, searchQuery])

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

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="text-black font-bold uppercase">Loading games...</div>
          </div>
        ) : !gamesData || gamesData.games.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-black mb-8 font-bold uppercase">
              {searchQuery ? `No games found for "${searchQuery}"` : 'No games published yet'}
            </div>
            {!searchQuery && (
              <Link href="/play" className="btn-primary">
                Be the first to play
              </Link>
            )}
          </div>
        ) : (
          <>
            {/* Results Summary */}
            <div className="mb-6 text-center">
              <div className="text-stone-600 font-medium">
                Showing {gamesData.games.length} of {gamesData.pagination.totalCount} games
                {searchQuery && ` matching "${searchQuery}"`}
              </div>
            </div>

            {/* Games List */}
            <div className="space-y-8 mb-12">
              {gamesData.games.map((game) => (
                <GameCard 
                  key={game._id} 
                  game={game} 
                  onClick={() => setSelectedGame(game)}
                  formatDate={formatDate}
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination 
              pagination={gamesData.pagination}
              onPageChange={handlePageChange}
              isLoading={isLoading}
            />
          </>
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

function SearchBar({ onSearch, isLoading }: { onSearch: (query: string) => void, isLoading: boolean }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className="panel max-w-2xl mx-auto">
      <div className="panel-content">
        <div className="flex gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, author, or content..."
            className="flex-1 chat-input"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary px-6 disabled:opacity-50"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  )
}

function GameCard({ 
  game, 
  onClick, 
  formatDate 
}: { 
  game: IGame
  onClick: () => void
  formatDate: (date: string) => string 
}) {
  return (
    <div 
      className="block p-8 cursor-pointer hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-100"
      onClick={onClick}
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
      
      <div className="mb-6 max-h-40 overflow-hidden relative">
        <SimpleTrajectoryDisplay 
          trajectoryState={{
            trajectory: game.trajectory.split('\n').map(text => ({ text })),
            commentary: {}
          }}
          className="scale-75 origin-top-left"
        />
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent"></div>
      </div>
      
      <p className="text-black font-medium leading-normal line-clamp-3">
        {game.commentary}
      </p>
    </div>
  )
}

function Pagination({ 
  pagination, 
  onPageChange, 
  isLoading 
}: { 
  pagination: PaginationData
  onPageChange: (page: number) => void
  isLoading: boolean
}) {
  const { currentPage, totalPages, hasNextPage, hasPreviousPage } = pagination

  // Generate page numbers to show
  const getPageNumbers = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center items-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPreviousPage || isLoading}
        className="btn-secondary px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <div className="flex gap-1">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' ? onPageChange(page) : undefined}
            disabled={page === '...' || page === currentPage || isLoading}
            className={`px-3 py-2 text-sm font-bold border-4 border-black ${
              page === currentPage 
                ? 'bg-black text-white' 
                : page === '...'
                ? 'bg-transparent border-transparent text-stone-400 cursor-default'
                : 'bg-white text-black hover:bg-neutral-200'
            } ${page !== '...' ? 'hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-100' : ''}`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage || isLoading}
        className="btn-secondary px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
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
  const [fullGame, setFullGame] = useState<IGame | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFullGame = async () => {
      try {
        const response = await fetch(`/api/games/${game._id}`)
        if (response.ok) {
          const data = await response.json()
          setFullGame(data)
        }
      } catch (error) {
        console.error('Error fetching full game:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFullGame()
  }, [game._id])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const gameData = fullGame || game

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-8 z-50">
      <div className="block max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-orange-600 text-white p-8 border-b-4 border-black flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold mb-2 uppercase">
              {gameData.title}
            </h2>
            <div className="text-white font-medium uppercase">
              by {gameData.pseudonym} • {formatDate(gameData.createdAt.toString())}
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
          {isLoading ? (
            <div className="text-center py-12">
              <div className="text-black font-bold uppercase">Loading full game...</div>
            </div>
          ) : (
            <>
              <div className="mb-12">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold uppercase border-b-4 border-black pb-2">TRAJECTORY</h3>
                </div>
                <div className="min-h-96">
                  <SimpleTrajectoryDisplay 
                    trajectoryState={{
                      trajectory: gameData.trajectory.split('\n').map(text => ({ text })),
                      commentary: fullGame?.conceptCommentary ? 
                        fullGame.conceptCommentary.split('\n').reduce((acc, line) => {
                          const match = line.match(/^(\d+)\.\s+(.+)$/)
                          if (match) {
                            acc[match[1]] = match[2]
                          }
                          return acc
                        }, {} as Record<string, string>) : {}
                    }}
                    className="h-full scale-90 origin-top-left"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 uppercase border-b-4 border-black pb-2">FINAL REFLECTION</h3>
                <div className="text-black font-medium leading-normal whitespace-pre-wrap">
                  {gameData.commentary}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
