"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react"

export default function PanierPage() {
  const router = useRouter()
  const { items, updateQuantity, removeItem, totalPrice, loading } = useCart()
  const [updatingItems, setUpdatingItems] = useState<Set<number>>(new Set())

  const handleUpdateQuantity = async (medicationId: number, newQuantity: number) => {
    setUpdatingItems((prev) => new Set(prev).add(medicationId))
    try {
      await updateQuantity(medicationId, newQuantity)
    } finally {
      setUpdatingItems((prev) => {
        const next = new Set(prev)
        next.delete(medicationId)
        return next
      })
    }
  }

  const handleRemove = async (medicationId: number) => {
    setUpdatingItems((prev) => new Set(prev).add(medicationId))
    try {
      await removeItem(medicationId)
    } finally {
      setUpdatingItems((prev) => {
        const next = new Set(prev)
        next.delete(medicationId)
        return next
      })
    }
  }

  const deliveryFee = items.length > 0 ? 1000 : 0
  const total = totalPrice + deliveryFee

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">Chargement...</div>
        </main>
        <Footer />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <Card className="mx-auto max-w-md text-center">
            <CardContent className="pt-12 pb-8">
              <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
              <h2 className="mt-6 text-2xl font-bold">Votre panier est vide</h2>
              <p className="mt-2 text-muted-foreground">Ajoutez des médicaments pour commencer vos achats</p>
            </CardContent>
            <CardFooter className="justify-center pb-12">
              <Button asChild size="lg">
                <Link href="/catalogue">
                  Parcourir le catalogue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Mon Panier</h1>
          <p className="mt-2 text-muted-foreground">{items.length} article(s) dans votre panier</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Liste des articles */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.medication_id}>
                      <div className="flex gap-4">
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border">
                          <Image
                            src={item.image_url || "/placeholder.svg?height=96&width=96"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">{item.pharmacy_name}</p>
                              {item.requires_prescription && (
                                <Badge variant="outline" className="mt-1">
                                  Ordonnance requise
                                </Badge>
                              )}
                            </div>
                            <p className="text-lg font-bold">{item.price.toLocaleString()} FCFA</p>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 bg-transparent"
                                onClick={() => handleUpdateQuantity(item.medication_id, item.quantity - 1)}
                                disabled={updatingItems.has(item.medication_id)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <Input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                  handleUpdateQuantity(item.medication_id, Number.parseInt(e.target.value) || 1)
                                }
                                className="h-8 w-16 text-center"
                                disabled={updatingItems.has(item.medication_id)}
                              />
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 bg-transparent"
                                onClick={() => handleUpdateQuantity(item.medication_id, item.quantity + 1)}
                                disabled={updatingItems.has(item.medication_id)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleRemove(item.medication_id)}
                              disabled={updatingItems.has(item.medication_id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Retirer
                            </Button>
                          </div>
                        </div>
                      </div>
                      <Separator className="mt-6" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Résumé de la commande */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Résumé de la commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span className="font-medium">{totalPrice.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frais de livraison</span>
                  <span className="font-medium">{deliveryFee.toLocaleString()} FCFA</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{total.toLocaleString()} FCFA</span>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button className="w-full" size="lg" onClick={() => router.push("/commander")}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Passer la commande
                </Button>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/catalogue">Continuer mes achats</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
