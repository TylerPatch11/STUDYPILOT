'use client'

import Navbar from '@/components/layout/Navbar'
import Card from '@/components/ui/Card'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'

export default function QuizzesPage() {
  return (
    <>
      <Navbar title="Quizzes" />
      <div className="p-6 max-w-4xl mx-auto">
        <Card className="bg-module-quizzes border-0 p-12 text-center">
          <QuestionMarkCircleIcon className="h-16 w-16 text-orange-600 mx-auto mb-6" />
          <h1 className="text-3xl font-semibold text-text-primary mb-4">
            Quiz Generator Coming Soon
          </h1>
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            Soon you'll be able to generate practice quizzes automatically from your study materials
            to test your knowledge before exams.
          </p>
          <div className="bg-white/50 rounded-md p-6 text-left max-w-md mx-auto">
            <h3 className="font-semibold text-text-primary mb-2">Coming features:</h3>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li>• Multiple choice questions</li>
              <li>• True/False questions</li>
              <li>• Short answer questions</li>
              <li>• Instant feedback and explanations</li>
            </ul>
          </div>
        </Card>
      </div>
    </>
  )
}

