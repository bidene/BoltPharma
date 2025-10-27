# BoltPharma - Plateforme E-Commerce Pharmaceutique

## Description du Projet

BoltPharma est une plateforme innovante qui permet aux clients d'acheter des médicaments en ligne et de se les faire livrer rapidement grâce au service GoZem. L'objectif est de faciliter l'accès aux produits pharmaceutiques, tout en offrant une solution moderne et efficace pour les pharmacies et les patients.

## Structure de la Base de Données

### Tables Principales

1. **users** - Gestion des clients
2. **pharmacies** - Gestion des pharmacies partenaires
3. **categories** - Catégories de médicaments
4. **medications** - Catalogue de médicaments
5. **orders** - Commandes clients
6. **order_items** - Détails des articles commandés
7. **payments** - Transactions de paiement
8. **notifications** - Système de notifications
9. **support_tickets** - Support client
10. **reviews** - Avis et évaluations
11. **favorites** - Médicaments favoris
12. **cart_items** - Panier d'achat
13. **pharmacy_stats** - Statistiques des pharmacies

## Fonctionnalités Principales

### 1. Gestion des Utilisateurs
- Inscription et connexion sécurisée
- Vérification d'email
- Réinitialisation de mot de passe
- Gestion du profil

### 2. Gestion des Pharmacies
- Inscription et validation
- Gestion du catalogue de produits
- Gestion des stocks
- Traitement des commandes
- Tableau de bord avec statistiques

### 3. Catalogue et Commandes
- Recherche avancée de médicaments
- Panier d'achat
- Système de commande complet
- Paiements mobiles (MTN, MOOV, CELTIS)

### 4. Livraison
- Intégration avec GoZem
- Suivi en temps réel
- Notifications de livraison

### 5. Support Client
- Chatbot intelligent
- Système de tickets
- Notifications en temps réel

## Variables d'Environnement Requises

\`\`\`env
# Base de données
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=boltpharma

# JWT pour l'authentification
JWT_SECRET=votre_secret_jwt

# Email (pour les notifications)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=noreply@boltpharma.com
SMTP_PASSWORD=votre_mot_de_passe_email

# Paiements mobiles
MTN_API_KEY=votre_cle_mtn
MOOV_API_KEY=votre_cle_moov
CELTIS_API_KEY=votre_cle_celtis

# GoZem API
GOZEM_API_KEY=votre_cle_gozem
GOZEM_API_URL=https://api.gozem.co

# URL de l'application
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

## Installation

1. Cloner le projet
2. Installer les dépendances : `npm install`
3. Configurer les variables d'environnement
4. Exécuter les scripts SQL dans l'ordre :
   - `01-create-database-schema.sql`
   - `02-seed-initial-data.sql`
5. Lancer le serveur : `npm run dev`

## Technologies Utilisées

- **Frontend** : Next.js 15, React, TypeScript, Tailwind CSS
- **Backend** : Next.js API Routes, Server Actions
- **Base de données** : MySQL
- **Authentification** : JWT, bcrypt
- **Paiements** : Intégration MTN Mobile Money, MOOV Money, CELTIS
- **Livraison** : API GoZem

## Prochaines Étapes

1. ✅ Création de la base de données et des schémas
2. 🔄 Construction de la page d'accueil et du catalogue
3. ⏳ Implémentation de l'authentification
4. ⏳ Tableau de bord des pharmacies
5. ⏳ Système de panier et commandes
6. ⏳ Intégration des paiements mobiles
7. ⏳ Tableau de bord client et suivi

## Contact

Pour toute question ou support, contactez : support@boltpharma.com
