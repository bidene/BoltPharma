-- BoltPharma Initial Data Seeding
-- Version 1.0

-- Insertion des catégories de médicaments
INSERT INTO categories (name, slug, description, icon) VALUES
('Analgésiques', 'analgesiques', 'Médicaments contre la douleur', 'pill'),
('Antibiotiques', 'antibiotiques', 'Traitement des infections bactériennes', 'shield'),
('Antipaludéens', 'antipaludeens', 'Traitement et prévention du paludisme', 'bug'),
('Vitamines', 'vitamines', 'Compléments vitaminiques et minéraux', 'heart'),
('Digestifs', 'digestifs', 'Troubles digestifs et gastriques', 'activity'),
('Respiratoires', 'respiratoires', 'Affections respiratoires', 'wind'),
('Dermatologie', 'dermatologie', 'Soins de la peau', 'droplet'),
('Cardiovasculaires', 'cardiovasculaires', 'Santé cardiaque', 'heart-pulse'),
('Diabète', 'diabete', 'Gestion du diabète', 'syringe'),
('Pédiatrie', 'pediatrie', 'Médicaments pour enfants', 'baby');

-- Insertion d'une pharmacie de démonstration
INSERT INTO pharmacies (
    email, 
    password_hash, 
    name, 
    license_number, 
    phone, 
    address, 
    city, 
    latitude, 
    longitude,
    opening_hours,
    is_verified,
    auto_validate_orders
) VALUES (
    'pharmacie.demo@boltpharma.com',
    '$2a$10$rXK5qF8qF8qF8qF8qF8qFOuK5qF8qF8qF8qF8qF8qF8qF8qF8qF8qF', -- password123
    'Pharmacie Centrale de Cotonou',
    'PC-2024-001',
    '+229 97 00 00 00',
    'Avenue Steinmetz, près du marché Dantokpa',
    'Cotonou',
    6.3654,
    2.4183,
    '{"lundi": "08:00-20:00", "mardi": "08:00-20:00", "mercredi": "08:00-20:00", "jeudi": "08:00-20:00", "vendredi": "08:00-20:00", "samedi": "08:00-18:00", "dimanche": "09:00-13:00"}',
    TRUE,
    FALSE
);

-- Insertion de médicaments de démonstration
INSERT INTO medications (pharmacy_id, category_id, name, generic_name, description, dosage, form, manufacturer, price, stock_quantity, requires_prescription) VALUES
(1, 1, 'Paracétamol 500mg', 'Paracétamol', 'Analgésique et antipyrétique pour soulager la douleur et la fièvre', '500mg', 'Comprimé', 'Pharma Afrique', 500, 200, FALSE),
(1, 1, 'Ibuprofène 400mg', 'Ibuprofène', 'Anti-inflammatoire non stéroïdien', '400mg', 'Comprimé', 'MediLab', 800, 150, FALSE),
(1, 2, 'Amoxicilline 500mg', 'Amoxicilline', 'Antibiotique à large spectre', '500mg', 'Gélule', 'BioPharm', 2500, 100, TRUE),
(1, 2, 'Azithromycine 250mg', 'Azithromycine', 'Antibiotique macrolide', '250mg', 'Comprimé', 'Global Pharma', 3500, 80, TRUE),
(1, 3, 'Artéméther + Luméfantrine', 'Coartem', 'Traitement du paludisme non compliqué', '20mg/120mg', 'Comprimé', 'Novartis', 4500, 120, FALSE),
(1, 3, 'Artésunate Injectable', 'Artésunate', 'Traitement du paludisme sévère', '60mg', 'Injectable', 'Sanofi', 8000, 50, TRUE),
(1, 4, 'Vitamine C 1000mg', 'Acide Ascorbique', 'Complément vitaminique', '1000mg', 'Comprimé effervescent', 'VitaHealth', 1500, 300, FALSE),
(1, 4, 'Multivitamines', 'Complexe multivitaminé', 'Complément alimentaire complet', 'Dose quotidienne', 'Comprimé', 'NutriPlus', 3000, 200, FALSE),
(1, 5, 'Oméprazole 20mg', 'Oméprazole', 'Inhibiteur de la pompe à protons', '20mg', 'Gélule', 'GastroCare', 2000, 150, FALSE),
(1, 6, 'Sirop contre la toux', 'Dextrométhorphane', 'Antitussif', '15mg/5ml', 'Sirop', 'RespiraPharma', 2500, 100, FALSE);

-- Insertion d'un utilisateur de démonstration
INSERT INTO users (
    email,
    password_hash,
    first_name,
    last_name,
    phone,
    address,
    city,
    email_verified
) VALUES (
    'client.demo@boltpharma.com',
    '$2a$10$rXK5qF8qF8qF8qF8qF8qFOuK5qF8qF8qF8qF8qF8qF8qF8qF8qF8qF', -- password123
    'Jean',
    'Kouassi',
    '+229 96 00 00 00',
    'Quartier Akpakpa, Rue 123',
    'Cotonou',
    TRUE
);