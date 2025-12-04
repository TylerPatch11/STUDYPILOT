'use client'

import { useEffect, useState } from 'react'
import { getCurrentUser } from '@/lib/firebase/auth'
import { getUserClasses, createClass, Class } from '@/lib/firebase/db'
import { Timestamp } from 'firebase/firestore'
import Navbar from '@/components/layout/Navbar'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { BookOpenIcon } from '@heroicons/react/24/outline'

const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [className, setClassName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    loadClasses()
  }, [])

  const loadClasses = async () => {
    const user = getCurrentUser()
    if (!user) return

    try {
      const userClasses = await getUserClasses(user.uid)
      setClasses(userClasses)
    } catch (error) {
      console.error('Error loading classes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddClass = async (e: React.FormEvent) => {
    e.preventDefault()
    const user = getCurrentUser()
    if (!user || !className.trim()) return

    try {
      await createClass({
        userId: user.uid,
        name: className,
        description: description || '',
        progress: 0,
        createdAt: Timestamp.now(),
      })
      setClassName('')
      setDescription('')
      setShowAddForm(false)
      loadClasses()
    } catch (error) {
      console.error('Error creating class:', error)
    }
  }

  if (loading) {
    return (
      <>
        <Navbar title="Classes" />
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
      <Navbar title="Classes" />
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-text-primary mb-2">Your Classes</h1>
            <p className="text-text-secondary">Organize your courses and track progress</p>
          </div>
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Class
          </Button>
        </div>

        {showAddForm && (
          <Card className="mb-6 p-6">
            <form onSubmit={handleAddClass} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Class Name
                </label>
                <input
                  type="text"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-input focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  placeholder="e.g., Introduction to Computer Science"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Description (optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-input focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  placeholder="Add a brief description..."
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Create Class</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {classes.length === 0 ? (
          <Card className="text-center py-12 bg-module-classes border-0">
            <BookOpenIcon className="h-12 w-12 text-rose-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">No classes yet</h3>
            <p className="text-text-secondary mb-6">Add your first class to get started</p>
            <Button onClick={() => setShowAddForm(true)}>
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Class
            </Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((classItem) => (
              <Card key={classItem.id} className="bg-module-classes border-0">
                <div className="flex items-center justify-between mb-4">
                  <BookOpenIcon className="h-8 w-8 text-rose-600" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {classItem.name}
                </h3>
                {classItem.description && (
                  <p className="text-sm text-text-secondary mb-4">{classItem.description}</p>
                )}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text-secondary">Progress</span>
                    <span className="font-medium text-text-primary">{classItem.progress}%</span>
                  </div>
                  <div className="bg-white/50 rounded-full h-2">
                    <div
                      className="bg-rose-600 h-2 rounded-full transition-all"
                      style={{ width: `${classItem.progress}%` }}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

