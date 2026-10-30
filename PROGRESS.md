# 📊 PROGRESS — État d'avancement du projet PIXELQUEST (Maxence)

> **Dernière mise à jour** : 30 octobre 2026
> **URL en production (GitHub Pages)** : https://royam0820.github.io/site-pixelart/
> **Dépôt GitHub** : https://github.com/royam0820/site-pixelart

---

## ✅ 1. Ce qui fonctionne (Livré & Testé)

### 🕹️ Accueil & Ambiance Rétro
- [x] **Écran Borne d'Arcade** avec logo néon clignotant `PIXELQUEST — LA LÉGENDE DE MAXENCE`.
- [x] **Effet écran cathodique (CRT Scanlines)** et fond animé (étoiles scintillantes la nuit / nuages flottants le jour).
- [x] **Sprite Pixel-Art original en SVG** de Maxence (bandeau cyan, veste arcade, cape rose).
- [x] **Synthétiseur Audio 8-bit intégré** (Web Audio API sans aucun fichier MP3 externe) avec effets dédiés : pièce d'arcade (`coin`), pas (`step`), attaque (`hit`), victoire (`unlock`) et mélodie Rainbow (`rainbow`).
- [x] **Bouton Son `🔇 / 🔊`** dans la barre supérieure (coupé par défaut au chargement, s'active au clic sur `START`).

### 🗺️ Carte du Monde & 4 Niveaux Interactifs
- [x] **Carte Overworld interactive** avec déplacement animé de l'avatar de Maxence le long des chemins vers les 4 zones (au clic ou via les touches `1`, `2`, `3`, `4` du clavier).
- [x] **🌋 Niveau 1 — Qui suis-je ?** : Barres de statistiques RPG de Maxence, liste de ses passions/sports et **mini-jeu de détection du fait absurde** parmi les 5 faits fun (`+15 XP`).
- [x] **🏰 Niveau 2 — Le Donjon des Projets** : 3 projets gardés par 3 Boss Pixel avec barre de PV (3 clics d'attaque pour briser le bouclier, pluie de confettis et déblocage du projet + `+15 XP`).
- [x] **👾 Niveau 3 — High Scores & Salle d'Arcade** : Tableau des records IRL gamifiés de Maxence, vitrine des **6 badges** et **vrai mini-jeu jouable sur `<canvas>`** (*Maxence Astro-Dodge*).
- [x] **📬 Niveau 4 — Boss Final : Contact & Trésor Caché** : Formulaire de parchemin gamifié + **Coffre au Trésor secret** caché dans le décor (`+25 XP`).

### 📈 Système de Progression & Effets « Waouh »
- [x] **Système d'XP et 5 Rangs de Héros** (*Héros en herbe* → *Légende de l'Arcade*).
- [x] **Sauvegarde automatique en `localStorage`** (`maxence_pixelquest_save_v1`) + bouton de remise à zéro (`🔄 Réinitialiser XP`).
- [x] **6 Badges déblocables** avec passage du mode grisé (`🔒 Secret`) au mode doré (`DÉBLOQUÉ !`).
- [x] **Easter Egg #1** : 5 clics sur l'avatar de Maxence → **Danse Pixel** (`+15 XP`).
- [x] **Easter Egg #2** : **Code Konami** (`↑ ↑ ↓ ↓ ← → ← → B A` ou bouton dédié) → **Mode Rainbow 10s** (`+25 XP`).
- [x] **Mode 🌙 Nuit / ☀️ Jour** et changement de **curseur custom** (**🗡️ Épée** / **🚀 Fusée**).
- [x] **Documentation complète** : `PRD.md`, `README.md`, `DEVLOG.md`, `SECRETS-ET-CULTURE-RETRO.md`, `PROGRESS.md`.

---

## 🐛 2. Bugs connus & Limitations actuelles

| # | Élément | Description / Comportement actuel | Gravité | Piste de correction |
| :---: | :--- | :--- | :---: | :--- |
| **1** | **Formulaire de contact (Niveau 4)** | Le formulaire affiche une confirmation à l'écran et donne `+10 XP`, mais **n'envoie pas d'e-mail réel** (car le site est 100 % statique sans serveur et protège la vie privée). | 🟢 Mineur (voulu par sécurité) | Connecter un service gratuit sans code comme *Formspree* ou enregistrer un livre d'or local si souhaité. |
| **2** | **Contrôles tactiles du Mini-Jeu (Mobile)** | Sur téléphone, le vaisseau de Maxence se contrôle avec les boutons `⬅️` et `➡️` sous le jeu, mais le glisser du doigt (`touchmove`) directement sur le canvas n'est pas encore branché (seul `mousemove` l'est). | 🟡 Moyen | Ajouter un écouteur `touchmove` sur `#arcadeCanvas` pour déplacer le vaisseau au doigt sur mobile/tablette. |
| **3** | **Polices Pixel-Art hors-ligne** | Les polices *Press Start 2P* et *VT323* sont chargées via Google Fonts. Sans connexion Internet, le navigateur utilise la police `Courier New` en secours. | 🟢 Mineur | Optionnel : embarquer la police ou garder le fallback `monospace`. |
| **4** | **Textes d'exemple dans `MAXENCE_DATA`** | Les 3 projets, les 5 faits fun et les records contiennent actuellement des textes pré-remplis pour Maxence. | 🟡 À personnaliser | Remplacer par les vrais projets, photos et records personnels de Maxence (§6 du PRD). |

---

## 🚀 3. Prochaines tâches (Roadmap & Améliorations V2)

### 📝 Priorité 1 — Personnalisation par Maxence (Contenu)
- [ ] **Personnaliser les 5 faits fun** dans `MAXENCE_DATA.faitsFun` (mettre 4 vraies anecdotes sur Maxence + 1 nouvelle anecdote absurde de son choix).
- [ ] **Personnaliser les 3 Projets / Boss** dans `MAXENCE_DATA.projets` avec ses vraies créations (ex: construction Lego/Minecraft, dessin, exposé, sport, code...) et ajouter des images/captures si besoin.
- [ ] **Mettre ses vrais High Scores IRL** dans `MAXENCE_DATA.highScores`.

### 🎨 Priorité 2 — Améliorations Visuelles & Ergonomie
- [ ] **Médaillons de Badges en vrai Pixel-Art SVG** : remplacer les emojis des 6 badges (`🧭`, `⚔️`, `🕵️`, `💎`, `🕺`, `🌈`) par de vraies médailles dessinées en pixels SVG.
- [ ] **Afficher les badges dans la barre du haut (HUD)** : faire apparaître les mini-icônes des badges gagnés directement à côté du nom `MAXENCE` en haut de l'écran.
- [ ] **Améliorer le tactile mobile du Mini-Jeu** : permettre de glisser le doigt sur l'écran du mini-jeu *Astro-Dodge* sur smartphone et tablette.

### 🎮 Priorité 3 — Nouvelles idées « Vibe Coding » (V2)
- [ ] **Personnalisation du costume de Maxence** : permettre de changer la couleur de sa cape ou de lui équiper une couronne dorée une fois le *Trésor Secret* trouvé !
- [ ] **Musique de fond 8-bit en boucle** (activable/désactivable indépendamment des bruitages).
- [ ] **Nouveau Boss caché (Boss Secret #4)** qui n'apparaît sur la carte que lorsqu'on atteint **100 XP (Niveau 5 — Légende de l'Arcade)**.
- [ ] **Nettoyage du dépôt** : supprimer le fichier temporaire `dev-site-V0` s'il n'est plus utilisé.
