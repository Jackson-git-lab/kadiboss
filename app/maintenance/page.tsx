"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Wrench, 
  Clock, 
  RefreshCw, 
  Mail, 
  Phone,
  CheckCircle,
  AlertTriangle,
  Info,
  Calendar,
  Users
} from "lucide-react"

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Wrench className="h-12 w-12 text-blue-500" />
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Maintenance en cours
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Nous améliorons actuellement notre plateforme pour vous offrir une meilleure expérience.
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-blue-500" />
                <span className="font-semibold">Temps estimé</span>
              </div>
              <p className="text-2xl font-bold text-blue-600 mb-2">30 minutes</p>
              <p className="text-sm text-muted-foreground">
                Maintenance prévue jusqu'à 14h30 (heure locale)
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <CheckCircle className="h-8 w-8 mx-auto text-green-500 mb-2" />
                <h3 className="font-semibold mb-1">Sécurité</h3>
                <p className="text-sm text-muted-foreground">
                  Mise à jour des protocoles de sécurité
                </p>
              </div>
              
              <div className="text-center">
                <AlertTriangle className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
                <h3 className="font-semibold mb-1">Performance</h3>
                <p className="text-sm text-muted-foreground">
                  Optimisation des performances
                </p>
              </div>
              
              <div className="text-center">
                <Info className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                <h3 className="font-semibold mb-1">Nouvelles fonctionnalités</h3>
                <p className="text-sm text-muted-foreground">
                  Ajout de nouvelles fonctionnalités
                </p>
              </div>
            </div>
            
            <div className="space-y-3 mb-8">
              <Button className="w-full" disabled>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Actualiser la page
              </Button>
              
              <div className="text-sm text-muted-foreground">
                La page se rafraîchira automatiquement une fois la maintenance terminée
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Besoin d'aide ?</h3>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  support@kadiboss.com
                </Button>
                <Button variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  +225 20 30 40 50
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Prochaines maintenances programmées
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 justify-center text-xs text-muted-foreground">
            <span>• Dimanche 25/08 - 02h00-04h00</span>
            <span>• Dimanche 01/09 - 02h00-04h00</span>
          </div>
        </div>
      </div>
    </div>
  )
}
