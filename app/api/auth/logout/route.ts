import { NextResponse } from "next/server"
import { clearSession } from "@/lib/auth"

export async function POST() {
  try {
    await clearSession()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Logout Error]", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
