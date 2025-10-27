-- Script pour ajouter un catalogue complet de médicaments avec prix en CFA
-- À exécuter après avoir créé les pharmacies

-- Médicaments pour Pharmacie Centrale (pharmacy_id = 1)

-- ANTIDOULEURS ET ANTIPYRÉTIQUES
INSERT INTO medications (pharmacy_id, name, description, price, category, stock_quantity, requires_prescription, image_url, created_at) VALUES
(1, 'Paracétamol 500mg', 'Antalgique et antipyrétique efficace contre la douleur et la fièvre. Boîte de 20 comprimés. Convient aux adultes et enfants de plus de 15 ans.', 1500, 'Antidouleurs', 500, 0, '/paracetamol-pills-box.jpg', NOW()),
(1, 'Ibuprofène 400mg', 'Anti-inflammatoire non stéroïdien pour soulager les douleurs modérées, la fièvre et les inflammations. Boîte de 30 comprimés pelliculés.', 2500, 'Antidouleurs', 300, 0, '/placeholder.svg?height=200&width=200', NOW()),
(1, 'Aspirine 500mg', 'Acide acétylsalicylique pour le traitement de la douleur, la fièvre et comme antiagrégant plaquettaire. Boîte de 20 comprimés effervescents.', 1800, 'Antidouleurs', 400, 0, '/placeholder.svg?height=200&width=200', NOW()),
(1, 'Doliprane 1000mg', 'Paracétamol dosage fort pour adultes. Traitement symptomatique des douleurs et de la fièvre. Boîte de 8 comprimés effervescents.', 2200, 'Antidouleurs', 350, 0, '/placeholder.svg?height=200&width=200', NOW()),

-- ANTIBIOTIQUES (Prescription requise)
INSERT INTO medications (pharmacy_id, name, description, price, category, stock_quantity, requires_prescription, image_url, created_at) VALUES
(1, 'Amoxicilline 500mg', 'Antibiotique de la famille des pénicillines pour infections bactériennes. Boîte de 12 gélules. Prescription médicale obligatoire.', 3500, 'Antibiotiques', 200, 1, '/placeholder.svg?height=200&width=200', NOW()),
(1, 'Azithromycine 250mg', 'Antibiotique macrolide à large spectre. Traitement des infections respiratoires et ORL. Boîte de 6 comprimés pelliculés.', 4500, 'Antibiotiques', 150, 1, '/placeholder.svg?height=200&width=200', NOW()),
(1, 'Ciprofloxacine 500mg', 'Antibiotique fluoroquinolone pour infections urinaires et digestives. Boîte de 10 comprimés. Sur ordonnance uniquement.', 5000, 'Antibiotiques', 180, 1, '/placeholder.svg?height=200&width=200', NOW()),
(1, 'Métronidazole 500mg', 'Antibiotique et antiparasitaire pour infections digestives et gynécologiques. Boîte de 20 comprimés. Prescription obligatoire.', 3800, 'Antibiotiques', 220, 1, '/placeholder.svg?height=200&width=200', NOW()),

-- ANTIPALUDÉENS
INSERT INTO medications (pharmacy_id, name, description, price, category, stock_quantity, requires_prescription, image_url, created_at) VALUES
(1, 'Artéméther + Luméfantrine', 'Traitement du paludisme simple. Combinaison thérapeutique à base d\'artémisinine (CTA). Boîte de 24 comprimés pour cure complète.', 6500, 'Antipaludéens', 400, 0, '/placeholder.svg?height=200&width=200', NOW()),
(1, 'Quinine 500mg', 'Traitement du paludisme grave et simple. Boîte de 12 comprimés. Efficace contre Plasmodium falciparum.', 4200, 'Antipaludéens', 300, 0, '/placeholder.svg?height=200&width=200', NOW()),
(1, 'Artésunate Injectable', 'Traitement du paludisme grave en milieu hospitalier. Boîte de 6 ampoules de 60mg. Prescription médicale requise.', 12000, 'Antipaludéens', 100, 1, '/placeholder.svg?height=200&width=200', NOW()),

-- VITAMINES ET SUPPLÉMENTS
INSERT INTO medications (pharmacy_id, name, description, price, category, stock_quantity, requires_prescription, image_url, created_at) VALUES
(1, 'Vitamine C 1000mg', 'Complément alimentaire pour renforcer le système immunitaire. Boîte de 30 comprimés effervescents goût orange.', 3500, 'Vitamines', 600, 0, '/placeholder.svg?height=200&width=200', NOW()),
(1, 'Multivitamines Complexe B', 'Vitamines B1, B2, B6, B12 pour l\'énergie et le système nerveux. Boîte de 60 comprimés pelliculés.', 4500, 'Vitamines', 400, 0, '/placeholder.svg?height=200&width=200', NOW()),
(1, 'Fer + Acide Folique', 'Supplément pour prévenir et traiter l\'anémie. Recommandé pour femmes enceintes. Boîte de 90 comprimés.', 3200, 'Vitamines', 350, 0, '/placeholder.svg?height=200&width=200', NOW()),
(1, 'Calcium + Vitamine D3', 'Renforcement des os et prévention de l\'ostéoporose. Boîte de 60 comprimés à croquer goût citron.', 5500, 'Vitamines', 280, 0, '/placeholder.svg?height=200&width=200', NOW()),
(1, 'Zinc 25mg', 'Oligo-élément essentiel pour l\'immunité et la cicatrisation. Boîte de 30 gélules.', 2800, 'Vitamines', 320, 0, '/placeholder.svg?height=200&width=200', NOW()),

-- MÉDICAMENTS DIGESTIFS
INSERT INTO medications (pharmacy_id, name, description, price, category, stock_quantity, requires_prescription, image_url, created_at) VALUES
(1, 'Oméprazole 20mg', 'Inhibiteur de la pompe à protons pour reflux gastrique et ulcères. Boîte de 14 gélules gastro-résistantes.', 4200, 'Digestifs', 250, 0, '/placeholder.svg?height=200&width=200', NOW()),
(1, 'Spasfon 80mg', 'Antispasmodique pour douleurs abdominales et crampes. Boîte de 30 comprimés pelliculés.', 3800, 'Digestifs', 400, 0, '/placeholder.svg?height=200&width=200', NOW()),
(1, 'Smecta Vanille', 'Traitement symptomatique de la diarrhée aiguë. Boîte de 30 sachets poudre orale goût vanille.', 4500, 'Digestifs', 350, 0, '/placeholder.svg?height=200&width=200', NOW()),
(1, 'Charbon Activé', 'Traitement des ballonnements et troubles digestifs. Boîte de 45 gélules végétales.', 2500, 'Digestifs', 300, 0, '/placeholder.svg?height=200&width=200', NOW()),

-- MÉDICAMENTS RESPIRATOIRES
INSERT INTO medications (pharmacy_id, name, description, price, category, stock_quantity, requires_prescription, image_url, created_at) VALUES
(1, 'Sirop contre la Toux', 'Sirop expectorant et antitussif. Flacon de 125ml. Convient adultes et enfants dès 2 ans.', 3200, 'Respiratoires', 280, 0, '/placeholder.svg?height=200&width=200', NOW()),
(1, 'Ventoline Spray', 'Bronchodilatateur pour asthme et bronchospasme. Aérosol doseur 100 microgrammes. Prescription recommandée.', 8500, 'Respiratoires', 150, 1, '/placeholder.svg?height=200&width=200', NOW()),
(1, 'Loratadine 10mg', 'Antihistaminique pour allergies et rhinite. Boîte de 10 comprimés. Sans somnolence.', 2800, 'Respiratoires', 320, 0, '/placeholder.svg?height=200&width=200', NOW()),

-- MÉDICAMENTS CARDIOVASCULAIRES
INSERT INTO medications (pharmacy_id, name, description, price, category, stock_quantity, requires_prescription, image_url, created_at) VALUES
(1, 'Amlodipine 5mg', 'Antihypertenseur inhibiteur calcique. Traitement de l\'hypertension artérielle. Boîte de 30 comprimés.', 5500, 'Cardiovasculaires', 200, 1, '/placeholder.svg?height=200&width=200', NOW()),
(1, 'Enalapril 10mg', 'Inhibiteur de l\'enzyme de conversion pour hypertension et insuffisance cardiaque. Boîte de 30 comprimés.', 4800, 'Cardiovasculaires', 180, 1, '/placeholder.svg?height=200&width=200', NOW()),
(1, 'Atorvastatine 20mg', 'Hypolipémiant pour réduire le cholestérol. Boîte de 30 comprimés pelliculés.', 6500, 'Cardiovasculaires', 150, 1, '/placeholder.svg?height=200&width=200', NOW()),

-- ANTIDIABÉTIQUES
INSERT INTO medications (pharmacy_id, name, description, price, category, stock_quantity, requires_prescription, image_url, created_at) VALUES
(1, 'Metformine 850mg', 'Antidiabétique oral pour diabète de type 2. Boîte de 60 comprimés pelliculés. Prescription obligatoire.', 5200, 'Antidiabétiques', 220, 1, '/placeholder.svg?height=200&width=200', NOW()),
(1, 'Glibenclamide 5mg', 'Hypoglycémiant oral sulfamide pour diabète type 2. Boîte de 60 comprimés. Sur ordonnance.', 4500, 'Antidiabétiques', 180, 1, '/placeholder.svg?height=200&width=200', NOW()),

-- SOINS ET HYGIÈNE
INSERT INTO medications (pharmacy_id, name, description, price, category, stock_quantity, requires_prescription, image_url, created_at) VALUES
(1, 'Alcool 70° - 250ml', 'Solution antiseptique pour désinfection de la peau. Flacon de 250ml avec bouchon sécurité.', 1500, 'Soins', 500, 0, '/placeholder.svg?height=200&width=200', NOW()),
(1, 'Bétadine Solution 10%', 'Antiseptique à base de povidone iodée pour plaies et brûlures. Flacon de 125ml.', 3500, 'Soins', 300, 0, '/placeholder.svg?height=200&width=200', NOW()),
(1, 'Pansements Stériles', 'Boîte de 20 pansements adhésifs stériles assortis. Hypoallergéniques et respirants.', 2200, 'Soins', 400, 0, '/placeholder.svg?height=200&width=200', NOW()),
(1, 'Thermomètre Digital', 'Thermomètre médical électronique avec embout flexible. Mesure rapide en 60 secondes. Garantie 2 ans.', 4500, 'Soins', 150, 0, '/placeholder.svg?height=200&width=200', NOW()),
(1, 'Masques Chirurgicaux', 'Boîte de 50 masques jetables 3 plis. Protection contre virus et bactéries. Norme CE.', 5500, 'Soins', 600, 0, '/placeholder.svg?height=200&width=200', NOW()),

-- CONTRACEPTION ET SANTÉ FÉMININE
INSERT INTO medications (pharmacy_id, name, description, price, category, stock_quantity, requires_prescription, image_url, created_at) VALUES
(1, 'Pilule Contraceptive', 'Contraceptif oral combiné. Plaquette de 21 comprimés. Prescription médicale obligatoire.', 3500, 'Contraception', 200, 1, '/placeholder.svg?height=200&width=200', NOW()),
(1, 'Test de Grossesse', 'Test de grossesse urinaire fiable à 99%. Résultat en 3 minutes. Boîte de 2 tests.', 2500, 'Contraception', 250, 0, '/placeholder.svg?height=200&width=200', NOW()),

-- PÉDIATRIE
INSERT INTO medications (pharmacy_id, name, description, price, category, stock_quantity, requires_prescription, image_url, created_at) VALUES
(1, 'Paracétamol Sirop Enfant', 'Antipyrétique et antalgique pour enfants. Flacon de 90ml avec pipette doseuse. Goût fraise.', 2800, 'Pédiatrie', 350, 0, '/placeholder.svg?height=200&width=200', NOW()),
(1, 'Vitamine D3 Gouttes Bébé', 'Supplément vitaminique pour nourrissons et enfants. Flacon compte-gouttes 20ml.', 3200, 'Pédiatrie', 280, 0, '/placeholder.svg?height=200&width=200', NOW()),
(1, 'Sérum Physiologique', 'Boîte de 40 unidoses stériles pour lavage nasal et oculaire. Convient dès la naissance.', 2500, 'Pédiatrie', 450, 0, '/placeholder.svg?height=200&width=200', NOW());

-- Médicaments pour Pharmacie du Marché (pharmacy_id = 2)
INSERT INTO medications (pharmacy_id, name, description, price, category, stock_quantity, requires_prescription, image_url, created_at) VALUES
(2, 'Paracétamol 500mg', 'Antalgique et antipyrétique efficace contre la douleur et la fièvre. Boîte de 20 comprimés.', 1400, 'Antidouleurs', 600, 0, '/paracetamol-pills-box.jpg', NOW()),
(2, 'Ibuprofène 400mg', 'Anti-inflammatoire non stéroïdien. Boîte de 30 comprimés pelliculés.', 2400, 'Antidouleurs', 350, 0, '/placeholder.svg?height=200&width=200', NOW()),
(2, 'Amoxicilline 500mg', 'Antibiotique pénicilline. Boîte de 12 gélules. Prescription obligatoire.', 3400, 'Antibiotiques', 250, 1, '/placeholder.svg?height=200&width=200', NOW()),
(2, 'Artéméther + Luméfantrine', 'Traitement antipaludéen CTA. Boîte de 24 comprimés pour cure complète.', 6300, 'Antipaludéens', 450, 0, '/placeholder.svg?height=200&width=200', NOW()),
(2, 'Vitamine C 1000mg', 'Complément immunitaire. Boîte de 30 comprimés effervescents.', 3400, 'Vitamines', 500, 0, '/placeholder.svg?height=200&width=200', NOW()),
(2, 'Oméprazole 20mg', 'Traitement reflux gastrique. Boîte de 14 gélules.', 4000, 'Digestifs', 280, 0, '/placeholder.svg?height=200&width=200', NOW()),
(2, 'Sirop contre la Toux', 'Expectorant et antitussif. Flacon 125ml.', 3000, 'Respiratoires', 300, 0, '/placeholder.svg?height=200&width=200', NOW()),
(2, 'Metformine 850mg', 'Antidiabétique oral. Boîte de 60 comprimés. Prescription requise.', 5000, 'Antidiabétiques', 200, 1, '/placeholder.svg?height=200&width=200', NOW()),
(2, 'Bétadine Solution 10%', 'Antiseptique povidone iodée. Flacon 125ml.', 3400, 'Soins', 320, 0, '/placeholder.svg?height=200&width=200', NOW()),
(2, 'Masques Chirurgicaux', 'Boîte de 50 masques 3 plis. Norme CE.', 5300, 'Soins', 550, 0, '/placeholder.svg?height=200&width=200', NOW());

-- Médicaments pour Pharmacie de la Santé (pharmacy_id = 3)
INSERT INTO medications (pharmacy_id, name, description, price, category, stock_quantity, requires_prescription, image_url, created_at) VALUES
(3, 'Doliprane 1000mg', 'Paracétamol dosage fort. Boîte de 8 comprimés effervescents.', 2100, 'Antidouleurs', 400, 0, '/placeholder.svg?height=200&width=200', NOW()),
(3, 'Aspirine 500mg', 'Acide acétylsalicylique. Boîte de 20 comprimés effervescents.', 1700, 'Antidouleurs', 450, 0, '/placeholder.svg?height=200&width=200', NOW()),
(3, 'Azithromycine 250mg', 'Antibiotique macrolide. Boîte de 6 comprimés. Prescription obligatoire.', 4400, 'Antibiotiques', 180, 1, '/placeholder.svg?height=200&width=200', NOW()),
(3, 'Quinine 500mg', 'Traitement antipaludéen. Boîte de 12 comprimés.', 4000, 'Antipaludéens', 350, 0, '/placeholder.svg?height=200&width=200', NOW()),
(3, 'Multivitamines Complexe B', 'Vitamines B pour l\'énergie. Boîte de 60 comprimés.', 4300, 'Vitamines', 380, 0, '/placeholder.svg?height=200&width=200', NOW()),
(3, 'Fer + Acide Folique', 'Supplément anti-anémie. Boîte de 90 comprimés.', 3100, 'Vitamines', 320, 0, '/placeholder.svg?height=200&width=200', NOW()),
(3, 'Spasfon 80mg', 'Antispasmodique digestif. Boîte de 30 comprimés.', 3700, 'Digestifs', 380, 0, '/placeholder.svg?height=200&width=200', NOW()),
(3, 'Ventoline Spray', 'Bronchodilatateur pour asthme. Aérosol doseur. Prescription recommandée.', 8300, 'Respiratoires', 120, 1, '/placeholder.svg?height=200&width=200', NOW()),
(3, 'Amlodipine 5mg', 'Antihypertenseur. Boîte de 30 comprimés. Prescription obligatoire.', 5400, 'Cardiovasculaires', 180, 1, '/placeholder.svg?height=200&width=200', NOW()),
(3, 'Thermomètre Digital', 'Thermomètre médical électronique. Mesure rapide.', 4300, 'Soins', 180, 0, '/placeholder.svg?height=200&width=200', NOW()),
(3, 'Paracétamol Sirop Enfant', 'Antipyrétique pédiatrique. Flacon 90ml goût fraise.', 2700, 'Pédiatrie', 320, 0, '/placeholder.svg?height=200&width=200', NOW());

-- Afficher le résumé
SELECT 
    p.name AS pharmacie,
    COUNT(m.id) AS nombre_medicaments,
    SUM(m.stock_quantity) AS stock_total
FROM pharmacies p
LEFT JOIN medications m ON p.id = m.pharmacy_id
GROUP BY p.id, p.name
ORDER BY p.id;
