# 🕹️ PRD — PIXELQUEST : La Légende de Maxence

> **Tagline** : *« Appuie sur START pour me découvrir. »*
> **Démo en ligne** : https://royam0820.github.io/site-pixelart/

---

## 1. Vision & Pitch

Un site web personnel qui prend la forme d'un **jeu vidéo rétro en pixel-art dont Maxence est le héros** :
- Chaque rubrique du site est un **niveau sur une carte du monde**.
- Chaque projet réalisé par Maxence est gardé par un **Boss Pixel à débloquer**.
- Un **compteur d'XP et de niveaux** (`localStorage`) récompense le visiteur à chaque découverte, secret ou mini-jeu réussi.

Pas un portfolio statique — une **aventure interactive** pensée pour être explorée en jouant.

---

## 2. Public cible & Objectifs

### Public cible
- **Principal** : Copains et copines (10–14 ans) — recherche de fun immédiat, d'interactivité, de défis et d'easter eggs.
- **Secondaire** : Famille, professeurs — qui découvrent la créativité et la démarche *Vibe Coding* sous l'habillage ludique.

### Objectifs & Critères de succès
| # | Objectif | Critère de succès | Statut |
|---|----------|-------------------|--------|
| 1 | Site jouable et autonome | Architecture modulaire en 4 fichiers (`index.html`, `style.css`, `user-data.js`, `script.js`) fonctionnelle sans serveur (< 500 Ko) | ✅ Livré (~40 Ko) |
| 2 | Personnalisation centrée sur Maxence | Avatar pixel-art de Maxence, stats RPG, 5 faits fun, 3 boss-projets, records | ✅ Livré |
| 3 | Effets « waouh » & rejouabilité | Sons 8-bit, confettis, mode Jour/Nuit, curseur custom, 2+ easter eggs, mini-jeu | ✅ Livré |
| 4 | Publication web gratuite | Hébergé en ligne sur GitHub Pages avec déploiement automatique | ✅ En ligne |

---

## 3. Fonctionnalités & Mécaniques de Jeu

### 🕹️ 3.1. Écran d'accueil façon Borne d'Arcade
- Logo pixellisé animé **PIXELQUEST — LA LÉGENDE DE MAXENCE** (effet néon clignotant + scanlines CRT).
- Avatar pixel-art SVG de **Maxence** (bandeau cyan, veste arcade et cape).
- Bouton clignotant **« 🪙 INSERT COIN / START »**.
- Synthétiseur **audio 8-bit** natif (Web Audio API) avec bouton **🔇 / 🔊** dans le HUD (coupé par défaut pour respecter la politesse web).

### 🗺️ 3.2. Carte du Monde interactive (Menu Overworld)
Maxence se déplace visuellement sur les routes en pointillés de la carte jusqu'à la zone cliquée (ou sélectionnée via les touches `1`, `2`, `3`, `4` du clavier) :

1. **🌋 Zone 1 — Qui suis-je ? (Volcan de l'Identité)**
   - Fiche de statistiques RPG de Maxence (*Créativité & Idées*, *Vibe Coding & IA*, *Humour & Réparties*, *Esprit d'Équipe & Sport*).
   - Badges de passions et sports.
   - **Mini-défi des 5 Faits Fun** : 4 faits vrais et 1 fait totalement absurde à démasquer en cliquant dessus (`+15 XP` + badge *Détective Fun*).
2. **🏰 Zone 2 — Mes Projets (Donjon des Boss)**
   - 3 projets gardés par 3 Boss (*Mécha-Pixel*, *Dragon du Code*, *Cyber-Kraken*) dotés chacun d'une barre de PV.
   - Le joueur attaque 3 fois le bouclier d'un boss pour le vaincre, déclencher une pluie de confettis pixel et débloquer la fiche du projet (`+15 XP` par boss + badge *Chasseur de Boss*).
3. **👾 Zone 3 — Mes High Scores & Salle d'Arcade (Salle des Trophées)**
   - Tableau des records IRL gamifiés de Maxence.
   - Vitrine des **6 badges à collectionner**.
   - **Mini-jeu jouable intégré (`Maxence Astro-Dodge`)** sur `<canvas>` : attraper les étoiles dorées ⭐ et esquiver les météorites ☄️ au clavier (⬅️/➡️), à la souris ou au doigt pour battre le record de Maxence (`120 pts`).
4. **📬 Zone 4 — Boss Final : Contact & Trésor Caché (Tour de Contact)**
   - Dialogue avec le *Gardien du Courrier* et parchemin de message gamifié (sans collecte de données personnelles sensibles).
   - **Trésor Caché** dans le coin sombre du donjon : coffre interactif qui révèle la *Couronne Pixel* de Maxence (`+25 XP` + badge *Chasseur de Trésor*).

### 📈 3.3. Système d'XP, Rangs & Sauvegarde (`localStorage`)
- **Gain d'XP** :
  - `+10 XP` par zone visitée pour la première fois
  - `+20 XP` bonus lorsque les 4 zones sont explorées (Badge *Explorateur*)
  - `+15 XP` par Boss de projet vaincu (`+20 XP` bonus pour les 3 boss)
  - `+15 XP` pour le fait absurde trouvé
  - `+25 XP` pour le coffre au trésor secret
  - `+15 XP` et `+25 XP` pour les Easter Eggs
- **Échelle de niveaux de Maxence** :
  - `0 – 19 XP` : *Niv. 1 — Héros en herbe 🌱*
  - `20 – 39 XP` : *Niv. 2 — Explorateur Rétro 🧭*
  - `40 – 69 XP` : *Niv. 3 — Chevalier du Code 🗡️*
  - `70 – 99 XP` : *Niv. 4 — Maître du Pixel ⚡*
  - `100+ XP` : *Niv. 5 — Légende de l'Arcade 🏆*

### ✨ 3.4. Effets « Waouh » & Easter Eggs
- **Curseur Pixel Custom** : Bascule instantanée entre l'**Épée 🗡️** et la **Fusée 🚀**.
- **Mode 🌙 Nuit / ☀️ Jour** : Transforme l'ambiance du jeu (ciel étoilé et néons la nuit, ciel bleu et nuages animés le jour).
- **Easter Egg #1 — Danse Pixel** : 5 clics sur l'avatar de Maxence lancent une animation de danse rétro + badge *Danseur Pixel*.
- **Easter Egg #2 — Code Konami (`↑ ↑ ↓ ↓ ← → ← → B A`)** : Active le **Mode Rainbow Overdrive** pendant 10 secondes avec mélodie chiptune + badge *Maître Konami*.
- **Confettis Pixel-Art** : Explosion de pixels colorés à chaque niveau, boss ou secret débloqué.

---

## 4. Architecture Technique & Contraintes

Le projet est découpé en **4 fichiers modulaires** pour séparer clairement le squelette, le design, les données personnelles et le moteur du jeu :

| Composant | Fichier / Choix technique | Justification |
|-----------|---------------------------|---------------|
| **1. Structure (Squelette)** | `index.html` (HTML5 sémantique) | Structure des écrans (Accueil, Carte, 4 Zones, HUD), zéro installation, double-clic local |
| **2. Styles (Costume & Décor)** | `style.css` (CSS3 natif) | Variables CSS pour le thème Jour/Nuit, animations keyframes, CRT scanlines, responsive |
| **3. Données du Héros (Carnet)** | `user-data.js` (`USER_DATA`) | Contient toutes les données personnalisables (stats RPG, passions, 5 faits fun, 3 boss, records) modifiables sans toucher au moteur |
| **4. Moteur & Audio (Cerveau)** | `script.js` (JavaScript Vanilla) | Logique de jeu, Web Audio API (synthé 8-bit sans MP3), Canvas 2D (`Astro-Dodge`), sauvegarde `localStorage` |
| **Graphismes** | Sprites SVG `crispEdges` + Emojis | Poids plume (< 40 Ko au total), netteté pixel-art sur tous les écrans |
| **Confidentialité** | Pseudo uniquement (`MAXENCE`) | Aucune donnée personnelle sensible exposée (conformité sécurité mineur) |
| **Hébergement** | GitHub Pages (`main` / root) | Gratuit, HTTPS activé, mise à jour automatique à chaque `git push` |

