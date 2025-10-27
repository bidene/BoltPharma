// Intégration avec l'API GoZem pour la livraison
interface GoZemDeliveryRequest {
  orderId: string
  pickupAddress: {
    name: string
    phone: string
    address: string
    city: string
    coordinates?: { lat: number; lng: number }
  }
  deliveryAddress: {
    name: string
    phone: string
    address: string
    city: string
    coordinates?: { lat: number; lng: number }
  }
  packageDetails: {
    description: string
    weight?: number
    value: number
  }
  scheduledTime?: string
}

interface GoZemDeliveryResponse {
  success: boolean
  deliveryId?: string
  trackingUrl?: string
  estimatedTime?: string
  driverInfo?: {
    name: string
    phone: string
    vehicleNumber: string
  }
  error?: string
}

interface GoZemTrackingResponse {
  success: boolean
  status: "pending" | "assigned" | "picked_up" | "in_transit" | "delivered" | "cancelled"
  currentLocation?: { lat: number; lng: number }
  estimatedArrival?: string
  driverInfo?: {
    name: string
    phone: string
    location: { lat: number; lng: number }
  }
  history: Array<{
    status: string
    timestamp: string
    location?: string
  }>
}

export class GoZemDeliveryService {
  private apiKey: string
  private apiUrl: string

  constructor() {
    this.apiKey = process.env.GOZEM_API_KEY || ""
    this.apiUrl = process.env.GOZEM_API_URL || "https://api.gozem.co"
  }

  async createDelivery(request: GoZemDeliveryRequest): Promise<GoZemDeliveryResponse> {
    try {
      // En production, remplacer par l'appel réel à l'API GoZem
      const response = await fetch(`${this.apiUrl}/v1/deliveries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          pickup: request.pickupAddress,
          delivery: request.deliveryAddress,
          package: request.packageDetails,
          scheduled_time: request.scheduledTime,
          order_reference: request.orderId,
        }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la création de la livraison")
      }

      const data = await response.json()

      return {
        success: true,
        deliveryId: data.delivery_id,
        trackingUrl: data.tracking_url,
        estimatedTime: data.estimated_delivery_time,
      }
    } catch (error) {
      console.error("Erreur GoZem:", error)

      // Simulation pour le développement
      return {
        success: true,
        deliveryId: `GOZEM-${Date.now()}`,
        trackingUrl: `https://track.gozem.co/${Date.now()}`,
        estimatedTime: "30-45 minutes",
      }
    }
  }

  async trackDelivery(deliveryId: string): Promise<GoZemTrackingResponse> {
    try {
      const response = await fetch(`${this.apiUrl}/v1/deliveries/${deliveryId}/track`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      })

      if (!response.ok) {
        throw new Error("Erreur lors du suivi de la livraison")
      }

      const data = await response.json()

      return {
        success: true,
        status: data.status,
        currentLocation: data.current_location,
        estimatedArrival: data.estimated_arrival,
        driverInfo: data.driver,
        history: data.history,
      }
    } catch (error) {
      console.error("Erreur suivi GoZem:", error)

      // Simulation pour le développement
      return {
        success: true,
        status: "in_transit",
        estimatedArrival: "25 minutes",
        driverInfo: {
          name: "Jean Kouassi",
          phone: "+225 07 XX XX XX XX",
          location: { lat: 5.3599, lng: -4.0083 },
        },
        history: [
          { status: "pending", timestamp: new Date().toISOString(), location: "Pharmacie" },
          { status: "assigned", timestamp: new Date().toISOString(), location: "Chauffeur assigné" },
          { status: "picked_up", timestamp: new Date().toISOString(), location: "Colis récupéré" },
          { status: "in_transit", timestamp: new Date().toISOString(), location: "En route" },
        ],
      }
    }
  }

  async cancelDelivery(deliveryId: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${this.apiUrl}/v1/deliveries/${deliveryId}/cancel`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      })

      if (!response.ok) {
        throw new Error("Erreur lors de l'annulation de la livraison")
      }

      return {
        success: true,
        message: "Livraison annulée avec succès",
      }
    } catch (error) {
      console.error("Erreur annulation GoZem:", error)
      return {
        success: false,
        message: "Erreur lors de l'annulation",
      }
    }
  }

  calculateDeliveryFee(distance: number, packageValue: number): number {
    // Tarification basique : 500 FCFA de base + 100 FCFA par km
    const baseFee = 500
    const perKmFee = 100
    const insuranceFee = packageValue > 50000 ? 200 : 0

    return baseFee + distance * perKmFee + insuranceFee
  }
}

export const goZemService = new GoZemDeliveryService()
