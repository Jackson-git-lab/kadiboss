import { PWALayout } from "@/components/pwa-layout"
import { SettingsPage } from "@/components/settings-page"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Settings, RefreshCw, Crown, Shield } from "lucide-react"

export default function SettingsPageMain() {
  return (
    <PWALayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Paramètres</h2>
            <p className="text-sm text-muted-foreground">Gérez votre compte et vos préférences</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Crown className="h-3 w-3" />
              Essai Gratuit
            </Badge>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualiser
            </Button>
          </div>
        </div>

        {/* Settings Content */}
        <SettingsPage />
      </div>
    </PWALayout>
  )
}
