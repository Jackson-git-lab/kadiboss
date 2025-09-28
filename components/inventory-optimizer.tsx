"use client"

import { useState, useMemo } from "react"
import { 
  Target, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Package, 
  BarChart3,
  Calculator,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Download,
  Filter,
  Search
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

interface Product {
  id: string
  name: string
  category: string
  currentStock: number
  minThreshold: number
  maxThreshold: number
  averageDailySales: number
  leadTime: number // days
  cost: number
  sellingPrice: number
  turnoverRate: number // times per year
  abcCategory: 'A' | 'B' | 'C' // ABC analysis
  lastOrderDate?: Date
  nextOrderDate?: Date
  suggestedOrderQuantity: number
  stockoutRisk: 'low' | 'medium' | 'high' | 'critical'
  overstockRisk: 'low' | 'medium' | 'high' | 'critical'
  profitMargin: number
}

interface OptimizationRecommendation {
  type: 'reorder' | 'reduce' | 'increase' | 'discontinue' | 'promote'
  priority: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  impact: string
  action: string
  savings?: number
  products: Product[]
}

// Mock data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Coca-Cola Classic 33cl",
    category: "Boissons",
    currentStock: 45,
    minThreshold: 20,
    maxThreshold: 60,
    averageDailySales: 8.5,
    leadTime: 2,
    cost: 350,
    sellingPrice: 500,
    turnoverRate: 12.5,
    abcCategory: 'A',
    suggestedOrderQuantity: 25,
    stockoutRisk: 'low',
    overstockRisk: 'low',
    profitMargin: 30
  },
  {
    id: "2",
    name: "Pain de Mie",
    category: "Boulangerie",
    currentStock: 8,
    minThreshold: 15,
    maxThreshold: 45,
    averageDailySales: 12.3,
    leadTime: 1,
    cost: 450,
    sellingPrice: 750,
    turnoverRate: 15.2,
    abcCategory: 'A',
    suggestedOrderQuantity: 35,
    stockoutRisk: 'critical',
    overstockRisk: 'low',
    profitMargin: 40
  },
  {
    id: "3",
    name: "Lait Frais 1L",
    category: "Produits laitiers",
    currentStock: 25,
    minThreshold: 10,
    maxThreshold: 30,
    averageDailySales: 5.2,
    leadTime: 3,
    cost: 840,
    sellingPrice: 1200,
    turnoverRate: 8.1,
    abcCategory: 'B',
    suggestedOrderQuantity: 15,
    stockoutRisk: 'low',
    overstockRisk: 'low',
    profitMargin: 30
  },
  {
    id: "4",
    name: "Riz Parfumé 5kg",
    category: "Céréales",
    currentStock: 3,
    minThreshold: 5,
    maxThreshold: 15,
    averageDailySales: 1.8,
    leadTime: 7,
    cost: 3150,
    sellingPrice: 4500,
    turnoverRate: 3.2,
    abcCategory: 'B',
    suggestedOrderQuantity: 12,
    stockoutRisk: 'high',
    overstockRisk: 'low',
    profitMargin: 30
  },
  {
    id: "5",
    name: "Huile de Cuisine 1L",
    category: "Condiments",
    currentStock: 12,
    minThreshold: 8,
    maxThreshold: 24,
    averageDailySales: 2.1,
    leadTime: 5,
    cost: 1960,
    sellingPrice: 2800,
    turnoverRate: 4.5,
    abcCategory: 'C',
    suggestedOrderQuantity: 8,
    stockoutRisk: 'medium',
    overstockRisk: 'low',
    profitMargin: 30
  },
  {
    id: "6",
    name: "Savon de Marseille",
    category: "Hygiène",
    currentStock: 0,
    minThreshold: 10,
    maxThreshold: 30,
    averageDailySales: 0.8,
    leadTime: 10,
    cost: 455,
    sellingPrice: 650,
    turnoverRate: 1.2,
    abcCategory: 'C',
    suggestedOrderQuantity: 20,
    stockoutRisk: 'critical',
    overstockRisk: 'low',
    profitMargin: 30
  }
]

export function InventoryOptimizer() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedPriority, setSelectedPriority] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [products, selectedCategory, searchTerm])

  // Generate optimization recommendations
  const recommendations = useMemo((): OptimizationRecommendation[] => {
    const recs: OptimizationRecommendation[] = []

    // Reorder recommendations
    const reorderProducts = products.filter(p => p.stockoutRisk === 'critical' || p.stockoutRisk === 'high')
    if (reorderProducts.length > 0) {
      recs.push({
        type: 'reorder',
        priority: 'critical',
        title: 'Commandes Urgentes',
        description: `${reorderProducts.length} produits nécessitent une commande immédiate`,
        impact: 'Éviter les ruptures de stock',
        action: 'Passer commande maintenant',
        products: reorderProducts
      })
    }

    // Reduce stock recommendations
    const overstockProducts = products.filter(p => p.overstockRisk === 'high' || p.overstockRisk === 'critical')
    if (overstockProducts.length > 0) {
      recs.push({
        type: 'reduce',
        priority: 'high',
        title: 'Réduction de Stock',
        description: `${overstockProducts.length} produits en surstock`,
        impact: 'Libérer du capital et de l\'espace',
        action: 'Promouvoir ou réduire les commandes',
        products: overstockProducts
      })
    }

    // ABC Analysis recommendations
    const cCategoryProducts = products.filter(p => p.abcCategory === 'C' && p.turnoverRate < 2)
    if (cCategoryProducts.length > 0) {
      recs.push({
        type: 'discontinue',
        priority: 'medium',
        title: 'Produits à Réévaluer',
        description: `${cCategoryProducts.length} produits C avec faible rotation`,
        impact: 'Optimiser l\'espace et le capital',
        action: 'Analyser la pertinence de ces produits',
        products: cCategoryProducts
      })
    }

    return recs
  }, [products])

  // Calculate KPIs
  const kpis = useMemo(() => {
    const totalValue = products.reduce((sum, p) => sum + (p.currentStock * p.cost), 0)
    const totalSales = products.reduce((sum, p) => sum + (p.averageDailySales * p.sellingPrice), 0)
    const averageTurnover = products.reduce((sum, p) => sum + p.turnoverRate, 0) / products.length
    const stockoutRisk = products.filter(p => p.stockoutRisk === 'critical' || p.stockoutRisk === 'high').length
    const overstockRisk = products.filter(p => p.overstockRisk === 'high' || p.overstockRisk === 'critical').length

    return {
      totalValue,
      totalSales,
      averageTurnover,
      stockoutRisk,
      overstockRisk,
      optimizationScore: Math.max(0, 100 - (stockoutRisk * 15) - (overstockRisk * 10))
    }
  }, [products])

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' F'
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'destructive'
      case 'high': return 'destructive'
      case 'medium': return 'secondary'
      case 'low': return 'default'
      default: return 'outline'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive'
      case 'high': return 'destructive'
      case 'medium': return 'secondary'
      case 'low': return 'default'
      default: return 'outline'
    }
  }

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'reorder': return <ArrowUpRight className="h-4 w-4" />
      case 'reduce': return <ArrowDownRight className="h-4 w-4" />
      case 'increase': return <TrendingUp className="h-4 w-4" />
      case 'discontinue': return <AlertTriangle className="h-4 w-4" />
      case 'promote': return <Zap className="h-4 w-4" />
      default: return <Target className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Optimiseur d'Inventaire</h2>
          <p className="text-sm text-muted-foreground">Recommandations intelligentes pour optimiser votre stock</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Valeur Stock</p>
                <p className="text-xl font-bold text-blue-700 dark:text-blue-300">{formatAmount(kpis.totalValue)}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Ventes/Jour</p>
                <p className="text-xl font-bold text-green-700 dark:text-green-300">{formatAmount(kpis.totalSales)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 border-orange-200 dark:border-orange-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Rotation Moy.</p>
                <p className="text-xl font-bold text-orange-700 dark:text-orange-300">{kpis.averageTurnover.toFixed(1)}x</p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Score Opt.</p>
                <p className="text-xl font-bold text-purple-700 dark:text-purple-300">{kpis.optimizationScore}/100</p>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="recommendations" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recommendations">Recommandations</TabsTrigger>
          <TabsTrigger value="analysis">Analyse ABC</TabsTrigger>
          <TabsTrigger value="products">Produits</TabsTrigger>
        </TabsList>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-4">
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getRecommendationIcon(rec.type)}
                      <div>
                        <h3 className="font-semibold text-lg">{rec.title}</h3>
                        <p className="text-sm text-muted-foreground">{rec.description}</p>
                      </div>
                    </div>
                    <Badge variant={getPriorityColor(rec.priority) as any}>
                      {rec.priority}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Impact</p>
                      <p className="text-sm">{rec.impact}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Action</p>
                      <p className="text-sm">{rec.action}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Produits concernés ({rec.products.length})</p>
                    <div className="flex flex-wrap gap-2">
                      {rec.products.slice(0, 5).map(product => (
                        <Badge key={product.id} variant="outline">
                          {product.name}
                        </Badge>
                      ))}
                      {rec.products.length > 5 && (
                        <Badge variant="outline">
                          +{rec.products.length - 5} autres
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button size="sm">
                      Appliquer
                    </Button>
                    <Button variant="outline" size="sm">
                      Détails
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {recommendations.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Inventaire Optimisé</h3>
                  <p className="text-muted-foreground">
                    Aucune recommandation d'optimisation pour le moment
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* ABC Analysis Tab */}
        <TabsContent value="analysis" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['A', 'B', 'C'].map(category => {
              const categoryProducts = products.filter(p => p.abcCategory === category)
              const totalValue = categoryProducts.reduce((sum, p) => sum + (p.currentStock * p.cost), 0)
              
              return (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        category === 'A' ? 'bg-red-500' :
                        category === 'B' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}>
                        {category}
                      </div>
                      Catégorie {category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Produits</span>
                        <span className="font-semibold">{categoryProducts.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Valeur</span>
                        <span className="font-semibold">{formatAmount(totalValue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">% du total</span>
                        <span className="font-semibold">
                          {((totalValue / kpis.totalValue) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                <SelectItem value="Boissons">Boissons</SelectItem>
                <SelectItem value="Boulangerie">Boulangerie</SelectItem>
                <SelectItem value="Produits laitiers">Produits laitiers</SelectItem>
                <SelectItem value="Céréales">Céréales</SelectItem>
                <SelectItem value="Condiments">Condiments</SelectItem>
                <SelectItem value="Hygiène">Hygiène</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products List */}
          <div className="space-y-3">
            {filteredProducts.map(product => (
              <Card key={product.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getRiskColor(product.stockoutRisk) as any}>
                        {product.stockoutRisk}
                      </Badge>
                      <Badge variant="outline">
                        {product.abcCategory}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Stock</p>
                      <p className="font-semibold">{product.currentStock}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Rotation</p>
                      <p className="font-semibold">{product.turnoverRate}x/an</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Commande suggérée</p>
                      <p className="font-semibold text-blue-600">{product.suggestedOrderQuantity}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Marge</p>
                      <p className="font-semibold text-green-600">{product.profitMargin}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

