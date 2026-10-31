# 🧑‍💻 5 Missions de Codeur pour Maxence (Sans IA / Sans Vibe Coding)

Cette fiche d'activité te permet d'apprendre à **modifier directement le vrai code** de ton jeu **PIXELQUEST** au clavier, comme un développeur de jeux vidéo !

---

## 🛠️ Les 3 raccourcis magiques à connaître avant de commencer

1. **`Cmd + S`** (dans l'éditeur de code) : **Enregistrer** ta modification.
2. **`Cmd + R`** (dans ton navigateur web) : **Rafraîchir la page** pour voir l'effet de ton code tout de suite !
3. **`Cmd + Z`** (dans l'éditeur de code) : **Annuler** ta dernière action si tu as effacé une virgule ou un guillemet par erreur (la touche « retour dans le temps » des développeurs !).

---

## 🟢 Mission 1 : Inventer ton propre « Fait Absurde » (dans `user-data.js`)
> **Ce que tu apprends** : Les chaînes de texte (`"..."`) et les valeurs Vrai/Faux (`true` / `false`, qu'on appelle des *booléens*).

1. Ouvre le fichier **`user-data.js`** et regarde autour des **lignes 29 à 51** (`faitsFun`).
2. Repère le fait numéro 4 :
   ```js
   {
     texte: "J'ai apprivoisé un vélociraptor fluorescent qui fait mes devoirs de maths en mangeant des brocolis.",
     estAbsurde: true
   },
   ```
3. **À toi de jouer** :
   - Remplace la phrase entre les guillemets `"..."` par ton propre mensonge complètement fou ! *(Attention à bien garder les guillemets au début et à la fin).*
   - **Défi bonus** : écris `estAbsurde: false` sur le fait n°4, et mets `estAbsurde: true` sur un autre fait (par exemple le n°2) pour piéger tes copains qui connaissent déjà la réponse !
4. Fais **`Cmd + S`**, puis **`Cmd + R`** dans ton navigateur et va tester le **Niveau 1 (`🌋 Qui suis-je ?`)** !

---

## 🟡 Mission 2 : Ajouter une 6e Passion à ta liste (dans `user-data.js`)
> **Ce que tu apprends** : Comment fonctionne une **liste** (appelée un *tableau* ou *Array* `[ ... ]`) en programmation.

1. Toujours dans **`user-data.js`**, regarde les **lignes 19 à 26** :
   ```js
   hobbies: [
     "🎮 Jeux Vidéo Rétro & Sandbox",
     "⚽ Sport & Défis entre potes",
     "🤖 Création avec l'IA",
     "🎨 Pixel Art & Constructions",
     "🍕 Dégustation de Pizzas"
   ],
   ```
2. **À toi de jouer** :
   - Ajoute une virgule `,` à la fin de la ligne `"🍕 Dégustation de Pizzas"`.
   - Passe à la ligne juste en dessous et écris une 6e passion entre guillemets, par exemple :
     ```js
     "🛹 Skateboard & Figures"
     ```
3. Enregistre (**`Cmd + S`**) et rafraîchis le navigateur (**`Cmd + R`**) : le moteur du jeu a fabriqué tout seul un 6e badge de passion dans le Niveau 1 !

---

## 🟠 Mission 3 : Hacker les couleurs Néon de la Borne d'Arcade (dans `style.css`)
> **Ce que tu apprends** : Les **variables CSS** (`--neon-...`) et les codes couleurs hexadécimaux (`#RRGGBB`).

1. Ouvre le fichier **`style.css`** tout en haut (**lignes 8 à 26**) :
   ```css
   :root {
     --bg-deep: #090a1a;
     --bg-panel: #121536;
     --neon-cyan: #00f5d4;
     --neon-pink: #ff2a85;
     --neon-purple: #9b5de5;
     --neon-yellow: #fee440;
   ```
2. **À toi de jouer** :
   - Sur la ligne `--neon-cyan: #00f5d4;`, remplace `#00f5d4` par l'un de ces codes couleurs :
     - **`#00ff41`** *(Vert Matrix / Hacker)*
     - **`#ff5400`** *(Orange Magma)*
     - **`#ff0055`** *(Rouge Laser)*
3. Enregistre et rafraîchis : en modifiant **une seule ligne**, le logo néon, les bordures et les boutons de tout le site ont changé de couleur !

---

## 🔵 Mission 4 : Repeindre les cheveux ou la cape de ton Avatar Pixel-Art (dans `index.html`)
> **Ce que tu apprends** : Comment l'ordinateur dessine du **Pixel-Art vectoriel (SVG)** sur une grille de `16×16` cases.

1. Ouvre **`index.html`** aux **lignes 86 à 99** (c'est le grand personnage de Maxence sur l'écran d'accueil) :
   ```html
   <svg width="110" height="110" viewBox="0 0 16 16" shape-rendering="crispEdges">
     <path fill="#ff9f1c" d="M4 1h8v2H4zM3 3h10v2H3z"/>
     <path fill="#00f5d4" d="M3 4h10v1H3zM13 4h2v1h-2zM14 5h2v1h-2z"/>
   ```
   - La 1re ligne `<path fill="#ff9f1c" ...>` dessine les **cheveux**.
   - La 2e ligne `<path fill="#00f5d4" ...>` dessine le **bandeau de héros**.
   - L'avant-dernière ligne `<path fill="#ff2a85" ...>` dessine la **cape**.
2. **À toi de jouer** :
   - Change la couleur des cheveux `fill="#ff9f1c"` par `fill="#fee440"` (mode *Super Saiyan* doré !), `fill="#3a86ff"` (bleu électrique) ou `fill="#6c3c1c"` (châtain).
3. Enregistre et rafraîchis l'écran d'accueil pour admirer ton nouveau look !

---

## 🔴 Mission 5 : Créer un « Mode Ultra-Hardcore » dans le Mini-Jeu (dans `script.js`)
> **Ce que tu apprends** : Modifier les **variables mathématiques** d'un moteur de jeu vidéo (vitesse de chute et points).

1. Ouvre **`script.js`** et descends jusqu'à la fonction **`loopMiniGame()`** (**lignes 350 à 390**).
2. Regarde ces deux réglages secrets :
   - **Ligne 355** : `speed: 2.1 + Math.random() * 1.8,` → C'est la vitesse à laquelle tombent les étoiles ⭐ et les météorites ☄️ !
   - **Ligne 379** : `mgScore += 10;` → C'est le nombre de points que tu gagnes quand tu attrapes une étoile !
3. **À toi de jouer** :
   - **Pour doubler la vitesse des météorites** : remplace `2.1` par `4.5`.
   - **Pour gagner 50 points par étoile** : remplace `mgScore += 10;` par `mgScore += 50;`.
   - **Pour changer le nombre de coups nécessaires pour battre un Boss** (ligne 256) :
     ```js
     const bossHpState = { proj1: 3, proj2: 3, proj3: 3 };
     ```
     Si tu remplaces `3` par `5`, il faudra cliquer 5 fois pour vaincre le Boss !

---

## 🏆 Checklist de Validation du Codeur
- [ ] J'ai réussi la **Mission 1** (mon propre fait absurde dans `user-data.js`)
- [ ] J'ai réussi la **Mission 2** (ajouter une 6e passion dans la liste `hobbies`)
- [ ] J'ai réussi la **Mission 3** (changer la couleur néon dans `style.css`)
- [ ] J'ai réussi la **Mission 4** (changer la couleur de l'avatar Pixel-Art dans `index.html`)
- [ ] J'ai réussi la **Mission 5** (modifier la vitesse ou les points du mini-jeu dans `script.js`)
