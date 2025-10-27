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

    const { orderId, paymentMethod, phoneNumber } = await request.json()

    if (!orderId || !paymentMethod || !phoneNumber) {
      return NextResponse.json({ error: "Données manquantes" }, { status: 400 })
    }

    // Récupérer les détails de la commande
    const orders = await query(
      `SELECT id, order_number, total_amount, delivery_fee, payment_status 
       FROM orders 
       WHERE id = ? AND user_id = ?`,
      [orderId, user.id],
    )

    if (orders.length === 0) {
      return NextResponse.json({ error: "Commande non trouvée" }, { status: 404 })
    }

    const order = orders[0]

    if (order.payment_status === "paid") {
      return NextResponse.json({ error: "Cette commande a déjà été payée" }, { status: 400 })
    }

    const totalAmount = Number.parseFloat(order.total_amount) + Number.parseFloat(order.delivery_fee)

    // Initier le paiement avec le provider approprié
    const provider = getPaymentProvider(paymentMethod)
    const result = await provider.initiate({
      amount: totalAmount,
      phoneNumber,
      orderId: order.order_number,
      description: `Paiement commande ${order.order_number}`,
    })

    if (!result.success) {
      return NextResponse.json({ error: result.error || "Erreur lors de l'initiation du paiement" }, { status: 500 })
    }

    // Mettre à jour l'enregistrement de paiement
    await query(
      `UPDATE payments 
       SET transaction_id = ?, status = 'pending', updated_at = NOW()
       WHERE order_id = ?`,
      [result.transactionId, orderId],
    )

    return NextResponse.json({
      success: true,
      transactionId: result.transactionId,
      message: result.message,
    })
  } catch (error) {
    console.error("[v0] Payment initiation error:", error)
    return NextResponse.json({ error: "Erreur lors de l'initiation du paiement" }, { status: 500 })
  }
}
