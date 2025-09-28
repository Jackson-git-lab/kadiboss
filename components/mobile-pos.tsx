"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Calculator, 
  CreditCard, 
  Smartphone, 
  Banknote,
  Receipt,
  QrCode,
  Scan,
  User,
  Phone,
  Mail,
  Search,
  Package,
  DollarSign,
  Percent,
  Gift,
  Star,
  CheckCircle,
  X,
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  Save,
  Printer,
  Send,
  Camera,
  Mic,
  Volume2,
  Settings,
  HelpCircle,
  Clock,
  Calendar,
  MapPin,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Info,
  Zap,
  Target,
  Award
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"

interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  total: number
  category: string
  image?: string
  barcode?: string
  discount?: number
  pointsEarned?: number
}

interface Customer {
  id: string
  name: string
  phone: string
  email?: string
  loyaltyPoints: number
  loyaltyTier: string
  totalSpent: number
  totalPurchases: number
  avatar?: string
}

interface PaymentMethod {
  id: string
  name: string
  icon: any
  color: string
  enabled: boolean
  fee?: number
  description?: string
}

interface Product {
  id: string
  name: string
  price: number
  category: string
  image?: string
  barcode?: string
  stock: number
  description?: string
  tags?: string[]
}

// Mock data
const mockProducts: Product[] = [
  {
    id: "P001",
    name: "Coca-Cola Classic 33cl",
    price: 500,
    category: "Boissons",
    image: "/classic-coca-cola.png",
    barcode: "1234567890123",
    stock: 45,
    description: "Boisson gazeuse classique",
    tags: ["Populaire", "Boisson"]
  },
  {
    id: "P002",
    name: "Pain de Mie",
    price: 750,
    category: "Boulangerie",
    image: "/rustic-bread-loaf.png",
    barcode: "1234567890124",
    stock: 8,
    description: "Pain de mie frais",
    tags: ["Frais", "Boulangerie"]
  },
  {
    id: "P003",
    name: "Lait Frais 1L",
    price: 1200,
    category: "Produits laitiers",
    image: "/milk-carton.png",
    barcode: "1234567890125",
    stock: 25,
    description: "Lait frais pasteurisé",
    tags: ["Frais", "Laitier"]
  },
  {
    id: "P004",
    name: "Riz Parfumé 5kg",
    price: 4500,
    category: "Céréales",
    image: "/rice-bag.png",
    barcode: "1234567890126",
    stock: 3,
    description: "Riz parfumé de qualité",
    tags: ["Gros volume", "Céréale"]
  },
  {
    id: "P005",
    name: "Huile de Cuisine 1L",
    price: 2800,
    category: "Condiments",
    image: "/cooking-oil-bottle.png",
    barcode: "1234567890127",
    stock: 12,
    description: "Huile de tournesol",
    tags: ["Cuisine", "Huile"]
  }
]

const mockCustomers: Customer[] = [
  {
    id: "C001",
    name: "Jean Kouassi",
    phone: "+225 07 12 34 56 78",
    email: "jean.kouassi@email.com",
    loyaltyPoints: 1250,
    loyaltyTier: "Gold",
    totalSpent: 125000,
    totalPurchases: 45,
    avatar: "/avatars/jean.jpg"
  },
  {
    id: "C002",
    name: "Marie Traoré",
    phone: "+225 07 98 76 54 32",
    email: "marie.traore@email.com",
    loyaltyPoints: 890,
    loyaltyTier: "Silver",
    totalSpent: 89000,
    totalPurchases: 28,
    avatar: "/avatars/marie.jpg"
  }
]

const paymentMethods: PaymentMethod[] = [
  {
    id: "cash",
    name: "Espèces",
    icon: Banknote,
    color: "bg-green-500",
    enabled: true,
    description: "Paiement en espèces"
  },
  {
    id: "card",
    name: "Carte",
    icon: CreditCard,
    color: "bg-blue-500",
    enabled: true,
    fee: 2.5,
    description: "Carte bancaire"
  },
  {
    id: "wave",
    name: "Wave",
    icon: Smartphone,
    color: "bg-purple-500",
    enabled: true,
    fee: 1.5,
    description: "Wave Mobile Money"
  },
  {
    id: "credit",
    name: "Crédit",
    icon: Receipt,
    color: "bg-orange-500",
    enabled: true,
    description: "Paiement différé"
  }
]

export function MobilePOS() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const [isCustomerSelectOpen, setIsCustomerSelectOpen] = useState(false)
  const [isScanningOpen, setIsScanningOpen] = useState(false)
  const [customDiscount, setCustomDiscount] = useState(0)
  const [customTip, setCustomTip] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // Calculate totals
  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.total, 0)
    const discount = cart.reduce((sum, item) => sum + (item.discount || 0), 0) + customDiscount
    const tax = (subtotal - discount) * 0.18 // 18% TVA
    const tip = customTip
    const total = subtotal - discount + tax + tip

    return {
      subtotal,
      discount,
      tax,
      tip,
      total,
      itemCount: cart.reduce((sum, item) => sum + item.quantity, 0)
    }
  }, [cart, customDiscount, customTip])

  // Filter products
  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.barcode?.includes(searchTerm) ||
                           product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  const categories = useMemo(() => {
    const cats = Array.from(new Set(mockProducts.map(p => p.category)))
    return cats.sort()
  }, [])

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.productId === product.id)
      if (existingItem) {
        return prev.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
            : item
        )
      } else {
        const newItem: CartItem = {
          id: `item-${Date.now()}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          total: product.price,
          category: product.category,
          image: product.image,
          barcode: product.barcode
        }
        return [...prev, newItem]
      }
    })
  }, [])

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }
    
    setCart(prev => prev.map(item =>
      item.id === itemId
        ? { ...item, quantity, total: quantity * item.price }
        : item
    ))
  }, [])

  const removeFromCart = useCallback((itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId))
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
    setSelectedCustomer(null)
    setSelectedPaymentMethod("")
    setCustomDiscount(0)
    setCustomTip(0)
  }, [])

  const processPayment = useCallback(async () => {
    if (!selectedPaymentMethod) {
      toast.error("Veuillez sélectionner une méthode de paiement")
      return
    }

    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate payment processing
      toast.success("Paiement traité avec succès!")
      
      // Clear cart and reset
      clearCart()
      setIsPaymentOpen(false)
      
    } catch (error) {
      toast.error("Erreur lors du traitement du paiement")
    } finally {
      setIsLoading(false)
    }
  }, [selectedPaymentMethod, clearCart])

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' F'
  }

  const getPaymentIcon = (methodId: string) => {
    const method = paymentMethods.find(m => m.id === methodId)
    return method ? method.icon : CreditCard
  }

  const getPaymentColor = (methodId: string) => {
    const method = paymentMethods.find(m => m.id === methodId)
    return method ? method.color : "bg-gray-500"
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-bold">Point de Vente</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsScanningOpen(true)}>
            <Scan className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Products Panel */}
        <div className="flex-1 flex flex-col">
          {/* Search and Filters */}
          <div className="p-4 border-b bg-card">
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-2">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("all")}
                >
                  Tous
                </Button>
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredProducts.map(product => (
                <Card 
                  key={product.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => addToCart(product)}
                >
                  <CardContent className="p-3">
                    <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Package className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>
                    <h3 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-lg font-bold text-green-600">{formatAmount(product.price)}</p>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                    {product.stock < 10 && (
                      <Badge variant="destructive" className="text-xs mt-1">
                        Stock faible
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Cart Panel */}
        <div className="w-full sm:w-96 border-l bg-card flex flex-col">
          {/* Cart Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Panier</h2>
              <Button variant="outline" size="sm" onClick={clearCart}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Customer Selection */}
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => setIsCustomerSelectOpen(true)}
            >
              <User className="h-4 w-4 mr-2" />
              {selectedCustomer ? selectedCustomer.name : "Sélectionner un client"}
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Panier vide</p>
                <p className="text-sm text-muted-foreground">Ajoutez des produits</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map(item => (
                  <Card key={item.id}>
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          {item.image ? (
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <Package className="h-6 w-6 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                          <p className="text-sm font-bold text-green-600">{formatAmount(item.total)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Cart Summary */}
          {cart.length > 0 && (
            <div className="border-t p-4 space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{formatAmount(totals.subtotal)}</span>
                </div>
                {totals.discount > 0 && (
                  <div className="flex justify-between text-orange-600">
                    <span>Réduction</span>
                    <span>-{formatAmount(totals.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>TVA (18%)</span>
                  <span>{formatAmount(totals.tax)}</span>
                </div>
                {totals.tip > 0 && (
                  <div className="flex justify-between">
                    <span>Pourboire</span>
                    <span>{formatAmount(totals.tip)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>{formatAmount(totals.total)}</span>
                </div>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={() => setIsPaymentOpen(true)}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Payer {formatAmount(totals.total)}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Paiement</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Payment Summary */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Articles ({totals.itemCount})</span>
                    <span>{formatAmount(totals.subtotal)}</span>
                  </div>
                  {totals.discount > 0 && (
                    <div className="flex justify-between text-orange-600">
                      <span>Réduction</span>
                      <span>-{formatAmount(totals.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>TVA</span>
                    <span>{formatAmount(totals.tax)}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t pt-2">
                    <span>Total</span>
                    <span>{formatAmount(totals.total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <div className="space-y-3">
              <Label>Méthode de paiement</Label>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map(method => (
                  <Button
                    key={method.id}
                    variant={selectedPaymentMethod === method.id ? "default" : "outline"}
                    className="flex flex-col items-center p-4 h-auto"
                    onClick={() => setSelectedPaymentMethod(method.id)}
                  >
                    <method.icon className={`h-6 w-6 mb-2 ${method.color.replace('bg-', 'text-')}`} />
                    <span className="text-sm">{method.name}</span>
                    {method.fee && (
                      <span className="text-xs text-muted-foreground">
                        {method.fee}% de frais
                      </span>
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Additional Options */}
            <div className="space-y-3">
              <div>
                <Label htmlFor="discount">Réduction additionnelle (F)</Label>
                <Input
                  id="discount"
                  type="number"
                  value={customDiscount}
                  onChange={(e) => setCustomDiscount(Number(e.target.value) || 0)}
                />
              </div>
              
              <div>
                <Label htmlFor="tip">Pourboire (F)</Label>
                <Input
                  id="tip"
                  type="number"
                  value={customTip}
                  onChange={(e) => setCustomTip(Number(e.target.value) || 0)}
                />
              </div>
            </div>

            {/* Payment Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsPaymentOpen(false)}
              >
                Annuler
              </Button>
              <Button
                className="flex-1"
                onClick={processPayment}
                disabled={!selectedPaymentMethod || isLoading}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Traitement...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Confirmer
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Customer Selection Modal */}
      <Dialog open={isCustomerSelectOpen} onOpenChange={setIsCustomerSelectOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sélectionner un Client</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher un client..."
                className="pl-10"
              />
            </div>
            
            <div className="space-y-2 max-h-60 overflow-y-auto">
              <Button
                variant={!selectedCustomer ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => {
                  setSelectedCustomer(null)
                  setIsCustomerSelectOpen(false)
                }}
              >
                <User className="h-4 w-4 mr-2" />
                Client anonyme
              </Button>
              
              {mockCustomers.map(customer => (
                <Button
                  key={customer.id}
                  variant={selectedCustomer?.id === customer.id ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => {
                    setSelectedCustomer(customer)
                    setIsCustomerSelectOpen(false)
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={customer.avatar} />
                      <AvatarFallback>
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-xs text-muted-foreground">{customer.phone}</p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
