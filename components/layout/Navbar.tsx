'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User } from 'firebase/auth'
import { getCurrentUser, signOut } from '@/lib/firebase/auth'
import { getUserData } from '@/lib/firebase/db'
import { UserData } from '@/lib/firebase/db'
import {
  MagnifyingGlassIcon,
  BellIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline'

interface NavbarProps {
  title: string
}

export default function Navbar({ title }: NavbarProps) {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    if (currentUser) {
      getUserData(currentUser.uid).then(setUserData)
    }
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    router.push('/auth/sign-in')
  }

  const userInitials = userData?.displayName
    ? userData.displayName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : user?.email?.slice(0, 2).toUpperCase() || 'U'

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:pl-72 md:pr-6">
      <h1 className="text-xl font-semibold text-text-primary">{title}</h1>
      
      <div className="flex items-center gap-4">
        {/* Search - placeholder */}
        <div className="hidden md:flex items-center px-3 py-1.5 bg-gray-100 rounded-md text-sm text-text-secondary">
          <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
          <span className="text-gray-400">Search...</span>
        </div>
        
        {/* Notifications - placeholder */}
        <button className="p-2 text-gray-400 hover:text-text-primary transition-colors">
          <BellIcon className="h-5 w-5" />
        </button>
        
        {/* User menu */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <div className="h-8 w-8 rounded-full bg-primary-blue text-white text-sm font-medium flex items-center justify-center">
              {userInitials}
            </div>
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
              <div className="px-4 py-2 border-b border-gray-200">
                <p className="text-sm font-medium text-text-primary">{userData?.displayName || 'User'}</p>
                <p className="text-xs text-text-secondary">{user?.email}</p>
              </div>
              <Link
                href="/app/settings"
                className="flex items-center px-4 py-2 text-sm text-text-secondary hover:bg-gray-50"
                onClick={() => setShowDropdown(false)}
              >
                <UserCircleIcon className="h-4 w-4 mr-2" />
                Settings
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center px-4 py-2 text-sm text-text-secondary hover:bg-gray-50"
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

