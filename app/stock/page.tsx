import { PWALayout } from "@/components/pwa-layout"
import { InventoryList } from "@/components/inventory-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, Settings, Zap, RefreshCw, AlertTriangle } from "lucide-react"

export default function StockPage() {
  return (
    <PWALayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Stock</h2>
            <p className="text-sm text-muted-foreground">Gérez votre inventaire et suivez les niveaux</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              3 Articles Faibles
            </Badge>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualiser
            </Button>
          </div>
        </div>

        {/* Inventory Content */}
        <InventoryList />
      </div>
    </PWALayout>
  )
}
