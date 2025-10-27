import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-change-in-production")

export interface UserSession {
  id: number
  email: string
  type: "user" | "pharmacy"
  name: string
}

// Créer un token JWT
export async function createToken(payload: UserSession): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET)
}

// Vérifier un token JWT
export async function verifyToken(token: string): Promise<UserSession | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as UserSession
  } catch (error) {
    return null
  }
}

// Obtenir la session actuelle
export async function getSession(): Promise<UserSession | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth-token")

  if (!token) {
    return null
  }

  return await verifyToken(token.value)
}

// Définir la session (créer le cookie)
export async function setSession(session: UserSession) {
  const token = await createToken(session)
  const cookieStore = await cookies()

  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 jours
    path: "/",
  })
}

// Supprimer la session (déconnexion)
export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
}

// Hasher un mot de passe
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10)
}

// Vérifier un mot de passe
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

// Générer un token de vérification
export function generateVerificationToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export async function verifyAuth(request: Request): Promise<UserSession | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      console.log("[v0] No auth token found")
      return null
    }

    const session = await verifyToken(token)
    console.log("[v0] Auth verification result:", session ? "Success" : "Failed")
    return session
  } catch (error) {
    console.error("[v0] Auth verification error:", error)
    return null
  }
}
