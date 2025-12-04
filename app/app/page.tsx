'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getCurrentUser } from '@/lib/firebase/auth'
import { getUserData, getUserCheatSheets, getUserClasses } from '@/lib/firebase/db'
import { UserData, CheatSheet, Class } from '@/lib/firebase/db'
import Navbar from '@/components/layout/Navbar'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'
import {
  DocumentTextIcon,
  AcademicCapIcon,
  QuestionMarkCircleIcon,
  CalendarIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline'

const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

export default function DashboardPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [recentCheatSheets, setRecentCheatSheets] = useState<CheatSheet[]>([])
  const [classes, setClasses] = useState<Class[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      const user = getCurrentUser()
      if (!user) return

      try {
        const [userInfo, cheatSheets, userClasses] = await Promise.all([
          getUserData(user.uid),
          getUserCheatSheets(user.uid, 3),
          getUserClasses(user.uid),
        ])
        setUserData(userInfo)
        setRecentCheatSheets(cheatSheets)
        setClasses(userClasses.slice(0, 3))
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const firstName = userData?.displayName?.split(' ')[0] || 'there'

  if (loading) {
    return (
      <>
        <Navbar title="Dashboard" />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <svg className="animate-spin h-8 w-8 text-primary-blue mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4 text-text-secondary">Loading...</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar title="Dashboard" />
      <div className="p-6 space-y-8">
        {/* Welcome Header */}
        <div>
          <h1 className="text-3xl font-semibold text-text-primary mb-2">
            Welcome back, {firstName}!
          </h1>
          <p className="text-text-secondary">Here's your study overview.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/app/upload">
            <Button variant="primary" className="w-full justify-center">
              <PlusIcon className="h-5 w-5 mr-2" />
              Upload Notes
            </Button>
          </Link>
          <Link href="/app/upload">
            <Button variant="outline" className="w-full justify-center">
              <DocumentTextIcon className="h-5 w-5 mr-2" />
              Generate Cheat Sheet
            </Button>
          </Link>
          <Link href="/app/flashcards">
            <Button variant="outline" className="w-full justify-center">
              <AcademicCapIcon className="h-5 w-5 mr-2" />
              Create Flashcards
            </Button>
          </Link>
          <Link href="/app/study-plan">
            <Button variant="outline" className="w-full justify-center">
              <CalendarIcon className="h-5 w-5 mr-2" />
              Start Study Plan
            </Button>
          </Link>
        </div>

        {/* Module Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Cheat Sheets Card */}
          <Card className="bg-module-cheatSheets border-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-text-primary">Cheat Sheets</h2>
              <DocumentTextIcon className="h-6 w-6 text-primary-blue" />
            </div>
            <p className="text-text-secondary text-sm mb-4">
              Auto-generated summaries from your study materials.
            </p>
            {recentCheatSheets.length > 0 ? (
              <div className="space-y-2 mb-4">
                {recentCheatSheets.map((sheet) => (
                  <div key={sheet.id} className="bg-white/50 rounded-md p-2">
                    <p className="text-sm font-medium text-text-primary truncate">{sheet.title}</p>
                    <p className="text-xs text-text-secondary">{formatDate(sheet.createdAt.toDate())}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-text-secondary text-sm mb-4">No cheat sheets yet.</p>
            )}
            <Link href="/app/cheat-sheets">
              <Button variant="secondary" size="sm" className="w-full">
                View all
              </Button>
            </Link>
          </Card>

          {/* Flashcards Card */}
          <Card className="bg-module-flashcards border-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-text-primary">Flashcards</h2>
              <AcademicCapIcon className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-text-secondary text-sm mb-4">
              Interactive flashcards for memorization. Coming soon!
            </p>
            <Link href="/app/flashcards">
              <Button variant="secondary" size="sm" className="w-full">
                Preview feature
              </Button>
            </Link>
          </Card>

          {/* Quizzes Card */}
          <Card className="bg-module-quizzes border-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-text-primary">Quizzes</h2>
              <QuestionMarkCircleIcon className="h-6 w-6 text-orange-600" />
            </div>
            <p className="text-text-secondary text-sm mb-4">
              Generate practice quizzes to test your knowledge. Coming soon!
            </p>
            <Link href="/app/quizzes">
              <Button variant="secondary" size="sm" className="w-full">
                Preview feature
              </Button>
            </Link>
          </Card>

          {/* Study Plan Card */}
          <Card className="bg-module-studyPlan border-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-text-primary">Study Plan</h2>
              <CalendarIcon className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-text-secondary text-sm mb-4">
              Personalized study schedules. Coming soon!
            </p>
            <div className="bg-white/50 rounded-md p-2 mb-4">
              <p className="text-sm font-medium text-text-primary">Final Exam</p>
              <p className="text-xs text-text-secondary">Due in 2 weeks</p>
            </div>
            <Link href="/app/study-plan">
              <Button variant="secondary" size="sm" className="w-full">
                View plan
              </Button>
            </Link>
          </Card>

          {/* Classes Card */}
          <Card className="bg-module-classes border-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-text-primary">Classes</h2>
              <BookOpenIcon className="h-6 w-6 text-rose-600" />
            </div>
            {classes.length > 0 ? (
              <div className="space-y-2 mb-4">
                {classes.map((classItem) => (
                  <div key={classItem.id} className="bg-white/50 rounded-md p-2">
                    <p className="text-sm font-medium text-text-primary">{classItem.name}</p>
                    <div className="mt-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-rose-600 h-2 rounded-full"
                        style={{ width: `${classItem.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-text-secondary text-sm mb-4">No classes yet.</p>
            )}
            <Link href="/app/classes">
              <Button variant="secondary" size="sm" className="w-full">
                View all
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </>
  )
}

