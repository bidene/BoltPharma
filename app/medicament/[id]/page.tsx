"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import { Star, Heart, ShoppingCart, Truck, Shield, Clock, MapPin, Phone } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

interface Medication {
  id: number
  name: string
  description: string
  price: number
  category: string
  image: string
  requires_prescription: boolean
  stock: number
  pharmacy_name: string
  pharmacy_address: string
  pharmacy_phone: string
  average_rating: number
  total_reviews: number
}

interface Review {
  id: number
  user_name: string
  rating: number
  comment: string
  created_at: string
  verified_purchase: boolean
}

export default function MedicationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [medication, setMedication] = useState<Medication | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [isFavorite, setIsFavorite] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMedicationDetails()
    fetchReviews()
    checkFavoriteStatus()
  }, [params.id])

  const fetchMedicationDetails = async () => {
    try {
      const response = await fetch(`/api/medications/${params.id}`)
      const data = await response.json()
      setMedication(data)
    } catch (error) {
      console.error("Erreur:", error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les détails du médicament",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/medications/${params.id}/reviews`)
      const data = await response.json()
      setReviews(data)
    } catch (error) {
      console.error("Erreur:", error)
    }
  }

  const checkFavoriteStatus = async () => {
    try {
      const response = await fetch(`/api/favorites/check/${params.id}`)
      const data = await response.json()
      setIsFavorite(data.isFavorite)
    } catch (error) {
      console.error("Erreur:", error)
    }
  }

  const handleAddToCart = () => {
    if (!medication) return
    addToCart({
      id: medication.id,
      name: medication.name,
      price: medication.price,
      image: medication.image,
      quantity,
    })
    toast({
      title: "Ajouté au panier",
      description: `${quantity} x ${medication.name}`,
    })
  }

  const toggleFavorite = async () => {
    try {
      const response = await fetch("/api/favorites", {
        method: isFavorite ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ medication_id: params.id }),
      })

      if (response.ok) {
        setIsFavorite(!isFavorite)
        toast({
          title: isFavorite ? "Retiré des favoris" : "Ajouté aux favoris",
        })
      }
    } catch (error) {
      console.error("Erreur:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-96 bg-muted rounded-lg" />
            <div className="h-8 bg-muted rounded w-1/2" />
            <div className="h-4 bg-muted rounded w-3/4" />
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!medication) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Médicament non trouvé</h1>
          <Button onClick={() => router.push("/catalogue")}>Retour au catalogue</Button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {/* Image du produit */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
            <Image src={medication.image || "/placeholder.svg"} alt={medication.name} fill className="object-cover" />
            {medication.requires_prescription && (
              <Badge className="absolute top-4 left-4 bg-destructive">Ordonnance requise</Badge>
            )}
          </div>

          {/* Informations du produit */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-2">{medication.category}</Badge>
              <h1 className="text-3xl font-bold mb-2">{medication.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(medication.average_rating) ? "fill-accent text-accent" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {medication.average_rating.toFixed(1)} ({medication.total_reviews} avis)
                </span>
              </div>
              <p className="text-3xl font-bold text-primary">{medication.price.toLocaleString()} CFA</p>
            </div>

            <p className="text-muted-foreground">{medication.description}</p>

            {/* Informations pharmacie */}
            <Card>
              <CardContent className="pt-6 space-y-3">
                <h3 className="font-semibold">Vendu par</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{medication.pharmacy_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{medication.pharmacy_address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{medication.pharmacy_phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <Button variant="ghost" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    -
                  </Button>
                  <span className="px-4 font-semibold">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.min(medication.stock, quantity + 1))}
                  >
                    +
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">{medication.stock} en stock</span>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1" size="lg" onClick={handleAddToCart} disabled={medication.stock === 0}>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Ajouter au panier
                </Button>
                <Button variant="outline" size="lg" onClick={toggleFavorite}>
                  <Heart className={`w-5 h-5 ${isFavorite ? "fill-destructive text-destructive" : ""}`} />
                </Button>
              </div>
            </div>

            {/* Avantages */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Livraison rapide</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Produits certifiés</p>
              </div>
              <div className="text-center">
                <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Support 24/7</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Onglets */}
        <Tabs defaultValue="reviews" className="mb-12">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="reviews">Avis clients ({reviews.length})</TabsTrigger>
            <TabsTrigger value="info">Informations</TabsTrigger>
          </TabsList>

          <TabsContent value="reviews" className="space-y-4">
            {reviews.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  Aucun avis pour le moment. Soyez le premier à donner votre avis!
                </CardContent>
              </Card>
            ) : (
              reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{review.user_name}</span>
                          {review.verified_purchase && (
                            <Badge variant="secondary" className="text-xs">
                              Achat vérifié
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? "fill-accent text-accent" : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(review.created_at).toLocaleDateString("fr-FR")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="info">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Description complète</h3>
                  <p className="text-muted-foreground">{medication.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Catégorie</h3>
                  <p className="text-muted-foreground">{medication.category}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Ordonnance</h3>
                  <p className="text-muted-foreground">
                    {medication.requires_prescription
                      ? "Ce médicament nécessite une ordonnance médicale"
                      : "Disponible sans ordonnance"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}
