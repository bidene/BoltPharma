import { PharmacySidebar } from "@/components/pharmacy-sidebar"
import { PharmacyHeader } from "@/components/pharmacy-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, ShoppingBag, TrendingUp, DollarSign, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const stats = [
  {
    title: "Commandes aujourd'hui",
    value: "24",
    change: "+12%",
    icon: ShoppingBag,
    color: "text-blue-600",
  },
  {
    title: "Revenus du jour",
    value: "125,000 FCFA",
    change: "+8%",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Produits en stock",
    value: "1,234",
    change: "-5%",
    icon: Package,
    color: "text-orange-600",
  },
  {
    title: "Taux de satisfaction",
    value: "98%",
    change: "+2%",
    icon: TrendingUp,
    color: "text-purple-600",
  },
]

const recentOrders = [
  {
    id: "CMD-001",
    customer: "Jean Kouassi",
    items: 3,
    total: 8500,
    status: "pending",
    time: "Il y a 5 min",
  },
  {
    id: "CMD-002",
    customer: "Marie Diallo",
    items: 2,
    total: 5000,
    status: "validated",
    time: "Il y a 15 min",
  },
  {
    id: "CMD-003",
    customer: "Paul Mensah",
    items: 5,
    total: 12000,
    status: "in_delivery",
    time: "Il y a 30 min",
  },
  {
    id: "CMD-004",
    customer: "Sophie Traoré",
    items: 1,
    total: 2500,
    status: "delivered",
    time: "Il y a 1h",
  },
]

const chartData = [
  { name: "Lun", commandes: 12, revenus: 45000 },
  { name: "Mar", commandes: 19, revenus: 68000 },
  { name: "Mer", commandes: 15, revenus: 52000 },
  { name: "Jeu", commandes: 22, revenus: 78000 },
  { name: "Ven", commandes: 28, revenus: 95000 },
  { name: "Sam", commandes: 31, revenus: 110000 },
  { name: "Dim", commandes: 24, revenus: 85000 },
]

const statusConfig = {
  pending: { label: "En attente", icon: Clock, color: "bg-yellow-500" },
  validated: { label: "Validée", icon: CheckCircle, color: "bg-blue-500" },
  in_delivery: { label: "En livraison", icon: AlertCircle, color: "bg-purple-500" },
  delivered: { label: "Livrée", icon: CheckCircle, color: "bg-green-500" },
  cancelled: { label: "Annulée", icon: XCircle, color: "bg-red-500" },
}

export default function PharmacyDashboardPage() {
  return (
    <div className="flex h-screen">
      <PharmacySidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PharmacyHeader pharmacyName="Pharmacie Centrale" />
        <main className="flex-1 overflow-y-auto bg-muted/30 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
            <p className="text-muted-foreground">Vue d'ensemble de votre activité</p>
          </div>

          {/* Stats Grid */}
          <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className={stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}>
                        {stat.change}
                      </span>{" "}
                      par rapport à hier
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Commandes de la semaine</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="commandes" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Commandes récentes</CardTitle>
                <Button variant="outline" size="sm">
                  Voir tout
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => {
                    const status = statusConfig[order.status as keyof typeof statusConfig]
                    const StatusIcon = status.icon
                    return (
                      <div key={order.id} className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${status.color} text-white`}
                          >
                            <StatusIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-semibold">{order.id}</div>
                            <div className="text-sm text-muted-foreground">
                              {order.customer} • {order.items} articles
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{order.total} FCFA</div>
                          <div className="text-sm text-muted-foreground">{order.time}</div>
                        </div>
                        <Badge variant="outline">{status.label}</Badge>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
