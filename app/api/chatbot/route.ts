import { streamText, tool } from "ai"
import { z } from "zod"

// Durée max de réponse (en secondes)
export const maxDuration = 30

// 🔹 Outil : Recherche de médicaments
const searchMedicationsTool = tool({
  description: "Rechercher des médicaments dans le catalogue",
  inputSchema: z.object({
    query: z.string().describe("Le nom ou la catégorie du médicament à rechercher"),
  }),
  execute: async ({ query }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/medications/search?q=${encodeURIComponent(query)}&limit=5`
      )
      const data = await response.json()
      return {
        results: data.data || [],
      }
    } catch (error) {
      console.error("[v0] Error searching medications:", error)
      return {
        results: [],
      }
    }
  },
})

// 🔹 Outil : Suivi des commandes
const getOrderStatusTool = tool({
  description: "Vérifier le statut d'une commande",
  inputSchema: z.object({
    orderId: z.string().describe("Le numéro de commande"),
  }),
  execute: async ({ orderId }) => {
    // 🔹 Simulation : remplacer par vraie base de données en production
    return {
      orderId,
      status: "En cours de livraison",
      estimatedDelivery: "30 minutes",
    }
  },
})

// Tous les outils disponibles
const tools = {
  searchMedications: searchMedicationsTool,
  getOrderStatus: getOrderStatusTool,
}

// 🔹 Endpoint API : POST /api/chatbot
export async function POST(req: Request) {
  const { messages } = await req.json()

  const systemPrompt = `Tu es un assistant virtuel pour BoltPharma, une plateforme de vente de médicaments en ligne au Bénin.

Ton rôle :
- Aider les clients avec la recherche de médicaments
- Fournir prix et disponibilité
- Suivi des commandes
- Questions sur la livraison (GoZem)
- Méthodes de paiement (MTN, MOOV, CELTIS)
- Questions générales sur la santé (sans diagnostic médical)

Règles :
- Toujours répondre en français
- Courtois et professionnel
- Ne jamais donner de diagnostic médical
- Conseiller de consulter un médecin pour questions sérieuses
- Mentionner que la livraison est rapide (~30 min) via GoZem
- Prix en Francs CFA

Si la réponse est inconnue, proposer le support humain.`

  // 🔹 Génération de la réponse avec streaming
  const result = streamText({
    model: "openai/gpt-5-mini",
    messages: [{ role: "system", content: systemPrompt }, ...messages],
    tools,
    maxOutputTokens: 1000,
    temperature: 0.7,
  })

  return result.toUIMessageStreamResponse()
}