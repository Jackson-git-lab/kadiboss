"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Search, Plus, Phone, MessageCircle, AlertTriangle, CheckCircle, User, Mail, Calendar, DollarSign, Loader2, X, ChevronDown, ChevronUp, Download, Upload, Edit, Trash2, MoreVertical, Filter, ChevronLeft, ChevronRight, CheckSquare, Square } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AnimatedButton } from "@/components/ui/animated-button"
import { AnimatedCard, AnimatedCardContent } from "@/components/ui/animated-card"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PaymentSlideOver } from "@/components/payment-slide-over"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { toast } from "sonner"

interface Customer {
  id: string
  name: string
  phone: string
  email?: string
  amountOwed: number
  lastPayment?: Date
  lastContact?: Date
  lastPurchase: string
  status: "active" | "inactive" | "blocked"
  totalPurchases: number
  creditLimit: number
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Jean Kouassi",
    phone: "+225 07 12 34 56 78",
    email: "jean.kouassi@email.com",
    amountOwed: 15000,
    lastPayment: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    lastContact: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    lastPurchase: "2024-01-15",
    status: "active",
    totalPurchases: 125000,
    creditLimit: 50000,
  },
  {
    id: "2",
    name: "Marie Traoré",
    phone: "+225 05 98 76 54 32",
    email: "marie.traore@email.com",
    amountOwed: 0,
    lastPayment: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    lastContact: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    lastPurchase: "2024-01-14",
    status: "active",
    totalPurchases: 89000,
    creditLimit: 30000,
  },
  {
    id: "3",
    name: "Paul Koné",
    phone: "+225 01 23 45 67 89",
    amountOwed: 35000,
    lastPayment: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
    lastContact: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    lastPurchase: "2024-01-13",
    status: "active",
    totalPurchases: 200000,
    creditLimit: 75000,
  },
  {
    id: "4",
    name: "Fatou Diabaté",
    phone: "+225 09 87 65 43 21",
    email: "fatou.diabate@email.com",
    amountOwed: 8500,
    lastPayment: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    lastContact: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    lastPurchase: "2024-01-12",
    status: "active",
    totalPurchases: 45000,
    creditLimit: 25000,
  },
  {
    id: "5",
    name: "Amadou Ouattara",
    phone: "+225 06 54 32 10 98",
    amountOwed: 0,
    lastPayment: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    lastContact: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    lastPurchase: "2024-01-11",
    status: "active",
    totalPurchases: 67000,
    creditLimit: 20000,
  },
  {
    id: "6",
    name: "Aïcha Cissé",
    phone: "+225 04 12 34 56 78",
    amountOwed: 120000,
    lastPayment: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    lastContact: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    lastPurchase: "2024-01-09",
    status: "blocked",
    totalPurchases: 300000,
    creditLimit: 100000,
  },
  {
    id: "7",
    name: "Moussa Sangaré",
    phone: "+225 08 76 54 32 10",
    amountOwed: 25000,
    lastPayment: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
    lastContact: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    lastPurchase: "2024-01-08",
    status: "active",
    totalPurchases: 180000,
    creditLimit: 60000,
  },
  {
    id: "8",
    name: "Kadiatou Keita",
    phone: "+225 03 21 43 65 87",
    email: "kadiatou.keita@email.com",
    amountOwed: 0,
    lastPayment: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    lastContact: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    lastPurchase: "2024-01-07",
    status: "active",
    totalPurchases: 95000,
    creditLimit: 35000,
  },
]

export function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
  const [searchTerm, setSearchTerm] = useState("")
  const [showDebtorsOnly, setShowDebtorsOnly] = useState(false)
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false)
  const [isEditCustomerOpen, setIsEditCustomerOpen] = useState(false)
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [sortBy, setSortBy] = useState<"name" | "debt" | "lastPayment">("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null)
  const [selectedCustomers, setSelectedCustomers] = useState<Set<string>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive" | "blocked">("all")
  const [debtRangeFilter, setDebtRangeFilter] = useState<"all" | "no-debt" | "low-debt" | "high-debt">("all")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null)
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    creditLimit: "",
  })
  const [editCustomer, setEditCustomer] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    creditLimit: "",
  })

  // Memoized filtered and sorted customers for performance
  const filteredCustomers = useMemo(() => {
    let filtered = customers.filter((customer) => {
      const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.phone.includes(searchTerm) ||
                           (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesDebtorFilter = showDebtorsOnly ? customer.amountOwed > 0 : true
      
      const matchesStatusFilter = statusFilter === "all" || customer.status === statusFilter
      
      const matchesDebtRangeFilter = (() => {
        switch (debtRangeFilter) {
          case "no-debt": return customer.amountOwed === 0
          case "low-debt": return customer.amountOwed > 0 && customer.amountOwed <= 10000
          case "high-debt": return customer.amountOwed > 10000
          default: return true
        }
      })()
      
      return matchesSearch && matchesDebtorFilter && matchesStatusFilter && matchesDebtRangeFilter
    })

    // Sort customers
    filtered.sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name)
          break
        case "debt":
          comparison = a.amountOwed - b.amountOwed
          break
        case "lastPayment":
          const aDate = a.lastPayment?.getTime() || 0
          const bDate = b.lastPayment?.getTime() || 0
          comparison = aDate - bDate
          break
      }
      return sortOrder === "asc" ? comparison : -comparison
    })

    return filtered
  }, [searchTerm, showDebtorsOnly, sortBy, sortOrder, statusFilter, debtRangeFilter])

  // Pagination logic
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, showDebtorsOnly, statusFilter, debtRangeFilter])

  // Load customers from localStorage on mount
  useEffect(() => {
    const savedCustomers = localStorage.getItem('kadiboss-customers')
    if (savedCustomers) {
      try {
        const parsedCustomers = JSON.parse(savedCustomers).map((customer: any) => ({
          ...customer,
          lastPayment: customer.lastPayment ? new Date(customer.lastPayment) : undefined,
          lastContact: customer.lastContact ? new Date(customer.lastContact) : undefined,
        }))
        setCustomers(parsedCustomers)
      } catch (error) {
        console.error('Error loading customers from localStorage:', error)
      }
    }
  }, [])

  // Save customers to localStorage whenever customers change
  useEffect(() => {
    localStorage.setItem('kadiboss-customers', JSON.stringify(customers))
  }, [customers])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + N: Add new customer
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault()
        setIsAddCustomerOpen(true)
      }
      
      // Ctrl/Cmd + E: Export data
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault()
        // Call exportToCSV directly without dependency
        const selectedCustomersData = selectedCustomers.size > 0 
          ? customers.filter(c => selectedCustomers.has(c.id))
          : filteredCustomers

        const csvContent = [
          ["Nom", "Téléphone", "Email", "Dette", "Statut", "Total Achats", "Limite Crédit", "Dernier Paiement"],
          ...selectedCustomersData.map(customer => [
            customer.name,
            customer.phone,
            customer.email || "",
            customer.amountOwed.toString(),
            customer.status,
            customer.totalPurchases.toString(),
            customer.creditLimit.toString(),
            customer.lastPayment ? customer.lastPayment.toLocaleDateString('fr-FR') : "Jamais"
          ])
        ].map(row => row.join(",")).join("\n")

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
        const link = document.createElement("a")
        const url = URL.createObjectURL(blob)
        link.setAttribute("href", url)
        link.setAttribute("download", `clients_${new Date().toISOString().split('T')[0]}.csv`)
        link.style.visibility = "hidden"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        toast.success("Export CSV réussi")
      }
      
      // Ctrl/Cmd + F: Focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault()
        const searchInput = document.querySelector('input[placeholder="Rechercher un client..."]') as HTMLInputElement
        searchInput?.focus()
      }
      
      // Escape: Close modals
      if (e.key === 'Escape') {
        setIsAddCustomerOpen(false)
        setIsEditCustomerOpen(false)
        setIsDeleteDialogOpen(false)
        setShowAdvancedFilters(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [customers, filteredCustomers, selectedCustomers])

  const formatAmount = (amount: number) => {
    return `${amount.toLocaleString()} F`
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    })
  }

  const getDaysSinceLastPayment = (lastPayment?: Date) => {
    if (!lastPayment) return "Jamais"
    const days = Math.floor((Date.now() - lastPayment.getTime()) / (1000 * 60 * 60 * 24))
    if (days === 0) return "Aujourd'hui"
    if (days === 1) return "Hier"
    return `Il y a ${days} jours`
  }

  const handleSendReminder = useCallback(async (customer: Customer) => {
    setIsLoading(true)
    try {
      const message = `Bonjour ${customer.name}, nous vous rappelons que vous avez une dette de ${formatAmount(customer.amountOwed)} envers notre entreprise. Merci de régulariser votre situation.`
      const whatsappUrl = `https://wa.me/${customer.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
      
      // Simulate API call delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank')
      
      toast.success(`Rappel envoyé à ${customer.name}`)
    } catch (error) {
      toast.error("Erreur lors de l'envoi du rappel")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleRecordPayment = useCallback((customerId: string, amountPaid: number, method: string) => {
    // In a real app, you would update the customer's debt in your database
    console.log("Paiement enregistré:", { customerId, amountPaid, method })
    
    // Update the customer's debt
    setCustomers(prev => prev.map(customer => 
      customer.id === customerId 
        ? { ...customer, amountOwed: Math.max(0, customer.amountOwed - amountPaid) }
        : customer
    ))
    
    const methodName = method === "cash" ? "Espèces" : "Wave"
    toast.success(`Paiement de ${amountPaid.toLocaleString()} F enregistré par ${methodName}`)
    
    setIsPaymentOpen(false)
    setSelectedCustomer(null)
  }, [])

  const handleOpenPayment = useCallback((customer: Customer) => {
    setSelectedCustomer(customer)
    setIsPaymentOpen(true)
  }, [])

  const handleAddCustomer = useCallback(async () => {
    if (newCustomer.name && newCustomer.phone) {
      setIsLoading(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const customer: Customer = {
          id: `customer-${Date.now()}`,
          name: newCustomer.name,
          phone: newCustomer.phone,
          email: newCustomer.email || undefined,
          amountOwed: 0,
          lastPurchase: new Date().toISOString().split('T')[0],
          status: "active",
          totalPurchases: 0,
          creditLimit: Number.parseInt(newCustomer.creditLimit) || 0,
        }
        
        console.log("Nouveau client ajouté:", customer)
        
        // Add the new customer to the state
        setCustomers(prev => [...prev, customer])
        
        toast.success(`${customer.name} ajouté à la liste des clients`)
        
        setNewCustomer({
          name: "",
          phone: "",
          email: "",
          creditLimit: "",
        })
        setIsAddCustomerOpen(false)
      } catch (error) {
        toast.error("Erreur lors de l'ajout du client")
      } finally {
        setIsLoading(false)
      }
    }
  }, [newCustomer])

  const handleSort = useCallback((field: "name" | "debt" | "lastPayment") => {
    if (sortBy === field) {
      setSortOrder(prev => prev === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }, [sortBy])

  const toggleCustomerExpansion = useCallback((customerId: string) => {
    setExpandedCustomer(prev => prev === customerId ? null : customerId)
  }, [])

  // Customer management functions
  const handleEditCustomer = useCallback((customer: Customer) => {
    setEditCustomer({
      id: customer.id,
      name: customer.name,
      phone: customer.phone,
      email: customer.email || "",
      creditLimit: customer.creditLimit.toString(),
    })
    setIsEditCustomerOpen(true)
  }, [])

  const handleUpdateCustomer = useCallback(async () => {
    if (editCustomer.name && editCustomer.phone) {
      setIsLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setCustomers(prev => prev.map(customer => 
          customer.id === editCustomer.id 
            ? {
                ...customer,
                name: editCustomer.name,
                phone: editCustomer.phone,
                email: editCustomer.email || undefined,
                creditLimit: Number.parseInt(editCustomer.creditLimit) || 0,
              }
            : customer
        ))
        
        toast.success("Client mis à jour avec succès")
        setIsEditCustomerOpen(false)
        setEditCustomer({ id: "", name: "", phone: "", email: "", creditLimit: "" })
      } catch (error) {
        toast.error("Erreur lors de la mise à jour du client")
      } finally {
        setIsLoading(false)
      }
    }
  }, [editCustomer])

  const handleDeleteCustomer = useCallback((customer: Customer) => {
    setCustomerToDelete(customer)
    setIsDeleteDialogOpen(true)
  }, [])

  const confirmDeleteCustomer = useCallback(async () => {
    if (customerToDelete) {
      setIsLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setCustomers(prev => prev.filter(customer => customer.id !== customerToDelete.id))
        toast.success(`${customerToDelete.name} supprimé avec succès`)
        setIsDeleteDialogOpen(false)
        setCustomerToDelete(null)
      } catch (error) {
        toast.error("Erreur lors de la suppression du client")
      } finally {
        setIsLoading(false)
      }
    }
  }, [customerToDelete])

  // Selection management
  const toggleCustomerSelection = useCallback((customerId: string) => {
    setSelectedCustomers(prev => {
      const newSet = new Set(prev)
      if (newSet.has(customerId)) {
        newSet.delete(customerId)
      } else {
        newSet.add(customerId)
      }
      return newSet
    })
  }, [])

  const selectAllCustomers = useCallback(() => {
    setSelectedCustomers(new Set(paginatedCustomers.map(c => c.id)))
  }, [paginatedCustomers])

  const clearSelection = useCallback(() => {
    setSelectedCustomers(new Set())
  }, [])

  // Export functions
  const exportToCSV = useCallback(() => {
    const selectedCustomersData = selectedCustomers.size > 0 
      ? customers.filter(c => selectedCustomers.has(c.id))
      : filteredCustomers

    const csvContent = [
      ["Nom", "Téléphone", "Email", "Dette", "Statut", "Total Achats", "Limite Crédit", "Dernier Paiement"],
      ...selectedCustomersData.map(customer => [
        customer.name,
        customer.phone,
        customer.email || "",
        customer.amountOwed.toString(),
        customer.status,
        customer.totalPurchases.toString(),
        customer.creditLimit.toString(),
        customer.lastPayment ? customer.lastPayment.toLocaleDateString('fr-FR') : "Jamais"
      ])
    ].map(row => row.join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `clients_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast.success("Export CSV réussi")
  }, [customers, filteredCustomers, selectedCustomers])

  // Pagination functions
  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }, [totalPages])

  const nextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }, [totalPages])

  const prevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }, [])

  const getDebtStatus = (amount: number) => {
    if (amount === 0) return { status: "À jour", color: "default", icon: CheckCircle }
    if (amount <= 10000) return { status: "Dette faible", color: "secondary", icon: AlertTriangle }
    if (amount <= 50000) return { status: "Dette modérée", color: "destructive", icon: AlertTriangle }
    return { status: "Dette élevée", color: "destructive", icon: AlertTriangle }
  }

  const totalDebt = mockCustomers.reduce((sum, customer) => sum + customer.amountOwed, 0)
  const debtorsCount = mockCustomers.filter(c => c.amountOwed > 0).length
  const totalCustomers = mockCustomers.length

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header with Stats */}
      <div 
        className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-4 space-y-4 opacity-0 animate-[fadeInDown_0.5s_ease-out_forwards]"
      >
        {/* Stats Cards */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.1s_forwards]"
        >
          <Card className="bg-card border-border hover:shadow-lg hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer hover-isolated">
            <CardContent className="p-3 text-center">
              <div 
                className="text-2xl font-bold text-primary opacity-0 animate-[fadeInScale_0.5s_ease-out_0.3s_forwards]"
              >
                {totalCustomers}
              </div>
              <div className="text-xs text-muted-foreground">Clients</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border hover:shadow-lg hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer hover-isolated">
            <CardContent className="p-3 text-center">
              <div 
                className="text-2xl font-bold text-red-600 dark:text-red-400 opacity-0 animate-[fadeInScale_0.5s_ease-out_0.4s_forwards]"
              >
                {debtorsCount}
              </div>
              <div className="text-xs text-muted-foreground">Débiteurs</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border hover:shadow-lg hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer hover-isolated">
            <CardContent className="p-3 text-center">
              <div 
                className="text-2xl font-bold text-red-600 dark:text-red-400 opacity-0 animate-[fadeInScale_0.5s_ease-out_0.5s_forwards]"
              >
                {formatAmount(totalDebt)}
              </div>
              <div className="text-xs text-muted-foreground">Dettes Totales</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Controls */}
        <div 
          className="space-y-3 opacity-0 animate-[fadeInUp_0.5s_ease-out_0.2s_forwards]"
        >
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Rechercher un client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-base bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              aria-label="Rechercher un client par nom, téléphone ou email"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground hover:text-foreground transition-colors opacity-0 animate-[fadeInScale_0.2s_ease-out_forwards]"
                aria-label="Effacer la recherche"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
            
            {/* Action Buttons */}
            <div className="flex gap-1 sm:gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="h-10 sm:h-12 px-2 sm:px-4 transition-all duration-200 hover:scale-[1.05] flex-1 sm:flex-none min-w-0"
              >
                <Filter className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Filtres</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={exportToCSV}
                className="h-10 sm:h-12 px-2 sm:px-4 transition-all duration-200 hover:scale-[1.05] flex-1 sm:flex-none min-w-0"
              >
                <Download className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="p-4 bg-muted/50 rounded-lg border border-border space-y-4 opacity-0 animate-[fadeInDown_0.3s_ease-out_forwards]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Statut</Label>
                  <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="inactive">Inactif</SelectItem>
                      <SelectItem value="blocked">Bloqué</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-sm font-medium mb-2 block">Niveau de dette</Label>
                  <Select value={debtRangeFilter} onValueChange={(value: any) => setDebtRangeFilter(value)}>
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les niveaux</SelectItem>
                      <SelectItem value="no-debt">Sans dette</SelectItem>
                      <SelectItem value="low-debt">Dette faible (≤10k)</SelectItem>
                      <SelectItem value="high-debt">Dette élevée (&gt;10k)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-sm font-medium mb-2 block">Éléments par page</Label>
                  <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1 sm:gap-2 w-full sm:w-auto">
              {/* Selection Controls */}
              {paginatedCustomers.length > 0 && (
                <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={selectedCustomers.size === paginatedCustomers.length ? clearSelection : selectAllCustomers}
                    className="h-8 sm:h-10 px-2 sm:px-3 transition-all duration-200 hover:scale-[1.05] text-xs sm:text-sm min-w-0"
                  >
                    {selectedCustomers.size === paginatedCustomers.length ? (
                      <CheckSquare className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                    ) : (
                      <Square className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                    )}
                    <span className="hidden sm:inline">
                      {selectedCustomers.size === paginatedCustomers.length ? "Tout désélectionner" : "Tout sélectionner"}
                    </span>
                    <span className="sm:hidden">
                      {selectedCustomers.size === paginatedCustomers.length ? "Désélect." : "Sélect."}
                    </span>
                  </Button>
                  
                  {selectedCustomers.size > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {selectedCustomers.size} sélectionné{selectedCustomers.size > 1 ? 's' : ''}
                    </Badge>
                  )}
                </div>
              )}

              <Button
                variant={showDebtorsOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowDebtorsOnly(!showDebtorsOnly)}
                className="flex items-center gap-2 h-10 transition-all duration-200 hover:scale-[1.05]"
                aria-pressed={showDebtorsOnly}
                aria-label={`${showDebtorsOnly ? 'Afficher tous les clients' : 'Afficher seulement les débiteurs'}`}
              >
                <AlertTriangle className="h-4 w-4" />
                <span className="hidden sm:inline">Débiteurs uniquement</span>
                <span className="sm:hidden">Débiteurs</span>
                {debtorsCount > 0 && (
                  <div className="ml-1 opacity-0 animate-[fadeInScale_0.3s_ease-out_forwards]">
                    <Badge variant="destructive">
                      {debtorsCount}
                    </Badge>
                  </div>
                )}
              </Button>

              {/* Sort Controls */}
              <div className="flex items-center gap-1 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSort("name")}
                  className={`h-8 sm:h-10 px-1 sm:px-2 transition-all duration-200 hover:scale-[1.05] text-xs min-w-0 ${
                    sortBy === "name" ? "bg-primary text-primary-foreground" : ""
                  }`}
                  aria-label={`Trier par nom ${sortBy === "name" ? (sortOrder === "asc" ? "croissant" : "décroissant") : ""}`}
                >
                  <span className="text-xs">Nom</span>
                  {sortBy === "name" && (
                    sortOrder === "asc" ? <ChevronUp className="h-2 w-2 sm:h-3 sm:w-3 ml-1" /> : <ChevronDown className="h-2 w-2 sm:h-3 sm:w-3 ml-1" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSort("debt")}
                  className={`h-8 sm:h-10 px-1 sm:px-2 transition-all duration-200 hover:scale-[1.05] text-xs min-w-0 ${
                    sortBy === "debt" ? "bg-primary text-primary-foreground" : ""
                  }`}
                  aria-label={`Trier par dette ${sortBy === "debt" ? (sortOrder === "asc" ? "croissante" : "décroissante") : ""}`}
                >
                  <span className="text-xs">Dette</span>
                  {sortBy === "debt" && (
                    sortOrder === "asc" ? <ChevronUp className="h-2 w-2 sm:h-3 sm:w-3 ml-1" /> : <ChevronDown className="h-2 w-2 sm:h-3 sm:w-3 ml-1" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSort("lastPayment")}
                  className={`h-8 sm:h-10 px-1 sm:px-2 transition-all duration-200 hover:scale-[1.05] text-xs min-w-0 ${
                    sortBy === "lastPayment" ? "bg-primary text-primary-foreground" : ""
                  }`}
                  aria-label={`Trier par dernier paiement ${sortBy === "lastPayment" ? (sortOrder === "asc" ? "croissant" : "décroissant") : ""}`}
                >
                  <span className="text-xs">Paiement</span>
                  {sortBy === "lastPayment" && (
                    sortOrder === "asc" ? <ChevronUp className="h-2 w-2 sm:h-3 sm:w-3 ml-1" /> : <ChevronDown className="h-2 w-2 sm:h-3 sm:w-3 ml-1" />
                  )}
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
            <div className="animate-in zoom-in duration-300 delay-400">
              <Badge variant="secondary" className="text-sm">
                {filteredCustomers.length} client{filteredCustomers.length !== 1 ? 's' : ''}
              </Badge>
              </div>
              
              {/* Keyboard Shortcuts Info */}
              <div className="hidden lg:flex items-center gap-2 text-xs text-muted-foreground">
                <span>Raccourcis:</span>
                <kbd className="px-1.5 py-0.5 text-xs bg-muted border rounded">Ctrl+N</kbd>
                <span>Nouveau</span>
                <kbd className="px-1.5 py-0.5 text-xs bg-muted border rounded">Ctrl+E</kbd>
                <span>Export</span>
                <kbd className="px-1.5 py-0.5 text-xs bg-muted border rounded">Ctrl+F</kbd>
                <span>Recherche</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {paginatedCustomers.map((customer, index) => {
          const debtStatus = getDebtStatus(customer.amountOwed)
          const StatusIcon = debtStatus.icon
          const isExpanded = expandedCustomer === customer.id
          const isSelected = selectedCustomers.has(customer.id)

          return (
            <div
              key={customer.id}
              className="opacity-0 animate-[fadeInUp_0.3s_ease-out_forwards]"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Card 
                className={`bg-card border-border hover:bg-accent/50 transition-all duration-300 hover:shadow-lg cursor-pointer hover:scale-[1.02] hover:-translate-y-0.5 hover-isolated ${
                  customer.amountOwed > 0 ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20" : ""
                } ${isExpanded ? "ring-2 ring-blue-200 dark:ring-blue-800" : ""} ${
                  isSelected ? "ring-2 ring-primary bg-primary/5" : ""
                }`}
                onClick={() => toggleCustomerExpansion(customer.id)}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                aria-label={`Client ${customer.name}, dette de ${formatAmount(customer.amountOwed)}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    toggleCustomerExpansion(customer.id)
                  }
                }}
              >
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-start gap-2 sm:gap-4">
                    {/* Selection Checkbox */}
                    <div className="flex items-center flex-shrink-0">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleCustomerSelection(customer.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        aria-label={`Sélectionner ${customer.name}`}
                      />
                    </div>

                    {/* Customer Avatar */}
                    <div 
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-muted/20 flex items-center justify-center transition-all duration-200 flex-shrink-0"
                    >
                      <User className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
                    </div>

                    {/* Customer Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground text-sm sm:text-base leading-tight mb-1 truncate">
                            {customer.name}
                          </h3>
                          <div className="flex items-center gap-2 mb-1 sm:mb-2">
                            <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-muted-foreground truncate">{customer.phone}</span>
                          </div>
                          {customer.email && (
                            <div className="flex items-center gap-2 mb-1 sm:mb-2">
                              <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                              <span className="text-xs sm:text-sm text-muted-foreground truncate">{customer.email}</span>
                            </div>
                          )}
                          <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-1 sm:gap-4 text-xs text-muted-foreground">
                            <span className="truncate">Total: {formatAmount(customer.totalPurchases)}</span>
                            <span className="truncate">Limite: {formatAmount(customer.creditLimit)}</span>
                            <span className="truncate">Dernier paiement: {getDaysSinceLastPayment(customer.lastPayment)}</span>
                          </div>
                        </div>

                        {/* Debt Status and Actions */}
                        <div className="flex flex-col items-end gap-2 sm:gap-3 w-full sm:w-auto">
                          <div className="text-right w-full sm:w-auto">
                            <div 
                              className={`text-lg sm:text-2xl font-bold mb-1 transition-colors duration-300 ${
                                customer.amountOwed > 0 ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"
                              }`}
                            >
                              {formatAmount(customer.amountOwed)}
                            </div>
                            <div className="opacity-0 animate-[fadeInScale_0.3s_ease-out_0.1s_forwards]">
                              <Badge 
                                variant={debtStatus.color as any} 
                                className="flex items-center gap-1 text-xs font-medium"
                              >
                                <StatusIcon className="h-3 w-3" />
                                {debtStatus.status}
                              </Badge>
                            </div>
                          </div>

                          <div className="flex gap-1 sm:gap-2 w-full sm:w-auto justify-end sm:justify-start">
                            {customer.amountOwed > 0 && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleSendReminder(customer)
                                  }}
                                  disabled={isLoading}
                                  className="bg-whatsapp hover:bg-whatsapp/90 text-white h-7 sm:h-8 px-2 sm:px-3 transition-all duration-200 hover:scale-[1.05] disabled:opacity-50 flex-1 sm:flex-none text-xs"
                                  aria-label={`Envoyer un rappel à ${customer.name}`}
                                >
                                  {isLoading ? (
                                    <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2 animate-spin" />
                                  ) : (
                                    <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                                  )}
                                  <span className="hidden sm:inline">Rappel</span>
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleOpenPayment(customer)
                                  }}
                                  className="bg-primary hover:bg-primary/90 text-primary-foreground h-7 sm:h-8 px-2 sm:px-3 transition-all duration-200 hover:scale-[1.05] flex-1 sm:flex-none text-xs"
                                  aria-label={`Enregistrer un paiement pour ${customer.name}`}
                                >
                                  <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                                  <span className="hidden sm:inline">Payer</span>
                                </Button>
                              </>
                            )}
                            
                            {/* Actions Menu */}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => e.stopPropagation()}
                                  className="h-7 w-7 sm:h-8 sm:w-8 p-0 transition-all duration-200 hover:scale-[1.05] flex-shrink-0"
                                  aria-label={`Actions pour ${customer.name}`}
                                >
                                  <MoreVertical className="h-3 w-3 sm:h-4 sm:w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleEditCustomer(customer)
                                  }}
                                  className="cursor-pointer"
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Modifier
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleOpenPayment(customer)
                                  }}
                                  className="cursor-pointer"
                                >
                                  <DollarSign className="h-4 w-4 mr-2" />
                                  Enregistrer paiement
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleSendReminder(customer)
                                  }}
                                  className="cursor-pointer"
                                >
                                  <MessageCircle className="h-4 w-4 mr-2" />
                                  Envoyer rappel
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleDeleteCustomer(customer)
                                  }}
                                  className="cursor-pointer text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Supprimer
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <div
                          className="mt-4 pt-4 border-t border-border opacity-0 animate-[fadeInDown_0.3s_ease-out_forwards]"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div>
                              <h4 className="font-medium text-foreground mb-2">Informations détaillées</h4>
                              <div className="space-y-1 text-muted-foreground">
                                <p>Statut: <span className="text-foreground font-medium capitalize">{customer.status}</span></p>
                                <p>Total des achats: <span className="text-foreground font-medium">{formatAmount(customer.totalPurchases)}</span></p>
                                <p>Limite de crédit: <span className="text-foreground font-medium">{formatAmount(customer.creditLimit)}</span></p>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground mb-2">Historique</h4>
                              <div className="space-y-1 text-muted-foreground">
                                <p>Dernier paiement: <span className="text-foreground font-medium">{getDaysSinceLastPayment(customer.lastPayment)}</span></p>
                                <p>Dernier contact: <span className="text-foreground font-medium">{getDaysSinceLastPayment(customer.lastContact)}</span></p>
                                <p>Dette restante: <span className="text-foreground font-medium">{formatAmount(customer.amountOwed)}</span></p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )
        })}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 p-3 sm:p-4 bg-muted/30 rounded-lg border border-border gap-3 sm:gap-0">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
              <span className="truncate">
                Affichage de {startIndex + 1} à {Math.min(endIndex, filteredCustomers.length)} sur {filteredCustomers.length} clients
              </span>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevPage}
                disabled={currentPage === 1}
                className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                aria-label="Page précédente"
              >
                <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                  const pageNum = Math.max(1, Math.min(totalPages - 2, currentPage - 1)) + i
                  if (pageNum > totalPages) return null
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => goToPage(pageNum)}
                      className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-xs"
                      aria-label={`Page ${pageNum}`}
                    >
                      {pageNum}
                    </Button>
                  )
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                aria-label="Page suivante"
              >
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        )}

        {filteredCustomers.length === 0 && (
          <div 
            className="flex flex-col items-center justify-center py-16 text-center opacity-0 animate-[fadeInScale_0.3s_ease-out_forwards]"
          >
            <div className="opacity-0 animate-[fadeInScale_0.5s_ease-out_0.1s_forwards]">
              <User className="h-16 w-16 text-muted-foreground mb-4" />
            </div>
            <h3 
              className="text-xl font-semibold text-foreground mb-2 opacity-0 animate-[fadeInUp_0.3s_ease-out_0.2s_forwards]"
            >
              {searchTerm ? "Aucun client trouvé" : "Aucun client enregistré"}
            </h3>
            <p 
              className="text-muted-foreground mb-6 opacity-0 animate-[fadeInUp_0.3s_ease-out_0.3s_forwards]"
            >
              {searchTerm 
                ? "Essayez un autre terme de recherche" 
                : "Commencez par ajouter votre premier client"
              }
            </p>
            {!searchTerm && (
              <div className="opacity-0 animate-[fadeInUp_0.3s_ease-out_0.4s_forwards]">
                <AnimatedButton 
                  onClick={() => setIsAddCustomerOpen(true)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  aria-label="Ajouter un nouveau client"
                  animationType="bounce"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un client
                </AnimatedButton>
              </div>
            )}
          </div>
        )}
      </div>

      {/* FAB Modal for New Customer */}
      <Dialog open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
        <DialogTrigger asChild>
          <div className="hover:scale-110 hover:rotate-5 transition-all duration-200">
            <Button
              size="lg"
              className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 h-14 w-14 rounded-full shadow-xl bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-background transition-all duration-300"
              aria-label="Ajouter un nouveau client"
            >
              <div className={`transition-transform duration-200 ${isAddCustomerOpen ? 'rotate-45' : ''}`}>
                <Plus className="h-6 w-6" />
              </div>
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="bg-card border-border max-w-md mx-4 opacity-0 animate-[fadeInScale_0.2s_ease-out_forwards]">
          <DialogHeader>
            <DialogTitle className="text-foreground text-xl">Nouveau Client</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div 
              className="space-y-2 opacity-0 animate-[fadeInLeft_0.3s_ease-out_0.1s_forwards]"
            >
              <Label htmlFor="customer-name" className="text-foreground font-medium">
                Nom complet *
              </Label>
              <Input
                id="customer-name"
                placeholder="Ex: Jean Kouassi"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer((prev) => ({ ...prev, name: e.target.value }))}
                className="h-12 text-base bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                aria-required="true"
                aria-invalid={!newCustomer.name}
              />
            </div>

            <div 
              className="space-y-2 opacity-0 animate-[fadeInLeft_0.3s_ease-out_0.2s_forwards]"
            >
              <Label htmlFor="customer-phone" className="text-foreground font-medium">
                Numéro de téléphone *
              </Label>
              <Input
                id="customer-phone"
                placeholder="Ex: +225 07 12 34 56 78"
                value={newCustomer.phone}
                onChange={(e) => setNewCustomer((prev) => ({ ...prev, phone: e.target.value }))}
                className="h-12 text-base bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                aria-required="true"
                aria-invalid={!newCustomer.phone}
              />
            </div>

            <div 
              className="space-y-2 opacity-0 animate-[fadeInLeft_0.3s_ease-out_0.3s_forwards]"
            >
              <Label htmlFor="customer-email" className="text-foreground font-medium">
                Email (optionnel)
              </Label>
              <Input
                id="customer-email"
                type="email"
                placeholder="Ex: jean.kouassi@email.com"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer((prev) => ({ ...prev, email: e.target.value }))}
                className="h-12 text-base bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              />
            </div>

            <div 
              className="space-y-2 opacity-0 animate-[fadeInLeft_0.3s_ease-out_0.4s_forwards]"
            >
              <Label htmlFor="customer-credit" className="text-foreground font-medium">
                Limite de crédit (F CFA)
              </Label>
              <Input
                id="customer-credit"
                type="number"
                placeholder="Ex: 50000"
                value={newCustomer.creditLimit}
                onChange={(e) => setNewCustomer((prev) => ({ ...prev, creditLimit: e.target.value }))}
                className="h-12 text-base bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              />
            </div>

            <div 
              className="flex gap-3 opacity-0 animate-[fadeInUp_0.3s_ease-out_0.5s_forwards]"
            >
              <Button 
                variant="outline" 
                className="flex-1 h-12 bg-transparent transition-all duration-200 hover:scale-[1.05]" 
                onClick={() => setIsAddCustomerOpen(false)}
                disabled={isLoading}
              >
                Annuler
              </Button>
              <Button
                className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 hover:scale-[1.05] disabled:opacity-50"
                onClick={handleAddCustomer}
                disabled={!newCustomer.name || !newCustomer.phone || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Ajout...
                  </>
                ) : (
                  "Ajouter le client"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Customer Modal */}
      <Dialog open={isEditCustomerOpen} onOpenChange={setIsEditCustomerOpen}>
        <DialogContent className="bg-card border-border max-w-md mx-4 opacity-0 animate-[fadeInScale_0.2s_ease-out_forwards]">
          <DialogHeader>
            <DialogTitle className="text-foreground text-xl">Modifier le Client</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div 
              className="space-y-2 opacity-0 animate-[fadeInLeft_0.3s_ease-out_0.1s_forwards]"
            >
              <Label htmlFor="edit-customer-name" className="text-foreground font-medium">
                Nom complet *
              </Label>
              <Input
                id="edit-customer-name"
                placeholder="Ex: Jean Kouassi"
                value={editCustomer.name}
                onChange={(e) => setEditCustomer((prev) => ({ ...prev, name: e.target.value }))}
                className="h-12 text-base bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                aria-required="true"
                aria-invalid={!editCustomer.name}
              />
            </div>

            <div 
              className="space-y-2 opacity-0 animate-[fadeInLeft_0.3s_ease-out_0.2s_forwards]"
            >
              <Label htmlFor="edit-customer-phone" className="text-foreground font-medium">
                Numéro de téléphone *
              </Label>
              <Input
                id="edit-customer-phone"
                placeholder="Ex: +225 07 12 34 56 78"
                value={editCustomer.phone}
                onChange={(e) => setEditCustomer((prev) => ({ ...prev, phone: e.target.value }))}
                className="h-12 text-base bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                aria-required="true"
                aria-invalid={!editCustomer.phone}
              />
            </div>

            <div 
              className="space-y-2 opacity-0 animate-[fadeInLeft_0.3s_ease-out_0.3s_forwards]"
            >
              <Label htmlFor="edit-customer-email" className="text-foreground font-medium">
                Email (optionnel)
              </Label>
              <Input
                id="edit-customer-email"
                type="email"
                placeholder="Ex: jean.kouassi@email.com"
                value={editCustomer.email}
                onChange={(e) => setEditCustomer((prev) => ({ ...prev, email: e.target.value }))}
                className="h-12 text-base bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              />
            </div>

            <div 
              className="space-y-2 opacity-0 animate-[fadeInLeft_0.3s_ease-out_0.4s_forwards]"
            >
              <Label htmlFor="edit-customer-credit" className="text-foreground font-medium">
                Limite de crédit (F CFA)
              </Label>
              <Input
                id="edit-customer-credit"
                type="number"
                placeholder="Ex: 50000"
                value={editCustomer.creditLimit}
                onChange={(e) => setEditCustomer((prev) => ({ ...prev, creditLimit: e.target.value }))}
                className="h-12 text-base bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              />
            </div>

            <div 
              className="flex gap-3 opacity-0 animate-[fadeInUp_0.3s_ease-out_0.5s_forwards]"
            >
              <Button 
                variant="outline" 
                className="flex-1 h-12 bg-transparent transition-all duration-200 hover:scale-[1.05]" 
                onClick={() => setIsEditCustomerOpen(false)}
                disabled={isLoading}
              >
                Annuler
              </Button>
              <Button
                className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 hover:scale-[1.05] disabled:opacity-50"
                onClick={handleUpdateCustomer}
                disabled={!editCustomer.name || !editCustomer.phone || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Mise à jour...
                  </>
                ) : (
                  "Mettre à jour"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer le client "{customerToDelete?.name}" ? 
              Cette action est irréversible et supprimera toutes les données associées à ce client.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteCustomer}
              disabled={isLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Suppression...
                </>
              ) : (
                "Supprimer"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Payment Slideover */}
      <PaymentSlideOver
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        customer={selectedCustomer}
        onPaymentRecorded={handleRecordPayment}
      />
    </div>
  )
}