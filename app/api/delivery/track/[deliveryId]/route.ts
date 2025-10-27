import { type NextRequest, NextResponse } from "next/server"
import { goZemService } from "@/lib/gozem-delivery"

export async function GET(request: NextRequest, { params }: { params: { deliveryId: string } }) {
  try {
    const { deliveryId } = params

    const trackingInfo = await goZemService.trackDelivery(deliveryId)

    return NextResponse.json(trackingInfo)
  } catch (error) {
    console.error("Erreur suivi livraison:", error)
    return NextResponse.json({ error: "Erreur lors du suivi de la livraison" }, { status: 500 })
  }
}
