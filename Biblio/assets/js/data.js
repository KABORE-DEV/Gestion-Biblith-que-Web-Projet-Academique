/* data.js — source unique de vérité du catalogue
 * Catégories, livres et nouveautés. Pensé pour être remplacé
 * par un appel API (backend) : même forme de données.
 */

var LIBRIS_CATEGORIES = {
  histoire: {
    key: "histoire",
    tag: "Histoire",
    title: "Histoire Africaine",
    bannerTitle: "Histoire <em>Africaine</em>",
    sub: "Empires, rois et civilisations du continent.",
    desc: "Plongez au cœur des grandes civilisations africaines : empires, rois, récits fondateurs et luttes pour la liberté. Une collection qui rend hommage à la mémoire et à la richesse du continent.",
    image: "empire_ghana.jpg",
    booksCount: 6
  },
  "bande-dessine": {
    key: "bande-dessine",
    tag: "BD & Manga",
    title: "Bande dessinée",
    bannerTitle: "Bandes <em>Dessinées</em>",
    sub: "BD, mangas et romans graphiques.",
    desc: "Plongez dans l'univers fascinant des bandes dessinées et mangas : aventures, épopées et histoires cultes qui ont marqué des générations de lecteurs.",
    image: "BANNIERE.jpg",
    booksCount: 6
  },
  "art-culture": {
    key: "art-culture",
    tag: "Art & Culture",
    title: "Art & Culture",
    bannerTitle: "Art & <em>Culture</em>",
    sub: "Beaux-arts, histoire et philosophie.",
    desc: "Musique, traditions et expressions artistiques. Une sélection d'essais et d'ouvrages qui explorent la création, la société et l'esthétique sous tous leurs angles.",
    image: "Spectacle.jpg",
    booksCount: 6
  },
  sciences: {
    key: "sciences",
    tag: "Sciences",
    title: "Sciences",
    bannerTitle: "Les <em>Sciences</em>",
    sub: "Curiosité, mathématiques et nature.",
    desc: "Innovations, recherches et découvertes scientifiques : des ouvrages accessibles et rigoureux pour satisfaire toutes les curiosités.",
    image: "Flammarien.jpg",
    booksCount: 6
  },
  strategie: {
    key: "strategie",
    tag: "Stratégie",
    title: "Stratégie",
    bannerTitle: "Stratégie et <em>Pouvoir</em>",
    sub: "Pensée stratégique et art du pouvoir.",
    desc: "Explorez les grandes œuvres sur la vie en société et les mécanismes du pouvoir : tactique, influence, négociation et leadership.",
    image: "les 48 lois du pouvoir.jpg",
    booksCount: 10
  },
  politique: {
    key: "politique",
    tag: "Société",
    title: "Politique & Société",
    bannerTitle: "Politique & <em>Société</em>",
    sub: "Société, gouvernance et idées politiques.",
    desc: "Gouvernance, droits et mouvements sociaux. Comprendre le monde et les idées qui le façonnent à travers des essais engagés et documentés.",
    image: "Démocratiejpg.jpg",
    booksCount: 6
  },
  informatique: {
    key: "informatique",
    tag: "Informatique",
    title: "Informatique",
    bannerTitle: "Informatique & <em>Réseaux</em>",
    sub: "Programmation, réseaux et sécurité.",
    desc: "Programmation, réseaux, cybersécurité et intelligence artificielle : les références indispensables pour les développeurs et curieux du numérique.",
    image: "informatique.jpg",
    booksCount: 6
  }
};

var LIBRIS_BOOKS = {
  histoire: [
    { t: "L'Afrique avant la colonisation", a: "Cheikh Anta Diop", d: "Une œuvre magistrale qui revisite l'histoire du continent africain et de ses grandes civilisations, avant les bouleversements de la colonisation.", c: "images (5).jpg" },
    { t: "Soundjata ou l'épopée mandingue", a: "Djibril Tamsir Niane", d: "Le récit légendaire de Soundjata Keïta, fondateur de l'empire du Mali, transmis par la tradition orale des griots.", c: "images (1).jpg" },
    { t: "Le Devoir de violence", a: "Yambo Ouologuem", d: "Un roman majeur de la littérature africaine, fresque violente et poétique sur trois dynasties d'un empire imaginaire.", c: "le-devoir-de-violence-88202.jpg" },
    { t: "Afrique noire : histoire et civilisations", a: "Joseph Ki-Zerbo", d: "L'œuvre de référence de l'historien burkinabè Joseph Ki-Zerbo pour comprendre le passé du continent africain.", c: "histoire_afriquenoir.jpg" },
    { t: "L'Empire du Ghana", a: "Lansiné Kaba", d: "Une plongée dans l'histoire de l'empire du Ghana, première grande puissance commerciale de l'Afrique de l'Ouest.", c: "empire_ghana.jpg" },
    { t: "La Traite des Noirs", a: "Olivier Pétré-Grenouilleau", d: "Une analyse historique et documentée de la traite négrière, l'un des drames majeurs de l'histoire mondiale.", c: "images (4).jpg" }
  ],
  "bande-dessine": [
    { t: "Tintin — L'Île Noire", a: "Hergé", d: "Le célèbre reporter Tintin enquête sur une bande de faux-monnayeurs jusqu'en Écosse, au cœur de l'île Noire.", c: "L'Île Noire — Tintin_com.jpeg" },
    { t: "The Dark Knight Returns", a: "Frank Miller", d: "Un classique absolu de la bande dessinée : Bruce Wayne sort de sa retraite dans un Gotham en pleine crise.", c: "The Dark Knight Returns .jpeg" },
    { t: "Naruto", a: "Masashi Kishimoto", d: "Les aventures du ninja le plus déterminé de Konoha, dans l'un des mangas les plus populaires au monde.", c: "Naruto.jpeg" },
    { t: "One Piece", a: "Eiichiro Oda", d: "Luffy et son équipage partent à la recherche du trésor légendaire One Piece, dans un monde de pirates.", c: "One Piece.jpeg" },
    { t: "Death Note", a: "Tsugumi Ohba & Takeshi Obata", d: "Un lycéen trouve un carnet qui tue quiconque y voit son nom écrit. Une course-poursuite intellectuelle haletante.", c: "Death Note.jpeg" },
    { t: "La jeunesse de Picsou", a: "Carl Barks", d: "L'histoire émouvante du plus riche canard du monde, de sa jeunesse modeste à son premier sou.", c: "Picsou.jpeg" }
  ],
  "art-culture": [
    { t: "Critique Et Essai", a: "Clement Greenberg", d: "Textes fondateurs de la critique d'art moderne par l'un de ses penseurs les plus influents du XXe siècle.", c: "Clement.jpg" },
    { t: "Le Petit Livre Des Couleurs", a: "Michel Pastoureau", d: "Une promenade érudite et savoureuse à travers l'histoire et les symboles des couleurs.", c: "Michel.jpg" },
    { t: "L'Art Du Livre", a: "André Suarès", d: "Un éloge passionné du livre comme objet et comme art, par un grand écrivain et critique du début du XXe siècle.", c: "André.jpg" },
    { t: "Un Art Écologique", a: "", d: "Création plasticienne et anthropocène : quand l'art contemporain se confronte aux questions environnementales.", c: "Paul.jpeg" },
    { t: "Tout Sur L'art", a: "Flammarion", d: "Une encyclopédie visuelle de l'histoire de l'art, de la préhistoire à l'art contemporain, pour les curieux.", c: "Flammarien.jpg" },
    { t: "On N'y Voir Rien", a: "Daniel Arasse", d: "Le grand historien de l'art démonte avec humour et érudition nos regards sur les tableaux célèbres.", c: "Daniel.jpg" }
  ],
  sciences: [
    { t: "La boite à curiosités", a: "Marie Treibert", d: "Une exploration ludique des phénomènes scientifiques du quotidien, à découvrir en s'amusant.", c: "s1.jpg" },
    { t: "La science et l'hypothèse", a: "Henri Poincaré", d: "Le grand mathématicien interroge la nature des sciences et la valeur des hypothèses dans la connaissance.", c: "s2.jpeg" },
    { t: "Le Grand Bordel de l'Évolution", a: "Léo Grasset", d: "Une vulgarisation joyeuse et décomplexée des mécanismes parfois déroutants de l'évolution.", c: "s3.jpeg" },
    { t: "La physique en applications", a: "Roland Lehoucq", d: "De la science-fiction à la physique réelle : les concepts de la physique expliqués par des exemples concrets.", c: "s4.jpeg" },
    { t: "Abrégé d'histoire des mathématiques", a: "Jean Dieudonné", d: "Une synthèse claire de l'évolution des mathématiques, de l'Antiquité à nos jours, par les plus grands spécialistes.", c: "S6.jpeg" },
    { t: "Minéraux, roches et fossiles", a: "Bishop, Hamilton, Wooley", d: "Un guide pratique pour reconnaître et comprendre les trésors minéralogiques de la Terre.", c: "s6.jpg" }
  ],
  strategie: [
    { t: "Les 48 lois du pouvoir", a: "Robert Greene", d: "Le best-seller sulfureux qui décrypte les mécanismes du pouvoir à travers 48 lois illustrées par l'histoire.", c: "les 48 lois du pouvoir.jpg" },
    { t: "Le Prince", a: "Nicolas Machiavel", d: "Le traité politique fondateur de la pensée moderne sur l'exercice du pouvoir et l'art de gouverner.", c: "le prince.jpg" },
    { t: "L'art de la Guerre", a: "Sun Tzu", d: "Le classique intemporel de la stratégie militaire, toujours aussi pertinent pour les défis d'aujourd'hui.", c: "art of war.webp" },
    { t: "L'art de la Séduction", a: "Robert Greene", d: "Une analyse brillante des formes de la séduction, de la stratégie à la psychologie, à travers l'histoire.", c: "art of seduction.jpg" },
    { t: "Les Lois de la Nature Humaine", a: "Robert Greene", d: "Un décryptage des forces invisibles qui guident nos comportements et nos décisions.", c: "les lois de la nature humaine.jpg" },
    { t: "Influence et Manipulation", a: "Robert Cialdini", d: "Le livre de référence sur les mécanismes psychologiques de l'influence et de la persuasion.", c: "influence et manipulation.jpg" },
    { t: "Les 33 Stratégies de la Guerre", a: "Robert Greene", d: "Trente-trois stratégies issues de l'histoire militaire, transposées aux conflits modernes de la vie quotidienne.", c: "les 33 stratégies de la guerre.jpg" },
    { t: "Good Strategy / Bad Strategy", a: "Richard Rumelt", d: "Ce qui fait la force d'une bonne stratégie et pourquoi tant de stratégies échouent, par un grand théoricien.", c: "good or bad strategy.jpg" },
    { t: "Power", a: "Bertrand Russell", d: "Une réflexion philosophique profonde sur la nature du pouvoir et son rôle dans les sociétés humaines.", c: "power.jpg" },
    { t: "The 50th Law", a: "Robert Greene & 50 Cent", d: "La 50e loi : le courage et la peur, vus à travers le prisme de la réussite du rappeur 50 Cent.", c: "la 50e loi.jpg" }
  ],
  politique: [
    { t: "Sois Jeune Et Tais-Toi", a: "Salomé Saqué", d: "Une enquête incarnée sur la précarité, la colère et les espoirs de la jeunesse française d'aujourd'hui.", c: "salome-saquet.jpg" },
    { t: "Le Prince", a: "Nicolas Machiavel", d: "Le grand classique de la pensée politique, guide intemporel de l'exercice du pouvoir.", c: "prince.jpg" },
    { t: "La Construction Sociale De La Réalité", a: "Peter Berger & Thomas Luckmann", d: "Un essai majeur de sociologie sur la manière dont la réalité sociale est construite et perçue.", c: "La_Construction_sociale_de_la_realite_cover_2103a1d783.jpg" },
    { t: "Les Démocraties à l'épreuve", a: "Gérard Grunberg, Nonna Mayer, Paul M. Sniderman", d: "Une analyse comparative des défis et des fragilités des démocraties contemporaines.", c: "Démocratiejpg.jpg" },
    { t: "La Société Du Spectacle", a: "Guy Debord", d: "Le manifeste situationniste qui dénonce la marchandisation de la vie sociale et de l'information.", c: "Spectacle.jpg" },
    { t: "La Civilisation Des Mœurs", a: "Norbert Elias", d: "Comment les comportements et la sensibilité se sont transformés au fil des siècles dans la société occidentale.", c: "La_Civilisation_des_moeurs_cover_fb8e59ace2.jpg" }
  ],
  informatique: [
    { t: "Les Innovateurs", a: "Walter Isaacson", d: "L'histoire passionnante des génies et visionnaires qui ont inventé l'ère numérique, de Ada Lovelace à Steve Jobs.", c: "les innovateurs.jpeg" },
    { t: "Sécurité Informatique", a: "Franck Ebel", d: "Les fondamentaux de la cybersécurité : menaces, bonnes pratiques et outils pour protéger vos systèmes.", c: "ciber1.jpg" },
    { t: "Coder Proprement", a: "Robert C. Martin", d: "Le guide de référence pour écrire un code clair, maintenable et professionnel, par « Oncle Bob ».", c: "coder_Proprement.jpg" },
    { t: "Algorithmes", a: "Thomas H. Cormen", d: "L'ouvrage de référence sur la conception et l'analyse des algorithmes, indispensable à tout informaticien.", c: "ALGO.jpg" },
    { t: "Computer Science Distilled", a: "Wladston Ferreira Filho", d: "Les idées essentielles de l'informatique expliquées simplement, de la programmation aux structures de données.", c: "ALGO2.jpg" },
    { t: "Réseaux Informatiques", a: "José Dordoigne", d: "Le guide complet pour comprendre, installer et administrer les réseaux informatiques modernes.", c: "reseaux.jpg" }
  ]
};

var LIBRIS_NEWBOOKS = [
  { t: "Le Parachutage", a: "Norbert Zongo", tag: "Littérature", d: "Un roman captivant qui mêle humour et critique sociale dans le Burkina Faso post-colonial.", c: "" },
  { t: "La Poésie des Saisons", a: "Titinga Frédéric Pacéré", tag: "Poésie", d: "Une poésie qui chante les saisons et la terre, par le grand poète burkinabè Pacéré.", c: "" },
  { t: "Crépuscule des Temps Anciens", a: "Nazi Boni", tag: "Roman", d: "Le roman précurseur de Nazi Boni, fresque épique des royaumes bwa avant la colonisation.", c: "" },
  { t: "Légendes du Burkina", a: "Roger Nikiema", tag: "Conte", d: "Les contes et légendes du Burkina Faso réunis pour transmettre la sagesse des anciens.", c: "" },
  { t: "One Piece — Tome 105", a: "Eiichiro Oda", tag: "Manga", d: "Le dernier volume des aventures de Luffy et de son équipage au cœur du nouvel arc.", c: "" },
  { t: "Le Petit Griot du Faso", a: "Bernadette Dao", tag: "Jeunesse", d: "Un joli conte jeunesse qui célèbre l'art du griot et la culture burkinabè.", c: "" }
];
