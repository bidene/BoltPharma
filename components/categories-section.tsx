"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Pill, Shield, Bug, Heart, Activity, Wind, Droplet, HeartPulse, Syringe, Baby } from "lucide-react"
import { motion } from "framer-motion"

const categories = [
  { name: "Analgésiques", slug: "analgesiques", icon: Pill, color: "text-blue-600" },
  { name: "Antibiotiques", slug: "antibiotiques", icon: Shield, color: "text-green-600" },
  { name: "Antipaludéens", slug: "antipaludeens", icon: Bug, color: "text-orange-600" },
  { name: "Vitamines", slug: "vitamines", icon: Heart, color: "text-red-600" },
  { name: "Digestifs", slug: "digestifs", icon: Activity, color: "text-purple-600" },
  { name: "Respiratoires", slug: "respiratoires", icon: Wind, color: "text-cyan-600" },
  { name: "Dermatologie", slug: "dermatologie", icon: Droplet, color: "text-pink-600" },
  { name: "Cardiovasculaires", slug: "cardiovasculaires", icon: HeartPulse, color: "text-rose-600" },
  { name: "Diabète", slug: "diabete", icon: Syringe, color: "text-indigo-600" },
  { name: "Pédiatrie", slug: "pediatrie", icon: Baby, color: "text-amber-600" },
]

export function CategoriesSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight">Catégories de médicaments</h2>
          <p className="mt-2 text-muted-foreground">Trouvez rapidement ce dont vous avez besoin</p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link href={`/catalogue?categorie=${category.slug}`}>
                  <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.98 }}>
                    <Card className="group transition-all hover:shadow-lg hover:border-primary/50">
                      <CardContent className="flex flex-col items-center gap-3 p-6">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className={`flex h-16 w-16 items-center justify-center rounded-full bg-muted group-hover:bg-primary/10 transition-colors ${category.color}`}
                        >
                          <Icon className="h-8 w-8" />
                        </motion.div>
                        <div className="text-center">
                          <div className="font-semibold">{category.name}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
