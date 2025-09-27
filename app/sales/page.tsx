import { PWALayout } from "@/components/pwa-layout"
import { SalesPage } from "@/components/sales-page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, RefreshCw } from "lucide-react"

export default function Sales() {
  return (
    <PWALayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Ventes</h2>
            <p className="text-sm text-muted-foreground">Gérez vos ventes et transactions</p>
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

        {/* Sales Content */}
        <SalesPage />
      </div>
    </PWALayout>
  )
}