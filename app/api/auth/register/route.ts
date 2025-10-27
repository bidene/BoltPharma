import { type NextRequest, NextResponse } from "next/server"
import { hashPassword, generateVerificationToken } from "@/lib/auth"
import { createUser, findUserByEmail } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, firstName, lastName, phone } = body

    // Validation
    if (!email || !password || !firstName || !lastName || !phone) {
      return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 })
    }

    // Vérifier si l'email existe déjà
    const existingUser = await findUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: "Cet email est déjà utilisé" }, { status: 400 })
    }

    // Hasher le mot de passe
    const passwordHash = await hashPassword(password)

    // Générer un token de vérification
    const verificationToken = generateVerificationToken()

    // Créer l'utilisateur
    const result = await createUser({
      email,
      password_hash: passwordHash,
      first_name: firstName,
      last_name: lastName,
      phone,
      verification_token: verificationToken,
    })

    if (!result.success) {
      return NextResponse.json({ error: "Erreur lors de la création du compte" }, { status: 500 })
    }

    // TODO: Envoyer un email de vérification

    return NextResponse.json({
      success: true,
      message: "Compte créé avec succès. Vérifiez votre email.",
    })
  } catch (error) {
    console.error("[Register Error]", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
