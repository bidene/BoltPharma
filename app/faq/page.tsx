"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

const faqs = [
  {
    category: "Commandes",
    questions: [
      {
        q: "Comment passer une commande sur BoltPharma ?",
        a: "Parcourez notre catalogue, ajoutez les médicaments à votre panier, puis procédez au paiement. Vous recevrez une confirmation par email.",
      },
      {
        q: "Puis-je modifier ma commande après validation ?",
        a: "Vous pouvez modifier votre commande dans les 5 minutes suivant la validation. Contactez notre support pour toute modification.",
      },
      {
        q: "Comment suivre ma commande ?",
        a: 'Connectez-vous à votre compte et accédez à "Mes commandes" pour suivre l\'état de vos commandes en temps réel.',
      },
    ],
  },
  {
    category: "Livraison",
    questions: [
      {
        q: "Quels sont les délais de livraison ?",
        a: "Avec GoZem, la livraison est effectuée en 30 minutes à 2 heures selon votre localisation à Cotonou et environs.",
      },
      {
        q: "Quels sont les frais de livraison ?",
        a: "Les frais de livraison varient selon la distance. La livraison est gratuite pour les commandes supérieures à 10 000 CFA.",
      },
      {
        q: "Livrez-vous en dehors de Cotonou ?",
        a: "Oui, nous livrons dans tout le Bénin. Les délais peuvent varier selon la localisation.",
      },
    ],
  },
  {
    category: "Paiement",
    questions: [
      {
        q: "Quels modes de paiement acceptez-vous ?",
        a: "Nous acceptons MTN Mobile Money, MOOV Money et CELTIS. Le paiement est 100% sécurisé.",
      },
      {
        q: "Le paiement est-il sécurisé ?",
        a: "Oui, toutes les transactions sont cryptées et sécurisées. Nous ne stockons aucune information bancaire.",
      },
      {
        q: "Puis-je payer à la livraison ?",
        a: "Le paiement mobile est requis avant la livraison pour garantir la disponibilité des produits.",
      },
    ],
  },
  {
    category: "Médicaments",
    questions: [
      {
        q: "Comment savoir si un médicament nécessite une ordonnance ?",
        a: "Les médicaments nécessitant une ordonnance sont clairement indiqués avec un badge rouge sur la fiche produit.",
      },
      {
        q: "Que faire si mon médicament nécessite une ordonnance ?",
        a: "Téléchargez votre ordonnance lors de la commande. Notre pharmacien la vérifiera avant validation.",
      },
      {
        q: "Les médicaments sont-ils authentiques ?",
        a: "Oui, tous nos médicaments proviennent de pharmacies agréées et sont certifiés par les autorités sanitaires.",
      },
    ],
  },
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredFaqs = faqs
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchTerm.toLowerCase()) || q.a.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Questions Fréquentes</h1>
            <p className="text-lg text-muted-foreground mb-8">Trouvez rapidement les réponses à vos questions</p>

            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Rechercher une question..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-8">
            {filteredFaqs.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h2 className="text-2xl font-bold mb-4">{category.category}</h2>
                <Card>
                  <CardContent className="p-0">
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((faq, qIndex) => (
                        <AccordionItem key={qIndex} value={`${index}-${qIndex}`}>
                          <AccordionTrigger className="px-6 hover:no-underline">{faq.q}</AccordionTrigger>
                          <AccordionContent className="px-6 text-muted-foreground">{faq.a}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                Aucune question trouvée pour "{searchTerm}"
              </CardContent>
            </Card>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
