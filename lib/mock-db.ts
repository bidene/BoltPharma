// Données mockées pour le développement
// En production, ces données viendront de MySQL

// Vous pouvez vérifier ce hash avec: bcrypt.compare("password123", hash)
const PASSWORD_HASH = "$2b$10$slYQmyNdGzin7olVN3/p2OPST9/PgBkqquzi.Ss7KIUgO2t0jWMUW"

export const mockUsers = [
  {
    id: 1,
    email: "client.demo@boltpharma.com",
    password_hash: PASSWORD_HASH,
    first_name: "Client",
    last_name: "Démo",
    phone: "+229 97 00 00 01",
    address: "Cotonou, Bénin",
    city: "Cotonou",
    is_verified: true,
    loyalty_points: 150,
    created_at: new Date("2024-01-15"),
  },
  {
    id: 2,
    email: "jean.dupont@email.com",
    password_hash: PASSWORD_HASH,
    first_name: "Jean",
    last_name: "Dupont",
    phone: "+229 97 11 22 33",
    address: "Porto-Novo, Bénin",
    city: "Porto-Novo",
    is_verified: true,
    loyalty_points: 50,
    created_at: new Date("2024-02-01"),
  },
]

export const mockPharmacies = [
  {
    id: 1,
    email: "pharmacie.demo@boltpharma.com",
    password_hash: PASSWORD_HASH,
    name: "Pharmacie Démo",
    license_number: "PH-DEMO-001",
    phone: "+229 21 30 40 50",
    address: "Avenue Steinmetz, Cotonou",
    city: "Cotonou",
    latitude: 6.3654,
    longitude: 2.4183,
    is_verified: true,
    is_active: true,
    rating: 4.8,
    created_at: new Date("2024-01-01"),
  },
  {
    id: 2,
    email: "pharmacie.centrale@email.com",
    password_hash: PASSWORD_HASH,
    name: "Pharmacie Centrale",
    license_number: "PH-2024-002",
    phone: "+229 21 31 41 51",
    address: "Boulevard de la Marina, Cotonou",
    city: "Cotonou",
    latitude: 6.3702,
    longitude: 2.4289,
    is_verified: true,
    is_active: true,
    rating: 4.5,
    created_at: new Date("2024-01-10"),
  },
]

export const mockMedications = [
  {
    id: 1,
    pharmacy_id: 1,
    name: "Paracétamol 500mg",
    description:
      "Antidouleur et antipyrétique efficace pour soulager les douleurs légères à modérées et réduire la fièvre.",
    category: "Antidouleurs",
    price: 1500,
    stock_quantity: 150,
    requires_prescription: false,
    image_url: "/paracetamol-pills-box.jpg",
    pharmacy_name: "Pharmacie Démo",
    pharmacy_address: "Avenue Steinmetz, Cotonou",
    pharmacy_phone: "+229 21 30 40 50",
    created_at: new Date("2024-01-15"),
  },
  {
    id: 2,
    pharmacy_id: 1,
    name: "Amoxicilline 500mg",
    description: "Antibiotique à large spectre pour traiter diverses infections bactériennes.",
    category: "Antibiotiques",
    price: 3500,
    stock_quantity: 80,
    requires_prescription: true,
    image_url: "/amoxicilline.jpg",
    pharmacy_name: "Pharmacie Démo",
    pharmacy_address: "Avenue Steinmetz, Cotonou",
    pharmacy_phone: "+229 21 30 40 50",
    created_at: new Date("2024-01-15"),
  },
  {
    id: 3,
    pharmacy_id: 2,
    name: "Ibuprofène 400mg",
    description: "Anti-inflammatoire non stéroïdien pour soulager la douleur et l'inflammation.",
    category: "Antidouleurs",
    price: 2000,
    stock_quantity: 200,
    requires_prescription: false,
    image_url: "/ibuprofene.jpg",
    pharmacy_name: "Pharmacie Centrale",
    pharmacy_address: "Boulevard de la Marina, Cotonou",
    pharmacy_phone: "+229 21 31 41 51",
    created_at: new Date("2024-01-16"),
  },
  {
    id: 4,
    pharmacy_id: 2,
    name: "Vitamine C 1000mg",
    description: "Complément alimentaire pour renforcer le système immunitaire.",
    category: "Vitamines",
    price: 2500,
    stock_quantity: 300,
    requires_prescription: false,
    image_url: "/vitamine-c.jpg",
    pharmacy_name: "Pharmacie Centrale",
    pharmacy_address: "Boulevard de la Marina, Cotonou",
    pharmacy_phone: "+229 21 31 41 51",
    created_at: new Date("2024-01-16"),
  },
]

export const mockOrders = []
export const mockReviews = []
export const mockFavorites = []
export const mockNotifications = []
