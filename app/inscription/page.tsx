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

export default function InscriptionPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Formulaire client
  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
  })

  // Formulaire pharmacie
  const [pharmacyForm, setPharmacyForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    licenseNumber: "",
    phone: "",
    address: "",
    city: "",
  })

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Validation
    if (userForm.password !== userForm.confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      return
    }

    if (userForm.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userForm.email,
          password: userForm.password,
          firstName: userForm.firstName,
          lastName: userForm.lastName,
          phone: userForm.phone,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Erreur lors de l'inscription")
        return
      }

      setSuccess(data.message)
      setTimeout(() => {
        router.push("/connexion")
      }, 2000)
    } catch (err) {
      setError("Erreur de connexion au serveur")
    } finally {
      setLoading(false)
    }
  }

  const handlePharmacySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Validation
    if (pharmacyForm.password !== pharmacyForm.confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      return
    }

    if (pharmacyForm.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/auth/pharmacy/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: pharmacyForm.email,
          password: pharmacyForm.password,
          name: pharmacyForm.name,
          licenseNumber: pharmacyForm.licenseNumber,
          phone: pharmacyForm.phone,
          address: pharmacyForm.address,
          city: pharmacyForm.city,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Erreur lors de l'inscription")
        return
      }

      setSuccess(data.message)
      setTimeout(() => {
        router.push("/connexion")
      }, 2000)
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
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Créer un compte</h1>
            <p className="mt-2 text-muted-foreground">Rejoignez BoltPharma dès aujourd'hui</p>
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

            {/* Formulaire Client */}
            <TabsContent value="client">
              <Card>
                <CardHeader>
                  <CardTitle>Inscription Client</CardTitle>
                  <CardDescription>Créez votre compte pour commander vos médicaments</CardDescription>
                </CardHeader>
                <form onSubmit={handleUserSubmit}>
                  <CardContent className="space-y-4">
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    {success && (
                      <Alert>
                        <AlertDescription>{success}</AlertDescription>
                      </Alert>
                    )}

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input
                          id="firstName"
                          required
                          value={userForm.firstName}
                          onChange={(e) => setUserForm({ ...userForm, firstName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom</Label>
                        <Input
                          id="lastName"
                          required
                          value={userForm.lastName}
                          onChange={(e) => setUserForm({ ...userForm, lastName: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={userForm.email}
                        onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+229 XX XX XX XX"
                        required
                        value={userForm.phone}
                        onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Mot de passe</Label>
                      <Input
                        id="password"
                        type="password"
                        required
                        value={userForm.password}
                        onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        required
                        value={userForm.confirmPassword}
                        onChange={(e) => setUserForm({ ...userForm, confirmPassword: e.target.value })}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Créer mon compte
                    </Button>
                    <p className="text-center text-sm text-muted-foreground">
                      Vous avez déjà un compte ?{" "}
                      <Link href="/connexion" className="text-primary hover:underline">
                        Se connecter
                      </Link>
                    </p>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            {/* Formulaire Pharmacie */}
            <TabsContent value="pharmacie">
              <Card>
                <CardHeader>
                  <CardTitle>Inscription Pharmacie</CardTitle>
                  <CardDescription>Devenez partenaire BoltPharma</CardDescription>
                </CardHeader>
                <form onSubmit={handlePharmacySubmit}>
                  <CardContent className="space-y-4">
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    {success && (
                      <Alert>
                        <AlertDescription>{success}</AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="pharmacyName">Nom de la pharmacie</Label>
                      <Input
                        id="pharmacyName"
                        required
                        value={pharmacyForm.name}
                        onChange={(e) => setPharmacyForm({ ...pharmacyForm, name: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="licenseNumber">Numéro de licence</Label>
                      <Input
                        id="licenseNumber"
                        required
                        value={pharmacyForm.licenseNumber}
                        onChange={(e) => setPharmacyForm({ ...pharmacyForm, licenseNumber: e.target.value })}
                      />
                    </div>

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
                      <Label htmlFor="pharmacyPhone">Téléphone</Label>
                      <Input
                        id="pharmacyPhone"
                        type="tel"
                        placeholder="+229 XX XX XX XX"
                        required
                        value={pharmacyForm.phone}
                        onChange={(e) => setPharmacyForm({ ...pharmacyForm, phone: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Adresse</Label>
                      <Input
                        id="address"
                        required
                        value={pharmacyForm.address}
                        onChange={(e) => setPharmacyForm({ ...pharmacyForm, address: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">Ville</Label>
                      <Input
                        id="city"
                        required
                        value={pharmacyForm.city}
                        onChange={(e) => setPharmacyForm({ ...pharmacyForm, city: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pharmacyPassword">Mot de passe</Label>
                      <Input
                        id="pharmacyPassword"
                        type="password"
                        required
                        value={pharmacyForm.password}
                        onChange={(e) => setPharmacyForm({ ...pharmacyForm, password: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pharmacyConfirmPassword">Confirmer le mot de passe</Label>
                      <Input
                        id="pharmacyConfirmPassword"
                        type="password"
                        required
                        value={pharmacyForm.confirmPassword}
                        onChange={(e) =>
                          setPharmacyForm({
                            ...pharmacyForm,
                            confirmPassword: e.target.value,
                          })
                        }
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Créer mon compte pharmacie
                    </Button>
                    <p className="text-center text-sm text-muted-foreground">
                      Vous avez déjà un compte ?{" "}
                      <Link href="/connexion" className="text-primary hover:underline">
                        Se connecter
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
