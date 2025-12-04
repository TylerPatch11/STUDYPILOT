import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'StudyPilot - Everything you need to study, automatically.',
  description: 'Upload your notes or syllabus and get cheat sheets, flashcards, quizzes, and study plans automatically.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

