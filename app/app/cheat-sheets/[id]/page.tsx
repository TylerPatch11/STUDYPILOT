'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { getCheatSheet, updateCheatSheet } from '@/lib/firebase/db'
import { CheatSheet } from '@/lib/firebase/db'
import Navbar from '@/components/layout/Navbar'
import Button from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'
// Inline icon components
const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
)
const DocumentArrowDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)
const ClipboardIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
)

export default function CheatSheetViewerPage() {
  const params = useParams()
  const router = useRouter()
  const [cheatSheet, setCheatSheet] = useState<CheatSheet | null>(null)
  const [loading, setLoading] = useState(true)
  const [copySuccess, setCopySuccess] = useState(false)
  const id = params.id as string

  useEffect(() => {
    const loadCheatSheet = async () => {
      try {
        const sheet = await getCheatSheet(id)
        if (!sheet) {
          router.push('/app/cheat-sheets')
          return
        }
        setCheatSheet(sheet)
      } catch (error) {
        console.error('Error loading cheat sheet:', error)
        router.push('/app/cheat-sheets')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      loadCheatSheet()
    }
  }, [id, router])

  const handleCopyToClipboard = async () => {
    if (!cheatSheet) return

    try {
      await navigator.clipboard.writeText(cheatSheet.content)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const handleExportPDF = () => {
    window.print()
  }

  if (loading) {
    return (
      <>
        <Navbar title="Cheat Sheet" />
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

  if (!cheatSheet) {
    return null
  }

  return (
    <>
      <Navbar title="Cheat Sheet" />
      <div className="p-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 text-text-secondary" />
            </button>
            <div>
              <h1 className="text-2xl font-semibold text-text-primary">{cheatSheet.title}</h1>
              <p className="text-sm text-text-secondary mt-1">
                Created {formatDate(cheatSheet.createdAt.toDate())}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleCopyToClipboard}>
              <ClipboardIcon className="h-4 w-4 mr-2" />
              {copySuccess ? 'Copied!' : 'Copy'}
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportPDF}>
              <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Content */}
        <Card className="p-8 md:p-12 print:p-6">
          <div className="prose prose-slate max-w-none">
            <ReactMarkdown>{cheatSheet.content}</ReactMarkdown>
          </div>
        </Card>

        {/* Source Info */}
        <div className="mt-4 text-sm text-text-secondary">
          <p>Source file: {cheatSheet.sourceFileName}</p>
        </div>
      </div>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print\\:p-6,
          .print\\:p-6 * {
            visibility: visible;
          }
          .print\\:p-6 {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </>
  )
}

