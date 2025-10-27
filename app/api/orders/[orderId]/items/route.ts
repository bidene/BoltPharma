import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyAuth } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { orderId: string } }) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    // Vérifier que la commande appartient à l'utilisateur
    const orders = await query("SELECT id FROM orders WHERE id = ? AND user_id = ?", [params.orderId, user.id])

    if (orders.length === 0) {
      return NextResponse.json({ error: "Commande non trouvée" }, { status: 404 })
    }

    // Récupérer les articles
    const items = await query(
      `SELECT 
        oi.*,
        m.name,
        m.image_url
      FROM order_items oi
      JOIN medications m ON oi.medication_id = m.id
      WHERE oi.order_id = ?`,
      [params.orderId],
    )

    return NextResponse.json({ items })
  } catch (error) {
    console.error("[v0] Get order items error:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération des articles" }, { status: 500 })
  }
}
