import { AdvancedPWALayout } from "@/components/advanced-pwa-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Users, Package, Settings, Receipt, MessageCircle, Star, Zap, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function HomePage() {
  return (
    <AdvancedPWALayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="text-center py-8">
          <div className="mb-6">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-primary-foreground font-bold text-2xl">KB</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Bienvenue sur KadiBoss</h2>
            <p className="text-muted-foreground text-lg mb-4">Gérez votre entreprise efficacement avec notre PWA professionnelle</p>
            
            {/* Feature Badges */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                Temps Réel
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Sécurisé
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                Professionnel
              </Badge>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <Link 
              href="/dashboard" 
              className="flex-1"
              aria-label="Commencer à utiliser KadiBoss - Accéder au tableau de bord"
            >
              <Button className="w-full" size="lg">
                Commencer
              </Button>
            </Link>
            <Link 
              href="/onboarding" 
              className="flex-1"
              aria-label="Découvrir les fonctionnalités de KadiBoss - Guide d'utilisation"
            >
              <Button variant="outline" size="lg" className="w-full">
                Découvrir
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ventes</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€12,345</div>
              <p className="text-xs text-muted-foreground">+20.1% ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">234</div>
              <p className="text-xs text-muted-foreground">+12 nouveaux</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stock</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">Articles en stock</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commandes</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">En attente</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Actions rapides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link 
              href="/sales" 
              className="block"
              aria-label="Créer une nouvelle vente - Accéder à la page des ventes"
            >
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                <span className="font-medium">Nouvelle vente</span>
                <TrendingUp className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
            </Link>
            <Link 
              href="/customers" 
              className="block"
              aria-label="Ajouter un nouveau client - Accéder à la gestion des clients"
            >
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                <span className="font-medium">Ajouter client</span>
                <Users className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
            </Link>
            <Link 
              href="/stock" 
              className="block"
              aria-label="Gérer le stock - Accéder à la gestion de l'inventaire"
            >
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                <span className="font-medium">Gérer stock</span>
                <Package className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
            </Link>
            <Link 
              href="/settings" 
              className="block"
              aria-label="Accéder aux paramètres - Configuration de l'application"
            >
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                <span className="font-medium">Paramètres</span>
                <Settings className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
            </Link>
          </CardContent>
        </Card>

        {/* Advanced Features */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Fonctionnalités Avancées
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Gestion en Temps Réel</h4>
                <p className="text-sm text-muted-foreground">
                  Mise à jour instantanée des stocks, ventes et paiements
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Intégration WhatsApp</h4>
                <p className="text-sm text-muted-foreground">
                  Communication directe avec vos clients
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Reçus Professionnels</h4>
                <p className="text-sm text-muted-foreground">
                  Génération et partage de reçus imprimables
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Sécurité Avancée</h4>
                <p className="text-sm text-muted-foreground">
                  Authentification 2FA et chiffrement des données
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-4">
              <Link 
                href="/realtime-sales-demo"
                aria-label="Démonstration des ventes en temps réel - Fonctionnalité avancée"
              >
                <Button variant="outline" size="sm">
                  <Zap className="h-4 w-4 mr-2" aria-hidden="true" />
                  Ventes Temps Réel
                </Button>
              </Link>
              <Link 
                href="/realtime-inventory-demo"
                aria-label="Démonstration du stock en temps réel - Fonctionnalité avancée"
              >
                <Button variant="outline" size="sm">
                  <Package className="h-4 w-4 mr-2" aria-hidden="true" />
                  Stock Temps Réel
                </Button>
              </Link>
              <Link 
                href="/receipt-demo"
                aria-label="Démonstration du générateur de reçus - Fonctionnalité avancée"
              >
                <Button variant="outline" size="sm">
                  <Receipt className="h-4 w-4 mr-2" aria-hidden="true" />
                  Générateur de Reçus
                </Button>
              </Link>
              <Link 
                href="/advanced-settings-demo"
                aria-label="Démonstration des paramètres avancés - Fonctionnalité avancée"
              >
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" aria-hidden="true" />
                  Paramètres Avancés
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdvancedPWALayout>
  )
}
