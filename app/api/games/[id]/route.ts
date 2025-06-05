import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Game from '@/models/Game'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Game ID is required' },
        { status: 400 }
      )
    }
    
    const game = await Game.findById(id).lean()
    
    if (!game) {
      return NextResponse.json(
        { error: 'Game not found' },
        { status: 404 }
      )
    }
    
    const response = NextResponse.json(game)
    
    // Cache individual games for 1 hour (they don't change)
    response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=7200')
    
    return response
  } catch (error) {
    console.error('Game detail API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch game' },
      { status: 500 }
    )
  }
}
