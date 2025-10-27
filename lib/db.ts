// Utilitaires pour la base de données
// Note: Dans un environnement de production, utilisez mysql2 ou un ORM

import { mockUsers, mockPharmacies, mockMedications } from "./mock-db"

export interface DbQueryResult<T = any> {
  success: boolean
  data?: T
  error?: string
}

// Simulateur de requêtes DB pour le développement
// À remplacer par de vraies requêtes MySQL en production
export async function dbQuery<T = any>(query: string, params?: any[]): Promise<DbQueryResult<T>> {
  try {
    // Simulation - À remplacer par mysql2
    console.log("[DB Query]", query, params)

    // Pour le développement, retourner des données mockées
    return {
      success: true,
      data: [] as T,
    }
  } catch (error) {
    console.error("[DB Error]", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Database error",
    }
  }
}

export async function query<T = any>(sql: string, params?: any[]): Promise<T[]> {
  try {
    console.log("[v0] DB Query:", sql, params)

    // Traiter les requêtes SELECT pour les médicaments
    if (sql.includes("SELECT") && sql.includes("medications")) {
      let results = [...mockMedications]

      // Appliquer les filtres si des paramètres sont fournis
      if (params && params.length > 0) {
        // Filtre de recherche (LIKE)
        if (sql.includes("LIKE")) {
          const searchTerms = params.filter((p) => typeof p === "string" && p.includes("%"))
          if (searchTerms.length > 0) {
            const searchTerm = searchTerms[0].replace(/%/g, "").toLowerCase()
            if (searchTerm) {
              results = results.filter(
                (m: any) =>
                  m.name.toLowerCase().includes(searchTerm) || m.description.toLowerCase().includes(searchTerm),
              )
            }
          }
        }

        // Filtre de catégorie
        if (sql.includes("category")) {
          const categoryParam = params.find((p) => typeof p === "string" && !p.includes("%"))
          if (categoryParam) {
            results = results.filter((m: any) => m.category === categoryParam)
          }
        }

        // Filtre de prix (BETWEEN)
        if (sql.includes("BETWEEN")) {
          const numberParams = params.filter((p) => typeof p === "number")
          if (numberParams.length >= 2) {
            const minPrice = numberParams[0]
            const maxPrice = numberParams[1]
            results = results.filter((m: any) => m.price >= minPrice && m.price <= maxPrice)
          }
        }

        // Filtre prescription
        if (sql.includes("requires_prescription")) {
          const prescParam = params.find((p) => p === 0 || p === 1)
          if (prescParam !== undefined) {
            results = results.filter((m: any) => m.requires_prescription === (prescParam === 1))
          }
        }
      }

      // Appliquer LIMIT et OFFSET
      if (sql.includes("LIMIT")) {
        const numberParams = params?.filter((p) => typeof p === "number") || []
        if (numberParams.length >= 2) {
          const limit = numberParams[numberParams.length - 2]
          const offset = numberParams[numberParams.length - 1]
          results = results.slice(offset, offset + limit)
        }
      }

      return results as T[]
    }

    // Traiter les requêtes COUNT
    if (sql.includes("COUNT(*)")) {
      let results = [...mockMedications]

      // Appliquer les mêmes filtres que pour la requête SELECT
      if (params && params.length > 0) {
        if (sql.includes("LIKE")) {
          const searchTerms = params.filter((p) => typeof p === "string" && p.includes("%"))
          if (searchTerms.length > 0) {
            const searchTerm = searchTerms[0].replace(/%/g, "").toLowerCase()
            if (searchTerm) {
              results = results.filter(
                (m: any) =>
                  m.name.toLowerCase().includes(searchTerm) || m.description.toLowerCase().includes(searchTerm),
              )
            }
          }
        }

        if (sql.includes("category")) {
          const categoryParam = params.find((p) => typeof p === "string" && !p.includes("%"))
          if (categoryParam) {
            results = results.filter((m: any) => m.category === categoryParam)
          }
        }

        if (sql.includes("BETWEEN")) {
          const numberParams = params.filter((p) => typeof p === "number")
          if (numberParams.length >= 2) {
            const minPrice = numberParams[0]
            const maxPrice = numberParams[1]
            results = results.filter((m: any) => m.price >= minPrice && m.price <= maxPrice)
          }
        }

        if (sql.includes("requires_prescription")) {
          const prescParam = params.find((p) => p === 0 || p === 1)
          if (prescParam !== undefined) {
            results = results.filter((m: any) => m.requires_prescription === (prescParam === 1))
          }
        }
      }

      return [{ total: results.length }] as T[]
    }

    // Traiter les requêtes SELECT pour les utilisateurs
    if (sql.includes("SELECT") && sql.includes("users")) {
      return mockUsers as T[]
    }

    // Traiter les requêtes SELECT pour les pharmacies
    if (sql.includes("SELECT") && sql.includes("pharmacies")) {
      return mockPharmacies as T[]
    }

    // Par défaut, retourner un tableau vide
    return [] as T[]
  } catch (error) {
    console.error("[v0] DB Error:", error)
    throw error
  }
}

// Trouver un utilisateur par email
export async function findUserByEmail(email: string) {
  console.log("[v0] Finding user by email:", email)
  // En développement, utiliser les données mockées
  const user = mockUsers.find((u) => u.email === email)
  console.log("[v0] User found:", user ? "Yes" : "No")
  return user || null
}

// Trouver une pharmacie par email
export async function findPharmacyByEmail(email: string) {
  console.log("[v0] Finding pharmacy by email:", email)
  // En développement, utiliser les données mockées
  const pharmacy = mockPharmacies.find((p) => p.email === email)
  console.log("[v0] Pharmacy found:", pharmacy ? "Yes" : "No")
  return pharmacy || null
}

// Créer un utilisateur
export async function createUser(data: {
  email: string
  password_hash: string
  first_name: string
  last_name: string
  phone: string
  verification_token: string
}) {
  const result = await dbQuery(
    `INSERT INTO users (email, password_hash, first_name, last_name, phone, verification_token)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [data.email, data.password_hash, data.first_name, data.last_name, data.phone, data.verification_token],
  )
  return result
}

// Créer une pharmacie
export async function createPharmacy(data: {
  email: string
  password_hash: string
  name: string
  license_number: string
  phone: string
  address: string
  city: string
  verification_token: string
}) {
  const result = await dbQuery(
    `INSERT INTO pharmacies (email, password_hash, name, license_number, phone, address, city, verification_token)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.email,
      data.password_hash,
      data.name,
      data.license_number,
      data.phone,
      data.address,
      data.city,
      data.verification_token,
    ],
  )
  return result
}
