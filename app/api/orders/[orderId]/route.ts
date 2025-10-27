import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyAuth } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { orderId: string } }) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    const orders = await query(`SELECT * FROM orders WHERE id = ? AND user_id = ?`, [params.orderId, user.id])

    if (orders.length === 0) {
      return NextResponse.json({ error: "Commande non trouvée" }, { status: 404 })
    }

    return NextResponse.json({ order: orders[0] })
  } catch (error) {
    console.error("[v0] Get order error:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération de la commande" }, { status: 500 })
  }
}
