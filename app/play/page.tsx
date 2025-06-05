'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold text-gray-800">
            Glass Bead Game
          </Link>
          <div className="flex gap-4">
            {currentTrajectory && (
              <button
                onClick={() => setShowPublishForm(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
              >
                Publish Game
              </button>
            )}
            <Link 
              href="/gallery"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Gallery
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 flex gap-6 h-[calc(100vh-80px)]">
        {/* Chat Interface */}
        <div className="flex-1 bg-white rounded-lg shadow-md flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Conversation</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-gray-500 text-center py-8">
                Begin by sharing what concepts or themes are calling to your attention today...
              </div>
            )}
            
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-50 ml-8'
                    : 'bg-gray-50 mr-8'
                }`}
              >
                <div className="text-sm text-gray-600 mb-1">
                  {message.role === 'user' ? 'You' : 'AI Partner'}
                </div>
                <div className="whitespace-pre-wrap">{message.content}</div>
              </div>
            ))}
            
            {isLoading && (
              <div className="bg-gray-50 mr-8 p-3 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">AI Partner</div>
                <div className="text-gray-500">Contemplating...</div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share your thoughts..."
                className="flex-1 p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Sticky Panels */}
        <div className="w-[500px] flex flex-col gap-4">
          {/* Trajectory Panel */}
          <div className="bg-white rounded-lg shadow-md sticky top-4">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Current Trajectory</h2>
            </div>
            <div className="p-4 max-h-80 overflow-y-auto">
              {currentTrajectory ? (
                <pre className="trajectory-display text-sm">
                  {currentTrajectory}
                </pre>
              ) : (
                <div className="text-gray-500 text-center py-8">
                  Your trajectory will appear here...
                </div>
              )}
            </div>
          </div>

          {/* Commentary Panel */}
          <div className="bg-white rounded-lg shadow-md sticky top-96">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Commentary</h2>
            </div>
            <div className="p-4 max-h-80 overflow-y-auto">
              {currentCommentary ? (
                <div className="text-sm whitespace-pre-wrap">
                  {currentCommentary}
                </div>
              ) : (
                <div className="text-gray-500 text-center py-8">
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Publish Your Game</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Pseudonym
              </label>
              <input
                type="text"
                value={pseudonym}
                onChange={(e) => setPseudonym(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                maxLength={50}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                maxLength={200}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Final Reflection
              </label>
              <textarea
                value={commentary}
                onChange={(e) => setCommentary(e.target.value)}
                rows={6}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Reflect on the overall insights and patterns that emerged from this trajectory..."
                required
                maxLength={2000}
              />
              <div className="text-xs text-gray-500 mt-1">
                Concept footnotes will be included automatically from your conversation.
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 transition-colors"
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
