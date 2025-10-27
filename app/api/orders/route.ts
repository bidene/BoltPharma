import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyAuth } from "@/lib/auth"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    const {
      pharmacy_id,
      items,
      delivery_address,
      delivery_city,
      delivery_phone,
      delivery_notes,
      payment_method,
      payment_phone,
      total_amount,
      delivery_fee,
    } = await request.json()

    // Validation
    if (!pharmacy_id || !items || items.length === 0 || !delivery_address || !payment_method) {
      return NextResponse.json({ error: "Données manquantes" }, { status: 400 })
    }

    // Générer un numéro de commande unique
    const orderNumber = `BP${Date.now()}${crypto.randomBytes(2).toString("hex").toUpperCase()}`

    // Créer la commande
    const result = await query(
      `INSERT INTO orders (
        order_number, user_id, pharmacy_id, total_amount, delivery_fee,
        delivery_address, delivery_city, delivery_phone, delivery_notes,
        payment_method, status, payment_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'pending')`,
      [
        orderNumber,
        user.id,
        pharmacy_id,
        total_amount,
        delivery_fee,
        delivery_address,
        delivery_city,
        delivery_phone,
        delivery_notes || null,
        payment_method,
      ],
    )

    const orderId = result.insertId

    // Ajouter les articles de la commande
    for (const item of items) {
      const subtotal = item.unit_price * item.quantity

      await query(
        "INSERT INTO order_items (order_id, medication_id, quantity, unit_price, subtotal) VALUES (?, ?, ?, ?, ?)",
        [orderId, item.medication_id, item.quantity, item.unit_price, subtotal],
      )

      // Mettre à jour le stock
      await query("UPDATE medications SET stock_quantity = stock_quantity - ? WHERE id = ?", [
        item.quantity,
        item.medication_id,
      ])
    }

    // Créer l'enregistrement de paiement si ce n'est pas en espèces
    if (payment_method !== "cash") {
      await query(
        "INSERT INTO payments (order_id, amount, payment_method, phone_number, status) VALUES (?, ?, ?, ?, 'pending')",
        [orderId, total_amount + delivery_fee, payment_method, payment_phone || delivery_phone],
      )
    }

    // Vider le panier
    await query("DELETE FROM cart_items WHERE user_id = ?", [user.id])

    // Créer une notification pour la pharmacie
    await query(
      "INSERT INTO notifications (pharmacy_id, type, title, message, related_order_id) VALUES (?, 'order', ?, ?, ?)",
      [pharmacy_id, "Nouvelle commande", `Nouvelle commande ${orderNumber} reçue`, orderId],
    )

    return NextResponse.json({
      message: "Commande créée avec succès",
      order: {
        id: orderId,
        order_number: orderNumber,
      },
    })
  } catch (error) {
    console.error("[v0] Create order error:", error)
    return NextResponse.json({ error: "Erreur lors de la création de la commande" }, { status: 500 })
  }
}
