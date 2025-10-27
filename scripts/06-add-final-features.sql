-- Ajout des tables pour les fonctionnalités manquantes

-- Table des avis et évaluations
CREATE TABLE IF NOT EXISTS reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  medication_id INT NOT NULL,
  user_id INT NOT NULL,
  pharmacy_id INT NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  verified_purchase BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (medication_id) REFERENCES medications(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (pharmacy_id) REFERENCES pharmacies(id) ON DELETE CASCADE,
  INDEX idx_medication_reviews (medication_id),
  INDEX idx_user_reviews (user_id)
);

-- Table des favoris
CREATE TABLE IF NOT EXISTS favorites (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  medication_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (medication_id) REFERENCES medications(id) ON DELETE CASCADE,
  UNIQUE KEY unique_favorite (user_id, medication_id),
  INDEX idx_user_favorites (user_id)
);

-- Table des ordonnances
CREATE TABLE IF NOT EXISTS prescriptions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  order_id INT,
  prescription_image VARCHAR(500) NOT NULL,
  doctor_name VARCHAR(100),
  doctor_phone VARCHAR(20),
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  verified_by INT,
  verification_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL,
  FOREIGN KEY (verified_by) REFERENCES pharmacies(id) ON DELETE SET NULL,
  INDEX idx_user_prescriptions (user_id),
  INDEX idx_status (status)
);

-- Table des messages de contact
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  status ENUM('new', 'in_progress', 'resolved') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_status (status)
);

-- Table des recherches (pour suggestions)
CREATE TABLE IF NOT EXISTS search_history (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  search_term VARCHAR(200) NOT NULL,
  results_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_search_term (search_term),
  INDEX idx_user_searches (user_id)
);

-- Ajouter des colonnes manquantes à la table users
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS profile_image VARCHAR(500),
ADD COLUMN IF NOT EXISTS date_of_birth DATE,
ADD COLUMN IF NOT EXISTS gender ENUM('male', 'female', 'other'),
ADD COLUMN IF NOT EXISTS loyalty_points INT DEFAULT 0;

-- Ajouter des colonnes pour les statistiques des pharmacies
ALTER TABLE pharmacies
ADD COLUMN IF NOT EXISTS total_sales DECIMAL(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_orders INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS average_rating DECIMAL(3,2) DEFAULT 0;

-- Insérer quelques avis de démonstration
INSERT INTO reviews (medication_id, user_id, pharmacy_id, rating, comment, verified_purchase) VALUES
(1, 1, 1, 5, 'Excellent produit, très efficace contre les maux de tête. Livraison rapide!', TRUE),
(1, 2, 1, 4, 'Bon rapport qualité-prix. Fonctionne bien.', TRUE),
(2, 1, 2, 5, 'Antibiotique très efficace. Mon médecin me l''a recommandé.', TRUE),
(3, 2, 1, 5, 'Parfait pour renforcer le système immunitaire. Je recommande!', TRUE),
(4, 1, 3, 4, 'Bon sirop pour la toux. Goût agréable.', TRUE);
