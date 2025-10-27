"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Loader2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

interface Medication {
  id: number
  name: string
  description: string
  price: number
  category: string
  stock_quantity: number
  requires_prescription: boolean
  image_url: string
  pharmacy_id: number
  pharmacy_name: string
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<Medication[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch("/api/medications/search?limit=4")
      const data = await response.json()
      if (data.success) {
        setProducts(data.data)
      }
    } catch (error) {
      console.error("[v0] Error fetching featured products:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async (medication: Medication) => {
    try {
      await addItem({
        medication_id: medication.id,
        name: medication.name,
        price: medication.price,
        quantity: 1,
        image_url: medication.image_url,
        pharmacy_id: medication.pharmacy_id,
        pharmacy_name: medication.pharmacy_name,
        requires_prescription: medication.requires_prescription,
      })

      toast({
        title: "Ajouté au panier",
        description: `${medication.name} a été ajouté à votre panier`,
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter au panier",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Produits populaires</h2>
            <p className="mt-2 text-muted-foreground">Les médicaments les plus commandés</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/catalogue">Voir tout</Link>
          </Button>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                <Card className="group overflow-hidden transition-all hover:shadow-lg">
                  <Link href={`/produit/${product.id}`}>
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                        src={product.image_url || "/placeholder.svg?height=200&width=200"}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                      {product.requires_prescription && (
                        <Badge className="absolute left-2 top-2" variant="secondary">
                          Ordonnance requise
                        </Badge>
                      )}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Button
                          size="icon"
                          variant="secondary"
                          className="absolute right-2 top-2"
                          onClick={(e) => {
                            e.preventDefault()
                          }}
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </div>
                  </Link>
                  <CardContent className="p-4">
                    <Link href={`/produit/${product.id}`}>
                      <Badge variant="outline" className="mb-2">
                        {product.category}
                      </Badge>
                      <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{product.pharmacy_name}</p>
                    </Link>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between p-4 pt-0">
                    <div>
                      <div className="text-2xl font-bold text-primary">{product.price} FCFA</div>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="sm" className="gap-2" onClick={() => handleAddToCart(product)}>
                        <ShoppingCart className="h-4 w-4" />
                        Ajouter
                      </Button>
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
