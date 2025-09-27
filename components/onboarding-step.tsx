"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"

interface OnboardingStepProps {
  step: number
  totalSteps: number
  title: string
  description: string
  icon: "stock" | "clients" | "sales" | "dashboard"
  onPrevious: () => void
  onNext: () => void
  isFirstStep: boolean
  isLastStep: boolean
}

const iconMap = {
  stock: "📦",
  clients: "👥",
  sales: "💰",
  dashboard: "📊"
}

export function OnboardingStep({
  step,
  totalSteps,
  title,
  description,
  icon,
  onPrevious,
  onNext,
  isFirstStep,
  isLastStep
}: OnboardingStepProps) {
  const progress = (step / totalSteps) * 100

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">{iconMap[icon]}</div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <p className="text-muted-foreground mt-2">{description}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Étape {step} sur {totalSteps}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={onPrevious}
              disabled={isFirstStep}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Précédent
            </Button>
            
            <Button
              onClick={onNext}
              className="flex items-center gap-2"
            >
              {isLastStep ? (
                <>
                  <Check className="h-4 w-4" />
                  Terminer
                </>
              ) : (
                <>
                  Suivant
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}