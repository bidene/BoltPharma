import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { query } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user || user.userType !== "pharmacy") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 })
    }

    const orders = await query(
      `SELECT 
        o.id,
        o.status,
        o.total_amount,
        o.created_at,
        u.name as customer_name,
        COUNT(oi.id) as items_count
       FROM orders o
       JOIN users u ON o.user_id = u.id
       LEFT JOIN order_items oi ON o.id = oi.order_id
       WHERE o.pharmacy_id = ?
       GROUP BY o.id
       ORDER BY o.created_at DESC
       LIMIT 10`,
      [user.userId],
    )

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Erreur:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
