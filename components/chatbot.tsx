"use client"

import type React from "react"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { MessageCircle, X, Send, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chatbot" }),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || status === "in_progress") return

    sendMessage({ text: inputValue })
    setInputValue("")
  }

  const quickQuestions = [
    "Quels médicaments avez-vous pour la fièvre ?",
    "Comment suivre ma commande ?",
    "Quels sont les modes de paiement ?",
    "Combien de temps prend la livraison ?",
  ]

  return (
    <>
      {/* Bouton flottant */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ y: { repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" } }}
            >
              <Button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary shadow-lg hover:bg-primary/90"
                size="icon"
              >
                <MessageCircle className="h-6 w-6" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fenêtre du chatbot */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="fixed bottom-6 right-6 z-50 flex h-[600px] w-[400px] flex-col shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b bg-primary p-4 text-primary-foreground">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                  >
                    <MessageCircle className="h-5 w-5" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold">Assistant BoltPharma</h3>
                    <div className="flex items-center gap-1">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                        className="h-2 w-2 rounded-full bg-green-400"
                      />
                      <p className="text-xs opacity-90">En ligne</p>
                    </div>
                  </div>
                </div>
                <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.2 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-primary-foreground hover:bg-primary-foreground/20"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </motion.div>
              </div>

              {/* Messages */}
              <div className="flex-1 space-y-4 overflow-y-auto p-4">
                {messages.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                  >
                    <div className="rounded-lg bg-muted p-4">
                      <p className="text-sm">
                        Bonjour ! 👋 Je suis votre assistant virtuel BoltPharma. Comment puis-je vous aider aujourd'hui
                        ?
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">Questions rapides :</p>
                      {quickQuestions.map((question, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            sendMessage({ text: question })
                          }}
                          className="w-full rounded-lg border bg-background p-2 text-left text-sm hover:bg-muted"
                        >
                          {question}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      {message.parts.map((part, i) => {
                        if (part.type === "text") {
                          return (
                            <p key={i} className="text-sm whitespace-pre-wrap">
                              {part.text}
                            </p>
                          )
                        }

                        // Affichage des résultats d'outils
                        if (part.type === "tool-searchMedications" && part.state === "output-available") {
                          return (
                            <div key={i} className="space-y-2">
                              <p className="text-xs font-medium">Résultats de recherche :</p>
                              {part.output.results.map((med: any, j: number) => (
                                <div key={j} className="rounded border bg-background p-2 text-xs">
                                  <p className="font-medium">{med.name}</p>
                                  <p className="text-muted-foreground">
                                    {med.category} - {med.price}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )
                        }

                        if (part.type === "tool-getOrderStatus" && part.state === "output-available") {
                          return (
                            <div key={i} className="rounded border bg-background p-2 text-xs">
                              <p>
                                <strong>Commande :</strong> {part.output.orderId}
                              </p>
                              <p>
                                <strong>Statut :</strong> {part.output.status}
                              </p>
                              <p>
                                <strong>Livraison estimée :</strong> {part.output.estimatedDelivery}
                              </p>
                            </div>
                          )
                        }

                        return null
                      })}
                    </div>
                  </motion.div>
                ))}

                {status === "in_progress" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="rounded-lg bg-muted p-3">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Posez votre question..."
                    disabled={status === "in_progress"}
                    className="flex-1"
                  />
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button type="submit" size="icon" disabled={!inputValue.trim() || status === "in_progress"}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
