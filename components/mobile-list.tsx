"use client"

import { ReactNode } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { ChevronRight, MoreHorizontal } from "lucide-react"

interface MobileListItemProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export function MobileListItem({ 
  children, 
  onClick, 
  disabled = false, 
  className 
}: MobileListItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 p-4 rounded-xl transition-all duration-200",
        "hover:bg-accent/50 focus:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        onClick && !disabled && "cursor-pointer active:scale-[0.98]",
        disabled && "opacity-50 cursor-not-allowed",
        "mobile-list-item",
        className
      )}
      onClick={disabled ? undefined : onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
    >
      {children}
    </div>
  )
}

interface MobileListProps {
  children: ReactNode
  className?: string
  spacing?: "tight" | "normal" | "loose"
}

export function MobileList({ 
  children, 
  className, 
  spacing = "normal" 
}: MobileListProps) {
  const spacingClasses = {
    tight: "space-y-1",
    normal: "space-y-2",
    loose: "space-y-4"
  }

  return (
    <div className={cn(
      spacingClasses[spacing],
      "mobile-list",
      className
    )}>
      {children}
    </div>
  )
}

interface MobileListItemWithAvatarProps {
  avatar?: string
  fallback?: string
  title: string
  subtitle?: string
  badge?: string
  badgeVariant?: "default" | "secondary" | "destructive" | "outline"
  rightContent?: ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export function MobileListItemWithAvatar({
  avatar,
  fallback,
  title,
  subtitle,
  badge,
  badgeVariant = "secondary",
  rightContent,
  onClick,
  disabled = false,
  className
}: MobileListItemWithAvatarProps) {
  return (
    <MobileListItem onClick={onClick} disabled={disabled} className={className}>
      <Avatar className="h-12 w-12 flex-shrink-0">
        <AvatarImage src={avatar} />
        <AvatarFallback>{fallback || title.charAt(0)}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-base truncate">{title}</h3>
          {badge && (
            <Badge variant={badgeVariant} className="text-xs">
              {badge}
            </Badge>
          )}
        </div>
        {subtitle && (
          <p className="text-sm text-muted-foreground truncate">{subtitle}</p>
        )}
      </div>
      
      {rightContent || (
        <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
      )}
    </MobileListItem>
  )
}

interface MobileListItemWithIconProps {
  icon: ReactNode
  title: string
  subtitle?: string
  badge?: string
  badgeVariant?: "default" | "secondary" | "destructive" | "outline"
  rightContent?: ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export function MobileListItemWithIcon({
  icon,
  title,
  subtitle,
  badge,
  badgeVariant = "secondary",
  rightContent,
  onClick,
  disabled = false,
  className
}: MobileListItemWithIconProps) {
  return (
    <MobileListItem onClick={onClick} disabled={disabled} className={className}>
      <div className="h-12 w-12 flex-shrink-0 p-3 bg-primary/10 rounded-xl">
        {icon}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-base truncate">{title}</h3>
          {badge && (
            <Badge variant={badgeVariant} className="text-xs">
              {badge}
            </Badge>
          )}
        </div>
        {subtitle && (
          <p className="text-sm text-muted-foreground truncate">{subtitle}</p>
        )}
      </div>
      
      {rightContent || (
        <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
      )}
    </MobileListItem>
  )
}

interface MobileListItemWithActionsProps {
  children: ReactNode
  actions?: ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export function MobileListItemWithActions({
  children,
  actions,
  onClick,
  disabled = false,
  className
}: MobileListItemWithActionsProps) {
  return (
    <MobileListItem onClick={onClick} disabled={disabled} className={className}>
      <div className="flex-1 min-w-0">
        {children}
      </div>
      
      {actions && (
        <div className="flex items-center gap-2 flex-shrink-0">
          {actions}
        </div>
      )}
    </MobileListItem>
  )
}

interface MobileListHeaderProps {
  title: string
  subtitle?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function MobileListHeader({
  title,
  subtitle,
  action,
  className
}: MobileListHeaderProps) {
  return (
    <div className={cn(
      "flex items-center justify-between p-4 border-b border-border bg-muted/30",
      "mobile-list-header",
      className
    )}>
      <div>
        <h2 className="font-semibold text-lg">{title}</h2>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {action && (
        <Button variant="outline" size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  )
}

interface MobileListSectionProps {
  children: ReactNode
  title?: string
  className?: string
}

export function MobileListSection({ 
  children, 
  title, 
  className 
}: MobileListSectionProps) {
  return (
    <div className={cn("mobile-list-section", className)}>
      {title && (
        <div className="px-4 py-2">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {title}
          </h3>
        </div>
      )}
      {children}
    </div>
  )
}

