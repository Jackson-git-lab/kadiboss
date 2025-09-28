"use client"

import { PWALayout } from "@/components/pwa-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Bell, 
  Check, 
  X, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  Star,
  ShoppingCart,
  Package,
  Users,
  DollarSign,
  Settings,
  Trash2,
  CheckCheck,
  Filter,
  Search,
  Calendar,
  Clock
} from "lucide-react"

interface Notification {
  id: string
  type: 'success' | 'warning' | 'error' | 'info'
  title: string
  message: string
  timestamp: Date
  read: boolean
  category: string
  action?: string
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Stock faible détecté',
    message: 'Coca-Cola Classic 33cl - Il ne reste que 5 unités en stock',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    read: false,
    category: 'Inventaire',
    action: 'Voir le stock'
  },
  {
    id: '2',
    type: 'success',
    title: 'Nouvelle vente enregistrée',
    message: 'Vente de 15,000 FCFA à Marie Traoré - Paiement par Wave',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    category: 'Ventes',
    action: 'Voir la vente'
  },
  {
    id: '3',
    type: 'info',
    title: 'Nouveau client ajouté',
    message: 'Jean Kouassi a été ajouté à votre base de données clients',
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    read: true,
    category: 'Clients',
    action: 'Voir le profil'
  },
  {
    id: '4',
    type: 'error',
    title: 'Paiement échoué',
    message: 'Le paiement Wave de 8,500 FCFA a échoué - Client: Paul Koné',
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    read: false,
    category: 'Paiements',
    action: 'Ressayer'
  },
  {
    id: '5',
    type: 'success',
    title: 'Synchronisation terminée',
    message: 'Toutes vos données ont été synchronisées avec succès',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: true,
    category: 'Système',
    action: 'Voir les détails'
  },
  {
    id: '6',
    type: 'warning',
    title: 'Client VIP inactif',
    message: 'Fatou Diabaté n\'a pas acheté depuis 7 jours',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    read: false,
    category: 'Clients',
    action: 'Contacter'
  }
]

export default function NotificationsPage() {
  const unreadCount = mockNotifications.filter(n => !n.read).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-l-green-500 bg-green-50 dark:bg-green-950/20'
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20'
      case 'error':
        return 'border-l-red-500 bg-red-50 dark:bg-red-950/20'
      case 'info':
        return 'border-l-blue-500 bg-blue-50 dark:bg-blue-950/20'
      default:
        return 'border-l-gray-500 bg-gray-50 dark:bg-gray-950/20'
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return 'À l\'instant'
    if (minutes < 60) return `Il y a ${minutes} min`
    if (hours < 24) return `Il y a ${hours}h`
    return `Il y a ${days} jour${days > 1 ? 's' : ''}`
  }

  return (
    <PWALayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Notifications</h2>
            <p className="text-sm text-muted-foreground">
              Restez informé des activités importantes
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Bell className="h-3 w-3" />
              {unreadCount} non lues
            </Badge>
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
              <CheckCheck className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Tout marquer lu</span>
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Bell className="h-8 w-8 mx-auto text-blue-500 mb-2" />
              <div className="text-2xl font-bold">{mockNotifications.length}</div>
              <p className="text-sm text-muted-foreground">Total</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <AlertTriangle className="h-8 w-8 mx-auto text-red-500 mb-2" />
              <div className="text-2xl font-bold">{unreadCount}</div>
              <p className="text-sm text-muted-foreground">Non lues</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 mx-auto text-green-500 mb-2" />
              <div className="text-2xl font-bold">{mockNotifications.length - unreadCount}</div>
              <p className="text-sm text-muted-foreground">Lues</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 mx-auto text-purple-500 mb-2" />
              <div className="text-2xl font-bold">Aujourd'hui</div>
              <p className="text-sm text-muted-foreground">{mockNotifications.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Notifications Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 h-auto">
            <TabsTrigger value="all" className="text-xs sm:text-sm">Toutes</TabsTrigger>
            <TabsTrigger value="sales" className="text-xs sm:text-sm">Ventes</TabsTrigger>
            <TabsTrigger value="inventory" className="text-xs sm:text-sm">Stock</TabsTrigger>
            <TabsTrigger value="customers" className="text-xs sm:text-sm">Clients</TabsTrigger>
            <TabsTrigger value="system" className="text-xs sm:text-sm">Système</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="space-y-3">
              {mockNotifications.map(notification => (
                <Card 
                  key={notification.id} 
                  className={`border-l-4 ${getNotificationColor(notification.type)} ${
                    !notification.read ? 'ring-2 ring-blue-200 dark:ring-blue-800' : ''
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-sm">{notification.title}</h4>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                              <Badge variant="outline" className="text-xs">
                                {notification.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatTimestamp(notification.timestamp)}
                              </span>
                              {notification.action && (
                                <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                                  {notification.action}
                                </Button>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1 ml-4">
                            {!notification.read && (
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sales" className="space-y-4">
            <div className="text-center py-12">
              <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Notifications de Ventes</h3>
              <p className="text-muted-foreground">
                Notifications liées aux ventes et transactions
              </p>
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            <div className="text-center py-12">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Notifications de Stock</h3>
              <p className="text-muted-foreground">
                Alertes sur les niveaux de stock et ruptures
              </p>
            </div>
          </TabsContent>

          <TabsContent value="customers" className="space-y-4">
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Notifications Clients</h3>
              <p className="text-muted-foreground">
                Activités et interactions avec les clients
              </p>
            </div>
          </TabsContent>

          <TabsContent value="system" className="space-y-4">
            <div className="text-center py-12">
              <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Notifications Système</h3>
              <p className="text-muted-foreground">
                Notifications techniques et système
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PWALayout>
  )
}
