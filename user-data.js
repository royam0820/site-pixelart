/* ==========================================================================
   📓 USER-DATA.JS — LE CARNET PERSONNEL DU HÉROS (DONNÉES DU JOUEUR)
   Rôle pédagogique : Ce fichier contient uniquement les textes et chiffres
   personnels (pseudo, stats RPG, passions, 5 faits fun, 3 projets et records).
   On peut tout modifier ici sans jamais risquer de casser le moteur du jeu !
   ========================================================================== */

const USER_DATA = {
  pseudo: "MAXENCE",

  // ⚡ Statistiques RPG (Niveau 1 : Qui suis-je ?)
  stats: [
    { nom: "Créativité & Idées", valeur: 98, couleur: "#00f5d4" },
    { nom: "Vibe Coding & IA", valeur: 92, couleur: "#9b5de5" },
    { nom: "Humour & Réparties", valeur: 96, couleur: "#fee440" },
    { nom: "Esprit d'Équipe & Sport", valeur: 94, couleur: "#38ef7d" }
  ],

  // 🎮 Passions & Sports
  hobbies: [
    "🎮 Jeux Vidéo Rétro & Sandbox",
    "⚽ Sport & Défis entre potes",
    "🤖 Création avec l'IA",
    "🎨 Pixel Art & Constructions",
    "🍕 Dégustation de Pizzas"
  ],

  // 🕵️ Les 5 faits fun (dont 1 totalement absurde : estAbsurde: true)
  faitsFun: [
    {
      texte: "Je peux construire une base secrète complète dans mon jeu préféré en un seul après-midi.",
      estAbsurde: false
    },
    {
      texte: "J'ai créé ce site web d'aventure tout seul en apprenant à parler à une intelligence artificielle !",
      estAbsurde: false
    },
    {
      texte: "Je connais par cœur le fameux code secret Konami des jeux d'arcade des années 80.",
      estAbsurde: false
    },
    {
      texte: "J'ai apprivoisé un vélociraptor fluorescent qui fait mes devoirs de maths en mangeant des brocolis.",
      estAbsurde: true
    },
    {
      texte: "Je déteste perdre à un mini-jeu avant d'avoir battu le meilleur score de la maison !",
      estAbsurde: false
    }
  ],

  // 🏰 Les 3 Projets (présentés comme des Boss à débloquer dans le Niveau 2)
  projets: [
    {
      id: "proj1",
      nomBoss: "BOSS 1 : MÉCHA-PIXEL",
      iconeBoss: "🤖",
      titreProjet: "Mon Monde PixelQuest",
      badgeTech: "HTML • CSS • JS • Vibe Coding",
      description: "Ce site web interactif façon jeu vidéo rétro dont je suis le héros ! Avec carte du monde, compteur d'XP et easter eggs cachés.",
      defi: "Attaque 3 fois son bouclier magnétique pour découvrir le projet !"
    },
    {
      id: "proj2",
      nomBoss: "BOSS 2 : DRAGON DU CODE",
      iconeBoss: "🐉",
      titreProjet: "La Forteresse Légendaire",
      badgeTech: "Création 3D / Blocs & Redstone",
      description: "Une immense cité-citadelle construite bloc par bloc avec passages secrets, pièges automatiques et salle du trône illuminée.",
      defi: "Assène 3 coups d'épée pixel pour briser les écailles du Dragon !"
    },
    {
      id: "proj3",
      nomBoss: "BOSS 3 : CYBER-KRAKEN",
      iconeBoss: "🦑",
      titreProjet: "Le Défi BD & Bande-Annonce",
      badgeTech: "Scénario • Dessin • Humour",
      description: "Une histoire originale pleine de rebondissements créée pour faire rire les copains et impressionner toute la classe.",
      defi: "Clique 3 fois pour neutraliser ses tentacules néon !"
    }
  ],

  // 🏅 Les High Scores de la vraie vie (Niveau 3)
  highScores: [
    { categorie: "⚡ Vitesse de création du site", record: "1 Soirée Chrono", rang: "RANG S+" },
    { categorie: "🍕 Parts de pizza en soirée film", record: "6 Parts Légendaires", rang: "RECORD" },
    { categorie: "🎮 Série de victoires entre amis", record: "12 Parties d'affilée", rang: "IMBATTABLE" },
    { categorie: "🏃 Endurance & Énergie au sport", record: "Batterie à 200%", rang: "MAX LEVEL" }
  ]
};

// Alias pour compatibilité si le code fait référence à MAXENCE_DATA
const MAXENCE_DATA = USER_DATA;
