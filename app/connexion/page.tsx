"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Building2, Loader2 } from "lucide-react"

export default function ConnexionPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
  })

  const [pharmacyForm, setPharmacyForm] = useState({
    email: "",
    password: "",
  })

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userForm),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Erreur de connexion")
        return
      }

      router.push("/tableau-de-bord")
    } catch (err) {
      setError("Erreur de connexion au serveur")
    } finally {
      setLoading(false)
    }
  }

  const handlePharmacyLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/pharmacy/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pharmacyForm),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Erreur de connexion")
        return
      }

      router.push("/pharmacie/tableau-de-bord")
    } catch (err) {
      setError("Erreur de connexion au serveur")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Connexion</h1>
            <p className="mt-2 text-muted-foreground">Accédez à votre compte BoltPharma</p>
          </div>

          <Tabs defaultValue="client" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="client" className="gap-2">
                <User className="h-4 w-4" />
                Client
              </TabsTrigger>
              <TabsTrigger value="pharmacie" className="gap-2">
                <Building2 className="h-4 w-4" />
                Pharmacie
              </TabsTrigger>
            </TabsList>

            {/* Connexion Client */}
            <TabsContent value="client">
              <Card>
                <CardHeader>
                  <CardTitle>Connexion Client</CardTitle>
                  <CardDescription>Connectez-vous pour passer vos commandes</CardDescription>
                </CardHeader>
                <form onSubmit={handleUserLogin}>
                  <CardContent className="space-y-4">
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="userEmail">Email</Label>
                      <Input
                        id="userEmail"
                        type="email"
                        required
                        value={userForm.email}
                        onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="userPassword">Mot de passe</Label>
                        <Link href="/mot-de-passe-oublie" className="text-sm text-primary hover:underline">
                          Mot de passe oublié ?
                        </Link>
                      </div>
                      <Input
                        id="userPassword"
                        type="password"
                        required
                        value={userForm.password}
                        onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Se connecter
                    </Button>
                    <p className="text-center text-sm text-muted-foreground">
                      Pas encore de compte ?{" "}
                      <Link href="/inscription" className="text-primary hover:underline">
                        S'inscrire
                      </Link>
                    </p>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            {/* Connexion Pharmacie */}
            <TabsContent value="pharmacie">
              <Card>
                <CardHeader>
                  <CardTitle>Connexion Pharmacie</CardTitle>
                  <CardDescription>Accédez à votre espace partenaire</CardDescription>
                </CardHeader>
                <form onSubmit={handlePharmacyLogin}>
                  <CardContent className="space-y-4">
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="pharmacyEmail">Email</Label>
                      <Input
                        id="pharmacyEmail"
                        type="email"
                        required
                        value={pharmacyForm.email}
                        onChange={(e) => setPharmacyForm({ ...pharmacyForm, email: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="pharmacyPassword">Mot de passe</Label>
                        <Link href="/mot-de-passe-oublie" className="text-sm text-primary hover:underline">
                          Mot de passe oublié ?
                        </Link>
                      </div>
                      <Input
                        id="pharmacyPassword"
                        type="password"
                        required
                        value={pharmacyForm.password}
                        onChange={(e) => setPharmacyForm({ ...pharmacyForm, password: e.target.value })}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Se connecter
                    </Button>
                    <p className="text-center text-sm text-muted-foreground">
                      Pas encore partenaire ?{" "}
                      <Link href="/inscription" className="text-primary hover:underline">
                        Devenir partenaire
                      </Link>
                    </p>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
