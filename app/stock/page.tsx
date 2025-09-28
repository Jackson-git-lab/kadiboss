"use client"

import { PWALayout } from "@/components/pwa-layout"
import { AdvancedInventoryList } from "@/components/advanced-inventory-list"
import { RealtimeStockDashboard } from "@/components/realtime-stock-dashboard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Package, Activity, BarChart3, RefreshCw, AlertTriangle } from "lucide-react"

export default function StockPage() {
  return (
    <PWALayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mobile-header">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mobile-text">Gestion des Stocks</h2>
            <p className="text-sm text-muted-foreground mobile-text">Inventaire avancé avec suivi temps réel</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="destructive" className="flex items-center gap-1 text-xs">
              <AlertTriangle className="h-3 w-3" />
              <span className="hidden sm:inline">3 Articles Faibles</span>
              <span className="sm:hidden">3 Faibles</span>
            </Badge>
            <AnimatedButton 
              variant="outline" 
              size="sm" 
              className="flex-1 sm:flex-none"
              onClick={() => window.location.reload()}
              title="Actualiser la page"
              animationType="pulse"
            >
              <RefreshCw className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Actualiser</span>
              <span className="sm:hidden">Refresh</span>
            </AnimatedButton>
          </div>
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="inventory" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-auto mobile-tabs">
            <TabsTrigger value="inventory" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Package className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Inventaire</span>
              <span className="sm:hidden">Stock</span>
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Activity className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Temps Réel</span>
              <span className="sm:hidden">Live</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Analytics</span>
              <span className="sm:hidden">Stats</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="inventory" className="mt-6">
            <AdvancedInventoryList />
          </TabsContent>
          
          <TabsContent value="dashboard" className="mt-6">
            <RealtimeStockDashboard />
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6">
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Analytics des Stocks</h3>
              <p className="text-muted-foreground">
                Fonctionnalité d'analyse avancée en cours de développement
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PWALayout>
  )
}
