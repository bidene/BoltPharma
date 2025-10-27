"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Search, ShoppingBag, CreditCard, Truck } from "lucide-react"
import { motion } from "framer-motion"

const steps = [
  {
    icon: Search,
    title: "Recherchez votre médicament",
    description: "Parcourez notre catalogue ou utilisez la recherche pour trouver ce dont vous avez besoin",
  },
  {
    icon: ShoppingBag,
    title: "Ajoutez au panier",
    description: "Sélectionnez vos produits et ajoutez-les à votre panier en quelques clics",
  },
  {
    icon: CreditCard,
    title: "Payez en toute sécurité",
    description: "Utilisez MTN Money, MOOV Money ou CELTIS pour un paiement rapide et sécurisé",
  },
  {
    icon: Truck,
    title: "Recevez rapidement",
    description: "Votre commande est livrée par GoZem en moins de 30 minutes",
  },
]

export function HowItWorks() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight">Comment ça marche ?</h2>
          <p className="mt-2 text-muted-foreground">Commandez vos médicaments en 4 étapes simples</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <motion.div whileHover={{ y: -10, scale: 1.02 }} transition={{ duration: 0.3 }}>
                  <Card className="h-full">
                    <CardContent className="flex flex-col items-center p-6 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: "spring" }}
                        whileHover={{ rotate: 360 }}
                        className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground"
                      >
                        <Icon className="h-8 w-8" />
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                        className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-bold"
                      >
                        {index + 1}
                      </motion.div>
                      <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                    className="absolute -right-4 top-1/2 hidden -translate-y-1/2 lg:block origin-left"
                  >
                    <div className="h-0.5 w-8 bg-border" />
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
