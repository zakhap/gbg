import { NextRequest, NextResponse } from 'next/server'
import { callOpenRouter, GLASS_BEAD_GAME_PROMPT } from '@/lib/ai'

function extractJsonFromAIResponse(content: string): string {
  // Method 1: Look for JSON in code blocks
  const codeBlockMatch = content.match(/```json\s*([\s\S]*?)\s*```/)
  if (codeBlockMatch) {
    return codeBlockMatch[1].trim()
  }
  
  // Method 2: Look for raw JSON (find first { to last })
  const firstBrace = content.indexOf('{')
  const lastBrace = content.lastIndexOf('}')
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    return content.slice(firstBrace, lastBrace + 1)
  }
  
  // Method 3: Return the whole thing and let JSON.parse handle it
  return content.trim()
}

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

    // Try to parse the AI response as JSON
    let aiResponse
    try {
      const extractedJson = extractJsonFromAIResponse(content)
      aiResponse = JSON.parse(extractedJson)
      
      // Validate the response structure
      if (!aiResponse.conversational_response || !aiResponse.trajectory_state) {
        throw new Error('Invalid AI response structure')
      }
    } catch (error) {
      console.error('Failed to parse AI JSON response:', error)
      console.log('Raw AI response:', content)
      
      // Return a fallback response
      return NextResponse.json({
        conversational_response: content,
        trajectory_state: {
          trajectory: [],
          commentary: {}
        }
      })
    }
    
    return NextResponse.json(aiResponse)

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process chat message' },
      { status: 500 }
    )
  }
}
