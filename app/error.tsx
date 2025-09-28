"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  AlertCircle, 
  Home, 
  RefreshCw, 
  Bug,
  HelpCircle,
  Mail
} from "lucide-react"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="h-10 w-10 text-orange-500" />
            </div>
            
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Oups ! Une erreur s'est produite
            </h1>
            <p className="text-muted-foreground mb-6">
              Nous nous excusons pour la gêne occasionnée. Notre équipe a été notifiée de ce problème.
            </p>
            
            {process.env.NODE_ENV === 'development' && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                  Détails de l'erreur (Mode développement)
                </h3>
                <p className="text-sm text-red-700 dark:text-red-300 font-mono">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                    ID d'erreur: {error.digest}
                  </p>
                )}
              </div>
            )}
            
            <div className="space-y-3">
              <Button onClick={reset} className="w-full">
                <RefreshCw className="h-4 w-4 mr-2" />
                Réessayer
              </Button>
              
              <Link href="/" className="block">
                <Button variant="outline" className="w-full">
                  <Home className="h-4 w-4 mr-2" />
                  Retour à l'accueil
                </Button>
              </Link>
              
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
          <p className="text-sm text-muted-foreground mb-4">
            Le problème persiste ? Contactez notre support technique
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/help">
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                support@kadiboss.com
              </Button>
            </Link>
            <Link href="/help">
              <Button variant="outline" size="sm">
                <Bug className="h-4 w-4 mr-2" />
                Signaler un bug
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

