# 📓 DEVLOG — Cahier de Bord de Vibe Codeur (Maxence)

Ce fichier est le **cahier de bord technique et créatif** du projet **PIXELQUEST — La Légende de Maxence**. Il retrace les étapes de création du site par prompts successifs (§8 du PRD) et explique comment fonctionnent les mécaniques sous le capot (notamment le système de **Badges** et de sauvegarde **`localStorage`**).

---

## 🏆 1. Focus Technique : Comment fonctionnent les Badges (Visuel & Stockage) ?

### 🎨 A. Où les voir sur le site (le visuel) ?
Les **6 badges** sont exposés dans une galerie visuelle dans le **Niveau 3 (`👾 3. High Scores`)**, sous le titre **« 🏆 VITRINE DES BADGES DÉBLOQUÉS »** :

- **Quand un badge est verrouillé (`🔒 Secret`)** :
  Sa carte est affichée en **noir et blanc (grisée via `filter: grayscale(1)`)** et semi-transparente (`opacity: 0.45`). Si on passe la souris dessus, une infobulle indique la mission à accomplir.
- **Quand un badge est débloqué (`DÉBLOQUÉ !`)** :
  1. Une **bannière dorée (Toast)** surgit en bas à droite de l'écran accompagnée d'une pluie de **confettis pixel** et d'une fanfare 8-bit.
  2. Dans la vitrine du Niveau 3, la carte du badge **passe en couleur**, s'entoure d'un **cadre jaune néon lumineux** (classe CSS `.badge-item.earned`) et affiche son icône :

| Icône | Nom du Badge | Condition de déblocage | Bonus XP |
| :---: | :--- | :--- | :---: |
| 🧭 | **Explorateur** | Visiter les 4 zones de la carte du monde | `+20 XP` |
| ⚔️ | **Chasseur de Boss** | Vaincre les 3 Boss de projets dans le Niveau 2 | `+20 XP` |
| 🕵️ | **Détective Fun** | Trouver le fait totalement absurde dans « Qui suis-je ? » | `+15 XP` |
| 💎 | **Chasseur de Trésor** | Ouvrir le coffre caché dans la salle du Boss Final | `+25 XP` |
| 🕺 | **Danseur Pixel** | Cliquer 5 fois sur l'avatar de Maxence | `+15 XP` |
| 🌈 | **Maître Konami** | Activer le Code Konami (`↑ ↑ ↓ ↓ ← → ← → B A`) | `+25 XP` |

---

### 💾 B. Où sont-ils stockés techniquement ?
Il n'y a besoin d'aucune base de données externe : tout fonctionne à deux endroits complémentaires :

1. **Dans le code de `index.html`** :
   - **La définition des badges (`ALL_BADGES`)** : un tableau JavaScript contient l'identifiant (`id`), l'emoji (`emoji`), le titre (`nom`) et l'indice (`desc`) de chacun des 6 badges.
   - **Le rendu visuel (`renderBadges()`)** : une fonction JavaScript vérifie quels objectifs sont atteints dans `gameState` et génère automatiquement les cartes HTML en ajoutant la classe CSS `.earned` sur les badges gagnés.

2. **Dans la mémoire du navigateur (`localStorage`)** :
   - Dès qu'un badge ou de l'XP est gagné, la fonction `saveState()` enregistre l'objet `gameState` dans le navigateur sous la clé :
     ```js
     localStorage.setItem("maxence_pixelquest_save_v1", JSON.stringify(gameState));
     ```
   - **Pourquoi c'est génial ?** Même si le joueur ferme son navigateur ou éteint son ordinateur, lorsqu'il rouvre le site le lendemain, `loadState()` relit cette sauvegarde et rallume immédiatement tous ses badges et sa barre d'XP !
   - **Pour repartir à zéro** : le bouton **`🔄 Réinitialiser XP`** (situé dans le Niveau 4) efface cette clé avec `localStorage.removeItem("maxence_pixelquest_save_v1")` pour permettre à un ami de refaire toute l'aventure depuis le début.

---

## 🛠️ 2. Journal des Itérations (La boucle du Vibe Coding)

> **Règle d'or du Vibe Coding** : *Un prompt = une idée = un test dans le navigateur.*

| # | Prompt / Idée demandée | Ce que ça a donné | Prochaine idée d'amélioration |
| :---: | :--- | :--- | :--- |
| **1** | Créer le site complet en un seul fichier `index.html` sur le thème d'un jeu vidéo rétro dont Maxence est le héros (conformément au PRD). | Écran d'accueil borne d'arcade + Carte du monde à 4 zones + XP + Sons 8-bit + Mini-jeu + Easter Eggs opérationnels. | Publier le site en ligne pour pouvoir le partager facilement. |
| **2** | Pousser le projet sur GitHub (`royam0820/site-pixelart`) et activer **GitHub Pages**. | Le site est accessible partout sur `https://royam0820.github.io/site-pixelart/`. | Documenter le projet proprement (`PRD.md` et `README.md`). |
| **3** | Documenter l'histoire du **Code Konami** et des **Easter Eggs** rétro. | Création du fichier `SECRETS-ET-CULTURE-RETRO.md` avec l'anecdote de Kazuhisa Hashimoto (1985). | Documenter le fonctionnement visuel et technique des badges dans `DEVLOG.md`. |
| **4** | Expliquer le stockage et le visuel des badges dans `DEVLOG.md`. | Ce cahier de bord est prêt ! | Documenter l'architecture d'un jeu d'arcade et découper le code à but pédagogique. |
| **5** | Scinder le fichier unique en 4 fichiers pédagogiques (`index.html`, `style.css`, `user-data.js`, `script.js`). | Séparation claire entre le Squelette (HTML), le Costume (CSS), le Carnet de données (`user-data.js`) et le Cerveau (`script.js`). | Personnaliser les textes dans `user-data.js` et ajouter de nouveaux visuels pixel-art. |

