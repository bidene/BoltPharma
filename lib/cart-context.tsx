"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface CartItem {
  id: number
  medication_id: number
  name: string
  price: number
  quantity: number
  image_url?: string
  pharmacy_id: number
  pharmacy_name: string
  requires_prescription: boolean
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "id">) => Promise<void>
  removeItem: (medicationId: number) => Promise<void>
  updateQuantity: (medicationId: number, quantity: number) => Promise<void>
  clearCart: () => void
  totalItems: number
  totalPrice: number
  loading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  // Charger le panier au démarrage
  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = async () => {
    try {
      const response = await fetch("/api/cart")
      if (response.ok) {
        const data = await response.json()
        setItems(data.items || [])
      }
    } catch (error) {
      console.error("[v0] Error loading cart:", error)
    } finally {
      setLoading(false)
    }
  }

  const addItem = async (item: Omit<CartItem, "id">) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      })

      if (response.ok) {
        await loadCart()
      }
    } catch (error) {
      console.error("[v0] Error adding to cart:", error)
      throw error
    }
  }

  const removeItem = async (medicationId: number) => {
    try {
      const response = await fetch(`/api/cart?medicationId=${medicationId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setItems(items.filter((item) => item.medication_id !== medicationId))
      }
    } catch (error) {
      console.error("[v0] Error removing from cart:", error)
      throw error
    }
  }

  const updateQuantity = async (medicationId: number, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(medicationId)
      return
    }

    try {
      const response = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ medicationId, quantity }),
      })

      if (response.ok) {
        setItems(items.map((item) => (item.medication_id === medicationId ? { ...item, quantity } : item)))
      }
    } catch (error) {
      console.error("[v0] Error updating quantity:", error)
      throw error
    }
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
