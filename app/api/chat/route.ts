import { NextRequest, NextResponse } from 'next/server'
import { callOpenRouter, GLASS_BEAD_GAME_PROMPT } from '@/lib/ai'

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      )
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    const systemMessage = {
      role: 'system',
      content: GLASS_BEAD_GAME_PROMPT
    }

    const aiMessages = [systemMessage, ...messages]

    const response = await callOpenRouter(aiMessages)
    const content = response.choices[0]?.message?.content

    if (!content) {
      return NextResponse.json(
        { error: 'No response from AI' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ message: content })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process chat message' },
      { status: 500 }
    )
  }
}
