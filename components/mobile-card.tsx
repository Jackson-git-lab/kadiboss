"use client"

import { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MobileCardProps {
  children: ReactNode
  title?: string
  description?: string
  badge?: string
  badgeVariant?: "default" | "secondary" | "destructive" | "outline"
  icon?: ReactNode
  action?: {
    label: string
    onClick: () => void
    variant?: "default" | "outline" | "ghost"
  }
  className?: string
  onClick?: () => void
  gradient?: boolean
  interactive?: boolean
}

export function MobileCard({
  children,
  title,
  description,
  badge,
  badgeVariant = "secondary",
  icon,
  action,
  className,
  onClick,
  gradient = false,
  interactive = true
}: MobileCardProps) {
  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        gradient && "bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800",
        interactive && "hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98] active:translate-y-0",
        onClick && "cursor-pointer",
        "mobile-card",
        className
      )}
      onClick={onClick}
    >
      {(title || description || badge || icon || action) && (
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              {icon && (
                <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg">
                  {icon}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {title && (
                    <CardTitle className="text-lg font-semibold leading-tight">
                      {title}
                    </CardTitle>
                  )}
                  {badge && (
                    <Badge variant={badgeVariant} className="text-xs">
                      {badge}
                    </Badge>
                  )}
                </div>
                {description && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                )}
              </div>
            </div>
            {action && (
              <Button
                variant={action.variant || "outline"}
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  action.onClick()
                }}
                className="flex-shrink-0"
              >
                {action.label}
              </Button>
            )}
          </div>
        </CardHeader>
      )}
      
      <CardContent className={cn(
        title || description || badge || icon || action ? "pt-0" : "pt-6"
      )}>
        {children}
      </CardContent>
    </Card>
  )
}

interface MobileStatsCardProps {
  title: string
  value: string | number
  change?: {
    value: string
    trend: "up" | "down" | "neutral"
  }
  icon: ReactNode
  color?: "blue" | "green" | "orange" | "purple" | "red" | "yellow"
  className?: string
}

export function MobileStatsCard({
  title,
  value,
  change,
  icon,
  color = "blue",
  className
}: MobileStatsCardProps) {
  const colorClasses = {
    blue: "from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400",
    green: "from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200 dark:border-green-800 text-green-600 dark:text-green-400",
    orange: "from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400",
    purple: "from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400",
    red: "from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400",
    yellow: "from-yellow-50 to-yellow-100 dark:from-yellow-950/20 dark:to-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-600 dark:text-yellow-400"
  }

  const trendColors = {
    up: "text-green-600 dark:text-green-400",
    down: "text-red-600 dark:text-red-400",
    neutral: "text-muted-foreground"
  }

  return (
    <Card className={cn(
      "bg-gradient-to-br border transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1",
      colorClasses[color],
      className
    )}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium opacity-90 mb-1">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {change && (
              <p className={cn("text-xs mt-1", trendColors[change.trend])}>
                {change.trend === "up" && "↗ "}
                {change.trend === "down" && "↘ "}
                {change.value}
              </p>
            )}
          </div>
          <div className="flex-shrink-0 p-2 bg-white/20 dark:bg-black/20 rounded-lg">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface MobileActionCardProps {
  title: string
  description: string
  icon: ReactNode
  action: {
    label: string
    onClick: () => void
  }
  color?: "primary" | "secondary" | "accent"
  className?: string
}

export function MobileActionCard({
  title,
  description,
  icon,
  action,
  color = "primary",
  className
}: MobileActionCardProps) {
  const colorClasses = {
    primary: "bg-gradient-to-br from-primary/10 to-primary/20 border-primary/20 hover:from-primary/20 hover:to-primary/30",
    secondary: "bg-gradient-to-br from-secondary/10 to-secondary/20 border-secondary/20 hover:from-secondary/20 hover:to-secondary/30",
    accent: "bg-gradient-to-br from-accent/10 to-accent/20 border-accent/20 hover:from-accent/20 hover:to-accent/30"
  }

  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 cursor-pointer",
      colorClasses[color],
      className
    )}
    onClick={action.onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 p-3 bg-primary/10 rounded-xl">
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{description}</p>
            <Button size="sm" className="w-full">
              {action.label}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

