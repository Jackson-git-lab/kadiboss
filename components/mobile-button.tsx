"use client"

import { ButtonHTMLAttributes, ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface MobileButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  loading?: boolean
  fullWidth?: boolean
  icon?: ReactNode
  iconPosition?: "left" | "right"
  gradient?: boolean
  pulse?: boolean
  className?: string
}

export function MobileButton({
  children,
  variant = "default",
  size = "default",
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = "left",
  gradient = false,
  pulse = false,
  className,
  disabled,
  ...props
}: MobileButtonProps) {
  const sizeClasses = {
    default: "h-11 px-6 py-3 text-sm font-medium",
    sm: "h-9 px-4 py-2 text-sm font-medium",
    lg: "h-12 px-8 py-3 text-base font-semibold",
    icon: "h-11 w-11"
  }

  const gradientClasses = gradient ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl" : ""

  return (
    <Button
      variant={variant}
      size={size}
      disabled={disabled || loading}
      className={cn(
        "relative transition-all duration-200 transform active:scale-95",
        "focus:ring-2 focus:ring-ring focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
        fullWidth && "w-full",
        gradientClasses,
        pulse && "animate-pulse",
        sizeClasses[size],
        "mobile-button",
        className
      )}
      {...props}
    >
      {loading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      
      {!loading && icon && iconPosition === "left" && (
        <span className="mr-2">{icon}</span>
      )}
      
      <span className={cn(
        loading && "opacity-0",
        !loading && "opacity-100 transition-opacity duration-200"
      )}>
        {children}
      </span>
      
      {!loading && icon && iconPosition === "right" && (
        <span className="ml-2">{icon}</span>
      )}
    </Button>
  )
}

interface MobileIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  label: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost"
  size?: "sm" | "default" | "lg"
  loading?: boolean
  pulse?: boolean
  className?: string
}

export function MobileIconButton({
  icon,
  label,
  variant = "outline",
  size = "default",
  loading = false,
  pulse = false,
  className,
  disabled,
  ...props
}: MobileIconButtonProps) {
  const sizeClasses = {
    sm: "h-9 w-9",
    default: "h-11 w-11",
    lg: "h-12 w-12"
  }

  return (
    <Button
      variant={variant}
      size="icon"
      disabled={disabled || loading}
      aria-label={label}
      className={cn(
        "relative transition-all duration-200 transform active:scale-95",
        "focus:ring-2 focus:ring-ring focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
        pulse && "animate-pulse",
        sizeClasses[size],
        "mobile-icon-button",
        className
      )}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        icon
      )}
    </Button>
  )
}

interface MobileFloatingActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  label: string
  position?: "bottom-right" | "bottom-left" | "bottom-center"
  size?: "default" | "large"
  gradient?: boolean
  pulse?: boolean
  className?: string
}

export function MobileFloatingActionButton({
  icon,
  label,
  position = "bottom-right",
  size = "default",
  gradient = true,
  pulse = false,
  className,
  ...props
}: MobileFloatingActionButtonProps) {
  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "bottom-center": "bottom-6 left-1/2 transform -translate-x-1/2"
  }

  const sizeClasses = {
    default: "h-14 w-14",
    large: "h-16 w-16"
  }

  const iconSize = size === "large" ? "h-6 w-6" : "h-5 w-5"

  return (
    <Button
      variant="default"
      size="icon"
      aria-label={label}
      className={cn(
        "fixed z-50 rounded-full shadow-lg hover:shadow-xl",
        "transition-all duration-300 transform hover:scale-110 active:scale-95",
        "focus:ring-4 focus:ring-ring focus:ring-offset-2",
        gradient && "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
        pulse && "animate-pulse",
        sizeClasses[size],
        positionClasses[position],
        "mobile-fab",
        className
      )}
      {...props}
    >
      <span className={iconSize}>
        {icon}
      </span>
    </Button>
  )
}

interface MobileButtonGroupProps {
  children: ReactNode
  orientation?: "horizontal" | "vertical"
  spacing?: "tight" | "normal" | "loose"
  className?: string
}

export function MobileButtonGroup({
  children,
  orientation = "horizontal",
  spacing = "normal",
  className
}: MobileButtonGroupProps) {
  const spacingClasses = {
    tight: "gap-1",
    normal: "gap-2",
    loose: "gap-4"
  }

  return (
    <div className={cn(
      "flex",
      orientation === "horizontal" ? "flex-row" : "flex-col",
      spacingClasses[spacing],
      "mobile-button-group",
      className
    )}>
      {children}
    </div>
  )
}

