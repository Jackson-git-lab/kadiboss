"use client"

import { PWALayout } from "@/components/pwa-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle } from "lucide-react"

export default function HelpPage() {
  return (
    <PWALayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Centre d'Aide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Trouvez rapidement les réponses à vos questions
            </p>
            <Button className="mt-4">
              Commencer
            </Button>
          </CardContent>
        </Card>
      </div>
    </PWALayout>
  )
}
