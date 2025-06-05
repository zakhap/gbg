import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Game from '@/models/Game'
import { revalidateTag } from 'next/cache'

export async function GET() {
  try {
    await connectDB()
    const games = await Game.find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .lean()

    const response = NextResponse.json(games)
    
    // Cache for 5 minutes, revalidate when new games are added
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
    
    return response
  } catch (error) {
    console.error('Games API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch games' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const { pseudonym, title, trajectory, conceptCommentary, commentary } = await request.json()

    if (!pseudonym || !title || !trajectory || !conceptCommentary || !commentary) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const game = new Game({
      pseudonym: pseudonym.trim(),
      title: title.trim(),
      trajectory: trajectory.trim(),
      conceptCommentary: conceptCommentary.trim(),
      commentary: commentary.trim()
    })

    await game.save()

    // Revalidate the games cache after adding a new game
    try {
      revalidateTag('games')
    } catch (revalidateError) {
      console.warn('Failed to revalidate games cache:', revalidateError)
      // Don't fail the request if cache revalidation fails
    }

    return NextResponse.json(game, { status: 201 })
  } catch (error) {
    console.error('Games POST error:', error)
    return NextResponse.json(
      { error: 'Failed to create game' },
      { status: 500 }
    )
  }
}
