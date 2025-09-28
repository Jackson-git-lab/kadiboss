"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Home, 
  Package, 
  Users, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  Menu, 
  X,
  Bell,
  User,
  HelpCircle,
  Zap
} from "lucide-react"

interface MobileNavigationProps {
  className?: string
}

export function MobileNavigation({ className }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navigationItems = [
    {
      name: "Accueil",
      href: "/",
      icon: Home,
      badge: null
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: BarChart3,
      badge: null
    },
    {
      name: "Stock",
      href: "/stock",
      icon: Package,
      badge: "3" // Low stock alerts
    },
    {
      name: "Ventes",
      href: "/sales",
      icon: ShoppingCart,
      badge: null
    },
    {
      name: "Clients",
      href: "/customers",
      icon: Users,
      badge: "67" // New customers
    },
    {
      name: "Rapports",
      href: "/reports",
      icon: BarChart3,
      badge: null
    },
    {
      name: "Paramètres",
      href: "/settings",
      icon: Settings,
      badge: null
    }
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile Header */}
      <div className={`lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border safe-area-top ${className}`}>
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
              aria-label="Ouvrir le menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg">KadiBoss</span>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="relative p-2">
              <Bell className="h-5 w-5" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                3
              </Badge>
            </Button>
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="p-2">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed top-0 left-0 bottom-0 z-50 w-80 max-w-[85vw] bg-background border-r border-border transform transition-transform duration-300 ease-in-out safe-area-top ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg">KadiBoss</h2>
                <p className="text-xs text-muted-foreground">Gestion d'Entreprise</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="p-2"
              aria-label="Fermer le menu"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => {
              const IconComponent = item.icon
              const active = isActive(item.href)
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-accent/50 focus:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <div className={`p-2 rounded-lg transition-colors ${
                    active 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <span className={`font-medium ${
                      active ? 'text-primary' : 'text-foreground'
                    }`}>
                      {item.name}
                    </span>
                  </div>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border space-y-3">
            <Link href="/help" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full justify-start gap-3">
                <HelpCircle className="h-5 w-5" />
                Centre d'Aide
              </Button>
            </Link>
            <div className="text-xs text-muted-foreground text-center">
              Version 1.0.0 • KadiBoss PWA
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar (Alternative) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border safe-area-bottom">
        <div className="grid grid-cols-5 gap-1 p-2">
          {navigationItems.slice(0, 5).map((item) => {
            const IconComponent = item.icon
            const active = isActive(item.href)
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 ${
                  active 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
              >
                <div className="relative">
                  <IconComponent className="h-5 w-5" />
                  {item.badge && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="lg:hidden h-16" />
      
      {/* Spacer for bottom navigation */}
      <div className="lg:hidden h-20" />
    </>
  )
}

