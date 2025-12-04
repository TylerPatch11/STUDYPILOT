'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg'
  onClick?: () => void
}

export default function Card({ children, className, padding = 'md', onClick }: CardProps) {
  const paddings = {
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
  }
  
  return (
    <div
      className={cn(
        'rounded-card bg-white shadow-sm border border-gray-200',
        paddings[padding],
        onClick && 'cursor-pointer hover:shadow-md transition-shadow',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

