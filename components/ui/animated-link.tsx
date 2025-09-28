"use client"

import React, { useState } from "react"
import Link, { LinkProps } from "next/link"
import { cn } from "@/lib/utils"

interface AnimatedLinkProps extends LinkProps {
  children: React.ReactNode
  className?: string
  animationType?: "underline" | "slide" | "fade" | "scale"
  active?: boolean
}

export function AnimatedLink({
  children,
  className,
  animationType = "underline",
  active = false,
  ...props
}: AnimatedLinkProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getAnimationClasses = () => {
    const baseClasses = "link-animate transition-all duration-300"
    
    switch (animationType) {
      case "underline":
        return `${baseClasses} relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full`
      case "slide":
        return `${baseClasses} hover:translate-x-1`
      case "fade":
        return `${baseClasses} hover:opacity-80`
      case "scale":
        return `${baseClasses} hover:scale-105`
      default:
        return baseClasses
    }
  }

  return (
    <Link
      className={cn(
        getAnimationClasses(),
        active && "text-primary font-medium",
        isHovered && "transform-gpu",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </Link>
  )
}

