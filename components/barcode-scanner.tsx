"use client"

import { useState, useRef, useEffect } from "react"
import { 
  Camera, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Search, 
  Package, 
  Plus,
  Zap,
  RotateCcw,
  Flashlight,
  FlashlightOff
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"

interface BarcodeScannerProps {
  isOpen: boolean
  onClose: () => void
  onBarcodeScanned: (barcode: string) => void
  onProductFound?: (product: any) => void
}

interface Product {
  id: string
  name: string
  barcode: string
  stock: number
  price: number
  category: string
  image?: string
}

// Mock products database
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Coca-Cola Classic 33cl",
    barcode: "1234567890123",
    stock: 45,
    price: 500,
    category: "Boissons",
    image: "/classic-coca-cola.png"
  },
  {
    id: "2",
    name: "Pain de Mie",
    barcode: "1234567890124",
    stock: 8,
    price: 750,
    category: "Boulangerie",
    image: "/rustic-bread-loaf.png"
  },
  {
    id: "3",
    name: "Lait Frais 1L",
    barcode: "1234567890125",
    stock: 25,
    price: 1200,
    category: "Produits laitiers",
    image: "/milk-carton.png"
  },
  {
    id: "4",
    name: "Riz Parfumé 5kg",
    barcode: "1234567890126",
    stock: 3,
    price: 4500,
    category: "Céréales",
    image: "/rice-bag.png"
  },
  {
    id: "5",
    name: "Huile de Cuisine 1L",
    barcode: "1234567890127",
    stock: 12,
    price: 2800,
    category: "Condiments",
    image: "/cooking-oil-bottle.png"
  }
]

export function BarcodeScanner({ isOpen, onClose, onBarcodeScanned, onProductFound }: BarcodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [scannedBarcode, setScannedBarcode] = useState("")
  const [foundProduct, setFoundProduct] = useState<Product | null>(null)
  const [manualBarcode, setManualBarcode] = useState("")
  const [isFlashOn, setIsFlashOn] = useState(false)
  const [scanMode, setScanMode] = useState<'camera' | 'manual'>('camera')
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Initialize camera
  useEffect(() => {
    if (isOpen && scanMode === 'camera') {
      startCamera()
    } else {
      stopCamera()
    }

    return () => {
      stopCamera()
    }
  }, [isOpen, scanMode])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsScanning(true)
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
      toast.error("Impossible d'accéder à la caméra")
      setScanMode('manual')
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setIsScanning(false)
  }

  const toggleFlash = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0]
      if (videoTrack && 'getCapabilities' in videoTrack) {
        const capabilities = videoTrack.getCapabilities() as any
        if (capabilities.torch) {
          videoTrack.applyConstraints({ advanced: [{ torch: !isFlashOn }] } as any)
          setIsFlashOn(!isFlashOn)
        }
      }
    }
  }

  const handleBarcodeDetected = (barcode: string) => {
    setScannedBarcode(barcode)
    onBarcodeScanned(barcode)
    
    // Find product in database
    const product = mockProducts.find(p => p.barcode === barcode)
    if (product) {
      setFoundProduct(product)
      onProductFound?.(product)
      toast.success(`Produit trouvé: ${product.name}`)
    } else {
      toast.error("Produit non trouvé dans la base de données")
    }
  }

  const handleManualScan = () => {
    if (manualBarcode.trim()) {
      handleBarcodeDetected(manualBarcode.trim())
      setManualBarcode("")
    }
  }

  const simulateScan = () => {
    // Simulate scanning a random product
    const randomProduct = mockProducts[Math.floor(Math.random() * mockProducts.length)]
    handleBarcodeDetected(randomProduct.barcode)
  }

  const resetScanner = () => {
    setScannedBarcode("")
    setFoundProduct(null)
    setManualBarcode("")
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' F'
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Scanner de Code-barres
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Scan Mode Toggle */}
          <div className="flex gap-2">
            <Button
              variant={scanMode === 'camera' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setScanMode('camera')}
              className="flex-1"
            >
              <Camera className="h-4 w-4 mr-2" />
              Caméra
            </Button>
            <Button
              variant={scanMode === 'manual' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setScanMode('manual')}
              className="flex-1"
            >
              <Search className="h-4 w-4 mr-2" />
              Manuel
            </Button>
          </div>

          {/* Camera View */}
          {scanMode === 'camera' && (
            <div className="relative">
              <div className="relative bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-64 object-cover"
                />
                
                {/* Scanning Overlay */}
                {isScanning && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-32 border-2 border-white rounded-lg relative">
                      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-500 rounded-tl-lg" />
                      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-500 rounded-tr-lg" />
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-500 rounded-bl-lg" />
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-500 rounded-br-lg" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-0.5 bg-blue-500 animate-pulse" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Camera Controls */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={toggleFlash}
                    className="h-8 w-8"
                  >
                    {isFlashOn ? <FlashlightOff className="h-4 w-4" /> : <Flashlight className="h-4 w-4" />}
                  </Button>
                </div>

                {/* Simulate Button for Demo */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <Button
                    onClick={simulateScan}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Simuler Scan
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Manual Input */}
          {scanMode === 'manual' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Code-barres</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Entrez le code-barres..."
                    value={manualBarcode}
                    onChange={(e) => setManualBarcode(e.target.value)}
                    className="flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && handleManualScan()}
                  />
                  <Button onClick={handleManualScan} disabled={!manualBarcode.trim()}>
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Scanned Result */}
          {scannedBarcode && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">Code scanné</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetScanner}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Code-barres</p>
                    <p className="font-mono text-lg">{scannedBarcode}</p>
                  </div>

                  {foundProduct ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="font-medium text-green-700">Produit trouvé</span>
                      </div>
                      
                      <div className="p-4 border border-green-200 bg-green-50 dark:bg-green-950/20 rounded-lg">
                        <div className="flex items-start gap-3">
                          {foundProduct.image && (
                            <img 
                              src={foundProduct.image} 
                              alt={foundProduct.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                          )}
                          <div className="flex-1">
                            <h5 className="font-semibold">{foundProduct.name}</h5>
                            <p className="text-sm text-muted-foreground">{foundProduct.category}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <div>
                                <p className="text-xs text-muted-foreground">Stock</p>
                                <p className="font-semibold">{foundProduct.stock} unités</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Prix</p>
                                <p className="font-semibold text-blue-600">{formatAmount(foundProduct.price)}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-orange-500" />
                        <span className="font-medium text-orange-700">Produit non trouvé</span>
                      </div>
                      
                      <div className="p-4 border border-orange-200 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                        <p className="text-sm text-orange-700 mb-3">
                          Ce produit n'existe pas dans votre base de données.
                        </p>
                        <Button size="sm" className="w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          Ajouter ce produit
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={resetScanner}
              className="flex-1"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Nouveau Scan
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Fermer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
