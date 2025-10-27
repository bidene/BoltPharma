"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Building2, Loader2, CheckCircle2, ArrowLeft } from "lucide-react"

export default function MotDePasseOubliePage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("client")

  const [userEmail, setUserEmail] = useState("")
  const [pharmacyEmail, setPharmacyEmail] = useState("")

  const handleUserReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setLoading(true)

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, type: "user" }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Erreur lors de l'envoi de l'email")
        return
      }

      setSuccess(true)
    } catch (err) {
      setError("Erreur de connexion au serveur")
    } finally {
      setLoading(false)
    }
  }

  const handlePharmacyReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setLoading(true)

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: pharmacyEmail, type: "pharmacy" }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Erreur lors de l'envoi de l'email")
        return
      }

      setSuccess(true)
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
          <div className="mb-8">
            <Link
              href="/connexion"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour à la connexion
            </Link>
            <h1 className="mt-4 text-3xl font-bold tracking-tight">Mot de passe oublié</h1>
            <p className="mt-2 text-muted-foreground">Entrez votre email pour recevoir un lien de réinitialisation</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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

            {/* Réinitialisation Client */}
            <TabsContent value="client">
              <Card>
                <CardHeader>
                  <CardTitle>Réinitialisation - Client</CardTitle>
                  <CardDescription>Nous vous enverrons un lien de réinitialisation par email</CardDescription>
                </CardHeader>
                <form onSubmit={handleUserReset}>
                  <CardContent className="space-y-4">
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    {success && (
                      <Alert className="border-green-500 bg-green-50 text-green-900">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <AlertDescription>
                          Un email de réinitialisation a été envoyé à votre adresse. Vérifiez votre boîte de réception.
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="userEmail">Adresse email</Label>
                      <Input
                        id="userEmail"
                        type="email"
                        placeholder="votre@email.com"
                        required
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        disabled={success}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={loading || success}>
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Envoyer le lien de réinitialisation
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            {/* Réinitialisation Pharmacie */}
            <TabsContent value="pharmacie">
              <Card>
                <CardHeader>
                  <CardTitle>Réinitialisation - Pharmacie</CardTitle>
                  <CardDescription>Nous vous enverrons un lien de réinitialisation par email</CardDescription>
                </CardHeader>
                <form onSubmit={handlePharmacyReset}>
                  <CardContent className="space-y-4">
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    {success && (
                      <Alert className="border-green-500 bg-green-50 text-green-900">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <AlertDescription>
                          Un email de réinitialisation a été envoyé à votre adresse. Vérifiez votre boîte de réception.
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="pharmacyEmail">Adresse email</Label>
                      <Input
                        id="pharmacyEmail"
                        type="email"
                        placeholder="pharmacie@email.com"
                        required
                        value={pharmacyEmail}
                        onChange={(e) => setPharmacyEmail(e.target.value)}
                        disabled={success}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={loading || success}>
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Envoyer le lien de réinitialisation
                    </Button>
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
