"use client"

import Image from "next/image"
import { Truck, Clock, MapPin, Shield } from "lucide-react"
import { motion } from "framer-motion"

export function GozemDeliverySection() {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/gozem-delivery-benin.png"
                alt="Livraison GoZem Bénin - Livraison rapide de médicaments"
                width={600}
                height={400}
                className="w-full h-auto"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </motion.div>
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="absolute -bottom-6 -right-6 bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg"
            >
              <div className="text-3xl font-bold">30 min</div>
              <div className="text-sm">Livraison moyenne</div>
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block"
            >
              <span className="text-accent font-semibold text-sm uppercase tracking-wide">Partenaire Officiel</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-balance"
            >
              Livraison Ultra-Rapide avec <span className="text-primary">GoZem Bénin</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-muted-foreground text-pretty"
            >
              Vos médicaments livrés en un temps record partout au Bénin ! Grâce à notre partenariat exclusif avec
              GoZem, profitez d'une livraison express, sécurisée et fiable directement à votre porte.
            </motion.p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {[
                {
                  icon: Truck,
                  title: "Livraison Express",
                  desc: "En moyenne 30 minutes dans les grandes villes",
                  color: "primary",
                },
                { icon: Clock, title: "Disponible 24/7", desc: "Service de livraison jour et nuit", color: "accent" },
                {
                  icon: MapPin,
                  title: "Couverture Nationale",
                  desc: "Cotonou, Porto-Novo, Parakou et plus",
                  color: "health",
                },
                {
                  icon: Shield,
                  title: "100% Sécurisé",
                  desc: "Emballage médical conforme et traçable",
                  color: "primary",
                },
              ].map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="flex gap-3 p-4 rounded-lg bg-background/50 border border-border/50"
                  >
                    <div className="flex-shrink-0">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`w-10 h-10 rounded-full bg-${feature.color}/10 flex items-center justify-center`}
                      >
                        <Icon className={`w-5 h-5 text-${feature.color}`} />
                      </motion.div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="pt-4"
            >
              <p className="text-sm text-muted-foreground mb-3">
                🎉 <strong>Offre de lancement :</strong> Livraison gratuite pour toute commande supérieure à 10 000 FCFA
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}