"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ResponsiveContainerProps {
  children: ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export function ResponsiveContainer({ 
  children, 
  className, 
  as: Component = "div" 
}: ResponsiveContainerProps) {
  return (
    <Component 
      className={cn(
        "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        "min-h-screen flex flex-col",
        className
      )}
    >
      {children}
    </Component>
  )
}

interface ResponsiveGridProps {
  children: ReactNode
  className?: string
  cols?: {
    default?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
}

export function ResponsiveGrid({ 
  children, 
  className,
  cols = { default: 1, sm: 2, md: 3, lg: 4 }
}: ResponsiveGridProps) {
  const gridCols = [
    cols.default && `grid-cols-${cols.default}`,
    cols.sm && `sm:grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`,
  ].filter(Boolean).join(" ")

  return (
    <div className={cn("grid gap-4", gridCols, className)}>
      {children}
    </div>
  )
}

interface ResponsiveCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  clickable?: boolean
}

export function ResponsiveCard({ 
  children, 
  className,
  hover = true,
  clickable = false
}: ResponsiveCardProps) {
  return (
    <div 
      className={cn(
        "bg-card border border-border rounded-lg p-4 sm:p-6",
        "transition-all duration-200",
        hover && "hover:shadow-md hover:scale-[1.02]",
        clickable && "cursor-pointer hover:bg-accent/50",
        className
      )}
    >
      {children}
    </div>
  )
}

interface ResponsiveButtonProps {
  children: ReactNode
  className?: string
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  fullWidth?: boolean
  disabled?: boolean
  onClick?: () => void
  ariaLabel?: string
}

export function ResponsiveButton({ 
  children, 
  className,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  onClick,
  ariaLabel
}: ResponsiveButtonProps) {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground focus:ring-primary",
    ghost: "hover:bg-accent hover:text-accent-foreground focus:ring-primary"
  }
  
  const sizeClasses = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 py-2",
    lg: "h-11 px-8 text-lg"
  }
  
  const widthClasses = fullWidth ? "w-full" : ""

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        widthClasses,
        className
      )}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}

interface ResponsiveTextProps {
  children: ReactNode
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl"
  weight?: "normal" | "medium" | "semibold" | "bold"
  color?: "primary" | "secondary" | "muted" | "destructive" | "success"
}

export function ResponsiveText({ 
  children, 
  className,
  as: Component = "p",
  size = "base",
  weight = "normal",
  color = "primary"
}: ResponsiveTextProps) {
  const sizeClasses = {
    xs: "text-xs sm:text-sm",
    sm: "text-sm sm:text-base",
    base: "text-base sm:text-lg",
    lg: "text-lg sm:text-xl",
    xl: "text-xl sm:text-2xl",
    "2xl": "text-2xl sm:text-3xl",
    "3xl": "text-3xl sm:text-4xl",
    "4xl": "text-4xl sm:text-5xl"
  }
  
  const weightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold"
  }
  
  const colorClasses = {
    primary: "text-foreground",
    secondary: "text-secondary-foreground",
    muted: "text-muted-foreground",
    destructive: "text-destructive",
    success: "text-green-600 dark:text-green-400"
  }

  return (
    <Component 
      className={cn(
        sizeClasses[size],
        weightClasses[weight],
        colorClasses[color],
        className
      )}
    >
      {children}
    </Component>
  )
}

