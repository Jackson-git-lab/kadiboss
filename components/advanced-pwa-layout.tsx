"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { 
  ShoppingCart, 
  Users, 
  Package, 
  BarChart3, 
  Plus, 
  Settings, 
  LogOut, 
  User, 
  Bell,
  Zap,
  Star,
  Shield,
  MessageCircle,
  Receipt,
  BookOpen
} from "lucide-react"

const navigationItems = [
  { name: "Ventes", href: "/sales", icon: ShoppingCart },
  { name: "Clients", href: "/customers", icon: Users },
  { name: "Stock", href: "/stock", icon: Package },
  { name: "Tableau", href: "/dashboard", icon: BarChart3 },
]

const advancedFeatures = [
  { name: "Ventes Temps Réel", href: "/realtime-sales-demo", icon: Zap, badge: "Nouveau" },
  { name: "Stock Temps Réel", href: "/realtime-inventory-demo", icon: Package, badge: "Nouveau" },
  { name: "Générateur de Reçus", href: "/receipt-demo", icon: Receipt, badge: "Pro" },
  { name: "Paramètres Avancés", href: "/advanced-settings-demo", icon: Settings, badge: "Pro" },
  { name: "Tutoriel", href: "/onboarding-demo", icon: BookOpen, badge: "Aide" },
]

export function AdvancedPWALayout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState("dashboard")
  const pathname = usePathname()

  const getFABAction = () => {
    switch (pathname) {
      case "/sales":
        return { action: "add-sale", label: "Nouvelle Vente" }
      case "/customers":
        return { action: "add-customer", label: "Nouveau Client" }
      case "/stock":
        return { action: "add-product", label: "Nouveau Produit" }
      default:
        return { action: "quick-action", label: "Action Rapide" }
    }
  }

  const fabAction = getFABAction()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Header */}
      <header 
        className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border"
        role="banner"
      >
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg"
              role="img"
              aria-label="Logo KadiBoss"
            >
              <span className="text-primary-foreground font-bold text-lg">KB</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">KadiBoss</h1>
              <p className="text-xs text-muted-foreground">PWA Professionnelle</p>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-2">

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/avatars/01.png" alt="User" />
                    <AvatarFallback>KB</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">KadiBoss User</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      user@kadiboss.app
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main 
        className="flex-1 overflow-y-auto pb-24"
        role="main"
        aria-label="Contenu principal"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav 
        className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-t border-border safe-area-pb"
        role="navigation"
        aria-label="Navigation principale"
      >
        <div className="flex items-center justify-around px-2 py-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link 
                key={item.name} 
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                aria-label={`Aller à ${item.name}`}
              >
                <Button
                  variant="ghost"
                  className={`flex flex-col items-center gap-1 h-16 w-16 ${
                    isActive 
                      ? "text-primary bg-primary/10 scale-105" 
                      : "text-muted-foreground hover:text-foreground"
                  } transition-all duration-200`}
                  aria-pressed={isActive}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                  <span className="text-xs font-medium">{item.name}</span>
                </Button>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Floating Action Button */}
      <Button
        size="lg"
        className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 h-14 w-14 rounded-full shadow-xl bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-background animate-pulse"
        onClick={() => {
          // Handle FAB action based on current page
          console.log(`FAB Action: ${fabAction.action}`)
        }}
        aria-label={fabAction.label}
        title={fabAction.label}
      >
        <Plus className="h-6 w-6" aria-hidden="true" />
      </Button>

      {/* Advanced Features Panel */}
      <aside 
        className="fixed top-20 right-4 z-40 hidden lg:block"
        aria-label="Fonctionnalités avancées"
      >
        <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-lg w-64">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Star className="h-4 w-4 text-primary" aria-hidden="true" />
            Fonctionnalités Avancées
          </h3>
          <nav className="space-y-2" aria-label="Fonctionnalités avancées">
            {advancedFeatures.map((feature) => {
              const Icon = feature.icon
              return (
                <Link 
                  key={feature.name} 
                  href={feature.href}
                  aria-label={`Accéder à ${feature.name} - ${feature.badge}`}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-auto p-3"
                  >
                    <Icon className="h-4 w-4 mr-3" aria-hidden="true" />
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium">{feature.name}</div>
                      <Badge variant="secondary" className="text-xs">
                        {feature.badge}
                      </Badge>
                    </div>
                  </Button>
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile Advanced Features */}
      <aside 
        className="fixed bottom-24 left-4 right-4 z-40 lg:hidden"
        aria-label="Fonctionnalités avancées mobiles"
      >
        <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-foreground">Fonctionnalités</h3>
            <Badge variant="secondary" className="text-xs">Pro</Badge>
          </div>
          <nav className="grid grid-cols-2 gap-2" aria-label="Fonctionnalités rapides">
            {advancedFeatures.slice(0, 4).map((feature) => {
              const Icon = feature.icon
              return (
                <Link 
                  key={feature.name} 
                  href={feature.href}
                  aria-label={`Accéder à ${feature.name}`}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start h-auto p-2"
                  >
                    <Icon className="h-3 w-3 mr-2" aria-hidden="true" />
                    <span className="text-xs">{feature.name}</span>
                  </Button>
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>
    </div>
  )
}
