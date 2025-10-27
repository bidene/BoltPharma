import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "votre-secret-jwt-super-securise-changez-moi")

// Routes protégées pour les clients
const protectedClientRoutes = ["/tableau-de-bord", "/commande", "/panier", "/commander"]

// Routes protégées pour les pharmacies
const protectedPharmacyRoutes = [
  "/pharmacie/tableau-de-bord",
  "/pharmacie/produits",
  "/pharmacie/commandes",
  "/pharmacie/profil",
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Vérifier si la route nécessite une authentification client
  const isProtectedClientRoute = protectedClientRoutes.some((route) => pathname.startsWith(route))

  // Vérifier si la route nécessite une authentification pharmacie
  const isProtectedPharmacyRoute = protectedPharmacyRoutes.some((route) => pathname.startsWith(route))

  if (isProtectedClientRoute || isProtectedPharmacyRoute) {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      // Rediriger vers la page de connexion appropriée
      const loginUrl = isProtectedPharmacyRoute ? "/connexion?type=pharmacie" : "/connexion"
      return NextResponse.redirect(new URL(loginUrl, request.url))
    }

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET)

      // Vérifier le type d'utilisateur
      if (isProtectedPharmacyRoute && payload.type !== "pharmacy") {
        return NextResponse.redirect(new URL("/connexion?type=pharmacie", request.url))
      }

      if (isProtectedClientRoute && payload.type !== "user") {
        return NextResponse.redirect(new URL("/connexion", request.url))
      }
    } catch (error) {
      // Token invalide ou expiré
      const loginUrl = isProtectedPharmacyRoute ? "/connexion?type=pharmacie" : "/connexion"
      return NextResponse.redirect(new URL(loginUrl, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/tableau-de-bord/:path*", "/commande/:path*", "/panier", "/commander", "/pharmacie/:path*"],
}
