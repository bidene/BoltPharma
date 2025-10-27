import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { query } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Récupérer les notifications de l'utilisateur
    const notifications = await query(
      `SELECT * FROM notifications 
       WHERE user_id = ? AND user_type = ?
       ORDER BY created_at DESC
       LIMIT 50`,
      [user.id, user.type],
    )

    return NextResponse.json({ notifications })
  } catch (error) {
    console.error("Erreur récupération notifications:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { notificationId } = await request.json()

    // Marquer la notification comme lue
    await query("UPDATE notifications SET is_read = TRUE WHERE id = ? AND user_id = ?", [notificationId, user.id])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erreur mise à jour notification:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
