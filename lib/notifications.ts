// Système de notifications en temps réel
export interface Notification {
  id: string
  userId: string
  userType: "user" | "pharmacy"
  type: "order" | "payment" | "delivery" | "system"
  title: string
  message: string
  link?: string
  read: boolean
  createdAt: string
}

class NotificationService {
  async createNotification(notification: Omit<Notification, "id" | "createdAt" | "read">) {
    // En production, ceci enverrait la notification via WebSocket ou Push API
    console.log("[v0] Notification créée:", notification)

    // Simulation d'envoi de notification
    return {
      id: `notif-${Date.now()}`,
      ...notification,
      read: false,
      createdAt: new Date().toISOString(),
    }
  }

  async notifyOrderCreated(orderId: string, pharmacyId: string, customerName: string) {
    return this.createNotification({
      userId: pharmacyId,
      userType: "pharmacy",
      type: "order",
      title: "Nouvelle commande",
      message: `Nouvelle commande de ${customerName}`,
      link: `/pharmacie/commandes/${orderId}`,
    })
  }

  async notifyOrderStatusChanged(orderId: string, userId: string, status: string) {
    const statusMessages: Record<string, string> = {
      confirmed: "Votre commande a été confirmée par la pharmacie",
      preparing: "Votre commande est en cours de préparation",
      ready: "Votre commande est prête pour la livraison",
      shipped: "Votre commande a été expédiée",
      delivered: "Votre commande a été livrée",
      cancelled: "Votre commande a été annulée",
    }

    return this.createNotification({
      userId,
      userType: "user",
      type: "order",
      title: "Mise à jour de commande",
      message: statusMessages[status] || "Statut de commande mis à jour",
      link: `/commande/${orderId}`,
    })
  }

  async notifyPaymentReceived(orderId: string, pharmacyId: string, amount: number) {
    return this.createNotification({
      userId: pharmacyId,
      userType: "pharmacy",
      type: "payment",
      title: "Paiement reçu",
      message: `Paiement de ${amount} FCFA reçu pour la commande #${orderId}`,
      link: `/pharmacie/commandes/${orderId}`,
    })
  }

  async notifyDeliveryUpdate(orderId: string, userId: string, status: string) {
    const statusMessages: Record<string, string> = {
      assigned: "Un livreur a été assigné à votre commande",
      picked_up: "Votre commande a été récupérée par le livreur",
      in_transit: "Votre commande est en route",
      delivered: "Votre commande a été livrée",
    }

    return this.createNotification({
      userId,
      userType: "user",
      type: "delivery",
      title: "Mise à jour de livraison",
      message: statusMessages[status] || "Statut de livraison mis à jour",
      link: `/commande/${orderId}`,
    })
  }
}

export const notificationService = new NotificationService()
