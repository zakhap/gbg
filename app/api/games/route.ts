import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Game from '@/models/Game'
import { revalidateTag } from 'next/cache'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search') || ''
    
    // Validate pagination params
    const validatedPage = Math.max(1, Math.min(page, 1000)) // Max 1000 pages
    const validatedLimit = Math.max(1, Math.min(limit, 50)) // Max 50 per page
    const skip = (validatedPage - 1) * validatedLimit
    
    // Build query
    let query = {}
    if (search.trim()) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { pseudonym: { $regex: search, $options: 'i' } },
          { commentary: { $regex: search, $options: 'i' } }
        ]
      }
    }
    
    // Execute queries in parallel
    const [games, totalCount] = await Promise.all([
      Game.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(validatedLimit)
        .select('pseudonym title trajectory commentary createdAt') // Exclude large conceptCommentary field
        .lean(),
      Game.countDocuments(query)
    ])
    
    const totalPages = Math.ceil(totalCount / validatedLimit)
    const hasNextPage = validatedPage < totalPages
    const hasPreviousPage = validatedPage > 1
    
    const result = {
      games,
      pagination: {
        currentPage: validatedPage,
        totalPages,
        totalCount,
        limit: validatedLimit,
        hasNextPage,
        hasPreviousPage
      }
    }

    const response = NextResponse.json(result)
    
    // Aggressive caching for paginated results
    // Cache for 10 minutes, with stale-while-revalidate for better UX
    response.headers.set('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200')
    
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
