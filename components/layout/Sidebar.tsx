'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  HomeIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  QuestionMarkCircleIcon,
  CalendarIcon,
  BookOpenIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '/app', icon: HomeIcon },
  { name: 'Cheat Sheets', href: '/app/cheat-sheets', icon: DocumentTextIcon },
  { name: 'Flashcards', href: '/app/flashcards', icon: AcademicCapIcon },
  { name: 'Quizzes', href: '/app/quizzes', icon: QuestionMarkCircleIcon },
  { name: 'Study Plan', href: '/app/study-plan', icon: CalendarIcon },
  { name: 'Classes', href: '/app/classes', icon: BookOpenIcon },
  { name: 'Settings', href: '/app/settings', icon: Cog6ToothIcon },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-background-sidebar border-r border-gray-200">
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center h-16 px-6 border-b border-gray-200">
          <Link href="/app" className="flex items-center">
            <span className="text-xl font-semibold text-primary-blue">StudyPilot</span>
          </Link>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/app' && pathname?.startsWith(item.href))
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive
                    ? 'bg-primary-light text-primary-blue'
                    : 'text-text-secondary hover:bg-gray-100 hover:text-text-primary'
                )}
              >
                <item.icon
                  className={cn(
                    'mr-3 h-5 w-5 flex-shrink-0',
                    isActive ? 'text-primary-blue' : 'text-gray-400 group-hover:text-gray-500'
                  )}
                />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

