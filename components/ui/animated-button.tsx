"use client"

import React, { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps extends Omit<React.ComponentProps<typeof Button>, 'children'> {
  animationType?: "ripple" | "shimmer" | "bounce" | "pulse" | "scale" | "shake"
  loading?: boolean
  success?: boolean
  error?: boolean
  children: React.ReactNode
}

export function AnimatedButton({
  animationType = "ripple",
  loading = false,
  success = false,
  error = false,
  className,
  children,
  onClick,
  disabled,
  variant,
  size,
  ...props
}: AnimatedButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return

    // Trigger animation
    setIsAnimating(true)
    
    // Reset animation after it completes
    setTimeout(() => setIsAnimating(false), 600)

    // Call original onClick
    if (onClick) {
      onClick(e)
    }
  }

  const getAnimationClasses = () => {
    const baseClasses = "btn-animate"
    
    if (loading) return `${baseClasses} loading-animate`
    if (success) return `${baseClasses} success-animate`
    if (error) return `${baseClasses} error-animate`
    if (isAnimating) {
      switch (animationType) {
        case "ripple":
          return `${baseClasses} ripple-effect`
        case "shimmer":
          return `${baseClasses} loading-animate`
        case "bounce":
          return `${baseClasses} bounce-animate`
        case "pulse":
          return `${baseClasses} pulse-animate`
        case "scale":
          return `${baseClasses} scale-in-animate`
        case "shake":
          return `${baseClasses} shake-animate`
        default:
          return baseClasses
      }
    }
    
    return baseClasses
  }

  return (
    <Button
      ref={buttonRef}
      className={cn(
        getAnimationClasses(),
        className
      )}
      onClick={handleClick}
      disabled={disabled || loading}
      variant={variant}
      size={size}
      {...props}
    >
      {loading && (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </Button>
  )
}
