"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Package, MapPin, CreditCard, Truck, Loader2 } from "lucide-react"

export default function CommandeDetailsPage() {
  const params = useParams()
  const orderId = params.orderId as string

  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState<any>(null)
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    loadOrderDetails()
  }, [orderId])

  const loadOrderDetails = async () => {
    try {
      const [orderRes, itemsRes] = await Promise.all([
        fetch(`/api/orders/${orderId}`),
        fetch(`/api/orders/${orderId}/items`),
      ])

      if (orderRes.ok) {
        const orderData = await orderRes.json()
        setOrder(orderData.order)
      }

      if (itemsRes.ok) {
        const itemsData = await itemsRes.json()
        setItems(itemsData.items || [])
      }
    } catch (error) {
      console.error("[v0] Error loading order details:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <Card className="mx-auto max-w-md text-center">
            <CardContent className="pt-12 pb-8">
              <Package className="mx-auto h-12 w-12 text-muted-foreground" />
              <h2 className="mt-4 text-xl font-bold">Commande non trouvée</h2>
              <Button asChild className="mt-4">
                <Link href="/tableau-de-bord">Retour au tableau de bord</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  const totalAmount = Number.parseFloat(order.total_amount) + Number.parseFloat(order.delivery_fee)

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/tableau-de-bord">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au tableau de bord
            </Link>
          </Button>
        </div>

        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Commande #{order.order_number}</h1>
              <p className="mt-2 text-muted-foreground">
                Passée le{" "}
                {new Date(order.created_at).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Badge>{order.status}</Badge>
              <Badge variant="outline">{order.payment_status}</Badge>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Détails de la commande */}
          <div className="lg:col-span-2 space-y-6">
            {/* Articles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Articles commandés
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border">
                        <Image
                          src={item.image_url || "/placeholder.svg?height=80&width=80"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 justify-between">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Quantité: {item.quantity}</p>
                        </div>
                        <p className="font-medium">{item.subtotal.toLocaleString()} FCFA</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Informations de livraison */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Informations de livraison
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Adresse</p>
                  <p className="text-sm text-muted-foreground">{order.delivery_address}</p>
                  <p className="text-sm text-muted-foreground">{order.delivery_city}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Téléphone</p>
                  <p className="text-sm text-muted-foreground">{order.delivery_phone}</p>
                </div>
                {order.delivery_notes && (
                  <div>
                    <p className="text-sm font-medium">Instructions</p>
                    <p className="text-sm text-muted-foreground">{order.delivery_notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Suivi de livraison */}
            {order.gozem_tracking_url && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Suivi de livraison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <a href={order.gozem_tracking_url} target="_blank" rel="noopener noreferrer">
                      Suivre ma livraison GoZem
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Résumé */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Résumé</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span>{Number.parseFloat(order.total_amount).toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frais de livraison</span>
                  <span>{Number.parseFloat(order.delivery_fee).toLocaleString()} FCFA</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{totalAmount.toLocaleString()} FCFA</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Paiement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Méthode</p>
                  <p className="text-sm text-muted-foreground">
                    {order.payment_method === "mtn" && "MTN Mobile Money"}
                    {order.payment_method === "moov" && "MOOV Money"}
                    {order.payment_method === "celtis" && "CELTIS"}
                    {order.payment_method === "cash" && "Paiement à la livraison"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Statut</p>
                  <Badge variant={order.payment_status === "paid" ? "default" : "secondary"}>
                    {order.payment_status === "paid" ? "Payé" : "En attente"}
                  </Badge>
                </div>
                {order.payment_status === "pending" && order.payment_method !== "cash" && (
                  <Button asChild className="w-full">
                    <Link href={`/paiement/${order.id}`}>Payer maintenant</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
