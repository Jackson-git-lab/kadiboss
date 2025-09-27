import { PWALayout } from "@/components/pwa-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw, BarChart3, TrendingUp, Users, Package, Zap, Star, DollarSign, ShoppingCart } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <PWALayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Tableau de Bord</h2>
            <p className="text-sm text-muted-foreground">Vue d'ensemble de votre activité en temps réel</p>
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

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenu Aujourd'hui</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89,500 F</div>
              <p className="text-xs text-muted-foreground">+12.5% par rapport à hier</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ventes</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">+8 nouvelles ventes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">+3 nouveaux clients</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stock</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">3 produits en rupture</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Actions Rapides
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Link href="/sales" aria-label="Nouvelle Vente">
                <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center gap-2">
                  <ShoppingCart className="h-6 w-6" />
                  <span>Nouvelle Vente</span>
                </Button>
              </Link>
              <Link href="/customers" aria-label="Gérer Clients">
                <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center gap-2">
                  <Users className="h-6 w-6" />
                  <span>Gérer Clients</span>
                </Button>
              </Link>
              <Link href="/stock" aria-label="Gérer Stock">
                <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center gap-2">
                  <Package className="h-6 w-6" />
                  <span>Gérer Stock</span>
                </Button>
              </Link>
              <Link href="/settings" aria-label="Paramètres">
                <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center gap-2">
                  <BarChart3 className="h-6 w-6" />
                  <span>Rapports</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PWALayout>
  )
}