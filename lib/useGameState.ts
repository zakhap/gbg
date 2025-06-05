'use client'

import { useState, useCallback, useEffect } from 'react'

export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export interface TrajectoryLine {
  text: string
}

export interface TrajectoryState {
  trajectory: TrajectoryLine[]
  commentary: Record<string, string>
}

export interface GameState {
  messages: Message[]
  trajectoryState: TrajectoryState
  isLoading: boolean
  error: string | null
}

export interface AIResponse {
  conversational_response: string
  trajectory_state: TrajectoryState
}

const STORAGE_KEY = 'gbg_game_state'
const MAX_RETRIES = 2

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>({
    messages: [],
    trajectoryState: {
      trajectory: [],
      commentary: {}
    },
    isLoading: false,
    error: null
  })

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        setGameState(prev => ({
          ...prev,
          ...parsed
        }))
      }
    } catch (error) {
      console.warn('Failed to load game state from localStorage:', error)
    }
  }, [])

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        messages: gameState.messages,
        trajectoryState: gameState.trajectoryState
      }))
    } catch (error) {
      console.warn('Failed to save game state to localStorage:', error)
    }
  }, [gameState.messages, gameState.trajectoryState])

  const sendMessage = useCallback(async (userInput: string) => {
    if (!userInput.trim()) return

    const userMessage: Message = { role: 'user', content: userInput }
    const newMessages = [...gameState.messages, userMessage]

    // Update state with user message
    setGameState(prev => ({
      ...prev,
      messages: newMessages,
      isLoading: true,
      error: null
    }))

    let retryCount = 0
    
    while (retryCount <= MAX_RETRIES) {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: newMessages })
        })

        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`)
        }

        const aiResponse: AIResponse = await response.json()
        
        // Validate the response structure (API should have already parsed this)
        if (!aiResponse.conversational_response || !aiResponse.trajectory_state) {
          throw new Error('Invalid AI response structure from API')
        }

        // Success! Update state with complete response
        const assistantMessage: Message = { 
          role: 'assistant', 
          content: aiResponse.conversational_response 
        }

        console.log('Successfully parsed AI response:', {
          conversational_response: aiResponse.conversational_response,
          trajectory_count: aiResponse.trajectory_state.trajectory.length,
          commentary_count: Object.keys(aiResponse.trajectory_state.commentary).length
        })

        setGameState(prev => ({
          ...prev,
          messages: [...newMessages, assistantMessage],
          trajectoryState: aiResponse.trajectory_state,
          isLoading: false,
          error: null
        }))

        return // Success, exit retry loop

      } catch (error) {
        retryCount++
        console.warn(`Attempt ${retryCount} failed:`, error)
        
        if (retryCount > MAX_RETRIES) {
          // Final failure
          const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
          setGameState(prev => ({
            ...prev,
            isLoading: false,
            error: `Failed to process message: ${errorMessage}`
          }))
          
          // Add error message to conversation
          const errorMsg: Message = {
            role: 'assistant',
            content: 'I encountered an error processing your message. Please try rephrasing or starting fresh.'
          }
          setGameState(prev => ({
            ...prev,
            messages: [...newMessages, errorMsg]
          }))
        }
        // Otherwise continue retry loop
      }
    }
  }, [gameState.messages])

  const resetGame = useCallback(() => {
    setGameState({
      messages: [],
      trajectoryState: {
        trajectory: [],
        commentary: {}
      },
      isLoading: false,
      error: null
    })
    
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.warn('Failed to clear localStorage:', error)
    }
  }, [])

  const clearError = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      error: null
    }))
  }, [])

  return {
    messages: gameState.messages,
    trajectoryState: gameState.trajectoryState,
    isLoading: gameState.isLoading,
    error: gameState.error,
    sendMessage,
    resetGame,
    clearError
  }
}
