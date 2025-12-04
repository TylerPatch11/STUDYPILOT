'use client'

import Navbar from '@/components/layout/Navbar'
import Card from '@/components/ui/Card'
import { AcademicCapIcon } from '@heroicons/react/24/outline'

export default function FlashcardsPage() {
  return (
    <>
      <Navbar title="Flashcards" />
      <div className="p-6 max-w-4xl mx-auto">
        <Card className="bg-module-flashcards border-0 p-12 text-center">
          <AcademicCapIcon className="h-16 w-16 text-purple-600 mx-auto mb-6" />
          <h1 className="text-3xl font-semibold text-text-primary mb-4">
            Flashcards Coming Soon
          </h1>
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            We're working on an AI-powered flashcard generator that will automatically create
            interactive flashcards from your study materials. Stay tuned!
          </p>
          <div className="bg-white/50 rounded-md p-6 text-left max-w-md mx-auto">
            <h3 className="font-semibold text-text-primary mb-2">What to expect:</h3>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li>• Automatic flashcard generation from uploaded files</li>
              <li>• Spaced repetition algorithm for optimal learning</li>
              <li>• Multiple card types (definition, Q&A, fill-in-the-blank)</li>
              <li>• Track your progress and mastery</li>
            </ul>
          </div>
        </Card>
      </div>
    </>
  )
}

