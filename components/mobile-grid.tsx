"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface MobileGridProps {
  children: ReactNode
  cols?: 1 | 2 | 3 | 4
  gap?: "sm" | "md" | "lg"
  className?: string
}

export function MobileGrid({ 
  children, 
  cols = 2, 
  gap = "md", 
  className 
}: MobileGridProps) {
  const colsClasses = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4"
  }

  const gapClasses = {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6"
  }

  return (
    <div className={cn(
      "grid",
      colsClasses[cols],
      gapClasses[gap],
      "mobile-grid",
      className
    )}>
      {children}
    </div>
  )
}

interface MobileGridItemProps {
  children: ReactNode
  span?: 1 | 2 | 3 | 4
  className?: string
}

export function MobileGridItem({ 
  children, 
  span = 1, 
  className 
}: MobileGridItemProps) {
  const spanClasses = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4"
  }

  return (
    <div className={cn(
      spanClasses[span],
      "mobile-grid-item",
      className
    )}>
      {children}
    </div>
  )
}

interface MobileResponsiveGridProps {
  children: ReactNode
  cols?: {
    default: 1 | 2 | 3 | 4
    sm?: 1 | 2 | 3 | 4
    md?: 1 | 2 | 3 | 4
    lg?: 1 | 2 | 3 | 4
    xl?: 1 | 2 | 3 | 4
  }
  gap?: "sm" | "md" | "lg"
  className?: string
}

export function MobileResponsiveGrid({ 
  children, 
  cols = { default: 2, sm: 3, md: 4 },
  gap = "md", 
  className 
}: MobileResponsiveGridProps) {
  const colsClasses = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4"
  }

  const gapClasses = {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6"
  }

  const responsiveCols = [
    colsClasses[cols.default],
    cols.sm && `sm:${colsClasses[cols.sm]}`,
    cols.md && `md:${colsClasses[cols.md]}`,
    cols.lg && `lg:${colsClasses[cols.lg]}`,
    cols.xl && `xl:${colsClasses[cols.xl]}`
  ].filter(Boolean).join(" ")

  return (
    <div className={cn(
      "grid",
      responsiveCols,
      gapClasses[gap],
      "mobile-responsive-grid",
      className
    )}>
      {children}
    </div>
  )
}

interface MobileCardGridProps {
  children: ReactNode
  cols?: 1 | 2 | 3 | 4
  gap?: "sm" | "md" | "lg"
  className?: string
}

export function MobileCardGrid({ 
  children, 
  cols = 2, 
  gap = "md", 
  className 
}: MobileCardGridProps) {
  return (
    <MobileGrid cols={cols} gap={gap} className={className}>
      {children}
    </MobileGrid>
  )
}

interface MobileStatsGridProps {
  children: ReactNode
  className?: string
}

export function MobileStatsGrid({ 
  children, 
  className 
}: MobileStatsGridProps) {
  return (
    <MobileResponsiveGrid 
      cols={{ default: 2, sm: 2, md: 4 }} 
      gap="md" 
      className={className}
    >
      {children}
    </MobileResponsiveGrid>
  )
}

interface MobileFeatureGridProps {
  children: ReactNode
  className?: string
}

export function MobileFeatureGrid({ 
  children, 
  className 
}: MobileFeatureGridProps) {
  return (
    <MobileResponsiveGrid 
      cols={{ default: 1, sm: 2, md: 3 }} 
      gap="lg" 
      className={className}
    >
      {children}
    </MobileResponsiveGrid>
  )
}

interface MobileActionGridProps {
  children: ReactNode
  className?: string
}

export function MobileActionGrid({ 
  children, 
  className 
}: MobileActionGridProps) {
  return (
    <MobileResponsiveGrid 
      cols={{ default: 2, sm: 3, md: 4 }} 
      gap="md" 
      className={className}
    >
      {children}
    </MobileResponsiveGrid>
  )
}

interface MobileListGridProps {
  children: ReactNode
  className?: string
}

export function MobileListGrid({ 
  children, 
  className 
}: MobileListGridProps) {
  return (
    <MobileResponsiveGrid 
      cols={{ default: 1, sm: 1, md: 2 }} 
      gap="lg" 
      className={className}
    >
      {children}
    </MobileResponsiveGrid>
  )
}

