import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyAuth } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // <CHANGE> Retourner des avis mockés pour le développement
    const mockReviews = [
      {
        id: 1,
        user_name: "Jean Dupont",
        rating: 5,
        comment: "Excellent produit, livraison rapide!",
        verified_purchase: true,
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 2,
        user_name: "Marie Martin",
        rating: 4,
        comment: "Bon produit, conforme à la description",
        verified_purchase: true,
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ]

    return NextResponse.json(mockReviews)
  } catch (error) {
    console.error("[v0] Erreur:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    const body = await request.json()
    const { rating, comment } = body

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Note invalide" }, { status: 400 })
    }

    // <CHANGE> Ajouter l'avis aux données mockées
    await query("INSERT INTO reviews (user_id, medication_id, rating, comment) VALUES (?, ?, ?, ?)", [
      user.id,
      params.id,
      rating,
      comment,
    ])

    return NextResponse.json({ success: true, message: "Avis ajouté" })
  } catch (error) {
    console.error("[v0] Erreur:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
