"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { 
  Search, 
  Filter, 
  Package, 
  Plus, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  ArrowUpDown,
  Calendar,
  DollarSign,
  ShoppingCart,
  Package2,
  Zap,
  Activity,
  Target,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  ChevronUp,
  ChevronDown,
  Download,
  Upload,
  FileText,
  Settings
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AnimatedButton } from "@/components/ui/animated-button"
import { AnimatedCard, AnimatedCardContent } from "@/components/ui/animated-card"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ProductModal } from "@/components/product-modal"
import { BarcodeScanner } from "@/components/barcode-scanner"
import { toast } from "sonner"

interface Product {
  id: string
  name: string
  image: string
  stock: number
  minThreshold: number
  price: number
  category: string
  lastUpdated: Date
  sellingPrice: number
  cost: number
  alertThreshold: number
  profit: number
  profitMargin: number
  maxThreshold: number
  barcode: string
  supplier: string
  location: string
  description: string
  tags: string[]
  isActive: boolean
  movementHistory: any[]
  lastMovement?: {
    type: string
    quantity: number
    date: Date
    reason: string
  }
}

// Helper function to create products
const createProduct = (data: Partial<Product>): Product => ({
  id: data.id || `product-${Date.now()}`,
  name: data.name || "Nouveau Produit",
  image: data.image || "/generic-product.png",
  stock: data.stock || 0,
  minThreshold: data.minThreshold || 10,
  price: data.price || 0,
  category: data.category || "Général",
  lastUpdated: data.lastUpdated || new Date(),
  sellingPrice: data.sellingPrice || data.price || 0,
  cost: data.cost || 0,
  alertThreshold: data.alertThreshold || 10,
  profit: (data.sellingPrice || data.price || 0) - (data.cost || 0),
  profitMargin: Math.round((((data.sellingPrice || data.price || 0) - (data.cost || 0)) / (data.sellingPrice || data.price || 1)) * 100 * 10) / 10,
  maxThreshold: (data.alertThreshold || 10) * 3,
  barcode: data.barcode || "",
  supplier: data.supplier || "",
  location: data.location || "",
  description: data.description || "",
  tags: data.tags || [],
  isActive: data.isActive !== false,
  movementHistory: data.movementHistory || []
})

const mockProducts: Product[] = [
  createProduct({
    id: "1",
    name: "Riz Basmati",
    image: "/generic-product.png",
    stock: 45,
    minThreshold: 20,
    price: 2500,
    category: "Céréales",
    lastUpdated: new Date(),
    barcode: "1234567890123",
    supplier: "Importateur Riz",
    location: "A1-B2",
    description: "Riz parfumé de qualité supérieure"
  }),
  createProduct({
    id: "2",
    name: "Huile de Palme",
    image: "/generic-product.png",
    stock: 8,
    minThreshold: 15,
    price: 1800,
    category: "Condiments",
    lastUpdated: new Date(),
    barcode: "1234567890124",
    supplier: "Huilerie Moderne",
    location: "C3-D1",
    description: "Huile de palme raffinée"
  }),
  createProduct({
    id: "3",
    name: "Sucre en Poudre",
    image: "/generic-product.png",
    stock: 0,
    minThreshold: 25,
    price: 1200,
    category: "Condiments",
    lastUpdated: new Date(),
    barcode: "1234567890125",
    supplier: "Sucrerie Ivoirienne",
    location: "E2-F3",
    description: "Sucre blanc raffiné"
  })
]

export function AdvancedInventoryList() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [stockFilter, setStockFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isEditProductOpen, setIsEditProductOpen] = useState(false)
  const [isDeleteProductOpen, setIsDeleteProductOpen] = useState(false)
  const [isMovementModalOpen, setIsMovementModalOpen] = useState(false)
  const [isBarcodeScannerOpen, setIsBarcodeScannerOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showLowStock, setShowLowStock] = useState(false)
  const [showOutOfStock, setShowOutOfStock] = useState(false)

  // Categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map(p => p.category)))
    return cats.sort()
  }, [products])

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.barcode.includes(searchTerm) ||
                           product.category.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      
      const matchesStockFilter = (() => {
        switch (stockFilter) {
          case "low":
            return product.stock <= product.alertThreshold && product.stock > 0
          case "out":
            return product.stock === 0
          case "normal":
            return product.stock > product.alertThreshold
          default:
            return true
        }
      })()
      
      const matchesQuickFilters = (!showLowStock || product.stock <= product.alertThreshold) &&
                                 (!showOutOfStock || product.stock === 0)
      
      return matchesSearch && matchesCategory && matchesStockFilter && matchesQuickFilters
    })

    return filtered.sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name)
          break
        case "stock":
          comparison = a.stock - b.stock
          break
        case "price":
          comparison = a.price - b.price
          break
        case "category":
          comparison = a.category.localeCompare(b.category)
          break
        case "lastUpdated":
          comparison = a.lastUpdated.getTime() - b.lastUpdated.getTime()
          break
      }
      return sortOrder === "asc" ? comparison : -comparison
    })
  }, [products, searchTerm, selectedCategory, stockFilter, sortBy, sortOrder, showLowStock, showOutOfStock])

  // Stats
  const stats = useMemo(() => {
    const totalStock = products.reduce((sum, p) => sum + p.stock, 0)
    const lowStockProducts = products.filter(p => p.stock <= p.alertThreshold && p.stock > 0).length
    const outOfStockProducts = products.filter(p => p.stock === 0).length
    const totalValue = products.reduce((sum, p) => sum + (p.stock * p.cost), 0)
    
    return {
      totalStock,
      lowStockProducts,
      outOfStockProducts,
      totalValue
    }
  }, [products])

  const getStockStatus = (product: Product) => {
    if (product.stock === 0) {
      return {
        status: "out" as const,
        icon: XCircle,
        color: "text-red-500",
        bgColor: "bg-red-50 dark:bg-red-950/20",
        borderColor: "border-red-200 dark:border-red-800"
      }
    } else if (product.stock <= product.alertThreshold) {
      return {
        status: "low" as const,
        icon: AlertTriangle,
        color: "text-orange-500",
        bgColor: "bg-orange-50 dark:bg-orange-950/20",
        borderColor: "border-orange-200 dark:border-orange-800"
      }
    } else {
      return {
        status: "normal" as const,
        icon: CheckCircle,
        color: "text-green-500",
        bgColor: "bg-green-50 dark:bg-green-950/20",
        borderColor: "border-green-200 dark:border-green-800"
      }
    }
  }

  const handleAddProduct = useCallback(async (productData: any) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newProduct: Product = createProduct({
        id: `product-${Date.now()}`,
        name: productData.name,
        image: productData.image || "/generic-product.png",
        stock: productData.stock || 0,
        minThreshold: productData.alertThreshold || 10,
        price: productData.sellingPrice,
        category: productData.category,
        lastUpdated: new Date(),
        sellingPrice: productData.sellingPrice,
        cost: productData.cost,
        alertThreshold: productData.alertThreshold,
        profit: productData.sellingPrice - productData.cost,
        profitMargin: Math.round(((productData.sellingPrice - productData.cost) / productData.sellingPrice) * 100 * 10) / 10,
        maxThreshold: (productData.alertThreshold || 10) * 3,
        barcode: productData.barcode || "",
        supplier: productData.supplier || "",
        location: productData.location || "",
        description: productData.description || "",
        tags: [],
        isActive: true,
        movementHistory: []
      })
      
      setProducts(prev => [...prev, newProduct])
      toast.success(`${newProduct.name} ajouté à l'inventaire`)
    } catch (error) {
      toast.error("Erreur lors de l'ajout du produit")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleEditProduct = useCallback(async (productData: any) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setProducts(prev => prev.map(p => 
        p.id === productData.id 
          ? { 
              ...p,
              name: productData.name,
              image: productData.image || p.image,
              stock: productData.stock || p.stock,
              minThreshold: productData.alertThreshold || p.minThreshold,
              price: productData.sellingPrice || p.price,
              category: productData.category || p.category,
              sellingPrice: productData.sellingPrice || p.sellingPrice,
              cost: productData.cost || p.cost,
              alertThreshold: productData.alertThreshold || p.alertThreshold,
              profit: (productData.sellingPrice || p.sellingPrice) - (productData.cost || p.cost),
              profitMargin: Math.round((((productData.sellingPrice || p.sellingPrice) - (productData.cost || p.cost)) / (productData.sellingPrice || p.sellingPrice)) * 100 * 10) / 10,
              barcode: productData.barcode || p.barcode,
              supplier: productData.supplier || p.supplier,
              location: productData.location || p.location,
              description: productData.description || p.description,
              lastUpdated: new Date()
            }
          : p
      ))
      toast.success("Produit modifié avec succès")
    } catch (error) {
      toast.error("Erreur lors de la modification du produit")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleDeleteProduct = useCallback(async (productId: string) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setProducts(prev => prev.filter(p => p.id !== productId))
      toast.success("Produit supprimé avec succès")
    } catch (error) {
      toast.error("Erreur lors de la suppression du produit")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleStockMovement = useCallback(async (productId: string, type: 'in' | 'out' | 'adjustment', quantity: number, reason: string) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setProducts(prev => prev.map(product => {
        if (product.id === productId) {
          const newStock = type === 'in' 
            ? product.stock + quantity 
            : type === 'out' 
            ? Math.max(0, product.stock - quantity)
            : quantity
          
          return {
            ...product,
            stock: newStock,
            lastUpdated: new Date(),
            lastMovement: {
              type,
              quantity,
              date: new Date(),
              reason
            },
            movementHistory: [{
              id: `movement-${Date.now()}`,
              productId,
              type,
              quantity,
              date: new Date(),
              reason,
              user: "Utilisateur actuel"
            }, ...product.movementHistory]
          }
        }
        return product
      }))
      
      toast.success("Mouvement de stock enregistré avec succès")
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement du mouvement")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleBarcodeScanned = useCallback((barcode: string) => {
    const product = products.find(p => p.barcode === barcode)
    if (product) {
      setSelectedProduct(product)
      setIsMovementModalOpen(true)
      toast.success(`Produit trouvé: ${product.name}`)
    } else {
      toast.error("Produit non trouvé dans la base de données")
    }
  }, [products])

  const handleExportProducts = useCallback(() => {
    try {
      const csvContent = [
        "Nom,Stock,Seuil Minimum,Prix,Catégorie,Code-barres,Fournisseur,Emplacement",
        ...products.map(product => 
          `"${product.name}","${product.stock}","${product.minThreshold}","${product.price}","${product.category}","${product.barcode}","${product.supplier}","${product.location}"`
        )
      ].join('\n')
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `inventaire_${new Date().toISOString().split('T')[0]}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      toast.success("Export réussi")
    } catch (error) {
      toast.error("Erreur lors de l'export")
    }
  }, [products])

  const handleImportProducts = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const csv = e.target?.result as string
        const lines = csv.split('\n').slice(1)
        const importedProducts = lines
          .filter(line => line.trim())
          .map(line => {
            const [name, stock, minThreshold, price, category, barcode, supplier, location] = 
              line.split(',').map(field => field.replace(/"/g, ''))
            
            return createProduct({
              id: `imported-${Date.now()}-${Math.random()}`,
              name: name || "Produit importé",
              image: "/generic-product.png",
              stock: parseInt(stock) || 0,
              minThreshold: parseInt(minThreshold) || 10,
              price: parseInt(price) || 0,
              category: category || "Importé",
              lastUpdated: new Date(),
              barcode: barcode || "",
              supplier: supplier || "",
              location: location || "",
              description: "Produit importé"
            })
          })
        
        setProducts(prev => [...prev, ...importedProducts])
        toast.success(`${importedProducts.length} produits importés`)
      } catch (error) {
        toast.error("Erreur lors de l'import")
      }
    }
    reader.readAsText(file)
  }, [])

  const handleRefreshData = useCallback(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Données actualisées")
    }, 1000)
  }, [])

  const handleProductFound = useCallback((product: any) => {
    console.log("Produit trouvé via scanner:", product)
  }, [])

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className="space-y-6 mobile-container">
      {/* Mobile-First Header */}
      <div className="space-y-4">
        {/* Stats Cards - Mobile Optimized */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mobile-grid">
          <AnimatedCard className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
            <AnimatedCardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Valeur Totale</p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{stats.totalValue.toLocaleString()} F</p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-500" />
              </div>
            </AnimatedCardContent>
          </AnimatedCard>

          <AnimatedCard className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200 dark:border-green-800">
            <AnimatedCardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">Stock Total</p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300">{stats.totalStock}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-green-500" />
              </div>
            </AnimatedCardContent>
          </AnimatedCard>

          <AnimatedCard className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 border-orange-200 dark:border-orange-800">
            <AnimatedCardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Stock Faible</p>
                  <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">{stats.lowStockProducts}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-500" />
              </div>
            </AnimatedCardContent>
          </AnimatedCard>

          <AnimatedCard className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 border-red-200 dark:border-red-800">
            <AnimatedCardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600 dark:text-red-400">Rupture</p>
                  <p className="text-2xl font-bold text-red-700 dark:text-red-300">{stats.outOfStockProducts}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
            </AnimatedCardContent>
          </AnimatedCard>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 mobile-flex">
          <AnimatedButton
            variant="outline"
            size="sm"
            onClick={handleExportProducts}
            className="flex items-center gap-2"
            title="Exporter l'inventaire en CSV"
            animationType="shimmer"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Exporter</span>
            <span className="sm:hidden">Export</span>
          </AnimatedButton>
          
          <label htmlFor="import-file" className="cursor-pointer">
            <AnimatedButton
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              title="Importer des produits depuis un fichier CSV"
              animationType="scale"
            >
              <Upload className="h-4 w-4" />
              <span className="hidden sm:inline">Importer</span>
              <span className="sm:hidden">Import</span>
            </AnimatedButton>
            <input
              id="import-file"
              type="file"
              accept=".csv"
              onChange={handleImportProducts}
              className="hidden"
            />
          </label>
          
          <AnimatedButton
            variant="outline"
            size="sm"
            onClick={handleRefreshData}
            className="flex items-center gap-2"
            title="Actualiser les données"
            animationType="pulse"
            loading={isLoading}
          >
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Actualiser</span>
            <span className="sm:hidden">Refresh</span>
          </AnimatedButton>
        </div>

        {/* Search and Filters - Mobile Optimized */}
        <div className="space-y-3 mobile-space-y">
          <div className="flex flex-col sm:flex-row gap-2 mobile-flex">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher par nom, code-barres..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base mobile-text"
              />
            </div>
            <AnimatedButton
              variant="outline"
              size="icon"
              className="h-12 w-12 sm:w-auto sm:px-4"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              animationType="scale"
            >
              {viewMode === "grid" ? <BarChart3 className="h-5 w-5" /> : <Package className="h-5 w-5" />}
              <span className="hidden sm:inline ml-2">Vue</span>
            </AnimatedButton>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 mobile-tabs">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-28 sm:w-32 h-10 text-xs sm:text-sm">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger className="w-28 sm:w-32 h-10 text-xs sm:text-sm">
                <SelectValue placeholder="Stock" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="low">Faible</SelectItem>
                <SelectItem value="out">Rupture</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-28 sm:w-32 h-10 text-xs sm:text-sm">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nom</SelectItem>
                <SelectItem value="stock">Stock</SelectItem>
                <SelectItem value="price">Prix</SelectItem>
                <SelectItem value="category">Catégorie</SelectItem>
                <SelectItem value="lastUpdated">MAJ</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 mobile-flex">
            <AnimatedButton
              variant={showLowStock ? "default" : "outline"}
              size="sm"
              onClick={() => setShowLowStock(!showLowStock)}
              className="flex items-center gap-2 flex-1 sm:flex-none mobile-button"
              animationType="ripple"
            >
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">Stock Faible</span>
              <span className="sm:hidden">Faible</span>
            </AnimatedButton>
            <AnimatedButton
              variant={showOutOfStock ? "default" : "outline"}
              size="sm"
              onClick={() => setShowOutOfStock(!showOutOfStock)}
              className="flex items-center gap-2 flex-1 sm:flex-none mobile-button"
              animationType="ripple"
            >
              <XCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Rupture</span>
              <span className="sm:hidden">Rupture</span>
            </AnimatedButton>
            <AnimatedButton
              variant="outline"
              size="sm"
              onClick={() => setIsBarcodeScannerOpen(true)}
              className="flex items-center gap-2 flex-1 sm:flex-none mobile-button"
              animationType="bounce"
            >
              <Package2 className="h-4 w-4" />
              <span className="hidden sm:inline">Scanner</span>
              <span className="sm:hidden">Scan</span>
            </AnimatedButton>
          </div>
        </div>
      </div>

      {/* Products Grid/List - Mobile Optimized */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mobile-grid" : "space-y-3 mobile-space-y"}>
        {filteredProducts.map((product) => {
          const stockStatus = getStockStatus(product)
          const StatusIcon = stockStatus.icon
          
          return (
            <AnimatedCard 
              key={product.id} 
              className={`mobile-card ${
                stockStatus.status === "out" ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20" :
                stockStatus.status === "low" ? "border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20" :
                "border-border bg-card"
              }`}
              animationType="lift"
            >
              <AnimatedCardContent className="p-4 mobile-card-content">
                <div className="flex items-start justify-between mb-3 mobile-flex">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-base mb-1 line-clamp-2 mobile-text">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2 mobile-text">{product.category}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <StatusIcon className={`h-4 w-4 ${stockStatus.color}`} />
                      <span className={`text-sm font-medium ${stockStatus.color}`}>
                        {product.stock} en stock
                      </span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {product.stock <= product.alertThreshold ? "Faible" : "Normal"}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Prix:</span>
                    <span className="font-medium">{product.price.toLocaleString()} F</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Seuil:</span>
                    <span className="font-medium">{product.alertThreshold}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Dernière MAJ:</span>
                    <span className="font-medium">{formatDate(product.lastUpdated)}</span>
                  </div>
                </div>

                {product.lastMovement && (
                  <div className="mb-4 p-2 bg-muted/50 rounded-md">
                    <p className="text-xs text-muted-foreground mb-1">Dernier mouvement:</p>
                    <p className="text-sm">
                      {product.lastMovement.type === 'in' ? 'Entrée' : 
                       product.lastMovement.type === 'out' ? 'Sortie' : 'Ajustement'} 
                      de {product.lastMovement.quantity} - {product.lastMovement.reason}
                    </p>
                  </div>
                )}

                {/* Action Buttons - Mobile Optimized */}
                <div className="flex gap-2">
                  <AnimatedButton
                    variant="outline"
                    size="sm"
                    className="flex-1 h-10"
                    onClick={() => {
                      setSelectedProduct(product)
                      setIsMovementModalOpen(true)
                    }}
                    animationType="ripple"
                  >
                    <Package2 className="h-4 w-4 mr-1" />
                    Mouvement
                  </AnimatedButton>
                  <AnimatedButton
                    variant="outline"
                    size="sm"
                    className="h-10 w-10 p-0"
                    onClick={() => {
                      setSelectedProduct(product)
                      setIsEditProductOpen(true)
                    }}
                    title="Modifier le produit"
                    animationType="scale"
                  >
                    <Edit className="h-4 w-4" />
                  </AnimatedButton>
                  <AnimatedButton
                    variant="outline"
                    size="sm"
                    className="h-10 w-10 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      setSelectedProduct(product)
                      setIsDeleteProductOpen(true)
                    }}
                    title="Supprimer le produit"
                    animationType="shake"
                  >
                    <Trash2 className="h-4 w-4" />
                  </AnimatedButton>
                </div>
              </AnimatedCardContent>
            </AnimatedCard>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <AnimatedCard>
          <AnimatedCardContent className="p-8 text-center">
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucun produit trouvé</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "Aucun produit ne correspond à votre recherche" : "Commencez par ajouter des produits à votre inventaire"}
            </p>
            <AnimatedButton onClick={() => setIsAddProductOpen(true)} animationType="bounce">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un produit
            </AnimatedButton>
          </AnimatedCardContent>
        </AnimatedCard>
      )}

      {/* Add Product Button - Floating on Mobile - Only show when there are products */}
      {filteredProducts.length > 0 && (
        <div className="fixed bottom-20 right-4 z-50 sm:relative sm:bottom-auto sm:right-auto">
          <AnimatedButton
            size="lg"
            className="h-14 w-14 rounded-full shadow-lg sm:h-auto sm:w-auto sm:rounded-md"
            onClick={() => setIsAddProductOpen(true)}
            animationType="bounce"
          >
            <Plus className="h-6 w-6 sm:mr-2" />
            <span className="hidden sm:inline">Ajouter Produit</span>
          </AnimatedButton>
        </div>
      )}

      {/* Add Product Modal */}
      <ProductModal
        isOpen={isAddProductOpen}
        onOpenChange={setIsAddProductOpen}
        onSave={handleAddProduct}
      />

      {/* Edit Product Modal */}
      <ProductModal
        isOpen={isEditProductOpen}
        onOpenChange={setIsEditProductOpen}
        onSave={handleEditProduct}
        product={selectedProduct}
      />

      {/* Delete Product Confirmation Modal */}
      <Dialog open={isDeleteProductOpen} onOpenChange={setIsDeleteProductOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Supprimer le produit</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Êtes-vous sûr de vouloir supprimer le produit <strong>{selectedProduct?.name}</strong> ? 
              Cette action est irréversible.
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsDeleteProductOpen(false)}
              >
                Annuler
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => {
                  if (selectedProduct) {
                    handleDeleteProduct(selectedProduct.id)
                    setIsDeleteProductOpen(false)
                    setSelectedProduct(null)
                  }
                }}
              >
                Supprimer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Barcode Scanner */}
      <BarcodeScanner
        isOpen={isBarcodeScannerOpen}
        onClose={() => setIsBarcodeScannerOpen(false)}
        onBarcodeScanned={handleBarcodeScanned}
        onProductFound={handleProductFound}
      />

      {/* Stock Movement Modal */}
      <Dialog open={isMovementModalOpen} onOpenChange={setIsMovementModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Mouvement de Stock</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4">
              <div>
                <Label>Produit: {selectedProduct.name}</Label>
                <p className="text-sm text-muted-foreground">Stock actuel: {selectedProduct.stock}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsMovementModalOpen(false)}
                >
                  Annuler
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    // Handle movement
                    setIsMovementModalOpen(false)
                  }}
                >
                  Confirmer
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
