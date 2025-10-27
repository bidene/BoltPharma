import { type NextRequest, NextResponse } from "next/server"
import { verifyPassword, setSession } from "@/lib/auth"
import { findPharmacyByEmail } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validation
    if (!email || !password) {
      return NextResponse.json({ error: "Email et mot de passe requis" }, { status: 400 })
    }

    // Trouver la pharmacie
    const pharmacy = await findPharmacyByEmail(email)
    console.log("[v0] Pharmacy login attempt for:", email)
    console.log("[v0] Pharmacy found:", pharmacy ? "Yes" : "No")
    if (!pharmacy) {
      return NextResponse.json({ error: "Email ou mot de passe incorrect" }, { status: 401 })
    }

    // Vérifier le mot de passe
    const isValidPassword = await verifyPassword(password, pharmacy.password_hash)
    console.log("[v0] Password verification starting...")
    console.log("[v0] Password valid:", isValidPassword)
    if (!isValidPassword) {
      return NextResponse.json({ error: "Email ou mot de passe incorrect" }, { status: 401 })
    }

    // Vérifier si la pharmacie est vérifiée
    if (!pharmacy.is_verified) {
      return NextResponse.json({ error: "Votre compte est en attente de validation" }, { status: 403 })
    }

    // Créer la session
    await setSession({
      id: pharmacy.id,
      email: pharmacy.email,
      type: "pharmacy",
      name: pharmacy.name,
    })

    console.log("[v0] Pharmacy session created successfully")

    return NextResponse.json({
      success: true,
      pharmacy: {
        id: pharmacy.id,
        email: pharmacy.email,
        name: pharmacy.name,
      },
    })
  } catch (error) {
    console.error("[Pharmacy Login Error]", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
