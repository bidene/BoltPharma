"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

interface Favorite {
  id: number
  medication_id: number
  name: string
  price: number
  image: string
  category: string
  stock: number
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    fetchFavorites()
  }, [])

  const fetchFavorites = async () => {
    try {
      const response = await fetch("/api/favorites")
      const data = await response.json()
      setFavorites(data)
    } catch (error) {
      console.error("Erreur:", error)
    } finally {
      setLoading(false)
    }
  }

  const removeFavorite = async (medicationId: number) => {
    try {
      const response = await fetch("/api/favorites", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ medication_id: medicationId }),
      })

      if (response.ok) {
        setFavorites(favorites.filter((f) => f.medication_id !== medicationId))
        toast({
          title: "Retiré des favoris",
        })
      }
    } catch (error) {
      console.error("Erreur:", error)
    }
  }

  const handleAddToCart = (favorite: Favorite) => {
    addToCart({
      id: favorite.medication_id,
      name: favorite.name,
      price: favorite.price,
      image: favorite.image,
      quantity: 1,
    })
    toast({
      title: "Ajouté au panier",
      description: favorite.name,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded-lg" />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <Heart className="w-8 h-8 text-destructive fill-destructive" />
            <h1 className="text-3xl font-bold">Mes Favoris</h1>
            <Badge variant="secondary">{favorites.length}</Badge>
          </div>

          {favorites.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-xl font-semibold mb-2">Aucun favori</h2>
                <p className="text-muted-foreground mb-6">
                  Ajoutez des médicaments à vos favoris pour les retrouver facilement
                </p>
                <Button asChild>
                  <Link href="/catalogue">Explorer le catalogue</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((favorite, index) => (
                <motion.div
                  key={favorite.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative aspect-square">
                      <Image
                        src={favorite.image || "/placeholder.svg"}
                        alt={favorite.name}
                        fill
                        className="object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => removeFavorite(favorite.medication_id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <Badge className="mb-2">{favorite.category}</Badge>
                      <Link href={`/medicament/${favorite.medication_id}`}>
                        <h3 className="font-semibold mb-2 hover:text-primary transition-colors">{favorite.name}</h3>
                      </Link>
                      <p className="text-2xl font-bold text-primary mb-4">{favorite.price.toLocaleString()} CFA</p>
                      <div className="flex gap-2">
                        <Button
                          className="flex-1"
                          onClick={() => handleAddToCart(favorite)}
                          disabled={favorite.stock === 0}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Ajouter
                        </Button>
                        <Button variant="outline" asChild>
                          <Link href={`/medicament/${favorite.medication_id}`}>Voir</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
