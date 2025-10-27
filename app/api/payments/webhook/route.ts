import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"

// Webhook pour recevoir les notifications de paiement des providers
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("[v0] Payment webhook received:", body)

    // Vérifier la signature du webhook (à implémenter selon chaque provider)
    // const signature = request.headers.get("x-signature")

    const { transactionId, status, provider } = body

    if (!transactionId || !status) {
      return NextResponse.json({ error: "Données manquantes" }, { status: 400 })
    }

    // Mettre à jour le statut du paiement
    const payments = await query("SELECT id, order_id FROM payments WHERE transaction_id = ?", [transactionId])

    if (payments.length === 0) {
      return NextResponse.json({ error: "Transaction non trouvée" }, { status: 404 })
    }

    const payment = payments[0]

    // Mapper le statut du provider au statut interne
    let internalStatus = "pending"
    if (status === "SUCCESSFUL" || status === "SUCCESS" || status === "COMPLETED") {
      internalStatus = "success"
    } else if (status === "FAILED" || status === "REJECTED") {
      internalStatus = "failed"
    } else if (status === "CANCELLED") {
      internalStatus = "cancelled"
    }

    // Mettre à jour le paiement
    await query("UPDATE payments SET status = ?, provider_response = ?, updated_at = NOW() WHERE id = ?", [
      internalStatus,
      JSON.stringify(body),
      payment.id,
    ])

    // Si le paiement est réussi, mettre à jour la commande
    if (internalStatus === "success") {
      await query("UPDATE orders SET payment_status = 'paid', status = 'validated' WHERE id = ?", [payment.order_id])

      // Créer une notification
      const orders = await query("SELECT pharmacy_id, order_number FROM orders WHERE id = ?", [payment.order_id])
      if (orders.length > 0) {
        await query(
          `INSERT INTO notifications (pharmacy_id, type, title, message, related_order_id) 
           VALUES (?, 'payment', ?, ?, ?)`,
          [
            orders[0].pharmacy_id,
            "Paiement reçu",
            `Paiement confirmé pour la commande ${orders[0].order_number}`,
            payment.order_id,
          ],
        )
      }
    }

    return NextResponse.json({ success: true, message: "Webhook traité" })
  } catch (error) {
    console.error("[v0] Webhook error:", error)
    return NextResponse.json({ error: "Erreur lors du traitement du webhook" }, { status: 500 })
  }
}
