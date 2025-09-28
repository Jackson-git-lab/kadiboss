"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface AnimatedCardProps extends Omit<React.ComponentProps<typeof Card>, 'children'> {
  children: React.ReactNode
  animationType?: "lift" | "glow" | "tilt" | "scale"
  interactive?: boolean
}

export function AnimatedCard({
  children,
  className,
  animationType = "lift",
  interactive = true,
  ...props
}: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getAnimationClasses = () => {
    const baseClasses = "card-animate transition-all duration-300"
    
    if (!interactive) return baseClasses
    
    switch (animationType) {
      case "lift":
        return `${baseClasses} hover:-translate-y-2 hover:shadow-xl`
      case "glow":
        return `${baseClasses} hover:shadow-2xl hover:shadow-primary/20`
      case "tilt":
        return `${baseClasses} hover:rotate-1 hover:scale-105`
      case "scale":
        return `${baseClasses} hover:scale-105`
      default:
        return baseClasses
    }
  }

  return (
    <Card
      className={cn(
        getAnimationClasses(),
        isHovered && "transform-gpu",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </Card>
  )
}

export function AnimatedCardContent({
  children,
  className,
  ...props
}: React.ComponentProps<typeof CardContent>) {
  return (
    <CardContent 
      className={cn("fade-in-animate", className)} 
      {...props}
    >
      {children}
    </CardContent>
  )
}

export function AnimatedCardHeader({
  children,
  className,
  ...props
}: React.ComponentProps<typeof CardHeader>) {
  return (
    <CardHeader 
      className={cn("slide-in-animate", className)} 
      {...props}
    >
      {children}
    </CardHeader>
  )
}

export function AnimatedCardTitle({
  children,
  className,
  ...props
}: React.ComponentProps<typeof CardTitle>) {
  return (
    <CardTitle 
      className={cn("scale-in-animate", className)} 
      {...props}
    >
      {children}
    </CardTitle>
  )
}
