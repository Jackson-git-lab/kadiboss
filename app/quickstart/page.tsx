"use client"

import { PWALayout } from "@/components/pwa-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Rocket, 
  CheckCircle, 
  Circle, 
  ArrowRight, 
  Users, 
  Package, 
  ShoppingCart, 
  BarChart3,
  Settings,
  Star,
  Zap,
  Target,
  Play,
  SkipForward,
  Home
} from "lucide-react"
import Link from "next/link"

interface QuickStartStep {
  id: string
  title: string
  description: string
  completed: boolean
  icon: any
  action: string
  href: string
  estimatedTime: string
}

const quickStartSteps: QuickStartStep[] = [
  {
    id: '1',
    title: 'Ajouter vos premiers produits',
    description: 'Créez votre inventaire en ajoutant vos produits avec prix et quantités',
    completed: true,
    icon: Package,
    action: 'Ajouter des produits',
    href: '/stock',
    estimatedTime: '5 min'
  },
  {
    id: '2',
    title: 'Enregistrer vos premiers clients',
    description: 'Construisez votre base de données clients pour la fidélisation',
    completed: true,
    icon: Users,
    action: 'Gérer les clients',
    href: '/customers',
    estimatedTime: '3 min'
  },
  {
    id: '3',
    title: 'Effectuer votre première vente',
    description: 'Testez le système de point de vente avec une transaction',
    completed: false,
    icon: ShoppingCart,
    action: 'Nouvelle vente',
    href: '/sales',
    estimatedTime: '2 min'
  },
  {
    id: '4',
    title: 'Configurer vos paramètres',
    description: 'Personnalisez votre entreprise et vos préférences',
    completed: false,
    icon: Settings,
    action: 'Paramètres',
    href: '/settings',
    estimatedTime: '5 min'
  },
  {
    id: '5',
    title: 'Explorer les rapports',
    description: 'Découvrez vos analyses et tableaux de bord',
    completed: false,
    icon: BarChart3,
    action: 'Voir les rapports',
    href: '/reports',
    estimatedTime: '3 min'
  }
]

export default function QuickStartPage() {
  const completedSteps = quickStartSteps.filter(step => step.completed).length
  const progress = (completedSteps / quickStartSteps.length) * 100

  return (
    <PWALayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Démarrage Rapide</h2>
            <p className="text-sm text-muted-foreground">
              Configurez votre plateforme en quelques étapes simples
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Rocket className="h-3 w-3" />
              {completedSteps}/{quickStartSteps.length} terminées
            </Badge>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Home className="h-4 w-4 mr-2" />
                Tableau de bord
              </Button>
            </Link>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">Progression de la configuration</h3>
                <p className="text-sm text-muted-foreground">
                  {completedSteps} étapes terminées sur {quickStartSteps.length}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{Math.round(progress)}%</div>
                <p className="text-xs text-muted-foreground">Terminé</p>
              </div>
            </div>
            <Progress value={progress} className="h-3 mb-4" />
            {progress === 100 ? (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Configuration terminée ! 🎉</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-blue-600">
                <Target className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {quickStartSteps.length - completedSteps} étapes restantes
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Start Steps */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-lg font-semibold">Étapes de configuration</h3>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <SkipForward className="h-4 w-4 mr-2" />
                Passer tout
              </Button>
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <Play className="h-4 w-4 mr-2" />
                Mode guidé
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {quickStartSteps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <Card 
                  key={step.id} 
                  className={`hover:shadow-md transition-shadow ${
                    step.completed ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20' : 
                    index === completedSteps ? 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20 ring-2 ring-blue-200 dark:ring-blue-800' :
                    'border-gray-200 dark:border-gray-800'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          step.completed ? 'bg-green-100 text-green-600' :
                          index === completedSteps ? 'bg-blue-100 text-blue-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {step.completed ? (
                            <CheckCircle className="h-6 w-6" />
                          ) : (
                            <IconComponent className="h-6 w-6" />
                          )}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold flex items-center gap-2">
                              {step.title}
                              {index === completedSteps && (
                                <Badge variant="secondary" className="text-xs">
                                  <Zap className="h-3 w-3 mr-1" />
                                  Prochaine
                                </Badge>
                              )}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              {step.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className="text-xs mb-1">
                              {step.estimatedTime}
                            </Badge>
                            {step.completed && (
                              <div className="flex items-center gap-1 text-xs text-green-600">
                                <CheckCircle className="h-3 w-3" />
                                Terminé
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Link href={step.href}>
                            <Button 
                              size="sm" 
                              variant={index === completedSteps ? "default" : "outline"}
                            >
                              {step.action}
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                          </Link>
                          {step.completed && (
                            <Button variant="ghost" size="sm">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Refaire
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Tips and Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Conseils pour bien démarrer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Ajoutez vos produits les plus vendus en premier</p>
                  <p className="text-xs text-muted-foreground">Cela vous aidera à tester rapidement le système</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Configurez vos méthodes de paiement</p>
                  <p className="text-xs text-muted-foreground">Espèces, carte bancaire, Wave mobile money</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Testez avec des petites transactions</p>
                  <p className="text-xs text-muted-foreground">Assurez-vous que tout fonctionne correctement</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5" />
                Ressources utiles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/help" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Star className="h-4 w-4 mr-2" />
                  Centre d'aide et documentation
                </Button>
              </Link>
              <Link href="/help" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Play className="h-4 w-4 mr-2" />
                  Tutoriels vidéo
                </Button>
              </Link>
              <Link href="/help" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Guide des rapports
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </PWALayout>
  )
}
