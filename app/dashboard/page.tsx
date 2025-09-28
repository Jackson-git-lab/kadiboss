"use client"

import { PWALayout } from "@/components/pwa-layout"
import { ActivityDashboard } from "@/components/activity-dashboard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RefreshCw, BarChart3, TrendingUp, Users, Package, Zap, Star, DollarSign, ShoppingCart, Activity, Target } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <PWALayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Pilote d'Activité</h2>
            <p className="text-sm text-muted-foreground">Tableaux de bord intuitifs pour piloter votre entreprise</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Activity className="h-3 w-3" />
              Temps Réel
            </Badge>
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
              <RefreshCw className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Actualiser</span>
            </Button>
          </div>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-auto">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 text-xs sm:text-sm">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Pilote d'Activité</span>
              <span className="sm:hidden">Pilote</span>
            </TabsTrigger>
            <TabsTrigger value="overview" className="flex items-center gap-2 text-xs sm:text-sm">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Vue d'Ensemble</span>
              <span className="sm:hidden">Vue</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="mt-6">
            <ActivityDashboard />
          </TabsContent>
          
          <TabsContent value="overview" className="mt-6">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
          </TabsContent>
        </Tabs>
      </div>
    </PWALayout>
  )
}