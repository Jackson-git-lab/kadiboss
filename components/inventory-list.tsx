"use client"

import { useState } from "react"
import { Search, Filter, Package, Plus, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ProductModal } from "@/components/product-modal"
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
}

// Helper function to create product with all required properties
const createProduct = (product: Omit<Product, 'sellingPrice' | 'cost' | 'alertThreshold' | 'profit' | 'profitMargin'>): Product => {
  const sellingPrice = product.price
  const cost = Math.round(product.price * 0.7) // 70% of selling price
  const profit = sellingPrice - cost
  const profitMargin = Math.round((profit / sellingPrice) * 100 * 10) / 10 // Round to 1 decimal
  
  return {
    ...product,
    sellingPrice,
    cost,
    alertThreshold: product.minThreshold,
    profit,
    profitMargin,
  }
}

const mockProducts: Product[] = [
  createProduct({
    id: "1",
    name: "Coca-Cola Classic 33cl",
    image: "/classic-coca-cola.png",
    stock: 45,
    minThreshold: 20,
    price: 500,
    category: "Boissons",
    lastUpdated: new Date(),
  }),
  createProduct({
    id: "2",
    name: "Pain de Mie",
    image: "/rustic-bread-loaf.png",
    stock: 8,
    minThreshold: 15,
    price: 750,
    category: "Boulangerie",
    lastUpdated: new Date(),
  }),
  createProduct({
    id: "3",
    name: "Lait Frais 1L",
    image: "/milk-carton.png",
    stock: 25,
    minThreshold: 10,
    price: 1200,
    category: "Produits laitiers",
    lastUpdated: new Date(),
  }),
  createProduct({
    id: "4",
    name: "Riz Parfumé 5kg",
    image: "/rice-bag.png",
    stock: 3,
    minThreshold: 5,
    price: 4500,
    category: "Céréales",
    lastUpdated: new Date(),
  }),
  createProduct({
    id: "5",
    name: "Huile de Cuisine 1L",
    image: "/cooking-oil-bottle.png",
    stock: 12,
    minThreshold: 8,
    price: 2800,
    category: "Condiments",
    lastUpdated: new Date(),
  }),
  createProduct({
    id: "6",
    name: "Savon de Marseille",
    image: "/soap-bar.png",
    stock: 0,
    minThreshold: 10,
    price: 650,
    category: "Hygiène",
    lastUpdated: new Date(),
  }),
  createProduct({
    id: "7",
    name: "Eau Minérale 1.5L",
    image: "/generic-product.png",
    stock: 35,
    minThreshold: 20,
    price: 300,
    category: "Boissons",
    lastUpdated: new Date(),
  }),
  createProduct({
    id: "8",
    name: "Sucre en Poudre 1kg",
    image: "/generic-product.png",
    stock: 15,
    minThreshold: 10,
    price: 800,
    category: "Condiments",
    lastUpdated: new Date(),
  }),
  createProduct({
    id: "9",
    name: "Café Instantané",
    image: "/generic-product.png",
    stock: 5,
    minThreshold: 8,
    price: 1500,
    category: "Boissons",
    lastUpdated: new Date(),
  }),
  createProduct({
    id: "10",
    name: "Thé Lipton",
    image: "/generic-product.png",
    stock: 22,
    minThreshold: 15,
    price: 600,
    category: "Boissons",
    lastUpdated: new Date(),
  }),
]

export function InventoryList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showLowStockOnly, setShowLowStockOnly] = useState(false)
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = showLowStockOnly ? product.stock <= product.minThreshold : true
    return matchesSearch && matchesFilter
  })

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} F`
  }

  const handleSaveProduct = (productData: any) => {
    // In a real app, you would save to your state/database here
    console.log("Produit sauvegardé:", productData)
    toast.success(`${productData.name} sauvegardé avec succès`)
    setIsAddProductOpen(false)
    setEditingProduct(null)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setIsAddProductOpen(true)
  }

  const getStockStatus = (stock: number, minThreshold: number) => {
    if (stock === 0) return { status: "Rupture", color: "destructive", icon: XCircle }
    if (stock <= minThreshold) return { status: "Stock Faible", color: "destructive", icon: AlertTriangle }
    return { status: "En Stock", color: "default", icon: CheckCircle }
  }

  const lowStockCount = mockProducts.filter(p => p.stock <= p.minThreshold).length

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-12 text-base bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Filter and Stats */}
        <div className="flex items-center justify-between gap-3">
          <Button
            variant={showLowStockOnly ? "default" : "outline"}
            size="sm"
            onClick={() => setShowLowStockOnly(!showLowStockOnly)}
            className="flex items-center gap-2 h-10"
          >
            <Filter className="h-4 w-4" />
            Stock Faible
            {lowStockCount > 0 && (
              <Badge variant="destructive" className="ml-1">
                {lowStockCount}
              </Badge>
            )}
          </Button>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-sm">
              {filteredProducts.length} produit{filteredProducts.length !== 1 ? "s" : ""}
            </Badge>
            {lowStockCount > 0 && (
              <Badge variant="destructive" className="text-sm">
                {lowStockCount} en stock faible
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredProducts.map((product) => {
          const stockStatus = getStockStatus(product.stock, product.minThreshold)
          const StatusIcon = stockStatus.icon

          return (
            <Card 
              key={product.id} 
              className={`bg-card border-border hover:bg-accent/50 transition-all duration-200 hover:shadow-md hover-isolated ${
                product.stock <= product.minThreshold ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {/* Product Image */}
                  <div className="w-16 h-16 rounded-xl bg-muted/20 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.image || "/generic-product.png"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = "none"
                        target.nextElementSibling?.classList.remove("hidden")
                      }}
                    />
                    <Package className="h-8 w-8 text-muted-foreground hidden" />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground text-base leading-tight mb-1">
                          {product.name}
                        </h3>
                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-1">
                          {formatPrice(product.price)}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {product.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Seuil: {product.minThreshold}
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditProduct(product)}
                          className="mt-2 h-8"
                        >
                          Modifier
                        </Button>
                      </div>

                      {/* Stock Status */}
                      <div className="flex flex-col items-end gap-2">
                        <Badge 
                          variant={stockStatus.color as any} 
                          className="flex items-center gap-1 text-xs font-medium"
                        >
                          <StatusIcon className="h-3 w-3" />
                          {stockStatus.status}
                        </Badge>
                        <div className="text-right">
                          <span className="text-lg font-bold text-foreground">
                            {product.stock}
                          </span>
                          <span className="text-sm text-muted-foreground ml-1">
                            unités
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Package className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {searchTerm ? "Aucun produit trouvé" : "Aucun produit en inventaire"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm 
                ? "Essayez un autre terme de recherche" 
                : "Commencez par ajouter votre premier produit"
              }
            </p>
            {!searchTerm && (
              <Button 
                onClick={() => {
                  setEditingProduct(null)
                  setIsAddProductOpen(true)
                }}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un produit
              </Button>
            )}
          </div>
        )}
      </div>

      {/* FAB for New Product */}
      <Button
        size="lg"
        className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 h-14 w-14 rounded-full shadow-xl bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-background"
        onClick={() => {
          setEditingProduct(null)
          setIsAddProductOpen(true)
        }}
      >
        <Plus className="h-6 w-6" />
      </Button>

      {/* Product Modal */}
      <ProductModal
        isOpen={isAddProductOpen}
        onOpenChange={setIsAddProductOpen}
        product={editingProduct}
        onSave={handleSaveProduct}
      />
    </div>
  )
}
