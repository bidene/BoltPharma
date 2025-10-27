"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Package, Clock, CheckCircle, XCircle, User, MapPin, Phone, Mail, Loader2 } from "lucide-react"
import Link from "next/link"

export default function TableauDeBordPage() {
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<any[]>([])
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    delivered: 0,
    cancelled: 0,
  })

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const response = await fetch("/api/user/orders")
      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders || [])

        // Calculer les statistiques
        const stats = {
          total: data.orders.length,
          pending: data.orders.filter((o: any) => ["pending", "validated", "preparing"].includes(o.status)).length,
          delivered: data.orders.filter((o: any) => o.status === "delivered").length,
          cancelled: data.orders.filter((o: any) => o.status === "cancelled").length,
        }
        setStats(stats)
      }
    } catch (error) {
      console.error("[v0] Error loading dashboard:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<
      string,
      { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
    > = {
      pending: { label: "En attente", variant: "secondary" },
      validated: { label: "Validée", variant: "default" },
      preparing: { label: "En préparation", variant: "default" },
      ready: { label: "Prête", variant: "default" },
      in_delivery: { label: "En livraison", variant: "default" },
      delivered: { label: "Livrée", variant: "outline" },
      cancelled: { label: "Annulée", variant: "destructive" },
    }

    const config = statusConfig[status] || { label: status, variant: "secondary" }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig: Record<
      string,
      { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
    > = {
      pending: { label: "En attente", variant: "secondary" },
      paid: { label: "Payé", variant: "default" },
      failed: { label: "Échoué", variant: "destructive" },
      refunded: { label: "Remboursé", variant: "outline" },
    }

    const config = statusConfig[status] || { label: status, variant: "secondary" }
    return <Badge variant={config.variant}>{config.label}</Badge>
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

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Mon Tableau de Bord</h1>
          <p className="mt-2 text-muted-foreground">Gérez vos commandes et votre profil</p>
        </div>

        {/* Statistiques */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total commandes</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En cours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Livrées</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.delivered}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Annulées</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.cancelled}</div>
            </CardContent>
          </Card>
        </div>

        {/* Contenu principal */}
        <Tabs defaultValue="commandes" className="space-y-6">
          <TabsList>
            <TabsTrigger value="commandes">Mes Commandes</TabsTrigger>
            <TabsTrigger value="profil">Mon Profil</TabsTrigger>
          </TabsList>

          {/* Onglet Commandes */}
          <TabsContent value="commandes" className="space-y-4">
            {orders.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Package className="h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">Aucune commande</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Vous n'avez pas encore passé de commande</p>
                  <Button asChild className="mt-4">
                    <Link href="/catalogue">Parcourir le catalogue</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">Commande #{order.order_number}</CardTitle>
                        <CardDescription>
                          {new Date(order.created_at).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col gap-2">
                        {getStatusBadge(order.status)}
                        {getPaymentStatusBadge(order.payment_status)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium">Pharmacie</p>
                        <p className="text-sm text-muted-foreground">{order.pharmacy_name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Montant total</p>
                        <p className="text-sm text-muted-foreground">
                          {(
                            Number.parseFloat(order.total_amount) + Number.parseFloat(order.delivery_fee)
                          ).toLocaleString()}{" "}
                          FCFA
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Adresse de livraison</p>
                        <p className="text-sm text-muted-foreground">{order.delivery_address}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Méthode de paiement</p>
                        <p className="text-sm text-muted-foreground">
                          {order.payment_method === "mtn" && "MTN Mobile Money"}
                          {order.payment_method === "moov" && "MOOV Money"}
                          {order.payment_method === "celtis" && "CELTIS"}
                          {order.payment_method === "cash" && "Paiement à la livraison"}
                        </p>
                      </div>
                    </div>

                    {order.gozem_tracking_url && (
                      <div className="rounded-lg bg-muted p-4">
                        <p className="text-sm font-medium">Suivi de livraison</p>
                        <Button variant="link" className="h-auto p-0" asChild>
                          <a href={order.gozem_tracking_url} target="_blank" rel="noopener noreferrer">
                            Suivre ma livraison GoZem
                          </a>
                        </Button>
                      </div>
                    )}

                    <Separator />

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/commande/${order.id}`}>Voir les détails</Link>
                      </Button>
                      {order.payment_status === "pending" && order.payment_method !== "cash" && (
                        <Button size="sm" asChild>
                          <Link href={`/paiement/${order.id}`}>Payer maintenant</Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Onglet Profil */}
          <TabsContent value="profil">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>Gérez vos informations de compte</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <User className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="font-medium">Nom complet</p>
                    <p className="text-sm text-muted-foreground">À configurer</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">À configurer</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Téléphone</p>
                      <p className="text-sm text-muted-foreground">À configurer</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Adresse</p>
                      <p className="text-sm text-muted-foreground">À configurer</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex gap-2">
                  <Button>Modifier le profil</Button>
                  <Button variant="outline">Changer le mot de passe</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}
