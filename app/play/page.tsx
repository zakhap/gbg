'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import SimpleTrajectoryDisplay from '@/components/SimpleTrajectoryDisplay'
import { useGameState } from '@/lib/useGameState'

export default function PlayPage() {
  const [input, setInput] = useState('')
  const [showPublishForm, setShowPublishForm] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const {
    messages,
    trajectoryState,
    isLoading,
    error,
    sendMessage,
    resetGame,
    clearError
  } = useGameState()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return
    await sendMessage(input)
    setInput('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const hasTrajectory = trajectoryState.trajectory.length > 0

  return (
    <div className="min-h-screen">
      <Header currentPage="play" />
      
      {/* Action Bar */}
      <div className="bg-orange-600 border-b-4 border-black p-4 flex justify-between items-center">
        <div className="flex gap-4">
          <button
            onClick={resetGame}
            className="bg-white text-black border-4 border-white px-6 py-2 font-bold uppercase tracking-wider hover:bg-neutral-200 transition-all duration-100 shadow-brutal text-sm"
          >
            NEW GAME
          </button>
        </div>
        
        {hasTrajectory && (
          <button
            onClick={() => setShowPublishForm(true)}
            className="bg-white text-black border-4 border-white px-8 py-3 font-bold uppercase tracking-wider hover:bg-neutral-200 transition-all duration-100 shadow-brutal"
          >
            PUBLISH GAME
          </button>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border-4 border-red-600 p-4 m-4">
          <div className="flex justify-between items-center">
            <span className="text-red-800 font-medium">{error}</span>
            <button
              onClick={clearError}
              className="text-red-600 hover:text-red-800 font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-8 flex gap-8 h-[calc(100vh-140px)]">
        {/* Chat Interface */}
        <div className="w-[450px] panel flex flex-col flex-shrink-0">
          <div className="panel-header">
            <h2 className="text-xl font-light text-black">Conversation</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${message.role === 'user' ? 'user ml-8' : 'mr-8'}`}
              >
                <div className="text-xs text-stone-500 mb-2 font-light tracking-wide">
                  {message.role === 'user' ? 'You' : 'Magister Ludi'}
                </div>
                <div className="whitespace-pre-wrap leading-relaxed text-sm">{message.content}</div>
              </div>
            ))}
            
            {isLoading && (
              <div className="chat-message mr-8">
                <div className="text-xs text-stone-500 mb-2 font-light tracking-wide">Magister Ludi</div>
                <div className="text-stone-500 italic text-sm">Contemplating...</div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="p-6 border-t border-stone-200">
            <div className="flex gap-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share your thoughts..."
                className="flex-1 chat-input resize-none text-sm"
                rows={2}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="btn-primary px-6 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Trajectory Panel */}
        <div className="flex-1 sticky top-8">
          <SimpleTrajectoryDisplay 
            trajectoryState={trajectoryState}
            className="h-full"
          />
        </div>
      </div>

      {/* Publish Form Modal */}
      {showPublishForm && (
        <PublishForm 
          trajectoryState={trajectoryState}
          onClose={() => setShowPublishForm(false)}
        />
      )}
    </div>
  )
}

function PublishForm({ 
  trajectoryState, 
  onClose 
}: { 
  trajectoryState: { trajectory: { text: string }[], commentary: Record<string, string> }
  onClose: () => void 
}) {
  const [pseudonym, setPseudonym] = useState('')
  const [title, setTitle] = useState('')
  const [commentary, setCommentary] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Convert trajectory state to strings for API
      const trajectoryText = trajectoryState.trajectory.map(line => line.text).join('\n')
      const conceptCommentary = Object.entries(trajectoryState.commentary)
        .sort(([a], [b]) => parseInt(a) - parseInt(b))
        .map(([num, text]) => `${num}. ${text}`)
        .join('\n')

      const response = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pseudonym,
          title,
          trajectory: trajectoryText,
          conceptCommentary,
          commentary
        })
      })

      if (response.ok) {
        onClose()
        window.location.href = '/gallery'
      } else {
        throw new Error('Failed to publish game')
      }
    } catch (error) {
      console.error('Error publishing game:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-stone-900 bg-opacity-60 flex items-center justify-center p-8 z-50">
      <div className="panel max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="panel-header">
          <h3 className="text-2xl font-light text-stone-800">Publish Your Game</h3>
        </div>
        <div className="panel-content">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-stone-700 font-light mb-3">
                Pseudonym
              </label>
              <input
                type="text"
                value={pseudonym}
                onChange={(e) => setPseudonym(e.target.value)}
                className="chat-input w-full"
                required
                maxLength={50}
              />
            </div>

            <div>
              <label className="block text-stone-700 font-light mb-3">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="chat-input w-full"
                required
                maxLength={200}
              />
            </div>

            <div>
              <label className="block text-stone-700 font-light mb-3">
                Final Reflection
              </label>
              <textarea
                value={commentary}
                onChange={(e) => setCommentary(e.target.value)}
                rows={8}
                className="chat-input w-full resize-none"
                placeholder="Reflect on the overall insights and patterns that emerged from this trajectory..."
                required
                maxLength={2000}
              />
              <div className="text-sm text-stone-500 mt-2 font-light italic">
                Concept footnotes will be included automatically from your conversation.
              </div>
            </div>

            <div className="flex justify-end gap-6 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="text-stone-600 hover:text-stone-800 transition-colors font-light"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Publishing...' : 'Publish'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
