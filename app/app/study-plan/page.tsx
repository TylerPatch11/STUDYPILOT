'use client'

import Navbar from '@/components/layout/Navbar'
import Card from '@/components/ui/Card'
import { CalendarIcon } from '@heroicons/react/24/outline'

export default function StudyPlanPage() {
  return (
    <>
      <Navbar title="Study Plan" />
      <div className="p-6 max-w-4xl mx-auto">
        <Card className="bg-module-studyPlan border-0 p-12 text-center">
          <CalendarIcon className="h-16 w-16 text-green-600 mx-auto mb-6" />
          <h1 className="text-3xl font-semibold text-text-primary mb-4">
            Study Planner Coming Soon
          </h1>
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            Get personalized study schedules that help you prepare for exams efficiently.
            Our AI will create a custom plan based on your exam dates and course load.
          </p>
          <div className="bg-white/50 rounded-md p-6 text-left max-w-md mx-auto">
            <h3 className="font-semibold text-text-primary mb-2">Features:</h3>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li>• Custom study schedules</li>
              <li>• Exam date tracking</li>
              <li>• Daily study goals</li>
              <li>• Progress monitoring</li>
            </ul>
          </div>
        </Card>
      </div>
    </>
  )
}

