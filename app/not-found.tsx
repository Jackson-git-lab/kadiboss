"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  AlertTriangle, 
  Home, 
  ArrowLeft, 
  Search,
  RefreshCw,
  HelpCircle
} from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="h-10 w-10 text-red-500" />
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-2">404</h1>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Page non trouvée
            </h2>
            <p className="text-muted-foreground mb-8">
              Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
            </p>
            
            <div className="space-y-3">
              <Link href="/" className="block">
                <Button className="w-full">
                  <Home className="h-4 w-4 mr-2" />
                  Retour à l'accueil
                </Button>
              </Link>
              
              <Button variant="outline" className="w-full" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Page précédente
              </Button>
              
              <Link href="/help" className="block">
                <Button variant="outline" className="w-full">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Centre d'aide
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Si vous pensez qu'il s'agit d'une erreur, contactez notre{" "}
            <Link href="/help" className="text-primary hover:underline">
              support technique
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
