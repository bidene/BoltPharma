"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Heart, Filter, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"

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
  pharmacy_address: string
}

interface Category {
  category: string
  count: number
  min_price: number
  max_price: number
}

export default function CataloguePage() {
  const [medications, setMedications] = useState<Medication[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [prescriptionFilter, setPrescriptionFilter] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("name")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const { addItem } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchMedications()
  }, [searchQuery, selectedCategories, minPrice, maxPrice, prescriptionFilter, sortBy, page])

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/medications/categories")
      const data = await response.json()
      if (data.success) {
        setCategories(data.data)
      }
    } catch (error) {
      console.error("[v0] Error fetching categories:", error)
    }
  }

  const fetchMedications = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        q: searchQuery,
        page: page.toString(),
        limit: "12",
        sort: sortBy,
      })

      if (selectedCategories.length > 0) {
        selectedCategories.forEach(category => {
          params.append("category", category)
        })
      }
      if (minPrice) params.append("minPrice", minPrice)
      if (maxPrice) params.append("maxPrice", maxPrice)
      if (prescriptionFilter !== null) {
        params.append("prescription", prescriptionFilter)
      }

      const response = await fetch(`/api/medications/search?${params}`)
      const data = await response.json()

      if (data.success) {
        setMedications(data.data)
        setTotalPages(data.pagination.totalPages)
      } else {
        throw new Error(data.error || "Failed to fetch medications")
      }
    } catch (error) {
      console.error("[v0] Error fetching medications:", error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les médicaments",
        variant: "destructive",
      })
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

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, category])
    } else {
      setSelectedCategories(prev => prev.filter(c => c !== category))
    }
  }

  // Fonction pour créer une clé unique pour chaque catégorie
  const getUniqueCategoryKey = (cat: Category, index: number) => {
    return `${cat.category}-${index}`;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Catalogue de médicaments</h1>
          <p className="mt-2 text-muted-foreground">Parcourez notre sélection de médicaments disponibles</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Filters sidebar */}
          <aside className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  <h2 className="font-semibold">Filtres</h2>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <Label htmlFor="search">Rechercher</Label>
                  <Input
                    id="search"
                    placeholder="Nom du médicament..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mt-2"
                  />
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <Label className="mb-3 block">Catégories</Label>
                  <div className="space-y-3">
                    {categories.map((cat, index) => (
                      <div key={getUniqueCategoryKey(cat, index)} className="flex items-center space-x-2">
                        <Checkbox
                          id={getUniqueCategoryKey(cat, index)}
                          checked={selectedCategories.includes(cat.category)}
                          onCheckedChange={(checked) => {
                            handleCategoryChange(cat.category, checked as boolean)
                          }}
                        />
                        <label
                          htmlFor={getUniqueCategoryKey(cat, index)}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {cat.category} ({cat.count})
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price range */}
                <div className="mb-6">
                  <Label className="mb-3 block">Prix (FCFA)</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Min"
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <Input
                      placeholder="Max"
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>

                {/* Prescription */}
                <div>
                  <Label className="mb-3 block">Ordonnance</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="no-prescription"
                        checked={prescriptionFilter === "false"}
                        onCheckedChange={(checked) => {
                          setPrescriptionFilter(checked ? "false" : null)
                        }}
                      />
                      <label htmlFor="no-prescription" className="text-sm font-medium">
                        Sans ordonnance
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="with-prescription"
                        checked={prescriptionFilter === "true"}
                        onCheckedChange={(checked) => {
                          setPrescriptionFilter(checked ? "true" : null)
                        }}
                      />
                      <label htmlFor="with-prescription" className="text-sm font-medium">
                        Avec ordonnance
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Products grid */}
          <div>
            {/* Sort and count */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {loading ? "Chargement..." : `${medications.length} produits trouvés`}
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nom A-Z</SelectItem>
                  <SelectItem value="price-asc">Prix croissant</SelectItem>
                  <SelectItem value="price-desc">Prix décroissant</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : medications.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">Aucun médicament trouvé</p>
              </div>
            ) : (
              <>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {medications.map((product) => (
                    <Card key={product.id} className="group overflow-hidden transition-all hover:shadow-lg">
                      <Link href={`/produit/${product.id}`}>
                        <div className="relative aspect-square overflow-hidden bg-muted">
                          <img
                            src={product.image_url || "/placeholder.svg?height=200&width=200"}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                          {product.requires_prescription && (
                            <Badge className="absolute left-2 top-2" variant="secondary">
                              Ordonnance requise
                            </Badge>
                          )}
                          <Button
                            size="icon"
                            variant="secondary"
                            className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
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
                        <Button 
                          size="sm" 
                          className="gap-2" 
                          onClick={() => handleAddToCart(product)}
                          disabled={product.stock_quantity === 0}
                        >
                          <ShoppingCart className="h-4 w-4" />
                          {product.stock_quantity === 0 ? "Rupture" : "Ajouter"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-2">
                    <Button variant="outline" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>
                      Précédent
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      Page {page} sur {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                    >
                      Suivant
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}