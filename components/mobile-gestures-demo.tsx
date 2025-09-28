"use client"

import { useState } from "react"
import { MobileGestures, useMobileGestures } from "@/components/mobile-gestures"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  MousePointer2, 
  Hand, 
  RotateCcw,
  Info
} from "lucide-react"

export function MobileGesturesDemo() {
  const { gestures, handlers } = useMobileGestures()
  const [showInstructions, setShowInstructions] = useState(false)

  const resetGestures = () => {
    // Reset gestures by re-mounting the component
    window.location.reload()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Démonstration des Gestes Mobiles</h2>
          <p className="text-sm text-muted-foreground">
            Testez les gestes tactiles sur mobile ou utilisez la molette de la souris
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowInstructions(!showInstructions)}
          >
            <Info className="h-4 w-4 mr-2" />
            Instructions
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={resetGestures}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      {/* Instructions */}
      {showInstructions && (
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 text-blue-800 dark:text-blue-200">Instructions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Sur Mobile :</h4>
                <ul className="space-y-1 text-blue-700 dark:text-blue-300">
                  <li>• Swipe vers le haut</li>
                  <li>• Swipe vers le bas</li>
                  <li>• Swipe vers la gauche</li>
                  <li>• Swipe vers la droite</li>
                  <li>• Double tap</li>
                  <li>• Appui long</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Sur Desktop :</h4>
                <ul className="space-y-1 text-blue-700 dark:text-blue-300">
                  <li>• Molette vers le haut</li>
                  <li>• Molette vers le bas</li>
                  <li>• Double clic</li>
                  <li>• Clic long</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Gesture Area */}
      <MobileGestures
        onSwipeUp={handlers.onSwipeUp}
        onSwipeDown={handlers.onSwipeDown}
        onSwipeLeft={handlers.onSwipeLeft}
        onSwipeRight={handlers.onSwipeRight}
        onDoubleTap={handlers.onDoubleTap}
        onLongPress={handlers.onLongPress}
        className="min-h-[400px] rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/10"
      >
        <div className="flex items-center justify-center h-full min-h-[400px] p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Hand className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Zone de Test des Gestes</h3>
              <p className="text-muted-foreground">
                Effectuez des gestes dans cette zone pour les tester
              </p>
            </div>
          </div>
        </div>
      </MobileGestures>

      {/* Gesture Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <ChevronUp className="h-6 w-6 mx-auto text-blue-500 mb-2" />
            <p className="text-2xl font-bold text-blue-600">{gestures.swipeUp}</p>
            <p className="text-xs text-muted-foreground">Swipe Up</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <ChevronDown className="h-6 w-6 mx-auto text-green-500 mb-2" />
            <p className="text-2xl font-bold text-green-600">{gestures.swipeDown}</p>
            <p className="text-xs text-muted-foreground">Swipe Down</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <ChevronLeft className="h-6 w-6 mx-auto text-orange-500 mb-2" />
            <p className="text-2xl font-bold text-orange-600">{gestures.swipeLeft}</p>
            <p className="text-xs text-muted-foreground">Swipe Left</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <ChevronRight className="h-6 w-6 mx-auto text-purple-500 mb-2" />
            <p className="text-2xl font-bold text-purple-600">{gestures.swipeRight}</p>
            <p className="text-xs text-muted-foreground">Swipe Right</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <MousePointer2 className="h-6 w-6 mx-auto text-red-500 mb-2" />
            <p className="text-2xl font-bold text-red-600">{gestures.doubleTap}</p>
            <p className="text-xs text-muted-foreground">Double Tap</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Hand className="h-6 w-6 mx-auto text-indigo-500 mb-2" />
            <p className="text-2xl font-bold text-indigo-600">{gestures.longPress}</p>
            <p className="text-xs text-muted-foreground">Long Press</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Gestures */}
      <Card>
        <CardHeader>
          <CardTitle>Gestes Récents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {gestures.swipeUp > 0 && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <ChevronUp className="h-3 w-3" />
                  Swipe Up
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {gestures.swipeUp} fois
                </span>
              </div>
            )}
            {gestures.swipeDown > 0 && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <ChevronDown className="h-3 w-3" />
                  Swipe Down
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {gestures.swipeDown} fois
                </span>
              </div>
            )}
            {gestures.swipeLeft > 0 && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <ChevronLeft className="h-3 w-3" />
                  Swipe Left
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {gestures.swipeLeft} fois
                </span>
              </div>
            )}
            {gestures.swipeRight > 0 && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <ChevronRight className="h-3 w-3" />
                  Swipe Right
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {gestures.swipeRight} fois
                </span>
              </div>
            )}
            {gestures.doubleTap > 0 && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <MousePointer2 className="h-3 w-3" />
                  Double Tap
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {gestures.doubleTap} fois
                </span>
              </div>
            )}
            {gestures.longPress > 0 && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Hand className="h-3 w-3" />
                  Long Press
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {gestures.longPress} fois
                </span>
              </div>
            )}
            {Object.values(gestures).every(count => count === 0) && (
              <p className="text-muted-foreground text-center py-4">
                Aucun geste détecté. Essayez de faire des gestes dans la zone de test !
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
