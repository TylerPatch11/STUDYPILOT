import { NextRequest, NextResponse } from 'next/server'
import { extractTextFromFile } from '@/lib/file-parser'
import { generateCheatSheetFromText } from '@/lib/ai'
import {
  getUserData,
  checkUsageLimit,
  resetMonthlyUsageIfNeeded,
  incrementUsageCount,
} from '@/lib/firebase/db'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const userId = formData.get('userId') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ error: 'User ID required' }, { status: 401 })
    }

    // Check user's usage limit
    const userData = await getUserData(userId)
    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    await resetMonthlyUsageIfNeeded(userData)
    const updatedUserData = await getUserData(userId)
    if (!updatedUserData || !checkUsageLimit(updatedUserData)) {
      return NextResponse.json(
        { error: 'Monthly usage limit reached. Please upgrade to Pro.' },
        { status: 403 }
      )
    }

    // Extract text from file (server-side)
    const extractedText = await extractTextFromFile(file)

    if (!extractedText || extractedText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Could not extract text from file. Please try a different file.' },
        { status: 400 }
      )
    }

    // Generate cheat sheet using AI
    const cheatSheetContent = await generateCheatSheetFromText(extractedText)

    // Increment usage count
    await incrementUsageCount(userId)

    return NextResponse.json({
      success: true,
      content: cheatSheetContent,
      inputSummary: extractedText.substring(0, 500),
    })
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to process file' },
      { status: 500 }
    )
  }
}
