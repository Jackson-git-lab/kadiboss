import { PWALayout } from "@/components/pwa-layout"
import { CustomerList } from "@/components/customer-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Settings, RefreshCw, MessageCircle } from "lucide-react"

export default function CustomersPage() {
  return (
    <PWALayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Clients</h2>
            <p className="text-sm text-muted-foreground">Gérez vos clients et suivez les dettes</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <MessageCircle className="h-3 w-3" />
              WhatsApp
            </Badge>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualiser
            </Button>
          </div>
        </div>

        {/* Customer List */}
        <CustomerList />
      </div>
    </PWALayout>
  )
}
