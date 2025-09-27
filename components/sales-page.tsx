"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, Download, Eye } from "lucide-react"

interface Sale {
  id: string
  customer: string
  amount: number
  date: string
  status: "completed" | "pending" | "cancelled"
  items: number
}

const mockSales: Sale[] = [
  {
    id: "1",
    customer: "Jean Kouassi",
    amount: 15000,
    date: "2024-01-15",
    status: "completed",
    items: 3
  },
  {
    id: "2",
    customer: "Marie Traoré",
    amount: 8500,
    date: "2024-01-15",
    status: "completed",
    items: 2
  },
  {
    id: "3",
    customer: "Paul Koné",
    amount: 25000,
    date: "2024-01-14",
    status: "pending",
    items: 5
  },
  {
    id: "4",
    customer: "Fatou Diabaté",
    amount: 12000,
    date: "2024-01-14",
    status: "completed",
    items: 4
  }
]

export function SalesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sales] = useState<Sale[]>(mockSales)

  const filteredSales = sales.filter(sale =>
    sale.customer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="default" className="bg-green-100 text-green-800">Terminée</Badge>
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">En attente</Badge>
      case "cancelled":
        return <Badge variant="destructive">Annulée</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' F'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR')
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Rechercher une vente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtrer
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle Vente
          </Button>
        </div>
      </div>

      {/* Sales List */}
      <div className="space-y-4">
        {filteredSales.map((sale) => (
          <Card key={sale.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{sale.customer}</h3>
                    {getStatusBadge(sale.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {sale.items} article(s) • {formatDate(sale.date)}
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-lg font-bold text-primary">
                    {formatAmount(sale.amount)}
                  </p>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Voir
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSales.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Aucune vente trouvée</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}