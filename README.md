# 🕹️ PIXELQUEST — La Légende de Maxence

Bienvenue sur le dépôt officiel de **PIXELQUEST**, un site web interactif conçu comme un **jeu vidéo d'arcade rétro en pixel-art** dont **Maxence** est le héros !

🌐 **Jouer en ligne (GitHub Pages)** : **[https://royam0820.github.io/site-pixelart/](https://royam0820.github.io/site-pixelart/)**

---

## ✨ Aperçu de l'aventure

Plutôt qu'une page web classique, chaque section du site est un **niveau** accessible depuis une **carte du monde interactive** :

1. **🕹️ Écran Titre Borne d'Arcade** : Logo néon clignotant, avatar pixel-art de Maxence et bouton `INSERT COIN / START` avec effets sonores 8-bit générés en direct.
2. **🌋 Niveau 1 — Qui suis-je ?** : Fiche de statistiques RPG de Maxence, ses passions et le **défi des 5 faits fun** (trouve l'intrus totalement absurde pour gagner de l'XP !).
3. **🏰 Niveau 2 — Le Donjon des Projets** : Chaque projet de Maxence est gardé par un **Boss Pixel** avec une barre de vie. Attaque 3 fois son bouclier pour débloquer le projet !
4. **👾 Niveau 3 — High Scores & Salle d'Arcade** : Les records IRL de Maxence, une vitrine de **6 badges à débloquer**, et un **vrai mini-jeu jouable** (*Maxence Astro-Dodge*) pour tenter de battre son record !
5. **📬 Niveau 4 — Boss Final : Contact & Trésor Caché** : Envoie un parchemin codé au Gardien du Courrier et fouille le donjon pour trouver le **Coffre au Trésor secret**.

---

## 🎁 Secrets & Easter Eggs à découvrir

- **🕺 Danse Pixel** : Clique **5 fois** sur l'avatar de Maxence (sur l'écran d'accueil, la carte ou la barre du haut).
- **🌈 Code Konami** : Tape `↑ ↑ ↓ ↓ ← → ← → B A` au clavier pour déclencher le **Mode Rainbow** pendant 10 secondes !
- **☀️ / 🌙 Cycle Jour / Nuit** : Change l'ambiance visuelle du monde à tout moment depuis le menu supérieur.
- **🗡️ / 🚀 Équipement Curseur** : Bascule entre le curseur Épée Pixel et la Fusée Rétro.
- **💎 Coffre Mystère** : Un trésor royal est caché dans la salle du Boss Final.

---

## 📁 Structure du projet

Conformément à la philosophie **Vibe Coding** décrite dans le PRD, toute l'application tient dans **un seul fichier autonome** (`index.html`) sans aucune dépendance externe ni serveur requis :

```text
.
├── index.html                           # Site complet (HTML5 + CSS3 + Synthé 8-bit JS + Mini-jeu Canvas)
├── PRD.md                               # Product Requirements Document complet du projet
├── README.md                            # Documentation et guide de personnalisation
├── PROGRESS.md                          # État d'avancement, bugs connus et prochaines tâches (Roadmap)
├── DEVLOG.md                            # Cahier de bord Vibe Coding + explication technique des Badges & XP
├── ARCHITECTURE-JEU-ARCADE.md           # Construction d'un jeu d'arcade rétro et parallèle avec PIXELQUEST
├── SECRETS-ET-CULTURE-RETRO.md          # Histoire du Code Konami, des Easter Eggs et de la culture 8-bit
└── Instructions/
    └── PRD - Site Web - PixelQuest.md   # Cahier des charges initial & méthodologie Vibe Coding
```

---

## 🛠️ Comment lancer ou modifier le site

### 1. En local (sur ton ordinateur)
Double-clique simplement sur le fichier **`index.html`** : il s'ouvre immédiatement dans ton navigateur (Chrome, Safari, Firefox, Edge), même sans connexion Internet.

### 2. Personnaliser les textes de Maxence
Ouvre **`index.html`** dans un éditeur de texte et cherche la section **`MAXENCE_DATA`** au début de la balise `<script>` :
- Modifie les **stats RPG** (`MAXENCE_DATA.stats`)
- Modifie les **passions & sports** (`MAXENCE_DATA.hobbies`)
- Modifie les **5 faits fun** (`MAXENCE_DATA.faitsFun`)
- Modifie les **3 projets / Boss** (`MAXENCE_DATA.projets`)
- Modifie les **records IRL** (`MAXENCE_DATA.highScores`)

### 3. Mettre à jour le site en ligne sur GitHub Pages
```bash
git add .
git commit -m "Mise à jour du monde de Maxence"
git push
```
Le site **[https://royam0820.github.io/site-pixelart/](https://royam0820.github.io/site-pixelart/)** se mettra à jour automatiquement en quelques secondes !

