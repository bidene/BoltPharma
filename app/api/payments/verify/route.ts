import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyAuth } from "@/lib/auth"
import { getPaymentProvider } from "@/lib/payment-providers"

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    const { transactionId, paymentMethod } = await request.json()

    if (!transactionId || !paymentMethod) {
      return NextResponse.json({ error: "Données manquantes" }, { status: 400 })
    }

    // Récupérer le paiement
    const payments = await query(
      `SELECT p.*, o.user_id, o.order_number 
       FROM payments p
       JOIN orders o ON p.order_id = o.id
       WHERE p.transaction_id = ?`,
      [transactionId],
    )

    if (payments.length === 0) {
      return NextResponse.json({ error: "Transaction non trouvée" }, { status: 404 })
    }

    const payment = payments[0]

    if (payment.user_id !== user.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 })
    }

    if (payment.status === "success") {
      return NextResponse.json({
        success: true,
        status: "success",
        message: "Paiement déjà confirmé",
      })
    }

    // Vérifier le paiement avec le provider
    const provider = getPaymentProvider(paymentMethod)
    const result = await provider.verify(transactionId)

    // Mettre à jour le statut du paiement
    await query("UPDATE payments SET status = ?, updated_at = NOW() WHERE transaction_id = ?", [
      result.status,
      transactionId,
    ])

    // Si le paiement est réussi, mettre à jour la commande
    if (result.status === "success") {
      await query("UPDATE orders SET payment_status = 'paid', status = 'validated' WHERE id = ?", [payment.order_id])

      // Créer une notification pour la pharmacie
      const orders = await query("SELECT pharmacy_id FROM orders WHERE id = ?", [payment.order_id])
      if (orders.length > 0) {
        await query(
          `INSERT INTO notifications (pharmacy_id, type, title, message, related_order_id) 
           VALUES (?, 'payment', ?, ?, ?)`,
          [
            orders[0].pharmacy_id,
            "Paiement reçu",
            `Paiement confirmé pour la commande ${payment.order_number}`,
            payment.order_id,
          ],
        )
      }
    }

    return NextResponse.json({
      success: result.success,
      status: result.status,
      message: result.message,
    })
  } catch (error) {
    console.error("[v0] Payment verification error:", error)
    return NextResponse.json({ error: "Erreur lors de la vérification du paiement" }, { status: 500 })
  }
}
