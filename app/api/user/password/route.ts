import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { query } from "@/lib/db"
import { verifyPassword, hashPassword } from "@/lib/auth"
import { mockUsers } from "@/lib/mock-db"

export async function PUT(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    const body = await request.json()
    const { currentPassword, newPassword } = body

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 })
    }

    const userData = mockUsers.find((u) => u.id === user.id)

    if (!userData) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 })
    }

    const isValid = await verifyPassword(currentPassword, userData.password_hash)
    if (!isValid) {
      return NextResponse.json({ error: "Mot de passe actuel incorrect" }, { status: 400 })
    }

    // Hasher le nouveau mot de passe
    const hashedPassword = await hashPassword(newPassword)

    // Mettre à jour
    await query("UPDATE users SET password_hash = ? WHERE id = ?", [hashedPassword, user.id])

    return NextResponse.json({ success: true, message: "Mot de passe mis à jour" })
  } catch (error) {
    console.error("[v0] Erreur:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
