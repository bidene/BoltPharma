// Configuration de la base de données MySQL
// Ce fichier gère la connexion à la base de données

export const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: Number.parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "boltpharma",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}

// Types TypeScript pour les tables de la base de données

export interface User {
  id: number
  email: string
  password_hash: string
  first_name: string
  last_name: string
  phone: string
  address?: string
  city?: string
  country: string
  email_verified: boolean
  verification_token?: string
  reset_token?: string
  reset_token_expiry?: Date
  created_at: Date
  updated_at: Date
}

export interface Pharmacy {
  id: number
  email: string
  password_hash: string
  name: string
  license_number: string
  phone: string
  address: string
  city: string
  country: string
  latitude?: number
  longitude?: number
  opening_hours?: Record<string, string>
  is_active: boolean
  is_verified: boolean
  verification_token?: string
  auto_validate_orders: boolean
  created_at: Date
  updated_at: Date
}

export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  icon?: string
  created_at: Date
}

export interface Medication {
  id: number
  pharmacy_id: number
  category_id: number
  name: string
  generic_name?: string
  description?: string
  dosage?: string
  form?: string
  manufacturer?: string
  price: number
  stock_quantity: number
  min_stock_alert: number
  requires_prescription: boolean
  image_url?: string
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export interface Order {
  id: number
  order_number: string
  user_id: number
  pharmacy_id: number
  total_amount: number
  delivery_fee: number
  status: "pending" | "validated" | "preparing" | "ready" | "in_delivery" | "delivered" | "cancelled"
  payment_status: "pending" | "paid" | "failed" | "refunded"
  payment_method: "mtn" | "moov" | "celtis" | "cash"
  payment_reference?: string
  delivery_address: string
  delivery_city: string
  delivery_phone: string
  delivery_notes?: string
  gozem_order_id?: string
  gozem_driver_id?: string
  gozem_tracking_url?: string
  estimated_delivery_time?: Date
  delivered_at?: Date
  cancelled_reason?: string
  created_at: Date
  updated_at: Date
}

export interface OrderItem {
  id: number
  order_id: number
  medication_id: number
  quantity: number
  unit_price: number
  subtotal: number
  created_at: Date
}

export interface Payment {
  id: number
  order_id: number
  amount: number
  payment_method: "mtn" | "moov" | "celtis"
  transaction_id?: string
  phone_number: string
  status: "pending" | "success" | "failed" | "cancelled"
  provider_response?: Record<string, any>
  created_at: Date
  updated_at: Date
}

export interface Notification {
  id: number
  user_id?: number
  pharmacy_id?: number
  type: "order" | "payment" | "delivery" | "stock" | "system"
  title: string
  message: string
  is_read: boolean
  related_order_id?: number
  created_at: Date
}

export interface CartItem {
  id: number
  user_id: number
  medication_id: number
  quantity: number
  created_at: Date
  updated_at: Date
}
