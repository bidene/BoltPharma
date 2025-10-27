"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { AlertCircle, Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        {/* Icône 404 animée */}
        <motion.div
          animate={{ rotate: [0, -5, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="text-6xl font-bold text-primary"
            >
              404
            </motion.div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, linear: true }}
              className="absolute top-0 right-0"
            >
              <AlertCircle className="w-12 h-12 text-accent" />
            </motion.div>
          </div>
        </motion.div>

        {/* Titre */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-4"
        >
          Page Non Trouvée
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg text-muted-foreground mb-8"
        >
          Désolé, la page que vous recherchez n'existe pas ou a été supprimée. Retournez à l'accueil ou explorez notre
          catalogue de médicaments.
        </motion.p>

        {/* Boutons d'action */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              <Home className="w-5 h-5" />
              Accueil
            </motion.button>
          </Link>

          <Link href="/catalogue">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-foreground rounded-lg font-semibold hover:bg-secondary/80 transition-colors border border-primary/20"
            >
              <Search className="w-5 h-5" />
              Catalogue
            </motion.button>
          </Link>
        </motion.div>

        {/* Suggestions de liens */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 pt-8 border-t border-primary/10"
        >
          <p className="text-sm text-muted-foreground mb-4">Pages populaires :</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "Connexion", href: "/connexion" },
              { label: "Inscription", href: "/inscription" },
              { label: "Contact", href: "/contact" },
              { label: "FAQ", href: "/faq" },
            ].map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="text-sm text-primary hover:text-primary/80 underline cursor-pointer transition-colors"
                >
                  {link.label}
                </motion.span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Illustration décorative */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          className="mt-12 text-6xl opacity-20"
        >
          💊
        </motion.div>
      </motion.div>
    </div>
  )
}
