import { PWALayout } from "@/components/pwa-layout"
import { CustomerList } from "@/components/customer-list"
import { AdvancedCustomerLoyalty } from "@/components/advanced-customer-loyalty"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Star, BarChart3, MessageCircle, RefreshCw } from "lucide-react"

export default function CustomersPage() {
  return (
    <PWALayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Gestion Client & Fidélisation</h2>
            <p className="text-sm text-muted-foreground">Base de données clients complète avec programme de fidélité</p>
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

        {/* Tabs for different views */}
        <Tabs defaultValue="loyalty" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="loyalty" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Fidélisation
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Clients
            </TabsTrigger>
            <TabsTrigger value="communications" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Communications
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="loyalty" className="mt-6">
            <AdvancedCustomerLoyalty />
          </TabsContent>
          
          <TabsContent value="customers" className="mt-6">
            <CustomerList />
          </TabsContent>
          
          <TabsContent value="communications" className="mt-6">
            <div className="text-center py-12">
              <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Centre de Communications</h3>
              <p className="text-muted-foreground">
                Gérez toutes vos communications avec les clients (SMS, Email, WhatsApp)
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6">
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Analytics Clients</h3>
              <p className="text-muted-foreground">
                Analyses détaillées du comportement client et de la fidélisation
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PWALayout>
  )
}
