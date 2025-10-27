import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { token, type, password } = await request.json()

    if (!token || !type || !password) {
      return NextResponse.json({ error: "Données manquantes" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Le mot de passe doit contenir au moins 8 caractères" }, { status: 400 })
    }

    // Hasher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(password, 10)

    if (type === "user") {
      // Vérifier le token et sa validité
      const users = await query("SELECT id FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()", [token])

      if (users.length === 0) {
        return NextResponse.json({ error: "Token invalide ou expiré" }, { status: 400 })
      }

      // Mettre à jour le mot de passe et supprimer le token
      await query("UPDATE users SET password_hash = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?", [
        hashedPassword,
        users[0].id,
      ])
    } else if (type === "pharmacy") {
      // Vérifier le token et sa validité
      const pharmacies = await query("SELECT id FROM pharmacies WHERE reset_token = ? AND reset_token_expiry > NOW()", [
        token,
      ])

      if (pharmacies.length === 0) {
        return NextResponse.json({ error: "Token invalide ou expiré" }, { status: 400 })
      }

      // Mettre à jour le mot de passe et supprimer le token
      await query(
        "UPDATE pharmacies SET password_hash = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?",
        [hashedPassword, pharmacies[0].id],
      )
    } else {
      return NextResponse.json({ error: "Type invalide" }, { status: 400 })
    }

    return NextResponse.json({ message: "Mot de passe réinitialisé avec succès" })
  } catch (error) {
    console.error("[v0] Reset password error:", error)
    return NextResponse.json({ error: "Erreur lors de la réinitialisation du mot de passe" }, { status: 500 })
  }
}
