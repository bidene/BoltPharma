import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyAuth } from "@/lib/auth"

// GET - Récupérer le panier
export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    const cartItems = await query(
      `SELECT 
        ci.id,
        ci.medication_id,
        ci.quantity,
        m.name,
        m.price,
        m.image_url,
        m.pharmacy_id,
        m.requires_prescription,
        p.name as pharmacy_name
      FROM cart_items ci
      JOIN medications m ON ci.medication_id = m.id
      JOIN pharmacies p ON m.pharmacy_id = p.id
      WHERE ci.user_id = ? AND m.is_active = TRUE`,
      [user.id],
    )

    return NextResponse.json({ items: cartItems })
  } catch (error) {
    console.error("[v0] Get cart error:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération du panier" }, { status: 500 })
  }
}

// POST - Ajouter au panier
export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    console.log("[v0] Cart POST - User authenticated:", user ? "Yes" : "No")

    if (!user) {
      console.log("[v0] Cart POST - No user, returning 401")
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    const body = await request.json()
    const { medication_id, quantity = 1 } = body

    console.log("[v0] Adding to cart - medication_id:", medication_id, "quantity:", quantity)

    if (!medication_id) {
      return NextResponse.json({ error: "ID du médicament requis" }, { status: 400 })
    }

    // Vérifier si le médicament existe et est disponible
    const medications = await query("SELECT id, stock_quantity FROM medications WHERE id = ? AND is_active = TRUE", [
      medication_id,
    ])

    if (medications.length === 0) {
      return NextResponse.json({ error: "Médicament non disponible" }, { status: 404 })
    }

    if (medications[0].stock_quantity < quantity) {
      return NextResponse.json({ error: "Stock insuffisant" }, { status: 400 })
    }

    // Vérifier si l'article existe déjà dans le panier
    const existingItems = await query("SELECT id, quantity FROM cart_items WHERE user_id = ? AND medication_id = ?", [
      user.id,
      medication_id,
    ])

    if (existingItems.length > 0) {
      // Mettre à jour la quantité
      const newQuantity = existingItems[0].quantity + quantity
      await query("UPDATE cart_items SET quantity = ? WHERE id = ?", [newQuantity, existingItems[0].id])
    } else {
      // Ajouter un nouvel article
      await query("INSERT INTO cart_items (user_id, medication_id, quantity) VALUES (?, ?, ?)", [
        user.id,
        medication_id,
        quantity,
      ])
    }

    console.log("[v0] Item added to cart successfully")
    return NextResponse.json({ message: "Ajouté au panier", success: true })
  } catch (error) {
    console.error("[v0] Add to cart error:", error)
    return NextResponse.json({ error: "Erreur lors de l'ajout au panier", details: String(error) }, { status: 500 })
  }
}

// PATCH - Mettre à jour la quantité
export async function PATCH(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    const { medicationId, quantity } = await request.json()

    if (!medicationId || quantity === undefined) {
      return NextResponse.json({ error: "Données manquantes" }, { status: 400 })
    }

    if (quantity <= 0) {
      return NextResponse.json({ error: "Quantité invalide" }, { status: 400 })
    }

    await query("UPDATE cart_items SET quantity = ? WHERE user_id = ? AND medication_id = ?", [
      quantity,
      user.id,
      medicationId,
    ])

    return NextResponse.json({ message: "Quantité mise à jour" })
  } catch (error) {
    console.error("[v0] Update cart error:", error)
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 })
  }
}

// DELETE - Supprimer du panier
export async function DELETE(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const medicationId = searchParams.get("medicationId")

    if (!medicationId) {
      return NextResponse.json({ error: "ID du médicament requis" }, { status: 400 })
    }

    await query("DELETE FROM cart_items WHERE user_id = ? AND medication_id = ?", [user.id, medicationId])

    return NextResponse.json({ message: "Retiré du panier" })
  } catch (error) {
    console.error("[v0] Remove from cart error:", error)
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 })
  }
}