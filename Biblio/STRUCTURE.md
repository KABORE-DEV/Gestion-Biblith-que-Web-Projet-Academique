# Structure de la Bibliothèque Libris

La bibliothèque a été réorganisée avec une structure de dossiers claire et logique.

## 🗂️ Structure des Dossiers

```
Biblio/
├── index.html                    # Page d'accueil (redirection)
├── accueil/                      # Pages d'accueil
│   ├── index.html
│   └── style.css
├── catalogue/                    # Catalogue principal
│   ├── index.html
│   └── style.css
├── nouveaute/                    # Page des nouveautés
│   ├── index.html
│   └── style.css
├── livres/                       # Toutes les catégories de livres
│   ├── histoire/
│   │   ├── index.html
│   │   └── style.css
│   ├── bande-dessine/
│   │   ├── index.html
│   │   └── style.css
│   ├── informatique/
│   │   ├── index.html
│   │   └── style.css
│   ├── art-culture/
│   │   ├── index.html
│   │   └── style.css
│   ├── politique/
│   │   ├── index.html
│   │   └── style.css
│   ├── sciences/
│   │   ├── index.html
│   │   └── style.css
│   └── strategie/
│       ├── index.html
│       └── style.css
├── compte/                       # Pages d'authentification
│   ├── connexion/
│   │   ├── index.html
│   │   └── style.css
│   └── inscription/
│       ├── index.html
│       └── style.css
└── assets/                       # Ressources statiques
    └── images/                   # Toutes les images
        ├── couple-student-with-reading-book-hands.png
        ├── ALGO.jpg
        ├── s1.jpg
        └── ... (tous les fichiers images)
```

## 📱 Navigation

- **Page d'accueil** : `./accueil/` ou `./`
- **Catalogue** : `./catalogue/`
- **Nouveautés** : `./nouveaute/`
- **Livres par catégorie** : `./livres/[categorie]/` (histoire, bande-dessine, etc.)
- **Connexion** : `./compte/connexion/`
- **Inscription** : `./compte/inscription/`

## ✨ Changements Effectués

### Chemins Mis à Jour

- ✅ Tous les fichiers HTML renommés en `index.html` pour un accès direct au dossier
- ✅ Tous les fichiers CSS renommés en `style.css` pour cohérence
- ✅ Tous les chemins internes mises à jour (liens de navigation)
- ✅ Toutes les références d'images mises à jour vers `assets/images/`

### Exemples de Chemins

**Avant** :

```html
<link rel="stylesheet" href="/Css/Accueil.css" />
<a href="Catalogue.html">Catalogue</a>
<img src="couple-student-with-reading-book-hands.png" />
```

**Après** :

```html
<link rel="stylesheet" href="style.css" />
<a href="../catalogue/">Catalogue</a>
<img src="../assets/images/couple-student-with-reading-book-hands.png" />
```

## 📝 Notes

- Les fichiers CSS conservent leur contenu original, seul le nom de fichier et le chemin ont changé
- Les images sont maintenant centralisées dans `assets/images/` pour une meilleure organisation
- Un fichier `index.html` à la racine redirige automatiquement vers la page d'accueil
- Les chemins JavaScript qui référencent `/javascript/` doivent être mis à jour ou les fichiers JavaScript doivent être ajoutés

## 🔧 Structure Logique

La nouvelle organisation suit une logique fonctionnelle :

- **accueil/** : Point d'entrée principal
- **catalogue/** : Hub de navigation vers les catégories
- **livres/** : Organisation par catégories métier
- **compte/** : Gestion utilisateur (connexion, inscription)
- **assets/** : Ressources statiques partagées
