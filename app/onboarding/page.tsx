"use client"

import { useState } from "react"
import { OnboardingStep } from "@/components/onboarding-step"
import { useRouter } from "next/navigation"

const onboardingSteps = [
  {
    icon: "stock" as const,
    title: "Gérez vos stocks",
    description:
      "Suivez facilement vos produits, leurs quantités et leurs mouvements en temps réel pour optimiser votre inventaire.",
  },
  {
    icon: "clients" as const,
    title: "Fidélisez vos clients",
    description: "Créez et maintenez une base de données clients complète pour améliorer vos relations commerciales.",
  },
  {
    icon: "sales" as const,
    title: "Boostez vos ventes",
    description:
      "Enregistrez et analysez vos transactions pour identifier les opportunités de croissance de votre business.",
  },
  {
    icon: "dashboard" as const,
    title: "Pilotez votre activité",
    description: "Visualisez vos performances avec des tableaux de bord intuitifs et prenez des décisions éclairées.",
  },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const router = useRouter()

  const handleNext = () => {
    if (currentStep < onboardingSteps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      // Redirect to main app after onboarding
      router.push("/")
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentStepData = onboardingSteps[currentStep - 1]

  return (
    <OnboardingStep
      step={currentStep}
      totalSteps={onboardingSteps.length}
      title={currentStepData.title}
      description={currentStepData.description}
      icon={currentStepData.icon}
      onPrevious={handlePrevious}
      onNext={handleNext}
      isFirstStep={currentStep === 1}
      isLastStep={currentStep === onboardingSteps.length}
    />
  )
}
