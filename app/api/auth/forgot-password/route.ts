import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const { email, type } = await request.json()

    if (!email || !type) {
      return NextResponse.json({ error: "Email et type requis" }, { status: 400 })
    }

    // Générer un token de réinitialisation sécurisé
    const resetToken = crypto.randomBytes(32).toString("hex")
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 heure

    // Mettre à jour le token dans la base de données
    if (type === "user") {
      const users = await query("SELECT id, email, first_name FROM users WHERE email = ?", [email])

      if (users.length === 0) {
        // Pour des raisons de sécurité, on retourne toujours un succès
        return NextResponse.json({ message: "Email envoyé si le compte existe" })
      }

      await query("UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?", [
        resetToken,
        resetTokenExpiry,
        email,
      ])

      // TODO: Envoyer l'email avec le lien de réinitialisation
      // const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reinitialiser-mot-de-passe?token=${resetToken}&type=user`
      // await sendResetEmail(email, resetUrl, users[0].first_name)

      console.log("[v0] Reset token for user:", resetToken)
      console.log(
        "[v0] Reset URL:",
        `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reinitialiser-mot-de-passe?token=${resetToken}&type=user`,
      )
    } else if (type === "pharmacy") {
      const pharmacies = await query("SELECT id, email, name FROM pharmacies WHERE email = ?", [email])

      if (pharmacies.length === 0) {
        // Pour des raisons de sécurité, on retourne toujours un succès
        return NextResponse.json({ message: "Email envoyé si le compte existe" })
      }

      await query("UPDATE pharmacies SET reset_token = ?, reset_token_expiry = ? WHERE email = ?", [
        resetToken,
        resetTokenExpiry,
        email,
      ])

      // TODO: Envoyer l'email avec le lien de réinitialisation
      // const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reinitialiser-mot-de-passe?token=${resetToken}&type=pharmacy`
      // await sendResetEmail(email, resetUrl, pharmacies[0].name)

      console.log("[v0] Reset token for pharmacy:", resetToken)
      console.log(
        "[v0] Reset URL:",
        `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reinitialiser-mot-de-passe?token=${resetToken}&type=pharmacy`,
      )
    } else {
      return NextResponse.json({ error: "Type invalide" }, { status: 400 })
    }

    return NextResponse.json({
      message: "Si un compte existe avec cet email, un lien de réinitialisation a été envoyé",
    })
  } catch (error) {
    console.error("[v0] Forgot password error:", error)
    return NextResponse.json({ error: "Erreur lors de la demande de réinitialisation" }, { status: 500 })
  }
}
