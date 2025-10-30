"use client"

import { useState, useRef, useEffect } from "react"
import { Send, X, MessageCircle } from "lucide-react"

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([
    { role: "assistant", content: "👋 Bonjour et bienvenue sur BoltPharma ! Comment puis-je vous aider aujourd’hui ?" },
  ])
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  // 🔽 Scroll automatique vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // 🔼 Envoi du message
  const sendMessage = async () => {
    if (!input.trim()) return
    const newMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, newMessage])
    setInput("")

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, newMessage] }),
      })

      const data = await res.json()
      if (data?.content) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.content }])
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Erreur de connexion. Veuillez réessayer plus tard." },
      ])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage()
  }

  return (
    <>
      {/* Bouton flottant du chatbot 💬 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Fenêtre du chatbot */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 sm:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden transition-all">
          <div className="bg-blue-600 text-white p-3 text-center font-semibold">
            💊 Assistant BoltPharma
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg text-sm ${
                  msg.role === "assistant"
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 self-start"
                    : "bg-blue-600 text-white self-end ml-auto"
                } w-fit max-w-[85%]`}
              >
                {msg.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center border-t border-gray-200 dark:border-gray-700 p-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Écrivez un message..."
              className="flex-1 border-none outline-none px-2 py-1 bg-transparent text-gray-900 dark:text-gray-100"
            />
            <button
              onClick={sendMessage}
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
