"use client"

import { PWALayout } from "@/components/pwa-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar, 
  FileText, 
  DollarSign, 
  Users, 
  Package,
  ShoppingCart,
  PieChart,
  LineChart,
  RefreshCw,
  Filter,
  Eye,
  Printer
} from "lucide-react"

export default function ReportsPage() {
  return (
    <PWALayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Rapports & Analyses</h2>
            <p className="text-sm text-muted-foreground">
              Rapports détaillés et analyses de performance
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
              <Calendar className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Période</span>
            </Button>
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
              <Download className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
              <RefreshCw className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Actualiser</span>
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenus Totaux</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,250,000 F</div>
              <p className="text-xs text-muted-foreground">+12.5% ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Ventes</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,245</div>
              <p className="text-xs text-muted-foreground">+8.2% ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clients Actifs</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">+67 nouveaux</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produits Vendus</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,456</div>
              <p className="text-xs text-muted-foreground">+15.3% ce mois</p>
            </CardContent>
          </Card>
        </div>

        {/* Reports Tabs */}
        <Tabs defaultValue="financial" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
            <TabsTrigger value="financial" className="text-xs sm:text-sm">Financier</TabsTrigger>
            <TabsTrigger value="sales" className="text-xs sm:text-sm">Ventes</TabsTrigger>
            <TabsTrigger value="customers" className="text-xs sm:text-sm">Clients</TabsTrigger>
            <TabsTrigger value="inventory" className="text-xs sm:text-sm">Inventaire</TabsTrigger>
          </TabsList>

          <TabsContent value="financial" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Évolution des Revenus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Janvier</span>
                      <span className="font-semibold">950,000 F</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Février</span>
                      <span className="font-semibold">1,100,000 F</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mars</span>
                      <span className="font-semibold">1,180,000 F</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avril</span>
                      <span className="font-semibold text-green-600">1,250,000 F</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Répartition des Paiements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Espèces</span>
                      <span className="font-semibold">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Carte Bancaire</span>
                      <span className="font-semibold">30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Wave</span>
                      <span className="font-semibold">20%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Crédit</span>
                      <span className="font-semibold">5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Rapports Financiers Disponibles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <h4 className="font-semibold text-sm sm:text-base">Rapport de Ventes</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                      Analyse détaillée des ventes par période
                    </p>
                    <Button size="sm" className="w-full text-xs sm:text-sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Voir le rapport
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <BarChart3 className="h-5 w-5 text-green-500" />
                      <h4 className="font-semibold">Analyse des Profits</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Marge bénéficiaire et analyse des coûts
                    </p>
                    <Button size="sm" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      Voir le rapport
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="h-5 w-5 text-purple-500" />
                      <h4 className="font-semibold">Tendances</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Évolution et prévisions des revenus
                    </p>
                    <Button size="sm" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      Voir le rapport
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales" className="space-y-4">
            <div className="text-center py-12">
              <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Rapports de Ventes</h3>
              <p className="text-muted-foreground">
                Analyses détaillées des performances de vente
              </p>
            </div>
          </TabsContent>

          <TabsContent value="customers" className="space-y-4">
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Rapports Clients</h3>
              <p className="text-muted-foreground">
                Analyses comportementales et de fidélisation
              </p>
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            <div className="text-center py-12">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Rapports Inventaire</h3>
              <p className="text-muted-foreground">
                Analyses de rotation et optimisation des stocks
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PWALayout>
  )
}
