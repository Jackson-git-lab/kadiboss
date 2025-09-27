"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { User, CreditCard, Banknote } from "lucide-react"

interface Customer {
  id: string
  name: string
  phone: string
  amountOwed: number
  lastPurchase: string
}

interface PaymentSlideOverProps {
  customer: Customer | null
  isOpen: boolean
  onClose: () => void
  onPaymentRecorded: (customerId: string, amountPaid: number, method: string) => void
}

const paymentSchema = z.object({
  amountPaid: z.number().min(1, "Le montant doit être supérieur à 0"),
  method: z.enum(["cash", "wave"], {
    required_error: "Veuillez sélectionner une méthode de paiement",
  }),
})

type PaymentFormValues = z.infer<typeof paymentSchema>

export function PaymentSlideOver({ customer, isOpen, onClose, onPaymentRecorded }: PaymentSlideOverProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amountPaid: customer?.amountOwed || 0,
      method: "cash",
    },
  })

  // Reset form when customer changes
  useEffect(() => {
    if (customer) {
      form.reset({
        amountPaid: customer.amountOwed,
        method: "cash",
      })
    }
  }, [customer])

  const onSubmit = async (values: PaymentFormValues) => {
    if (!customer) return

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      onPaymentRecorded(customer.id, values.amountPaid, values.method)
      onClose()
      form.reset()
    } catch (error) {
      console.error("Error recording payment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  if (!customer) return null

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-foreground">Enregistrer un Paiement</SheetTitle>
        </SheetHeader>

        <div className="flex-1 space-y-6 py-6">
          {/* Customer Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <User className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-balance">{customer.name}</h3>
                <p className="text-sm text-muted-foreground">{customer.phone}</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-customer-debt/10 rounded-lg border border-customer-debt/20">
              <span className="text-sm font-medium text-foreground">Montant Total Dû:</span>
              <Badge variant="destructive" className="bg-customer-debt text-customer-debt-foreground font-bold">
                {customer.amountOwed.toLocaleString()} FCFA
              </Badge>
            </div>
          </div>

          {/* Payment Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="amountPaid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Montant Payé (FCFA)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        className="bg-input border-border text-foreground"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="method"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Méthode de Paiement</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                          <RadioGroupItem value="cash" id="cash" />
                          <Label htmlFor="cash" className="flex items-center space-x-2 cursor-pointer flex-1">
                            <Banknote className="h-4 w-4 text-muted-foreground" />
                            <span className="text-foreground">Espèces</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                          <RadioGroupItem value="wave" id="wave" />
                          <Label htmlFor="wave" className="flex items-center space-x-2 cursor-pointer flex-1">
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                            <span className="text-foreground">Wave</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <SheetFooter className="flex-col space-y-2">
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isSubmitting ? "Enregistrement..." : "Marquer comme Payé"}
          </Button>
          <Button variant="outline" onClick={handleClose} disabled={isSubmitting} className="w-full bg-transparent">
            Annuler
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
