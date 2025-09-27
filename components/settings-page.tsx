"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { 
  Settings, 
  Crown, 
  Globe, 
  Bell, 
  MessageCircle, 
  BookOpen, 
  ExternalLink,
  Calendar,
  CreditCard,
  Shield,
  Star,
  CheckCircle,
  AlertTriangle,
  Info
} from "lucide-react"
import { toast } from "sonner"

interface SubscriptionInfo {
  status: "trial" | "active" | "expired" | "cancelled"
  plan: string
  daysRemaining?: number
  nextPayment?: Date
  price?: number
  currency?: string
}

interface SettingsData {
  language: string
  notifications: {
    sales: boolean
    lowStock: boolean
    payments: boolean
    marketing: boolean
  }
}

const subscriptionPlans = {
  trial: {
    name: "Essai Gratuit",
    description: "Accès complet à toutes les fonctionnalités",
    features: ["Gestion des ventes", "Inventaire", "Clients", "Rapports de base"],
    color: "default" as const
  },
  basic: {
    name: "Plan Basique",
    description: "Parfait pour les petits commerces",
    price: 15000,
    currency: "F",
    features: ["Tout de l'essai", "Support prioritaire", "Sauvegarde automatique"],
    color: "secondary" as const
  },
  pro: {
    name: "Plan Pro",
    description: "Idéal pour les entreprises en croissance",
    price: 35000,
    currency: "F",
    features: ["Tout du basique", "Rapports avancés", "Intégrations", "Formation"],
    color: "default" as const
  },
  premium: {
    name: "Plan Premium",
    description: "Solution complète pour les grandes entreprises",
    price: 75000,
    currency: "F",
    features: ["Tout du pro", "API personnalisée", "Support dédié", "Formation avancée"],
    color: "destructive" as const
  }
}

const languages = [
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "es", name: "Español", flag: "🇪🇸" }
]

export function SettingsPage() {
  const [subscription, setSubscription] = useState<SubscriptionInfo>({
    status: "trial",
    plan: "trial",
    daysRemaining: 10
  })

  const [settings, setSettings] = useState<SettingsData>({
    language: "fr",
    notifications: {
      sales: true,
      lowStock: true,
      payments: true,
      marketing: false
    }
  })

  const handleSubscriptionManage = () => {
    // Simulate opening payment portal
    toast.success("Ouverture du portail de paiement...")
    // In a real app, this would redirect to your payment portal
    window.open("https://billing.kadiboss.app", "_blank")
  }

  const handleLanguageChange = (language: string) => {
    setSettings(prev => ({ ...prev, language }))
    toast.success("Langue mise à jour")
  }

  const handleNotificationChange = (key: keyof SettingsData['notifications'], value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value }
    }))
    toast.success("Préférences de notification mises à jour")
  }

  const handleWhatsAppContact = () => {
    const message = "Bonjour ! J'ai besoin d'aide avec KadiBoss."
    const whatsappUrl = `https://wa.me/225XXXXXXXXX?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
    toast.success("Ouverture de WhatsApp")
  }

  const handleTutorial = () => {
    toast.success("Ouverture du tutoriel")
    // In a real app, this would open the tutorial
  }

  const getSubscriptionStatus = () => {
    switch (subscription.status) {
      case "trial":
        return {
          title: "Essai Gratuit",
          subtitle: `Jours restants: ${subscription.daysRemaining}`,
          color: "default" as const,
          icon: Star
        }
      case "active":
        return {
          title: "Actif",
          subtitle: `Prochain paiement: ${subscription.nextPayment?.toLocaleDateString('fr-FR')}`,
          color: "default" as const,
          icon: CheckCircle
        }
      case "expired":
        return {
          title: "Expiré",
          subtitle: "Renouvelez votre abonnement",
          color: "destructive" as const,
          icon: AlertTriangle
        }
      case "cancelled":
        return {
          title: "Annulé",
          subtitle: "Réactivez votre abonnement",
          color: "secondary" as const,
          icon: Info
        }
      default:
        return {
          title: "Inconnu",
          subtitle: "Contactez le support",
          color: "secondary" as const,
          icon: Info
        }
    }
  }

  const currentPlan = subscriptionPlans[subscription.plan as keyof typeof subscriptionPlans] || subscriptionPlans.trial
  const subscriptionStatus = getSubscriptionStatus()
  const StatusIcon = subscriptionStatus.icon

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Paramètres</h1>
            <p className="text-muted-foreground mt-2">
              Gérez votre compte et vos préférences
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Settings className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>

        {/* Mon Abonnement */}
        <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Crown className="h-6 w-6" />
              Mon Abonnement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Subscription Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <StatusIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold text-foreground">
                      {subscriptionStatus.title}
                    </h3>
                    <Badge variant={subscriptionStatus.color}>
                      {currentPlan.name}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">
                    {subscriptionStatus.subtitle}
                  </p>
                </div>
              </div>
              <Button
                onClick={handleSubscriptionManage}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Gérer l'Abonnement
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Plan Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Plan Actuel</h4>
                <p className="text-muted-foreground">{currentPlan.description}</p>
                {'price' in currentPlan && currentPlan.price && (
                  <p className="text-lg font-bold text-primary">
                    {currentPlan.price.toLocaleString()} {currentPlan.currency}/mois
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Fonctionnalités Incluses</h4>
                <ul className="space-y-1">
                  {currentPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Upgrade Options */}
            {subscription.status === "trial" && (
              <div className="bg-muted/50 p-4 rounded-lg border border-border">
                <h4 className="font-semibold text-foreground mb-3">Plans Disponibles</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(subscriptionPlans).filter(([key]) => key !== 'trial').map(([key, plan]) => (
                    <div key={key} className="p-3 border border-border rounded-lg bg-card">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-foreground">{plan.name}</h5>
                        <Badge variant={plan.color}>{plan.color}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{plan.description}</p>
                      {'price' in plan && plan.price && (
                        <p className="text-lg font-bold text-primary">
                          {plan.price.toLocaleString()} {plan.currency}/mois
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Paramètres */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-6 w-6" />
              Paramètres
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Language */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Langue</h3>
                  <p className="text-sm text-muted-foreground">Choisissez votre langue préférée</p>
                </div>
              </div>
              <Select value={settings.language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <div className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Notifications */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Notifications</h3>
                  <p className="text-sm text-muted-foreground">Configurez vos préférences de notification</p>
                </div>
              </div>

              <div className="space-y-4 ml-13">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">Nouvelles Ventes</h4>
                    <p className="text-sm text-muted-foreground">Recevez une notification pour chaque vente</p>
                  </div>
                  <Switch
                    checked={settings.notifications.sales}
                    onCheckedChange={(checked) => handleNotificationChange('sales', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">Stock Faible</h4>
                    <p className="text-sm text-muted-foreground">Alertes quand le stock est faible</p>
                  </div>
                  <Switch
                    checked={settings.notifications.lowStock}
                    onCheckedChange={(checked) => handleNotificationChange('lowStock', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">Paiements</h4>
                    <p className="text-sm text-muted-foreground">Notifications de paiements reçus</p>
                  </div>
                  <Switch
                    checked={settings.notifications.payments}
                    onCheckedChange={(checked) => handleNotificationChange('payments', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">Marketing</h4>
                    <p className="text-sm text-muted-foreground">Conseils et astuces pour votre business</p>
                  </div>
                  <Switch
                    checked={settings.notifications.marketing}
                    onCheckedChange={(checked) => handleNotificationChange('marketing', checked)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* WhatsApp Contact */}
            <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-whatsapp/20 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-whatsapp" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Contact WhatsApp</h3>
                  <p className="text-sm text-muted-foreground">Obtenez de l'aide instantanée via WhatsApp</p>
                </div>
              </div>
              <Button
                onClick={handleWhatsAppContact}
                className="bg-whatsapp hover:bg-whatsapp/90 text-white"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Contacter
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Tutorial */}
            <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Tutoriel</h3>
                  <p className="text-sm text-muted-foreground">Apprenez à utiliser KadiBoss efficacement</p>
                </div>
              </div>
              <Button
                onClick={handleTutorial}
                variant="outline"
                className="border-border"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Commencer
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Additional Support Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Centre d'Aide</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Consultez notre base de connaissances
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Accéder
                </Button>
              </div>

              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Rapporter un Bug</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Signalez un problème technique
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Signaler
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card className="bg-muted/20">
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-foreground">KadiBoss v1.0.0</h3>
              <p className="text-sm text-muted-foreground">
                Votre partenaire commerce intelligent
              </p>
              <p className="text-xs text-muted-foreground">
                © 2024 KadiBoss. Tous droits réservés.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}



