'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getCurrentUser } from '@/lib/firebase/auth'
import { getUserCheatSheets } from '@/lib/firebase/db'
import { CheatSheet } from '@/lib/firebase/db'
import Navbar from '@/components/layout/Navbar'
import Card from '@/components/ui/Card'
import { formatDate } from '@/lib/utils'
import { DocumentTextIcon } from '@heroicons/react/24/outline'

export default function CheatSheetsPage() {
  const [cheatSheets, setCheatSheets] = useState<CheatSheet[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const loadCheatSheets = async () => {
      const user = getCurrentUser()
      if (!user) return

      try {
        const sheets = await getUserCheatSheets(user.uid)
        setCheatSheets(sheets)
      } catch (error) {
        console.error('Error loading cheat sheets:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCheatSheets()
  }, [])

  const filteredSheets = cheatSheets.filter((sheet) =>
    sheet.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <>
        <Navbar title="Cheat Sheets" />
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
      <Navbar title="Cheat Sheets" />
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-text-primary mb-2">Your Cheat Sheets</h1>
            <p className="text-text-secondary">All your auto-generated study summaries</p>
          </div>
          <Link
            href="/app/upload"
            className="px-4 py-2 bg-primary-blue text-white rounded-button hover:bg-blue-700 transition-colors"
          >
            + New Cheat Sheet
          </Link>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search cheat sheets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-input focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue"
          />
        </div>

        {filteredSheets.length === 0 ? (
          <Card className="text-center py-12">
            <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              {searchQuery ? 'No cheat sheets found' : 'No cheat sheets yet'}
            </h3>
            <p className="text-text-secondary mb-6">
              {searchQuery
                ? 'Try a different search term'
                : 'Upload your first file to generate a cheat sheet'}
            </p>
            {!searchQuery && (
              <Link
                href="/app/upload"
                className="inline-block px-6 py-2 bg-primary-blue text-white rounded-button hover:bg-blue-700 transition-colors"
              >
                Upload Notes
              </Link>
            )}
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSheets.map((sheet) => (
              <Link key={sheet.id} href={`/app/cheat-sheets/${sheet.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <DocumentTextIcon className="h-8 w-8 text-primary-blue flex-shrink-0" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2">
                    {sheet.title}
                  </h3>
                  <p className="text-sm text-text-secondary mb-4">
                    Source: {sheet.sourceFileName}
                  </p>
                  <div className="flex items-center justify-between text-xs text-text-secondary">
                    <span>{formatDate(sheet.createdAt.toDate())}</span>
                    <span className="text-primary-blue">View →</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

