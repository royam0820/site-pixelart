# 🕹️ Construction d'un Jeu d'Arcade & Parallèle avec PIXELQUEST

Ce document explique **comment est conçu un véritable jeu vidéo d'arcade rétro** (comme *Pac-Man*, *Space Invaders*, *Mario* ou *Zelda*) et montre **comment chaque mécanique d'une borne d'arcade a été reproduite dans le projet web de Maxence (`index.html`)**.

---

## 1. 🏗️ Anatomie d'une vraie Borne d'Arcade vs. Le Site de Maxence

Dans les salles d'arcade des années 1980–1990, une borne combinait du matériel électronique spécialisé et une architecture logicielle très précise. Dans **PIXELQUEST**, chaque composant d'une borne d'arcade a son équivalent exact en HTML, CSS et JavaScript :

| Composant d'une Borne d'Arcade (Années 80) | Rôle dans le jeu vidéo | Équivalent dans le projet `PIXELQUEST` (`index.html`) |
| :--- | :--- | :--- |
| **📺 Écran cathodique (CRT) + Marquise néon** | Attirer l'œil dans la salle d'arcade avec des couleurs lumineuses et des lignes de balayage (*scanlines*). | CSS `--neon-cyan`, animation `@keyframes neonFlicker` et filtre `repeating-linear-gradient` (`body::after`) qui dessine les *scanlines* CRT sur tout l'écran. |
| **🪙 Monnayeur & « Attract Mode »** | L'écran titre clignote avec *« INSERT COIN »* tant qu'aucune pièce n'est insérée. | Écran `#screenStart` avec le bouton clignotant **`🪙 INSERT COIN / START`** (`startGame()`) qui déclenche le son de pièce (`play8BitSound('coin')`). |
| **📊 Le HUD (*Heads-Up Display*)** | Bandeau toujours visible en haut de l'écran affichant le nom du joueur, son niveau et sa barre de vie/XP. | La barre `<header class="hud-bar">` qui affiche en permanence l'avatar de **MAXENCE**, son rang et sa barre de progression `#xpBarFill`. |
| **🗺️ L'Overworld (Carte du Monde)** | Menu visuel (façon *Super Mario World* ou *Zelda*) où le héros marche d'un niveau à l'autre. | L'écran `#screenMap` avec routes en pointillés SVG et déplacement animé de l'avatar `#mapHero` (`travelToZone()`). |
| **👾 Les Sprites & Tilemaps** | Petites images dessinées pixel par pixel sur une grille (souvent `16×16` pixels) pour le héros et les décors. | Le **Sprite SVG `viewBox="0 0 16 16"`** de Maxence avec `shape-rendering="crispEdges"` (qui interdit au navigateur de flouter les pixels !). |
| **🏰 Les Boss & Points de Vie (HP)** | Des gardiens qui bloquent l'accès à une récompense tant que leur barre de vie (`HP`) n'est pas tombée à `0`. | Les **3 Projets-Boss** du Niveau 2 (`bossHpState`) : il faut attaquer 3 fois (`attackBoss()`) pour vider leur barre de PV et révéler le projet. |
| **🔊 La Puce Sonore 8-bit (*Sound Chip*)** | Puce électronique qui fabrique des bips et mélodies géométriques (ondes carrées, triangles, dents de scie) en direct. | Le synthétiseur **`Web Audio API`** (`AudioContext` + `createOscillator()`) dans `play8BitSound()` qui génère tous les sons mathématiquement, sans aucun fichier `.mp3`. |
| **💾 La mémoire de sauvegarde (NVRAM / Pile)** | Petite mémoire alimentée par une pile dans la cartouche pour retenir les High Scores quand on éteint la borne. | Le **`localStorage`** du navigateur (`maxence_pixelquest_save_v1`) qui conserve l'XP, les badges et le record du mini-jeu même après fermeture de l'ordinateur. |

---

## 2. ⚙️ Les 5 Piliers de la Construction d'un Jeu d'Arcade

Pour construire un jeu d'arcade (et c'est exactement ainsi qu'est construit le mini-jeu **Maxence Astro-Dodge** dans le Niveau 3 ainsi que l'ensemble du site), un développeur assemble toujours **5 grands piliers** :

```
   ┌──────────────────────────────────────────────────────────────┐
   │                LA BOUCLE DE JEU (GAME LOOP)                  │
   │                                                              │
   │   1. ENTRÉES JOUEUR (Inputs : Clavier / Souris / Tactile)    │
   │                          ⬇️                                  │
   │   2. MISE À JOUR DU MONDE (Positions, Collisions, XP, PV)    │
   │                          ⬇️                                  │
   │   3. RENDU VISUEL & SONORE (Dessin Écran + Synthé 8-bit)     │
   │                          🔄 (60 fois par seconde !)          │
   └──────────────────────────────────────────────────────────────┘
```

### Pilier n°1 : La Gestion d'État (*State Machine*)
Un jeu d'arcade ne montre jamais tout en même temps. Il fonctionne comme un automate qui passe d'un **état** à un autre :
1. **État `START` (Écran Titre)** → attend que le joueur appuie sur *START*.
2. **État `MAP` (Carte du Monde)** → attend que le joueur choisisse une destination.
3. **État `LEVEL` (Dans un Niveau / Combat de Boss / Mini-Jeu)** → le joueur relève un défi et gagne de l'XP.

👉 **Dans `PIXELQUEST`** : C'est le rôle de la fonction `switchScreen(screenId)` et de l'objet central `gameState` qui connaît à tout instant l'état exact de la partie (combien d'XP a le joueur, quelles zones ont été visitées, quels Boss sont vaincus).

---

### Pilier n°2 : Le Graphisme « Pixel-Art » sur Grille `16×16`
Sur les consoles 8-bit, la mémoire était minuscule. Les personnages étaient dessinés sur une **grille de 16 cases sur 16 cases**, où chaque case avait une couleur précise.

👉 **Dans `PIXELQUEST`** : L'avatar de Maxence est construit exactement sur une grille de `16×16` unités en SVG :
- Les cheveux orange : `M4 1h8v2H4z` (ligne 1, de la colonne 4 à 12)
- Le bandeau cyan néon : `M3 4h10v1H3z` (ligne 4)
- L'armure violette et le plastron doré : `M3 9h10v4H3z` (lignes 9 à 13)
- La propriété `shape-rendering="crispEdges"` force l'écran moderne à garder des carrés parfaits, comme sur une vraie borne d'arcade.

---

### Pilier n°3 : La Boucle de Jeu à 60 images/seconde (*The Game Loop*)
Dans le Niveau 3 (`👾 High Scores & Salle d'Arcade`), Maxence a intégré un vrai mini-jeu d'arcade : **Maxence Astro-Dodge** sur un élément `<canvas id="arcadeCanvas">`.

Comment les étoiles et les météorites tombent-elles de façon fluide ? Grâce à la fonction **`loopMiniGame()`** appelée 60 fois par seconde par `requestAnimationFrame(loopMiniGame)` :
1. **Effacer l'image précédente** : `ctx.fillRect(0, 0, 320, 220)` repeint le fond spatial noir.
2. **Faire descendre les objets** : pour chaque étoile ⭐ ou météorite ☄️, on ajoute sa vitesse à sa position verticale (`it.y += it.speed`).
3. **Redessiner Maxence et les objets** à leur nouvelle position.
4. **Recommencer 16 millisecondes plus tard** (soit 60 fois par seconde) !

---

### Pilier n°4 : La Détection de Collision (*Hitbox AABB*)
Dans un jeu d'arcade, comment l'ordinateur sait-il que le vaisseau de Maxence vient d'attraper une étoile ou de toucher une météorite ?
Il utilise ce qu'on appelle une **boîte de collision rectangulaire (Hitbox)** :

```js
// Vérifie si le rectangle de l'objet (it.x, it.y) chevauche le rectangle de Maxence (mgPlayerX, 176)
const hitX = it.x + 12 > mgPlayerX && it.x < mgPlayerX + 26;
const hitY = it.y + 12 > 176 && it.y < 198;

if (hitX && hitY) {
  // COLLISION DÉTECTÉE !
  // Si c'est une étoile -> +10 points et son "coin"
  // Si c'est une météorite -> GAME OVER et son "hit"
}
```
C'est exactement la même formule mathématique (appelée *AABB — Axis-Aligned Bounding Box*) qui était utilisée dans *Pong*, *Breakout*, *Space Invaders* et *Super Mario Bros.* !

---

### Pilier n°5 : Le Feedback Immédiat (« Game Feel » / « Juice »)
Ce qui rend un jeu d'arcade addictif et fun pour des jeunes de 10–14 ans, c'est que **chaque action du joueur provoque une réaction immédiate à l'écran et dans les haut-parleurs** :
- **Tu cliques sur un Boss ?** → Sa barre de vie diminue + bruitage d'impact `sawtooth` (`190 Hz → 120 Hz`).
- **Le Boss tombe à 0 PV ?** → Pluie de **28 confettis pixelisés** (`spawnConfetti()`) + fanfare arpégée (`Do - Mi - Sol - Do` : `523 Hz, 659 Hz, 783 Hz, 1046 Hz`) + notification dorée `+15 XP` + ouverture de la carte secrète du projet.
- **Tu tapes un code secret ?** → Tout l'écran change de couleur (`rainbowOverdrive`) et un badge s'allume dans la vitrine des trophées.

---

## 3. 🎯 Pourquoi cette approche transforme un simple site en « Jeu » ?

Dans un site web classique :
- Le visiteur **lit passivement** de haut en bas, puis quitte la page en 15 secondes.

Dans **PIXELQUEST (le site-jeu d'arcade de Maxence)** :
- Le visiteur devient **joueur** : il a une quête (*explorer les 4 mondes*), des mystères à résoudre (*trouver le fait absurde*, *chercher le coffre caché*, *vaincre les 3 Boss*), un score à battre (*120 points au mini-jeu*) et **6 badges à collectionner** pour atteindre le rang suprême de **Niv. 5 — Légende de l'Arcade 🏆**.
