"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Package, ArrowRight } from "lucide-react"

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const orderNumbers = searchParams.get("orders")?.split(",") || []

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <Card className="mx-auto max-w-2xl text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-3xl">Commande confirmée !</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-muted-foreground">
              Merci pour votre commande. Nous avons bien reçu votre demande et la pharmacie va la traiter rapidement.
            </p>

            <div className="rounded-lg bg-muted p-6">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Package className="h-5 w-5" />
                <span>Numéro(s) de commande</span>
              </div>
              <div className="mt-2 space-y-1">
                {orderNumbers.map((number) => (
                  <p key={number} className="text-xl font-bold">
                    {number}
                  </p>
                ))}
              </div>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Vous recevrez une notification dès que la pharmacie validera votre commande.</p>
              <p>Un livreur GoZem viendra récupérer votre commande et vous la livrera rapidement.</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <Link href="/tableau-de-bord">
                Voir mes commandes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/catalogue">Continuer mes achats</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

export default function CommandeConfirmeePage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <ConfirmationContent />
    </Suspense>
  )
}
