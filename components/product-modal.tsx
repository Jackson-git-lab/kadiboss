"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, Package, DollarSign, TrendingUp, AlertTriangle, Hash } from "lucide-react"
import { toast } from "sonner"

const productSchema = z.object({
  name: z.string().min(1, "Le nom du produit est requis").min(2, "Le nom doit contenir au moins 2 caractères"),
  sellingPrice: z.number().min(0, "Le prix de vente doit être positif").max(1000000, "Le prix de vente ne peut pas dépasser 1,000,000 F"),
  cost: z.number().min(0, "Le coût doit être positif").max(1000000, "Le coût ne peut pas dépasser 1,000,000 F"),
  stock: z.number().min(0, "La quantité en stock doit être positive").max(100000, "La quantité ne peut pas dépasser 100,000"),
  alertThreshold: z.number().min(0, "Le seuil d'alerte doit être positif").max(100000, "Le seuil d'alerte ne peut pas dépasser 100,000"),
  category: z.string().min(1, "La catégorie est requise").min(2, "La catégorie doit contenir au moins 2 caractères"),
  description: z.string().optional(),
})

type ProductFormData = z.infer<typeof productSchema>

interface Product {
  id: string
  name: string
  sellingPrice: number
  cost: number
  stock: number
  alertThreshold: number
  category: string
  description?: string
  image?: string
  profit: number
  profitMargin: number
}

interface ProductModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  product?: Product | null
  onSave: (product: Product) => void
  trigger?: React.ReactNode
}

const categories = [
  "Boissons",
  "Boulangerie",
  "Produits laitiers",
  "Céréales",
  "Condiments",
  "Hygiène",
  "Épicerie",
  "Fruits et légumes",
  "Viandes",
  "Poissons",
  "Autres"
]

export function ProductModal({ isOpen, onOpenChange, product, onSave, trigger }: ProductModalProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(product?.image || null)
  const [isImageUploading, setIsImageUploading] = useState(false)

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      sellingPrice: product?.sellingPrice || 0,
      cost: product?.cost || 0,
      stock: product?.stock || 0,
      alertThreshold: product?.alertThreshold || 0,
      category: product?.category || "",
      description: product?.description || "",
    },
  })

  const watchedValues = form.watch()
  const profit = watchedValues.sellingPrice - watchedValues.cost
  const profitMargin = watchedValues.sellingPrice > 0 ? (profit / watchedValues.sellingPrice) * 100 : 0

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsImageUploading(true)
      
      // Simulate image upload
      setTimeout(() => {
        const reader = new FileReader()
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string)
          setIsImageUploading(false)
        }
        reader.readAsDataURL(file)
      }, 1000)
    }
  }

  const handleRemoveImage = () => {
    setImagePreview(null)
  }

  const onSubmit = (data: ProductFormData) => {
    const productData: Product = {
      id: product?.id || `product-${Date.now()}`,
      name: data.name,
      sellingPrice: data.sellingPrice,
      cost: data.cost,
      stock: data.stock,
      alertThreshold: data.alertThreshold,
      category: data.category,
      description: data.description,
      image: imagePreview || undefined,
      profit: profit,
      profitMargin: profitMargin,
    }

    onSave(productData)
    
    const action = product ? "modifié" : "ajouté"
    toast.success(`Produit ${action} avec succès`)
    
    // Reset form if adding new product
    if (!product) {
      form.reset()
      setImagePreview(null)
    }
    
    onOpenChange(false)
  }

  const handleCancel = () => {
    form.reset()
    setImagePreview(null)
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="bg-card border-border max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground text-xl flex items-center gap-2">
            <Package className="h-5 w-5" />
            {product ? "Modifier le Produit" : "Nouveau Produit"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Image Upload Section */}
            <div className="space-y-4">
              <Label className="text-foreground font-medium">Image du Produit</Label>
              <div className="flex items-center gap-4">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-24 h-24 rounded-lg object-cover border border-border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                      onClick={handleRemoveImage}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted/20">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
                
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isImageUploading}
                    className="hidden"
                    id="image-upload"
                  />
                  <Label
                    htmlFor="image-upload"
                    className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    {isImageUploading ? "Upload en cours..." : "Choisir une image"}
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG, JPEG jusqu'à 5MB
                  </p>
                </div>
              </div>
            </div>

            {/* Product Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="text-foreground font-medium flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Nom du Produit *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Coca-Cola 33cl"
                        className="h-12 text-base bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Selling Price */}
              <FormField
                control={form.control}
                name="sellingPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Prix de Vente (F CFA) *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Ex: 500"
                        className="h-12 text-base bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Cost */}
              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Coût (F CFA) *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Ex: 350"
                        className="h-12 text-base bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Stock Quantity */}
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium flex items-center gap-2">
                      <Hash className="h-4 w-4" />
                      Quantité en Stock *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Ex: 50"
                        className="h-12 text-base bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Alert Threshold */}
              <FormField
                control={form.control}
                name="alertThreshold"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Seuil d'Alerte *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Ex: 10"
                        className="h-12 text-base bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="text-foreground font-medium">Catégorie *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Boissons"
                        className="h-12 text-base bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="text-foreground font-medium">Description (optionnel)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Boisson gazeuse rafraîchissante"
                        className="h-12 text-base bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Profit Information */}
            {(watchedValues.sellingPrice > 0 || watchedValues.cost > 0) && (
              <Card className="bg-muted/20 border-border">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-foreground mb-3">Calcul de Profit</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Profit par unité:</span>
                      <span className="ml-2 font-medium text-foreground">
                        {profit.toLocaleString()} F
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Marge de profit:</span>
                      <span className={`ml-2 font-medium ${profitMargin >= 0 ? 'text-success' : 'text-destructive'}`}>
                        {profitMargin.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-12 bg-transparent"
                onClick={handleCancel}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}




