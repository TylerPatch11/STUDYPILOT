import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const CHEAT_SHEET_SYSTEM_PROMPT = `You are an expert study assistant. The user has provided class material. Your job is to generate a concise yet comprehensive cheat sheet summarizing key concepts, formulas, definitions, and examples. 

Requirements:
- Organize it with clear headings and bullet points
- Focus on the most important information that would appear on an exam
- Include key formulas, definitions, and concepts
- Use markdown formatting with headers (##), bullet points (-), and emphasis (*)
- Keep it concise enough to fit on 1-2 pages when printed
- Structure it so it's easy to scan and review quickly
- Prioritize accuracy and clarity

Assume this will be used the day before an exam for quick review.`

export async function generateCheatSheetFromText(rawText: string): Promise<string> {
  try {
    // Truncate very long text to avoid token limits (keep first 8000 characters)
    const truncatedText = rawText.length > 8000 ? rawText.substring(0, 8000) + '...' : rawText

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: CHEAT_SHEET_SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Please generate a cheat sheet from the following class material:\n\n${truncatedText}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error('No content generated from AI')
    }

    return content
  } catch (error) {
    console.error('Error generating cheat sheet:', error)
    throw new Error('Failed to generate cheat sheet. Please try again.')
  }
}

