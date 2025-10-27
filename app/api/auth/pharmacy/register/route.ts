import { type NextRequest, NextResponse } from "next/server"
import { hashPassword, generateVerificationToken } from "@/lib/auth"
import { createPharmacy, findPharmacyByEmail } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name, licenseNumber, phone, address, city } = body

    // Validation
    if (!email || !password || !name || !licenseNumber || !phone || !address || !city) {
      return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 })
    }

    // Vérifier si l'email existe déjà
    const existingPharmacy = await findPharmacyByEmail(email)
    if (existingPharmacy) {
      return NextResponse.json({ error: "Cet email est déjà utilisé" }, { status: 400 })
    }

    // Hasher le mot de passe
    const passwordHash = await hashPassword(password)

    // Générer un token de vérification
    const verificationToken = generateVerificationToken()

    // Créer la pharmacie
    const result = await createPharmacy({
      email,
      password_hash: passwordHash,
      name,
      license_number: licenseNumber,
      phone,
      address,
      city,
      verification_token: verificationToken,
    })

    if (!result.success) {
      return NextResponse.json({ error: "Erreur lors de la création du compte" }, { status: 500 })
    }

    // TODO: Envoyer un email de vérification

    return NextResponse.json({
      success: true,
      message: "Compte pharmacie créé avec succès. En attente de validation.",
    })
  } catch (error) {
    console.error("[Pharmacy Register Error]", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
