# Guide de Connexion - BoltPharma

## 🔐 Comptes de Démonstration

### Compte Client
Pour tester les fonctionnalités d'achat de médicaments :

- **Email** : `client.demo@boltpharma.com`
- **Mot de passe** : `password123`

**Fonctionnalités disponibles :**
- Rechercher et acheter des médicaments
- Ajouter au panier
- Passer des commandes
- Payer avec MTN, MOOV ou CELTIS
- Suivre les livraisons GoZem
- Gérer son profil et favoris
- Consulter l'historique des commandes

### Compte Pharmacie
Pour tester les fonctionnalités de gestion de pharmacie :

- **Email** : `pharmacie.demo@boltpharma.com`
- **Mot de passe** : `password123`

**Fonctionnalités disponibles :**
- Gérer le catalogue de médicaments
- Ajouter/modifier/supprimer des produits
- Recevoir et valider les commandes
- Voir les statistiques de vente
- Gérer les stocks
- Suivre les livraisons

## 📱 Comment se connecter

### Étape 1 : Accéder à la page de connexion
Visitez : [https://votre-domaine.com/connexion](https://votre-domaine.com/connexion)

### Étape 2 : Choisir le type de compte
- Cliquez sur l'onglet **"Client"** pour un compte client
- Cliquez sur l'onglet **"Pharmacie"** pour un compte pharmacie

### Étape 3 : Entrer les identifiants
- Entrez l'email du compte de test
- Entrez le mot de passe : `password123`
- Cliquez sur **"Se connecter"**

### Étape 4 : Accéder au tableau de bord
Vous serez automatiquement redirigé vers :
- **Clients** : `/tableau-de-bord`
- **Pharmacies** : `/pharmacie/tableau-de-bord`

## 🆕 Créer un nouveau compte

### Pour les Clients
1. Allez sur [/inscription](https://votre-domaine.com/inscription)
2. Sélectionnez l'onglet **"Client"**
3. Remplissez le formulaire :
   - Prénom et nom
   - Email
   - Téléphone
   - Mot de passe (min. 8 caractères)
   - Adresse
4. Cliquez sur **"S'inscrire"**

### Pour les Pharmacies
1. Allez sur [/inscription](https://votre-domaine.com/inscription)
2. Sélectionnez l'onglet **"Pharmacie"**
3. Remplissez le formulaire :
   - Nom de la pharmacie
   - Numéro de licence
   - Email professionnel
   - Téléphone
   - Mot de passe
   - Adresse complète
   - Horaires d'ouverture
4. Cliquez sur **"S'inscrire"**

## 🔄 Mot de passe oublié

1. Allez sur [/mot-de-passe-oublie](https://votre-domaine.com/mot-de-passe-oublie)
2. Choisissez le type de compte (Client ou Pharmacie)
3. Entrez votre email
4. Cliquez sur **"Envoyer le lien"**
5. Consultez votre email pour le lien de réinitialisation
6. Cliquez sur le lien et définissez un nouveau mot de passe

## 🛒 Parcours Client

1. **Connexion** → `/connexion`
2. **Rechercher des médicaments** → `/catalogue`
3. **Ajouter au panier** → Cliquez sur "Ajouter au panier"
4. **Voir le panier** → `/panier`
5. **Passer commande** → `/commander`
6. **Payer** → `/paiement/[orderId]`
7. **Suivre la commande** → `/commande/[orderId]`

## 🏪 Parcours Pharmacie

1. **Connexion** → `/connexion`
2. **Tableau de bord** → `/pharmacie/tableau-de-bord`
3. **Gérer les produits** → `/pharmacie/produits`
4. **Voir les commandes** → `/pharmacie/commandes`
5. **Valider une commande** → Cliquez sur "Valider"
6. **Voir les statistiques** → Tableau de bord

## 💳 Méthodes de Paiement

BoltPharma accepte les paiements mobiles suivants :

- **MTN Money** : Pour les clients MTN Bénin
- **MOOV Money** : Pour les clients MOOV Africa
- **CELTIS Cash** : Pour les clients CELTIS

## 🚚 Livraison

La livraison est assurée par **GoZem** :
- Livraison express en 30 minutes à Cotonou
- Suivi en temps réel
- Notification SMS et email
- Livraison 7j/7

## 📞 Support

Besoin d'aide ? Contactez-nous :
- **Page de contact** : [/contact](https://votre-domaine.com/contact)
- **FAQ** : [/faq](https://votre-domaine.com/faq)
- **Chatbot** : Disponible sur toutes les pages (icône en bas à droite)
- **Email** : support@boltpharma.com
- **Téléphone** : +229 XX XX XX XX

## 🔒 Sécurité

- Tous les mots de passe sont cryptés avec bcrypt
- Connexion sécurisée avec JWT
- Protection HTTPS
- Données personnelles protégées
- Paiements sécurisés

## 📱 Application Mobile

BoltPharma est optimisé pour mobile et accessible depuis n'importe quel navigateur.

---

**Bon shopping sur BoltPharma ! 💊🚀**
