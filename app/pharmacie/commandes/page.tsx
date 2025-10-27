"use client"

import { useState } from "react"
import { PharmacySidebar } from "@/components/pharmacy-sidebar"
import { PharmacyHeader } from "@/components/pharmacy-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, CheckCircle, XCircle, AlertCircle, Eye, Package } from "lucide-react"

const orders = [
  {
    id: "CMD-001",
    orderNumber: "BP-2025-001",
    customer: "Jean Kouassi",
    phone: "+229 96 00 00 00",
    items: [
      { name: "Paracétamol 500mg", quantity: 2, price: 500 },
      { name: "Vitamine C 1000mg", quantity: 1, price: 1500 },
    ],
    total: 2500,
    status: "pending",
    paymentStatus: "pending",
    createdAt: "2025-01-10 14:30",
    address: "Quartier Akpakpa, Rue 123, Cotonou",
  },
  {
    id: "CMD-002",
    orderNumber: "BP-2025-002",
    customer: "Marie Diallo",
    phone: "+229 97 00 00 00",
    items: [
      { name: "Amoxicilline 500mg", quantity: 1, price: 2500 },
      { name: "Ibuprofène 400mg", quantity: 2, price: 800 },
    ],
    total: 4100,
    status: "validated",
    paymentStatus: "paid",
    createdAt: "2025-01-10 13:15",
    address: "Avenue Steinmetz, Cotonou",
  },
  {
    id: "CMD-003",
    orderNumber: "BP-2025-003",
    customer: "Paul Mensah",
    phone: "+229 95 00 00 00",
    items: [{ name: "Artéméther + Luméfantrine", quantity: 1, price: 4500 }],
    total: 4500,
    status: "in_delivery",
    paymentStatus: "paid",
    createdAt: "2025-01-10 12:00",
    address: "Quartier Cadjehoun, Cotonou",
  },
]

const statusConfig = {
  pending: { label: "En attente", icon: Clock, color: "bg-yellow-500", variant: "secondary" as const },
  validated: { label: "Validée", icon: CheckCircle, color: "bg-blue-500", variant: "default" as const },
  preparing: { label: "En préparation", icon: Package, color: "bg-purple-500", variant: "default" as const },
  in_delivery: { label: "En livraison", icon: AlertCircle, color: "bg-orange-500", variant: "default" as const },
  delivered: { label: "Livrée", icon: CheckCircle, color: "bg-green-500", variant: "default" as const },
  cancelled: { label: "Annulée", icon: XCircle, color: "bg-red-500", variant: "destructive" as const },
}

export default function PharmacyOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<(typeof orders)[0] | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  const handleViewOrder = (order: (typeof orders)[0]) => {
    setSelectedOrder(order)
    setIsDetailDialogOpen(true)
  }

  const handleUpdateStatus = (newStatus: string) => {
    console.log("Update status to:", newStatus)
    setIsDetailDialogOpen(false)
  }

  return (
    <div className="flex h-screen">
      <PharmacySidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PharmacyHeader pharmacyName="Pharmacie Centrale" />
        <main className="flex-1 overflow-y-auto bg-muted/30 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Gestion des commandes</h1>
            <p className="text-muted-foreground">Suivez et gérez toutes vos commandes</p>
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="pending">En attente</TabsTrigger>
              <TabsTrigger value="validated">Validées</TabsTrigger>
              <TabsTrigger value="in_delivery">En livraison</TabsTrigger>
              <TabsTrigger value="delivered">Livrées</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Toutes les commandes</CardTitle>
                  <CardDescription>{orders.length} commandes au total</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>N° Commande</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Articles</TableHead>
                        <TableHead>Montant</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => {
                        const status = statusConfig[order.status as keyof typeof statusConfig]
                        return (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.orderNumber}</TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{order.customer}</div>
                                <div className="text-sm text-muted-foreground">{order.phone}</div>
                              </div>
                            </TableCell>
                            <TableCell>{order.items.length} articles</TableCell>
                            <TableCell className="font-semibold">{order.total} FCFA</TableCell>
                            <TableCell>
                              <Badge variant={status.variant}>{status.label}</Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">{order.createdAt}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" onClick={() => handleViewOrder(order)}>
                                <Eye className="mr-2 h-4 w-4" />
                                Voir
                              </Button>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Order Detail Dialog */}
          <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Détails de la commande</DialogTitle>
                <DialogDescription>{selectedOrder?.orderNumber}</DialogDescription>
              </DialogHeader>
              {selectedOrder && (
                <div className="space-y-6">
                  {/* Customer Info */}
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-3 font-semibold">Informations client</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Nom:</span>
                        <span className="font-medium">{selectedOrder.customer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Téléphone:</span>
                        <span className="font-medium">{selectedOrder.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Adresse:</span>
                        <span className="font-medium text-right">{selectedOrder.address}</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-3 font-semibold">Articles commandés</h3>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-muted-foreground">Quantité: {item.quantity}</div>
                          </div>
                          <div className="font-semibold">{item.price * item.quantity} FCFA</div>
                        </div>
                      ))}
                      <div className="border-t pt-3">
                        <div className="flex justify-between font-bold">
                          <span>Total</span>
                          <span>{selectedOrder.total} FCFA</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Update */}
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-3 font-semibold">Mettre à jour le statut</h3>
                    <Select onValueChange={handleUpdateStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir un statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="validated">Valider la commande</SelectItem>
                        <SelectItem value="preparing">Marquer en préparation</SelectItem>
                        <SelectItem value="ready">Prêt pour livraison</SelectItem>
                        <SelectItem value="cancelled">Annuler la commande</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
                  Fermer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  )
}
