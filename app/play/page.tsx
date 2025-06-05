'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface TrajectoryStep {
  left: string
  connection: string
  right: string
  synthesis?: string | null
}

interface ParsedResponse {
  response: string
  trajectory: TrajectoryStep[]
  commentary: Record<string, string>
}

export default function PlayPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentTrajectory, setCurrentTrajectory] = useState('')
  const [currentCommentary, setCurrentCommentary] = useState('')
  const [showPublishForm, setShowPublishForm] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const parseAIResponse = (content: string): { 
    trajectory: string, 
    commentary: string, 
    response: string 
  } => {
    try {
      // Try multiple JSON extraction methods
      let jsonStr = ''
      
      // Method 1: Look for JSON in code blocks
      const codeBlockMatch = content.match(/```json\s*([\s\S]*?)\s*```/)
      if (codeBlockMatch) {
        jsonStr = codeBlockMatch[1]
      } else {
        // Method 2: Look for raw JSON (find first { to last })
        const firstBrace = content.indexOf('{')
        const lastBrace = content.lastIndexOf('}')
        if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
          jsonStr = content.slice(firstBrace, lastBrace + 1)
        }
      }
      
      if (jsonStr) {
        const parsed = JSON.parse(jsonStr)
        
        if (parsed.trajectory && Array.isArray(parsed.trajectory)) {
          // Build trajectory with concept numbering
          let conceptCounter = 1
          const conceptMap = new Map<string, number>()
          
          const trajectoryLines = parsed.trajectory.map((step: any) => {
            if (!step.left || !step.right || !step.connection) return ''
            
            // Assign numbers to concepts
            if (!conceptMap.has(step.left)) {
              conceptMap.set(step.left, conceptCounter++)
            }
            if (!conceptMap.has(step.right)) {
              conceptMap.set(step.right, conceptCounter++)
            }
            
            const leftNum = conceptMap.get(step.left)
            const rightNum = conceptMap.get(step.right)
            
            let line = `[${step.left}]${leftNum} ${step.connection} [${step.right}]${rightNum}`
            if (step.synthesis && step.synthesis !== null) {
              line += ` ${step.synthesis}`
            }
            return line
          }).filter(line => line.length > 0)
          
          // Build commentary 
          const commentaryLines = Object.entries(parsed.commentary || {})
            .sort(([a], [b]) => parseInt(a) - parseInt(b))
            .map(([num, text]) => `${num}. ${text}`)
          
          return {
            trajectory: trajectoryLines.join('\n'),
            commentary: commentaryLines.join('\n'),
            response: parsed.response || 'AI response processed'
          }
        }
      }
    } catch (error) {
      console.log('JSON parse failed, using fallback:', error)
    }
    
    // Enhanced fallback regex parsing
    const trajectoryRegex = /\[([^\]]+)\]\s*([═─>~◊∞?!※★^v<]+)\s*\[([^\]]+)\]/g
    const trajectoryMatches = [...content.matchAll(trajectoryRegex)]
    const trajectory = trajectoryMatches.map((match, index) => 
      `[${match[1]}]${index*2+1} ${match[2]} [${match[3]}]${index*2+2}`
    ).join('\n')
    
    const commentaryRegex = /(?:^|\n)(\d+)[\.\)]\s*([^\n]+)/g
    const commentaryMatches = [...content.matchAll(commentaryRegex)]
    const commentary = commentaryMatches.map(match => `${match[1]}. ${match[2]}`).join('\n')
    
    return {
      trajectory: trajectory || '',
      commentary: commentary || '',
      response: content
    }
  }

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = { role: 'user', content: input }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      })

      if (!response.ok) throw new Error('Failed to send message')

      const data = await response.json()
      const assistantMessage: Message = { role: 'assistant', content: data.message }
      
      setMessages([...newMessages, assistantMessage])
      
      // Parse AI response for trajectory and commentary
      const { trajectory, commentary } = parseAIResponse(data.message)
      
      if (trajectory) {
        setCurrentTrajectory(trajectory)
      }
      if (commentary) {
        setCurrentCommentary(commentary)
      }

    } catch (error) {
      console.error('Error sending message:', error)
      // Add error message
      setMessages([...newMessages, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen">
      <Header currentPage="play" />
      
      {currentTrajectory && (
        <div className="bg-orange-600 border-b-4 border-black p-4 text-center">
          <button
            onClick={() => setShowPublishForm(true)}
            className="bg-white text-black border-4 border-white px-8 py-3 font-bold uppercase tracking-wider hover:bg-neutral-200 transition-all duration-100 shadow-brutal"
          >
            PUBLISH GAME
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-8 flex gap-8 h-[calc(100vh-100px)]">
        {/* Chat Interface */}
        <div className="flex-1 panel flex flex-col">
          <div className="panel-header">
            <h2 className="text-xl font-light text-stone-700">Conversation</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            {messages.length === 0 && (
              <div className="text-stone-500 text-center py-16 font-light italic">
                Begin by sharing what concepts or themes are calling to your attention today...
              </div>
            )}
            
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${message.role === 'user' ? 'user ml-12' : 'mr-12'}`}
              >
                <div className="text-sm text-stone-500 mb-3 font-light tracking-wide">
                  {message.role === 'user' ? 'You' : 'AI Partner'}
                </div>
                <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
              </div>
            ))}
            
            {isLoading && (
              <div className="chat-message mr-12">
                <div className="text-sm text-stone-500 mb-3 font-light tracking-wide">AI Partner</div>
                <div className="text-stone-500 italic">Contemplating...</div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="p-8 border-t border-stone-200">
            <div className="flex gap-4">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share your thoughts..."
                className="flex-1 chat-input resize-none"
                rows={3}
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="btn-primary px-8 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Sticky Panels */}
        <div className="w-[520px] flex flex-col gap-8">
          {/* Trajectory Panel */}
          <div className="panel sticky top-8">
            <div className="panel-header">
              <h2 className="text-xl font-light text-stone-700">Current Trajectory</h2>
            </div>
            <div className="panel-content max-h-80 overflow-y-auto">
              {currentTrajectory ? (
                <div className="trajectory-display">
                  {currentTrajectory}
                </div>
              ) : (
                <div className="text-stone-500 text-center py-16 font-light italic">
                  Your trajectory will appear here as you construct it...
                </div>
              )}
            </div>
          </div>

          {/* Commentary Panel */}
          <div className="panel sticky top-96">
            <div className="panel-header">
              <h2 className="text-xl font-light text-stone-700">Commentary</h2>
            </div>
            <div className="panel-content max-h-80 overflow-y-auto">
              {currentCommentary ? (
                <div className="commentary-text whitespace-pre-wrap">
                  {currentCommentary}
                </div>
              ) : (
                <div className="text-stone-500 text-center py-16 font-light italic">
                  Context and footnotes will appear here...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Publish Form Modal */}
      {showPublishForm && (
        <PublishForm 
          trajectory={currentTrajectory}
          conceptCommentary={currentCommentary}
          onClose={() => setShowPublishForm(false)}
        />
      )}
    </div>
  )
}

function PublishForm({ 
  trajectory, 
  conceptCommentary, 
  onClose 
}: { 
  trajectory: string
  conceptCommentary: string
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
      const response = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pseudonym,
          title,
          trajectory,
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
