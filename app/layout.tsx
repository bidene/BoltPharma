import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { CartProvider } from "@/lib/cart-context"
import { Chatbot } from "@/components/chatbot"
import { LoadingScreen } from "@/components/loading-screen"
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import "./globals.css"

export const metadata: Metadata = {
  title: "BoltPharma - Votre pharmacie en ligne au Bénin",
  description:
    "Achetez vos médicaments en ligne et faites-vous livrer rapidement avec BoltPharma et GoZem",
  generator: "v0.app",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans">
        <ClerkProvider>
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  S'inscrire
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          <LoadingScreen />
          <CartProvider>
            <Suspense fallback={null}>
              {children}
            </Suspense>
            <Chatbot />
          </CartProvider>
          <Analytics />
        </ClerkProvider>
      </body>
    </html>
  )
}