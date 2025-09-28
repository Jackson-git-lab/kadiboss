"use client"

import { PWALayout } from "@/components/pwa-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Users, 
  UserPlus, 
  Shield, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Key,
  Clock,
  Activity,
  Star,
  Award,
  CheckCircle,
  AlertCircle
} from "lucide-react"

interface TeamMember {
  id: string
  name: string
  email: string
  phone: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  avatar?: string
  joinDate: Date
  lastActive: Date
  permissions: string[]
  performance: number
}

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Admin KadiBoss',
    email: 'admin@kadiboss.com',
    phone: '+225 07 00 00 00 00',
    role: 'Administrateur',
    status: 'active',
    avatar: '/avatars/admin.jpg',
    joinDate: new Date('2024-01-01'),
    lastActive: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    permissions: ['all'],
    performance: 98
  },
  {
    id: '2',
    name: 'Marie Traoré',
    email: 'marie@kadiboss.com',
    phone: '+225 07 11 11 11 11',
    role: 'Gestionnaire Ventes',
    status: 'active',
    joinDate: new Date('2024-02-15'),
    lastActive: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    permissions: ['sales', 'customers', 'inventory'],
    performance: 92
  },
  {
    id: '3',
    name: 'Jean Kouassi',
    email: 'jean@kadiboss.com',
    phone: '+225 07 22 22 22 22',
    role: 'Caissier',
    status: 'active',
    joinDate: new Date('2024-03-01'),
    lastActive: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    permissions: ['sales', 'customers'],
    performance: 85
  },
  {
    id: '4',
    name: 'Fatou Diabaté',
    email: 'fatou@kadiboss.com',
    phone: '+225 07 33 33 33 33',
    role: 'Gestionnaire Stock',
    status: 'pending',
    joinDate: new Date('2024-04-01'),
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    permissions: ['inventory'],
    performance: 78
  }
]

export default function TeamPage() {
  const activeMembers = mockTeamMembers.filter(member => member.status === 'active').length
  const pendingMembers = mockTeamMembers.filter(member => member.status === 'pending').length

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'inactive':
        return <AlertCircle className="h-4 w-4 text-gray-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatLastActive = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return 'En ligne'
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
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Gestion d'Équipe</h2>
            <p className="text-sm text-muted-foreground">
              Gérez votre équipe et les permissions d'accès
            </p>
          </div>
          <Button className="w-full sm:w-auto">
            <UserPlus className="h-4 w-4 mr-2" />
            Ajouter un membre
          </Button>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto text-blue-500 mb-2" />
              <div className="text-2xl font-bold">{mockTeamMembers.length}</div>
              <p className="text-sm text-muted-foreground">Total membres</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 mx-auto text-green-500 mb-2" />
              <div className="text-2xl font-bold">{activeMembers}</div>
              <p className="text-sm text-muted-foreground">Actifs</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
              <div className="text-2xl font-bold">{pendingMembers}</div>
              <p className="text-sm text-muted-foreground">En attente</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Award className="h-8 w-8 mx-auto text-purple-500 mb-2" />
              <div className="text-2xl font-bold">88%</div>
              <p className="text-sm text-muted-foreground">Performance</p>
            </CardContent>
          </Card>
        </div>

        {/* Team Members */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto">
            <TabsTrigger value="all" className="text-xs sm:text-sm">Tous les membres</TabsTrigger>
            <TabsTrigger value="active" className="text-xs sm:text-sm">Actifs</TabsTrigger>
            <TabsTrigger value="roles" className="text-xs sm:text-sm">Rôles</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4">
              {mockTeamMembers.map(member => (
                <Card key={member.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{member.name}</h3>
                            <Badge className={getStatusColor(member.status)}>
                              {getStatusIcon(member.status)}
                              <span className="ml-1">{member.status}</span>
                            </Badge>
                          </div>
                          
                          <div className="text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Shield className="h-4 w-4" />
                                {member.role}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Depuis {formatDate(member.joinDate)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Activity className="h-4 w-4" />
                                {formatLastActive(member.lastActive)}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-6 text-sm">
                            <span className="flex items-center gap-1">
                              <Mail className="h-4 w-4" />
                              {member.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="h-4 w-4" />
                              {member.phone}
                            </span>
                          </div>
                          
                          <div className="mt-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">Performance</span>
                              <span className="text-sm text-muted-foreground">{member.performance}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${member.performance}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Key className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Membres Actifs</h3>
              <p className="text-muted-foreground">
                Vue filtrée des membres actifs de l'équipe
              </p>
            </div>
          </TabsContent>

          <TabsContent value="roles" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Rôles et Permissions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-semibold mb-2">Administrateur</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Accès complet à toutes les fonctionnalités
                      </p>
                      <Badge variant="secondary">Toutes permissions</Badge>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-semibold mb-2">Gestionnaire Ventes</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Gestion des ventes, clients et inventaire
                      </p>
                      <div className="flex gap-1 flex-wrap">
                        <Badge variant="outline">Ventes</Badge>
                        <Badge variant="outline">Clients</Badge>
                        <Badge variant="outline">Stock</Badge>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-semibold mb-2">Caissier</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Enregistrement des ventes et gestion clients
                      </p>
                      <div className="flex gap-1 flex-wrap">
                        <Badge variant="outline">Ventes</Badge>
                        <Badge variant="outline">Clients</Badge>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-semibold mb-2">Gestionnaire Stock</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Gestion de l'inventaire et des stocks
                      </p>
                      <div className="flex gap-1 flex-wrap">
                        <Badge variant="outline">Stock</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Performance d'Équipe
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTeamMembers.slice(0, 3).map(member => (
                      <div key={member.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{member.performance}%</p>
                          <p className="text-xs text-muted-foreground">Performance</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PWALayout>
  )
}
