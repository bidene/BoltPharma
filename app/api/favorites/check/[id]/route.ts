import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { query } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ isFavorite: false })
    }

    // <CHANGE> Utiliser user.id au lieu de user.userId
    const favorites = await query("SELECT id FROM favorites WHERE user_id = ? AND medication_id = ?", [
      user.id,
      params.id,
    ])

    return NextResponse.json({ isFavorite: favorites.length > 0 })
  } catch (error) {
    console.error("[v0] Erreur:", error)
    return NextResponse.json({ isFavorite: false })
  }
}
