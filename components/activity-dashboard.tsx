"use client"

import { useState, useEffect, useMemo } from "react"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  PieChart, 
  LineChart,
  Activity,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Download,
  Filter,
  Eye,
  Zap,
  Star,
  Award,
  Heart,
  Brain,
  Lightbulb,
  Settings,
  Bell,
  Info,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Minus,
  Plus,
  Search,
  Layers,
  Grid,
  List,
  Maximize2,
  Minimize2,
  RotateCcw,
  Play,
  Pause,
  Square
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"

interface KPIMetric {
  id: string
  name: string
  value: number
  previousValue: number
  unit: string
  trend: 'up' | 'down' | 'stable'
  percentage: number
  target?: number
  status: 'excellent' | 'good' | 'warning' | 'critical'
  icon: any
  color: string
  description: string
  category: 'financial' | 'operational' | 'customer' | 'inventory'
}

interface BusinessAlert {
  id: string
  type: 'opportunity' | 'warning' | 'critical' | 'info'
  title: string
  description: string
  impact: 'low' | 'medium' | 'high' | 'critical'
  action: string
  date: Date
  category: string
  priority: number
}

interface PerformanceTrend {
  period: string
  revenue: number
  profit: number
  customers: number
  orders: number
  inventory: number
}

interface DashboardWidget {
  id: string
  title: string
  type: 'kpi' | 'chart' | 'table' | 'alert' | 'goal'
  size: 'small' | 'medium' | 'large'
  position: { x: number; y: number; w: number; h: number }
  data: any
  visible: boolean
}

// Mock data for KPIs
const mockKPIs: KPIMetric[] = [
  {
    id: "revenue",
    name: "Chiffre d'Affaires",
    value: 1250000,
    previousValue: 1180000,
    unit: "FCFA",
    trend: "up",
    percentage: 5.9,
    target: 1500000,
    status: "good",
    icon: DollarSign,
    color: "text-green-600",
    description: "Revenus totaux du mois",
    category: "financial"
  },
  {
    id: "profit",
    name: "Marge Bénéficiaire",
    value: 375000,
    previousValue: 354000,
    unit: "FCFA",
    trend: "up",
    percentage: 5.9,
    target: 450000,
    status: "good",
    icon: TrendingUp,
    color: "text-blue-600",
    description: "Profit net après coûts",
    category: "financial"
  },
  {
    id: "customers",
    name: "Clients Actifs",
    value: 1247,
    previousValue: 1180,
    unit: "clients",
    trend: "up",
    percentage: 5.7,
    target: 1500,
    status: "good",
    icon: Users,
    color: "text-purple-600",
    description: "Nombre de clients actifs ce mois",
    category: "customer"
  },
  {
    id: "orders",
    name: "Commandes",
    value: 3245,
    previousValue: 2890,
    unit: "commandes",
    trend: "up",
    percentage: 12.3,
    target: 3500,
    status: "excellent",
    icon: ShoppingCart,
    color: "text-orange-600",
    description: "Nombre total de commandes",
    category: "operational"
  },
  {
    id: "avg_order",
    name: "Panier Moyen",
    value: 38500,
    previousValue: 40800,
    unit: "FCFA",
    trend: "down",
    percentage: -5.6,
    target: 45000,
    status: "warning",
    icon: Target,
    color: "text-red-600",
    description: "Valeur moyenne par commande",
    category: "financial"
  },
  {
    id: "inventory_turnover",
    name: "Rotation Stock",
    value: 8.2,
    previousValue: 7.5,
    unit: "fois/an",
    trend: "up",
    percentage: 9.3,
    target: 10,
    status: "good",
    icon: Package,
    color: "text-indigo-600",
    description: "Vitesse de rotation des stocks",
    category: "inventory"
  },
  {
    id: "customer_satisfaction",
    name: "Satisfaction Client",
    value: 8.7,
    previousValue: 8.4,
    unit: "/10",
    trend: "up",
    percentage: 3.6,
    target: 9,
    status: "good",
    icon: Heart,
    color: "text-pink-600",
    description: "Score de satisfaction moyen",
    category: "customer"
  },
  {
    id: "cash_flow",
    name: "Trésorerie",
    value: 890000,
    previousValue: 920000,
    unit: "FCFA",
    trend: "down",
    percentage: -3.3,
    target: 1000000,
    status: "warning",
    icon: Activity,
    color: "text-yellow-600",
    description: "Disponibilités en caisse",
    category: "financial"
  }
]

// Mock data for alerts
const mockAlerts: BusinessAlert[] = [
  {
    id: "1",
    type: "opportunity",
    title: "Croissance des ventes Wave",
    description: "Les paiements Wave ont augmenté de 25% cette semaine. Opportunité de promotion.",
    impact: "high",
    action: "Lancer une campagne Wave",
    date: new Date(),
    category: "Paiements",
    priority: 1
  },
  {
    id: "2",
    type: "warning",
    title: "Stock faible - Produits populaires",
    description: "Coca-Cola et Pain de Mie en rupture de stock. Impact sur les ventes.",
    impact: "critical",
    action: "Commander immédiatement",
    date: new Date(Date.now() - 1000 * 60 * 30),
    category: "Inventaire",
    priority: 1
  },
  {
    id: "3",
    type: "critical",
    title: "Client VIP inactif",
    description: "Jean Kouassi n'a pas acheté depuis 7 jours. Risque de perte client.",
    impact: "critical",
    action: "Contacter le client",
    date: new Date(Date.now() - 1000 * 60 * 60),
    category: "Clients",
    priority: 1
  },
  {
    id: "4",
    type: "info",
    title: "Pic de vente détecté",
    description: "Augmentation de 40% des ventes entre 14h-16h. Optimiser le personnel.",
    impact: "medium",
    action: "Ajuster les horaires",
    date: new Date(Date.now() - 1000 * 60 * 90),
    category: "Opérations",
    priority: 2
  }
]

// Mock data for trends
const mockTrends: PerformanceTrend[] = [
  { period: "Jan", revenue: 950000, profit: 285000, customers: 980, orders: 2450, inventory: 85 },
  { period: "Fév", revenue: 1100000, profit: 330000, customers: 1050, orders: 2780, inventory: 78 },
  { period: "Mar", revenue: 1180000, profit: 354000, customers: 1180, orders: 2890, inventory: 82 },
  { period: "Avr", revenue: 1250000, profit: 375000, customers: 1247, orders: 3245, inventory: 75 }
]

export function ActivityDashboard() {
  const [kpis, setKpis] = useState<KPIMetric[]>(mockKPIs)
  const [alerts, setAlerts] = useState<BusinessAlert[]>(mockAlerts)
  const [trends, setTrends] = useState<PerformanceTrend[]>(mockTrends)
  const [selectedPeriod, setSelectedPeriod] = useState<string>("month")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isLive, setIsLive] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState(30000) // 30 seconds

  // Auto-refresh simulation
  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      // Simulate real-time data updates
      setKpis(prev => prev.map(kpi => ({
        ...kpi,
        value: kpi.value + (Math.random() - 0.5) * kpi.value * 0.01,
        percentage: kpi.percentage + (Math.random() - 0.5) * 2
      })))
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [isLive, refreshInterval])

  // Filter KPIs by category
  const filteredKPIs = useMemo(() => {
    if (selectedCategory === "all") return kpis
    return kpis.filter(kpi => kpi.category === selectedCategory)
  }, [kpis, selectedCategory])

  // Calculate overall performance score
  const performanceScore = useMemo(() => {
    const scores = kpis.map(kpi => {
      switch (kpi.status) {
        case 'excellent': return 100
        case 'good': return 80
        case 'warning': return 60
        case 'critical': return 30
        default: return 50
      }
    })
    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
  }, [kpis])

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' F'
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR').format(num)
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUpRight className="h-4 w-4 text-green-500" />
      case 'down': return <ArrowDownRight className="h-4 w-4 text-red-500" />
      default: return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200'
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'bg-green-100 text-green-800 border-green-200'
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <Lightbulb className="h-4 w-4" />
      case 'warning': return <AlertTriangle className="h-4 w-4" />
      case 'critical': return <AlertTriangle className="h-4 w-4" />
      case 'info': return <Info className="h-4 w-4" />
      default: return <Bell className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Pilote d'Activité</h2>
          <p className="text-sm text-muted-foreground">
            Tableaux de bord intuitifs pour piloter votre entreprise
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
            <span className="text-sm text-muted-foreground">
              {isLive ? 'En direct' : 'Pause'}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsLive(!isLive)}
            className="flex-1 sm:flex-none"
          >
            {isLive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
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

      {/* Performance Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Score de Performance Global</h3>
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-blue-600">{performanceScore}/100</div>
                <div className="space-y-1">
                  <Progress value={performanceScore} className="w-32 h-3" />
                  <p className="text-sm text-muted-foreground">
                    {performanceScore >= 80 ? 'Excellente performance' :
                     performanceScore >= 60 ? 'Bonne performance' :
                     performanceScore >= 40 ? 'Performance moyenne' : 'Performance à améliorer'}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <Brain className="h-12 w-12 text-blue-500 mb-2" />
              <p className="text-sm text-muted-foreground">Analyse intelligente</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Aujourd'hui</SelectItem>
            <SelectItem value="week">Cette semaine</SelectItem>
            <SelectItem value="month">Ce mois</SelectItem>
            <SelectItem value="quarter">Ce trimestre</SelectItem>
            <SelectItem value="year">Cette année</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes</SelectItem>
            <SelectItem value="financial">Financier</SelectItem>
            <SelectItem value="operational">Opérationnel</SelectItem>
            <SelectItem value="customer">Client</SelectItem>
            <SelectItem value="inventory">Inventaire</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="flex-1 sm:flex-none"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="flex-1 sm:flex-none"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="kpis" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
          <TabsTrigger value="kpis" className="text-xs sm:text-sm">KPIs</TabsTrigger>
          <TabsTrigger value="alerts" className="text-xs sm:text-sm">Alertes</TabsTrigger>
          <TabsTrigger value="trends" className="text-xs sm:text-sm">Tendances</TabsTrigger>
          <TabsTrigger value="insights" className="text-xs sm:text-sm">Insights</TabsTrigger>
        </TabsList>

        {/* KPIs Tab */}
        <TabsContent value="kpis" className="space-y-4">
          <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
            {filteredKPIs.map(kpi => {
              const IconComponent = kpi.icon
              const isPositive = kpi.trend === 'up'
              
              return (
                <Card key={kpi.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <IconComponent className={`h-5 w-5 ${kpi.color}`} />
                        <h4 className="font-semibold text-sm">{kpi.name}</h4>
                      </div>
                      <Badge className={getStatusColor(kpi.status)}>
                        {kpi.status}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">
                          {kpi.unit === "FCFA" ? formatAmount(kpi.value) : 
                           kpi.unit === "/10" ? `${kpi.value.toFixed(1)}` :
                           formatNumber(kpi.value)}
                        </span>
                        <div className="flex items-center gap-1">
                          {getTrendIcon(kpi.trend)}
                          <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {isPositive ? '+' : ''}{kpi.percentage.toFixed(1)}%
                          </span>
                        </div>
                      </div>

                      {kpi.target && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Objectif: {kpi.unit === "FCFA" ? formatAmount(kpi.target) : formatNumber(kpi.target)}</span>
                            <span>{((kpi.value / kpi.target) * 100).toFixed(0)}%</span>
                          </div>
                          <Progress value={(kpi.value / kpi.target) * 100} className="h-2" />
                        </div>
                      )}

                      <p className="text-xs text-muted-foreground">{kpi.description}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-4">
          <div className="space-y-4">
            {alerts.map(alert => (
              <Card key={alert.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{alert.title}</h4>
                            <Badge className={getAlertColor(alert.type)}>
                              {alert.type}
                            </Badge>
                            <Badge variant="outline">
                              {alert.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>
                          <p className="text-sm font-medium text-blue-600 mb-3">{alert.action}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">
                            {alert.date.toLocaleDateString('fr-FR')}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {alert.date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                      <Button size="sm">
                        Agir maintenant
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Évolution des Revenus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trends.map((trend, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-medium">{trend.period}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-green-600 font-semibold">
                          {formatAmount(trend.revenue)}
                        </span>
                        {index > 0 && (
                          <div className="flex items-center gap-1">
                            {trend.revenue > trends[index - 1].revenue ? (
                              <ChevronUp className="h-4 w-4 text-green-500" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-red-500" />
                            )}
                            <span className="text-xs text-muted-foreground">
                              {((trend.revenue - trends[index - 1].revenue) / trends[index - 1].revenue * 100).toFixed(1)}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Évolution des Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trends.map((trend, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-medium">{trend.period}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-blue-600 font-semibold">
                          {formatNumber(trend.customers)}
                        </span>
                        {index > 0 && (
                          <div className="flex items-center gap-1">
                            {trend.customers > trends[index - 1].customers ? (
                              <ChevronUp className="h-4 w-4 text-green-500" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-red-500" />
                            )}
                            <span className="text-xs text-muted-foreground">
                              {((trend.customers - trends[index - 1].customers) / trends[index - 1].customers * 100).toFixed(1)}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  Recommandations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <h5 className="font-medium mb-1">Optimiser les horaires</h5>
                    <p className="text-sm text-muted-foreground">
                      Pic de vente entre 14h-16h. Augmenter le personnel à ces heures.
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <h5 className="font-medium mb-1">Promouvoir Wave</h5>
                    <p className="text-sm text-muted-foreground">
                      Les paiements Wave sont en forte croissance. Lancer une campagne.
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <h5 className="font-medium mb-1">Fidéliser les clients</h5>
                    <p className="text-sm text-muted-foreground">
                      Mettre en place un programme de fidélité pour augmenter les achats répétés.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  Objectifs du Mois
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Chiffre d'Affaires</span>
                      <span className="text-sm">83%</span>
                    </div>
                    <Progress value={83} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatAmount(1250000)} / {formatAmount(1500000)}
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Nouveaux Clients</span>
                      <span className="text-sm">67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      67 / 100 nouveaux clients
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Satisfaction Client</span>
                      <span className="text-sm">97%</span>
                    </div>
                    <Progress value={97} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      8.7 / 9.0 points
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
