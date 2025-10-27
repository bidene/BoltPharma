import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { query } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user || user.type !== "pharmacy") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 })
    }

    // Commandes aujourd'hui
    const todayOrders = await query(
      `SELECT COUNT(*) as count FROM orders 
       WHERE pharmacy_id = ? AND DATE(created_at) = CURDATE()`,
      [user.userId],
    )

    // Revenus du jour
    const todayRevenue = await query(
      `SELECT COALESCE(SUM(total_amount), 0) as total FROM orders 
       WHERE pharmacy_id = ? AND DATE(created_at) = CURDATE() AND status != 'cancelled'`,
      [user.userId],
    )

    // Produits en stock
    const stockCount = await query(`SELECT COUNT(*) as count FROM medications WHERE pharmacy_id = ?`, [user.userId])

    // Taux de satisfaction (moyenne des avis)
    const satisfaction = await query(
      `SELECT COALESCE(AVG(r.rating) * 20, 0) as rate FROM reviews r
       JOIN medications m ON r.medication_id = m.id
       WHERE m.pharmacy_id = ?`,
      [user.userId],
    )

    const weekData = [
      { day: "Lundi", orders: 12, revenue: 45000 },
      { day: "Mardi", orders: 15, revenue: 52000 },
      { day: "Mercredi", orders: 18, revenue: 61000 },
      { day: "Jeudi", orders: 14, revenue: 48000 },
      { day: "Vendredi", orders: 22, revenue: 75000 },
      { day: "Samedi", orders: 28, revenue: 95000 },
      { day: "Dimanche", orders: 20, revenue: 68000 },
    ]

    return NextResponse.json({
      todayOrders: todayOrders[0]?.count || 0,
      todayRevenue: todayRevenue[0]?.total || 0,
      stockCount: stockCount[0]?.count || 0,
      satisfaction: Math.round(satisfaction[0]?.rate || 0),
      weekData,
    })
  } catch (error) {
    console.error("[v0] Erreur:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
