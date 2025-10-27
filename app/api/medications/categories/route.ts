import { NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET() {
  try {
    const categories = await query(`
      SELECT 
        category,
        COUNT(*) as count,
        MIN(price) as min_price,
        MAX(price) as max_price
      FROM medications
      WHERE stock_quantity > 0
      GROUP BY category
      ORDER BY category ASC
    `)

    return NextResponse.json({
      success: true,
      data: categories,
    })
  } catch (error) {
    console.error("[v0] Error fetching categories:", error)
    return NextResponse.json(
      { success: false, error: "Erreur lors de la récupération des catégories" },
      { status: 500 },
    )
  }
}
