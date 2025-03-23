import { getAllPosts } from '@/lib/api'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const books = await getAllPosts(true, 'book')
    console.log("books", books)
    return NextResponse.json(books)
  } catch (error) {
    console.log("error", error)
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    )
  }
} 