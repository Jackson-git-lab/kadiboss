"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ShoppingCart, Users, Package, BarChart3, Plus, Settings, LogOut, User } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface PWALayoutProps {
  children: React.ReactNode
}

export function PWALayout({ children }: PWALayoutProps) {
  const [activeTab, setActiveTab] = useState("dashboard")

  const navigationItems = [
    { id: "sales", label: "Ventes", icon: ShoppingCart, href: "/sales" },
    { id: "customers", label: "Clients", icon: Users, href: "/customers" },
    { id: "stock", label: "Stock", icon: Package, href: "/stock" },
    { id: "dashboard", label: "Tableau", icon: BarChart3, href: "/dashboard" },
  ]

  const handleFabClick = () => {
    switch (activeTab) {
      case "stock":
        const stockTrigger = document.getElementById("inventory-fab-trigger")
        stockTrigger?.click()
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
      <header className="flex items-center justify-between px-4 py-3 bg-card border-b border-border shadow-sm z-40">
        {/* App Name and Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-primary-foreground font-bold text-sm">KB</span>
          </div>
          <h1 className="text-xl font-semibold text-foreground">KadiBoss</h1>
        </div>

        {/* User Avatar with Menu */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative h-10 w-10 rounded-full hover:bg-accent/50 transition-colors"
                aria-label="Menu utilisateur"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/avatars/user-01.png" alt="Utilisateur" />
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                    KB
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profil</span>
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
      <main className="flex-1 overflow-y-auto pb-24 bg-background">
        <div className="h-full">
          {children}
        </div>
      </main>

      {/* Floating Action Button - Center Position */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50">
        <Button
          size="lg"
          className="h-14 w-14 rounded-full shadow-xl bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-background"
          onClick={handleFabClick}
          aria-label="Action rapide"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      {/* Bottom Navigation - Fixed */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40 safe-area-pb">
        <div className="flex items-center justify-around py-2 px-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1 transition-all duration-200 ${
                  isActive 
                    ? "text-primary scale-105" 
                    : "text-muted-foreground hover:text-foreground hover:scale-105"
                }`}
                aria-label={`Aller à ${item.label}`}
              >
                <Icon className={`h-6 w-6 mb-1 transition-transform duration-200 ${
                  isActive ? "scale-110" : ""
                }`} />
                <span className="text-xs font-medium leading-none text-center">
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
