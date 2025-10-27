import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyAuth } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    const orders = await query(
      `SELECT 
        o.*,
        p.name as pharmacy_name
      FROM orders o
      JOIN pharmacies p ON o.pharmacy_id = p.id
      WHERE o.user_id = ?
      ORDER BY o.created_at DESC`,
      [user.id],
    )

    return NextResponse.json({ orders })
  } catch (error) {
    console.error("[v0] Get user orders error:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération des commandes" }, { status: 500 })
  }
}
