"use client"

import type React from "react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ShoppingCart, Users, Package, BarChart3, Plus, Settings, LogOut, User, Bell, Zap } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface PWALayoutProps {
  children: React.ReactNode
}

export function PWALayout({ children }: PWALayoutProps) {
  const [activeTab, setActiveTab] = useState("dashboard")
  const pathname = usePathname()

  // Update active tab based on current pathname
  useEffect(() => {
    const currentTab = pathname.split('/')[1] || 'dashboard'
    setActiveTab(currentTab)
  }, [pathname])

  const navigationItems = [
    { id: "sales", label: "Ventes", icon: ShoppingCart, href: "/sales", badge: null },
    { id: "customers", label: "Clients", icon: Users, href: "/customers", badge: "67" },
    { id: "stock", label: "Stock", icon: Package, href: "/stock", badge: "3" },
    { id: "dashboard", label: "Tableau", icon: BarChart3, href: "/dashboard", badge: null },
  ]

  const handleFabClick = () => {
    switch (activeTab) {
      case "stock":
        // Trigger the add product modal in inventory list
        const stockEvent = new CustomEvent('openAddProduct')
        window.dispatchEvent(stockEvent)
        break
      case "customers":
        const customerTrigger = document.getElementById("customer-fab-trigger")
        customerTrigger?.click()
        break
      case "sales":
        // For sales, we could open a quick add product dialog
        console.log("Quick add product for sales")
        break
      case "dashboard":
        // For dashboard, we could open a quick stats dialog
        console.log("Quick stats for dashboard")
        break
      default:
        break
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Top Header - Mobile First */}
      <header className="flex items-center justify-between px-4 py-3 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-b border-border shadow-sm z-40 safe-area-top">
        {/* App Name and Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">KadiBoss</h1>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="relative p-2">
            <Bell className="h-5 w-5" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs"
            >
              3
            </Badge>
          </Button>
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative h-9 w-9 rounded-full hover:bg-accent/50 transition-colors"
                aria-label="Menu utilisateur"
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/avatars/user-01.png" alt="Utilisateur" />
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-sm">
                    KB
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Déconnexion</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content Area - Scrollable */}
      <main className="flex-1 overflow-y-auto pb-24 bg-background mobile-scroll">
        <div className="h-full p-4 sm:p-6">
          {children}
        </div>
      </main>

      {/* Floating Action Button - Center Position */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50">
        <Button
          size="lg"
          className="h-14 w-14 rounded-full shadow-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-2 border-background transition-all duration-300 hover:scale-110 active:scale-95"
          onClick={handleFabClick}
          aria-label="Action rapide"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      {/* Bottom Navigation - Fixed */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-t border-border z-40 safe-area-bottom">
        <div className="flex items-center justify-around py-2 px-1 sm:px-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex flex-col items-center justify-center py-2 px-1 sm:px-3 min-w-0 flex-1 transition-all duration-200 mobile-nav-item ${
                  isActive 
                    ? "text-primary scale-105" 
                    : "text-muted-foreground hover:text-foreground hover:scale-105"
                }`}
                aria-label={`Aller à ${item.label}`}
              >
                <div className="relative">
                  <Icon className={`h-4 w-4 sm:h-5 sm:w-5 mb-1 transition-transform duration-200 mobile-nav-icon ${
                    isActive ? "scale-110" : ""
                  }`} />
                  {item.badge && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-3 w-3 sm:h-4 sm:w-4 flex items-center justify-center p-0 text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <span className="text-xs font-medium leading-none text-center nav-text-truncate mobile-nav-text">
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
