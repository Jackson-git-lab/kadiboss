"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Printer, 
  Share2, 
  Download, 
  MessageCircle, 
  Store, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  Hash,
  Package,
  DollarSign
} from "lucide-react"
import { toast } from "sonner"

interface ReceiptItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

interface ReceiptProps {
  receiptNumber: string
  date: Date
  items: ReceiptItem[]
  paymentMethod: "cash" | "wave" | "bank_transfer" | "check"
  customerName?: string
  customerPhone?: string
  subtotal?: number
  tax?: number
  discount?: number
  grandTotal: number
  businessInfo?: {
    name: string
    address: string
    phone: string
    email: string
  }
  className?: string
}

const defaultBusinessInfo = {
  name: "KadiBoss",
  address: "Abidjan, Côte d'Ivoire",
  phone: "+225 XX XX XX XX XX",
  email: "contact@kadiboss.app"
}

const paymentMethodLabels = {
  cash: "Espèces",
  wave: "Wave",
  bank_transfer: "Virement",
  check: "Chèque"
}

export function Receipt({ 
  receiptNumber, 
  date, 
  items, 
  paymentMethod, 
  customerName,
  customerPhone,
  subtotal,
  tax,
  discount,
  grandTotal,
  businessInfo = defaultBusinessInfo,
  className = ""
}: ReceiptProps) {
  const [isPrinting, setIsPrinting] = useState(false)

  const formatAmount = (amount: number) => {
    return `${amount.toLocaleString()} F`
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const calculateSubtotal = () => {
    if (subtotal !== undefined) return subtotal
    return items.reduce((sum, item) => sum + item.total, 0)
  }

  const calculateTaxAmount = () => {
    if (tax !== undefined) return tax
    return 0 // Pas de taxe par défaut
  }

  const calculateDiscountAmount = () => {
    if (discount !== undefined) return discount
    return 0 // Pas de remise par défaut
  }

  const finalSubtotal = calculateSubtotal()
  const taxAmount = calculateTaxAmount()
  const discountAmount = calculateDiscountAmount()
  const calculatedTotal = finalSubtotal + taxAmount - discountAmount

  const handlePrint = () => {
    setIsPrinting(true)
    window.print()
    setTimeout(() => setIsPrinting(false), 1000)
    toast.success("Impression lancée")
  }

  const handleDownload = () => {
    // Simulate download
    toast.success("Téléchargement du reçu")
  }

  const handleShareWhatsApp = () => {
    const message = `Bonjour ! Voici votre reçu KadiBoss :

📋 Reçu #${receiptNumber}
📅 Date: ${formatDate(date)}
💰 Total: ${formatAmount(grandTotal)}
💳 Paiement: ${paymentMethodLabels[paymentMethod]}

Merci pour votre achat ! 🛍️

KadiBoss - Votre partenaire commerce`

    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    toast.success("Ouverture de WhatsApp")
  }

  return (
    <div className={`bg-white text-black ${className}`}>
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .receipt-print, .receipt-print * {
            visibility: visible;
          }
          .receipt-print {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            color: black !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Action Buttons - Hidden in Print */}
      <div className="no-print flex gap-2 mb-4 p-4 bg-muted/20 rounded-lg">
        <Button
          onClick={handlePrint}
          disabled={isPrinting}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Printer className="h-4 w-4 mr-2" />
          {isPrinting ? "Impression..." : "Imprimer"}
        </Button>
        <Button
          onClick={handleDownload}
          variant="outline"
          className="border-border"
        >
          <Download className="h-4 w-4 mr-2" />
          Télécharger
        </Button>
        <Button
          onClick={handleShareWhatsApp}
          className="bg-whatsapp hover:bg-whatsapp/90 text-white"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Partager sur WhatsApp
        </Button>
      </div>

      {/* Receipt Content */}
      <Card className="receipt-print border-2 border-gray-300 shadow-lg">
        <CardContent className="p-6 space-y-6">
          {/* Header */}
          <div className="text-center border-b-2 border-gray-300 pb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Store className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-gray-900">{businessInfo.name}</h1>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex items-center justify-center gap-1">
                <MapPin className="h-4 w-4" />
                {businessInfo.address}
              </div>
              <div className="flex items-center justify-center gap-1">
                <Phone className="h-4 w-4" />
                {businessInfo.phone}
              </div>
              <div className="flex items-center justify-center gap-1">
                <Mail className="h-4 w-4" />
                {businessInfo.email}
              </div>
            </div>
          </div>

          {/* Receipt Info */}
          <div className="flex justify-between items-center border-b border-gray-200 pb-3">
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-600">Reçu #</span>
              <span className="font-semibold text-gray-900">{receiptNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-600">{formatDate(date)}</span>
            </div>
          </div>

          {/* Customer Info */}
          {(customerName || customerPhone) && (
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Client</h3>
              <div className="text-sm text-gray-600 space-y-1">
                {customerName && <div>Nom: {customerName}</div>}
                {customerPhone && <div>Téléphone: {customerPhone}</div>}
              </div>
            </div>
          )}

          {/* Items Table */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-2 text-sm font-semibold text-gray-700">
                <div className="col-span-6">Description</div>
                <div className="col-span-2 text-center">Qté</div>
                <div className="col-span-2 text-right">Prix</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {items.map((item, index) => (
                <div key={item.id || index} className="px-4 py-3">
                  <div className="grid grid-cols-12 gap-2 text-sm">
                    <div className="col-span-6 text-gray-900 font-medium">
                      {item.description}
                    </div>
                    <div className="col-span-2 text-center text-gray-600">
                      {item.quantity}
                    </div>
                    <div className="col-span-2 text-right text-gray-600">
                      {formatAmount(item.unitPrice)}
                    </div>
                    <div className="col-span-2 text-right text-gray-900 font-semibold">
                      {formatAmount(item.total)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="space-y-2">
            {subtotal !== undefined && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Sous-total:</span>
                <span className="text-gray-900">{formatAmount(finalSubtotal)}</span>
              </div>
            )}
            
            {taxAmount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Taxe:</span>
                <span className="text-gray-900">{formatAmount(taxAmount)}</span>
              </div>
            )}
            
            {discountAmount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Remise:</span>
                <span className="text-green-600">-{formatAmount(discountAmount)}</span>
              </div>
            )}
            
            <div className="border-t-2 border-gray-300 pt-2">
              <div className="flex justify-between text-lg font-bold">
                <span className="text-gray-900">Total:</span>
                <span className="text-gray-900">{formatAmount(grandTotal)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Méthode de paiement:</span>
              <Badge variant="outline" className="border-gray-300 text-gray-700">
                <DollarSign className="h-3 w-3 mr-1" />
                {paymentMethodLabels[paymentMethod]}
              </Badge>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500 border-t border-gray-200 pt-4">
            <p>Merci pour votre achat !</p>
            <p className="mt-1">KadiBoss - Votre partenaire commerce</p>
            <p className="mt-1">Reçu généré le {formatDate(new Date())}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}