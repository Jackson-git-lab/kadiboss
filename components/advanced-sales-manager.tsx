"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { 
  ShoppingCart, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Package, 
  Calendar,
  Clock,
  Target,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Zap,
  Star,
  Award,
  Gift,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Download,
  Filter,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  CreditCard,
  Smartphone,
  MapPin,
  Phone,
  Mail,
  Bell,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock3,
  Timer,
  QrCode,
  ScanLine,
  Receipt,
  FileText,
  Calculator,
  Wallet,
  Banknote,
  Coins,
  Smartphone as PhoneIcon
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"

interface Sale {
  id: string
  customerId?: string
  customerName: string
  customerPhone?: string
  date: Date
  time: string
  items: SaleItem[]
  subtotal: number
  discount: number
  tax: number
  total: number
  paymentMethod: 'cash' | 'card' | 'wave' | 'credit' | 'mixed'
  paymentStatus: 'completed' | 'pending' | 'failed' | 'refunded'
  salesperson: string
  location: string
  notes?: string
  receiptNumber: string
  pointsEarned?: number
  pointsUsed?: number
  loyaltyDiscount?: number
}

interface SaleItem {
  id: string
  productId: string
  productName: string
  category: string
  quantity: number
  unitPrice: number
  totalPrice: number
  discount?: number
  profit?: number
  profitMargin?: number
}

interface Customer {
  id: string
  name: string
  phone: string
  email?: string
  totalSpent: number
  totalPurchases: number
  lastPurchase?: Date
  loyaltyPoints: number
  loyaltyTier: string
  preferredCategories: string[]
}

interface SalesGoal {
  id: string
  name: string
  target: number
  current: number
  period: 'daily' | 'weekly' | 'monthly' | 'yearly'
  startDate: Date
  endDate: Date
  status: 'active' | 'completed' | 'failed'
}

interface SalesInsight {
  type: 'opportunity' | 'trend' | 'alert' | 'recommendation'
  title: string
  description: string
  impact: 'low' | 'medium' | 'high' | 'critical'
  action: string
  data?: any
}

// Mock data
const mockSales: Sale[] = [
  {
    id: "SALE001",
    customerName: "Jean Kouassi",
    customerPhone: "+225 07 12 34 56 78",
    date: new Date("2024-01-20"),
    time: "10:30",
    items: [
      {
        id: "1",
        productId: "P001",
        productName: "Coca-Cola Classic 33cl",
        category: "Boissons",
        quantity: 5,
        unitPrice: 500,
        totalPrice: 2500,
        profit: 750,
        profitMargin: 30
      },
      {
        id: "2",
        productId: "P002",
        productName: "Pain de Mie",
        category: "Boulangerie",
        quantity: 2,
        unitPrice: 750,
        totalPrice: 1500,
        profit: 600,
        profitMargin: 40
      }
    ],
    subtotal: 4000,
    discount: 200,
    tax: 0,
    total: 3800,
    paymentMethod: "wave",
    paymentStatus: "completed",
    salesperson: "Marie Traoré",
    location: "Boutique Centre",
    receiptNumber: "R2024001",
    pointsEarned: 38,
    pointsUsed: 0
  },
  {
    id: "SALE002",
    customerName: "Marie Traoré",
    customerPhone: "+225 07 98 76 54 32",
    date: new Date("2024-01-20"),
    time: "14:15",
    items: [
      {
        id: "3",
        productId: "P003",
        productName: "Lait Frais 1L",
        category: "Produits laitiers",
        quantity: 3,
        unitPrice: 1200,
        totalPrice: 3600,
        profit: 1080,
        profitMargin: 30
      }
    ],
    subtotal: 3600,
    discount: 0,
    tax: 0,
    total: 3600,
    paymentMethod: "card",
    paymentStatus: "completed",
    salesperson: "Paul Koné",
    location: "Boutique Plateau",
    receiptNumber: "R2024002",
    pointsEarned: 36
  },
  {
    id: "SALE003",
    customerName: "Paul Koné",
    customerPhone: "+225 07 55 66 77 88",
    date: new Date("2024-01-19"),
    time: "16:45",
    items: [
      {
        id: "4",
        productId: "P004",
        productName: "Riz Parfumé 5kg",
        category: "Céréales",
        quantity: 2,
        unitPrice: 4500,
        totalPrice: 9000,
        profit: 2700,
        profitMargin: 30
      },
      {
        id: "5",
        productId: "P005",
        productName: "Huile de Cuisine 1L",
        category: "Condiments",
        quantity: 1,
        unitPrice: 2800,
        totalPrice: 2800,
        profit: 840,
        profitMargin: 30
      }
    ],
    subtotal: 11800,
    discount: 500,
    tax: 0,
    total: 11300,
    paymentMethod: "cash",
    paymentStatus: "completed",
    salesperson: "Fatou Diabaté",
    location: "Boutique Yopougon",
    receiptNumber: "R2024003",
    pointsEarned: 113,
    pointsUsed: 50,
    loyaltyDiscount: 500
  }
]

const mockCustomers: Customer[] = [
  {
    id: "C001",
    name: "Jean Kouassi",
    phone: "+225 07 12 34 56 78",
    email: "jean.kouassi@email.com",
    totalSpent: 125000,
    totalPurchases: 45,
    lastPurchase: new Date("2024-01-20"),
    loyaltyPoints: 1250,
    loyaltyTier: "Gold",
    preferredCategories: ["Boissons", "Boulangerie"]
  },
  {
    id: "C002",
    name: "Marie Traoré",
    phone: "+225 07 98 76 54 32",
    email: "marie.traore@email.com",
    totalSpent: 89000,
    totalPurchases: 28,
    lastPurchase: new Date("2024-01-20"),
    loyaltyPoints: 890,
    loyaltyTier: "Silver",
    preferredCategories: ["Produits laitiers", "Condiments"]
  },
  {
    id: "C003",
    name: "Paul Koné",
    phone: "+225 07 55 66 77 88",
    email: "paul.kone@email.com",
    totalSpent: 210000,
    totalPurchases: 72,
    lastPurchase: new Date("2024-01-19"),
    loyaltyPoints: 2100,
    loyaltyTier: "Platinum",
    preferredCategories: ["Céréales", "Boissons", "Condiments"]
  }
]

const mockSalesGoals: SalesGoal[] = [
  {
    id: "G001",
    name: "Objectif Mensuel",
    target: 500000,
    current: 18700,
    period: "monthly",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-31"),
    status: "active"
  },
  {
    id: "G002",
    name: "Objectif Quotidien",
    target: 25000,
    current: 18700,
    period: "daily",
    startDate: new Date("2024-01-20"),
    endDate: new Date("2024-01-20"),
    status: "active"
  }
]

const mockInsights: SalesInsight[] = [
  {
    type: "opportunity",
    title: "Client VIP avec faible activité",
    description: "Jean Kouassi n'a pas acheté depuis 5 jours. Envoyez une offre personnalisée.",
    impact: "high",
    action: "Envoyer promotion SMS",
    data: { customerId: "C001", daysSinceLastPurchase: 5 }
  },
  {
    type: "trend",
    title: "Croissance des ventes Wave",
    description: "Les paiements Wave ont augmenté de 25% cette semaine.",
    impact: "medium",
    action: "Promouvoir Wave dans les communications",
    data: { growth: 25, period: "week" }
  },
  {
    type: "alert",
    title: "Stock faible sur produits populaires",
    description: "Coca-Cola et Pain de Mie en stock faible. Risque de rupture.",
    impact: "critical",
    action: "Commander immédiatement",
    data: { products: ["Coca-Cola", "Pain de Mie"] }
  },
  {
    type: "recommendation",
    title: "Optimiser les horaires",
    description: "Pic de vente entre 14h-16h. Augmenter le personnel à ces heures.",
    impact: "medium",
    action: "Ajuster planning personnel",
    data: { peakHours: ["14:00-16:00"] }
  }
]

export function AdvancedSalesManager() {
  const [sales, setSales] = useState<Sale[]>(mockSales)
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
  const [salesGoals, setSalesGoals] = useState<SalesGoal[]>(mockSalesGoals)
  const [insights, setInsights] = useState<SalesInsight[]>(mockInsights)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPeriod, setSelectedPeriod] = useState<string>("today")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [isNewSaleOpen, setIsNewSaleOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Statistics
  const stats = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const todaySales = sales.filter(s => s.date >= today)
    const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0)
    const todayRevenue = todaySales.reduce((sum, s) => sum + s.total, 0)
    const totalTransactions = sales.length
    const todayTransactions = todaySales.length
    const averageOrderValue = totalTransactions > 0 ? totalRevenue / totalTransactions : 0
    const totalProfit = sales.reduce((sum, s) => 
      sum + s.items.reduce((itemSum, item) => itemSum + (item.profit || 0), 0), 0)
    
    const paymentMethods = sales.reduce((acc, sale) => {
      acc[sale.paymentMethod] = (acc[sale.paymentMethod] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const topProducts = sales.reduce((acc, sale) => {
      sale.items.forEach(item => {
        const key = item.productName
        if (!acc[key]) {
          acc[key] = { name: item.productName, quantity: 0, revenue: 0 }
        }
        acc[key].quantity += item.quantity
        acc[key].revenue += item.totalPrice
      })
      return acc
    }, {} as Record<string, { name: string; quantity: number; revenue: number }>)

    const topProductsArray = Object.values(topProducts)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)

    return {
      totalRevenue,
      todayRevenue,
      totalTransactions,
      todayTransactions,
      averageOrderValue,
      totalProfit,
      paymentMethods,
      topProducts: topProductsArray
    }
  }, [sales])

  // Filtered sales
  const filteredSales = useMemo(() => {
    let filtered = sales

    if (searchTerm) {
      filtered = filtered.filter(sale => 
        sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.salesperson.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedPaymentMethod !== "all") {
      filtered = filtered.filter(sale => sale.paymentMethod === selectedPaymentMethod)
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter(sale => sale.paymentStatus === selectedStatus)
    }

    return filtered.sort((a, b) => b.date.getTime() - a.date.getTime())
  }, [sales, searchTerm, selectedPaymentMethod, selectedStatus])

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' F'
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'failed': return 'bg-red-100 text-red-800 border-red-200'
      case 'refunded': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'cash': return <Banknote className="h-4 w-4" />
      case 'card': return <CreditCard className="h-4 w-4" />
      case 'wave': return <Smartphone className="h-4 w-4" />
      case 'credit': return <FileText className="h-4 w-4" />
      default: return <DollarSign className="h-4 w-4" />
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <Target className="h-4 w-4" />
      case 'trend': return <TrendingUp className="h-4 w-4" />
      case 'alert': return <AlertTriangle className="h-4 w-4" />
      case 'recommendation': return <Star className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  const getInsightColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const handleNewSale = useCallback(async (saleData: Omit<Sale, 'id' | 'receiptNumber'>) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newSale: Sale = {
        ...saleData,
        id: `SALE${Date.now()}`,
        receiptNumber: `R${Date.now()}`
      }
      
      setSales(prev => [newSale, ...prev])
      toast.success("Vente enregistrée avec succès")
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement de la vente")
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gestion des Ventes</h2>
          <p className="text-sm text-muted-foreground">
            Système avancé pour booster les ventes et analyser les transactions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
          <Button onClick={() => setIsNewSaleOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle Vente
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Chiffre d'Affaires Total</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">{formatAmount(stats.totalRevenue)}</p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  Aujourd'hui: {formatAmount(stats.todayRevenue)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Transactions</p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{stats.totalTransactions}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  Aujourd'hui: {stats.todayTransactions}
                </p>
              </div>
              <ShoppingCart className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Panier Moyen</p>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{formatAmount(stats.averageOrderValue)}</p>
                <p className="text-xs text-purple-600 dark:text-purple-400">
                  Par transaction
                </p>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 border-orange-200 dark:border-orange-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Profit Total</p>
                <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">{formatAmount(stats.totalProfit)}</p>
                <p className="text-xs text-orange-600 dark:text-orange-400">
                  Marge bénéficiaire
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Goals Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {salesGoals.map(goal => {
          const progress = (goal.current / goal.target) * 100
          return (
            <Card key={goal.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{goal.name}</span>
                  <Badge variant={goal.status === 'active' ? 'default' : 'secondary'}>
                    {goal.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>{formatAmount(goal.current)}</span>
                    <span>{formatAmount(goal.target)}</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{progress.toFixed(1)}% atteint</span>
                    <span>{formatAmount(goal.target - goal.current)} restant</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sales">Ventes</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="pos">Point de Vente</TabsTrigger>
        </TabsList>

        {/* Sales Tab */}
        <TabsContent value="sales" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher par client, reçu, vendeur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Paiement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="cash">Espèces</SelectItem>
                <SelectItem value="card">Carte</SelectItem>
                <SelectItem value="wave">Wave</SelectItem>
                <SelectItem value="credit">Crédit</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="completed">Terminé</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="failed">Échoué</SelectItem>
                <SelectItem value="refunded">Remboursé</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sales List */}
          <div className="space-y-4">
            {filteredSales.map(sale => (
              <Card key={sale.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold">{sale.customerName}</h3>
                        <Badge className={getStatusColor(sale.paymentStatus)}>
                          <span className="capitalize">{sale.paymentStatus}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(sale.date)} à {sale.time} • {sale.receiptNumber}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Vendeur: {sale.salesperson} • {sale.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">{formatAmount(sale.total)}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        {getPaymentIcon(sale.paymentMethod)}
                        <span className="capitalize">{sale.paymentMethod}</span>
                      </div>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-2 mb-4">
                    {sale.items.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <div>
                          <p className="font-medium">{item.productName}</p>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{item.quantity} × {formatAmount(item.unitPrice)}</p>
                          <p className="text-sm text-green-600">{formatAmount(item.totalPrice)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Additional Info */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      {sale.discount > 0 && (
                        <span className="text-orange-600">Réduction: {formatAmount(sale.discount)}</span>
                      )}
                      {sale.pointsEarned && (
                        <span className="text-purple-600">Points: +{sale.pointsEarned}</span>
                      )}
                      {sale.pointsUsed && sale.pointsUsed > 0 && (
                        <span className="text-blue-600">Points utilisés: {sale.pointsUsed}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Receipt className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    {getInsightIcon(insight.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{insight.title}</h4>
                        <Badge className={getInsightColor(insight.impact)}>
                          {insight.impact}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                      <p className="text-sm font-medium text-blue-600 mb-3">{insight.action}</p>
                    </div>
                  </div>
                  <Button size="sm" className="w-full">
                    Agir maintenant
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Méthodes de Paiement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(stats.paymentMethods).map(([method, count]) => (
                    <div key={method} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getPaymentIcon(method)}
                        <span className="capitalize">{method}</span>
                      </div>
                      <span className="font-medium">{count} transactions</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card>
              <CardHeader>
                <CardTitle>Produits les Plus Vendus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.quantity} unités</p>
                      </div>
                      <span className="font-medium text-green-600">{formatAmount(product.revenue)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* POS Tab */}
        <TabsContent value="pos" className="space-y-4">
          <Card>
            <CardContent className="p-8 text-center">
              <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Point de Vente Mobile</h3>
              <p className="text-muted-foreground mb-4">
                Interface de point de vente optimisée pour mobile
              </p>
              <Button onClick={() => setIsNewSaleOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle Vente
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Sale Modal */}
      <Dialog open={isNewSaleOpen} onOpenChange={setIsNewSaleOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Nouvelle Vente</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center py-8">
              <Calculator className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Interface de Vente</h3>
              <p className="text-muted-foreground mb-4">
                Interface de point de vente complète en cours de développement
              </p>
              <Button onClick={() => setIsNewSaleOpen(false)}>
                Fermer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

