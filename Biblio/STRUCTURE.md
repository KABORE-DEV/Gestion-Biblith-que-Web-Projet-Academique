# Structure de la Bibliothèque Libris

Site vitrine d'une bibliothèque, 100 % HTML / CSS / JavaScript (aucun backend).
La page d'accueil est directement à la racine : ouvrir `Biblio/` affiche le site.

## 🗂️ Structure des Dossiers

```
Biblio/
├── index.html                    # Page d'accueil (landing moderne)
├── catalogue/                    # Catalogue des catégories (avec recherche)
│   └── index.html
├── nouveaute/                    # Événements + dernières acquisitions
│   └── index.html
├── recherche/                    # Recherche globale dans tout le catalogue
│   └── index.html
├── livres/                       # Pages de livres par catégorie (squelettes)
│   ├── histoire/index.html
│   ├── bande-dessine/index.html
│   ├── informatique/index.html
│   ├── art-culture/index.html
│   ├── politique/index.html
│   ├── sciences/index.html
│   └── strategie/index.html
├── compte/                       # Authentification + réservations
│   ├── connexion/index.html
│   ├── inscription/index.html
│   └── reservations/index.html   # « Mes réservations » (espace membre)
└── assets/                       # Ressources partagées
    ├── css/
    │   └── style.css             # Design system unique (toutes les pages)
    ├── js/
    │   ├── navbar.js             # Barre d'annonce + navbar (recherche) + footer
    │   ├── data.js               # ⭐ Source unique des données (catégories, livres, nouveautés)
    │   ├── categories.js         # Cartes de catégories (home + catalogue)
    │   ├── category.js           # Rendu des pages livres/* depuis data.js
    │   ├── newbooks.js           # Acquisitions de la page nouveautés
    │   ├── search-global.js      # Recherche globale (recherche/)
    │   ├── reservations.js       # Page « Mes réservations »
    │   ├── reservation.js        # Modale de réservation
    │   ├── auth.js               # Inscription / connexion (localStorage)
    │   └── search.js             # Recherche en temps réel du catalogue
    └── images/                   # Images (uniquement celles utilisées)
```

## 📦 Données centralisées (`assets/js/data.js`)

Le contenu du site (catégories, livres, nouveautés) est entièrement défini dans
`data.js`, sous trois objets globaux :

- `LIBRIS_CATEGORIES` — les 7 catégories (titre, description, image, tag, bannière).
- `LIBRIS_BOOKS` — les 46 livres, indexés par catégorie
  (`{ t: titre, a: auteur, d: description, c: couverture }`).
- `LIBRIS_NEWBOOKS` — les acquisitions récentes de la page Nouveautés.

Les pages livres, les cartes de catégories, la recherche et les réservations
lisent ces données. **Pour ajouter un livre, il suffit d'éditer `data.js`** —
pensé pour être remplacé par un appel API : même forme de données.

## 🎨 Design system

Une seule feuille de style centrale (`assets/css/style.css`) définit l'identité
visuelle complète du site — **minimaliste et typographique** :

- **Palette** : papier chaud (`#F4F3EE`), encre noire (`#1B1B18`),
  un seul accent rouge brûlé (`#C64B2B`), filets fins (`#E4E1D7`)
- **Typographie** : Space Grotesk (titres, gros display) + Inter (texte)
- **Principes** : coins francs (zéro arrondi), zéro ombre, filets hairlines
  comme structure, micro-labels en majuscules espacées avec tiret accent,
  hiérarchie par la typographie et l'espace plutôt que par la couleur

**Disposition des éléments :**
- **Navbar masthead** sur 2 lignes : logo + horaires + compte (ligne haute),
  navigation + recherche (ligne basse, filet de séparation)
- **Accueil** : hero centré typographique → bande image pleine largeur →
  **index numéroté** des 7 catégories (01–07) sous forme de liste à filets
- **Catalogue** : cartes de catégories **horizontales** (couverture à gauche)
- **Pages livres** : **colonne latérale sticky** (titre, description, compteur)
  + grille des livres à droite ; empilée en mobile
- **Nouveautés** : événements en **liste de planning** (date en bloc encre,
  titre, détails, bouton) ; acquisitions en grille
- **Composants** : boutons rectangulaires, modale, formulaires (inputs
  soulignés), footer clair, recherche, réservations, états vides, responsive

Chaque page ne charge que `assets/css/style.css` et n'a plus de CSS dédié.

## 🧩 Composants partagés (JavaScript)

### Navbar + footer (`navbar.js`)
- Injecte : barre d'annonce (horaires), menu (Accueil / Catalogue / Nouveautés),
  **champ de recherche global**, zone compte et footer avec navigation et horaires.
- Chaque page indique sa position sur `<body>` :
  - `data-page="accueil | catalogue | nouveaute | recherche | connexion | inscription | reservations"`
  - `data-depth="0"` (accueil à la racine), `"1"` (catalogue, nouveaute,
    recherche), `"2"` (livres/*, compte/*) → calcule les chemins relatifs
    automatiquement
- Utilisateur connecté → « Bienvenue, [prénom] » + **Mes réservations** + Déconnexion.

### Pages catégories (`category.js` + `data.js`)
- Chaque `livres/*/index.html` est un squelette : `<body data-category="...">`
  + un `<div id="app">`. `category.js` génère breadcrumb, bannière, compteur,
  grille de livres et modale de réservation.

### Réservation (`reservation.js`)
- `openModal(title, author)`, `closeModal()`, `confirmReservation()`.
- Sauvegarde les réservations dans `localStorage` (clé `libris_reservations`),
  associées au compte connecté via l'email.

### Mes réservations (`reservations.js`)
- Liste les réservations du compte (email de session), avec couverture et
  catégorie du livre, référence, date de retrait et durée.
- Permet d'annuler une réservation.

### Recherche (`search-global.js` + `recherche/`)
- Recherche par titre, auteur ou catégorie sur l'ensemble du catalogue.
- Barre de recherche dans la navbar → redirige vers `recherche/?q=…`.

### Authentification (`auth.js`)
- Inscription : comptes stockés dans `localStorage` (clé `libris_users`).
- Connexion : vérifie email + mot de passe, crée la session (clé `libris_user`).
- Redirection vers la home (`../`) après succès.
- ⚠️ Données locales au navigateur — prêt à être remplacé par un vrai backend.

### Recherche catalogue (`search.js`)
- Filtre les cartes de catégories (`#categoryGrid`) en temps réel.

## ✅ État du projet

- Design entièrement refait (éditorial moderne, responsive).
- Contenu 100 % piloté par `data.js` (une seule source de vérité).
- Anciens fichiers supprimés : dossier `accueil/`, CSS par page, images non
  référencées.
- Pages ajoutées : recherche globale, mes réservations, favicon.
- Toutes les références locales valides, aucun fichier JS en erreur.
- Fonctions testées dans un navigateur : réservation, authentification,
  recherche, annulation de réservation.

## 🔮 Prochaines étapes (backend + base de données)

Ce front-end est prêt pour l'ajout d'un backend :
- Remplacer `localStorage` (`libris_users`, `libris_user`, `libris_reservations`)
  par des appels API (POST `/login`, `/register`, `/reservations`).
- Remplacer `data.js` par un fetch vers `GET /api/books` et `GET /api/categories`
  (les objets ont exactement la même forme).
- Les formulaires (connexion, inscription, réservation) se branchent sur des
  endpoints sans changer le HTML.
