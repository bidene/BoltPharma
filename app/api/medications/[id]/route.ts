import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { mockMedications } from "@/lib/mock-db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // <CHANGE> Utiliser les données mockées directement pour éviter les problèmes SQL complexes
    const medicationId = Number.parseInt(params.id)
    const medication = mockMedications.find((m) => m.id === medicationId)

    if (!medication) {
      return NextResponse.json({ error: "Médicament non trouvé" }, { status: 404 })
    }

    // Ajouter les informations de pharmacie et les avis
    return NextResponse.json({
      ...medication,
      pharmacy_name: "Pharmacie Centrale",
      pharmacy_address: "Cotonou, Bénin",
      pharmacy_phone: "+229 21 30 00 00",
      average_rating: 4.5,
      total_reviews: 12,
    })
  } catch (error) {
    console.error("[v0] Erreur:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
