'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getCurrentUser } from '@/lib/firebase/auth'
import { getUserData, updateUserData, UserData } from '@/lib/firebase/db'
import Navbar from '@/components/layout/Navbar'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export default function SettingsPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [displayName, setDisplayName] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const loadUserData = async () => {
      const user = getCurrentUser()
      if (!user) {
        router.push('/auth/sign-in')
        return
      }

      try {
        const data = await getUserData(user.uid)
        if (data) {
          setUserData(data)
          setDisplayName(data.displayName || '')
        }
      } catch (error) {
        console.error('Error loading user data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadUserData()

    // Check for Stripe redirect
    const success = searchParams?.get('success')
    const canceled = searchParams?.get('canceled')
    if (success) {
      // Reload user data to get updated plan
      loadUserData()
    }
  }, [router, searchParams])

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault()
    const user = getCurrentUser()
    if (!user || !userData) return

    setSaving(true)
    try {
      await updateUserData(user.uid, { displayName: displayName || null })
      setUserData({ ...userData, displayName: displayName || null })
      alert('Name updated successfully!')
    } catch (error) {
      console.error('Error updating name:', error)
      alert('Failed to update name')
    } finally {
      setSaving(false)
    }
  }

  const handleUpgrade = async () => {
    const user = getCurrentUser()
    if (!user || !userData) return

    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.uid,
          email: userData.email,
          customerId: userData.stripeCustomerId || null,
        }),
      })

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL returned')
      }
    } catch (error) {
      console.error('Error creating checkout:', error)
      alert('Failed to start checkout. Please try again.')
    }
  }

  if (loading) {
    return (
      <>
        <Navbar title="Settings" />
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

  if (!userData) {
    return null
  }

  const usageLimit = userData.plan === 'pro' ? 1000 : 3
  const usagePercent = Math.min((userData.cheatSheetsCountThisMonth / usageLimit) * 100, 100)

  return (
    <>
      <Navbar title="Settings" />
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        {/* Profile Section */}
        <Card>
          <h2 className="text-xl font-semibold text-text-primary mb-4">Profile</h2>
          <form onSubmit={handleUpdateName} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Email
              </label>
              <input
                type="email"
                value={userData.email}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-input bg-gray-50 text-text-secondary"
              />
              <p className="text-xs text-text-secondary mt-1">Email cannot be changed</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-input focus:outline-none focus:ring-2 focus:ring-primary-blue"
                placeholder="Enter your name"
              />
            </div>
            <Button type="submit" isLoading={saving}>
              Save Changes
            </Button>
          </form>
        </Card>

        {/* Plan & Billing Section */}
        <Card>
          <h2 className="text-xl font-semibold text-text-primary mb-4">Plan & Billing</h2>
          
          <div className="space-y-6">
            {/* Current Plan */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-text-primary">Current Plan</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  userData.plan === 'pro'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {userData.plan === 'pro' ? 'Pro' : 'Free'}
                </span>
              </div>
              <p className="text-text-secondary text-sm">
                {userData.plan === 'pro'
                  ? 'You have unlimited cheat sheets per month'
                  : 'You have 3 cheat sheets per month'}
              </p>
            </div>

            {/* Usage */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-text-secondary">Monthly Usage</span>
                <span className="font-medium text-text-primary">
                  {userData.cheatSheetsCountThisMonth} / {usageLimit}
                </span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    usagePercent >= 80 ? 'bg-red-500' : 'bg-primary-blue'
                  }`}
                  style={{ width: `${usagePercent}%` }}
                />
              </div>
            </div>

            {/* Upgrade Button */}
            {userData.plan !== 'pro' && (
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-medium text-text-primary mb-2">Upgrade to Pro</h3>
                <p className="text-text-secondary text-sm mb-4">
                  Get unlimited cheat sheets, priority processing, and more for just $7.99/month.
                </p>
                <Button onClick={handleUpgrade}>Upgrade to Pro</Button>
              </div>
            )}

            {/* Manage Billing (for Pro users) */}
            {userData.plan === 'pro' && userData.stripeCustomerId && (
              <div className="pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={async () => {
                    try {
                      const response = await fetch('/api/stripe/create-portal', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          customerId: userData.stripeCustomerId,
                        }),
                      })
                      const data = await response.json()
                      if (data.url) {
                        window.location.href = data.url
                      }
                    } catch (error) {
                      alert('Failed to open billing portal')
                    }
                  }}
                >
                  Manage Billing
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </>
  )
}

