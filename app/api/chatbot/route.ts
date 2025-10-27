import { streamText, tool } from "ai"
import { z } from "zod"

export const maxDuration = 30

const searchMedicationsTool = tool({
  description: "Rechercher des médicaments dans le catalogue",
  inputSchema: z.object({
    query: z.string().describe("Le nom ou la catégorie du médicament à rechercher"),
  }),
  execute: async ({ query }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/medications/search?q=${encodeURIComponent(query)}&limit=5`,
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

const getOrderStatusTool = tool({
  description: "Vérifier le statut d'une commande",
  inputSchema: z.object({
    orderId: z.string().describe("Le numéro de commande"),
  }),
  execute: async ({ orderId }) => {
    // Simulation - en production, cela interrogerait la base de données
    return {
      orderId,
      status: "En cours de livraison",
      estimatedDelivery: "30 minutes",
    }
  },
})

const tools = {
  searchMedications: searchMedicationsTool,
  getOrderStatus: getOrderStatusTool,
}

export async function POST(req: Request) {
  const { messages } = await req.json()

  const systemPrompt = `Tu es un assistant virtuel pour BoltPharma, une plateforme de vente de médicaments en ligne au Bénin.

Ton rôle est d'aider les clients avec :
- La recherche de médicaments
- Les informations sur les prix et disponibilités
- Le suivi des commandes
- Les questions sur la livraison avec GoZem
- Les méthodes de paiement (MTN, MOOV, CELTIS)
- Les questions générales sur la santé (sans donner de diagnostic médical)

Règles importantes :
- Réponds toujours en français
- Sois courtois et professionnel
- Ne donne jamais de diagnostic médical
- Recommande toujours de consulter un médecin pour des questions médicales sérieuses
- Mentionne que la livraison est rapide (30 min en moyenne) avec GoZem
- Les prix sont en Francs CFA

Si tu ne connais pas la réponse, propose de mettre le client en contact avec le support humain.`

  const result = streamText({
    model: "openai/gpt-5-mini",
    messages: [{ role: "system", content: systemPrompt }, ...messages],
    tools,
    maxOutputTokens: 1000,
    temperature: 0.7,
  })

  return result.toUIMessageStreamResponse()
}
