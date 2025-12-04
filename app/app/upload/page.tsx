'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useDropzone } from 'react-dropzone'
import { getCurrentUser } from '@/lib/firebase/auth'
import { uploadFile } from '@/lib/firebase/storage'
import { createCheatSheet } from '@/lib/firebase/db'
import { Timestamp } from 'firebase/firestore'
import Navbar from '@/components/layout/Navbar'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0])
      setError('')
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    maxFiles: 1,
  })

  const handleUpload = async () => {
    if (!file) return

    const user = getCurrentUser()
    if (!user) {
      router.push('/auth/sign-in')
      return
    }

    setUploading(true)
    setError('')

    try {
      // Step 1: Upload file to Firebase Storage
      const { path: filePath } = await uploadFile(file, user.uid, 'uploads')

      // Step 2: Send file to API route for text extraction and cheat sheet generation
      const formData = new FormData()
      formData.append('file', file)
      formData.append('filePath', filePath)
      formData.append('userId', user.uid)
      formData.append('fileName', file.name)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Upload failed')
      }

      const data = await response.json()

      // Step 3: Save cheat sheet to Firestore
      const cheatSheetId = await createCheatSheet({
        userId: user.uid,
        title: file.name.replace(/\.[^/.]+$/, '') || 'Untitled Cheat Sheet',
        sourceFileName: file.name,
        sourceFilePath: filePath,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        content: data.content,
        inputSummary: data.inputSummary || '',
      })

      router.push(`/app/cheat-sheets/${cheatSheetId}`)
    } catch (err: any) {
      setError(err.message || 'Failed to upload and process file')
      setUploading(false)
    }
  }

  return (
    <>
      <Navbar title="Upload Notes" />
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-text-primary mb-2">
            Upload your notes, syllabus, or slides
          </h1>
          <p className="text-text-secondary">
            Supported formats: PDF, DOCX, PPTX, and images
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <Card className="p-8">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-md p-12 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-primary-blue bg-primary-light'
                : 'border-gray-300 hover:border-primary-blue hover:bg-gray-50'
            }`}
          >
            <input {...getInputProps()} />
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {isDragActive ? (
              <p className="text-primary-blue font-medium">Drop the file here...</p>
            ) : (
              <>
                <p className="text-text-primary font-medium mb-2">
                  Drag and drop your file here, or click to select
                </p>
                <p className="text-text-secondary text-sm">
                  PDF, DOCX, PPTX, and images supported
                </p>
              </>
            )}
          </div>

          {file && (
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg
                    className="h-8 w-8 text-gray-400 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <div>
                    <p className="font-medium text-text-primary">{file.name}</p>
                    <p className="text-sm text-text-secondary">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => setFile(null)}
                  variant="ghost"
                  size="sm"
                >
                  Remove
                </Button>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <Button
              onClick={handleUpload}
              disabled={!file || uploading}
              isLoading={uploading}
            >
              {uploading ? 'Processing...' : 'Generate Cheat Sheet'}
            </Button>
          </div>
        </Card>
      </div>
    </>
  )
}
