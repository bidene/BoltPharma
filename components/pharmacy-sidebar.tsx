"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LayoutDashboard, Package, ShoppingBag, BarChart3, Settings, LogOut, Bell } from "lucide-react"

const navigation = [
  {
    name: "Tableau de bord",
    href: "/pharmacie/tableau-de-bord",
    icon: LayoutDashboard,
  },
  {
    name: "Produits",
    href: "/pharmacie/produits",
    icon: Package,
  },
  {
    name: "Commandes",
    href: "/pharmacie/commandes",
    icon: ShoppingBag,
  },
  {
    name: "Statistiques",
    href: "/pharmacie/statistiques",
    icon: BarChart3,
  },
  {
    name: "Notifications",
    href: "/pharmacie/notifications",
    icon: Bell,
  },
  {
    name: "Paramètres",
    href: "/pharmacie/parametres",
    icon: Settings,
  },
]

export function PharmacySidebar() {
  const pathname = usePathname()

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    window.location.href = "/connexion"
  }

  return (
    <div className="flex h-full w-64 flex-col border-r bg-muted/30">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-bold text-primary">BoltPharma</div>
          <div className="text-xs text-muted-foreground">Espace Pharmacie</div>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn("w-full justify-start gap-3", isActive && "bg-secondary font-semibold")}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Logout */}
      <div className="border-t p-3">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </Button>
      </div>
    </div>
  )
}
