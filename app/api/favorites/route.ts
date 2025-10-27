import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyAuth } from "@/lib/auth"
import { mockMedications } from "@/lib/mock-db"

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    const mockFavorites = mockMedications.slice(0, 3).map((m) => ({
      id: m.id,
      user_id: user.id,
      medication_id: m.id,
      name: m.name,
      description: m.description,
      price: m.price,
      image_url: m.image_url,
      category: m.category,
      pharmacy_name: "Pharmacie Centrale",
      created_at: new Date().toISOString(),
    }))

    return NextResponse.json({ favorites: mockFavorites })
  } catch (error) {
    console.error("[v0] Error fetching favorites:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération des favoris" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    const { medicationId } = await request.json()

    if (!medicationId) {
      return NextResponse.json({ error: "ID du médicament requis" }, { status: 400 })
    }

    const existing = await query("SELECT id FROM favorites WHERE user_id = ? AND medication_id = ?", [
      user.id,
      medicationId,
    ])

    if (existing.length > 0) {
      // Retirer des favoris
      await query("DELETE FROM favorites WHERE user_id = ? AND medication_id = ?", [user.id, medicationId])
      return NextResponse.json({ success: true, action: "removed" })
    } else {
      // Ajouter aux favoris
      await query("INSERT INTO favorites (user_id, medication_id) VALUES (?, ?)", [user.id, medicationId])
      return NextResponse.json({ success: true, action: "added" })
    }
  } catch (error) {
    console.error("[v0] Error toggling favorite:", error)
    return NextResponse.json({ error: "Erreur lors de la modification des favoris" }, { status: 500 })
  }
}
