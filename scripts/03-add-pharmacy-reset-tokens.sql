-- Ajouter les colonnes pour la réinitialisation de mot de passe des pharmacies
ALTER TABLE pharmacies 
ADD COLUMN IF NOT EXISTS reset_token VARCHAR(255),
ADD COLUMN IF NOT EXISTS reset_token_expiry DATETIME;

-- Créer des index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_reset_token ON users(reset_token);
CREATE INDEX IF NOT EXISTS idx_pharmacy_reset_token ON pharmacies(reset_token);
