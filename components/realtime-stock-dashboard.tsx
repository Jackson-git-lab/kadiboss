"use client"

import { useState, useEffect, useMemo } from "react"
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Package, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Zap,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Eye,
  Filter,
  Calendar,
  Target,
  ShoppingCart,
  Truck,
  RotateCcw,
  Search
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

interface StockMovement {
  id: string
  productId: string
  productName: string
  type: 'in' | 'out' | 'adjustment'
  quantity: number
  date: Date
  reason: string
  user: string
  notes?: string
  location?: string
}

interface StockAlert {
  id: string
  productId: string
  productName: string
  type: 'low_stock' | 'out_of_stock' | 'high_stock' | 'expiry_warning'
  severity: 'low' | 'medium' | 'high' | 'critical'
  message: string
  date: Date
  isRead: boolean
}

interface Product {
  id: string
  name: string
  stock: number
  minThreshold: number
  maxThreshold: number
  category: string
  lastMovement?: Date
  trend: 'up' | 'down' | 'stable'
  velocity: number // movements per day
}

// Mock data
const mockMovements: StockMovement[] = [
  {
    id: "1",
    productId: "1",
    productName: "Coca-Cola Classic 33cl",
    type: "in",
    quantity: 50,
    date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    reason: "Réception commande fournisseur",
    user: "Jean Kouassi",
    location: "A1-B2"
  },
  {
    id: "2",
    productId: "2",
    productName: "Pain de Mie",
    type: "out",
    quantity: 5,
    date: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    reason: "Vente",
    user: "Marie Traoré",
    location: "B1-C3"
  },
  {
    id: "3",
    productId: "3",
    productName: "Lait Frais 1L",
    type: "adjustment",
    quantity: 2,
    date: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    reason: "Inventaire - correction",
    user: "Paul Koné",
    location: "C2-D1"
  },
  {
    id: "4",
    productId: "4",
    productName: "Riz Parfumé 5kg",
    type: "out",
    quantity: 3,
    date: new Date(Date.now() - 1000 * 60 * 90), // 1.5 hours ago
    reason: "Vente",
    user: "Fatou Diabaté",
    location: "D3-E2"
  },
  {
    id: "5",
    productId: "5",
    productName: "Huile de Cuisine 1L",
    type: "in",
    quantity: 20,
    date: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    reason: "Réception commande",
    user: "Kouassi Yao",
    location: "E1-F3"
  }
]

const mockAlerts: StockAlert[] = [
  {
    id: "1",
    productId: "2",
    productName: "Pain de Mie",
    type: "low_stock",
    severity: "high",
    message: "Stock faible: 8 unités restantes (seuil: 15)",
    date: new Date(Date.now() - 1000 * 60 * 30),
    isRead: false
  },
  {
    id: "2",
    productId: "6",
    productName: "Savon de Marseille",
    type: "out_of_stock",
    severity: "critical",
    message: "Rupture de stock: 0 unité disponible",
    date: new Date(Date.now() - 1000 * 60 * 60),
    isRead: false
  },
  {
    id: "3",
    productId: "1",
    productName: "Coca-Cola Classic 33cl",
    type: "high_stock",
    severity: "low",
    message: "Stock élevé: 95 unités (seuil max: 60)",
    date: new Date(Date.now() - 1000 * 60 * 90),
    isRead: true
  }
]

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Coca-Cola Classic 33cl",
    stock: 95,
    minThreshold: 20,
    maxThreshold: 60,
    category: "Boissons",
    lastMovement: new Date(Date.now() - 1000 * 60 * 30),
    trend: "up",
    velocity: 2.5
  },
  {
    id: "2",
    name: "Pain de Mie",
    stock: 8,
    minThreshold: 15,
    maxThreshold: 45,
    category: "Boulangerie",
    lastMovement: new Date(Date.now() - 1000 * 60 * 45),
    trend: "down",
    velocity: 1.8
  },
  {
    id: "3",
    name: "Lait Frais 1L",
    stock: 25,
    minThreshold: 10,
    maxThreshold: 30,
    category: "Produits laitiers",
    lastMovement: new Date(Date.now() - 1000 * 60 * 60),
    trend: "stable",
    velocity: 1.2
  }
]

export function RealtimeStockDashboard() {
  const [movements, setMovements] = useState<StockMovement[]>(mockMovements)
  const [alerts, setAlerts] = useState<StockAlert[]>(mockAlerts)
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [isLive, setIsLive] = useState(true)
  const [filterPeriod, setFilterPeriod] = useState<string>("today")
  const [filterType, setFilterType] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Simulate real-time updates
  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      // Simulate new movements
      if (Math.random() > 0.7) {
        const newMovement: StockMovement = {
          id: `movement-${Date.now()}`,
          productId: products[Math.floor(Math.random() * products.length)].id,
          productName: products[Math.floor(Math.random() * products.length)].name,
          type: Math.random() > 0.5 ? 'in' : 'out',
          quantity: Math.floor(Math.random() * 10) + 1,
          date: new Date(),
          reason: Math.random() > 0.5 ? 'Vente' : 'Réception',
          user: 'Système',
          location: 'A1-B2'
        }
        
        setMovements(prev => [newMovement, ...prev.slice(0, 19)]) // Keep only last 20
        toast.success(`Nouveau mouvement: ${newMovement.productName}`)
      }
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [isLive, products])

  // Filtered movements
  const filteredMovements = useMemo(() => {
    let filtered = movements

    if (filterType !== "all") {
      filtered = filtered.filter(m => m.type === filterType)
    }

    if (searchTerm) {
      filtered = filtered.filter(m => 
        m.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.reason.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
  }, [movements, filterType, searchTerm])

  // Statistics
  const stats = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const todayMovements = movements.filter(m => m.date >= today)
    const totalIn = todayMovements.filter(m => m.type === 'in').reduce((sum, m) => sum + m.quantity, 0)
    const totalOut = todayMovements.filter(m => m.type === 'out').reduce((sum, m) => sum + m.quantity, 0)
    const unreadAlerts = alerts.filter(a => !a.isRead).length
    const criticalAlerts = alerts.filter(a => a.severity === 'critical' && !a.isRead).length

    return {
      totalMovements: todayMovements.length,
      totalIn,
      totalOut,
      unreadAlerts,
      criticalAlerts,
      netChange: totalIn - totalOut
    }
  }, [movements, alerts])

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    
    if (minutes < 1) return "À l'instant"
    if (minutes < 60) return `Il y a ${minutes}min`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `Il y a ${hours}h`
    return date.toLocaleDateString('fr-FR')
  }

  const getMovementIcon = (type: string) => {
    switch (type) {
      case 'in': return <ArrowUpRight className="h-4 w-4 text-green-500" />
      case 'out': return <ArrowDownRight className="h-4 w-4 text-red-500" />
      case 'adjustment': return <RotateCcw className="h-4 w-4 text-blue-500" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive'
      case 'high': return 'destructive'
      case 'medium': return 'secondary'
      case 'low': return 'outline'
      default: return 'default'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with Live Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-foreground">Tableau de Bord Temps Réel</h2>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
            <span className="text-sm text-muted-foreground">
              {isLive ? 'En direct' : 'Pause'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsLive(!isLive)}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLive ? 'animate-spin' : ''}`} />
            {isLive ? 'Pause' : 'Reprendre'}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Mouvements Aujourd'hui</p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{stats.totalMovements}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Entrées</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">+{stats.totalIn}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 border-red-200 dark:border-red-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600 dark:text-red-400">Sorties</p>
                <p className="text-2xl font-bold text-red-700 dark:text-red-300">-{stats.totalOut}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 border-orange-200 dark:border-orange-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Alertes</p>
                <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">{stats.unreadAlerts}</p>
                {stats.criticalAlerts > 0 && (
                  <p className="text-xs text-red-600 dark:text-red-400">
                    {stats.criticalAlerts} critiques
                  </p>
                )}
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="movements" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="movements" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Mouvements
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Alertes
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Produits
          </TabsTrigger>
        </TabsList>

        {/* Movements Tab */}
        <TabsContent value="movements" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher dans les mouvements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="in">Entrées</SelectItem>
                <SelectItem value="out">Sorties</SelectItem>
                <SelectItem value="adjustment">Ajustements</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Movements List */}
          <div className="space-y-3">
            {filteredMovements.map((movement) => (
              <Card key={movement.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getMovementIcon(movement.type)}
                      <div>
                        <h4 className="font-semibold">{movement.productName}</h4>
                        <p className="text-sm text-muted-foreground">{movement.reason}</p>
                        <p className="text-xs text-muted-foreground">
                          {movement.user} • {movement.location}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        movement.type === 'in' ? 'text-green-600' : 
                        movement.type === 'out' ? 'text-red-600' : 'text-blue-600'
                      }`}>
                        {movement.type === 'in' ? '+' : movement.type === 'out' ? '-' : '±'}{movement.quantity}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formatTime(movement.date)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-4">
          <div className="space-y-3">
            {alerts.map((alert) => (
              <Card key={alert.id} className={`hover:shadow-md transition-shadow ${
                !alert.isRead ? 'border-l-4 border-l-orange-500' : ''
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                        alert.severity === 'critical' ? 'text-red-500' :
                        alert.severity === 'high' ? 'text-orange-500' :
                        'text-yellow-500'
                      }`} />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{alert.productName}</h4>
                          <Badge variant={getAlertColor(alert.severity) as any}>
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatTime(alert.date)}
                        </p>
                      </div>
                    </div>
                    {!alert.isRead && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setAlerts(prev => prev.map(a => 
                            a.id === alert.id ? { ...a, isRead: true } : a
                          ))
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <Card key={product.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{product.name}</h4>
                    <Badge variant="outline">{product.category}</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Stock actuel</span>
                      <span className="font-semibold">{product.stock}</span>
                    </div>
                    
                    <Progress 
                      value={(product.stock / product.maxThreshold) * 100} 
                      className="h-2"
                    />
                    
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Min: {product.minThreshold}</span>
                      <span>Max: {product.maxThreshold}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1">
                        {product.trend === 'up' ? <TrendingUp className="h-4 w-4 text-green-500" /> :
                         product.trend === 'down' ? <TrendingDown className="h-4 w-4 text-red-500" /> :
                         <Activity className="h-4 w-4 text-blue-500" />}
                        {product.trend === 'up' ? 'Hausse' : product.trend === 'down' ? 'Baisse' : 'Stable'}
                      </span>
                      <span className="text-muted-foreground">
                        {product.velocity}/jour
                      </span>
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
