"use client"

import { PWALayout } from "@/components/pwa-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Bell, 
  Lock, 
  Camera,
  Edit,
  Save,
  X,
  Settings,
  Key,
  Smartphone,
  Globe,
  Award,
  Star,
  Activity
} from "lucide-react"

export default function ProfilePage() {
  return (
    <PWALayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Profil Utilisateur</h2>
            <p className="text-sm text-muted-foreground">
              Gérez vos informations personnelles et paramètres
            </p>
          </div>
          <Button className="w-full sm:w-auto">
            <Edit className="h-4 w-4 mr-2" />
            Modifier
          </Button>
        </div>

        {/* Profile Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardContent className="p-6 text-center">
              <div className="relative inline-block mb-4">
                <Avatar className="h-24 w-24 mx-auto">
                  <AvatarImage src="/avatars/admin.jpg" />
                  <AvatarFallback className="text-2xl">
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0"
                  variant="secondary"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              
              <h3 className="text-xl font-semibold mb-2">Admin KadiBoss</h3>
              <Badge variant="secondary" className="mb-3">
                <Shield className="h-3 w-3 mr-1" />
                Administrateur
              </Badge>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>admin@kadiboss.com</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+225 07 00 00 00 00</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Membre depuis Jan 2024</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Activity className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-sm text-muted-foreground">Actions</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <Award className="h-8 w-8 mx-auto text-green-500 mb-2" />
                  <div className="text-2xl font-bold">98%</div>
                  <p className="text-sm text-muted-foreground">Performance</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <Star className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
                  <div className="text-2xl font-bold">4.9</div>
                  <p className="text-sm text-muted-foreground">Évaluation</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <Calendar className="h-8 w-8 mx-auto text-purple-500 mb-2" />
                  <div className="text-2xl font-bold">45</div>
                  <p className="text-sm text-muted-foreground">Jours actifs</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions Rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button variant="outline" className="justify-start">
                    <Key className="h-4 w-4 mr-2" />
                    Changer le mot de passe
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Smartphone className="h-4 w-4 mr-2" />
                    Appareils connectés
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Globe className="h-4 w-4 mr-2" />
                    Paramètres de langue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Profile Details */}
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto">
            <TabsTrigger value="personal" className="text-xs sm:text-sm">Personnel</TabsTrigger>
            <TabsTrigger value="security" className="text-xs sm:text-sm">Sécurité</TabsTrigger>
            <TabsTrigger value="preferences" className="text-xs sm:text-sm">Préférences</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informations Personnelles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input id="firstName" defaultValue="Admin" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom</Label>
                    <Input id="lastName" defaultValue="KadiBoss" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="admin@kadiboss.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" defaultValue="+225 07 00 00 00 00" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Input id="address" defaultValue="Abidjan, Côte d'Ivoire" />
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Sauvegarder
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <X className="h-4 w-4 mr-2" />
                    Annuler
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de Sécurité</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div>
                  <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                
                <div className="flex gap-2">
                  <Button>
                    <Lock className="h-4 w-4 mr-2" />
                    Changer le mot de passe
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Authentification à deux facteurs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">2FA activé</p>
                    <p className="text-sm text-muted-foreground">
                      Protection supplémentaire pour votre compte
                    </p>
                  </div>
                  <Badge variant="secondary">Activé</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Préférences de l'Application</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notifications push</p>
                    <p className="text-sm text-muted-foreground">
                      Recevoir des notifications sur votre appareil
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Activé
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Mode sombre</p>
                    <p className="text-sm text-muted-foreground">
                      Interface en mode sombre
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Activé
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Langue</p>
                    <p className="text-sm text-muted-foreground">
                      Français
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Français
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PWALayout>
  )
}
