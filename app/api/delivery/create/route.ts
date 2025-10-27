import { type NextRequest, NextResponse } from "next/server"
import { goZemService } from "@/lib/gozem-delivery"
import { query } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId } = body

    // Récupérer les détails de la commande
    const orders = await query("SELECT * FROM orders WHERE id = ?", [orderId])

    if (orders.length === 0) {
      return NextResponse.json({ error: "Commande non trouvée" }, { status: 404 })
    }

    const order = orders[0]

    // Récupérer les informations de la pharmacie
    const pharmacies = await query("SELECT * FROM pharmacies WHERE id = ?", [order.pharmacy_id])

    const pharmacy = pharmacies[0]

    // Créer la livraison GoZem
    const deliveryResult = await goZemService.createDelivery({
      orderId: order.id,
      pickupAddress: {
        name: pharmacy.name,
        phone: pharmacy.phone,
        address: pharmacy.address,
        city: pharmacy.city || "Abidjan",
      },
      deliveryAddress: {
        name: order.delivery_name,
        phone: order.delivery_phone,
        address: order.delivery_address,
        city: order.delivery_city || "Abidjan",
      },
      packageDetails: {
        description: "Médicaments",
        value: order.total_amount,
      },
    })

    if (deliveryResult.success) {
      // Mettre à jour la commande avec les infos de livraison
      await query(
        `UPDATE orders 
         SET delivery_id = ?, 
             delivery_tracking_url = ?,
             delivery_status = 'assigned',
             updated_at = NOW()
         WHERE id = ?`,
        [deliveryResult.deliveryId, deliveryResult.trackingUrl, orderId],
      )

      return NextResponse.json({
        success: true,
        delivery: deliveryResult,
      })
    }

    return NextResponse.json(
      { error: deliveryResult.error || "Erreur lors de la création de la livraison" },
      { status: 500 },
    )
  } catch (error) {
    console.error("Erreur création livraison:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
