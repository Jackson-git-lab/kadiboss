"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { 
  Users, 
  Star, 
  Gift, 
  TrendingUp, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Cake,
  ShoppingCart,
  CreditCard,
  Award,
  Crown,
  Heart,
  Zap,
  Target,
  BarChart3,
  Filter,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Send,
  MessageCircle,
  Bell,
  Clock,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Percent,
  Calendar as CalendarIcon,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  UserPlus,
  UserMinus,
  RefreshCw,
  Download,
  Upload,
  Share2,
  QrCode,
  Smartphone,
  Camera
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

interface Customer {
  id: string
  name: string
  phone: string
  email?: string
  address?: string
  dateOfBirth?: string
  gender?: 'male' | 'female' | 'other'
  registrationDate: Date
  lastVisit?: Date
  totalPurchases: number
  totalSpent: number
  averageOrderValue: number
  visitFrequency: number // visits per month
  loyaltyPoints: number
  loyaltyTier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond'
  preferredCategories: string[]
  purchaseHistory: Purchase[]
  communicationHistory: Communication[]
  notes: string
  tags: string[]
  status: 'active' | 'inactive' | 'blocked' | 'vip'
  creditLimit: number
  amountOwed: number
  paymentMethod?: 'cash' | 'card' | 'wave' | 'credit'
  socialMedia?: {
    facebook?: string
    instagram?: string
    whatsapp?: string
  }
  referralCode: string
  referredBy?: string
  referredCustomers: number
  satisfactionScore: number // 1-10
  lastInteraction?: Date
  nextFollowUp?: Date
}

interface Purchase {
  id: string
  date: Date
  amount: number
  items: Array<{
    productId: string
    productName: string
    quantity: number
    price: number
    category: string
  }>
  paymentMethod: string
  pointsEarned: number
  pointsUsed: number
  discount: number
  notes?: string
}

interface Communication {
  id: string
  date: Date
  type: 'sms' | 'email' | 'call' | 'whatsapp' | 'visit'
  subject: string
  content: string
  status: 'sent' | 'delivered' | 'read' | 'failed'
  response?: string
  notes?: string
}

interface LoyaltyProgram {
  id: string
  name: string
  description: string
  pointsPerCFA: number
  tiers: Array<{
    name: string
    minPoints: number
    benefits: string[]
    color: string
  }>
  rewards: Array<{
    id: string
    name: string
    pointsRequired: number
    description: string
    category: string
  }>
}

// Mock data
const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Jean Kouassi",
    phone: "+225 07 12 34 56 78",
    email: "jean.kouassi@email.com",
    address: "Cocody, Abidjan",
    dateOfBirth: "1985-03-15",
    gender: "male",
    registrationDate: new Date("2023-01-15"),
    lastVisit: new Date("2024-01-20"),
    totalPurchases: 45,
    totalSpent: 1250000,
    averageOrderValue: 27778,
    visitFrequency: 8.5,
    loyaltyPoints: 12500,
    loyaltyTier: "gold",
    preferredCategories: ["Boissons", "Boulangerie"],
    purchaseHistory: [],
    communicationHistory: [],
    notes: "Client fidèle, aime les promotions",
    tags: ["VIP", "Fidèle", "Promotions"],
    status: "vip",
    creditLimit: 50000,
    amountOwed: 0,
    paymentMethod: "wave",
    referralCode: "JEAN2024",
    referredCustomers: 3,
    satisfactionScore: 9,
    lastInteraction: new Date("2024-01-20"),
    nextFollowUp: new Date("2024-02-15")
  },
  {
    id: "2",
    name: "Marie Traoré",
    phone: "+225 07 98 76 54 32",
    email: "marie.traore@email.com",
    address: "Yopougon, Abidjan",
    dateOfBirth: "1990-07-22",
    gender: "female",
    registrationDate: new Date("2023-06-10"),
    lastVisit: new Date("2024-01-18"),
    totalPurchases: 28,
    totalSpent: 890000,
    averageOrderValue: 31786,
    visitFrequency: 6.2,
    loyaltyPoints: 8900,
    loyaltyTier: "silver",
    preferredCategories: ["Produits laitiers", "Condiments"],
    purchaseHistory: [],
    communicationHistory: [],
    notes: "Préfère les paiements par carte",
    tags: ["Régulière", "Carte"],
    status: "active",
    creditLimit: 30000,
    amountOwed: 5000,
    paymentMethod: "card",
    referralCode: "MARIE2024",
    referredCustomers: 1,
    satisfactionScore: 8,
    lastInteraction: new Date("2024-01-18"),
    nextFollowUp: new Date("2024-02-10")
  },
  {
    id: "3",
    name: "Paul Koné",
    phone: "+225 07 55 66 77 88",
    email: "paul.kone@email.com",
    address: "Plateau, Abidjan",
    dateOfBirth: "1978-11-08",
    gender: "male",
    registrationDate: new Date("2022-09-20"),
    lastVisit: new Date("2024-01-15"),
    totalPurchases: 72,
    totalSpent: 2100000,
    averageOrderValue: 29167,
    visitFrequency: 12.5,
    loyaltyPoints: 21000,
    loyaltyTier: "platinum",
    preferredCategories: ["Céréales", "Boissons", "Condiments"],
    purchaseHistory: [],
    communicationHistory: [],
    notes: "Client premium, achats en gros",
    tags: ["Premium", "Gros volumes"],
    status: "vip",
    creditLimit: 100000,
    amountOwed: 0,
    paymentMethod: "cash",
    referralCode: "PAUL2024",
    referredCustomers: 8,
    satisfactionScore: 10,
    lastInteraction: new Date("2024-01-15"),
    nextFollowUp: new Date("2024-02-20")
  }
]

const loyaltyProgram: LoyaltyProgram = {
  id: "1",
  name: "KadiBoss Loyalty",
  description: "Programme de fidélité KadiBoss",
  pointsPerCFA: 1, // 1 point par FCFA dépensé
  tiers: [
    {
      name: "Bronze",
      minPoints: 0,
      benefits: ["Accès aux promotions", "Notifications SMS"],
      color: "orange"
    },
    {
      name: "Silver",
      minPoints: 5000,
      benefits: ["5% de réduction", "Priorité service", "Offres exclusives"],
      color: "gray"
    },
    {
      name: "Gold",
      minPoints: 15000,
      benefits: ["10% de réduction", "Livraison gratuite", "Support prioritaire"],
      color: "yellow"
    },
    {
      name: "Platinum",
      minPoints: 35000,
      benefits: ["15% de réduction", "Produits exclusifs", "Conseiller personnel"],
      color: "blue"
    },
    {
      name: "Diamond",
      minPoints: 70000,
      benefits: ["20% de réduction", "Accès VIP", "Événements exclusifs"],
      color: "purple"
    }
  ],
  rewards: [
    {
      id: "1",
      name: "Réduction 10%",
      pointsRequired: 1000,
      description: "Réduction de 10% sur votre prochain achat",
      category: "discount"
    },
    {
      id: "2",
      name: "Produit gratuit",
      pointsRequired: 2500,
      description: "Choisissez un produit gratuit jusqu'à 5000 F",
      category: "free_product"
    },
    {
      id: "3",
      name: "Livraison gratuite",
      pointsRequired: 500,
      description: "Livraison gratuite pour votre prochaine commande",
      category: "free_delivery"
    }
  ]
}

export function AdvancedCustomerLoyalty() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTier, setSelectedTier] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("totalSpent")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false)
  const [isCommunicationOpen, setIsCommunicationOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Statistics
  const stats = useMemo(() => {
    const totalCustomers = customers.length
    const activeCustomers = customers.filter(c => c.status === 'active' || c.status === 'vip').length
    const vipCustomers = customers.filter(c => c.status === 'vip').length
    const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0)
    const averageSpent = totalCustomers > 0 ? totalRevenue / totalCustomers : 0
    const totalPoints = customers.reduce((sum, c) => sum + c.loyaltyPoints, 0)
    const averageSatisfaction = customers.reduce((sum, c) => sum + c.satisfactionScore, 0) / totalCustomers

    return {
      totalCustomers,
      activeCustomers,
      vipCustomers,
      totalRevenue,
      averageSpent,
      totalPoints,
      averageSatisfaction
    }
  }, [customers])

  // Filtered and sorted customers
  const filteredCustomers = useMemo(() => {
    let filtered = customers.filter(customer => {
      const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.phone.includes(searchTerm) ||
                           customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesTier = selectedTier === "all" || customer.loyaltyTier === selectedTier
      const matchesStatus = selectedStatus === "all" || customer.status === selectedStatus
      
      return matchesSearch && matchesTier && matchesStatus
    })

    // Sort customers
    filtered.sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case "totalSpent":
          comparison = a.totalSpent - b.totalSpent
          break
        case "loyaltyPoints":
          comparison = a.loyaltyPoints - b.loyaltyPoints
          break
        case "totalPurchases":
          comparison = a.totalPurchases - b.totalPurchases
          break
        case "lastVisit":
          comparison = (a.lastVisit?.getTime() || 0) - (b.lastVisit?.getTime() || 0)
          break
        case "satisfactionScore":
          comparison = a.satisfactionScore - b.satisfactionScore
          break
        case "name":
          comparison = a.name.localeCompare(b.name)
          break
        default:
          comparison = 0
      }
      return sortOrder === "asc" ? comparison : -comparison
    })

    return filtered
  }, [customers, searchTerm, selectedTier, selectedStatus, sortBy, sortOrder])

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'silver': return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'gold': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'platinum': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'diamond': return 'bg-purple-100 text-purple-800 border-purple-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'bronze': return <Award className="h-4 w-4" />
      case 'silver': return <Award className="h-4 w-4" />
      case 'gold': return <Crown className="h-4 w-4" />
      case 'platinum': return <Crown className="h-4 w-4" />
      case 'diamond': return <Star className="h-4 w-4" />
      default: return <Award className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200'
      case 'vip': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'blocked': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

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

  const getNextTier = (currentTier: string, points: number) => {
    const currentTierIndex = loyaltyProgram.tiers.findIndex(t => t.name.toLowerCase() === currentTier)
    if (currentTierIndex < loyaltyProgram.tiers.length - 1) {
      const nextTier = loyaltyProgram.tiers[currentTierIndex + 1]
      return {
        name: nextTier.name,
        pointsNeeded: nextTier.minPoints - points,
        benefits: nextTier.benefits
      }
    }
    return null
  }

  const handleSendCommunication = useCallback(async (customerId: string, type: string, content: string) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const communication: Communication = {
        id: `comm-${Date.now()}`,
        date: new Date(),
        type: type as any,
        subject: "Communication automatique",
        content,
        status: "sent"
      }
      
      setCustomers(prev => prev.map(customer => 
        customer.id === customerId 
          ? { ...customer, communicationHistory: [communication, ...customer.communicationHistory] }
          : customer
      ))
      
      toast.success("Communication envoyée avec succès")
    } catch (error) {
      toast.error("Erreur lors de l'envoi de la communication")
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gestion Client & Fidélisation</h2>
          <p className="text-sm text-muted-foreground">
            Gérez votre base de données clients et programme de fidélité
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button onClick={() => setIsAddCustomerOpen(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Nouveau Client
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Clients</p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{stats.totalCustomers}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  {stats.activeCustomers} actifs
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Chiffre d'Affaires</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">{formatAmount(stats.totalRevenue)}</p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  Moy: {formatAmount(stats.averageSpent)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Points Fidélité</p>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{stats.totalPoints.toLocaleString()}</p>
                <p className="text-xs text-purple-600 dark:text-purple-400">
                  {stats.vipCustomers} VIP
                </p>
              </div>
              <Star className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 border-orange-200 dark:border-orange-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Satisfaction</p>
                <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">{stats.averageSatisfaction.toFixed(1)}/10</p>
                <p className="text-xs text-orange-600 dark:text-orange-400">
                  Moyenne
                </p>
              </div>
              <Heart className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="customers" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="customers">Clients</TabsTrigger>
          <TabsTrigger value="loyalty">Fidélité</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher par nom, téléphone, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedTier} onValueChange={setSelectedTier}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Niveau" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les niveaux</SelectItem>
                <SelectItem value="bronze">Bronze</SelectItem>
                <SelectItem value="silver">Silver</SelectItem>
                <SelectItem value="gold">Gold</SelectItem>
                <SelectItem value="platinum">Platinum</SelectItem>
                <SelectItem value="diamond">Diamond</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="active">Actif</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
                <SelectItem value="inactive">Inactif</SelectItem>
                <SelectItem value="blocked">Bloqué</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Customers List */}
          <div className="space-y-4">
            {filteredCustomers.map(customer => (
              <Card key={customer.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={`/avatars/${customer.name.toLowerCase().replace(' ', '-')}.jpg`} />
                        <AvatarFallback className="text-lg">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold">{customer.name}</h3>
                          {customer.status === 'vip' && <Crown className="h-5 w-5 text-yellow-500" />}
                        </div>
                        <p className="text-sm text-muted-foreground">{customer.phone}</p>
                        {customer.email && (
                          <p className="text-sm text-muted-foreground">{customer.email}</p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={getTierColor(customer.loyaltyTier)}>
                            {getTierIcon(customer.loyaltyTier)}
                            <span className="ml-1 capitalize">{customer.loyaltyTier}</span>
                          </Badge>
                          <Badge className={getStatusColor(customer.status)}>
                            <span className="capitalize">{customer.status}</span>
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedCustomer(customer)
                          setIsCommunicationOpen(true)
                        }}
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Contacter
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Customer Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Total dépensé</p>
                      <p className="font-semibold text-green-600">{formatAmount(customer.totalSpent)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Commandes</p>
                      <p className="font-semibold">{customer.totalPurchases}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Points</p>
                      <p className="font-semibold text-purple-600">{customer.loyaltyPoints.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Satisfaction</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-semibold">{customer.satisfactionScore}/10</span>
                      </div>
                    </div>
                  </div>

                  {/* Next Tier Progress */}
                  {(() => {
                    const nextTier = getNextTier(customer.loyaltyTier, customer.loyaltyPoints)
                    if (nextTier) {
                      const currentTier = loyaltyProgram.tiers.find(t => t.name.toLowerCase() === customer.loyaltyTier)
                      const progress = currentTier ? 
                        ((customer.loyaltyPoints - currentTier.minPoints) / (nextTier.pointsNeeded + customer.loyaltyPoints - currentTier.minPoints)) * 100 : 0
                      
                      return (
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Prochain niveau: {nextTier.name}</span>
                            <span className="text-sm text-muted-foreground">
                              {nextTier.pointsNeeded.toLocaleString()} points restants
                            </span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      )
                    }
                    return null
                  })()}

                  {/* Last Visit */}
                  {customer.lastVisit && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Dernière visite: {formatDate(customer.lastVisit)}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Loyalty Tab */}
        <TabsContent value="loyalty" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Loyalty Program Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Programme de Fidélité
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">{loyaltyProgram.name}</h4>
                  <p className="text-sm text-muted-foreground">{loyaltyProgram.description}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {loyaltyProgram.pointsPerCFA} point par FCFA dépensé
                  </p>
                </div>

                <div>
                  <h5 className="font-medium mb-3">Niveaux de Fidélité</h5>
                  <div className="space-y-3">
                    {loyaltyProgram.tiers.map(tier => (
                      <div key={tier.name} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full bg-${tier.color}-500`} />
                          <span className="font-medium">{tier.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{tier.minPoints.toLocaleString()} pts</p>
                          <p className="text-xs text-muted-foreground">{tier.benefits.length} avantages</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rewards */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Récompenses Disponibles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {loyaltyProgram.rewards.map(reward => (
                    <div key={reward.id} className="p-3 rounded-lg border hover:shadow-sm transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium">{reward.name}</h5>
                        <Badge variant="outline">{reward.pointsRequired.toLocaleString()} pts</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{reward.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Communications Tab */}
        <TabsContent value="communications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Centre de Communications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Communications Client</h3>
                <p className="text-muted-foreground mb-4">
                  Gérez les communications avec vos clients (SMS, Email, WhatsApp)
                </p>
                <Button onClick={() => setIsCommunicationOpen(true)}>
                  <Send className="h-4 w-4 mr-2" />
                  Nouvelle Communication
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Analytics Avancés</h3>
                <p className="text-muted-foreground">
                  Analyses détaillées du comportement client et de la fidélisation
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Communication Modal */}
      <Dialog open={isCommunicationOpen} onOpenChange={setIsCommunicationOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contacter le Client</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold">{selectedCustomer.name}</h4>
                <p className="text-sm text-muted-foreground">{selectedCustomer.phone}</p>
                {selectedCustomer.email && (
                  <p className="text-sm text-muted-foreground">{selectedCustomer.email}</p>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="communication-type">Type de communication</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="call">Appel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    placeholder="Tapez votre message..."
                    className="w-full p-3 border rounded-md resize-none h-24"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsCommunicationOpen(false)}
                >
                  Annuler
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    // Handle send
                    setIsCommunicationOpen(false)
                  }}
                >
                  Envoyer
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
