import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyAuth } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const medicationId = searchParams.get("medicationId")

    if (!medicationId) {
      return NextResponse.json({ error: "ID du médicament requis" }, { status: 400 })
    }

    const reviews = await query(
      `SELECT r.*, u.name as user_name 
       FROM reviews r 
       JOIN users u ON r.user_id = u.id 
       WHERE r.medication_id = ? 
       ORDER BY r.created_at DESC`,
      [medicationId],
    )

    const stats = await query(
      `SELECT 
        COUNT(*) as total,
        AVG(rating) as average,
        SUM(CASE WHEN rating = 5 THEN 1 ELSE 0 END) as five_star,
        SUM(CASE WHEN rating = 4 THEN 1 ELSE 0 END) as four_star,
        SUM(CASE WHEN rating = 3 THEN 1 ELSE 0 END) as three_star,
        SUM(CASE WHEN rating = 2 THEN 1 ELSE 0 END) as two_star,
        SUM(CASE WHEN rating = 1 THEN 1 ELSE 0 END) as one_star
       FROM reviews 
       WHERE medication_id = ?`,
      [medicationId],
    )

    return NextResponse.json({
      reviews,
      stats: stats[0],
    })
  } catch (error) {
    console.error("[v0] Error fetching reviews:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération des avis" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    const { medicationId, rating, comment } = await request.json()

    if (!medicationId || !rating) {
      return NextResponse.json({ error: "Données manquantes" }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Note invalide" }, { status: 400 })
    }

    const result = await query("INSERT INTO reviews (user_id, medication_id, rating, comment) VALUES (?, ?, ?, ?)", [
      user.id,
      medicationId,
      rating,
      comment,
    ])

    return NextResponse.json({
      success: true,
      reviewId: result.insertId,
    })
  } catch (error) {
    console.error("[v0] Error creating review:", error)
    return NextResponse.json({ error: "Erreur lors de la création de l'avis" }, { status: 500 })
  }
}
