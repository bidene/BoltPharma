"use client"

import { useState } from "react"
import { PharmacySidebar } from "@/components/pharmacy-sidebar"
import { PharmacyHeader } from "@/components/pharmacy-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, Search, Package } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Paracétamol 500mg",
    category: "Analgésiques",
    price: 500,
    stock: 200,
    minStock: 50,
    isActive: true,
  },
  {
    id: 2,
    name: "Amoxicilline 500mg",
    category: "Antibiotiques",
    price: 2500,
    stock: 100,
    minStock: 30,
    isActive: true,
  },
  {
    id: 3,
    name: "Artéméther + Luméfantrine",
    category: "Antipaludéens",
    price: 4500,
    stock: 120,
    minStock: 40,
    isActive: true,
  },
  {
    id: 4,
    name: "Vitamine C 1000mg",
    category: "Vitamines",
    price: 1500,
    stock: 15,
    minStock: 50,
    isActive: true,
  },
]

export default function PharmacyProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  return (
    <div className="flex h-screen">
      <PharmacySidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PharmacyHeader pharmacyName="Pharmacie Centrale" />
        <main className="flex-1 overflow-y-auto bg-muted/30 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Gestion des produits</h1>
              <p className="text-muted-foreground">Gérez votre catalogue de médicaments</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Ajouter un produit
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Ajouter un nouveau produit</DialogTitle>
                  <DialogDescription>Remplissez les informations du médicament</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nom du médicament</Label>
                    <Input id="name" placeholder="Ex: Paracétamol 500mg" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="genericName">Nom générique</Label>
                    <Input id="genericName" placeholder="Ex: Paracétamol" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="category">Catégorie</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="analgesiques">Analgésiques</SelectItem>
                          <SelectItem value="antibiotiques">Antibiotiques</SelectItem>
                          <SelectItem value="antipaludeens">Antipaludéens</SelectItem>
                          <SelectItem value="vitamines">Vitamines</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="form">Forme</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="comprime">Comprimé</SelectItem>
                          <SelectItem value="gelule">Gélule</SelectItem>
                          <SelectItem value="sirop">Sirop</SelectItem>
                          <SelectItem value="injectable">Injectable</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="price">Prix (FCFA)</Label>
                      <Input id="price" type="number" placeholder="500" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="stock">Stock</Label>
                      <Input id="stock" type="number" placeholder="100" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="minStock">Stock minimum</Label>
                      <Input id="minStock" type="number" placeholder="20" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Description du médicament..." rows={3} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="prescription" />
                    <Label htmlFor="prescription">Ordonnance requise</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={() => setIsAddDialogOpen(false)}>Ajouter le produit</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search and filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un produit..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes</SelectItem>
                    <SelectItem value="analgesiques">Analgésiques</SelectItem>
                    <SelectItem value="antibiotiques">Antibiotiques</SelectItem>
                    <SelectItem value="antipaludeens">Antipaludéens</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="active">Actifs</SelectItem>
                    <SelectItem value="inactive">Inactifs</SelectItem>
                    <SelectItem value="low-stock">Stock faible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Products Table */}
          <Card>
            <CardHeader>
              <CardTitle>Liste des produits</CardTitle>
              <CardDescription>{products.length} produits au total</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produit</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                            <Package className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div className="font-medium">{product.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="font-semibold">{product.price} FCFA</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{product.stock}</span>
                          {product.stock < product.minStock && (
                            <Badge variant="destructive" className="text-xs">
                              Stock faible
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.isActive ? "default" : "secondary"}>
                          {product.isActive ? "Actif" : "Inactif"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
