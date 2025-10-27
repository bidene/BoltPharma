"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle2, XCircle, Clock, Smartphone } from "lucide-react"

export default function PaiementPage() {
  const router = useRouter()
  const params = useParams()
  const orderId = params.orderId as string

  const [loading, setLoading] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [error, setError] = useState("")
  const [transactionId, setTransactionId] = useState("")
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "success" | "failed" | null>(null)
  const [orderDetails, setOrderDetails] = useState<any>(null)

  useEffect(() => {
    loadOrderDetails()
  }, [orderId])

  const loadOrderDetails = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}`)
      if (response.ok) {
        const data = await response.json()
        setOrderDetails(data.order)
      }
    } catch (error) {
      console.error("[v0] Error loading order:", error)
    }
  }

  const handleInitiatePayment = async () => {
    if (!orderDetails) return

    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/payments/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: orderDetails.id,
          paymentMethod: orderDetails.payment_method,
          phoneNumber: orderDetails.payment_phone || orderDetails.delivery_phone,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Erreur lors de l'initiation du paiement")
        return
      }

      setTransactionId(data.transactionId)
      setPaymentStatus("pending")

      // Commencer la vérification automatique
      startPaymentVerification(data.transactionId, orderDetails.payment_method)
    } catch (err) {
      setError("Erreur de connexion au serveur")
    } finally {
      setLoading(false)
    }
  }

  const startPaymentVerification = (txId: string, method: string) => {
    setVerifying(true)

    // Vérifier toutes les 5 secondes pendant 2 minutes
    let attempts = 0
    const maxAttempts = 24

    const interval = setInterval(async () => {
      attempts++

      try {
        const response = await fetch("/api/payments/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            transactionId: txId,
            paymentMethod: method,
          }),
        })

        const data = await response.json()

        if (data.status === "success") {
          setPaymentStatus("success")
          clearInterval(interval)
          setVerifying(false)

          // Rediriger vers la page de confirmation
          setTimeout(() => {
            router.push(`/commande-confirmee?orders=${orderDetails.order_number}`)
          }, 2000)
        } else if (data.status === "failed" || data.status === "cancelled") {
          setPaymentStatus("failed")
          setError(data.message || "Le paiement a échoué")
          clearInterval(interval)
          setVerifying(false)
        } else if (attempts >= maxAttempts) {
          setError("Délai d'attente dépassé. Veuillez vérifier votre paiement.")
          clearInterval(interval)
          setVerifying(false)
        }
      } catch (err) {
        console.error("[v0] Verification error:", err)
      }
    }, 5000)
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin" />
            <p className="mt-4">Chargement...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const totalAmount = Number.parseFloat(orderDetails.total_amount) + Number.parseFloat(orderDetails.delivery_fee)

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>Paiement de la commande</CardTitle>
              <CardDescription>Commande #{orderDetails.order_number}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {paymentStatus === "success" && (
                <Alert className="border-green-500 bg-green-50 text-green-900">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription>Paiement confirmé avec succès !</AlertDescription>
                </Alert>
              )}

              {paymentStatus === "failed" && (
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>Le paiement a échoué. Veuillez réessayer.</AlertDescription>
                </Alert>
              )}

              {paymentStatus === "pending" && (
                <Alert>
                  <Clock className="h-4 w-4" />
                  <AlertDescription>
                    En attente de confirmation. Veuillez valider le paiement sur votre téléphone.
                  </AlertDescription>
                </Alert>
              )}

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Montant à payer</span>
                  <span className="text-2xl font-bold">{totalAmount.toLocaleString()} FCFA</span>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg border p-4">
                <Smartphone className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">
                    {orderDetails.payment_method === "mtn" && "MTN Mobile Money"}
                    {orderDetails.payment_method === "moov" && "MOOV Money"}
                    {orderDetails.payment_method === "celtis" && "CELTIS"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {orderDetails.payment_phone || orderDetails.delivery_phone}
                  </p>
                </div>
              </div>

              {verifying && (
                <div className="flex items-center justify-center gap-3 rounded-lg bg-muted p-6">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  <p className="text-sm">Vérification du paiement en cours...</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex-col gap-2">
              {!paymentStatus && (
                <Button className="w-full" size="lg" onClick={handleInitiatePayment} disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Initier le paiement
                </Button>
              )}

              {paymentStatus === "failed" && (
                <Button className="w-full" size="lg" onClick={handleInitiatePayment} disabled={loading}>
                  Réessayer
                </Button>
              )}

              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => router.push("/tableau-de-bord")}
              >
                Retour au tableau de bord
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
