import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const token = searchParams.get("token")
    const type = searchParams.get("type")

    if (!token || !type) {
      return NextResponse.json({ error: "Token et type requis" }, { status: 400 })
    }

    if (type === "user") {
      const users = await query("SELECT id FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()", [token])

      if (users.length === 0) {
        return NextResponse.json({ error: "Token invalide ou expiré" }, { status: 400 })
      }
    } else if (type === "pharmacy") {
      const pharmacies = await query("SELECT id FROM pharmacies WHERE reset_token = ? AND reset_token_expiry > NOW()", [
        token,
      ])

      if (pharmacies.length === 0) {
        return NextResponse.json({ error: "Token invalide ou expiré" }, { status: 400 })
      }
    } else {
      return NextResponse.json({ error: "Type invalide" }, { status: 400 })
    }

    return NextResponse.json({ valid: true })
  } catch (error) {
    console.error("[v0] Verify token error:", error)
    return NextResponse.json({ error: "Erreur lors de la vérification du token" }, { status: 500 })
  }
}
