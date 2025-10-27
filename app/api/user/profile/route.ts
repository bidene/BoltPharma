import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { query } from "@/lib/db"
import { mockUsers } from "@/lib/mock-db"

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    // <CHANGE> Utiliser user.id et chercher dans les données mockées
    const userData = mockUsers.find((u) => u.id === user.id)

    if (!userData) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 })
    }

    return NextResponse.json({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      address: userData.address || "",
      date_of_birth: userData.date_of_birth || "",
      gender: userData.gender || "",
      loyalty_points: userData.loyalty_points || 0,
      created_at: userData.created_at,
    })
  } catch (error) {
    console.error("[v0] Erreur:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    const body = await request.json()
    const { name, phone, address, date_of_birth, gender } = body

    // <CHANGE> Utiliser user.id au lieu de user.userId
    await query("UPDATE users SET name = ?, phone = ?, address = ?, date_of_birth = ?, gender = ? WHERE id = ?", [
      name,
      phone,
      address,
      date_of_birth,
      gender,
      user.id,
    ])

    return NextResponse.json({ success: true, message: "Profil mis à jour" })
  } catch (error) {
    console.error("[v0] Erreur:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
