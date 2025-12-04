import pdfParse from 'pdf-parse'
import mammoth from 'mammoth'

export async function extractTextFromFile(file: File): Promise<string> {
  const fileType = file.type
  const fileName = file.name.toLowerCase()

  try {
    if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const data = await pdfParse(buffer)
      return data.text
    } else if (
      fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      fileName.endsWith('.docx')
    ) {
      const arrayBuffer = await file.arrayBuffer()
      const result = await mammoth.extractRawText({ arrayBuffer })
      return result.value
    } else if (
      fileType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
      fileName.endsWith('.pptx')
    ) {
      // For PPTX, we'll use a basic text extraction approach
      // In production, you might want to use a more sophisticated library
      return 'PPTX file content extraction is limited. Please consider converting to PDF or DOCX for best results.'
    } else if (fileType.startsWith('image/')) {
      // For images, we'll return a placeholder message
      // In production, you'd use OCR (e.g., Tesseract.js or an API)
      return 'Image file detected. OCR functionality will be available in a future update. Please upload PDF or DOCX files for now.'
    } else {
      // Try to read as plain text
      return await file.text()
    }
  } catch (error) {
    console.error('Error extracting text from file:', error)
    throw new Error(`Failed to extract text from file: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

