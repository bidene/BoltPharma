"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  User,
  Store,
  ShoppingCart,
  Package,
  CreditCard,
  Truck,
  CheckCircle,
  ArrowRight,
  Key,
  Mail,
  Lock,
} from "lucide-react"

export default function GuideDemarragePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">Guide de démarrage</Badge>
          <h1 className="text-4xl font-bold mb-4 text-balance">
            Bienvenue sur <span className="text-primary">BoltPharma</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Votre plateforme de commande et livraison rapide de médicaments au Bénin
          </p>
        </motion.div>

        {/* Comptes de test */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-primary" />
                Comptes de démonstration
              </CardTitle>
              <CardDescription>Utilisez ces comptes pour tester la plateforme</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              {/* Compte Client */}
              <div className="space-y-4 p-6 bg-background rounded-lg border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <User className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Compte Client</h3>
                    <p className="text-sm text-muted-foreground">Pour acheter des médicaments</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <code className="bg-muted px-2 py-1 rounded">client.demo@boltpharma.com</code>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    <code className="bg-muted px-2 py-1 rounded">password123</code>
                  </div>
                </div>
                <Button asChild className="w-full bg-transparent" variant="outline">
                  <Link href="/connexion">
                    Se connecter comme client
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Compte Pharmacie */}
              <div className="space-y-4 p-6 bg-background rounded-lg border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <Store className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Compte Pharmacie</h3>
                    <p className="text-sm text-muted-foreground">Pour gérer les produits</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <code className="bg-muted px-2 py-1 rounded">pharmacie.demo@boltpharma.com</code>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    <code className="bg-muted px-2 py-1 rounded">password123</code>
                  </div>
                </div>
                <Button asChild className="w-full bg-transparent" variant="outline">
                  <Link href="/connexion">
                    Se connecter comme pharmacie
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Guide Client */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <User className="h-6 w-6 text-primary" />
            Guide pour les Clients
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">1. Créer un compte</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Inscrivez-vous gratuitement avec votre email et créez votre profil
                </p>
                <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                  <Link href="/inscription">S'inscrire</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                  <ShoppingCart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">2. Rechercher des médicaments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Parcourez notre catalogue et ajoutez vos médicaments au panier
                </p>
                <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                  <Link href="/catalogue">Voir le catalogue</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">3. Passer commande</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Validez votre panier et choisissez votre adresse de livraison
                </p>
                <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                  <Link href="/panier">Mon panier</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">4. Payer en ligne</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Payez avec MTN Money, MOOV Money ou CELTIS Cash</p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary">MTN</Badge>
                  <Badge variant="secondary">MOOV</Badge>
                  <Badge variant="secondary">CELTIS</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">5. Recevoir la livraison</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Livraison rapide par GoZem en 30 minutes à Cotonou</p>
                <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
                  <Truck className="h-3 w-3 mr-1" />
                  Livraison express
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">6. Suivre ma commande</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Suivez votre commande en temps réel depuis votre tableau de bord
                </p>
                <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                  <Link href="/tableau-de-bord">Mon tableau de bord</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Guide Pharmacie */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Store className="h-6 w-6 text-primary" />
            Guide pour les Pharmacies
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-2">
                  <Store className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">1. Inscription pharmacie</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Inscrivez votre pharmacie avec votre numéro de licence
                </p>
                <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                  <Link href="/inscription">S'inscrire</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-2">
                  <Package className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">2. Ajouter des produits</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Gérez votre catalogue de médicaments et stocks</p>
                <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                  <Link href="/pharmacie/produits">Gérer les produits</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-2">
                  <ShoppingCart className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">3. Recevoir des commandes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Recevez et gérez les commandes de vos clients</p>
                <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                  <Link href="/pharmacie/commandes">Voir les commandes</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">4. Valider les commandes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Validez les commandes et préparez les médicaments</p>
                <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">Validation rapide</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-2">
                  <Truck className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">5. Livraison GoZem</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">La livraison est automatiquement gérée par GoZem</p>
                <Badge className="bg-orange-500/10 text-orange-600 hover:bg-orange-500/20">Intégration GoZem</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-2">
                  <CreditCard className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">6. Recevoir les paiements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Recevez vos paiements automatiquement après livraison
                </p>
                <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                  <Link href="/pharmacie/tableau-de-bord">Tableau de bord</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-primary/20">
            <CardContent className="py-12">
              <h3 className="text-2xl font-bold mb-4">Prêt à commencer ?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Rejoignez BoltPharma dès aujourd'hui et profitez de la livraison rapide de médicaments
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button asChild size="lg">
                  <Link href="/inscription">
                    Créer un compte
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/catalogue">Voir le catalogue</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
