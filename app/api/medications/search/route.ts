import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const searchQuery = searchParams.get("q") || ""
    const category = searchParams.get("category") || ""
    const minPrice = searchParams.get("minPrice") || "0"
    const maxPrice = searchParams.get("maxPrice") || "1000000"
    const requiresPrescription = searchParams.get("prescription")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const offset = (page - 1) * limit

    let sql = `
      SELECT 
        m.*,
        p.name as pharmacy_name,
        p.address as pharmacy_address,
        p.phone as pharmacy_phone
      FROM medications m
      JOIN pharmacies p ON m.pharmacy_id = p.id
      WHERE m.stock_quantity > 0
    `
    const params: any[] = []

    // Filtre de recherche par nom ou description
    if (searchQuery) {
      sql += ` AND (m.name LIKE ? OR m.description LIKE ?)`
      params.push(`%${searchQuery}%`, `%${searchQuery}%`)
    }

    // Filtre par catégorie
    if (category) {
      sql += ` AND m.category = ?`
      params.push(category)
    }

    // Filtre par prix
    sql += ` AND m.price BETWEEN ? AND ?`
    params.push(Number.parseFloat(minPrice), Number.parseFloat(maxPrice))

    // Filtre par prescription
    if (requiresPrescription !== null && requiresPrescription !== "") {
      sql += ` AND m.requires_prescription = ?`
      params.push(requiresPrescription === "true" ? 1 : 0)
    }

    // Compter le total
    const countSql = sql.replace(
      "SELECT m.*, p.name as pharmacy_name, p.address as pharmacy_address, p.phone as pharmacy_phone",
      "SELECT COUNT(*) as total",
    )
    const countResult = await query(countSql, params)
    const total = countResult[0]?.total || 0

    // Ajouter pagination et tri
    sql += ` ORDER BY m.name ASC LIMIT ? OFFSET ?`
    params.push(limit, offset)

    const medications = await query(sql, params)

    return NextResponse.json({
      success: true,
      data: medications,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("[v0] Error searching medications:", error)
    return NextResponse.json({ success: false, error: "Erreur lors de la recherche des médicaments" }, { status: 500 })
  }
}
