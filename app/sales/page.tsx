import { PWALayout } from "@/components/pwa-layout"
import { SalesPage } from "@/components/sales-page"
import { AdvancedSalesManager } from "@/components/advanced-sales-manager"
import { MobilePOS } from "@/components/mobile-pos"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, BarChart3, Calculator, TrendingUp, Zap, RefreshCw } from "lucide-react"

export default function Sales() {
  return (
    <PWALayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Gestion des Ventes</h2>
            <p className="text-sm text-muted-foreground">Système avancé pour booster les ventes et analyser les transactions</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Zap className="h-3 w-3" />
              Temps Réel
            </Badge>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualiser
            </Button>
          </div>
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="manager" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="manager" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Gestionnaire
            </TabsTrigger>
            <TabsTrigger value="pos" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Point de Vente
            </TabsTrigger>
            <TabsTrigger value="sales" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Ventes
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="manager" className="mt-6">
            <AdvancedSalesManager />
          </TabsContent>
          
          <TabsContent value="pos" className="mt-6">
            <MobilePOS />
          </TabsContent>
          
          <TabsContent value="sales" className="mt-6">
            <SalesPage />
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6">
            <div className="text-center py-12">
              <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Analytics des Ventes</h3>
              <p className="text-muted-foreground">
                Analyses détaillées des performances de vente et opportunités de croissance
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PWALayout>
  )
}