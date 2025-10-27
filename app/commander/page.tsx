"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CreditCard, Smartphone } from "lucide-react"

export default function CommanderPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    address: "",
    city: "Cotonou",
    phone: "",
    notes: "",
    paymentMethod: "mtn" as "mtn" | "moov" | "celtis" | "cash",
    paymentPhone: "",
  })

  const deliveryFee = 1000
  const total = totalPrice + deliveryFee

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Grouper les articles par pharmacie
      const pharmacyGroups = items.reduce(
        (acc, item) => {
          if (!acc[item.pharmacy_id]) {
            acc[item.pharmacy_id] = []
          }
          acc[item.pharmacy_id].push(item)
          return acc
        },
        {} as Record<number, typeof items>,
      )

      // Créer une commande pour chaque pharmacie
      const orderPromises = Object.entries(pharmacyGroups).map(async ([pharmacyId, pharmacyItems]) => {
        const orderTotal = pharmacyItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

        const response = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pharmacy_id: Number.parseInt(pharmacyId),
            items: pharmacyItems.map((item) => ({
              medication_id: item.medication_id,
              quantity: item.quantity,
              unit_price: item.price,
            })),
            delivery_address: formData.address,
            delivery_city: formData.city,
            delivery_phone: formData.phone,
            delivery_notes: formData.notes,
            payment_method: formData.paymentMethod,
            payment_phone: formData.paymentPhone || formData.phone,
            total_amount: orderTotal,
            delivery_fee: deliveryFee,
          }),
        })

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || "Erreur lors de la création de la commande")
        }

        return response.json()
      })

      const orders = await Promise.all(orderPromises)

      // Vider le panier
      clearCart()

      // Rediriger vers la page de confirmation
      router.push(`/commande-confirmee?orders=${orders.map((o) => o.order.order_number).join(",")}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de la commande")
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    router.push("/panier")
    return null
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Finaliser la commande</h1>
          <p className="mt-2 text-muted-foreground">Complétez les informations de livraison et de paiement</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Formulaire */}
            <div className="lg:col-span-2 space-y-6">
              {/* Informations de livraison */}
              <Card>
                <CardHeader>
                  <CardTitle>Informations de livraison</CardTitle>
                  <CardDescription>Où souhaitez-vous recevoir votre commande ?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse de livraison *</Label>
                    <Textarea
                      id="address"
                      required
                      placeholder="Entrez votre adresse complète"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="city">Ville *</Label>
                      <Input
                        id="city"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        placeholder="+229 XX XX XX XX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Instructions de livraison (optionnel)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Ex: Sonner à l'interphone, 2ème étage..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Méthode de paiement */}
              <Card>
                <CardHeader>
                  <CardTitle>Méthode de paiement</CardTitle>
                  <CardDescription>Choisissez votre mode de paiement</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) =>
                      setFormData({ ...formData, paymentMethod: value as typeof formData.paymentMethod })
                    }
                  >
                    <div className="flex items-center space-x-3 rounded-lg border p-4">
                      <RadioGroupItem value="mtn" id="mtn" />
                      <Label htmlFor="mtn" className="flex flex-1 cursor-pointer items-center gap-3">
                        <Smartphone className="h-5 w-5 text-yellow-600" />
                        <div>
                          <p className="font-medium">MTN Mobile Money</p>
                          <p className="text-sm text-muted-foreground">Paiement sécurisé via MTN</p>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 rounded-lg border p-4">
                      <RadioGroupItem value="moov" id="moov" />
                      <Label htmlFor="moov" className="flex flex-1 cursor-pointer items-center gap-3">
                        <Smartphone className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">MOOV Money</p>
                          <p className="text-sm text-muted-foreground">Paiement sécurisé via MOOV</p>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 rounded-lg border p-4">
                      <RadioGroupItem value="celtis" id="celtis" />
                      <Label htmlFor="celtis" className="flex flex-1 cursor-pointer items-center gap-3">
                        <CreditCard className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium">CELTIS</p>
                          <p className="text-sm text-muted-foreground">Paiement par carte bancaire</p>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 rounded-lg border p-4">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex flex-1 cursor-pointer items-center gap-3">
                        <CreditCard className="h-5 w-5" />
                        <div>
                          <p className="font-medium">Paiement à la livraison</p>
                          <p className="text-sm text-muted-foreground">Payez en espèces à la réception</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  {formData.paymentMethod !== "cash" && (
                    <div className="space-y-2">
                      <Label htmlFor="paymentPhone">Numéro de téléphone pour le paiement</Label>
                      <Input
                        id="paymentPhone"
                        type="tel"
                        placeholder="+229 XX XX XX XX"
                        value={formData.paymentPhone}
                        onChange={(e) => setFormData({ ...formData, paymentPhone: e.target.value })}
                      />
                      <p className="text-xs text-muted-foreground">Laissez vide pour utiliser le numéro de livraison</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Résumé */}
            <div>
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Résumé</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.medication_id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.name} x{item.quantity}
                        </span>
                        <span>{(item.price * item.quantity).toLocaleString()} FCFA</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span>{totalPrice.toLocaleString()} FCFA</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Livraison</span>
                    <span>{deliveryFee.toLocaleString()} FCFA</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{total.toLocaleString()} FCFA</span>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Confirmer la commande
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  )
}
